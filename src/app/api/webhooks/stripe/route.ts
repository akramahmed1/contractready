import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getDb } from "@/lib/db";
import { purchases, users } from "@/db/schema";
import { PAID_TIERS, TIERS, type TierId } from "@/lib/tiers";

// App Router: no bodyParser config needed. We read the raw body via req.text()
// and verify the Stripe signature ourselves.

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: "Missing webhook signature or secret." }, { status: 400 });
  }

  let event;
  try {
    const stripe = getStripe();
    const rawBody = await req.text();
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error("stripe webhook signature error", err);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    try {
      const session = event.data.object as {
        id: string;
        metadata?: { userId?: string; tier?: string };
        amount_total?: number | null;
      };
      const userId = session.metadata?.userId;
      const tier = session.metadata?.tier as TierId | undefined;
      const valid = PAID_TIERS.some((t) => t.id === tier);
      if (!userId || !valid) {
        console.error("stripe webhook: missing/invalid metadata", session.id);
      } else {
        const expiresAt = new Date();
        expiresAt.setMonth(expiresAt.getMonth() + TIERS[tier as TierId].termMonths);

        const db = getDb();
        await db
          .insert(users)
          .values({ id: userId })
          .onConflictDoNothing();
        await db
          .insert(purchases)
          .values({
            userId,
            tier: tier as TierId,
            stripeSessionId: session.id,
            amountCents: session.amount_total ?? TIERS[tier as TierId].priceCents,
            expiresAt,
            refunded: false,
          })
          .onConflictDoNothing();
      }
    } catch (err) {
      console.error("stripe webhook fulfillment error", err);
      // Still ack so Stripe does not retry in a tight loop.
    }
  }

  return NextResponse.json({ received: true });
}
