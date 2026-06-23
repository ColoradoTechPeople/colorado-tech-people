import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import { getAstroMode, getSiteUrl } from "./src/lib/site-url.mjs";

const mode = getAstroMode();
const env = loadEnv(mode, process.cwd(), "");
const excludedSitemapPaths = new Set(["/404", "/thank-you"]);

export default defineConfig({
  output: "static",
  site: getSiteUrl(env.PUBLIC_SITE_URL, { production: mode !== "development" }),
  integrations: [
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname.replace(/\/$/, "") || "/";
        return !excludedSitemapPaths.has(pathname);
      },
    }),
  ],
});
