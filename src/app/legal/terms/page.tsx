import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service (Draft) | ContractReady",
  description:
    "Draft Terms of Service for ContractReady. Requires attorney review before launch.",
};

export default function TermsPage() {
  return (
    <div>
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div
          role="alert"
          className="rounded-xl bg-amber-100 p-5 text-center ring-1 ring-amber-300"
        >
          <p className="text-lg font-extrabold text-amber-900">
            Draft. Requires attorney review before launch.
          </p>
          <p className="mt-1 text-sm text-amber-800">
            This document is an internal draft. It is not in effect, and no
            payments are being accepted, until it has been reviewed and approved
            by a licensed attorney.
          </p>
        </div>

        <h1 className="mt-10 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-3 text-sm text-slate-500">
          Last updated: [EFFECTIVE DATE]. Provided by [COMPANY LEGAL NAME]
          (&ldquo;ContractReady,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
          &ldquo;our&rdquo;).
        </p>

        <div className="prose-slate mt-8 space-y-8 text-slate-700">
          <section>
            <h2 className="text-xl font-bold text-slate-900">1. What ContractReady is</h2>
            <p className="mt-2 leading-relaxed">
              ContractReady is an independent private education and guidance service
              that helps US small businesses understand and participate in government
              contracting. We provide training materials, templates, checklists,
              opportunity-matching education, and written guidance through a member
              portal.
            </p>
            <p className="mt-2 leading-relaxed">
              We are not a government agency and are not affiliated with or endorsed by
              SAM.gov, the General Services Administration, the Small Business
              Administration, or any federal, state, or local agency. Nothing on this
              website or in our materials is an official government communication.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">2. Eligibility</h2>
            <p className="mt-2 leading-relaxed">
              You must be at least 18 years old and authorized to act on behalf of the
              business covered by your purchase. By purchasing a plan, you represent that
              this is true.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              3. One business per purchase
            </h2>
            <p className="mt-2 leading-relaxed">
              Each plan purchase covers a single company, LLC, or other legal entity.
              If you need guidance for a second entity, you must purchase a separate
              plan for it. Access, training, and Bid Kits may not be shared across
              entities.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              4. Plans, access periods, and renewal
            </h2>
            <p className="mt-2 leading-relaxed">
              A 12-month plan begins on the purchase date and ends 12 months later. The
              Two-Year All Access plan begins on the purchase date and ends 24 months
              later. Plans do not renew automatically. We may send reminders before
              access ends, but we will never charge you for a renewal without a new
              purchase authorization from you.
            </p>
            <p className="mt-2 leading-relaxed">
              Prices are shown in US dollars and are one-time payments. The price you pay
              is the price displayed at checkout. Renewal pricing, if you choose to buy
              a new term, is the price displayed at the time of renewal.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">5. Bid Kit rules</h2>
            <p className="mt-2 leading-relaxed">
              A Bid Kit is an educational package for one selected, active
              solicitation. It may include an opportunity summary, eligibility and
              qualification checkpoints, required-document and deadline checklists,
              instructions organized from the solicitation, reusable templates, and a
              final self-check list.
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6 leading-relaxed">
              <li>
                One Bid Kit applies to one solicitation. Revised solicitations and
                official amendments remain part of the same project. A different
                solicitation uses another Bid Kit.
              </li>
              <li>
                Unused Bid Kits expire when the plan ends and do not roll over into a
                renewed plan.
              </li>
              <li>
                The Two-Year All Access plan permits up to 10 Bid Kits in each 12-month
                period of the 24-month term.
              </li>
              <li>
                A Bid Kit does not include proposal writing, proposal review, legal or
                accounting advice, certification, representation before an agency, or
                bid submission on your behalf.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              6. Your responsibilities as the customer
            </h2>
            <p className="mt-2 leading-relaxed">
              You complete and submit your own registrations, bids, quotes, proposals,
              and certifications. Specifically, you are responsible for:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6 leading-relaxed">
              <li>
                Creating and controlling your own Login.gov, SAM.gov, and other
                government accounts, and keeping your credentials secure
              </li>
              <li>
                Answering all official questions truthfully and making all
                representations and certifications yourself
              </li>
              <li>
                Reading the complete official solicitation, amendments, attachments,
                and agency instructions before submitting anything
              </li>
              <li>Making your own pricing decisions</li>
              <li>
                Meeting all deadlines and submission requirements, which are set by the
                agency, not by us
              </li>
            </ul>
            <p className="mt-2 leading-relaxed">
              If anything in our materials conflicts with an official solicitation or
              agency instruction, the official source controls.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              7. No credential handling
            </h2>
            <p className="mt-2 leading-relaxed">
              We will never ask for your Login.gov, SAM.gov, or other government account
              credentials, and we will never access, request, store, or use them. We do
              not create or control your accounts, complete attestations on your behalf,
              or submit anything in your name. If anyone claiming to represent
              ContractReady asks for your credentials, do not provide them and report it
              to us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              8. No professional advice
            </h2>
            <p className="mt-2 leading-relaxed">
              All of our content is educational and informational. It is not legal,
              tax, accounting, financial, or business advice, and it does not create an
              attorney-client, accountant-client, or any other professional relationship.
              You should consult a licensed professional for advice about your specific
              situation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              9. No outcome guarantees
            </h2>
            <p className="mt-2 leading-relaxed">
              We do not and cannot guarantee SAM.gov registration approval, eligibility
              for any program, bid responsiveness or compliance, contract awards,
              revenue, or profit. Registration, certification, and award decisions are
              made by the responsible government systems and agencies. Results vary,
              and no outcome is guaranteed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              10. Payments and refunds
            </h2>
            <p className="mt-2 leading-relaxed">
              Payments are processed through our payment provider. Paid digital plans
              are covered by a 14-day money-back guarantee: you may request a refund
              within 14 calendar days of purchase. Eligibility rules and the request
              method are described in our{" "}
              <a href="/legal/refunds" className="font-semibold text-[#0f3d2e] hover:underline">
                Refund Policy
              </a>
              , which is incorporated into these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              11. Your license to use our materials
            </h2>
            <p className="mt-2 leading-relaxed">
              When you purchase a plan, we grant you a limited, non-exclusive,
              non-transferable license to use the training materials, templates, and
              checklists for the covered business during your access period. You may not
              copy, resell, redistribute, publish, or share these materials with
              others, including other businesses or entities.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">12. Acceptable use</h2>
            <p className="mt-2 leading-relaxed">
              You agree not to misuse the service, including by attempting to access
              accounts or systems you are not authorized to use, submitting false
              information, interfering with the service, or violating any law. We may
              suspend or terminate access for violations of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              13. Third-party services
            </h2>
            <p className="mt-2 leading-relaxed">
              The service relies on third parties, including payment processing and
              website hosting, and it directs you to third-party government websites
              such as SAM.gov. We are not responsible for the availability, accuracy, or
              practices of third-party services or websites.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              14. Limitation of liability
            </h2>
            <p className="mt-2 leading-relaxed">
              To the maximum extent permitted by law, ContractReady and its owners,
              employees, and contractors are not liable for indirect, incidental,
              special, consequential, or punitive damages, or for lost revenue, lost
              profits, or lost business opportunities, arising from your use of the
              service or reliance on our educational materials. Our total liability for
              any claim is limited to the amount you paid for the plan at issue.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">15. Indemnification</h2>
            <p className="mt-2 leading-relaxed">
              You agree to indemnify and hold harmless ContractReady and its owners,
              employees, and contractors from claims, damages, and expenses (including
              reasonable attorneys&apos; fees) arising from your misuse of the service,
              your submissions to government agencies, or your violation of these Terms
              or any law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              16. Changes to the service and these Terms
            </h2>
            <p className="mt-2 leading-relaxed">
              We may update the service and these Terms from time to time. Material
              changes will be posted with a revised &ldquo;Last updated&rdquo; date.
              Continued use of the service after changes take effect constitutes
              acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">17. Termination</h2>
            <p className="mt-2 leading-relaxed">
              You may stop using the service at any time. We may suspend or terminate
              your access for violations of these Terms. Sections covering intellectual
              property, limitation of liability, indemnification, and governing law
              survive termination.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              18. Governing law
            </h2>
            <p className="mt-2 leading-relaxed">
              These Terms are governed by the laws of the State of [STATE], without
              regard to conflict-of-law principles. Any disputes will be resolved in the
              state or federal courts located in [COUNTY], [STATE], and you consent to
              their jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">19. Contact</h2>
            <p className="mt-2 leading-relaxed">
              Questions about these Terms can be sent to [CONTACT EMAIL].
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}
