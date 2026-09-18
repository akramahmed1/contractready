import { and, eq, gt } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { purchases, users } from "@/db/schema";
import { highestTier, type TierId } from "@/lib/tiers";

export interface ActivePurchase {
  tier: TierId;
  expiresAt: Date;
  amountCents: number;
}

/** Non-refunded, non-expired purchases for a user, newest first. */
export async function getActivePurchases(userId: string): Promise<ActivePurchase[]> {
  const db = getDb();
  const rows = await db
    .select({
      tier: purchases.tier,
      expiresAt: purchases.expiresAt,
      amountCents: purchases.amountCents,
    })
    .from(purchases)
    .where(
      and(
        eq(purchases.userId, userId),
        eq(purchases.refunded, false),
        gt(purchases.expiresAt, new Date())
      )
    );
  return rows.map((r) => ({
    tier: r.tier as TierId,
    expiresAt: r.expiresAt,
    amountCents: r.amountCents,
  }));
}

/**
 * Effective tier for a user: highest tier among active (non-refunded,
 * non-expired) purchases, or "free" when there are none.
 */
export async function getUserTier(userId: string): Promise<TierId> {
  try {
    const active = await getActivePurchases(userId);
    if (active.length === 0) return "free";
    return highestTier(active.map((p) => p.tier));
  } catch {
    // If the database is unreachable, treat the user as free rather than crashing.
    return "free";
  }
}

/** Ensures a users row exists for the Clerk user ID; safe to call on every login. */
export async function ensureUser(userId: string, email?: string): Promise<void> {
  const db = getDb();
  await db
    .insert(users)
    .values({ id: userId, email: email ?? null })
    .onConflictDoNothing();
}
