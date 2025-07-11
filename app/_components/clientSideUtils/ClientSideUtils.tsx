'use client'

import { useEffect } from 'react'
import main from '@/utils/main.js'

declare global {
  interface Window {
    __GLOBAL_UTILS_LOADED__?: boolean
  }
}

export function ClientSideUtils() {
  useEffect(() => {
    // Cargar utilidades globales inmediatamente si no están ya cargadas
    try {
      if (typeof window !== 'undefined' && !window.__GLOBAL_UTILS_LOADED__) {
        main()
        console.log('✅ Utilidades globales cargadas correctamente desde ClientSideUtils')
      } else if (typeof window !== 'undefined') {
        console.log('ℹ️ Utilidades globales ya estaban cargadas')
      }
    } catch (error) {
      console.error('❌ Error al cargar utilidades globales:', error)
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
