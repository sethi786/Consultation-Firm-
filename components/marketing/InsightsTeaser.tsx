import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui";
import { getPayloadClient } from "@/lib/payload";
import { INSIGHTS } from "@/content/insights";

interface TeaserCard {
  slug: string;
  kicker: string;
  title: string;
  excerpt: string;
}

/**
 * Insights teaser (§4.6). Prefers the latest published posts from the CMS, but
 * falls back to the static, firm-authored articles in `content/insights.ts`
 * when the database isn't wired or is empty — so the homepage always shows the
 * firm's thinking, and never disagrees with the /insights index.
 */
async function latestCards(): Promise<TeaserCard[]> {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "posts",
      overrideAccess: false,
      sort: "-publishedAt",
      limit: 2,
      depth: 0,
    });
    if (docs.length > 0) {
      return docs.map((p) => ({
        slug: p.slug,
        kicker: p.kicker ?? "Note",
        title: p.title,
        excerpt: p.excerpt ?? "",
      }));
    }
  } catch {
    // fall through to the static articles
  }
  return INSIGHTS.slice(0, 2).map((a) => ({
    slug: a.slug,
    kicker: a.kicker,
    title: a.title,
    excerpt: a.excerpt,
  }));
}

export async function InsightsTeaser({ index = 5 }: { index?: number }) {
  const cards = await latestCards();
  if (cards.length === 0) return null;

  return (
    <Container as="section" className="py-12 md:py-28">
      <div className="mb-8 flex items-center justify-between">
        <Eyebrow index={index}>Insights</Eyebrow>
        <Link href="/insights" className="font-body text-small text-pine hover:text-pine-lift">
          All insights →
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded border border-rule bg-rule md:grid-cols-2">
        {cards.map((p) => (
          <Link
            key={p.slug}
            href={`/insights/${p.slug}`}
            className="group flex flex-col gap-3 bg-paper p-6 transition-colors hover:bg-paper-sunk/50 md:p-8"
          >
            <span className="font-mono text-mono-xs uppercase text-brass-lift">{p.kicker}</span>
            <h3 className="text-h3 text-ink group-hover:text-pine">{p.title}</h3>
            <span className="text-small text-slate">{p.excerpt}</span>
          </Link>
        ))}
      </div>
    </Container>
  );
}
