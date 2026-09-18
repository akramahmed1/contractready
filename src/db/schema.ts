import { pgTable, serial, text, timestamp, integer, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(), // Clerk user ID
  email: text("email"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const purchases = pgTable("purchases", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  tier: text("tier").notNull(), // TierId: starter | bidkit | growth | pro | allaccess
  stripeSessionId: text("stripe_session_id").unique(),
  amountCents: integer("amount_cents").notNull(),
  purchasedAt: timestamp("purchased_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  refunded: boolean("refunded").default(false).notNull(),
});

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  source: text("source").notNull().default("free-checklist"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const bidKitRequests = pgTable("bid_kit_requests", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  solicitationTitle: text("solicitation_title").notNull(),
  solicitationUrl: text("solicitation_url"),
  status: text("status").notNull().default("requested"), // requested | in_progress | delivered
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
