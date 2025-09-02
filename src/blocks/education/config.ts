import { Block } from 'payload'

export const EducationBlock: Block = {
  slug: 'education',
  interfaceName: 'EducationBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Education',
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'educations',
      type: 'array',
      fields: [
        {
          name: 'institution',
          type: 'text',
          required: true,
        },
        {
          name: 'degree',
          type: 'text',
          required: true,
        },
        {
          name: 'field',
          type: 'text',
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
          name: 'gpa',
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
          name: 'relevantCourses',
          type: 'array',
          fields: [
            {
              name: 'course',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}
