const fragment = fragmentElement

if (!isEditMode) {
  setupModalWideEvent('[data-popup]', 'click', element => {
    const popup = fragment.querySelector(element.target.dataset.popup)
    popup.style.display = 'flex'
    console.log('Modal wide opened:', popup)
  })

  setupModalWideEvent('.modalWide-close', 'click', element => {
    const popup = element.target.closest('.modalWide-overlay')
    popup.style.display = 'none'
  })

  setupModalWideEvent('.modalWide-content', 'click', element => {
    element.stopPropagation()
  })

  setupModalWideEvent('.modalWide-overlay', 'click', element => {
    element.target.style.display = 'none'
  })

  setupModalWideEvent('.modalWide-btn', 'click', element => {
    const popup = element.target.closest('.modalWide-overlay')
    popup.style.display = 'none'
  })

  const modalWideAutoPopup = fragment.querySelector('.modalWide-overlay')
  if (configuration.autoOpen) {
    modalWideAutoPopup.style.display = 'flex'
  }

  const modalWideShowOpenBtn = fragment.querySelector('.modalWide-open-btn')
  if (configuration.showOpenButton === false) {
    modalWideShowOpenBtn.style.display = 'none'
  }

  function setupModalWideEvent(selector, event, callback) {
    fragment.querySelectorAll(selector).forEach(el => {
      el.addEventListener(event, callback)
    })
  }
}
