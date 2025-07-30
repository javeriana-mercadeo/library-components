'use client'

import { useEffect } from 'react'

import initGlobalUtils from '@/utils/main.js'

declare global {
  interface Window {
    __GLOBAL_UTILS_LOADED__?: boolean
    Logger?: any
    DOMUtils?: any
    DOMHelpers?: any
    EventManager?: any
    TimingUtils?: any
    ValidatorUtils?: any
    Validators?: any
    FormManager?: any
    HTTPClient?: any
    apiClient?: any
    DataUtils?: any
    StringUtils?: any
    StorageUtils?: any
    APIManager?: any
  }
}

export function ClientSideUtils() {
  useEffect(() => {
    // Cargar utilidades globales inmediatamente si no están ya cargadas
    try {
      if (typeof window !== 'undefined' && !window.__GLOBAL_UTILS_LOADED__) {
        initGlobalUtils()
        // Utilidades cargadas silenciosamente
      }
    } catch (error) {
      console.error('❌ Error al cargar utilidades globales:', error)

      // Fallback de emergencia - cargar la versión legacy
      try {
        const legacyInit = require('@/utils/main.js').default

        legacyInit()
      } catch (legacyError) {
        console.error('❌ Error crítico: no se pudieron cargar utilidades:', legacyError)
      }
    }
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
