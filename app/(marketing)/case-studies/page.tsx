import type { Metadata } from "next";
import { Container, Eyebrow, Chip } from "@/components/ui";
import { ContactCTA } from "@/components/marketing/ContactCTA";

export const metadata: Metadata = {
  title: "Case studies",
  description:
    "Outcome-led case studies from Northport Security engagements, with the numbers — published only with the client's written approval.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  return (
    <>
      <Container className="pt-14 pb-8 md:pt-20">
        <div className="mb-5 flex items-center gap-3">
          <Eyebrow>Case studies</Eyebrow>
          <Chip>CMS — Phase 4</Chip>
        </div>
        <h1 className="max-w-measure text-display text-ink">
          Outcomes, with the numbers.
        </h1>
        <p className="mt-4 max-w-measure text-lede text-slate">
          One case study per closed engagement, anonymised where needed (“a 900-seat
          Ontario credit union”), with the client&apos;s written approval on every
          figure. Structured metrics — before, after, timeframe — so buyers can
          compare.
        </p>
        <p className="mt-8 max-w-measure text-body text-slate">
          {"{{TODO: wire to Payload CMS (CaseStudies collection) with structured "}
          outcome fields — metric label, before, after, timeframe.{"}}"}
        </p>
      </Container>
      <ContactCTA />
    </>
  );
}
