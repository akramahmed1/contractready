# ContractReady

**From zero to contract-ready.** An honest membership platform that guides US small businesses through SAM.gov registration, finding bids, and submitting their first government contract bid.

SAM.gov registration is free. ContractReady sells the shortcut: step-by-step training, done-for-you bid kits, and written guidance.

## Stack

- Next.js 15 (App Router, TypeScript) + Tailwind CSS v4
- Clerk for authentication
- Neon Postgres + Drizzle ORM
- Stripe Checkout (test mode, one-time payments; renewals are manual by design)

## Quick start

```bash
npm install
cp .env.example .env
# paste keys per ENV_TEMPLATE.md
npm run db:push      # create tables in Neon
npm run pdf          # regenerate public/sam-gov-checklist.pdf
npm run dev          # http://localhost:3000
```

## Project layout

- `src/app/` marketing pages (`/`, `/how-it-works`, `/pricing`, `/faq`, `/free-checklist`), legal drafts (`/legal/*`), member area (`/dashboard`, `/admin`), API routes (`/api/*`)
- `src/content/` lesson content (structured TypeScript, gated by tier) and tier outlines
- `src/components/` shared UI
- `src/lib/` tier definitions, Stripe helpers, DB access
- `src/db/schema.ts` Drizzle schema (users, purchases, leads, bid_kit_requests)
- `scripts/generate-checklist-pdf.mjs` builds the free SAM.gov checklist PDF

## Deploy (Railway)

1. Create a Railway project from this repo.
2. Add all variables from `ENV_TEMPLATE.md`.
3. Set the Stripe webhook endpoint to `https://getcontractready.com/api/webhooks/stripe` once the domain is live (use the Railway URL until then).

## Legal status

`/legal/terms`, `/legal/privacy`, and `/legal/refunds` are **drafts**. Each carries a visible banner: "Draft. Requires attorney review before launch." Do not remove the banners until an attorney has reviewed the pages.

## Product rules (do not break these)

- Never imply SAM.gov registration costs money. The free official path is disclosed on every relevant page.
- Never ask for, store, or use a customer's SAM.gov or Login.gov credentials.
- No win, award, revenue, or profit claims anywhere. No testimonials implying typical results.
- No government affiliation claims. The footer disclosure ships on every page.
- One-time payments only. No auto-renewal.
