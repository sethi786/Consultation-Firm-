import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui";
import { ContactCTA } from "@/components/marketing/ContactCTA";
import { getPayloadClient } from "@/lib/payload";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Research and practitioner notes from Northport Security — Entra ID hardening, SOC 2 readiness, prompt injection, and more.",
  alternates: { canonical: "/insights" },
};

function formatDate(value?: string | null) {
  if (!value) return null;
  return new Date(value).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function InsightsPage() {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "posts",
    overrideAccess: false,
    sort: "-publishedAt",
    limit: 50,
    depth: 0,
  });

  return (
    <>
      <Container className="pt-14 pb-8 md:pt-20">
        <Eyebrow className="mb-5">Insights</Eyebrow>
        <h1 className="max-w-measure text-display text-ink">
          Answers to questions buyers actually google.
        </h1>
        <p className="mt-4 max-w-measure text-lede text-slate">
          Depth over volume: each piece answers a real question — an Entra ID
          Conditional Access baseline, what a SOC 2 readiness assessment costs,
          prompt injection in production copilots.
        </p>
      </Container>

      <Container as="section" className="pb-16 md:pb-24">
        {docs.length === 0 ? (
          <p className="border-t border-rule pt-8 text-body text-slate">
            No insights published yet.
          </p>
        ) : (
          <ul className="border-t border-rule">
            {docs.map((post) => (
              <li key={post.id}>
                <Link
                  href={`/insights/${post.slug}`}
                  className="group grid grid-cols-1 gap-2 border-b border-rule py-7 transition-colors hover:bg-paper-sunk/40 md:grid-cols-12 md:gap-6 md:px-2"
                >
                  <div className="md:col-span-2">
                    <span className="font-mono text-mono-xs uppercase text-brass-lift">
                      {post.kicker ?? "Note"}
                    </span>
                  </div>
                  <div className="md:col-span-7">
                    <h2 className="text-h3 text-ink group-hover:text-pine">{post.title}</h2>
                    <p className="mt-1 text-small text-slate">{post.excerpt}</p>
                  </div>
                  <div className="md:col-span-3 md:text-right">
                    <span className="font-mono text-mono-xs uppercase text-slate">
                      {formatDate(post.publishedAt) ?? "—"}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>

      <ContactCTA />
    </>
  );
}
