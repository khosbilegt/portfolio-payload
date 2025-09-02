import { HeroBlock } from '@/blocks/hero/config'
import { CareerBlock } from '@/blocks/career/config'
import { EducationBlock } from '@/blocks/education/config'
import { TestimonialsBlock } from '@/blocks/testimonials/config'
import { CertificatesBlock } from '@/blocks/certificates/config'
import { ServicesBlock } from '@/blocks/services/config'
import { BlogCardsBlock } from '@/blocks/blogCards/config'
import { DonationBlock } from '@/blocks/donation/config'
import { ProjectShowcaseBlock } from '@/blocks/projectShowcase/config'
import type { CollectionConfig } from 'payload'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

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
      name: 'blocks',
      type: 'blocks',
      blocks: [
        HeroBlock,
        CareerBlock,
        EducationBlock,
        TestimonialsBlock,
        CertificatesBlock,
        ServicesBlock,
        BlogCardsBlock,
        DonationBlock,
        ProjectShowcaseBlock,
      ],
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'meta',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
  ],
}
