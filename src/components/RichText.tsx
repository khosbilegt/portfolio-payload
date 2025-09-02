'use client'

import React from 'react'
import {
  JSXConvertersFunction,
  RichText as PayloadRichText,
} from '@payloadcms/richtext-lexical/react'
import './RichText.css'
import { DefaultNodeTypes } from '@payloadcms/richtext-lexical'
import CodeBlockComponent from '@/blocks/code/Code'

interface RichTextProps {
  content?: any
  richText?: any
  value?: any
  className?: string
}

const jsxConverters: JSXConvertersFunction<DefaultNodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  blocks: {
    codeBlock: ({ node }: { node: any }) => {
      return <CodeBlockComponent {...(node?.fields as any)} />
    },
  },
})

export default function RichText(props: RichTextProps) {
  const data = props.content ?? props.richText ?? props.value
  if (!data) return null

  return (
    <div className={`rich-text-content ${props.className || ''}`}>
      <PayloadRichText data={data} converters={jsxConverters} />
    </div>
  )
}
