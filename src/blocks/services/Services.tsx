import React from 'react'

interface Service {
  title: string
  description: string
  icon?: string
  features?: { feature: string }[]
  price?: string
  priceDescription?: string
  ctaText?: string
  ctaLink?: string
  featured?: boolean
}

interface ServicesProps {
  title?: string
  subtitle?: string
  services?: Service[]
}

function Services({
  title = 'Services',
  subtitle = 'What I can do for you',
  services = [],
}: ServicesProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{title}</h2>
          {subtitle && (
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg p-8 hover:shadow-lg transition-all duration-300 ${
                service.featured ? 'ring-2 ring-green-primary lg:scale-105 relative' : 'shadow-md'
              }`}
            >
              {service.featured && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-green-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                    Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                {service.icon && <div className="text-4xl mb-4">{service.icon}</div>}
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>

              {service.features && service.features.length > 0 && (
                <div className="mb-6">
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-700">
                        <svg
                          className="w-5 h-5 text-green-primary mr-3 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {feature.feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {service.price && (
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{service.price}</div>
                  {service.priceDescription && (
                    <div className="text-gray-600 text-sm">{service.priceDescription}</div>
                  )}
                </div>
              )}

              {service.ctaLink && (
                <div className="text-center">
                  <a
                    href={service.ctaLink}
                    className={`inline-block px-6 py-3 rounded-lg font-medium transition-colors duration-300 ${
                      service.featured
                        ? 'bg-green-primary text-white hover:bg-green-secondary'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {service.ctaText || 'Get Started'}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
