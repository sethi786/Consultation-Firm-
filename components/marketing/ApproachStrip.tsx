import { Container, Eyebrow } from "@/components/ui";

/**
 * The engagement process (§3.5): the one place numbered markers are used because
 * order genuinely matters. Scope → Assess → Report → Remediate → Verify.
 */
export const ENGAGEMENT_STEPS = [
  {
    name: "Scope",
    detail:
      "We agree what's in scope, what success looks like, and the rules of engagement — in writing, before anyone touches a system.",
  },
  {
    name: "Assess",
    detail:
      "We test against the frameworks and your architecture, by hand where it matters, and record every finding with evidence.",
  },
  {
    name: "Report",
    detail:
      "You get a findings register and a board-ready report — severities, business impact, and a remediation plan with owners.",
  },
  {
    name: "Remediate",
    detail:
      "We fix alongside your team or hand a plan your engineers can execute. Either way the plan is specific, not aspirational.",
  },
  {
    name: "Verify",
    detail:
      "We retest what was fixed and mark it closed only when the evidence holds. Findings don't self-certify.",
  },
];

export function ApproachStrip({ index = 3 }: { index?: number }) {
  return (
    <section className="border-y border-rule bg-paper-sunk/30">
      <Container className="py-16 md:py-24">
        <Eyebrow index={index} className="mb-10">
          How an engagement runs
        </Eyebrow>
        <ol className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {ENGAGEMENT_STEPS.map((step, i) => (
            <li key={step.name} className="flex flex-col gap-3">
              <span className="font-mono text-mono-xs text-brass-lift">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-h3 text-ink">{step.name}</h3>
              <p className="text-small text-slate">{step.detail}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
