'use client'

import React, { useEffect, useRef, useState } from 'react'

type CalendlyInlineProps = {
  url: string
  minWidth?: string
  height?: string | number
}

export default function CalendlyInline(props: CalendlyInlineProps) {
  const { url, minWidth = '320px', height = 700 } = props
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    let didCancel = false

    const ensureCalendlyScript = () =>
      new Promise<void>((resolve) => {
        const existingScript = document.querySelector(
          'script[src="https://assets.calendly.com/assets/external/widget.js"]',
        ) as HTMLScriptElement | null

        if (existingScript) {
          if ((window as any).Calendly) resolve()
          else existingScript.addEventListener('load', () => resolve(), { once: true })
          return
        }

        const script = document.createElement('script')
        script.src = 'https://assets.calendly.com/assets/external/widget.js'
        script.async = true
        script.addEventListener('load', () => resolve(), { once: true })
        document.body.appendChild(script)
      })

    ensureCalendlyScript().then(() => {
      if (didCancel) return
      setIsReady(true)
      const calendly = (window as any).Calendly
      if (calendly && containerRef.current) {
        calendly.initInlineWidget({ url, parentElement: containerRef.current })
      }
    })

    return () => {
      didCancel = true
    }
  }, [url])

  return (
    <div
      style={{ minWidth, height, position: 'relative' }}
      className="bg-white dark:bg-gray-900 flex justify-center items-center w-full"
    >
      {!isReady && (
        <div
          aria-busy="true"
          className="animate-pulse rounded-md bg-gray-200"
          style={{ position: 'absolute', inset: 0 }}
        />
      )}
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}
