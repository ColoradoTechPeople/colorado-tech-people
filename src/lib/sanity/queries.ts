/**
 * Shared visibility constraint for all public episode queries.
 *
 * Compose this into public GROQ selectors so only published episodes are
 * exposed on public routes and sitemap output.
 */
export const PUBLISHED_EPISODE_FILTER = '_type == "episode" && status == "published"';

/**
 * Public shell site settings used for global header/footer/layout content.
 */
export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  siteName,
  podcastName,
  positioningStatement,
  logo{
    alt,
    caption,
    asset->{
      url
    }
  },
  defaultSeoTitle,
  defaultSeoDescription,
  defaultOgImage{
    alt,
    caption,
    asset->{
      url
    }
  },
  riversideRssUrl,
  podcastPlatformLinks[]{label, url},
  socialLinks[]{label, url}
}`;

const episodeListProjection = `{
  _id,
  title,
  "slug": slug.current,
  publishDate,
  excerpt,
  summary,
  guestName,
  guestTitle,
  guestCompany,
  episodeNumber,
  topics[]->{
    _id,
    title,
    "slug": slug.current
  },
  episodeImage{
    alt,
    caption,
    asset->{
      url
    }
  },
  riversideEpisodeUrl,
  applePodcastsUrl,
  spotifyUrl,
  youtubeUrl,
  generalEpisodeUrl
}`;

export const featuredEpisodeQuery = `*[
  ${PUBLISHED_EPISODE_FILTER} && defined(slug.current)
] | order(publishDate desc, _createdAt desc)[0] ${episodeListProjection}`;

export const recentEpisodesQuery = `*[
  ${PUBLISHED_EPISODE_FILTER} &&
  defined(slug.current) &&
  (!defined($excludeId) || _id != $excludeId)
] | order(publishDate desc, _createdAt desc)[0...6] ${episodeListProjection}`;

export const allPublishedEpisodesQuery = `*[
  ${PUBLISHED_EPISODE_FILTER} && defined(slug.current)
] | order(publishDate desc, _createdAt desc) ${episodeListProjection}`;

export const episodeBySlugQuery = `*[
  ${PUBLISHED_EPISODE_FILTER} && slug.current == $slug
][0]{
  _id,
  title,
  "slug": slug.current,
  publishDate,
  summary,
  excerpt,
  guestName,
  guestTitle,
  guestCompany,
  guestBio,
  episodeNumber,
  topics[]->{
    _id,
    title,
    "slug": slug.current
  },
  episodeImage{
    alt,
    caption,
    asset->{
      url
    }
  },
  showNotes,
  linksMentioned[]{
    label,
    url
  },
  transcript,
  riversideEpisodeUrl,
  riversideEmbedUrl,
  riversideEmbedCode,
  applePodcastsUrl,
  spotifyUrl,
  youtubeUrl,
  generalEpisodeUrl,
  seoTitle,
  seoDescription,
  canonicalUrl,
  ogImage{
    alt,
    caption,
    asset->{
      url
    }
  }
}`;
export const topicsQuery = '';
