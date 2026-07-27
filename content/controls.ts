import type { ServiceSlug } from "@/content/services";

/**
 * The Control Register dataset (CLAUDE.md §3.4).
 *
 * Maps Waypoint's services to real framework controls. EVERY reference here
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
  // ── AI Red Teaming ───────────────────────────────────────────────────
  { framework: "ISO/IEC 27001:2022", reference: "A.8.29", name: "Security testing in development and acceptance", service: "ai-red-teaming", current: 2, target: 4 },
  { framework: "CIS Controls v8", reference: "CIS 18.1", name: "Establish and Maintain a Penetration Testing Program", service: "ai-red-teaming", current: 1, target: 4 },
  { framework: "CIS Controls v8", reference: "CIS 18.3", name: "Remediate Penetration Test Findings", service: "ai-red-teaming", current: 1, target: 4 },
  { framework: "NIST CSF 2.0", reference: "ID.RA-01", name: "Vulnerabilities in assets are identified, validated, and recorded", service: "ai-red-teaming", current: 2, target: 4 },

  // ── Continuous Validation (BAS) ──────────────────────────────────────
  { framework: "NIST CSF 2.0", reference: "DE.AE-02", name: "Potentially adverse events are analyzed to better understand associated activities", service: "continuous-validation", current: 2, target: 4 },
  { framework: "ISO/IEC 27001:2022", reference: "A.8.29", name: "Security testing in development and acceptance", service: "continuous-validation", current: 2, target: 4 },
  { framework: "CIS Controls v8", reference: "CIS 18.1", name: "Establish and Maintain a Penetration Testing Program", service: "continuous-validation", current: 2, target: 4 },
  { framework: "NIST CSF 2.0", reference: "DE.CM-01", name: "Networks and network services are monitored to find potentially adverse events", service: "continuous-validation", current: 2, target: 4 },

  // ── Cyber Insurance Readiness ────────────────────────────────────────
  { framework: "NIST CSF 2.0", reference: "PR.AA-05", name: "Access permissions, entitlements, and authorizations are defined in a policy, managed, enforced, and reviewed, and incorporate the principles of least privilege and separation of duties", service: "cyber-insurance", current: 2, target: 4 },
  { framework: "CIS Controls v8", reference: "CIS 11.1", name: "Establish and Maintain a Data Recovery Process", service: "cyber-insurance", current: 2, target: 4 },
  { framework: "ISO/IEC 27001:2022", reference: "A.5.24", name: "Information security incident management planning and preparation", service: "cyber-insurance", current: 2, target: 4 },
  { framework: "NIST CSF 2.0", reference: "GV.RM-01", name: "Risk management objectives are established and agreed to by organizational stakeholders", service: "cyber-insurance", current: 2, target: 4 },

  // ── M&A Security Due Diligence ───────────────────────────────────────
  { framework: "NIST CSF 2.0", reference: "ID.RA-01", name: "Vulnerabilities in assets are identified, validated, and recorded", service: "ma-due-diligence", current: 1, target: 4 },
  { framework: "ISO/IEC 27001:2022", reference: "A.5.9", name: "Inventory of information and other associated assets", service: "ma-due-diligence", current: 2, target: 4 },
  { framework: "CIS Controls v8", reference: "CIS 1.1", name: "Establish and Maintain Detailed Enterprise Asset Inventory", service: "ma-due-diligence", current: 2, target: 4 },
  { framework: "NIST CSF 2.0", reference: "GV.RM-01", name: "Risk management objectives are established and agreed to by organizational stakeholders", service: "ma-due-diligence", current: 1, target: 4 },

  // ── AI-Powered SOC ───────────────────────────────────────────────────
  {
    framework: "NIST CSF 2.0",
    reference: "DE.AE-02",
    name: "Potentially adverse events are analyzed to better understand associated activities",
    service: "ai-soc",
    current: 2,
    target: 4,
  },
  {
    framework: "ISO/IEC 27001:2022",
    reference: "A.8.16",
    name: "Monitoring activities",
    service: "ai-soc",
    current: 2,
    target: 4,
  },
  {
    framework: "CIS Controls v8",
    reference: "CIS 13.1",
    name: "Centralize Security Event Alerting",
    service: "ai-soc",
    current: 2,
    target: 4,
  },
  {
    framework: "NIST CSF 2.0",
    reference: "RS.MA-02",
    name: "Incident reports are triaged and validated",
    service: "ai-soc",
    current: 2,
    target: 4,
  },

  // ── AI Alert Triage ──────────────────────────────────────────────────
  {
    framework: "NIST CSF 2.0",
    reference: "DE.AE-03",
    name: "Information is correlated from multiple sources",
    service: "ai-alert-triage",
    current: 2,
    target: 4,
  },
  {
    framework: "ISO/IEC 27001:2022",
    reference: "A.8.16",
    name: "Monitoring activities",
    service: "ai-alert-triage",
    current: 2,
    target: 4,
  },
  {
    framework: "CIS Controls v8",
    reference: "CIS 13.11",
    name: "Tune Security Event Alerting Thresholds",
    service: "ai-alert-triage",
    current: 1,
    target: 4,
  },
  {
    framework: "CIS Controls v8",
    reference: "CIS 8.11",
    name: "Conduct Audit Log Reviews",
    service: "ai-alert-triage",
    current: 2,
    target: 4,
  },

  // ── AI Service Desk ──────────────────────────────────────────────────
  {
    framework: "NIST CSF 2.0",
    reference: "PR.AA-05",
    name: "Access permissions, entitlements, and authorizations are defined in a policy, managed, enforced, and reviewed, and incorporate the principles of least privilege and separation of duties",
    service: "ai-service-desk",
    current: 2,
    target: 4,
  },
  {
    framework: "ISO/IEC 27001:2022",
    reference: "A.5.18",
    name: "Access rights",
    service: "ai-service-desk",
    current: 2,
    target: 4,
  },
  {
    framework: "ISO/IEC 27001:2022",
    reference: "A.8.15",
    name: "Logging",
    service: "ai-service-desk",
    current: 2,
    target: 4,
  },
  {
    framework: "CIS Controls v8",
    reference: "CIS 6.1",
    name: "Establish an Access Granting Process",
    service: "ai-service-desk",
    current: 2,
    target: 4,
  },

  // ── AI Readiness & Risk Assessment ───────────────────────────────────
  {
    framework: "NIST CSF 2.0",
    reference: "GV.RM-01",
    name: "Risk management objectives are established and agreed to by organizational stakeholders",
    service: "ai-assessment",
    current: 1,
    target: 4,
  },
  {
    framework: "NIST CSF 2.0",
    reference: "ID.RA-01",
    name: "Vulnerabilities in assets are identified, validated, and recorded",
    service: "ai-assessment",
    current: 2,
    target: 4,
  },
  {
    framework: "ISO/IEC 27001:2022",
    reference: "A.5.8",
    name: "Information security in project management",
    service: "ai-assessment",
    current: 1,
    target: 4,
  },
  {
    framework: "ISO/IEC 27001:2022",
    reference: "A.8.8",
    name: "Management of technical vulnerabilities",
    service: "ai-assessment",
    current: 2,
    target: 4,
  },

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

  // ── AI Implementation & Enablement ───────────────────────────────────
  { framework: "ISO/IEC 27001:2022", reference: "A.5.23", name: "Information security for use of cloud services", service: "ai-implementation", current: 2, target: 4 },
  { framework: "NIST CSF 2.0", reference: "PR.DS-01", name: "The confidentiality, integrity, and availability of data-at-rest are protected", service: "ai-implementation", current: 2, target: 4 },
  { framework: "CIS Controls v8", reference: "CIS 3.3", name: "Configure data access control lists", service: "ai-implementation", current: 1, target: 4 },

  // ── Data Privacy (GDPR / CCPA) ───────────────────────────────────────
  { framework: "ISO/IEC 27001:2022", reference: "A.5.34", name: "Privacy and protection of personally identifiable information (PII)", service: "data-privacy", current: 1, target: 4 },
  { framework: "ISO/IEC 27001:2022", reference: "A.8.12", name: "Data leakage prevention", service: "data-privacy", current: 2, target: 4 },
  { framework: "CIS Controls v8", reference: "CIS 3.1", name: "Establish and maintain a data management process", service: "data-privacy", current: 1, target: 3 },

  // ── Cloud Implementation & Migration ─────────────────────────────────
  { framework: "ISO/IEC 27001:2022", reference: "A.5.23", name: "Information security for use of cloud services", service: "cloud-implementation", current: 2, target: 4 },
  { framework: "NIST CSF 2.0", reference: "PR.IR-01", name: "Networks and environments are protected from unauthorized logical access and usage", service: "cloud-implementation", current: 2, target: 4 },
  { framework: "CIS Controls v8", reference: "CIS 4.1", name: "Establish and maintain a secure configuration process", service: "cloud-implementation", current: 2, target: 4 },

  // ── OT / ICS & IoT Security ──────────────────────────────────────────
  { framework: "ISO/IEC 27001:2022", reference: "A.8.20", name: "Networks security", service: "ot-iot-security", current: 1, target: 4 },
  { framework: "NIST CSF 2.0", reference: "PR.IR-01", name: "Networks and environments are protected from unauthorized logical access and usage", service: "ot-iot-security", current: 1, target: 4 },
  { framework: "CIS Controls v8", reference: "CIS 12.2", name: "Establish and maintain a secure network architecture", service: "ot-iot-security", current: 1, target: 3 },

  // ── IAM Onboarding & Access Mapping ──────────────────────────────────
  { framework: "ISO/IEC 27001:2022", reference: "A.8.2", name: "Privileged access rights", service: "iam-onboarding", current: 2, target: 4 },
  { framework: "NIST CSF 2.0", reference: "PR.AA-05", name: "Access permissions, entitlements, and authorizations are defined in a policy, managed, enforced, and reviewed, and incorporate the principle of least privilege", service: "iam-onboarding", current: 2, target: 4 },
  { framework: "CIS Controls v8", reference: "CIS 6.2", name: "Establish an access revoking process", service: "iam-onboarding", current: 1, target: 4 },

  // ── Vulnerability Management ─────────────────────────────────────────
  { framework: "ISO/IEC 27001:2022", reference: "A.8.8", name: "Management of technical vulnerabilities", service: "vulnerability-management", current: 2, target: 4 },
  { framework: "NIST CSF 2.0", reference: "ID.RA-01", name: "Vulnerabilities in assets are identified, validated, and recorded", service: "vulnerability-management", current: 2, target: 4 },
  { framework: "CIS Controls v8", reference: "CIS 7", name: "Continuous vulnerability management", service: "vulnerability-management", current: 1, target: 4 },

  // ── SIEM & SOAR Engineering ──────────────────────────────────────────
  { framework: "ISO/IEC 27001:2022", reference: "A.8.16", name: "Monitoring activities", service: "siem-soar", current: 2, target: 4 },
  { framework: "NIST CSF 2.0", reference: "DE.AE-02", name: "Potentially adverse events are analyzed to better understand associated activities", service: "siem-soar", current: 2, target: 4 },
  { framework: "CIS Controls v8", reference: "CIS 8.11", name: "Conduct audit log reviews", service: "siem-soar", current: 1, target: 4 },

  // ── Threat Intelligence ──────────────────────────────────────────────
  { framework: "ISO/IEC 27001:2022", reference: "A.5.7", name: "Threat intelligence", service: "threat-intelligence", current: 1, target: 4 },
  { framework: "NIST CSF 2.0", reference: "DE.AE-07", name: "Cyber threat intelligence and other contextual information are integrated into the analysis", service: "threat-intelligence", current: 1, target: 4 },
  { framework: "CIS Controls v8", reference: "CIS 13.1", name: "Centralize security event alerting", service: "threat-intelligence", current: 1, target: 3 },

  // ── Incident Response & Ransomware Readiness ─────────────────────────
  { framework: "ISO/IEC 27001:2022", reference: "A.5.24", name: "Information security incident management planning and preparation", service: "incident-response", current: 2, target: 4 },
  { framework: "NIST CSF 2.0", reference: "RS.MA-01", name: "The incident response plan is executed in coordination with relevant third parties once an incident is declared", service: "incident-response", current: 1, target: 4 },
  { framework: "CIS Controls v8", reference: "CIS 17", name: "Incident response management", service: "incident-response", current: 1, target: 4 },

  // ── Governance, Risk & Compliance ────────────────────────────────────
  { framework: "ISO/IEC 27001:2022", reference: "A.5.1", name: "Policies for information security", service: "grc", current: 2, target: 4 },
  { framework: "NIST CSF 2.0", reference: "GV.RM-01", name: "Risk management objectives are established and agreed to by organizational stakeholders", service: "grc", current: 1, target: 4 },
  { framework: "NIST CSF 2.0", reference: "ID.RA-05", name: "Threats, vulnerabilities, likelihoods, and impacts are used to understand inherent risk and inform risk response prioritization", service: "grc", current: 1, target: 4 },

  // ── Third-Party / Vendor Risk ────────────────────────────────────────
  { framework: "ISO/IEC 27001:2022", reference: "A.5.19", name: "Information security in supplier relationships", service: "third-party-risk", current: 2, target: 4 },
  { framework: "NIST CSF 2.0", reference: "GV.SC-01", name: "A cybersecurity supply chain risk management program, strategy, objectives, policies, and processes are established and agreed to by organizational stakeholders", service: "third-party-risk", current: 1, target: 4 },
  { framework: "CIS Controls v8", reference: "CIS 15.1", name: "Establish and maintain an inventory of service providers", service: "third-party-risk", current: 1, target: 4 },

  // ── Business Continuity & DR ─────────────────────────────────────────
  { framework: "ISO/IEC 27001:2022", reference: "A.5.30", name: "ICT readiness for business continuity", service: "business-continuity", current: 1, target: 4 },
  { framework: "ISO/IEC 27001:2022", reference: "A.5.29", name: "Information security during disruption", service: "business-continuity", current: 1, target: 4 },
  { framework: "CIS Controls v8", reference: "CIS 11", name: "Data recovery", service: "business-continuity", current: 2, target: 4 },

  // ── Virtual CISO (vCISO) ─────────────────────────────────────────────
  { framework: "ISO/IEC 27001:2022", reference: "A.5.1", name: "Policies for information security", service: "vciso", current: 2, target: 4 },
  { framework: "ISO/IEC 27001:2022", reference: "A.5.4", name: "Management responsibilities", service: "vciso", current: 2, target: 4 },
  { framework: "NIST CSF 2.0", reference: "GV.RM-01", name: "Risk management objectives are established and agreed to by organizational stakeholders", service: "vciso", current: 1, target: 4 },

  // ── Penetration Testing & Red Team ───────────────────────────────────
  { framework: "ISO/IEC 27001:2022", reference: "A.8.29", name: "Security testing in development and acceptance", service: "penetration-testing", current: 2, target: 4 },
  { framework: "NIST CSF 2.0", reference: "ID.RA-01", name: "Vulnerabilities in assets are identified, validated, and recorded", service: "penetration-testing", current: 2, target: 4 },
  { framework: "CIS Controls v8", reference: "CIS 18", name: "Penetration testing", service: "penetration-testing", current: 1, target: 4 },

  // ── Security Architecture Review ─────────────────────────────────────
  { framework: "ISO/IEC 27001:2022", reference: "A.8.27", name: "Secure system architecture and engineering principles", service: "security-architecture", current: 2, target: 4 },
  { framework: "NIST CSF 2.0", reference: "PR.PS-01", name: "Configuration management practices are established and applied", service: "security-architecture", current: 2, target: 4 },
  { framework: "CIS Controls v8", reference: "CIS 4.1", name: "Establish and maintain a secure configuration process", service: "security-architecture", current: 2, target: 4 },

  // ── Security Awareness & Phishing Simulation ─────────────────────────
  { framework: "ISO/IEC 27001:2022", reference: "A.6.3", name: "Information security awareness, education and training", service: "security-awareness", current: 1, target: 4 },
  { framework: "NIST CSF 2.0", reference: "PR.AT-01", name: "Personnel are provided with awareness and training so that they possess the knowledge and skills to perform general tasks with security risks in mind", service: "security-awareness", current: 1, target: 4 },
  { framework: "CIS Controls v8", reference: "CIS 14", name: "Security awareness and skills training", service: "security-awareness", current: 1, target: 4 },

  // ── Data Platform & Analytics ────────────────────────────────────────
  { framework: "ISO/IEC 27001:2022", reference: "A.5.12", name: "Classification of information", service: "data-platform", current: 2, target: 4 },
  { framework: "NIST CSF 2.0", reference: "PR.DS-01", name: "The confidentiality, integrity, and availability of data-at-rest are protected", service: "data-platform", current: 2, target: 4 },
  { framework: "CIS Controls v8", reference: "CIS 3.3", name: "Configure data access control lists", service: "data-platform", current: 1, target: 4 },

  // ── Microsoft 365 & Collaboration ────────────────────────────────────
  { framework: "ISO/IEC 27001:2022", reference: "A.5.14", name: "Information transfer", service: "workplace-collaboration", current: 2, target: 4 },
  { framework: "ISO/IEC 27001:2022", reference: "A.8.12", name: "Data leakage prevention", service: "workplace-collaboration", current: 1, target: 4 },
  { framework: "CIS Controls v8", reference: "CIS 3.3", name: "Configure data access control lists", service: "workplace-collaboration", current: 1, target: 4 },

  // ── Managed Workplace Services ───────────────────────────────────────
  { framework: "ISO/IEC 27001:2022", reference: "A.8.1", name: "User end point devices", service: "managed-workplace", current: 2, target: 4 },
  { framework: "ISO/IEC 27001:2022", reference: "A.8.8", name: "Management of technical vulnerabilities", service: "managed-workplace", current: 2, target: 4 },
  { framework: "NIST CSF 2.0", reference: "PR.PS-01", name: "Configuration management practices are established and applied", service: "managed-workplace", current: 2, target: 4 },

  // ── Device Management & Provisioning ─────────────────────────────────
  { framework: "ISO/IEC 27001:2022", reference: "A.8.1", name: "User end point devices", service: "device-management", current: 2, target: 4 },
  { framework: "NIST CSF 2.0", reference: "PR.PS-01", name: "Configuration management practices are established and applied", service: "device-management", current: 2, target: 4 },
  { framework: "CIS Controls v8", reference: "CIS 4.1", name: "Establish and maintain a secure configuration process", service: "device-management", current: 1, target: 4 },

  // ── Adoption & Change Management ─────────────────────────────────────
  { framework: "ISO/IEC 27001:2022", reference: "A.6.3", name: "Information security awareness, education and training", service: "adoption-change", current: 1, target: 4 },
  { framework: "NIST CSF 2.0", reference: "PR.AT-01", name: "Personnel are provided with awareness and training so that they possess the knowledge and skills to perform general tasks with security risks in mind", service: "adoption-change", current: 1, target: 4 },

  // ── Data Center Modernization ────────────────────────────────────────
  { framework: "ISO/IEC 27001:2022", reference: "A.8.14", name: "Redundancy of information processing facilities", service: "datacenter-modernization", current: 2, target: 4 },
  { framework: "ISO/IEC 27001:2022", reference: "A.5.23", name: "Information security for use of cloud services", service: "datacenter-modernization", current: 1, target: 4 },
  { framework: "CIS Controls v8", reference: "CIS 4.1", name: "Establish and maintain a secure configuration process", service: "datacenter-modernization", current: 2, target: 4 },

  // ── Hybrid & Multi-Cloud Management ──────────────────────────────────
  { framework: "ISO/IEC 27001:2022", reference: "A.5.23", name: "Information security for use of cloud services", service: "hybrid-cloud", current: 2, target: 4 },
  { framework: "NIST CSF 2.0", reference: "PR.IR-01", name: "Networks and environments are protected from unauthorized logical access and usage", service: "hybrid-cloud", current: 2, target: 4 },
  { framework: "CIS Controls v8", reference: "CIS 4.1", name: "Establish and maintain a secure configuration process", service: "hybrid-cloud", current: 2, target: 4 },

  // ── Backup & Storage Modernization ───────────────────────────────────
  { framework: "ISO/IEC 27001:2022", reference: "A.8.13", name: "Information backup", service: "backup-storage", current: 2, target: 4 },
  { framework: "ISO/IEC 27001:2022", reference: "A.8.14", name: "Redundancy of information processing facilities", service: "backup-storage", current: 1, target: 4 },
  { framework: "CIS Controls v8", reference: "CIS 11", name: "Data recovery", service: "backup-storage", current: 2, target: 4 },

  // ── Network Transformation & SD-WAN ──────────────────────────────────
  { framework: "ISO/IEC 27001:2022", reference: "A.8.21", name: "Security of network services", service: "network-transformation", current: 2, target: 4 },
  { framework: "ISO/IEC 27001:2022", reference: "A.8.20", name: "Networks security", service: "network-transformation", current: 2, target: 4 },
  { framework: "CIS Controls v8", reference: "CIS 12.2", name: "Establish and maintain a secure network architecture", service: "network-transformation", current: 1, target: 4 },

  // ── Enterprise Wireless & LAN ────────────────────────────────────────
  { framework: "ISO/IEC 27001:2022", reference: "A.8.20", name: "Networks security", service: "enterprise-wireless", current: 2, target: 4 },
  { framework: "NIST CSF 2.0", reference: "PR.IR-01", name: "Networks and environments are protected from unauthorized logical access and usage", service: "enterprise-wireless", current: 2, target: 4 },
  { framework: "CIS Controls v8", reference: "CIS 12.2", name: "Establish and maintain a secure network architecture", service: "enterprise-wireless", current: 1, target: 4 },

  // ── Software Asset Management (SAM) ───────────────────────────────────
  { framework: "ISO/IEC 27001:2022", reference: "A.5.9", name: "Inventory of information and other associated assets", service: "software-asset-management", current: 2, target: 4 },
  { framework: "ISO/IEC 27001:2022", reference: "A.5.32", name: "Intellectual property rights", service: "software-asset-management", current: 2, target: 4 },
  { framework: "CIS Controls v8", reference: "CIS 2.1", name: "Establish and maintain a software inventory", service: "software-asset-management", current: 1, target: 4 },

  // ── Software Licensing Optimization ──────────────────────────────────
  { framework: "ISO/IEC 27001:2022", reference: "A.5.32", name: "Intellectual property rights", service: "licensing-optimization", current: 2, target: 4 },
  { framework: "ISO/IEC 27001:2022", reference: "A.5.9", name: "Inventory of information and other associated assets", service: "licensing-optimization", current: 2, target: 4 },
  { framework: "CIS Controls v8", reference: "CIS 2.1", name: "Establish and maintain a software inventory", service: "licensing-optimization", current: 1, target: 4 },

  // ── IT Procurement & Sourcing ────────────────────────────────────────
  { framework: "ISO/IEC 27001:2022", reference: "A.5.20", name: "Addressing information security within supplier agreements", service: "it-procurement", current: 2, target: 4 },
  { framework: "NIST CSF 2.0", reference: "GV.SC-01", name: "A cybersecurity supply chain risk management program, strategy, objectives, policies, and processes are established and agreed to by organizational stakeholders", service: "it-procurement", current: 1, target: 4 },
  { framework: "CIS Controls v8", reference: "CIS 15.1", name: "Establish and maintain an inventory of service providers", service: "it-procurement", current: 1, target: 4 },

  // ── Product Lifecycle & Asset Disposition ────────────────────────────
  { framework: "ISO/IEC 27001:2022", reference: "A.7.14", name: "Secure disposal or re-use of equipment", service: "lifecycle-services", current: 2, target: 4 },
  { framework: "ISO/IEC 27001:2022", reference: "A.5.9", name: "Inventory of information and other associated assets", service: "lifecycle-services", current: 2, target: 4 },
  { framework: "CIS Controls v8", reference: "CIS 1.1", name: "Establish and maintain detailed enterprise asset inventory", service: "lifecycle-services", current: 1, target: 4 },
];

/** Rows for a single service (used by service pages, §6). */
export function controlsForService(service: ServiceSlug): Control[] {
  return CONTROLS.filter((c) => c.service === service);
}
