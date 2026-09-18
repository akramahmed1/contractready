import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getStripe } from "@/lib/stripe";
import { getDb } from "@/lib/db";
import { purchases, stripeEvents, users } from "@/db/schema";
import { PAID_TIERS, TIERS, type TierId } from "@/lib/tiers";

// App Router: no bodyParser config needed. We read the raw body via req.text()
// and verify the Stripe signature ourselves.

async function markEvent(id: string, status: "processed" | "failed", error?: string) {
  try {
    const db = getDb();
    await db
      .update(stripeEvents)
      .set({ status, error: error ?? null })
      .where(eq(stripeEvents.id, id));
  } catch (e) {
    console.error("stripe webhook: could not mark event", id, e);
  }
}

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: "Missing webhook signature or secret." }, { status: 400 });
  }

  let event: { id: string; type: string; data: { object: unknown } };
  try {
    const stripe = getStripe();
    const rawBody = await req.text();
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret) as typeof event;
  } catch (err) {
    console.error("stripe webhook signature error", err);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  const db = getDb();

  // Idempotency + reconciliation log: one row per Stripe event id.
  // Reprocessing a redelivered event is safe: the purchase insert below is
  // guarded by the stripe_session_id unique constraint, and refund updates
  // are idempotent. Events stuck in 'received'/'failed' need manual review.
  try {
    await db.insert(stripeEvents).values({ id: event.id, type: event.type }).onConflictDoNothing();
  } catch (err) {
    console.error("stripe webhook: event log insert failed", err);
    // If we cannot even log the event, ask Stripe to retry.
    return NextResponse.json({ error: "Temporary error. Please retry." }, { status: 500 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as {
      id: string;
      metadata?: { userId?: string; tier?: string; ackVersion?: string; ackAt?: string };
      amount_total?: number | null;
      payment_intent?: string | { id: string } | null;
    };
    const userId = session.metadata?.userId;
    const tier = session.metadata?.tier as TierId | undefined;
    const valid = PAID_TIERS.some((t) => t.id === tier);

    if (!userId || !valid) {
      const msg = `missing/invalid metadata on session ${session.id}`;
      console.error("stripe webhook:", msg);
      await markEvent(event.id, "failed", msg);
      // Do not retry: this event can never succeed without valid metadata.
      return NextResponse.json({ received: true });
    }

    try {
      const expiresAt = new Date();
      expiresAt.setMonth(expiresAt.getMonth() + TIERS[tier as TierId].termMonths);
      const paymentIntentId =
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : (session.payment_intent?.id ?? null);

      // ackAt comes from the checkout session metadata (acknowledgment time),
      // not from webhook receipt time. Fall back to now for sessions created
      // before the metadata was added.
      const ackAtRaw = session.metadata?.ackAt;
      const ackAtParsed = ackAtRaw ? new Date(ackAtRaw) : null;
      const ackAt =
        session.metadata?.ackVersion && ackAtParsed && !Number.isNaN(ackAtParsed.getTime())
          ? ackAtParsed
          : session.metadata?.ackVersion
            ? new Date()
            : null;

      // FK to users: create the user row first, then the purchase.
      await db.insert(users).values({ id: userId }).onConflictDoNothing();
      await db
        .insert(purchases)
        .values({
          userId,
          tier: tier as TierId,
          stripeSessionId: session.id,
          stripePaymentIntentId: paymentIntentId,
          amountCents: session.amount_total ?? TIERS[tier as TierId].priceCents,
          expiresAt,
          refunded: false,
          ackAt,
          ackVersion: session.metadata?.ackVersion ?? null,
        })
        .onConflictDoNothing();

      await markEvent(event.id, "processed");
      return NextResponse.json({ received: true });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "fulfillment error";
      console.error("stripe webhook fulfillment error", err);
      await markEvent(event.id, "failed", msg);
      // Return a retriable status so Stripe redelivers. Idempotency is
      // preserved by stripe_session_id + the event log above.
      return NextResponse.json({ error: "Temporary error. Please retry." }, { status: 500 });
    }
  }

  // Refunds revoke access: mark the matching purchase refunded.
  if (event.type === "charge.refunded" || event.type === "refund.created") {
    try {
      const obj = event.data.object as {
        payment_intent?: string | { id: string } | null;
        charge?: string | null;
      };
      const pi =
        typeof obj.payment_intent === "string" ? obj.payment_intent : (obj.payment_intent?.id ?? null);
      if (pi) {
        await db
          .update(purchases)
          .set({ refunded: true })
          .where(eq(purchases.stripePaymentIntentId, pi));
      } else {
        console.error("stripe webhook: refund event without payment_intent", event.id);
      }
      await markEvent(event.id, "processed");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "refund handling error";
      console.error("stripe webhook refund error", err);
      await markEvent(event.id, "failed", msg);
      return NextResponse.json({ error: "Temporary error. Please retry." }, { status: 500 });
    }
    return NextResponse.json({ received: true });
  }

  // Unhandled event types are acknowledged so Stripe does not retry them.
  await markEvent(event.id, "processed");
  return NextResponse.json({ received: true });
}
