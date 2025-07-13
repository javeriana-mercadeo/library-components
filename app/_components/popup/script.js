const fragment = document
// const fragment = fragmentElement;

if (!isEditMode) {
  setupPopupEvent('[data-popup]', 'click', element => {
    const popup = fragment.querySelector(element.target.dataset.popup)
    popup.style.display = 'flex'
    console.log('Popup opened:', popup)
  })

  setupPopupEvent('.popup-close', 'click', element => {
    const popup = element.target.closest('.popup-overlay')
    popup.style.display = 'none'
  })

  setupPopupEvent('.popup-content', 'click', element => {
    element.stopPropagation()
  })

  setupPopupEvent('.popup-overlay', 'click', element => {
    element.target.style.display = 'none'
  })

  function setupPopupEvent(selector, event, callback) {
    fragment.querySelectorAll(selector).forEach(el => {
      el.addEventListener(event, callback)
    })
  }
}
