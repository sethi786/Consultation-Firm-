import Link from "next/link";
import { Container, Eyebrow, CountUp, Reveal, Button } from "@/components/ui";
import { ControlRegister } from "@/components/marketing/ControlRegister";
import { FrameworkMarquee } from "@/components/marketing/FrameworkMarquee";
import { ServicesOverview } from "@/components/marketing/ServicesOverview";
import { ApproachStrip } from "@/components/marketing/ApproachStrip";
import { EvidenceBand } from "@/components/marketing/EvidenceBand";
import { InsightsTeaser } from "@/components/marketing/InsightsTeaser";
import { CredibilityBand } from "@/components/marketing/CredibilityBand";
import { ContactCTA } from "@/components/marketing/ContactCTA";
import { SERVICE_LIST } from "@/content/services";
import { CONTROLS } from "@/content/controls";

const DEMO_CARDS = [
  {
    href: "/explore#maturity",
    title: "Score your maturity",
    desc: "Six questions, an instant maturity band and your focus areas.",
  },
  {
    href: "/explore#posture",
    title: "Calculate cloud & AI posture",
    desc: "Flip your controls and watch a live posture score move.",
  },
  {
    href: "/explore#zero-trust",
    title: "Contain a breach",
    desc: "Switch on zero-trust gates and stop an attack in its tracks.",
  },
  {
    href: "/explore#findings",
    title: "Open a findings register",
    desc: "Explore the live product view clients work in after an engagement.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero — the Control Register IS the hero (§3.4): an evidence-led statement,
          left-aligned on the grid with a margin annotation, not a headline over a
          gradient. Calm, documentary. */}
      <section className="border-b border-rule">
        <Container className="pt-12 pb-10 md:pt-16 md:pb-12">
          <div className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="font-mono text-mono-xs uppercase tracking-mono text-slate">
                § 01 — Waypoint
              </p>
              <p className="mt-3 max-w-xs font-mono text-mono-xs uppercase leading-relaxed tracking-mono text-slate/70">
                Evidence-led security consulting &amp; managed detection
              </p>
            </div>
            <div className="md:col-span-9">
              <h1 className="anim-hero-title max-w-4xl text-h1 text-ink text-balance">
                We tell you what&apos;s actually exposed — and prove it&apos;s fixed.
              </h1>
              <p className="anim-rise anim-delay-1 mt-6 max-w-measure text-lede text-slate">
                A security consultancy for 200–5,000-seat organisations. We map your
                controls to NIST CSF 2.0, ISO 27001:2022 and CIS v8, close the gaps that
                matter, and hand you the evidence.
              </p>
              <div className="anim-rise anim-delay-2 mt-8 flex flex-wrap items-center gap-4">
                <Button href="/contact">Book an assessment</Button>
                <Button href="/posture" variant="ghost">
                  Take the 2-minute posture check
                </Button>
              </div>
            </div>
          </div>
        </Container>

        {/* The register itself — above the fold, the credibility anchor. */}
        <Container className="pb-12 md:pb-16">
          <div className="rounded-lg border border-rule bg-surface p-4 md:p-7">
            <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2 border-b border-rule pb-4">
              <h2 className="text-h3 text-ink">Every service, mapped to the controls it moves.</h2>
              <p className="font-mono text-mono-xs uppercase tracking-mono text-slate/80">
                NIST CSF 2.0 · ISO 27001:2022 · CIS v8
              </p>
            </div>
            <ControlRegister scrollable />
            <p className="mt-4 border-t border-rule pt-4 font-mono text-mono-xs uppercase tracking-mono text-slate/80">
              <CountUp value={CONTROLS.length} /> controls · <CountUp value={SERVICE_LIST.length} /> services · verified against the published frameworks
            </p>
          </div>
        </Container>
      </section>

      {/* Capability row — the standards a buyer's auditors already know */}
      <FrameworkMarquee />

      {/* Live demos — invite exploration */}
      <Container as="section" className="py-14 md:py-24">
        <div className="mb-10 max-w-measure">
          <Eyebrow index={2}>Try it live</Eyebrow>
          <h2 className="mt-3 text-h2 text-ink text-balance">
            See how we think — before you talk to us.
          </h2>
          <p className="mt-4 text-body text-slate">
            Four hands-on tools, right in your browser. Nothing to install, nothing leaves the page.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-rule bg-rule sm:grid-cols-2">
          {DEMO_CARDS.map((c, i) => (
            <Reveal key={c.href} delay={i * 90} className="h-full bg-surface">
              <Link
                href={c.href}
                className="group flex h-full flex-col justify-between p-7 transition-colors duration-150 ease-doc hover:bg-paper-sunk/50 md:p-9"
              >
                <div>
                  <span className="font-mono text-mono-xs uppercase tracking-mono text-slate/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-h3 leading-tight text-ink">{c.title}</h3>
                  <p className="mt-3 max-w-md text-body text-slate">{c.desc}</p>
                </div>
                <span
                  aria-hidden="true"
                  className="mt-8 inline-block font-mono text-mono-xs uppercase tracking-mono text-pine transition-transform duration-150 ease-doc group-hover:translate-x-0.5"
                >
                  Try it →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>

      <ServicesOverview index={3} />
      <ApproachStrip index={4} />
      <EvidenceBand index={5} />
      <InsightsTeaser index={6} />
      <CredibilityBand index={7} />

      <ContactCTA />
    </>
  );
}
