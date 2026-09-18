import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { leads } from "@/db/schema";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as { email?: unknown } | null;
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const db = getDb();
    await db
      .insert(leads)
      .values({ email, source: "free-checklist" })
      .onConflictDoNothing();

    return NextResponse.json({ ok: true });
  } catch (err) {
    // Never leak raw errors to the client.
    console.error("free-checklist error", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
