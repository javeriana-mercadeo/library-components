// ===========================================
// SCRIPT PRINCIPAL - HEADER Y MODAL
// ===========================================

// Importar módulos separados
import { HeaderManager } from './headerManager.js'

// ███████████████████████████████████████████████████████████████████████████████
// █                        UTILIDADES DE ESPERA                               █
// ███████████████████████████████████████████████████████████████████████████████

// Función para esperar a que las utilidades globales estén disponibles
function waitForGlobalUtils() {
  return new Promise((resolve, reject) => {
    let attempts = 0
    const maxAttempts = 100 // 1 segundo máximo

    const checkUtils = () => {
      attempts++

      // Verificar solo las utilidades básicas necesarias
      if (
        typeof window !== 'undefined' &&
        (window.__GLOBAL_UTILS_LOADED__ || (window.Logger && window.DOMUtils && window.EventManager && window.TimingUtils))
      ) {
        resolve(true)
      } else if (attempts >= maxAttempts) {
        // Si fallan, crear utilidades mínimas localmente
        console.warn('⚠️ Utilidades globales no disponibles, usando fallback local')
        createFallbackUtils()
        resolve(true)
      } else {
        setTimeout(checkUtils, 10)
      }
    }
    checkUtils()
  })
}

// Crear utilidades mínimas como fallback
function createFallbackUtils() {
  if (typeof window === 'undefined') return

  if (!window.Logger) {
    window.Logger = {
      debug: (msg, ...args) => console.log(`🔍 [DEBUG] ${msg}`, ...args),
      info: (msg, ...args) => console.log(`ℹ️ [INFO] ${msg}`, ...args),
      success: (msg, ...args) => console.log(`✅ [SUCCESS] ${msg}`, ...args),
      warning: (msg, ...args) => console.warn(`⚠️ [WARNING] ${msg}`, ...args),
      error: (msg, ...args) => console.error(`❌ [ERROR] ${msg}`, ...args)
    }
  }

  if (!window.DOMUtils) {
    window.DOMUtils = {
      findElement: (selector, context = document) => context?.querySelector(selector) || null,
      findElements: (selector, context = document) => Array.from(context?.querySelectorAll(selector) || []),
      toggleClasses: (element, classes, force = null) => {
        if (!element) return
        classes.forEach(className => {
          if (force === null) {
            element.classList.toggle(className)
          } else {
            element.classList.toggle(className, force)
          }
        })
      },
      isReady: callback => {
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', callback)
        } else {
          callback()
        }
      }
    }
  }

  if (!window.EventManager) {
    window.EventManager = {
      listeners: new Map(),
      add: (element, event, handler, options = {}) => {
        if (!element) return false
        const key = `${element.constructor.name}-${event}-${Date.now()}`
        element.addEventListener(event, handler, options)
        return key
      },
      cleanup: () => console.log('EventManager cleanup called')
    }
  }

  if (!window.TimingUtils) {
    window.TimingUtils = {
      delay: (callback, ms = 0) => setTimeout(callback, ms)
    }
  }

  window.__GLOBAL_UTILS_LOADED__ = true
}

// ███████████████████████████████████████████████████████████████████████████████
// █                        INICIALIZACIÓN GENERAL                              █
// ███████████████████████████████████████████████████████████████████████████████

const AppSystem = {
  init() {
    try {
      // Inicializar sistemas con el patrón simple que funciona
      const systems = {
        mobileMenu: this.initMobileMenu(),
        contactModal: this.initContactModal(),
        modalForm: this.initModalForm()
      }

      const activeSystems = Object.entries(systems)
        .filter(([_, isActive]) => isActive)
        .map(([name]) => name)

      return systems
    } catch (error) {
      if (typeof Logger !== 'undefined' && Logger.error) {
        Logger.error('❌ [HEADER] Error al inicializar:', error)
      } else {
        console.error('❌ [HEADER] Error al inicializar:', error)
      }
      return {
        mobileMenu: false,
        contactModal: false,
        modalForm: false
      }
    }
  },

  initMobileMenu() {
    try {
      return HeaderManager.init().mobileMenu || false
    } catch (error) {
      if (typeof Logger !== 'undefined' && Logger.error) {
        Logger.error('Error en mobile menu:', error)
      } else {
        console.error('Error en mobile menu:', error)
      }
      return false
    }
  },

  initContactModal() {
    try {
      return HeaderManager.init().contactModal || false
    } catch (error) {
      if (typeof Logger !== 'undefined' && Logger.error) {
        Logger.error('Error en contact modal:', error)
      } else {
        console.error('Error en contact modal:', error)
      }
      return false
    }
  },

  initModalForm() {
    try {
      return true
    } catch (error) {
      if (typeof Logger !== 'undefined' && Logger.error) {
        Logger.error('Error en modal form:', error)
      } else {
        console.error('Error en modal form:', error)
      }
      return false
    }
  },

  cleanup() {
    // Limpiar solo si existen
    try {
      if (window.HeaderManager) HeaderManager.cleanup()
    } catch (error) {
      if (typeof Logger !== 'undefined' && Logger.debug) {
        Logger.debug('Cleanup warning:', error)
      } else {
        console.debug('Cleanup warning:', error)
      }
    }
  }
}

// ===========================================
// AUTO-INICIALIZACIÓN PARA LIFERAY
// ===========================================

function initHeaderSystem() {
  // Verificar que estamos en el cliente
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return
  }

  // Usar patrón similar a otros scripts que funcionan
  const initWhenReady = () => {
    try {
      // Esperar a que las utilidades globales estén disponibles con timeout corto
      waitForGlobalUtils()
        .then(() => {
          // Pequeño delay para React
          setTimeout(() => {
            AppSystem.init()
          }, 100)
        })
        .catch(() => {
          // Si falla, usar fallback (ya está configurado en waitForGlobalUtils)
          setTimeout(() => {
            AppSystem.init()
          }, 100)
        })

      // Cleanup global
      window.addEventListener('beforeunload', AppSystem.cleanup)
    } catch (error) {
      if (typeof Logger !== 'undefined' && Logger.error) {
        Logger.error('❌ [INIT] Error al inicializar:', error)
      } else {
        console.error('❌ [INIT] Error al inicializar:', error)
      }
    }
  }

  // Usar DOMUtils si está disponible, sino usar fallback
  if (typeof DOMUtils !== 'undefined' && DOMUtils.isReady) {
    DOMUtils.isReady(initWhenReady)
  } else {
    // Fallback simple - verificar que document existe
    if (typeof document !== 'undefined') {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWhenReady)
      } else {
        initWhenReady()
      }
    }
  }
}

if (typeof window !== 'undefined') {
  const isNextEnvironment = Boolean(window.__NEXT_DATA__)

  // Solo auto-inicializar cuando no estamos en un entorno Next.js (ej. Liferay)
  if (typeof module === 'undefined' && !isNextEnvironment) {
    initHeaderSystem()
  }

  window.initHeaderSystem = initHeaderSystem
}

export default initHeaderSystem
