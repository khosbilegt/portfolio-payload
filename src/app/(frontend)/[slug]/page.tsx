import PageView from '@/view/PageView'
import React from 'react'

function SlugPage({ params }: { params: { slug: string } }) {
  return <PageView slug={params.slug} />
}

export default SlugPage
