import { TIERS } from "@/lib/tiers";
import type { TierId } from "@/lib/tiers";
import type { Lesson, TierOutline } from "./types";
import { FREE_LESSONS } from "./free";
import { STARTER_LESSONS } from "./starter";
import { BIDKIT_LESSONS } from "./bidkit";
import { GROWTH_LESSONS } from "./growth";
import { PRO_LESSONS } from "./pro";
import { ALLACCESS_LESSONS } from "./allaccess";
import { TIER_OUTLINES } from "./outlines";

export const LESSONS: Lesson[] = [
  ...FREE_LESSONS,
  ...STARTER_LESSONS,
  ...BIDKIT_LESSONS,
  ...GROWTH_LESSONS,
  ...PRO_LESSONS,
  ...ALLACCESS_LESSONS,
];

export { TIER_OUTLINES };

/** Find a single lesson by its slug. */
export function getLesson(slug: string): Lesson | undefined {
  return LESSONS.find((lesson) => lesson.slug === slug);
}

/**
 * All lessons unlocked by a tier. Higher tiers include all lower tiers,
 * so a lesson is included when its tier rank is at or below the given tier's rank.
 */
export function lessonsForTier(tier: TierId): Lesson[] {
  const rank = TIERS[tier].rank;
  return LESSONS.filter((lesson) => TIERS[lesson.tier].rank <= rank);
}

/** The scaffolded curriculum outline for a tier, if one exists. */
export function outlineForTier(tier: TierId): TierOutline | undefined {
  return TIER_OUTLINES.find((outline) => outline.tier === tier);
}
