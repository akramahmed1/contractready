"use client";

import { useState } from "react";

interface Mismatch {
  stripeSessionId: string;
  amountCents: number | null;
  customerEmail: string | null;
  tier: string | null;
  userId: string | null;
  createdAt: string;
}

interface Result {
  checked: number;
  matched: number;
  mismatches: Mismatch[];
  stripeReachable: boolean;
  error?: string;
}

export default function ReconcilePanel() {
  const [days, setDays] = useState("7");
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function run() {
    setRunning(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/admin/reconcile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ days: Number(days) || 7 }),
      });
      const data = (await res.json()) as Result & { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Reconciliation failed.");
        return;
      }
      setResult(data);
    } catch {
      setError("Reconciliation failed. Please try again.");
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 p-5">
      <p className="text-sm text-slate-600">
        Compares paid Stripe Checkout sessions against recorded purchases. Catches the
        case where a buyer paid but the webhook never recorded the purchase.
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <label className="text-sm text-slate-700">
          Look back{" "}
          <input
            type="number"
            min={1}
            max={90}
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="w-16 rounded border border-slate-300 px-2 py-1 text-sm"
          />{" "}
          days
        </label>
        <button
          type="button"
          onClick={run}
          disabled={running}
          className="rounded-lg bg-[#0f3d2e] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
        >
          {running ? "Running…" : "Run reconciliation"}
        </button>
      </div>

      {error && <p className="mt-3 text-sm font-semibold text-red-700">{error}</p>}

      {result && (
        <div className="mt-4">
          <p className="text-sm text-slate-700">
            Checked <strong>{result.checked}</strong> paid session
            {result.checked === 1 ? "" : "s"}; <strong>{result.matched}</strong> matched
            a purchase record.
            {!result.stripeReachable && " (Stripe was not reachable.)"}
          </p>
          {result.mismatches.length > 0 ? (
            <div className="mt-3 rounded-lg bg-red-50 p-4 ring-1 ring-red-200">
              <p className="font-bold text-red-900">
                {result.mismatches.length} paid session
                {result.mismatches.length === 1 ? "" : "s"} with no purchase record
              </p>
              <ul className="mt-2 space-y-2 text-sm text-red-800">
                {result.mismatches.map((m) => (
                  <li key={m.stripeSessionId}>
                    <span className="font-mono">{m.stripeSessionId}</span>
                    {", "}
                    {m.amountCents != null ? `$${(m.amountCents / 100).toFixed(2)}` : "unknown amount"}
                    {m.customerEmail ? `, ${m.customerEmail}` : ""}
                    {m.tier ? `, tier: ${m.tier}` : ""}
                    <br />
                    <span className="text-red-700">
                      Paid {new Date(m.createdAt).toLocaleString()}. Grant access manually
                      from the Stripe dashboard, then record the purchase.
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="mt-3 text-sm font-semibold text-emerald-800">
              All clear: every paid session has a matching purchase record.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
