/**
 * Phase 1 scaffolding for public-site Sanity queries.
 *
 * Keep these exports intentionally minimal until Phase 2 schema work is in place.
 */

/**
 * Shared visibility constraint for all public episode queries.
 *
 * This should be composed into future GROQ selectors so only published episodes
 * are exposed on public routes and sitemap output.
 */
export const PUBLISHED_EPISODE_FILTER = '_type == "episode" && status == "published"';

/**
 * Query placeholders for upcoming phases.
 * Replace with concrete GROQ in Phase 2/3 implementation work.
 */
export const siteSettingsQuery = '';
export const featuredEpisodeQuery = '';
export const recentEpisodesQuery = '';
export const allPublishedEpisodesQuery = '';
export const episodeBySlugQuery = '';
export const topicsQuery = '';
