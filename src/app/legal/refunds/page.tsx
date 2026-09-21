import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy (Draft) | ContractReady",
  description:
    "Draft Refund Policy for ContractReady: 14-day money-back guarantee on paid digital plans. Requires attorney review before launch.",
};

export default function RefundsPage() {
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
          Refund Policy
        </h1>
        <p className="mt-3 text-sm text-slate-500">
          Last updated: [EFFECTIVE DATE]. Provided by [COMPANY LEGAL NAME]
          (&ldquo;ContractReady&rdquo;).
        </p>

        <div className="mt-8 space-y-8 text-slate-700">
          <section className="rounded-2xl bg-[#0f3d2e] p-6 text-white sm:p-8">
            <h2 className="text-2xl font-bold">The 14-day guarantee, in plain language</h2>
            <p className="mt-3 leading-relaxed text-slate-200">
              Try any paid plan for 14 calendar days. If it is not right for you,
              request a refund within 14 calendar days of your purchase date, and we
              will refund the full amount you paid.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              1. What is covered
            </h2>
            <p className="mt-2 leading-relaxed">
              The guarantee covers all paid digital plans: Starter, Bid Kit, Growth,
              Annual Pro, and Two-Year All Access. The free plan and the free checklist
              involve no payment, so there is nothing to refund.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">2. Eligibility rules</h2>
            <ul className="mt-2 list-disc space-y-1 pl-6 leading-relaxed">
              <li>
                The refund request must be received within 14 calendar days of the
                original purchase date.
              </li>
              <li>
                No refund is available once any template has been downloaded. Our
                templates are digital products: once downloaded, they cannot be
                returned.
              </li>
              <li>
                No refund is available once you have accessed more than 50% of the
                lessons included in your plan.
              </li>
              <li>
                No refund is available once a Bid Kit request has been submitted.
                Preparing a Bid Kit is performed service work that begins when your
                request is received.
              </li>
              <li>
                Each purchase is eligible for one refund. If you repurchase the same
                plan after a refund, the new purchase is not eligible for another
                refund.
              </li>
              <li>
                The guarantee applies to the purchase price only. It does not cover any
                fees you paid to third parties, such as state filing fees, SAM.gov is
                free, or any other government or vendor charges.
              </li>
              <li>
                Refunds do not change your obligation to protect government information,
                third-party materials, and intellectual property you already received.
                Our training materials and templates remain our property and may not be
                shared, resold, or redistributed.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              3. How to request a refund
            </h2>
            <p className="mt-2 leading-relaxed">
              Send a written refund request through the member portal. Include:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6 leading-relaxed">
              <li>The email address used for the purchase</li>
              <li>The plan name and purchase date</li>
              <li>A brief reason for the request (optional, but it helps us improve)</li>
            </ul>
            <p className="mt-2 leading-relaxed">
              We do not accept refund requests by phone or text message. Written
              requests through the member portal create a clear record for both sides.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              4. How refunds are processed
            </h2>
            <p className="mt-2 leading-relaxed">
              Approved refunds are issued to the original payment method within [X]
              business days of approval. Depending on your bank or card issuer, the
              credit may take additional days to appear on your statement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              5. What happens to your access after a refund
            </h2>
            <p className="mt-2 leading-relaxed">
              When a refund is issued, access to the plan ends immediately: the training
              library, templates, member-portal guidance, and any unused Bid Kits are
              revoked. Bid Kits already delivered are considered used and are not
              available on a future plan without a new purchase.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              6. No auto-renewal means no cancellation flow
            </h2>
            <p className="mt-2 leading-relaxed">
              Plans never renew automatically, so there is nothing to cancel. When your
              access period ends, it simply ends, and you will not be charged again.
              If you want to continue, you can purchase a new term at the price shown
              at that time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              7. Chargebacks
            </h2>
            <p className="mt-2 leading-relaxed">
              If you file a chargeback with your bank instead of requesting a refund
              through the member portal, we will respond to the dispute with our
              purchase and access records. Filing a chargeback ends your access in the
              same way a refund does.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">8. Questions</h2>
            <p className="mt-2 leading-relaxed">
              For questions about a refund or this policy, contact us through the
              member portal or at [CONTACT EMAIL]. Our{" "}
              <Link href="/legal/terms" className="font-semibold text-[#0f3d2e] hover:underline">
                Terms of Service
              </Link>{" "}
              also cover payments and refunds.
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}
