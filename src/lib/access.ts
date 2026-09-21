import { and, eq, gt } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { purchases, users } from "@/db/schema";
import { highestTier, type TierId } from "@/lib/tiers";

export interface ActivePurchase {
  id: number;
  tier: TierId;
  purchasedAt: Date;
  expiresAt: Date;
  amountCents: number;
}

/** Non-refunded, non-revoked, non-expired purchases for a user, earliest-expiring first. */
export async function getActivePurchases(userId: string): Promise<ActivePurchase[]> {
  const db = getDb();
  const rows = await db
    .select({
      id: purchases.id,
      tier: purchases.tier,
      purchasedAt: purchases.purchasedAt,
      expiresAt: purchases.expiresAt,
      amountCents: purchases.amountCents,
    })
    .from(purchases)
    .where(
      and(
        eq(purchases.userId, userId),
        eq(purchases.refunded, false),
        eq(purchases.accessRevoked, false),
        gt(purchases.expiresAt, new Date())
      )
    )
    .orderBy(purchases.expiresAt);
  return rows.map((r) => ({
    id: r.id,
    tier: r.tier as TierId,
    purchasedAt: r.purchasedAt,
    expiresAt: r.expiresAt,
    amountCents: r.amountCents,
  }));
}

/**
 * Effective tier for a user: highest tier among active (non-refunded,
 * non-revoked, non-expired) purchases, or "free" when there are none.
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

/**
 * Ensures a users row exists for the Clerk user ID; safe to call on every login.
 * A brand-new account also gets the welcome email (logged as skipped until an
 * email provider is configured).
 */
export async function ensureUser(userId: string, email?: string): Promise<void> {
  const db = getDb();
  const inserted = await db
    .insert(users)
    .values({ id: userId, email: email ?? null })
    .onConflictDoNothing()
    .returning({ id: users.id });
  if (inserted.length > 0 && email) {
    const { sendEmail, welcomeEmail } = await import("@/lib/email");
    await sendEmail({ to: email, userId, type: "welcome", template: welcomeEmail() });
  }
}
