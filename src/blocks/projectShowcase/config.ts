import { Block } from 'payload'

export const ProjectShowcaseBlock: Block = {
  slug: 'projectShowcase',
  interfaceName: 'ProjectShowcaseBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Featured Projects',
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'projects',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'shortDescription',
          type: 'text',
          admin: {
            description: 'Brief one-line description for card view',
          },
        },
        {
          name: 'featuredImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'gallery',
          type: 'array',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
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
        {
          name: 'category',
          type: 'select',
          options: [
            { label: 'Web Development', value: 'web' },
            { label: 'Mobile App', value: 'mobile' },
            { label: 'Desktop App', value: 'desktop' },
            { label: 'UI/UX Design', value: 'design' },
            { label: 'Other', value: 'other' },
          ],
        },
        {
          name: 'status',
          type: 'select',
          options: [
            { label: 'Completed', value: 'completed' },
            { label: 'In Progress', value: 'in-progress' },
            { label: 'Concept', value: 'concept' },
          ],
          defaultValue: 'completed',
        },
        {
          name: 'featured',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'liveUrl',
          type: 'text',
          admin: {
            description: 'Live demo URL',
          },
        },
        {
          name: 'githubUrl',
          type: 'text',
          admin: {
            description: 'GitHub repository URL',
          },
        },
        {
          name: 'caseStudyUrl',
          type: 'text',
          admin: {
            description: 'Link to detailed case study',
          },
        },
        {
          name: 'startDate',
          type: 'date',
        },
        {
          name: 'endDate',
          type: 'date',
        },
        {
          name: 'client',
          type: 'text',
        },
        {
          name: 'teamSize',
          type: 'number',
          min: 1,
        },
      ],
    },
    {
      name: 'showFilters',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show category filters above projects',
      },
    },
    {
      name: 'layout',
      type: 'select',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Masonry', value: 'masonry' },
        { label: 'List', value: 'list' },
      ],
      defaultValue: 'grid',
    },
  ],
}
