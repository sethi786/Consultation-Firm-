import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui";
import { ApproachStrip } from "@/components/marketing/ApproachStrip";
import { ContactCTA } from "@/components/marketing/ContactCTA";

export const metadata: Metadata = {
  title: "Approach",
  description:
    "How a Waypoint engagement runs: scope, assess, report, remediate, verify — with a findings register and evidence at the end, not a slide deck.",
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

      <Container as="section" className="py-20 md:py-28">
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

      <Container as="section" className="border-t border-rule py-20 md:py-28">
        <Eyebrow index={3} className="mb-8">
          Who does the work
        </Eyebrow>
        <div className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
          <p className="max-w-measure text-body text-slate">
            The consultant who scopes your engagement is the one who does it. No
            hand-off from a senior name on the pitch to a junior on delivery — the
            person testing your Entra ID tenant or tuning your detections is the one
            who signs the report.
          </p>
          <p className="max-w-measure text-body text-slate">
            You&apos;ll get the named consultants assigned to your engagement, their
            certifications, and relevant references before you commit — as part of
            scoping, not as a marketing claim on a web page. We&apos;d rather show you
            the people than tell you about them.
          </p>
        </div>
      </Container>

      <ContactCTA />
    </>
  );
}
