import { getPayload } from 'payload'
import { cache } from 'react'
import { draftMode } from 'next/headers'
import configPromise from '@payload-config'
import NotFound from './NotFoundView'
import RichText from '@/components/RichText'
import ShareButton from '@/components/ShareButton'

type Rambling = {
  id: string
  title: string
  slug: string
  tone?: string | null
  publishedAt?: string | null
  content?: unknown
}

export default async function RamblingView({ slug }: { slug: string }) {
  const rambling = await queryRamblingBySlug(slug)

  if (!rambling) {
    return <NotFound />
  }

  const formattedDate = rambling.publishedAt
    ? new Date(rambling.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <article className="max-w-3xl mx-auto px-6 py-12 md:py-14 space-y-10">
        <header className="space-y-5">
          <p className="uppercase tracking-[0.25em] text-xs text-gray-500 dark:text-gray-400">
            Rambling
          </p>
          <h1 className="text-4xl md:text-[2.75rem] font-semibold leading-tight text-gray-900 dark:text-white">
            {rambling.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-3 bg-white/70 dark:bg-gray-900/40">
            {formattedDate && (
              <time dateTime={rambling.publishedAt || undefined}>{formattedDate}</time>
            )}
            {rambling.tone && (
              <>
                <span className="text-gray-400">•</span>
                <span className="uppercase tracking-widest text-xs text-green-primary">
                  {rambling.tone}
                </span>
              </>
            )}
            <div className="ml-auto">
              <ShareButton />
            </div>
          </div>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none leading-7 text-gray-800 dark:text-gray-100">
          <RichText content={rambling.content} />
        </div>

        <div className="pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center gap-4 text-sm">
          <a
            href="/ramblings"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-primary transition-colors"
          >
            <span aria-hidden="true">←</span> Back to ramblings
          </a>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-primary transition-colors"
          >
            Home <span aria-hidden="true">→</span>
          </a>
        </div>
      </article>
    </div>
  )
}

const queryRamblingBySlug = cache(async (slug: string) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'ramblings',
    draft,
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return (result.docs?.[0] as Rambling | undefined) ?? null
})
