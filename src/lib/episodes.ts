export interface TopicTag {
  _id?: string;
  title?: string;
  slug?: string;
}

export interface SanityImageWithAlt {
  alt?: string;
  caption?: string;
  asset?: {
    url?: string;
  };
}

export interface ExternalLink {
  label?: string;
  url?: string;
}

export interface PortableTextSpan {
  _type?: "span";
  text?: string;
}

export interface PortableTextBlock {
  _type?: string;
  style?: string;
  listItem?: "bullet" | "number";
  level?: number;
  children?: PortableTextSpan[];
}

export interface EpisodeBase {
  _id: string;
  title?: string;
  slug?: string;
  publishDate?: string;
  excerpt?: string;
  summary?: string;
  guestName?: string;
  guestTitle?: string;
  guestCompany?: string;
  guestBio?: PortableTextBlock[];
  episodeNumber?: number;
  topics?: TopicTag[];
  episodeImage?: SanityImageWithAlt;
  showNotes?: PortableTextBlock[];
  transcript?: PortableTextBlock[];
  riversideEpisodeUrl?: string;
  riversideEmbedUrl?: string;
  riversideEmbedCode?: string;
  applePodcastsUrl?: string;
  spotifyUrl?: string;
  youtubeUrl?: string;
  generalEpisodeUrl?: string;
  linksMentioned?: ExternalLink[];
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  ogImage?: SanityImageWithAlt;
}

export interface EpisodeListenLink {
  label: string;
  href: string;
}

export const FALLBACK_EPISODE_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 675'%3E%3Crect width='1200' height='675' fill='%23f1f5fb'/%3E%3Crect x='48' y='48' width='1104' height='579' rx='24' fill='%23ffffff' stroke='%23cdd8e8' stroke-width='8'/%3E%3Ctext x='600' y='325' text-anchor='middle' fill='%2313243a' font-family='Georgia,serif' font-size='58'%3EColorado Tech People%3C/text%3E%3Ctext x='600' y='390' text-anchor='middle' fill='%233f526b' font-family='Segoe UI,Arial,sans-serif' font-size='32'%3EEpisode Artwork%3C/text%3E%3C/svg%3E";

export const formatPublishDate = (value?: string) => {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
};

export const getEpisodeListenLinks = (episode?: EpisodeBase | null): EpisodeListenLink[] => {
  if (!episode) return [];

  const links: EpisodeListenLink[] = [
    { label: "Riverside", href: episode.riversideEpisodeUrl || "" },
    { label: "Apple Podcasts", href: episode.applePodcastsUrl || "" },
    { label: "Spotify", href: episode.spotifyUrl || "" },
    { label: "YouTube", href: episode.youtubeUrl || "" },
    { label: "Episode Link", href: episode.generalEpisodeUrl || "" },
  ];

  return links.filter((link) => Boolean(link.href));
};

export const getPrimaryListenUrl = (episode?: EpisodeBase | null) =>
  episode?.riversideEpisodeUrl ||
  episode?.spotifyUrl ||
  episode?.applePodcastsUrl ||
  episode?.youtubeUrl ||
  episode?.generalEpisodeUrl;
