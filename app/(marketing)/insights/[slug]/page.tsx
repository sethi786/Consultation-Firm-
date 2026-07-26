import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui";
import { ContactCTA } from "@/components/marketing/ContactCTA";
import { INSIGHTS, getInsight, type Block } from "@/content/insights";
import { ArticleJsonLd } from "@/components/seo/JsonLd";

export function generateStaticParams() {
  return INSIGHTS.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) return {};
  return {
    title: post.seo.title,
    description: post.seo.description,
    alternates: { canonical: `/insights/${slug}` },
  };
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function BlockView({ block }: { block: Block }) {
  if (block.type === "h2") return <h2 className="mt-10 text-h2 text-ink">{block.text}</h2>;
  if (block.type === "ul")
    return (
      <ul className="mt-4 flex flex-col gap-2 pl-5">
        {block.items.map((it, i) => (
          <li key={i} className="list-disc text-body text-slate marker:text-brass-lift">
            {it}
          </li>
        ))}
      </ul>
    );
  return <p className="mt-4 text-body text-slate">{block.text}</p>;
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) notFound();

  return (
    <>
      <ArticleJsonLd
        title={post.title}
        description={post.seo.description}
        slug={post.slug}
        datePublished={post.date}
      />
      <Container width="measure" className="pt-14 pb-10 md:pt-20">
        <Eyebrow className="mb-5">Insights / {post.kicker}</Eyebrow>
        <h1 className="text-h1 text-ink">{post.title}</h1>
        <p className="mt-4 text-lede text-slate">{post.excerpt}</p>
        <p className="mt-6 font-mono text-mono-xs uppercase text-slate">
          {formatDate(post.date)} · {post.readMins} min read · Waypoint Security
        </p>
      </Container>

      <Container width="measure" className="pb-16 md:pb-24">
        <div className="border-t border-rule pt-8">
          {post.blocks.map((block, i) => (
            <BlockView key={i} block={block} />
          ))}
        </div>
        <div className="mt-12 border-t border-rule pt-6">
          <Link href="/insights" className="text-small text-pine hover:text-pine-lift">
            ← All insights
          </Link>
        </div>
      </Container>

      <ContactCTA />
    </>
  );
}
