import React from 'react'
import './styles.css'
import PageView from '@/view/PageView'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'

export default async function MainPage() {
  return <PageView slug={'/'} />
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { isEnabled: draft } = await draftMode()
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'pages',
      draft,
      limit: 1,
      pagination: false,
      where: { slug: { equals: '/' } },
    })
    const page = result.docs?.[0] as any
    const title: string | undefined = page?.meta?.title || page?.title
    const description: string | undefined = page?.meta?.description
    console.log('HERE', typeof page?.meta?.image)
    return {
      title: title || undefined,
      metadataBase: new URL('https://koso.dev'),
      openGraph: {
        images: [page?.meta?.image || undefined],
      },
      description: description || undefined,
    }
  } catch {
    return {}
  }
}
