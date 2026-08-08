import Link from "next/link";
import { WaypointMark, DomainIcon } from "@/components/ui";
import { SERVICES_BY_DOMAIN } from "@/content/services";
import { INDUSTRIES } from "@/content/industries";
import { CONTACT } from "@/lib/site";

const COLUMNS: { heading: string; links: { href: string; label: string }[] }[] = [
  {
    heading: "Industries",
    links: INDUSTRIES.map((i) => ({ href: `/industries/${i.slug}`, label: i.name })),
  },
  {
    heading: "Firm",
    links: [
      { href: "/approach", label: "Approach" },
      { href: "/about", label: "About" },
      { href: "/controls", label: "Control register" },
      { href: "/build-vs-partner", label: "Build vs partner" },
      { href: "/case-studies", label: "Case studies" },
      { href: "/insights", label: "Insights" },
      { href: "/contact", label: "Book an assessment" },
    ],
  },
  {
    heading: "Trust",
    links: [
      { href: "/legal/security", label: "Security" },
      { href: "/legal/privacy", label: "Privacy" },
      { href: "/legal/terms", label: "Terms" },
      { href: "/legal/dpa", label: "Data processing" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto max-w-page px-6 py-16 md:px-8">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <WaypointMark className="text-pine" title="" />
              <span className="font-display text-h3 text-ink">Waypoint</span>
            </div>
            <p className="mt-3 max-w-xs text-caption text-slate">
              Evidence-led security consulting and managed detection. We map your
              controls, close the gaps, and prove it.
            </p>
            {(CONTACT.email || CONTACT.phone || CONTACT.address || CONTACT.location) && (
              <ul className="mt-4 flex flex-col gap-1.5 text-caption text-slate">
                {CONTACT.address && <li className="max-w-xs not-italic">{CONTACT.address}</li>}
                {CONTACT.email && (
                  <li>
                    <a href={`mailto:${CONTACT.email}`} className="hover:text-ink">{CONTACT.email}</a>
                  </li>
                )}
                {CONTACT.phone && (
                  <li>
                    <a href={`tel:${CONTACT.phone.replace(/[^+\d]/g, "")}`} className="hover:text-ink">{CONTACT.phone}</a>
                  </li>
                )}
                {!CONTACT.address && CONTACT.location && <li>{CONTACT.location}</li>}
              </ul>
            )}
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className="font-mono text-mono-xs uppercase text-slate">{col.heading}</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-small text-ink/80 hover:text-ink">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Services — grouped by the 12 categories, compact multi-column (was a
            single 49-link column ~3000px tall). All service links preserved. */}
        <nav aria-label="Services" className="mt-14 border-t border-rule pt-10">
          <div className="mb-6 flex items-baseline justify-between gap-3">
            <h2 className="font-mono text-mono-xs uppercase tracking-mono text-slate">Services</h2>
            <Link href="/services" className="font-mono text-mono-xs uppercase tracking-mono text-pine hover:text-pine-lift">
              All services →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-3 lg:grid-cols-4">
            {SERVICES_BY_DOMAIN.map((group) => (
              <div key={group.domain}>
                <h3 className="mb-2.5 flex items-center gap-2 font-mono text-mono-xs uppercase tracking-mono text-ink">
                  <DomainIcon domain={group.domain} className="h-3.5 w-3.5 text-pine" />
                  {group.domain}
                </h3>
                <ul className="flex flex-col gap-1.5">
                  {group.services.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="text-caption text-ink/70 hover:text-ink"
                      >
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>

        {/* Colophon */}
        <div className="mt-14 flex flex-col gap-3 border-t border-rule pt-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1">
            <p className="font-mono text-mono-xs uppercase text-slate">
              © {new Date().getFullYear()} {CONTACT.legalEntity || "Waypoint"}. All rights reserved.
              {CONTACT.foundingYear && <span className="text-slate/70"> · Established {CONTACT.foundingYear}</span>}
            </p>
            {(CONTACT.registrationNo || CONTACT.jurisdiction) && (
              <p className="font-mono text-mono-xs uppercase text-slate/70">
                {[CONTACT.jurisdiction, CONTACT.registrationNo && `No. ${CONTACT.registrationNo}`]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            )}
          </div>
          <p className="font-mono text-mono-xs uppercase text-slate/70">
            Cookieless · No trackers · Self-hosted fonts
          </p>
        </div>
      </div>
    </footer>
  );
}
