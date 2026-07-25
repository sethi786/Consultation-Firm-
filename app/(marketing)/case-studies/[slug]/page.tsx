import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { Container, Eyebrow, Chip } from "@/components/ui";
import { ContactCTA } from "@/components/marketing/ContactCTA";
import { getPayloadClient } from "@/lib/payload";

async function getCaseStudy(slug: string) {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "case-studies",
    where: { slug: { equals: slug } },
    overrideAccess: false,
    limit: 1,
    depth: 1,
  });
  return docs[0] ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = await getCaseStudy(slug);
  if (!cs) return {};
  return {
    title: cs.seo?.title || cs.title,
    description: cs.seo?.description || cs.summary,
    alternates: { canonical: `/case-studies/${slug}` },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = await getCaseStudy(slug);
  if (!cs) notFound();

  return (
    <>
      <Container width="measure" className="pt-14 pb-10 md:pt-20">
        <div className="mb-5 flex items-center gap-3">
          <Eyebrow>Case study</Eyebrow>
          {!cs.clientApproved && <Chip>Numbers pending sign-off</Chip>}
        </div>
        <p className="font-mono text-mono-xs uppercase text-brass-lift">{cs.clientDescriptor}</p>
        <h1 className="mt-2 text-h1 text-ink">{cs.title}</h1>
        <p className="mt-4 text-lede text-slate">{cs.summary}</p>
      </Container>

      {Array.isArray(cs.outcomes) && cs.outcomes.length > 0 && (
        <Container width="measure" className="pb-10">
          <dl className="grid grid-cols-1 gap-px overflow-hidden rounded border border-rule bg-rule sm:grid-cols-2">
            {cs.outcomes.map((o, i) => (
              <div key={i} className="flex flex-col gap-2 bg-paper p-6">
                <dt className="font-mono text-mono-xs uppercase text-slate">{o.metricLabel}</dt>
                <dd className="flex items-baseline gap-2 font-mono text-ink">
                  <span className="text-slate line-through decoration-slate/40">{o.before}</span>
                  <span aria-hidden="true" className="text-brass-lift">→</span>
                  <span className="text-h2">{o.after}</span>
                </dd>
                <dd className="font-mono text-mono-xs uppercase text-slate/70">in {o.timeframe}</dd>
              </div>
            ))}
          </dl>
        </Container>
      )}

      <Container width="measure" className="pb-16 md:pb-24">
        {cs.content && (
          <div className="border-t border-rule pt-10 text-body text-ink [&_h2]:mt-8 [&_h2]:text-h2 [&_h3]:mt-6 [&_h3]:text-h3 [&_p]:mt-4">
            <RichText data={cs.content} />
          </div>
        )}
        <div className="mt-12 border-t border-rule pt-6">
          <Link href="/case-studies" className="text-small text-pine hover:text-pine-lift">
            ← All case studies
          </Link>
        </div>
      </Container>

      <ContactCTA />
    </>
  );
}
