"use client";

import { useState } from "react";

/** Toggles a lesson between started and completed via /api/progress. */
export default function MarkCompleteButton({
  slug,
  initialStatus,
}: {
  slug: string;
  initialStatus: "started" | "completed";
}) {
  const [status, setStatus] = useState(initialStatus);
  const [busy, setBusy] = useState(false);

  async function toggle() {
    setBusy(true);
    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, action: status === "completed" ? "reopen" : "complete" }),
      });
      if (res.ok) {
        const data = await res.json();
        setStatus(data.status === "completed" ? "completed" : "started");
      }
    } finally {
      setBusy(false);
    }
  }

  if (status === "completed") {
    return (
      <div className="mt-8 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
        <span className="text-sm font-semibold text-emerald-900">Completed</span>
        <button
          onClick={toggle}
          disabled={busy}
          className="text-sm font-semibold text-emerald-800 underline disabled:opacity-50"
        >
          Mark as not done
        </button>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <button
        onClick={toggle}
        disabled={busy}
        className="rounded-lg bg-emerald-900 px-6 py-3 font-semibold text-white hover:bg-emerald-800 disabled:opacity-50"
      >
        {busy ? "Saving..." : "Mark lesson complete"}
      </button>
    </div>
  );
}
