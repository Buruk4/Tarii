import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTrade } from "../../services/api";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const calcRRFromPrices = ({ direction, entry, stopLoss, takeProfit }) => {
  const e = Number(entry);
  const sl = Number(stopLoss);
  const tp = Number(takeProfit);

  if (![e, sl, tp].every((v) => Number.isFinite(v))) return "";

  const riskPerUnit = direction === "Sell" ? sl - e : e - sl;
  const rewardPerUnit = direction === "Sell" ? e - tp : tp - e;

  if (riskPerUnit <= 0 || rewardPerUnit <= 0) return "";
  return (rewardPerUnit / riskPerUnit).toFixed(2);
};

const TradeJournal = () => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    pair: "",
    direction: "Buy",
    entry: "",
    stopLoss: "",
    takeProfit: "",
    risk: "",
    rr: "",
    result: "Win",
    emotions: "",
    lesson: "",
  });

  const estimated = useMemo(() => {
    const risk = Number(form.risk);
    const rr = Number(form.rr);
    if (!Number.isFinite(risk) || risk <= 0) return null;
    if (!Number.isFinite(rr) || rr <= 0) return { win: null, loss: -risk, be: 0 };
    return { win: risk * rr, loss: -risk, be: 0 };
  }, [form.risk, form.rr]);

  const onChange = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const onAutoRR = () => {
    const rr = calcRRFromPrices({
      direction: form.direction,
      entry: form.entry,
      stopLoss: form.stopLoss,
      takeProfit: form.takeProfit,
    });
    if (!rr) {
      setError("Enter valid Entry / Stop Loss / Take Profit to calculate R:R.");
      return;
    }
    setError("");
    setForm((prev) => ({ ...prev, rr }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    const payload = {
      pair: String(form.pair || "")
        .trim()
        .toUpperCase(),
      direction: form.direction,
      entry: Number(form.entry),
      stopLoss: Number(form.stopLoss),
      takeProfit: Number(form.takeProfit),
      risk: Number(form.risk),
      rr: Number(form.rr),
      result: form.result,
      emotions: form.emotions?.trim() || "",
      lesson: form.lesson?.trim() || "",
    };

    const missing = [
      ["pair", payload.pair],
      ["direction", payload.direction],
      ["entry", payload.entry],
      ["stopLoss", payload.stopLoss],
      ["takeProfit", payload.takeProfit],
      ["risk", payload.risk],
      ["rr", payload.rr],
      ["result", payload.result],
    ].filter(([, v]) => v === "" || Number.isNaN(v) || v === undefined);

    if (missing.length) {
      setSaving(false);
      setError(`Missing/invalid fields: ${missing.map(([k]) => k).join(", ")}`);
      return;
    }

    try {
      await createTrade(payload);
      setSuccess("Trade saved.");
      setForm((prev) => ({
        ...prev,
        pair: "",
        entry: "",
        stopLoss: "",
        takeProfit: "",
        risk: "",
        rr: "",
        emotions: "",
        lesson: "",
      }));
      navigate("/dashboard");
    } catch (err) {
      setError(err?.message || "Failed to save trade");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-zinc-800/60 bg-gradient-to-b from-zinc-950/30 to-zinc-950/70 p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-zinc-400">Create a new entry</div>
            <div className="mt-1 text-2xl font-semibold tracking-tight text-white">
              Add Trade
            </div>
          </div>
          <InformationCircleIcon className="h-6 w-6 text-zinc-500" />
        </div>

        {error ? (
          <div className="mt-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-200">
            {error}
          </div>
        ) : null}
        {success ? (
          <div className="mt-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-200">
            {success}
          </div>
        ) : null}
      </div>

      <form
        onSubmit={onSubmit}
        className="grid grid-cols-1 gap-4 lg:grid-cols-3"
      >
        <div className="lg:col-span-2 rounded-3xl border border-zinc-800/70 bg-gradient-to-b from-zinc-900/70 to-zinc-950/40 p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-zinc-300">Pair</label>
              <input
                value={form.pair}
                onChange={onChange("pair")}
                placeholder="e.g. EURUSD"
                className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-950/40 px-3 py-2 text-sm text-white placeholder:text-zinc-600 outline-none focus:ring-2 focus:ring-blue-500/40"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-zinc-300">
                Direction
              </label>
              <select
                value={form.direction}
                onChange={onChange("direction")}
                className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-950/40 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500/40"
              >
                <option>Buy</option>
                <option>Sell</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-zinc-300">Entry</label>
              <input
                value={form.entry}
                onChange={onChange("entry")}
                inputMode="decimal"
                placeholder="1.2345"
                className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-950/40 px-3 py-2 text-sm text-white placeholder:text-zinc-600 outline-none focus:ring-2 focus:ring-blue-500/40"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-zinc-300">
                Stop Loss
              </label>
              <input
                value={form.stopLoss}
                onChange={onChange("stopLoss")}
                inputMode="decimal"
                placeholder="1.2300"
                className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-950/40 px-3 py-2 text-sm text-white placeholder:text-zinc-600 outline-none focus:ring-2 focus:ring-blue-500/40"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-zinc-300">
                Take Profit
              </label>
              <input
                value={form.takeProfit}
                onChange={onChange("takeProfit")}
                inputMode="decimal"
                placeholder="1.2500"
                className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-950/40 px-3 py-2 text-sm text-white placeholder:text-zinc-600 outline-none focus:ring-2 focus:ring-blue-500/40"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-zinc-300">
                Result
              </label>
              <select
                value={form.result}
                onChange={onChange("result")}
                className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-950/40 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500/40"
              >
                <option>Win</option>
                <option>Loss</option>
                <option>BE</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-zinc-300">
                Risk ($)
              </label>
              <input
                value={form.risk}
                onChange={onChange("risk")}
                inputMode="decimal"
                placeholder="e.g. 50"
                className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-950/40 px-3 py-2 text-sm text-white placeholder:text-zinc-600 outline-none focus:ring-2 focus:ring-blue-500/40"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm font-medium text-zinc-300">R:R</label>
              <div className="mt-2 flex gap-2">
                <input
                  value={form.rr}
                  onChange={onChange("rr")}
                  inputMode="decimal"
                  placeholder="e.g. 2"
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950/40 px-3 py-2 text-sm text-white placeholder:text-zinc-600 outline-none focus:ring-2 focus:ring-blue-500/40"
                />
                <button
                  type="button"
                  onClick={onAutoRR}
                  className="shrink-0 rounded-xl border border-zinc-800 bg-zinc-950/40 px-3 py-2 text-sm font-semibold text-zinc-200 hover:bg-zinc-900/50"
                >
                  Auto
                </button>
              </div>
              <div className="mt-2 text-xs text-zinc-500">
                Auto uses prices: (TP-Entry) / (Entry-SL) for Buy, reversed for
                Sell.
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm font-medium text-zinc-300">
                Emotions
              </label>
              <input
                value={form.emotions}
                onChange={onChange("emotions")}
                placeholder="Calm, FOMO, Hesitation…"
                className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-950/40 px-3 py-2 text-sm text-white placeholder:text-zinc-600 outline-none focus:ring-2 focus:ring-blue-500/40"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm font-medium text-zinc-300">
                Lesson
              </label>
              <textarea
                value={form.lesson}
                onChange={onChange("lesson")}
                rows={4}
                placeholder="What did you learn from this trade?"
                className="mt-2 w-full resize-none rounded-xl border border-zinc-800 bg-zinc-950/40 px-3 py-2 text-sm text-white placeholder:text-zinc-600 outline-none focus:ring-2 focus:ring-blue-500/40"
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="rounded-xl border border-zinc-800 bg-zinc-950/40 px-4 py-2 text-sm font-semibold text-zinc-200 hover:bg-zinc-900/50"
            >
              Cancel
            </button>
            <button
              disabled={saving}
              className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save trade"}
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-800/70 bg-gradient-to-b from-zinc-900/70 to-zinc-950/40 p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-zinc-300">Preview</div>
              <div className="mt-1 text-xs text-zinc-500">
                Estimated PnL based on Risk & R:R
              </div>
            </div>
            <InformationCircleIcon className="h-5 w-5 text-zinc-500" />
          </div>

          <div className="mt-5 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">If Win</span>
              <span className="font-semibold text-emerald-300">
                {estimated?.win == null ? "—" : `+$${estimated.win.toFixed(2)}`}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">If Loss</span>
              <span className="font-semibold text-rose-300">
                {estimated?.loss == null ? "—" : `-$${Math.abs(estimated.loss).toFixed(2)}`}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">If BE</span>
              <span className="font-semibold text-zinc-200">
                {estimated?.be == null ? "—" : `$${estimated.be.toFixed(2)}`}
              </span>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-zinc-800/60 bg-zinc-950/40 p-4 text-xs text-zinc-400">
            PnL on Dashboard is calculated as: Win = Risk × R:R, Loss = -Risk,
            BE = 0.
          </div>
        </div>
      </form>
    </div>
  );
};

export default TradeJournal;
