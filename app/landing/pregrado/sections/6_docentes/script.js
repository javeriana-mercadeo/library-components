export default () => {
  const initializeSwiper = () => {
    // Destruir instancia existente si existe
    if (window.expertSwiper) {
      window.expertSwiper.destroy(true, true)
    }

    // Buscar el elemento
    const element = document.querySelector('.expert-carousel_wrapper')
    if (!element) {
      console.warn('Elemento .expert-carousel_wrapper no encontrado')
      const fallbackElement = document.querySelector('.expert-swiper')
      if (!fallbackElement) {
        console.error('Ningún elemento swiper encontrado')
        return
      }
    }

    // Contar slides
    const slides = document.querySelectorAll('.expert-carousel_slide')
    const totalSlides = slides.length

    if (!window.Swiper) {
      console.error('Swiper no está disponible')
      return
    }

    // Usar la clase como selector
    const swiperSelector = element ? '.expert-carousel_wrapper' : '.expert-swiper'

    window.expertSwiper = new window.Swiper(swiperSelector, {
      loop: false,
      spaceBetween: 20,
      watchOverflow: true,
      centeredSlides: false,
      grabCursor: true,
      allowTouchMove: totalSlides > 1,

      navigation: {
        nextEl: '.expert-carousel_next, .expert-next',
        prevEl: '.expert-carousel_prev, .expert-prev',
        disabledClass: 'swiper-button-disabled',
        hiddenClass: 'swiper-button-hidden'
      },

      // Breakpoints optimizados
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 10
        },
        550: {
          slidesPerView: Math.min(2, totalSlides),
          spaceBetween: 10
        },
        768: {
          slidesPerView: Math.min(3, totalSlides),
          spaceBetween: 15
        },
        1024: {
          slidesPerView: Math.min(4, totalSlides),
          spaceBetween: 20
        },
        1200: {
          slidesPerView: Math.min(5, totalSlides),
          spaceBetween: 20
        },
        1440: {
          slidesPerView: Math.min(6, totalSlides),
          spaceBetween: 20
        }
      },

      on: {
        init: function () {
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
  }

  const equalizeHeights = () => {
    let cards = document.querySelectorAll('.expert-carousel_card')
    let maxHeight = 0

    // Restablecer la altura para evitar acumulación
    cards.forEach(card => {
      card.style.height = 'auto'
      let height = card.offsetHeight
      if (height > maxHeight) {
        maxHeight = height
      }
    })

    // Aplicar la altura máxima a todas las tarjetas
    cards.forEach(card => {
      card.style.height = maxHeight + 'px'
    })
  }

  const updateNavigationVisibility = (swiper, totalSlides) => {
    const nextBtn = document.querySelector('.expert-carousel_next') || document.querySelector('.expert-next')
    const prevBtn = document.querySelector('.expert-carousel_prev') || document.querySelector('.expert-prev')

    if (!nextBtn || !prevBtn) {
      console.warn('Botones de navegación no encontrados')
      return
    }

    // Obtener los slides visibles actuales desde la instancia de swiper
    const slidesPerView = swiper.params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : swiper.params.slidesPerView

    // Si todos los slides son visibles, ocultar navegación
    const needsNavigation = totalSlides > slidesPerView

    if (needsNavigation) {
      // Mostrar contenedor de botones
      nextBtn.classList.add('show-navigation')
      nextBtn.classList.remove('swiper-button-hidden')
      nextBtn.setAttribute('aria-hidden', 'false')

      prevBtn.classList.add('show-navigation')
      prevBtn.classList.remove('swiper-button-hidden')
      prevBtn.setAttribute('aria-hidden', 'false')

      updateButtonStates(swiper)
    } else {
      // Ocultar completamente si todos los slides son visibles
      nextBtn.classList.remove('show-navigation')
      nextBtn.classList.add('swiper-button-hidden')
      nextBtn.setAttribute('aria-hidden', 'true')

      prevBtn.classList.remove('show-navigation')
      prevBtn.classList.add('swiper-button-hidden')
      prevBtn.setAttribute('aria-hidden', 'true')
    }
  }

  const updateButtonStates = swiper => {
    const nextBtn = document.querySelector('.expert-carousel_next') || document.querySelector('.expert-next')
    const prevBtn = document.querySelector('.expert-carousel_prev') || document.querySelector('.expert-prev')

    if (!nextBtn || !prevBtn) return

    // Verificar si los botones deben estar activos
    const isBeginning = swiper.isBeginning
    const isEnd = swiper.isEnd
    const allowSlideNext = swiper.allowSlideNext
    const allowSlidePrev = swiper.allowSlidePrev

    // Botón anterior
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

    // Botón siguiente
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

    // Asegurar visibilidad si la navegación está habilitada
    if (nextBtn.classList.contains('show-navigation')) {
      nextBtn.style.visibility = 'visible'
      nextBtn.style.display = 'flex'
    }
    if (prevBtn.classList.contains('show-navigation')) {
      prevBtn.style.visibility = 'visible'
      prevBtn.style.display = 'flex'
    }
  }

  const checkAndInit = () => {
    if (typeof window !== 'undefined' && window.Swiper) {
      initializeSwiper()
    } else {
      setTimeout(checkAndInit, 300)
    }
  }

  checkAndInit()

  let resizeTimeout
  window.addEventListener('resize', () => {
    if (resizeTimeout) {
      clearTimeout(resizeTimeout)
    }

    resizeTimeout = setTimeout(() => {
      equalizeHeights()
      if (window.expertSwiper) {
        window.expertSwiper.update()
      }
    }, 250)
  })
}
