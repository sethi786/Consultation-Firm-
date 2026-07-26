import type { ServiceSlug } from "@/content/services";

/**
 * The Control Register dataset (CLAUDE.md §3.4).
 *
 * Maps Northport's six services to real framework controls. EVERY reference here
 * was verified against the published framework — NIST CSF 2.0, ISO/IEC 27001:2022
 * Annex A, and CIS Controls v8/v8.1 — not recalled. Wrong IDs get spotted by every
 * buyer, so if you add a row, look the reference up before committing it.
 *
 * Sources verified against:
 *  - NIST CSF 2.0 (NIST.CSWP.29) subcategories, via csf.tools reference.
 *  - ISO/IEC 27001:2022 Annex A control titles (ISO 27002:2022).
 *  - CIS Critical Security Controls v8 / v8.1 safeguard titles.
 *
 * `current` / `target` maturity (1–5) is illustrative of a typical engagement
 * trajectory — the shape of the work, not a specific client's data.
 */

export type Framework = "NIST CSF 2.0" | "ISO/IEC 27001:2022" | "CIS Controls v8";

export type Maturity = 1 | 2 | 3 | 4 | 5;

export interface Control {
  framework: Framework;
  /** The published reference ID, exactly as the framework prints it. */
  reference: string;
  /** The official control / subcategory name. */
  name: string;
  service: ServiceSlug;
  current: Maturity;
  target: Maturity;
}

export const CONTROLS: Control[] = [
  // ── AI & LLM Security ────────────────────────────────────────────────
  {
    framework: "NIST CSF 2.0",
    reference: "PR.PS-06",
    name: "Secure software development practices are integrated, and their performance is monitored throughout the software development life cycle",
    service: "ai-security",
    current: 2,
    target: 4,
  },
  {
    framework: "ISO/IEC 27001:2022",
    reference: "A.8.25",
    name: "Secure development life cycle",
    service: "ai-security",
    current: 2,
    target: 4,
  },
  {
    framework: "ISO/IEC 27001:2022",
    reference: "A.8.28",
    name: "Secure coding",
    service: "ai-security",
    current: 1,
    target: 4,
  },
  {
    framework: "CIS Controls v8",
    reference: "CIS 16.1",
    name: "Establish and maintain a secure application development process",
    service: "ai-security",
    current: 1,
    target: 3,
  },
  {
    framework: "NIST CSF 2.0",
    reference: "GV.SC-07",
    name: "The risks posed by a supplier, their products and services, and other third parties are understood, recorded, prioritized, assessed, responded to, and monitored",
    service: "ai-security",
    current: 2,
    target: 4,
  },

  // ── Cloud Security (Azure & AWS) ─────────────────────────────────────
  {
    framework: "ISO/IEC 27001:2022",
    reference: "A.5.23",
    name: "Information security for the use of cloud services",
    service: "cloud-security",
    current: 2,
    target: 4,
  },
  {
    framework: "NIST CSF 2.0",
    reference: "PR.PS-01",
    name: "Configuration management practices are established and applied",
    service: "cloud-security",
    current: 2,
    target: 4,
  },
  {
    framework: "ISO/IEC 27001:2022",
    reference: "A.8.9",
    name: "Configuration management",
    service: "cloud-security",
    current: 2,
    target: 4,
  },
  {
    framework: "CIS Controls v8",
    reference: "CIS 4.1",
    name: "Establish and maintain a secure configuration process",
    service: "cloud-security",
    current: 2,
    target: 4,
  },
  {
    framework: "ISO/IEC 27001:2022",
    reference: "A.8.24",
    name: "Use of cryptography",
    service: "cloud-security",
    current: 3,
    target: 4,
  },

  // ── Identity & Access Management (Entra ID) ──────────────────────────
  {
    framework: "NIST CSF 2.0",
    reference: "PR.AA-01",
    name: "Identities and credentials for authorized users, services, and hardware are managed by the organization",
    service: "identity",
    current: 2,
    target: 4,
  },
  {
    framework: "NIST CSF 2.0",
    reference: "PR.AA-05",
    name: "Access permissions, entitlements, and authorizations are defined in a policy, managed, enforced, and reviewed, and incorporate the principles of least privilege and separation of duties",
    service: "identity",
    current: 2,
    target: 5,
  },
  {
    framework: "ISO/IEC 27001:2022",
    reference: "A.5.16",
    name: "Identity management",
    service: "identity",
    current: 3,
    target: 4,
  },
  {
    framework: "ISO/IEC 27001:2022",
    reference: "A.8.2",
    name: "Privileged access rights",
    service: "identity",
    current: 1,
    target: 4,
  },
  {
    framework: "CIS Controls v8",
    reference: "CIS 5.3",
    name: "Disable dormant accounts",
    service: "identity",
    current: 2,
    target: 4,
  },

  // ── Zero Trust Architecture ──────────────────────────────────────────
  {
    framework: "NIST CSF 2.0",
    reference: "PR.AA-03",
    name: "Users, services, and hardware are authenticated",
    service: "zero-trust",
    current: 2,
    target: 5,
  },
  {
    framework: "NIST CSF 2.0",
    reference: "PR.IR-01",
    name: "Networks and environments are protected from unauthorized logical access and usage",
    service: "zero-trust",
    current: 1,
    target: 4,
  },
  {
    framework: "ISO/IEC 27001:2022",
    reference: "A.8.22",
    name: "Segregation of networks",
    service: "zero-trust",
    current: 2,
    target: 4,
  },
  {
    framework: "CIS Controls v8",
    reference: "CIS 6.7",
    name: "Centralize access control",
    service: "zero-trust",
    current: 2,
    target: 4,
  },
  {
    framework: "CIS Controls v8",
    reference: "CIS 6.5",
    name: "Require MFA for administrative access",
    service: "zero-trust",
    current: 2,
    target: 5,
  },

  // ── Managed SOC / MDR ────────────────────────────────────────────────
  {
    framework: "NIST CSF 2.0",
    reference: "DE.CM-01",
    name: "Networks and network services are monitored to find potentially adverse events",
    service: "managed-soc",
    current: 2,
    target: 4,
  },
  {
    framework: "NIST CSF 2.0",
    reference: "DE.AE-02",
    name: "Potentially adverse events are analyzed to better understand associated activities",
    service: "managed-soc",
    current: 2,
    target: 4,
  },
  {
    framework: "NIST CSF 2.0",
    reference: "RS.MA-01",
    name: "The incident response plan is executed in coordination with relevant third parties once an incident is declared",
    service: "managed-soc",
    current: 1,
    target: 4,
  },
  {
    framework: "ISO/IEC 27001:2022",
    reference: "A.8.15",
    name: "Logging",
    service: "managed-soc",
    current: 2,
    target: 4,
  },
  {
    framework: "ISO/IEC 27001:2022",
    reference: "A.8.16",
    name: "Monitoring activities",
    service: "managed-soc",
    current: 2,
    target: 4,
  },
  {
    framework: "CIS Controls v8",
    reference: "CIS 8.2",
    name: "Collect audit logs",
    service: "managed-soc",
    current: 2,
    target: 4,
  },
  {
    framework: "CIS Controls v8",
    reference: "CIS 13.1",
    name: "Centralize security event alerting",
    service: "managed-soc",
    current: 1,
    target: 4,
  },

  // ── Compliance & Audit ───────────────────────────────────────────────
  {
    framework: "NIST CSF 2.0",
    reference: "GV.RM-01",
    name: "Risk management objectives are established and agreed to by organizational stakeholders",
    service: "compliance",
    current: 2,
    target: 4,
  },
  {
    framework: "NIST CSF 2.0",
    reference: "ID.RA-01",
    name: "Vulnerabilities in assets are identified, validated, and recorded",
    service: "compliance",
    current: 2,
    target: 4,
  },
  {
    framework: "ISO/IEC 27001:2022",
    reference: "A.5.15",
    name: "Access control",
    service: "compliance",
    current: 3,
    target: 4,
  },
  {
    framework: "ISO/IEC 27001:2022",
    reference: "A.5.7",
    name: "Threat intelligence",
    service: "compliance",
    current: 2,
    target: 4,
  },
  {
    framework: "CIS Controls v8",
    reference: "CIS 15.1",
    name: "Establish and maintain an inventory of service providers",
    service: "compliance",
    current: 1,
    target: 3,
  },
  {
    framework: "CIS Controls v8",
    reference: "CIS 7.1",
    name: "Establish and maintain a vulnerability management process",
    service: "compliance",
    current: 2,
    target: 4,
  },

  // ── Data Security & Governance (Microsoft Purview) ───────────────────
  {
    framework: "ISO/IEC 27001:2022",
    reference: "A.5.12",
    name: "Classification of information",
    service: "data-security",
    current: 2,
    target: 4,
  },
  {
    framework: "ISO/IEC 27001:2022",
    reference: "A.5.13",
    name: "Labelling of information",
    service: "data-security",
    current: 1,
    target: 4,
  },
  {
    framework: "ISO/IEC 27001:2022",
    reference: "A.8.12",
    name: "Data leakage prevention",
    service: "data-security",
    current: 1,
    target: 4,
  },
  {
    framework: "NIST CSF 2.0",
    reference: "PR.DS-01",
    name: "The confidentiality, integrity, and availability of data-at-rest are protected",
    service: "data-security",
    current: 2,
    target: 4,
  },
  {
    framework: "CIS Controls v8",
    reference: "CIS 3.3",
    name: "Configure data access control lists",
    service: "data-security",
    current: 2,
    target: 4,
  },
  {
    framework: "CIS Controls v8",
    reference: "CIS 3.11",
    name: "Encrypt sensitive data at rest",
    service: "data-security",
    current: 2,
    target: 4,
  },

  // ── Cloud Foundations & Landing Zones (Azure) ────────────────────────
  {
    framework: "NIST CSF 2.0",
    reference: "PR.PS-01",
    name: "Configuration management practices are established and applied",
    service: "cloud-foundations",
    current: 1,
    target: 4,
  },
  {
    framework: "ISO/IEC 27001:2022",
    reference: "A.8.9",
    name: "Configuration management",
    service: "cloud-foundations",
    current: 2,
    target: 4,
  },
  {
    framework: "CIS Controls v8",
    reference: "CIS 4.1",
    name: "Establish and maintain a secure configuration process",
    service: "cloud-foundations",
    current: 1,
    target: 4,
  },
  {
    framework: "NIST CSF 2.0",
    reference: "PR.IR-01",
    name: "Networks and environments are protected from unauthorized logical access and usage",
    service: "cloud-foundations",
    current: 2,
    target: 4,
  },

  // ── Network Security & Segmentation ──────────────────────────────────
  {
    framework: "ISO/IEC 27001:2022",
    reference: "A.8.20",
    name: "Networks security",
    service: "network-security",
    current: 1,
    target: 4,
  },
  {
    framework: "ISO/IEC 27001:2022",
    reference: "A.8.21",
    name: "Security of network services",
    service: "network-security",
    current: 2,
    target: 4,
  },
  {
    framework: "CIS Controls v8",
    reference: "CIS 12.2",
    name: "Establish and maintain a secure network architecture",
    service: "network-security",
    current: 1,
    target: 4,
  },
  {
    framework: "CIS Controls v8",
    reference: "CIS 13.4",
    name: "Perform traffic filtering between network segments",
    service: "network-security",
    current: 2,
    target: 4,
  },

  // ── Endpoint & Device Security (Intune / Defender) ───────────────────
  {
    framework: "ISO/IEC 27001:2022",
    reference: "A.8.1",
    name: "User endpoint devices",
    service: "endpoint-security",
    current: 2,
    target: 4,
  },
  {
    framework: "ISO/IEC 27001:2022",
    reference: "A.8.7",
    name: "Protection against malware",
    service: "endpoint-security",
    current: 2,
    target: 4,
  },
  {
    framework: "NIST CSF 2.0",
    reference: "PR.PS-05",
    name: "Installation and execution of unauthorized software are prevented",
    service: "endpoint-security",
    current: 1,
    target: 4,
  },
  {
    framework: "CIS Controls v8",
    reference: "CIS 10.1",
    name: "Deploy and maintain anti-malware software",
    service: "endpoint-security",
    current: 2,
    target: 4,
  },

  // ── Application Security ──────────────────────────────────────────────
  {
    framework: "ISO/IEC 27001:2022",
    reference: "A.8.26",
    name: "Application security requirements",
    service: "application-security",
    current: 1,
    target: 4,
  },
  {
    framework: "ISO/IEC 27001:2022",
    reference: "A.8.28",
    name: "Secure coding",
    service: "application-security",
    current: 2,
    target: 4,
  },
  {
    framework: "NIST CSF 2.0",
    reference: "PR.PS-06",
    name: "Secure software development practices are integrated, and their performance is monitored throughout the software development life cycle",
    service: "application-security",
    current: 2,
    target: 4,
  },
  {
    framework: "CIS Controls v8",
    reference: "CIS 16.1",
    name: "Establish and maintain a secure application development process",
    service: "application-security",
    current: 1,
    target: 3,
  },
];

/** Rows for a single service (used by service pages, §6). */
export function controlsForService(service: ServiceSlug): Control[] {
  return CONTROLS.filter((c) => c.service === service);
}
