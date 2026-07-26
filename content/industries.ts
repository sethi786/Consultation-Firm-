/**
 * Industry pages (§4). Static, honestly-written content — no fabricated metrics
 * or client names. Each speaks to the buyer's actual regulatory and operational
 * pressure, then names how our method and the frameworks map onto it. Rendered
 * statically so these never depend on the CMS being seeded.
 */

export interface IndustrySection {
  heading: string;
  body: string;
}

export interface Industry {
  slug: string;
  name: string;
  lede: string;
  sections: IndustrySection[];
}

export const INDUSTRIES: Industry[] = [
  {
    slug: "financial-services",
    name: "Financial services",
    lede: "Regulators, auditors and your own board all want evidence — not assurances. We give you control mappings and remediation you can put in front of any of them.",
    sections: [
      {
        heading: "The pressure you're under",
        body: "PCI DSS for card data, SOX and internal audit for financial reporting, DORA and OSFI-style operational-resilience expectations, and a threat model that assumes motivated, funded attackers. Every control has to be demonstrable, and third-party and cloud concentration risk now sits on the board agenda.",
      },
      {
        heading: "What we do here",
        body: "Independent assessments against NIST CSF 2.0, ISO 27001 and CIS v8; identity and privileged-access hardening in Entra ID; cloud posture and segmentation reviews; and 24/7 managed detection tuned to reduce alert noise rather than add to it. Every finding carries a severity, a business impact, and a named owner.",
      },
      {
        heading: "What you walk away with",
        body: "A risk register mapped to the frameworks you already report against, a remediation roadmap sequenced by risk, and re-test evidence that closes findings only when the fix holds — the artefacts your auditors and regulators ask for by name.",
      },
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    lede: "Patient data, connected medical devices and 24/7 uptime, all under HIPAA and a ransomware threat that treats hospitals as soft targets. We help you prove care isn't the thing at risk.",
    sections: [
      {
        heading: "The pressure you're under",
        body: "HIPAA and HITECH obligations, legacy and unpatchable medical devices on the same networks as clinical systems, and ransomware crews that specifically target providers because downtime is life-threatening. Segmentation, backup integrity and identity are where the real exposure sits.",
      },
      {
        heading: "What we do here",
        body: "Network segmentation and IoT/OT device reviews, identity and access governance, backup and disaster-recovery assurance, and managed detection and response with runbooks built around clinical uptime. We work inside your change control so nothing we do interrupts care.",
      },
      {
        heading: "What you walk away with",
        body: "A prioritised remediation plan, a segmentation and identity baseline your team can operate, tested recovery evidence, and reporting your compliance and clinical-risk committees can act on.",
      },
    ],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    lede: "IT and OT have converged, and the plant floor is now in scope. We secure the seam between corporate systems and production without stopping the line.",
    sections: [
      {
        heading: "The pressure you're under",
        body: "Flat networks, ageing ICS/SCADA and PLCs that can't be patched on demand, and a growing set of connected sensors and suppliers. A single ransomware event can idle production across sites, and IEC 62443 and customer security requirements are increasingly contractual.",
      },
      {
        heading: "What we do here",
        body: "OT/ICS and IoT security assessments, IT/OT segmentation, third-party and supply-chain risk reviews, and detection engineering that spans both environments. We map to NIST CSF 2.0 and CIS v8 with an OT lens, and we plan changes around maintenance windows, not against them.",
      },
      {
        heading: "What you walk away with",
        body: "A segmentation and monitoring design for the IT/OT boundary, a supplier-risk view, and a remediation roadmap that reduces the blast radius of an incident without disrupting throughput.",
      },
    ],
  },
  {
    slug: "public-sector",
    name: "Public sector",
    lede: "Public money, public scrutiny and citizen data raise the bar on evidence and value. We deliver both, and leave your people able to run it.",
    sections: [
      {
        heading: "The pressure you're under",
        body: "Framework mandates and audit expectations, constrained budgets and procurement rules, legacy estates, and the reputational cost of a breach involving citizen data. You need work that is demonstrably rigorous and demonstrably good value.",
      },
      {
        heading: "What we do here",
        body: "Assessments mapped to NIST CSF 2.0, ISO 27001 and CIS v8, identity and zero-trust architecture, cloud posture management, and managed detection — delivered as advise, implement or operate so you buy only the mode you need, with least-privilege access that expires.",
      },
      {
        heading: "What you walk away with",
        body: "Board- and auditor-ready reporting, a roadmap sequenced by risk and cost, and deliverables — baselines, runbooks, registers — your own teams can operate and defend at review.",
      },
    ],
  },
  {
    slug: "saas",
    name: "SaaS & technology",
    lede: "Your customers' security questionnaires are now part of your sales cycle. We turn SOC 2 and a defensible cloud posture into something you can pass — and prove.",
    sections: [
      {
        heading: "The pressure you're under",
        body: "SOC 2 and ISO 27001 as table stakes for enterprise deals, multi-tenant cloud architecture where a single misconfiguration is a company-ending event, fast-moving engineering, and — increasingly — AI features that widen the attack surface faster than anyone can review them.",
      },
      {
        heading: "What we do here",
        body: "SOC 2 / ISO 27001 readiness, cloud security and landing-zone reviews on Azure and AWS, secure-SDLC and application security, identity and tenant hardening, and AI/LLM security for the copilots and agents you've shipped. We integrate with how your engineers already work.",
      },
      {
        heading: "What you walk away with",
        body: "A gap assessment against the standard your buyers ask for, a cloud and identity hardening baseline, and remediation evidence you can hand to auditors and prospects alike — shortening the security review that stands between you and the deal.",
      },
    ],
  },
];

export const INDUSTRY_SLUGS = INDUSTRIES.map((i) => i.slug);

export function getIndustry(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}
