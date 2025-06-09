export default () => {
  const initializeSwiper = () => {
    // Destruir instancia existente si existe
    if (window.relatedProgramsSwiper) {
      window.relatedProgramsSwiper.destroy(true, true)
    }

    // Buscar el elemento con la clase específica
    const element = document.querySelector('.related-programs-swiper')
    if (!element) {
      console.warn('Elemento .related-programs-swiper no encontrado')
      const fallbackElement = document.querySelector('.card-wrapper')
      if (!fallbackElement) {
        console.error('Ningún elemento swiper encontrado en programas relacionados')
        return
      }
      console.log('📦 Usando elemento fallback: .card-wrapper')
    }

    // Contar slides con la clase específica
    const slides = document.querySelectorAll('.card-item')
    const totalSlides = slides.length

    if (!window.Swiper) {
      console.error('Swiper no está disponible')
      return
    }

    // Usar la clase específica como selector
    const swiperSelector = element ? '.related-programs-swiper' : '.card-wrapper'

    console.log(`🎯 Inicializando Swiper de Programas Relacionados con ${totalSlides} slides`)

    window.relatedProgramsSwiper = new window.Swiper(swiperSelector, {
      loop: true, // Siempre infinito
      loopAdditionalSlides: 2, // Slides adicionales para mejor loop
      loopedSlides: totalSlides, // Especificar número de slides para el loop
      spaceBetween: 20,
      watchOverflow: false, // Desactivar para permitir loop siempre
      centeredSlides: false,
      grabCursor: true,
      allowTouchMove: true, // Siempre permitir navegación táctil
      resistanceRatio: 0, // Sin resistencia en los bordes

      pagination: {
        el: '.related-programs-pagination',
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 1,
        renderBullet: function (index, className) {
          return `<span class="${className}" aria-label="Ir al programa ${index + 1}"></span>`
        }
      },

      navigation: {
        nextEl: '.related-programs-next',
        prevEl: '.related-programs-prev',
        disabledClass: 'swiper-button-disabled',
        hiddenClass: 'swiper-button-hidden'
      },

      // Breakpoints optimizados para tarjetas de programas
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 20,
          centeredSlides: true
        },
        576: {
          slidesPerView: 1,
          spaceBetween: 20,
          centeredSlides: false
        },
        768: {
          slidesPerView: Math.min(2, totalSlides),
          spaceBetween: 20,
          centeredSlides: false
        },
        1024: {
          slidesPerView: Math.min(3, totalSlides),
          spaceBetween: 25,
          centeredSlides: false
        },
        1280: {
          slidesPerView: Math.min(4, totalSlides),
          spaceBetween: 30,
          centeredSlides: false
        }
      },

      on: {
        init: function () {
          console.log('✅ Swiper infinito de Programas Relacionados inicializado')
          updateNavigationVisibility(this, totalSlides)
          updatePaginationVisibility(this, totalSlides)
          updateButtonStates(this)
          addKeyboardNavigation(this)
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
          announceSlideChange(this)
        }
      }
    })
  }

  const updateNavigationVisibility = (swiper, totalSlides) => {
    const nextBtn = document.querySelector('.related-programs-next')
    const prevBtn = document.querySelector('.related-programs-prev')

    if (!nextBtn || !prevBtn) {
      console.warn('Botones de navegación de programas relacionados no encontrados')
      return
    }

    // Obtener slides visibles en el breakpoint actual
    const currentBreakpoint = getCurrentBreakpoint()
    const slidesPerView = getSlidesPerView(currentBreakpoint, totalSlides)
    
    // Si hay más slides que los visibles, mostrar navegación
    const needsNavigation = totalSlides > slidesPerView

    if (needsNavigation) {
      // Mostrar contenedor de botones
      nextBtn.classList.add('show-navigation')
      nextBtn.classList.remove('swiper-button-hidden')
      nextBtn.setAttribute('aria-hidden', 'false')
      nextBtn.style.display = 'flex'

      prevBtn.classList.add('show-navigation')
      prevBtn.classList.remove('swiper-button-hidden')
      prevBtn.setAttribute('aria-hidden', 'false')
      prevBtn.style.display = 'flex'

      console.log(`✅ Navegación habilitada (${totalSlides} slides, ${slidesPerView} visibles)`)
      updateButtonStates(swiper)
    } else {
      // Ocultar navegación si no es necesaria
      nextBtn.classList.remove('show-navigation')
      nextBtn.classList.add('swiper-button-hidden')
      nextBtn.setAttribute('aria-hidden', 'true')
      nextBtn.style.display = 'none'

      prevBtn.classList.remove('show-navigation')
      prevBtn.classList.add('swiper-button-hidden')
      prevBtn.setAttribute('aria-hidden', 'true')
      prevBtn.style.display = 'none'

      console.log('❌ Navegación deshabilitada (todos los slides visibles)')
    }
  }

  const updateButtonStates = swiper => {
    const nextBtn = document.querySelector('.related-programs-next')
    const prevBtn = document.querySelector('.related-programs-prev')

    if (!nextBtn || !prevBtn) return

    // Con loop infinito, los botones SIEMPRE están activos
    // Solo verificamos si hay múltiples slides para mostrar navegación
    const totalRealSlides = swiper.slides.filter(slide => 
      !slide.classList.contains('swiper-slide-duplicate')
    ).length

    if (totalRealSlides > 1) {
      // Botón anterior - SIEMPRE activo con loop infinito
      prevBtn.classList.remove('swiper-button-disabled')
      prevBtn.style.opacity = '1'
      prevBtn.style.pointerEvents = 'auto'
      prevBtn.setAttribute('aria-disabled', 'false')
      prevBtn.setAttribute('title', 'Ver programas anteriores')

      // Botón siguiente - SIEMPRE activo con loop infinito
      nextBtn.classList.remove('swiper-button-disabled')
      nextBtn.style.opacity = '1'
      nextBtn.style.pointerEvents = 'auto'
      nextBtn.setAttribute('aria-disabled', 'false')
      nextBtn.setAttribute('title', 'Ver más programas')

      console.log('🎮 Botones de navegación activos (loop infinito)')
    } else {
      // Solo deshabilitar si hay 1 slide o menos
      prevBtn.classList.add('swiper-button-disabled')
      prevBtn.style.opacity = '0.4'
      prevBtn.style.pointerEvents = 'none'
      prevBtn.setAttribute('aria-disabled', 'true')
      prevBtn.setAttribute('title', 'Solo hay un programa')

      nextBtn.classList.add('swiper-button-disabled')
      nextBtn.style.opacity = '0.4'
      nextBtn.style.pointerEvents = 'none'
      nextBtn.setAttribute('aria-disabled', 'true')
      nextBtn.setAttribute('title', 'Solo hay un programa')

      console.log('❌ Botones deshabilitados (solo 1 slide)')
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
    const pagination = document.querySelector('.related-programs-pagination')

    if (!pagination) {
      console.warn('Paginación de programas relacionados no encontrada')
      return
    }

    // Obtener slides visibles en el breakpoint actual
    const currentBreakpoint = getCurrentBreakpoint()
    const slidesPerView = getSlidesPerView(currentBreakpoint, totalSlides)
    
    // Mostrar paginación si hay más slides que los visibles
    const needsPagination = totalSlides > slidesPerView

    if (needsPagination) {
      pagination.style.display = 'flex'
      pagination.classList.remove('swiper-pagination-hidden')
      pagination.setAttribute('aria-hidden', 'false')
      pagination.setAttribute('aria-label', 'Navegación de programas relacionados')

      const bullets = pagination.querySelectorAll('.swiper-pagination-bullet')
      bullets.forEach((bullet, index) => {
        bullet.setAttribute('aria-label', `Ir al grupo de programas ${index + 1}`)
        bullet.style.display = 'block'
      })

      console.log('✅ Paginación habilitada')
    } else {
      pagination.style.display = 'none'
      pagination.classList.add('swiper-pagination-hidden')
      pagination.setAttribute('aria-hidden', 'true')
      console.log('❌ Paginación oculta (todos los slides visibles)')
    }
  }

  // Funciones auxiliares
  const getCurrentBreakpoint = () => {
    const width = window.innerWidth
    if (width >= 1280) return '1280'
    if (width >= 1024) return '1024'
    if (width >= 768) return '768'
    if (width >= 576) return '576'
    return '0'
  }

  const getSlidesPerView = (breakpoint, totalSlides) => {
    const breakpointConfig = {
      '0': 1,
      '576': 1,
      '768': Math.min(2, totalSlides),
      '1024': Math.min(3, totalSlides),
      '1280': Math.min(4, totalSlides)
    }
    return Math.floor(breakpointConfig[breakpoint] || 1)
  }

  const addKeyboardNavigation = (swiper) => {
    const swiperContainer = document.querySelector('.related-programs-swiper')
    if (!swiperContainer) return

    swiperContainer.setAttribute('tabindex', '0')
    swiperContainer.setAttribute('aria-label', 'Carrusel de programas relacionados')
    
    swiperContainer.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          swiper.slidePrev()
          break
        case 'ArrowRight':
          e.preventDefault()
          swiper.slideNext()
          break
        case 'Home':
          e.preventDefault()
          swiper.slideTo(0)
          break
        case 'End':
          e.preventDefault()
          swiper.slideTo(swiper.slides.length - 1)
          break
      }
    })
  }

  const announceSlideChange = (swiper) => {
    // Con loop infinito, usar realIndex para el índice real
    const currentSlide = swiper.realIndex + 1
    const totalSlides = swiper.slides.filter(slide => !slide.classList.contains('swiper-slide-duplicate')).length
    
    // Crear anuncio para lectores de pantalla
    const announcement = `Programa ${currentSlide} de ${totalSlides}`
    
    // Usar aria-live region si existe
    let liveRegion = document.querySelector('.sr-live-region')
    if (!liveRegion) {
      liveRegion = document.createElement('div')
      liveRegion.className = 'sr-live-region'
      liveRegion.setAttribute('aria-live', 'polite')
      liveRegion.setAttribute('aria-atomic', 'true')
      liveRegion.style.position = 'absolute'
      liveRegion.style.left = '-10000px'
      liveRegion.style.width = '1px'
      liveRegion.style.height = '1px'
      liveRegion.style.overflow = 'hidden'
      document.body.appendChild(liveRegion)
    }
    
    liveRegion.textContent = announcement
    
    console.log(`🎯 Slide actual: ${currentSlide}/${totalSlides} (realIndex: ${swiper.realIndex}, activeIndex: ${swiper.activeIndex})`)
  }

  const checkAndInit = () => {
    if (typeof window !== 'undefined' && window.Swiper) {
      initializeSwiper()
    } else {
      console.log('⏳ Esperando que Swiper esté disponible...')
      setTimeout(checkAndInit, 300)
    }
  }

  // Inicialización
  checkAndInit()

  // Manejo de resize con debounce
  let resizeTimeout
  window.addEventListener('resize', () => {
    if (resizeTimeout) {
      clearTimeout(resizeTimeout)
    }

    resizeTimeout = setTimeout(() => {
      if (window.relatedProgramsSwiper) {
        console.log('🔄 Actualizando Swiper tras resize')
        window.relatedProgramsSwiper.update()
      }
    }, 250)
  })

  // Cleanup cuando se destruya el componente
  return () => {
    if (window.relatedProgramsSwiper) {
      window.relatedProgramsSwiper.destroy(true, true)
      window.relatedProgramsSwiper = null
    }
    
    if (resizeTimeout) {
      clearTimeout(resizeTimeout)
    }
    
    // Remover live region si existe
    const liveRegion = document.querySelector('.sr-live-region')
    if (liveRegion) {
      liveRegion.remove()
    }
  }
}