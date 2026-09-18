"use client";

import { useState } from "react";
import Link from "next/link";

type Status = "idle" | "sending" | "done" | "error";

export default function ChecklistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!isValidEmail(trimmed)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/free-checklist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data && data.ok === true) {
        setStatus("done");
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

  if (status === "done") {
    return (
      <div className="rounded-2xl bg-white p-8 text-center ring-1 ring-slate-200">
        <p className="text-2xl" aria-hidden="true">
          ✓
        </p>
        <h2 className="mt-2 text-xl font-bold text-slate-900">Your checklist is ready</h2>
        <p className="mt-2 text-sm text-slate-600">
          Download the free SAM.gov registration prep checklist and work through it at your
          own pace.
        </p>
        <a
          href="/sam-gov-checklist.pdf"
          className="mt-6 inline-block rounded-lg bg-[#0f3d2e] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0c3125]"
        >
          Download the checklist (PDF)
        </a>
        <div className="mt-8 rounded-xl bg-slate-50 p-6 text-left ring-1 ring-slate-200">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#0f3d2e]">
            What&apos;s next
          </p>
          <h3 className="mt-1 text-lg font-bold text-slate-900">
            Want a guide instead of going alone?
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            The Starter Pack ($39.99 one time) walks you through the full SAM.gov
            registration with written and video guidance, a NAICS selection guide, and a
            rejection-prevention checklist, plus a bonus state LLC formation walkthrough.
          </p>
          <Link
            href="/pricing"
            className="mt-4 inline-block rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[#0f3d2e] ring-1 ring-[#0f3d2e] hover:bg-slate-50"
          >
            Get the Starter Pack
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 sm:p-8"
      noValidate
    >
      <label htmlFor="checklist-email" className="block text-sm font-semibold text-slate-900">
        Email address
      </label>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <input
          id="checklist-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@yourbusiness.com"
          autoComplete="email"
          className="w-full flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0f3d2e] focus:outline-none focus:ring-1 focus:ring-[#0f3d2e]"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-lg bg-[#0f3d2e] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#0c3125] disabled:cursor-wait disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : "Send me the checklist"}
        </button>
      </div>
      {status === "error" && (
        <p role="alert" className="mt-3 text-sm text-red-700">
          {message}
        </p>
      )}
      <p className="mt-3 text-xs text-slate-500">
        We&apos;ll email you the checklist and occasional helpful updates. No spam, and
        you can unsubscribe anytime.
      </p>
    </form>
  );
}
