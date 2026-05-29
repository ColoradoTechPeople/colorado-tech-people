import {defineField, defineType, getPublishedId} from 'sanity';

type TopicDocumentValidation = {
  _id?: string;
};

const isUniqueTopicSlug = async (
  slug: string,
  context: {
    document?: TopicDocumentValidation;
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
    _type == "topic" &&
    slug.current == $slug
  ][0]._id)`;

  return client.fetch<boolean>(query, params);
};

export const topic = defineType({
  name: 'topic',
  title: 'Topic',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Topic name shown to editors and (later) on episode/topic pages.',
      validation: (rule) =>
        rule.required().error('Add a topic title before saving.').max(80).warning('Keep the title under 80 characters for readability.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Unique URL-friendly identifier for future topic filters/pages.',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: isUniqueTopicSlug,
      },
      validation: (rule) =>
        rule.required().error('Add a slug so topics can be queried consistently in future site features.'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Optional short context about this topic for editors and future UI.',
      validation: (rule) => rule.max(200),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
    },
    prepare(selection) {
      return {
        title: selection.title || 'Untitled topic',
        subtitle: selection.subtitle ? `/${selection.subtitle}` : undefined,
      };
    },
  },
});
