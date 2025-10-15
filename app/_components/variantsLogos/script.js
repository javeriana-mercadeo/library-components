export default configuration => {
  const fragmentElement = document

  // document.addEventListener("DOMContentLoaded", () => {
  const logo = fragmentElement.querySelector('#variation-logo-fragment')
  const logoImg = fragmentElement.querySelector('.logo-wrapper')
  logoImg.style.width = `${configuration.width || 14}%`
  logoImg.style.height = `${configuration.height || 12}%`

  const targetContainer = fragmentElement.querySelector('.program-data_title')
  // const targetContainer = fragmentElement.querySelector('.program-data_faculty-container') // If only want to show next to Faculty name not next to Fragment title

  if (logo && targetContainer && !isEditMode) {
    targetContainer.style.position = 'relative'
    targetContainer.appendChild(logo)
    // targetContainer.insertBefore(logo, targetContainer.firstChild) // Insert instead of appendChild in Liferay
  }
  // });
}
