/**
 * The service catalogue. Canonical slugs — the single source of truth shared by
 * content/controls.ts, the service pages (§6), the register, the mega-menu, and
 * the contact form.
 *
 * Services are grouped into categories (domains) for the index and mega-menu.
 * Order is category-by-category so rails and the register read top-to-bottom.
 */

export const SERVICE_SLUGS = [
  // AI & Data
  "ai-implementation",
  "ai-security",
  "data-security",
  "data-privacy",
  "data-platform",
  // AI Operations
  "ai-soc",
  "ai-alert-triage",
  "ai-service-desk",
  "ai-assessment",
  "ai-red-teaming",
  // Cloud & Infrastructure
  "cloud-implementation",
  "cloud-foundations",
  "cloud-security",
  "network-security",
  "ot-iot-security",
  // Identity & Access
  "identity",
  "iam-onboarding",
  "zero-trust",
  // Endpoint & Application
  "endpoint-security",
  "application-security",
  "vulnerability-management",
  // Detection & Response
  "managed-soc",
  "siem-soar",
  "threat-intelligence",
  "incident-response",
  "continuous-validation",
  // Governance, Risk & Compliance
  "compliance",
  "grc",
  "third-party-risk",
  "business-continuity",
  "cyber-insurance",
  // Advisory & Assurance
  "vciso",
  "penetration-testing",
  "security-architecture",
  "security-awareness",
  "ma-due-diligence",
  // Modern Workplace
  "workplace-collaboration",
  "managed-workplace",
  "device-management",
  "adoption-change",
  // Data Center & Infrastructure
  "datacenter-modernization",
  "hybrid-cloud",
  "backup-storage",
  // Networking
  "network-transformation",
  "enterprise-wireless",
  // IT Asset Management
  "software-asset-management",
  "licensing-optimization",
  "it-procurement",
  "lifecycle-services",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export const DOMAINS = [
  "AI & Data",
  "AI Operations",
  "Cloud & Infrastructure",
  "Identity & Access",
  "Endpoint & Application",
  "Detection & Response",
  "Governance, Risk & Compliance",
  "Advisory & Assurance",
  "Modern Workplace",
  "Data Center & Infrastructure",
  "Networking",
  "IT Asset Management",
] as const;

export type Domain = (typeof DOMAINS)[number];

export interface ServiceSummary {
  slug: ServiceSlug;
  /** Full name for headings. */
  name: string;
  /** Short label for the register rail / tags. */
  short: string;
  /** Grouping for the services index / mega-menu. */
  domain: Domain;
  /** The buyer's actual question, in their words. */
  question: string;
  /** One-line description for the services index (§4.3). */
  blurb: string;
}

export const SERVICES: Record<ServiceSlug, ServiceSummary> = {
  // ── AI & Data ────────────────────────────────────────────────────
  "ai-implementation": {
    slug: "ai-implementation",
    name: "AI Implementation & Enablement",
    short: "AI Enablement",
    domain: "AI & Data",
    question: "We want Copilot and AI — but safely, and for real value.",
    blurb: "Deploy Microsoft Copilot and LLM solutions with the data boundaries, guardrails, and adoption plan to get value without new exposure.",
  },
  "ai-security": {
    slug: "ai-security",
    name: "AI & LLM Security",
    short: "AI Security",
    domain: "AI & Data",
    question: "We shipped a copilot. What did we just expose?",
    blurb: "Prompt injection, data exfiltration, and over-scoped tools in the LLM systems you've put in production.",
  },
  "data-security": {
    slug: "data-security",
    name: "Data Security & Governance",
    short: "Data & Purview",
    domain: "AI & Data",
    question: "Where is our sensitive data, and who can reach it?",
    blurb: "Microsoft Purview data classification, DLP, and insider-risk — so sensitive data is found, labelled, and protected.",
  },
  "data-privacy": {
    slug: "data-privacy",
    name: "Data Privacy (GDPR / CCPA)",
    short: "Data Privacy",
    domain: "AI & Data",
    question: "Are we actually compliant with privacy law — and can we prove it?",
    blurb: "Data mapping, DPIAs, and a privacy program aligned to GDPR, CCPA and friends — with the records a regulator asks for.",
  },
  "data-platform": {
    slug: "data-platform",
    name: "Data Platform & Analytics",
    short: "Data Platform",
    domain: "AI & Data",
    question: "Our data is siloed and no one trusts the reporting.",
    blurb: "A governed data platform on Microsoft Fabric or Azure — pipelines, a semantic model, and analytics people can actually rely on.",
  },

  // ── AI Operations ────────────────────────────────────────────────
  "ai-soc": {
    slug: "ai-soc",
    name: "AI-Powered SOC",
    short: "AI SOC",
    domain: "AI Operations",
    question: "Our SOC can't keep up with the alert volume — can AI actually help?",
    blurb: "AI-augmented 24/7 detection and triage: models correlate and enrich alerts on your SIEM/XDR, and a human analyst verifies every escalation.",
  },
  "ai-alert-triage": {
    slug: "ai-alert-triage",
    name: "AI Alert Triage",
    short: "AI Alerts",
    domain: "AI Operations",
    question: "We drown in alerts and almost all of them are noise.",
    blurb: "AI correlation, enrichment, and prioritisation that collapses alert noise and surfaces the few that matter — reviewed by an analyst before you're paged.",
  },
  "ai-service-desk": {
    slug: "ai-service-desk",
    name: "AI Service Desk",
    short: "AI Helpdesk",
    domain: "AI Operations",
    question: "Our service desk is buried in password resets and access requests.",
    blurb: "An AI helpdesk that resolves routine IT and access requests instantly and safely — with least-privilege guardrails, a full audit trail, and humans for the rest.",
  },
  "ai-assessment": {
    slug: "ai-assessment",
    name: "AI Readiness & Risk Assessment",
    short: "AI Assessment",
    domain: "AI Operations",
    question: "We're adopting AI faster than we can govern it — is it safe?",
    blurb: "Where AI is actually in use, what it exposes, and a governance roadmap mapped to NIST AI RMF and ISO/IEC 42001 — so adoption stays ahead of the risk.",
  },
  "ai-red-teaming": {
    slug: "ai-red-teaming",
    name: "AI Red Teaming",
    short: "AI Red Team",
    domain: "AI Operations",
    question: "Our AI feature passed QA — but would it survive an attacker?",
    blurb: "Adversarial testing of your LLM apps and agents: prompt injection, jailbreaks, data exfiltration, and tool abuse — with reproductions and fixes, not a scanner dump.",
  },

  // ── Cloud & Infrastructure ───────────────────────────────────────
  "cloud-implementation": {
    slug: "cloud-implementation",
    name: "Cloud Implementation & Migration",
    short: "Cloud Migration",
    domain: "Cloud & Infrastructure",
    question: "We need to move to the cloud without breaking security or the budget.",
    blurb: "Migration and modernization to Azure and AWS, secure by default, with cost and posture controlled from day one.",
  },
  "cloud-foundations": {
    slug: "cloud-foundations",
    name: "Cloud Foundations & Landing Zones",
    short: "Landing Zones",
    domain: "Cloud & Infrastructure",
    question: "We're scaling in Azure on foundations that were never designed.",
    blurb: "A secure-by-default Azure landing zone — governance, policy-as-code, and network topology built to the Well-Architected Framework.",
  },
  "cloud-security": {
    slug: "cloud-security",
    name: "Cloud Security",
    short: "Cloud",
    domain: "Cloud & Infrastructure",
    question: "Our cloud posture score is bad and I can't tell what matters.",
    blurb: "Azure and AWS reviewed against CIS, with a remediation plan sequenced by exploitability — not the scanner's list.",
  },
  "network-security": {
    slug: "network-security",
    name: "Network Security & Segmentation",
    short: "Network",
    domain: "Cloud & Infrastructure",
    question: "Our network is flat. One foothold and it's game over.",
    blurb: "Segmentation, traffic filtering, and a secure network architecture that contains a breach instead of amplifying it.",
  },
  "ot-iot-security": {
    slug: "ot-iot-security",
    name: "OT / ICS & IoT Security",
    short: "OT & IoT",
    domain: "Cloud & Infrastructure",
    question: "Our plant floor and devices were never designed to be on the network.",
    blurb: "Visibility, segmentation, and monitoring for operational technology and IoT — without disrupting production.",
  },

  // ── Identity & Access ────────────────────────────────────────────
  identity: {
    slug: "identity",
    name: "Identity & Access Management",
    short: "Identity",
    domain: "Identity & Access",
    question: "Who has standing admin, and why?",
    blurb: "Privileged-access inventory, the paths to tenant admin, and a move to just-in-time least privilege in Entra ID.",
  },
  "iam-onboarding": {
    slug: "iam-onboarding",
    name: "IAM Onboarding & Access Mapping",
    short: "IAM Onboarding",
    domain: "Identity & Access",
    question: "Joiner-mover-leaver is manual and access sprawls.",
    blurb: "Map every identity and entitlement, then automate onboarding, offboarding, and access reviews in Entra ID.",
  },
  "zero-trust": {
    slug: "zero-trust",
    name: "Zero Trust Architecture",
    short: "Zero Trust",
    domain: "Identity & Access",
    question: "Board asked for a zero trust roadmap. I need one that's real.",
    blurb: "A maturity baseline across five pillars and a staged roadmap ordered by risk reduction, not a vendor diagram.",
  },

  // ── Endpoint & Application ───────────────────────────────────────
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
  "vulnerability-management": {
    slug: "vulnerability-management",
    name: "Vulnerability Management",
    short: "Vuln Mgmt",
    domain: "Endpoint & Application",
    question: "We have 50,000 vulnerabilities and no idea which to fix.",
    blurb: "Risk-based vulnerability management: continuous scanning, prioritization by exploitability, and remediation SLAs that stick.",
  },

  // ── Detection & Response ─────────────────────────────────────────
  "managed-soc": {
    slug: "managed-soc",
    name: "Managed SOC / MDR",
    short: "Managed SOC",
    domain: "Detection & Response",
    question: "We get 4,000 alerts a week and no one triages at 2am.",
    blurb: "24/7 detection and response on your existing stack: tuned detections, staffed triage, real containment.",
  },
  "siem-soar": {
    slug: "siem-soar",
    name: "SIEM & SOAR Engineering",
    short: "SIEM & SOAR",
    domain: "Detection & Response",
    question: "Our SIEM is noisy, expensive, and no one trusts the alerts.",
    blurb: "Sentinel/SIEM tuning and SOAR automation: high-fidelity detections, automated response playbooks, and lower ingestion cost.",
  },
  "threat-intelligence": {
    slug: "threat-intelligence",
    name: "Threat Intelligence",
    short: "Threat Intel",
    domain: "Detection & Response",
    question: "What's actually targeting our industry and our brand?",
    blurb: "Curated threat intelligence, attack-surface and dark-web monitoring, fed straight into your detections and decisions.",
  },
  "incident-response": {
    slug: "incident-response",
    name: "Incident Response & Ransomware Readiness",
    short: "Incident Response",
    domain: "Detection & Response",
    question: "If we're hit tonight, what's the plan?",
    blurb: "IR retainer, ransomware tabletop exercises, and tested recovery runbooks — so a bad day doesn't become a crisis.",
  },
  "continuous-validation": {
    slug: "continuous-validation",
    name: "Continuous Validation (Breach & Attack Simulation)",
    short: "Continuous Validation",
    domain: "Detection & Response",
    question: "We bought the tools — but do our defences actually fire?",
    blurb: "Safely and continuously simulate real attacker techniques (MITRE ATT&CK) to prove your controls and detections work — and find the gaps before an attacker does.",
  },

  // ── Governance, Risk & Compliance ────────────────────────────────
  compliance: {
    slug: "compliance",
    name: "Compliance & Audit",
    short: "Compliance",
    domain: "Governance, Risk & Compliance",
    question: "SOC 2 / ISO 27001 audit is in five months.",
    blurb: "A control-by-control readiness assessment and the evidence auditors ask for, in place before they arrive.",
  },
  grc: {
    slug: "grc",
    name: "Governance, Risk & Compliance",
    short: "GRC",
    domain: "Governance, Risk & Compliance",
    question: "We track risk in spreadsheets and audits keep surprising us.",
    blurb: "A risk register, policy framework, and control mapping across the standards you're held to — run as a program, not a scramble.",
  },
  "third-party-risk": {
    slug: "third-party-risk",
    name: "Third-Party / Vendor Risk",
    short: "Vendor Risk",
    domain: "Governance, Risk & Compliance",
    question: "Our biggest risks now live in our suppliers.",
    blurb: "Vendor risk assessment, tiering, and continuous monitoring so a supplier's breach doesn't become yours.",
  },
  "business-continuity": {
    slug: "business-continuity",
    name: "Business Continuity & DR",
    short: "BCDR",
    domain: "Governance, Risk & Compliance",
    question: "If a system goes down for a week, do we survive it?",
    blurb: "Business impact analysis, continuity plans, and disaster-recovery runbooks that are actually tested — not shelf-ware.",
  },
  "cyber-insurance": {
    slug: "cyber-insurance",
    name: "Cyber Insurance Readiness",
    short: "Cyber Insurance",
    domain: "Governance, Risk & Compliance",
    question: "Our cyber insurance renewal wants controls we're not sure we have.",
    blurb: "Close the controls insurers now require — MFA, EDR, tested backups, IR plans — so you qualify for cover, lower your premium, and don't void a future claim.",
  },

  // ── Advisory & Assurance ─────────────────────────────────────────
  vciso: {
    slug: "vciso",
    name: "Virtual CISO (vCISO)",
    short: "vCISO",
    domain: "Advisory & Assurance",
    question: "We need security leadership without a full-time hire.",
    blurb: "Fractional security leadership: strategy, board reporting, and program ownership from someone who's done it before.",
  },
  "penetration-testing": {
    slug: "penetration-testing",
    name: "Penetration Testing & Red Team",
    short: "Pen Testing",
    domain: "Advisory & Assurance",
    question: "Prove an attacker can't get in — and show me how.",
    blurb: "External, internal, web, and red-team testing that finds the paths a real attacker would, with evidence and fixes.",
  },
  "security-architecture": {
    slug: "security-architecture",
    name: "Security Architecture Review",
    short: "Architecture",
    domain: "Advisory & Assurance",
    question: "Is what we're building actually secure by design?",
    blurb: "An independent review of your reference architecture and designs against zero-trust and secure-by-design principles.",
  },
  "security-awareness": {
    slug: "security-awareness",
    name: "Security Awareness & Phishing Simulation",
    short: "Awareness",
    domain: "Advisory & Assurance",
    question: "Our people are the target and training is a checkbox.",
    blurb: "Role-based awareness training and realistic phishing simulations that measurably cut click rates.",
  },
  "ma-due-diligence": {
    slug: "ma-due-diligence",
    name: "M&A Security Due Diligence",
    short: "M&A Diligence",
    domain: "Advisory & Assurance",
    question: "We're acquiring a company — what security risk are we buying?",
    blurb: "A pre-deal security assessment of the target: real exposure, breach history, hidden liabilities, and an integration plan — so the risk is priced in, not inherited.",
  },

  // ── Modern Workplace ─────────────────────────────────────────────
  "workplace-collaboration": {
    slug: "workplace-collaboration",
    name: "Microsoft 365 & Collaboration",
    short: "M365 & Collab",
    domain: "Modern Workplace",
    question: "We rolled out Teams and M365, but adoption and governance are a mess.",
    blurb: "Microsoft 365 and Teams done right — tenant governance, secure collaboration, and a rollout people actually adopt.",
  },
  "managed-workplace": {
    slug: "managed-workplace",
    name: "Managed Workplace Services",
    short: "Managed Workplace",
    domain: "Modern Workplace",
    question: "Our IT team spends all day on tickets instead of moving the business forward.",
    blurb: "Proactive management of your digital workplace — endpoints, identity, and support — so your team ships projects, not tickets.",
  },
  "device-management": {
    slug: "device-management",
    name: "Device Management & Provisioning",
    short: "Device Mgmt",
    domain: "Modern Workplace",
    question: "New starters wait days for a working laptop.",
    blurb: "Zero-touch provisioning and lifecycle management with Intune and Autopilot — a compliant device, ready on day one.",
  },
  "adoption-change": {
    slug: "adoption-change",
    name: "Adoption & Change Management",
    short: "Adoption",
    domain: "Modern Workplace",
    question: "We buy the tools; no one actually uses them.",
    blurb: "Structured adoption and change management so the technology you invest in gets used — and the value shows up.",
  },

  // ── Data Center & Infrastructure ─────────────────────────────────
  "datacenter-modernization": {
    slug: "datacenter-modernization",
    name: "Data Center Modernization",
    short: "Data Center",
    domain: "Data Center & Infrastructure",
    question: "Our data center is ageing and expensive to run.",
    blurb: "Modernise or exit the data center — assessment, virtualization, and a hybrid target that cuts cost and risk.",
  },
  "hybrid-cloud": {
    slug: "hybrid-cloud",
    name: "Hybrid & Multi-Cloud Management",
    short: "Hybrid Cloud",
    domain: "Data Center & Infrastructure",
    question: "We're spread across on-prem, Azure, and AWS with no single view.",
    blurb: "One operating model across on-prem and clouds — governance, monitoring, and cost control you can actually see.",
  },
  "backup-storage": {
    slug: "backup-storage",
    name: "Backup & Storage Modernization",
    short: "Backup & Storage",
    domain: "Data Center & Infrastructure",
    question: "Our backups are slow, costly, and we're not sure they'd restore.",
    blurb: "Modern, immutable backup and storage — tested recovery, ransomware-resilient, and sized to what the business actually needs.",
  },

  // ── Networking ───────────────────────────────────────────────────
  "network-transformation": {
    slug: "network-transformation",
    name: "Network Transformation & SD-WAN",
    short: "SD-WAN",
    domain: "Networking",
    question: "Our WAN is expensive and can't keep up with cloud traffic.",
    blurb: "Modern networking — SD-WAN, SASE, and a topology built for a cloud-first, work-anywhere business.",
  },
  "enterprise-wireless": {
    slug: "enterprise-wireless",
    name: "Enterprise Wireless & LAN",
    short: "Wireless & LAN",
    domain: "Networking",
    question: "Wi-Fi is unreliable and there are dead zones everywhere.",
    blurb: "Designed, surveyed, and managed wireless and campus networking — reliable connectivity that just works.",
  },

  // ── IT Asset Management ──────────────────────────────────────────
  "software-asset-management": {
    slug: "software-asset-management",
    name: "Software Asset Management (SAM)",
    short: "SAM",
    domain: "IT Asset Management",
    question: "We're over-licensed in places, under-licensed in others, and audit-exposed.",
    blurb: "Know exactly what you own and use — a SAM baseline that cuts waste, closes compliance gaps, and survives a vendor audit.",
  },
  "licensing-optimization": {
    slug: "licensing-optimization",
    name: "Software Licensing Optimization",
    short: "Licensing",
    domain: "IT Asset Management",
    question: "Microsoft, Adobe, and VMware renewals keep climbing. Are we even using it?",
    blurb: "Right-size and renegotiate your major software agreements — pay for what you use, not what a rep sold you.",
  },
  "it-procurement": {
    slug: "it-procurement",
    name: "IT Procurement & Sourcing",
    short: "Procurement",
    domain: "IT Asset Management",
    question: "Buying IT is slow, fragmented, and we leave money on the table.",
    blurb: "Sourcing and procurement done with security in mind — better pricing, faster cycles, and vetted vendors.",
  },
  "lifecycle-services": {
    slug: "lifecycle-services",
    name: "Product Lifecycle & Asset Disposition",
    short: "Lifecycle",
    domain: "IT Asset Management",
    question: "We don't know what hardware we have or how to retire it securely.",
    blurb: "Hardware lifecycle from deployment to secure, certified disposal — with data destruction you can prove.",
  },
};

/** Ordered list for rails and indexes. */
export const SERVICE_LIST: ServiceSummary[] = SERVICE_SLUGS.map((s) => SERVICES[s]);

/** Services grouped by category, in category order, for the index + mega-menu. */
export const SERVICES_BY_DOMAIN: { domain: Domain; services: ServiceSummary[] }[] =
  DOMAINS.map((domain) => ({
    domain,
    services: SERVICE_LIST.filter((s) => s.domain === domain),
  }));
