
import React, { useMemo } from 'react'

interface BlogPost {
  title: string
  excerpt: string
  slug: string
  publishedAt: string
  author?: string
  readTime?: string
  featuredImage?: {
    url: string
    alt?: string
  }
  category?: string
  tags?: { tag: string }[]
}

interface BlogCardsProps {
  title?: string
  subtitle?: string
  showCount?: number
  viewAllText?: string
  viewAllLink?: string
  posts?: BlogPost[]
}

function BlogCards({
  title = 'Latest Blog Posts',
  subtitle = 'Insights, tutorials, and thoughts',
  showCount = 3,
  viewAllText = 'View All Posts',
  viewAllLink = '/blog',
  posts = [],
}: BlogCardsProps) {
  const displayPosts = useMemo(() => {
    return (posts || []).slice(0, showCount)
  }, [posts, showCount])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayPosts.map((post, index) => (
            <article
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              {post.featuredImage && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.featuredImage.url}
                    alt={post.featuredImage.alt || post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
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
                  <time className="text-gray-500 dark:text-gray-400 text-sm">
                    {formatDate(post.publishedAt)}
                  </time>
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
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    {post.author && <span className="mr-3">By {post.author}</span>}
                    {post.readTime && <span>{post.readTime} read</span>}
                  </div>

                  <a
                    href={`/blog/${post.slug}`}
                    className="text-green-primary font-medium hover:text-green-secondary transition-colors duration-300"
                  >
                    Read More →
                  </a>
                </div>

                {post.tags && post.tags.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs"
                        >
                          #{tag.tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {viewAllLink && (
          <div className="text-center">
            <a
              href={viewAllLink}
              className="inline-flex items-center px-6 py-3 bg-green-primary text-white rounded-lg font-medium hover:bg-green-secondary transition-colors duration-300"
            >
              {viewAllText}
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

export default BlogCards
