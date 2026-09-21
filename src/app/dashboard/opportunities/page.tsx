import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { getUserTier } from "@/lib/access";
import { opportunityProfiles } from "@/db/schema";
import { TIERS, tierUnlocks } from "@/lib/tiers";
import { buildSearchPack, profileSummary } from "@/lib/matching";
import OpportunityProfileForm from "@/components/dashboard/OpportunityProfileForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Opportunity matching | ContractReady",
  description: "Your business profile and tailored SAM.gov search pack.",
};

export default async function OpportunitiesPage() {
  const { userId } = await auth();
  if (!userId) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Please sign in</h1>
        <p className="mt-2 text-slate-600">Opportunity matching lives behind your account.</p>
        <Link
          href="/sign-in"
          className="mt-6 inline-block rounded-lg bg-emerald-900 px-6 py-3 font-semibold text-white"
        >
          Sign in
        </Link>
      </div>
    );
  }

  const tier = await getUserTier(userId);
  const unlocked = tierUnlocks(tier, "bidkit");

  if (!unlocked) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <Link href="/dashboard" className="text-sm font-semibold text-emerald-800 underline">
          Back to dashboard
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-slate-900">Opportunity matching</h1>
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-6">
          <p className="font-semibold text-slate-900">Opportunity matching needs the Bid Kit plan or above</p>
          <p className="mt-1 text-sm text-slate-700">
            Tell us about your business and we will build you a tailored SAM.gov search
            pack, matched to your NAICS codes, certifications, and services. Your current
            plan is {TIERS[tier].name}.
          </p>
          <Link
            href="/pricing"
            className="mt-4 inline-block rounded-lg bg-emerald-900 px-4 py-2 text-sm font-semibold text-white"
          >
            See plans
          </Link>
        </div>
      </div>
    );
  }

  let profile = null;
  try {
    const db = getDb();
    const rows = await db
      .select()
      .from(opportunityProfiles)
      .where(eq(opportunityProfiles.userId, userId));
    profile = rows[0] ?? null;
  } catch {
    profile = null;
  }

  const pack = profile ? buildSearchPack(profile) : [];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Link href="/dashboard" className="text-sm font-semibold text-emerald-800 underline">
        Back to dashboard
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">Opportunity matching</h1>
      <p className="mt-1 text-slate-600">
        Complete your business profile and we build a tailored search pack: direct links
        into SAM.gov contract opportunities matched to what you do, plus subcontracting
        leads on SBA SUBNet. Run the searches in your own browser and save the ones you
        like to your SAM.gov account for daily email alerts.
      </p>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">Your business profile</h2>
        <OpportunityProfileForm />
      </div>

      {profile && (
        <div className="mt-8">
          <h2 className="text-xl font-bold text-slate-900">Your search pack</h2>
          <p className="mt-1 text-sm text-slate-600">{profileSummary(profile)}</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {pack.map((link) => (
              <div key={link.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="font-semibold text-slate-900">{link.label}</p>
                <p className="mt-1 text-sm text-slate-600">{link.hint}</p>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block rounded-lg bg-emerald-900 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
                >
                  Open on SAM.gov
                </a>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200">
            <p className="text-sm text-slate-700">
              <strong>How to make this a routine:</strong> open each search, sign in to
              SAM.gov, and use the Save Search icon. Choose Notify on each saved search
              and SAM.gov emails you new matches once a day. Review your saved searches
              every week and retire the ones that stop producing.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
