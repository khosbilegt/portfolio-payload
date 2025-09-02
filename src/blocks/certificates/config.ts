import { Block } from 'payload'

export const CertificatesBlock: Block = {
  slug: 'certificates',
  interfaceName: 'CertificatesBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Certifications & Achievements',
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'certificates',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'issuer',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'issueDate',
          type: 'date',
          required: true,
        },
        {
          name: 'expiryDate',
          type: 'date',
          admin: {
            description: 'Leave empty if certificate does not expire',
          },
        },
        {
          name: 'credentialId',
          type: 'text',
          admin: {
            description: 'Certificate ID or credential number',
          },
        },
        {
          name: 'certificateImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Certificate image or badge',
          },
        },
        {
          name: 'verificationUrl',
          type: 'text',
          admin: {
            description: 'URL to verify the certificate',
          },
        },
        {
          name: 'skills',
          type: 'array',
          fields: [
            {
              name: 'skill',
              type: 'text',
            },
          ],
          admin: {
            description: 'Skills covered by this certificate',
          },
        },
        {
          name: 'category',
          type: 'select',
          options: [
            { label: 'Programming', value: 'programming' },
            { label: 'Cloud Computing', value: 'cloud' },
            { label: 'Data Science', value: 'data-science' },
            { label: 'DevOps', value: 'devops' },
            { label: 'Security', value: 'security' },
            { label: 'Design', value: 'design' },
            { label: 'Project Management', value: 'project-management' },
            { label: 'Other', value: 'other' },
          ],
        },
        {
          name: 'featured',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'status',
          type: 'select',
          options: [
            { label: 'Active', value: 'active' },
            { label: 'Expired', value: 'expired' },
            { label: 'In Progress', value: 'in-progress' },
          ],
          defaultValue: 'active',
        },
        {
          name: 'score',
          type: 'text',
          admin: {
            description: 'Score or grade achieved (e.g., "95%", "A+", "Pass")',
          },
        },
        {
          name: 'duration',
          type: 'text',
          admin: {
            description: 'Course duration (e.g., "40 hours", "3 months")',
          },
        },
      ],
    },
    {
      name: 'showFilters',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show category filters above certificates',
      },
    },
    {
      name: 'layout',
      type: 'select',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'List', value: 'list' },
        { label: 'Timeline', value: 'timeline' },
      ],
      defaultValue: 'grid',
    },
  ],
}
