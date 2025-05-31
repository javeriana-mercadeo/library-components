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
export const configureRippleEffect = newConfig => {
  if (typeof newConfig === 'object') {
    Object.assign(CONFIG, newConfig)
  }
}

// Exportar la función para aplicar el efecto a un botón específico
export const applyRippleEffect = buttonElement => {
  if (buttonElement && buttonElement instanceof HTMLElement) {
    applyRippleToButton(buttonElement)
    return true
  }
  return false
}

// Ejecutar la inicialización
initSafelyInBrowser()

// Exportar la función principal para uso en módulos
export default initializeRippleEffect
