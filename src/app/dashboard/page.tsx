import Link from "next/link";
import LessonVideo from "@/components/LessonVideo";
import { auth, currentUser } from "@clerk/nextjs/server";
import { ensureUser, getActivePurchases, getUserTier } from "@/lib/access";
import { getDb } from "@/lib/db";
import { lessonProgress } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { getBidKitAllowance } from "@/lib/bidkits";
import { PAID_TIERS, TIERS, tierUnlocks, type TierId } from "@/lib/tiers";
import type { Lesson, TierOutline } from "@/content/types";

export const dynamic = "force-dynamic";

// The content module is owned by another agent. Every call below is wrapped so a
// missing export or a tier without content renders gracefully instead of crashing.
async function safeLessonsForTier(tier: TierId): Promise<Lesson[]> {
  try {
    const mod = (await import("@/content")) as {
      lessonsForTier?: (t: TierId) => Lesson[];
    };
    if (typeof mod.lessonsForTier !== "function") return [];
    return mod.lessonsForTier(tier) ?? [];
  } catch {
    return [];
  }
}

async function safeOutlineForTier(tier: TierId): Promise<TierOutline | undefined> {
  try {
    const mod = (await import("@/content")) as {
      outlineForTier?: (t: TierId) => TierOutline | undefined;
    };
    if (typeof mod.outlineForTier !== "function") return undefined;
    return mod.outlineForTier(tier);
  } catch {
    return undefined;
  }
}

function groupByTier(lessons: Lesson[]) {
  const groups = new Map<TierId, Lesson[]>();
  for (const lesson of lessons) {
    const arr = groups.get(lesson.tier) ?? [];
    arr.push(lesson);
    groups.set(lesson.tier, arr);
  }
  return [...groups.entries()].sort((a, b) => TIERS[a[0]].rank - TIERS[b[0]].rank);
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ purchase?: string }>;
}) {
  const { userId } = await auth();
  if (!userId) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Please sign in</h1>
        <p className="mt-2 text-slate-600">Your dashboard lives behind your account.</p>
        <Link href="/sign-in" className="mt-6 inline-block rounded-lg bg-emerald-900 px-6 py-3 font-semibold text-white">
          Sign in
        </Link>
      </div>
    );
  }

  const params = await searchParams;
  const showSuccess = params.purchase === "success";

  const cu = await currentUser().catch(() => null);
  const email = cu?.emailAddresses?.[0]?.emailAddress ?? undefined;

  await ensureUser(userId, email);
  const tier = await getUserTier(userId);
  const def = TIERS[tier];
  const active = await getActivePurchases(userId);
  const expiry = active.find((p) => p.tier === tier)?.expiresAt ?? null;

  let kitsRemaining = 0;
  let kitsTotal = 0;
  try {
    const allowance = await getBidKitAllowance(userId);
    kitsRemaining = allowance.remaining;
    kitsTotal = allowance.total;
  } catch {
    kitsRemaining = 0;
    kitsTotal = 0;
  }

  const lessons = (await safeLessonsForTier(tier)).filter((l) => tierUnlocks(tier, l.tier));
  const library = groupByTier(lessons);

  // Resume: most recently touched lesson that is not completed yet.
  let resume: { slug: string; title: string; status: string } | null = null;
  try {
    const db = getDb();
    const rows = await db
      .select({ slug: lessonProgress.slug, status: lessonProgress.status })
      .from(lessonProgress)
      .where(eq(lessonProgress.userId, userId))
      .orderBy(desc(lessonProgress.updatedAt))
      .limit(20);
    for (const r of rows) {
      if (r.status === "completed") continue;
      const lesson = lessons.find((l) => l.slug === r.slug);
      if (lesson) {
        resume = { slug: lesson.slug, title: lesson.title, status: r.status };
        break;
      }
    }
  } catch {
    resume = null;
  }

  const lockedTiers = PAID_TIERS.filter((t) => !tierUnlocks(tier, t.id));
  const lockedOutlines = await Promise.all(
    lockedTiers.map(async (t) => ({ def: t, outline: await safeOutlineForTier(t.id) }))
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {showSuccess && (
        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-900">
          <p className="font-semibold">Payment successful. Your plan is active.</p>
          <p className="mt-1 text-sm">
            Welcome to {TIERS[tier]?.name ?? "ContractReady"}. Your lessons are unlocked below.
          </p>
        </div>
      )}

      <h1 className="text-3xl font-bold text-slate-900">Welcome back</h1>
      <p className="mt-1 text-slate-600">This is your path from zero to contract-ready.</p>

      {resume ? (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-800">
              Continue where you left off
            </p>
            <p className="mt-1 font-semibold text-slate-900">{resume.title}</p>
          </div>
          <Link
            href={`/dashboard/learn/${resume.slug}`}
            className="rounded-lg bg-emerald-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            Resume lesson
          </Link>
        </div>
      ) : null}

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Current plan</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{def.name}</p>
          <p className="mt-1 text-sm text-slate-600">{def.tagline}</p>
          <p className="mt-3 text-sm text-slate-600">
            {tier === "free" ? (
              <>
                Free plan.{" "}
                <Link href="/pricing" className="font-semibold text-emerald-800 underline">
                  Upgrade to Starter
                </Link>{" "}
                to unlock the full walkthrough.
              </>
            ) : expiry ? (
              <>Access until {expiry.toLocaleDateString()}.</>
            ) : (
              <>Plan active.</>
            )}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Bid kits</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            {kitsTotal > 0 ? `${kitsRemaining} of ${kitsTotal} left` : "None on this plan"}
          </p>
          <p className="mt-1 text-sm text-slate-600">
            {kitsTotal > 0
              ? "Request a done-for-you bid kit for a live solicitation."
              : "Bid kits come with the Bid Kit plan and above."}
          </p>
          <Link
            href={kitsRemaining > 0 ? "/dashboard/bid-kits" : "/pricing"}
            className="mt-3 inline-block rounded-lg border border-emerald-900 px-4 py-2 text-sm font-semibold text-emerald-900"
          >
            {kitsRemaining > 0 ? "Request a bid kit" : "See plans with bid kits"}
          </Link>
        </div>
      </div>

      <h2 className="mt-12 text-2xl font-bold text-slate-900">Tools</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Link
          href="/dashboard/templates"
          className="block rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-emerald-800 hover:shadow"
        >
          <p className="font-semibold text-slate-900">Template library</p>
          <p className="mt-1 text-sm text-slate-600">
            Bid / no-bid checklists, compliance matrices, capability statement builder,
            and more. Copy or download.
          </p>
        </Link>
        <Link
          href="/dashboard/opportunities"
          className="block rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-emerald-800 hover:shadow"
        >
          <p className="font-semibold text-slate-900">Opportunity matching</p>
          <p className="mt-1 text-sm text-slate-600">
            Build your business profile and get a tailored SAM.gov search pack.
          </p>
        </Link>
      </div>

      <h2 className="mt-12 text-2xl font-bold text-slate-900">Product tour</h2>
      <p className="mt-1 text-slate-600">
        A short tour of your dashboard and how bid kit requests work.
      </p>
      <LessonVideo
        videoUrl="/walkthroughs/video7-dashboard-tour.mp4"
        videoLabel="Video tour: your dashboard and bid kit requests"
        lessonTitle="Dashboard and bid kit request tour"
      />

      <h2 className="mt-12 text-2xl font-bold text-slate-900">Your lesson library</h2>      {library.length === 0 ? (
        <p className="mt-4 text-slate-600">
          No lessons are available yet. Check back soon, or{" "}
          <Link href="/pricing" className="font-semibold text-emerald-800 underline">
            upgrade your plan
          </Link>{" "}
          to unlock the full library.
        </p>
      ) : (
        library.map(([lessonTier, lessons]) => (
          <div key={lessonTier} className="mt-6">
            <h3 className="text-lg font-semibold text-slate-800">{TIERS[lessonTier].name}</h3>
            <ul className="mt-3 grid gap-3 md:grid-cols-2">
              {lessons.map((lesson) => (
                <li key={lesson.slug}>
                  <Link
                    href={`/dashboard/learn/${lesson.slug}`}
                    className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-800 hover:shadow"
                  >
                    <p className="font-semibold text-slate-900">{lesson.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{lesson.summary}</p>
                    <p className="mt-2 text-xs text-slate-500">{lesson.estMinutes} min read</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}

      {lockedOutlines.length > 0 && (
        <>
          <h2 className="mt-12 text-2xl font-bold text-slate-900">Locked content</h2>
          <p className="mt-1 text-slate-600">Higher plans unlock these modules.</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {lockedOutlines.map(({ def: t, outline }) => (
              <div key={t.id} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-slate-900">{t.name}</p>
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {outline?.status === "scaffolded" ? "Coming soon" : "Locked"}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-600">{t.tagline}</p>
                <Link
                  href="/pricing"
                  className="mt-3 inline-block rounded-lg bg-emerald-900 px-4 py-2 text-sm font-semibold text-white"
                >
                  Upgrade to {t.name}
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
