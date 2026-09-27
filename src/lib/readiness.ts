/**
 * Contract Readiness Score.
 *
 * A weighted self-assessment that measures how prepared a business is to bid
 * on government contracts. It is a checklist of preparation steps, not a
 * prediction: the score never implies a likelihood of winning a contract.
 *
 * Five factors (each 0-100), weighted:
 *   registration  30%  - SAM.gov registration status (self-reported)
 *   foundations   25%  - UEI, legal entity, NAICS codes, login.gov account
 *   learning      20%  - lessons completed out of lessons unlocked (real data)
 *   toolkit       15%  - capability statement, past performance, template downloads
 *   pipeline     10%  - opportunity profile built, bid kit requests submitted
 *
 * This module is intentionally free of database imports so the scoring and
 * the next-action rules can be unit-tested directly.
 */

export type SamStatus = "not_started" | "gathering_docs" | "submitted" | "active";

export const SAM_STATUS_LABELS: Record<SamStatus, string> = {
  not_started: "Not started",
  gathering_docs: "Gathering documents",
  submitted: "Submitted, waiting on review",
  active: "Active",
};

export const SAM_STATUS_SCORES: Record<SamStatus, number> = {
  not_started: 0,
  gathering_docs: 25,
  submitted: 60,
  active: 100,
};

export interface ReadinessAssessment {
  samStatus: SamStatus;
  hasUei: boolean;
  hasEntity: boolean;
  hasNaics: boolean;
  hasSamLogin: boolean;
  hasCapabilityStatement: boolean;
  hasPastPerformance: boolean;
}

export interface ReadinessInputs {
  /** Null when the user has never filled in the self-assessment. */
  assessment: ReadinessAssessment | null;
  lessonsCompleted: number;
  lessonsUnlocked: number;
  templatesDownloaded: boolean;
  hasOpportunityProfile: boolean;
  bidKitRequests: number;
  bidKitAllowance: number;
  /** First incomplete lesson in curriculum order, if any. */
  nextLesson: { slug: string; title: string } | null;
}

export interface FactorScore {
  key: "registration" | "foundations" | "learning" | "toolkit" | "pipeline";
  label: string;
  score: number; // 0-100
  weight: number; // 0-1, sums to 1 across factors
  detail: string; // one-line human explanation of the score
}

export interface NextAction {
  title: string;
  description: string;
  href: string;
  cta: string;
}

export interface ReadinessResult {
  /** 0-100 readiness score. */
  score: number;
  factors: FactorScore[];
  nextAction: NextAction;
  /** True when the user has never completed the self-assessment. */
  needsAssessment: boolean;
}

const DEFAULT_ASSESSMENT: ReadinessAssessment = {
  samStatus: "not_started",
  hasUei: false,
  hasEntity: false,
  hasNaics: false,
  hasSamLogin: false,
  hasCapabilityStatement: false,
  hasPastPerformance: false,
};

function clamp(n: number): number {
  if (n < 0) return 0;
  if (n > 100) return 100;
  return Math.round(n);
}

export function computeReadiness(inputs: ReadinessInputs): ReadinessResult {
  const a = inputs.assessment ?? DEFAULT_ASSESSMENT;
  const needsAssessment = inputs.assessment === null;

  // Registration: SAM.gov status drives this factor entirely.
  const registrationScore = SAM_STATUS_SCORES[a.samStatus] ?? 0;
  const registration: FactorScore = {
    key: "registration",
    label: "SAM.gov registration",
    score: registrationScore,
    weight: 0.3,
    detail:
      a.samStatus === "active"
        ? "Your SAM.gov registration is active."
        : `SAM.gov status: ${SAM_STATUS_LABELS[a.samStatus] ?? "not started"}.`,
  };

  // Foundations: four yes/no building blocks, 25 points each.
  const foundationChecks = [a.hasUei, a.hasEntity, a.hasNaics, a.hasSamLogin];
  const foundationDone = foundationChecks.filter(Boolean).length;
  const foundations: FactorScore = {
    key: "foundations",
    label: "Business foundations",
    score: (foundationDone / foundationChecks.length) * 100,
    weight: 0.25,
    detail:
      foundationDone === foundationChecks.length
        ? "UEI, legal entity, NAICS codes, and login.gov account are all in place."
        : `${foundationDone} of ${foundationChecks.length} foundations done: UEI, legal entity, NAICS codes, login.gov account.`,
  };

  // Learning: share of unlocked lessons completed, from real progress data.
  const learningPct =
    inputs.lessonsUnlocked > 0
      ? (inputs.lessonsCompleted / inputs.lessonsUnlocked) * 100
      : 0;
  const learning: FactorScore = {
    key: "learning",
    label: "Lessons completed",
    score: learningPct,
    weight: 0.2,
    detail:
      inputs.lessonsUnlocked > 0
        ? `${inputs.lessonsCompleted} of ${inputs.lessonsUnlocked} unlocked lessons completed.`
        : "No lessons unlocked yet.",
  };

  // Toolkit: capability statement (40), past performance (30), template downloads (30).
  let toolkitScore = 0;
  const toolkitDone: string[] = [];
  const toolkitTodo: string[] = [];
  if (a.hasCapabilityStatement) {
    toolkitScore += 40;
    toolkitDone.push("capability statement");
  } else {
    toolkitTodo.push("capability statement");
  }
  if (a.hasPastPerformance) {
    toolkitScore += 30;
    toolkitDone.push("past performance record");
  } else {
    toolkitTodo.push("past performance record");
  }
  if (inputs.templatesDownloaded) {
    toolkitScore += 30;
    toolkitDone.push("templates downloaded");
  } else {
    toolkitTodo.push("template downloads");
  }
  const toolkit: FactorScore = {
    key: "toolkit",
    label: "Bidding toolkit",
    score: toolkitScore,
    weight: 0.15,
    detail:
      toolkitTodo.length === 0
        ? "Capability statement, past performance, and templates are ready."
        : `Still to do: ${toolkitTodo.join(", ")}.`,
  };

  // Pipeline: opportunity profile (50) and bid kit requests (50).
  let pipelineScore = 0;
  const pipelineTodo: string[] = [];
  if (inputs.hasOpportunityProfile) {
    pipelineScore += 50;
  } else {
    pipelineTodo.push("business profile");
  }
  if (inputs.bidKitRequests > 0) {
    pipelineScore += 50;
  } else {
    pipelineTodo.push("first bid kit request");
  }
  const pipeline: FactorScore = {
    key: "pipeline",
    label: "Opportunity pipeline",
    score: pipelineScore,
    weight: 0.1,
    detail:
      pipelineTodo.length === 0
        ? "Business profile built and bid kits requested."
        : `Still to do: ${pipelineTodo.join(", ")}.`,
  };

  const factors = [registration, foundations, learning, toolkit, pipeline];
  const score = clamp(
    factors.reduce((sum, f) => sum + f.score * f.weight, 0)
  );

  return {
    score,
    factors,
    nextAction: pickNextAction(inputs, a, learningPct),
    needsAssessment,
  };
}

function pickNextAction(
  inputs: ReadinessInputs,
  a: ReadinessAssessment,
  learningPct: number
): NextAction {
  // 1. SAM.gov registration is the gate to everything else.
  if (a.samStatus !== "active") {
    return {
      title: "Finish your SAM.gov registration",
      description:
        "Nothing else moves until this is done. Work through the free checklist and get your entity registration submitted.",
      href: "/dashboard/learn/free-sam-checklist",
      cta: "Open the SAM checklist",
    };
  }
  // 2. Capability statement: buyers and primes ask for this one-pager first.
  if (!a.hasCapabilityStatement) {
    return {
      title: "Draft your capability statement",
      description:
        "This one-page overview of what you do is the first thing buyers and prime contractors ask for.",
      href: "/dashboard/templates",
      cta: "Open the template library",
    };
  }
  // 3. Keep working through the curriculum.
  if (learningPct < 100 && inputs.nextLesson) {
    return {
      title: `Continue learning: ${inputs.nextLesson.title}`,
      description:
        "Each lesson closes a gap in your readiness. Pick up with the next one in your path.",
      href: `/dashboard/learn/${inputs.nextLesson.slug}`,
      cta: "Open the lesson",
    };
  }
  // 4. Past performance wins bids: write down what the business has done.
  if (!a.hasPastPerformance) {
    return {
      title: "Document your past performance",
      description:
        "Evaluators score past performance on almost every bid. Record contracts, subcontracts, and relevant commercial work.",
      href: "/dashboard/templates",
      cta: "Open the templates",
    };
  }
  // 5. Put the bid kit allowance to work.
  if (inputs.bidKitAllowance > 0 && inputs.bidKitRequests === 0) {
    return {
      title: "Request your first bid kit",
      description:
        "You have bid kit requests included in your plan. Point one at a live solicitation and we will build the kit.",
      href: "/dashboard/bid-kits",
      cta: "Request a bid kit",
    };
  }
  // 6. Build the opportunity profile for a tailored search pack.
  if (!inputs.hasOpportunityProfile) {
    return {
      title: "Build your business profile",
      description:
        "Tell us your NAICS codes and services and we will build a tailored SAM.gov search pack.",
      href: "/dashboard/opportunities",
      cta: "Build your profile",
    };
  }
  // 7. Everything tracked is done: keep watching live opportunities.
  return {
    title: "Watch live opportunities",
    description:
      "Your tracked readiness steps are complete. Keep an eye on new solicitations in your lane.",
    href: "/dashboard/opportunities/directory",
    cta: "Browse the directory",
  };
}
