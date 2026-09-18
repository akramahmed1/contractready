import Link from "next/link";
import type { Metadata } from "next";
import PricingCards from "@/components/marketing/PricingCards";

export const metadata: Metadata = {
  title: "Pricing | ContractReady",
  description:
    "SAM.gov registration is free. We charge only for optional training, bid tools, and step-by-step guidance. Compare plans: Free, Starter $39.99, Bid Kit $79.99, Growth $149, Annual Pro $499.99, Two-Year All Access $1,499.",
};

const bidKitIncludes = [
  "A summary of the opportunity and buyer",
  "Eligibility and qualification checkpoints",
  "Required-document checklist",
  "Deadline and submission-method checklist",
  "Instructions organized from the solicitation",
  "Relevant reusable templates",
  "A final self-check list before the customer submits",
];

const bidKitExcludes = [
  "Proposal writing, proposal review, legal advice, or accounting advice",
  "Certification, representation before an agency, or bid submission on the customer's behalf",
];

const boundaries = [
  "Paying for SAM.gov registration, which is free on the official website",
  "Accessing, requesting, storing, or using a customer's login credentials",
  "Creating or controlling a customer's Login.gov or SAM.gov account",
  "Completing attestations or certifications on the customer's behalf",
  "Forming or filing an LLC or other entity",
  "Paying state filing, licensing, registration, bonding, insurance, or government fees",
  "Writing, rewriting, or reviewing a proposal",
  "Submitting a registration, bid, quote, proposal, or certification",
  "Phone calls or SMS support",
  "Legal, tax, accounting, or financial advice",
  "A guarantee of registration, eligibility, responsiveness, award, revenue, or profit",
];

const planRules = [
  {
    title: "One business",
    body: "Each purchase covers one company, LLC, or other legal entity. A second entity requires a separate plan.",
  },
  {
    title: "Access period",
    body: "A 12-month plan begins on the purchase date. The Two-Year All Access plan begins on the purchase date and runs for 24 months.",
  },
  {
    title: "Bid Kit use",
    body: "One Bid Kit applies to one selected solicitation. Revised solicitations and official amendments remain part of the same project. A different solicitation uses another Bid Kit.",
  },
  {
    title: "Expiration",
    body: "Unused Bid Kits expire when the plan ends. They do not roll over into a renewed plan. The Two-Year All Access plan permits up to 10 Bid Kits in each 12-month period.",
  },
  {
    title: "Renewal",
    body: "Plans do not renew automatically. Customers may purchase a new term when the current term ends. Renewal pricing is the price displayed at the time of renewal.",
  },
  {
    title: "Active opportunities",
    body: "A match is based on information available when the opportunity is reviewed. Agencies and prime contractors may amend, postpone, cancel, or close opportunities at any time.",
  },
  {
    title: "Customer responsibility",
    body: "The customer makes every final representation, certification, pricing decision, and submission. The official solicitation and its amendments always control.",
  },
];

export default function PricingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#0f3d2e] text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">
            Start bidding with a clear plan
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-200">
            SAM.gov registration is free. We charge only for optional training, bid
            tools, and step-by-step guidance.
          </p>
          <p className="mt-4 max-w-2xl text-slate-200">
            You can register directly through the official government website at no cost.
            If you would rather not work through the process alone, choose a plan below.
          </p>
          <a
            href="http://sam.gov/entity-information"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-lg bg-[#c8a24a] px-6 py-3 text-sm font-bold text-[#0f3d2e] hover:bg-[#b8913f]"
          >
            Register directly at SAM.gov for free
          </a>
          <p className="mt-6 max-w-3xl rounded-lg bg-white/10 p-4 text-sm leading-relaxed text-slate-200">
            <strong className="text-white">Important:</strong> We are an independent
            private education and guidance service. We are not a government agency, are
            not affiliated with SAM.gov, and cannot guarantee registration approval, bid
            acceptance, contract awards, revenue, or business results.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Choose your plan</h2>
          <p className="mt-2 text-slate-600">
            One-time payments. No auto-renewal. Each purchase covers one business.
          </p>
          <div className="mt-8">
            <PricingCards />
          </div>
        </div>
      </section>

      {/* What is a Bid Kit */}
      <section id="what-is-a-bid-kit" className="scroll-mt-20">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            What is a Bid Kit?
          </h2>
          <p className="mt-4 leading-relaxed text-slate-700">
            A Bid Kit is an educational package for one selected, active solicitation. It
            may include:
          </p>
          <ul className="mt-4 space-y-2 text-slate-700">
            {bidKitIncludes.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true" className="mt-0.5 text-[#0f3d2e]">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-xl bg-amber-50 p-5 ring-1 ring-amber-200">
            <p className="font-semibold text-slate-900">A Bid Kit does not include:</p>
            <ul className="mt-2 space-y-2 text-sm text-slate-700">
              {bidKitExcludes.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true" className="mt-0.5 text-amber-700">
                    ✕
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 leading-relaxed text-slate-700">
            The customer remains responsible for reading the complete official
            solicitation, amendments, attachments, and agency instructions before
            submitting.
          </p>
        </div>
      </section>

      {/* Boundaries */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Clear boundaries on every plan
          </h2>
          <p className="mt-4 leading-relaxed text-slate-700">
            To protect customers and keep expectations honest, no plan includes:
          </p>
          <ul className="mt-4 space-y-2 text-slate-700">
            {boundaries.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true" className="mt-0.5 text-slate-400">
                  ✕
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 leading-relaxed text-slate-700">
            All guidance is educational and delivered through the website, training
            library, templates, and member portal.
          </p>
        </div>
      </section>

      {/* Plan rules */}
      <section>
        <div className="mx-auto max-w-4xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Plan rules</h2>
          <div className="mt-6 space-y-4">
            {planRules.map((rule) => (
              <div key={rule.title} className="rounded-xl bg-white p-5 ring-1 ring-slate-200">
                <h3 className="font-bold text-slate-900">{rule.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-700">{rule.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14-day guarantee */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <div className="rounded-2xl bg-[#0f3d2e] p-8 text-white">
            <h2 className="text-2xl font-bold sm:text-3xl">14-day guarantee</h2>
            <p className="mt-4 leading-relaxed text-slate-200">
              Try any paid plan for 14 calendar days. If it is not right for you, request
              a refund within 14 calendar days of purchase.
            </p>
            <p className="mt-3 leading-relaxed text-slate-200">
              The refund policy, eligibility rules, and request method are displayed
              before checkout and accepted at purchase. Refunds do not change the
              customer&apos;s obligation to protect government information, third-party
              materials, and intellectual property already received.
            </p>
            <Link
              href="/legal/refunds"
              className="mt-6 inline-block rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-[#0f3d2e] hover:bg-slate-100"
            >
              Read the refund policy
            </Link>
          </div>
        </div>
      </section>

      {/* Checkout acknowledgment */}
      <section>
        <div className="mx-auto max-w-4xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            What you confirm at checkout
          </h2>
          <p className="mt-4 leading-relaxed text-slate-700">
            Before payment, you will be required to confirm the following statement.
            Enforcement happens at checkout; this page shows the exact text so there are
            no surprises.
          </p>
          <blockquote className="mt-6 rounded-xl bg-slate-50 p-6 text-slate-800 ring-1 ring-slate-200">
            <p className="leading-relaxed">
              “I understand that SAM.gov registration is free. I am purchasing
              independent training, tools, templates, and guidance. I will control my
              own government accounts and credentials, make my own certifications and
              pricing decisions, and submit my own registrations and bids. I understand
              that no registration, bid, contract, revenue, or profit is guaranteed.”
            </p>
          </blockquote>
        </div>
      </section>

      {/* FAQ link */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center">
          <h2 className="text-2xl font-bold text-slate-900">Still have questions?</h2>
          <p className="mt-3 text-slate-600">
            Our FAQ covers SAM.gov fees, affiliation, LLCs, Bid Kit limits, support
            channels, and renewal.
          </p>
          <Link
            href="/faq"
            className="mt-6 inline-block rounded-lg bg-[#0f3d2e] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0c3125]"
          >
            Read the FAQ
          </Link>
        </div>
      </section>

      {/* Footer disclosure */}
      <section>
        <div className="mx-auto max-w-4xl px-4 py-10">
          <div className="rounded-lg bg-white p-4 text-xs leading-relaxed text-slate-600 ring-1 ring-slate-200">
            <p>
              <strong className="text-slate-800">Disclosure:</strong> SAM.gov is an
              official website of the United States government and is free to use. This
              website is an independent private education and guidance service. It is
              not affiliated with or endorsed by SAM.gov or any government agency.
              Government registrations, certifications, and contract awards are
              controlled by the responsible agencies. Results vary, and no outcome is
              guaranteed.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
