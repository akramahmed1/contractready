CREATE TABLE "stripe_events" (
	"id" text PRIMARY KEY NOT NULL,
	"type" text NOT NULL,
	"status" text DEFAULT 'received' NOT NULL,
	"error" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "bid_kit_requests" ADD COLUMN "admin_notes" text;--> statement-breakpoint
ALTER TABLE "bid_kit_requests" ADD COLUMN "delivery_url" text;--> statement-breakpoint
ALTER TABLE "bid_kit_requests" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "bid_kit_requests" ADD COLUMN "delivered_at" timestamp;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "consent_version" text;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "unsubscribed" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "purchases" ADD COLUMN "stripe_payment_intent_id" text;--> statement-breakpoint
ALTER TABLE "purchases" ADD COLUMN "ack_at" timestamp;--> statement-breakpoint
ALTER TABLE "purchases" ADD COLUMN "ack_version" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" text DEFAULT 'customer' NOT NULL;--> statement-breakpoint
ALTER TABLE "bid_kit_requests" ADD CONSTRAINT "bid_kit_requests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "bid_kit_requests_user_id_idx" ON "bid_kit_requests" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "purchases_user_id_idx" ON "purchases" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "users_email_idx" ON "users" USING btree ("email");