export default () => {
  const initializeSwiper = () => {
    // Destruir instancia existente si existe
    if (window.planEstudioSwiper && typeof window.planEstudioSwiper.destroy === 'function') {
      window.planEstudioSwiper.destroy(true, true)
    }

    // Buscar el elemento con la nueva clase
    const element = document.querySelector('.plan-estudio_wrapper')
    if (!element) {
      console.warn('Elemento .plan-estudio_wrapper no encontrado')
      const fallbackElement = document.querySelector('.subjects-swiper')
      if (!fallbackElement) {
        console.error('Ningún elemento swiper encontrado')
        return
      }
    }

    // Contar slides con la nueva clase
    const slides = document.querySelectorAll('.plan-estudio_slide')
    const totalSlides = slides.length

    if (!window.Swiper) {
      console.error('Swiper no está disponible')
      return
    }

    // Usar la nueva clase como selector
    const swiperSelector = element ? '.plan-estudio_wrapper' : '.subjects-swiper'

    window.planEstudioSwiper = new window.Swiper(swiperSelector, {
      loop: false,
      spaceBetween: 20,
      watchOverflow: true,
      centeredSlides: false,
      grabCursor: true,
      // Forzar que siempre permita navegación si hay más de 1 slide
      allowTouchMove: totalSlides > 1,

      pagination: {
        el: '.plan-estudio_pagination, .subjects-pagination',
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 1,
        renderBullet: function (index, className) {
          return `<span class="${className}" aria-label="Ir a slide ${index + 1}"></span>`
        }
      },

      navigation: {
        nextEl: '.plan-estudio_next, .subjects-next',
        prevEl: '.plan-estudio_prev, .subjects-prev',
        disabledClass: 'swiper-button-disabled',
        hiddenClass: 'swiper-button-hidden'
      },

      // Breakpoints mejorados
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        576: {
          slidesPerView: Math.min(1, totalSlides),
          spaceBetween: 20
        },
        768: {
          slidesPerView: Math.min(2, totalSlides),
          spaceBetween: 20
        },
        1024: {
          slidesPerView: Math.min(3, totalSlides),
          spaceBetween: 25
        },
        1280: {
          slidesPerView: Math.min(4, totalSlides),
          spaceBetween: 25
        }
      },

      on: {
        init: function () {
          updateNavigationVisibility(this, totalSlides)
          updatePaginationVisibility(this, totalSlides)
          updateButtonStates(this)
        },
        update: function () {
          updateNavigationVisibility(this, totalSlides)
          updatePaginationVisibility(this, totalSlides)
          updateButtonStates(this)
        },
        resize: function () {
          setTimeout(() => {
            updateNavigationVisibility(this, totalSlides)
            updatePaginationVisibility(this, totalSlides)
            updateButtonStates(this)
          }, 100)
        },
        breakpoint: function () {
          setTimeout(() => {
            updateNavigationVisibility(this, totalSlides)
            updatePaginationVisibility(this, totalSlides)
            updateButtonStates(this)
          }, 150)
        },
        slideChange: function () {
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

  const updateNavigationVisibility = (swiper, totalSlides) => {
    const nextBtn = document.querySelector('.plan-estudio_next') || document.querySelector('.subjects-next')
    const prevBtn = document.querySelector('.plan-estudio_prev') || document.querySelector('.subjects-prev')

    if (!nextBtn || !prevBtn) {
      console.warn('Botones de navegación no encontrados')
      return
    }

    // Lógica mejorada
    // Si hay más de 1 slide, siempre mostrar los botones
    // Los botones individuales se controlarán en updateButtonStates
    const needsNavigation = totalSlides > 1

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
      // Solo si hay 1 slide o menos, ocultar completamente
      nextBtn.classList.remove('show-navigation')
      nextBtn.classList.add('swiper-button-hidden')
      nextBtn.setAttribute('aria-hidden', 'true')

      prevBtn.classList.remove('show-navigation')
      prevBtn.classList.add('swiper-button-hidden')
      prevBtn.setAttribute('aria-hidden', 'true')
    }
  }

  const updateButtonStates = swiper => {
    const nextBtn = document.querySelector('.plan-estudio_next') || document.querySelector('.subjects-next')
    const prevBtn = document.querySelector('.plan-estudio_prev') || document.querySelector('.subjects-prev')

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

  const updatePaginationVisibility = (swiper, totalSlides) => {
    const pagination = document.querySelector('.plan-estudio_pagination') || document.querySelector('.subjects-pagination')

    if (!pagination) {
      console.warn('Paginación no encontrada')
      return
    }

    // Mostrar paginación si hay más de 1 slide
    const needsPagination = totalSlides > 1

    if (needsPagination) {
      pagination.style.display = 'flex'
      pagination.classList.remove('swiper-pagination-hidden')
      pagination.setAttribute('aria-hidden', 'false')

      const bullets = pagination.querySelectorAll('.swiper-pagination-bullet')
      bullets.forEach((bullet, index) => {
        bullet.setAttribute('aria-label', `Ir a slide ${index + 1}`)
        bullet.style.display = 'block'
      })
    } else {
      pagination.style.display = 'none'
      pagination.classList.add('swiper-pagination-hidden')
      pagination.setAttribute('aria-hidden', 'true')
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
      if (window.planEstudioSwiper && typeof window.planEstudioSwiper.update === 'function') {
        window.planEstudioSwiper.update()
      }
    }, 250)
  })
}
