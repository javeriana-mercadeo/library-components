export default () => {
  const initializeSwiper = () => {
    // Destruir instancia existente si existe
    if (window.investigationsSwiper && typeof window.investigationsSwiper.destroy === 'function') {
      window.investigationsSwiper.destroy(true, true)
    }

    // Buscar el elemento con la clase especifica
    const element = document.querySelector('.investigations_wrapper')
    if (!element) {
      console.warn('Elemento .investigations_wrapper no encontrado')
      const fallbackElement = document.querySelector('.investigations-swiper')
      if (!fallbackElement) {
        console.error('Ningun elemento swiper encontrado')
        return
      }
    }

    // Contar slides
    const slides = document.querySelectorAll('.investigations_slide')
    const totalSlides = slides.length

    if (!window.Swiper) {
      console.error('Swiper no esta disponible')
      return
    }

    // Usar selector correcto
    const swiperSelector = element ? '.investigations_wrapper' : '.investigations-swiper'

    window.investigationsSwiper = new window.Swiper(swiperSelector, {
      // ==========================================
      // CONFIGURACION FREEMODE
      // ==========================================
      freeMode: {
        enabled: true,
        sticky: true,
        momentumBounce: false,
        momentumVelocityRatio: 0.5
      },
      
      // ==========================================
      // CONFIGURACION BASICA
      // ==========================================
      loop: false,
      spaceBetween: 25,
      slidesPerView: 'auto',
      watchOverflow: true,
      centeredSlides: false,
      grabCursor: true,
      allowTouchMove: true,

      // ==========================================
      // NAVEGACION
      // ==========================================
      navigation: {
        nextEl: '.investigations_next',
        prevEl: '.investigations_prev',
        disabledClass: 'swiper-button-disabled',
        hiddenClass: 'swiper-button-hidden'
      },

      // ==========================================
      // BREAKPOINTS RESPONSIVOS
      // ==========================================
      breakpoints: {
        // Mobile: Solo 1 slide visible
        0: {
          slidesPerView: 1,
          spaceBetween: 20,
          freeMode: {
            enabled: false // Desactivar freemode en movil
          }
        },
        // Tablet pequena: 1.5 slides visibles
        576: {
          slidesPerView: 1.5,
          spaceBetween: 20,
          freeMode: {
            enabled: true,
            sticky: false
          }
        },
        // Tablet: 2 slides visibles
        768: {
          slidesPerView: 2,
          spaceBetween: 25,
          freeMode: {
            enabled: true,
            sticky: true
          }
        },
        // Desktop: Layout especifico (1 main + partes de secondary)
        1024: {
          slidesPerView: 'auto',
          spaceBetween: 25,
          freeMode: {
            enabled: true,
            sticky: true,
            momentumBounce: false
          }
        }
      },

      // ==========================================
      // EVENTOS
      // ==========================================
      on: {
        init: function(swiper) {
          console.log('[INVESTIGATIONS] Swiper inicializado con', totalSlides, 'slides')
          updateNavigationVisibility(swiper, totalSlides)
          updateButtonStates(swiper)
        },
        
        update: function(swiper) {
          updateNavigationVisibility(swiper, totalSlides)
          updateButtonStates(swiper)
        },
        
        resize: function(swiper) {
          setTimeout(() => {
            updateNavigationVisibility(swiper, totalSlides)
            updateButtonStates(swiper)
          }, 100)
        },
        
        slideChange: function(swiper) {
          updateButtonStates(swiper)
        },
        
        reachBeginning: function(swiper) {
          updateButtonStates(swiper)
        },
        
        reachEnd: function(swiper) {
          updateButtonStates(swiper)
        },

        // Eventos especificos de freeMode
        freeModeNoMomentumRelease: function(swiper) {
          updateButtonStates(swiper)
        },

        setTransition: function(swiper, duration) {
          // Suavizar transiciones en freemode
          if (duration > 0) {
            const slides = swiper.slides
            for (let i = 0; i < slides.length; i++) {
              slides[i].style.transitionDuration = duration + 'ms'
            }
          }
        }
      }
    })
  }

  // ==========================================
  // FUNCIONES DE CONTROL DE NAVEGACION
  // ==========================================
  const updateNavigationVisibility = (swiper, totalSlides) => {
    const nextBtn = document.querySelector('.investigations_next')
    const prevBtn = document.querySelector('.investigations_prev')

    if (!nextBtn || !prevBtn) {
      console.warn('Botones de navegacion no encontrados')
      return
    }

    // Mostrar navegacion si hay mas de 1 slide
    const needsNavigation = totalSlides > 1

    if (needsNavigation) {
      nextBtn.classList.add('show-navigation')
      nextBtn.classList.remove('swiper-button-hidden')
      nextBtn.setAttribute('aria-hidden', 'false')

      prevBtn.classList.add('show-navigation')
      prevBtn.classList.remove('swiper-button-hidden')
      prevBtn.setAttribute('aria-hidden', 'false')
      
      updateButtonStates(swiper)
    } else {
      nextBtn.classList.remove('show-navigation')
      nextBtn.classList.add('swiper-button-hidden')
      nextBtn.setAttribute('aria-hidden', 'true')

      prevBtn.classList.remove('show-navigation')
      prevBtn.classList.add('swiper-button-hidden')
      prevBtn.setAttribute('aria-hidden', 'true')
    }
  }

  const updateButtonStates = (swiper) => {
    const nextBtn = document.querySelector('.investigations_next')
    const prevBtn = document.querySelector('.investigations_prev')

    if (!nextBtn || !prevBtn) return

    // En freeMode, la logica es diferente
    const isBeginning = swiper.isBeginning
    const isEnd = swiper.isEnd
    const allowSlideNext = swiper.allowSlideNext
    const allowSlidePrev = swiper.allowSlidePrev

    // Boton anterior
    if (isBeginning || !allowSlidePrev) {
      prevBtn.classList.add('swiper-button-disabled')
      prevBtn.style.opacity = '0.3'
      prevBtn.style.pointerEvents = 'none'
      prevBtn.setAttribute('aria-disabled', 'true')
    } else {
      prevBtn.classList.remove('swiper-button-disabled')
      prevBtn.style.opacity = '1'
      prevBtn.style.pointerEvents = 'auto'
      prevBtn.setAttribute('aria-disabled', 'false')
    }

    // Boton siguiente
    if (isEnd || !allowSlideNext) {
      nextBtn.classList.add('swiper-button-disabled')
      nextBtn.style.opacity = '0.3'
      nextBtn.style.pointerEvents = 'none'
      nextBtn.setAttribute('aria-disabled', 'true')
    } else {
      nextBtn.classList.remove('swiper-button-disabled')
      nextBtn.style.opacity = '1'
      nextBtn.style.pointerEvents = 'auto'
      nextBtn.setAttribute('aria-disabled', 'false')
    }

    // Asegurar visibilidad si la navegacion esta habilitada
    if (nextBtn.classList.contains('show-navigation')) {
      nextBtn.style.visibility = 'visible'
      nextBtn.style.display = 'flex'
    }
    if (prevBtn.classList.contains('show-navigation')) {
      prevBtn.style.visibility = 'visible'
      prevBtn.style.display = 'flex'
    }
  }

  // ==========================================
  // INICIALIZACION
  // ==========================================
  const checkAndInit = () => {
    if (typeof window !== 'undefined' && window.Swiper) {
      initializeSwiper()
    } else {
      setTimeout(checkAndInit, 300)
    }
  }

  checkAndInit()

  // Manejar resize con debounce
  let resizeTimeout
  window.addEventListener('resize', () => {
    if (resizeTimeout) {
      clearTimeout(resizeTimeout)
    }

    resizeTimeout = setTimeout(() => {
      if (window.investigationsSwiper && typeof window.investigationsSwiper.update === 'function') {
        window.investigationsSwiper.update()
      }
    }, 250)
  })
}