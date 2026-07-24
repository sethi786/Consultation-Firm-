import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICE_SLUGS, type ServiceSlug } from "@/content/services";
import { getServiceDetail } from "@/content/services/details";
import { ServiceTemplate } from "@/components/marketing/ServiceTemplate";
import { ServiceJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

function isServiceSlug(slug: string): slug is ServiceSlug {
  return (SERVICE_SLUGS as readonly string[]).includes(slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isServiceSlug(slug)) return {};
  const service = getServiceDetail(slug);
  return {
    title: service.seo.title,
    description: service.seo.description,
    alternates: { canonical: `/services/${slug}` },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isServiceSlug(slug)) notFound();
  const service = getServiceDetail(slug);
  return (
    <>
      <ServiceJsonLd service={service} />
      <FaqJsonLd service={service} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.name, path: `/services/${slug}` },
        ]}
      />
      <ServiceTemplate service={service} />
    </>
  );
}
