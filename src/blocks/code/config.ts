import type { Block } from 'payload'

export const CodeBlock: Block = {
  slug: 'codeBlock',
  interfaceName: 'CodeBlock',
  labels: {
    singular: 'Code Block',
    plural: 'Code Blocks',
  },
  fields: [
    {
      name: 'language',
      type: 'select',
      required: false,
      defaultValue: 'plaintext',
      options: [
        { label: 'Plain Text', value: 'plaintext' },
        { label: 'JavaScript', value: 'javascript' },
        { label: 'TypeScript', value: 'typescript' },
        { label: 'JSON', value: 'json' },
        { label: 'CSS', value: 'css' },
        { label: 'HTML', value: 'html' },
        { label: 'Bash', value: 'bash' },
        { label: 'Markdown', value: 'markdown' },
      ],
      admin: {
        description: 'Optional. Used for syntax highlighting classes (e.g., language-ts).',
      },
    },
    {
      name: 'code',
      type: 'textarea',
      required: true,
      admin: {
        rows: 12,
      },
    },
    {
      name: 'caption',
      type: 'text',
      required: false,
    },
  ],
}
