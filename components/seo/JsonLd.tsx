import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, absoluteUrl } from "@/lib/site";
import type { ServiceDetail } from "@/content/services/types";

/**
 * JSON-LD structured data (§8 SEO). `application/ld+json` is a data block, not an
 * executed script, so it is not subject to the CSP script-src (Phase 7).
 */
function Ld({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Data is fully controlled (no user input); safe to inject.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        logo: absoluteUrl("/opengraph-image"),
        image: absoluteUrl("/opengraph-image"),
        // sameAs (social profiles) and contactPoint (phone/email) are added once
        // those real business facts exist — never fabricated (CLAUDE.md §5).
      }}
    />
  );
}

export function ServiceJsonLd({ service }: { service: ServiceDetail }) {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.name,
        description: service.seo.description,
        serviceType: service.name,
        url: absoluteUrl(`/services/${service.slug}`),
        provider: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
        areaServed: "Global",
      }}
    />
  );
}

export function FaqJsonLd({ service }: { service: ServiceDetail }) {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: service.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((it, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: it.name,
          item: absoluteUrl(it.path),
        })),
      }}
    />
  );
}
