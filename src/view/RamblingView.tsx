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
      <article className="pt-20">
        <header className="max-w-3xl mx-auto px-6 py-12 md:py-16">
          <p className="uppercase tracking-[0.25em] text-xs text-gray-500 dark:text-gray-400 mb-4">
            Rambling
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-gray-900 dark:text-white mb-6">
            {rambling.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 border-t border-b border-gray-100 dark:border-gray-800 py-4">
            {formattedDate && (
              <time dateTime={rambling.publishedAt || undefined}>{formattedDate}</time>
            )}
            {rambling.tone && (
              <>
                <span>•</span>
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

        <main className="max-w-3xl mx-auto px-6 pb-16">
          <div className="prose prose-lg dark:prose-invert max-w-none leading-7 text-gray-800 dark:text-gray-100">
            <RichText content={rambling.content} />
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <a
              href="/ramblings"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-green-primary transition-colors"
            >
              ← Back to ramblings
            </a>
          </div>
        </main>
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
