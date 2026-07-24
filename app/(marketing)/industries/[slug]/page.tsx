import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Eyebrow, Chip } from "@/components/ui";
import { ContactCTA } from "@/components/marketing/ContactCTA";

const INDUSTRIES: Record<string, { name: string }> = {
  "financial-services": { name: "Financial services" },
  healthcare: { name: "Healthcare" },
  manufacturing: { name: "Manufacturing" },
  "public-sector": { name: "Public sector" },
  saas: { name: "SaaS" },
};

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return Object.keys(INDUSTRIES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = INDUSTRIES[slug];
  if (!industry) return {};
  return {
    title: `${industry.name} security`,
    description: `Security consulting and managed detection for ${industry.name.toLowerCase()} organisations.`,
    alternates: { canonical: `/industries/${slug}` },
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = INDUSTRIES[slug];
  if (!industry) notFound();

  return (
    <>
      <Container className="pt-14 pb-8 md:pt-20">
        <div className="mb-5 flex items-center gap-3">
          <Eyebrow>Industries</Eyebrow>
          <Chip>CMS — Phase 4</Chip>
        </div>
        <h1 className="max-w-measure text-display text-ink">{industry.name}</h1>
        <p className="mt-4 max-w-measure text-lede text-slate">
          {`{{TODO: sector-specific content for ${industry.name.toLowerCase()} — the regulations that apply, the threats that matter, and the engagements that fit. Wire to Payload CMS (Industries collection).}}`}
        </p>
      </Container>
      <ContactCTA />
    </>
  );
}
