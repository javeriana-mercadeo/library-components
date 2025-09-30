/**
 * Doble Titulación 2 - Scroll Logic
 * Maneja el comportamiento de scroll personalizado del contenedor derecho
 */

;(function () {
  'use strict'

  if (typeof window === 'undefined') {
    return
  }

  const CONFIG = {
    selectors: {
      container: '#doble-titulacion-container',
      rightColumn: '#right-column-scroll',
      scrollContainer: '#scroll-container'
    },
    breakpoints: {
      mobile: 768
    },
    scroll: {
      multiplier: 2,
      bottomOffset: 5,
      maxHeight: 'calc(100vh - 300px)'
    },
    timing: {
      retryInterval: 100,
      maxRetries: 20,
      resizeDebounce: 100
    }
  }

  function createDobleTitulacionScroll() {
    let isInitialized = false
    let cleanupFn = null

    function isMobile() {
      return window.innerWidth <= CONFIG.breakpoints.mobile
    }

    function setupMobileStyles(scrollContainer) {
      if (!scrollContainer) return

      scrollContainer.style.overflow = 'visible'
      scrollContainer.style.height = 'auto'
      scrollContainer.style.maxHeight = 'none'
    }

    function setupDesktopStyles(scrollContainer) {
      if (!scrollContainer) return

      scrollContainer.style.overflowY = 'auto'
      scrollContainer.style.overflowX = 'hidden'
      scrollContainer.style.height = '100%'
      scrollContainer.style.maxHeight = CONFIG.scroll.maxHeight
    }

    function isScrollAtBottom(scrollContainer) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer
      return scrollTop + clientHeight >= scrollHeight - CONFIG.scroll.bottomOffset
    }

    function createWheelHandler(container, rightColumn, scrollContainer) {
      return e => {
        const isMouseOverRightColumn = rightColumn.contains(e.target)

        // Si el mouse está sobre la columna derecha, permitir scroll normal
        if (isMouseOverRightColumn) {
          return
        }

        const deltaY = e.deltaY
        const scrollingDown = deltaY > 0
        const atBottom = isScrollAtBottom(scrollContainer)

        // Solo prevenir scroll si está bajando y no ha llegado al final
        if (scrollingDown && !atBottom) {
          e.preventDefault()
          scrollContainer.scrollBy({
            top: deltaY * CONFIG.scroll.multiplier,
            behavior: 'auto'
          })
        }
      }
    }

    function initializeScrollBehavior() {
      if (isMobile()) {
        const scrollContainer = document.querySelector(CONFIG.selectors.scrollContainer)
        setupMobileStyles(scrollContainer)
        return
      }

      const container = document.querySelector(CONFIG.selectors.container)
      const rightColumn = document.querySelector(CONFIG.selectors.rightColumn)
      const scrollContainer = document.querySelector(CONFIG.selectors.scrollContainer)

      if (!container || !rightColumn || !scrollContainer) {
        console.warn('Doble Titulación: Elementos requeridos no encontrados')
        return
      }

      setupDesktopStyles(scrollContainer)

      const handleWheel = createWheelHandler(container, rightColumn, scrollContainer)

      const handleResize = debounce(() => {
        cleanup()
        setTimeout(initializeScrollBehavior, CONFIG.timing.resizeDebounce)
      }, CONFIG.timing.resizeDebounce)

      // Limpiar listeners previos si existen
      if (cleanupFn) {
        cleanupFn()
      }

      container.addEventListener('wheel', handleWheel, { passive: false })
      window.addEventListener('resize', handleResize)

      // Guardar función de limpieza
      cleanupFn = () => {
        container.removeEventListener('wheel', handleWheel)
        window.removeEventListener('resize', handleResize)
      }

      isInitialized = true
    }

    function waitForElements() {
      return new Promise((resolve, reject) => {
        let attempts = 0

        function checkElements() {
          attempts++

          const container = document.querySelector(CONFIG.selectors.container)
          const rightColumn = document.querySelector(CONFIG.selectors.rightColumn)
          const scrollContainer = document.querySelector(CONFIG.selectors.scrollContainer)

          if (container && rightColumn && scrollContainer) {
            resolve({ container, rightColumn, scrollContainer })
          } else if (attempts < CONFIG.timing.maxRetries) {
            setTimeout(checkElements, CONFIG.timing.retryInterval)
          } else {
            reject(new Error('Doble Titulación: Timeout esperando elementos del DOM'))
          }
        }

        checkElements()
      })
    }

    function debounce(func, wait) {
      let timeout
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout)
          func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
      }
    }

    async function initialize() {
      try {
        await waitForElements()
        initializeScrollBehavior()
        return true
      } catch (error) {
        console.error(error.message)
        return false
      }
    }

    function cleanup() {
      if (cleanupFn) {
        cleanupFn()
        cleanupFn = null
      }
      isInitialized = false
    }

    function reinitialize() {
      cleanup()
      return initialize()
    }

    return {
      initialize,
      cleanup,
      reinitialize,
      isInitialized: () => isInitialized
    }
  }

  // Auto-inicialización
  function autoInit() {
    const instance = createDobleTitulacionScroll()

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        instance.initialize()
      })
    } else {
      instance.initialize()
    }

    // Guardar instancia global
    window.dobleTitulacionScroll = instance

    return instance
  }

  const mainInstance = autoInit()

  // API pública
  const DobleTitulacionAPI = {
    create: createDobleTitulacionScroll,
    getInstance: () => mainInstance
  }

  // Exports
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = DobleTitulacionAPI
    module.exports.default = DobleTitulacionAPI
    module.exports.createDobleTitulacionScroll = createDobleTitulacionScroll
  }

  if (typeof define === 'function' && define.amd) {
    define([], () => DobleTitulacionAPI)
  }

  if (typeof window !== 'undefined') {
    window.DobleTitulacion = DobleTitulacionAPI
    window.createDobleTitulacionScroll = createDobleTitulacionScroll
  }

  return DobleTitulacionAPI
})()
