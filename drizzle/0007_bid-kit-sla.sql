-- Bid-kit SLA tracking: solicitation due date (buyer-provided), in-progress
-- timestamp for queue-wait vs prep-time insight, and revision counter for the
-- one-revision rule. All additive; existing rows keep their history.
ALTER TABLE "bid_kit_requests" ADD COLUMN "solicitation_due_date" date;
ALTER TABLE "bid_kit_requests" ADD COLUMN "in_progress_at" timestamp;
ALTER TABLE "bid_kit_requests" ADD COLUMN "revision_count" integer DEFAULT 0 NOT NULL;
