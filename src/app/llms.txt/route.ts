/**
 * llms.txt for agent discovery of the ContractReady MCP connector.
 * Spec: https://llmstxt.org
 */

const APP_URL = "https://contractready-production-631d.up.railway.app";

const BODY = `# ContractReady

> Find government contracts you can actually bid on, and learn how to bid, right inside Muse.

ContractReady helps small businesses find live US federal, state, and subcontracting opportunities matched to what they do, track deadlines, and prepare bid-ready checklists. We are an independent private education and guidance service. We are not a government agency and are not affiliated with SAM.gov.

## MCP connector (v1, read-only, no auth)

- Endpoint: POST ${APP_URL}/mcp
- Protocol: Streamable HTTP (MCP 2025-06-18); single JSON responses, no SSE
- Docs: ${APP_URL}/connect
- Rate limit: 25 anonymous tool calls/day per IP

## Tools

### search_opportunities
Search live federal, state, and subcontracting opportunities.
Params: keywords, naics (6-digit), set_aside ("8(a)", "HUBZone", "SDVOSB", "WOSB", "Small Business"), state (2-letter), agency, posted_within_days, due_within_days, limit (default 10, max 50).
Returns: notice_id, title, agency, posted_date, response_deadline, naics, set_aside, place_of_performance, contract_type, detail_url, summary. Every response includes the official solicitation link.

### get_opportunity_details
Param: notice_id. Returns full detail: description, requirements, deadlines, submission method, contacts, amendments, official solicitation link.

### get_guidance
Param: topic. Free SAM.gov registration walkthrough and bidding guidance.
Topics: sam-registration, naics-selection, rejection-reasons, first-bid-roadmap, set-aside-basics.

## Example prompts
- Find open federal IT services contracts for small businesses in Texas.
- What is due this week on my watchlist? (search with due_within_days)
- Walk me through SAM.gov registration for my LLC.

## Disclaimer
ContractReady is an independent private education and guidance service, not a government agency and not affiliated with SAM.gov. The official solicitation and its amendments control; always read the official materials. No registration approval, bid acceptance, award, or revenue is ever guaranteed.
`;

export async function GET() {
  return new Response(BODY, {
    status: 200,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
