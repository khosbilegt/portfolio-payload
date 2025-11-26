import { getPayload, RequiredDataFromCollectionSlug } from 'payload'
import configPromise from '@payload-config'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

const escapeXml = (value: unknown) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

const serializePost = (post: RequiredDataFromCollectionSlug<'blog'>) => {
  const url = `${SITE_URL}/blog/${post.slug}`
  const description =
    (typeof post.meta?.description === 'string' && post.meta.description) || post.category || ''
  const publishedAt = post.publishedAt ? new Date(post.publishedAt as string) : new Date()
  const authorName =
    typeof post.author === 'object' && post.author !== null && 'name' in post.author
      ? (post.author as any).name
      : ''

  return `<item>
    <title>${escapeXml(post.title)}</title>
    <link>${escapeXml(url)}</link>
    <guid isPermaLink="true">${escapeXml(url)}</guid>
    <description>${escapeXml(description)}</description>
    <pubDate>${publishedAt.toUTCString()}</pubDate>
    ${authorName ? `<author>${escapeXml(authorName)}</author>` : ''}
  </item>`
}

export const revalidate = 1800

export async function GET() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'blog',
    depth: 1,
    draft: false,
    limit: 50,
    sort: '-publishedAt',
    where: {
      publishedAt: {
        less_than_equal: new Date().toISOString(),
      },
    },
  })

  const posts = result.docs as RequiredDataFromCollectionSlug<'blog'>[]
  const items = posts.map(serializePost).join('\n')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Koso.dev Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Latest articles and updates from Koso.dev</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
    },
  })
}
