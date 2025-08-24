export default () => {
  // Variables globales para las instancias de Swiper
  window.planEstudioSwipers = window.planEstudioSwipers || {}

  // ==========================================
  // INICIALIZACIÓN DE PESTAÑAS
  // ==========================================
  const initializeTabs = () => {
    const tabsContainer = document.querySelector('.plan-estudio__tabs-container')
    if (!tabsContainer) {
      return
    }

    const tabButtons = tabsContainer.querySelectorAll('.plan-estudio__tab-button')
    const tabPanels = tabsContainer.querySelectorAll('.plan-estudio__tab-panel')

    if (!tabButtons.length || !tabPanels.length) {
      return
    }

    // Limpiar eventos existentes
    tabButtons.forEach(button => {
      if (button.hasAttribute('data-tabs-initialized')) return
      button.setAttribute('data-tabs-initialized', 'true')
    })

    // Agregar eventos a cada botón
    tabButtons.forEach((button, buttonIndex) => {
      button.addEventListener('click', function (event) {
        event.preventDefault()
        handleTabClick(tabsContainer, buttonIndex)
      })

      // Soporte para navegación con teclado
      button.addEventListener('keydown', function (event) {
        handleTabKeydown(event, tabsContainer, buttonIndex)
      })
    })
  }

  const handleTabClick = (container, clickedIndex) => {
    const tabButtons = container.querySelectorAll('.plan-estudio__tab-button')
    const clickedButton = tabButtons[clickedIndex]

    // Solo proceder si la tab clickeada no está ya activa
    if (!clickedButton.classList.contains('active')) {
      setActiveTab(container, clickedIndex)

      // Actualizar el swiper activo si es necesario
      setTimeout(() => {
        const activePanel = document.querySelector('.plan-estudio__tab-panel:not(.hidden)')
        if (activePanel) {
          const swiperContainer = activePanel.querySelector('.subjects-swiper')
          if (swiperContainer) {
            let jornadaId = 'diurna'
            if (activePanel.id.includes('nocturna')) {
              jornadaId = 'nocturna'
            }

            // Si no existe el swiper para esta jornada, crearlo
            if (!window.planEstudioSwipers[jornadaId]) {
              initializeSwiper(jornadaId, swiperContainer)
            } else {
              // Si existe, solo actualizarlo
              window.planEstudioSwipers[jornadaId].update()
            }
          }
        }
      }, 100)
    }
  }

  const handleTabKeydown = (event, container, currentIndex) => {
    const tabButtons = container.querySelectorAll('.plan-estudio__tab-button')
    let newIndex = currentIndex

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault()
        newIndex = currentIndex > 0 ? currentIndex - 1 : tabButtons.length - 1
        break
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault()
        newIndex = currentIndex < tabButtons.length - 1 ? currentIndex + 1 : 0
        break
      case 'Home':
        event.preventDefault()
        newIndex = 0
        break
      case 'End':
        event.preventDefault()
        newIndex = tabButtons.length - 1
        break
      default:
        return
    }

    tabButtons[newIndex].focus()
    setActiveTab(container, newIndex)
    setTimeout(() => {
      const activePanel = document.querySelector('.plan-estudio__tab-panel:not(.hidden)')
      if (activePanel) {
        const swiperContainer = activePanel.querySelector('.subjects-swiper')
        if (swiperContainer) {
          let jornadaId = 'diurna'
          if (activePanel.id.includes('nocturna')) {
            jornadaId = 'nocturna'
          }

          if (!window.planEstudioSwipers[jornadaId]) {
            initializeSwiper(jornadaId, swiperContainer)
          } else {
            window.planEstudioSwipers[jornadaId].update()
          }
        }
      }
    }, 100)
  }

  const setActiveTab = (container, activeIndex) => {
    const tabButtons = container.querySelectorAll('.plan-estudio__tab-button')
    const tabPanels = container.querySelectorAll('.plan-estudio__tab-panel')

    // Actualizar estados de botones
    tabButtons.forEach((button, index) => {
      const isActive = index === activeIndex
      button.classList.toggle('active', isActive)
      button.setAttribute('aria-selected', isActive.toString())
      button.setAttribute('tabindex', isActive ? '0' : '-1')
    })

    // Actualizar paneles
    tabPanels.forEach((panel, index) => {
      const isActive = index === activeIndex
      panel.classList.toggle('hidden', !isActive)
      panel.setAttribute('aria-hidden', (!isActive).toString())
    })
  }

  // ==========================================
  // INICIALIZACIÓN DE SWIPERS
  // ==========================================
  const initializeSwiperForActiveTab = () => {
    const activePanel = document.querySelector('.plan-estudio__tab-panel:not(.hidden)')
    if (!activePanel) {
      return
    }

    const swiperContainer = activePanel.querySelector('.subjects-swiper')
    if (!swiperContainer) {
      return
    }

    // Obtener el ID de la jornada del panel
    const panelId = activePanel.id
    let jornadaId = 'diurna' // default
    if (panelId.includes('nocturna')) {
      jornadaId = 'nocturna'
    } else if (panelId.includes('diurna')) {
      jornadaId = 'diurna'
    }


    // Destruir instancia existente si existe
    if (window.planEstudioSwipers[jornadaId] && typeof window.planEstudioSwipers[jornadaId].destroy === 'function') {
      window.planEstudioSwipers[jornadaId].destroy(true, true)
      delete window.planEstudioSwipers[jornadaId]
    }

    // Inicializar nuevo swiper
    initializeSwiper(jornadaId, swiperContainer)
  }

  const initializeSwiper = (jornadaId, container) => {
    // Contar slides
    const slides = container.querySelectorAll('.plan-estudio_slide')
    const totalSlides = slides.length

    if (!window.Swiper) {
      return
    }

    if (totalSlides === 0) {
      return
    }

    const swiperConfig = {
      loop: false,
      spaceBetween: 20,
      watchOverflow: true,
      centeredSlides: false,
      grabCursor: true,
      allowTouchMove: totalSlides > 1,

      pagination: {
        el: container.querySelector('.plan-estudio_pagination'),
        clickable: true,
        dynamicBullets: false,
        renderBullet: function (index, className) {
          return `<span class="${className}" aria-label="Ir a slide ${index + 1}"></span>`
        }
      },

      navigation: {
        nextEl: container.querySelector('.plan-estudio_next'),
        prevEl: container.querySelector('.plan-estudio_prev'),
        disabledClass: 'swiper-button-disabled',
        hiddenClass: 'swiper-button-hidden'
      },

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
          updateNavigationVisibility(this, totalSlides, container)
          updatePaginationVisibility(this, totalSlides, container)
          updateButtonStates(this, container)
        },
        update: function () {
          updateNavigationVisibility(this, totalSlides, container)
          updatePaginationVisibility(this, totalSlides, container)
          updateButtonStates(this, container)
        },
        resize: function () {
          setTimeout(() => {
            updateNavigationVisibility(this, totalSlides, container)
            updatePaginationVisibility(this, totalSlides, container)
            updateButtonStates(this, container)
          }, 100)
        },
        breakpoint: function () {
          setTimeout(() => {
            updateNavigationVisibility(this, totalSlides, container)
            updatePaginationVisibility(this, totalSlides, container)
            updateButtonStates(this, container)
          }, 150)
        },
        slideChange: function () {
          updateButtonStates(this, container)
        },
        reachBeginning: function () {
          updateButtonStates(this, container)
        },
        reachEnd: function () {
          updateButtonStates(this, container)
        }
      }
    }

    // Crear nueva instancia
    try {
      window.planEstudioSwipers[jornadaId] = new window.Swiper(container, swiperConfig)
    } catch (error) {
      console.error('Error creando swiper:', error)
    }
  }

  // ==========================================
  // FUNCIONES DE NAVEGACIÓN Y PAGINACIÓN
  // ==========================================
  const updateNavigationVisibility = (swiper, totalSlides, container) => {
    const nextBtn = container.querySelector('.plan-estudio_next')
    const prevBtn = container.querySelector('.plan-estudio_prev')

    if (!nextBtn || !prevBtn) return

    const needsNavigation = totalSlides > 1

    if (needsNavigation) {
      nextBtn.classList.add('show-navigation')
      nextBtn.classList.remove('swiper-button-hidden')
      nextBtn.setAttribute('aria-hidden', 'false')
      nextBtn.style.display = 'flex'
      nextBtn.style.visibility = 'visible'

      prevBtn.classList.add('show-navigation')
      prevBtn.classList.remove('swiper-button-hidden')
      prevBtn.setAttribute('aria-hidden', 'false')
      prevBtn.style.display = 'flex'
      prevBtn.style.visibility = 'visible'

      updateButtonStates(swiper, container)
    } else {
      nextBtn.classList.remove('show-navigation')
      nextBtn.classList.add('swiper-button-hidden')
      nextBtn.setAttribute('aria-hidden', 'true')
      nextBtn.style.display = 'none'

      prevBtn.classList.remove('show-navigation')
      prevBtn.classList.add('swiper-button-hidden')
      prevBtn.setAttribute('aria-hidden', 'true')
      prevBtn.style.display = 'none'
    }
  }

  const updateButtonStates = (swiper, container) => {
    const nextBtn = container.querySelector('.plan-estudio_next')
    const prevBtn = container.querySelector('.plan-estudio_prev')

    if (!nextBtn || !prevBtn) return

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

  const updatePaginationVisibility = (swiper, totalSlides, container) => {
    const pagination = container.querySelector('.plan-estudio_pagination')
    if (!pagination) return

    // Simple show/hide como en experiencia
    if (totalSlides > 1) {
      pagination.style.display = 'flex'
    } else {
      pagination.style.display = 'none'
    }
  }

  // ==========================================
  // INICIALIZACIÓN PRINCIPAL
  // ==========================================
  const initializeAllSwipers = () => {
    // Buscar todos los contenedores de swiper con la clase original
    const swiperContainers = document.querySelectorAll('.subjects-swiper')

    swiperContainers.forEach(container => {
      // Determinar la jornada basándose en el panel padre
      const panel = container.closest('.plan-estudio__tab-panel')
      if (!panel) return

      let jornadaId = 'diurna'
      if (panel.id.includes('nocturna')) {
        jornadaId = 'nocturna'
      }

      // Solo inicializar si no existe ya
      if (!window.planEstudioSwipers[jornadaId]) {
        initializeSwiper(jornadaId, container)
      }
    })
  }

  const checkAndInit = () => {
    if (typeof window !== 'undefined') {
      // Inicializar pestañas
      initializeTabs()

      // Si Swiper está disponible, inicializar todos los swipers
      if (window.Swiper) {
        setTimeout(() => {
          initializeAllSwipers()
        }, 200)
      } else {
        setTimeout(checkAndInit, 300)
      }
    } else {
      setTimeout(checkAndInit, 300)
    }
  }

  // Manejar cambios de tamaño de ventana
  let resizeTimeout
  window.addEventListener('resize', () => {
    if (resizeTimeout) {
      clearTimeout(resizeTimeout)
    }

    resizeTimeout = setTimeout(() => {
      // Actualizar todas las instancias de swiper activas
      Object.keys(window.planEstudioSwipers).forEach(jornadaId => {
        const swiper = window.planEstudioSwipers[jornadaId]
        if (swiper && typeof swiper.update === 'function') {
          swiper.update()
        }
      })
    }, 250)
  })

  // Inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAndInit)
  } else {
    checkAndInit()
  }
}
