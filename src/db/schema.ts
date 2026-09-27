import {
  pgTable,
  serial,
  text,
  timestamp,
  date,
  integer,
  boolean,
  index,
  primaryKey,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: text("id").primaryKey(), // Clerk user ID
    email: text("email"),
    // Durable RBAC role. 'customer' by default; 'admin' grants admin access.
    // The ADMIN_EMAILS env allowlist still works as a bootstrap fallback.
    role: text("role").notNull().default("customer"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [index("users_email_idx").on(t.email)]
);

export const purchases = pgTable(
  "purchases",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    tier: text("tier").notNull(), // TierId: starter | bidkit | growth | pro | allaccess
    stripeSessionId: text("stripe_session_id").unique(),
    stripePaymentIntentId: text("stripe_payment_intent_id"),
    amountCents: integer("amount_cents").notNull(),
    purchasedAt: timestamp("purchased_at").defaultNow().notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    refunded: boolean("refunded").default(false).notNull(),
    // Access revocation without a monetary refund. Used for reconciliation
    // recovery purchases that never had a Stripe payment intent, so no
    // money moved. Never mark these "refunded".
    accessRevoked: boolean("access_revoked").default(false).notNull(),
    // Stripe refund id created by the admin refund action (Stripe-confirmed
    // refunds only).
    stripeRefundId: text("stripe_refund_id"),
    // Checkout acknowledgment audit: when the buyer confirmed the
    // educational-product / no-auto-renewal terms, and which text version.
    ackAt: timestamp("ack_at"),
    ackVersion: text("ack_version"),
  },
  (t) => [index("purchases_user_id_idx").on(t.userId)]
);

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  source: text("source").notNull().default("free-checklist"),
  // Consent audit for the "send me the checklist + occasional updates" promise.
  consentVersion: text("consent_version"),
  unsubscribed: boolean("unsubscribed").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const bidKitRequests = pgTable(
  "bid_kit_requests",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    solicitationTitle: text("solicitation_title").notNull(),
    solicitationUrl: text("solicitation_url"),
    status: text("status").notNull().default("requested"), // requested | in_progress | delivered
    adminNotes: text("admin_notes"),
    deliveryUrl: text("delivery_url"),
    solicitationDueDate: date("solicitation_due_date"),
    inProgressAt: timestamp("in_progress_at"),
    revisionCount: integer("revision_count").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    deliveredAt: timestamp("delivered_at"),
  },
  (t) => [index("bid_kit_requests_user_id_idx").on(t.userId)]
);

/**
 * Business profile for opportunity matching. One row per user, updated in
 * place. Powers the tailored SAM.gov search pack on /dashboard/opportunities
 * and is visible to admins so written guidance can reference it.
 */
export const opportunityProfiles = pgTable(
  "opportunity_profiles",
  {
    userId: text("user_id")
      .primaryKey()
      .references(() => users.id),
    companyName: text("company_name"),
    naicsCodes: text("naics_codes"), // comma-separated, e.g. "541511, 541512"
    certifications: text("certifications"), // comma-separated labels, e.g. "8(a), HUBZone"
    state: text("state"), // 2-letter US state code for place-of-performance filtering
    keywords: text("keywords"), // comma-separated search keywords describing services
    capacityNotes: text("capacity_notes"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  }
);

/**
 * Notification log: every transactional email the system attempts to send.
 * Needed for Phase 2 email. Status: sent | skipped (no provider configured)
 * | failed. Bodies are not stored, only the type and subject.
 */
export const notificationLog = pgTable(
  "notification_log",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id"),
    email: text("email").notNull(),
    type: text("type").notNull(), // welcome | purchase_confirmation | checklist_delivery | bidkit_received | bidkit_status | bidkit_delivered
    subject: text("subject").notNull(),
    status: text("status").notNull().default("skipped"), // sent | skipped | failed
    error: text("error"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [index("notification_log_user_idx").on(t.userId)]
);

/**
 * Lesson progress. One row per (user, lesson): started when the
 * lesson is first opened, completed when the user marks it done.
 * Used for resume behavior and as refund-review evidence ("accessed more
 * than 50% of included lessons").
 */
export const lessonProgress = pgTable(
  "lesson_progress",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    slug: text("slug").notNull(),
    status: text("status").notNull().default("started"), // started | completed
    startedAt: timestamp("started_at").defaultNow().notNull(),
    completedAt: timestamp("completed_at"),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [
    primaryKey({ columns: [t.userId, t.slug] }),
    index("lesson_progress_user_idx").on(t.userId),
    index("lesson_progress_updated_idx").on(t.updatedAt),
  ]
);

/**
 * Readiness self-assessment. One row per user, updated in place.
 * Powers the Contract Readiness Score on the dashboard: the member's
 * self-reported SAM.gov status, business foundations, and bidding toolkit,
 * combined with real lesson progress and activity data.
 */
export const readinessAssessments = pgTable("readiness_assessments", {
  userId: text("user_id")
    .primaryKey()
    .references(() => users.id),
  samStatus: text("sam_status").notNull().default("not_started"), // not_started | gathering_docs | submitted | active
  hasUei: boolean("has_uei").default(false).notNull(),
  hasEntity: boolean("has_entity").default(false).notNull(),
  hasNaics: boolean("has_naics").default(false).notNull(),
  hasSamLogin: boolean("has_sam_login").default(false).notNull(),
  hasCapabilityStatement: boolean("has_capability_statement").default(false).notNull(),
  hasPastPerformance: boolean("has_past_performance").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/** Reconciliation cases: paid Stripe sessions with no matching purchase
 * row, persisted so they survive across sweeps and can be reviewed and
 * resolved by an admin. Status: open | resolved | ignored. */
export const reconcileCases = pgTable(
  "reconcile_cases",
  {
    id: serial("id").primaryKey(),
    stripeSessionId: text("stripe_session_id").notNull().unique(),
    userId: text("user_id"),
    email: text("email"),
    tier: text("tier"),
    amountCents: integer("amount_cents"),
    sessionCreatedAt: timestamp("session_created_at"),
    status: text("status").notNull().default("open"), // open | resolved | ignored
    resolvedAt: timestamp("resolved_at"),
    resolutionNote: text("resolution_note"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [index("reconcile_cases_status_idx").on(t.status)]
);

/**
 * Stripe webhook event log. Used for idempotency (one row per event id) and
 * for reconciliation: any event stuck in 'received' or 'failed' needs review.
 */
export const stripeEvents = pgTable("stripe_events", {
  id: text("id").primaryKey(), // Stripe event id, e.g. evt_...
  type: text("type").notNull(),
  status: text("status").notNull().default("received"), // received | processed | failed
  error: text("error"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/**
 * First-party analytics events. No cookies, no third-party trackers: events
 * are logged server-side on key actions (page views of marketing pages,
 * lesson views, template downloads, checkout starts, purchases, bid-kit
 * requests, checklist signups). Powers the admin analytics dashboard.
 */
export const analyticsEvents = pgTable(
  "analytics_events",
  {
    id: serial("id").primaryKey(),
    event: text("event").notNull(), // e.g. lesson_view, checkout_started
    path: text("path").notNull(), // request path, e.g. /dashboard/learn/starter-...
    userId: text("user_id"), // Clerk user id when signed in, else null
    meta: text("meta"), // optional small JSON string, e.g. {"tier":"starter"}
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [
    index("analytics_events_event_idx").on(t.event),
    index("analytics_events_created_at_idx").on(t.createdAt),
  ]
);
