import PageView from '@/view/PageView'
import React from 'react'

async function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <PageView slug={slug} />
}

export default SlugPage
