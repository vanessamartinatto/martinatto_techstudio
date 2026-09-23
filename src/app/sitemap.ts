import type { MetadataRoute } from "next";

/* SEO — Sitemap dinâmico servido em /sitemap.xml.
   Se mudar o domínio, atualize também layout.tsx e public/robots.txt. */
const SITE_URL = "https://martinatto-techstudio.onrender.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}