import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getStripe, APP_URL } from "@/lib/stripe";
import { PAID_TIERS, TIERS, type TierId } from "@/lib/tiers";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Please sign in to continue." }, { status: 401 });
    }

    const body = (await req.json().catch(() => null)) as { tier?: unknown } | null;
    const tier = typeof body?.tier === "string" ? body.tier : "";
    const def = PAID_TIERS.find((t) => t.id === tier);
    if (!def) {
      return NextResponse.json({ error: "Please choose a valid plan." }, { status: 400 });
    }

    const stripe = getStripe();
    // IMPORTANT: Before redirecting to this URL, the client must first show the
    // checkout acknowledgment text (the pricing/marketing page handles display):
    // the buyer acknowledges they are buying a guide/educational product, not
    // paying SAM.gov registration (which is always free), and that the purchase
    // is a one-time payment with no subscription.
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
      metadata: { userId, tier },
      success_url: `${APP_URL}/dashboard?purchase=success`,
      cancel_url: `${APP_URL}/pricing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("checkout error", err);
    return NextResponse.json({ error: "Could not start checkout. Please try again." }, { status: 500 });
  }
}
