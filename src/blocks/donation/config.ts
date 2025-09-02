import { Block } from 'payload'

export const DonationBlock: Block = {
  slug: 'donation',
  interfaceName: 'DonationBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Donation',
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'thankYouMessage',
      type: 'text',
    },
    {
      name: 'donationLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'text',
        },
      ],
    },
  ],
}
