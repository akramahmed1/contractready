import Link from "next/link";
import type { Metadata } from "next";
import { logEvent } from "@/lib/analytics";

export const metadata: Metadata = {
  title: "How it works | ContractReady",
  description:
    "The end-to-end journey: start free or pick a plan, register on SAM.gov with guidance, find federal, state, and subcontract opportunities, and use bid kits to submit correctly.",
};

const stages = [
  {
    step: "Stage 1",
    title: "Start free or pick a plan",
    body: "Begin with the free SAM.gov preparation checklist, which you can complete on your own at no cost. If you want a guide, pick a plan: Starter walks you through SAM.gov registration, and the higher plans add Bid Kits, opportunity matching, and deeper training. Every plan covers one business and never renews automatically.",
    cta: { label: "Compare plans", href: "/pricing" },
  },
  {
    step: "Stage 2",
    title: "Register on SAM.gov with guidance",
    body: "You create your own Login.gov and SAM.gov accounts, answer the official questions, and submit your own registration. Our walkthrough shows you what information and documents to prepare, how to pick NAICS codes, and how to avoid the common errors that cause rejections and weeks of rework. We never touch your credentials or submit anything on your behalf.",
    cta: { label: "Get the free checklist", href: "/free-checklist" },
  },
  {
    step: "Stage 3",
    title: "Find opportunities",
    body: "Once you are registered, you can pursue three paths: federal contracts posted on SAM.gov, state and local contracts on state procurement portals, and subcontracting work under prime contractors. Our training covers saved-search setup, state portal routines, NAICS-focused searching, and a playbook for finding and approaching primes. Growth and higher plans add opportunity matching based on your business profile.",
    cta: { label: "See Bid Kit plans", href: "/pricing" },
  },
  {
    step: "Stage 4",
    title: "Use bid kits to submit correctly",
    body: "For each opportunity you want to pursue, request a Bid Kit. We turn the solicitation into a plain-language summary, eligibility checkpoints, a required-document checklist, deadline and submission instructions, and a final self-check list. You then prepare, verify, price, and submit the response yourself. One Bid Kit applies to one solicitation; amendments to that solicitation stay part of the same kit.",
    cta: { label: "What is a Bid Kit?", href: "/pricing#what-is-a-bid-kit" },
  },
];

export default function HowItWorksPage() {
  // First-party page view, no cookies. Fire-and-forget.
  logEvent("how_it_works_view", "/how-it-works", null);
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#0f3d2e] text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#c8a24a]">
            How it works
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">
            The full journey, with no mystery about what happens next.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-200">
            Four stages take you from never having heard of SAM.gov to submitting your
            first bid. You stay in control of every account, certification, and
            submission along the way.
          </p>
        </div>
      </section>

      {/* Stages */}
      <section>
        <div className="mx-auto max-w-4xl px-4 py-14">
          <ol className="space-y-8">
            {stages.map((stage, index) => (
              <li
                key={stage.title}
                className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0f3d2e] text-lg font-extrabold text-white"
                  >
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-[#0f3d2e]">
                      {stage.step}
                    </p>
                    <h2 className="mt-1 text-2xl font-bold text-slate-900">
                      {stage.title}
                    </h2>
                    <p className="mt-3 leading-relaxed text-slate-700">{stage.body}</p>
                    <Link
                      href={stage.cta.href}
                      className="mt-4 inline-block text-sm font-semibold text-[#0f3d2e] hover:underline"
                    >
                      {stage.cta.label} →
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Honest timeline */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900">An honest timeline</h2>
            <p className="mt-3 leading-relaxed text-slate-700">
              Based on industry research, going from zero to your first submitted bid
              typically takes 4 to 8 weeks when you are not pursuing special
              certifications. Most of that time is the government&apos;s review of your
              SAM.gov registration (usually 10 to 12 business days) plus the learning
              curve of reading and understanding solicitations.
            </p>
            <p className="mt-3 leading-relaxed text-slate-700">
              Our walkthroughs and Bid Kits are designed to shrink the parts you control:
              avoiding registration rejections, finding the right opportunities faster,
              and turning a solicitation into a clear submission plan. The parts we do
              not control (agency review times, amendments, award decisions) still take
              as long as they take.
            </p>
            <p className="mt-3 text-sm text-slate-600">
              If you need certifications such as 8(a), HUBZone, or SDVOSB, expect the
              overall process to take longer. Our plans cover education and guidance;
              certification decisions rest entirely with the agencies.
            </p>
          </div>
        </div>
      </section>

      {/* What we will not do */}
      <section>
        <div className="mx-auto max-w-4xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900">What we will not do, ever</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              "Touch, request, or store your login credentials",
              "Create or control your Login.gov or SAM.gov account",
              "Complete attestations or certifications on your behalf",
              "Form or file your LLC or pay your state fees",
              "Write, rewrite, or review your proposal",
              "Submit your registration, bid, quote, or proposal",
              "Provide legal, tax, accounting, or financial advice",
              "Guarantee registration approval, compliance, or awards",
            ].map((item) => (
              <div
                key={item}
                className="flex gap-3 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200"
              >
                <span aria-hidden="true" className="font-bold text-slate-400">
                  ✕
                </span>
                <p className="text-sm text-slate-700">{item}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-600">
            All guidance is educational and delivered through the website, training
            library, templates, and the member portal.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0f3d2e] text-white">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center">
          <h2 className="text-3xl font-extrabold">Ready to start the journey?</h2>
          <p className="mt-4 text-slate-200">
            Begin with the free checklist, or pick the plan that matches how much
            guidance you want.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/free-checklist"
              className="rounded-lg bg-[#c8a24a] px-6 py-3 text-sm font-bold text-[#0f3d2e] hover:bg-[#b8913f]"
            >
              Get the free checklist
            </Link>
            <Link
              href="/pricing"
              className="rounded-lg px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/60 hover:bg-white/10"
            >
              Compare plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
