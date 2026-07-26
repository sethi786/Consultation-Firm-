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
      "You shipped an LLM feature — a support copilot, a RAG assistant over internal docs, an agent that can call tools — and now someone on the board wants to know what it can leak, who can make it misbehave, and whether a prompt in a customer ticket can reach your database. Northport assesses the AI system the way an attacker will: prompt injection, data exfiltration through the model, over-scoped tool permissions, and the retrieval layer that quietly indexed data the model should never surface.",
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
      "Your cloud posture tool shows hundreds of findings and a score you can't explain to the board. The real question isn't \"how do we get to green\" — it's \"which ten of these actually expose us, and in what order do we fix them.\" Northport reviews your Azure and AWS estate against CIS benchmarks and your own architecture, then hands you a remediation plan sequenced by exploitability, not by the tool's alphabetical list.",
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
      "Someone asks who has standing global admin in your tenant, and the honest answer is \"we're not sure.\" Between break-glass accounts, legacy service principals, guest users, and roles granted for a project that ended two years ago, privileged access has sprawled. Northport inventories every identity with elevated rights, shows you the paths from an ordinary account to tenant admin, and moves you to just-in-time, least-privilege access in Entra ID.",
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
      "The board asked for a zero trust roadmap, and you need one that survives contact with your actual network — not a vendor diagram. Zero trust is a multi-year architecture change across identity, devices, network, and data, and it fails when it's bought as a product instead of sequenced as a programme. Northport assesses where you are against a recognised zero trust maturity model and gives you a staged roadmap with the order that reduces the most risk first.",
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
      "Your tools generate thousands of alerts a week and no one is triaging them at 2am. The question is not whether you have detection — it's whether anything happens when a real one fires. Northport runs detection and response against your existing stack: we tune the noise down, write the detections that matter, and put analysts on the queue around the clock so an alert becomes an investigation, not an unread email.",
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
      "You have a SOC 2 or ISO 27001 audit in a few months and a stack of controls you're not sure you can evidence. The failure mode isn't usually the audit itself — it's discovering three weeks out that a control has no owner, no policy, and no logs to prove it ran. Northport runs a readiness assessment against the framework you're certifying to, tells you exactly where the gaps are, and gets the evidence in place before the auditor arrives.",
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
      "You can't protect data you can't see. Sensitive records — PII, financials, source code, customer contracts — are scattered across SharePoint, OneDrive, Teams, and a dozen SaaS apps, and no one can say with confidence where the crown jewels live or who can reach them. Northport stands up Microsoft Purview to find and classify sensitive data, label it, and stop it from leaving through the channels that actually leak — so data protection becomes a control you can evidence, not a hope.",
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
      "You're scaling in Azure on foundations that grew by accident — subscriptions spun up ad hoc, inconsistent networking, no guardrails, and security bolted on after each workload ships. Every new project inherits the drift. Northport builds a secure-by-default Azure landing zone to the Microsoft Well-Architected and Cloud Adoption Framework, so governance, identity, network topology, and policy-as-code are in place before the next workload lands — and staying secure becomes the path of least resistance.",
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
      "Your network is flat. Once an attacker lands a single foothold — a phished laptop, an exposed service — nothing stops them moving laterally to the domain controller and the data. Northport designs and delivers segmentation, traffic filtering, and a secure network architecture that turns a breach into a contained incident instead of a company-wide one.",
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
      "Every laptop and phone that touches your data is a way in — and half of them you can't see. Unmanaged devices, inconsistent patching, and endpoint protection that's installed but not tuned mean the endpoint is the softest part of your attack surface. Northport uses Microsoft Intune and Defender for Endpoint to bring every device under management, harden it to a baseline, and make device health a condition of reaching your data.",
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
      "You ship weekly, and security can't be a gate bolted on at the end — by then the design decisions are made and the fix is expensive. Northport builds security into your software development lifecycle: security requirements up front, secure-coding standards, automated SAST/DAST and API testing in the pipeline, and a way to prioritise what actually matters — so your teams keep their velocity and stop shipping the same classes of bug.",
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
};

export function getServiceDetail(slug: ServiceSlug): ServiceDetail {
  return { ...SERVICES[slug], ...details[slug] };
}

export const ALL_SERVICE_DETAILS: ServiceDetail[] = (
  Object.keys(details) as ServiceSlug[]
).map(getServiceDetail);
