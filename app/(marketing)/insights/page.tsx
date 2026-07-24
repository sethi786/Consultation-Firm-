import type { Metadata } from "next";
import { Container, Eyebrow, Chip } from "@/components/ui";
import { ContactCTA } from "@/components/marketing/ContactCTA";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Research and practitioner notes from Northport Security — Entra ID hardening, SOC 2 readiness, prompt injection, and more.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  return (
    <>
      <Container className="pt-14 pb-8 md:pt-20">
        <div className="mb-5 flex items-center gap-3">
          <Eyebrow>Insights</Eyebrow>
          <Chip>CMS — Phase 4</Chip>
        </div>
        <h1 className="max-w-measure text-display text-ink">
          Answers to questions buyers actually google.
        </h1>
        <p className="mt-4 max-w-measure text-lede text-slate">
          Depth over volume: two pieces a month, each one a real question — an Entra
          ID Conditional Access baseline, what a SOC 2 readiness assessment costs,
          prompt injection in production copilots.
        </p>
        <p className="mt-8 max-w-measure text-body text-slate">
          {"{{TODO: wire this index to Payload CMS (Posts collection) with ISR.}}"}
        </p>
      </Container>
      <ContactCTA />
    </>
  );
}
