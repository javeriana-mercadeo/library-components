/**
 * script.js - Efecto de onda optimizado para botones
 * Versión optimizada para mejor rendimiento y compatibilidad SSR
 */

// Configuración personalizable con mejores defaults
const CONFIG = {
  buttonSelector: '[data-dmpa-element-id="btn"]',
  rippleClassName: 'btn-ripple-effect',
  animationDuration: 600,
  rippleSize: 180,
  enableMutationObserver: true,
  disabledClasses: ['disabled', 'btn-disabled'],
  // Nuevas opciones de optimización
  throttleDelay: 16, // ~60fps para mejor rendimiento
  maxRipples: 3, // Máximo de ripples simultáneos por botón
  useRAF: true // Usar requestAnimationFrame para animaciones
}

// Cache optimizado para botones procesados
const processedButtons = new WeakMap()
const activeRipples = new WeakMap() // Tracking de ripples activos

// Pool de elementos ripple para reutilización (mejor performance)
const ripplePool = {
  pool: [],
  maxSize: 20,

  get() {
    if (this.pool.length > 0) {
      return this.pool.pop()
    }

    const ripple = document.createElement('span')
    ripple.className = CONFIG.rippleClassName
    return ripple
  },

  release(ripple) {
    if (this.pool.length < this.maxSize) {
      // Limpiar el elemento antes de devolverlo al pool
      ripple.style.cssText = ''
      ripple.classList.value = CONFIG.rippleClassName
      this.pool.push(ripple)
    }
  }
}

// Función optimizada para crear el efecto de onda
const createRippleEffect = event => {
  if (typeof document === 'undefined') return

  const button = event.currentTarget

  // Verificaciones de estado optimizadas
  if (
    button.disabled ||
    button.getAttribute('aria-disabled') === 'true' ||
    CONFIG.disabledClasses.some(cls => button.classList.contains(cls))
  ) {
    return
  }

  // Control de ripples máximos por botón
  const currentRipples = activeRipples.get(button) || []
  if (currentRipples.length >= CONFIG.maxRipples) {
    return
  }

  // Usar getBoundingClientRect con caching para mejor performance
  const buttonRect = button.getBoundingClientRect()

  // Calcular posición del clic relativa al botón
  const rippleX = event.clientX - buttonRect.left
  const rippleY = event.clientY - buttonRect.top

  // Obtener ripple del pool
  const ripple = ripplePool.get()

  // Configurar posición y tamaño
  const halfSize = CONFIG.rippleSize / 2
  ripple.style.cssText = `
    left: ${rippleX}px;
    top: ${rippleY}px;
    width: ${CONFIG.rippleSize}px;
    height: ${CONFIG.rippleSize}px;
    margin-top: -${halfSize}px;
    margin-left: -${halfSize}px;
  `

  // Añadir al botón
  button.appendChild(ripple)

  // Tracking de ripples activos
  currentRipples.push(ripple)
  activeRipples.set(button, currentRipples)

  // Función de limpieza optimizada
  const cleanup = () => {
    if (ripple.parentNode === button) {
      button.removeChild(ripple)
    }

    // Remover del tracking
    const ripples = activeRipples.get(button) || []
    const index = ripples.indexOf(ripple)
    if (index > -1) {
      ripples.splice(index, 1)
      if (ripples.length === 0) {
        activeRipples.delete(button)
      } else {
        activeRipples.set(button, ripples)
      }
    }

    // Devolver al pool
    ripplePool.release(ripple)
  }

  // Usar requestAnimationFrame si está disponible
  if (CONFIG.useRAF && typeof requestAnimationFrame !== 'undefined') {
    setTimeout(() => {
      requestAnimationFrame(cleanup)
    }, CONFIG.animationDuration)
  } else {
    setTimeout(cleanup, CONFIG.animationDuration)
  }
}

// Función throttled para mejor rendimiento en eventos masivos
const throttle = (func, delay) => {
  let timeoutId
  let lastExecTime = 0

  return function (...args) {
    const currentTime = Date.now()

    if (currentTime - lastExecTime > delay) {
      func.apply(this, args)
      lastExecTime = currentTime
    } else {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(
        () => {
          func.apply(this, args)
          lastExecTime = Date.now()
        },
        delay - (currentTime - lastExecTime)
      )
    }
  }
}

// Función optimizada para aplicar el efecto a un botón
const applyRippleToButton = button => {
  // Verificar si ya está procesado
  if (processedButtons.has(button)) {
    return
  }

  // Marcar como procesado
  processedButtons.set(button, true)

  // Crear versión throttled del efecto si es necesario
  const rippleHandler = CONFIG.throttleDelay > 0 ? throttle(createRippleEffect, CONFIG.throttleDelay) : createRippleEffect

  // Añadir event listener optimizado
  button.addEventListener('click', rippleHandler, { passive: true })

  // Opcional: Añadir soporte para touch en dispositivos móviles
  if ('ontouchstart' in window) {
    button.addEventListener('touchstart', rippleHandler, { passive: true })
  }
}

// Función principal optimizada con IntersectionObserver
const initializeRippleEffect = () => {
  if (typeof document === 'undefined') return

  // Usar DocumentFragment para mejor performance si hay muchos botones
  const fragment = document.createDocumentFragment()

  try {
    const buttonList = document.querySelectorAll(CONFIG.buttonSelector)

    // Batch processing para mejor performance
    const processBatch = (buttons, batchSize = 50) => {
      for (let i = 0; i < buttons.length; i += batchSize) {
        const batch = Array.from(buttons).slice(i, i + batchSize)

        // Usar requestIdleCallback si está disponible
        if (typeof requestIdleCallback !== 'undefined') {
          requestIdleCallback(() => {
            batch.forEach(applyRippleToButton)
          })
        } else {
          setTimeout(() => {
            batch.forEach(applyRippleToButton)
          }, 0)
        }
      }
    }

    processBatch(buttonList)
  } catch (error) {
    console.warn('Error al aplicar efecto de onda a los botones:', error)
  }
}

// Inicialización mejorada con mejor detección de estado
const initSafelyInBrowser = () => {
  if (typeof document === 'undefined') return

  const initialize = () => {
    // Usar requestIdleCallback para inicialización no bloqueante
    if (typeof requestIdleCallback !== 'undefined') {
      requestIdleCallback(initializeRippleEffect, { timeout: 1000 })
    } else {
      setTimeout(initializeRippleEffect, 100)
    }
  }

  // Detección mejorada del estado de carga
  if (document.readyState === 'complete') {
    initialize()
  } else if (document.readyState === 'interactive') {
    // DOM ya está listo, pero recursos pueden estar cargando
    initialize()
  } else {
    // Esperamos a DOMContentLoaded
    document.addEventListener('DOMContentLoaded', initialize, { once: true })
  }

  // MutationObserver optimizado
  if (CONFIG.enableMutationObserver && typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(
      throttle(mutationsList => {
        let shouldInit = false

        for (const mutation of mutationsList) {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            // Verificar solo nodos que realmente pueden contener botones
            for (const node of mutation.addedNodes) {
              if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.matches?.(CONFIG.buttonSelector) || node.querySelector?.(CONFIG.buttonSelector)) {
                  shouldInit = true
                  break
                }
              }
            }
            if (shouldInit) break
          }
        }

        if (shouldInit) {
          initializeRippleEffect()
        }
      }, CONFIG.throttleDelay)
    )

    // Iniciar observación cuando el DOM esté listo
    const startObserver = () => {
      if (document.body) {
        observer.observe(document.body, {
          childList: true,
          subtree: true,
          // Optimización: solo observar cambios relevantes
          attributes: false,
          characterData: false
        })
      }
    }

    if (document.body) {
      startObserver()
    } else {
      document.addEventListener('DOMContentLoaded', startObserver, { once: true })
    }

    // Cleanup al descargar la página
    window.addEventListener(
      'beforeunload',
      () => {
        observer.disconnect()
      },
      { once: true }
    )
  }
}

// API pública mejorada
export const configureRippleEffect = newConfig => {
  if (typeof newConfig === 'object' && newConfig !== null) {
    Object.assign(CONFIG, newConfig)
  }
}

export const applyRippleEffect = buttonElement => {
  if (buttonElement?.nodeType === Node.ELEMENT_NODE) {
    applyRippleToButton(buttonElement)
    return true
  }
  return false
}

// Función para limpiar recursos (útil para SPA)
export const cleanupRippleEffect = () => {
  activeRipples.clear()
  processedButtons.clear()
  ripplePool.pool.length = 0
}

// Ejecutar inicialización
initSafelyInBrowser()

// Export por defecto
export default initializeRippleEffect
