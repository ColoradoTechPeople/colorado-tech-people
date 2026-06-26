import type { APIRoute } from "astro";

const SITEMAP_PATHNAME = "/sitemap-index.xml";

export const GET: APIRoute = ({ site }) => {
  if (!site) {
    throw new Error("Astro site is not configured. Check PUBLIC_SITE_URL validation in astro.config.mjs.");
  }

  const sitemapUrl = new URL(SITEMAP_PATHNAME, site);

  if (!["http:", "https:"].includes(sitemapUrl.protocol)) {
    throw new Error(`Invalid sitemap URL protocol: ${sitemapUrl.toString()}`);
  }

  const body = [`User-agent: *`, `Allow: /`, `Sitemap: ${sitemapUrl.toString()}`].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
