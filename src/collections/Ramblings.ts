import { CollectionConfig } from 'payload'

export const Ramblings: CollectionConfig = {
  slug: 'ramblings',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedAt', 'tone'],
    livePreview: {
      url: ({ data }) =>
        typeof data?.slug === 'string' && data.slug.length > 0
          ? `/ramblings/${data.slug}`
          : '/ramblings',
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'tone',
      type: 'select',
      label: 'Tone',
      options: [
        { label: 'Casual', value: 'casual' },
        { label: 'Reflective', value: 'reflective' },
        { label: 'Rant', value: 'rant' },
        { label: 'Changelog', value: 'changelog' },
      ],
      defaultValue: 'casual',
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'Used for ordering and RSS feeds.',
      },
      defaultValue: () => new Date().toISOString(),
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
  ],
}
