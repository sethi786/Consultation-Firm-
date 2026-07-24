import type { Metadata } from "next";
import { Container, Eyebrow, Chip } from "@/components/ui";
import { ContactCTA } from "@/components/marketing/ContactCTA";

export const metadata: Metadata = {
  title: "About",
  description:
    "Northport Security is an evidence-led security consultancy and managed security services provider for 200–5,000-seat organisations.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Container className="pt-14 pb-8 md:pt-20">
        <Eyebrow className="mb-5">About</Eyebrow>
        <h1 className="max-w-measure text-display text-ink">
          A security firm that reads like a report.
        </h1>
        <p className="mt-4 max-w-measure text-lede text-slate">
          Northport Security is a consultancy and managed security services provider
          for organisations of 200–5,000 seats. We sell evidence, not fear — and the
          site you’re on is built to the same standard as the work.
        </p>
      </Container>

      <Container as="section" className="border-t border-rule py-16 md:py-24">
        <Eyebrow index={1} className="mb-8">
          What we are
        </Eyebrow>
        <div className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
          <p className="max-w-measure text-body text-slate">
            We assess, advise, and operate: security and cloud assessments, identity
            and zero-trust architecture, AI system security, compliance readiness, and
            24/7 managed detection and response. The through-line is the control
            register — real framework references, current and target maturity, and a
            plan sequenced by risk.
          </p>
          <p className="max-w-measure text-body text-slate">
            {"{{TODO: the firm's real history, size, and locations. Where you're "}
            based, how long you’ve operated, and the data-residency posture buyers in
            regulated sectors will ask about.{"}}"}
          </p>
        </div>
      </Container>

      <Container as="section" className="border-t border-rule py-16 md:py-24">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <Eyebrow index={2}>Certifications &amp; partnerships</Eyebrow>
          <Chip>To confirm</Chip>
        </div>
        <p className="max-w-measure text-body text-slate">
          {"{{TODO: real certifications and partner tiers — e.g. Microsoft Solutions "}
          Partner, AWS Partner, CrowdStrike — with proof buyers can verify. Do not
          display a partner badge the firm does not hold.{"}}"}
        </p>
      </Container>

      <Container as="section" className="border-t border-rule py-16 md:py-24">
        <Eyebrow index={3} className="mb-8">
          Industries we work in
        </Eyebrow>
        <ul className="flex flex-wrap gap-3">
          {[
            "Financial services",
            "Healthcare",
            "Manufacturing",
            "Public sector",
            "SaaS",
          ].map((i) => (
            <li key={i}>
              <Chip>{i}</Chip>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-measure text-small text-slate">
          {"{{TODO: sector-specific detail and any regulatory experience (PCI DSS, "}
          HIPAA, OSFI, etc.) once confirmed.{"}}"}
        </p>
      </Container>

      <ContactCTA />
    </>
  );
}
