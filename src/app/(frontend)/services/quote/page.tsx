'use client'

import React, { useState } from 'react'

function QuotePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    description: '',
    requirements: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Map form data to Payload form structure
      const dataToSend = Object.entries({
        fullname: formData.name,
        email: formData.email,
        company: formData.company,
        timeline: formData.timeline,
        projecttype: formData.projectType,
        budgetrange: formData.budget,
        projectdescription: formData.description,
        technicalrequirements: formData.requirements,
      }).map(([field, value]) => ({ field, value }))

      const payloadToSend = {
        form: '68b825fd8de2854fad45c0ba', // Your form ID
        submissionData: dataToSend,
      }

      const response = await fetch('/api/form-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payloadToSend),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      setIsSubmitted(true)
    } catch (error) {
      console.error('Form submission error:', error)
      // You might want to show an error message to the user
      alert('Failed to submit form. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="relative w-full">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-950" />

        <section className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
              <svg
                className="h-8 w-8 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
              Quote Request Sent!
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Thank you for your interest. I'll review your project details and get back to you
              within 24 hours with a detailed quote.
            </p>
            <div className="mt-8">
              <button
                onClick={() => setIsSubmitted(false)}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-primary hover:bg-green-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-primary transition-colors duration-200"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="relative w-full">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-950" />

      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <header className="text-center mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Get a{' '}
            <span className="text-green-primary hover:text-green-secondary">Custom Quote</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Tell me about your project and I'll provide a detailed quote tailored to your needs.
          </p>
        </header>

        <div className="rounded-2xl border border-slate-200/70 dark:border-white/10 shadow-xl shadow-slate-800/5 dark:shadow-black/20 bg-white/70 dark:bg-white/5 backdrop-blur-sm p-6 sm:p-8 lg:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="company"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Company/Organization
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
                placeholder="Acme Corp"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="projectType"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Project Type *
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  required
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200"
                >
                  <option value="">Select project type</option>
                  <option value="web-app">Web Application</option>
                  <option value="mobile-app">Mobile Application</option>
                  <option value="ecommerce">E-commerce Store</option>
                  <option value="portfolio">Portfolio Website</option>
                  <option value="blog">Blog/CMS</option>
                  <option value="api">API Development</option>
                  <option value="consulting">Technical Consulting</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="budget"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Budget Range
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200"
                >
                  <option value="">Select budget range</option>
                  <option value="under-5k">Under $1,000</option>
                  <option value="5k-10k">$1,000 - $5,000</option>
                  <option value="5k-10k">$5,000 - $10,000</option>
                  <option value="10k-25k">$10,000 - $25,000</option>
                  <option value="25k-50k">$25,000 - $50,000</option>
                  <option value="50k-plus">$50,000+</option>
                  <option value="discuss">Let's discuss</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="timeline"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Timeline
              </label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200"
              >
                <option value="">Select timeline</option>
                <option value="asap">ASAP</option>
                <option value="1-month">Within 1 month</option>
                <option value="2-3-months">2-3 months</option>
                <option value="3-6-months">3-6 months</option>
                <option value="6-plus-months">6+ months</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Project Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200 resize-vertical"
                placeholder="Describe your project goals, target audience, and any specific features you need..."
              />
            </div>

            <div>
              <label
                htmlFor="requirements"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Technical Requirements
              </label>
              <textarea
                id="requirements"
                name="requirements"
                rows={3}
                value={formData.requirements}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200 resize-vertical"
                placeholder="Any specific technologies, integrations, or technical constraints..."
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center px-6 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-green-primary hover:bg-green-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending Quote Request...
                  </>
                ) : (
                  'Send Quote Request'
                )}
              </button>
            </div>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Prefer to discuss in person?{' '}
          <a
            href="mailto:khosbilegt@gmail.com"
            className="underline decoration-dotted underline-offset-4 hover:text-gray-700 dark:hover:text-gray-200"
          >
            Schedule a call
          </a>
        </p>
      </section>
    </div>
  )
}

export default QuotePage
