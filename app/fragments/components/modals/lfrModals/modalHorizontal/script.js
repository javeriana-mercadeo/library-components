const fragment = fragmentElement

if (!isEditMode) {
  setupModalWideEvent('[data-popup]', 'click', element => {
    const popup = fragment.querySelector(element.target.dataset.popup)
    openModalWide(popup)
    console.log('Modal wide opened:', popup)
  })

  setupModalWideEvent('.modalWide-close', 'click', element => {
    const popup = element.target.closest('.modalWide-overlay')
    closeModalWide(popup)
  })

  setupModalWideEvent('.modalWide-content', 'click', element => {
    element.stopPropagation()
  })

  setupModalWideEvent('.modalWide-overlay', 'click', element => {
    closeModalWide(element.target)
  })

  setupModalWideEvent('.modalWide-btn', 'click', element => {
    const popup = element.target.closest('.modalWide-overlay')
    closeModalWide(popup)
  })

  const modalWideAutoPopup = fragment.querySelector('.modalWide-overlay')
  if (configuration.autoOpen) {
    openModalWide(modalWideAutoPopup)
  }

  const modalWideShowOpenBtn = fragment.querySelector('.modalWide-open-btn')
  if (configuration.showOpenButton === false) {
    modalWideShowOpenBtn.style.display = 'none'
  }

  // Funciones de animación compatibles con Liferay
  function openModalWide(popup) {
    popup.style.display = 'flex'
    // Forzar repaint para activar la animación
    popup.offsetHeight
    popup.classList.add('active')
  }

  function closeModalWide(popup) {
    popup.classList.remove('active')
    // Esperar a que termine la animación antes de ocultar
    setTimeout(() => {
      popup.style.display = 'none'
    }, 300)
  }

  function setupModalWideEvent(selector, event, callback) {
    fragment.querySelectorAll(selector).forEach(el => {
      el.addEventListener(event, callback)
    })
  }
}
