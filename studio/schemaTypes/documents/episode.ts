import {defineArrayMember, defineField, defineType, getPublishedId} from 'sanity';

type EpisodeStatus = 'draft' | 'published' | 'archived';

type EpisodeDocumentValidation = {
  _id?: string;
  status?: EpisodeStatus;
  title?: string;
  slug?: {current?: string};
  publishDate?: string;
  summary?: string;
  excerpt?: string;
  riversideEpisodeUrl?: string;
  riversideEmbedUrl?: string;
  riversideEmbedCode?: string;
  applePodcastsUrl?: string;
  spotifyUrl?: string;
  youtubeUrl?: string;
  generalEpisodeUrl?: string;
};

const STATUS_VALUES: EpisodeStatus[] = ['draft', 'published', 'archived'];

const hasText = (value?: string) => Boolean(value && value.trim().length > 0);
const isPublishedEpisode = (document?: EpisodeDocumentValidation) => document?.status === 'published';

const hasListeningOption = (document?: EpisodeDocumentValidation) => {
  if (!document) return false;

  return [
    document.riversideEpisodeUrl,
    document.riversideEmbedUrl,
    document.riversideEmbedCode,
    document.applePodcastsUrl,
    document.spotifyUrl,
    document.youtubeUrl,
    document.generalEpisodeUrl,
  ].some((value) => hasText(value));
};

const isUniqueEpisodeSlug = async (
  slug: string,
  context: {
    document?: EpisodeDocumentValidation;
    getClient: (options: {apiVersion: string}) => {fetch: <T>(query: string, params: Record<string, unknown>) => Promise<T>};
  },
) => {
  if (!slug) return true;

  const id = context.document?._id;
  if (!id) return true;

  const client = context.getClient({apiVersion: '2025-02-19'});
  const publishedId = getPublishedId(id);

  const params = {
    draft: `drafts.${publishedId}`,
    published: publishedId,
    slug,
  };

  const query = `!defined(*[
    !(_id in [$draft, $published]) &&
    _type == "episode" &&
    slug.current == $slug
  ][0]._id)`;

  return client.fetch<boolean>(query, params);
};

export const episode = defineType({
  name: 'episode',
  title: 'Episode',
  type: 'document',
  groups: [
    {name: 'editorial', title: 'Editorial', default: true},
    {name: 'guest', title: 'Guest'},
    {name: 'listening', title: 'Listening'},
    {name: 'media', title: 'Media'},
    {name: 'seo', title: 'SEO'},
    {name: 'internal', title: 'Internal'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'editorial',
      description: 'Public episode title shown across listings, detail pages, and shares.',
      validation: (rule) =>
        rule
          .max(140)
          .warning('Keep the title under 140 characters for readability.')
          .custom((value, context) => {
            const doc = context.document as EpisodeDocumentValidation | undefined;
            if (isPublishedEpisode(doc) && !hasText(value)) {
              return 'Add an episode title before publishing.';
            }

            return true;
          }),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'editorial',
      description: 'Unique URL path segment used for /episodes/[slug].',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: isUniqueEpisodeSlug,
      },
      validation: (rule) =>
        rule.custom((value, context) => {
          const doc = context.document as EpisodeDocumentValidation | undefined;
          if (isPublishedEpisode(doc) && !hasText(value?.current)) {
            return 'Add a slug before publishing so this episode can have a web page URL.';
          }

          return true;
        }),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'editorial',
      description: 'Draft is private, Published is public, Archived is removed from public views.',
      options: {
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'Published', value: 'published'},
          {title: 'Archived', value: 'archived'},
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (rule) =>
        rule
          .required()
          .error('Choose a status: Draft, Published, or Archived.')
          .custom((value) => {
            if (!value) return true;
            return STATUS_VALUES.includes(value as EpisodeStatus) || 'Status must be Draft, Published, or Archived.';
          }),
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish Date',
      type: 'datetime',
      group: 'editorial',
      description: 'Use the intended public publish date/time. Required when status is Published.',
      validation: (rule) =>
        rule.custom((value, context) => {
          const doc = context.document as EpisodeDocumentValidation | undefined;
          if (isPublishedEpisode(doc) && !value) {
            return 'Published episodes need a publish date before they can go live.';
          }

          return true;
        }),
    }),
    defineField({
      name: 'episodeNumber',
      title: 'Episode Number',
      type: 'number',
      group: 'editorial',
      description: 'Optional episode number for display (for example: 42).',
      validation: (rule) => rule.integer().min(1),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 6,
      group: 'editorial',
      description: 'Primary summary shown on the episode page. Required when status is Published.',
      validation: (rule) =>
        rule.custom((value, context) => {
          const doc = context.document as EpisodeDocumentValidation | undefined;
          if (isPublishedEpisode(doc) && !hasText(value)) {
            return 'Add a summary before publishing so listeners know what this episode covers.';
          }

          return true;
        }),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      group: 'editorial',
      description: 'Short listing excerpt. Required when status is Published.',
      validation: (rule) =>
        rule.custom((value, context) => {
          const doc = context.document as EpisodeDocumentValidation | undefined;
          if (isPublishedEpisode(doc) && !hasText(value)) {
            return 'Add a short excerpt before publishing so this episode can be listed clearly.';
          }

          return true;
        }),
    }),
    defineField({
      name: 'topics',
      title: 'Topics',
      type: 'array',
      group: 'editorial',
      description: 'Optional topics for editorial organization. Search existing topics or create a new one inline.',
      options: {
        layout: 'tags',
      },
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'topic'}],
        }),
      ],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: 'guestName',
      title: 'Guest Name',
      type: 'string',
      group: 'guest',
      description: 'Optional featured guest name.',
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: 'guestTitle',
      title: 'Guest Title',
      type: 'string',
      group: 'guest',
      description: 'Optional guest role/title (for example: Founder & CEO).',
      validation: (rule) => rule.max(140),
    }),
    defineField({
      name: 'guestCompany',
      title: 'Guest Company',
      type: 'string',
      group: 'guest',
      description: 'Optional company or organization name.',
      validation: (rule) => rule.max(140),
    }),
    defineField({
      name: 'guestBio',
      title: 'Guest Bio',
      type: 'portableText',
      group: 'guest',
      description: 'Optional short bio rendered as indexable rich text.',
    }),
    defineField({
      name: 'riversideEpisodeUrl',
      title: 'Riverside Episode URL',
      type: 'url',
      group: 'listening',
      description: 'Public Riverside episode page URL.',
      validation: (rule) =>
        rule.uri({allowRelative: false, scheme: ['http', 'https']}).error('Enter a full URL starting with http:// or https://.'),
    }),
    defineField({
      name: 'riversideEmbedUrl',
      title: 'Riverside Embed URL',
      type: 'url',
      group: 'listening',
      description: 'Optional embeddable Riverside player URL.',
      validation: (rule) =>
        rule.uri({allowRelative: false, scheme: ['http', 'https']}).error('Enter a full URL starting with http:// or https://.'),
    }),
    defineField({
      name: 'riversideEmbedCode',
      title: 'Riverside Embed Code',
      type: 'text',
      rows: 4,
      group: 'listening',
      description: 'Optional iframe/embed code if Riverside provides code instead of URL.',
    }),
    defineField({
      name: 'riversideRssGuid',
      title: 'Riverside RSS GUID',
      type: 'string',
      group: 'internal',
      description: 'Optional Riverside/RSS GUID for future import and deduplication workflows.',
      validation: (rule) => rule.max(255),
    }),
    defineField({
      name: 'applePodcastsUrl',
      title: 'Apple Podcasts URL',
      type: 'url',
      group: 'listening',
      validation: (rule) =>
        rule.uri({allowRelative: false, scheme: ['http', 'https']}).error('Enter a full URL starting with http:// or https://.'),
    }),
    defineField({
      name: 'spotifyUrl',
      title: 'Spotify URL',
      type: 'url',
      group: 'listening',
      validation: (rule) =>
        rule.uri({allowRelative: false, scheme: ['http', 'https']}).error('Enter a full URL starting with http:// or https://.'),
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      group: 'listening',
      validation: (rule) =>
        rule.uri({allowRelative: false, scheme: ['http', 'https']}).error('Enter a full URL starting with http:// or https://.'),
    }),
    defineField({
      name: 'generalEpisodeUrl',
      title: 'General Episode URL',
      type: 'url',
      group: 'listening',
      description: 'Optional fallback URL when platform-specific links are unavailable.',
      validation: (rule) =>
        rule.uri({allowRelative: false, scheme: ['http', 'https']}).error('Enter a full URL starting with http:// or https://.'),
    }),
    defineField({
      name: 'showNotes',
      title: 'Show Notes',
      type: 'portableText',
      group: 'editorial',
      description: 'Optional edited show notes rendered as readable, indexable content.',
    }),
    defineField({
      name: 'transcript',
      title: 'Transcript',
      type: 'portableText',
      group: 'editorial',
      description: 'Optional transcript content. Leave empty when not available.',
    }),
    defineField({
      name: 'episodeImage',
      title: 'Episode Image',
      type: 'imageWithAlt',
      group: 'media',
      description: 'Optional episode artwork. Alt text is required when an image is added.',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      description: 'Optional override for browser title, search snippets, and social cards.',
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      group: 'seo',
      description: 'Optional meta description override for search and sharing.',
      validation: (rule) =>
        rule.max(160).warning('Try to keep this under 160 characters so search snippets are less likely to get cut off.'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'imageWithAlt',
      group: 'seo',
      description: 'Optional social share image override.',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      group: 'seo',
      description: 'Optional canonical URL if this episode appears in multiple locations.',
      validation: (rule) =>
        rule.uri({allowRelative: false, scheme: ['http', 'https']}).error('Enter a full URL starting with http:// or https://.'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      status: 'status',
      publishDate: 'publishDate',
      media: 'episodeImage',
    },
    prepare(selection) {
      const {title, status, publishDate, media} = selection;
      const normalizedStatus = status ? String(status) : 'draft';
      const statusLabel = normalizedStatus.charAt(0).toUpperCase() + normalizedStatus.slice(1);
      const parts = [statusLabel];

      if (publishDate) {
        const parsedDate = new Date(String(publishDate));
        if (!Number.isNaN(parsedDate.getTime())) {
          parts.push(parsedDate.toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'}));
        }
      }

      return {
        title: title || 'Untitled episode',
        subtitle: parts.join(' - '),
        media,
      };
    },
  },
  validation: (rule) =>
    rule.custom((document) => {
      const doc = document as EpisodeDocumentValidation | undefined;
      if (!isPublishedEpisode(doc)) return true;

      if (!hasListeningOption(doc)) {
        return 'Before publishing, add at least one listening option (Riverside, Apple Podcasts, Spotify, YouTube, or another episode URL/embed).';
      }

      return true;
    }),
});
