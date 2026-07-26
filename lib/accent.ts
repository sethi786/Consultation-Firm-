import type { Domain } from "@/content/services";

/**
 * Accent system — neutralised.
 *
 * The site used to colour-code each of the eleven service domains with its own
 * hue. That read as "busy" to buyers, so the palette is now near-monochrome:
 * ink / slate / rule on paper, with **pine (green)** as the single, sparing
 * accent. Every domain resolves to the same NEUTRAL bundle below, so the
 * mega-menu, services index, solutions matrix and domain pills all inherit the
 * calmer look from one place — no per-page edits, and no rainbow.
 *
 * Class strings are written out in full (never interpolated at the token level)
 * so Tailwind's JIT keeps them — including the hover:/group-hover: variants.
 * `solid` = strong block with white text; `softBg`/`softText` = tinted panel;
 * `text` = AA-accessible label on paper; `border`/`dot` for accents.
 */
export type Accent =
  | "coral" | "sky" | "violet" | "mint" | "indigo" | "amber" | "rose"
  | "teal" | "orange" | "lime" | "fuchsia";

export interface AccentClasses {
  solid: string;
  softBg: string;
  softText: string;
  text: string;
  border: string;
  borderHover: string;
  textGroupHover: string;
  dot: string;
}

/** The one bundle every accent resolves to. Neutral by default; pine on hover. */
const NEUTRAL: AccentClasses = {
  solid: "bg-pine text-white",
  softBg: "bg-paper-sunk",
  softText: "text-slate",
  text: "text-slate",
  border: "border-rule",
  borderHover: "hover:border-pine",
  textGroupHover: "group-hover:text-pine",
  dot: "bg-slate",
};

export const ACCENTS: Record<Accent, AccentClasses> = {
  coral: NEUTRAL,
  sky: NEUTRAL,
  violet: NEUTRAL,
  mint: NEUTRAL,
  indigo: NEUTRAL,
  amber: NEUTRAL,
  rose: NEUTRAL,
  teal: NEUTRAL,
  orange: NEUTRAL,
  lime: NEUTRAL,
  fuchsia: NEUTRAL,
};

/** Category → accent. All map to the single neutral bundle now; the mapping is
 *  kept so callers (and a future re-theme) still address domains by name. */
export const DOMAIN_ACCENT: Record<Domain, Accent> = {
  "AI & Data": "coral",
  "Cloud & Infrastructure": "sky",
  "Identity & Access": "violet",
  "Endpoint & Application": "mint",
  "Detection & Response": "indigo",
  "Governance, Risk & Compliance": "amber",
  "Advisory & Assurance": "rose",
  "Modern Workplace": "teal",
  "Data Center & Infrastructure": "orange",
  "Networking": "lime",
  "IT Asset Management": "fuchsia",
};

export function domainAccent(domain: Domain): AccentClasses {
  return ACCENTS[DOMAIN_ACCENT[domain]];
}
