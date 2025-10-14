// ==========================================
// MODAL SYSTEM - Sistema de modales reutilizables estilo Bootstrap
// ==========================================

const CONFIG = {
  overlaySelector: '.modal-overlay',
  triggerSelector: '[data-modal-trigger]',
  animationDuration: 300,
  enableMutationObserver: true
}

// WeakMap para evitar re-inicialización de modales ya procesados
const processedModals = new WeakMap()
// Set para tracking de modales activos
const activeModals = new Set()

// Abrir modal
const openModal = modalOverlay => {
  if (!modalOverlay) return

  document.body.style.overflow = 'hidden'
  modalOverlay.style.display = 'flex'
  modalOverlay.offsetHeight // Forzar repaint para animación
  modalOverlay.classList.add('active')
  activeModals.add(modalOverlay)

  if (modalOverlay.dataset.modalOnOpen === 'callback') {
    window.dispatchEvent(new CustomEvent('modal:opened', { detail: { modalId: modalOverlay.id } }))
  }

  // Focus en primer elemento focusable
  setTimeout(() => {
    const focusable = modalOverlay.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    focusable?.focus()
  }, CONFIG.animationDuration)
}

// Cerrar modal
const closeModal = modalOverlay => {
  if (!modalOverlay) return

  modalOverlay.classList.remove('active')
  activeModals.delete(modalOverlay)

  setTimeout(() => {
    modalOverlay.style.display = 'none'
    if (activeModals.size === 0) {
      document.body.style.overflow = ''
    }
  }, CONFIG.animationDuration)

  if (modalOverlay.dataset.modalOnClose === 'callback') {
    window.dispatchEvent(new CustomEvent('modal:closed', { detail: { modalId: modalOverlay.id } }))
  }
}

const closeAllModals = () => activeModals.forEach(closeModal)

// ==========================================
// INICIALIZACIÓN
// ==========================================
const initializeModal = modalOverlay => {
  if (processedModals.has(modalOverlay)) return

  processedModals.set(modalOverlay, true)
  const modalId = modalOverlay.id || modalOverlay.dataset.modalId

  // Auto-open si está configurado
  if (modalOverlay.dataset.modalAutoOpen === 'true') {
    setTimeout(() => openModal(modalOverlay), 100)
  }

  // Cerrar al click en overlay
  if (modalOverlay.dataset.modalCloseOnOverlay !== 'false') {
    modalOverlay.addEventListener('click', e => {
      if (e.target === modalOverlay) closeModal(modalOverlay)
    })
  }

  // Botones de cerrar
  modalOverlay.querySelectorAll(`[data-modal-close="${modalId}"], [data-modal-close]`).forEach(btn => {
    btn.addEventListener('click', () => closeModal(modalOverlay))
  })

  // Tecla Escape
  if (modalOverlay.dataset.modalCloseOnEsc !== 'false') {
    const escapeHandler = e => {
      if (e.key === 'Escape' && activeModals.has(modalOverlay)) closeModal(modalOverlay)
    }
    document.addEventListener('keydown', escapeHandler)
    modalOverlay._escapeHandler = escapeHandler
  }
}

// Inicializar triggers externos
const initializeTriggers = () => {
  if (typeof document === 'undefined') return

  document.querySelectorAll(CONFIG.triggerSelector).forEach(trigger => {
    if (trigger._modalTriggerAttached) return

    const targetModal = document.getElementById(trigger.dataset.modalTrigger)
    if (targetModal) {
      trigger.addEventListener('click', () => openModal(targetModal))
      trigger._modalTriggerAttached = true
    }
  })
}

const initializeAllModals = () => {
  if (typeof document === 'undefined') return

  try {
    document.querySelectorAll(CONFIG.overlaySelector).forEach(initializeModal)
    initializeTriggers()
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Modal] Error al inicializar:', error)
    }
  }
}

// ==========================================
// INICIALIZACIÓN SEGURA EN NAVEGADOR
// ==========================================
const initSafelyInBrowser = () => {
  if (typeof document === 'undefined') return

  const initialize = () => {
    typeof requestIdleCallback !== 'undefined'
      ? requestIdleCallback(initializeAllModals, { timeout: 1000 })
      : setTimeout(initializeAllModals, 100)
  }

  document.readyState === 'complete' || document.readyState === 'interactive'
    ? initialize()
    : document.addEventListener('DOMContentLoaded', initialize, { once: true })

  // MutationObserver para modales dinámicos
  if (CONFIG.enableMutationObserver && typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(mutations => {
      const hasNewModal = mutations.some(
        ({ type, addedNodes }) =>
          type === 'childList' &&
          Array.from(addedNodes).some(
            node =>
              node.nodeType === Node.ELEMENT_NODE &&
              (node.matches?.(CONFIG.overlaySelector) ||
                node.querySelector?.(CONFIG.overlaySelector) ||
                node.matches?.(CONFIG.triggerSelector) ||
                node.querySelector?.(CONFIG.triggerSelector))
          )
      )

      if (hasNewModal) initializeAllModals()
    })

    const startObserver = () => {
      if (document.body) {
        observer.observe(document.body, { childList: true, subtree: true })
      }
    }

    document.body ? startObserver() : document.addEventListener('DOMContentLoaded', startObserver, { once: true })
    window.addEventListener('beforeunload', () => observer.disconnect(), { once: true })
  }

  // Event listeners programáticos
  window.addEventListener('modal:open', ({ detail }) => {
    const modal = document.getElementById(detail?.modalId)
    if (modal) openModal(modal)
  })

  window.addEventListener('modal:close', ({ detail }) => {
    detail?.modalId ? closeModal(document.getElementById(detail.modalId)) : closeAllModals()
  })
}

// ==========================================
// API PÚBLICA
// ==========================================
export const openModalById = modalId => {
  const modal = document.getElementById(modalId)
  if (modal) {
    openModal(modal)
    return true
  }
  return false
}

export const closeModalById = modalId => {
  const modal = document.getElementById(modalId)
  if (modal) {
    closeModal(modal)
    return true
  }
  return false
}

export const closeAll = closeAllModals

initSafelyInBrowser()

export default initializeAllModals
