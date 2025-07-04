function initGlobalUtils() {
  // ===========================================
  // UTILIDADES GLOBALES
  // ===========================================

  // Logger para debugging
  const Logger = {
    debug: (message, ...args) => console.log(`🔍 [DEBUG] ${message}`, ...args),
    info: (message, ...args) => console.log(`ℹ️ [INFO] ${message}`, ...args),
    success: (message, ...args) => console.log(`✅ [SUCCESS] ${message}`, ...args),
    warning: (message, ...args) => console.warn(`⚠️ [WARNING] ${message}`, ...args),
    error: (message, ...args) => console.error(`❌ [ERROR] ${message}`, ...args)
  }

  // Helpers para manipulación del DOM
  const DOMHelpers = {
    isReady(callback) {
      if (typeof document === 'undefined') return
      
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback)
      } else {
        callback()
      }
    },

    toggleClasses(element, classes, force = null) {
      if (!element) return
      classes.forEach(className => {
        if (force === null) {
          element.classList.toggle(className)
        } else {
          element.classList.toggle(className, force)
        }
      })
    },

    createElement(tag, className = '', content = '') {
      if (typeof document === 'undefined') return null
      
      const element = document.createElement(tag)
      if (className) element.className = className
      if (content) element.innerHTML = content
      return element
    },

    findElement(selector, context = document) {
      if (typeof document === 'undefined') return null
      return context.querySelector(selector)
    },

    findElements(selector, context = document) {
      if (typeof document === 'undefined') return []
      return Array.from(context.querySelectorAll(selector))
    }
  }

  // Gestor de eventos centralizado
  const EventManager = {
    listeners: new Map(),

    add(element, event, handler, options = {}) {
      if (!element) return false

      const key = `${element.constructor.name}-${event}-${Date.now()}`
      element.addEventListener(event, handler, options)

      this.listeners.set(key, { element, event, handler, options })
      return key
    },

    remove(key) {
      if (!this.listeners.has(key)) return false

      const { element, event, handler } = this.listeners.get(key)
      element.removeEventListener(event, handler)
      this.listeners.delete(key)
      return true
    },

    cleanup() {
      this.listeners.forEach(({ element, event, handler }) => {
        element.removeEventListener(event, handler)
      })
      this.listeners.clear()
      Logger.debug('Event listeners limpiados')
    }
  }

  // Utilidades de tiempo
  const TimingUtils = {
    delay(callback, ms = 0) {
      return setTimeout(callback, ms)
    },

    debounce(func, wait = 300) {
      let timeout
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout)
          func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
      }
    },

    throttle(func, limit = 100) {
      let inThrottle
      return function (...args) {
        if (!inThrottle) {
          func.apply(this, args)
          inThrottle = true
          setTimeout(() => (inThrottle = false), limit)
        }
      }
    }
  }

  // Validadores comunes
  const Validators = {
    email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    phone: value => /^[+]?[\d\s\-()]{10,15}$/.test(value),
    document: value => /^\d{6,12}$/.test(value),
    name: value => value.length >= 2 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value),
    required: value => value && value.toString().trim().length > 0
  }

  // Exponer utilidades globalmente solo en el navegador
  if (typeof window !== 'undefined') {
    window.Logger = Logger
    window.DOMHelpers = DOMHelpers
    window.EventManager = EventManager
    window.TimingUtils = TimingUtils
    window.Validators = Validators
    
    // Marcar como cargadas
    window.__GLOBAL_UTILS_LOADED__ = true
    
    Logger.success('Utilidades globales inicializadas')
  }
}

// Auto-ejecutar si estamos en el navegador
if (typeof window !== 'undefined' && !window.__GLOBAL_UTILS_LOADED__) {
  initGlobalUtils()
}

// Exportar la función para uso manual
export default initGlobalUtils
