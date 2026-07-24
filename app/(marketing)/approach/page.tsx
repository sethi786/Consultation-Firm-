import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui";
import { ApproachStrip } from "@/components/marketing/ApproachStrip";
import { ContactCTA } from "@/components/marketing/ContactCTA";

export const metadata: Metadata = {
  title: "Approach",
  description:
    "How a Northport engagement runs: scope, assess, report, remediate, verify — with a findings register and evidence at the end, not a slide deck.",
  alternates: { canonical: "/approach" },
};

const PRINCIPLES = [
  {
    title: "Evidence, not adjectives",
    body: "Every finding carries a reproduction, a framework reference, and a severity you can defend to a board. We don't grade our own homework — verification is a separate step with its own evidence.",
  },
  {
    title: "The register is the spine",
    body: "One control register ties the assessment, the remediation plan, and the portal together. You see the same NIST CSF, ISO 27001, and CIS references from the first call to the final retest.",
  },
  {
    title: "We fix what's reachable first",
    body: "Findings are sequenced by exploitability and blast radius, not by a scanner's alphabetical list. The first thing we close is the thing most likely to be used against you.",
  },
  {
    title: "Your team keeps the keys",
    body: "We work inside change control, with least-privilege access that expires. Nothing we do leaves you dependent on us to run your own environment.",
  },
];

export default function ApproachPage() {
  return (
    <>
      <Container className="pt-14 pb-8 md:pt-20">
        <Eyebrow className="mb-5">Approach</Eyebrow>
        <h1 className="max-w-measure text-display text-ink">
          A method a CISO can defend.
        </h1>
        <p className="mt-4 max-w-measure text-lede text-slate">
          We run engagements the way we’d want a firm to run one against us: scoped
          in writing, tested by hand where it matters, reported with evidence, and
          verified before anything is called closed.
        </p>
      </Container>

      <ApproachStrip index={1} />

      <Container as="section" className="py-16 md:py-24">
        <Eyebrow index={2} className="mb-10">
          What that means in practice
        </Eyebrow>
        <div className="grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="border-t border-rule pt-6">
              <h2 className="text-h2 text-ink">{p.title}</h2>
              <p className="mt-3 max-w-measure text-body text-slate">{p.body}</p>
            </div>
          ))}
        </div>
      </Container>

      <Container as="section" className="border-t border-rule py-16 md:py-24">
        <Eyebrow index={3} className="mb-8">
          The team
        </Eyebrow>
        <p className="max-w-measure text-body text-slate">
          {"{{TODO: the team's actual credentials — named consultants, certifications "}
          (OSCP, CISSP, GIAC, Azure/AWS), and years in practice. Buyers weigh who
          does the work; do not generalise or invent.{"}}"}
        </p>
      </Container>

      <ContactCTA />
    </>
  );
}
