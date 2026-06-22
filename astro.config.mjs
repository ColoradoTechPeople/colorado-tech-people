import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import { getAstroMode, getSiteUrl } from "./src/lib/site-url.mjs";

const mode = getAstroMode();
const env = loadEnv(mode, process.cwd(), "");

export default defineConfig({
  output: "static",
  site: getSiteUrl(env.PUBLIC_SITE_URL, { production: mode !== "development" }),
});
