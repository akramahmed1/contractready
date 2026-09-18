import Link from "next/link";
import type { Metadata } from "next";
import FaqAccordion, { type FaqItem } from "@/components/marketing/FaqAccordion";

export const metadata: Metadata = {
  title: "FAQ | ContractReady",
  description:
    "Answers to common questions: SAM.gov fees, government affiliation, registration help, LLC formation, Bid Kits, support channels, timelines, and what happens when a plan ends.",
};

const faqItems: FaqItem[] = [
  {
    question: "Is SAM.gov registration free?",
    answer:
      "Yes. SAM.gov does not charge a fee to obtain a Unique Entity ID, register an entity, or maintain an entity registration. Our fees cover optional education, tools, templates, opportunity matching, and guidance.",
  },
  {
    question: "Are you affiliated with SAM.gov or the U.S. government?",
    answer:
      "No. We are an independent private service and are not endorsed by, affiliated with, or part of SAM.gov, the General Services Administration, the Small Business Administration, or any federal, state, or local agency.",
  },
  {
    question: "Will you register my company for me?",
    answer:
      "No. We show you the process and help you prepare, but you create your own accounts, control your credentials, answer all official questions, make all certifications, and submit your own registration.",
  },
  {
    question: "Do you form an LLC?",
    answer:
      "No. The Starter plan includes an educational LLC formation walkthrough. The customer chooses the state, files directly with the state or a provider of their choice, and pays all filing and related fees.",
  },
  {
    question: "Does buying a plan guarantee SAM.gov approval?",
    answer:
      "No. Registration decisions are made by the responsible government systems and agencies. We provide guidance, not approval.",
  },
  {
    question: "Will you write or submit my bid?",
    answer:
      "No. We do not write proposals, review proposals, or submit bids. Bid Kits organize public solicitation requirements and provide educational checklists, walkthroughs, and templates. The customer prepares, verifies, signs, prices, and submits the final response.",
  },
  {
    question: "Does a Bid Kit guarantee that my response is compliant?",
    answer:
      "No. The official solicitation, amendments, and agency instructions control. The customer must review all official materials and is responsible for the final submission.",
  },
  {
    question: "Can I use a Bid Kit for subcontracting opportunities?",
    answer:
      "Yes, when a suitable active subcontracting opportunity is available. The same limits and responsibilities apply.",
  },
  {
    question: "Is support available by phone or text?",
    answer:
      "No. Support and guidance are written and delivered through the member portal. Response targets are service goals, not guarantees, and should be shown in the customer's account.",
  },
  {
    question: "Will my plan renew automatically?",
    answer:
      "No. Renewal is manual. We may send reminders before access ends, but we will not charge a renewal without a new purchase authorization.",
  },
  {
    question: "How long does SAM.gov registration take?",
    answer:
      "After you submit, government review typically takes 10 to 12 business days. The biggest delays usually come from rejected applications, which is why our walkthrough focuses on getting the details right the first time.",
  },
  {
    question: "Do I need an LLC first?",
    answer:
      "You need a legal entity to register in SAM.gov. That can be a sole proprietorship, an LLC, a corporation, or another entity type. The Starter plan includes an educational LLC formation walkthrough, but you file with the state yourself and pay all state fees.",
  },
  {
    question: "I'm not a US citizen. Can I bid?",
    answer:
      "Foreign entities can register in SAM.gov, but many contracts are restricted to US entities or have specific eligibility requirements. Always check the solicitation's eligibility section before investing time in a bid. Our Bid Kits include eligibility checkpoints so restrictions surface early.",
  },
  {
    question: "What happens when my plan ends?",
    answer:
      "Access to the training library, templates, and member-portal guidance ends on the expiration date, and unused Bid Kits do not roll over. Because plans never renew automatically, you will not be charged. You can purchase a new term whenever you are ready.",
  },
];

export default function FaqPage() {
  return (
    <div>
      <section className="bg-[#0f3d2e] text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#c8a24a]">
            FAQ
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">
            Straight answers, before you spend a dollar.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-200">
            If your question is not answered here, written support is available through
            the member portal for customers.
          </p>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <FaqAccordion items={faqItems} />
          <div className="mt-10 rounded-2xl bg-white p-6 text-center ring-1 ring-slate-200 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900">Ready to get started?</h2>
            <p className="mt-2 text-sm text-slate-600">
              Begin with the free SAM.gov checklist, or compare plans to find the right
              level of guidance.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
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
        </div>
      </section>
    </div>
  );
}
