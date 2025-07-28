// ===========================================
// SCRIPT PRINCIPAL - HEADER
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
        (window.__GLOBAL_UTILS_LOADED__ || 
         (window.Logger && window.DOMHelpers && window.EventManager && window.TimingUtils))
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

  if (!window.DOMHelpers) {
    window.DOMHelpers = {
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
  console.log('✅ Utilidades de fallback creadas')
}

// ███████████████████████████████████████████████████████████████████████████████
// █                        INICIALIZACIÓN GENERAL                              █
// ███████████████████████████████████████████████████████████████████████████████

const AppSystem = {
  init() {
    console.log('🚀 [HEADER] Inicializando sistema del header...')

    try {
      // Inicializar sistemas con el patrón simple que funciona
      const systems = {
        mobileMenu: this.initMobileMenu()
      }

      const activeSystems = Object.entries(systems)
        .filter(([_, isActive]) => isActive)
        .map(([name]) => name)

      console.log(`✅ [HEADER] Sistema iniciado - ${activeSystems.length} sistemas activos:`, activeSystems.join(', '))
      return systems
    } catch (error) {
      console.error('❌ [HEADER] Error al inicializar:', error)
      return {
        mobileMenu: false
      }
    }
  },

  initMobileMenu() {
    try {
      return HeaderManager.init().mobileMenu || false
    } catch (error) {
      console.error('Error en mobile menu:', error)
      return false
    }
  },


  cleanup() {
    // Limpiar solo si existen
    try {
      if (window.HeaderManager) HeaderManager.cleanup()
    } catch (error) {
      console.debug('Cleanup warning:', error)
    }
  }
}

// ===========================================
// AUTO-INICIALIZACIÓN PARA LIFERAY
// ===========================================

function initHeaderSystem() {
  console.log('🔧 [INIT] Iniciando sistema del header...')

  // Usar patrón similar a otros scripts que funcionan
  const initWhenReady = () => {
    try {
      // Esperar a que las utilidades globales estén disponibles con timeout corto
      waitForGlobalUtils().then(() => {
        // Pequeño delay para React
        setTimeout(() => {
          AppSystem.init()
          console.log('🔧 [INIT] Sistema del header listo')
        }, 100)
      }).catch(() => {
        // Si falla, usar fallback (ya está configurado en waitForGlobalUtils)
        setTimeout(() => {
          AppSystem.init()
          console.log('🔧 [INIT] Sistema del header listo (fallback)')
        }, 100)
      })

      // Cleanup global
      window.addEventListener('beforeunload', AppSystem.cleanup)
    } catch (error) {
      console.error('❌ [INIT] Error al inicializar:', error)
    }
  }

  // Usar DOMHelpers si está disponible, sino usar fallback (patrón de experiencia)
  if (typeof DOMHelpers !== 'undefined' && DOMHelpers.isReady) {
    DOMHelpers.isReady(initWhenReady)
  } else {
    // Fallback simple
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initWhenReady)
    } else {
      initWhenReady()
    }
  }
}

// Auto-ejecutar si no es un módulo
if (typeof module === 'undefined') {
  initHeaderSystem()
}

if (typeof window !== 'undefined') {
  window.initHeaderSystem = initHeaderSystem
}

export default initHeaderSystem
