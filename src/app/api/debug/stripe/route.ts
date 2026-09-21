import { NextResponse } from "next/server";

/**
 * Temporary diagnostic endpoint (to be removed): reports only WHETHER Stripe
 * is configured. Never returns secret values.
 */
export async function GET() {
  const secret = process.env.STRIPE_SECRET_KEY ?? "";
  return NextResponse.json({
    stripeSecretConfigured: secret.length > 0,
    stripeSecretIsTestKey: secret.startsWith("sk_test_"),
    webhookSecretConfigured: (process.env.STRIPE_WEBHOOK_SECRET ?? "").length > 0,
  });
}
