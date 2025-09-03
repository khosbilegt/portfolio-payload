import React from 'react'
import CalendlyInline from '@/components/CalendlyInline'

function QuotePage() {
  return (
    <div className="bg-white dark:bg-gray-900 flex justify-center items-center">
      <p>Hello World</p>
      <CalendlyInline url="https://calendly.com/khosbilegt-b/30min" />
    </div>
  )
}

export default QuotePage
