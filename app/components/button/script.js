/**
 * @fileoverview Button Ripple Effect System - Sistema de efectos de onda para botones
 * @description Sistema optimizado de efectos visuales tipo Material Design para botones,
 * compatible con SSR, altamente performante y con soporte para modales dinámicos.
 * @version 2.0.0
 */

// ==========================================
// CONFIGURACIÓN
// ==========================================

/**
 * @typedef {Object} RippleConfig
 * @property {string} buttonSelector - Selector CSS para los botones
 * @property {string} rippleClassName - Clase CSS del efecto ripple
 * @property {number} animationDuration - Duración de la animación en ms
 * @property {number} rippleSize - Tamaño del ripple en px
 * @property {boolean} enableMutationObserver - Habilitar observador de mutaciones
 * @property {Array<string>} disabledClasses - Clases que indican botón deshabilitado
 * @property {number} throttleDelay - Delay del throttle para performance
 * @property {number} maxRipples - Máximo de ripples simultáneos por botón
 * @property {boolean} useRAF - Usar requestAnimationFrame
 */
const CONFIG = {
  buttonSelector: '[data-dmpa-element-id="btn"]',
  rippleClassName: 'btn-ripple-effect',
  animationDuration: 600,
  rippleSize: 180,
  enableMutationObserver: true,
  disabledClasses: ['disabled', 'btn-disabled'],
  throttleDelay: 16, // ~60fps
  maxRipples: 3,
  useRAF: true
}

// ==========================================
// CLASE PRINCIPAL: RippleEffectSystem
// ==========================================

/**
 * @class RippleEffectSystem
 * @description Sistema completo de gestión de efectos ripple con optimizaciones de performance
 */
class RippleEffectSystem {
  constructor() {
    /** @private {WeakMap<Element, boolean>} Botones ya procesados */
    this.processedButtons = new WeakMap()

    /** @private {WeakMap<Element, Array>} Ripples activos por botón */
    this.activeRipples = new WeakMap()

    /** @private {MutationObserver|null} Observador de mutaciones DOM */
    this.mutationObserver = null

    /** @private {Object} Pool de elementos ripple para reutilización */
    this.ripplePool = {
      pool: [],
      maxSize: 20
    }

    /** @private {boolean} Estado de inicialización del sistema */
    this.initialized = false
  }

  // ==========================================
  // MÉTODOS DE GESTIÓN DE RIPPLE POOL
  // ==========================================

  /**
   * Obtiene un elemento ripple del pool o crea uno nuevo
   * @returns {HTMLElement}
   * @private
   */
  _getRippleFromPool() {
    if (this.ripplePool.pool.length > 0) {
      return this.ripplePool.pool.pop()
    }

    const ripple = document.createElement('span')
    ripple.className = CONFIG.rippleClassName
    return ripple
  }

  /**
   * Devuelve un elemento ripple al pool para reutilización
   * @param {HTMLElement} ripple - Elemento a devolver
   * @private
   */
  _releaseRippleToPool(ripple) {
    if (this.ripplePool.pool.length < this.ripplePool.maxSize) {
      // Limpiar el elemento antes de devolverlo
      ripple.style.cssText = ''
      ripple.classList.value = CONFIG.rippleClassName
      this.ripplePool.pool.push(ripple)
    }
  }

  // ==========================================
  // MÉTODOS DE CONTROL DEL EFECTO RIPPLE
  // ==========================================

  /**
   * Crea el efecto ripple en un botón
   * @param {Event} event - Evento de click
   * @private
   */
  _createRippleEffect(event) {
    if (typeof document === 'undefined') return

    const button = event.currentTarget

    // Verificar si el botón está deshabilitado
    if (this._isButtonDisabled(button)) return

    // Verificar límite de ripples activos
    if (this._hasMaxRipples(button)) return

    // Crear y configurar el ripple
    this._addRippleToButton(button, event)
  }

  /**
   * Verifica si un botón está deshabilitado
   * @param {HTMLElement} button - Elemento botón
   * @returns {boolean}
   * @private
   */
  _isButtonDisabled(button) {
    return (
      button.disabled ||
      button.getAttribute('aria-disabled') === 'true' ||
      CONFIG.disabledClasses.some(cls => button.classList.contains(cls))
    )
  }

  /**
   * Verifica si un botón alcanzó el máximo de ripples
   * @param {HTMLElement} button - Elemento botón
   * @returns {boolean}
   * @private
   */
  _hasMaxRipples(button) {
    const currentRipples = this.activeRipples.get(button) || []
    return currentRipples.length >= CONFIG.maxRipples
  }

  /**
   * Añade un ripple al botón
   * @param {HTMLElement} button - Elemento botón
   * @param {Event} event - Evento de click
   * @private
   */
  _addRippleToButton(button, event) {
    // Calcular posición del ripple
    const buttonRect = button.getBoundingClientRect()
    const rippleX = event.clientX - buttonRect.left
    const rippleY = event.clientY - buttonRect.top

    // Obtener ripple del pool
    const ripple = this._getRippleFromPool()

    // Configurar posición y tamaño
    this._configureRipple(ripple, rippleX, rippleY)

    // Añadir al DOM
    button.appendChild(ripple)

    // Registrar ripple activo
    this._trackRipple(button, ripple)

    // Programar limpieza
    this._scheduleRippleCleanup(button, ripple)
  }

  /**
   * Configura la posición y tamaño del ripple
   * @param {HTMLElement} ripple - Elemento ripple
   * @param {number} x - Posición X
   * @param {number} y - Posición Y
   * @private
   */
  _configureRipple(ripple, x, y) {
    const halfSize = CONFIG.rippleSize / 2
    ripple.style.cssText = `
      left: ${x}px;
      top: ${y}px;
      width: ${CONFIG.rippleSize}px;
      height: ${CONFIG.rippleSize}px;
      margin-top: -${halfSize}px;
      margin-left: -${halfSize}px;
    `
  }

  /**
   * Registra un ripple como activo
   * @param {HTMLElement} button - Elemento botón
   * @param {HTMLElement} ripple - Elemento ripple
   * @private
   */
  _trackRipple(button, ripple) {
    const currentRipples = this.activeRipples.get(button) || []
    currentRipples.push(ripple)
    this.activeRipples.set(button, currentRipples)
  }

  /**
   * Programa la limpieza de un ripple
   * @param {HTMLElement} button - Elemento botón
   * @param {HTMLElement} ripple - Elemento ripple
   * @private
   */
  _scheduleRippleCleanup(button, ripple) {
    const cleanup = () => {
      this._cleanupRipple(button, ripple)
    }

    if (CONFIG.useRAF && typeof requestAnimationFrame !== 'undefined') {
      setTimeout(() => requestAnimationFrame(cleanup), CONFIG.animationDuration)
    } else {
      setTimeout(cleanup, CONFIG.animationDuration)
    }
  }

  /**
   * Limpia un ripple del DOM y del tracking
   * @param {HTMLElement} button - Elemento botón
   * @param {HTMLElement} ripple - Elemento ripple
   * @private
   */
  _cleanupRipple(button, ripple) {
    // Remover del DOM
    if (ripple.parentNode === button) {
      button.removeChild(ripple)
    }

    // Remover del tracking
    const ripples = this.activeRipples.get(button) || []
    const index = ripples.indexOf(ripple)
    if (index > -1) {
      ripples.splice(index, 1)
      if (ripples.length === 0) {
        this.activeRipples.delete(button)
      } else {
        this.activeRipples.set(button, ripples)
      }
    }

    // Devolver al pool
    this._releaseRippleToPool(ripple)
  }

  // ==========================================
  // MÉTODOS DE INICIALIZACIÓN
  // ==========================================

  /**
   * Aplica el efecto ripple a un botón individual
   * @param {HTMLElement} button - Elemento botón
   * @private
   */
  _applyRippleToButton(button) {
    // Verificar si ya está procesado
    if (this.processedButtons.has(button)) return

    // Marcar como procesado
    this.processedButtons.set(button, true)

    // Crear handler con throttle
    const rippleHandler = this._createThrottledHandler()

    // Añadir event listeners
    button.addEventListener('click', rippleHandler, { passive: true })

    // Soporte para touch en dispositivos móviles
    if ('ontouchstart' in window) {
      button.addEventListener('touchstart', rippleHandler, { passive: true })
    }
  }

  /**
   * Crea un handler con throttle para el efecto ripple
   * @returns {Function}
   * @private
   */
  _createThrottledHandler() {
    if (CONFIG.throttleDelay > 0) {
      return this._throttle(event => this._createRippleEffect(event), CONFIG.throttleDelay)
    }
    return event => this._createRippleEffect(event)
  }

  /**
   * Función throttle para optimizar performance
   * @param {Function} func - Función a throttlear
   * @param {number} delay - Delay en ms
   * @returns {Function}
   * @private
   */
  _throttle(func, delay) {
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

  /**
   * Inicializa el efecto ripple en todos los botones
   * @public
   */
  initializeRippleEffect() {
    if (typeof document === 'undefined') return

    try {
      const buttonList = document.querySelectorAll(CONFIG.buttonSelector)

      // Procesar botones en lotes para mejor performance
      this._processBatch(buttonList)
    } catch (error) {
      console.warn('[ButtonRipple] Error al aplicar efecto:', error)
    }
  }

  /**
   * Procesa botones en lotes para optimizar performance
   * @param {NodeList} buttons - Lista de botones
   * @param {number} batchSize - Tamaño del lote
   * @private
   */
  _processBatch(buttons, batchSize = 50) {
    for (let i = 0; i < buttons.length; i += batchSize) {
      const batch = Array.from(buttons).slice(i, i + batchSize)

      if (typeof requestIdleCallback !== 'undefined') {
        requestIdleCallback(() => {
          batch.forEach(button => this._applyRippleToButton(button))
        })
      } else {
        setTimeout(() => {
          batch.forEach(button => this._applyRippleToButton(button))
        }, 0)
      }
    }
  }

  // ==========================================
  // CONFIGURACIÓN DE MUTATION OBSERVER
  // ==========================================

  /**
   * Configura el MutationObserver para detectar botones dinámicos
   * @private
   */
  _setupMutationObserver() {
    if (!CONFIG.enableMutationObserver || typeof MutationObserver === 'undefined') {
      return
    }

    this.mutationObserver = new MutationObserver(
      this._throttle(mutationsList => {
        let shouldInit = false

        for (const mutation of mutationsList) {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
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
          this.initializeRippleEffect()
        }
      }, CONFIG.throttleDelay)
    )

    const startObserver = () => {
      if (document.body) {
        this.mutationObserver.observe(document.body, {
          childList: true,
          subtree: true,
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
        this.mutationObserver?.disconnect()
      },
      { once: true }
    )
  }

  // ==========================================
  // INICIALIZACIÓN PRINCIPAL
  // ==========================================

  /**
   * Inicializa el sistema completo de efectos ripple
   * @public
   */
  init() {
    if (this.initialized) return
    if (typeof document === 'undefined') return

    const initialize = () => {
      // Usar requestIdleCallback para inicialización no bloqueante
      if (typeof requestIdleCallback !== 'undefined') {
        requestIdleCallback(() => this.initializeRippleEffect(), { timeout: 1000 })
      } else {
        setTimeout(() => this.initializeRippleEffect(), 100)
      }

      // Configurar MutationObserver
      this._setupMutationObserver()

      this.initialized = true
    }

    // Verificar estado del DOM
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      initialize()
    } else {
      document.addEventListener('DOMContentLoaded', initialize, { once: true })
    }
  }

  // ==========================================
  // API PÚBLICA
  // ==========================================

  /**
   * Aplica el efecto ripple a un botón específico
   * @param {HTMLElement} buttonElement - Elemento botón
   * @returns {boolean} true si se aplicó correctamente
   * @public
   */
  applyToButton(buttonElement) {
    if (buttonElement?.nodeType === Node.ELEMENT_NODE) {
      this._applyRippleToButton(buttonElement)
      return true
    }
    return false
  }

  /**
   * Configura el sistema de ripple
   * @param {Object} newConfig - Nueva configuración
   * @public
   */
  configure(newConfig) {
    if (typeof newConfig === 'object' && newConfig !== null) {
      Object.assign(CONFIG, newConfig)
    }
  }

  /**
   * Limpia recursos del sistema (útil para SPAs)
   * @public
   */
  cleanup() {
    this.activeRipples.clear()
    this.processedButtons.clear()
    this.ripplePool.pool.length = 0
    this.mutationObserver?.disconnect()
    this.initialized = false
  }
}

// ==========================================
// INSTANCIA SINGLETON
// ==========================================

/** @type {RippleEffectSystem} Instancia singleton del sistema de ripple */
const rippleSystemInstance = new RippleEffectSystem()

// ==========================================
// EXPORTS
// ==========================================

/**
 * Función de inicialización principal del sistema de ripple
 * @returns {void}
 */
const initializeButtonRippleSystem = () => {
  rippleSystemInstance.init()
}

/**
 * Aplica el efecto ripple a un botón específico
 * @param {HTMLElement} buttonElement - Elemento botón
 * @returns {boolean}
 */
export const applyRippleEffect = buttonElement => rippleSystemInstance.applyToButton(buttonElement)

/**
 * Configura el sistema de ripple
 * @param {Object} newConfig - Nueva configuración
 */
export const configureRippleEffect = newConfig => rippleSystemInstance.configure(newConfig)

/**
 * Limpia recursos del sistema
 */
export const cleanupRippleEffect = () => rippleSystemInstance.cleanup()

/**
 * Export default de la función de inicialización principal
 */
export default initializeButtonRippleSystem
