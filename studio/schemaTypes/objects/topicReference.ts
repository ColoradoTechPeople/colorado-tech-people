import {defineField, defineType} from 'sanity';

export const topicReference = defineType({
  name: 'topicReference',
  title: 'Topic Reference',
  type: 'object',
  fields: [
    defineField({
      name: 'topic',
      title: 'Topic',
      type: 'reference',
      to: [{type: 'topic'}],
      description: 'Select an existing topic document.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'contextNote',
      title: 'Context Note',
      type: 'string',
      description: 'Optional editor note on how this topic applies to this episode.',
      validation: (rule) => rule.max(140),
    }),
  ],
  preview: {
    select: {
      title: 'topic.title',
      subtitle: 'contextNote',
    },
    prepare(selection) {
      return {
        title: selection.title || 'Untitled topic',
        subtitle: selection.subtitle,
      };
    },
  },
});
