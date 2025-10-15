const fragment = fragmentElement
if (!isEditMode) {
  // Event listener para abrir popup con nuevo selector
  setupPopupEvent('[data-popup-v2]', 'click', element => {
    const popup = fragment.querySelector(element.target.dataset.popupV2)
    openPopup(popup)
    console.log('Popup v2 opened:', popup)
  })
  
  // Event listener para cerrar popup
  setupPopupEvent('.popup-close-v2', 'click', element => {
    const popup = element.target.closest('.popup-overlay-v2')
    closePopup(popup)
  })
  
  // Prevenir cierre al hacer clic en el contenido
  setupPopupEvent('.popup-content-v2', 'click', element => {
    element.stopPropagation()
  })
  
  // Cerrar popup al hacer clic en el overlay
  setupPopupEvent('.popup-overlay-v2', 'click', element => {
    closePopup(element.target)
  })
  
  // Cerrar popup al hacer clic en el botón de CTA
  setupPopupEvent('.content-btn-v2', 'click', element => {
    const popup = element.target.closest('.popup-overlay-v2')
    closePopup(popup)
  })
  
  // Auto abrir popup si está configurado
  const autoPopup = fragment.querySelector('.popup-overlay-v2')
  if (configuration.autoOpen) {
    openPopup(autoPopup)
  }
  
  // Mostrar/ocultar botón de abrir
  const showOpenBtn = fragment.querySelector('.popup-open__btn-v2')
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