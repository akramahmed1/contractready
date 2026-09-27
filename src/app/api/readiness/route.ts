import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { ensureUser } from "@/lib/access";
import { readinessAssessments } from "@/db/schema";
import { checkRateLimit } from "@/lib/ratelimit";

const SAM_STATUSES = ["not_started", "gathering_docs", "submitted", "active"] as const;

function cleanStatus(value: unknown): (typeof SAM_STATUSES)[number] {
  return SAM_STATUSES.includes(value as (typeof SAM_STATUSES)[number])
    ? (value as (typeof SAM_STATUSES)[number])
    : "not_started";
}

function cleanBool(value: unknown): boolean {
  return value === true;
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Please sign in to continue." }, { status: 401 });
  }
  try {
    const db = getDb();
    const rows = await db
      .select()
      .from(readinessAssessments)
      .where(eq(readinessAssessments.userId, userId));
    return NextResponse.json({ assessment: rows[0] ?? null });
  } catch (err) {
    console.error("readiness GET error", err);
    return NextResponse.json({ error: "Could not load your assessment." }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Please sign in to continue." }, { status: 401 });
  }

  if (!checkRateLimit(`readiness:${userId}`, 20, 60_000)) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const values = {
    samStatus: cleanStatus(body.samStatus),
    hasUei: cleanBool(body.hasUei),
    hasEntity: cleanBool(body.hasEntity),
    hasNaics: cleanBool(body.hasNaics),
    hasSamLogin: cleanBool(body.hasSamLogin),
    hasCapabilityStatement: cleanBool(body.hasCapabilityStatement),
    hasPastPerformance: cleanBool(body.hasPastPerformance),
  };

  try {
    const db = getDb();
    await ensureUser(userId);
    const existing = await db
      .select({ userId: readinessAssessments.userId })
      .from(readinessAssessments)
      .where(eq(readinessAssessments.userId, userId));
    if (existing.length > 0) {
      await db
        .update(readinessAssessments)
        .set({ ...values, updatedAt: new Date() })
        .where(eq(readinessAssessments.userId, userId));
    } else {
      await db.insert(readinessAssessments).values({ userId, ...values });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("readiness PUT error", err);
    return NextResponse.json({ error: "Could not save your assessment." }, { status: 500 });
  }
}
