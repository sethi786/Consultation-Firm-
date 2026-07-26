import type { ServiceSlug } from "./index";
import { SERVICES } from "./index";
import type { ServiceDetail } from "./types";

/**
 * Service page content (§6). Copy follows §5: answer the buyer's question first,
 * every claim carries a number / framework reference / named artefact, no banned
 * adjectives. We never invent business facts (metrics, client names, certs).
 *
 * `price` is intentionally blank — the service template renders an honest,
 * tier-appropriate label ("Fixed fee", "Scoped per environment", "Monthly
 * retainer") rather than a public number, which is standard for consulting.
 */

const details: Record<ServiceSlug, Omit<ServiceDetail, keyof (typeof SERVICES)["ai-security"]>> = {
  "ai-security": {
    situation:
      "You shipped an LLM feature — a support copilot, a RAG assistant over internal docs, an agent that can call tools — and now someone on the board wants to know what it can leak, who can make it misbehave, and whether a prompt in a customer ticket can reach your database. Cairn assesses the AI system the way an attacker will: prompt injection, data exfiltration through the model, over-scoped tool permissions, and the retrieval layer that quietly indexed data the model should never surface.",
    workstreams: [
      {
        title: "Threat model the AI system end to end",
        deliverable: "AI threat model (data flows, trust boundaries, abuse cases)",
        detail:
          "Map every path from untrusted input to model to tool to data store. Identify where a prompt becomes an instruction and where the model's output is trusted without checking.",
      },
      {
        title: "Prompt injection & jailbreak testing",
        deliverable: "Prompt injection findings register with reproductions",
        detail:
          "Direct and indirect injection, tool-call hijacking, and system-prompt extraction against your actual endpoints — not a generic checklist.",
      },
      {
        title: "Retrieval & data-exposure review",
        deliverable: "RAG data-exposure report",
        detail:
          "What the index contains, who can retrieve it, and whether row-level access survives the trip through embeddings and re-ranking.",
      },
      {
        title: "Guardrail & tool-permission hardening",
        deliverable: "Guardrail baseline and least-privilege tool policy",
        detail:
          "Input/output filtering, allow-listed tool scopes, and human-in-the-loop gates on actions that change state or spend money.",
      },
    ],
    tiers: [
      {
        name: "Assessment",
        duration: "2–3 weeks",
        summary: "We test the AI system and hand you a prioritised findings register.",
        includes: [
          "AI threat model",
          "Prompt injection & jailbreak testing",
          "RAG data-exposure review",
          "Board-ready findings report with severities mapped to NIST CSF 2.0",
        ],
        excludes: ["Remediation engineering", "Model fine-tuning", "Ongoing monitoring"],
        price: "",
      },
      {
        name: "Implementation",
        duration: "4–8 weeks",
        summary: "We build the guardrails and close the findings with your engineers.",
        includes: [
          "Everything in Assessment",
          "Guardrail and tool-permission implementation",
          "CI checks for prompt-injection regressions",
          "Verification retest",
        ],
        excludes: ["24/7 monitoring", "Model hosting"],
        price: "",
      },
      {
        name: "Managed",
        duration: "Ongoing",
        summary: "We watch the AI system in production and re-test each release.",
        includes: [
          "Continuous abuse-case monitoring",
          "Per-release regression testing",
          "Quarterly threat-model refresh",
        ],
        excludes: ["Application feature development"],
        price: "",
      },
    ],
    deliverables: [
      "AI threat model",
      "Prompt injection findings register",
      "RAG data-exposure report",
      "Guardrail baseline and least-privilege tool policy",
      "Board-ready summary report",
    ],
    faqs: [
      {
        q: "Do you test against our real endpoints or a copy?",
        a: "Against a staging environment that mirrors production, with the same prompts, tools, and retrieval index. A sanitised copy hides exactly the misconfigurations that matter.",
      },
      {
        q: "We use a third-party model API. Is there anything to assess?",
        a: "Yes — most AI risk lives in your integration, not the model weights: what you put in the context window, which tools the model can call, and what your app trusts in the model's output. That is the surface we test.",
      },
      {
        q: "Can you help us meet the AI requirements in our SOC 2 or ISO 27001 audit?",
        a: "Our findings map to NIST CSF 2.0 and ISO/IEC 27001:2022 controls, and we produce the evidence an auditor asks for. Compliance & Audit runs alongside this engagement when you need the attestation.",
      },
      {
        q: "What frameworks do you use for AI specifically?",
        a: "The OWASP Top 10 for LLM Applications and MITRE ATLAS for technique coverage, mapped back to NIST CSF 2.0 so the findings sit in the same register as the rest of your programme.",
      },
    ],
    seo: {
      title: "AI & LLM Security assessments",
      description:
        "We test your copilots, RAG systems, and agents for prompt injection, data exfiltration, and over-scoped tools — with a prioritised findings register mapped to NIST CSF 2.0.",
    },
  },

  "cloud-security": {
    situation:
      "Your cloud posture tool shows hundreds of findings and a score you can't explain to the board. The real question isn't \"how do we get to green\" — it's \"which ten of these actually expose us, and in what order do we fix them.\" Cairn reviews your Azure and AWS estate against CIS benchmarks and your own architecture, then hands you a remediation plan sequenced by exploitability, not by the tool's alphabetical list.",
    workstreams: [
      {
        title: "Configuration review against CIS benchmarks",
        deliverable: "Cloud configuration findings register",
        detail:
          "Azure and AWS baseline review — public storage, permissive network rules, unencrypted data, missing logging — verified by hand, not just scanner output.",
      },
      {
        title: "Identity & privilege review in the cloud control plane",
        deliverable: "Cloud IAM findings and least-privilege plan",
        detail:
          "Standing privileged roles, over-broad managed identities and service principals, and paths from a low-privilege foothold to tenant admin.",
      },
      {
        title: "Network & exposure mapping",
        deliverable: "Internet-exposure map",
        detail:
          "Everything reachable from the internet, why, and what sits behind it. Segmentation gaps and the blast radius of each exposed service.",
      },
      {
        title: "Remediation sequencing",
        deliverable: "Prioritised remediation roadmap",
        detail:
          "Findings ordered by exploitability and effort, with the specific config change for each and an owner.",
      },
    ],
    tiers: [
      {
        name: "Assessment",
        duration: "2–4 weeks",
        summary: "We review the estate and hand you a sequenced remediation roadmap.",
        includes: [
          "CIS-aligned configuration review (Azure + AWS)",
          "Cloud IAM and exposure review",
          "Prioritised remediation roadmap",
          "Executive summary with a posture baseline you can re-measure",
        ],
        excludes: ["Hands-on remediation", "Landing-zone rebuild", "Ongoing monitoring"],
        price: "",
      },
      {
        name: "Implementation",
        duration: "4–10 weeks",
        summary: "We remediate alongside your team and codify a secure baseline.",
        includes: [
          "Everything in Assessment",
          "Guardrails as policy-as-code (Azure Policy / SCPs)",
          "Landing-zone / hardening baseline",
          "Verification retest and updated posture score",
        ],
        excludes: ["24/7 monitoring", "Application code changes"],
        price: "",
      },
      {
        name: "Managed",
        duration: "Ongoing",
        summary: "We keep drift in check and review new workloads before they ship.",
        includes: [
          "Continuous posture monitoring and drift alerts",
          "New-workload design review",
          "Quarterly posture report",
        ],
        excludes: ["Application development", "Cloud cost optimisation"],
        price: "",
      },
    ],
    deliverables: [
      "Cloud configuration findings register",
      "Cloud IAM findings and least-privilege plan",
      "Internet-exposure map",
      "Prioritised remediation roadmap",
      "Policy-as-code guardrail baseline",
    ],
    faqs: [
      {
        q: "We already run a CSPM tool. Why do we need you?",
        a: "A CSPM tells you what is misconfigured. It doesn't tell you which findings are reachable, which chain together into a real attack path, or what to fix first. That judgement is the engagement.",
      },
      {
        q: "Azure, AWS, or both?",
        a: "Both. Most of our clients run at least two clouds, and the risky gaps are usually at the seams — a federated identity or a shared network path that neither cloud's own tooling flags.",
      },
      {
        q: "Will you make changes in our environment?",
        a: "Only in the Implementation tier, and only with change control and your approval on every step. The Assessment is read-only.",
      },
      {
        q: "How do you decide what's critical?",
        a: "By exploitability and blast radius: is it reachable, what does it expose, and what can an attacker reach from there. A public bucket of marketing images and a public bucket of customer PII are not the same finding.",
      },
    ],
    seo: {
      title: "Cloud Security for Azure & AWS",
      description:
        "We turn a noisy cloud posture score into a remediation roadmap sequenced by exploitability, across Azure and AWS, aligned to CIS Controls v8.",
    },
  },

  identity: {
    situation:
      "Someone asks who has standing global admin in your tenant, and the honest answer is \"we're not sure.\" Between break-glass accounts, legacy service principals, guest users, and roles granted for a project that ended two years ago, privileged access has sprawled. Cairn inventories every identity with elevated rights, shows you the paths from an ordinary account to tenant admin, and moves you to just-in-time, least-privilege access in Entra ID.",
    workstreams: [
      {
        title: "Privileged-access inventory",
        deliverable: "Privileged identity inventory",
        detail:
          "Every human, service principal, and managed identity with elevated rights — what it can do, when it last used the privilege, and whether it still needs it.",
      },
      {
        title: "Attack-path analysis",
        deliverable: "Identity attack-path map",
        detail:
          "Concrete paths from a standard user or a compromised app to Global Administrator, and the specific grant that enables each one.",
      },
      {
        title: "Conditional Access & MFA baseline",
        deliverable: "Conditional Access baseline",
        detail:
          "A reviewed CA policy set: legacy auth blocked, MFA enforced, risk-based controls, and named exclusions with an expiry — not a permanent bypass list.",
      },
      {
        title: "Just-in-time privileged access",
        deliverable: "PIM configuration and access-review cadence",
        detail:
          "Move standing admin to time-bound, approved elevation with Privileged Identity Management, and set the recurring access reviews that keep it clean.",
      },
    ],
    tiers: [
      {
        name: "Assessment",
        duration: "2–3 weeks",
        summary: "We inventory privileged access and map the paths to tenant admin.",
        includes: [
          "Privileged identity inventory",
          "Identity attack-path map",
          "Conditional Access gap review",
          "Prioritised findings mapped to NIST CSF PR.AA and ISO 27001 A.8.2",
        ],
        excludes: ["PIM rollout", "Policy changes", "Ongoing reviews"],
        price: "",
      },
      {
        name: "Implementation",
        duration: "4–8 weeks",
        summary: "We stand up JIT access and a Conditional Access baseline.",
        includes: [
          "Everything in Assessment",
          "PIM rollout for privileged roles",
          "Conditional Access baseline deployment",
          "Access-review cadence and verification retest",
        ],
        excludes: ["24/7 monitoring", "Identity governance suite licensing"],
        price: "",
      },
      {
        name: "Managed",
        duration: "Ongoing",
        summary: "We run the access reviews and watch for privilege creep.",
        includes: [
          "Recurring access reviews",
          "Privilege-creep and standing-admin alerting",
          "Quarterly identity posture report",
        ],
        excludes: ["Help-desk / joiner-mover-leaver operations"],
        price: "",
      },
    ],
    deliverables: [
      "Privileged identity inventory",
      "Identity attack-path map",
      "Conditional Access baseline",
      "PIM configuration and access-review cadence",
      "Remediation roadmap",
    ],
    faqs: [
      {
        q: "We're on Entra ID. Do we already have what we need?",
        a: "The capabilities are there — Conditional Access, PIM, access reviews. The gap is almost always configuration and hygiene: legacy auth still allowed, standing admin never reviewed, exclusions that never expire. That's what we fix.",
      },
      {
        q: "Will just-in-time access slow our admins down?",
        a: "Elevation takes seconds with approval, and it applies to privileged roles, not day-to-day work. In exchange you remove the standing admin that a phished account would otherwise inherit.",
      },
      {
        q: "Can you cover hybrid identity with on-prem AD?",
        a: "Yes. We review the sync and federation path, Entra Connect, and the on-prem tiering, because a weak on-prem admin model undermines the cloud controls above it.",
      },
      {
        q: "What about non-human identities?",
        a: "Service principals and managed identities are where most tenants have the least visibility and the widest grants. They're in scope from the start.",
      },
    ],
    seo: {
      title: "Identity & Access Management for Entra ID",
      description:
        "We inventory privileged access, map the paths to tenant admin, and move you to just-in-time least privilege in Entra ID — aligned to NIST CSF PR.AA and ISO 27001.",
    },
  },

  "zero-trust": {
    situation:
      "The board asked for a zero trust roadmap, and you need one that survives contact with your actual network — not a vendor diagram. Zero trust is a multi-year architecture change across identity, devices, network, and data, and it fails when it's bought as a product instead of sequenced as a programme. Cairn assesses where you are against a recognised zero trust maturity model and gives you a staged roadmap with the order that reduces the most risk first.",
    workstreams: [
      {
        title: "Zero trust maturity assessment",
        deliverable: "Maturity assessment across the five pillars",
        detail:
          "Identity, devices, network, applications, and data — scored against the CISA Zero Trust Maturity Model so the board sees a defensible baseline.",
      },
      {
        title: "Segmentation & access design",
        deliverable: "Target segmentation and access architecture",
        detail:
          "Trust boundaries, per-resource access, and the path off flat networks and implicit trust — designed for what you run, cloud and on-prem.",
      },
      {
        title: "Staged roadmap",
        deliverable: "Sequenced zero trust roadmap",
        detail:
          "A multi-phase plan ordered by risk reduction and dependency, with the identity and device work that has to come first named as such.",
      },
      {
        title: "Quick-win hardening",
        deliverable: "First-90-days hardening list",
        detail:
          "The controls you can turn on now — MFA everywhere, legacy auth off, device compliance gates — that move maturity before the larger architecture lands.",
      },
    ],
    tiers: [
      {
        name: "Assessment",
        duration: "3–4 weeks",
        summary: "We baseline your maturity and hand the board a staged roadmap.",
        includes: [
          "Zero trust maturity assessment (five pillars)",
          "Target segmentation and access architecture",
          "Sequenced multi-phase roadmap",
          "Board-ready briefing deck",
        ],
        excludes: ["Implementation", "Product procurement", "Ongoing delivery"],
        price: "",
      },
      {
        name: "Implementation",
        duration: "Phased, per roadmap",
        summary: "We deliver the roadmap phase by phase with your teams.",
        includes: [
          "Everything in Assessment",
          "Phase delivery: identity, device, and network controls",
          "Policy-as-code where applicable",
          "Per-phase verification against the maturity model",
        ],
        excludes: ["Hardware procurement", "Application re-architecture"],
        price: "",
      },
      {
        name: "Managed",
        duration: "Ongoing",
        summary: "We govern the programme and keep maturity moving.",
        includes: [
          "Programme governance and reporting",
          "New-system access design reviews",
          "Quarterly maturity re-scoring",
        ],
        excludes: ["Day-to-day network operations"],
        price: "",
      },
    ],
    deliverables: [
      "Zero trust maturity assessment",
      "Target segmentation and access architecture",
      "Sequenced zero trust roadmap",
      "First-90-days hardening list",
      "Board-ready briefing deck",
    ],
    faqs: [
      {
        q: "Is zero trust a product we buy?",
        a: "No. It's an architecture that spans identity, devices, network, and data. Products help with pieces, but sequencing and access design are the work, and buying a product without them is how zero trust programmes stall.",
      },
      {
        q: "Where does a zero trust programme actually start?",
        a: "Identity and device trust, almost always. Strong authentication and device compliance are the foundation the network and data controls depend on, so they come first in every roadmap we write.",
      },
      {
        q: "How long is this?",
        a: "The assessment and roadmap take three to four weeks. The roadmap itself is typically staged over 12–24 months — we sequence it so the highest-risk gaps close in the first phases, not the last.",
      },
      {
        q: "What maturity model do you use?",
        a: "The CISA Zero Trust Maturity Model for scoring, mapped to NIST CSF 2.0 so the roadmap lines up with the rest of your control register.",
      },
    ],
    seo: {
      title: "Zero Trust Architecture roadmaps",
      description:
        "A real zero trust roadmap: maturity assessed against the CISA model across five pillars, sequenced by risk reduction, mapped to NIST CSF 2.0.",
    },
  },

  "managed-soc": {
    situation:
      "Your tools generate thousands of alerts a week and no one is triaging them at 2am. The question is not whether you have detection — it's whether anything happens when a real one fires. Cairn runs detection and response against your existing stack: we tune the noise down, write the detections that matter, and put analysts on the queue around the clock so an alert becomes an investigation, not an unread email.",
    workstreams: [
      {
        title: "Detection engineering & tuning",
        deliverable: "Tuned detection ruleset with documented rationale",
        detail:
          "Retire the rules that only ever cry wolf, write the ones mapped to techniques you actually face, and cut alert volume without cutting coverage.",
      },
      {
        title: "24/7 monitoring & triage",
        deliverable: "Staffed alert queue with response SLAs",
        detail:
          "Analysts on the queue around the clock, triaging and escalating against agreed SLAs — so a 2am alert gets a human, not a snooze.",
      },
      {
        title: "Incident response",
        deliverable: "Investigation and containment runbooks",
        detail:
          "When something is real, we investigate, contain, and coordinate with your team using runbooks written for your environment before the incident, not during it.",
      },
      {
        title: "Threat hunting & reporting",
        deliverable: "Monthly hunt findings and metrics report",
        detail:
          "Proactive hunts on your telemetry plus a monthly report with the numbers that matter: dwell time, alert volume, mean time to triage.",
      },
    ],
    tiers: [
      {
        name: "Assessment",
        duration: "2–3 weeks",
        summary: "We review your detection coverage and alert quality before committing to run it.",
        includes: [
          "Detection coverage review against MITRE ATT&CK",
          "Alert-quality and noise analysis",
          "Logging and telemetry gap report",
          "Onboarding plan for managed detection",
        ],
        excludes: ["24/7 staffing", "Ongoing response"],
        price: "",
      },
      {
        name: "Implementation",
        duration: "3–6 weeks onboarding",
        summary: "We tune detections and stand up the pipeline into our SOC.",
        includes: [
          "Detection engineering and tuning",
          "Log source onboarding and validation",
          "Runbook development",
          "Handover into 24/7 operations",
        ],
        excludes: ["SIEM licensing", "Endpoint tool licensing"],
        price: "",
      },
      {
        name: "Managed",
        duration: "Ongoing",
        summary: "We run detection and response on your stack, around the clock.",
        includes: [
          "24/7 monitoring and triage with response SLAs",
          "Incident response and containment",
          "Continuous detection tuning and threat hunting",
          "Monthly metrics report",
        ],
        excludes: ["Full DFIR retainer for major breaches (scoped separately)"],
        price: "",
      },
    ],
    deliverables: [
      "Tuned detection ruleset",
      "Staffed alert queue with response SLAs",
      "Investigation and containment runbooks",
      "Monthly hunt findings and metrics report",
      "Logging and telemetry gap report",
    ],
    faqs: [
      {
        q: "Do we have to replace our SIEM or EDR?",
        a: "No. We run on your existing stack — Microsoft Sentinel and Defender, or your current tools. Replacing them is a decision we'd only raise if a genuine coverage gap made it necessary.",
      },
      {
        q: "What does 'tune the noise' actually mean for us?",
        a: "Fewer, better alerts. We retire rules that generate false positives and write detections mapped to real techniques, then report the change in alert volume and mean-time-to-triage every month so you can see the noise coming down.",
      },
      {
        q: "What happens when there's a real incident at 2am?",
        a: "An analyst triages it against your runbook, contains what can be safely contained, and escalates to your on-call with a clear picture — what happened, what's affected, and what we've already done.",
      },
      {
        q: "How is this different from an MSSP that just forwards alerts?",
        a: "We don't forward alerts, we resolve them. Triage, investigation, and containment are the service; a wall of un-actioned tickets is the problem we're replacing.",
      },
    ],
    seo: {
      title: "Managed SOC / MDR",
      description:
        "24/7 managed detection and response on your existing stack: tuned detections, staffed triage with SLAs, and incident response mapped to MITRE ATT&CK and NIST CSF 2.0.",
    },
  },

  compliance: {
    situation:
      "You have a SOC 2 or ISO 27001 audit in a few months and a stack of controls you're not sure you can evidence. The failure mode isn't usually the audit itself — it's discovering three weeks out that a control has no owner, no policy, and no logs to prove it ran. Cairn runs a readiness assessment against the framework you're certifying to, tells you exactly where the gaps are, and gets the evidence in place before the auditor arrives.",
    workstreams: [
      {
        title: "Readiness gap assessment",
        deliverable: "Control-by-control gap assessment",
        detail:
          "Every control in scope for SOC 2 or ISO/IEC 27001:2022, assessed for whether it exists, is operating, and can be evidenced — with the gaps named.",
      },
      {
        title: "Policy & control remediation",
        deliverable: "Policy set and control-implementation plan",
        detail:
          "The policies, procedures, and technical controls the framework requires, written to your environment and mapped to the specific clauses.",
      },
      {
        title: "Evidence & audit preparation",
        deliverable: "Evidence pack and audit-readiness report",
        detail:
          "The artefacts an auditor asks for, collected and organised, plus a dry run so there are no surprises in the real assessment.",
      },
      {
        title: "Risk register & treatment",
        deliverable: "Risk register and treatment plan",
        detail:
          "A living risk register aligned to NIST CSF 2.0 and ISO 27001, with owners and treatment decisions the auditor can trace.",
      },
    ],
    tiers: [
      {
        name: "Assessment",
        duration: "2–4 weeks",
        summary: "We assess readiness and hand you a prioritised gap list.",
        includes: [
          "Control-by-control gap assessment (SOC 2 or ISO 27001)",
          "Risk register aligned to NIST CSF 2.0 / ISO 27001",
          "Prioritised remediation plan with owners",
          "Realistic timeline to audit-ready",
        ],
        excludes: ["Policy writing", "The audit itself (performed by a licensed auditor)"],
        price: "",
      },
      {
        name: "Implementation",
        duration: "6–16 weeks",
        summary: "We close the gaps and assemble the evidence pack.",
        includes: [
          "Everything in Assessment",
          "Policy set and control implementation",
          "Evidence collection and organisation",
          "Audit dry run",
        ],
        excludes: ["Issuing the attestation (the auditor does that)"],
        price: "",
      },
      {
        name: "Managed",
        duration: "Ongoing",
        summary: "We keep you continuously audit-ready between cycles.",
        includes: [
          "Continuous control monitoring",
          "Evidence upkeep and annual surveillance support",
          "Quarterly risk-register review",
        ],
        excludes: ["Recertification audit fees"],
        price: "",
      },
    ],
    deliverables: [
      "Control-by-control gap assessment",
      "Policy set",
      "Evidence pack and audit-readiness report",
      "Risk register and treatment plan",
      "Remediation roadmap with owners",
    ],
    faqs: [
      {
        q: "Do you issue the SOC 2 report or ISO certificate?",
        a: "No — and no one who prepares you should. The attestation must come from an independent licensed auditor / certification body. We get you ready and stand with you through the assessment.",
      },
      {
        q: "SOC 2 or ISO 27001 — which do we need?",
        a: "It depends on who's asking and where. SOC 2 is what North American customers usually request; ISO 27001 is the international standard procurement teams recognise. We'll help you scope the right one, and the control work overlaps heavily either way.",
      },
      {
        q: "How early should we start before the audit date?",
        a: "As early as possible, but realistically a first-time SOC 2 or ISO 27001 needs a few months to implement controls and, for SOC 2 Type II, to accumulate the observation period. Starting three weeks out is where readiness projects go wrong.",
      },
      {
        q: "Can you reuse the work across frameworks?",
        a: "Yes. We map controls to NIST CSF 2.0 once, so ISO 27001, SOC 2, and CIS evidence draw from the same register instead of being rebuilt per audit.",
      },
    ],
    seo: {
      title: "Compliance & Audit readiness — SOC 2 & ISO 27001",
      description:
        "SOC 2 and ISO/IEC 27001 readiness: a control-by-control gap assessment, the policies and evidence auditors ask for, and a realistic path to audit-ready.",
    },
  },

  "data-security": {
    situation:
      "You can't protect data you can't see. Sensitive records — PII, financials, source code, customer contracts — are scattered across SharePoint, OneDrive, Teams, and a dozen SaaS apps, and no one can say with confidence where the crown jewels live or who can reach them. Cairn stands up Microsoft Purview to find and classify sensitive data, label it, and stop it from leaving through the channels that actually leak — so data protection becomes a control you can evidence, not a hope.",
    workstreams: [
      {
        title: "Data discovery & classification",
        deliverable: "Sensitive data map with classification scheme",
        detail:
          "Purview sensitive information types and trainable classifiers scan your estate to surface where regulated and confidential data actually lives.",
      },
      {
        title: "Sensitivity labels & protection",
        deliverable: "Label taxonomy and auto-labelling policy",
        detail:
          "A label scheme your users can actually apply, with encryption and access controls that travel with the file, plus auto-labelling for the data they forget to tag.",
      },
      {
        title: "Data loss prevention",
        deliverable: "DLP policy set with tuned enforcement",
        detail:
          "Policies across email, endpoints, and cloud apps that block the exfiltration paths that matter, tuned so they stop leaks without stopping work.",
      },
      {
        title: "Insider risk & lifecycle",
        deliverable: "Insider-risk and retention baseline",
        detail:
          "Insider-risk indicators and data-lifecycle rules so data is kept only as long as it should be, and risky movement is flagged early.",
      },
    ],
    tiers: [
      {
        name: "Assessment",
        duration: "2–4 weeks",
        summary: "We map where your sensitive data lives and how it can leave.",
        includes: [
          "Purview data discovery and classification",
          "Sensitive-data map and exposure review",
          "DLP and labelling gap analysis",
          "Prioritised data-protection roadmap",
        ],
        excludes: ["Policy rollout", "End-user change management", "Ongoing tuning"],
        price: "",
      },
      {
        name: "Implementation",
        duration: "4–10 weeks",
        summary: "We roll out labels, DLP, and insider-risk with your team.",
        includes: [
          "Everything in Assessment",
          "Label taxonomy and auto-labelling",
          "DLP policy deployment and tuning",
          "Insider-risk and retention configuration",
        ],
        excludes: ["Microsoft licensing", "24/7 monitoring"],
        price: "",
      },
      {
        name: "Managed",
        duration: "Ongoing",
        summary: "We tune policies and watch for data risk as your estate changes.",
        includes: [
          "Continuous DLP and classifier tuning",
          "Insider-risk alert triage",
          "Quarterly data-posture report",
        ],
        excludes: ["Records-management program ownership"],
        price: "",
      },
    ],
    deliverables: [
      "Sensitive data map",
      "Label taxonomy and auto-labelling policy",
      "DLP policy set",
      "Insider-risk and retention baseline",
      "Data-protection roadmap",
    ],
    faqs: [
      {
        q: "Do we need the top Microsoft licence for this?",
        a: "The advanced Purview capabilities (auto-labelling, insider risk) need Microsoft 365 E5 or the compliance add-on. We'll tell you exactly what your goals require before you buy anything, and what's achievable on your current licensing.",
      },
      {
        q: "Won't DLP just annoy everyone and get turned off?",
        a: "That's the usual failure mode. We start in audit mode, tune against real data flows, and only then enforce — so policies block genuine exfiltration without breaking day-to-day work.",
      },
      {
        q: "Can this cover data outside Microsoft 365?",
        a: "Yes — Purview extends to endpoints, on-prem file shares, and, via connectors, major SaaS and cloud data stores. We scope the estate up front so nothing important is out of view.",
      },
      {
        q: "How does this help our audit?",
        a: "Classification, DLP, and retention map directly to ISO/IEC 27001 A.5.12/A.5.13/A.8.12 and NIST CSF PR.DS — so the same work produces the evidence an auditor asks for.",
      },
    ],
    seo: {
      title: "Data Security & Governance with Microsoft Purview",
      description:
        "Find, classify, label, and protect sensitive data with Microsoft Purview — data discovery, sensitivity labels, DLP, and insider risk mapped to ISO 27001 and NIST CSF.",
    },
  },

  "cloud-foundations": {
    situation:
      "You're scaling in Azure on foundations that grew by accident — subscriptions spun up ad hoc, inconsistent networking, no guardrails, and security bolted on after each workload ships. Every new project inherits the drift. Cairn builds a secure-by-default Azure landing zone to the Microsoft Well-Architected and Cloud Adoption Framework, so governance, identity, network topology, and policy-as-code are in place before the next workload lands — and staying secure becomes the path of least resistance.",
    workstreams: [
      {
        title: "Landing zone architecture",
        deliverable: "Target landing-zone design",
        detail:
          "Management-group hierarchy, subscription topology, and a hub-and-spoke network designed for how you actually operate, aligned to the Cloud Adoption Framework.",
      },
      {
        title: "Governance & policy-as-code",
        deliverable: "Azure Policy and guardrail baseline",
        detail:
          "Guardrails as code — Azure Policy, RBAC, and naming/tagging standards — so misconfiguration is prevented by default, not caught after the fact.",
      },
      {
        title: "Identity & network foundation",
        deliverable: "Identity and connectivity baseline",
        detail:
          "Entra ID integration, privileged access, private connectivity, and segmentation wired into the foundation rather than retrofitted per workload.",
      },
      {
        title: "Deployment & handover",
        deliverable: "Infrastructure-as-code templates and runbooks",
        detail:
          "The landing zone delivered as Bicep/Terraform your team owns, with runbooks so new subscriptions and workloads land inside the guardrails automatically.",
      },
    ],
    tiers: [
      {
        name: "Assessment",
        duration: "2–3 weeks",
        summary: "We review your current cloud setup and design the target landing zone.",
        includes: [
          "Current-state review against the Well-Architected Framework",
          "Target landing-zone design",
          "Governance and guardrail plan",
          "Migration and adoption roadmap",
        ],
        excludes: ["Build", "Workload migration", "Ongoing operations"],
        price: "",
      },
      {
        name: "Implementation",
        duration: "4–10 weeks",
        summary: "We build the landing zone as infrastructure-as-code with your team.",
        includes: [
          "Everything in Assessment",
          "Landing-zone build (Bicep / Terraform)",
          "Azure Policy and RBAC guardrails",
          "Identity, network, and logging foundation",
        ],
        excludes: ["Application re-platforming", "24/7 monitoring"],
        price: "",
      },
      {
        name: "Managed",
        duration: "Ongoing",
        summary: "We govern the platform and review new workloads before they ship.",
        includes: [
          "Guardrail and policy maintenance",
          "New-workload design review",
          "Quarterly Well-Architected review",
        ],
        excludes: ["Application development", "Cloud cost management"],
        price: "",
      },
    ],
    deliverables: [
      "Target landing-zone design",
      "Azure Policy and guardrail baseline",
      "Identity and connectivity baseline",
      "Infrastructure-as-code templates and runbooks",
      "Cloud adoption roadmap",
    ],
    faqs: [
      {
        q: "We already have workloads in Azure. Do we start over?",
        a: "No. We design the landing zone around what you run, then migrate existing subscriptions into the governance model in stages — no big-bang rebuild.",
      },
      {
        q: "Azure only, or AWS too?",
        a: "This service is Azure-focused (landing zones, Well-Architected). For AWS foundations or multi-cloud posture, our Cloud Security service covers both — we'll scope the right mix.",
      },
      {
        q: "Do you leave us dependent on you to run it?",
        a: "Never. The landing zone ships as infrastructure-as-code your team owns, with runbooks. We hand over the keys — operating it is yours.",
      },
      {
        q: "How is this different from just turning on Defender for Cloud?",
        a: "Defender for Cloud tells you what's wrong. A landing zone stops it being wrong in the first place — the guardrails, topology, and identity model that new workloads inherit by default.",
      },
    ],
    seo: {
      title: "Azure Landing Zones & Cloud Foundations",
      description:
        "A secure-by-default Azure landing zone built to the Well-Architected and Cloud Adoption Frameworks: governance, policy-as-code, identity, and network topology as infrastructure-as-code.",
    },
  },

  "network-security": {
    situation:
      "Your network is flat. Once an attacker lands a single foothold — a phished laptop, an exposed service — nothing stops them moving laterally to the domain controller and the data. Cairn designs and delivers segmentation, traffic filtering, and a secure network architecture that turns a breach into a contained incident instead of a company-wide one.",
    workstreams: [
      {
        title: "Architecture & segmentation review",
        deliverable: "Network segmentation plan",
        detail:
          "Map trust boundaries across on-prem and cloud, find the flat spots and the paths to critical assets, and design segments that contain a compromise.",
      },
      {
        title: "Traffic filtering & control",
        deliverable: "Filtering and firewall rule baseline",
        detail:
          "Least-privilege traffic rules between segments, egress control, and the removal of the any-any rules that make lateral movement trivial.",
      },
      {
        title: "Secure network services",
        deliverable: "Hardened network-services configuration",
        detail:
          "DNS, VPN, and remote-access hardened and monitored, with the legacy protocols and exposed management planes retired.",
      },
      {
        title: "Verification",
        deliverable: "Lateral-movement test and closure report",
        detail:
          "We test whether the segmentation actually holds — attempting the lateral paths that mattered — and close what doesn't.",
      },
    ],
    tiers: [
      {
        name: "Assessment",
        duration: "2–3 weeks",
        summary: "We map the network, find the flat spots, and design segmentation.",
        includes: [
          "Segmentation and trust-boundary review",
          "Lateral-movement path analysis",
          "Target network architecture",
          "Prioritised remediation roadmap",
        ],
        excludes: ["Firewall changes", "Implementation", "Ongoing monitoring"],
        price: "",
      },
      {
        name: "Implementation",
        duration: "4–10 weeks",
        summary: "We implement segmentation and filtering with your network team.",
        includes: [
          "Everything in Assessment",
          "Segmentation and filtering rollout",
          "Secure network-services hardening",
          "Lateral-movement verification test",
        ],
        excludes: ["Hardware procurement", "24/7 monitoring"],
        price: "",
      },
      {
        name: "Managed",
        duration: "Ongoing",
        summary: "We review rules and architecture as the network changes.",
        includes: [
          "Rule-base review and hygiene",
          "New-segment design review",
          "Quarterly architecture review",
        ],
        excludes: ["Day-to-day network operations"],
        price: "",
      },
    ],
    deliverables: [
      "Network segmentation plan",
      "Filtering and firewall rule baseline",
      "Hardened network-services configuration",
      "Lateral-movement test and closure report",
      "Remediation roadmap",
    ],
    faqs: [
      {
        q: "Do we have to re-architect the whole network at once?",
        a: "No. We sequence segmentation so the highest-value assets — domain controllers, data stores, OT — are ring-fenced first, then extend it in phases without a disruptive rebuild.",
      },
      {
        q: "On-prem, cloud, or both?",
        a: "Both, and the seams between them — the site-to-site links and hybrid paths where segmentation usually breaks down are exactly where we focus.",
      },
      {
        q: "How does this relate to zero trust?",
        a: "Segmentation is one pillar of zero trust. If you want the full programme across identity, device, and data as well, our Zero Trust Architecture service sequences all of it.",
      },
      {
        q: "Will you prove the segmentation works?",
        a: "Yes — we attempt the lateral-movement paths that mattered before and after, so you get evidence the containment holds, not just a diagram.",
      },
    ],
    seo: {
      title: "Network Security & Segmentation",
      description:
        "Segmentation, traffic filtering, and a secure network architecture that contains a breach — with lateral-movement testing to prove it holds. Aligned to ISO 27001 and CIS Controls v8.",
    },
  },

  "endpoint-security": {
    situation:
      "Every laptop and phone that touches your data is a way in — and half of them you can't see. Unmanaged devices, inconsistent patching, and endpoint protection that's installed but not tuned mean the endpoint is the softest part of your attack surface. Cairn uses Microsoft Intune and Defender for Endpoint to bring every device under management, harden it to a baseline, and make device health a condition of reaching your data.",
    workstreams: [
      {
        title: "Device inventory & management",
        deliverable: "Managed-device inventory and enrolment plan",
        detail:
          "Bring every corporate and BYO device under Intune management, so there are no unknown endpoints holding company data.",
      },
      {
        title: "Hardening baselines",
        deliverable: "Endpoint hardening and compliance baseline",
        detail:
          "Security baselines for Windows, macOS, and mobile — disk encryption, patching, and configuration enforced by policy, not by hope.",
      },
      {
        title: "Malware & threat defence",
        deliverable: "Defender for Endpoint deployment and tuning",
        detail:
          "EDR deployed, tuned, and integrated so real endpoint threats are detected and contained, and the noise is turned down.",
      },
      {
        title: "Compliance-gated access",
        deliverable: "Device-compliance access policy",
        detail:
          "Conditional Access that only lets healthy, compliant devices reach your data — the device becomes part of the trust decision.",
      },
    ],
    tiers: [
      {
        name: "Assessment",
        duration: "2–3 weeks",
        summary: "We inventory devices and review your endpoint posture.",
        includes: [
          "Device inventory and management-gap review",
          "Endpoint hardening and EDR review",
          "Compliance and Conditional Access gap analysis",
          "Prioritised endpoint roadmap",
        ],
        excludes: ["Rollout", "End-user migration", "Ongoing management"],
        price: "",
      },
      {
        name: "Implementation",
        duration: "4–8 weeks",
        summary: "We enrol devices, deploy baselines, and gate access on compliance.",
        includes: [
          "Everything in Assessment",
          "Intune enrolment and hardening baselines",
          "Defender for Endpoint deployment and tuning",
          "Device-compliance Conditional Access",
        ],
        excludes: ["Microsoft licensing", "24/7 monitoring"],
        price: "",
      },
      {
        name: "Managed",
        duration: "Ongoing",
        summary: "We keep baselines current and triage endpoint threats.",
        includes: [
          "Baseline and patch-compliance monitoring",
          "Endpoint threat triage",
          "Quarterly endpoint-posture report",
        ],
        excludes: ["Help-desk / device provisioning operations"],
        price: "",
      },
    ],
    deliverables: [
      "Managed-device inventory and enrolment plan",
      "Endpoint hardening and compliance baseline",
      "Defender for Endpoint deployment and tuning",
      "Device-compliance access policy",
      "Endpoint roadmap",
    ],
    faqs: [
      {
        q: "Can we support BYOD without managing personal phones fully?",
        a: "Yes — Intune app protection policies protect company data on personal devices without taking over the whole phone, so you get control where it matters and users keep their privacy.",
      },
      {
        q: "We already have antivirus. Why Defender for Endpoint?",
        a: "Traditional AV blocks known malware; Defender for Endpoint is EDR — it detects the behaviour of an active intrusion and lets you contain it. We'll assess whether your current tool is enough before recommending a change.",
      },
      {
        q: "How does this connect to zero trust?",
        a: "Device health is one of the trust signals in a zero-trust model. Compliance-gated access — only healthy devices reach data — is exactly the endpoint pillar of that architecture.",
      },
      {
        q: "What frameworks does this map to?",
        a: "ISO/IEC 27001 A.8.1 and A.8.7, NIST CSF PR.PS-05, and CIS Control 10 — so the work lines up with your audit and the rest of your register.",
      },
    ],
    seo: {
      title: "Endpoint & Device Security with Intune & Defender",
      description:
        "Bring every device under management with Microsoft Intune and Defender for Endpoint: hardening baselines, EDR, and compliance-gated access mapped to ISO 27001 and CIS Controls v8.",
    },
  },

  "application-security": {
    situation:
      "You ship weekly, and security can't be a gate bolted on at the end — by then the design decisions are made and the fix is expensive. Cairn builds security into your software development lifecycle: security requirements up front, secure-coding standards, automated SAST/DAST and API testing in the pipeline, and a way to prioritise what actually matters — so your teams keep their velocity and stop shipping the same classes of bug.",
    workstreams: [
      {
        title: "SDLC & threat modelling",
        deliverable: "Secure-SDLC assessment and threat models",
        detail:
          "Review how software is built and shipped, and threat-model the applications that matter so security requirements are set before code is written.",
      },
      {
        title: "Pipeline security testing",
        deliverable: "SAST / DAST / dependency scanning in CI",
        detail:
          "Static, dynamic, and dependency scanning wired into the pipeline with sensible gates — findings triaged by exploitability, not a wall of scanner noise.",
      },
      {
        title: "API & secure-coding standards",
        deliverable: "Secure-coding and API-security standards",
        detail:
          "Coding standards and API-security testing mapped to the OWASP Top 10 and OWASP API Top 10, with the recurring bug classes named and closed.",
      },
      {
        title: "Developer enablement",
        deliverable: "Security champions and remediation playbooks",
        detail:
          "Lightweight training and a security-champions model so your engineers can find and fix issues themselves — security scales with the team, not against it.",
      },
    ],
    tiers: [
      {
        name: "Assessment",
        duration: "2–4 weeks",
        summary: "We assess your SDLC and hand you a prioritised AppSec roadmap.",
        includes: [
          "Secure-SDLC maturity assessment",
          "Threat models for priority applications",
          "Pipeline and tooling gap analysis",
          "Prioritised application-security roadmap",
        ],
        excludes: ["Pipeline engineering", "Ongoing testing"],
        price: "",
      },
      {
        name: "Implementation",
        duration: "4–10 weeks",
        summary: "We wire security testing into the pipeline and set the standards.",
        includes: [
          "Everything in Assessment",
          "SAST / DAST / dependency scanning in CI",
          "Secure-coding and API-security standards",
          "Security-champions enablement",
        ],
        excludes: ["Feature development", "24/7 monitoring"],
        price: "",
      },
      {
        name: "Managed",
        duration: "Ongoing",
        summary: "We keep testing tuned and re-threat-model as the product evolves.",
        includes: [
          "Pipeline-finding triage and tuning",
          "Per-release threat-model updates",
          "Quarterly AppSec posture report",
        ],
        excludes: ["Application development"],
        price: "",
      },
    ],
    deliverables: [
      "Secure-SDLC assessment and threat models",
      "SAST / DAST / dependency scanning in CI",
      "Secure-coding and API-security standards",
      "Security champions and remediation playbooks",
      "Application-security roadmap",
    ],
    faqs: [
      {
        q: "Will security testing slow our releases down?",
        a: "Done wrong, yes. We tune gates so only genuinely serious issues block a release, and everything else becomes a tracked, prioritised backlog item — velocity stays, risk comes down.",
      },
      {
        q: "We use a lot of open-source. Is that covered?",
        a: "Yes — dependency and software-composition scanning is part of the pipeline, so vulnerable and unmaintained components are flagged before they ship, not after a CVE lands.",
      },
      {
        q: "Do you test APIs specifically?",
        a: "Yes. APIs are where a lot of modern risk lives, so API security is a first-class part of the work, mapped to the OWASP API Security Top 10.",
      },
      {
        q: "Can you work with our existing tools?",
        a: "We're tool-agnostic — we'll make your current SAST/DAST/SCA stack work harder before recommending anything new, and integrate with the pipeline you already run.",
      },
    ],
    seo: {
      title: "Application Security & Secure SDLC",
      description:
        "Security built into the SDLC: threat modelling, SAST/DAST and dependency scanning in CI, secure-coding and API-security standards mapped to OWASP, ISO 27001, and NIST CSF.",
    },
  },

  "ai-implementation": {
    situation:
      "You want Copilot and AI in the business — but the last thing you need is a fast rollout that over-shares SharePoint to every user or ships an agent with keys to production. Cairn deploys Microsoft 365 Copilot and custom LLM solutions with the data boundaries, guardrails, and adoption plan in place first, so you get the productivity without opening a new front door.",
    workstreams: [
      {
        title: "AI readiness & data-boundary review",
        deliverable: "AI readiness assessment & data-access baseline",
        detail:
          "Before Copilot indexes anything, we fix oversharing: label sensitive sites, tighten permissions, and set the boundaries the model must respect.",
      },
      {
        title: "Use-case scoping & solution design",
        deliverable: "Prioritised use-case backlog with guardrail design",
        detail:
          "Pick the use cases with real value and low blast radius first, and design the prompts, tools, and human-in-the-loop gates for each.",
      },
      {
        title: "Deployment & integration",
        deliverable: "Deployed Copilot / LLM solution with guardrails",
        detail:
          "Roll out Copilot or a custom assistant with input/output filtering, scoped tool permissions, and logging wired in from day one.",
      },
      {
        title: "Adoption & measurement",
        deliverable: "Adoption plan and usage/value dashboard",
        detail:
          "Training, champions, and a dashboard that tracks adoption and value so the investment doesn't stall after launch.",
      },
    ],
    tiers: [
      {
        name: "Assessment",
        duration: "2–3 weeks",
        summary: "We assess readiness and design a safe rollout you can approve.",
        includes: ["AI readiness assessment", "Data-oversharing review", "Use-case backlog", "Rollout & guardrail design"],
        excludes: ["Deployment", "Custom development", "Ongoing management"],
        price: "",
      },
      {
        name: "Implementation",
        duration: "4–10 weeks",
        summary: "We deploy Copilot or a custom assistant with guardrails and train your people.",
        includes: ["Everything in Assessment", "Copilot / LLM deployment", "Guardrail & tool-permission setup", "Adoption enablement"],
        excludes: ["24/7 monitoring", "Model hosting at scale"],
        price: "",
      },
      {
        name: "Managed",
        duration: "Ongoing",
        summary: "We keep the AI estate safe, adopted, and improving.",
        includes: ["Usage & value reporting", "Guardrail tuning", "New use-case onboarding", "Quarterly reviews"],
        excludes: ["Application feature development"],
        price: "",
      },
    ],
    deliverables: [
      "AI readiness assessment",
      "Data-access & oversharing baseline",
      "Prioritised use-case backlog",
      "Deployed Copilot / LLM solution with guardrails",
      "Adoption plan and value dashboard",
    ],
    faqs: [
      { q: "Isn't Copilot just a switch we turn on?", a: "The switch is easy; the risk is that Copilot inherits every permission your users already have, including the oversharing you never cleaned up. We fix the data boundaries first so it only surfaces what each person should already see." },
      { q: "Can you build a custom assistant, not just Microsoft Copilot?", a: "Yes — custom RAG assistants and agents on Azure OpenAI or your model of choice, with the same guardrails, scoped tools, and logging we apply to Copilot." },
      { q: "How does this relate to AI & LLM Security?", a: "This service builds it safely; AI & LLM Security tests it adversarially. Many clients pair them — implement with guardrails, then verify with an assessment before going wide." },
      { q: "Will you help our people actually use it?", a: "Adoption is part of the work: role-based training, champions, and a value dashboard, because an AI tool no one trusts is wasted spend." },
    ],
    seo: {
      title: "AI Implementation & Copilot Enablement",
      description:
        "Deploy Microsoft 365 Copilot and custom LLM solutions safely: data-boundary cleanup, guardrails, scoped tools, and an adoption plan — value without new exposure.",
    },
  },

  "data-privacy": {
    situation:
      "Between GDPR, CCPA, and whatever your next contract demands, \"are we compliant with privacy law\" has become a question you can't answer with confidence — and can't prove. Cairn maps where personal data actually lives, runs the assessments regulators expect, and stands up a privacy program that produces the records-of-processing and DPIAs an auditor or a regulator asks for.",
    workstreams: [
      {
        title: "Data mapping & records of processing",
        deliverable: "Data inventory and Record of Processing Activities (RoPA)",
        detail:
          "Find personal data across systems and SaaS, map the flows, and document processing activities the way GDPR Article 30 expects.",
      },
      {
        title: "Privacy impact assessments",
        deliverable: "DPIA templates and completed assessments for high-risk processing",
        detail:
          "Assess the processing that carries real risk — profiling, large-scale, or special-category data — and record the mitigations.",
      },
      {
        title: "Rights & consent operations",
        deliverable: "DSAR / consent runbooks",
        detail:
          "Make data-subject requests and consent handling a repeatable process with defined SLAs, not a fire drill each time.",
      },
      {
        title: "Privacy program & policy",
        deliverable: "Privacy policy framework and control mapping",
        detail:
          "Policies, roles, and controls mapped to ISO/IEC 27701 and NIST, so privacy sits inside your wider security programme.",
      },
    ],
    tiers: [
      {
        name: "Assessment",
        duration: "3–5 weeks",
        summary: "We map your data and assess your privacy posture against the laws you're held to.",
        includes: ["Data inventory & mapping", "Gap assessment vs GDPR/CCPA", "RoPA baseline", "Prioritised remediation roadmap"],
        excludes: ["Implementation", "Legal advice", "Ongoing DPO service"],
        price: "",
      },
      {
        name: "Implementation",
        duration: "6–12 weeks",
        summary: "We stand up the program: DPIAs, DSAR runbooks, policies, and controls.",
        includes: ["Everything in Assessment", "DPIA process & templates", "DSAR / consent runbooks", "Policy framework rollout"],
        excludes: ["Acting as your legal counsel"],
        price: "",
      },
      {
        name: "Managed",
        duration: "Ongoing",
        summary: "We run privacy operations and keep you current as laws change.",
        includes: ["DSAR handling support", "Periodic DPIA reviews", "Regulatory-change monitoring", "Quarterly reporting"],
        excludes: ["Regulatory legal representation"],
        price: "",
      },
    ],
    deliverables: [
      "Personal-data inventory & flow map",
      "Record of Processing Activities (RoPA)",
      "DPIA templates and completed assessments",
      "DSAR / consent runbooks",
      "Privacy policy framework & control mapping",
    ],
    faqs: [
      { q: "Are you our lawyers?", a: "No — we're the security and operations side of privacy. We build the data maps, assessments, controls, and evidence; we work alongside your legal counsel on interpretation, not instead of them." },
      { q: "We only care about GDPR (or only CCPA). Can you scope to that?", a: "Yes. We scope to the regimes that apply to you and design the program so adding another later is incremental, not a restart." },
      { q: "How does this connect to Data Security & Governance?", a: "Closely — Purview classification and DLP are how we operationalise the data map and enforce the boundaries privacy requires. The two services are frequently delivered together." },
      { q: "Can you help before a specific audit or deal?", a: "Yes; we routinely run a focused readiness pass to get the RoPA, DPIAs, and evidence in place before a customer security review or regulator deadline." },
    ],
    seo: {
      title: "Data Privacy — GDPR & CCPA readiness",
      description:
        "Data mapping, RoPA, DPIAs, and DSAR runbooks for GDPR, CCPA and beyond — a privacy program with the records regulators ask for, mapped to ISO 27701 and NIST.",
    },
  },

  "cloud-implementation": {
    situation:
      "You've decided to move to the cloud — or you're already there and it grew faster than anyone planned. The worry is doing it without blowing the budget or leaving security to \"phase two\" that never comes. Cairn migrates and modernises workloads to Azure and AWS on a secure-by-default foundation, with cost guardrails and posture controls in place from the first subscription.",
    workstreams: [
      {
        title: "Assessment & migration planning",
        deliverable: "Cloud migration assessment and wave plan",
        detail:
          "Inventory workloads, pick the right disposition (rehost, replatform, refactor), and sequence a migration plan with security and cost baked in.",
      },
      {
        title: "Secure landing zone",
        deliverable: "Landing zone with policy-as-code guardrails",
        detail:
          "A secure-by-default foundation — identity, network topology, policy, and logging — so every workload lands inside guardrails, not outside them.",
      },
      {
        title: "Migration & modernization",
        deliverable: "Migrated workloads with hardening baselines",
        detail:
          "Move and modernise workloads with hardening applied as they land, and validation that each one meets the baseline before cutover.",
      },
      {
        title: "Cost & posture management",
        deliverable: "FinOps and posture guardrails",
        detail:
          "Budgets, tagging, and posture policies so cloud spend and cloud risk are both visible and controlled from day one.",
      },
    ],
    tiers: [
      {
        name: "Assessment",
        duration: "2–4 weeks",
        summary: "We assess your estate and design a secure, costed migration plan.",
        includes: ["Workload assessment", "Migration wave plan", "Landing-zone & cost design", "Risk & dependency map"],
        excludes: ["The migration itself", "Application refactoring"],
        price: "",
      },
      {
        name: "Implementation",
        duration: "6–16 weeks",
        summary: "We build the landing zone and migrate the workloads, secure by default.",
        includes: ["Everything in Assessment", "Secure landing zone build", "Workload migration & hardening", "FinOps guardrails"],
        excludes: ["24/7 operations", "Bespoke app development"],
        price: "",
      },
      {
        name: "Managed",
        duration: "Ongoing",
        summary: "We run posture and cost management on the estate we built.",
        includes: ["Continuous posture management", "Cost optimization", "Guardrail updates", "Monthly reporting"],
        excludes: ["Application support"],
        price: "",
      },
    ],
    deliverables: [
      "Cloud migration assessment & wave plan",
      "Secure landing zone (policy-as-code)",
      "Migrated workloads with hardening baselines",
      "FinOps & tagging baseline",
      "Posture & cost dashboard",
    ],
    faqs: [
      { q: "How is this different from Cloud Foundations & Landing Zones?", a: "Foundations builds the platform; Cloud Implementation moves your actual workloads onto it and modernises them. On a greenfield engagement they're one project; on brownfield we assess what exists first." },
      { q: "Can you keep our spend under control?", a: "Cost is a first-class workstream: budgets, tagging, and right-sizing are designed in, and the Managed tier keeps optimising rather than letting spend drift." },
      { q: "Azure, AWS, or both?", a: "Both. We're strongest in Azure (and the Microsoft security stack), and we deliver AWS migrations and multi-cloud governance where that's where you're headed." },
      { q: "Will security really be built in, not bolted on?", a: "That's the point of landing-zone-first: identity, network segmentation, policy, and logging exist before a single workload lands, so hardening isn't a phase-two you never fund." },
    ],
    seo: {
      title: "Cloud Implementation & Migration (Azure, AWS)",
      description:
        "Migrate and modernise to Azure and AWS on a secure-by-default landing zone, with hardening, FinOps cost guardrails, and posture management from day one.",
    },
  },

  "ot-iot-security": {
    situation:
      "Your plant floor, building systems, or device fleet were engineered for uptime, not for being on a routable network — and now they are. Cairn gives you visibility into what's actually connected, segments OT and IoT away from the paths an attacker would use, and monitors it without touching the availability your operations depend on.",
    workstreams: [
      {
        title: "Asset discovery & visibility",
        deliverable: "OT/IoT asset inventory and network map",
        detail:
          "Passive discovery of every device, protocol, and flow — because you can't protect the controllers and sensors you can't see.",
      },
      {
        title: "Segmentation & architecture",
        deliverable: "OT segmentation design (Purdue-aligned)",
        detail:
          "Zone-and-conduit segmentation that isolates OT from IT and from the internet, contained so a breach can't cross into production.",
      },
      {
        title: "Risk assessment",
        deliverable: "OT/IoT risk assessment with prioritised findings",
        detail:
          "Assess exposure against IEC 62443 and NIST guidance, ranked by what an attacker could actually reach and disrupt.",
      },
      {
        title: "Monitoring & detection",
        deliverable: "OT-aware monitoring and detections",
        detail:
          "Detection tuned for OT protocols and behaviours, feeding your SOC without probing devices that don't tolerate it.",
      },
    ],
    tiers: [
      {
        name: "Assessment",
        duration: "3–5 weeks",
        summary: "We discover your OT/IoT estate and assess its exposure.",
        includes: ["Passive asset discovery", "Network & flow mapping", "Risk assessment (IEC 62443-aligned)", "Segmentation design"],
        excludes: ["Network changes", "Device firmware work"],
        price: "",
      },
      {
        name: "Implementation",
        duration: "6–14 weeks",
        summary: "We segment the estate and stand up OT-aware monitoring.",
        includes: ["Everything in Assessment", "Segmentation rollout", "OT monitoring deployment", "Detection tuning"],
        excludes: ["Control-system engineering", "Production downtime windows we don't agree first"],
        price: "",
      },
      {
        name: "Managed",
        duration: "Ongoing",
        summary: "We monitor OT/IoT and keep the segmentation honest.",
        includes: ["OT/IoT monitoring", "New-asset onboarding", "Detection maintenance", "Periodic risk reviews"],
        excludes: ["Physical maintenance of devices"],
        price: "",
      },
    ],
    deliverables: [
      "OT/IoT asset inventory & network map",
      "OT segmentation design (Purdue-aligned)",
      "OT/IoT risk assessment",
      "OT-aware detections",
      "Monitoring dashboard",
    ],
    faqs: [
      { q: "Will scanning break our production systems?", a: "We lead with passive discovery precisely because many OT devices don't tolerate active scanning. Anything active is agreed and scheduled with your operations team first." },
      { q: "Which standards do you work to?", a: "IEC 62443 for OT/ICS, plus the NIST CSF and CIS controls that map across, so OT risk sits in the same register as the rest of your programme." },
      { q: "We're not manufacturing — is this relevant?", a: "Yes: building management systems, medical devices, retail IoT, and physical security all raise the same 'never-designed-to-be-networked' problem this service addresses." },
      { q: "Can our existing SOC watch OT?", a: "That's the goal — we deploy OT-aware detection that feeds your existing SOC or our Managed SOC, so you don't run a second, disconnected operation." },
    ],
    seo: {
      title: "OT / ICS & IoT Security",
      description:
        "Visibility, Purdue-aligned segmentation, IEC 62443 risk assessment, and OT-aware monitoring for operational technology and IoT — without disrupting production.",
    },
  },

  "iam-onboarding": {
    situation:
      "Every new hire is a ticket, every leaver is a risk, and access has sprawled to the point where no one can say who can reach what. Cairn maps every identity and entitlement, then automates the joiner-mover-leaver lifecycle and access reviews in Entra ID so onboarding is fast, offboarding is instant, and least privilege is the default.",
    workstreams: [
      {
        title: "Identity & entitlement mapping",
        deliverable: "Identity and access map",
        detail:
          "A complete picture of accounts, groups, roles, and entitlements — including the service accounts and standing access no one remembers granting.",
      },
      {
        title: "Joiner-mover-leaver automation",
        deliverable: "Automated JML lifecycle workflows",
        detail:
          "Role-based access at onboarding, adjustments on role change, and immediate revocation on exit — driven from HR, not from tickets.",
      },
      {
        title: "Access reviews & certification",
        deliverable: "Access review campaigns and certification cadence",
        detail:
          "Recurring, owner-driven access reviews so entitlements are re-justified regularly and drift is caught, using Entra ID governance.",
      },
      {
        title: "Least-privilege & role design",
        deliverable: "Role model and least-privilege baseline",
        detail:
          "A workable role model that grants what a job needs and no more, with just-in-time elevation for privileged access.",
      },
    ],
    tiers: [
      {
        name: "Assessment",
        duration: "2–4 weeks",
        summary: "We map identities and entitlements and design the target lifecycle.",
        includes: ["Identity & entitlement inventory", "Access-risk findings", "Role-model design", "JML & review design"],
        excludes: ["Automation build", "Ongoing operation"],
        price: "",
      },
      {
        name: "Implementation",
        duration: "5–12 weeks",
        summary: "We build the JML automation, access reviews, and role model in Entra ID.",
        includes: ["Everything in Assessment", "JML workflow automation", "Access review campaigns", "Least-privilege rollout"],
        excludes: ["24/7 operation", "Custom HR-system development"],
        price: "",
      },
      {
        name: "Managed",
        duration: "Ongoing",
        summary: "We run the identity lifecycle and reviews for you.",
        includes: ["JML operation", "Access review facilitation", "Entitlement clean-up", "Quarterly reporting"],
        excludes: ["Help-desk password resets"],
        price: "",
      },
    ],
    deliverables: [
      "Identity & entitlement map",
      "Automated JML lifecycle workflows",
      "Access review / certification cadence",
      "Role model & least-privilege baseline",
      "Access-risk report",
    ],
    faqs: [
      { q: "How does this differ from Identity & Access Management?", a: "IAM is the broader assessment and privileged-access strategy; IAM Onboarding & Mapping focuses on the lifecycle — joiner-mover-leaver, entitlement mapping, and access reviews — and automating it in Entra ID." },
      { q: "We use a specific HR system. Will it integrate?", a: "Yes — we drive the lifecycle from your HR source of truth (Workday, SuccessFactors, etc.) so access follows the employment record automatically." },
      { q: "Can you clean up the access sprawl we already have?", a: "That's the first pass: the entitlement map surfaces the standing and orphaned access, and the initial certification campaign removes what can't be re-justified." },
      { q: "Do access reviews have to be painful?", a: "Not when they're owner-driven and scoped. We configure Entra ID access reviews so the right person certifies the right access on a sensible cadence, with escalation for what's ignored." },
    ],
    seo: {
      title: "IAM Onboarding & Access Mapping (Entra ID)",
      description:
        "Map every identity and entitlement, then automate joiner-mover-leaver, access reviews, and least privilege in Entra ID — fast onboarding, instant offboarding, no sprawl.",
    },
  },

  "vulnerability-management": {
    situation:
      "Your scanner found 50,000 vulnerabilities and your team can fix maybe 200 a month. Counting them isn't the problem — knowing which ones actually expose you, and getting them fixed before they're used, is. Cairn runs risk-based vulnerability management: continuous discovery, prioritisation by real exploitability, and remediation SLAs that hold.",
    workstreams: [
      {
        title: "Discovery & continuous scanning",
        deliverable: "Asset-aware vulnerability baseline",
        detail:
          "Authenticated scanning across cloud, endpoint, and network, tied to an asset inventory so nothing important is invisible.",
      },
      {
        title: "Risk-based prioritisation",
        deliverable: "Prioritised remediation queue",
        detail:
          "Rank by exploitability (KEV, EPSS), exposure, and asset value — so the queue reflects real risk, not raw CVSS.",
      },
      {
        title: "Remediation orchestration & SLAs",
        deliverable: "Remediation workflow with SLAs by severity",
        detail:
          "Route fixes to the right owners with agreed SLAs, and track them to closure instead of to a dashboard nobody reads.",
      },
      {
        title: "Verification & metrics",
        deliverable: "Verification retests and program metrics",
        detail:
          "Confirm fixes hold and report the metrics that matter — mean time to remediate, SLA attainment, and trend.",
      },
    ],
    tiers: [
      {
        name: "Assessment",
        duration: "2–3 weeks",
        summary: "We baseline your vulnerabilities and build a risk-based priority queue.",
        includes: ["Authenticated scan & asset mapping", "Risk-based prioritisation", "Remediation roadmap", "Program design"],
        excludes: ["Remediation execution", "Ongoing management"],
        price: "",
      },
      {
        name: "Implementation",
        duration: "4–8 weeks",
        summary: "We stand up the program: scanning, prioritisation, workflow, and SLAs.",
        includes: ["Everything in Assessment", "Scanning & workflow setup", "SLA & routing configuration", "Initial remediation drive"],
        excludes: ["24/7 operation", "Application code fixes"],
        price: "",
      },
      {
        name: "Managed",
        duration: "Ongoing",
        summary: "We run vulnerability management and drive remediation to closure.",
        includes: ["Continuous scanning & triage", "Prioritisation & routing", "Verification retests", "Monthly metrics & reviews"],
        excludes: ["Developing the fixes themselves"],
        price: "",
      },
    ],
    deliverables: [
      "Asset-aware vulnerability baseline",
      "Risk-based remediation queue",
      "Remediation workflow with SLAs",
      "Verification retest results",
      "Program metrics dashboard",
    ],
    faqs: [
      { q: "We already have a scanner. Why do we need this?", a: "A scanner produces findings; a program produces fixed vulnerabilities. We make your existing scanner work harder — prioritising by exploitability and driving remediation to closure with SLAs — rather than replacing it." },
      { q: "How do you decide what to fix first?", a: "Exploitability and exposure, not raw CVSS: CISA KEV and EPSS scores, whether the asset is internet-facing, and what it's worth — so the top of the queue is what an attacker would actually use." },
      { q: "Does this include patching?", a: "We orchestrate and verify remediation and drive it to closure; the fixes are applied by the owning teams (or your managed-endpoint service), and we confirm they hold." },
      { q: "How does it relate to Penetration Testing?", a: "Vulnerability management is the continuous baseline; pen testing is the periodic proof that the gaps that remain can't be chained into a breach. They complement each other." },
    ],
    seo: {
      title: "Risk-based Vulnerability Management",
      description:
        "Continuous scanning, prioritisation by exploitability (KEV/EPSS), remediation SLAs, and verification — a vulnerability management program that reduces real risk, not counts.",
    },
  },

  "siem-soar": {
    situation:
      "Your SIEM ingests everything, costs a fortune, and floods analysts with alerts no one trusts. The fix isn't more data — it's high-fidelity detections, automation that handles the repetitive response, and an ingestion strategy that stops paying to store noise. Cairn engineers Microsoft Sentinel (or your SIEM) and SOAR playbooks so the alerts that fire are worth acting on.",
    workstreams: [
      {
        title: "Detection engineering",
        deliverable: "Tuned analytic rules and detection content",
        detail:
          "Build and tune detections mapped to MITRE ATT&CK, retire the noisy ones, and close coverage gaps that matter.",
      },
      {
        title: "SOAR automation",
        deliverable: "Automated response playbooks",
        detail:
          "Automate enrichment, triage, and containment for the repetitive cases so analysts spend time on the ones that need judgement.",
      },
      {
        title: "Ingestion & cost optimisation",
        deliverable: "Log-source and cost optimisation plan",
        detail:
          "Route the right data to the right tier, drop what has no detection or compliance value, and cut ingestion cost without losing visibility.",
      },
      {
        title: "Content lifecycle",
        deliverable: "Detection-as-code pipeline",
        detail:
          "Version-controlled detections and playbooks with testing, so your content improves over time instead of decaying.",
      },
    ],
    tiers: [
      {
        name: "Assessment",
        duration: "2–4 weeks",
        summary: "We assess your SIEM, detections, and cost, and design the improvements.",
        includes: ["Detection coverage review (MITRE ATT&CK)", "Alert-quality & noise analysis", "Ingestion & cost review", "Improvement roadmap"],
        excludes: ["Implementation", "24/7 monitoring"],
        price: "",
      },
      {
        name: "Implementation",
        duration: "5–12 weeks",
        summary: "We engineer the detections, SOAR playbooks, and ingestion strategy.",
        includes: ["Everything in Assessment", "Detection engineering", "SOAR playbook build", "Ingestion / cost optimisation"],
        excludes: ["Staffed 24/7 triage"],
        price: "",
      },
      {
        name: "Managed",
        duration: "Ongoing",
        summary: "We maintain and improve your detection content continuously.",
        includes: ["Detection tuning & new content", "Playbook maintenance", "Cost monitoring", "Quarterly ATT&CK coverage reviews"],
        excludes: ["Analyst triage (see Managed SOC / MDR)"],
        price: "",
      },
    ],
    deliverables: [
      "Tuned analytic rules & detection content",
      "MITRE ATT&CK coverage map",
      "Automated SOAR playbooks",
      "Log-source & cost optimisation plan",
      "Detection-as-code pipeline",
    ],
    faqs: [
      { q: "Is this the same as Managed SOC / MDR?", a: "No — SIEM & SOAR Engineering builds and tunes the detection content and automation; Managed SOC provides the 24/7 analysts who act on it. Some clients want the engineering only; many pair the two." },
      { q: "Which SIEM do you work with?", a: "We're strongest with Microsoft Sentinel, and we work with Splunk, Elastic, and others. The engineering approach — ATT&CK-mapped detections, SOAR automation, cost control — is the same." },
      { q: "Can you actually cut our SIEM bill?", a: "Usually, yes: a lot of ingestion has no detection or compliance value. We route data by value and tier, which cuts cost while keeping the visibility that matters." },
      { q: "Will automation take actions on our systems?", a: "Only the actions you approve, with gates where you want a human in the loop. Enrichment and triage automate freely; containment automates within the guardrails you set." },
    ],
    seo: {
      title: "SIEM & SOAR Engineering (Microsoft Sentinel)",
      description:
        "Detection engineering mapped to MITRE ATT&CK, SOAR automation, and ingestion cost optimisation for Microsoft Sentinel and other SIEMs — high-fidelity alerts, lower cost.",
    },
  },

  "threat-intelligence": {
    situation:
      "Generic threat feeds tell you what's happening to everyone; you need to know what's targeting your industry, your brand, and your exposed assets — and have it actually drive your defences. Cairn delivers curated, relevant threat intelligence and attack-surface monitoring, wired into your detections and your decisions rather than sitting in a portal no one opens.",
    workstreams: [
      {
        title: "Intelligence requirements & sourcing",
        deliverable: "Priority intelligence requirements (PIRs)",
        detail:
          "Define what actually matters to you — the actors, sectors, and assets — and source intelligence against those requirements, not everything.",
      },
      {
        title: "Attack-surface & brand monitoring",
        deliverable: "External attack-surface and brand-exposure report",
        detail:
          "Monitor exposed assets, leaked credentials, look-alike domains, and dark-web mentions of your brand and data.",
      },
      {
        title: "Intelligence-driven detection",
        deliverable: "IOC and TTP feeds wired into your SIEM",
        detail:
          "Turn intelligence into detections — indicators and attacker techniques flowing into your SIEM so it fires on what's relevant.",
      },
      {
        title: "Reporting & briefings",
        deliverable: "Tailored threat briefings",
        detail:
          "Regular briefings pitched at both the SOC and the board, so intelligence informs day-to-day defence and strategic decisions.",
      },
    ],
    tiers: [
      {
        name: "Assessment",
        duration: "2–3 weeks",
        summary: "We define your intelligence requirements and baseline your exposure.",
        includes: ["Priority intelligence requirements", "External attack-surface baseline", "Brand & credential exposure scan", "Integration design"],
        excludes: ["Ongoing monitoring", "SIEM integration build"],
        price: "",
      },
      {
        name: "Implementation",
        duration: "3–6 weeks",
        summary: "We wire intelligence into your detections and reporting.",
        includes: ["Everything in Assessment", "IOC/TTP feed integration", "Monitoring setup", "Reporting cadence"],
        excludes: ["24/7 analyst response"],
        price: "",
      },
      {
        name: "Managed",
        duration: "Ongoing",
        summary: "We run threat intelligence and attack-surface monitoring for you.",
        includes: ["Curated intelligence & alerts", "Attack-surface & brand monitoring", "Detection updates", "Regular briefings"],
        excludes: ["Incident response (see that service)"],
        price: "",
      },
    ],
    deliverables: [
      "Priority intelligence requirements (PIRs)",
      "External attack-surface & brand-exposure report",
      "IOC / TTP detection feeds",
      "Tailored threat briefings",
      "Exposure monitoring dashboard",
    ],
    faqs: [
      { q: "We already get threat feeds. What's different?", a: "Raw feeds are noise until they're scoped to you and wired into action. We define what matters (your sector, brand, assets), curate against that, and push it into your detections and briefings." },
      { q: "What is attack-surface monitoring?", a: "A continuous outside-in view of what an attacker sees: exposed services, leaked credentials, look-alike domains, and dark-web mentions of your organisation — so you find exposure before they exploit it." },
      { q: "How does this feed our SOC?", a: "Directly: indicators and attacker techniques flow into your SIEM (or our Managed SOC), so detection is driven by what's actually relevant to you." },
      { q: "Is this useful without a big security team?", a: "Yes — the Managed tier does the curation and briefing for you, so a lean team gets relevant intelligence without a dedicated analyst." },
    ],
    seo: {
      title: "Threat Intelligence & Attack-Surface Monitoring",
      description:
        "Curated, requirements-driven threat intelligence, external attack-surface and brand monitoring, and IOC/TTP feeds wired into your SIEM — intelligence that drives defence.",
    },
  },

  "incident-response": {
    situation:
      "The question isn't whether you'll have an incident — it's whether, at 2am, you have a plan, the right people on a call, and a tested way to recover. Cairn puts an incident-response retainer in place, exercises your team against realistic ransomware and breach scenarios, and builds the recovery runbooks so a bad day stays a bad day instead of becoming an existential one.",
    workstreams: [
      {
        title: "IR readiness & retainer",
        deliverable: "Incident-response plan and retainer",
        detail:
          "A clear IR plan, defined roles, escalation paths, and a retainer so expert responders are a phone call away when it counts.",
      },
      {
        title: "Ransomware & tabletop exercises",
        deliverable: "Tabletop exercise reports with findings",
        detail:
          "Run your leadership and technical teams through realistic ransomware and breach scenarios, and capture what broke before it matters.",
      },
      {
        title: "Recovery runbooks & backups",
        deliverable: "Tested recovery runbooks",
        detail:
          "Recovery procedures for your critical systems, validated against your backups — because untested recovery is a hope, not a plan.",
      },
      {
        title: "Response & forensics (on call)",
        deliverable: "Incident response & DFIR on activation",
        detail:
          "When an incident is declared, we lead containment, eradication, recovery, and forensics, and produce the post-incident report.",
      },
    ],
    tiers: [
      {
        name: "Assessment",
        duration: "2–4 weeks",
        summary: "We assess IR readiness and run a scenario to find the gaps.",
        includes: ["IR readiness assessment", "Ransomware tabletop exercise", "Backup / recovery review", "Prioritised gap report"],
        excludes: ["Live incident response", "Retainer coverage"],
        price: "",
      },
      {
        name: "Implementation",
        duration: "4–8 weeks",
        summary: "We build the plan, runbooks, and readiness your team can execute.",
        includes: ["Everything in Assessment", "IR plan & playbooks", "Tested recovery runbooks", "Team training & exercises"],
        excludes: ["24/7 retainer (see Managed)"],
        price: "",
      },
      {
        name: "Managed",
        duration: "Ongoing",
        summary: "We're on retainer to respond, and keep you exercise-ready.",
        includes: ["IR retainer with response SLA", "Quarterly exercises", "Runbook & plan maintenance", "Post-incident support"],
        excludes: ["Guaranteed on-site presence in every region"],
        price: "",
      },
    ],
    deliverables: [
      "Incident-response plan & playbooks",
      "Ransomware tabletop exercise reports",
      "Tested recovery runbooks",
      "IR retainer with response SLA",
      "Post-incident reports (on activation)",
    ],
    faqs: [
      { q: "What does a retainer actually get us?", a: "Guaranteed access to expert responders within an agreed SLA, pre-agreed terms so there's no procurement scramble mid-incident, and a team that already knows your environment from the exercises." },
      { q: "Why tabletop exercises?", a: "Because plans fail on contact. Exercises surface the missing contacts, the untested backup, and the decision no one owns — while it's a discussion, not a disaster." },
      { q: "Do you handle the forensics too?", a: "Yes — on activation we lead containment through recovery and produce the digital-forensics and post-incident report, including what to tell regulators and customers." },
      { q: "How does this pair with Managed SOC?", a: "The SOC detects and escalates; incident response takes over when something is a real incident. Together they cover the full detect-to-recover path." },
    ],
    seo: {
      title: "Incident Response & Ransomware Readiness",
      description:
        "IR retainer, ransomware tabletop exercises, and tested recovery runbooks — plus on-call containment, forensics, and post-incident reporting when an incident is declared.",
    },
  },

  grc: {
    situation:
      "Risk lives in spreadsheets, policies are out of date, and every audit is a surprise. You need governance, risk, and compliance run as a program — one risk register, a current policy framework, and controls mapped once and reused across every standard you're held to. Cairn builds and runs that program so compliance becomes routine instead of a recurring emergency.",
    workstreams: [
      {
        title: "Risk register & assessment",
        deliverable: "Enterprise risk register",
        detail:
          "Identify, rate, and own risks in one register, with treatment plans and a cadence for keeping it current.",
      },
      {
        title: "Policy & control framework",
        deliverable: "Policy framework and control library",
        detail:
          "A coherent set of policies and a control library mapped to the frameworks you follow, written to be used, not shelved.",
      },
      {
        title: "Multi-standard control mapping",
        deliverable: "Unified control mapping (crosswalk)",
        detail:
          "Map controls once and satisfy many standards — NIST CSF, ISO 27001, SOC 2, CIS — so evidence is collected once and reused.",
      },
      {
        title: "GRC operations & reporting",
        deliverable: "Compliance calendar and board reporting",
        detail:
          "A calendar of reviews, evidence collection, and reporting that keeps you audit-ready and gives the board a real risk picture.",
      },
    ],
    tiers: [
      {
        name: "Assessment",
        duration: "3–5 weeks",
        summary: "We assess your risk and control posture and design the program.",
        includes: ["Risk assessment & register", "Control-framework gap analysis", "Multi-standard crosswalk", "Program roadmap"],
        excludes: ["Program operation", "Tooling implementation"],
        price: "",
      },
      {
        name: "Implementation",
        duration: "6–12 weeks",
        summary: "We stand up the policies, controls, mapping, and reporting.",
        includes: ["Everything in Assessment", "Policy framework rollout", "Control library & mapping", "Reporting & calendar setup"],
        excludes: ["Acting as your auditor"],
        price: "",
      },
      {
        name: "Managed",
        duration: "Ongoing",
        summary: "We run the GRC program and keep you audit-ready.",
        includes: ["Risk-register upkeep", "Evidence collection", "Control reviews", "Board & audit reporting"],
        excludes: ["Issuing certifications (that's your auditor)"],
        price: "",
      },
    ],
    deliverables: [
      "Enterprise risk register",
      "Policy framework & control library",
      "Unified multi-standard control mapping",
      "Compliance calendar",
      "Board-ready risk & compliance reporting",
    ],
    faqs: [
      { q: "How is this different from Compliance & Audit?", a: "Compliance & Audit gets you through a specific audit (SOC 2, ISO 27001). GRC is the ongoing program — risk register, policies, and control mapping — that makes every audit routine rather than a project." },
      { q: "We follow several frameworks. Isn't that duplicate work?", a: "It doesn't have to be. We map controls once to a unified library and crosswalk them to each standard, so you collect evidence once and satisfy many." },
      { q: "Do we need a GRC tool?", a: "Not necessarily. We can run the program in a tool you have or a lightweight setup, and recommend tooling only when scale justifies it." },
      { q: "Can you give the board a real risk picture?", a: "Yes — the risk register and reporting are designed for the board: rated risks, owners, treatment status, and trend, not a wall of controls." },
    ],
    seo: {
      title: "Governance, Risk & Compliance (GRC)",
      description:
        "A GRC program run properly: enterprise risk register, policy framework, and controls mapped once across NIST CSF, ISO 27001, SOC 2 and CIS — audit-ready by default.",
    },
  },

  "third-party-risk": {
    situation:
      "Your biggest exposures increasingly sit outside your walls — in the vendors, SaaS platforms, and partners with access to your data. Cairn stands up third-party risk management: assess and tier your vendors, track their security posture continuously, and make sure a supplier's bad day doesn't become your breach.",
    workstreams: [
      {
        title: "Vendor inventory & tiering",
        deliverable: "Vendor inventory with risk tiers",
        detail:
          "Know who your third parties are, what data and access they hold, and tier them by the risk they actually carry.",
      },
      {
        title: "Assessment & due diligence",
        deliverable: "Vendor assessment process and questionnaires",
        detail:
          "A right-sized assessment process — questionnaires, evidence review, and scoring — proportional to each vendor's tier.",
      },
      {
        title: "Continuous monitoring",
        deliverable: "Continuous third-party monitoring",
        detail:
          "Outside-in security ratings and breach monitoring so a vendor's deteriorating posture is flagged between assessments.",
      },
      {
        title: "Contracts & remediation",
        deliverable: "Security requirements and remediation tracking",
        detail:
          "Security clauses for contracts and a process to track and close the gaps assessments find in your key vendors.",
      },
    ],
    tiers: [
      {
        name: "Assessment",
        duration: "3–5 weeks",
        summary: "We inventory and tier your vendors and design the TPRM process.",
        includes: ["Vendor inventory & tiering", "Assessment framework design", "Key-vendor deep-dives", "Program roadmap"],
        excludes: ["Ongoing monitoring", "Contract negotiation"],
        price: "",
      },
      {
        name: "Implementation",
        duration: "5–10 weeks",
        summary: "We stand up the assessment process, monitoring, and requirements.",
        includes: ["Everything in Assessment", "Questionnaire & scoring setup", "Monitoring integration", "Security requirements pack"],
        excludes: ["Legal contract drafting"],
        price: "",
      },
      {
        name: "Managed",
        duration: "Ongoing",
        summary: "We run vendor assessments and monitoring for you.",
        includes: ["Ongoing vendor assessments", "Continuous monitoring & alerts", "Remediation tracking", "Quarterly reporting"],
        excludes: ["Acting as your procurement team"],
        price: "",
      },
    ],
    deliverables: [
      "Vendor inventory with risk tiers",
      "Vendor assessment process & questionnaires",
      "Continuous monitoring dashboard",
      "Security requirements pack for contracts",
      "Third-party risk reporting",
    ],
    faqs: [
      { q: "We have hundreds of vendors. Do we assess them all the same?", a: "No — tiering is the point. A payroll processor with deep access gets a deep-dive; a low-risk tool gets a light-touch check. Effort follows risk, so the program is sustainable." },
      { q: "What is continuous monitoring versus a questionnaire?", a: "A questionnaire is a point-in-time self-report; continuous monitoring is an outside-in view of a vendor's real posture and breach exposure between assessments, so you're not blind for a year at a time." },
      { q: "How does this relate to GRC and Compliance?", a: "Third-party risk is a domain within your wider GRC program and a control many audits (SOC 2, ISO 27001) require. We keep it consistent with the rest of your risk register." },
      { q: "Can you help when a customer assesses us?", a: "Yes — the same evidence and control mapping we build for your program answers inbound security questionnaires from your customers far faster." },
    ],
    seo: {
      title: "Third-Party / Vendor Risk Management (TPRM)",
      description:
        "Vendor inventory and tiering, right-sized assessments, continuous outside-in monitoring, and security requirements — so a supplier's breach doesn't become yours.",
    },
  },

  "business-continuity": {
    situation:
      "If a core system were down for a week — ransomware, a cloud outage, a failed data centre — could the business keep running, and for how long? Cairn runs a business impact analysis, builds continuity and disaster-recovery plans against your real recovery objectives, and then tests them, so resilience is proven rather than assumed.",
    workstreams: [
      {
        title: "Business impact analysis",
        deliverable: "Business impact analysis (BIA)",
        detail:
          "Identify critical processes, their dependencies, and the recovery objectives (RTO/RPO) the business actually needs.",
      },
      {
        title: "Continuity & DR planning",
        deliverable: "Business continuity and DR plans",
        detail:
          "Continuity plans for the business and disaster-recovery runbooks for the systems, aligned to the recovery objectives.",
      },
      {
        title: "Backup & recovery strategy",
        deliverable: "Backup and recovery architecture review",
        detail:
          "Validate that backups are immutable, offsite, and actually restorable — the failure mode ransomware counts on.",
      },
      {
        title: "Exercising & validation",
        deliverable: "DR test reports",
        detail:
          "Test recovery against the plans and objectives, and capture what didn't work while it's an exercise, not an outage.",
      },
    ],
    tiers: [
      {
        name: "Assessment",
        duration: "3–5 weeks",
        summary: "We run the BIA and assess your continuity and recovery readiness.",
        includes: ["Business impact analysis", "RTO/RPO definition", "Backup & DR review", "Gap report & roadmap"],
        excludes: ["Plan build", "DR tooling implementation"],
        price: "",
      },
      {
        name: "Implementation",
        duration: "5–10 weeks",
        summary: "We build the continuity plans, DR runbooks, and test them.",
        includes: ["Everything in Assessment", "BC & DR plan build", "Recovery runbooks", "Initial DR test"],
        excludes: ["Building the DR infrastructure itself"],
        price: "",
      },
      {
        name: "Managed",
        duration: "Ongoing",
        summary: "We keep the plans current and exercise them on a cadence.",
        includes: ["Plan maintenance", "Scheduled DR tests", "Post-test remediation tracking", "Annual BIA refresh"],
        excludes: ["Operating your backup infrastructure"],
        price: "",
      },
    ],
    deliverables: [
      "Business impact analysis (BIA)",
      "Business continuity & DR plans",
      "Backup & recovery architecture review",
      "Tested recovery runbooks",
      "DR test reports",
    ],
    faqs: [
      { q: "Isn't DR just having backups?", a: "Backups are necessary and not sufficient. DR is knowing your recovery objectives, having tested runbooks to hit them, and proving the backups actually restore — which is exactly where untested plans fail." },
      { q: "How does this connect to Incident Response?", a: "IR contains and eradicates the threat; BCDR restores the business. Ransomware readiness in particular spans both, which is why we align the recovery runbooks across the two services." },
      { q: "What are RTO and RPO?", a: "Recovery Time Objective (how long you can be down) and Recovery Point Objective (how much data you can afford to lose). The BIA sets these per process so recovery is designed to real needs, not guesses." },
      { q: "Do you actually test it?", a: "Yes — an untested plan is a liability. We run DR tests against the objectives and track the gaps to closure, and the Managed tier keeps exercising on a cadence." },
    ],
    seo: {
      title: "Business Continuity & Disaster Recovery (BCDR)",
      description:
        "Business impact analysis, continuity and DR plans against real RTO/RPO objectives, immutable-backup review, and tested recovery runbooks — resilience that's proven, not assumed.",
    },
  },

  vciso: {
    situation:
      "You need a security leader — strategy, board reporting, program ownership, someone who can sit across from an auditor or a customer's CISO — but not a full-time executive salary. Cairn provides a virtual CISO: an experienced security leader who owns your programme at the cadence you need, from a few days a month to a hands-on interim mandate.",
    workstreams: [
      {
        title: "Security strategy & roadmap",
        deliverable: "Security strategy and multi-quarter roadmap",
        detail:
          "A strategy tied to business risk and a roadmap the board can fund, sequenced by risk reduction and constraints.",
      },
      {
        title: "Program governance",
        deliverable: "Security program governance & metrics",
        detail:
          "Own the risk register, policies, and the cadence of reviews, with metrics that show the programme is working.",
      },
      {
        title: "Board & stakeholder reporting",
        deliverable: "Board-ready reporting pack",
        detail:
          "Translate security into business terms for the board, and represent security to customers, auditors, and regulators.",
      },
      {
        title: "Team & vendor leadership",
        deliverable: "Team mentoring and vendor oversight",
        detail:
          "Lead and mentor your security team, and hold your security vendors to account so spend delivers outcomes.",
      },
    ],
    tiers: [
      {
        name: "Assessment",
        duration: "2–4 weeks",
        summary: "We assess your programme and set the strategy and roadmap.",
        includes: ["Program maturity assessment", "Risk-based strategy", "Prioritised roadmap", "Board summary"],
        excludes: ["Ongoing leadership", "Hands-on delivery"],
        price: "",
      },
      {
        name: "Implementation",
        duration: "1–3 months",
        summary: "We stand up governance and get the roadmap moving.",
        includes: ["Everything in Assessment", "Governance & policy setup", "Metrics & reporting", "Initial roadmap execution"],
        excludes: ["Permanent employment"],
        price: "",
      },
      {
        name: "Managed",
        duration: "Ongoing",
        summary: "We're your CISO at the cadence you need.",
        includes: ["Ongoing security leadership", "Board & audit representation", "Program & risk ownership", "Team mentoring"],
        excludes: ["A full-time on-site executive (by definition)"],
        price: "",
      },
    ],
    deliverables: [
      "Security strategy & roadmap",
      "Risk register & program governance",
      "Board-ready reporting pack",
      "Security metrics dashboard",
      "Policy framework ownership",
    ],
    faqs: [
      { q: "How much time do we get?", a: "As much as the mandate needs — from a couple of days a month for governance and board reporting, up to a hands-on interim CISO during a transition. We scope it to your stage and risk." },
      { q: "Can a vCISO represent us to auditors and customers?", a: "Yes — representing security to auditors, regulators, and customers' security teams is core to the role, and often the immediate reason clients engage one." },
      { q: "How is this different from your other advisory services?", a: "The other services are scoped projects; the vCISO owns the programme and decides which of them you need and when. Think of the vCISO as the leader who directs the rest." },
      { q: "What happens if we hire a permanent CISO?", a: "We hand over cleanly — the strategy, risk register, governance, and metrics are all documented — and can stay on to support the new leader through the transition." },
    ],
    seo: {
      title: "Virtual CISO (vCISO)",
      description:
        "Fractional security leadership: strategy, program governance, board and auditor representation, and team mentoring from an experienced CISO — at the cadence you need.",
    },
  },

  "penetration-testing": {
    situation:
      "You need to know — and prove — that an attacker can't get from the internet to your crown jewels. Cairn runs penetration tests and red-team exercises that find the real paths, chain the weaknesses the way an adversary would, and hand you evidence and fixes, not a scanner dump with the severity dialled up.",
    workstreams: [
      {
        title: "Scoping & threat profiling",
        deliverable: "Test scope and rules of engagement",
        detail:
          "Agree targets, objectives, and rules up front, informed by the threats that actually apply to your business.",
      },
      {
        title: "Penetration testing",
        deliverable: "Findings register with reproductions",
        detail:
          "External, internal, web, and API testing that exploits and chains weaknesses safely, with clear reproductions for every finding.",
      },
      {
        title: "Red-team / adversary emulation",
        deliverable: "Objective-based red-team report",
        detail:
          "Goal-oriented, stealthy emulation of a real adversary to test detection and response, not just prevention.",
      },
      {
        title: "Remediation & retest",
        deliverable: "Prioritised remediation guidance and retest",
        detail:
          "Fixes ranked by exploitability, and a retest that confirms the paths we found are actually closed.",
      },
    ],
    tiers: [
      {
        name: "Assessment",
        duration: "1–3 weeks",
        summary: "A scoped penetration test with a findings register and fixes.",
        includes: ["Scoping & rules of engagement", "Penetration testing", "Findings register with reproductions", "Remediation guidance"],
        excludes: ["Red-team engagement", "Remediation execution"],
        price: "",
      },
      {
        name: "Implementation",
        duration: "2–5 weeks",
        summary: "A full red-team / adversary emulation against real objectives.",
        includes: ["Everything in Assessment", "Objective-based red team", "Detection & response evaluation", "Retest"],
        excludes: ["Fixing the findings for you"],
        price: "",
      },
      {
        name: "Managed",
        duration: "Ongoing",
        summary: "A continuous testing cadence that keeps pace with change.",
        includes: ["Scheduled tests each cycle", "Continuous/attack-surface testing", "Retests on remediation", "Trend reporting"],
        excludes: ["Application development"],
        price: "",
      },
    ],
    deliverables: [
      "Test scope & rules of engagement",
      "Findings register with reproductions",
      "Objective-based red-team report",
      "Prioritised remediation guidance",
      "Retest confirmation",
    ],
    faqs: [
      { q: "What's the difference between a pen test and a red team?", a: "A pen test finds and proves as many exploitable weaknesses as possible in a scope; a red team pursues a specific objective stealthily to test whether you'd detect and respond to a real adversary. Different questions, both valuable." },
      { q: "Do you just run a scanner?", a: "No — scanning is a starting point at most. The value is in manual exploitation and chaining weaknesses the way an attacker would, which a scanner can't do, plus reproductions you can act on." },
      { q: "Can you test our cloud and our apps, not just the network?", a: "Yes — external and internal infrastructure, web and API, cloud configurations, and social engineering are all in scope depending on your objectives." },
      { q: "How does this fit with Vulnerability Management?", a: "Vulnerability management is the continuous baseline; pen testing is the periodic proof that what remains can't be chained into a breach. We map findings into the same register." },
    ],
    seo: {
      title: "Penetration Testing & Red Team",
      description:
        "External, internal, web, API, and red-team testing that finds and chains the paths a real attacker would — with reproductions, prioritised fixes, and a retest to confirm closure.",
    },
  },

  "security-architecture": {
    situation:
      "You're building something significant — a new platform, a cloud migration, a product — and you want to know it's secure by design before it ships, not after a pen test finds out. Cairn reviews your reference architecture and designs against zero-trust and secure-by-design principles, and gives you a prioritised set of changes while they're still cheap to make.",
    workstreams: [
      {
        title: "Architecture & design review",
        deliverable: "Architecture review report",
        detail:
          "Review your reference architecture and key designs for trust boundaries, data flows, and the assumptions that don't hold.",
      },
      {
        title: "Threat modelling",
        deliverable: "Threat models for critical systems",
        detail:
          "Structured threat modelling (STRIDE) of the systems that matter, so design decisions are made against real abuse cases.",
      },
      {
        title: "Zero-trust & pattern alignment",
        deliverable: "Target-state patterns and guardrails",
        detail:
          "Align to zero-trust and secure-by-design patterns, and define reusable guardrails so future designs start secure.",
      },
      {
        title: "Roadmap & standards",
        deliverable: "Prioritised remediation roadmap and design standards",
        detail:
          "A prioritised set of changes and the design standards that keep the architecture secure as it evolves.",
      },
    ],
    tiers: [
      {
        name: "Assessment",
        duration: "2–4 weeks",
        summary: "We review the architecture and hand you prioritised findings.",
        includes: ["Architecture & design review", "Threat modelling", "Zero-trust gap analysis", "Prioritised roadmap"],
        excludes: ["Implementation", "Ongoing advisory"],
        price: "",
      },
      {
        name: "Implementation",
        duration: "3–8 weeks",
        summary: "We define target patterns, guardrails, and standards with your teams.",
        includes: ["Everything in Assessment", "Target-state patterns", "Reusable guardrails", "Design standards"],
        excludes: ["Building the systems themselves"],
        price: "",
      },
      {
        name: "Managed",
        duration: "Ongoing",
        summary: "We review designs as they come, keeping architecture secure by default.",
        includes: ["Design review as-a-service", "Pattern & standard updates", "Architect office hours", "Quarterly reviews"],
        excludes: ["Full development ownership"],
        price: "",
      },
    ],
    deliverables: [
      "Architecture review report",
      "Threat models for critical systems",
      "Target-state security patterns & guardrails",
      "Design standards",
      "Prioritised remediation roadmap",
    ],
    faqs: [
      { q: "When should we do this — before or after building?", a: "Before, and continuously. The whole point is catching design flaws while they're cheap to fix; the Managed tier reviews designs as they come so security is a design input, not a launch-day surprise." },
      { q: "How does this relate to Zero Trust Architecture?", a: "Zero Trust is a specific target model for identity, network, and access; Security Architecture Review is broader — it evaluates any design against secure-by-design principles, of which zero trust is a major one." },
      { q: "Will you review our cloud and app designs?", a: "Yes — cloud reference architectures, application designs, integration and data flows, and platform blueprints are all in scope." },
      { q: "Do we get standards we can reuse?", a: "Yes — reusable patterns, guardrails, and design standards so your teams start from a secure baseline instead of re-litigating the same decisions each project." },
    ],
    seo: {
      title: "Security Architecture Review",
      description:
        "Independent review of your reference architecture and designs against zero-trust and secure-by-design principles — threat models, reusable guardrails, and a prioritised roadmap.",
    },
  },

  "security-awareness": {
    situation:
      "Your people are the most-targeted part of your attack surface, and annual click-through training treats it like a checkbox. Cairn runs role-based awareness training and realistic phishing simulations that change behaviour — and gives you the metrics to prove click rates are actually falling.",
    workstreams: [
      {
        title: "Baseline & program design",
        deliverable: "Awareness baseline and program plan",
        detail:
          "Measure where you are with a baseline phishing simulation, and design a program targeted at your real risks and roles.",
      },
      {
        title: "Phishing simulation",
        deliverable: "Phishing simulation campaigns with reporting",
        detail:
          "Realistic, escalating simulations that reflect what actually targets your people, with reporting by team and role.",
      },
      {
        title: "Role-based training",
        deliverable: "Role-based training content and cadence",
        detail:
          "Short, relevant training tied to the risks each role faces — developers, finance, executives — not one generic module.",
      },
      {
        title: "Culture & measurement",
        deliverable: "Behaviour metrics and reporting",
        detail:
          "Track click, report, and repeat-offender rates over time, and build a positive reporting culture, not a blame one.",
      },
    ],
    tiers: [
      {
        name: "Assessment",
        duration: "2–3 weeks",
        summary: "We baseline behaviour and design a targeted program.",
        includes: ["Baseline phishing simulation", "Risk & role analysis", "Program design", "Metrics plan"],
        excludes: ["Ongoing campaigns", "Content delivery"],
        price: "",
      },
      {
        name: "Implementation",
        duration: "3–6 weeks",
        summary: "We launch the training and simulation program.",
        includes: ["Everything in Assessment", "Training content & delivery", "Simulation campaign setup", "Reporting configuration"],
        excludes: ["Long-term operation (see Managed)"],
        price: "",
      },
      {
        name: "Managed",
        duration: "Ongoing",
        summary: "We run continuous training and simulations and report on behaviour.",
        includes: ["Ongoing phishing simulations", "Refreshed training content", "Repeat-offender coaching", "Quarterly behaviour reporting"],
        excludes: ["Disciplinary action (that's yours)"],
        price: "",
      },
    ],
    deliverables: [
      "Awareness baseline report",
      "Phishing simulation campaigns & results",
      "Role-based training content",
      "Behaviour metrics dashboard",
      "Board-ready awareness reporting",
    ],
    faqs: [
      { q: "Does awareness training actually work?", a: "Generic annual training barely moves the needle; targeted, frequent simulation with coaching does. We measure click, report, and repeat-offender rates so you can see behaviour change rather than assume it." },
      { q: "Won't phishing simulations upset staff?", a: "Not when they're run to build a reporting culture, not to shame people. We design campaigns and messaging so 'I reported it' is the win, and coaching — not punishment — follows a click." },
      { q: "Can you tailor it to specific roles?", a: "Yes — finance gets invoice-fraud scenarios, developers get secure-coding-adjacent content, executives get whaling simulations. Relevance is what makes it stick." },
      { q: "How does this fit the wider program?", a: "Security awareness is a control most frameworks (ISO 27001, SOC 2) require, and a genuine risk reducer. We report it as part of your GRC metrics." },
    ],
    seo: {
      title: "Security Awareness & Phishing Simulation",
      description:
        "Role-based awareness training and realistic phishing simulations that measurably cut click rates — with behaviour metrics and reporting that satisfy ISO 27001 and SOC 2.",
    },
  },

  "data-platform": {
    situation:
      "Your data lives in a dozen systems, every team has its own version of the numbers, and leadership doesn't trust the dashboard. Cairn builds a governed data platform — on Microsoft Fabric or Azure — with reliable pipelines, a shared semantic model, and security and lineage built in, so analytics and AI run on data people can actually trust.",
    workstreams: [
      { title: "Data assessment & architecture", deliverable: "Data platform architecture & roadmap", detail: "Map sources, quality, and use cases, and design a target platform (lakehouse / warehouse) that fits your stack." },
      { title: "Pipelines & integration", deliverable: "Ingestion & transformation pipelines", detail: "Reliable, monitored pipelines that land and shape data once, so every report starts from the same source of truth." },
      { title: "Semantic model & analytics", deliverable: "Governed semantic model & reports", detail: "One definition of the metrics that matter, exposed through Power BI so teams stop arguing about whose number is right." },
      { title: "Governance & security", deliverable: "Data governance & access model", detail: "Classification, lineage, and row-level security so the platform is trusted and compliant, not a new data-leak surface." },
    ],
    tiers: [
      { name: "Assessment", duration: "2–4 weeks", summary: "We assess your data estate and design the platform.", includes: ["Source & quality assessment", "Use-case prioritisation", "Platform architecture", "Governance design"], excludes: ["Build", "Ongoing operation"], price: "" },
      { name: "Implementation", duration: "6–14 weeks", summary: "We build the platform, pipelines, and analytics.", includes: ["Everything in Assessment", "Pipeline build", "Semantic model & reports", "Security & governance rollout"], excludes: ["24/7 operation"], price: "" },
      { name: "Managed", duration: "Ongoing", summary: "We run and evolve the platform.", includes: ["Pipeline monitoring", "New source onboarding", "Model & report changes", "Cost & governance reviews"], excludes: ["Business analysis of your data for you"], price: "" },
    ],
    deliverables: ["Data platform architecture & roadmap", "Ingestion & transformation pipelines", "Governed semantic model", "Power BI reporting", "Data governance & access model"],
    faqs: [
      { q: "Fabric, Databricks, or Snowflake?", a: "We're strongest on Microsoft Fabric and Azure, and we deliver on Databricks and Snowflake where that's your direction. We recommend based on your stack and skills, not a preferred SKU." },
      { q: "How does this relate to Data Security & Governance?", a: "Tightly — classification, DLP, and access control from that service are how we keep the platform compliant. On regulated data we deliver them together." },
      { q: "Can this feed our AI initiatives?", a: "Yes — a governed platform is the foundation Copilot and custom AI need to be trustworthy, which is why AI Implementation often follows it." },
    ],
    seo: { title: "Data Platform & Analytics (Microsoft Fabric, Azure)", description: "A governed data platform on Microsoft Fabric or Azure — pipelines, a shared semantic model, Power BI analytics, and data governance you can trust for reporting and AI." },
  },

  "workplace-collaboration": {
    situation:
      "You rolled out Microsoft 365 and Teams, but sprawl set in: guest access no one tracks, sites shared too widely, and features half-adopted. Cairn brings governance and security to your collaboration platform and drives the adoption that makes it pay off — so M365 is an asset, not a shadow-IT risk.",
    workstreams: [
      { title: "Tenant governance & security", deliverable: "M365 governance baseline", detail: "Sharing policies, guest access, and lifecycle for Teams and SharePoint so collaboration doesn't quietly become data exposure." },
      { title: "Secure collaboration design", deliverable: "Collaboration architecture", detail: "How Teams, SharePoint, and OneDrive should be structured, labelled, and protected for the way your people actually work." },
      { title: "Migration & rollout", deliverable: "Migrated, governed workloads", detail: "Move from legacy file shares or another suite into a well-governed M365, without recreating the old mess." },
      { title: "Adoption enablement", deliverable: "Adoption plan & training", detail: "Champions, training, and comms so features get used and the investment shows up in how people work." },
    ],
    tiers: [
      { name: "Assessment", duration: "2–3 weeks", summary: "We assess your M365 tenant and design governance.", includes: ["Tenant & sharing review", "Security & compliance gaps", "Collaboration design", "Adoption plan"], excludes: ["Migration", "Ongoing management"], price: "" },
      { name: "Implementation", duration: "4–10 weeks", summary: "We roll out governance, migrate, and drive adoption.", includes: ["Everything in Assessment", "Governance rollout", "Migration", "Adoption enablement"], excludes: ["24/7 support (see Managed Workplace)"], price: "" },
      { name: "Managed", duration: "Ongoing", summary: "We keep collaboration governed and adopted.", includes: ["Governance upkeep", "Guest & lifecycle reviews", "Adoption support", "Quarterly reviews"], excludes: ["End-user help desk (see Managed Workplace)"], price: "" },
    ],
    deliverables: ["M365 governance baseline", "Collaboration architecture", "Sharing & guest-access policy", "Adoption plan & training", "Migration runbook"],
    faqs: [
      { q: "Is this a security service or a productivity service?", a: "Both, deliberately. We govern and secure M365 and drive adoption, because a collaboration platform that's secure but unused — or used but leaking data — both fail." },
      { q: "How does it relate to Data Security & Governance?", a: "Purview labelling and DLP are how we enforce the collaboration boundaries here; on sensitive estates we deliver them together." },
      { q: "Can you migrate us from Google or a file server?", a: "Yes — we migrate from Google Workspace, legacy file shares, or another tenant into a well-governed M365, rather than lifting the old sprawl across." },
    ],
    seo: { title: "Microsoft 365 & Collaboration", description: "Governed, secure Microsoft 365 and Teams — tenant governance, sharing and guest-access control, migration, and adoption enablement so collaboration is an asset, not a risk." },
  },

  "managed-workplace": {
    situation:
      "Your IT team is buried in tickets and never gets to the projects that matter. Cairn runs your digital workplace — endpoints, identity, patching, and support — proactively, so devices stay compliant, users stay productive, and your team is freed to work on what moves the business.",
    workstreams: [
      { title: "Endpoint & patch management", deliverable: "Managed endpoint estate", detail: "Compliant, patched, monitored devices via Intune and Defender — health and hardening maintained, not left to drift." },
      { title: "Identity & access operations", deliverable: "Managed identity operations", detail: "Day-to-day identity, access, and conditional-access operations kept current and least-privilege." },
      { title: "Service desk & support", deliverable: "Proactive support & service desk", detail: "Responsive support with SLAs, plus proactive fixes that stop the same tickets recurring." },
      { title: "Reporting & continual improvement", deliverable: "Workplace health reporting", detail: "Monthly reporting on estate health, security posture, and the improvements we're driving." },
    ],
    tiers: [
      { name: "Assessment", duration: "2–3 weeks", summary: "We baseline your workplace estate and design the service.", includes: ["Endpoint & identity review", "Support-model design", "Security baseline", "Transition plan"], excludes: ["Ongoing operation"], price: "" },
      { name: "Implementation", duration: "3–6 weeks", summary: "We onboard the estate and stand up management.", includes: ["Everything in Assessment", "Tooling & baseline rollout", "Runbook build", "Service transition"], excludes: ["Long-term operation (see Managed)"], price: "" },
      { name: "Managed", duration: "Ongoing", summary: "We run your digital workplace, proactively.", includes: ["Endpoint & patch management", "Identity operations", "Service desk with SLAs", "Monthly reporting"], excludes: ["Physical hardware repair"], price: "" },
    ],
    deliverables: ["Managed endpoint estate", "Managed identity operations", "Service desk with SLAs", "Security & compliance baseline", "Workplace health reporting"],
    faqs: [
      { q: "Do you replace our IT team or support it?", a: "Either — we run the whole digital workplace, or take the operational load (patching, endpoints, tickets) so your team focuses on strategic projects. We scope to your setup." },
      { q: "Is security included?", a: "Yes — endpoint hardening, patching, and compliance are core, and this pairs with Managed SOC / MDR when you want 24/7 detection on top." },
      { q: "Which tools do you manage?", a: "We're strongest with the Microsoft stack (Intune, Entra ID, Defender), and we work with what you have rather than forcing a rip-and-replace." },
    ],
    seo: { title: "Managed Workplace Services", description: "Proactive management of your digital workplace — endpoints, identity, patching, and service desk with SLAs — so your team ships projects instead of drowning in tickets." },
  },

  "device-management": {
    situation:
      "A new hire shouldn't wait days for a working laptop, and a lost device shouldn't mean lost data. Cairn stands up zero-touch device provisioning and lifecycle management with Intune and Autopilot, so every device arrives compliant and configured on day one and is secured — or wiped — the moment it needs to be.",
    workstreams: [
      { title: "Zero-touch provisioning", deliverable: "Autopilot provisioning process", detail: "Devices ship to the user and configure themselves to your compliant baseline out of the box — no manual imaging." },
      { title: "Compliance & hardening baselines", deliverable: "Intune compliance & configuration profiles", detail: "Security baselines, encryption, and compliance policies that gate access to corporate data." },
      { title: "App & update management", deliverable: "Managed app & update rings", detail: "Consistent app delivery and staged updates so devices stay current without breaking on patch day." },
      { title: "Lifecycle & retirement", deliverable: "Device lifecycle & wipe process", detail: "Reassignment and secure retirement, including remote wipe for lost or leaver devices." },
    ],
    tiers: [
      { name: "Assessment", duration: "1–3 weeks", summary: "We assess your device estate and design the target.", includes: ["Estate & MDM review", "Baseline design", "Provisioning design", "Rollout plan"], excludes: ["Build", "Ongoing operation"], price: "" },
      { name: "Implementation", duration: "3–6 weeks", summary: "We build provisioning, baselines, and lifecycle.", includes: ["Everything in Assessment", "Autopilot setup", "Compliance & config profiles", "App & update rings"], excludes: ["Day-to-day operation (see Managed Workplace)"], price: "" },
      { name: "Managed", duration: "Ongoing", summary: "We manage the device lifecycle for you.", includes: ["Provisioning operation", "Baseline maintenance", "Update management", "Retirement & wipe"], excludes: ["Hardware procurement (see IT Procurement)"], price: "" },
    ],
    deliverables: ["Autopilot provisioning process", "Intune compliance & configuration profiles", "Managed app & update rings", "Device lifecycle & wipe process", "Estate compliance reporting"],
    faqs: [
      { q: "How is this different from Endpoint & Device Security?", a: "Endpoint & Device Security focuses on threat defence and hardening; Device Management focuses on the operational lifecycle — provisioning, compliance, updates, and retirement. They share the Intune/Defender foundation and are often delivered together." },
      { q: "Windows only?", a: "No — Windows via Autopilot, plus macOS, iOS, and Android through Intune, under one compliance model." },
      { q: "What about lost devices?", a: "Remote lock and wipe are part of the lifecycle process, and compliance policies ensure a non-compliant or lost device loses access to corporate data." },
    ],
    seo: { title: "Device Management & Provisioning (Intune, Autopilot)", description: "Zero-touch provisioning and lifecycle management with Intune and Autopilot — compliant devices ready on day one, secured or wiped the moment they need to be." },
  },

  "adoption-change": {
    situation:
      "You bought the licences, but the tools sit unused and the ROI never lands. Cairn runs structured adoption and change management around your technology rollouts — champions, training, and communications tied to real business outcomes — so the change sticks and the value shows up.",
    workstreams: [
      { title: "Readiness & stakeholder mapping", deliverable: "Change readiness assessment", detail: "Who's affected, what changes for them, and where resistance will come from — before rollout, not after." },
      { title: "Champion & training program", deliverable: "Champions network & training plan", detail: "A network of champions and role-based training so people learn the tools in the context of their actual work." },
      { title: "Communications", deliverable: "Communications plan & assets", detail: "Clear, well-timed comms that explain the why, not just the how — the part most rollouts skip." },
      { title: "Measurement & reinforcement", deliverable: "Adoption metrics & reinforcement plan", detail: "Track adoption and reinforce the behaviours that stick, so the change doesn't fade after go-live." },
    ],
    tiers: [
      { name: "Assessment", duration: "1–2 weeks", summary: "We assess readiness and design the change plan.", includes: ["Readiness assessment", "Stakeholder mapping", "Adoption plan", "Metrics plan"], excludes: ["Delivery", "Ongoing reinforcement"], price: "" },
      { name: "Implementation", duration: "3–8 weeks", summary: "We run the adoption program through go-live.", includes: ["Everything in Assessment", "Champions & training", "Communications delivery", "Go-live support"], excludes: ["Long-term operation"], price: "" },
      { name: "Managed", duration: "Ongoing", summary: "We sustain adoption across your rollouts.", includes: ["Ongoing training", "Adoption reporting", "Reinforcement campaigns", "New-feature enablement"], excludes: ["Building the software itself"], price: "" },
    ],
    deliverables: ["Change readiness assessment", "Champions network & training plan", "Communications plan & assets", "Adoption metrics dashboard", "Reinforcement plan"],
    faqs: [
      { q: "Why pay for adoption — won't people just use it?", a: "Usually not. Unadopted tools are the single biggest source of wasted IT spend. Structured change management is what turns a licence purchase into a behaviour change and measurable value." },
      { q: "Does this only apply to Microsoft rollouts?", a: "No — any significant technology or process change: M365, a new security control, a data platform, or a new way of working." },
      { q: "How do you measure success?", a: "Against adoption and business outcomes agreed up front — active usage, task completion, reduced shadow IT — not attendance at a training session." },
    ],
    seo: { title: "Adoption & Change Management", description: "Structured adoption and change management for technology rollouts — readiness, champions, training, communications, and measurement so the change sticks and value lands." },
  },

  "datacenter-modernization": {
    situation:
      "Your data center is ageing, expensive, and increasingly a liability. Cairn assesses what you run, modernises what should stay, and moves the rest to a hybrid or cloud target — cutting cost and risk while keeping availability and security intact.",
    workstreams: [
      { title: "Assessment & disposition", deliverable: "Workload disposition plan", detail: "Inventory every workload and decide its fate — modernise, migrate, retire — with cost and risk quantified." },
      { title: "Virtualization & consolidation", deliverable: "Consolidated, virtualized estate", detail: "Consolidate and virtualize to reduce footprint, power, and licensing before anything moves." },
      { title: "Hybrid target design", deliverable: "Hybrid target architecture", detail: "A secure hybrid design — what stays on-prem, what goes to cloud, and how they connect and are governed." },
      { title: "Migration & decommission", deliverable: "Migrated workloads & decommission plan", detail: "Move workloads with hardening applied, then cleanly decommission the old estate." },
    ],
    tiers: [
      { name: "Assessment", duration: "3–5 weeks", summary: "We assess the estate and design the modernization.", includes: ["Workload inventory & disposition", "Cost & risk analysis", "Hybrid target design", "Migration roadmap"], excludes: ["Migration", "Ongoing operation"], price: "" },
      { name: "Implementation", duration: "8–20 weeks", summary: "We modernise, migrate, and decommission.", includes: ["Everything in Assessment", "Virtualization & consolidation", "Migration & hardening", "Decommissioning"], excludes: ["24/7 operation"], price: "" },
      { name: "Managed", duration: "Ongoing", summary: "We manage the modernised infrastructure.", includes: ["Infrastructure monitoring", "Patch & lifecycle", "Capacity & cost management", "Reporting"], excludes: ["Application support"], price: "" },
    ],
    deliverables: ["Workload disposition plan", "Consolidated, virtualized estate", "Hybrid target architecture", "Migration & decommission plan", "Cost & availability model"],
    faqs: [
      { q: "Do we have to go all-cloud?", a: "No. Modernization means right-placing each workload; some belong in the cloud, some on modern on-prem or colocation. We design the hybrid target that's cheapest and safest for your mix." },
      { q: "How is this different from Cloud Implementation?", a: "Cloud Implementation moves workloads to the cloud; Data Center Modernization takes a whole-estate view — including what stays on-prem, virtualization, and decommissioning — and hands the cloud-bound workloads to that service." },
      { q: "Will security come with it?", a: "Yes — hardening baselines are applied as workloads move, and the hybrid design includes segmentation, backup, and monitoring rather than deferring them." },
    ],
    seo: { title: "Data Center Modernization", description: "Assess, virtualize, and modernise your data center — a secure hybrid target that cuts cost and risk, with migration, hardening, and clean decommissioning." },
  },

  "hybrid-cloud": {
    situation:
      "You're running across on-prem, Azure, and AWS, and no one has a single view of cost, security, or what's actually deployed. Cairn brings one operating model to your hybrid and multi-cloud estate — governance, monitoring, and cost control — so you manage it deliberately instead of by surprise.",
    workstreams: [
      { title: "Estate discovery & governance", deliverable: "Multi-cloud governance model", detail: "Discover what's deployed where, and establish consistent governance, tagging, and policy across clouds." },
      { title: "Unified monitoring & operations", deliverable: "Cross-cloud monitoring", detail: "One pane for health, security signals, and alerts across on-prem and clouds, feeding your SOC." },
      { title: "Cost management (FinOps)", deliverable: "FinOps model & optimisation", detail: "Visibility, budgets, and right-sizing so spend is controlled and attributable across every cloud." },
      { title: "Landing zones & guardrails", deliverable: "Consistent landing zones", detail: "Reusable, guardrailed landing zones so new workloads land governed on any cloud, not ungoverned." },
    ],
    tiers: [
      { name: "Assessment", duration: "3–5 weeks", summary: "We assess the estate and design the operating model.", includes: ["Multi-cloud discovery", "Governance & cost review", "Target operating model", "Roadmap"], excludes: ["Implementation"], price: "" },
      { name: "Implementation", duration: "6–14 weeks", summary: "We stand up governance, monitoring, and FinOps.", includes: ["Everything in Assessment", "Governance & guardrails", "Cross-cloud monitoring", "FinOps rollout"], excludes: ["24/7 operation"], price: "" },
      { name: "Managed", duration: "Ongoing", summary: "We run your hybrid/multi-cloud operations.", includes: ["Monitoring & operations", "Cost optimisation", "Governance upkeep", "Monthly reporting"], excludes: ["Application development"], price: "" },
    ],
    deliverables: ["Multi-cloud governance model", "Cross-cloud monitoring", "FinOps model & optimisation", "Consistent landing zones", "Cost & posture dashboard"],
    faqs: [
      { q: "How is this different from Cloud Foundations?", a: "Cloud Foundations builds a single cloud's landing zone; Hybrid & Multi-Cloud Management is the operating model across several clouds plus on-prem — governance, monitoring, and cost as one." },
      { q: "Can you control our cloud spend?", a: "Yes — FinOps is a core workstream: visibility, budgets, tagging, and right-sizing, with the Managed tier continuously optimising." },
      { q: "Does security carry across clouds?", a: "That's the point of consistent governance and monitoring — posture and detections apply across clouds and feed your SOC, rather than each cloud being its own island." },
    ],
    seo: { title: "Hybrid & Multi-Cloud Management", description: "One operating model across on-prem, Azure, and AWS — governance, cross-cloud monitoring, FinOps cost control, and consistent landing zones you can actually see." },
  },

  "backup-storage": {
    situation:
      "Your backups are slow, costly, and — the part that matters — you're not certain they'd actually restore after a ransomware hit. Cairn modernises backup and storage with immutable, tested recovery, sized to what the business truly needs, so a bad day is recoverable rather than catastrophic.",
    workstreams: [
      { title: "Backup & recovery assessment", deliverable: "Backup posture assessment", detail: "Review what's protected, how, and whether recovery objectives are actually met — most gaps are silent until tested." },
      { title: "Immutable, ransomware-resilient backup", deliverable: "Immutable backup architecture", detail: "Air-gapped or immutable copies that ransomware can't encrypt or delete, aligned to a 3-2-1 strategy." },
      { title: "Storage modernization", deliverable: "Right-sized storage design", detail: "Tiered storage that matches performance and cost to the data's real value, on-prem and in cloud." },
      { title: "Recovery testing", deliverable: "Tested recovery runbooks", detail: "Regular restore tests against your recovery objectives, so 'we have backups' becomes 'we can recover.'" },
    ],
    tiers: [
      { name: "Assessment", duration: "2–4 weeks", summary: "We assess backup and storage and design the target.", includes: ["Backup & recovery review", "Ransomware-resilience gap analysis", "Storage right-sizing", "Roadmap"], excludes: ["Implementation"], price: "" },
      { name: "Implementation", duration: "4–10 weeks", summary: "We modernise backup and storage and test recovery.", includes: ["Everything in Assessment", "Immutable backup rollout", "Storage modernization", "Recovery test"], excludes: ["24/7 operation"], price: "" },
      { name: "Managed", duration: "Ongoing", summary: "We manage backup and prove recoverability.", includes: ["Backup monitoring", "Scheduled restore tests", "Capacity management", "Reporting"], excludes: ["Operating unrelated apps"], price: "" },
    ],
    deliverables: ["Backup posture assessment", "Immutable backup architecture", "Right-sized storage design", "Tested recovery runbooks", "Recovery-objective reporting"],
    faqs: [
      { q: "How does this relate to Business Continuity & DR?", a: "Backup & Storage is the data-protection layer; BCDR is the wider plan to keep the business running. We align recovery objectives across both so the backups actually support the DR plan." },
      { q: "What makes a backup ransomware-resilient?", a: "Immutability and separation — copies attackers can't encrypt or delete, kept off the primary domain, with tested restores. That combination is what turns ransomware from a crisis into an inconvenience." },
      { q: "On-prem, cloud, or both?", a: "Both — we design the tiering and copies across on-prem and cloud to hit your recovery and cost targets, rather than defaulting to one." },
    ],
    seo: { title: "Backup & Storage Modernization", description: "Immutable, ransomware-resilient backup and right-sized storage with tested recovery — so a bad day is recoverable, aligned to your business continuity objectives." },
  },

  "network-transformation": {
    situation:
      "Your WAN was built for a data-center world, and it's expensive, slow to change, and fighting your cloud and remote-work reality. Cairn modernises the network with SD-WAN and SASE — better performance, lower cost, and security converged into the fabric instead of bolted on.",
    workstreams: [
      { title: "Network assessment & design", deliverable: "Network transformation design", detail: "Assess traffic, sites, and cloud dependencies, and design an SD-WAN/SASE target that fits how the business now runs." },
      { title: "SD-WAN rollout", deliverable: "SD-WAN deployment", detail: "Application-aware routing across sites and cloud, with resilience and central policy replacing rigid, costly links." },
      { title: "SASE & secure edge", deliverable: "SASE / secure-edge integration", detail: "Converge networking and security at the edge — ZTNA, SWG, and inspection — so remote and cloud access is secure by default." },
      { title: "Optimisation & management", deliverable: "Network monitoring & optimisation", detail: "Ongoing visibility and tuning so performance and cost stay optimised as the estate changes." },
    ],
    tiers: [
      { name: "Assessment", duration: "2–4 weeks", summary: "We assess the network and design the target.", includes: ["Traffic & site assessment", "SD-WAN/SASE design", "Cost & resilience analysis", "Rollout plan"], excludes: ["Deployment"], price: "" },
      { name: "Implementation", duration: "6–16 weeks", summary: "We deploy SD-WAN and secure edge.", includes: ["Everything in Assessment", "SD-WAN rollout", "SASE integration", "Cutover & validation"], excludes: ["24/7 operation"], price: "" },
      { name: "Managed", duration: "Ongoing", summary: "We monitor and optimise the network.", includes: ["Network monitoring", "Policy & change management", "Optimisation", "Reporting"], excludes: ["Physical cabling"], price: "" },
    ],
    deliverables: ["Network transformation design", "SD-WAN deployment", "SASE / secure-edge integration", "Network monitoring & optimisation", "Resilience & cost model"],
    faqs: [
      { q: "How does this relate to Network Security & Segmentation?", a: "Network Security focuses on segmentation and containment; Network Transformation modernises the connectivity fabric (SD-WAN/SASE). SASE is where they converge, and we align the two." },
      { q: "Will this cut our network cost?", a: "Often — SD-WAN typically reduces reliance on expensive MPLS and improves cloud performance, and we quantify the case before you commit." },
      { q: "Which vendors?", a: "We're vendor-pragmatic across the major SD-WAN/SASE platforms and design to your existing investments and skills rather than a single badge." },
    ],
    seo: { title: "Network Transformation & SD-WAN", description: "Modernise the network with SD-WAN and SASE — application-aware routing, secure edge (ZTNA/SWG), and lower cost, with security converged into the fabric." },
  },

  "enterprise-wireless": {
    situation:
      "Wi-Fi drops in the warehouse, there are dead zones on the third floor, and every complaint lands on IT. Cairn designs, surveys, and manages enterprise wireless and campus networking so connectivity is reliable, secure, and no longer a daily distraction.",
    workstreams: [
      { title: "Site survey & design", deliverable: "Wireless design & heat maps", detail: "Predictive and on-site surveys to design coverage and capacity that actually holds up under real load." },
      { title: "Secure wireless architecture", deliverable: "Secure WLAN architecture", detail: "Segmented SSIDs, strong authentication, and guest isolation so wireless isn't the soft way in." },
      { title: "Deployment & tuning", deliverable: "Deployed, tuned wireless", detail: "Install, validate, and tune against the design so coverage and performance match the plan." },
      { title: "Monitoring & management", deliverable: "Managed wireless", detail: "Ongoing monitoring and optimisation so new dead zones and degradation are caught before users report them." },
    ],
    tiers: [
      { name: "Assessment", duration: "1–3 weeks", summary: "We survey and design your wireless and LAN.", includes: ["Site survey", "Coverage & capacity design", "Security architecture", "Rollout plan"], excludes: ["Deployment"], price: "" },
      { name: "Implementation", duration: "3–8 weeks", summary: "We deploy and tune the wireless estate.", includes: ["Everything in Assessment", "Deployment", "Validation & tuning", "Handover"], excludes: ["24/7 operation"], price: "" },
      { name: "Managed", duration: "Ongoing", summary: "We monitor and manage wireless for you.", includes: ["Monitoring & optimisation", "Firmware & config management", "Capacity reviews", "Reporting"], excludes: ["Physical cabling works"], price: "" },
    ],
    deliverables: ["Wireless design & heat maps", "Secure WLAN architecture", "Deployed, tuned wireless", "Managed wireless monitoring", "Coverage & performance reporting"],
    faqs: [
      { q: "Do you do on-site surveys or just predictive?", a: "Both — predictive design up front and on-site validation surveys after deployment, because real walls and interference rarely match the model exactly." },
      { q: "Is guest and IoT Wi-Fi secured?", a: "Yes — segmented SSIDs, strong authentication, and isolation for guest and IoT so wireless doesn't become a bridge into your core network." },
      { q: "Which platforms?", a: "We work across the major enterprise wireless platforms and design to your standards rather than forcing a single vendor." },
    ],
    seo: { title: "Enterprise Wireless & LAN", description: "Designed, surveyed, and managed enterprise wireless and campus networking — reliable coverage, secure segmented SSIDs, and monitoring that catches issues before users do." },
  },

  "software-asset-management": {
    situation:
      "You're over-licensed on some products, under-licensed (and audit-exposed) on others, and no one can say exactly what you own versus what you use. Cairn builds a software asset management baseline that reconciles entitlements against real usage — cutting waste, closing compliance gaps, and giving you the position to survive a vendor audit.",
    workstreams: [
      { title: "Discovery & inventory", deliverable: "Software inventory & entitlement register", detail: "Reconcile what's deployed and used against what you're entitled to across your major publishers." },
      { title: "Compliance & risk position", deliverable: "License compliance position (ELP)", detail: "An effective licence position per publisher, surfacing both shortfalls (audit risk) and surplus (waste)." },
      { title: "Optimisation", deliverable: "Optimisation & savings plan", detail: "Reharvest unused licences, right-size editions, and remove shelfware before the next renewal." },
      { title: "SAM operations", deliverable: "SAM process & governance", detail: "A repeatable SAM process so the position stays current, not a one-off spreadsheet that rots." },
    ],
    tiers: [
      { name: "Assessment", duration: "3–5 weeks", summary: "We baseline your licence position and risks.", includes: ["Software discovery", "Entitlement reconciliation", "Effective licence position", "Optimisation opportunities"], excludes: ["Ongoing operation", "Contract negotiation"], price: "" },
      { name: "Implementation", duration: "4–8 weeks", summary: "We stand up SAM tooling, process, and governance.", includes: ["Everything in Assessment", "SAM tooling setup", "Process & governance", "Initial optimisation"], excludes: ["Publisher negotiation (see Licensing Optimization)"], price: "" },
      { name: "Managed", duration: "Ongoing", summary: "We keep your licence position current and optimised.", includes: ["Ongoing reconciliation", "Renewal-ready positions", "Audit support", "Quarterly reporting"], excludes: ["Legal representation in disputes"], price: "" },
    ],
    deliverables: ["Software inventory & entitlement register", "Effective licence position (ELP)", "Optimisation & savings plan", "SAM process & governance", "Audit-defence pack"],
    faqs: [
      { q: "How does this relate to Licensing Optimization?", a: "SAM establishes the true position (what you own and use); Licensing Optimization uses that position to right-size and renegotiate the agreements. SAM is the evidence; optimisation is the action." },
      { q: "Will this help if we're being audited?", a: "Directly — an accurate effective licence position and the underlying evidence are exactly what a publisher audit demands, and having it ready turns a stressful audit into a managed one." },
      { q: "Which publishers?", a: "The ones that carry the most cost and audit risk for you — typically Microsoft, Oracle, VMware, Adobe, SAP — scoped to your estate." },
    ],
    seo: { title: "Software Asset Management (SAM)", description: "Reconcile entitlements against real usage across your major publishers — an effective licence position that cuts waste, closes compliance gaps, and survives a vendor audit." },
  },

  "licensing-optimization": {
    situation:
      "Your Microsoft, Adobe, and VMware renewals keep climbing, and no one's sure you're using what you pay for. Cairn right-sizes and renegotiates your major software agreements against real usage — so you pay for what the business needs, not what a sales rep quoted.",
    workstreams: [
      { title: "Usage & needs analysis", deliverable: "Usage-based requirements", detail: "What editions and quantities you actually need, based on real usage — the counter to the vendor's upsell." },
      { title: "Agreement & scenario modelling", deliverable: "Licensing scenario models", detail: "Model the renewal options (editions, terms, programs) so you go into negotiation knowing the best structure." },
      { title: "Negotiation support", deliverable: "Negotiation strategy & support", detail: "An independent, publisher-savvy position to negotiate from — leverage points, benchmarks, and traps to avoid." },
      { title: "Ongoing optimisation", deliverable: "Renewal governance", detail: "A cadence that catches over-provisioning and true-up risk before each renewal, not after." },
    ],
    tiers: [
      { name: "Assessment", duration: "2–4 weeks", summary: "We analyse usage and model your best licensing position.", includes: ["Usage analysis", "Scenario modelling", "Savings opportunities", "Renewal roadmap"], excludes: ["Negotiation delivery"], price: "" },
      { name: "Implementation", duration: "3–6 weeks", summary: "We support the negotiation and reset the agreements.", includes: ["Everything in Assessment", "Negotiation strategy & support", "Agreement restructuring", "Change implementation"], excludes: ["Acting as your signatory"], price: "" },
      { name: "Managed", duration: "Ongoing", summary: "We govern renewals and keep spend optimised.", includes: ["Renewal governance", "Usage monitoring", "Pre-renewal optimisation", "Reporting"], excludes: ["Buying the licences on your behalf (see IT Procurement)"], price: "" },
    ],
    deliverables: ["Usage-based requirements", "Licensing scenario models", "Negotiation strategy & support", "Renewal governance", "Savings report"],
    faqs: [
      { q: "Are you independent of the vendors?", a: "Yes — our incentive is your total cost, not a publisher's revenue. We benchmark and model options so you negotiate from evidence, not from the rep's quote." },
      { q: "How does this relate to SAM?", a: "SAM gives the accurate position; Licensing Optimization acts on it to right-size and renegotiate. They're often delivered as one engagement." },
      { q: "Can you cover Microsoft EA renewals specifically?", a: "Yes — Microsoft agreements (EA, MCA, M365/E5) are among the most common and highest-value engagements, alongside Oracle, VMware, and Adobe." },
    ],
    seo: { title: "Software Licensing Optimization", description: "Right-size and renegotiate major software agreements (Microsoft, Adobe, VMware, Oracle) against real usage — independent negotiation support so you pay for what you need." },
  },

  "it-procurement": {
    situation:
      "Buying IT is slow, fragmented across teams, and you suspect you're leaving money — and security — on the table. Cairn runs sourcing and procurement with security built into the process: better pricing, faster cycles, and vendors that are actually vetted before they get access to your environment.",
    workstreams: [
      { title: "Sourcing strategy", deliverable: "Sourcing strategy & standards", detail: "Consolidate demand, standardise what you buy, and set the vendor and security requirements up front." },
      { title: "Vendor selection & security vetting", deliverable: "Vetted vendor shortlist", detail: "Evaluate vendors on price and on security posture, so a supplier's weakness doesn't become your incident." },
      { title: "Procurement execution", deliverable: "Managed procurement process", detail: "Run the buying process — quotes, negotiation, and orders — faster and with better leverage than ad-hoc purchasing." },
      { title: "Spend & contract management", deliverable: "Spend visibility & contract register", detail: "Track spend and contracts so renewals and commitments are managed, not forgotten." },
    ],
    tiers: [
      { name: "Assessment", duration: "2–3 weeks", summary: "We assess your procurement and design the approach.", includes: ["Spend & process review", "Sourcing strategy", "Standards & security requirements", "Roadmap"], excludes: ["Ongoing buying"], price: "" },
      { name: "Implementation", duration: "3–6 weeks", summary: "We stand up the procurement process and standards.", includes: ["Everything in Assessment", "Vendor vetting framework", "Process & tooling", "Initial sourcing"], excludes: ["Long-term operation"], price: "" },
      { name: "Managed", duration: "Ongoing", summary: "We run IT procurement for you.", includes: ["Managed sourcing & buying", "Vendor & security vetting", "Contract & renewal tracking", "Spend reporting"], excludes: ["Approving spend on your behalf"], price: "" },
    ],
    deliverables: ["Sourcing strategy & standards", "Vetted vendor shortlist", "Managed procurement process", "Spend visibility & contract register", "Savings report"],
    faqs: [
      { q: "Why buy IT through a security firm?", a: "Because procurement is where security is won or lost cheaply: vendor vetting, security requirements in contracts, and standardised, hardened products chosen up front — plus the pricing leverage of consolidated demand." },
      { q: "How does this relate to Third-Party Risk?", a: "Closely — the security vetting here is the front end of your third-party risk program, so vendors are assessed before they're onboarded, not after." },
      { q: "Do you replace our procurement team?", a: "We can run IT sourcing end-to-end or support your team with strategy, vetting, and negotiation — scoped to how you buy today." },
    ],
    seo: { title: "IT Procurement & Sourcing", description: "Sourcing and procurement with security built in — consolidated demand, vetted vendors, faster cycles, and better pricing, with spend and contracts under management." },
  },

  "lifecycle-services": {
    situation:
      "You don't have a clean picture of the hardware you own, and retiring old kit is a security and compliance risk waiting to happen. Cairn manages the hardware lifecycle from deployment to secure, certified disposal — with data destruction you can actually prove to an auditor.",
    workstreams: [
      { title: "Asset inventory & tracking", deliverable: "Hardware asset register", detail: "Know what you have, where it is, and its lifecycle stage — the base for everything else." },
      { title: "Deployment & refresh", deliverable: "Deployment & refresh process", detail: "A repeatable process for rolling out and refreshing hardware on a sensible cadence, tied to provisioning." },
      { title: "Secure disposal & data destruction", deliverable: "Certified disposal & destruction certificates", detail: "Data-bearing devices wiped or destroyed to standard, with certificates that satisfy audit and privacy requirements." },
      { title: "Value recovery & sustainability", deliverable: "Value recovery & e-waste reporting", detail: "Recover residual value and dispose responsibly, with reporting for your sustainability and ESG obligations." },
    ],
    tiers: [
      { name: "Assessment", duration: "1–3 weeks", summary: "We inventory your hardware and design the lifecycle.", includes: ["Asset inventory", "Lifecycle & refresh design", "Disposal process design", "Roadmap"], excludes: ["Ongoing operation"], price: "" },
      { name: "Implementation", duration: "3–6 weeks", summary: "We stand up the lifecycle and disposal process.", includes: ["Everything in Assessment", "Asset-tracking setup", "Deployment & refresh process", "Disposal process"], excludes: ["Long-term operation"], price: "" },
      { name: "Managed", duration: "Ongoing", summary: "We run the hardware lifecycle for you.", includes: ["Asset tracking", "Refresh coordination", "Secure disposal & certificates", "Value-recovery reporting"], excludes: ["On-site physical repairs"], price: "" },
    ],
    deliverables: ["Hardware asset register", "Deployment & refresh process", "Certified disposal & destruction certificates", "Value recovery & e-waste reporting", "Lifecycle dashboard"],
    faqs: [
      { q: "Why does disposal matter for security?", a: "Retired devices are a top source of accidental data leaks. Certified data destruction — with certificates — is both a security control and a compliance requirement under ISO 27001 and privacy law." },
      { q: "Do you provide destruction certificates?", a: "Yes — every data-bearing asset is wiped or physically destroyed to standard, with a certificate you can produce for an audit or a regulator." },
      { q: "How does this tie to Device Management?", a: "Device Management provisions and secures devices in service; Lifecycle Services covers the physical asset from receipt to certified end-of-life. Together they cover the whole hardware journey." },
    ],
    seo: { title: "Product Lifecycle & Asset Disposition", description: "Hardware lifecycle from deployment to secure, certified disposal — asset tracking, refresh, data destruction with certificates, and responsible value recovery." },
  },
};

export function getServiceDetail(slug: ServiceSlug): ServiceDetail {
  return { ...SERVICES[slug], ...details[slug] };
}

export const ALL_SERVICE_DETAILS: ServiceDetail[] = (
  Object.keys(details) as ServiceSlug[]
).map(getServiceDetail);
