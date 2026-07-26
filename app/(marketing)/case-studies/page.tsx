import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui";
import { ContactCTA } from "@/components/marketing/ContactCTA";
import { getPayloadClient } from "@/lib/payload";
import type { CaseStudy } from "@/payload-types";

export const metadata: Metadata = {
  title: "Case studies",
  description:
    "Outcome-led case studies from Cairn Security engagements, with the numbers — published only with the client's written approval.",
  alternates: { canonical: "/case-studies" },
};

export default async function CaseStudiesPage() {
  let docs: CaseStudy[] = [];
  try {
    const payload = await getPayloadClient();
    ({ docs } = await payload.find({
      collection: "case-studies",
      overrideAccess: false,
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
        <Eyebrow className="mb-5">Case studies</Eyebrow>
        <h1 className="max-w-measure text-display text-ink">Outcomes, with the numbers.</h1>
        <p className="mt-4 max-w-measure text-lede text-slate">
          One case study per closed engagement, anonymised where needed, with the
          client&apos;s written approval on every figure.
        </p>
      </Container>

      <Container as="section" className="pb-16 md:pb-24">
        {docs.length === 0 ? (
          <div className="border-t border-rule pt-8">
            <p className="max-w-measure text-body text-slate">
              Public write-ups land here as engagements close — each with the client&apos;s
              written sign-off on every figure, which is why we&apos;d rather show none than
              invent one. Ask us for references relevant to your sector and we&apos;ll share
              them during scoping.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-block font-body text-small text-pine underline decoration-pine/40 underline-offset-4 hover:decoration-pine"
            >
              Ask for sector references →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-rule bg-rule md:grid-cols-2">
            {docs.map((cs) => (
              <Link
                key={cs.id}
                href={`/case-studies/${cs.slug}`}
                className="group flex flex-col gap-4 bg-paper p-6 transition-colors hover:bg-paper-sunk/50 md:p-8"
              >
                <span className="font-mono text-mono-xs uppercase text-brass-lift">
                  {cs.clientDescriptor}
                </span>
                <h2 className="text-h3 text-ink group-hover:text-pine">{cs.title}</h2>
                {Array.isArray(cs.outcomes) && cs.outcomes.length > 0 && (
                  <dl className="flex flex-wrap gap-x-8 gap-y-3">
                    {cs.outcomes.slice(0, 2).map((o, i) => (
                      <div key={i}>
                        <dd className="flex items-baseline gap-2 font-mono text-ink">
                          <span className="text-slate line-through decoration-slate/40">
                            {o.before}
                          </span>
                          <span aria-hidden="true" className="text-brass-lift">→</span>
                          <span className="text-h3">{o.after}</span>
                        </dd>
                        <dt className="mt-1 font-mono text-mono-xs uppercase text-slate">
                          {o.metricLabel}
                        </dt>
                      </div>
                    ))}
                  </dl>
                )}
              </Link>
            ))}
          </div>
        )}
      </Container>

      <ContactCTA />
    </>
  );
}
