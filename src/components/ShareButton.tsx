'use client'

import React, { useEffect, useRef, useState } from 'react'

export default function ShareButton() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const popoverRef = useRef<HTMLDivElement | null>(null)

  const url = typeof window !== 'undefined' ? window.location.href : ''

  useEffect(() => {
    if (!open) return
    const copy = async () => {
      try {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        const timer = setTimeout(() => setCopied(false), 1500)
        return () => clearTimeout(timer)
      } catch {}
    }
    copy()
  }, [open, url])

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [open])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }

  return (
    <div className="relative" ref={popoverRef}>
      <button
        aria-label="Share"
        onClick={() => setOpen((v) => !v)}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
      >
        <svg
          className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-2rem)] rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg p-3 z-50">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Share link</div>
          <div className="flex items-center gap-2">
            <input
              readOnly
              value={url}
              className="flex-1 text-xs md:text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-2 py-2 text-gray-700 dark:text-gray-200 overflow-hidden text-ellipsis"
            />
            <button
              onClick={handleCopy}
              className="shrink-0 inline-flex items-center gap-2 px-3 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white text-xs md:text-sm transition-colors"
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-7.364 7.364a1 1 0 01-1.414 0L3.293 9.836a1 1 0 011.414-1.414l3.05 3.05 6.657-6.656a1 1 0 011.293-.123z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Copied
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 16h8M8 12h8m-7 8h6a2 2 0 002-2V8l-4-4H9a2 2 0 00-2 2v2"
                    />
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>
          <div className="mt-2 text-[11px] text-gray-500 dark:text-gray-400">
            {copied ? 'Link copied to clipboard' : 'Click copy or it will auto-copy'}
          </div>
        </div>
      )}
    </div>
  )
}
