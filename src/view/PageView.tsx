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

  return <RenderBlocks blocks={page?.blocks || []} />
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
