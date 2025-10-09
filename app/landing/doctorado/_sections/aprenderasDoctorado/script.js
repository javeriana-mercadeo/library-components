'use strict'

let readMoreState = false
let isInitialized = false

function countWords(element) {
  if (!element) return 0
  const clone = element.cloneNode(true)
  const text = clone.textContent || clone.innerText || ''
  return text
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0).length
}

function handleReadMoreClick(event) {
  event.preventDefault()

  const button = event.target
  const wrapper = button.closest('.text-container-expandible')
  const contentElement = wrapper.querySelector('.descriptionDoctoradoA')

  if (!contentElement) {
    console.log('Contenido no encontrado')
    return
  }

  readMoreState = !readMoreState

  if (readMoreState) {
    contentElement.classList.add('expanded')
    button.textContent = 'Leer menos'
  } else {
    contentElement.classList.remove('expanded')
    button.textContent = 'Leer más'
  }
}

function setupReadMoreSection() {
  const contentElement = document.getElementById('section-content-unique')
  const wrapper = document.getElementById('content-wrapper-unique')
  const button = wrapper ? wrapper.querySelector('.read-more-toggle') : null

  if (!contentElement || !wrapper || !button) {
    return false
  }

  const wordCount = countWords(contentElement)

  if (wordCount <= 95) {
    button.style.display = 'none'
    contentElement.classList.add('expanded')
    wrapper.classList.add('short-content')
  } else {
    button.style.display = 'inline-block'
    contentElement.classList.remove('expanded')
    wrapper.classList.remove('short-content')
    button.textContent = 'Leer más'
    readMoreState = false
  }

  return true
}

function initializeWithRetry() {
  if (isInitialized) return

  const success = setupReadMoreSection()
  if (success) {
    isInitialized = true
  } else {
    setTimeout(initializeWithRetry, 300)
  }
}

// Delegación de eventos
document.addEventListener('click', event => {
  if (event.target && event.target.getAttribute('data-action') === 'toggle-read-more') {
    handleReadMoreClick(event)
  }
})

// Inicialización
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeWithRetry)
} else {
  initializeWithRetry()
}

// Fallbacks
setTimeout(initializeWithRetry, 100)
setTimeout(initializeWithRetry, 500)
setTimeout(initializeWithRetry, 1500)

// Exponemos funciones útiles para reusar
export function reinitReadMoreDoctorado() {
  isInitialized = false
  readMoreState = false
  initializeWithRetry()
}

export { initializeWithRetry }
