import Link from "next/link";
import { Container, Eyebrow, Reveal, DomainIcon } from "@/components/ui";
import { SERVICES_BY_DOMAIN, SERVICE_LIST, DOMAINS } from "@/content/services";
import { domainAccent } from "@/lib/accent";

/**
 * Premium services index — grouped by domain, as interactive cards that lift on
 * hover and reveal on scroll. A serious catalogue, organised the way a buyer
 * thinks about their estate.
 */
export function ServicesIndex({ index = 2 }: { index?: number }) {
  return (
    <Container as="section" className="py-12 md:py-28">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <Eyebrow index={index}>Services</Eyebrow>
        <p className="font-mono text-mono-xs uppercase text-slate">
          {SERVICE_LIST.length} services · {DOMAINS.length} categories
        </p>
      </div>

      <div className="flex flex-col gap-14">
        {SERVICES_BY_DOMAIN.map((group, gi) => {
          const a = domainAccent(group.domain);
          return (
            <div key={group.domain} className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-12">
              <div className="self-start md:col-span-3 md:sticky md:top-28">
                <Reveal>
                  <span className={`mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl ${a.softBg}`}>
                    <DomainIcon domain={group.domain} className={`h-5 w-5 ${a.softText}`} />
                  </span>
                  <h3 className={`flex items-center gap-2 font-mono text-mono-xs uppercase tracking-mono ${a.text}`}>
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
                      className={`card-lift group flex h-full flex-col overflow-hidden rounded-2xl border border-rule bg-surface p-6 ${a.borderHover}`}
                    >
                      <span aria-hidden="true" className={`mb-4 block h-1 w-10 rounded-full ${a.dot}`} />
                      <div className="flex items-baseline justify-between gap-3">
                        <h4 className={`text-h3 text-ink transition-colors ${a.textGroupHover}`}>
                          {s.name}
                        </h4>
                        <span
                          aria-hidden="true"
                          className={`font-mono text-mono-xs text-slate transition-transform duration-300 ease-doc group-hover:translate-x-1 ${a.textGroupHover}`}
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
          );
        })}
      </div>
    </Container>
  );
}
