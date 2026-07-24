import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui";

/**
 * Insights teaser (§4.6). The CMS (Phase 4) will populate this with the latest
 * two posts; until then it holds the structure with topic placeholders that
 * reflect the real editorial plan (buyer-searched questions).
 */
const PLACEHOLDER_POSTS = [
  {
    kicker: "Identity",
    title: "An Entra ID Conditional Access baseline you can actually ship",
    note: "{{TODO: publish via CMS}}",
  },
  {
    kicker: "Compliance",
    title: "What a SOC 2 readiness assessment actually costs — and takes",
    note: "{{TODO: publish via CMS}}",
  },
];

export function InsightsTeaser({ index = 5 }: { index?: number }) {
  return (
    <Container as="section" className="py-16 md:py-24">
      <div className="mb-8 flex items-center justify-between">
        <Eyebrow index={index}>Insights</Eyebrow>
        <Link href="/insights" className="font-body text-small text-pine hover:text-pine-lift">
          All insights →
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded border border-rule bg-rule md:grid-cols-2">
        {PLACEHOLDER_POSTS.map((p) => (
          <article key={p.title} className="flex flex-col gap-3 bg-paper p-6 md:p-8">
            <span className="font-mono text-mono-xs uppercase text-brass-lift">{p.kicker}</span>
            <h3 className="text-h3 text-ink">{p.title}</h3>
            <span className="font-mono text-mono-xs uppercase text-slate/70">{p.note}</span>
          </article>
        ))}
      </div>
    </Container>
  );
}
