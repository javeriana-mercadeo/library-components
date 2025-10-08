/**
 * Maestria System - JavaScript Vanilla
 * Sistema de gestión de modales para horarios
 */
;(function () {
  'use strict'

  const CONFIG = {
    SELECTORS: {
      root: '.mastership-banner',
      modalTrigger: '[data-modal-target]',
      modalClose: '.program-detail-modal__close',
      modal: '.program-detail-modal'
    },
    CLASSES: {
      modalActive: 'program-detail-modal--active'
    }
  }

  let systemState = {
    initialized: false,
    activeModal: null
  }

  /* =====================
       SISTEMA DE MODALES
    ===================== */

  const ModalSystem = {
    init() {
      this.setupEventListeners()
    },

    setupEventListeners() {
      // Abrir modales mediante data-modal-target
      document.addEventListener('click', e => {
        const trigger = e.target.closest(CONFIG.SELECTORS.modalTrigger)
        if (trigger) {
          e.preventDefault()
          const modalId = trigger.getAttribute('data-modal-target')
          this.openModal(modalId)
        }

        // Cerrar modales con botón X
        const closeBtn = e.target.closest(CONFIG.SELECTORS.modalClose)
        if (closeBtn) {
          e.preventDefault()
          this.closeModal()
        }

        // Cerrar con click en backdrop
        if (e.target.classList.contains('program-detail-modal') && e.target.classList.contains(CONFIG.CLASSES.modalActive)) {
          this.closeModal()
        }
      })

      // Cerrar con tecla Escape
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && systemState.activeModal) {
          this.closeModal()
        }
      })
    },

    openModal(modalId) {
      const modal = document.getElementById(modalId)
      if (modal) {
        modal.classList.add(CONFIG.CLASSES.modalActive)
        document.body.style.overflow = 'hidden'
        systemState.activeModal = modalId

        // Focus para accesibilidad
        const closeButton = modal.querySelector(CONFIG.SELECTORS.modalClose)
        if (closeButton) {
          setTimeout(() => closeButton.focus(), 100)
        }

        console.log('Maestria: Modal abierto:', modalId)
      }
    },

    closeModal() {
      if (systemState.activeModal) {
        const modal = document.getElementById(systemState.activeModal)
        if (modal) {
          modal.classList.remove(CONFIG.CLASSES.modalActive)
        }
      }

      document.body.style.overflow = ''
      systemState.activeModal = null
      console.log('Maestria: Modal cerrado')
    }
  }

  /* =====================
       INICIALIZACIÓN
    ===================== */

  function initializeSystem() {
    if (systemState.initialized) return

    const root = document.querySelector(CONFIG.SELECTORS.root)
    if (!root)
      // Inicializar sistema de modales
      ModalSystem.init()

    systemState.initialized = true
  }

  // API pública
  window.MastershipSystem = {
    init: initializeSystem,
    openModal: ModalSystem.openModal.bind(ModalSystem),
    closeModal: ModalSystem.closeModal.bind(ModalSystem),
    getState: () => ({ ...systemState })
  }

  // Inicialización automática
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSystem)
  } else {
    initializeSystem()
  }

  // Fallback
  setTimeout(initializeSystem, 100)

  console.log('Maestria: Script cargado')
})()

// Export default para compatibilidad con módulos
export default function initMastership() {
  if (window.MastershipSystem) {
    window.MastershipSystem.init()
  }
}
