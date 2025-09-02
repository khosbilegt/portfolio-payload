import React, { useState } from 'react'

interface Education {
  institution: string
  degree: string
  field?: string
  duration: string
  location?: string
  gpa?: string
  description?: string
  achievements?: { achievement: string }[]
  relevantCourses?: { course: string }[]
}

interface EducationProps {
  title?: string
  subtitle?: string
  educations?: Education[]
}

function Education({
  title = 'Education',
  subtitle = 'My academic background',
  educations = [],
}: EducationProps) {
  const [expandedAchievements, setExpandedAchievements] = useState<{ [key: number]: boolean }>({})

  const toggleAchievements = (index: number) => {
    setExpandedAchievements((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
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
          {educations.map((education, index) => (
            <div key={index} className="relative">
              {/* Timeline line */}
              {index !== educations.length - 1 && (
                <div
                  className="absolute left-7 top-12 w-0.5 bg-gradient-to-b from-green-primary to-green-secondary z-0"
                  style={{ height: 'calc(100% - 1rem)' }}
                ></div>
              )}

              {/* Timeline dot */}
              <div className="absolute left-5 top-8 w-6 h-6 bg-green-primary rounded-full border-4 border-white dark:border-gray-800 shadow-lg z-10"></div>

              {/* Content */}
              <div className="ml-16 pb-12">
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                        {education.degree}
                        {education.field && (
                          <span className="text-gray-500 dark:text-gray-400 font-normal">
                            {' '}
                            in {education.field}
                          </span>
                        )}
                      </h3>
                      <p className="text-base text-green-primary font-semibold mb-1">
                        {education.institution}
                      </p>
                      <div className="flex flex-wrap gap-2 text-sm text-gray-500 dark:text-gray-400">
                        {education.location && <span>{education.location}</span>}
                        {education.gpa && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                            GPA: {education.gpa}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                        {education.duration}
                      </span>
                    </div>
                  </div>

                  {education.description && (
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                      {education.description}
                    </p>
                  )}

                  {education.achievements && education.achievements.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Achievements:
                      </h4>
                      <ul className="space-y-1">
                        {(expandedAchievements[index]
                          ? education.achievements
                          : education.achievements.slice(0, 3)
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
                        {education.achievements.length > 3 && (
                          <li>
                            <button
                              onClick={() => toggleAchievements(index)}
                              className="text-xs text-green-primary hover:text-green-secondary ml-5 font-medium transition-colors duration-200"
                            >
                              {expandedAchievements[index]
                                ? 'Show less'
                                : `+${education.achievements.length - 3} more achievements`}
                            </button>
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

                  {education.relevantCourses && education.relevantCourses.length > 0 && (
                    <div>
                      <div className="flex flex-wrap gap-1.5">
                        {education.relevantCourses.slice(0, 8).map((course, courseIndex) => (
                          <span
                            key={courseIndex}
                            className="px-2 py-1 bg-green-primary/10 text-green-primary rounded-md text-xs font-medium"
                          >
                            {course.course}
                          </span>
                        ))}
                        {education.relevantCourses.length > 8 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-md text-xs">
                            +{education.relevantCourses.length - 8}
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

export default Education
