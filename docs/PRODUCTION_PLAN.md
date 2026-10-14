# ContractReady: production plan

Product rules from the README stay non-negotiable: SAM.gov registration is free
and disclosed as free, no credentials collected, no win/award claims, no
government affiliation, one-time payments (any subscription is optional and
add-on only).

## Phase 1: hardening (this PR)

- Unit tests for the pure business logic (`npm test`, Node's built-in runner,
  no new dependencies): tiers, rate limiting, client IP, readiness score, SLA
  business-day math.
- Bugs found by the tests and fixed:
  1. Bid kits requested on a weekend or holiday and delivered on the promised
     date were marked **missed**. Status now compares against the promised date.
  2. When New Year's Day falls on a Saturday (first case: Jan 1 2028), the
     observed Friday holiday (Dec 31 2027) was treated as a business day.
  3. Readiness "lessons completed" could exceed 100% (seen as 500%) when lesson
     access shrinks after a refund or downgrade, inflating the overall score.
     Completed lessons are now capped at the unlocked count.
- CI on every PR: tests, typecheck, production build, dependency audit.
- Dependabot: weekly npm updates (Next/React and Clerk grouped, majors held back)
  and monthly GitHub Actions updates.

### Needs a machine with npm (cannot be done from the cloud workspace)

- `npm install next@^15.5.27`: the locked 15.5.25 is below the version Railway's
  scanner required for planet-hunter, so the next deploy may be blocked. Dependabot
  will also open this PR. Then remove `continue-on-error` from the audit step.

## Phase 2: launch blockers

- Attorney review of `/legal/*`; remove draft banners only after sign-off.
- Stripe live mode: live keys, live webhook endpoint, a test purchase and refund
  on production, reconciliation run.
- Move the 67 MB of walkthrough videos out of git to object storage or a video
  host (Cloudflare R2/Stream, Mux); rewrite history only with your approval.
- Register migrations 0007 to 0009 with drizzle-kit (they are applied by
  `db:push` but missing from the migration journal), then switch deploys to
  `drizzle-kit migrate` so schema changes are versioned.
- Delete the stale `master` branch (fully contained in `main`), with your approval.
- Error monitoring (Sentry), uptime checks, security headers (CSP, HSTS),
  shared rate-limit store (Upstash Redis) before running more than one instance.
- Integration tests for the Stripe webhook and access gating against a
  throwaway Postgres; Playwright E2E for signup, checkout (Stripe test mode),
  lesson access and bid-kit request.

## Phase 3: recurring value and AI

Recurring value (what justifies an optional subscription):
- Daily opportunity alerts from the SAM.gov Opportunities API plus the verified
  state portals in `state-portals-verified.json`, matched to the business profile.
- SAM.gov annual renewal reminders (registration expires yearly).
- Milestone tracking: UEI obtained, SAM active, first bid submitted. Proves value
  without any win claims.

AI features (deterministic filters first, AI explains and drafts, human approves):
- Opportunity fit explainer: why an opportunity matches the profile, citing the
  NAICS code, set-aside and dates from the notice itself.
- Solicitation breakdown: requirements and compliance checklist extracted from
  an RFP, with every item linked to its page and section.
- Capability statement drafting from the business profile.
- Bid-kit fulfillment copilot for the internal team first, so turnaround drops
  before anything customer-facing ships.

AI production standards for these:
- Structured outputs validated against schemas; every claim carries a citation
  back to the source document.
- A deterministic "product rules" checker on all AI output: blocks win/award
  language, implied government affiliation, and any suggestion that SAM.gov costs
  money.
- Eval suite in CI (fixed solicitations with expected extractions); prompt-injection
  tests using hostile text inside uploaded RFPs.
- Tracing, per-user cost caps, and logging of model version per output.

## Phase 4: growth

- APEX Accelerator referral partnership instead of head-on competition.
- FirstWin stories as top-of-funnel content.
- Subcontracting and teaming guidance, where most first wins come from.
- Spanish-language onboarding; email nurture sequences; funnel analytics.
