// Basic Modal Script - Compatible with Liferay (Advanced Animations)
export default () => {
  const fragment = document
  const configuration = {
    autoOpen: false,
    showOpenButton: true
  }

  // Función para abrir modal - EXACTO patrón del header
  function openModal(popup) {
    // 1. Hacer visible el overlay
    popup.style.display = 'flex'

    // 2. Aplicar 'show' inmediatamente
    popup.classList.add('show')

    // 3. Forzar reflow
    popup.offsetHeight

    // 4. Aplicar 'active' con delay para animación (como HeaderManager)
    setTimeout(() => {
      popup.classList.add('active')
    }, 10)
  }

  // Función para cerrar modal - EXACTO patrón del header
  function closeModal(popup) {
    // 1. Quitar 'active' inmediatamente para comenzar animación de salida
    popup.classList.remove('active')

    // 2. Quitar 'show' y ocultar con delay para animación (como HeaderManager)
    setTimeout(() => {
      popup.classList.remove('show')
      popup.style.display = 'none'
    }, 200) // Usar timing más corto como el header (calc(var(--transition) * 0.67))
  }

  // Setup popup events - Con animaciones avanzadas
  setupPopupEvent('[data-popup]', 'click', element => {
    // Buscar el elemento con data-popup, puede ser el target o un padre
    const triggerElement = element.target.closest('[data-popup]')
    if (triggerElement && triggerElement.dataset.popup) {
      const popup = document.querySelector(triggerElement.dataset.popup)
      if (popup) {
        openModal(popup)
        console.log('Popup opened:', popup)
      } else {
        console.error('Popup not found:', triggerElement.dataset.popup)
      }
    } else {
      console.error('No data-popup attribute found on element or its parents')
    }
  })

  setupPopupEvent('.popup-close', 'click', element => {
    const closeElement = element.target.closest('.popup-close')
    const popup = closeElement ? closeElement.closest('.popup-overlay') : null
    if (popup) {
      closeModal(popup)
    }
  })

  setupPopupEvent('.popup-content', 'click', element => {
    element.stopPropagation()
  })

  setupPopupEvent('.popup-overlay', 'click', element => {
    if (element.target.classList.contains('popup-overlay')) {
      closeModal(element.target)
    }
  })

  setupPopupEvent('.content-btn', 'click', element => {
    const btnElement = element.target.closest('.content-btn')
    const popup = btnElement ? btnElement.closest('.popup-overlay') : null
    if (popup) {
      closeModal(popup)
    }
  })

  // ESC key support - solo si NUESTRO modal está activo (como HeaderManager)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activePopup = document.querySelector('.popup-overlay.show.active')
      if (activePopup) {
        closeModal(activePopup)
      }
    }
  })

  // Auto open configuration
  const autoPopup = fragment.querySelector('.popup-overlay')
  if (configuration.autoOpen && autoPopup) {
    openModal(autoPopup)
  }

  // Show/hide open button
  const showOpenBtn = fragment.querySelector('.popup-open__btn')
  if (!configuration.showOpenButton && showOpenBtn) {
    showOpenBtn.style.display = 'none'
  }

  function setupPopupEvent(selector, event, callback) {
    fragment.querySelectorAll(selector).forEach(el => {
      el.addEventListener(event, callback)
    })
  }
}