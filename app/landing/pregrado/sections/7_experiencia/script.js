// ===========================================
// SCRIPT EXPERIENCIA - SISTEMA DE CARRUSEL
// ===========================================

// ███████████████████████████████████████████████████████████████████████████████
// █                       SISTEMA DE VIDEO YOUTUBE                             █
// ███████████████████████████████████████████████████████████████████████████████

const VideoYouTubeSystem = {
  config: {
    videoParams: {
      autoplay: '1',
      mute: '1',
      loop: '1',
      controls: '0',
      showinfo: '0',
      rel: '0',
      modestbranding: '1',
      playsinline: '1',
      iv_load_policy: '3',
      disablekb: '1',
      fs: '0',
      cc_load_policy: '0',
      start: '0',
      end: '',
      enablejsapi: '0',
      hl: 'es',
      cc_lang_pref: 'es'
    }
  },

  init() {
    Logger.debug('🎬 Inicializando videos de YouTube en experiencia...')

    const videoContainers = document.querySelectorAll('.experience-carousel__video-container[data-video-id]')

    if (videoContainers.length === 0) {
      Logger.debug('No se encontraron contenedores de video')
      return false
    }

    videoContainers.forEach(container => {
      this.initializeVideo(container)
    })

    Logger.success(`Videos de YouTube cargados: ${videoContainers.length}`)
    return true
  },

  initializeVideo(container) {
    const videoId = container.dataset.videoId

    if (!videoId) {
      Logger.warning('Video ID no encontrado en contenedor')
      return
    }

    // Crear iframe de YouTube
    const iframe = this.createYouTubeIframe(videoId)

    // Limpiar contenedor y agregar iframe
    container.innerHTML = ''
    container.appendChild(iframe)

    Logger.debug(`Video YouTube configurado: ${videoId}`)
  },

  createYouTubeIframe(videoId) {
    const iframe = document.createElement('iframe')

    // Parámetros con playlist para loop
    const params = { ...this.config.videoParams, playlist: videoId }
    const videoParams = new URLSearchParams(params)
    const videoSrc = `https://www.youtube.com/embed/${videoId}?${videoParams.toString()}`

    // Configurar iframe
    iframe.src = videoSrc
    iframe.title = `Video Experiencia - ${videoId}`
    iframe.allow = 'autoplay; encrypted-media'
    iframe.allowFullscreen = true
    iframe.loading = 'lazy'
    iframe.frameBorder = '0'
    iframe.className = 'experience-carousel__video-iframe'
    iframe.setAttribute('data-video-id', videoId)

    // Event listeners
    EventManager.add(iframe, 'load', () => {
      Logger.success(`Video YouTube cargado: ${videoId}`)
      iframe.style.opacity = '1'
    })

    EventManager.add(iframe, 'error', () => {
      Logger.error(`Error al cargar video YouTube: ${videoId}`)
    })

    return iframe
  }
}

// ███████████████████████████████████████████████████████████████████████████████
// █                      SISTEMA DE SWIPER EXPERIENCIA                         █
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

    // Contar slides
    const slides = document.querySelectorAll('.experience-carousel__slide')
    const totalSlides = slides.length

    if (!window.Swiper) {
      Logger.error('Swiper no está disponible')
      return false
    }

    // Inicializar Swiper
    window.experienceSwiper = new window.Swiper('.experience-swiper', {
      loop: totalSlides > 3, // Solo loop si hay más de 3 slides
      spaceBetween: 20,
      watchOverflow: true,
      centeredSlides: false,
      grabCursor: true,
      allowTouchMove: totalSlides > 1,

      // Paginación
      pagination: {
        el: '.experience-carousel__pagination',
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 1,
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

      // Breakpoints responsivos
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

      // Eventos
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

    Logger.success(`Swiper experiencia inicializado con ${totalSlides} slides`)
    return true
  }
}

// ███████████████████████████████████████████████████████████████████████████████
// █                      FUNCIONES DE UTILIDAD SWIPER                          █
// ███████████████████████████████████████████████████████████████████████████████

const updateNavigationVisibility = (swiper, totalSlides) => {
  const nextBtn = document.querySelector('.experience-carousel__next')
  const prevBtn = document.querySelector('.experience-carousel__prev')

  if (!nextBtn || !prevBtn) {
    Logger.warning('Botones de navegación no encontrados')
    return
  }

  // Si hay más de 1 slide, mostrar navegación
  const needsNavigation = totalSlides > 1

  if (needsNavigation) {
    nextBtn.classList.remove('swiper-button-hidden')
    nextBtn.setAttribute('aria-hidden', 'false')
    prevBtn.classList.remove('swiper-button-hidden')
    prevBtn.setAttribute('aria-hidden', 'false')
    updateButtonStates(swiper)
  } else {
    nextBtn.classList.add('swiper-button-hidden')
    nextBtn.setAttribute('aria-hidden', 'true')
    prevBtn.classList.add('swiper-button-hidden')
    prevBtn.setAttribute('aria-hidden', 'true')
  }
}

const updateButtonStates = swiper => {
  const nextBtn = document.querySelector('.experience-carousel__next')
  const prevBtn = document.querySelector('.experience-carousel__prev')

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
}

const updatePaginationVisibility = (swiper, totalSlides) => {
  const pagination = document.querySelector('.experience-carousel__pagination')

  if (!pagination) {
    Logger.warning('Paginación no encontrada')
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

// ███████████████████████████████████████████████████████████████████████████████
// █                     SISTEMA DE GESTIÓN DE BATERÍA                          █
// ███████████████████████████████████████████████████████████████████████████████

const BatteryOptimization = {
  init() {
    Logger.debug('🔋 Configurando optimización de batería...')

    // Gestión de visibilidad para ahorro de batería
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseAllVideos()
      } else {
        TimingUtils.delay(() => {
          this.resumeAllVideos()
        }, 500)
      }
    })

    return true
  },

  pauseAllVideos() {
    const iframes = document.querySelectorAll('.experience-carousel__video-iframe')
    iframes.forEach(iframe => {
      const currentSrc = iframe.src
      if (currentSrc && currentSrc.includes('autoplay=1')) {
        iframe.src = currentSrc.replace('autoplay=1', 'autoplay=0')
      }
    })
    Logger.debug('Videos de experiencia pausados para ahorro de batería')
  },

  resumeAllVideos() {
    const iframes = document.querySelectorAll('.experience-carousel__video-iframe')
    iframes.forEach(iframe => {
      const currentSrc = iframe.src
      if (currentSrc && currentSrc.includes('autoplay=0')) {
        iframe.src = currentSrc.replace('autoplay=0', 'autoplay=1')
      }
    })
    Logger.debug('Videos de experiencia reanudados')
  }
}

// ███████████████████████████████████████████████████████████████████████████████
// █                        INICIALIZACIÓN PRINCIPAL                            █
// ███████████████████████████████████████████████████████████████████████████████

const ExperienciaSystem = {
  async init() {
    Logger.debug('🚀 Inicializando sistema de experiencia...')

    try {
      // Función para verificar e inicializar
      const checkAndInit = () => {
        if (typeof window !== 'undefined' && window.Swiper) {
          // Inicializar sistemas
          const systems = {
            videoYouTube: VideoYouTubeSystem.init(),
            swiper: ExperienceSwiperSystem.init(),
            battery: BatteryOptimization.init()
          }

          const activeSystems = Object.entries(systems)
            .filter(([_, isActive]) => isActive)
            .map(([name]) => name)

          Logger.success(`✅ Experiencia iniciada - ${activeSystems.length} sistemas activos: ${activeSystems.join(', ')}`)
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
    // Cleanup al cambiar página
    window.addEventListener('beforeunload', () => {
      // Limpiar Swiper
      if (window.experienceSwiper) {
        window.experienceSwiper.destroy(true, true)
        window.experienceSwiper = null
      }

      // Limpiar eventos
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
    window.BatteryOptimization = BatteryOptimization
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
      }
    }, 250)
  })
}
