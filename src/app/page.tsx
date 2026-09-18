import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ContractReady | From zero to contract-ready",
  description:
    "SAM.gov registration is free. ContractReady sells the shortcut: step-by-step registration training, bid kits, and written guidance for US small businesses bidding on government contracts.",
};

const tierTeasers = [
  {
    name: "Free",
    price: "$0",
    line: "The honest start. Register directly at SAM.gov with our free preparation checklist.",
    cta: "Start free",
    href: "/free-checklist",
  },
  {
    name: "Starter",
    price: "$39.99",
    line: "A clear SAM.gov registration walkthrough for one business.",
    cta: "Get Starter",
    href: "/pricing",
  },
  {
    name: "Bid Kit",
    price: "$79.99",
    line: "5 Bid Kits. Understand up to five live opportunities before you submit.",
    cta: "Get 5 Bid Kits",
    href: "/pricing",
  },
  {
    name: "Growth",
    price: "$149",
    line: "10 Bid Kits for the business that is actively bidding.",
    cta: "Get 10 Bid Kits",
    href: "/pricing",
  },
  {
    name: "Annual Pro",
    price: "$499.99",
    line: "10 Bid Kits plus training to build a repeatable contracting process.",
    cta: "Choose Pro",
    href: "/pricing",
  },
  {
    name: "All Access",
    price: "$1,499",
    line: "20 Bid Kits across 24 months. For businesses bidding consistently.",
    cta: "Choose All Access",
    href: "/pricing",
  },
];

const stats = [
  {
    value: "$812B",
    label: "Federal prime contract spend, FY2025",
  },
  {
    value: "$183.5B",
    label: "Awarded to small businesses, FY2024 (28.76% of prime spend)",
  },
  {
    value: "$91.1B",
    label: "Small-business subcontracts, FY2025",
  },
  {
    value: "674,000+",
    label: "Entities registered in SAM.gov",
  },
];

const trustItems = [
  {
    title: "We never touch your credentials",
    body: "You create and control your own Login.gov and SAM.gov accounts. We never ask for, store, or use your passwords.",
  },
  {
    title: "We never promise wins",
    body: "No one can guarantee a registration approval, a compliant bid, or a contract award. We will not pretend otherwise.",
  },
  {
    title: "We never submit anything for you",
    body: "You make every certification, pricing decision, and submission yourself. The official solicitation always controls.",
  },
  {
    title: "Written guidance only",
    body: "All support is delivered through the member portal. No phone calls, no SMS, no surprises.",
  },
  {
    title: "Registration itself is always free",
    body: "SAM.gov does not charge a fee. You pay us only for training, tools, templates, and guidance.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#0f3d2e] text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#c8a24a]">
            Honest government contracting guidance
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">
            From zero to contract-ready.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-200">
            SAM.gov registration is free, and we will tell you how to do it on your own.
            If you would rather not work through it alone, we sell the shortcut:
            step-by-step training, bid kits, and written guidance for US small businesses.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/free-checklist"
              className="rounded-lg bg-[#c8a24a] px-6 py-3 text-center text-sm font-bold text-[#0f3d2e] hover:bg-[#b8913f]"
            >
              Get the free SAM.gov checklist
            </Link>
            <Link
              href="/pricing"
              className="rounded-lg px-6 py-3 text-center text-sm font-semibold text-white ring-1 ring-white/60 hover:bg-white/10"
            >
              Compare plans
            </Link>
          </div>
        </div>
      </section>

      {/* Honesty wedge */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Two ways to get registered. We will show you both.
          </h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            Most companies in this industry hide the free path so they can sell you the
            paid one. We do the opposite: here is exactly what the free path looks like,
            and here is what you get if you pay us instead.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                The free path
              </p>
              <h3 className="mt-1 text-xl font-bold text-slate-900">Do it yourself</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li>Register directly at SAM.gov at no cost</li>
                <li>Use our free preparation checklist to gather documents and info</li>
                <li>Follow the official government instructions step by step</li>
                <li>No account with us, no payment, no guidance</li>
              </ul>
              <Link
                href="/free-checklist"
                className="mt-6 inline-block rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[#0f3d2e] ring-1 ring-[#0f3d2e] hover:bg-slate-50"
              >
                Get the free checklist
              </Link>
            </div>
            <div className="rounded-2xl bg-white p-6 ring-2 ring-[#0f3d2e]">
              <p className="text-sm font-semibold uppercase tracking-wide text-[#0f3d2e]">
                The guided path
              </p>
              <h3 className="mt-1 text-xl font-bold text-slate-900">Do it with a guide</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li>Step-by-step SAM.gov registration training, written and video</li>
                <li>NAICS code guidance and a rejection-prevention guide</li>
                <li>Bid Kits that break live solicitations into checklists</li>
                <li>Written guidance through the member portal</li>
              </ul>
              <Link
                href="/pricing"
                className="mt-6 inline-block rounded-lg bg-[#0f3d2e] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0c3125]"
              >
                See plans and pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">How it works</h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            Three stages, in order. Most of the waiting is the government&apos;s review
            time, not ours.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
              <p className="text-sm font-extrabold text-[#0f3d2e]">Step 1</p>
              <h3 className="mt-1 text-lg font-bold text-slate-900">Get registered</h3>
              <p className="mt-2 text-sm text-slate-600">
                Complete your free SAM.gov registration with our walkthrough. Government
                review typically takes 10 to 12 business days. You control your accounts
                and submit everything yourself.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
              <p className="text-sm font-extrabold text-[#0f3d2e]">Step 2</p>
              <h3 className="mt-1 text-lg font-bold text-slate-900">Find bids</h3>
              <p className="mt-2 text-sm text-slate-600">
                Learn to search federal, state, local, and subcontract opportunities that
                fit your business, set up saved searches, and spot opportunities early.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
              <p className="text-sm font-extrabold text-[#0f3d2e]">Step 3</p>
              <h3 className="mt-1 text-lg font-bold text-slate-900">
                Submit with confidence
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Use a Bid Kit to turn one live solicitation into checklists: eligibility,
                documents, deadlines, and a final self-check before you submit.
              </p>
            </div>
          </div>
          <Link
            href="/how-it-works"
            className="mt-6 inline-block text-sm font-semibold text-[#0f3d2e] hover:underline"
          >
            See the full journey
          </Link>
        </div>
      </section>

      {/* Tier teasers */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Pick the level of guidance you want
          </h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            Every paid plan is a one-time payment with no auto-renewal. Each purchase
            covers one business.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tierTeasers.map((tier) => (
              <Link
                key={tier.name}
                href={tier.href}
                className="group rounded-2xl bg-white p-6 ring-1 ring-slate-200 transition hover:ring-[#0f3d2e]"
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="text-lg font-bold text-slate-900">{tier.name}</h3>
                  <p className="text-lg font-extrabold text-[#0f3d2e]">{tier.price}</p>
                </div>
                <p className="mt-2 text-sm text-slate-600">{tier.line}</p>
                <p className="mt-4 text-sm font-semibold text-[#0f3d2e] group-hover:underline">
                  {tier.cta} →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-[#0f3d2e] text-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-bold sm:text-3xl">The market is real</h2>
          <p className="mt-3 max-w-3xl text-slate-200">
            These numbers describe the size of the government contracting market. They
            do not describe what any business will win.
          </p>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-extrabold text-[#c8a24a]">{stat.value}</p>
                <p className="mt-2 text-sm text-slate-200">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Our boundaries are our features
          </h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            No testimonials, no cherry-picked success stories. Here is what we can say
            that actually matters: the things we will never do.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {trustItems.map((item) => (
              <div key={item.title} className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-600">
            ContractReady is an independent private education and guidance service. We
            are not affiliated with SAM.gov or any government agency, and we cannot
            guarantee registration approval, bid acceptance, contract awards, revenue, or
            business results.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Start free. Upgrade only if you want a guide.
          </h2>
          <p className="mt-4 text-slate-600">
            The free checklist walks you through preparing for SAM.gov registration. The
            paid plans add training, bid kits, and written guidance. Same honest rules
            either way.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/free-checklist"
              className="rounded-lg bg-[#0f3d2e] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0c3125]"
            >
              Get the free checklist
            </Link>
            <Link
              href="/pricing"
              className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#0f3d2e] ring-1 ring-[#0f3d2e] hover:bg-slate-50"
            >
              Compare plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
