import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { ensureUser } from "@/lib/access";
import { opportunityProfiles } from "@/db/schema";
import { checkRateLimit } from "@/lib/ratelimit";

const MAX = {
  companyName: 120,
  naicsCodes: 200,
  certifications: 200,
  state: 2,
  keywords: 300,
  capacityNotes: 1000,
};

function clean(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const v = value.trim();
  if (v.length === 0) return null;
  return v.slice(0, max);
}

function validateNaics(value: string | null): string | null {
  if (!value) return "NAICS codes must be 6 digits each, separated by commas.";
  const codes = value.split(",").map((s) => s.trim()).filter(Boolean);
  if (codes.length === 0 || codes.length > 5) {
    return "Enter 1 to 5 NAICS codes, separated by commas.";
  }
  if (!codes.every((c) => /^\d{6}$/.test(c))) {
    return "Each NAICS code must be exactly 6 digits.";
  }
  return null;
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
      .from(opportunityProfiles)
      .where(eq(opportunityProfiles.userId, userId));
    return NextResponse.json({ profile: rows[0] ?? null });
  } catch (err) {
    console.error("opportunity-profile GET error", err);
    return NextResponse.json({ error: "Could not load your profile." }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Please sign in to continue." }, { status: 401 });
  }

  if (!checkRateLimit(`opportunity-profile:${userId}`, 10, 60_000)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a minute and try again." },
      { status: 429 }
    );
  }

  try {
    const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
    if (!body) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const companyName = clean(body.companyName, MAX.companyName);
    const naicsCodes = clean(body.naicsCodes, MAX.naicsCodes);
    const certifications = clean(body.certifications, MAX.certifications);
    let state = clean(body.state, MAX.state);
    const keywords = clean(body.keywords, MAX.keywords);
    const capacityNotes = clean(body.capacityNotes, MAX.capacityNotes);

    if (state) {
      state = state.toUpperCase();
      if (!/^[A-Z]{2}$/.test(state)) {
        return NextResponse.json(
          { error: "State must be a 2-letter US state code, for example TX." },
          { status: 400 }
        );
      }
    }

    const naicsError = validateNaics(naicsCodes);
    if (naicsError) {
      return NextResponse.json({ error: naicsError }, { status: 400 });
    }

    const kwList = (keywords ?? "").split(",").map((s) => s.trim()).filter(Boolean);
    if (kwList.length === 0 || kwList.length > 8) {
      return NextResponse.json(
        { error: "Enter 1 to 8 keywords describing your services, separated by commas." },
        { status: 400 }
      );
    }
    if (kwList.some((k) => k.length > 40)) {
      return NextResponse.json(
        { error: "Each keyword must be 40 characters or fewer." },
        { status: 400 }
      );
    }

    const db = getDb();
    await ensureUser(userId);
    await db
      .insert(opportunityProfiles)
      .values({
        userId,
        companyName,
        naicsCodes,
        certifications,
        state,
        keywords,
        capacityNotes,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: opportunityProfiles.userId,
        set: {
          companyName,
          naicsCodes,
          certifications,
          state,
          keywords,
          capacityNotes,
          updatedAt: new Date(),
        },
      });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("opportunity-profile PUT error", err);
    return NextResponse.json({ error: "Could not save your profile." }, { status: 500 });
  }
}
