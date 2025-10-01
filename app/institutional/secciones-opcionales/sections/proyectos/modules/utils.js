// ===========================================
// UTILIDADES - RE-EXPORT DE GLOBALES
// ===========================================

/**
 * Este archivo re-exporta las utilidades globales disponibles en window
 * para mantener compatibilidad con imports ES6 en los módulos
 *
 * Las utilidades globales se cargan desde utils/index.js
 */

/**
 * Verifica si estamos en el entorno del navegador
 */
export const isBrowser = () => typeof window !== 'undefined'

/**
 * Espera a que el DOM esté listo
 */
export const onDOMReady = callback => {
  if (!isBrowser()) return

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback)
  } else {
    callback()
  }
}

/**
 * Ejecuta una función cuando el navegador esté inactivo
 * Usa TimingUtils global si está disponible
 */
export const runWhenIdle = (callback, timeout = 2000) => {
  if (!isBrowser()) return

  if (window.TimingUtils?.runWhenIdle) {
    window.TimingUtils.runWhenIdle(callback, timeout)
  } else if ('requestIdleCallback' in window) {
    requestIdleCallback(callback, { timeout })
  } else {
    setTimeout(callback, timeout)
  }
}

/**
 * Detecta el tipo de dispositivo
 */
export const detectDevice = () => {
  if (!isBrowser()) return { isMobile: false, isTablet: false, isDesktop: true }

  const width = window.innerWidth

  return {
    isMobile: width <= 767,
    isTablet: width >= 768 && width <= 899,
    isMobileTablet: width < 900,
    isDesktop: width >= 900,
    width
  }
}

/**
 * Espera a que un elemento exista en el DOM
 * Usa DOMUtils global si está disponible
 */
export const waitForElement = (selector, maxAttempts = 10, interval = 100) => {
  if (window.DOMUtils?.waitForElement) {
    return window.DOMUtils.waitForElement(selector, maxAttempts, interval)
  }

  return new Promise((resolve, reject) => {
    let attempts = 0

    function check() {
      attempts++
      const element = document.querySelector(selector)

      if (element) {
        resolve(element)
      } else if (attempts >= maxAttempts) {
        reject(new Error(`Element not found: ${selector}`))
      } else {
        setTimeout(check, interval)
      }
    }

    check()
  })
}

/**
 * Logger global - Re-exportar para compatibilidad con imports
 */
export const Logger = window.Logger

export default {
  isBrowser,
  onDOMReady,
  runWhenIdle,
  detectDevice,
  waitForElement,
  Logger
}
