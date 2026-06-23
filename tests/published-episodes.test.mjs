import assert from "node:assert/strict";
import test from "node:test";

import { fetchPublishedEpisodes } from "../src/lib/sanity/published-episodes.mjs";

const query = '*[_type == "episode" && status == "published"]';

test("returns published episode results from a successful query", async () => {
  const episodes = [{ _id: "episode-1", slug: "published-episode" }];
  const client = { fetch: async () => episodes };

  assert.deepEqual(
    await fetchPublishedEpisodes({ client, query, production: true }),
    episodes,
  );
});

test("accepts a successful query with zero published episodes", async () => {
  const client = { fetch: async () => [] };

  assert.deepEqual(
    await fetchPublishedEpisodes({ client, query, production: true }),
    [],
  );
});

test("fails production when the Sanity query throws", async () => {
  const client = {
    fetch: async () => {
      throw new Error("request failed with sensitive details");
    },
  };

  await assert.rejects(
    fetchPublishedEpisodes({ client, query, production: true }),
    (error) => {
      assert.match(error.message, /Published episode data could not be fetched from Sanity/);
      assert.doesNotMatch(error.message, /sensitive details/);
      return true;
    },
  );
});

test("fails production when Sanity returns an unusable response", async () => {
  const client = { fetch: async () => null };

  await assert.rejects(
    fetchPublishedEpisodes({ client, query, production: true }),
    /Published episode data could not be fetched from Sanity/,
  );
});

test("warns and continues without episode paths in development", async () => {
  const warnings = [];
  const client = { fetch: async () => Promise.reject(new Error("offline")) };

  assert.deepEqual(
    await fetchPublishedEpisodes({
      client,
      query,
      production: false,
      warn: (message) => warnings.push(message),
    }),
    [],
  );
  assert.equal(warnings.length, 1);
  assert.match(warnings[0], /Continuing without episode pages in development/);
});
