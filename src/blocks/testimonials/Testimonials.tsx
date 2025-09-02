import React from 'react'

interface Testimonial {
  name: string
  position?: string
  company?: string
  content: string
  rating?: number
  avatar?: {
    url: string
    alt?: string
  }
  featured?: boolean
}

interface TestimonialsProps {
  title?: string
  subtitle?: string
  testimonials?: Testimonial[]
}

function Testimonials({
  title = 'What People Say',
  subtitle = 'Testimonials from clients and colleagues',
  testimonials = [],
}: TestimonialsProps) {
  const renderStars = (rating: number = 5) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-gray-50 dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-all duration-300 ${
                testimonial.featured ? 'ring-2 ring-green-primary lg:scale-105' : ''
              }`}
            >
              <div className="flex items-center mb-4">{renderStars(testimonial.rating)}</div>

              <blockquote className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>

              <div className="flex items-center">
                {testimonial.avatar ? (
                  <img
                    src={testimonial.avatar.url}
                    alt={testimonial.avatar.alt || testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-green-primary/20 flex items-center justify-center mr-4">
                    <span className="text-green-primary font-semibold text-lg">
                      {testimonial.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                  {(testimonial.position || testimonial.company) && (
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {testimonial.position}
                      {testimonial.position && testimonial.company && ' at '}
                      {testimonial.company}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
