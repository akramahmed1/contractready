import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { getUserTier } from "@/lib/access";
import { tierUnlocks } from "@/lib/tiers";
import DirectoryTabs from "@/components/dashboard/DirectoryTabs";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Opportunity sources | ContractReady",
  description:
    "Directory of official opportunity sources: federal solicitations, subcontracts, contractor directory, procurement forecasts, and state portals.",
};

export default async function DirectoryPage() {
  const { userId } = await auth();
  if (!userId) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Please sign in</h1>
        <p className="mt-2 text-slate-600">The opportunity directory lives behind your account.</p>
        <Link href="/sign-in" className="mt-6 inline-block rounded-lg bg-emerald-900 px-6 py-3 font-semibold text-white">
          Sign in
        </Link>
      </div>
    );
  }

  const tier = await getUserTier(userId);
  if (!tierUnlocks(tier, "bidkit")) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <Link href="/dashboard" className="text-sm font-medium text-emerald-800 underline">
          Back to dashboard
        </Link>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Opportunity sources</h1>
        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Locked</p>
          <p className="mx-auto mt-3 max-w-md text-slate-600">
            The opportunity source directory comes with the Bid Kit plan and above.
          </p>
          <Link
            href="/pricing"
            className="mt-6 inline-block rounded-lg bg-emerald-900 px-6 py-3 font-semibold text-white"
          >
            See plans
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link href="/dashboard/opportunities" className="text-sm font-medium text-emerald-800 underline">
        Back to opportunity matching
      </Link>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">Opportunity sources</h1>
      <p className="mt-2 max-w-3xl text-slate-600">
        Where to find live solicitations, subcontracts, past-award data, agency
        forecasts, and state portals. Start with your{" "}
        <Link href="/dashboard/opportunities" className="font-semibold text-emerald-800 underline">
          personalized search pack
        </Link>{" "}
        for searches matched to your business profile.
      </p>
      <div className="mt-8">
        <DirectoryTabs />
      </div>
    </div>
  );
}
