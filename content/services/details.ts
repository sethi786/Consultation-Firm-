import type { ServiceSlug } from "./index";
import { SERVICES } from "./index";
import type { ServiceDetail } from "./types";

/**
 * Service page content (§6). Copy follows §5: answer the buyer's question first,
 * every claim carries a number / framework reference / named artefact, no banned
 * adjectives. Business facts we don't have are marked `{{TODO}}`, never invented.
 *
 * `{{TODO: pricing}}` markers stand where a real price band needs sign-off (§10).
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
        price: "{{TODO: pricing}}",
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
        price: "{{TODO: pricing}}",
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
        price: "{{TODO: pricing}}",
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
        price: "{{TODO: pricing}}",
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
        price: "{{TODO: pricing}}",
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
        price: "{{TODO: pricing}}",
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
        price: "{{TODO: pricing}}",
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
        price: "{{TODO: pricing}}",
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
        price: "{{TODO: pricing}}",
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
        price: "{{TODO: pricing}}",
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
        price: "{{TODO: pricing}}",
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
        price: "{{TODO: pricing}}",
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
        price: "{{TODO: pricing}}",
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
        price: "{{TODO: pricing}}",
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
        price: "{{TODO: pricing}}",
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
        a: "Fewer, better alerts. We retire rules that generate false positives and write detections mapped to real techniques. {{TODO: reference a representative alert-volume reduction once a named case study is approved}}.",
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
        price: "{{TODO: pricing}}",
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
        price: "{{TODO: pricing}}",
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
        price: "{{TODO: pricing}}",
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
};

export function getServiceDetail(slug: ServiceSlug): ServiceDetail {
  return { ...SERVICES[slug], ...details[slug] };
}

export const ALL_SERVICE_DETAILS: ServiceDetail[] = (
  Object.keys(details) as ServiceSlug[]
).map(getServiceDetail);
