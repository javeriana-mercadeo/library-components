// ===== LIBRERÍAS EXTERNAS =====
// Compilado automáticamente el: 2025-05-31T03:00:42.490Z

var head = document.getElementsByTagName("head")[0];

for (const weight of ["regular", "thin", "light", "bold", "fill", "duotone"]) {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href =
    "https://unpkg.com/@phosphor-icons/web@2.1.1/src/" + weight + "/style.css";
  head.appendChild(link);
}


// ===== CÓDIGO PERSONALIZADO =====

// ===== IMPORTADO DE: ../utils/main =====
// Archivo: C:\Users\Amaro\OneDrive\Documentos\Trabajos\DMPA - Pontificia Universidad Javeriana\Desarrollo\library-components\utils\main.js
function main() {
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
      const element = document.createElement(tag)
      if (className) element.className = className
      if (content) element.innerHTML = content
      return element
    },

    findElement(selector, context = document) {
      return context.querySelector(selector)
    },

    findElements(selector, context = document) {
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

  // Exponer utilidades globalmente
  window.Logger = Logger
  window.DOMHelpers = DOMHelpers
  window.EventManager = EventManager
  window.TimingUtils = TimingUtils
  window.Validators = Validators

  // Inicialización
  DOMHelpers.isReady(() => {
    Logger.success('Utilidades globales cargadas')
  })
}


// ===== CÓDIGO PRINCIPAL =====
main()

/* // ==========================================
// VERSIÓN SIMPLIFICADA PARA LIFERAY
// ==========================================

let hasExecuted = false

function safeExecute() {
  if (hasExecuted) {
    console.log('🔄 Ya ejecutado, saltando...')
    return
  }

  hasExecuted = true
  console.log('✅ Ejecutando main()...')

  try {
    console.log('DOM completamente cargado y analizado')
    main()
    console.log('🎉 main() ejecutado exitosamente')
  } catch (error) {
    console.error('❌ Error ejecutando main():', error)
  }
}

// ==========================================
// MÉTODOS ESENCIALES PARA LIFERAY
// ==========================================

// 1. Método principal: Liferay events
if (typeof Liferay !== 'undefined' && Liferay.on) {
  console.log('🟢 Liferay detectado - usando eventos nativos')

  Liferay.on('allPortletsReady', function () {
    console.log('📦 Todos los portlets listos')
    safeExecute()
  })
} else {
  console.log('🟡 Liferay no detectado - usando DOMContentLoaded')
}

// 2. Fallback: DOMContentLoaded (tu método original)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      if (!hasExecuted) {
        safeExecute()
      }
    }, 200) // Dar tiempo a Liferay
  })
} else {
  // DOM ya está listo
  setTimeout(() => {
    if (!hasExecuted) {
      safeExecute()
    }
  }, 100)
}

// 3. Fallback final: window.load
window.addEventListener('load', () => {
  setTimeout(() => {
    if (!hasExecuted) {
      console.log('⚠️ Ejecutando por window.load')
      safeExecute()
    }
  }, 500)
})
 */
