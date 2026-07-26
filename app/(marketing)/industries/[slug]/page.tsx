import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { Container, Eyebrow } from "@/components/ui";
import { ContactCTA } from "@/components/marketing/ContactCTA";
import { getPayloadClient } from "@/lib/payload";

export const dynamic = "force-dynamic";

async function getIndustry(slug: string) {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "industries",
      where: { slug: { equals: slug } },
      overrideAccess: false,
      limit: 1,
      depth: 1,
    });
    return docs[0] ?? null;
  } catch {
    // Database not configured yet — treat as not found rather than erroring.
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = await getIndustry(slug);
  if (!industry) return {};
  return {
    title: industry.seo?.title || `${industry.name} security`,
    description: industry.seo?.description || industry.lede,
    alternates: { canonical: `/industries/${slug}` },
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = await getIndustry(slug);
  if (!industry) notFound();

  return (
    <>
      <Container className="pt-14 pb-8 md:pt-20">
        <Eyebrow className="mb-5">Industries</Eyebrow>
        <h1 className="max-w-measure text-display text-ink">{industry.name}</h1>
        <p className="mt-4 max-w-measure text-lede text-slate">{industry.lede}</p>
      </Container>

      {industry.content && (
        <Container width="measure" as="section" className="pb-16 md:pb-24">
          <div className="border-t border-rule pt-10 text-body text-ink [&_h2]:mt-8 [&_h2]:text-h2 [&_p]:mt-4">
            <RichText data={industry.content} />
          </div>
        </Container>
      )}

      <ContactCTA />
    </>
  );
}
