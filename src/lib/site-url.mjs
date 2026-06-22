const DEVELOPMENT_SITE_URL = "http://localhost:4321";

function isLocalhost(hostname) {
  return (
    hostname === "localhost" ||
    hostname.endsWith(".localhost") ||
    hostname === "127.0.0.1" ||
    hostname === "0.0.0.0" ||
    hostname === "[::1]"
  );
}

export function getSiteUrl(value, { production = false } = {}) {
  const rawValue = value?.trim();

  if (!rawValue) {
    if (!production) return DEVELOPMENT_SITE_URL;

    throw new Error(
      "PUBLIC_SITE_URL is required for production builds. Set it to the absolute canonical HTTP/HTTPS origin."
    );
  }

  let siteUrl;

  try {
    siteUrl = new URL(rawValue);
  } catch {
    throw new Error(
      `PUBLIC_SITE_URL must be a valid absolute HTTP/HTTPS origin. Received: ${JSON.stringify(rawValue)}`
    );
  }

  if (siteUrl.protocol !== "http:" && siteUrl.protocol !== "https:") {
    throw new Error(
      `PUBLIC_SITE_URL must use http:// or https://. Received: ${JSON.stringify(rawValue)}`
    );
  }

  const isOriginOnly =
    siteUrl.pathname === "/" &&
    !siteUrl.search &&
    !siteUrl.hash &&
    !siteUrl.username &&
    !siteUrl.password;

  if (!isOriginOnly) {
    throw new Error(
      `PUBLIC_SITE_URL must be an origin without a path, query, hash, or credentials. Received: ${JSON.stringify(rawValue)}`
    );
  }

  if (production && isLocalhost(siteUrl.hostname)) {
    throw new Error(
      `PUBLIC_SITE_URL cannot resolve to localhost in production. Received: ${JSON.stringify(rawValue)}`
    );
  }

  return siteUrl.origin;
}

export function getAstroMode(argv = process.argv, nodeEnv = process.env.NODE_ENV) {
  const modeFlagIndex = argv.findIndex((argument) => argument === "--mode");
  const inlineMode = argv.find((argument) => argument.startsWith("--mode="));

  if (modeFlagIndex !== -1 && argv[modeFlagIndex + 1]) return argv[modeFlagIndex + 1];
  if (inlineMode) return inlineMode.slice("--mode=".length);

  if (argv.includes("build")) return "production";
  if (argv.some((argument) => ["dev", "check", "sync"].includes(argument))) {
    return "development";
  }

  return nodeEnv === "production" ? "production" : "development";
}
