import Link from "next/link";
import { Container, Eyebrow, CountUp } from "@/components/ui";
import { ControlRegister } from "@/components/marketing/ControlRegister";
import { ServicesIndex } from "@/components/marketing/ServicesIndex";
import { ApproachStrip } from "@/components/marketing/ApproachStrip";
import { EvidenceBand } from "@/components/marketing/EvidenceBand";
import { InsightsTeaser } from "@/components/marketing/InsightsTeaser";
import { CredibilityBand } from "@/components/marketing/CredibilityBand";
import { ContactCTA } from "@/components/marketing/ContactCTA";
import { SERVICE_LIST, DOMAINS } from "@/content/services";
import { CONTROLS } from "@/content/controls";
import { DOMAIN_ACCENT, ACCENTS } from "@/lib/accent";

const DEMO_CARDS = [
  {
    href: "/explore#maturity",
    title: "Score your maturity",
    desc: "Six questions, an instant maturity band and your focus areas.",
    solid: "bg-coral",
  },
  {
    href: "/explore#posture",
    title: "Calculate cloud & AI posture",
    desc: "Flip your controls and watch a live posture score move.",
    solid: "bg-sky",
  },
  {
    href: "/explore#zero-trust",
    title: "Contain a breach",
    desc: "Switch on zero-trust gates and stop an attack in its tracks.",
    solid: "bg-violet",
  },
  {
    href: "/explore#findings",
    title: "Open a findings register",
    desc: "Explore the live product view clients work in after an engagement.",
    solid: "bg-indigo",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero — bright, colourful, high-energy */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(45% 55% at 8% 4%, rgba(255,90,60,0.16), transparent 60%), radial-gradient(45% 55% at 92% 0%, rgba(124,58,237,0.16), transparent 60%), radial-gradient(55% 60% at 60% 115%, rgba(14,165,233,0.14), transparent 60%)",
          }}
        />
        <Container className="relative pt-16 pb-14 md:pt-24 md:pb-20">
          <span className="anim-rise mb-6 inline-flex items-center gap-2 rounded-full border border-rule bg-white/70 px-4 py-1.5 font-mono text-mono-xs uppercase text-slate backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-coral" />
            Security consulting &amp; managed detection
          </span>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <h1 className="anim-hero-title text-display text-ink">
                We tell you what&apos;s actually exposed — and{" "}
                <span className="text-coral-ink">prove it&apos;s fixed.</span>
              </h1>
            </div>
            <div className="flex flex-col justify-end lg:col-span-5">
              <p className="anim-rise anim-delay-1 max-w-measure text-lede text-slate">
                A security consultancy for 200–5,000-seat organisations. We map your
                controls to NIST CSF, ISO 27001, and CIS, close the gaps that matter,
                and hand you the evidence — not a slide about our journey.
              </p>
              <div className="anim-rise anim-delay-2 mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/contact"
                  className="rounded-full bg-coral px-6 py-3 font-body text-small font-medium text-white shadow-pop-sm transition-transform hover:-translate-y-0.5"
                >
                  Book an assessment
                </Link>
                <Link
                  href="/explore"
                  className="rounded-full border border-ink/15 bg-white px-6 py-3 font-body text-small font-medium text-ink transition-colors hover:border-ink/40"
                >
                  Explore live demos →
                </Link>
              </div>
            </div>
          </div>

          {/* Domain pills — the estate, colour-coded */}
          <div className="anim-rise anim-delay-3 mt-12 flex flex-wrap gap-2">
            {DOMAINS.map((d) => {
              const a = ACCENTS[DOMAIN_ACCENT[d]];
              return (
                <span
                  key={d}
                  className={`inline-flex items-center gap-2 rounded-full ${a.softBg} px-3.5 py-1.5 font-mono text-mono-xs uppercase ${a.softText}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${a.dot}`} />
                  {d}
                </span>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Live demos — invite exploration immediately */}
      <Container as="section" className="pb-16 md:pb-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow index={2}>Try it live</Eyebrow>
            <h2 className="mt-2 text-h2 text-ink">Browse the demos, then book.</h2>
          </div>
          <Link
            href="/explore"
            className="font-body text-small text-coral-ink underline decoration-coral/40 underline-offset-4 hover:decoration-coral"
          >
            Open the explorer →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DEMO_CARDS.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className={`group flex flex-col justify-between rounded-3xl ${c.solid} p-6 text-white shadow-pop-sm transition-transform duration-300 ease-doc hover:-translate-y-1`}
            >
              <h3 className="font-display text-h3 leading-tight text-white">{c.title}</h3>
              <p className="mt-3 text-small text-white/85">{c.desc}</p>
              <span
                aria-hidden="true"
                className="mt-6 inline-block font-mono text-mono-xs uppercase text-white/90 transition-transform duration-300 ease-doc group-hover:translate-x-1"
              >
                Try it →
              </span>
            </Link>
          ))}
        </div>
      </Container>

      {/* The Control Register — the credibility anchor (§3.4) */}
      <Container className="pb-16 md:pb-24">
        <div className="rounded-3xl border border-rule bg-white p-4 shadow-pop-sm md:p-8">
          <ControlRegister scrollable />
          <p className="mt-4 border-t border-rule pt-4 font-mono text-mono-xs uppercase text-slate/80">
            <CountUp value={CONTROLS.length} /> controls · <CountUp value={SERVICE_LIST.length} /> services · verified against the published frameworks
          </p>
        </div>
      </Container>

      <div className="border-t border-rule" />

      <ServicesIndex index={3} />
      <ApproachStrip index={4} />
      <EvidenceBand index={5} />
      <InsightsTeaser index={6} />
      <CredibilityBand index={7} />

      <ContactCTA />
    </>
  );
}
