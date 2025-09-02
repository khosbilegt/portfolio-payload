import BlogView from '@/view/BlogView'

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <BlogView slug={slug} />
}
