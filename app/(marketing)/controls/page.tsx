import type { Metadata } from "next";
import { Container, Eyebrow, CountUp } from "@/components/ui";
import { ControlRegister } from "@/components/marketing/ControlRegister";
import { ContactCTA } from "@/components/marketing/ContactCTA";
import { SERVICE_LIST } from "@/content/services";
import { CONTROLS } from "@/content/controls";

export const metadata: Metadata = {
  title: "Control register",
  description:
    "The full Waypoint control register: every service mapped to the NIST CSF 2.0, ISO/IEC 27001:2022 and CIS Controls v8 controls it moves, with current-to-target maturity on each row.",
  alternates: { canonical: "/controls" },
};

/**
 * The full control register — the deep-dive reference for diligence-minded
 * buyers. Deliberately its own page (Accenture/Deloitte-style IA): the
 * marketing pages stay clean and high-level, and this holds the evidence for
 * whoever asks for it.
 */
export default function ControlsPage() {
  return (
    <>
      <Container className="pt-14 pb-8 md:pt-20">
        <Eyebrow className="mb-5">Control register</Eyebrow>
        <h1 className="max-w-3xl text-display text-ink text-balance">
          Every service, mapped to the controls it moves.
        </h1>
        <p className="mt-6 max-w-measure text-lede text-slate">
          Real framework references — NIST CSF 2.0, ISO/IEC 27001:2022 and CIS
          Controls v8 — with a current-to-target maturity read on each row. Every
          reference is verified against the published framework. Filter by service
          to see exactly what an engagement advances.
        </p>
      </Container>

      <Container as="section" className="pb-14 md:pb-20">
        <div className="rounded-2xl border border-rule bg-surface p-4 shadow-pop-sm md:p-8">
          <ControlRegister />
          <p className="mt-4 border-t border-rule pt-4 font-mono text-mono-xs uppercase tracking-mono text-slate">
            <CountUp value={CONTROLS.length} /> controls · <CountUp value={SERVICE_LIST.length} /> services · verified against the published frameworks
          </p>
        </div>
      </Container>

      <ContactCTA prompt="Want this mapped to your estate?" />
    </>
  );
}
