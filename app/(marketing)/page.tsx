import Link from "next/link";
import { Container, Eyebrow, CountUp, Reveal, Button } from "@/components/ui";
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

        <Container className="relative pt-16 pb-10 text-center md:pt-24 md:pb-12">
          <p className="anim-rise mx-auto inline-flex items-center gap-2 rounded-full border border-rule bg-surface/80 px-4 py-1.5 font-mono text-mono-xs uppercase tracking-mono text-slate">
            <span aria-hidden="true" className="spectrum-bar h-1.5 w-6 rounded-full" />
            Evidence-led security consulting
          </p>
          <h1 className="anim-hero-title mx-auto mt-7 max-w-4xl text-display text-ink text-balance">
            We tell you what&apos;s actually exposed —{" "}
            <span className="spectrum-text">and prove it&apos;s fixed.</span>
          </h1>
          <p className="anim-rise anim-delay-1 mx-auto mt-7 max-w-2xl text-lede text-slate text-balance">
            A security consultancy for 200–5,000-seat organisations. We map your
            controls to NIST CSF 2.0, ISO 27001:2022 and CIS v8, close the gaps that
            matter, and hand you the evidence.
          </p>
          <div className="anim-rise anim-delay-2 mt-9 flex flex-wrap items-center justify-center gap-4">
            <Button href="/contact">Book an assessment</Button>
            <Button href="/posture" variant="secondary">
              Take the 2-minute posture check
            </Button>
          </div>
          <dl className="anim-rise anim-delay-3 mx-auto mt-12 grid w-fit grid-cols-3 gap-x-10 gap-y-1 md:gap-x-16">
            {[
              [SERVICE_LIST.length, "Services"],
              [12, "Practice areas"],
              [CONTROLS.length, "Verified controls"],
            ].map(([n, label]) => (
              <div key={label as string}>
                <dt className="sr-only">{label}</dt>
                <dd className="font-display text-h2 text-ink">
                  <CountUp value={n as number} />
                </dd>
                <dd className="font-mono text-mono-xs uppercase tracking-mono text-slate">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
          <p className="anim-rise anim-delay-3 mt-5">
            <Link
              href="/controls"
              className="font-mono text-mono-xs uppercase tracking-mono text-slate underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-slate"
            >
              See the full control register →
            </Link>
          </p>
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
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {DEMO_CARDS.map((c, i) => (
            <Reveal key={c.href} delay={i * 90} className="h-full">
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
