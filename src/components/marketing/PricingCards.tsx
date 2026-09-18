"use client";

import { useState } from "react";
import { PAID_TIERS } from "@/lib/tiers";

const PLAN_FEATURES: Record<string, string[]> = {
  starter: [
    "Step-by-step SAM.gov registration training",
    "Written and video walkthroughs",
    "Information and document preparation checklist",
    "Guidance on selecting relevant NAICS codes",
    "Common-error and rejection-prevention guide",
    "Bonus state LLC formation walkthrough",
    "Access to training and updates for 12 months",
  ],
  bidkit: [
    "Everything in Starter",
    "Up to 5 Bid Kits during the 12-month access period",
    "Opportunity matching based on your business profile and capabilities",
    "A requirements checklist for each selected opportunity",
    "A submission walkthrough based on the solicitation",
    "Reusable bid application templates",
    "Written guidance through the member portal",
    "Guidance for prime-contract and subcontract opportunities",
  ],
  growth: [
    "Everything in Bid Kit",
    "Up to 10 Bid Kits during the 12-month access period",
    "More opportunity-matching capacity",
    "Written member-portal guidance",
  ],
  pro: [
    "Everything in Growth",
    "Up to 10 Bid Kits during the 12-month access period",
    "Training on finding federal, state, local, and subcontract opportunities",
    "SAM.gov saved-search setup guidance",
    "State procurement portal search routines",
    "NAICS-focused opportunity-search guidance",
    "Subcontracting playbook for finding and approaching prime contractors",
    "Bid submission process training",
    "Full template and training library",
    "Priority written guidance through the member portal",
  ],
  allaccess: [
    "Everything in Annual Pro",
    "Up to 20 Bid Kits across the 24-month term (max 10 per 12-month period)",
    "Full training and template updates during the active term",
    "Priority written guidance through the member portal",
  ],
};

export default function PricingCards() {
  const [pendingTier, setPendingTier] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout(tier: string) {
    setPendingTier(tier);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data || typeof data.url !== "string") {
        throw new Error(
          (data && typeof data.error === "string" && data.error) ||
            "Checkout could not be started. Please try again."
        );
      }
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
      setPendingTier(null);
    }
  }

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Free plan */}
        <div className="flex flex-col rounded-2xl bg-white p-6 ring-1 ring-slate-200">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Free</p>
          <h3 className="mt-1 text-xl font-bold text-slate-900">The Honest Start</h3>
          <p className="mt-2 text-sm text-slate-600">
            For business owners who want to handle everything themselves.
          </p>
          <p className="mt-4 text-3xl font-extrabold text-slate-900">$0</p>
          <ul className="mt-4 flex-1 space-y-2 text-sm text-slate-700">
            <li>Direct access to the official SAM.gov registration page</li>
            <li>Basic registration preparation checklist</li>
            <li>Links to free government contracting assistance</li>
            <li>No personalized guidance or support</li>
          </ul>
          <a
            href="http://sam.gov/entity-information"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 rounded-lg bg-white px-4 py-2.5 text-center text-sm font-semibold text-[#0f3d2e] ring-1 ring-[#0f3d2e] hover:bg-slate-50"
          >
            Start free at SAM.gov
          </a>
        </div>

        {/* Paid plans */}
        {PAID_TIERS.map((tier) => (
          <div
            key={tier.id}
            className="flex flex-col rounded-2xl bg-white p-6 ring-1 ring-slate-200"
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-[#0f3d2e]">
              {tier.termMonths === 24 ? "24-month term" : "12-month term"}
            </p>
            <h3 className="mt-1 text-xl font-bold text-slate-900">{tier.name}</h3>
            <p className="mt-2 text-sm text-slate-600">{tier.bestFor}</p>
            <p className="mt-4 text-3xl font-extrabold text-slate-900">
              {tier.priceLabel.split(" ")[0]}
              <span className="ml-1 text-sm font-medium text-slate-500">one time</span>
            </p>
            <ul className="mt-4 flex-1 space-y-2 text-sm text-slate-700">
              {(PLAN_FEATURES[tier.id] ?? []).map((feature) => (
                <li key={feature} className="flex gap-2">
                  <span aria-hidden="true" className="mt-0.5 text-[#0f3d2e]">
                    ✓
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => startCheckout(tier.id)}
              disabled={pendingTier !== null}
              className="mt-6 rounded-lg bg-[#0f3d2e] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0c3125] disabled:cursor-wait disabled:opacity-60"
            >
              {pendingTier === tier.id ? "Starting checkout..." : tier.cta}
            </button>
          </div>
        ))}
      </div>

      {error && (
        <div
          role="alert"
          className="mx-auto mt-6 max-w-2xl rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800 ring-1 ring-red-200"
        >
          {error}
        </div>
      )}

      <p className="mt-6 text-center text-xs text-slate-500">
        Each purchase covers one company, LLC, or other legal entity. Plans do not renew
        automatically.
      </p>
    </div>
  );
}
