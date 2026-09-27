"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SAM_STATUS_LABELS, type SamStatus } from "@/lib/readiness";

const STATUSES: SamStatus[] = ["not_started", "gathering_docs", "submitted", "active"];

const CHECKBOXES: { key: string; label: string; hint: string }[] = [
  {
    key: "hasSamLogin",
    label: "I have a login.gov account for SAM.gov",
    hint: "The sign-in SAM.gov requires before you can start registration.",
  },
  {
    key: "hasUei",
    label: "I have my Unique Entity ID (UEI)",
    hint: "The 12-character ID SAM.gov assigns your business. Free, no DUNS needed.",
  },
  {
    key: "hasEntity",
    label: "My business entity is formed",
    hint: "LLC, corporation, or registered sole proprietorship, whichever fits.",
  },
  {
    key: "hasNaics",
    label: "I have identified my NAICS codes",
    hint: "The 6-digit industry codes that describe what you sell to the government.",
  },
  {
    key: "hasCapabilityStatement",
    label: "I have drafted a capability statement",
    hint: "The one-page overview buyers and prime contractors ask for first.",
  },
  {
    key: "hasPastPerformance",
    label: "I have documented my past performance",
    hint: "Contracts, subcontracts, and relevant commercial work, written down.",
  },
];

type FormState = Record<string, boolean | SamStatus>;

const DEFAULTS: FormState = {
  samStatus: "not_started",
  hasSamLogin: false,
  hasUei: false,
  hasEntity: false,
  hasNaics: false,
  hasCapabilityStatement: false,
  hasPastPerformance: false,
};

export default function ReadinessForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/readiness")
      .then((r) => r.json())
      .then((data) => {
        if (data && data.assessment) {
          const a = data.assessment;
          setForm({
            samStatus: STATUSES.includes(a.samStatus) ? a.samStatus : "not_started",
            hasSamLogin: a.hasSamLogin === true,
            hasUei: a.hasUei === true,
            hasEntity: a.hasEntity === true,
            hasNaics: a.hasNaics === true,
            hasCapabilityStatement: a.hasCapabilityStatement === true,
            hasPastPerformance: a.hasPastPerformance === true,
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/readiness", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data && data.ok === true) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setError(
          (data && typeof data.error === "string" && data.error) ||
            "Could not save your assessment. Please try again."
        );
      }
    } catch {
      setError("Could not save your assessment. Please check your connection and try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="py-8 text-slate-600">Loading your assessment...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-8">
      <fieldset>
        <legend className="text-lg font-bold text-slate-900">
          Where does your SAM.gov registration stand?
        </legend>
        <p className="mt-1 text-sm text-slate-600">
          Be honest. This only changes your score and your next step, nothing else.
        </p>
        <div className="mt-4 grid gap-3">
          {STATUSES.map((s) => (
            <label
              key={s}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                form.samStatus === s
                  ? "border-emerald-800 bg-emerald-50"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <input
                type="radio"
                name="samStatus"
                checked={form.samStatus === s}
                onChange={() => setForm((f) => ({ ...f, samStatus: s }))}
                className="h-4 w-4 accent-emerald-900"
              />
              <span className="font-semibold text-slate-900">{SAM_STATUS_LABELS[s]}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-lg font-bold text-slate-900">
          Which of these do you already have?
        </legend>
        <div className="mt-4 grid gap-3">
          {CHECKBOXES.map((c) => (
            <label
              key={c.key}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                form[c.key] === true
                  ? "border-emerald-800 bg-emerald-50"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <input
                type="checkbox"
                checked={form[c.key] === true}
                onChange={(e) => setForm((f) => ({ ...f, [c.key]: e.target.checked }))}
                className="mt-1 h-4 w-4 accent-emerald-900"
              />
              <span>
                <span className="block font-semibold text-slate-900">{c.label}</span>
                <span className="mt-0.5 block text-sm text-slate-600">{c.hint}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={saving}
        className="rounded-lg bg-emerald-900 px-6 py-3 font-semibold text-white hover:bg-emerald-800 disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save and see my score"}
      </button>
    </form>
  );
}
