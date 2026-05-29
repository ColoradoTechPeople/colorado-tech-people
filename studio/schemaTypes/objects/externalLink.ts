import {defineField, defineType} from 'sanity';

export const externalLink = defineType({
  name: 'externalLink',
  title: 'External Link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Link Label',
      type: 'string',
      description: 'Human-friendly label, such as "Read more" or "Company site".',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'Full URL including https://',
      validation: (rule) => rule.required().uri({allowRelative: false, scheme: ['http', 'https']}),
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'url',
    },
  },
});
