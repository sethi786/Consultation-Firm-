import type { Domain } from "@/content/services";
import type { Accent } from "@/lib/accent";

/**
 * The delivery-mode spine — the "how you engage us" axis that Accenture and
 * Deloitte put at the centre of their cyber practices: Advise → Implement →
 * Operate. Every capability is available in each mode. These map onto the
 * per-service engagement tiers (Assessment / Implementation / Managed).
 */

export interface DeliveryMode {
  key: "advise" | "implement" | "operate";
  name: string;
  tier: string;
  tagline: string;
  blurb: string;
  includes: string[];
  accent: Accent;
}

export const DELIVERY_MODES: DeliveryMode[] = [
  {
    key: "advise",
    name: "Advise",
    tier: "Assessment",
    tagline: "Know exactly where you stand.",
    blurb:
      "An independent assessment against NIST CSF 2.0, ISO 27001 and CIS — a prioritised findings register and a roadmap you can take to the board.",
    includes: [
      "Gap assessment & maturity baseline",
      "Risk register with severities",
      "Prioritised remediation roadmap",
      "Board-ready reporting",
    ],
    accent: "sky",
  },
  {
    key: "implement",
    name: "Implement",
    tier: "Implementation",
    tagline: "Close the gaps that matter.",
    blurb:
      "We build and deploy the controls alongside your team — hardening baselines, identity, zero trust, cloud posture — and verify every fix with evidence.",
    includes: [
      "Hands-on remediation",
      "Tenant & cloud hardening baselines",
      "Zero-trust & identity rollout",
      "Verification retest with evidence",
    ],
    accent: "violet",
  },
  {
    key: "operate",
    name: "Operate",
    tier: "Managed",
    tagline: "We run it, around the clock.",
    blurb:
      "Managed detection and response, continuous posture management and compliance — your security operations run by us and measured against agreed SLAs.",
    includes: [
      "24/7 managed detection & response",
      "Continuous posture management",
      "Alert triage & threat hunting",
      "Monthly reporting & reviews",
    ],
    accent: "coral",
  },
];

/**
 * The capability × delivery-mode matrix — the scannable "everything we do, in
 * the mode you need" grid. Each cell names a real, deliverable engagement that
 * maps to one of the service pages.
 */
export interface MatrixRow {
  domain: Domain;
  advise: string;
  implement: string;
  operate: string;
}

export const CAPABILITY_MATRIX: MatrixRow[] = [
  {
    domain: "AI & Data",
    advise: "AI & data exposure assessment",
    implement: "Copilot rollout & Purview classification",
    operate: "Ongoing data-risk monitoring",
  },
  {
    domain: "Cloud & Infrastructure",
    advise: "Cloud posture & landing-zone review",
    implement: "Migration & secure landing zone",
    operate: "Continuous cloud posture management",
  },
  {
    domain: "Identity & Access",
    advise: "Privileged-access & IAM assessment",
    implement: "Entra ID, JML & zero-trust rollout",
    operate: "Managed identity & access reviews",
  },
  {
    domain: "Endpoint & Application",
    advise: "Endpoint, app-sec & vulnerability assessment",
    implement: "EDR, secure-SDLC & vuln remediation",
    operate: "Managed endpoint & vulnerability management",
  },
  {
    domain: "Detection & Response",
    advise: "SOC & detection readiness",
    implement: "Sentinel/SIEM & SOAR build",
    operate: "24/7 managed SOC / MDR",
  },
  {
    domain: "Governance, Risk & Compliance",
    advise: "Compliance, risk & vendor assessment",
    implement: "GRC program & control build",
    operate: "Continuous compliance & vendor monitoring",
  },
  {
    domain: "Advisory & Assurance",
    advise: "Pen test, vCISO & architecture review",
    implement: "Remediation & awareness rollout",
    operate: "Ongoing vCISO & testing cadence",
  },
];
