import { getPayload, RequiredDataFromCollectionSlug } from 'payload'
import React, { cache } from 'react'
import { draftMode } from 'next/headers'
import configPromise from '@payload-config'

import config from '@/payload.config'
import './styles.css'
import { RenderBlocks } from '@/blocks/RenderBlocks'

export default async function MainPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const url = '/'

  const page: RequiredDataFromCollectionSlug<'pages'> | null = await queryPageBySlug({
    slug: url,
  })

  if (!page) {
    return <div>Page not found</div>
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
