import { Block } from 'payload'

export const BlogCardsBlock: Block = {
  slug: 'blogCards',
  interfaceName: 'BlogCardsBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Latest Blog Posts',
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'showCount',
      type: 'number',
      defaultValue: 3,
      min: 1,
      max: 12,
      admin: {
        description: 'Number of blog posts to display',
      },
    },
    {
      name: 'viewAllText',
      type: 'text',
      defaultValue: 'View All Posts',
    },
    {
      name: 'viewAllLink',
      type: 'text',
      defaultValue: '/blog',
    },
    {
      name: 'posts',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'excerpt',
          type: 'textarea',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
        },
        {
          name: 'publishedAt',
          type: 'date',
          required: true,
        },
        {
          name: 'author',
          type: 'text',
        },
        {
          name: 'readTime',
          type: 'text',
        },
        {
          name: 'featuredImage',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'category',
          type: 'text',
        },
        {
          name: 'tags',
          type: 'array',
          fields: [
            {
              name: 'tag',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}
