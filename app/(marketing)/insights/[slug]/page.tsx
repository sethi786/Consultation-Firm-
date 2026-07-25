import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { Container, Eyebrow } from "@/components/ui";
import { ContactCTA } from "@/components/marketing/ContactCTA";
import { getPayloadClient } from "@/lib/payload";

async function getPost(slug: string) {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "posts",
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
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.excerpt,
    alternates: { canonical: `/insights/${slug}` },
  };
}

function formatDate(value?: string | null) {
  if (!value) return null;
  return new Date(value).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const author = typeof post.author === "object" && post.author ? post.author : null;

  return (
    <>
      <Container width="measure" className="pt-14 pb-10 md:pt-20">
        <Eyebrow className="mb-5">
          Insights{post.kicker ? ` / ${post.kicker}` : ""}
        </Eyebrow>
        <h1 className="text-h1 text-ink">{post.title}</h1>
        <p className="mt-4 text-lede text-slate">{post.excerpt}</p>
        <p className="mt-6 font-mono text-mono-xs uppercase text-slate">
          {formatDate(post.publishedAt) ?? "Draft"}
          {author ? ` · ${author.name}` : ""}
        </p>
      </Container>

      <Container width="measure" className="pb-16 md:pb-24">
        <div className="prose-measure border-t border-rule pt-10 text-body text-ink [&_a]:text-pine [&_a]:underline [&_a]:decoration-brass [&_h2]:mt-8 [&_h2]:text-h2 [&_h3]:mt-6 [&_h3]:text-h3 [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6">
          {post.content ? (
            <RichText data={post.content} />
          ) : (
            <p className="text-slate">
              {"{{TODO: article body — write in the CMS.}}"}
            </p>
          )}
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
