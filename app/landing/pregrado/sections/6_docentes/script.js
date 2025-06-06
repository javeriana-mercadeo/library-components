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
      console.log('📦 Usando elemento fallback: .expert-swiper')
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
      loop: totalSlides > 4, // Solo loop si hay más de 4 slides
      spaceBetween: 10,
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
          slidesPerView: Math.min(4, totalSlides),
          spaceBetween: 20
        }
      },

      on: {
        init: function () {
          equalizeHeights()
          updateNavigationVisibility(this, totalSlides)
        },
        update: function () {
          equalizeHeights()
          updateNavigationVisibility(this, totalSlides)
        },
        resize: function () {
          setTimeout(() => {
            equalizeHeights()
            updateNavigationVisibility(this, totalSlides)
          }, 100)
        },
        slideChange: function () {
          equalizeHeights()
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

    // Si hay 4 o menos slides en desktop, ocultar botones
    const currentBreakpoint = window.innerWidth
    let maxVisibleSlides = 1

    if (currentBreakpoint >= 1024) {
      maxVisibleSlides = 4
    } else if (currentBreakpoint >= 768) {
      maxVisibleSlides = 3
    } else if (currentBreakpoint >= 550) {
      maxVisibleSlides = 2
    }

    const needsNavigation = totalSlides > maxVisibleSlides

    if (needsNavigation) {
      nextBtn.style.display = 'flex'
      prevBtn.style.display = 'flex'
      nextBtn.setAttribute('aria-hidden', 'false')
      prevBtn.setAttribute('aria-hidden', 'false')
    } else {
      nextBtn.style.display = 'none'
      prevBtn.style.display = 'none'
      nextBtn.setAttribute('aria-hidden', 'true')
      prevBtn.setAttribute('aria-hidden', 'true')
      console.log('❌ Navegación deshabilitada (todos los slides visibles)')
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

  // Re-ejecutar cuando cambie el tamaño de ventana
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
