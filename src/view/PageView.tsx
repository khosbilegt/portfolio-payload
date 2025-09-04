import { getPayload, RequiredDataFromCollectionSlug } from 'payload'
import React, { cache } from 'react'
import { draftMode } from 'next/headers'
import configPromise from '@payload-config'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import NotFound from './NotFoundView'

export default async function PageView({ slug }: { slug: string }) {
  const page: RequiredDataFromCollectionSlug<'pages'> | null = await queryPageBySlug({
    slug: slug,
  })

  if (!page) {
    return <NotFound />
  }

  const blocksWithInjectedPosts = await injectBlogCardsPosts(page?.blocks || [])

  return <RenderBlocks blocks={blocksWithInjectedPosts} />
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

async function injectBlogCardsPosts(blocks: any[]): Promise<any[]> {
  if (!Array.isArray(blocks) || blocks.length === 0) return blocks

  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const mappedBlocks = await Promise.all(
    blocks.map(async (block) => {
      if (block?.blockType !== 'blogCards') return block

      const showCount: number = typeof block?.showCount === 'number' ? block.showCount : 3

      // If posts provided in CMS, keep them; otherwise query latest
      const hasProvidedPosts = Array.isArray(block?.posts) && block.posts.length > 0
      if (hasProvidedPosts) return block

      const result = await payload.find({
        collection: 'blog',
        draft,
        depth: 1,
        limit: showCount,
        pagination: true,
        sort: '-publishedAt',
      })

      const normalizedPosts = (result?.docs || []).map((doc: any) => {
        const authorName =
          typeof doc.author === 'object' && doc.author && 'name' in doc.author
            ? (doc.author as any).name
            : undefined

        const image = doc?.meta?.image
        const imageObj =
          image && typeof image === 'object'
            ? { url: image.sizes?.card?.url || image.url, alt: doc.title as string }
            : undefined

        return {
          title: doc.title,
          excerpt: doc?.meta?.description || doc?.excerpt || '',
          slug: doc.slug,
          publishedAt: doc.publishedAt,
          author: authorName,
          featuredImage: imageObj,
          category: doc.category,
          tags: (doc?.meta?.tags || []).map((t: any) => ({ tag: t?.tag || '' })),
        }
      })

      return { ...block, posts: normalizedPosts }
    })
  )

  return mappedBlocks
}
