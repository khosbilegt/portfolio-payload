'use client'
import React, { useState } from 'react'

interface Certificate {
  title: string
  issuer: string
  description?: string
  issueDate: string
  expiryDate?: string
  credentialId?: string
  certificateImage?: {
    url: string
    alt?: string
  }
  verificationUrl?: string
  skills?: { skill: string }[]
  category?:
    | 'programming'
    | 'cloud'
    | 'data-science'
    | 'devops'
    | 'security'
    | 'design'
    | 'project-management'
    | 'other'
  featured?: boolean
  status?: 'active' | 'expired' | 'in-progress'
  score?: string
  duration?: string
}

interface CertificatesProps {
  title?: string
  subtitle?: string
  certificates?: Certificate[]
  showFilters?: boolean
  layout?: 'grid' | 'list' | 'timeline'
}

const categoryLabels = {
  programming: 'Programming',
  cloud: 'Cloud Computing',
  'data-science': 'Data Science',
  devops: 'DevOps',
  security: 'Security',
  design: 'Design',
  'project-management': 'Project Management',
  other: 'Other',
}

const statusLabels = {
  active: 'Active',
  expired: 'Expired',
  'in-progress': 'In Progress',
}

const statusColors = {
  active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  expired: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
}

function Certificates({
  title = 'Certifications & Achievements',
  subtitle = 'Professional credentials and continuous learning',
  certificates = [],
  showFilters = true,
  layout = 'grid',
}: CertificatesProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all')

  // Get unique categories from certificates
  const categories = Array.from(new Set(certificates.map((cert) => cert.category).filter(Boolean)))

  // Filter certificates based on active filter
  const filteredCertificates = certificates.filter((cert) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'featured') return cert.featured
    if (activeFilter === 'active') return cert.status === 'active'
    return cert.category === activeFilter
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    })
  }

  const isExpired = (cert: Certificate) => {
    if (!cert.expiryDate) return false
    return new Date(cert.expiryDate) < new Date()
  }

  const CertificateCard = ({ certificate }: { certificate: Certificate }) => (
    <div
      className={`group relative bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden ${
        certificate.featured ? 'ring-2 ring-green-primary' : ''
      }`}
    >
      {certificate.featured && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-green-primary text-white px-3 py-1 rounded-full text-sm font-medium">
            Featured
          </span>
        </div>
      )}

      <div className="flex flex-col h-full">
        {/* Certificate Image/Badge */}
        {certificate.certificateImage && (
          <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-700 h-48 flex items-center justify-center">
            <img
              src={certificate.certificateImage.url}
              alt={certificate.certificateImage.alt || certificate.title}
              className="max-w-full max-h-full object-contain p-4"
            />
          </div>
        )}

        <div className="p-6 flex-1 flex flex-col justify-between">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {certificate.title}
              </h3>
              <p className="text-lg text-green-primary font-semibold mb-1">{certificate.issuer}</p>
              {certificate.category && (
                <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                  {categoryLabels[certificate.category]}
                </span>
              )}
            </div>
            {certificate.status && (
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  statusColors[certificate.status]
                }`}
              >
                {statusLabels[certificate.status]}
              </span>
            )}
          </div>

          {/* Description */}
          {certificate.description && (
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
              {certificate.description}
            </p>
          )}

          {/* Details */}
          <div className="space-y-2 mb-4 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 dark:text-gray-400">Issued:</span>
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {formatDate(certificate.issueDate)}
              </span>
            </div>

            {certificate.expiryDate && (
              <div className="flex justify-between items-center">
                <span className="text-gray-500 dark:text-gray-400">Expires:</span>
                <span
                  className={`font-medium ${
                    isExpired(certificate)
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {formatDate(certificate.expiryDate)}
                </span>
              </div>
            )}

            {certificate.score && (
              <div className="flex justify-between items-center">
                <span className="text-gray-500 dark:text-gray-400">Score:</span>
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {certificate.score}
                </span>
              </div>
            )}

            {certificate.duration && (
              <div className="flex justify-between items-center">
                <span className="text-gray-500 dark:text-gray-400">Duration:</span>
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {certificate.duration}
                </span>
              </div>
            )}

            {certificate.credentialId && (
              <div className="flex justify-between items-center">
                <span className="text-gray-500 dark:text-gray-400">ID:</span>
                <span className="text-gray-700 dark:text-gray-300 font-mono text-xs">
                  {certificate.credentialId}
                </span>
              </div>
            )}
          </div>

          {/* Skills */}
          {certificate.skills && certificate.skills.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Skills Covered:
              </h4>
              <div className="flex flex-wrap gap-2">
                {certificate.skills.slice(0, 4).map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-medium"
                  >
                    {skill.skill}
                  </span>
                ))}
                {certificate.skills.length > 4 && (
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded text-xs">
                    +{certificate.skills.length - 4} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-auto pt-4">
            {certificate.verificationUrl && (
              <a
                href={certificate.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-green-primary hover:text-green-secondary font-medium text-sm transition-colors duration-200"
              >
                Verify Certificate
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  const TimelineItem = ({ certificate, index }: { certificate: Certificate; index: number }) => (
    <div className="relative">
      {/* Timeline line */}
      {index !== filteredCertificates.length - 1 && (
        <div className="absolute left-8 top-16 w-0.5 h-full bg-gray-300 dark:bg-gray-600 -z-10"></div>
      )}

      {/* Timeline dot */}
      <div className="absolute left-6 top-8 w-4 h-4 bg-green-primary rounded-full border-4 border-white dark:border-gray-800 z-10"></div>

      {/* Content */}
      <div className="ml-16 pb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                {certificate.title}
              </h3>
              <p className="text-green-primary font-semibold">{certificate.issuer}</p>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {formatDate(certificate.issueDate)}
            </span>
          </div>

          {certificate.description && (
            <p className="text-gray-600 dark:text-gray-300 mb-3">{certificate.description}</p>
          )}

          {certificate.skills && certificate.skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {certificate.skills.slice(0, 6).map((skill, skillIndex) => (
                <span
                  key={skillIndex}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                >
                  {skill.skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )

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

        {/* Filters */}
        {showFilters && (categories.length > 0 || certificates.some((c) => c.featured)) && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
                activeFilter === 'all'
                  ? 'bg-green-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              All Certificates
            </button>
            {certificates.some((c) => c.featured) && (
              <button
                onClick={() => setActiveFilter('featured')}
                className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
                  activeFilter === 'featured'
                    ? 'bg-green-primary text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Featured
              </button>
            )}
            <button
              onClick={() => setActiveFilter('active')}
              className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
                activeFilter === 'active'
                  ? 'bg-green-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Active Only
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category || '')}
                className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
                  activeFilter === category
                    ? 'bg-green-primary text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {categoryLabels[category as keyof typeof categoryLabels]}
              </button>
            ))}
          </div>
        )}

        {/* Certificates Display */}
        {layout === 'timeline' ? (
          <div className="max-w-4xl mx-auto">
            {filteredCertificates
              .sort((a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime())
              .map((certificate, index) => (
                <TimelineItem key={index} certificate={certificate} index={index} />
              ))}
          </div>
        ) : (
          <div
            className={`grid gap-8 ${
              layout === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1 max-w-4xl mx-auto'
            }`}
          >
            {filteredCertificates.map((certificate, index) => (
              <CertificateCard key={index} certificate={certificate} />
            ))}
          </div>
        )}

        {filteredCertificates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No certificates found for the selected filter.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default Certificates
