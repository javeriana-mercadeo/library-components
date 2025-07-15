// =====================================================================================================//
// isEditMode is a variable used in liferay that avoids running scripts in edit mode and allows editing //
// =====================================================================================================//

const fragment = document
const configuration = {
  autoOpen : false,
}
// const fragment = fragmentElement;

// if (!isEditMode) {
setupPopupEvent('[data-popup]', 'click', element => {
  const popup = document.querySelector(element.target.dataset.popup)
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

 const autoPopup = fragment.querySelector('.popup-overlay')
if (configuration.autoOpen) {
  autoPopup.style.display = 'flex'
}

function setupPopupEvent(selector, event, callback) {
  fragment.querySelectorAll(selector).forEach(el => {
    el.addEventListener(event, callback)
  })
}

// }


