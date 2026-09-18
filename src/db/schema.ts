import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  boolean,
  index,
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
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    deliveredAt: timestamp("delivered_at"),
  },
  (t) => [index("bid_kit_requests_user_id_idx").on(t.userId)]
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
