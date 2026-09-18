import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy (Draft) | ContractReady",
  description:
    "Draft Privacy Policy for ContractReady. Requires attorney review before launch.",
};

export default function PrivacyPage() {
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
            This document is an internal draft and is not legally binding until reviewed
            and approved by a licensed attorney.
          </p>
        </div>

        <h1 className="mt-10 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-slate-500">
          Last updated: [EFFECTIVE DATE]. Provided by [COMPANY LEGAL NAME]
          (&ldquo;ContractReady,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
          &ldquo;our&rdquo;).
        </p>

        <div className="mt-8 space-y-8 text-slate-700">
          <section>
            <h2 className="text-xl font-bold text-slate-900">1. What we collect</h2>
            <p className="mt-2 leading-relaxed">
              We collect only the information we need to run the service:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6 leading-relaxed">
              <li>
                <strong className="text-slate-900">Contact information:</strong> your
                name and email address when you download the free checklist, create an
                account, or contact support.
              </li>
              <li>
                <strong className="text-slate-900">Account information:</strong> your
                sign-in identity, plan purchases, access periods, Bid Kit usage, and
                the business profile information you provide for opportunity matching.
              </li>
              <li>
                <strong className="text-slate-900">Payment information:</strong>{" "}
                processed by our payment provider, Stripe. We receive confirmation of
                payment and limited billing details. We do not see, store, or process
                your full card number.
              </li>
              <li>
                <strong className="text-slate-900">Member portal messages:</strong>{" "}
                the written support requests and guidance conversations you send
                through the portal, so we can respond and keep a record.
              </li>
              <li>
                <strong className="text-slate-900">Basic usage data:</strong> pages
                visited, device and browser type, and approximate location derived from
                your IP address, used for security and service improvement.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              2. What we never collect
            </h2>
            <p className="mt-2 leading-relaxed">
              We never ask for, collect, or store your Login.gov, SAM.gov, or other
              government account credentials. We never ask for your Social Security
              number, tax ID, or banking login credentials. If any page or message
              claiming to be from us asks for these, do not provide them and contact us
              at [CONTACT EMAIL].
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">3. How we use your data</h2>
            <ul className="mt-2 list-disc space-y-1 pl-6 leading-relaxed">
              <li>To deliver the checklist, training, templates, and guidance you request</li>
              <li>To process payments and manage your plan, access period, and Bid Kit usage</li>
              <li>To respond to your written support requests in the member portal</li>
              <li>To send service messages, such as purchase confirmations and access reminders</li>
              <li>To send occasional educational updates, which you can opt out of at any time</li>
              <li>To keep the service secure and to improve it</li>
            </ul>
            <p className="mt-2 leading-relaxed">
              We do not sell your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">4. Cookies</h2>
            <p className="mt-2 leading-relaxed">
              We use a small set of cookies and similar technologies: strictly necessary
              cookies that keep you signed in and remember your preferences, and basic
              analytics that help us understand which pages are useful. You can control
              cookies through your browser settings, but blocking necessary cookies may
              prevent parts of the site from working.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">5. How we share data</h2>
            <p className="mt-2 leading-relaxed">
              We share your information only in these situations:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6 leading-relaxed">
              <li>
                <strong className="text-slate-900">Service providers:</strong> companies
                that help us run the service, such as Stripe for payments, our hosting
                and database providers, and our authentication provider. They may use
                your data only to provide their services to us.
              </li>
              <li>
                <strong className="text-slate-900">Legal requirements:</strong> when
                required by law, court order, or valid legal process, or to protect the
                rights, safety, or property of ContractReady or others.
              </li>
              <li>
                <strong className="text-slate-900">Business transfers:</strong> if the
                business is sold or merged, your data may transfer as part of the
                transaction, subject to this policy.
              </li>
            </ul>
            <p className="mt-2 leading-relaxed">
              We do not share your data with government agencies for marketing or
              contracting purposes, and we never disclose your member portal messages to
              third parties except as described above.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              6. Data retention
            </h2>
            <p className="mt-2 leading-relaxed">
              We keep your account and purchase records for as long as your account is
              active and for a reasonable period afterward to meet legal, tax, and
              accounting obligations. Marketing email lists are deleted when you
              unsubscribe. You may request deletion of your account data as described
              below, subject to records we are required to keep.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">7. Security</h2>
            <p className="mt-2 leading-relaxed">
              We use reasonable technical and organizational measures to protect your
              information, including encrypted connections and limited access controls.
              No method of transmission or storage is completely secure, so we cannot
              guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">8. Your rights</h2>
            <p className="mt-2 leading-relaxed">
              Depending on where you live, you may have the right to access, correct,
              or delete your personal information, to opt out of marketing
              communications, and to request a copy of the data we hold about you. To
              exercise these rights, contact us at [CONTACT EMAIL]. We will respond
              within the timeframe required by applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">9. Children</h2>
            <p className="mt-2 leading-relaxed">
              ContractReady is intended for business use by adults. We do not knowingly
              collect personal information from children under 13. If we learn that we
              have collected such information, we will delete it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              10. Changes to this policy
            </h2>
            <p className="mt-2 leading-relaxed">
              We may update this policy as the service evolves. Material changes will
              be posted with a revised &ldquo;Last updated&rdquo; date. Continued use of
              the service after changes take effect constitutes acceptance of the
              updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">11. Contact</h2>
            <p className="mt-2 leading-relaxed">
              Questions about this policy or your data can be sent to [CONTACT EMAIL].
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}
