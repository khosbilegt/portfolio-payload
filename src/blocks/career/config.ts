import { Block } from 'payload'

export const CareerBlock: Block = {
  slug: 'career',
  interfaceName: 'CareerBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Work Experience',
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'experiences',
      type: 'array',
      fields: [
        {
          name: 'company',
          type: 'text',
          required: true,
        },
        {
          name: 'position',
          type: 'text',
          required: true,
        },
        {
          name: 'duration',
          type: 'text',
          required: true,
        },
        {
          name: 'location',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'achievements',
          type: 'array',
          fields: [
            {
              name: 'achievement',
              type: 'text',
            },
          ],
        },
        {
          name: 'technologies',
          type: 'array',
          fields: [
            {
              name: 'technology',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}
