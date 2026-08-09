import Link from "next/link";
import { Container, Eyebrow, Button } from "@/components/ui";
// (Reveal retired on this page in favour of the framer-motion cinematic wrappers.)
import { FrameworkMarquee } from "@/components/marketing/FrameworkMarquee";
import { HeroVisual } from "@/components/marketing/HeroVisual";
import { CinematicSection, CinematicGroup, CinematicItem } from "@/components/marketing/Cinematic";
import { ServicesOverview } from "@/components/marketing/ServicesOverview";
import { ApproachStrip } from "@/components/marketing/ApproachStrip";
import { EvidenceBand } from "@/components/marketing/EvidenceBand";
import { InsightsTeaser } from "@/components/marketing/InsightsTeaser";
import { ContactCTA } from "@/components/marketing/ContactCTA";

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
      {/* Hero — beacon-spectrum re-theme: an animated gradient field behind a
          bold centered statement, wiz-register energy on our own palette. All
          motion is transform-only and reduced-motion gated; no backdrop-filter. */}
      <section className="relative overflow-hidden border-b border-rule">
        {/* Ambient spectrum blobs */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div
            className="blob-a absolute -top-[30%] left-[8%] h-[70%] w-[46%] rounded-full opacity-60 blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, color-mix(in oklab, var(--color-teal) 26%, transparent), transparent)",
            }}
          />
          <div
            className="blob-b absolute -top-[20%] right-[4%] h-[75%] w-[44%] rounded-full opacity-60 blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, color-mix(in oklab, var(--color-violet) 22%, transparent), transparent)",
            }}
          />
          <div
            className="absolute bottom-[-10%] left-[35%] h-[50%] w-[38%] rounded-full opacity-50 blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, color-mix(in oklab, var(--color-sky) 20%, transparent), transparent)",
            }}
          />
        </div>

        <Container className="relative pt-20 pb-20 md:pt-32 md:pb-32">
          <div className="grid grid-cols-1 items-center gap-x-16 gap-y-16 lg:grid-cols-2">
            {/* Statement — nothing but the essentials, given room to breathe. */}
            <div>
              <h1 className="anim-hero-title max-w-xl text-display text-ink text-balance">
                Know what&apos;s exposed.{" "}
                <span className="spectrum-text">Prove it&apos;s fixed.</span>
              </h1>
              <p className="anim-rise anim-delay-1 mt-7 max-w-md text-lede text-slate">
                Security consulting and 24/7 managed detection, mapped to the
                frameworks your auditors already trust.
              </p>
              <div className="anim-rise anim-delay-2 mt-10 flex flex-wrap items-center gap-4">
                <Button href="/contact">Book an assessment</Button>
                <Button href="/posture" variant="ghost">
                  Check your posture
                </Button>
              </div>
            </div>

            {/* One floating product card */}
            <div className="anim-rise anim-delay-2 px-2 sm:px-6 lg:px-0">
              <HeroVisual />
            </div>
          </div>
        </Container>

        {/* Signature spectrum rule closes the hero. The full 176-row control
            register lives on /controls — a click away for diligence-minded
            buyers, off the front page so the homepage reads like a firm, not a
            spreadsheet (Accenture/Deloitte-style IA). */}
        <div aria-hidden="true" className="spectrum-bar h-[3px] w-full" />
      </section>

      {/* Capability row — the standards a buyer's auditors already know */}
      <FrameworkMarquee />

      {/* Live demos — invite exploration */}
      <Container as="section" className="py-20 md:py-32">
        <CinematicSection className="mb-12 max-w-measure">
          <Eyebrow index={2}>Try it live</Eyebrow>
          <h2 className="mt-3 text-h2 text-ink text-balance">
            See how we think — before you talk to us.
          </h2>
        </CinematicSection>
        <CinematicGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {DEMO_CARDS.map((c) => (
            <CinematicItem key={c.href} className="h-full">
              <Link
                href={c.href}
                className="card-lift group flex h-full flex-col justify-between rounded-2xl border border-rule bg-surface p-7 hover:border-pine md:p-9"
              >
                <div>
                  <span aria-hidden="true" className="spectrum-bar block h-1 w-10 rounded-full" />
                  <h3 className="mt-5 font-display text-h3 leading-tight text-ink">{c.title}</h3>
                  <p className="mt-3 max-w-md text-body text-slate">{c.desc}</p>
                </div>
                <span
                  aria-hidden="true"
                  className="mt-8 inline-block font-mono text-mono-xs uppercase tracking-mono text-pine transition-transform duration-150 ease-doc group-hover:translate-x-1"
                >
                  Try it →
                </span>
              </Link>
            </CinematicItem>
          ))}
        </CinematicGroup>
      </Container>

      <CinematicSection>
        <ServicesOverview index={3} />
      </CinematicSection>
      <CinematicSection>
        <ApproachStrip index={4} />
      </CinematicSection>
      <CinematicSection>
        <EvidenceBand index={5} />
      </CinematicSection>
      <CinematicSection>
        <InsightsTeaser index={6} />
      </CinematicSection>

      <ContactCTA />
    </>
  );
}
