// ===== LIBRERÍAS EXTERNAS =====
// Compilado automáticamente el: 2025-06-05T03:08:48.027Z

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
// Archivo: G:\Documentos\GitHub\library-components\utils\main.js
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


// ===== IMPORTADO DE: ../app/_library/components/contain/btn/script.js =====
// Archivo: G:\Documentos\GitHub\library-components\app\_library\components\contain\btn\script.js
/**
 * script.js - Añade efecto de onda a los botones
 * Versión corregida para evitar problemas de hidratación con SSR
 */

// Configuración personalizable
const CONFIG = {
  buttonSelector: '[data-dmpa-element-id="btn"]', // Selector para encontrar los botones
  rippleClassName: 'btn-ripple-effect', // Clase CSS para el efecto de onda
  animationDuration: 600, // Duración de la animación en milisegundos
  rippleSize: 180, // Tamaño del efecto de onda en píxeles
  enableMutationObserver: true, // Habilitar o deshabilitar el observador de mutaciones
  markProcessedButtons: false, // NO marcar los botones con data-ripple-applied para evitar problemas de hidratación
  forceRelativePosition: false, // Forzar la posición relativa en los botones (solo mediante CSS, no JS)
  forceOverflowHidden: false, // Forzar overflow hidden en los botones (solo mediante CSS, no JS)
  disabledClasses: ['disabled', 'btn-disabled'] // Clases que indican que el botón está deshabilitado
}

// Map para seguir los botones procesados sin modificar el DOM
const processedButtons = new WeakMap()

// Función para crear el efecto de onda
const createRippleEffect = event => {
  if (typeof document === 'undefined') return

  const button = event.currentTarget

  // No aplicar efecto si el botón está deshabilitado
  if (button.disabled || CONFIG.disabledClasses.some(cls => button.classList.contains(cls))) {
    return
  }

  const buttonRect = button.getBoundingClientRect()

  // Calcular posición del clic relativa al botón
  const rippleX = event.clientX - buttonRect.left
  const rippleY = event.clientY - buttonRect.top

  // Crear elemento de efecto de onda
  const ripple = document.createElement('span')
  ripple.className = CONFIG.rippleClassName
  ripple.style.left = `${rippleX}px`
  ripple.style.top = `${rippleY}px`

  // Aplicar tamaño personalizado si está configurado
  if (CONFIG.rippleSize) {
    const halfSize = CONFIG.rippleSize / 2
    ripple.style.width = `${CONFIG.rippleSize}px`
    ripple.style.height = `${CONFIG.rippleSize}px`
    ripple.style.marginTop = `-${halfSize}px`
    ripple.style.marginLeft = `-${halfSize}px`
  }

  // Añadir al botón
  button.appendChild(ripple)

  // Eliminar después de la animación
  setTimeout(() => {
    if (ripple.parentNode === button) {
      button.removeChild(ripple)
    }
  }, CONFIG.animationDuration)
}

// Función para aplicar el efecto a un solo botón
const applyRippleToButton = button => {
  // Verificar si el botón ya tiene el evento (para evitar duplicados)
  if (processedButtons.has(button)) {
    return
  }

  // Marcar el botón como procesado en nuestro WeakMap interno
  // (no modifica el DOM, evitando problemas de hidratación)
  processedButtons.set(button, true)

  // Añadir evento de clic para el efecto de onda
  button.addEventListener('click', createRippleEffect)
}

// Función principal que inicializa el efecto de onda
const initializeRippleEffect = () => {
  // Si no estamos en un entorno con DOM, salir sin hacer nada
  if (typeof document === 'undefined') return

  // Retrasar ligeramente la ejecución para evitar conflictos con la hidratación de React
  setTimeout(() => {
    try {
      // Seleccionar todos los botones según el selector configurado
      const buttonList = document.querySelectorAll(CONFIG.buttonSelector)

      buttonList.forEach(button => {
        applyRippleToButton(button)
      })
    } catch (error) {
      console.warn('Error al aplicar efecto de onda a los botones:', error)
    }
  }, 0)
}

// Inicialización segura para el entorno del navegador
const initSafelyInBrowser = () => {
  if (typeof document === 'undefined') return

  // Esperar a que React termine la hidratación antes de aplicar nuestros cambios
  if (document.readyState !== 'complete') {
    window.addEventListener('load', () => {
      setTimeout(initializeRippleEffect, 100) // Dar tiempo para que termine la hidratación
    })
  } else {
    setTimeout(initializeRippleEffect, 100) // Pequeño retraso para evitar conflictos
  }

  // Configurar un observador de mutaciones para detectar nuevos botones
  if (CONFIG.enableMutationObserver) {
    try {
      const observer = new MutationObserver(mutationsList => {
        let shouldInit = false

        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(node => {
              if (node.nodeType === 1) {
                if (node.matches && node.matches(CONFIG.buttonSelector)) {
                  shouldInit = true
                } else if (node.querySelectorAll && node.querySelectorAll(CONFIG.buttonSelector).length > 0) {
                  shouldInit = true
                }
              }
            })
          }
        }

        if (shouldInit) {
          initializeRippleEffect()
        }
      })

      // Iniciar observación después de que la página esté completamente cargada
      window.addEventListener('load', () => {
        if (document.body) {
          observer.observe(document.body, { childList: true, subtree: true })
        }
      })
    } catch (error) {
      console.warn('MutationObserver no disponible o error al configurar:', error)
    }
  }
}

// Permitir configuración externa
const configureRippleEffect = newConfig => {
  if (typeof newConfig === 'object') {
    Object.assign(CONFIG, newConfig)
  }
}

// Exportar la función para aplicar el efecto a un botón específico
const applyRippleEffect = buttonElement => {
  if (buttonElement && buttonElement instanceof HTMLElement) {
    applyRippleToButton(buttonElement)
    return true
  }
  return false
}

// Ejecutar la inicialización
initSafelyInBrowser()

// Exportar la función principal para uso en módulos
initializeRippleEffect


// ===== CÓDIGO PRINCIPAL =====

main()
btn()

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
