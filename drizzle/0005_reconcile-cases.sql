CREATE TABLE "reconcile_cases" (
	"id" serial PRIMARY KEY NOT NULL,
	"stripe_session_id" text NOT NULL,
	"user_id" text,
	"email" text,
	"tier" text,
	"amount_cents" integer,
	"session_created_at" timestamp,
	"status" text DEFAULT 'open' NOT NULL,
	"resolved_at" timestamp,
	"resolution_note" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "reconcile_cases_stripe_session_id_unique" UNIQUE("stripe_session_id")
);
--> statement-breakpoint
CREATE INDEX "reconcile_cases_status_idx" ON "reconcile_cases" USING btree ("status");