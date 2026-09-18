"use client";

import { useState } from "react";

export default function BidKitRequestForm({ remaining }: { remaining: number }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const [left, setLeft] = useState(remaining);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/bid-kits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ solicitationTitle: title, solicitationUrl: url }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data && data.ok === true) {
        setStatus("done");
        setTitle("");
        setUrl("");
        if (data.allowance && typeof data.allowance.remaining === "number") {
          setLeft(data.allowance.remaining);
        } else {
          setLeft((n) => Math.max(0, n - 1));
        }
      } else {
        setStatus("error");
        setMessage(
          (data && typeof data.error === "string" && data.error) ||
            "Something went wrong. Please try again."
        );
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please check your connection and try again.");
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900">Request a bid kit</h2>
      <p className="mt-1 text-sm text-slate-600">
        You have <strong>{left}</strong> bid kit{left === 1 ? "" : "s"} left in your current
        plan period. One bid kit covers one solicitation.
      </p>

      {status === "done" && (
        <div role="status" className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-900 ring-1 ring-green-200">
          Request received. We will review the solicitation and prepare your bid kit.
          You can follow its progress in the history below.
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-4 space-y-4" noValidate>
        <div>
          <label htmlFor="bk-title" className="block text-sm font-semibold text-slate-900">
            Solicitation title
          </label>
          <input
            id="bk-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={200}
            required
            placeholder="e.g. Janitorial services, Fort Hood TX"
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0f3d2e] focus:outline-none focus:ring-1 focus:ring-[#0f3d2e]"
          />
        </div>
        <div>
          <label htmlFor="bk-url" className="block text-sm font-semibold text-slate-900">
            Solicitation link <span className="font-normal text-slate-500">(optional)</span>
          </label>
          <input
            id="bk-url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            maxLength={500}
            placeholder="https://sam.gov/..."
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0f3d2e] focus:outline-none focus:ring-1 focus:ring-[#0f3d2e]"
          />
        </div>
        {status === "error" && (
          <p role="alert" className="text-sm text-red-700">
            {message}
          </p>
        )}
        <button
          type="submit"
          disabled={status === "sending" || left <= 0}
          className="rounded-lg bg-[#0f3d2e] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#0c3125] disabled:cursor-wait disabled:opacity-60"
        >
          {status === "sending" ? "Submitting..." : "Submit request"}
        </button>
      </form>
    </div>
  );
}
