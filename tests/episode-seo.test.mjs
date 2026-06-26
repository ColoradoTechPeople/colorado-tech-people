import assert from "node:assert/strict";
import test from "node:test";

import {
  firstMetadataText,
  getEpisodeCanonicalUrl,
  metadataPlainText,
  resolveOgImage,
  resolvePageTitle,
} from "../src/lib/episode-seo.mjs";

test("preserves an explicit SEO title and applies the fallback suffix exactly once", () => {
  assert.equal(
    resolvePageTitle({
      title: "A Complete Editorial Title",
      siteName: "Colorado Tech People",
      completeTitle: true,
    }),
    "A Complete Editorial Title",
  );
  assert.equal(
    resolvePageTitle({title: "Episode Name", siteName: "Colorado Tech People"}),
    "Episode Name | Colorado Tech People",
  );
  assert.equal(
    resolvePageTitle({
      title: "Episode Name | Colorado Tech People",
      siteName: "Colorado Tech People",
    }),
    "Episode Name | Colorado Tech People",
  );
});

test("uses every explicit value from a fully populated episode SEO fixture", () => {
  assert.equal(
    resolvePageTitle({
      title: "Complete CMS Title",
      siteName: "Colorado Tech People",
      completeTitle: true,
    }),
    "Complete CMS Title",
  );
  assert.equal(firstMetadataText(["Complete CMS description", "Excerpt"]), "Complete CMS description");
  assert.equal(
    getEpisodeCanonicalUrl({
      slug: "fixture-episode",
      canonicalUrl: "https://example.com/canonical-episode",
    }),
    "https://example.com/canonical-episode",
  );
  assert.equal(
    resolveOgImage({
      pageImage: "https://cdn.sanity.io/episode-og.png",
      defaultImage: "https://cdn.sanity.io/default-og.png",
      fallbackImage: "/fallback.png",
    }),
    "https://cdn.sanity.io/episode-og.png",
  );
});

test("selects the first non-empty normalized description", () => {
  assert.equal(
    firstMetadataText([" ", "Excerpt\u0000 text", "Summary text"]),
    "Excerpt text",
  );
});

test("uses the global Open Graph image when an episode image is absent", () => {
  assert.equal(
    resolveOgImage({
      pageImage: undefined,
      defaultImage: "https://cdn.sanity.io/default-og.png",
      fallbackImage: "/fallback.png",
    }),
    "https://cdn.sanity.io/default-og.png",
  );
  assert.equal(
    resolveOgImage({fallbackImage: "/fallback.png"}),
    "/fallback.png",
  );
});

test("generates the authoritative episode self-canonical", () => {
  assert.equal(
    getEpisodeCanonicalUrl({ slug: "founder-stories" }),
    "https://www.coloradotechpeople.com/episodes/founder-stories",
  );
});

test("uses an absolute HTTP or HTTPS canonical override", () => {
  assert.equal(
    getEpisodeCanonicalUrl({
      slug: "founder-stories",
      canonicalUrl: "https://example.com/editorial/founder-stories",
    }),
    "https://example.com/editorial/founder-stories",
  );
});

test("warns once and falls back when a canonical override is invalid", () => {
  const warnings = [];
  const canonicalUrl = getEpisodeCanonicalUrl({
    slug: "founder-stories",
    canonicalUrl: "not an absolute URL",
    episodeLabel: "founder-stories",
    warn: (message) => warnings.push(message),
  });

  assert.equal(canonicalUrl, "https://www.coloradotechpeople.com/episodes/founder-stories");
  assert.equal(warnings.length, 1);
  assert.match(warnings[0], /founder-stories/);
  assert.doesNotMatch(warnings[0], /not an absolute URL/);
});

test("converts structured content and unsafe metadata text to plain text", () => {
  assert.equal(
    metadataPlainText([
      {_type: "block", children: [{_type: "span", text: "First line"}]},
      {_type: "block", children: [{_type: "span", text: "Second <em>line</em>\u0000"}]},
    ]),
    "First line Second line",
  );
});
