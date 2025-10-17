/**
 * DocentesDoctorado - JavaScript Vanilla
 * Sistema de carrusel de docentes con Swiper.js
 */
;(function () {
  'use strict'

  // Configuración del sistema
  const CONFIG = {
    SELECTORS: {
      wrapper: '.expert-carousel_wrapper',
      slides: '.expert-carousel_slide',
      nextBtn: '.expert-carousel_next',
      prevBtn: '.expert-carousel_prev',
      cards: '.expert-carousel_card',
      pagination: '.expert-carousel_pagination'
    },
    CLASSES: {
      showNavigation: 'show-navigation',
      disabled: 'swiper-button-disabled',
      hidden: 'swiper-button-hidden',
      active: 'swiper-pagination-bullet-active'
    },
    BREAKPOINTS: {
      mobile: 428,
      tablet: 576,
      desktop: 768,
      large: 1024,
      xlarge: 1200,
      xxlarge: 1440
    }
  }

  // Estado global del sistema
  let systemState = {
    swiperInstance: null,
    initialized: false,
    resizeTimeout: null
  }

  /* =====================
     UTILIDADES
  ===================== */

  /**
   * Debounce function para optimizar eventos
   */
  function debounce(fn, delay) {
    let timeout
    return function () {
      const context = this
      const args = arguments
      clearTimeout(timeout)
      timeout = setTimeout(() => fn.apply(context, args), delay)
    }
  }

  /**
   * Espera a que Swiper esté disponible
   */
  function waitForSwiper(callback, maxAttempts = 10) {
    let attempts = 0

    function checkSwiper() {
      if (window.Swiper) {
        callback()
      } else if (attempts < maxAttempts) {
        attempts++
        setTimeout(checkSwiper, 300)
      } else {
        console.error('DocentesDoctorado: Swiper no se pudo cargar después de múltiples intentos')
      }
    }

    checkSwiper()
  }

  /* =====================
     FUNCIONES DEL CARRUSEL
  ===================== */

  /**
   * Iguala las alturas de todas las tarjetas
   */
  function equalizeHeights() {
    const cards = document.querySelectorAll(CONFIG.SELECTORS.cards)
    if (cards.length === 0) return

    let maxHeight = 0

    // Resetear alturas y encontrar la máxima
    cards.forEach(card => {
      card.style.height = 'auto'
      const height = card.offsetHeight
      if (height > maxHeight) {
        maxHeight = height
      }
    })

    // Aplicar altura máxima a todas las tarjetas
    cards.forEach(card => {
      card.style.height = maxHeight + 'px'
    })

    console.log('DocentesDoctorado: Alturas igualadas a', maxHeight + 'px')
  }

  /**
   * Actualiza la visibilidad de la navegación
   */
  function updateNavigationVisibility(swiper, totalSlides) {
    const nextBtn = document.querySelector(CONFIG.SELECTORS.nextBtn)
    const prevBtn = document.querySelector(CONFIG.SELECTORS.prevBtn)

    if (!nextBtn || !prevBtn) {
      console.warn('DocentesDoctorado: Botones de navegación no encontrados')
      return
    }

    // Obtener slides visibles actuales
    const slidesPerView = swiper.params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : swiper.params.slidesPerView

    const needsNavigation = totalSlides > slidesPerView

    if (needsNavigation) {
      // Mostrar navegación
      nextBtn.classList.add(CONFIG.CLASSES.showNavigation)
      nextBtn.classList.remove(CONFIG.CLASSES.hidden)
      nextBtn.setAttribute('aria-hidden', 'false')

      prevBtn.classList.add(CONFIG.CLASSES.showNavigation)
      prevBtn.classList.remove(CONFIG.CLASSES.hidden)
      prevBtn.setAttribute('aria-hidden', 'false')

      updateButtonStates(swiper)
    } else {
      // Ocultar navegación
      nextBtn.classList.remove(CONFIG.CLASSES.showNavigation)
      nextBtn.classList.add(CONFIG.CLASSES.hidden)
      nextBtn.setAttribute('aria-hidden', 'true')

      prevBtn.classList.remove(CONFIG.CLASSES.showNavigation)
      prevBtn.classList.add(CONFIG.CLASSES.hidden)
      prevBtn.setAttribute('aria-hidden', 'true')
    }
  }

  /**
   * Actualiza los estados de los botones
   */
  function updateButtonStates(swiper) {
    const nextBtn = document.querySelector(CONFIG.SELECTORS.nextBtn)
    const prevBtn = document.querySelector(CONFIG.SELECTORS.prevBtn)

    if (!nextBtn || !prevBtn) return

    // Botón anterior
    if (swiper.isBeginning || !swiper.allowSlidePrev) {
      prevBtn.classList.add(CONFIG.CLASSES.disabled)
      prevBtn.style.opacity = '0.3'
      prevBtn.style.pointerEvents = 'none'
      prevBtn.setAttribute('aria-disabled', 'true')
    } else {
      prevBtn.classList.remove(CONFIG.CLASSES.disabled)
      prevBtn.style.opacity = '1'
      prevBtn.style.pointerEvents = 'auto'
      prevBtn.setAttribute('aria-disabled', 'false')
    }

    // Botón siguiente
    if (swiper.isEnd || !swiper.allowSlideNext) {
      nextBtn.classList.add(CONFIG.CLASSES.disabled)
      nextBtn.style.opacity = '0.3'
      nextBtn.style.pointerEvents = 'none'
      nextBtn.setAttribute('aria-disabled', 'true')
    } else {
      nextBtn.classList.remove(CONFIG.CLASSES.disabled)
      nextBtn.style.opacity = '1'
      nextBtn.style.pointerEvents = 'auto'
      nextBtn.setAttribute('aria-disabled', 'false')
    }

    // Asegurar visibilidad si la navegación está habilitada
    if (nextBtn.classList.contains(CONFIG.CLASSES.showNavigation)) {
      nextBtn.style.visibility = 'visible'
      nextBtn.style.display = 'flex'
    }
    if (prevBtn.classList.contains(CONFIG.CLASSES.showNavigation)) {
      prevBtn.style.visibility = 'visible'
      prevBtn.style.display = 'flex'
    }
  }

  /**
   * Inicializa el carrusel Swiper
   */
  function initializeSwiper() {
    // Destruir instancia existente
    if (systemState.swiperInstance) {
      systemState.swiperInstance.destroy(true, true)
      systemState.swiperInstance = null
    }

    // Buscar el elemento wrapper
    const element = document.querySelector(CONFIG.SELECTORS.wrapper)
    if (!element) {
      console.warn('DocentesDoctorado: Wrapper no encontrado')
      return
    }

    // Contar slides
    const slides = document.querySelectorAll(CONFIG.SELECTORS.slides)
    const totalSlides = slides.length

    if (totalSlides === 0) {
      console.log('DocentesDoctorado: No hay slides para mostrar')
      return
    }

    console.log('DocentesDoctorado: Inicializando con', totalSlides, 'slides')

    // Crear instancia de Swiper
    systemState.swiperInstance = new window.Swiper(CONFIG.SELECTORS.wrapper, {
      loop: false,
      spaceBetween: 20,
      watchOverflow: true,
      centeredSlides: false,
      grabCursor: true,
      allowTouchMove: totalSlides > 1,

      navigation: {
        nextEl: CONFIG.SELECTORS.nextBtn,
        prevEl: CONFIG.SELECTORS.prevBtn,
        disabledClass: CONFIG.CLASSES.disabled,
        hiddenClass: CONFIG.CLASSES.hidden
      },

      pagination: {
        el: CONFIG.SELECTORS.pagination,
        clickable: true,
        bulletClass: 'swiper-pagination-bullet',
        bulletActiveClass: CONFIG.CLASSES.active,
        renderBullet: function (index, className) {
          return '<span class="' + className + '" aria-label="Ir al slide ' + (index + 1) + '"></span>'
        }
      },

      // Breakpoints optimizados
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 10
        },
        [CONFIG.BREAKPOINTS.mobile]: {
          slidesPerView: Math.min(2, totalSlides),
          spaceBetween: 10
        },
        [CONFIG.BREAKPOINTS.tablet]: {
          slidesPerView: Math.min(3, totalSlides),
          spaceBetween: 10
        },
        [CONFIG.BREAKPOINTS.desktop]: {
          slidesPerView: Math.min(4, totalSlides),
          spaceBetween: 15
        },
        [CONFIG.BREAKPOINTS.large]: {
          slidesPerView: Math.min(4, totalSlides),
          spaceBetween: 20
        },
        [CONFIG.BREAKPOINTS.xlarge]: {
          slidesPerView: Math.min(5, totalSlides),
          spaceBetween: 20
        },
        [CONFIG.BREAKPOINTS.xxlarge]: {
          slidesPerView: Math.min(6, totalSlides),
          spaceBetween: 20
        }
      },

      // Event handlers
      on: {
        init: function () {
          console.log('DocentesDoctorado: Swiper inicializado')
          equalizeHeights()
          updateNavigationVisibility(this, totalSlides)
          updateButtonStates(this)
        },
        update: function () {
          equalizeHeights()
          updateNavigationVisibility(this, totalSlides)
          updateButtonStates(this)
        },
        resize: function () {
          setTimeout(() => {
            equalizeHeights()
            updateNavigationVisibility(this, totalSlides)
            updateButtonStates(this)
          }, 100)
        },
        breakpoint: function () {
          setTimeout(() => {
            updateNavigationVisibility(this, totalSlides)
            updateButtonStates(this)
          }, 150)
        },
        slideChange: function () {
          equalizeHeights()
          updateButtonStates(this)
        },
        reachBeginning: function () {
          updateButtonStates(this)
        },
        reachEnd: function () {
          updateButtonStates(this)
        }
      }
    })

    systemState.initialized = true
  }

  /* =====================
     GESTIÓN DE EVENTOS
  ===================== */

  /**
   * Configura el listener de resize
   */
  function setupResizeListener() {
    const handleResize = debounce(() => {
      equalizeHeights()
      if (systemState.swiperInstance) {
        systemState.swiperInstance.update()
      }
    }, 250)

    window.addEventListener('resize', handleResize)
  }

  /**
   * Reinicializa el sistema completo
   */
  function reinitializeSystem() {
    systemState.initialized = false
    waitForSwiper(initializeSwiper)
  }

  /* =====================
     INICIALIZACIÓN
  ===================== */

  /**
   * Función principal de inicialización
   */
  function init() {
    console.log('DocentesDoctorado: Inicializando sistema')

    // Configurar eventos
    setupResizeListener()

    // Inicializar Swiper
    waitForSwiper(initializeSwiper)

    // Integración con Liferay
    if (typeof Liferay !== 'undefined' && Liferay.on) {
      Liferay.on('allPortletsReady', () => {
        console.log('DocentesDoctorado: Portlets listos')
        setTimeout(reinitializeSystem, 250)
      })

      Liferay.on('fragmentEntryLinkEditableChanged', () => {
        console.log('DocentesDoctorado: Contenido editado')
        setTimeout(reinitializeSystem, 350)
      })
    }
  }

  /* =====================
     API PÚBLICA
  ===================== */

  // Exponer API pública
  window.DocentesDoctorado = {
    init: init,
    reinit: reinitializeSystem,
    equalizeHeights: equalizeHeights,
    updateNavigation: function () {
      if (systemState.swiperInstance) {
        const totalSlides = document.querySelectorAll(CONFIG.SELECTORS.slides).length
        updateNavigationVisibility(systemState.swiperInstance, totalSlides)
        updateButtonStates(systemState.swiperInstance)
      }
    },
    getInstance: () => systemState.swiperInstance,
    getState: () => ({ ...systemState })
  }

  // Función global para compatibilidad
  window.reinitDocentesCarousel = reinitializeSystem

  /* =====================
     AUTO-INICIALIZACIÓN
  ===================== */

  // Inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }

  // Fallbacks para diferentes entornos
  setTimeout(init, 100)
  setTimeout(init, 500)

  console.log('DocentesDoctorado: Script cargado')
})()
