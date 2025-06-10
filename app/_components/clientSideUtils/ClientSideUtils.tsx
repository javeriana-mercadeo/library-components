'use client'

import { useEffect } from 'react'
import main from '@/utils/main.js'

export function ClientSideUtils() {
  useEffect(() => {
    main()
  }, [])

  useEffect(() => {
    const isDev = process.env.NODE_ENV === 'development'
    const hostname = window.location.hostname

    document.documentElement.setAttribute('data-env', process.env.NODE_ENV)
    document.documentElement.setAttribute('data-hostname', hostname)
    document.documentElement.setAttribute('data-dev', isDev.toString())
  }, [])

  useEffect(() => {
    const originalError = console.error
    console.error = (...args) => {
      const message = args[0]?.toString() || ''

      if (message.includes('configuration is not defined')) {
        return
      }

      originalError.apply(console, args)
    }

    return () => {
      console.error = originalError
    }
  }, [])

  return null
}
