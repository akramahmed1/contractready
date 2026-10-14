// Unit tests for the pure business logic in src/lib.
// Run: npm test   (node --test with built-in TypeScript type stripping; no extra deps)
import { test } from "node:test";
import assert from "node:assert/strict";

import { TIERS, PAID_TIERS, tierUnlocks, highestTier, type TierId } from "../src/lib/tiers.ts";
import { checkRateLimit, clientIp } from "../src/lib/ratelimit.ts";
import { computeReadiness, type ReadinessInputs } from "../src/lib/readiness.ts";
import {
  addBusinessDaysYMD,
  bidKitSlaStatus,
  businessDaysBetweenYMD,
  getFederalHolidays,
  isBusinessDayYMD,
  promisedByYMD,
} from "../src/lib/sla.ts";

// ---------- tiers ----------

test("tier prices are positive whole cents and free is $0", () => {
  assert.equal(TIERS.free.priceCents, 0);
  for (const t of PAID_TIERS) {
    assert.ok(Number.isInteger(t.priceCents) && t.priceCents > 0, t.id);
  }
});

test("tier ranks are unique so unlock order is unambiguous", () => {
  const ranks = Object.values(TIERS).map((t) => t.rank);
  assert.equal(new Set(ranks).size, ranks.length);
});

test("higher tiers unlock lower content, never the reverse", () => {
  const ids = Object.keys(TIERS) as TierId[];
  for (const a of ids) {
    for (const b of ids) {
      assert.equal(tierUnlocks(a, b), TIERS[a].rank >= TIERS[b].rank, `${a} vs ${b}`);
    }
  }
  assert.equal(tierUnlocks("free", "starter"), false);
  assert.equal(tierUnlocks("allaccess", "starter"), true);
});

test("highestTier picks the top rank and defaults to free", () => {
  assert.equal(highestTier([]), "free");
  assert.equal(highestTier(["starter", "pro", "bidkit"]), "pro");
});

// ---------- rate limit ----------

test("rate limiter allows maxRequests then blocks within the window", () => {
  const key = `test:${Math.random()}`;
  assert.equal(checkRateLimit(key, 3, 60_000), true);
  assert.equal(checkRateLimit(key, 3, 60_000), true);
  assert.equal(checkRateLimit(key, 3, 60_000), true);
  assert.equal(checkRateLimit(key, 3, 60_000), false);
});

test("clientIp prefers X-Real-IP, then rightmost X-Forwarded-For", () => {
  const req = (h: Record<string, string>) => new Request("https://x.test", { headers: h });
  assert.equal(clientIp(req({ "x-real-ip": "9.9.9.9", "x-forwarded-for": "1.1.1.1, 2.2.2.2" })), "9.9.9.9");
  assert.equal(clientIp(req({ "x-forwarded-for": "1.1.1.1, 2.2.2.2" })), "2.2.2.2");
  assert.equal(clientIp(req({})), "unknown");
});

// ---------- readiness ----------

const baseInputs: ReadinessInputs = {
  assessment: null,
  lessonsCompleted: 0,
  lessonsUnlocked: 0,
  templatesDownloaded: false,
  hasOpportunityProfile: false,
  bidKitRequests: 0,
  bidKitAllowance: 0,
  nextLesson: null,
};

test("readiness weights sum to 1 and score stays within 0-100", () => {
  const r = computeReadiness(baseInputs);
  const total = r.factors.reduce((s, f) => s + f.weight, 0);
  assert.ok(Math.abs(total - 1) < 1e-9, `weights sum to ${total}`);
  assert.ok(r.score >= 0 && r.score <= 100);
  assert.equal(r.needsAssessment, true);
  assert.ok(r.nextAction.href.startsWith("/"));
});

test("readiness never exceeds 100 even with inconsistent progress data", () => {
  const r = computeReadiness({
    ...baseInputs,
    assessment: {
      samStatus: "active",
      hasUei: true,
      hasEntity: true,
      hasNaics: true,
      hasSamLogin: true,
      hasCapabilityStatement: true,
      hasPastPerformance: true,
    },
    lessonsCompleted: 50,
    lessonsUnlocked: 10,
    templatesDownloaded: true,
    hasOpportunityProfile: true,
    bidKitRequests: 9,
    bidKitAllowance: 1,
  });
  assert.ok(r.score <= 100, `score ${r.score}`);
  for (const f of r.factors) assert.ok(f.score >= 0 && f.score <= 100, `${f.key} ${f.score}`);
});

test("more progress never lowers the readiness score", () => {
  const low = computeReadiness({ ...baseInputs, lessonsUnlocked: 10, lessonsCompleted: 2 });
  const high = computeReadiness({ ...baseInputs, lessonsUnlocked: 10, lessonsCompleted: 8 });
  assert.ok(high.score >= low.score);
});

// ---------- SLA / business days ----------

test("2026 federal holidays include the expected observed dates", () => {
  const h = getFederalHolidays(2026);
  for (const d of ["2026-01-01", "2026-01-19", "2026-05-25", "2026-07-03", "2026-11-26", "2026-12-25"]) {
    assert.ok(h.has(d), d);
  }
  // July 4 2026 is a Saturday, observed Friday July 3.
  assert.equal(isBusinessDayYMD("2026-07-03"), false);
});

test("New Year's Day on a Saturday is observed the prior Friday (Dec 31 2027)", () => {
  assert.equal(isBusinessDayYMD("2027-12-31"), false);
});

test("5 business days from Monday Sep 21 2026 is Monday Sep 28", () => {
  assert.equal(addBusinessDaysYMD("2026-09-21", 5), "2026-09-28");
  assert.equal(businessDaysBetweenYMD("2026-09-21", "2026-09-28"), 5);
});

test("delivering on the promised date is always 'met', even for weekend requests", () => {
  // Saturday Sep 19 2026, noon Chicago time.
  const created = new Date("2026-09-19T17:00:00Z");
  const promised = promisedByYMD(created);
  const deliveredOnPromise = new Date(`${promised}T20:00:00Z`);
  assert.equal(bidKitSlaStatus(created, deliveredOnPromise).status, "met");
});

test("delivering after the promised date is 'missed'", () => {
  const created = new Date("2026-09-21T15:00:00Z");
  const late = new Date("2026-09-30T20:00:00Z");
  assert.equal(bidKitSlaStatus(created, late).status, "missed");
});

test("open requests move from on_track to due_today to overdue", () => {
  const created = new Date("2026-09-21T15:00:00Z"); // Mon, promised Mon Sep 28
  assert.equal(bidKitSlaStatus(created, null, new Date("2026-09-24T15:00:00Z")).status, "on_track");
  assert.equal(bidKitSlaStatus(created, null, new Date("2026-09-28T15:00:00Z")).status, "due_today");
  assert.equal(bidKitSlaStatus(created, null, new Date("2026-09-29T15:00:00Z")).status, "overdue");
});
