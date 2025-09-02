import React from 'react'

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
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
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
          {educations.map((education, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-lg p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {education.degree}
                    {education.field && (
                      <span className="text-gray-600 dark:text-gray-300">
                        {' '}
                        in {education.field}
                      </span>
                    )}
                  </h3>
                  <p className="text-lg text-green-primary font-semibold mb-1">
                    {education.institution}
                  </p>
                  {education.location && (
                    <p className="text-gray-600 dark:text-gray-300">{education.location}</p>
                  )}
                  {education.gpa && (
                    <p className="text-gray-600 dark:text-gray-300 font-medium">
                      GPA: {education.gpa}
                    </p>
                  )}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">
                  {education.duration}
                </div>
              </div>

              {education.description && (
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  {education.description}
                </p>
              )}

              {education.achievements && education.achievements.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Achievements:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    {education.achievements.map((item, achIndex) => (
                      <li key={achIndex}>{item.achievement}</li>
                    ))}
                  </ul>
                </div>
              )}

              {education.relevantCourses && education.relevantCourses.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Relevant Courses:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {education.relevantCourses.map((course, courseIndex) => (
                      <span
                        key={courseIndex}
                        className="px-3 py-1 bg-green-primary/10 text-green-primary rounded-full text-sm font-medium"
                      >
                        {course.course}
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

export default Education
