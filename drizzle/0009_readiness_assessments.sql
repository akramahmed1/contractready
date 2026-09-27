-- Readiness self-assessment: one row per user, updated in place.
-- Powers the Contract Readiness Score on the dashboard.
CREATE TABLE IF NOT EXISTS "readiness_assessments" (
  "user_id" text PRIMARY KEY NOT NULL REFERENCES "users"("id"),
  "sam_status" text DEFAULT 'not_started' NOT NULL,
  "has_uei" boolean DEFAULT false NOT NULL,
  "has_entity" boolean DEFAULT false NOT NULL,
  "has_naics" boolean DEFAULT false NOT NULL,
  "has_sam_login" boolean DEFAULT false NOT NULL,
  "has_capability_statement" boolean DEFAULT false NOT NULL,
  "has_past_performance" boolean DEFAULT false NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);
