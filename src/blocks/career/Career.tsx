import React, { useState } from 'react'

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
  const [expandedAchievements, setExpandedAchievements] = useState<{ [key: number]: boolean }>({})

  const toggleAchievements = (index: number) => {
    setExpandedAchievements((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-2">
              {subtitle}
            </p>
          )}
        </div>

        <div className="max-w-5xl mx-auto">
          {experiences.map((experience, index) => (
            <div key={index} className="relative">
              {/* Timeline line */}
              {index !== experiences.length - 1 && (
                <div
                  className="absolute left-7 top-12 w-0.5 bg-gradient-to-b from-green-primary to-green-secondary z-0"
                  style={{ height: 'calc(100% - 1rem)' }}
                ></div>
              )}

              {/* Timeline dot */}
              <div className="absolute left-5 top-8 w-6 h-6 bg-green-primary rounded-full border-4 border-white dark:border-gray-900 shadow-lg z-10"></div>

              {/* Content */}
              <div className="ml-16 pb-12">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                    <div className="flex flex-col">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white m-0">
                        {experience.position}
                      </h3>
                      <p className="text-base text-green-primary font-semibold mb-1 m-0">
                        {experience.company}
                      </p>
                      {experience.location && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 m-0">
                          {experience.location}
                        </p>
                      )}
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                        {experience.duration}
                      </span>
                    </div>
                  </div>

                  {experience.description && (
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                      {experience.description}
                    </p>
                  )}

                  {experience.achievements && experience.achievements.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Key Achievements:
                      </h4>
                      <ul className="space-y-1">
                        {(expandedAchievements[index]
                          ? experience.achievements
                          : experience.achievements.slice(0, 3)
                        ).map((item, achIndex) => (
                          <li
                            key={achIndex}
                            className="flex items-start text-sm text-gray-600 dark:text-gray-300"
                          >
                            <svg
                              className="w-3 h-3 text-green-primary mt-1 mr-2 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {item.achievement}
                          </li>
                        ))}
                        {experience.achievements.length > 3 && (
                          <li>
                            <button
                              onClick={() => toggleAchievements(index)}
                              className="text-xs text-green-primary hover:text-green-secondary ml-5 font-medium transition-colors duration-200"
                            >
                              {expandedAchievements[index]
                                ? 'Show less'
                                : `+${experience.achievements.length - 3} more achievements`}
                            </button>
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

                  {experience.technologies && experience.technologies.length > 0 && (
                    <div>
                      <div className="flex flex-wrap gap-1.5">
                        {experience.technologies.slice(0, 6).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-green-primary/10 text-green-primary rounded-md text-xs font-medium"
                          >
                            {tech.technology}
                          </span>
                        ))}
                        {experience.technologies.length > 6 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-md text-xs">
                            +{experience.technologies.length - 6}
                          </span>
                        )}
                      </div>
                    </div>
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

export default Career
