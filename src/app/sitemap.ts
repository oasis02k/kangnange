import type { MetadataRoute } from "next";
import { client } from "../sanity/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs: { slug: string; _updatedAt: string }[] = await client.fetch(
    `*[_type == "case"]{ "slug": slug.current, _updatedAt }`
  );

  const caseSlugs: MetadataRoute.Sitemap = slugs.map(({ slug, _updatedAt }) => ({
    url: `https://kangnange.com/cases/${slug}`,
    lastModified: new Date(_updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: "https://kangnange.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://kangnange.com/cases",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://kangnange.com/contact",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    ...caseSlugs,
  ];
}
