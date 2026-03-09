import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getTrades } from "../../services/api";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

const startOfDay = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const startOfMonth = (date) => {
  const d = new Date(date);
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
};

const startOfWeek = (date) => {
  const d = startOfDay(date);
  const day = (d.getDay() + 6) % 7; // Monday = 0
  d.setDate(d.getDate() - day);
  return d;
};

const tradePnl = (trade) => {
  const risk = Number(trade?.risk ?? 0) || 0;
  const rr = Number(trade?.rr ?? 0) || 0;
  if (trade?.result === "Win") return risk * rr;
  if (trade?.result === "Loss") return -risk;
  return 0;
};

const StatCard = ({ title, value, sub }) => (
  <div className="relative overflow-hidden rounded-3xl border border-zinc-800/70 bg-gradient-to-b from-zinc-900/70 to-zinc-950/40 p-5 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.8)]">
    <div className="absolute right-4 top-4 text-zinc-500">
      <InformationCircleIcon className="h-5 w-5" />
    </div>
    <div className="text-sm font-medium text-zinc-300">{title}</div>
    <div className="mt-2 text-3xl font-semibold tracking-tight text-white">
      {value}
    </div>
    {sub ? <div className="mt-2 text-sm text-zinc-400">{sub}</div> : null}
  </div>
);

const Badge = ({ kind, children }) => {
  const classes =
    kind === "success"
      ? "bg-emerald-500/10 text-emerald-300 ring-emerald-500/20"
      : kind === "danger"
        ? "bg-rose-500/10 text-rose-300 ring-rose-500/20"
        : kind === "info"
          ? "bg-blue-500/10 text-blue-300 ring-blue-500/20"
          : "bg-zinc-700/30 text-zinc-200 ring-zinc-700/40";

  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ring-1",
        classes,
      ].join(" ")}
    >
      {children}
    </span>
  );
};

const TradesTakenCard = ({ total, buys, sells }) => {
  const buyPct = total ? (buys / total) * 100 : 0;
  const sellPct = total ? (sells / total) * 100 : 0;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-zinc-800/70 bg-gradient-to-b from-zinc-900/70 to-zinc-950/40 p-5">
      <div className="absolute right-4 top-4 text-zinc-500">
        <InformationCircleIcon className="h-5 w-5" />
      </div>
      <div className="text-sm font-medium text-zinc-300">Trades taken</div>
      <div className="mt-2 text-4xl font-semibold tracking-tight text-white">
        {total}
      </div>

      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-zinc-800/80">
        <div className="flex h-full w-full">
          <div
            className="h-full bg-emerald-500"
            style={{ width: `${clamp(buyPct, 0, 100)}%` }}
          />
          <div
            className="h-full bg-rose-500"
            style={{ width: `${clamp(sellPct, 0, 100)}%` }}
          />
        </div>
      </div>

      <div className="mt-3 text-sm">
        <span className="font-semibold text-emerald-300">
          {buyPct.toFixed(2)}% buys
        </span>
        <span className="mx-2 text-zinc-600">·</span>
        <span className="font-semibold text-rose-300">
          {sellPct.toFixed(2)}% sells
        </span>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    let alive = true;

    const run = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await getTrades();
        const list = Array.isArray(res?.data) ? res.data : [];
        if (alive) setTrades(list);
      } catch (e) {
        if (alive) setError(e?.message || "Failed to load trades");
      } finally {
        if (alive) setLoading(false);
      }
    };

    run();
    return () => {
      alive = false;
    };
  }, []);

  const metrics = useMemo(() => {
    const totalTrades = trades.length;
    const buys = trades.filter((t) => t.direction === "Buy").length;
    const sells = trades.filter((t) => t.direction === "Sell").length;
    const wins = trades.filter((t) => t.result === "Win").length;
    const losses = trades.filter((t) => t.result === "Loss").length;
    const be = trades.filter((t) => t.result === "BE").length;
    const winRate = totalTrades ? (wins / totalTrades) * 100 : 0;
    const avgRR = totalTrades
      ? trades.reduce((acc, t) => acc + (Number(t.rr) || 0), 0) / totalTrades
      : 0;

    const now = new Date();
    const monthStart = startOfMonth(now);
    const weekStart = startOfWeek(now);
    const dayStart = startOfDay(now);

    const totalPnL = trades.reduce((acc, t) => acc + tradePnl(t), 0);
    const monthPnL = trades
      .filter((t) => new Date(t.createdAt) >= monthStart)
      .reduce((acc, t) => acc + tradePnl(t), 0);
    const weekPnL = trades
      .filter((t) => new Date(t.createdAt) >= weekStart)
      .reduce((acc, t) => acc + tradePnl(t), 0);
    const dayPnL = trades
      .filter((t) => new Date(t.createdAt) >= dayStart)
      .reduce((acc, t) => acc + tradePnl(t), 0);

    const recentTrades = [...trades]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 8);

    return {
      totalTrades,
      buys,
      sells,
      wins,
      losses,
      be,
      winRate,
      avgRR,
      totalPnL,
      monthPnL,
      weekPnL,
      dayPnL,
      recentTrades,
    };
  }, [trades]);

  const winRateChart = useMemo(() => {
    const now = new Date();
    const months = Array.from({ length: 6 }).map((_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
      return d;
    });

    const labels = months.map((d) =>
      d.toLocaleString("en-US", { month: "short", year: "numeric" }),
    );

    const values = months.map((monthDate) => {
      const start = startOfMonth(monthDate);
      const end = startOfMonth(
        new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 1),
      );

      const inMonth = trades.filter((t) => {
        const createdAt = new Date(t.createdAt);
        return createdAt >= start && createdAt < end;
      });

      if (!inMonth.length) return 0;
      const wins = inMonth.filter((t) => t.result === "Win").length;
      return (wins / inMonth.length) * 100;
    });

    return {
      data: {
        labels,
        datasets: [
          {
            label: "Win Rate",
            data: values,
            borderColor: "rgb(37, 99, 235)",
            backgroundColor: "rgba(37, 99, 235, 0.25)",
            fill: true,
            tension: 0.35,
            pointRadius: 0,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.parsed.y.toFixed(2)}%`,
            },
          },
        },
        scales: {
          y: {
            min: 0,
            max: 100,
            grid: { color: "rgba(255,255,255,0.08)" },
            ticks: {
              color: "rgba(255,255,255,0.6)",
              callback: (v) => `${v}%`,
            },
          },
          x: {
            grid: { display: false },
            ticks: { color: "rgba(255,255,255,0.6)" },
          },
        },
      },
    };
  }, [trades]);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-zinc-800/60 bg-gradient-to-b from-zinc-950/30 to-zinc-950/70 p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-sm text-zinc-400">
              Your performance at a glance
            </div>
            <div className="mt-1 text-2xl font-semibold tracking-tight text-white">
              Dashboard
            </div>
          </div>
          <div className="text-sm text-zinc-400">
            {loading ? "Loading trades…" : `${metrics.totalTrades} trades`}
          </div>
          <Link
            to="/trades"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400/60"
          >
            Monthly view
          </Link>
        </div>

        {error ? (
          <div className="mt-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-200">
            {error}
          </div>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <TradesTakenCard
          total={metrics.totalTrades}
          buys={metrics.buys}
          sells={metrics.sells}
        />
        <StatCard
          title="Overall win rate"
          value={`${metrics.winRate.toFixed(2)}%`}
          sub={`${metrics.wins}W · ${metrics.losses}L · ${metrics.be}BE`}
        />
        <StatCard title="Average R:R" value={metrics.avgRR.toFixed(2)} />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-6">
        <StatCard title="Total PnL" value={money.format(metrics.totalPnL)} />
        <StatCard
          title="Month Gain/Loss"
          value={money.format(metrics.monthPnL)}
        />
        <StatCard
          title="Week Gain/Loss"
          value={money.format(metrics.weekPnL)}
        />
        <StatCard
          title="Daily Gain/Loss"
          value={money.format(metrics.dayPnL)}
        />
        <StatCard
          title="Wins"
          value={String(metrics.wins)}
          sub="Result = Win"
        />
        <StatCard
          title="Losses"
          value={String(metrics.losses)}
          sub="Result = Loss"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-zinc-800/70 bg-gradient-to-b from-zinc-900/70 to-zinc-950/40 p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-zinc-300">Win Rate</div>
              <div className="mt-1 text-xs text-zinc-500">Last 6 months</div>
            </div>
            <InformationCircleIcon className="h-5 w-5 text-zinc-500" />
          </div>
          <div className="mt-4 h-56">
            <Line data={winRateChart.data} options={winRateChart.options} />
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-800/70 bg-gradient-to-b from-zinc-900/70 to-zinc-950/40 p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-zinc-300">
                Recent Trades
              </div>
              <div className="mt-1 text-xs text-zinc-500">
                Latest {metrics.recentTrades.length}
              </div>
            </div>
            <InformationCircleIcon className="h-5 w-5 text-zinc-500" />
          </div>

          <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-800/60">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-950/60 text-xs text-zinc-400">
                <tr>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Pair</th>
                  <th className="px-4 py-3 font-semibold">Side</th>
                  <th className="px-4 py-3 font-semibold">Result</th>
                  <th className="px-4 py-3 font-semibold">R:R</th>
                  <th className="px-4 py-3 font-semibold">PnL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {metrics.recentTrades.map((t) => {
                  const pnl = tradePnl(t);
                  const pnlKind = pnl > 0 ? "success" : pnl < 0 ? "danger" : "";
                  const resultKind =
                    t.result === "Win"
                      ? "success"
                      : t.result === "Loss"
                        ? "danger"
                        : "info";
                  const sideKind = t.direction === "Buy" ? "success" : "danger";

                  return (
                    <tr key={t._id} className="bg-transparent">
                      <td className="px-4 py-3 text-zinc-300">
                        {t.createdAt
                          ? new Date(t.createdAt).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="px-4 py-3 font-semibold text-white">
                        {t.pair || "-"}
                      </td>
                      <td className="px-4 py-3">
                        <Badge kind={sideKind}>{t.direction || "-"}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Badge kind={resultKind}>{t.result || "-"}</Badge>
                      </td>
                      <td className="px-4 py-3 text-zinc-200">
                        {Number(t.rr ?? 0).toFixed(2)}
                      </td>
                      <td className="px-4 py-3">
                        <Badge kind={pnlKind}>{money.format(pnl)}</Badge>
                      </td>
                    </tr>
                  );
                })}

                {!loading && metrics.recentTrades.length === 0 ? (
                  <tr>
                    <td
                      className="px-4 py-8 text-center text-sm text-zinc-400"
                      colSpan={6}
                    >
                      No trades yet. Add your first trade to see stats.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
