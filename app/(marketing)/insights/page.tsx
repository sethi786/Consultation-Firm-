import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui";
import { ContactCTA } from "@/components/marketing/ContactCTA";
import { getPayloadClient } from "@/lib/payload";
import type { Post } from "@/payload-types";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Research and practitioner notes from Waypoint Security — Entra ID hardening, SOC 2 readiness, prompt injection, and more.",
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
  let docs: Post[] = [];
  try {
    const payload = await getPayloadClient();
    ({ docs } = await payload.find({
      collection: "posts",
      overrideAccess: false,
      sort: "-publishedAt",
      limit: 50,
      depth: 0,
    }));
  } catch {
    // Database not configured yet — show the empty state, never a 500.
    docs = [];
  }

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
          <div className="border-t border-rule pt-8">
            <p className="max-w-measure text-body text-slate">
              The first research notes are in the works — depth over volume, so they take a
              little longer. Tell us what you&apos;re wrestling with and we&apos;ll point you
              to the working material we&apos;d normally publish.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-block font-body text-small text-pine underline decoration-pine/40 underline-offset-4 hover:decoration-pine"
            >
              Ask us a question →
            </Link>
          </div>
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
