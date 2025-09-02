'use client'

import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import Hero from '@/blocks/hero/Hero'
import Career from '@/blocks/career/Career'
import Education from '@/blocks/education/Education'
import Testimonials from '@/blocks/testimonials/Testimonials'
import Services from '@/blocks/services/Services'
import BlogCards from '@/blocks/blogCards/BlogCards'
import Donation from '@/blocks/donation/Donation'
import ProjectShowcase from '@/blocks/projectShowcase/ProjectShowcase'
import Certificates from '@/blocks/certificates/Certificates'
import RichText from '@/components/RichText'
import CodeBlock from '@/blocks/code/Code'

const blockComponents = {
  hero: Hero,
  career: Career,
  education: Education,
  testimonials: Testimonials,
  services: Services,
  blogCards: BlogCards,
  donation: Donation,
  projectShowcase: ProjectShowcase,
  certificates: Certificates,
  codeBlock: CodeBlock,
} as const

export const RenderBlocks: React.FC<{
  blocks: any[]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block as any

          if (blockType === 'richText' || blockType === 'content' || blockType === 'body') {
            const content = (block as any).richText ?? (block as any).content ?? (block as any).body
            return (
              <div key={index} className="prose dark:prose-invert max-w-none">
                <RichText content={content} />
              </div>
            )
          }

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType as keyof typeof blockComponents]

            if (Block) {
              return (
                <div key={index}>
                  <Block {...(block as any)} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
