const fragment = fragmentElement

if (!isEditMode) {
  setupPopupEvent('[data-popup]', 'click', element => {
    const popup = fragment.querySelector(element.target.dataset.popup)
    openPopup(popup)
    console.log('Popup opened:', popup)
  })

  setupPopupEvent('.popup-close', 'click', element => {
    const popup = element.target.closest('.popup-overlay')
    closePopup(popup)
  })

  setupPopupEvent('.popup-content', 'click', element => {
    element.stopPropagation()
  })

  setupPopupEvent('.popup-overlay', 'click', element => {
    closePopup(element.target)
  })

  setupPopupEvent('.content-btn', 'click', element => {
    const popup = element.target.closest('.popup-overlay')
    closePopup(popup)
  })

  const autoPopup = fragment.querySelector('.popup-overlay')
  if (configuration.autoOpen) {
    openPopup(autoPopup)
  }

  const showOpenBtn = fragment.querySelector('.popup-open__btn')
  if (configuration.showOpenButton === false) {
    showOpenBtn.style.display = 'none'
  }

  // Funciones de animación compatibles con Liferay
  function openPopup(popup) {
    popup.style.display = 'flex'
    // Forzar repaint para activar la animación
    popup.offsetHeight
    popup.classList.add('active')
  }

  function closePopup(popup) {
    popup.classList.remove('active')
    // Esperar a que termine la animación antes de ocultar
    setTimeout(() => {
      popup.style.display = 'none'
    }, 300)
  }

  function setupPopupEvent(selector, event, callback) {
    fragment.querySelectorAll(selector).forEach(el => {
      el.addEventListener(event, callback)
    })
  }
}
