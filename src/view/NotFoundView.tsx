export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="max-w-2xl w-full px-6 text-center">
        <p className="text-4xl font-semibold text-green-primary mb-2">404</p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Page not found
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Sorry, we couldn’t find the page you’re looking for. It may have been moved or deleted.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-green-primary text-white font-medium hover:bg-green-secondary transition-colors"
          >
            Go back home
          </a>
          <a
            href="/blog"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Visit the blog
          </a>
        </div>
      </div>
    </section>
  )
}
