const fragment = fragmentElement

if (!isEditMode) {
  setupModalGradientEvent('[data-popup]', 'click', element => {
    const popup = fragment.querySelector(element.target.dataset.popup)
    popup.style.display = 'flex'
    console.log('Modal gradient opened:', popup)
  })

  setupModalGradientEvent('.modalGradient-close', 'click', element => {
    const popup = element.target.closest('.modalGradient-overlay')
    popup.style.display = 'none'
  })

  setupModalGradientEvent('.modalGradient-content', 'click', element => {
    element.stopPropagation()
  })

  setupModalGradientEvent('.modalGradient-overlay', 'click', element => {
    element.target.style.display = 'none'
  })

  setupModalGradientEvent('.modalGradient-btn', 'click', element => {
    const popup = element.target.closest('.modalGradient-overlay')
    popup.style.display = 'none'
  })

  const modalGradientAutoPopup = fragment.querySelector('.modalGradient-overlay')
  if (configuration.autoOpen) {
    modalGradientAutoPopup.style.display = 'flex'
  }

  const modalGradientShowOpenBtn = fragment.querySelector('.modalGradient-open-btn')
  if (configuration.showOpenButton === false) {
    modalGradientShowOpenBtn.style.display = 'none'
  }

  function setupModalGradientEvent(selector, event, callback) {
    fragment.querySelectorAll(selector).forEach(el => {
      el.addEventListener(event, callback)
    })
  }
}
