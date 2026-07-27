import Link from "next/link";
import { SERVICE_LIST } from "@/content/services";
import { INDUSTRIES } from "@/content/industries";
import { CONTACT } from "@/lib/site";

const COLUMNS: { heading: string; links: { href: string; label: string }[] }[] = [
  {
    heading: "Services",
    links: SERVICE_LIST.map((s) => ({ href: `/services/${s.slug}`, label: s.name })),
  },
  {
    heading: "Industries",
    links: INDUSTRIES.map((i) => ({ href: `/industries/${i.slug}`, label: i.name })),
  },
  {
    heading: "Firm",
    links: [
      { href: "/approach", label: "Approach" },
      { href: "/about", label: "About" },
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
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-h3 text-ink">Waypoint</span>
              <span className="font-mono text-mono-xs uppercase text-slate">Security</span>
            </div>
            <p className="mt-3 max-w-xs text-caption text-slate">
              Evidence-led security consulting and managed detection. We map your
              controls, close the gaps, and prove it.
            </p>
            {(CONTACT.email || CONTACT.phone || CONTACT.location) && (
              <ul className="mt-4 flex flex-col gap-1.5 text-caption text-slate">
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
                {CONTACT.location && <li>{CONTACT.location}</li>}
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

        {/* Colophon */}
        <div className="mt-14 flex flex-col gap-3 border-t border-rule pt-6 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-mono-xs uppercase text-slate">
            © {new Date().getFullYear()} Waypoint Security. All rights reserved.
          </p>
          <p className="font-mono text-mono-xs uppercase text-slate/70">
            Cookieless · No trackers · Self-hosted fonts
          </p>
        </div>
      </div>
    </footer>
  );
}
