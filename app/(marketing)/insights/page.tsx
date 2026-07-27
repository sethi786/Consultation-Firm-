import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui";
import { ContactCTA } from "@/components/marketing/ContactCTA";
import { INSIGHTS } from "@/content/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Research and practitioner notes from Waypoint — Entra ID hardening, SOC 2 readiness, prompt injection in production copilots, and more.",
  alternates: { canonical: "/insights" },
};

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function InsightsPage() {
  const posts = [...INSIGHTS].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <>
      <Container className="pt-14 pb-8 md:pt-20">
        <Eyebrow className="mb-5">Insights</Eyebrow>
        <h1 className="max-w-measure text-display text-ink">
          Answers to questions buyers actually google.
        </h1>
        <p className="mt-4 max-w-measure text-lede text-slate">
          Depth over volume: each piece answers a real question — an Entra ID
          Conditional Access baseline, what a SOC 2 readiness assessment involves,
          prompt injection in production copilots.
        </p>
      </Container>

      <Container as="section" className="pb-16 md:pb-24">
        <ul className="border-t border-rule">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/insights/${post.slug}`}
                className="group grid grid-cols-1 gap-2 border-b border-rule py-7 transition-colors hover:bg-paper-sunk/40 md:grid-cols-12 md:gap-6 md:px-2"
              >
                <div className="md:col-span-2">
                  <span className="font-mono text-mono-xs uppercase text-brass-lift">
                    {post.kicker}
                  </span>
                </div>
                <div className="md:col-span-7">
                  <h2 className="text-h3 text-ink group-hover:text-pine">{post.title}</h2>
                  <p className="mt-1 text-small text-slate">{post.excerpt}</p>
                </div>
                <div className="md:col-span-3 md:text-right">
                  <span className="font-mono text-mono-xs uppercase text-slate">
                    {formatDate(post.date)}
                  </span>
                  <span className="mt-1 block font-mono text-mono-xs uppercase text-slate/60">
                    {post.readMins} min read
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>

      <ContactCTA />
    </>
  );
}
