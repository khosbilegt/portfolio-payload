import { HeroBlock } from '@/blocks/hero/config'
import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    livePreview: {
      url: ({ data }) => {
        return typeof data?.slug === 'string' ? data.slug : ''
      },
    },
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
    },
    {
      name: 'date',
      type: 'date',
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'isPublic',
      type: 'checkbox',
    },
    {
      name: 'blocks',
      type: 'blocks',
      blocks: [HeroBlock],
    },
  ],
}
