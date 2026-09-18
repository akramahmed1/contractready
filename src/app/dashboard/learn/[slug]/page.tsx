import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getUserTier } from "@/lib/access";
import { TIERS, tierUnlocks } from "@/lib/tiers";
import type { Lesson } from "@/content/types";
import LearnRenderer from "@/components/LearnRenderer";

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
          <div className="mt-8">
            <LearnRenderer blocks={lesson.blocks} />
          </div>
        </article>
      )}
    </div>
  );
}
