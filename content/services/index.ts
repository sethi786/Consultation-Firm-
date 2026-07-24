/**
 * The six services (CLAUDE.md §1). Canonical slugs — the single source of truth
 * shared by content/controls.ts, the service pages (§6), and the contact form.
 */

export const SERVICE_SLUGS = [
  "ai-security",
  "cloud-security",
  "identity",
  "zero-trust",
  "managed-soc",
  "compliance",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export interface ServiceSummary {
  slug: ServiceSlug;
  /** Full name for headings. */
  name: string;
  /** Short label for the register rail / tags. */
  short: string;
  /** The buyer's actual question, in their words. */
  question: string;
  /** One-line description for the services index (§4.3). */
  blurb: string;
}

export const SERVICES: Record<ServiceSlug, ServiceSummary> = {
  "ai-security": {
    slug: "ai-security",
    name: "AI & LLM Security",
    short: "AI Security",
    question: "We shipped a copilot. What did we just expose?",
    blurb: "Prompt injection, data exfiltration, and over-scoped tools in the LLM systems you've put in production.",
  },
  "cloud-security": {
    slug: "cloud-security",
    name: "Cloud Security",
    short: "Cloud",
    question: "Our cloud posture score is bad and I can't tell what matters.",
    blurb: "Azure and AWS reviewed against CIS, with a remediation plan sequenced by exploitability — not the scanner's list.",
  },
  identity: {
    slug: "identity",
    name: "Identity & Access Management",
    short: "Identity",
    question: "Who has standing admin, and why?",
    blurb: "Privileged-access inventory, the paths to tenant admin, and a move to just-in-time least privilege in Entra ID.",
  },
  "zero-trust": {
    slug: "zero-trust",
    name: "Zero Trust Architecture",
    short: "Zero Trust",
    question: "Board asked for a zero trust roadmap. I need one that's real.",
    blurb: "A maturity baseline across five pillars and a staged roadmap ordered by risk reduction, not a vendor diagram.",
  },
  "managed-soc": {
    slug: "managed-soc",
    name: "Managed SOC / MDR",
    short: "Managed SOC",
    question: "We get 4,000 alerts a week and no one triages at 2am.",
    blurb: "24/7 detection and response on your existing stack: tuned detections, staffed triage, real containment.",
  },
  compliance: {
    slug: "compliance",
    name: "Compliance & Audit",
    short: "Compliance",
    question: "SOC 2 / ISO 27001 audit is in five months.",
    blurb: "A control-by-control readiness assessment and the evidence auditors ask for, in place before they arrive.",
  },
};

/** Ordered list for rails and indexes. */
export const SERVICE_LIST: ServiceSummary[] = SERVICE_SLUGS.map((s) => SERVICES[s]);
