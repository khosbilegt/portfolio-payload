'use client'

import React from 'react'
import CalendlyInline from '@/components/CalendlyInline'

function BookPage() {
  return (
    <div className="relative w-full">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-950" />

      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <header className="text-center mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Book a <span className="text-green-primary hover:text-green-secondary">30‑minute</span>{' '}
            call
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Pick a time that works for you. We’ll discuss your goals, scope, and next steps.
          </p>
        </header>

        <div className="rounded-2xl border border-slate-200/70 dark:border-white/10 shadow-xl shadow-slate-800/5 dark:shadow-black/20 bg-white/70 dark:bg-white/5 backdrop-blur-sm p-4 sm:p-6 lg:p-8">
          <CalendlyInline url="https://calendly.com/khosbilegt-b/30min" />
        </div>

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Prefer email? Reach out at{' '}
          <a
            href="mailto:hello@koso.dev"
            className="underline decoration-dotted underline-offset-4 hover:text-gray-700 dark:hover:text-gray-200"
          >
            khosbilegt@gmail.com
          </a>
        </p>
      </section>
    </div>
  )
}

export default BookPage
