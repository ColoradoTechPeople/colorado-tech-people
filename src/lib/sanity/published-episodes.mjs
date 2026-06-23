const PRODUCTION_FETCH_ERROR =
  "Published episode data could not be fetched from Sanity. Production build aborted.";
const DEVELOPMENT_FETCH_WARNING =
  "Published episode data could not be fetched from Sanity. Continuing without episode pages in development.";

export async function fetchPublishedEpisodes({ client, query, production, warn = console.warn }) {
  try {
    if (!client) throw new Error("Sanity client is not configured.");

    const episodes = await client.fetch(query);
    if (!Array.isArray(episodes)) throw new TypeError("Sanity returned an unusable episode response.");

    return episodes;
  } catch {
    if (production) throw new Error(PRODUCTION_FETCH_ERROR);

    warn(DEVELOPMENT_FETCH_WARNING);
    return [];
  }
}
