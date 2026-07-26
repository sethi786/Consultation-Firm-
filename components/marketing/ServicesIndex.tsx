import Link from "next/link";
import { Container, Eyebrow, Reveal } from "@/components/ui";
import { SERVICES_BY_DOMAIN, SERVICE_LIST } from "@/content/services";

/**
 * Premium services index — grouped by domain, as interactive cards that lift on
 * hover and reveal on scroll. A serious catalogue, organised the way a buyer
 * thinks about their estate.
 */
export function ServicesIndex({ index = 2 }: { index?: number }) {
  return (
    <Container as="section" className="py-16 md:py-24">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <Eyebrow index={index}>Services</Eyebrow>
        <p className="font-mono text-mono-xs uppercase text-slate">
          {SERVICE_LIST.length} services · 5 domains
        </p>
      </div>

      <div className="flex flex-col gap-14">
        {SERVICES_BY_DOMAIN.map((group, gi) => (
          <div key={group.domain} className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-12">
            <div className="md:col-span-3">
              <Reveal>
                <h3 className="font-mono text-mono-xs uppercase tracking-mono text-brass-lift">
                  {group.domain}
                </h3>
                <p className="mt-2 text-caption text-slate">
                  {group.services.length} service{group.services.length === 1 ? "" : "s"}
                </p>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 gap-4 md:col-span-9 md:grid-cols-2">
              {group.services.map((s, si) => (
                <Reveal key={s.slug} delay={(gi === 0 ? si : 0) * 60}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group flex h-full flex-col rounded-lg border border-rule bg-paper p-6 transition-all duration-300 ease-doc hover:-translate-y-0.5 hover:border-pine/30 hover:shadow-1"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <h4 className="text-h3 text-ink transition-colors group-hover:text-pine">
                        {s.name}
                      </h4>
                      <span
                        aria-hidden="true"
                        className="font-mono text-mono-xs text-slate transition-transform duration-300 ease-doc group-hover:translate-x-1 group-hover:text-brass-lift"
                      >
                        →
                      </span>
                    </div>
                    <p className="mt-3 text-small text-slate">{s.blurb}</p>
                    <p className="mt-4 border-t border-rule pt-3 font-mono text-mono-xs uppercase text-slate/80">
                      “{s.question}”
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
