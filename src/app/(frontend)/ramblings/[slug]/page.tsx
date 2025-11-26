import RamblingView from '@/view/RamblingView'

export default async function RamblingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <RamblingView slug={slug} />
}
