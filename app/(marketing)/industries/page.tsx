import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui";
import { ContactCTA } from "@/components/marketing/ContactCTA";
import { INDUSTRIES } from "@/content/industries";

export const metadata: Metadata = {
  title: "Industries we work in",
  description:
    "Security consulting and managed detection tuned to the regulatory and operational pressure of financial services, healthcare, manufacturing, public sector, and SaaS.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesIndexPage() {
  return (
    <>
      <Container className="pt-14 pb-8 md:pt-20">
        <Eyebrow className="mb-5">Industries</Eyebrow>
        <h1 className="max-w-3xl text-display text-ink text-balance">
          We work to the pressures of your sector, not a generic checklist.
        </h1>
        <p className="mt-6 max-w-measure text-lede text-slate">
          The regulations, threat models and operational constraints differ by
          industry. Every engagement maps to the frameworks your auditors and board
          already know — NIST CSF 2.0, ISO 27001:2022 and CIS v8 — applied through
          your sector&apos;s lens.
        </p>
      </Container>

      <Container as="section" className="pb-16 md:pb-24">
        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-rule bg-rule sm:grid-cols-2">
          {INDUSTRIES.map((industry) => (
            <li key={industry.slug} className="bg-surface">
              <Link
                href={`/industries/${industry.slug}`}
                className="group flex h-full flex-col p-7 transition-colors hover:bg-paper-sunk/50 md:p-9"
              >
                <h2 className="font-display text-h3 text-ink">{industry.name}</h2>
                <p className="mt-3 flex-1 text-small text-slate">{industry.lede}</p>
                <span
                  aria-hidden="true"
                  className="mt-6 font-mono text-mono-xs uppercase tracking-mono text-pine transition-transform duration-150 ease-doc group-hover:translate-x-0.5"
                >
                  View sector →
                </span>
              </Link>
            </li>
          ))}
          {/* Fill the trailing grid cell with an honest "not listed?" prompt. */}
          <li className="bg-paper-sunk/50">
            <Link
              href="/contact"
              className="group flex h-full flex-col p-7 transition-colors hover:bg-paper-sunk md:p-9"
            >
              <h2 className="font-display text-h3 text-ink">Another sector?</h2>
              <p className="mt-3 flex-1 text-small text-slate">
                The method holds across regulated industries — map the controls, sequence
                the risk, prove the fix. Tell us yours and we&apos;ll scope it.
              </p>
              <span
                aria-hidden="true"
                className="mt-6 font-mono text-mono-xs uppercase tracking-mono text-pine transition-transform duration-150 ease-doc group-hover:translate-x-0.5"
              >
                Book an assessment →
              </span>
            </Link>
          </li>
        </ul>
      </Container>

      <ContactCTA />
    </>
  );
}
