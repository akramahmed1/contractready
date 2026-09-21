-- Refund/access split: monetary refunds (Stripe-confirmed) are recorded
-- separately from access revocation (reconciliation recovery purchases
-- that never had a payment intent, so no money moved).
ALTER TABLE "purchases" ADD COLUMN "access_revoked" boolean DEFAULT false NOT NULL;
ALTER TABLE "purchases" ADD COLUMN "stripe_refund_id" text;
