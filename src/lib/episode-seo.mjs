export const EPISODE_CANONICAL_ORIGIN = "https://www.coloradotechpeople.com";

const CONTROL_CHARACTERS = /[\u0000-\u001F\u007F-\u009F]/g;
const HTML_TAGS = /<[^>]*>/g;

function decodeCodePoint(value, radix = 10) {
  const codePoint = Number.parseInt(value, radix);
  if (!Number.isInteger(codePoint) || codePoint < 0 || codePoint > 0x10ffff) return " ";

  return String.fromCodePoint(codePoint);
}

function decodeBasicHtmlEntities(value) {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&#(\d+);/g, (_, codePoint) => decodeCodePoint(codePoint))
    .replace(/&#x([\da-f]+);/gi, (_, codePoint) => decodeCodePoint(codePoint, 16));
}

export function metadataPlainText(value) {
  if (typeof value === "string") {
    return decodeBasicHtmlEntities(value.replace(HTML_TAGS, " "))
      .replace(CONTROL_CHARACTERS, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  if (!Array.isArray(value)) return "";

  return value
    .flatMap((block) => (Array.isArray(block?.children) ? block.children : []))
    .map((child) => metadataPlainText(child?.text))
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

export function firstMetadataText(values) {
  for (const value of values) {
    const normalizedValue = metadataPlainText(value);
    if (normalizedValue) return normalizedValue;
  }

  return "";
}

export function resolvePageTitle({ title, defaultTitle, siteName, completeTitle = false }) {
  const normalizedSiteName = metadataPlainText(siteName);
  const baseTitle = firstMetadataText([title, defaultTitle, normalizedSiteName]);

  if (
    completeTitle ||
    !normalizedSiteName ||
    baseTitle.toLowerCase().includes(normalizedSiteName.toLowerCase())
  ) {
    return baseTitle;
  }

  return `${baseTitle} | ${normalizedSiteName}`;
}

export function resolveOgImage({ pageImage, defaultImage, fallbackImage }) {
  return [pageImage, defaultImage, fallbackImage]
    .find((value) => typeof value === "string" && value.trim())
    ?.trim() || "";
}

export function getEpisodeCanonicalUrl({ canonicalUrl, slug, episodeLabel, warn = console.warn }) {
  const selfCanonical = new URL(`/episodes/${encodeURIComponent(slug)}`, EPISODE_CANONICAL_ORIGIN).toString();
  const override = typeof canonicalUrl === "string" ? canonicalUrl.trim() : "";

  if (!override) return selfCanonical;

  try {
    const parsedOverride = new URL(override);
    if (parsedOverride.protocol === "http:" || parsedOverride.protocol === "https:") {
      return parsedOverride.toString();
    }
  } catch {
    // The warning below handles malformed and unsupported override values uniformly.
  }

  warn(
    `[episode-seo] Ignoring invalid canonical override for episode ${JSON.stringify(episodeLabel || slug)}; using the generated self-canonical.`,
  );
  return selfCanonical;
}
