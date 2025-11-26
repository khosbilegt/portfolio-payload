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

const serializeRambling = (entry: RequiredDataFromCollectionSlug<'ramblings'>) => {
  const url = `${SITE_URL}/ramblings/${entry.slug}`
  const description = getSnippet(entry.content) || 'Rambling'
  const publishedAt = entry.publishedAt ? new Date(entry.publishedAt as string) : new Date()

  return `<item>
    <title>${escapeXml(entry.title)}</title>
    <link>${escapeXml(url)}</link>
    <guid isPermaLink="true">${escapeXml(url)}</guid>
    <description>${escapeXml(description)}</description>
    <category>Rambling</category>
    <pubDate>${publishedAt.toUTCString()}</pubDate>
  </item>`
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  const payload = await getPayload({ config: configPromise })
  const nowIso = new Date().toISOString()

  const [blogResult, ramblingResult] = await Promise.all([
    payload.find({
      collection: 'blog',
      depth: 1,
      draft: false,
      limit: 50,
      sort: '-publishedAt',
      where: {
        publishedAt: {
          less_than_equal: nowIso,
        },
      },
    }),
    payload.find({
      collection: 'ramblings',
      depth: 0,
      draft: false,
      limit: 50,
      sort: '-publishedAt',
      where: {
        publishedAt: {
          less_than_equal: nowIso,
        },
      },
    }),
  ])

  const blogItems = (blogResult.docs as RequiredDataFromCollectionSlug<'blog'>[]).map(serializePost)
  const ramblingItems = (ramblingResult.docs as RequiredDataFromCollectionSlug<'ramblings'>[]).map(
    serializeRambling,
  )

  const items = [...blogItems, ...ramblingItems]
    .sort((a, b) => {
      const dateA = getPubDateFromItem(a)
      const dateB = getPubDateFromItem(b)
      return dateB.getTime() - dateA.getTime()
    })
    .join('\n')

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

function getSnippet(content: unknown, limit = 255) {
  const raw = extractText(content)
  if (!raw) return ''
  const normalized = raw.replace(/\s+/g, ' ').trim()
  if (normalized.length <= limit) return normalized
  return `${normalized.slice(0, limit).trim()}…`
}

function extractText(node: any): string {
  if (!node) return ''
  if (typeof node === 'string') return node
  if (typeof node?.text === 'string') return node.text

  if (Array.isArray(node?.children)) {
    return node.children.map((child: unknown) => extractText(child)).join(' ')
  }

  if (node?.root) {
    return extractText(node.root)
  }

  return ''
}

function getPubDateFromItem(item: string) {
  const match = item.match(/<pubDate>(.*?)<\/pubDate>/)
  if (!match) return new Date(0)
  return new Date(match[1])
}
