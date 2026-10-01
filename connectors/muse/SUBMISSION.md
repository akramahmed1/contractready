# ContractReady - Meta Muse Connectors Submission Packet (v1)

> Everything in this packet is ready. The actual submission must be done by
> the product owner: sign in at **https://muse.ai/platform**, create the
> connector entry, and tick the three attestations yourself. This agent cannot
> submit on your behalf.

## Meta form fields

| Field | Value |
|---|---|
| Product name | ContractReady |
| Display name | ContractReady |
| Company | ContractReady |
| Website | https://contractready-production-631d.up.railway.app |
| MCP endpoint | https://contractready-production-631d.up.railway.app/mcp |
| Docs URL | https://contractready-production-631d.up.railway.app/connect |
| Agent discovery | https://contractready-production-631d.up.railway.app/llms.txt |
| Connection type | Existing MCP |
| Auth | none (anonymous, read-only) |
| Payments | no (no pricing or purchase in v1) |
| Tagline | Find government contracts you can actually bid on, and learn how to bid, right inside Muse. |
| Description | ContractReady helps small businesses find live US federal, state, and subcontracting opportunities matched to what they do, track deadlines, and prepare bid-ready checklists. We are an independent private education and guidance service. We are not a government agency and are not affiliated with SAM.gov. |

## Example prompts (for the listing)

1. Find open federal IT services contracts for small businesses in Texas.
2. What is due this week on my watchlist? (answered via search with due_within_days)
3. Walk me through SAM.gov registration for my LLC.

## Tools (v1, all read-only, no auth)

| Tool | Purpose |
|---|---|
| search_opportunities | Search live federal/state/subcontracting opportunities by keywords, NAICS, set-aside, state, agency, deadlines. Returns official solicitation links. |
| get_opportunity_details | Full detail for one notice: description, requirements, deadlines, submission method, contacts, amendments. |
| get_guidance | Free SAM.gov registration walkthrough and bidding guidance (5 topics). Educational content; not legal advice. |

Held for v2 (do NOT list or build in v1): check_eligibility (legally sensitive), watchlist, bid-kit purchase, any write actions, pricing/purchase, proactive notifications.

## The three attestations (owner ticks these at muse.ai/platform)

1. **Accuracy attestation.** Every response carries the disclaimer: "ContractReady is an independent private education and guidance service, not a government agency and not affiliated with SAM.gov. The official solicitation and its amendments control; always read the official materials. No registration approval, bid acceptance, award, or revenue is ever guaranteed." Stale seed items (past deadline) are filtered out; seed records carry an honest `last_verified_at` stamp (2026-09-18) and the response names its data source (`samgov` or `seed`).
2. **FTC-safe product rules.** The connector never implies SAM.gov registration costs money; never asks for, stores, or uses SAM.gov/Login.gov credentials; makes no win/award/revenue/profit claims; makes no government affiliation claims.
3. **Abuse controls.** 25 anonymous tool calls/day per IP on tools/call (discovery calls not counted). Rate-limit hits return a clean JSON-RPC error (-32000), are console-logged with IP + tool name, and counted in a private in-memory map exposed nowhere public. Emergency brake: set the `MCP_DAILY_CAP` env var on the Railway service to a lower number; no redeploy needed beyond the env change.

## Data sources

- Live: SAM.gov Contract Opportunities API v2 when `SAMGOV_API_KEY` is set on the Railway service (no key yet; code path is built and falls back gracefully).
- Fallback: curated seed dataset (`src/lib/connector/seed-opportunities.ts`, 43 records parsed from the 2026-09-18 opportunities workbook, official source URLs preserved).

## Transport notes (for Meta review)

- Streamable HTTP (MCP 2025-06-18); `initialize` echoes a supported client protocolVersion or negotiates down to `2025-06-18`.
- Every POST returns a single JSON body with `Content-Type: application/json`; no Server-Sent Events (their egress proxy hangs on SSE per community reports).
- GET/DELETE/PUT/PATCH on `/mcp` return 405.

## Owner steps remaining (after this packet)

1. Submit at **muse.ai/platform** (your own sign-in; tick the three attestations above).
2. Get a free SAM.gov public API key at **sam.gov** and add `SAMGOV_API_KEY` to the Railway service env (the connector switches from seed data to live data automatically).
3. Attorney review of legal pages before launch (already bannered as draft in the app).
