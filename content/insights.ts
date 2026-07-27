/**
 * Insights (§4). Static, firm-authored articles — no CMS dependency, so they
 * render live without a database, and no named individual byline (the firm is
 * the author, per the institutional positioning). Technical claims are written
 * to be accurate and defensible; we cite frameworks, not invented metrics.
 *
 * Body is a simple block model rendered by the insights pages.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export interface Insight {
  slug: string;
  kicker: string;
  title: string;
  excerpt: string;
  /** ISO date (published). */
  date: string;
  readMins: number;
  blocks: Block[];
  seo: { title: string; description: string };
}

export const INSIGHTS: Insight[] = [
  {
    slug: "entra-conditional-access-baseline",
    kicker: "Identity",
    title: "An Entra ID Conditional Access baseline that survives a real tenant",
    excerpt:
      "Security defaults are all-or-nothing and break as soon as you have service accounts and executives who travel. Here is the Conditional Access baseline we actually deploy — and the exclusions that quietly undo it.",
    date: "2026-05-12",
    readMins: 6,
    blocks: [
      { type: "p", text: "Most tenants we assess have one of two problems: no Conditional Access at all, relying on Microsoft's security defaults, or a sprawl of overlapping policies nobody can reason about. Neither survives an audit, and neither actually enforces least privilege. A workable baseline is small, ordered, and — crucially — designed around the exclusions it will inevitably need." },
      { type: "h2", text: "Start by blocking legacy authentication" },
      { type: "p", text: "This is the single highest-impact policy, and it is the one most tenants are missing. Legacy authentication protocols — POP, IMAP, SMTP AUTH, and older Office clients — cannot perform multi-factor authentication. As long as they are enabled, an attacker with a valid password simply picks a protocol that never prompts for MFA. Block legacy auth for all users first, in report-only mode, and read the sign-in logs before you enforce: you will find a forgotten scanner or a mailbox relay, and it is far better to find it here than in an incident." },
      { type: "h2", text: "Require MFA — then make it phishing-resistant where it matters" },
      { type: "p", text: "Require MFA for all users across all cloud apps. That stops password spray and credential stuffing, but push-based MFA is still phishable through real-time proxy kits and MFA-fatigue prompts. For administrators and privileged roles, raise the bar to phishing-resistant methods — FIDO2 security keys, passkeys, Windows Hello for Business, or certificate-based authentication — and use a Temporary Access Pass to onboard them without a password detour." },
      { type: "h2", text: "Gate sensitive apps on a compliant device" },
      { type: "p", text: "Identity alone does not tell you whether the endpoint is healthy. For your most sensitive applications, require a compliant or hybrid-joined device through Intune, so access depends on device posture — encryption, patch level, EDR present — not just a correct password and a phone tap." },
      { type: "h2", text: "Use risk-based policies if you have the licence" },
      { type: "p", text: "With Entra ID P2, sign-in risk and user risk policies let you respond to Microsoft's risk signals: require MFA on a medium-or-above risk sign-in, and force a secure password change on a high user-risk event. These are the policies that catch the token-theft and impossible-travel cases a static ruleset misses." },
      { type: "h2", text: "The exclusions are where policies die" },
      { type: "p", text: "Every Conditional Access policy needs break-glass accounts excluded from it — two cloud-only emergency accounts, long random credentials or FIDO2 keys, no standing MFA dependency, and an alert that fires the moment either signs in. But exclusions are also where enforcement quietly leaks: a service account added to a group that is excluded, an executive granted a permanent bypass \"just for now.\" Audit the exclusion lists on every policy on a schedule, because that is the list an attacker most wants to be on." },
      { type: "ul", items: [
        "Block legacy authentication (report-only first).",
        "Require MFA for all users; phishing-resistant for admins.",
        "Require a compliant device for sensitive apps.",
        "Add sign-in and user-risk policies (P2).",
        "Two monitored break-glass accounts; audit every exclusion.",
      ] },
      { type: "p", text: "Roll all of it out in report-only mode, model the impact with the What If tool, and move policy by policy. A baseline you can explain in five bullets and defend in an audit beats a hundred rules nobody trusts. If you want a second set of eyes on yours, that is exactly what our identity assessment does." },
    ],
    seo: {
      title: "An Entra ID Conditional Access baseline that survives a real tenant",
      description:
        "The Conditional Access baseline we deploy in Entra ID — block legacy auth, phishing-resistant MFA for admins, device compliance, risk policies — and the exclusions that undo it.",
    },
  },
  {
    slug: "soc-2-readiness-what-it-involves",
    kicker: "Compliance",
    title: "What a SOC 2 readiness assessment actually involves",
    excerpt:
      "The audit is rarely where SOC 2 goes wrong. It goes wrong three weeks out, when you discover a control has no owner, no policy, and no logs to prove it ever ran. Here is what readiness really means.",
    date: "2026-06-09",
    readMins: 7,
    blocks: [
      { type: "p", text: "SOC 2 is an attestation performed by a licensed CPA firm against the AICPA's Trust Services Criteria. The Security criteria — the common criteria — are mandatory; Availability, Confidentiality, Processing Integrity, and Privacy are added only if they are relevant to what you are attesting. Getting the scope right is the first decision, because every criterion you include is a set of controls you then have to operate and evidence." },
      { type: "h2", text: "Type I versus Type II" },
      { type: "p", text: "A Type I report attests that your controls are suitably designed at a point in time. A Type II report attests that they operated effectively over a period — typically three to twelve months. Enterprise buyers almost always want Type II, which means the clock that matters is not the audit; it is the observation window during which your controls have to actually run and produce evidence." },
      { type: "h2", text: "What readiness actually checks" },
      { type: "p", text: "A readiness assessment is a gap analysis against the criteria in your scope. We map your existing controls to each criterion, then look for three failure modes: a control that does not exist, a control that exists but has no policy behind it, and — the most common — a control that runs but produces no evidence that it ran. The last one is what sinks first-time audits. The control is real; you simply cannot prove it to an auditor who was not in the room." },
      { type: "h2", text: "The controls that trip most teams" },
      { type: "ul", items: [
        "Access reviews — performed, but not recorded, so there is nothing to show.",
        "Onboarding and offboarding — no evidence that access was revoked on the day someone left.",
        "Change management — code ships, but there is no trail linking a change to a review and an approval.",
        "Vendor management — no risk assessment or SOC 2 on file for the subprocessors holding your data.",
        "Incident response — a plan exists but has never been tested, and there is no post-incident record.",
      ] },
      { type: "h2", text: "The sequence, and where the cost really sits" },
      { type: "p", text: "The path is readiness assessment, then remediation, then the Type II observation window, then the audit itself. Most of the calendar time is the observation window, and most of the cost driver is not the audit fee — it is the evidence gaps you have to close before the window even starts. A readiness assessment done early turns a frantic three-week scramble into a scheduled programme, which is the entire point of doing it." },
      { type: "p", text: "You end up with a control-by-control gap register, a remediation plan with owners, and a system description an auditor can read. That is the same shape of deliverable we hand over on every compliance engagement — the evidence in place before the auditor arrives, not after." },
    ],
    seo: {
      title: "What a SOC 2 readiness assessment actually involves",
      description:
        "SOC 2 readiness explained: Trust Services Criteria, Type I vs Type II, the controls that trip first-time audits, and why evidence — not the audit — is where it goes wrong.",
    },
  },
  {
    slug: "prompt-injection-in-production-copilots",
    kicker: "AI Security",
    title: "Prompt injection in production copilots: the exposure most teams miss",
    excerpt:
      "The dangerous prompt injection is not the user typing “ignore your instructions.” It is the instruction hidden in a document your copilot retrieves — and the tool permissions that let it act on them.",
    date: "2026-07-14",
    readMins: 7,
    blocks: [
      { type: "p", text: "Every LLM feature has the same structural weakness: it mixes untrusted input with trusted instructions in the same context, and then it trusts its own output. OWASP ranks prompt injection as the number one risk for LLM applications for exactly this reason. Once you ship a copilot, a RAG assistant, or an agent that can call tools, the question is not whether it can be manipulated — it is what it can reach when it is." },
      { type: "h2", text: "Direct injection is the one everyone tests. Indirect injection is the one that hurts." },
      { type: "p", text: "Direct injection is a user typing an instruction to override the system prompt. It is real, but it is visible and largely self-inflicted. Indirect injection is the dangerous case: malicious instructions hidden inside content the model retrieves — a document, a web page, a calendar invite, a customer support ticket. The user never sees it; the model reads it as instruction and acts. If your copilot summarises inbound email or indexes shared documents, an attacker can put instructions in front of it without ever touching your app." },
      { type: "h2", text: "Retrieval quietly breaks your access control" },
      { type: "p", text: "The second exposure is data. A RAG system is only as safe as its retrieval layer, and teams routinely index a corpus without carrying the source system's permissions across. The result is that a user who could never open a document in SharePoint can have its contents summarised back to them by the assistant, because access control was enforced in the app and not at retrieval. Row-level access has to survive the trip through embeddings and re-ranking, or it is not access control." },
      { type: "h2", text: "Over-scoped tools turn a prompt into an action" },
      { type: "p", text: "An agent that can only produce text is a contained problem. An agent that can send email, call an internal API, move money, or run code is an action surface — and a successful injection now does things, not just says them. The most common finding in our AI assessments is an agent granted broad tool scopes because it was easier than defining narrow ones." },
      { type: "h2", text: "What actually reduces the risk" },
      { type: "ul", items: [
        "Treat model output as untrusted input to whatever consumes it next.",
        "Enforce access control at the retrieval layer, per-user, not per-index.",
        "Give tools the narrowest scopes that work, and keep a human approval gate on anything that changes state or spends money.",
        "Filter and constrain inputs and outputs; never put secrets or standing credentials in a prompt.",
        "Log the prompts, retrievals, and tool calls so an abuse case is investigable.",
      ] },
      { type: "p", text: "There is no single control that solves prompt injection; it is defence in depth around a component you have to assume is manipulable. The teams that get this right treat the LLM like any other untrusted boundary — least privilege, human-in-the-loop, and monitoring — which is exactly how our AI & LLM Security engagement approaches it." },
    ],
    seo: {
      title: "Prompt injection in production copilots: the exposure most teams miss",
      description:
        "Indirect prompt injection, RAG access-control failures, and over-scoped agent tools — the real prompt-injection exposure in production LLM features, and how to reduce it.",
    },
  },
  {
    slug: "cyber-insurance-controls-that-decide-your-premium",
    kicker: "Compliance",
    title: "The cyber insurance controls that actually decide your premium",
    excerpt:
      "The application is now a security audit, and a few controls are effectively pass/fail. Here's what underwriters really check — and why answering the form loosely can void your claim.",
    date: "2026-07-20",
    readMins: 6,
    blocks: [
      { type: "p", text: "Cyber insurance used to be a formality. Now the application is a control questionnaire, and for a handful of items the answer is effectively pass or fail: get them wrong and you face a decline, a higher premium, or — worst of all — a claim denied after an incident because the application overstated your posture. The good news is that the list is short and knowable." },
      { type: "h2", text: "The controls that are effectively mandatory" },
      { type: "p", text: "Across the market, the same high-signal controls decide most applications:" },
      { type: "ul", items: [
        "MFA on all remote access and every privileged/admin account — the single most-checked item.",
        "EDR (endpoint detection and response) deployed across endpoints and servers, not just antivirus.",
        "Tested, offline or immutable backups — and evidence you've actually restored from them.",
        "Email security and phishing controls, because that's still the top entry vector.",
        "A documented, exercised incident-response plan.",
      ] },
      { type: "h2", text: "Why the wording of your answers matters" },
      { type: "p", text: "Insurance is a contract of good faith. If the application says MFA is enforced everywhere and an incident later shows a gap — a legacy protocol, an excluded service account — the insurer can argue misrepresentation and reduce or deny the claim. The control you skipped becomes the reason the cover you paid for doesn't pay out. Answering truthfully, with evidence, is not box-ticking; it's what makes the policy real." },
      { type: "h2", text: "Turn it into leverage" },
      { type: "p", text: "Premiums are risk-priced, so demonstrably closing these controls does more than qualify you — it improves the risk profile underwriters price against. We can't promise a number (that's the underwriter's call), but a stronger, evidenced posture is what moves it. And because these controls are a subset of NIST CSF 2.0, ISO 27001 and CIS, the work doubles as progress toward any audit you also answer to." },
      { type: "p", text: "If your renewal is coming and you're not sure you can evidence the list, that gap is exactly what our cyber insurance readiness engagement closes — honestly, and before the form is due." },
    ],
    seo: {
      title: "The cyber insurance controls that actually decide your premium",
      description:
        "MFA, EDR, tested backups, email security, and an IR plan — the high-signal controls underwriters check, why loose answers can void a claim, and how to turn readiness into leverage.",
    },
  },
  {
    slug: "having-edr-is-not-the-same-as-defences-that-work",
    kicker: "Detection",
    title: "“We have EDR” is not the same as “our defences work”",
    excerpt:
      "Owning security tools and having them fire when it matters are different things. The gap between them is where breaches live — and it's measurable.",
    date: "2026-07-24",
    readMins: 6,
    blocks: [
      { type: "p", text: "Most organisations can list their security tools — EDR, a SIEM, email security, a firewall stack. Far fewer can tell you which of those controls would actually prevent or detect a given attacker technique today. That gap between owning a tool and the tool firing is where real incidents happen, and for years the only way to find out was to have a real breach. It doesn't have to be." },
      { type: "h2", text: "Coverage is not the same as configuration" },
      { type: "p", text: "A tool that's deployed but mis-tuned, exempted for a noisy team, or watching the wrong data source is a control on paper and a blind spot in practice. Vendors report coverage — how many endpoints have the agent — not efficacy, which is whether the agent actually stops or alerts on the techniques an attacker uses. The two drift apart quietly with every config change and exception." },
      { type: "h2", text: "You can measure it safely" },
      { type: "p", text: "Breach and attack simulation runs controlled, non-destructive versions of real attacker techniques — mapped to MITRE ATT&CK — against your live environment and records what your controls prevented, detected, or missed. Nothing detonates real malware; the value is the honest scoreboard: a heatmap of techniques showing exactly where a real attack would succeed silently." },
      { type: "h2", text: "The point is the gaps, then the fix" },
      { type: "p", text: "The output that matters isn't the green cells — it's the ones where an attack succeeded with no prevention and no alert. Those are the detections to write and the configs to fix, prioritised by how likely and how damaging the technique is for your industry. And because you can re-run the simulation, you can prove the gap is closed rather than hoping it is — then keep validating on a cadence so drift never silently reopens it." },
      { type: "p", text: "That continuous loop — validate, find the gap, tune, prove it — is exactly what our continuous validation engagement runs, so “we have the tools” becomes “we've proven they work.”" },
    ],
    seo: {
      title: "“We have EDR” is not the same as “our defences work”",
      description:
        "Owning security tools and having them fire are different things. How breach-and-attack simulation (MITRE ATT&CK) measures whether your controls actually prevent and detect — safely.",
    },
  },
];

export const INSIGHT_SLUGS = INSIGHTS.map((i) => i.slug);

export function getInsight(slug: string): Insight | undefined {
  return INSIGHTS.find((i) => i.slug === slug);
}
