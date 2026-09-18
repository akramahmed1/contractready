"use client";

import { useEffect, useState } from "react";

interface Profile {
  companyName: string | null;
  naicsCodes: string | null;
  certifications: string | null;
  state: string | null;
  keywords: string | null;
  capacityNotes: string | null;
}

const EMPTY: Profile = {
  companyName: null,
  naicsCodes: null,
  certifications: null,
  state: null,
  keywords: null,
  capacityNotes: null,
};

export default function OpportunityProfileForm({ onSaved }: { onSaved: () => void }) {
  const [form, setForm] = useState<Profile>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/opportunity-profile")
      .then((r) => r.json())
      .then((data) => {
        if (data && data.profile) {
          setForm({
            companyName: data.profile.companyName,
            naicsCodes: data.profile.naicsCodes,
            certifications: data.profile.certifications,
            state: data.profile.state,
            keywords: data.profile.keywords,
            capacityNotes: data.profile.capacityNotes,
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function set<K extends keyof Profile>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch("/api/opportunity-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data && data.ok === true) {
        setMessage("Profile saved. Your search pack is updated below.");
        onSaved();
      } else {
        setError(
          (data && typeof data.error === "string" && data.error) ||
            "Could not save your profile. Please try again."
        );
      }
    } catch {
      setError("Could not save your profile. Please check your connection and try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="mt-4 text-sm text-slate-600">Loading your profile...</p>;
  }

  const input =
    "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-emerald-800 focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4" noValidate>
      {error && (
        <div role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-900 ring-1 ring-red-200">
          {error}
        </div>
      )}
      {message && (
        <div role="status" className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-900 ring-1 ring-green-200">
          {message}
        </div>
      )}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="opp-company" className="text-sm font-semibold text-slate-800">
            Company name
          </label>
          <input
            id="opp-company"
            className={input}
            value={form.companyName ?? ""}
            onChange={(e) => set("companyName", e.target.value)}
            maxLength={120}
            autoComplete="organization"
          />
        </div>
        <div>
          <label htmlFor="opp-state" className="text-sm font-semibold text-slate-800">
            State (2-letter code)
          </label>
          <input
            id="opp-state"
            className={input}
            value={form.state ?? ""}
            onChange={(e) => set("state", e.target.value.toUpperCase())}
            maxLength={2}
            placeholder="TX"
            autoComplete="off"
          />
        </div>
      </div>
      <div>
        <label htmlFor="opp-naics" className="text-sm font-semibold text-slate-800">
          NAICS codes <span className="font-normal text-slate-500">(required, 1 to 5, comma-separated)</span>
        </label>
        <input
          id="opp-naics"
          className={input}
          value={form.naicsCodes ?? ""}
          onChange={(e) => set("naicsCodes", e.target.value)}
          placeholder="541511, 541512"
          autoComplete="off"
        />
      </div>
      <div>
        <label htmlFor="opp-certs" className="text-sm font-semibold text-slate-800">
          Certifications or set-aside status
        </label>
        <input
          id="opp-certs"
          className={input}
          value={form.certifications ?? ""}
          onChange={(e) => set("certifications", e.target.value)}
          placeholder="Small business, 8(a), HUBZone, SDVOSB, WOSB, or none yet"
          autoComplete="off"
        />
        <p className="mt-1 text-xs text-slate-500">
          List only certifications you currently hold. Applications in progress do not count.
        </p>
      </div>
      <div>
        <label htmlFor="opp-keywords" className="text-sm font-semibold text-slate-800">
          Service keywords <span className="font-normal text-slate-500">(required, 1 to 8, comma-separated)</span>
        </label>
        <input
          id="opp-keywords"
          className={input}
          value={form.keywords ?? ""}
          onChange={(e) => set("keywords", e.target.value)}
          placeholder="IT consulting, help desk support, network installation"
          autoComplete="off"
        />
      </div>
      <div>
        <label htmlFor="opp-capacity" className="text-sm font-semibold text-slate-800">
          Capacity notes <span className="font-normal text-slate-500">(optional)</span>
        </label>
        <textarea
          id="opp-capacity"
          className={input}
          rows={3}
          value={form.capacityNotes ?? ""}
          onChange={(e) => set("capacityNotes", e.target.value)}
          maxLength={1000}
          placeholder="Team size, bonding capacity, geographic reach, anything that shapes which opportunities fit."
        />
      </div>
      <button
        type="submit"
        disabled={saving}
        className="rounded-lg bg-emerald-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save profile and build my search pack"}
      </button>
    </form>
  );
}
