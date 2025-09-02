import { getPayload, RequiredDataFromCollectionSlug } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import Image from 'next/image'
import { Media, User } from '@/payload-types'

type SearchParams = {
  page?: string
}

export default async function BlogIndex({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const { page: pageParam } = await searchParams
  const currentPage = Math.max(parseInt(pageParam || '1', 10) || 1, 1)
  const limit = 6

  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'blog',
    draft,
    limit,
    page: currentPage,
    sort: '-publishedAt',
    depth: 1,
  })

  const posts = result.docs as RequiredDataFromCollectionSlug<'blog'>[]
  const totalPages = result.totalPages || 1

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <section className="max-w-5xl mx-auto px-6 py-12 md:py-16">
        <header className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Blog
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Latest articles and updates</p>
        </header>

        {posts.length === 0 ? (
          <div className="text-gray-600 dark:text-gray-300">No posts found.</div>
        ) : (
          <ul className="grid gap-6 md:gap-8 md:grid-cols-2">
            {posts.map((post, index) => {
              const date = post.publishedAt
                ? new Date(post.publishedAt as unknown as string).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : ''

              return (
                <article
                  key={post.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                >
                  {post.meta?.image && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={
                          typeof post.meta?.image === 'string'
                            ? post.meta.image
                            : post.meta?.image?.url || ''
                        }
                        alt={(post.meta?.title as string) || (post.title as string)}
                        className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                        width={1000}
                        height={1000}
                      />
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      {post.category && (
                        <span className="px-3 py-1 bg-green-primary/10 text-green-primary rounded-full text-sm font-medium">
                          {post.category}
                        </span>
                      )}
                      <time className="text-gray-500 dark:text-gray-400 text-sm">{date}</time>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      <a
                        href={`/blog/${post.slug}`}
                        className="hover:text-green-primary transition-colors duration-300"
                      >
                        {post.title}
                      </a>
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                      {post.meta?.description as string}
                    </p>

                    <div className="flex items-center justify-between">
                      <a
                        href={`/blog/${post.slug}`}
                        className="text-green-primary font-medium hover:text-green-secondary transition-colors duration-300"
                      >
                        Read More →
                      </a>
                    </div>

                    {/* {post.meta?.tags && post.meta?.tags.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex flex-wrap gap-2">
                          {post.meta?.tags.slice(0, 3).map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs"
                            >
                              #{tag.tag as string}
                            </span>
                          ))}
                        </div>
                      </div>
                    )} */}
                  </div>
                </article>
              )
            })}
          </ul>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="mt-10 flex items-center justify-between text-sm">
            <PaginationLink disabled={currentPage <= 1} href={`/blog?page=${currentPage - 1}`}>
              ← Previous
            </PaginationLink>
            <span className="text-gray-600 dark:text-gray-400">
              Page {currentPage} of {totalPages}
            </span>
            <PaginationLink
              disabled={currentPage >= totalPages}
              href={`/blog?page=${currentPage + 1}`}
            >
              Next →
            </PaginationLink>
          </nav>
        )}
      </section>
    </div>
  )
}

function PaginationLink({
  href,
  disabled,
  children,
}: {
  href: string
  disabled: boolean
  children: React.ReactNode
}) {
  if (disabled) {
    return (
      <span className="inline-flex items-center px-3 py-2 rounded-md border border-transparent text-gray-400 dark:text-gray-600 cursor-not-allowed">
        {children}
      </span>
    )
  }
  return (
    <Link
      href={href}
      className="inline-flex items-center px-3 py-2 rounded-md border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200 hover:border-gray-300 dark:hover:border-gray-700"
    >
      {children}
    </Link>
  )
}
