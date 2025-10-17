// ===========================================
// MODAL SYSTEM MODULE
// ===========================================

/**
 * Sistema de modales con manejo de accesibilidad y eventos
 * Gestiona la apertura, cierre y navegación por modales
 */

class ModalSystem {
  constructor() {
    this.eventListeners = new Set()
    this.logger = Logger
    this.activeModal = null
  }

  /**
   * Inicializar sistema de modales
   */
  init() {
    const clickKey = EventManager.add(document, 'click', this.handleModalClick.bind(this))
    const keydownKey = EventManager.add(document, 'keydown', this.handleModalKeydown.bind(this))

    this.eventListeners.add(clickKey)
    this.eventListeners.add(keydownKey)
  }

  /**
   * Manejar clicks en elementos relacionados con modales
   */
  handleModalClick(e) {
    // Buscar trigger de modal
    const modalTrigger = e.target.closest('[data-modal-target]')
    if (modalTrigger) {
      e.preventDefault()
      const modalId = modalTrigger.getAttribute('data-modal-target')
      this.openModal(modalId)
      return
    }

    // Buscar botón de cierre
    const closeButton = e.target.closest('.program-detail-modal__close')
    if (closeButton) {
      e.preventDefault()
      const modal = closeButton.closest('.program-detail-modal')
      if (modal) this.closeModal(modal.id)
      return
    }

    // Click en el overlay del modal para cerrarlo
    if (e.target.classList.contains('program-detail-modal') && e.target.classList.contains('program-detail-modal--active')) {
      this.closeModal(e.target.id)
    }
  }

  /**
   * Manejar eventos de teclado
   */
  handleModalKeydown(e) {
    // Cerrar modal con Escape
    if (e.key === 'Escape') {
      const openModal = document.querySelector('.program-detail-modal--active')
      if (openModal) {
        this.closeModal(openModal.id)
      }
    }

    // Manejo de navegación con Tab para mantener foco dentro del modal
    if (e.key === 'Tab' && this.activeModal) {
      this.handleTabNavigation(e)
    }
  }

  /**
   * Manejar navegación con Tab dentro del modal
   */
  handleTabNavigation(e) {
    const modal = this.activeModal
    if (!modal) return

    const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    const focusableArray = Array.from(focusableElements)

    if (focusableArray.length === 0) return

    const firstElement = focusableArray[0]
    const lastElement = focusableArray[focusableArray.length - 1]

    if (e.shiftKey) {
      // Shift + Tab - navegar hacia atrás
      if (document.activeElement === firstElement) {
        e.preventDefault()
        lastElement.focus()
      }
    } else {
      // Tab - navegar hacia adelante
      if (document.activeElement === lastElement) {
        e.preventDefault()
        firstElement.focus()
      }
    }
  }

  /**
   * Abrir modal por ID
   */
  openModal(modalId) {
    const modal = document.getElementById(modalId)
    if (!modal) {
      this.logger.warning(`[ModalSystem] Modal no encontrado: ${modalId}`)
      return
    }

    // Cerrar modal previo si existe
    if (this.activeModal) {
      this.closeModal(this.activeModal.id)
    }

    // Abrir nuevo modal
    modal.classList.add('program-detail-modal--active')
    document.body.style.overflow = 'hidden'
    this.activeModal = modal

    // Enfocar primer elemento focuseable o botón de cierre
    this.focusModal(modal)

    // Dispatch evento personalizado
    const openEvent = new CustomEvent('modal:opened', {
      detail: { modalId, modal }
    })
    document.dispatchEvent(openEvent)
  }

  /**
   * Cerrar modal por ID
   */
  closeModal(modalId) {
    const modal = document.getElementById(modalId)
    if (!modal) {
      this.logger.warning(`[ModalSystem] Modal no encontrado: ${modalId}`)
      return
    }

    modal.classList.remove('program-detail-modal--active')
    document.body.style.overflow = ''

    // Restaurar foco al trigger si existe
    this.restoreFocus(modalId)

    this.activeModal = null

    // Dispatch evento personalizado
    const closeEvent = new CustomEvent('modal:closed', {
      detail: { modalId, modal }
    })
    document.dispatchEvent(closeEvent)
  }

  /**
   * Enfocar elementos dentro del modal
   */
  focusModal(modal) {
    // Intentar enfocar el botón de cierre primero
    const closeButton = modal.querySelector('.program-detail-modal__close')
    if (closeButton) {
      closeButton.focus()
      return
    }

    // Si no hay botón de cierre, enfocar primer elemento focuseable
    const focusableElement = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    if (focusableElement) {
      focusableElement.focus()
    }
  }

  /**
   * Restaurar foco al elemento que disparó el modal
   */
  restoreFocus(modalId) {
    const trigger = document.querySelector(`[data-modal-target="${modalId}"]`)
    if (trigger && typeof trigger.focus === 'function') {
      // Delay para evitar conflictos con animaciones
      setTimeout(() => {
        trigger.focus()
      }, 100)
    }
  }

  /**
   * Cerrar todos los modales abiertos
   */
  closeAllModals() {
    const openModals = document.querySelectorAll('.program-detail-modal--active')
    openModals.forEach(modal => {
      this.closeModal(modal.id)
    })
  }

  /**
   * Verificar si hay algún modal abierto
   */
  hasOpenModal() {
    return this.activeModal !== null
  }

  /**
   * Obtener modal actualmente activo
   */
  getActiveModal() {
    return this.activeModal
  }

  /**
   * Crear modal programáticamente
   */
  createModal(id, content, options = {}) {
    const existingModal = document.getElementById(id)
    if (existingModal) {
      this.logger.warning(`[ModalSystem] Modal con ID ${id} ya existe`)
      return existingModal
    }

    const modal = document.createElement('div')
    modal.id = id
    modal.className = 'program-detail-modal'
    modal.setAttribute('role', 'dialog')
    modal.setAttribute('aria-modal', 'true')

    if (options.ariaLabel) {
      modal.setAttribute('aria-label', options.ariaLabel)
    }

    modal.innerHTML = `
      <div class="program-detail-modal__content">
        <button class="program-detail-modal__close" aria-label="Cerrar modal">
          <span>&times;</span>
        </button>
        <div class="program-detail-modal__body">
          ${content}
        </div>
      </div>
    `

    document.body.appendChild(modal)

    return modal
  }

  /**
   * Eliminar modal del DOM
   */
  destroyModal(modalId) {
    const modal = document.getElementById(modalId)
    if (!modal) return

    // Cerrar si está activo
    if (modal.classList.contains('program-detail-modal--active')) {
      this.closeModal(modalId)
    }

    modal.remove()
  }

  /**
   * Limpiar sistema de modales
   */
  destroy() {
    // Cerrar todos los modales
    this.closeAllModals()

    // Restaurar overflow del body
    document.body.style.overflow = ''

    // Limpiar event listeners
    this.eventListeners.forEach(key => EventManager.remove(key))
    this.eventListeners.clear()

    this.activeModal = null
  }
}

export { ModalSystem }
