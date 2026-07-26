import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui";
import { ContactCTA } from "@/components/marketing/ContactCTA";
import { INDUSTRIES, getIndustry } from "@/content/industries";

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return {
    title: `${industry.name} security`,
    description: industry.lede,
    alternates: { canonical: `/industries/${slug}` },
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  return (
    <>
      <Container className="pt-14 pb-8 md:pt-20">
        <Eyebrow className="mb-5">Industries</Eyebrow>
        <h1 className="max-w-measure text-display text-ink">{industry.name}</h1>
        <p className="mt-4 max-w-measure text-lede text-slate">{industry.lede}</p>
      </Container>

      <Container width="measure" as="section" className="pb-16 md:pb-24">
        <div className="flex flex-col gap-8 border-t border-rule pt-10">
          {industry.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-h3 text-ink">{s.heading}</h2>
              <p className="mt-3 text-body text-slate">{s.body}</p>
            </section>
          ))}
        </div>

        <nav aria-label="Other industries" className="mt-12 border-t border-rule pt-6">
          <p className="mb-3 font-mono text-mono-xs uppercase text-slate">Other industries</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {INDUSTRIES.filter((i) => i.slug !== slug).map((i) => (
              <li key={i.slug}>
                <Link
                  href={`/industries/${i.slug}`}
                  className="text-small text-ink transition-colors hover:text-pine"
                >
                  {i.name} →
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      <ContactCTA />
    </>
  );
}
