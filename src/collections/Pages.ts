import { HeroBlock } from '@/blocks/hero/config'
import { CareerBlock } from '@/blocks/career/config'
import { EducationBlock } from '@/blocks/education/config'
import { TestimonialsBlock } from '@/blocks/testimonials/config'
import { ServicesBlock } from '@/blocks/services/config'
import { BlogCardsBlock } from '@/blocks/blogCards/config'
import { DonationBlock } from '@/blocks/donation/config'
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
      blocks: [
        HeroBlock,
        CareerBlock,
        EducationBlock,
        TestimonialsBlock,
        ServicesBlock,
        BlogCardsBlock,
        DonationBlock,
      ],
    },
  ],
}
