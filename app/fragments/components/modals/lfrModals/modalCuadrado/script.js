const fragment = fragmentElement

if (!isEditMode) {
  setupModalGradientEvent('[data-popup]', 'click', element => {
    const popup = fragment.querySelector(element.target.dataset.popup)
    openModalGradient(popup)
    console.log('Modal gradient opened:', popup)
  })

  setupModalGradientEvent('.modalGradient-close', 'click', element => {
    const popup = element.target.closest('.modalGradient-overlay')
    closeModalGradient(popup)
  })

  setupModalGradientEvent('.modalGradient-content', 'click', element => {
    element.stopPropagation()
  })

  setupModalGradientEvent('.modalGradient-overlay', 'click', element => {
    closeModalGradient(element.target)
  })

  setupModalGradientEvent('.modalGradient-btn', 'click', element => {
    const popup = element.target.closest('.modalGradient-overlay')
    closeModalGradient(popup)
  })

  const modalGradientAutoPopup = fragment.querySelector('.modalGradient-overlay')
  if (configuration.autoOpen) {
    openModalGradient(modalGradientAutoPopup)
  }

  const modalGradientShowOpenBtn = fragment.querySelector('.modalGradient-open-btn')
  if (configuration.showOpenButton === false) {
    modalGradientShowOpenBtn.style.display = 'none'
  }

  // Funciones de animación compatibles con Liferay
  function openModalGradient(popup) {
    popup.style.display = 'flex'
    // Forzar repaint para activar la animación
    popup.offsetHeight
    popup.classList.add('active')
  }

  function closeModalGradient(popup) {
    popup.classList.remove('active')
    // Esperar a que termine la animación antes de ocultar
    setTimeout(() => {
      popup.style.display = 'none'
    }, 300)
  }

  function setupModalGradientEvent(selector, event, callback) {
    fragment.querySelectorAll(selector).forEach(el => {
      el.addEventListener(event, callback)
    })
  }
}
