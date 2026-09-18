import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { leads } from "@/db/schema";
import { LEAD_CONSENT_VERSION } from "@/lib/consent";
import { checkRateLimit, clientIp } from "@/lib/ratelimit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    // Abuse protection: 5 submissions per hour per IP.
    if (!checkRateLimit(`free-checklist:${clientIp(req)}`, 5, 3_600_000)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = (await req.json().catch(() => null)) as {
      email?: unknown;
      // Honeypot: real users never fill this hidden field.
      company_website?: unknown;
    } | null;

    if (typeof body?.company_website === "string" && body.company_website.trim() !== "") {
      // Pretend success so bots cannot tell they were caught.
      return NextResponse.json({ ok: true });
    }

    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!email || !EMAIL_RE.test(email) || email.length > 254) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const db = getDb();
    await db
      .insert(leads)
      .values({ email, source: "free-checklist", consentVersion: LEAD_CONSENT_VERSION })
      .onConflictDoNothing();

    return NextResponse.json({ ok: true });
  } catch (err) {
    // Never leak raw errors to the client.
    console.error("free-checklist error", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
