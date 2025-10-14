/**
 * @fileoverview Sistema de modales reutilizables compatible con Liferay
 * @description Gestiona la apertura, cierre y comportamiento de modales siguiendo
 * las mejores prácticas de accesibilidad (ARIA) y UX
 * @version 2.0.0
 */

// ==========================================
// CONFIGURACIÓN
// ==========================================

/**
 * @typedef {Object} ModalConfig
 * @property {string} overlaySelector - Selector CSS para los overlays de modales
 * @property {string} triggerSelector - Selector CSS para los triggers de modales
 * @property {number} animationDuration - Duración de las animaciones en ms
 * @property {boolean} enableMutationObserver - Habilitar observador de mutaciones
 */
const CONFIG = {
  overlaySelector: '.puj-modal-overlay',
  triggerSelector: '[data-puj-modal-trigger]',
  animationDuration: 300,
  enableMutationObserver: true
}

// ==========================================
// CLASE PRINCIPAL: ModalSystem
// ==========================================

/**
 * @class ModalSystem
 * @description Sistema completo de gestión de modales con soporte para múltiples instancias,
 * accesibilidad y eventos personalizados
 */
class ModalSystem {
  constructor() {
    /** @private {WeakMap<Element, boolean>} Modales ya procesados */
    this.processedModals = new WeakMap()

    /** @private {Set<Element>} Modales actualmente abiertos */
    this.activeModals = new Set()

    /** @private {MutationObserver|null} Observador de mutaciones DOM */
    this.mutationObserver = null

    /** @private {boolean} Estado de inicialización del sistema */
    this.initialized = false
  }

  // ==========================================
  // MÉTODOS DE CONTROL DE MODALES
  // ==========================================

  /**
   * Abre un modal y gestiona el estado de la aplicación
   * @param {HTMLElement} modalOverlay - Elemento del modal a abrir
   * @private
   */
  _openModal(modalOverlay) {
    if (!modalOverlay) return

    // Prevenir scroll del body
    document.body.style.overflow = 'hidden'

    // Mostrar modal
    modalOverlay.style.display = 'flex'
    modalOverlay.offsetHeight // Force reflow para animación
    modalOverlay.classList.add('active')

    // Registrar modal activo
    this.activeModals.add(modalOverlay)

    // Disparar evento personalizado si está configurado
    if (modalOverlay.dataset.modalOnOpen === 'callback') {
      this._dispatchEvent('modal:opened', { modalId: modalOverlay.id })
    }

    // Gestionar focus para accesibilidad
    this._setFocusToModal(modalOverlay)
  }

  /**
   * Cierra un modal y restaura el estado de la aplicación
   * @param {HTMLElement} modalOverlay - Elemento del modal a cerrar
   * @private
   */
  _closeModal(modalOverlay) {
    if (!modalOverlay) return

    // Remover estado activo
    modalOverlay.classList.remove('active')
    this.activeModals.delete(modalOverlay)

    // Ocultar modal después de la animación
    setTimeout(() => {
      modalOverlay.style.display = 'none'

      // Restaurar scroll si no hay más modales abiertos
      if (this.activeModals.size === 0) {
        document.body.style.overflow = ''
      }
    }, CONFIG.animationDuration)

    // Disparar evento personalizado si está configurado
    if (modalOverlay.dataset.modalOnClose === 'callback') {
      this._dispatchEvent('modal:closed', { modalId: modalOverlay.id })
    }
  }

  /**
   * Cierra todos los modales abiertos
   * @private
   */
  _closeAllModals() {
    this.activeModals.forEach(modal => this._closeModal(modal))
  }

  // ==========================================
  // MÉTODOS DE INICIALIZACIÓN
  // ==========================================

  /**
   * Inicializa un modal individual configurando eventos y comportamiento
   * @param {HTMLElement} modalOverlay - Elemento del modal a inicializar
   * @private
   */
  _initializeModal(modalOverlay) {
    // Evitar re-inicialización
    if (this.processedModals.has(modalOverlay)) return
    this.processedModals.set(modalOverlay, true)

    const modalId = modalOverlay.id || modalOverlay.dataset.modalId

    // Mover modal al body para evitar problemas de contexto de apilamiento
    this._moveModalToBody(modalOverlay)

    // Configurar auto-apertura si está habilitada
    this._setupAutoOpen(modalOverlay)

    // Configurar eventos de cierre
    this._setupCloseEvents(modalOverlay, modalId)

    // Configurar accesibilidad
    this._setupAccessibility(modalOverlay)
  }

  /**
   * Mueve el modal al body para evitar problemas de z-index
   * @param {HTMLElement} modalOverlay - Elemento del modal
   * @private
   */
  _moveModalToBody(modalOverlay) {
    if (modalOverlay.parentElement !== document.body) {
      document.body.appendChild(modalOverlay)
    }
  }

  /**
   * Configura la apertura automática del modal
   * @param {HTMLElement} modalOverlay - Elemento del modal
   * @private
   */
  _setupAutoOpen(modalOverlay) {
    if (modalOverlay.dataset.modalAutoOpen === 'true') {
      setTimeout(() => this._openModal(modalOverlay), 100)
    }
  }

  /**
   * Configura los eventos de cierre del modal
   * @param {HTMLElement} modalOverlay - Elemento del modal
   * @param {string} modalId - ID del modal
   * @private
   */
  _setupCloseEvents(modalOverlay, modalId) {
    // Cerrar al hacer click en el overlay
    if (modalOverlay.dataset.modalCloseOnOverlay !== 'false') {
      modalOverlay.addEventListener('click', e => {
        if (e.target === modalOverlay) {
          this._closeModal(modalOverlay)
        }
      })
    }

    // Configurar botones de cerrar
    const closeButtons = modalOverlay.querySelectorAll(`[data-puj-modal-close="${modalId}"], [data-puj-modal-close]`)
    closeButtons.forEach(button => {
      button.addEventListener('click', () => this._closeModal(modalOverlay))
    })

    // Cerrar con tecla Escape
    if (modalOverlay.dataset.modalCloseOnEsc !== 'false') {
      const escapeHandler = e => {
        if (e.key === 'Escape' && this.activeModals.has(modalOverlay)) {
          this._closeModal(modalOverlay)
        }
      }
      document.addEventListener('keydown', escapeHandler)
      modalOverlay._escapeHandler = escapeHandler
    }
  }

  /**
   * Configura características de accesibilidad del modal
   * @param {HTMLElement} modalOverlay - Elemento del modal
   * @private
   */
  _setupAccessibility(modalOverlay) {
    // Asegurar atributos ARIA
    if (!modalOverlay.getAttribute('role')) {
      modalOverlay.setAttribute('role', 'dialog')
    }
    if (!modalOverlay.getAttribute('aria-modal')) {
      modalOverlay.setAttribute('aria-modal', 'true')
    }
  }

  /**
   * Inicializa los triggers externos de modales
   * @private
   */
  _initializeTriggers() {
    if (typeof document === 'undefined') return

    const triggers = document.querySelectorAll(CONFIG.triggerSelector)
    triggers.forEach(trigger => {
      // Evitar re-inicialización de triggers
      if (trigger._pujModalTriggerAttached) return

      const targetModalId = trigger.dataset.pujModalTrigger
      const targetModal = document.getElementById(targetModalId)

      if (targetModal) {
        trigger.addEventListener('click', () => this._openModal(targetModal))
        trigger._pujModalTriggerAttached = true
      }
    })
  }

  /**
   * Inicializa todos los modales encontrados en el DOM
   * @public
   */
  initializeAllModals() {
    if (typeof document === 'undefined') return

    try {
      // Inicializar modales existentes
      const modals = document.querySelectorAll(CONFIG.overlaySelector)
      modals.forEach(modal => this._initializeModal(modal))

      // Inicializar triggers
      this._initializeTriggers()
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[ModalSystem] Error durante inicialización:', error)
      }
    }
  }

  // ==========================================
  // MÉTODOS DE UTILIDAD
  // ==========================================

  /**
   * Establece el foco en el primer elemento focusable del modal
   * @param {HTMLElement} modalOverlay - Elemento del modal
   * @private
   */
  _setFocusToModal(modalOverlay) {
    setTimeout(() => {
      const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      const focusableElement = modalOverlay.querySelector(focusableSelector)
      focusableElement?.focus()
    }, CONFIG.animationDuration)
  }

  /**
   * Dispara un evento personalizado
   * @param {string} eventName - Nombre del evento
   * @param {Object} detail - Detalles del evento
   * @private
   */
  _dispatchEvent(eventName, detail) {
    window.dispatchEvent(new CustomEvent(eventName, { detail }))
  }

  /**
   * Verifica si el DOM está listo
   * @returns {boolean}
   * @private
   */
  _isDOMReady() {
    return document.readyState === 'complete' || document.readyState === 'interactive'
  }

  // ==========================================
  // CONFIGURACIÓN DE MUTATION OBSERVER
  // ==========================================

  /**
   * Configura el MutationObserver para detectar modales dinámicos
   * @private
   */
  _setupMutationObserver() {
    if (!CONFIG.enableMutationObserver || typeof MutationObserver === 'undefined') {
      return
    }

    this.mutationObserver = new MutationObserver(mutations => {
      const hasNewModal = mutations.some(({ type, addedNodes }) => {
        if (type !== 'childList') return false

        return Array.from(addedNodes).some(node => {
          if (node.nodeType !== Node.ELEMENT_NODE) return false

          return (
            node.matches?.(CONFIG.overlaySelector) ||
            node.querySelector?.(CONFIG.overlaySelector) ||
            node.matches?.(CONFIG.triggerSelector) ||
            node.querySelector?.(CONFIG.triggerSelector)
          )
        })
      })

      if (hasNewModal) {
        this.initializeAllModals()
      }
    })

    const startObserver = () => {
      if (document.body) {
        this.mutationObserver.observe(document.body, {
          childList: true,
          subtree: true
        })
      }
    }

    if (document.body) {
      startObserver()
    } else {
      document.addEventListener('DOMContentLoaded', startObserver, { once: true })
    }

    // Limpiar al descargar la página
    window.addEventListener(
      'beforeunload',
      () => {
        this.mutationObserver?.disconnect()
      },
      { once: true }
    )
  }

  /**
   * Configura los event listeners globales del sistema
   * @private
   */
  _setupGlobalEvents() {
    // Event listener para abrir modales programáticamente
    window.addEventListener('modal:open', ({ detail }) => {
      const modal = document.getElementById(detail?.modalId)
      if (modal) {
        this._openModal(modal)
      }
    })

    // Event listener para cerrar modales programáticamente
    window.addEventListener('modal:close', ({ detail }) => {
      if (detail?.modalId) {
        const modal = document.getElementById(detail.modalId)
        if (modal) {
          this._closeModal(modal)
        }
      } else {
        this._closeAllModals()
      }
    })
  }

  // ==========================================
  // INICIALIZACIÓN PRINCIPAL
  // ==========================================

  /**
   * Inicializa el sistema completo de modales
   * @public
   */
  init() {
    if (this.initialized) return
    if (typeof document === 'undefined') return

    const initialize = () => {
      // Usar requestIdleCallback para optimizar rendimiento
      if (typeof requestIdleCallback !== 'undefined') {
        requestIdleCallback(() => this.initializeAllModals(), { timeout: 1000 })
      } else {
        setTimeout(() => this.initializeAllModals(), 100)
      }

      // Configurar observers y eventos globales
      this._setupMutationObserver()
      this._setupGlobalEvents()

      this.initialized = true
    }

    // Inicializar cuando el DOM esté listo
    if (this._isDOMReady()) {
      initialize()
    } else {
      document.addEventListener('DOMContentLoaded', initialize, { once: true })
    }
  }

  // ==========================================
  // API PÚBLICA
  // ==========================================

  /**
   * Abre un modal por su ID
   * @param {string} modalId - ID del modal a abrir
   * @returns {boolean} true si el modal se abrió correctamente
   * @public
   */
  openModalById(modalId) {
    const modal = document.getElementById(modalId)
    if (modal) {
      this._openModal(modal)
      return true
    }
    return false
  }

  /**
   * Cierra un modal por su ID
   * @param {string} modalId - ID del modal a cerrar
   * @returns {boolean} true si el modal se cerró correctamente
   * @public
   */
  closeModalById(modalId) {
    const modal = document.getElementById(modalId)
    if (modal) {
      this._closeModal(modal)
      return true
    }
    return false
  }

  /**
   * Cierra todos los modales abiertos
   * @public
   */
  closeAll() {
    this._closeAllModals()
  }

  /**
   * Destruye la instancia del sistema de modales
   * @public
   */
  destroy() {
    this._closeAllModals()
    this.mutationObserver?.disconnect()
    this.processedModals = new WeakMap()
    this.activeModals = new Set()
    this.initialized = false
  }
}

// ==========================================
// INSTANCIA SINGLETON
// ==========================================

/** @type {ModalSystem} Instancia singleton del sistema de modales */
const modalSystemInstance = new ModalSystem()

// ==========================================
// EXPORTS
// ==========================================

/**
 * Abre un modal por su ID
 * @param {string} modalId - ID del modal
 * @returns {boolean}
 */
export const openModalById = modalId => modalSystemInstance.openModalById(modalId)

/**
 * Cierra un modal por su ID
 * @param {string} modalId - ID del modal
 * @returns {boolean}
 */
export const closeModalById = modalId => modalSystemInstance.closeModalById(modalId)

/**
 * Cierra todos los modales
 */
export const closeAll = () => modalSystemInstance.closeAll()

/**
 * Función de inicialización principal del sistema de modales
 * @returns {void}
 */
const initializeModalSystem = () => {
  modalSystemInstance.init()
}

/**
 * Función de inicialización manual de modales (sin observers ni eventos globales)
 */
export const initializeAllModals = () => modalSystemInstance.initializeAllModals()

/**
 * Export default de la función de inicialización principal
 */
export default initializeModalSystem
