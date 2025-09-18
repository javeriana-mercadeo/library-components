const fragment = fragmentElement

if (!isEditMode) {
  setupModalVerticalEvent('[data-popup]', 'click', element => {
    const popup = fragment.querySelector(element.target.dataset.popup)
    popup.style.display = 'flex'
    console.log('Modal vertical opened:', popup)
  })

  setupModalVerticalEvent('.modalVertical-close', 'click', element => {
    const popup = element.target.closest('.modalVertical-overlay')
    popup.style.display = 'none'
  })

  setupModalVerticalEvent('.modalVertical-content', 'click', element => {
    element.stopPropagation()
  })

  setupModalVerticalEvent('.modalVertical-overlay', 'click', element => {
    element.target.style.display = 'none'
  })

  setupModalVerticalEvent('.modalVertical-btn', 'click', element => {
    const popup = element.target.closest('.modalVertical-overlay')
    popup.style.display = 'none'
  })

  const modalVerticalAutoPopup = fragment.querySelector('.modalVertical-overlay')
  if (configuration.autoOpen) {
    modalVerticalAutoPopup.style.display = 'flex'
  }

  const modalVerticalShowOpenBtn = fragment.querySelector('.modalVertical-open-btn')
  if (configuration.showOpenButton === false) {
    modalVerticalShowOpenBtn.style.display = 'none'
  }

  function setupModalVerticalEvent(selector, event, callback) {
    fragment.querySelectorAll(selector).forEach(el => {
      el.addEventListener(event, callback)
    })
  }
}
