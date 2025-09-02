'use client'

import React from 'react'
import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'
import './RichText.css'

interface RichTextProps {
  content?: any
  richText?: any
  value?: any
  className?: string
}

export default function RichText(props: RichTextProps) {
  const data = props.content ?? props.richText ?? props.value
  if (!data) return null

  return (
    <div className={`rich-text-content ${props.className || ''}`}>
      <PayloadRichText data={data} />
    </div>
  )
}
