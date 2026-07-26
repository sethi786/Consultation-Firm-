import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow, Chip } from "@/components/ui";
import { ContactCTA } from "@/components/marketing/ContactCTA";
import { INDUSTRIES } from "@/content/industries";
import { SERVICE_LIST, DOMAINS } from "@/content/services";

export const metadata: Metadata = {
  title: "About",
  description:
    "Waypoint Security is an evidence-led security consultancy and managed security services provider for 200–5,000-seat organisations — built as a firm, not a personality.",
  alternates: { canonical: "/about" },
};

const PRINCIPLES = [
  {
    title: "Evidence over theatre",
    body: "Every claim we make carries a number, a framework reference, or a named artefact. We would rather show you a control mapping than a glowing padlock.",
  },
  {
    title: "Framework-mapped, always",
    body: "Everything ties to NIST CSF 2.0, ISO 27001 and CIS — and NIST AI RMF and ISO 42001 for AI — so the work is portable across every audit you already answer to.",
  },
  {
    title: "Human-in-the-loop",
    body: "We use automation and AI to move faster, but a named practitioner owns every decision. Nothing that changes your environment happens without a person behind it.",
  },
  {
    title: "You stay in control",
    body: "Least-privilege access that expires, and deliverables your own team can operate, verify, and take to a board or an auditor. Nothing leaves you dependent on us.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Container className="pt-14 pb-8 md:pt-20">
        <Eyebrow className="mb-5">About</Eyebrow>
        <h1 className="max-w-4xl text-display text-ink text-balance">
          Security delivered like a firm — not a personality.
        </h1>
        <p className="mt-6 max-w-measure text-lede text-slate">
          Waypoint Security is a security consultancy and managed security services
          provider for organisations of 200–5,000 seats. We sell evidence, not fear —
          and we are built to outlast any one person in the room.
        </p>
        <p className="mt-8 font-mono text-mono-xs uppercase text-slate/70">
          {SERVICE_LIST.length} services · {DOMAINS.length} practice areas · mapped to NIST CSF 2.0 · ISO 27001 · CIS
        </p>
      </Container>

      {/* What we are */}
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

      {/* What we stand for */}
      <section className="border-t border-rule bg-paper-sunk/40">
        <Container className="py-16 md:py-24">
          <Eyebrow index={2} className="mb-10">
            What we stand for
          </Eyebrow>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <div key={p.title} className="rounded-2xl border border-rule bg-surface p-7">
                <span className="font-mono text-mono-xs uppercase text-brass-lift">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-3 text-h3 text-ink">{p.title}</h2>
                <p className="mt-2 text-small text-slate">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How we're built — the firm-not-founder stance */}
      <Container as="section" className="border-t border-rule py-16 md:py-24">
        <Eyebrow index={3} className="mb-8">
          How we&apos;re built
        </Eyebrow>
        <div className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
          <p className="max-w-measure text-body text-ink">
            We are a firm, not a founder&apos;s brand. Engagements are led by a named
            engagement lead and staffed by certified practitioners from our security,
            cloud, and identity practices — so your delivery never hinges on one
            person&apos;s calendar, and the standard you get is the firm&apos;s, not an
            individual&apos;s.
          </p>
          <p className="max-w-measure text-body text-slate">
            That is a deliberate choice. Boards and auditors buy repeatable process and
            institutional accountability, not a personality. Our method, our templates,
            and our quality bar are the same on every engagement, and they are designed
            to be handed over — to your team, to your successor, to your regulator.
          </p>
        </div>
      </Container>

      {/* How we engage */}
      <section className="border-t border-rule bg-paper-sunk/40">
        <Container className="py-16 md:py-24">
          <Eyebrow index={4} className="mb-8">
            How we engage
          </Eyebrow>
          <div className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
            <p className="max-w-measure text-body text-slate">
              Every capability is available in the mode that fits where you are —{" "}
              <Link href="/solutions" className="text-pine underline decoration-pine/40 underline-offset-4 hover:decoration-pine">
                advise, implement, or operate
              </Link>
              . Most clients start with one and grow into the next.
            </p>
            <p className="max-w-measure text-body text-slate">
              Delivery follows the same documented path every time —{" "}
              <Link href="/approach" className="text-pine underline decoration-pine/40 underline-offset-4 hover:decoration-pine">
                scope, assess, report, remediate, verify
              </Link>{" "}
              — with a findings register and evidence at the end, not a slide deck.
            </p>
          </div>
        </Container>
      </section>

      {/* Standards & credentials */}
      <Container as="section" className="border-t border-rule py-16 md:py-24">
        <Eyebrow index={5} className="mb-8">
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
              <li><Chip>NIST AI RMF</Chip></li>
              <li><Chip>ISO/IEC 42001</Chip></li>
              <li><Chip>OWASP</Chip></li>
              <li><Chip>MITRE ATT&amp;CK</Chip></li>
            </ul>
          </div>
          <p className="max-w-measure text-body text-slate">
            We share the firm&apos;s certifications, partner tiers, and client
            references on request during scoping — and, on principle, we never display
            a badge or a logo we can&apos;t stand behind. That restraint is the point:
            it is the same discipline we bring to your evidence.
          </p>
        </div>
      </Container>

      {/* Industries */}
      <section className="border-t border-rule bg-paper-sunk/40">
        <Container className="py-16 md:py-24">
          <Eyebrow index={6} className="mb-8">
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
      </section>

      <ContactCTA />
    </>
  );
}
