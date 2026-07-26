import type { Domain } from "@/content/services";

/**
 * The bright color-block accent system. Each service domain owns one hue.
 * Class strings are written out in full (never interpolated at the token level)
 * so Tailwind's JIT keeps them — including the hover:/group-hover: variants,
 * which must appear as literals here to be generated.
 * `solid` = strong block with white text; `softBg`/`softText` = tinted panel;
 * `text` = AA-accessible label on paper; `border`/`dot` for accents.
 */
export type Accent = "coral" | "sky" | "violet" | "mint" | "indigo" | "amber" | "rose";

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
};

/** Domain → hue. Keeps the whole site's color-coding coherent. */
export const DOMAIN_ACCENT: Record<Domain, Accent> = {
  "Data & AI": "coral",
  "Cloud & Infrastructure": "sky",
  "Identity & Access": "violet",
  "Endpoint & Application": "mint",
  "Detection & Governance": "indigo",
};

export function domainAccent(domain: Domain): AccentClasses {
  return ACCENTS[DOMAIN_ACCENT[domain]];
}
