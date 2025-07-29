'use client'

import { useEffect } from 'react'
import { initGlobalUtils } from '@/utils/index.js'

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
        initGlobalUtils({
          exposeToWindow: true,
          enableLegacySupport: true,
          logLevel: 'DEBUG'
        })
        console.log('✅ Utilidades globales v2.0 cargadas correctamente desde ClientSideUtils')
        
        // Verificar que las utilidades estén disponibles
        const utilsCheck = {
          Logger: !!window.Logger,
          DOMUtils: !!window.DOMUtils,
          DOMHelpers: !!window.DOMHelpers,
          EventManager: !!window.EventManager,
          HTTPClient: !!window.HTTPClient,
          StringUtils: !!window.StringUtils,
          DataUtils: !!window.DataUtils
        }
        
        console.log('🔍 Utilidades verificadas:', utilsCheck)
      } else if (typeof window !== 'undefined') {
        console.log('ℹ️ Utilidades globales ya estaban cargadas')
      }
    } catch (error) {
      console.error('❌ Error al cargar utilidades globales:', error)
      
      // Fallback de emergencia - cargar la versión legacy
      try {
        const legacyInit = require('@/utils/main.js').default
        legacyInit()
        console.log('🔄 Fallback: utilidades legacy cargadas')
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
