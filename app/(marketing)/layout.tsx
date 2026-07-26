import { SiteHeader } from "@/components/marketing/SiteHeader";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { Plausible } from "@/components/marketing/Plausible";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-pine focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <OrganizationJsonLd />
      <Plausible />
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
