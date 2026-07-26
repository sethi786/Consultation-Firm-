import Link from "next/link";
import { Container, Eyebrow, CountUp, Reveal } from "@/components/ui";
import { ControlRegister } from "@/components/marketing/ControlRegister";
import { HeroSpotlight } from "@/components/marketing/HeroSpotlight";
import { FrameworkMarquee } from "@/components/marketing/FrameworkMarquee";
import { ServicesOverview } from "@/components/marketing/ServicesOverview";
import { ApproachStrip } from "@/components/marketing/ApproachStrip";
import { EvidenceBand } from "@/components/marketing/EvidenceBand";
import { InsightsTeaser } from "@/components/marketing/InsightsTeaser";
import { CredibilityBand } from "@/components/marketing/CredibilityBand";
import { ContactCTA } from "@/components/marketing/ContactCTA";
import { SERVICE_LIST, DOMAINS } from "@/content/services";
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
      {/* Hero — centered, big, airy, with a live pointer-follow aurora */}
      <section className="relative overflow-hidden">
        <HeroSpotlight />
        <Container className="relative pt-24 pb-20 text-center md:pt-36 md:pb-28">
          <span className="anim-rise mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-rule bg-surface/70 px-4 py-1.5 font-mono text-mono-xs uppercase text-slate backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-pine" />
            Security consulting &amp; managed detection
          </span>
          <h1 className="anim-hero-title mx-auto max-w-5xl text-display text-ink text-balance">
            We tell you what&apos;s actually exposed — and{" "}
            <span className="text-pine">prove it&apos;s fixed.</span>
          </h1>
          <p className="anim-rise anim-delay-1 mx-auto mt-8 max-w-2xl text-lede text-slate text-balance">
            A security consultancy for 200–5,000-seat organisations. We map your
            controls to NIST CSF, ISO 27001 and CIS, close the gaps that matter, and
            hand you the evidence.
          </p>
          <div className="anim-rise anim-delay-2 mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-pine px-7 py-3.5 font-body text-small font-medium text-white transition-colors hover:bg-pine-lift"
            >
              Book an assessment
            </Link>
            <Link
              href="/explore"
              className="rounded-full border border-ink/15 bg-surface px-7 py-3.5 font-body text-small font-medium text-ink transition-colors hover:border-ink/40"
            >
              Explore live demos →
            </Link>
          </div>
          <p className="anim-rise anim-delay-3 mt-10 font-mono text-mono-xs uppercase text-slate/70">
            {SERVICE_LIST.length} services · {DOMAINS.length} categories · NIST CSF · ISO 27001 · CIS
          </p>
        </Container>
      </section>

      {/* Capability ticker */}
      <FrameworkMarquee />

      {/* Live demos — invite exploration immediately */}
      <Container as="section" className="py-20 md:py-28">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Eyebrow index={2} className="text-center">Try it live</Eyebrow>
          <h2 className="mt-3 text-h2 text-ink text-balance">
            See how we think — before you talk to us.
          </h2>
          <p className="mt-4 text-body text-slate">
            Four hands-on tools, right in your browser. Nothing to install, nothing leaves the page.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {DEMO_CARDS.map((c, i) => (
            <Reveal key={c.href} delay={i * 90} className="h-full">
              <Link
                href={c.href}
                className="sheen group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-rule bg-surface p-8 transition-all duration-300 ease-doc hover:-translate-y-1 hover:border-pine hover:shadow-pop-sm md:p-10"
              >
                <div>
                  <span className="font-mono text-mono-xs uppercase text-slate/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-h3 leading-tight text-ink">{c.title}</h3>
                  <p className="mt-3 max-w-md text-body text-slate">{c.desc}</p>
                </div>
                <span
                  aria-hidden="true"
                  className="mt-8 inline-block font-mono text-mono-xs uppercase text-pine transition-transform duration-300 ease-doc group-hover:translate-x-1"
                >
                  Try it →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>

      {/* The Control Register — the credibility anchor (§3.4) */}
      <section className="border-t border-rule bg-paper-sunk/40">
        <Container className="py-20 md:py-28">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Eyebrow index={3} className="text-center">The control register</Eyebrow>
            <h2 className="mt-3 text-h2 text-ink text-balance">
              Every service, mapped to the controls it moves.
            </h2>
            <p className="mt-4 text-body text-slate">
              Real framework references — NIST CSF 2.0, ISO 27001:2022 and CIS v8 — with a
              current-to-target maturity read on each row.
            </p>
          </div>
          <div className="rounded-2xl border border-rule bg-surface p-4 md:p-8">
            <ControlRegister scrollable />
            <p className="mt-4 border-t border-rule pt-4 font-mono text-mono-xs uppercase text-slate/80">
              <CountUp value={CONTROLS.length} /> controls · <CountUp value={SERVICE_LIST.length} /> services · verified against the published frameworks
            </p>
          </div>
        </Container>
      </section>

      <ServicesOverview index={4} />
      <ApproachStrip index={5} />
      <EvidenceBand index={6} />
      <InsightsTeaser index={7} />
      <CredibilityBand index={8} />

      <ContactCTA />
    </>
  );
}
