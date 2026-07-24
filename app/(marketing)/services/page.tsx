import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui";
import { ServicesIndex } from "@/components/marketing/ServicesIndex";
import { ContactCTA } from "@/components/marketing/ContactCTA";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Six security services — AI & LLM security, cloud, identity, zero trust, managed SOC, and compliance — each mapped to real framework controls.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <Container className="pt-14 pb-8 md:pt-20">
        <Eyebrow className="mb-5">Services</Eyebrow>
        <h1 className="max-w-measure text-display text-ink">
          Six services. One register.
        </h1>
        <p className="mt-4 max-w-measure text-lede text-slate">
          Every engagement maps to the same control register, so the work compounds
          instead of starting over. Pick the question that sounds like yours.
        </p>
      </Container>

      <ServicesIndex index={1} />

      <ContactCTA />
    </>
  );
}
