;(function () {
  'use strict'

  // Estado global
  let readMoreState = false
  let isInitialized = false

  // Configuración
  const CONFIG = {
    WORD_LIMIT: 95,
    RETRY_DELAY: 300,
    SELECTORS: {
      contentElement: '#section-content-unique',
      wrapper: '#content-wrapper-unique',
      button: '.read-more-toggle'
    },
    CLASSES: {
      expanded: 'expanded',
      shortContent: 'short-content'
    },
    TEXT: {
      readMore: 'Leer más',
      readLess: 'Leer menos'
    }
  }

  /**
   * Cuenta las palabras en un elemento
   * @param {HTMLElement} element - Elemento a analizar
   * @returns {number} Número de palabras
   */
  function countWords(element) {
    if (!element) return 0

    const clone = element.cloneNode(true)
    const text = clone.textContent || clone.innerText || ''

    return text
      .trim()
      .split(/\s+/)
      .filter(word => word.length > 0).length
  }

  /**
   * Maneja el clic del botón leer más/menos
   * @param {Event} event - Evento de clic
   */
  function handleReadMoreClick(event) {
    event.preventDefault()

    const button = event.target
    const wrapper = button.closest('.text-container-expandible')
    const contentElement = wrapper.querySelector('.descriptionDoctoradoA')

    if (!contentElement) {
      console.warn('Contenido no encontrado')
      return
    }

    readMoreState = !readMoreState

    if (readMoreState) {
      contentElement.classList.add(CONFIG.CLASSES.expanded)
      button.textContent = CONFIG.TEXT.readLess
      console.log('Contenido expandido')
    } else {
      contentElement.classList.remove(CONFIG.CLASSES.expanded)
      button.textContent = CONFIG.TEXT.readMore
      console.log('Contenido contraído')
    }
  }

  /**
   * Configura una sección con funcionalidad read-more
   * @param {string} contentSelector - Selector del contenido
   * @param {string} wrapperSelector - Selector del wrapper
   * @returns {boolean} Éxito de la configuración
   */
  function setupReadMoreSection(contentSelector = CONFIG.SELECTORS.contentElement, wrapperSelector = CONFIG.SELECTORS.wrapper) {
    const contentElement = document.querySelector(contentSelector)
    const wrapper = document.querySelector(wrapperSelector)
    const button = wrapper ? wrapper.querySelector(CONFIG.SELECTORS.button) : null

    if (!contentElement || !wrapper || !button) {
      console.log('Elementos no encontrados, reintentando...')
      return false
    }

    const wordCount = countWords(contentElement)
    console.log(`Inicializando con ${wordCount} palabras`)

    if (wordCount <= CONFIG.WORD_LIMIT) {
      button.style.display = 'none'
      contentElement.classList.add(CONFIG.CLASSES.expanded)
      wrapper.classList.add(CONFIG.CLASSES.shortContent)
      console.log('Contenido corto - botón oculto')
    } else {
      button.style.display = 'inline-block'
      contentElement.classList.remove(CONFIG.CLASSES.expanded)
      wrapper.classList.remove(CONFIG.CLASSES.shortContent)
      button.textContent = CONFIG.TEXT.readMore
      readMoreState = false
      console.log('Contenido largo - botón visible')
    }

    return true
  }

  /**
   * Inicializa con reintentos automáticos
   */
  function initializeWithRetry() {
    if (isInitialized) return

    const success = setupReadMoreSection()
    if (success) {
      isInitialized = true
      console.log('Read More Doctorado inicializado correctamente')
    } else {
      setTimeout(initializeWithRetry, CONFIG.RETRY_DELAY)
    }
  }

  /**
   * Reinicia el sistema
   */
  function reinitialize() {
    isInitialized = false
    readMoreState = false
    initializeWithRetry()
    console.log('Sistema reinicializado')
  }

  /**
   * Configuración de event listeners
   */
  function setupEventListeners() {
    // Event delegation para clics
    document.addEventListener('click', function (event) {
      if (event.target && event.target.getAttribute('data-action') === 'toggle-read-more') {
        handleReadMoreClick(event)
      }
    })
  }

  /**
   * Inicialización principal
   */
  function init() {
    setupEventListeners()

    // Múltiples puntos de inicialización
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeWithRetry)
    } else {
      initializeWithRetry()
    }

    // Fallbacks con timeouts escalonados
    setTimeout(initializeWithRetry, 100)
    setTimeout(initializeWithRetry, 500)
    setTimeout(initializeWithRetry, 1500)
  }

  /**
   * Integración con Liferay
   */
  function setupLiferayIntegration() {
    if (typeof Liferay !== 'undefined') {
      console.log('Liferay detectado para sección Doctorado')

      Liferay.on('allPortletsReady', function () {
        console.log('Portlets Liferay listos - inicializando Doctorado')
        setTimeout(function () {
          if (!isInitialized) {
            initializeWithRetry()
          }
        }, 250)
      })

      Liferay.on('fragmentEntryLinkEditableChanged', function (event) {
        console.log('Contenido Doctorado editado:', event)
        reinitialize()
      })
    }
  }

  // API pública
  window.DoctoradoReadMore = {
    init: init,
    reinit: reinitialize,
    setupSection: setupReadMoreSection,
    countWords: countWords
  }

  // Función global para compatibilidad con Liferay
  window.reinitReadMoreDoctorado = reinitialize

  // Inicialización automática
  init()
  setupLiferayIntegration()

  console.log('Script Doctorado Read-More cargado')
})()
