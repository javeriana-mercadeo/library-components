const fragment = fragmentElement

if (!isEditMode) {
  setupModalVerticalEvent('[data-popup]', 'click', element => {
    const popup = fragment.querySelector(element.target.dataset.popup)
    openModalVertical(popup)
    console.log('Modal vertical opened:', popup)
  })

  setupModalVerticalEvent('.modalVertical-close', 'click', element => {
    const popup = element.target.closest('.modalVertical-overlay')
    closeModalVertical(popup)
  })

  setupModalVerticalEvent('.modalVertical-content', 'click', element => {
    element.stopPropagation()
  })

  setupModalVerticalEvent('.modalVertical-overlay', 'click', element => {
    closeModalVertical(element.target)
  })

  setupModalVerticalEvent('.modalVertical-btn', 'click', element => {
    const popup = element.target.closest('.modalVertical-overlay')
    closeModalVertical(popup)
  })

  const modalVerticalAutoPopup = fragment.querySelector('.modalVertical-overlay')
  if (configuration.autoOpen) {
    openModalVertical(modalVerticalAutoPopup)
  }

  const modalVerticalShowOpenBtn = fragment.querySelector('.modalVertical-open-btn')
  if (configuration.showOpenButton === false) {
    modalVerticalShowOpenBtn.style.display = 'none'
  }

  // Funciones de animación compatibles con Liferay
  function openModalVertical(popup) {
    popup.style.display = 'flex'
    // Forzar repaint para activar la animación
    popup.offsetHeight
    popup.classList.add('active')
  }

  function closeModalVertical(popup) {
    popup.classList.remove('active')
    // Esperar a que termine la animación antes de ocultar
    setTimeout(() => {
      popup.style.display = 'none'
    }, 300)
  }

  function setupModalVerticalEvent(selector, event, callback) {
    fragment.querySelectorAll(selector).forEach(el => {
      el.addEventListener(event, callback)
    })
  }
}
