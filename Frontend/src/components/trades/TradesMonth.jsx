import React, { useEffect, useMemo, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { getTrades } from "../../services/api";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const pad2 = (n) => String(n).padStart(2, "0");

const toDayKey = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
};

const tradePnl = (trade) => {
  const risk = Number(trade?.risk ?? 0) || 0;
  const rr = Number(trade?.rr ?? 0) || 0;
  if (trade?.result === "Win") return risk * rr;
  if (trade?.result === "Loss") return -risk;
  return 0;
};

const startOfMonth = (year, monthIndex) => new Date(year, monthIndex, 1);

const addMonths = (year, monthIndex, delta) => {
  const d = new Date(year, monthIndex + delta, 1);
  return { year: d.getFullYear(), monthIndex: d.getMonth() };
};

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

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

const getDayCellClass = (pnl) => {
  if (pnl > 0) return "border-emerald-500/20 bg-emerald-500/10";
  if (pnl < 0) return "border-rose-500/20 bg-rose-500/10";
  return "border-zinc-800/70 bg-zinc-950/30";
};

const TradesMonth = () => {
  const now = new Date();
  const [cursor, setCursor] = useState({
    year: now.getFullYear(),
    monthIndex: now.getMonth(),
  });
  const [selectedDayKey, setSelectedDayKey] = useState(toDayKey(now));

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

  const dayAgg = useMemo(() => {
    const map = new Map();

    for (const t of trades) {
      if (!t?.createdAt) continue;
      const key = toDayKey(t.createdAt);
      const entry = map.get(key) || { pnl: 0, trades: [] };
      entry.trades.push(t);
      entry.pnl += tradePnl(t);
      map.set(key, entry);
    }

    for (const [, entry] of map) {
      entry.trades.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return map;
  }, [trades]);

  const monthTrades = useMemo(() => {
    const start = startOfMonth(cursor.year, cursor.monthIndex);
    const end = startOfMonth(cursor.year, cursor.monthIndex + 1);

    return trades
      .filter((t) => {
        if (!t?.createdAt) return false;
        const d = new Date(t.createdAt);
        return d >= start && d < end;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [trades, cursor.year, cursor.monthIndex]);

  const monthSummary = useMemo(() => {
    const totalTrades = monthTrades.length;
    const wins = monthTrades.filter((t) => t.result === "Win").length;
    const losses = monthTrades.filter((t) => t.result === "Loss").length;
    const be = monthTrades.filter((t) => t.result === "BE").length;
    const winRate = totalTrades ? (wins / totalTrades) * 100 : 0;
    const pnl = monthTrades.reduce((acc, t) => acc + tradePnl(t), 0);

    return { totalTrades, wins, losses, be, winRate, pnl };
  }, [monthTrades]);

  const calendar = useMemo(() => {
    const daysInMonth = new Date(cursor.year, cursor.monthIndex + 1, 0).getDate();
    const first = new Date(cursor.year, cursor.monthIndex, 1);
    const mondayOffset = (first.getDay() + 6) % 7; // Monday = 0

    const cells = [];
    for (let i = 0; i < mondayOffset; i += 1) {
      cells.push({ kind: "blank", key: `b${i}` });
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const date = new Date(cursor.year, cursor.monthIndex, day);
      const key = toDayKey(date);
      const entry = dayAgg.get(key);
      const pnl = entry?.pnl ?? 0;
      const count = entry?.trades?.length ?? 0;
      cells.push({ kind: "day", key, day, pnl, count });
    }

    return cells;
  }, [cursor.year, cursor.monthIndex, dayAgg]);

  useEffect(() => {
    const firstKey = `${cursor.year}-${pad2(cursor.monthIndex + 1)}-01`;
    const todayKey = toDayKey(new Date());
    const active = todayKey.startsWith(`${cursor.year}-${pad2(cursor.monthIndex + 1)}-`)
      ? todayKey
      : firstKey;
    setSelectedDayKey(active);
  }, [cursor.year, cursor.monthIndex]);

  const selected = dayAgg.get(selectedDayKey) || { pnl: 0, trades: [] };
  const monthLabel = new Date(cursor.year, cursor.monthIndex, 1).toLocaleString(
    "en-US",
    { month: "long", year: "numeric" },
  );

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-zinc-800/60 bg-gradient-to-b from-zinc-950/30 to-zinc-950/70 p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-sm text-zinc-400">Monthly overview</div>
            <div className="mt-1 text-2xl font-semibold tracking-tight text-white">
              Trades
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setCursor((c) => addMonths(c.year, c.monthIndex, -1))}
              className="inline-flex items-center justify-center rounded-xl border border-zinc-800/70 bg-zinc-950/40 p-2 text-zinc-100 hover:bg-zinc-900/40 focus:outline-none focus:ring-2 focus:ring-zinc-700/60"
              aria-label="Previous month"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <div className="min-w-[12ch] text-center text-sm font-semibold text-white">
              {monthLabel}
            </div>
            <button
              type="button"
              onClick={() => setCursor((c) => addMonths(c.year, c.monthIndex, 1))}
              className="inline-flex items-center justify-center rounded-xl border border-zinc-800/70 bg-zinc-950/40 p-2 text-zinc-100 hover:bg-zinc-900/40 focus:outline-none focus:ring-2 focus:ring-zinc-700/60"
              aria-label="Next month"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {error ? (
          <div className="mt-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-200">
            {error}
          </div>
        ) : null}

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-zinc-800/70 bg-gradient-to-b from-zinc-900/70 to-zinc-950/40 p-5">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-zinc-300">Month PnL</div>
              <InformationCircleIcon className="h-5 w-5 text-zinc-500" />
            </div>
            <div className="mt-2 text-3xl font-semibold tracking-tight text-white">
              {money.format(monthSummary.pnl)}
            </div>
            <div className="mt-2 text-sm text-zinc-400">
              {loading ? "Loading tradesâ€¦" : `${monthSummary.totalTrades} trades`}
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-800/70 bg-gradient-to-b from-zinc-900/70 to-zinc-950/40 p-5">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-zinc-300">Win rate</div>
              <InformationCircleIcon className="h-5 w-5 text-zinc-500" />
            </div>
            <div className="mt-2 text-3xl font-semibold tracking-tight text-white">
              {monthSummary.winRate.toFixed(2)}%
            </div>
            <div className="mt-2 text-sm text-zinc-400">
              {monthSummary.wins}W Â· {monthSummary.losses}L Â· {monthSummary.be}BE
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-800/70 bg-gradient-to-b from-zinc-900/70 to-zinc-950/40 p-5">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-zinc-300">Selected day</div>
              <InformationCircleIcon className="h-5 w-5 text-zinc-500" />
            </div>
            <div className="mt-2 text-3xl font-semibold tracking-tight text-white">
              {money.format(selected.pnl)}
            </div>
            <div className="mt-2 text-sm text-zinc-400">
              {selectedDayKey} Â· {selected.trades.length} trades
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="rounded-3xl border border-zinc-800/70 bg-gradient-to-b from-zinc-900/70 to-zinc-950/40 p-5 lg:col-span-3">
          <div className="grid grid-cols-7 gap-2 text-xs font-semibold text-zinc-400">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <div key={d} className="px-1 py-1 text-center">
                {d}
              </div>
            ))}
          </div>

          <div className="mt-2 grid grid-cols-7 gap-2">
            {calendar.map((cell) => {
              if (cell.kind === "blank") {
                return <div key={cell.key} className="h-20" />;
              }

              const isSelected = cell.key === selectedDayKey;
              const boxClass = getDayCellClass(cell.pnl);
              const pnlText =
                cell.pnl > 0
                  ? "text-emerald-200"
                  : cell.pnl < 0
                    ? "text-rose-200"
                    : "text-zinc-300";

              return (
                <button
                  key={cell.key}
                  type="button"
                  onClick={() => setSelectedDayKey(cell.key)}
                  className={[
                    "group relative flex h-20 flex-col rounded-2xl border p-3 text-left transition",
                    boxClass,
                    isSelected ? "ring-2 ring-blue-500/50" : "hover:bg-zinc-900/40",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between">
                    <div className="text-sm font-semibold text-white">
                      {cell.day}
                    </div>
                    {cell.count ? (
                      <div className="rounded-full bg-zinc-950/40 px-2 py-0.5 text-xs font-semibold text-zinc-200 ring-1 ring-zinc-800/70">
                        {clamp(cell.count, 0, 99)}
                      </div>
                    ) : null}
                  </div>
                  <div className={["mt-auto text-xs font-semibold", pnlText].join(" ")}>
                    {cell.count ? money.format(cell.pnl) : "No trades"}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-800/70 bg-gradient-to-b from-zinc-900/70 to-zinc-950/40 p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-zinc-300">
                Trades on {selectedDayKey}
              </div>
              <div className="mt-1 text-xs text-zinc-500">
                {selected.trades.length ? "Sorted newest first" : "No trades"}
              </div>
            </div>
            <InformationCircleIcon className="h-5 w-5 text-zinc-500" />
          </div>

          <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-800/60">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-950/60 text-xs text-zinc-400">
                <tr>
                  <th className="px-4 py-3 font-semibold">Pair</th>
                  <th className="px-4 py-3 font-semibold">Side</th>
                  <th className="px-4 py-3 font-semibold">Result</th>
                  <th className="px-4 py-3 font-semibold">R:R</th>
                  <th className="px-4 py-3 font-semibold">PnL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {selected.trades.map((t) => {
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

                {!loading && selected.trades.length === 0 ? (
                  <tr>
                    <td
                      className="px-4 py-8 text-center text-sm text-zinc-400"
                      colSpan={5}
                    >
                      No trades on this day.
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

export default TradesMonth;

