import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui";
import { ContactCTA } from "@/components/marketing/ContactCTA";
import { DELIVERY_MODES, CAPABILITY_MATRIX } from "@/content/solutions";
import { SERVICES_BY_DOMAIN } from "@/content/services";
import { ACCENTS, domainAccent } from "@/lib/accent";

export const metadata: Metadata = {
  title: "Solutions — advise, implement, operate",
  description:
    "Every security capability in the mode you need: advise (assess & roadmap), implement (build & verify), or operate (24/7 managed detection and response).",
  alternates: { canonical: "/solutions" },
};

// Link a domain to its services index anchor / first service for the matrix rows.
function firstSlug(domainName: string): string {
  const group = SERVICES_BY_DOMAIN.find((g) => g.domain === domainName);
  return group?.services[0]?.slug ?? "";
}

export default function SolutionsPage() {
  return (
    <>
      {/* Hero */}
      <Container className="pt-16 pb-12 md:pt-24 md:pb-16">
        <Eyebrow index={1} className="mb-6">
          Solutions
        </Eyebrow>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <h1 className="text-display text-ink">
              Advise, implement, or <span className="text-coral-ink">operate.</span>
            </h1>
          </div>
          <div className="flex flex-col justify-end lg:col-span-5">
            <p className="max-w-measure text-lede text-slate">
              The same eleven capabilities, offered in the mode that fits where you
              are — an independent assessment, hands-on delivery, or your security
              operations run by us. Most clients start with one and grow into the next.
            </p>
          </div>
        </div>
      </Container>

      {/* The three delivery modes */}
      <Container as="section" className="pb-16 md:pb-20">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {DELIVERY_MODES.map((m, i) => {
            const a = ACCENTS[m.accent];
            return (
              <div
                key={m.key}
                className="flex flex-col rounded-3xl border border-rule bg-surface p-7 shadow-pop-sm"
              >
                <span className={`inline-flex w-fit items-center gap-2 rounded-full ${a.softBg} px-3 py-1 font-mono text-mono-xs uppercase ${a.softText}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${a.dot}`} />
                  0{i + 1} · {m.name}
                </span>
                <h2 className="mt-4 text-h3 text-ink">{m.tagline}</h2>
                <p className="mt-3 text-small text-slate">{m.blurb}</p>
                <ul className="mt-5 flex flex-1 flex-col gap-2 border-t border-rule pt-5">
                  {m.includes.map((it) => (
                    <li key={it} className="flex items-baseline gap-2 text-small text-ink">
                      <span aria-hidden="true" className={a.text}>—</span>
                      {it}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 font-mono text-mono-xs uppercase text-slate/70">
                  Engagement tier: {m.tier}
                </p>
              </div>
            );
          })}
        </div>
      </Container>

      {/* Capability × mode matrix */}
      <section className="border-t border-rule bg-paper-sunk/40">
        <Container className="py-16 md:py-24">
          <Eyebrow index={2}>Every capability, in the mode you need</Eyebrow>
          <h2 className="mt-2 mb-8 text-h2 text-ink">The capability matrix</h2>

          <div className="overflow-x-auto rounded-2xl border border-rule bg-surface">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="border-b border-rule">
                  <th scope="col" className="px-5 py-3 font-mono text-mono-xs uppercase text-slate">Capability</th>
                  {DELIVERY_MODES.map((m) => {
                    const a = ACCENTS[m.accent];
                    return (
                      <th key={m.key} scope="col" className="px-5 py-3">
                        <span className={`inline-flex items-center gap-2 font-mono text-mono-xs uppercase ${a.text}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${a.dot}`} />
                          {m.name}
                        </span>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {CAPABILITY_MATRIX.map((row) => {
                  const a = domainAccent(row.domain);
                  const slug = firstSlug(row.domain);
                  return (
                    <tr key={row.domain} className="border-b border-rule/70 align-top">
                      <th scope="row" className="px-5 py-4">
                        <Link
                          href={slug ? `/services/${slug}` : "/services"}
                          className="group inline-flex items-center gap-2 text-small font-medium text-ink"
                        >
                          <span className={`h-2 w-2 rounded-full ${a.dot}`} />
                          <span className="border-b border-transparent group-hover:border-ink">{row.domain}</span>
                        </Link>
                      </th>
                      <td className="px-5 py-4 text-small text-slate">{row.advise}</td>
                      <td className="px-5 py-4 text-small text-slate">{row.implement}</td>
                      <td className="px-5 py-4 text-small text-slate">{row.operate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="mt-5 max-w-measure text-small text-slate">
            Prefer to run detection and response with us rather than build it?{" "}
            <Link href="/managed-services" className="text-coral-ink underline decoration-coral/40 underline-offset-4 hover:decoration-coral">
              See managed services →
            </Link>
          </p>
        </Container>
      </section>

      <ContactCTA prompt="Not sure which mode fits? Book an assessment and we'll tell you." />
    </>
  );
}
