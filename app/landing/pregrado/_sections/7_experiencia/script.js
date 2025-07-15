// ===========================================
// SCRIPT EXPERIENCIA - SISTEMA DE CARRUSEL
// ===========================================

// ███████████████████████████████████████████████████████████████████████████████
// █                       SISTEMA DE VIDEO YOUTUBE OPTIMIZADO                  █
// ███████████████████████████████████████████████████████████████████████████████

const VideoYouTubeSystem = {
  config: {
    videoParams: {
      autoplay: '0', // No autoplay por defecto
      mute: '0', // Con audio
      loop: '1',
      controls: '1', // Mostrar controles INCLUYENDO volumen
      showinfo: '0',
      rel: '0',
      modestbranding: '1',
      playsinline: '1',
      iv_load_policy: '3',
      disablekb: '0', // Permitir controles de teclado
      fs: '1', // Permitir pantalla completa
      cc_load_policy: '0',
      start: '0',
      end: '',
      enablejsapi: '1', // Habilitar API para control programático
      hl: 'es',
      cc_lang_pref: 'es'
    }
  },

  currentPlayingVideo: null, // Track del video actual reproduciendo

  init() {
    Logger.debug('🎬 Inicializando videos de YouTube...')

    const videoContainers = document.querySelectorAll('.experience-carousel__video-container[data-video-id]')

    if (videoContainers.length === 0) {
      Logger.debug('No se encontraron contenedores de video')
      return false
    }

    // Cargar todos los videos directamente sin miniaturas
    videoContainers.forEach((container, index) => {
      this.loadVideoDirectly(container, index === 0)
    })

    // Configurar observador SOLO para el primer video
    this.setupFirstVideoObserver()

    Logger.success(`Videos de YouTube cargados: ${videoContainers.length}`)
    return true
  },

  loadVideoDirectly(container, isFirstVideo = false) {
    const videoId = container.dataset.videoId
    const orientation = container.dataset.videoOrientation || 'horizontal'

    if (!videoId) {
      Logger.warning('Video ID no encontrado en contenedor')
      return
    }

    // Marcar si es el primer video
    if (isFirstVideo) {
      container.dataset.isFirstVideo = 'true'
    }

    // Cargar iframe directamente
    this.loadVideoIframe(container, videoId, orientation, isFirstVideo)

    Logger.debug(`Video YouTube configurado: ${videoId} (${orientation}${isFirstVideo ? ' - PRIMER VIDEO' : ''})`)
  },

  setupFirstVideoObserver() {
    const firstVideoContainer = document.querySelector('.experience-carousel__video-container[data-video-id][data-is-first-video="true"]')

    if (!firstVideoContainer || !window.IntersectionObserver) {
      Logger.debug('No se puede configurar observador para el primer video')
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const iframe = entry.target.querySelector('iframe')
          if (!iframe) return

          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            // Video visible al 50%, reproducir SOLO si es el primer video
            if (entry.target.dataset.isFirstVideo === 'true') {
              this.playVideo(iframe)
              this.currentPlayingVideo = iframe
            }
          } else {
            // Video no visible, pausar si es el video actual
            if (this.currentPlayingVideo === iframe) {
              this.pauseVideo(iframe)
              this.currentPlayingVideo = null
            }
          }
        })
      },
      {
        threshold: [0, 0.5, 1],
        rootMargin: '0px'
      }
    )

    observer.observe(firstVideoContainer)
  },

  loadVideoIframe(container, videoId, orientation, isFirstVideo = false) {
    // Crear iframe de YouTube
    const iframe = this.createYouTubeIframe(videoId, orientation, isFirstVideo)

    // Limpiar contenedor y agregar iframe
    container.innerHTML = ''
    container.appendChild(iframe)

    // Si es el primer video, configurar para autoplay cuando sea visible
    if (isFirstVideo) {
      container.classList.add('first-video-container')

      // Esperar a que el iframe esté completamente cargado
      iframe.addEventListener('load', () => {
        Logger.debug('Primer video cargado, listo para autoplay cuando sea visible')
      })
    }

    Logger.debug(`Video YouTube cargado: ${videoId} (${orientation}${isFirstVideo ? ' - PRIMER VIDEO' : ''})`)
  },

  createYouTubeIframe(videoId, orientation, isFirstVideo = false) {
    const iframe = document.createElement('iframe')

    // Parámetros específicos para cada video
    const videoParams = {
      ...this.config.videoParams,
      playlist: videoId,
      // Primer video: autoplay con mute para cumplir políticas del navegador
      autoplay: isFirstVideo ? '1' : '0',
      mute: isFirstVideo ? '1' : '0'
    }

    const params = new URLSearchParams(videoParams)
    const videoSrc = `https://www.youtube.com/embed/${videoId}?${params.toString()}`

    // Configurar iframe
    iframe.src = videoSrc
    iframe.title = `Video Experiencia - ${videoId}`
    iframe.allow = 'autoplay; encrypted-media; picture-in-picture; clipboard-write'
    iframe.allowFullscreen = true
    iframe.loading = 'lazy'
    iframe.frameBorder = '0'
    iframe.className = `experience-carousel__video-iframe experience-carousel__video-iframe--${orientation}`
    iframe.setAttribute('data-video-id', videoId)
    iframe.setAttribute('data-orientation', orientation)

    return iframe
  },

  playVideo(iframe) {
    if (!iframe || !iframe.contentWindow) return

    try {
      iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*')
      Logger.debug('Video reproducido')
    } catch (e) {
      Logger.warning('No se pudo reproducir el video:', e)
    }
  },

  pauseVideo(iframe) {
    if (!iframe || !iframe.contentWindow) return

    try {
      iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
      Logger.debug('Video pausado')
    } catch (e) {
      Logger.warning('No se pudo pausar el video:', e)
    }
  },

  pauseAllVideosExcept(exceptIframe) {
    const allIframes = document.querySelectorAll('.experience-carousel__video-iframe')
    allIframes.forEach(iframe => {
      if (iframe !== exceptIframe) {
        this.pauseVideo(iframe)
      }
    })
  }
}

// ███████████████████████████████████████████████████████████████████████████████
// █                      SISTEMA DE SWIPER EXPERIENCIA OPTIMIZADO              █
// ███████████████████████████████████████████████████████████████████████████████

const ExperienceSwiperSystem = {
  init() {
    Logger.debug('🎠 Inicializando Swiper para experiencia...')

    // Destruir instancia existente si existe
    if (window.experienceSwiper) {
      window.experienceSwiper.destroy(true, true)
    }

    // Buscar el elemento
    const element = document.querySelector('.experience-swiper')
    if (!element) {
      Logger.warning('Elemento .experience-swiper no encontrado')
      return false
    }

    // Contar slides y verificar orientaciones
    const slides = document.querySelectorAll('.experience-carousel__slide')
    const totalSlides = slides.length
    const hasVerticalVideos = document.querySelectorAll('.experience-carousel__video-card--vertical').length > 0
    const hasHorizontalVideos = document.querySelectorAll('.experience-carousel__video-card--horizontal').length > 0

    if (!window.Swiper) {
      Logger.error('Swiper no está disponible')
      return false
    }

    // Marcar slides con videos horizontales para doble ancho
    if (hasHorizontalVideos) {
      this.markDoubleWidthSlides()
    }

    // Configuración dinámica según contenido
    const swiperConfig = this.buildSwiperConfig(totalSlides, hasVerticalVideos, hasHorizontalVideos)

    // Inicializar Swiper
    window.experienceSwiper = new window.Swiper('.experience-swiper', swiperConfig)

    Logger.success(`Swiper experiencia inicializado con ${totalSlides} slides`)
    return true
  },

  markDoubleWidthSlides() {
    const slides = document.querySelectorAll('.experience-carousel__slide')
    slides.forEach(slide => {
      const horizontalVideo = slide.querySelector('.experience-carousel__video-card--horizontal')
      if (horizontalVideo) {
        slide.classList.add('swiper-slide-double-width')
      }
    })
  },

  buildSwiperConfig(totalSlides, hasVerticalVideos, hasHorizontalVideos) {
    return {
      loop: false, // Desactivar loop cuando hay slides de doble ancho
      spaceBetween: 20, // Espaciado consistente
      slidesPerView: 'auto',
      watchOverflow: true,
      centeredSlides: false,
      grabCursor: true,
      allowTouchMove: totalSlides > 1,
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
      slidesPerGroup: 1, // Avanzar de uno en uno

      // Paginación
      pagination: {
        el: '.experience-carousel__pagination',
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 3,
        renderBullet: function (index, className) {
          return `<span class="${className}" aria-label="Ir a slide ${index + 1}"></span>`
        }
      },

      // Navegación
      navigation: {
        nextEl: '.experience-carousel__next',
        prevEl: '.experience-carousel__prev',
        disabledClass: 'swiper-button-disabled',
        hiddenClass: 'swiper-button-hidden'
      },

      // Breakpoints responsivos ajustados
      breakpoints: this.getResponsiveBreakpoints(totalSlides, hasVerticalVideos, hasHorizontalVideos),

      // Eventos
      on: {
        init: function () {
          updateNavigationVisibility(this, totalSlides)
          updatePaginationVisibility(this, totalSlides)
          updateButtonStates(this)
          handleDoubleWidthSlides(this)
        },
        update: function () {
          updateNavigationVisibility(this, totalSlides)
          updatePaginationVisibility(this, totalSlides)
          updateButtonStates(this)
          handleDoubleWidthSlides(this)
        },
        resize: function () {
          setTimeout(() => {
            updateNavigationVisibility(this, totalSlides)
            updatePaginationVisibility(this, totalSlides)
            updateButtonStates(this)
            handleDoubleWidthSlides(this)
          }, 100)
        },
        slideChange: function () {
          updateButtonStates(this)
          handleVideoSlideChange(this)
        },
        reachBeginning: function () {
          updateButtonStates(this)
        },
        reachEnd: function () {
          updateButtonStates(this)
        }
      }
    }
  },

  getResponsiveBreakpoints(totalSlides, hasVerticalVideos, hasHorizontalVideos) {
    return {
      0: {
        slidesPerView: 1,
        spaceBetween: 20,
        slidesPerGroup: 1
      },
      576: {
        slidesPerView: Math.min(1.5, totalSlides),
        spaceBetween: 20,
        slidesPerGroup: 1
      },
      768: {
        slidesPerView: Math.min(2.5, totalSlides),
        spaceBetween: 20,
        slidesPerGroup: 1
      },
      1024: {
        slidesPerView: Math.min(3.5, totalSlides),
        spaceBetween: 20,
        slidesPerGroup: 1
      },
      1280: {
        slidesPerView: Math.min(4.5, totalSlides),
        spaceBetween: 20,
        slidesPerGroup: 1
      }
    }
  }
}

// ███████████████████████████████████████████████████████████████████████████████
// █                      FUNCIONES DE UTILIDAD SWIPER                          █
// ███████████████████████████████████████████████████████████████████████████████

const updateNavigationVisibility = (swiper, totalSlides) => {
  // Validar que swiper esté disponible
  if (!swiper) return

  const nextBtn = document.querySelector('.experience-carousel__next')
  const prevBtn = document.querySelector('.experience-carousel__prev')

  if (!nextBtn || !prevBtn) return

  const needsNavigation = totalSlides > 1

  if (needsNavigation) {
    nextBtn.classList.remove('swiper-button-hidden')
    prevBtn.classList.remove('swiper-button-hidden')
    updateButtonStates(swiper)
  } else {
    nextBtn.classList.add('swiper-button-hidden')
    prevBtn.classList.add('swiper-button-hidden')
  }
}

const updateButtonStates = swiper => {
  // Validar que swiper esté disponible
  if (!swiper) return

  const nextBtn = document.querySelector('.experience-carousel__next')
  const prevBtn = document.querySelector('.experience-carousel__prev')

  if (!nextBtn || !prevBtn) return

  const isBeginning = swiper.isBeginning
  const isEnd = swiper.isEnd

  // Botón anterior
  if (isBeginning) {
    prevBtn.classList.add('swiper-button-disabled')
    prevBtn.setAttribute('aria-disabled', 'true')
  } else {
    prevBtn.classList.remove('swiper-button-disabled')
    prevBtn.setAttribute('aria-disabled', 'false')
  }

  // Botón siguiente
  if (isEnd) {
    nextBtn.classList.add('swiper-button-disabled')
    nextBtn.setAttribute('aria-disabled', 'true')
  } else {
    nextBtn.classList.remove('swiper-button-disabled')
    nextBtn.setAttribute('aria-disabled', 'false')
  }
}

const updatePaginationVisibility = (swiper, totalSlides) => {
  const pagination = document.querySelector('.experience-carousel__pagination')

  if (!pagination) return

  if (totalSlides > 1) {
    pagination.classList.remove('swiper-pagination-hidden')
  } else {
    pagination.classList.add('swiper-pagination-hidden')
  }
}

const handleVideoSlideChange = swiper => {
  // Validar que swiper y sus parámetros estén disponibles
  if (!swiper || !swiper.params || !swiper.el) return

  // Pausar todos los videos que no están en el slide activo
  const allVideos = swiper.el.querySelectorAll('iframe')

  allVideos.forEach((iframe, index) => {
    // Usar valor por defecto si slidesPerView no está disponible
    const slidesPerView = swiper.params.slidesPerView || 1
    const slideIndex = Math.floor(index / slidesPerView)

    if (slideIndex !== swiper.activeIndex) {
      VideoYouTubeSystem.pauseVideo(iframe)
    }
  })
}

// Nueva función para manejar slides de doble ancho
const handleDoubleWidthSlides = swiper => {
  const doubleWidthSlides = swiper.el.querySelectorAll('.swiper-slide-double-width')

  doubleWidthSlides.forEach(slide => {
    const slideIndex = Array.from(swiper.slides).indexOf(slide)

    // Aplicar estilos especiales según el breakpoint actual
    if (window.innerWidth >= 768) {
      slide.style.gridColumn = 'span 2'
      slide.style.width = 'calc(200% + var(--swiper-spacing, 20px))'
    } else {
      slide.style.gridColumn = 'span 1'
      slide.style.width = '100%'
    }
  })
}

// ███████████████████████████████████████████████████████████████████████████████
// █                     SISTEMA DE GESTIÓN DE VISIBILIDAD                      █
// ███████████████████████████████████████████████████████████████████████████████

const VisibilityManagement = {
  init() {
    Logger.debug('👁️ Configurando gestión de visibilidad...')

    // Gestión de visibilidad de la pestaña
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseAllVideos()
      }
    })

    // Configurar observadores para todos los videos
    this.setupAllVideoObservers()

    return true
  },

  setupAllVideoObservers() {
    if (!window.IntersectionObserver) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const videoContainer = entry.target
          const iframe = videoContainer.querySelector('iframe')
          const isFirstVideo = videoContainer.dataset.isFirstVideo === 'true'

          if (iframe && !isFirstVideo) {
            // Para videos que no son el primero, solo pausar cuando no son visibles
            if (!entry.isIntersecting) {
              VideoYouTubeSystem.pauseVideo(iframe)
            }
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px'
      }
    )

    // Observar todos los contenedores de video excepto el primero
    document.querySelectorAll('.experience-carousel__video-container').forEach(container => {
      if (container.dataset.isFirstVideo !== 'true') {
        observer.observe(container)
      }
    })
  },

  pauseAllVideos() {
    const iframes = document.querySelectorAll('.experience-carousel__video-iframe')
    iframes.forEach(iframe => VideoYouTubeSystem.pauseVideo(iframe))
    Logger.debug('Todos los videos pausados')
  }
}

// ███████████████████████████████████████████████████████████████████████████████
// █                        INICIALIZACIÓN PRINCIPAL                            █
// ███████████████████████████████████████████████████████████████████████████████

const ExperienciaSystem = {
  async init() {
    Logger.debug('🚀 Inicializando sistema de experiencia...')

    try {
      const checkAndInit = () => {
        if (typeof window !== 'undefined' && window.Swiper) {
          // Inicializar sistemas
          const systems = {
            videoYouTube: VideoYouTubeSystem.init(),
            swiper: ExperienceSwiperSystem.init(),
            visibility: VisibilityManagement.init()
          }

          const activeSystems = Object.entries(systems)
            .filter(([_, isActive]) => isActive)
            .map(([name]) => name)

          Logger.success(`✅ Experiencia iniciada - ${activeSystems.length} sistemas activos`)
          return systems
        } else {
          setTimeout(checkAndInit, 300)
        }
      }

      return checkAndInit()
    } catch (error) {
      Logger.error('Error al inicializar Experiencia:', error)
      return false
    }
  },

  setupCleanup() {
    window.addEventListener('beforeunload', () => {
      if (window.experienceSwiper) {
        window.experienceSwiper.destroy(true, true)
        window.experienceSwiper = null
      }

      EventManager.cleanup()
    })
  }
}

// ===========================================
// AUTO-INICIALIZACIÓN
// ===========================================
export default () => {
  DOMHelpers.isReady(async () => {
    await ExperienciaSystem.init()
    ExperienciaSystem.setupCleanup()
  })

  // Exponer para debugging
  if (typeof window !== 'undefined') {
    window.VideoYouTubeSystem = VideoYouTubeSystem
    window.ExperienceSwiperSystem = ExperienceSwiperSystem
    window.VisibilityManagement = VisibilityManagement
    window.ExperienciaSystem = ExperienciaSystem
  }

  // Configurar resize listener
  let resizeTimeout
  window.addEventListener('resize', () => {
    if (resizeTimeout) {
      clearTimeout(resizeTimeout)
    }

    resizeTimeout = setTimeout(() => {
      if (window.experienceSwiper) {
        window.experienceSwiper.update()
        handleDoubleWidthSlides(window.experienceSwiper)
      }
    }, 250)
  })
}
