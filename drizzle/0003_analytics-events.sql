CREATE TABLE "analytics_events" (
	"id" serial PRIMARY KEY NOT NULL,
	"event" text NOT NULL,
	"path" text NOT NULL,
	"user_id" text,
	"meta" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "analytics_events_event_idx" ON "analytics_events" USING btree ("event");--> statement-breakpoint
CREATE INDEX "analytics_events_created_at_idx" ON "analytics_events" USING btree ("created_at");