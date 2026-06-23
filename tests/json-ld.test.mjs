import assert from "node:assert/strict";
import test from "node:test";

import { absoluteHttpUrl, publicPodcastFeedUrl, serializeJsonLd } from "../src/lib/json-ld.mjs";

test("serializeJsonLd prevents script termination and preserves parseable data", () => {
  const value = { text: "</script><script>alert(1)</script>\u2028next\u2029line" };
  const serialized = serializeJsonLd(value);

  assert.equal(serialized.includes("<"), false);
  assert.equal(serialized.includes("\\u2028"), true);
  assert.equal(serialized.includes("\\u2029"), true);
  assert.deepEqual(JSON.parse(serialized), value);
});

test("absoluteHttpUrl accepts only absolute HTTP URLs", () => {
  assert.equal(absoluteHttpUrl("https://example.com/image.png"), "https://example.com/image.png");
  assert.equal(absoluteHttpUrl("/image.png"), "");
  assert.equal(absoluteHttpUrl("data:image/png;base64,abc"), "");
});

test("publicPodcastFeedUrl only accepts feed-looking absolute URLs", () => {
  assert.equal(
    publicPodcastFeedUrl("https://feeds.riverside.fm/colorado-tech-people/rss"),
    "https://feeds.riverside.fm/colorado-tech-people/rss",
  );
  assert.equal(publicPodcastFeedUrl("https://example.com/podcast"), "");
});
