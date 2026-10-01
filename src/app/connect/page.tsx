import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ContractReady for Muse (connector) | ContractReady",
  description:
    "ContractReady helps small businesses find live US federal, state, and subcontracting opportunities matched to what they do, track deadlines, and prepare bid-ready checklists. Independent private education and guidance service; not a government agency and not affiliated with SAM.gov.",
};

const APP_URL = "https://contractready-production-631d.up.railway.app";

const tools = [
  {
    name: "search_opportunities",
    summary: "Search live federal, state, and subcontracting opportunities by keywords, NAICS, set-aside, state, agency, and deadlines.",
    params: "keywords, naics, set_aside, state, agency, posted_within_days, due_within_days, limit (default 10, max 50)",
  },
  {
    name: "get_opportunity_details",
    summary: "Full detail for one opportunity: description, requirements, deadlines, submission method, contacts, amendments, and the official solicitation link.",
    params: "notice_id",
  },
  {
    name: "get_guidance",
    summary: "Free SAM.gov registration walkthrough and bidding guidance: registration steps, NAICS selection, rejection reasons, first-bid roadmap, set-aside basics.",
    params: "topic: sam-registration, naics-selection, rejection-reasons, first-bid-roadmap, set-aside-basics",
  },
];

export default function ConnectPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <p className="text-sm font-semibold uppercase tracking-widest text-[#0f3d2e]">Muse connector</p>
      <h1 className="mt-2 text-3xl font-extrabold text-slate-900">ContractReady</h1>
      <p className="mt-3 text-lg text-slate-700">
        Find government contracts you can actually bid on, and learn how to bid, right inside Muse.
      </p>
      <p className="mt-4 text-slate-600">
        ContractReady helps small businesses find live US federal, state, and subcontracting opportunities
        matched to what they do, track deadlines, and prepare bid-ready checklists. We are an independent
        private education and guidance service. We are not a government agency and are not affiliated with
        SAM.gov.
      </p>

      <h2 className="mt-10 text-xl font-bold text-slate-900">Endpoint</h2>
      <div className="mt-3 rounded-lg bg-slate-900 p-4 font-mono text-sm text-emerald-200">
        <p>POST {APP_URL}/mcp</p>
        <p className="mt-1 text-slate-400">Streamable HTTP (MCP 2025-06-18) - single JSON responses, no SSE</p>
      </div>

      <h2 className="mt-10 text-xl font-bold text-slate-900">Tools (v1 - read-only, no sign-in)</h2>
      <div className="mt-4 space-y-4">
        {tools.map((t) => (
          <div key={t.name} className="rounded-lg border border-slate-200 bg-white p-5">
            <p className="font-mono text-sm font-bold text-[#0f3d2e]">{t.name}</p>
            <p className="mt-2 text-slate-700">{t.summary}</p>
            <p className="mt-2 text-sm text-slate-500">
              <span className="font-semibold">Parameters:</span> <span className="font-mono">{t.params}</span>
            </p>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-xl font-bold text-slate-900">Example prompts</h2>
      <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
        <li>&ldquo;Find open federal IT services contracts for small businesses in Texas.&rdquo;</li>
        <li>&ldquo;What is due this week on my watchlist?&rdquo; (answered via search with due_within_days)</li>
        <li>&ldquo;Walk me through SAM.gov registration for my LLC.&rdquo;</li>
      </ul>

      <h2 className="mt-10 text-xl font-bold text-slate-900">Rate limits</h2>
      <p className="mt-3 text-slate-700">
        25 anonymous tool calls per day per IP address. The limit can be lowered in an emergency via the
        MCP_DAILY_CAP environment variable. Rate-limit hits are logged for abuse monitoring. Discovery calls
        (initialize, tools/list) are not counted.
      </p>

      <h2 className="mt-10 text-xl font-bold text-slate-900">Disclaimer</h2>
      <p className="mt-3 rounded-lg bg-amber-50 p-4 text-sm text-slate-700 ring-1 ring-amber-200">
        ContractReady is an independent private education and guidance service, not a government agency and
        not affiliated with SAM.gov. The official solicitation and its amendments control; always read the
        official materials. No registration approval, bid acceptance, award, or revenue is ever guaranteed.
      </p>

      <h2 className="mt-10 text-xl font-bold text-slate-900">Support</h2>
      <p className="mt-3 text-slate-700">
        Support is delivered through the member portal after sign-in. See the{" "}
        <Link href="/faq" className="text-[#0f3d2e] underline">FAQ</Link> for common questions.
      </p>
      <p className="mt-6 text-sm text-slate-500">
        Machine-readable agent description: <Link href="/llms.txt" className="text-[#0f3d2e] underline">llms.txt</Link>
      </p>
    </div>
  );
}
