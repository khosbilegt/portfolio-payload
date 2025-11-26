import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import Link from 'next/link'

type RamblingListItem = {
  id: string
  title: string
  slug: string
  tone?: string | null
  publishedAt?: string | null
  content?: unknown
}

export const metadata = {
  title: 'Ramblings | Koso Bilegsaikhan',
  description:
    'Unpolished notes, half-formed thoughts, and quick updates — inspired by DHH-style weblogging.',
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function RamblingsIndex() {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'ramblings',
    draft,
    limit: 50,
    sort: '-publishedAt',
  })

  const entries = result.docs as RamblingListItem[]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <section className="max-w-3xl mx-auto px-6 py-16">
        <header className="mb-12">
          <p className="uppercase text-xs tracking-[0.3em] text-gray-400">Ramblings</p>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mt-4">
            Quick hits & experiments
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            These are the late-night ideas, travel notes, and post-debugging reflections I
            don&apos;t want to forget. Less polish, more honesty.
          </p>
        </header>

        <div className="space-y-8">
          {entries.length === 0 && (
            <div className="text-gray-500 dark:text-gray-400 border border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center">
              Nothing yet — check back soon.
            </div>
          )}

          {entries.map((entry) => {
            const formattedDate = entry.publishedAt
              ? new Date(entry.publishedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })
              : null
            const toneLabel = formatTone(entry.tone)

            return (
              <article
                key={entry.id}
                className="border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:border-green-primary/60 transition-colors"
              >
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {formattedDate && (
                    <time dateTime={entry.publishedAt || undefined}>{formattedDate}</time>
                  )}
                  {toneLabel && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900/40 px-3 py-0.5 text-[11px] font-medium text-gray-600 dark:text-gray-200 tracking-wide">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-primary" />
                      {toneLabel}
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                  <Link
                    href={`/ramblings/${entry.slug}`}
                    className="hover:text-green-primary transition-colors"
                  >
                    {entry.title}
                  </Link>
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  {getSnippet(entry.content)}
                </p>
                <Link
                  href={`/ramblings/${entry.slug}`}
                  className="text-sm font-medium text-green-primary hover:text-green-secondary transition-colors"
                >
                  Read the whole thought →
                </Link>
              </article>
            )
          })}
        </div>
      </section>
    </div>
  )
}

function getSnippet(content: unknown, limit = 255) {
  const rawText = extractText(content)
  if (!rawText) return ''

  const normalized = rawText.replace(/\s+/g, ' ').trim()
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

function formatTone(tone?: string | null) {
  if (!tone) return ''

  return tone
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ')
}
