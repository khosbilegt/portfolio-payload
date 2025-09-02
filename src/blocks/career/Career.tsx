import React from 'react'

interface Experience {
  company: string
  position: string
  duration: string
  location?: string
  description?: string
  achievements?: { achievement: string }[]
  technologies?: { technology: string }[]
}

interface CareerProps {
  title?: string
  subtitle?: string
  experiences?: Experience[]
}

function Career({
  title = 'Work Experience',
  subtitle = 'My professional journey',
  experiences = [],
}: CareerProps) {
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

        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 md:p-8 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {experience.position}
                  </h3>
                  <p className="text-lg text-green-primary font-semibold mb-1">
                    {experience.company}
                  </p>
                  {experience.location && (
                    <p className="text-gray-600 dark:text-gray-300">{experience.location}</p>
                  )}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">
                  {experience.duration}
                </div>
              </div>

              {experience.description && (
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  {experience.description}
                </p>
              )}

              {experience.achievements && experience.achievements.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Key Achievements:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    {experience.achievements.map((item, achIndex) => (
                      <li key={achIndex}>{item.achievement}</li>
                    ))}
                  </ul>
                </div>
              )}

              {experience.technologies && experience.technologies.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Technologies:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-green-primary/10 text-green-primary rounded-full text-sm font-medium"
                      >
                        {tech.technology}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Career
