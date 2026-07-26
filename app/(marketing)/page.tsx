import { Container, Button, Eyebrow, CountUp } from "@/components/ui";
import { ControlRegister } from "@/components/marketing/ControlRegister";
import { ServicesIndex } from "@/components/marketing/ServicesIndex";
import { ApproachStrip } from "@/components/marketing/ApproachStrip";
import { EvidenceBand } from "@/components/marketing/EvidenceBand";
import { InsightsTeaser } from "@/components/marketing/InsightsTeaser";
import { ContactCTA } from "@/components/marketing/ContactCTA";
import { SERVICE_LIST } from "@/content/services";
import { CONTROLS } from "@/content/controls";

export default function HomePage() {
  return (
    <>
      {/* Hero — the buyer's question answered, with the register as the proof */}
      <Container className="pt-16 pb-14 md:pt-24 md:pb-20">
        <Eyebrow index={1} className="mb-6 anim-rise">
          Security consulting &amp; managed detection
        </Eyebrow>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <h1 className="anim-hero-title text-display text-ink">
              We tell you what&apos;s actually exposed — and prove it&apos;s fixed.
            </h1>
          </div>
          <div className="flex flex-col justify-end lg:col-span-5">
            <p className="anim-rise anim-delay-1 max-w-measure text-lede text-slate">
              A security consultancy for 200–5,000-seat organisations. We map your
              controls to NIST CSF, ISO 27001, and CIS, close the gaps that matter,
              and hand you the evidence — not a slide about our journey.
            </p>
            <div className="anim-rise anim-delay-2 mt-8 flex flex-wrap items-center gap-4">
              <Button href="/contact">Book an assessment</Button>
              <Button href="/services" variant="secondary">
                See all services
              </Button>
            </div>
          </div>
        </div>
      </Container>

      {/* The Control Register — the hero art (§3.4) */}
      <Container className="pb-16 md:pb-24">
        <div className="rounded-lg border border-rule bg-paper p-4 md:p-8">
          <ControlRegister scrollable />
          <p className="mt-4 border-t border-rule pt-4 font-mono text-mono-xs uppercase text-slate/80">
            <CountUp value={CONTROLS.length} /> controls · <CountUp value={SERVICE_LIST.length} /> services · verified against the published frameworks
          </p>
        </div>
      </Container>

      <div className="border-t border-rule" />

      <ServicesIndex index={2} />
      <ApproachStrip index={3} />
      <EvidenceBand index={4} />
      <InsightsTeaser index={5} />

      <ContactCTA />
    </>
  );
}
