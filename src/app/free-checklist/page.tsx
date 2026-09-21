import type { Metadata } from "next";
import { logEvent } from "@/lib/analytics";
import ChecklistForm from "@/components/marketing/ChecklistForm";

export const metadata: Metadata = {
  title: "Free SAM.gov registration checklist | ContractReady",
  description:
    "Download the free SAM.gov registration preparation checklist: the documents, information, and steps to get your entity registration right the first time.",
};

const covers = [
  {
    title: "Documents and information to gather",
    body: "Every piece of business information SAM.gov will ask for, collected before you start so you do not stall halfway through the application.",
  },
  {
    title: "The registration steps in order",
    body: "The full sequence from Login.gov account creation through Unique Entity ID, entity registration, and activation, explained in plain language.",
  },
  {
    title: "NAICS code basics",
    body: "How to find the industry codes that match what your business actually does, so you show up in the right searches.",
  },
  {
    title: "Common rejection reasons to avoid",
    body: "The errors that send applications back for rework and add weeks to your timeline, with a pre-submit self-check.",
  },
];

export default function FreeChecklistPage() {
  // First-party page view, no cookies. Fire-and-forget.
  logEvent("free_checklist_view", "/free-checklist", null);
  return (
    <div>
      <section className="bg-[#0f3d2e] text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#c8a24a]">
            Free download
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">
            The SAM.gov registration prep checklist
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-200">
            The free PDF that walks you through preparing for your free SAM.gov
            registration, so your application goes through the first time.
          </p>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                What the checklist covers
              </h2>
              <div className="mt-6 space-y-4">
                {covers.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl bg-white p-5 ring-1 ring-slate-200"
                  >
                    <h3 className="font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-slate-600">
                Remember: SAM.gov registration itself is free on the official government
                website. This checklist simply helps you prepare. If you want guided
                training on top of it, the paid plans are there when you are ready.
              </p>
            </div>
            <div>
              <ChecklistForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
