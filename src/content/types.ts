import type { TierId } from "@/lib/tiers";

/** Structured lesson content. No raw HTML; the LearnRenderer maps blocks to styled elements. */
export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; style: "info" | "warn" | "free"; text: string }
  | { type: "checklist"; items: string[] };

export interface Lesson {
  slug: string;
  title: string;
  /** Minimum tier required to view. Higher tiers unlock lower-tier lessons. */
  tier: TierId;
  estMinutes: number;
  summary: string;
  blocks: ContentBlock[];
  /**
   * Optional video walkthrough. When set, the lesson page renders an embedded
   * player above the written content. Accepts a YouTube/Vimeo watch URL or a
   * direct .mp4 URL. Lessons without a recording show a "recording in
   * progress" placeholder instead.
   */
  videoUrl?: string;
  videoLabel?: string;
}

export interface TierOutlineModule {
  title: string;
  objective: string;
  opener: string;
  lessons: string[];
}

export interface TierOutline {
  tier: TierId;
  status: "complete" | "scaffolded";
  modules: TierOutlineModule[];
}
