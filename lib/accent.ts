import type { Domain } from "@/content/services";

/**
 * Accent system — the "beacon spectrum" (owner-approved wiz-style re-theme).
 *
 * Each service domain owns a hue drawn from the vivid token set in
 * app/globals.css (§3.2 "bright color-block" system). The strong value is a
 * solid block with white text; `-soft` is a tinted panel for icon tiles and
 * chips; `-ink` is the AA-accessible text value on paper. Used for the icon
 * tile on every service card, domain headings, and hover accents — colour
 * with a job, not decoration.
 *
 * Class strings are written out in full (never interpolated at the token level)
 * so Tailwind's JIT keeps them — including the hover:/group-hover: variants.
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

export const ACCENTS: Record<Accent, AccentClasses> = {
  coral: {
    solid: "bg-coral text-white",
    softBg: "bg-coral-soft",
    softText: "text-coral-ink",
    text: "text-coral-ink",
    border: "border-coral",
    borderHover: "hover:border-coral",
    textGroupHover: "group-hover:text-coral-ink",
    dot: "bg-coral",
  },
  sky: {
    solid: "bg-sky text-white",
    softBg: "bg-sky-soft",
    softText: "text-sky-ink",
    text: "text-sky-ink",
    border: "border-sky",
    borderHover: "hover:border-sky",
    textGroupHover: "group-hover:text-sky-ink",
    dot: "bg-sky",
  },
  violet: {
    solid: "bg-violet text-white",
    softBg: "bg-violet-soft",
    softText: "text-violet-ink",
    text: "text-violet-ink",
    border: "border-violet",
    borderHover: "hover:border-violet",
    textGroupHover: "group-hover:text-violet-ink",
    dot: "bg-violet",
  },
  mint: {
    solid: "bg-mint text-white",
    softBg: "bg-mint-soft",
    softText: "text-mint-ink",
    text: "text-mint-ink",
    border: "border-mint",
    borderHover: "hover:border-mint",
    textGroupHover: "group-hover:text-mint-ink",
    dot: "bg-mint",
  },
  indigo: {
    solid: "bg-indigo text-white",
    softBg: "bg-indigo-soft",
    softText: "text-indigo-ink",
    text: "text-indigo-ink",
    border: "border-indigo",
    borderHover: "hover:border-indigo",
    textGroupHover: "group-hover:text-indigo-ink",
    dot: "bg-indigo",
  },
  amber: {
    solid: "bg-amber text-white",
    softBg: "bg-amber-soft",
    softText: "text-amber-ink",
    text: "text-amber-ink",
    border: "border-amber",
    borderHover: "hover:border-amber",
    textGroupHover: "group-hover:text-amber-ink",
    dot: "bg-amber",
  },
  rose: {
    solid: "bg-rose text-white",
    softBg: "bg-rose-soft",
    softText: "text-rose-ink",
    text: "text-rose-ink",
    border: "border-rose",
    borderHover: "hover:border-rose",
    textGroupHover: "group-hover:text-rose-ink",
    dot: "bg-rose",
  },
  teal: {
    solid: "bg-teal text-white",
    softBg: "bg-teal-soft",
    softText: "text-teal-ink",
    text: "text-teal-ink",
    border: "border-teal",
    borderHover: "hover:border-teal",
    textGroupHover: "group-hover:text-teal-ink",
    dot: "bg-teal",
  },
  orange: {
    solid: "bg-orange text-white",
    softBg: "bg-orange-soft",
    softText: "text-orange-ink",
    text: "text-orange-ink",
    border: "border-orange",
    borderHover: "hover:border-orange",
    textGroupHover: "group-hover:text-orange-ink",
    dot: "bg-orange",
  },
  lime: {
    solid: "bg-lime text-white",
    softBg: "bg-lime-soft",
    softText: "text-lime-ink",
    text: "text-lime-ink",
    border: "border-lime",
    borderHover: "hover:border-lime",
    textGroupHover: "group-hover:text-lime-ink",
    dot: "bg-lime",
  },
  fuchsia: {
    solid: "bg-fuchsia text-white",
    softBg: "bg-fuchsia-soft",
    softText: "text-fuchsia-ink",
    text: "text-fuchsia-ink",
    border: "border-fuchsia",
    borderHover: "hover:border-fuchsia",
    textGroupHover: "group-hover:text-fuchsia-ink",
    dot: "bg-fuchsia",
  },
};

/** Category → accent. Neighbouring domains get distinct hues so grids read
 *  as a spectrum, not stripes of the same colour. */
export const DOMAIN_ACCENT: Record<Domain, Accent> = {
  "AI & Data": "coral",
  "AI Operations": "indigo",
  "Cloud & Infrastructure": "sky",
  "Identity & Access": "violet",
  "Endpoint & Application": "mint",
  "Detection & Response": "rose",
  "Governance, Risk & Compliance": "amber",
  "Advisory & Assurance": "teal",
  "Modern Workplace": "orange",
  "Data Center & Infrastructure": "lime",
  "Networking": "fuchsia",
  "IT Asset Management": "indigo",
};

export function domainAccent(domain: Domain): AccentClasses {
  return ACCENTS[DOMAIN_ACCENT[domain]];
}
