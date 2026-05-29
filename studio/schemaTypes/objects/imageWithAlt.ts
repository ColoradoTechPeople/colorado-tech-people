import {defineField, defineType} from 'sanity';

export const imageWithAlt = defineType({
  name: 'imageWithAlt',
  title: 'Image With Alt Text',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Describe the image for screen readers. Keep it brief and specific.',
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional short caption shown with the image.',
      validation: (rule) => rule.max(200),
    }),
  ],
});
