import {defineField, defineType} from 'sanity';

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'SEO Title',
      type: 'string',
      description: 'Title used in search results and social previews.',
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: 'description',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      description: 'Short summary for search engines and share cards.',
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'Optional preferred URL if this content appears in multiple places.',
      validation: (rule) => rule.uri({allowRelative: false}),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'imageWithAlt',
      description: 'Social share image. If empty, page defaults can be used.',
    }),
  ],
});
