export default () => {
  // Función para calcular cuántos slides caben visualmente en el viewport
  const getSlidesVisibleInViewport = (windowWidth, slideWidth, gap) => {
    // Considerar padding del contenedor (.experience-carousel__wrapper)
    const containerPadding = windowWidth < 768 ? 30 : 60 // padding left + right
    const availableWidth = windowWidth - containerPadding
    
    // Calcular cuántos slides + gaps caben
    const slideWithGap = slideWidth + gap
    const slidesVisible = Math.floor((availableWidth + gap) / slideWithGap)
    
    return Math.max(1, slidesVisible) // Mínimo 1 slide
  }

  // Función para determinar configuración según viewport real y slides totales
  const getDisplayConfig = (windowWidth, totalSlides) => {
    let slidesPerView, slideWidth, gap = 25
    
    // Definir cuántos slides mostrar según breakpoint
    // Usar anchos más angostos en Swiper para que quepan exactamente
    if (windowWidth < 576) {
      slidesPerView = 1
      slideWidth = 320 // Grid mantiene ancho original
    } else if (windowWidth < 768) {
      slidesPerView = 2
      slideWidth = 280 // Grid mantiene ancho, Swiper usa 250px
    } else if (windowWidth < 1024) {
      slidesPerView = 3
      slideWidth = 300 // Grid mantiene ancho, Swiper usa 280px
    } else {
      slidesPerView = 4
      slideWidth = 320 // Grid mantiene ancho, Swiper usa 300px
    }
    
    // Si hay menos slides que los que se quieren mostrar → Grid (centrado)
    // Si hay más slides → Swiper (navegación necesaria)
    return {
      slidesPerView: slidesPerView,
      useGrid: totalSlides <= slidesPerView,
      slideWidth: slideWidth,
      gap: gap
    }
  }

  // Función para activar modo Grid
  const activateGridMode = () => {
    const slidesContainer = document.querySelector('.experience-carousel__slides')
    const paginationEl = document.querySelector('.experience-carousel__pagination')
    const prevButton = document.querySelector('.experience-carousel__prev')
    const nextButton = document.querySelector('.experience-carousel__next')

    if (slidesContainer) {
      slidesContainer.classList.add('use-grid')
      slidesContainer.classList.remove('swiper-wrapper')
    }

    // Ocultar controles de navegación en modo grid
    if (paginationEl) paginationEl.style.display = 'none'
    if (prevButton) prevButton.style.display = 'none'
    if (nextButton) nextButton.style.display = 'none'

    // Cargar videos en modo grid también
    setTimeout(() => {
      loadVideos()
    }, 100)
  }

  // Función para activar modo Swiper
  const activateSwiperMode = () => {
    const slidesContainer = document.querySelector('.experience-carousel__slides')
    const paginationEl = document.querySelector('.experience-carousel__pagination')
    const prevButton = document.querySelector('.experience-carousel__prev')
    const nextButton = document.querySelector('.experience-carousel__next')

    if (slidesContainer) {
      slidesContainer.classList.remove('use-grid')
      slidesContainer.classList.add('swiper-wrapper')
    }

    // Mostrar controles de navegación en modo swiper
    if (paginationEl) paginationEl.style.display = 'flex'
    if (prevButton) prevButton.style.display = 'flex'
    if (nextButton) nextButton.style.display = 'flex'

    initializeSwiper()
  }

  const initializeSwiper = () => {
    // Destruir instancia existente si existe
    if (window.experienceSwiper) {
      window.experienceSwiper.destroy(true, true)
      window.experienceSwiper = null
    }

    // Buscar el elemento con selector primario y fallback
    const element = document.querySelector('.experience-carousel__wrapper.experience-swiper')
    if (!element) {
      console.warn('Elemento .experience-carousel__wrapper.experience-swiper no encontrado')
      const fallbackElement = document.querySelector('.experience-swiper')
      if (!fallbackElement) {
        console.error('Ningún elemento swiper encontrado')
        return
      }
    }

    if (!window.Swiper) {
      console.error('Swiper no está disponible')
      return
    }

    // Usar el selector correcto
    const swiperSelector = element ? '.experience-carousel__wrapper.experience-swiper' : '.experience-swiper'

    try {
      window.experienceSwiper = new window.Swiper(swiperSelector, {
        loop: false,
        spaceBetween: 25,
        watchOverflow: true,
        centeredSlides: false, // No usar centeredSlides de Swiper
        grabCursor: true,
        allowTouchMove: true,
        slidesPerView: 1, // Default para móvil

        pagination: {
          el: '.experience-carousel__pagination',
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 1,
          renderBullet: function (index, className) {
            return `<span class="${className}" aria-label="Ir a slide ${index + 1}"></span>`
          }
        },

        navigation: {
          nextEl: '.experience-carousel__next',
          prevEl: '.experience-carousel__prev'
        },

        breakpoints: {
          576: {
            slidesPerView: 'auto',
            spaceBetween: 25
          },
          768: {
            slidesPerView: 'auto', 
            spaceBetween: 25
          },
          1024: {
            slidesPerView: 'auto',
            spaceBetween: 25
          }
        },

        on: {
          init: function (swiper) {
            setTimeout(() => {
              loadVideos()
            }, 100)
          },
          slideChange: function (swiper) {
            pauseAllVideos()
          }
        }
      })
    } catch (error) {
      console.error('[EXPERIENCE] Error inicializando Swiper:', error)
    }
  }

  // Sistema de carga de videos
  const loadVideos = () => {
    const videoContainers = document.querySelectorAll('.experience-carousel__video-container[data-video-id]')

    videoContainers.forEach((container, index) => {
      const videoId = container.getAttribute('data-video-id')
      const orientation = container.getAttribute('data-video-orientation') || 'vertical'

      if (!videoId) return

      const iframe = document.createElement('iframe')
      const params = new URLSearchParams({
        autoplay: '0',
        mute: '1',
        loop: '0',
        controls: '1',
        modestbranding: '1',
        playsinline: '1',
        enablejsapi: '1',
        rel: '0'
      })

      iframe.src = `https://www.youtube.com/embed/${videoId}?${params.toString()}`
      iframe.style.width = '100%'
      iframe.style.height = '100%'
      iframe.style.border = 'none'
      iframe.style.opacity = '0'
      iframe.style.transition = 'opacity 0.5s ease'
      iframe.allow = 'autoplay; encrypted-media; fullscreen'
      iframe.allowFullscreen = true
      iframe.loading = 'lazy'

      // Marcar como cargado cuando el iframe esté listo
      iframe.addEventListener('load', () => {
        iframe.style.opacity = '1'
        iframe.classList.add('loaded')
        container.classList.add('video-loaded')
      })

      iframe.addEventListener('error', () => {})

      container.innerHTML = ''
      container.appendChild(iframe)

      // Agregar botón de mute solo en desktop
      createMuteButton(container, iframe, videoId)
    })
  }

  // Función para crear botón de mute personalizado
  const createMuteButton = (container, iframe, videoId) => {
    // Solo crear en desktop (verificar ancho de pantalla)
    if (window.innerWidth < 1024) return // breakpoint-lg

    const muteButton = document.createElement('button')
    muteButton.className = 'video-mute-button'
    muteButton.setAttribute('aria-label', 'Silenciar/Activar audio del video')
    muteButton.setAttribute('data-video-id', videoId)

    // Estado inicial: sin silenciar (mute está en 1 por defecto en el iframe)
    let isMuted = true // Los videos inician silenciados
    updateMuteButtonIcon(muteButton, isMuted)

    // Event listener para toggle mute
    muteButton.addEventListener('click', e => {
      e.preventDefault()
      e.stopPropagation()

      try {
        if (isMuted) {
          // Activar sonido
          iframe.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*')
          isMuted = false
          muteButton.classList.remove('muted')
        } else {
          // Silenciar
          iframe.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', '*')
          isMuted = true
          muteButton.classList.add('muted')
        }

        updateMuteButtonIcon(muteButton, isMuted)
      } catch (error) {
        console.error(`[VIDEO] Error controlando audio: ${videoId}`, error)
      }
    })

    container.appendChild(muteButton)
  }

  // Función para actualizar el ícono del botón de mute
  const updateMuteButtonIcon = (button, isMuted) => {
    const iconClass = isMuted ? 'ph-speaker-slash' : 'ph-speaker-high'
    button.innerHTML = `<i class="ph ${iconClass}"></i>`
  }

  // Función para pausar videos
  const pauseAllVideos = () => {
    const videos = document.querySelectorAll('.experience-carousel__video-container iframe')
    videos.forEach(iframe => {
      try {
        iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
      } catch (e) {
        // Silenciar errores cross-origin
      }
    })
  }

  // Función para manejar resize y mostrar/ocultar botones de mute
  const handleResize = () => {
    const muteButtons = document.querySelectorAll('.video-mute-button')
    const isDesktop = window.innerWidth >= 1024

    muteButtons.forEach(button => {
      button.style.display = isDesktop ? 'flex' : 'none'
    })
  }

  // Función principal para decidir qué modo usar
  const initializeCarousel = () => {
    const slides = document.querySelectorAll('.experience-carousel__slide')
    const totalSlides = slides.length
    const windowWidth = window.innerWidth

    const config = getDisplayConfig(windowWidth, totalSlides)

    console.log(`[INIT] Ventana: ${windowWidth}px, Slides: ${totalSlides}, Visibles: ${config.slidesPerView}, Usar Grid: ${config.useGrid}`)

    if (config.useGrid) {
      console.log('[INIT] Activando modo Grid')
      activateGridMode()
    } else {
      console.log('[INIT] Activando modo Swiper')
      activateSwiperMode()
    }
  }

  // Función para manejar resize y recalcular modo
  const handleCarouselResize = () => {
    const slides = document.querySelectorAll('.experience-carousel__slide')
    const totalSlides = slides.length
    const windowWidth = window.innerWidth

    const config = getDisplayConfig(windowWidth, totalSlides)
    const currentlyUsingGrid = document.querySelector('.experience-carousel__slides.use-grid')

    console.log(`[RESIZE] Ventana: ${windowWidth}px, Slides: ${totalSlides}, Visibles: ${config.slidesPerView}, Usar Grid: ${config.useGrid}`)

    // Solo cambiar si el modo necesita cambiar
    if (config.useGrid && !currentlyUsingGrid) {
      // Destruir Swiper y activar Grid
      console.log('[RESIZE] Cambiando a modo Grid')
      if (window.experienceSwiper) {
        window.experienceSwiper.destroy(true, true)
        window.experienceSwiper = null
      }
      activateGridMode()
    } else if (!config.useGrid && currentlyUsingGrid) {
      // Activar Swiper y desactivar Grid
      console.log('[RESIZE] Cambiando a modo Swiper')
      activateSwiperMode()
    }

    // Manejar botones de mute
    handleResize()
  }

  // Inicialización principal
  const checkAndInit = () => {
    if (typeof window !== 'undefined') {
      initializeCarousel()

      // Agregar listener para resize
      window.addEventListener('resize', handleCarouselResize)
    } else {
      setTimeout(checkAndInit, 300)
    }
  }

  // Devolver la función de inicialización para que pueda ser llamada desde React
  return checkAndInit
}
