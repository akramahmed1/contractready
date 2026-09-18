CREATE TABLE "opportunity_profiles" (
	"user_id" text PRIMARY KEY NOT NULL,
	"company_name" text,
	"naics_codes" text,
	"certifications" text,
	"state" text,
	"keywords" text,
	"capacity_notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "opportunity_profiles" ADD CONSTRAINT "opportunity_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;