import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { SERVICE_SLUGS } from "@/content/services";
import { INDUSTRY_SLUGS } from "@/content/industries";
import { INSIGHT_SLUGS } from "@/content/insights";

const LEGAL = ["security", "privacy", "terms", "dpa"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/solutions", priority: 0.9 },
    { path: "/managed-services", priority: 0.8 },
    { path: "/explore", priority: 0.8 },
    { path: "/posture", priority: 0.8 },
    { path: "/book", priority: 0.8 },
    { path: "/approach", priority: 0.7 },
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.9 },
    { path: "/insights", priority: 0.6 },
    { path: "/case-studies", priority: 0.6 },
  ];

  const entries: MetadataRoute.Sitemap = staticPages.map((p) => ({
    url: `${SITE_URL}${p.path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: p.priority,
  }));

  for (const slug of SERVICE_SLUGS) {
    entries.push({
      url: `${SITE_URL}/services/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }
  for (const slug of INDUSTRY_SLUGS) {
    entries.push({
      url: `${SITE_URL}/industries/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }
  for (const slug of INSIGHT_SLUGS) {
    entries.push({
      url: `${SITE_URL}/insights/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }
  for (const slug of LEGAL) {
    entries.push({
      url: `${SITE_URL}/legal/${slug}`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    });
  }

  return entries;
}
