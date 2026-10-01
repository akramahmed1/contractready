/**
 * ContractReady MCP endpoint (Streamable HTTP, MCP 2025-06-18).
 *
 * POST only. Responds to every request with a single JSON body
 * (Content-Type: application/json); no Server-Sent Events.
 *
 * v1 tools (read-only, no auth):
 *   - search_opportunities
 *   - get_opportunity_details
 *   - get_guidance
 *
 * Abuse controls: 25 anonymous tool calls/day per IP (env MCP_DAILY_CAP to
 * lower it in an emergency). Rate-limit hits are console-logged with IP and
 * tool name; blocked-IP counts are kept in a private in-memory map exposed
 * nowhere public.
 */
import { NextResponse } from "next/server";
import { checkRateLimit, clientIp } from "@/lib/ratelimit";
import {
  searchOpportunities,
  getOpportunityDetail,
  dataSource,
} from "@/lib/connector/opportunities";
import { getGuidance, listGuidanceTopics } from "@/lib/connector/guidance";
import {
  CONNECTOR_DISCLAIMER,
  type OpportunityFilters,
} from "@/lib/connector/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SUPPORTED_PROTOCOLS = ["2025-06-18", "2025-03-26", "2024-11-05"];
const DEFAULT_PROTOCOL = "2025-06-18";
const SERVER_VERSION = "1.0.0";
const MAX_STR = 200;

function dailyCap(): number {
  const raw = process.env.MCP_DAILY_CAP;
  const n = raw ? parseInt(raw, 10) : NaN;
  if (Number.isFinite(n) && n > 0) return Math.floor(n);
  return 25;
}

/** In-memory abuse counter: blocked tool calls per IP. Not exposed publicly. */
const blockedHits = new Map<string, number>();

// ---------------------------------------------------------------------------
// JSON-RPC helpers
// ---------------------------------------------------------------------------

type RpcId = string | number | null;

interface RpcRequest {
  jsonrpc?: string;
  id?: RpcId;
  method?: string;
  params?: Record<string, unknown>;
}

function rpcError(id: RpcId, code: number, message: string, data?: unknown) {
  return { jsonrpc: "2.0", id: id ?? null, error: { code, message, ...(data !== undefined ? { data } : {}) } };
}

function rpcResult(id: RpcId, result: unknown) {
  return { jsonrpc: "2.0", id, result };
}

function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: { "Content-Type": "application/json" } });
}

const STR = (v: unknown): string | undefined =>
  typeof v === "string" ? v.slice(0, MAX_STR) : undefined;

// ---------------------------------------------------------------------------
// Tool definitions
// ---------------------------------------------------------------------------

const TOOLS = [
  {
    name: "search_opportunities",
    description:
      "Search live US federal, state, and subcontracting opportunities matched to a small business. " +
      "Filter by keywords, NAICS codes, set-aside type, state, agency, and deadlines. " +
      "Every result includes the official solicitation link. Stale items (past deadline) are excluded unless include_expired is set.",
    inputSchema: {
      type: "object",
      properties: {
        keywords: { type: "string", description: "Free-text keywords, e.g. 'IT services', 'custodial'", maxLength: MAX_STR },
        naics: {
          anyOf: [{ type: "string" }, { type: "array", items: { type: "string" } }],
          description: "6-digit NAICS code(s)",
        },
        set_aside: { type: "string", description: 'e.g. "8(a)", "HUBZone", "SDVOSB", "WOSB", "Small Business"', maxLength: 60 },
        state: { type: "string", description: "2-letter state code, e.g. TX", maxLength: 2 },
        agency: { type: "string", description: "Agency name substring, e.g. 'Veterans Affairs'", maxLength: MAX_STR },
        posted_within_days: { type: "integer", minimum: 1, maximum: 365, description: "Only items posted within this many days" },
        due_within_days: { type: "integer", minimum: 1, maximum: 365, description: "Only items due within this many days" },
        limit: { type: "integer", description: "Max results (default 10, clamped to 1-50)" },
        include_expired: { type: "boolean", description: "Include items whose response deadline has passed (default false)" },
      },
    },
  },
  {
    name: "get_opportunity_details",
    description:
      "Full detail for one opportunity: description, requirements summary, deadlines, submission method, contacts, amendments, and the official solicitation link.",
    inputSchema: {
      type: "object",
      properties: {
        notice_id: { type: "string", description: "The notice_id from a search_opportunities result", maxLength: MAX_STR },
      },
      required: ["notice_id"],
    },
  },
  {
    name: "get_guidance",
    description:
      "Free SAM.gov registration walkthrough and bidding guidance: registration steps, NAICS selection, common rejection reasons, the zero-to-first-bid roadmap, and set-aside basics. Educational content with official links; not legal advice.",
    inputSchema: {
      type: "object",
      properties: {
        topic: {
          type: "string",
          enum: listGuidanceTopics(),
          description: "Guidance topic",
        },
      },
      required: ["topic"],
    },
  },
] as const;

// ---------------------------------------------------------------------------
// Input validation (bad input -> JSON-RPC -32602)
// ---------------------------------------------------------------------------

function invalidParams(id: RpcId, message: string) {
  return rpcError(id, -32602, `Invalid params: ${message}`);
}

function parseNaics(raw: unknown): string[] | { err: string } {
  if (raw === undefined || raw === null) return [];
  const arr = Array.isArray(raw) ? raw : [raw];
  const out: string[] = [];
  for (const item of arr) {
    if (typeof item !== "string" || !/^\d{6}$/.test(item.trim())) {
      return { err: `naics must be 6-digit code(s); got ${JSON.stringify(item)}` };
    }
    out.push(item.trim());
  }
  return out;
}

function parseState(raw: unknown): string | undefined | { err: string } {
  if (raw === undefined || raw === null) return undefined;
  if (typeof raw !== "string" || !/^[A-Za-z]{2}$/.test(raw.trim())) {
    return { err: `state must be a 2-letter code; got ${JSON.stringify(raw)}` };
  }
  return raw.trim().toUpperCase();
}

function parsePositiveInt(raw: unknown, name: string): number | undefined | { err: string } {
  if (raw === undefined || raw === null) return undefined;
  const n = typeof raw === "number" ? raw : parseInt(String(raw), 10);
  if (!Number.isInteger(n) || n < 1) return { err: `${name} must be a positive integer` };
  return n;
}

// ---------------------------------------------------------------------------
// Tool execution
// ---------------------------------------------------------------------------

async function callTool(name: string, args: Record<string, unknown>, id: RpcId) {
  if (name === "search_opportunities") {
    const naics = parseNaics(args.naics);
    if (!Array.isArray(naics)) return invalidParams(id, naics.err);
    const state = parseState(args.state);
    if (state && typeof state === "object") return invalidParams(id, state.err);
    const postedWithin = parsePositiveInt(args.posted_within_days, "posted_within_days");
    if (postedWithin && typeof postedWithin === "object") return invalidParams(id, postedWithin.err);
    const dueWithin = parsePositiveInt(args.due_within_days, "due_within_days");
    if (dueWithin && typeof dueWithin === "object") return invalidParams(id, dueWithin.err);

    const filters: OpportunityFilters = {
      keywords: STR(args.keywords),
      naics: naics.length ? naics : undefined,
      set_aside: STR(args.set_aside),
      state: typeof state === "string" ? state : undefined,
      agency: STR(args.agency),
      posted_within_days: typeof postedWithin === "number" ? Math.min(postedWithin, 365) : undefined,
      due_within_days: typeof dueWithin === "number" ? Math.min(dueWithin, 365) : undefined,
      limit: args.limit === undefined || args.limit === null
        ? 10
        : Math.min(Math.max(parseInt(String(args.limit), 10) || 10, 1), 50),
      include_expired: args.include_expired === true,
    };
    const { source, results } = await searchOpportunities(filters);
    const payload = {
      disclaimer: CONNECTOR_DISCLAIMER,
      data_source: source,
      count: results.length,
      opportunities: results,
    };
    return rpcResult(id, {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    });
  }

  if (name === "get_opportunity_details") {
    const noticeId = STR(args.notice_id);
    if (!noticeId || !noticeId.trim()) return invalidParams(id, "notice_id is required");
    const { source, detail } = await getOpportunityDetail(noticeId.trim());
    if (!detail) {
      return rpcError(id, -32001, `No opportunity found with notice_id ${JSON.stringify(noticeId.trim())}`);
    }
    const payload = { disclaimer: CONNECTOR_DISCLAIMER, data_source: source, opportunity: detail };
    return rpcResult(id, {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    });
  }

  if (name === "get_guidance") {
    const topic = STR(args.topic);
    if (!topic) return invalidParams(id, "topic is required");
    const g = getGuidance(topic);
    if (!g) {
      return invalidParams(id, `unknown topic ${JSON.stringify(topic)}; valid topics: ${listGuidanceTopics().join(", ")}`);
    }
    const payload = {
      disclaimer: CONNECTOR_DISCLAIMER,
      topic: g.topic,
      title: g.title,
      body: g.body,
      official_links: g.official_links,
    };
    return rpcResult(id, {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    });
  }

  return invalidParams(id, `unknown tool ${JSON.stringify(name)}; available: search_opportunities, get_opportunity_details, get_guidance`);
}

// ---------------------------------------------------------------------------
// Request handling
// ---------------------------------------------------------------------------

async function handleOne(req: RpcRequest, client: string): Promise<{ status: number; body: unknown } | null> {
  const id: RpcId = req.id ?? null;
  const isNotification = req.id === undefined || req.id === null;

  if (req.jsonrpc !== "2.0" || typeof req.method !== "string") {
    if (isNotification) return null;
    return { status: 400, body: rpcError(id, -32600, "Invalid JSON-RPC 2.0 request") };
  }

  switch (req.method) {
    case "initialize": {
      const clientProto = (req.params as Record<string, unknown> | undefined)?.protocolVersion;
      const negotiated =
        typeof clientProto === "string" && SUPPORTED_PROTOCOLS.includes(clientProto)
          ? clientProto
          : DEFAULT_PROTOCOL;
      return {
        status: 200,
        body: rpcResult(id, {
          protocolVersion: negotiated,
          capabilities: { tools: {} },
          serverInfo: { name: "contractready-mcp", version: SERVER_VERSION },
        }),
      };
    }
    case "notifications/initialized":
      return null; // notification: 202, no body
    case "ping":
      return { status: 200, body: rpcResult(id, {}) };
    case "tools/list":
      return { status: 200, body: rpcResult(id, { tools: TOOLS }) };
    case "tools/call": {
      const params = (req.params ?? {}) as Record<string, unknown>;
      const toolName = typeof params.name === "string" ? params.name : "";
      const args = (params.arguments ?? {}) as Record<string, unknown>;

      // Rate limit: 25 anonymous tool calls/day per IP (emergency brake: MCP_DAILY_CAP).
      const cap = dailyCap();
      if (!checkRateLimit(`mcp:${client}`, cap, 24 * 60 * 60 * 1000)) {
        const n = (blockedHits.get(client) ?? 0) + 1;
        blockedHits.set(client, n);
        console.warn(`[mcp-rate-limit] ip=${client} tool=${toolName} blocked=${n} cap=${cap}/day`);
        return {
          status: 200,
          body: rpcError(
            id,
            -32000,
            `Anonymous usage cap reached (${cap} tool calls/day per IP). Try again tomorrow.`,
            { retry_after_hours: 24 }
          ),
        };
      }
      const out = await callTool(toolName, args, id);
      return { status: 200, body: out };
    }
    default:
      if (isNotification) return null;
      return { status: 200, body: rpcError(id, -32601, `Method not found: ${req.method}`) };
  }
}

export async function POST(req: Request) {
  const client = clientIp(req);
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json(rpcError(null, -32700, "Parse error: request body is not valid JSON"), 400);
  }

  const requests: RpcRequest[] = Array.isArray(body) ? body : [body as RpcRequest];
  const responses: unknown[] = [];
  for (const r of requests) {
    const out = await handleOne(r ?? {}, client);
    if (out === null) continue; // notification: no JSON-RPC response
    responses.push(out.body);
  }
  if (responses.length === 0) {
    // Only notifications were sent.
    return new NextResponse(null, { status: 202 });
  }
  return json(Array.isArray(body) ? responses : responses[0]);
}

function methodNotAllowed() {
  return json(
    { jsonrpc: "2.0", id: null, error: { code: -32600, message: "Method not allowed: this endpoint accepts POST only" } },
    405
  );
}

export async function GET() {
  return methodNotAllowed();
}
export async function DELETE() {
  return methodNotAllowed();
}
export async function PUT() {
  return methodNotAllowed();
}
export async function PATCH() {
  return methodNotAllowed();
}
