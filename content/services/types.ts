import type { ServiceSummary } from "./index";

/** A concrete workstream with its named deliverable (§6.2). */
export interface Workstream {
  title: string;
  deliverable: string;
  detail: string;
}

/** An engagement tier row (§6.4). Price is "from …" or a {{TODO}} marker. */
export interface EngagementTier {
  name: "Assessment" | "Implementation" | "Managed";
  duration: string;
  summary: string;
  includes: string[];
  /** What is explicitly NOT in this tier — buyers ask. */
  excludes: string[];
  price: string;
}

export interface Faq {
  q: string;
  a: string;
}

/** Full service page dataset (§6). Extends the shared summary. */
export interface ServiceDetail extends ServiceSummary {
  /** One paragraph naming the buyer's problem, in their words (§6.1). */
  situation: string;
  workstreams: Workstream[];
  tiers: EngagementTier[];
  /** The artefacts they receive, named as documents (§6.5). */
  deliverables: string[];
  faqs: Faq[];
  seo: { title: string; description: string };
}
