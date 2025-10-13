/**
 * Sistema de gestión de modales para Maestría
 */
;(function () {
  'use strict'

  const CONFIG = {
    SELECTORS: {
      root: '.maestria-banner',
      modalTrigger: '[data-modal-target]',
      modalClose: '.maestria-banner__modal-close',
      modal: '.maestria-banner__modal'
    },
    CLASSES: {
      modalActive: 'maestria-banner__modal--active'
    }
  }

  let systemState = {
    initialized: false,
    activeModal: null
  }

  const ModalSystem = {
    init() {
      this.setupEventListeners()
    },

    setupEventListeners() {
      document.addEventListener('click', e => {
        const trigger = e.target.closest(CONFIG.SELECTORS.modalTrigger)
        if (trigger) {
          e.preventDefault()
          const modalId = trigger.getAttribute('data-modal-target')
          this.openModal(modalId)
        }

        const closeBtn = e.target.closest(CONFIG.SELECTORS.modalClose)
        if (closeBtn) {
          e.preventDefault()
          this.closeModal()
        }

        // Click en backdrop
        if (e.target.classList.contains('maestria-banner__modal') && e.target.classList.contains(CONFIG.CLASSES.modalActive)) {
          this.closeModal()
        }
      })

      // Escape key
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

  function initializeSystem() {
    if (systemState.initialized) return

    const root = document.querySelector(CONFIG.SELECTORS.root)
    if (!root) return

    ModalSystem.init()
    systemState.initialized = true
  }

  // API pública
  window.MaestriaSystem = {
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

  setTimeout(initializeSystem, 100)

  console.log('Maestria: Script cargado')
})()

export default function initMaestria() {
  if (window.MaestriaSystem) {
    window.MaestriaSystem.init()
  }
}