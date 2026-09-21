import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { asc, eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { bidKitRequests } from "@/db/schema";
import { getBidKitAllowance, validateBidKitInput } from "@/lib/bidkits";
import { checkRateLimit } from "@/lib/ratelimit";
import { logEventWait } from "@/lib/analytics";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Please sign in to continue." }, { status: 401 });
  }
  try {
    const db = getDb();
    const rows = await db
      .select()
      .from(bidKitRequests)
      .where(eq(bidKitRequests.userId, userId))
      .orderBy(asc(bidKitRequests.createdAt));
    const allowance = await getBidKitAllowance(userId);
    return NextResponse.json({
      requests: rows,
      allowance: {
        total: allowance.total,
        used: allowance.used,
        remaining: allowance.remaining,
      },
    });
  } catch (err) {
    console.error("bid-kits GET error", err);
    return NextResponse.json({ error: "Could not load your bid kit requests." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Please sign in to continue." }, { status: 401 });
  }

  if (!checkRateLimit(`bid-kits:${userId}`, 10, 60_000)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a minute and try again." },
      { status: 429 }
    );
  }

  try {
    const body = (await req.json().catch(() => null)) as {
      solicitationTitle?: unknown;
      solicitationUrl?: unknown;
    } | null;

    const validated = validateBidKitInput(body?.solicitationTitle, body?.solicitationUrl);
    if ("error" in validated) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    const allowance = await getBidKitAllowance(userId);
    if (allowance.remaining <= 0) {
      const hasPlan = allowance.total > 0;
      return NextResponse.json(
        {
          error: hasPlan
            ? "You have used all the bid kits in your current plan period."
            : "Your plan does not include bid kits. Upgrade to request one.",
        },
        { status: 403 }
      );
    }

    const db = getDb();
    await logEventWait("bid_kit_requested", "/api/bid-kits", userId);
    await db.insert(bidKitRequests).values({
      userId,
      solicitationTitle: validated.title,
      solicitationUrl: validated.url,
    });
    try {
      const { sendEmail, bidKitReceivedEmail, getUserEmail } = await import("@/lib/email");
      const email = await getUserEmail(userId);
      if (email) {
        await sendEmail({
          to: email,
          userId,
          type: "bidkit_received",
          template: bidKitReceivedEmail(validated.title),
        });
      }
    } catch (err) {
      console.error("bid-kit received email failed", err);
    }

    const updated = await getBidKitAllowance(userId);
    return NextResponse.json({
      ok: true,
      allowance: {
        total: updated.total,
        used: updated.used,
        remaining: updated.remaining,
      },
    });
  } catch (err) {
    console.error("bid-kits POST error", err);
    return NextResponse.json({ error: "Could not submit your request. Please try again." }, { status: 500 });
  }
}
