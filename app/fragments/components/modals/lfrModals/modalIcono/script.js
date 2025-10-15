const fragment = fragmentElement
if (!isEditMode) {
  // Event listener para abrir popup con nuevo selector
  setupPopupEvent('[data-popup-icon]', 'click', element => {
    const popup = fragment.querySelector(element.target.dataset.popupIcon)
    openPopup(popup)
    console.log('Popup icon opened:', popup)
  })
  
  // Event listener para cerrar popup
  setupPopupEvent('.popup-close-icon', 'click', element => {
    const popup = element.target.closest('.popup-overlay-icon')
    closePopup(popup)
  })
  
  // Prevenir cierre al hacer clic en el contenido
  setupPopupEvent('.popup-content-icon', 'click', element => {
    element.stopPropagation()
  })
  
  // Cerrar popup al hacer clic en el overlay
  setupPopupEvent('.popup-overlay-icon', 'click', element => {
    closePopup(element.target)
  })
  
  // Cerrar popup al hacer clic en el botón de CTA - CORREGIDO
  setupPopupEvent('.btn-cta-icon', 'click', element => {
    const popup = element.target.closest('.popup-overlay-icon')
    closePopup(popup)
  })
  
  // Auto abrir popup si está configurado
  const autoPopup = fragment.querySelector('.popup-overlay-icon')
  if (configuration.autoOpen) {
    openPopup(autoPopup)
  }
  
  // Mostrar/ocultar botón de abrir - CORREGIDO (faltaba el punto)
  const showOpenBtn = fragment.querySelector('.popup-open-btn-icon')
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