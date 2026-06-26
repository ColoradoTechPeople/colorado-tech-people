const FEED_URL_PATTERN = /(?:riverside|rss|feed|\.xml)(?:[./?=&_-]|$)/i;

export function absoluteHttpUrl(value) {
  if (typeof value !== "string" || !value.trim()) return "";

  try {
    const url = new URL(value.trim());
    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : "";
  } catch {
    return "";
  }
}

export function publicPodcastFeedUrl(value) {
  const url = absoluteHttpUrl(value);
  return url && FEED_URL_PATTERN.test(url) ? url : "";
}

export function serializeJsonLd(value) {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
