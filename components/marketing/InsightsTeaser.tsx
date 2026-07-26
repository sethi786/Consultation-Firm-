import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui";
import { getPayloadClient } from "@/lib/payload";

/**
 * Insights teaser (§4.6). Pulls the latest published posts from the CMS. If the
 * database isn't wired yet, or there are no posts, the whole section hides —
 * the homepage never shows scaffolding or an empty shell.
 */
async function latestPosts() {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "posts",
      overrideAccess: false,
      sort: "-publishedAt",
      limit: 2,
      depth: 0,
    });
    return docs;
  } catch {
    return [];
  }
}

export async function InsightsTeaser({ index = 5 }: { index?: number }) {
  const posts = await latestPosts();
  if (posts.length === 0) return null;

  return (
    <Container as="section" className="py-16 md:py-24">
      <div className="mb-8 flex items-center justify-between">
        <Eyebrow index={index}>Insights</Eyebrow>
        <Link href="/insights" className="font-body text-small text-pine hover:text-pine-lift">
          All insights →
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded border border-rule bg-rule md:grid-cols-2">
        {posts.map((p) => (
          <Link
            key={p.id}
            href={`/insights/${p.slug}`}
            className="group flex flex-col gap-3 bg-paper p-6 transition-colors hover:bg-paper-sunk/50 md:p-8"
          >
            <span className="font-mono text-mono-xs uppercase text-brass-lift">
              {p.kicker ?? "Note"}
            </span>
            <h3 className="text-h3 text-ink group-hover:text-pine">{p.title}</h3>
            <span className="text-small text-slate">{p.excerpt}</span>
          </Link>
        ))}
      </div>
    </Container>
  );
}
