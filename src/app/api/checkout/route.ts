import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getStripe, APP_URL } from "@/lib/stripe";
import { PAID_TIERS, TIERS, type TierId } from "@/lib/tiers";
import { ACK_VERSION } from "@/lib/ack";
import { checkRateLimit } from "@/lib/ratelimit";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Please sign in to continue." }, { status: 401 });
    }

    if (!checkRateLimit(`checkout:${userId}`, 10, 60_000)) {
      return NextResponse.json(
        { error: "Too many checkout attempts. Please wait a minute and try again." },
        { status: 429 }
      );
    }

    const body = (await req.json().catch(() => null)) as {
      tier?: unknown;
      acknowledged?: unknown;
      ackVersion?: unknown;
    } | null;
    const tier = typeof body?.tier === "string" ? body.tier : "";
    const def = PAID_TIERS.find((t) => t.id === tier);
    if (!def) {
      return NextResponse.json({ error: "Please choose a valid plan." }, { status: 400 });
    }

    // The buyer must acknowledge the educational-product / no-auto-renewal
    // terms. The checkbox lives on the pricing page; the server re-checks.
    if (body?.acknowledged !== true || body?.ackVersion !== ACK_VERSION) {
      return NextResponse.json(
        { error: "Please confirm the acknowledgment before continuing to payment." },
        { status: 400 }
      );
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: TIERS[tier as TierId].priceCents,
            product_data: {
              name: `ContractReady ${TIERS[tier as TierId].name}`,
              description: TIERS[tier as TierId].tagline,
            },
          },
          quantity: 1,
        },
      ],
      metadata: { userId, tier, ackVersion: ACK_VERSION },
      success_url: `${APP_URL}/dashboard?purchase=success`,
      cancel_url: `${APP_URL}/pricing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("checkout error", err);
    return NextResponse.json({ error: "Could not start checkout. Please try again." }, { status: 500 });
  }
}
