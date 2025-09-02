import React from 'react'

interface DonationLink {
  platform: string
  url: string
  icon?: string
  description?: string
  buttonText?: string
  featured?: boolean
  color?: 'green' | 'blue' | 'purple' | 'pink' | 'yellow' | 'red' | 'gray'
}

interface DonationProps {
  title?: string
  subtitle?: string
  description?: string
  donationLinks?: DonationLink[]
  thankYouMessage?: string
}

function Donation({
  title = 'Support My Work',
  subtitle = 'Help me continue creating',
  description,
  donationLinks = [],
  thankYouMessage = 'Thank you for your support!',
}: DonationProps) {
  const getColorClasses = (color: string = 'green', featured: boolean = false) => {
    const colorMap = {
      green: featured
        ? 'bg-green-primary text-white hover:bg-green-secondary'
        : 'bg-green-primary/10 text-green-primary hover:bg-green-primary/20',
      blue: featured
        ? 'bg-blue-600 text-white hover:bg-blue-700'
        : 'bg-blue-100 text-blue-600 hover:bg-blue-200',
      purple: featured
        ? 'bg-purple-600 text-white hover:bg-purple-700'
        : 'bg-purple-100 text-purple-600 hover:bg-purple-200',
      pink: featured
        ? 'bg-pink-600 text-white hover:bg-pink-700'
        : 'bg-pink-100 text-pink-600 hover:bg-pink-200',
      yellow: featured
        ? 'bg-yellow-500 text-white hover:bg-yellow-600'
        : 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200',
      red: featured
        ? 'bg-red-600 text-white hover:bg-red-700'
        : 'bg-red-100 text-red-600 hover:bg-red-200',
      gray: featured
        ? 'bg-gray-800 text-white hover:bg-gray-900'
        : 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.green
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{title}</h2>
          {subtitle && <p className="text-lg md:text-xl text-gray-600 mb-6">{subtitle}</p>}
          {description && (
            <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">{description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {donationLinks.map((link, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 ${
                link.featured ? 'ring-2 ring-green-primary lg:scale-105' : ''
              }`}
            >
              {link.featured && (
                <div className="text-center mb-4">
                  <span className="bg-green-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    Recommended
                  </span>
                </div>
              )}

              <div className="text-center mb-4">
                {link.icon && <div className="text-3xl mb-3">{link.icon}</div>}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{link.platform}</h3>
                {link.description && (
                  <p className="text-gray-600 text-sm leading-relaxed">{link.description}</p>
                )}
              </div>

              <div className="text-center">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-300 w-full ${getColorClasses(
                    link.color,
                    link.featured,
                  )}`}
                >
                  {link.buttonText || 'Donate'}
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-green-primary/5 rounded-lg p-6 inline-block">
            <p className="text-green-primary font-medium text-lg">💚 {thankYouMessage}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Donation
