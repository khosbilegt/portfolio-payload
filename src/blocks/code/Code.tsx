'use client'

import React from 'react'

type Props = {
  language?: string
  code: string
  caption?: string
  disableInnerContainer?: boolean
}

export default function CodeBlockComponent(props: Props) {
  const { language = 'plaintext', code, caption } = props

  return (
    <section className="">
      <div className="max-w-4xl mx-auto">
        <pre className="bg-gray-900 dark:bg-gray-800 p-4 rounded-xl overflow-x-auto border border-gray-200 dark:border-gray-700">
          <code className={`language-${language} text-sm font-mono`}>{code}</code>
        </pre>
        {caption && <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">{caption}</div>}
      </div>
    </section>
  )
}
