import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow, Chip } from "@/components/ui";
import { ContactCTA } from "@/components/marketing/ContactCTA";
import { INDUSTRIES } from "@/content/industries";

export const metadata: Metadata = {
  title: "About",
  description:
    "Cairn Security is an evidence-led security consultancy and managed security services provider for 200–5,000-seat organisations.",
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
          Cairn Security is a consultancy and managed security services provider
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
            We work as an extension of your team, inside your change control, with
            least-privilege access that expires. Nothing we do leaves you dependent on
            us to run your own environment — the deliverable is always something your
            people can operate, verify, and take to a board or an auditor.
          </p>
        </div>
      </Container>

      <Container as="section" className="border-t border-rule py-16 md:py-24">
        <Eyebrow index={2} className="mb-8">
          Standards &amp; credentials
        </Eyebrow>
        <div className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
          <div>
            <p className="mb-4 max-w-measure text-body text-slate">
              Every engagement is mapped to recognised frameworks, so the work is
              portable across the audits you already answer to:
            </p>
            <ul className="flex flex-wrap gap-2">
              <li><Chip>NIST CSF 2.0</Chip></li>
              <li><Chip>ISO/IEC 27001:2022</Chip></li>
              <li><Chip>CIS Controls v8</Chip></li>
              <li><Chip>SOC 2</Chip></li>
              <li><Chip>OWASP</Chip></li>
              <li><Chip>MITRE ATT&amp;CK</Chip></li>
            </ul>
          </div>
          <p className="max-w-measure text-body text-slate">
            We share our consultants&apos; certifications, partner tiers, and client
            references on request during scoping — and, on principle, we never display
            a badge or a logo we can&apos;t stand behind. That restraint is the point:
            it&apos;s the same discipline we bring to your evidence.
          </p>
        </div>
      </Container>

      <Container as="section" className="border-t border-rule py-16 md:py-24">
        <Eyebrow index={3} className="mb-8">
          Industries we work in
        </Eyebrow>
        <ul className="flex flex-wrap gap-3">
          {INDUSTRIES.map((industry) => (
            <li key={industry.slug}>
              <Link href={`/industries/${industry.slug}`} aria-label={`${industry.name} security`}>
                <Chip className="transition-colors hover:border-pine hover:text-pine">
                  {industry.name} →
                </Chip>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-measure text-body text-slate">
          The regulations differ — PCI DSS and OSFI in financial services, HIPAA in
          healthcare, IT/OT convergence in manufacturing — but the method holds: map
          the controls, sequence the risk, and prove the fix.
        </p>
      </Container>

      <ContactCTA />
    </>
  );
}
