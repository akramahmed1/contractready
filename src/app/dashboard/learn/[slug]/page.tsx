import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getUserTier } from "@/lib/access";
import { TIERS, tierUnlocks } from "@/lib/tiers";
import type { Lesson } from "@/content/types";
import LearnRenderer from "@/components/LearnRenderer";
import LessonVideo from "@/components/LessonVideo";
import FurtherWatching from "@/components/FurtherWatching";
import { logEvent } from "@/lib/analytics";
import { and, eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { ensureUser } from "@/lib/access";
import { lessonProgress } from "@/db/schema";
import MarkCompleteButton from "@/components/dashboard/MarkCompleteButton";

export const dynamic = "force-dynamic";

async function safeGetLesson(slug: string): Promise<Lesson | undefined> {
  try {
    const mod = (await import("@/content")) as {
      getLesson?: (s: string) => Lesson | undefined;
    };
    if (typeof mod.getLesson !== "function") return undefined;
    return mod.getLesson(slug);
  } catch {
    return undefined;
  }
}

export default async function LearnPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = await safeGetLesson(slug);
  if (!lesson) notFound();

  const { userId } = await auth();
  const userTier = userId ? await getUserTier(userId) : "free";
  const unlocked = tierUnlocks(userTier, lesson.tier);

  if (unlocked) {
    logEvent("lesson_view", `/dashboard/learn/${slug}`, userId, {
      tier: lesson.tier,
    });
  }

  let progressStatus: "started" | "completed" = "started";
  if (unlocked && userId) {
    try {
      const db = getDb();
      await ensureUser(userId);
      // Record first view as "started". onConflictDoNothing preserves an
      // existing "completed" row, so re-reading never un-completes a lesson.
      await db
        .insert(lessonProgress)
        .values({ userId, slug: lesson.slug, status: "started", updatedAt: new Date() })
        .onConflictDoNothing();
      const rows = await db
        .select({ status: lessonProgress.status })
        .from(lessonProgress)
        .where(
          and(
            eq(lessonProgress.userId, userId),
            eq(lessonProgress.slug, lesson.slug)
          )
        )
        .limit(1);
      if (rows[0]?.status === "completed") progressStatus = "completed";
    } catch (err) {
      console.error("lesson progress write failed", err);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/dashboard" className="text-sm font-semibold text-emerald-800 underline">
        Back to dashboard
      </Link>

      {!unlocked ? (
        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Locked lesson</p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900">{lesson.title}</h1>
          <p className="mx-auto mt-3 max-w-md text-slate-600">
            This lesson is part of the {TIERS[lesson.tier].name} plan. Upgrade to unlock it and the
            rest of the library.
          </p>
          <Link
            href="/pricing"
            className="mt-6 inline-block rounded-lg bg-emerald-900 px-6 py-3 font-semibold text-white"
          >
            See plans
          </Link>
        </div>
      ) : (
        <article className="mt-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-800">
            {TIERS[lesson.tier].name}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">{lesson.title}</h1>
          <p className="mt-2 text-sm text-slate-500">{lesson.estMinutes} min read</p>
          <p className="mt-3 text-lg text-slate-600">{lesson.summary}</p>
          <LessonVideo
            videoUrl={lesson.videoUrl}
            videoLabel={lesson.videoLabel}
            lessonTitle={lesson.title}
          />
          <div className="mt-8">
            <LearnRenderer blocks={lesson.blocks} />
          </div>
          {userId ? <MarkCompleteButton slug={lesson.slug} initialStatus={progressStatus} /> : null}
          <FurtherWatching items={lesson.furtherWatching ?? []} />
        </article>
      )}
    </div>
  );
}
