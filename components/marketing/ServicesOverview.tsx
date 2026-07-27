import Link from "next/link";
import { Container, Eyebrow, Reveal } from "@/components/ui";
import { SERVICES_BY_DOMAIN, SERVICE_LIST, DOMAINS } from "@/content/services";

/**
 * Homepage services section — a compact, scannable category directory
 * (Softchoice-style), not the full 41-card catalogue. Each category lists its
 * services as links; the rich per-service cards live on /services. Keeps the
 * homepage calm while still showing the full breadth of the estate.
 */
export function ServicesOverview({ index = 4 }: { index?: number }) {
  return (
    <Container as="section" className="py-12 md:py-28">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <Eyebrow index={index} className="text-center">Services</Eyebrow>
        <h2 className="mt-3 text-h2 text-ink text-balance">
          Everything you need, organised the way you think about your estate.
        </h2>
        <p className="mt-4 text-body text-slate">
          {SERVICE_LIST.length} services across {DOMAINS.length} categories — from AI and
          cloud security to managed detection, identity and compliance.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES_BY_DOMAIN.map((group, gi) => (
          <Reveal
            key={group.domain}
            delay={(gi % 3) * 90}
            className="sheen relative flex flex-col overflow-hidden rounded-3xl border border-rule bg-surface p-7 transition-all duration-300 ease-doc hover:-translate-y-1 hover:border-pine hover:shadow-pop-sm"
          >
            <div className="flex items-baseline justify-between gap-3 border-b border-rule pb-4">
              <h3 className="inline-flex items-center gap-2 font-mono text-mono-xs uppercase tracking-mono text-slate">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-slate" />
                {group.domain}
              </h3>
              <span className="font-mono text-mono-xs text-slate/70">
                {group.services.length}
              </span>
            </div>
            <ul className="mt-4 flex flex-col gap-2.5">
              {group.services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group inline-flex items-baseline gap-2 text-small text-ink transition-colors hover:text-pine"
                  >
                    <span
                      aria-hidden="true"
                      className="font-mono text-mono-xs text-slate/50 transition-colors group-hover:text-pine"
                    >
                      →
                    </span>
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-surface px-6 py-3 font-body text-small font-medium text-ink transition-colors hover:border-pine"
        >
          Explore the full catalogue →
        </Link>
      </div>
    </Container>
  );
}
