import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { ensureUser, getUserTier } from "@/lib/access";
import { tierUnlocks } from "@/lib/tiers";
import { getLesson } from "@/content";
import { lessonProgress } from "@/db/schema";

/** Current user's lesson progress, newest first. */
export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  const db = getDb();
  const rows = await db
    .select()
    .from(lessonProgress)
    .where(eq(lessonProgress.userId, userId))
    .orderBy(desc(lessonProgress.updatedAt))
    .limit(200);
  return NextResponse.json({ progress: rows });
}

/**
 * Marks a lesson complete (or reopens it). "started" rows are written
 * server-side by the lesson page itself, so the client only completes.
 */
export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  let body: { slug?: string; action?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }
  const lesson = body.slug ? getLesson(body.slug) : undefined;
  if (!lesson) return NextResponse.json({ error: "Unknown lesson." }, { status: 404 });
  const tier = await getUserTier(userId);
  if (!tierUnlocks(tier, lesson.tier)) {
    return NextResponse.json({ error: "Lesson is locked for your plan." }, { status: 403 });
  }
  const completed = body.action === "complete";
  const db = getDb();
  await ensureUser(userId);
  await db
    .insert(lessonProgress)
    .values({
      userId,
      slug: lesson.slug,
      status: completed ? "completed" : "started",
      completedAt: completed ? new Date() : null,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: [lessonProgress.userId, lessonProgress.slug],
      set: {
        status: completed ? "completed" : "started",
        completedAt: completed ? new Date() : null,
        updatedAt: new Date(),
      },
    });
  return NextResponse.json({ ok: true, status: completed ? "completed" : "started" });
}
