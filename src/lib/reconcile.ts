import { getStripe } from "@/lib/stripe";
import { getDb } from "@/lib/db";
import { purchases, reconcileCases } from "@/db/schema";
import { inArray } from "drizzle-orm";

export interface ReconcileMismatch {
  stripeSessionId: string;
  amountCents: number | null;
  customerEmail: string | null;
  tier: string | null;
  userId: string | null;
  createdAt: string;
}

export interface ReconcileResult {
  checked: number;
  matched: number;
  mismatches: ReconcileMismatch[];
  casesPersisted: number;
  stripeReachable: boolean;
  error?: string;
}

/**
 * Reconciliation sweep: pages through all paid Stripe Checkout sessions in
 * the window and diffs them against our purchases table. Any session that is
 * paid at Stripe but has no purchase row means the buyer paid and never got
 * access. This is usually because the webhook's database write failed.
 *
 * Mismatches are persisted as reconcile_cases so they survive across sweeps
 * and can be resolved from the admin panel.
 *
 * Safe to run any time; it only reads Stripe and writes cases, never grants
 * access by itself.
 */
export async function runReconciliation(daysBack = 7): Promise<ReconcileResult> {
  const empty: ReconcileResult = {
    checked: 0,
    matched: 0,
    mismatches: [],
    casesPersisted: 0,
    stripeReachable: false,
  };
  if (!process.env.STRIPE_SECRET_KEY) {
    return { ...empty, error: "STRIPE_SECRET_KEY is not configured." };
  }

  const since = Math.floor(Date.now() / 1000) - daysBack * 24 * 60 * 60;

  interface SlimSession {
    id: string;
    payment_status: string;
    amount_total: number | null;
    customer_email: string | null;
    created: number;
    metadata?: { userId?: string; tier?: string };
  }
  const paid: SlimSession[] = [];

  try {
    const stripe = getStripe();
    // Manual pagination: the window can hold more than one page of 100.
    let startingAfter: string | undefined;
    for (;;) {
      const list = await stripe.checkout.sessions.list({
        created: { gte: since },
        limit: 100,
        starting_after: startingAfter,
      });
      for (const s of list.data) {
        if (s.payment_status === "paid") paid.push(s as unknown as SlimSession);
      }
      if (!list.has_more || list.data.length === 0) break;
      startingAfter = list.data[list.data.length - 1].id;
    }
  } catch (err) {
    return {
      ...empty,
      error: err instanceof Error ? err.message : "Stripe API error",
    };
  }

  if (paid.length === 0) {
    return { ...empty, stripeReachable: true };
  }

  const db = getDb();
  const ids = paid.map((s) => s.id);
  const rows = await db
    .select({ stripeSessionId: purchases.stripeSessionId })
    .from(purchases)
    .where(inArray(purchases.stripeSessionId, ids));
  const recorded = new Set(rows.map((r) => r.stripeSessionId));

  const mismatches: ReconcileMismatch[] = paid
    .filter((s) => !recorded.has(s.id))
    .map((s) => ({
      stripeSessionId: s.id,
      amountCents: s.amount_total,
      customerEmail: s.customer_email,
      tier: s.metadata?.tier ?? null,
      userId: s.metadata?.userId ?? null,
      createdAt: new Date(s.created * 1000).toISOString(),
    }));

  // Persist new cases; existing open cases are left untouched.
  // .returning() only yields rows that were actually inserted, so the
  // counter reflects real inserts even when onConflictDoNothing skips.
  let casesPersisted = 0;
  for (const m of mismatches) {
    try {
      const inserted = await db
        .insert(reconcileCases)
        .values({
          stripeSessionId: m.stripeSessionId,
          userId: m.userId,
          email: m.customerEmail,
          tier: m.tier,
          amountCents: m.amountCents,
          sessionCreatedAt: new Date(m.createdAt),
          status: "open",
        })
        .onConflictDoNothing()
        .returning({ id: reconcileCases.id });
      if (inserted.length > 0) casesPersisted += 1;
    } catch (err) {
      console.error("reconcile case insert failed", m.stripeSessionId, err);
    }
  }

  return {
    checked: paid.length,
    matched: paid.length - mismatches.length,
    mismatches,
    casesPersisted,
    stripeReachable: true,
  };
}
