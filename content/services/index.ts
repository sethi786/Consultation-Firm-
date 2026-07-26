/**
 * The service catalogue. Canonical slugs — the single source of truth shared by
 * content/controls.ts, the service pages (§6), the register, and the contact form.
 *
 * Services are grouped into domains for the premium services index.
 */

export const SERVICE_SLUGS = [
  "ai-security",
  "data-security",
  "cloud-security",
  "cloud-foundations",
  "network-security",
  "identity",
  "zero-trust",
  "endpoint-security",
  "application-security",
  "managed-soc",
  "compliance",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export const DOMAINS = [
  "Data & AI",
  "Cloud & Infrastructure",
  "Identity & Access",
  "Endpoint & Application",
  "Detection & Governance",
] as const;

export type Domain = (typeof DOMAINS)[number];

export interface ServiceSummary {
  slug: ServiceSlug;
  /** Full name for headings. */
  name: string;
  /** Short label for the register rail / tags. */
  short: string;
  /** Grouping for the services index. */
  domain: Domain;
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
    domain: "Data & AI",
    question: "We shipped a copilot. What did we just expose?",
    blurb: "Prompt injection, data exfiltration, and over-scoped tools in the LLM systems you've put in production.",
  },
  "data-security": {
    slug: "data-security",
    name: "Data Security & Governance",
    short: "Data & Purview",
    domain: "Data & AI",
    question: "Where is our sensitive data, and who can reach it?",
    blurb: "Microsoft Purview data classification, DLP, and insider-risk — so sensitive data is found, labelled, and protected.",
  },
  "cloud-security": {
    slug: "cloud-security",
    name: "Cloud Security",
    short: "Cloud",
    domain: "Cloud & Infrastructure",
    question: "Our cloud posture score is bad and I can't tell what matters.",
    blurb: "Azure and AWS reviewed against CIS, with a remediation plan sequenced by exploitability — not the scanner's list.",
  },
  "cloud-foundations": {
    slug: "cloud-foundations",
    name: "Cloud Foundations & Landing Zones",
    short: "Landing Zones",
    domain: "Cloud & Infrastructure",
    question: "We're scaling in Azure on foundations that were never designed.",
    blurb: "A secure-by-default Azure landing zone — governance, policy-as-code, and network topology built to the Well-Architected Framework.",
  },
  "network-security": {
    slug: "network-security",
    name: "Network Security & Segmentation",
    short: "Network",
    domain: "Cloud & Infrastructure",
    question: "Our network is flat. One foothold and it's game over.",
    blurb: "Segmentation, traffic filtering, and a secure network architecture that contains a breach instead of amplifying it.",
  },
  identity: {
    slug: "identity",
    name: "Identity & Access Management",
    short: "Identity",
    domain: "Identity & Access",
    question: "Who has standing admin, and why?",
    blurb: "Privileged-access inventory, the paths to tenant admin, and a move to just-in-time least privilege in Entra ID.",
  },
  "zero-trust": {
    slug: "zero-trust",
    name: "Zero Trust Architecture",
    short: "Zero Trust",
    domain: "Identity & Access",
    question: "Board asked for a zero trust roadmap. I need one that's real.",
    blurb: "A maturity baseline across five pillars and a staged roadmap ordered by risk reduction, not a vendor diagram.",
  },
  "endpoint-security": {
    slug: "endpoint-security",
    name: "Endpoint & Device Security",
    short: "Endpoint",
    domain: "Endpoint & Application",
    question: "Do we actually know every device that touches our data?",
    blurb: "Intune and Defender for Endpoint: device compliance, hardening baselines, and malware defence that gate access to data.",
  },
  "application-security": {
    slug: "application-security",
    name: "Application Security",
    short: "AppSec",
    domain: "Endpoint & Application",
    question: "We ship weekly. Security testing can't be a gate at the end.",
    blurb: "Security built into the SDLC — requirements, secure coding, SAST/DAST, and API testing that keeps pace with delivery.",
  },
  "managed-soc": {
    slug: "managed-soc",
    name: "Managed SOC / MDR",
    short: "Managed SOC",
    domain: "Detection & Governance",
    question: "We get 4,000 alerts a week and no one triages at 2am.",
    blurb: "24/7 detection and response on your existing stack: tuned detections, staffed triage, real containment.",
  },
  compliance: {
    slug: "compliance",
    name: "Compliance & Audit",
    short: "Compliance",
    domain: "Detection & Governance",
    question: "SOC 2 / ISO 27001 audit is in five months.",
    blurb: "A control-by-control readiness assessment and the evidence auditors ask for, in place before they arrive.",
  },
};

/** Ordered list for rails and indexes. */
export const SERVICE_LIST: ServiceSummary[] = SERVICE_SLUGS.map((s) => SERVICES[s]);

/** Services grouped by domain, in domain order, for the premium index. */
export const SERVICES_BY_DOMAIN: { domain: Domain; services: ServiceSummary[] }[] =
  DOMAINS.map((domain) => ({
    domain,
    services: SERVICE_LIST.filter((s) => s.domain === domain),
  }));
