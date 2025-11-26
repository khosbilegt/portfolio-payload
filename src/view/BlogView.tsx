import { getPayload, RequiredDataFromCollectionSlug } from 'payload'
import React, { cache } from 'react'
import { draftMode } from 'next/headers'
import configPromise from '@payload-config'
import NotFound from './NotFoundView'
import RichText from '@/components/RichText'
import ShareButton from '@/components/ShareButton'

export default async function BlogView({ slug }: { slug: string }) {
  const post: RequiredDataFromCollectionSlug<'blog'> | null = await queryBlogBySlug({
    slug,
  })

  if (!post) {
    return <NotFound />
  }

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt as unknown as string).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  const authorName =
    typeof post.author === 'object' && post.author !== null && 'name' in post.author
      ? ((post.author as any).name ?? '')
      : ''

  const authorBio =
    typeof post.author === 'object' && post.author !== null && 'bio' in post.author
      ? ((post.author as any).bio ?? '')
      : ''

  const authorAvatar =
    typeof post.author === 'object' && post.author !== null && 'profilePicture' in post.author
      ? typeof (post.author as any).profilePicture === 'string'
        ? post.author.profilePicture
        : typeof post.author.profilePicture === 'object' &&
            post.author.profilePicture !== null &&
            'url' in post.author.profilePicture
          ? (post.author.profilePicture as any).url || ''
          : ''
      : ''

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <article className="pt-20">
        {/* Header */}
        <header className="max-w-4xl mx-auto px-6 py-12 md:py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white mb-6">
              {post.title}
            </h1>

            {/* Author & Meta */}
            <div className="flex items-center justify-between gap-4 py-6 border-t border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                {/* Author Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-semibold text-lg mt-4">
                  {authorAvatar ? (
                    <img
                      src={authorAvatar as string}
                      alt={authorName}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-white">
                      {authorName ? authorName.charAt(0).toUpperCase() : 'A'}
                    </span>
                  )}
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    {authorName && (
                      <span className="font-medium text-gray-900 dark:text-white">
                        {authorName}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    {formattedDate && <span>{formattedDate}</span>}
                    <span>•</span>
                    <span>5 min read</span>
                  </div>
                </div>
              </div>

              {/* Engagement Actions */}
              <div className="ml-auto flex items-center gap-3">
                <ShareButton />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-4xl mx-auto px-6 pb-16">
          <div className="max-w-3xl">
            <div className="text-gray-800 dark:text-gray-200 leading-7">
              <RichText content={(post as any).content} />
            </div>

            {/* Author Bio */}
            <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl ">
              <div className="flex items-start gap-4 items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  {authorAvatar ? (
                    <img
                      src={authorAvatar as string}
                      alt={authorName}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-white">
                      {authorName ? authorName.charAt(0).toUpperCase() : 'A'}
                    </span>
                  )}{' '}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {authorName && (
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                        {authorName}
                      </h3>
                    )}
                    <button className="text-xs bg-green-600 text-white px-3 py-1 rounded-full hover:bg-green-700 transition-colors">
                      Follow
                    </button>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
                    {authorBio}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between pb-8">
              <a
                href="/blog"
                className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                All Articles
              </a>
              <a
                href="/"
                className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium transition-colors"
              >
                Home
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>
        </main>
      </article>
    </div>
  )
}

const queryBlogBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'blog',
    draft,
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
