export default () => {
  console.log('🚀 [RELACIONADOS] Script iniciado')
  
  // Función para actualizar estados de botones como planEstudio
  const updateButtonStates = (swiper) => {
    const nextBtn = document.querySelector('.related-programs__next') || document.querySelector('.related-programs-next')
    const prevBtn = document.querySelector('.related-programs__prev') || document.querySelector('.related-programs-prev')

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

  // Función para actualizar visibilidad de navegación
  const updateNavigationVisibility = (swiper, totalSlides) => {
    const nextBtn = document.querySelector('.related-programs__next') || document.querySelector('.related-programs-next')
    const prevBtn = document.querySelector('.related-programs__prev') || document.querySelector('.related-programs-prev')

    if (!nextBtn || !prevBtn) {
      console.warn('Botones de navegación no encontrados')
      return
    }

    // Lógica mejorada siguiendo patrón planEstudio
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

  // Función para actualizar visibilidad de paginación
  const updatePaginationVisibility = (swiper, totalSlides) => {
    const pagination = document.querySelector('.related-programs__pagination') || document.querySelector('.related-programs-pagination')

    if (!pagination) {
      console.warn('Paginación no encontrada')
      return
    }

    // Mostrar paginación si hay más de 1 slide - patrón planEstudio
    const needsPagination = totalSlides > 1

    if (needsPagination) {
      pagination.style.display = 'flex'
      pagination.classList.remove('swiper-pagination-hidden')
      pagination.setAttribute('aria-hidden', 'false')

      const bullets = pagination.querySelectorAll('.swiper-pagination-bullet')
      bullets.forEach((bullet, index) => {
        bullet.setAttribute('aria-label', `Ir al programa ${index + 1}`)
        bullet.style.display = 'block'
      })

    } else {
      pagination.style.display = 'none'
      pagination.classList.add('swiper-pagination-hidden')
      pagination.setAttribute('aria-hidden', 'true')
    }
  }

  // Función para contar slides dinámicamente
  const countSlides = (element) => {
    const slides = element.querySelectorAll('.swiper-slide')
    return slides.length
  }

  const initializeSwiper = () => {
    console.log('🔧 [RELACIONADOS] Iniciando initializeSwiper()')
    
    // Destruir instancia existente si existe
    if (window.relatedProgramsSwiper) {
      console.log('🗑️ [RELACIONADOS] Destruyendo instancia existente')
      window.relatedProgramsSwiper.destroy(true, true)
      window.relatedProgramsSwiper = null
    }

    if (!window.Swiper) {
      console.error('❌ [RELACIONADOS] Swiper no está disponible')
      return
    }
    console.log('✅ [RELACIONADOS] Swiper disponible')

    // Buscar el wrapper - patrón planEstudio con un solo fallback
    console.log('🔍 [RELACIONADOS] Buscando contenedor del swiper...')
    const element = document.querySelector('.related-programs-swiper') || document.querySelector('.related-programs__carousel')
    
    console.log('🔍 [RELACIONADOS] Elementos encontrados:')
    console.log('  - .related-programs-swiper:', !!document.querySelector('.related-programs-swiper'))
    console.log('  - .related-programs__carousel:', !!document.querySelector('.related-programs__carousel'))
    console.log('  - Elemento seleccionado:', element)

    if (!element) {
      console.error('❌ [RELACIONADOS] No se encontró el contenedor del swiper')
      // Listar todos los elementos relacionados para debug
      console.log('🔍 [RELACIONADOS] Elementos disponibles en DOM:')
      const allRelated = document.querySelectorAll('[class*="related"]')
      allRelated.forEach(el => console.log('  -', el.className))
      return
    }

    // Contar slides disponibles
    const totalSlides = countSlides(element)
    console.log('🎯 [RELACIONADOS] Slides encontrados:', totalSlides)
    
    // Verificar elementos de navegación
    const nextBtn = document.querySelector('.related-programs__next') || document.querySelector('.related-programs-next')
    const prevBtn = document.querySelector('.related-programs__prev') || document.querySelector('.related-programs-prev')
    const pagination = document.querySelector('.related-programs__pagination') || document.querySelector('.related-programs-pagination')
    
    console.log('🎮 [RELACIONADOS] Elementos de navegación:')
    console.log('  - Next button:', !!nextBtn, nextBtn?.className)
    console.log('  - Prev button:', !!prevBtn, prevBtn?.className)
    console.log('  - Pagination:', !!pagination, pagination?.className)

    window.relatedProgramsSwiper = new window.Swiper(element, {
      loop: false,
      spaceBetween: 20,
      grabCursor: true,
      allowTouchMove: true,
      slidesPerView: 'auto',

      // Paginación - SIEMPRE VISIBLE
      pagination: {
        el: '.related-programs-pagination, .related-programs__pagination',
        clickable: true,
        dynamicBullets: false,
        renderBullet: function (index, className) {
          return `<span class="${className}" aria-label="Ir al programa ${index + 1}"></span>`
        }
      },

      // Navegación - SIEMPRE VISIBLE
      navigation: {
        nextEl: '.related-programs-next, .related-programs__next',
        prevEl: '.related-programs-prev, .related-programs__prev'
      },

      // Breakpoints con cálculos como planEstudio
      breakpoints: {
        0: {
          spaceBetween: 20,
          slidesPerView: Math.min(1, totalSlides),
          centeredSlides: true
        },
        576: {
          spaceBetween: 20,
          centeredSlides: false,
          slidesPerView: Math.min(1, totalSlides)
        },
        768: {
          spaceBetween: 20,
          centeredSlides: false,
          slidesPerView: Math.min(2, totalSlides)
        },
        1024: {
          spaceBetween: 25,
          centeredSlides: false,
          slidesPerView: Math.min(3, totalSlides)
        },
        1380: {
          spaceBetween: 30,
          centeredSlides: false,
          slidesPerView: Math.min(4, totalSlides)
        }
      },

      on: {
        init: function (swiper) {
          console.log('✅ [RELACIONADOS] Swiper inicializado correctamente')
          console.log('  - Slides totales:', swiper.slides.length)
          console.log('  - Active index:', swiper.activeIndex)
          console.log('  - Is beginning:', swiper.isBeginning)
          console.log('  - Is end:', swiper.isEnd)
          updateNavigationVisibility(swiper, totalSlides)
          updatePaginationVisibility(swiper, totalSlides)
          updateButtonStates(swiper)
        },
        
        update: function (swiper) {
          const currentSlides = countSlides(element)
          updateNavigationVisibility(swiper, currentSlides)
          updatePaginationVisibility(swiper, currentSlides)
          updateButtonStates(swiper)
        },
        
        resize: function (swiper) {
          setTimeout(() => {
            updateNavigationVisibility(swiper, totalSlides)
            updatePaginationVisibility(swiper, totalSlides)
            updateButtonStates(swiper)
          }, 100)
        },
        
        breakpoint: function (swiper, breakpointParams) {
          setTimeout(() => {
            updateNavigationVisibility(swiper, totalSlides)
            updatePaginationVisibility(swiper, totalSlides)
            updateButtonStates(swiper)
          }, 150)
        },
        
        slideChange: function (swiper) {
          updateButtonStates(swiper)
        },
        
        reachBeginning: function (swiper) {
          updateButtonStates(swiper)
        },
        
        reachEnd: function (swiper) {
          updateButtonStates(swiper)
        }
      }
    })
    
    // Verificar que la inicialización fue exitosa
    if (window.relatedProgramsSwiper) {
      console.log('✅ [RELACIONADOS] Instancia de Swiper creada exitosamente')
      updateNavigationVisibility(window.relatedProgramsSwiper, totalSlides)
    } else {
      console.error('❌ [RELACIONADOS] Error al crear instancia de Swiper')
    }
  }

  // Función de inicialización con retry como planEstudio
  const checkAndInit = () => {
    console.log('🔄 [RELACIONADOS] Verificando disponibilidad de Swiper...')
    
    if (typeof window !== 'undefined' && window.Swiper) {
      console.log('✅ [RELACIONADOS] Swiper encontrado, inicializando...')
      initializeSwiper()
    } else {
      console.log('⏳ [RELACIONADOS] Swiper no disponible, reintentando en 300ms...')
      console.log('  - window:', typeof window)
      console.log('  - window.Swiper:', typeof window?.Swiper)
      setTimeout(checkAndInit, 300)
    }
  }

  // Verificar estado inicial del DOM
  console.log('🏗️ [RELACIONADOS] Estado inicial del DOM:')
  console.log('  - Document ready state:', document.readyState)
  console.log('  - Window loaded:', document.readyState === 'complete')

  // Inicialización
  console.log('🚀 [RELACIONADOS] Iniciando checkAndInit()')
  checkAndInit()

  // Event listener para resize como planEstudio
  let resizeTimeout
  window.addEventListener('resize', () => {
    console.log('📏 [RELACIONADOS] Evento resize detectado')
    if (resizeTimeout) {
      clearTimeout(resizeTimeout)
    }

    resizeTimeout = setTimeout(() => {
      if (window.relatedProgramsSwiper) {
        console.log('🔄 [RELACIONADOS] Actualizando Swiper después de resize')
        window.relatedProgramsSwiper.update()
      } else {
        console.log('⚠️ [RELACIONADOS] No hay instancia de Swiper para actualizar')
      }
    }, 250)
  })
  
  console.log('🎯 [RELACIONADOS] Script completamente cargado e inicializado')
}
