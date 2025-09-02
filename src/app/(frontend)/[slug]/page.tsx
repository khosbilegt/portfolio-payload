import PageView from '@/view/PageView'
import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'

async function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <PageView slug={slug} />
}

export default SlugPage

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  try {
    const { isEnabled: draft } = await draftMode()
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'pages',
      draft,
      limit: 1,
      pagination: false,
      where: { slug: { equals: slug } },
    })
    const page = result.docs?.[0] as any
    const title: string | undefined = page?.meta?.title || page?.title
    const description: string | undefined = page?.meta?.description
    return {
      title: title || undefined,
      description: description || undefined,
    }
  } catch {
    return {}
  }
}
