export default () => {
  const initializeSwiper = () => {
    // Destruir instancia existente si existe
    if (window.socialCarouselSwiper) {
      window.socialCarouselSwiper.destroy(true, true)
    }

    // Buscar el elemento con la nueva clase
    const element = document.querySelector('.social-carousel_wrapper')
    if (!element) {
      console.warn('Elemento .social-carousel_wrapper no encontrado')
      const fallbackElement = document.querySelector('.social-swiper')
      if (!fallbackElement) {
        console.error('Ningún elemento swiper encontrado')
        return
      }
      console.log('📦 Usando elemento fallback: .social-swiper')
    }

    // Contar slides con la nueva clase
    const slides = document.querySelectorAll('.social-carousel_slide')
    const totalSlides = slides.length

    if (!window.Swiper) {
      console.error('Swiper no está disponible')
      return
    }

    // Usar la nueva clase como selector
    const swiperSelector = element ? '.social-carousel_wrapper' : '.social-swiper'

    window.socialCarouselSwiper = new window.Swiper(swiperSelector, {
      loop: false,
      spaceBetween: 20,
      watchOverflow: true,
      centeredSlides: false,
      grabCursor: true,
      // Forzar que siempre permita navegación si hay más de 1 slide
      allowTouchMove: totalSlides > 1,

      pagination: {
        el: '.social-carousel_pagination, .social-pagination',
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 1,
        renderBullet: function (index, className) {
          return `<span class="${className}" aria-label="Ir a slide ${index + 1}"></span>`
        }
      },

      navigation: {
        nextEl: '.social-carousel_next, .social-next',
        prevEl: '.social-carousel_prev, .social-prev',
        disabledClass: 'swiper-button-disabled',
        hiddenClass: 'swiper-button-hidden'
      },

      // Breakpoints optimizados para contenido social
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 15
        },
        576: {
          slidesPerView: Math.min(1, totalSlides),
          spaceBetween: 20
        },
        768: {
          slidesPerView: Math.min(2, totalSlides),
          spaceBetween: 25
        },
        1024: {
          slidesPerView: Math.min(2, totalSlides), // Máximo 2 en desktop para posts de IG
          spaceBetween: 30
        },
        1280: {
          slidesPerView: Math.min(3, totalSlides), // Máximo 3 en pantallas grandes
          spaceBetween: 30
        }
      },

      on: {
        init: function () {
          updateNavigationDisplay(this, totalSlides)
          updateButtonStates(this)
          // Procesar embeds de Instagram después de la inicialización
          processInstagramEmbeds()
        },
        update: function () {
          updateNavigationDisplay(this, totalSlides)
          updateButtonStates(this)
        },
        resize: function () {
          setTimeout(() => {
            updateNavigationDisplay(this, totalSlides)
            updateButtonStates(this)
          }, 100)
        },
        breakpoint: function () {
          setTimeout(() => {
            updateNavigationDisplay(this, totalSlides)
            updateButtonStates(this)
          }, 150)
        },
        slideChange: function () {
          updateButtonStates(this)
          // Procesar embeds al cambiar de slide
          processInstagramEmbeds()
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

  const processInstagramEmbeds = () => {
    // Procesar embeds de Instagram
    if (typeof window !== 'undefined' && window.instgrm) {
      try {
        window.instgrm.Embeds.process()
      } catch (error) {
        console.warn('Error procesando embeds de Instagram:', error)
      }
    }
  }

  // Nueva función unificada para controlar toda la navegación
  const updateNavigationDisplay = (swiper, totalSlides) => {
    const carousel = document.querySelector('.social-carousel')
    const nextBtn = document.querySelector('.social-carousel_next') || document.querySelector('.social-next')
    const prevBtn = document.querySelector('.social-carousel_prev') || document.querySelector('.social-prev')
    const pagination = document.querySelector('.social-carousel_pagination') || document.querySelector('.social-pagination')

    if (!nextBtn || !prevBtn || !pagination) {
      console.warn('Elementos de navegación no encontrados')
      return
    }

    // Si hay solo 1 slide, mostrar indicadores y ocultar botones
    if (totalSlides === 1) {
      showPaginationOnly(carousel, nextBtn, prevBtn, pagination)
      console.log('🔘 Solo paginación - 1 slide')
    } 
    // Si hay más de 1 slide, mostrar botones y ocultar indicadores
    else if (totalSlides > 1) {
      showButtonsOnly(carousel, nextBtn, prevBtn, pagination)
      console.log('⬅️➡️ Solo botones - slides:', totalSlides)
    }
    // Si no hay slides, ocultar todo
    else {
      hideAllNavigation(carousel, nextBtn, prevBtn, pagination)
      console.log('❌ Sin navegación - no hay slides')
    }
  }

  const hideAllNavigation = (carousel, nextBtn, prevBtn, pagination) => {
    // Remover clases de control
    carousel?.classList.remove('show-pagination-only', 'show-buttons-only')
    
    // Ocultar paginación
    pagination.style.display = 'none'
    pagination.style.opacity = '0'
    pagination.style.visibility = 'hidden'
    pagination.classList.add('swiper-pagination-hidden')
    pagination.setAttribute('aria-hidden', 'true')
    
    // Ocultar botones
    nextBtn.style.display = 'none'
    nextBtn.style.opacity = '0'
    nextBtn.style.visibility = 'hidden'
    nextBtn.classList.remove('show-navigation')
    nextBtn.classList.add('swiper-button-hidden')
    nextBtn.setAttribute('aria-hidden', 'true')
    
    prevBtn.style.display = 'none'
    prevBtn.style.opacity = '0'
    prevBtn.style.visibility = 'hidden'
    prevBtn.classList.remove('show-navigation')
    prevBtn.classList.add('swiper-button-hidden')
    prevBtn.setAttribute('aria-hidden', 'true')
  }

  const showPaginationOnly = (carousel, nextBtn, prevBtn, pagination) => {
    // Agregar clase de control
    carousel?.classList.add('show-pagination-only')
    carousel?.classList.remove('show-buttons-only')
    
    // Mostrar paginación
    pagination.style.display = 'flex'
    pagination.style.opacity = '1'
    pagination.style.visibility = 'visible'
    pagination.classList.remove('swiper-pagination-hidden')
    pagination.setAttribute('aria-hidden', 'false')
    
    // Configurar bullets
    const bullets = pagination.querySelectorAll('.swiper-pagination-bullet')
    bullets.forEach((bullet, index) => {
      bullet.setAttribute('aria-label', `Ir a slide ${index + 1}`)
      bullet.style.display = 'block'
    })
    
    // Ocultar botones
    nextBtn.style.display = 'none'
    nextBtn.style.opacity = '0'
    nextBtn.style.visibility = 'hidden'
    nextBtn.classList.remove('show-navigation')
    nextBtn.classList.add('swiper-button-hidden')
    nextBtn.setAttribute('aria-hidden', 'true')
    
    prevBtn.style.display = 'none'
    prevBtn.style.opacity = '0'
    prevBtn.style.visibility = 'hidden'
    prevBtn.classList.remove('show-navigation')
    prevBtn.classList.add('swiper-button-hidden')
    prevBtn.setAttribute('aria-hidden', 'true')
  }

  const showButtonsOnly = (carousel, nextBtn, prevBtn, pagination) => {
    // Agregar clase de control
    carousel?.classList.add('show-buttons-only')
    carousel?.classList.remove('show-pagination-only')
    
    // Ocultar paginación
    pagination.style.display = 'none'
    pagination.style.opacity = '0'
    pagination.style.visibility = 'hidden'
    pagination.classList.add('swiper-pagination-hidden')
    pagination.setAttribute('aria-hidden', 'true')
    
    // Mostrar botones
    nextBtn.style.display = 'flex'
    nextBtn.style.opacity = '1'
    nextBtn.style.visibility = 'visible'
    nextBtn.classList.add('show-navigation')
    nextBtn.classList.remove('swiper-button-hidden')
    nextBtn.setAttribute('aria-hidden', 'false')
    
    prevBtn.style.display = 'flex'
    prevBtn.style.opacity = '1'
    prevBtn.style.visibility = 'visible'
    prevBtn.classList.add('show-navigation')
    prevBtn.classList.remove('swiper-button-hidden')
    prevBtn.setAttribute('aria-hidden', 'false')
  }

  const updateButtonStates = swiper => {
    const nextBtn = document.querySelector('.social-carousel_next') || document.querySelector('.social-next')
    const prevBtn = document.querySelector('.social-carousel_prev') || document.querySelector('.social-prev')

    if (!nextBtn || !prevBtn) return

    // Solo actualizar estados si los botones están visibles
    const buttonsVisible = nextBtn.classList.contains('show-navigation')
    
    if (!buttonsVisible) return

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
      if (window.socialCarouselSwiper) {
        window.socialCarouselSwiper.update()
      }
    }, 250)
  })
}