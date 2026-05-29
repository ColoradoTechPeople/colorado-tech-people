import {defineField, defineType} from 'sanity';

export const podcastPlatformLinks = defineType({
  name: 'podcastPlatformLinks',
  title: 'Podcast Platform Links',
  type: 'object',
  description: 'Episode listening destinations. Add at least one published link for live episodes.',
  fields: [
    defineField({
      name: 'riversideEpisodeUrl',
      title: 'Riverside Episode URL',
      type: 'url',
      description: 'Public Riverside episode page URL.',
      validation: (rule) => rule.uri({allowRelative: false, scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'riversideEmbedUrl',
      title: 'Riverside Embed URL',
      type: 'url',
      description: 'Riverside embeddable player URL for this episode.',
      validation: (rule) => rule.uri({allowRelative: false, scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'applePodcastsUrl',
      title: 'Apple Podcasts URL',
      type: 'url',
      validation: (rule) => rule.uri({allowRelative: false, scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'spotifyUrl',
      title: 'Spotify URL',
      type: 'url',
      validation: (rule) => rule.uri({allowRelative: false, scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      validation: (rule) => rule.uri({allowRelative: false, scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'generalEpisodeUrl',
      title: 'General Episode URL',
      type: 'url',
      description: 'Fallback public episode URL if no platform-specific link is available.',
      validation: (rule) => rule.uri({allowRelative: false, scheme: ['http', 'https']}),
    }),
  ],
});
