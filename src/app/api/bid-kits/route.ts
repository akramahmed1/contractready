import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { count, eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { bidKitRequests } from "@/db/schema";
import { getUserTier } from "@/lib/access";
import { TIERS, type TierId } from "@/lib/tiers";

async function authedUserId() {
  const { userId } = await auth();
  return userId;
}

export async function GET() {
  const userId = await authedUserId();
  if (!userId) {
    return NextResponse.json({ error: "Please sign in to continue." }, { status: 401 });
  }
  try {
    const db = getDb();
    const rows = await db
      .select()
      .from(bidKitRequests)
      .where(eq(bidKitRequests.userId, userId))
      .orderBy(bidKitRequests.createdAt);
    return NextResponse.json({ requests: rows });
  } catch (err) {
    console.error("bid-kits GET error", err);
    return NextResponse.json({ error: "Could not load your bid kit requests." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const userId = await authedUserId();
  if (!userId) {
    return NextResponse.json({ error: "Please sign in to continue." }, { status: 401 });
  }
  try {
    const body = (await req.json().catch(() => null)) as {
      solicitationTitle?: unknown;
      solicitationUrl?: unknown;
    } | null;
    const solicitationTitle =
      typeof body?.solicitationTitle === "string" ? body.solicitationTitle.trim() : "";
    const solicitationUrl =
      typeof body?.solicitationUrl === "string" ? body.solicitationUrl.trim() : "";

    if (!solicitationTitle) {
      return NextResponse.json({ error: "Please enter the solicitation title." }, { status: 400 });
    }

    const tier: TierId = await getUserTier(userId);
    const allowance = TIERS[tier].bidKits;
    if (allowance <= 0) {
      return NextResponse.json(
        { error: "Your plan does not include bid kits. Upgrade to request one." },
        { status: 403 }
      );
    }

    const db = getDb();
    const [{ value: used }] = await db
      .select({ value: count() })
      .from(bidKitRequests)
      .where(eq(bidKitRequests.userId, userId));

    if (used >= allowance) {
      return NextResponse.json(
        { error: "You have used all the bid kits in your plan." },
        { status: 403 }
      );
    }

    await db.insert(bidKitRequests).values({
      userId,
      solicitationTitle,
      solicitationUrl: solicitationUrl || null,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("bid-kits POST error", err);
    return NextResponse.json({ error: "Could not submit your request. Please try again." }, { status: 500 });
  }
}
