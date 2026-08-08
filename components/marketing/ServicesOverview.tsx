import Link from "next/link";
import { Container, Eyebrow, Reveal, DomainIcon } from "@/components/ui";
import { SERVICES_BY_DOMAIN, SERVICE_LIST, DOMAINS, type Domain } from "@/content/services";
import { domainAccent } from "@/lib/accent";

/**
 * Homepage services section — twelve clean category tiles (big-firm IA:
 * Accenture/Softchoice show capabilities, not the whole SKU list). The 49
 * individual services live one click away in the mega-menu and /services.
 */
const DOMAIN_BLURB: Record<Domain, string> = {
  "AI & Data": "Secure the AI you ship and the data behind it.",
  "AI Operations": "AI-powered SOC, triage and service desk.",
  "Cloud & Infrastructure": "Azure & AWS posture, landing zones, segmentation.",
  "Identity & Access": "Entra ID, least privilege and zero trust.",
  "Endpoint & Application": "Devices, AppSec and vulnerability management.",
  "Detection & Response": "24/7 managed SOC, SIEM and incident response.",
  "Governance, Risk & Compliance": "SOC 2, ISO 27001, vendor risk and BCDR.",
  "Advisory & Assurance": "vCISO, pen testing and security architecture.",
  "Modern Workplace": "Microsoft 365, devices and adoption, managed.",
  "Data Center & Infrastructure": "Modernisation, hybrid cloud and backup.",
  "Networking": "SD-WAN, wireless and enterprise LAN.",
  "IT Asset Management": "Licensing, procurement and lifecycle.",
};

export function ServicesOverview({ index = 4 }: { index?: number }) {
  return (
    <Container as="section" className="py-12 md:py-28">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <Eyebrow index={index} className="text-center">Services</Eyebrow>
        <h2 className="mt-3 text-h2 text-ink text-balance">
          Everything you need, organised the way you think about your estate.
        </h2>
        <p className="mt-4 text-body text-slate">
          {SERVICE_LIST.length} services across {DOMAINS.length} practice areas.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES_BY_DOMAIN.map((group, gi) => {
          const a = domainAccent(group.domain);
          return (
            <Reveal key={group.domain} delay={(gi % 3) * 90} className="h-full">
              <Link
                href="/services"
                className="card-lift group flex h-full flex-col rounded-2xl border border-rule bg-surface p-6"
              >
                <div className="flex items-center justify-between">
                  <span
                    aria-hidden="true"
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${a.softBg}`}
                  >
                    <DomainIcon domain={group.domain} className={`h-5 w-5 ${a.softText}`} />
                  </span>
                  <span className="font-mono text-mono-xs uppercase text-slate">
                    {group.services.length} services
                  </span>
                </div>
                <h3 className="mt-4 font-display text-h3 leading-tight text-ink">
                  {group.domain}
                </h3>
                <p className="mt-2 flex-1 text-small text-slate">{DOMAIN_BLURB[group.domain]}</p>
                <span
                  aria-hidden="true"
                  className={`mt-4 font-mono text-mono-xs uppercase tracking-mono transition-transform duration-150 ease-doc group-hover:translate-x-1 ${a.text}`}
                >
                  Explore →
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 rounded border border-ink/25 bg-surface px-6 py-3 font-body text-small font-medium text-ink transition-colors hover:border-pine"
        >
          Explore the full catalogue →
        </Link>
      </div>
    </Container>
  );
}
