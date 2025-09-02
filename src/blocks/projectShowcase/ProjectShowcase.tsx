'use client'
import React, { useState } from 'react'

interface Project {
  title: string
  description: string
  shortDescription?: string
  featuredImage: {
    url: string
    alt?: string
  }
  gallery?: { image: { url: string; alt?: string } }[]
  technologies?: { technology: string }[]
  category?: 'web' | 'mobile' | 'desktop' | 'design' | 'other'
  status?: 'completed' | 'in-progress' | 'concept'
  featured?: boolean
  liveUrl?: string
  githubUrl?: string
  caseStudyUrl?: string
  startDate?: string
  endDate?: string
  client?: string
  teamSize?: number
}

interface ProjectShowcaseProps {
  title?: string
  subtitle?: string
  projects?: Project[]
  showFilters?: boolean
  layout?: 'grid' | 'masonry' | 'list'
}

const categoryLabels = {
  web: 'Web Development',
  mobile: 'Mobile App',
  desktop: 'Desktop App',
  design: 'UI/UX Design',
  other: 'Other',
}

const statusLabels = {
  completed: 'Completed',
  'in-progress': 'In Progress',
  concept: 'Concept',
}

const statusColors = {
  completed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  concept: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
}

function ProjectShowcase({
  title = 'Featured Projects',
  subtitle = 'A showcase of my recent work',
  projects = [],
  showFilters = true,
  layout = 'grid',
}: ProjectShowcaseProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [showAllProjects, setShowAllProjects] = useState<boolean>(false)

  // Get unique categories from projects
  const categories = Array.from(
    new Set(projects.map((project) => project.category).filter(Boolean)),
  )

  // Filter projects based on active filter
  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'featured') return project.featured
    return project.category === activeFilter
  })

  // Show only last 3 projects unless expanded
  const displayProjects = showAllProjects ? filteredProjects : filteredProjects.slice(0, 3)

  // Reset show all when filter changes
  React.useEffect(() => {
    setShowAllProjects(false)
  }, [activeFilter])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    })
  }

  const ProjectCard = ({ project }: { project: Project }) => (
    <div
      className={`group relative bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden ${
        project.featured ? 'ring-2 ring-green-primary' : ''
      }`}
    >
      {project.featured && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-green-primary text-white px-3 py-1 rounded-full text-sm font-medium">
            Featured
          </span>
        </div>
      )}

      <div className="relative overflow-hidden">
        <img
          src={project.featuredImage.url}
          alt={project.featuredImage.alt || project.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

        {/* Quick action buttons */}
        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="View live demo"
            >
              <svg
                className="w-4 h-4 text-gray-700 dark:text-gray-300"
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
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="View source code"
            >
              <svg
                className="w-4 h-4 text-gray-700 dark:text-gray-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              {project.title}
            </h3>
            {project.category && (
              <span className="text-sm text-green-primary font-medium">
                {categoryLabels[project.category]}
              </span>
            )}
          </div>
          {project.status && (
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}
            >
              {statusLabels[project.status]}
            </span>
          )}
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {project.shortDescription || project.description}
        </p>

        {project.technologies && project.technologies.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 4).map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-medium"
                >
                  {tech.technology}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded text-xs">
                  +{project.technologies.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex space-x-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-primary hover:text-green-secondary font-medium text-sm transition-colors duration-200"
              >
                Live Demo →
              </a>
            )}
            {project.caseStudyUrl && (
              <a
                href={project.caseStudyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-primary hover:text-green-secondary font-medium text-sm transition-colors duration-200"
              >
                Case Study →
              </a>
            )}
          </div>

          {project.startDate && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatDate(project.startDate)}
            </span>
          )}
        </div>
      </div>
    </div>
  )

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

        {/* Filters */}
        {showFilters && (categories.length > 0 || projects.some((p) => p.featured)) && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
                activeFilter === 'all'
                  ? 'bg-green-primary text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              All Projects
            </button>
            {projects.some((p) => p.featured) && (
              <button
                onClick={() => setActiveFilter('featured')}
                className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
                  activeFilter === 'featured'
                    ? 'bg-green-primary text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                Featured
              </button>
            )}
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category || '')}
                className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
                  activeFilter === category
                    ? 'bg-green-primary text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                {categoryLabels[category as keyof typeof categoryLabels]}
              </button>
            ))}
          </div>
        )}

        {/* Projects Grid */}
        <div
          className={`grid gap-8 ${
            layout === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : layout === 'list'
                ? 'grid-cols-1'
                : 'columns-1 md:columns-2 lg:columns-3'
          }`}
        >
          {displayProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>

        {filteredProjects.length > 3 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAllProjects(!showAllProjects)}
              className="inline-flex items-center px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
            >
              {showAllProjects ? (
                <>
                  Show Less Projects
                  <svg
                    className="ml-2 w-4 h-4 transform rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </>
              ) : (
                <>
                  Show All {filteredProjects.length} Projects
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
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No projects found for the selected filter.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProjectShowcase
