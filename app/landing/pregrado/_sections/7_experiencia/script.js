// ===========================================
// SCRIPT EXPERIENCIA - SISTEMA DE CARRUSEL
// ===========================================

// ███████████████████████████████████████████████████████████████████████████████
// █                   SISTEMA DE VIDEO YOUTUBE CON CONTROLES PERSONALIZADOS    █
// ███████████████████████████████████████████████████████████████████████████████

const VideoYouTubeSystem = {
  players: new Map(), // Almacenar referencias a los players de YouTube

  init() {
    console.log('🎬 [VIDEO] Inicializando sistema de videos YouTube con controles personalizados...')

    const videoContainers = document.querySelectorAll('.experience-carousel__video-container[data-video-id]')

    if (videoContainers.length === 0) {
      console.log('🎬 [VIDEO] No se encontraron contenedores de video')
      return false
    }

    // Cargar API de YouTube si no está disponible
    this.loadYouTubeAPI(() => {
      // Cargar todos los videos con configuración simple
      videoContainers.forEach((container, index) => {
        this.createVideoWithCustomControls(container, index === 0)
      })

      console.log(`🎬 [VIDEO] ${videoContainers.length} videos cargados con controles personalizados`)
    })

    return true
  },

  loadYouTubeAPI(callback) {
    if (window.YT && window.YT.Player) {
      callback()
      return
    }

    // Cargar API de YouTube
    window.onYouTubeIframeAPIReady = callback

    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const script = document.createElement('script')
      script.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(script)
    }
  },

  createVideoWithCustomControls(container, isFirstVideo = false) {
    const videoId = container.dataset.videoId
    const orientation = container.dataset.videoOrientation || 'horizontal'

    if (!videoId) {
      console.error('🎬 [VIDEO] Video ID no encontrado:', container)
      return
    }

    console.log(`🎬 [VIDEO] Creando video con controles personalizados: ${videoId}`)

    // Crear estructura HTML para video + controles
    const videoWrapper = document.createElement('div')
    videoWrapper.className = 'video-wrapper'

    // Crear div para el player de YouTube
    const playerDiv = document.createElement('div')
    playerDiv.id = `youtube-player-${videoId}-${Date.now()}`
    playerDiv.className = `experience-carousel__video-iframe experience-carousel__video-iframe--${orientation}`

    // Crear controles personalizados
    const controlsDiv = document.createElement('div')
    controlsDiv.className = 'custom-video-controls'
    controlsDiv.innerHTML = `
      <button class="volume-btn muted" data-video-id="${videoId}" title="Activar/Desactivar audio">
        <i class="ph ph-speaker-x volume-icon-muted"></i>
        <i class="ph ph-speaker-high volume-icon-unmuted" style="display: none;"></i>
      </button>
      <div class="volume-slider-container" style="display: none;">
        <input type="range" class="volume-slider" min="0" max="100" value="50" data-video-id="${videoId}">
      </div>
    `

    // Ensamblar estructura
    videoWrapper.appendChild(playerDiv)
    videoWrapper.appendChild(controlsDiv)

    // Insertar en contenedor
    container.innerHTML = ''
    container.appendChild(videoWrapper)

    // Crear player de YouTube usando API
    const player = new window.YT.Player(playerDiv.id, {
      videoId: videoId,
      playerVars: {
        controls: 1,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        autoplay: isFirstVideo ? 1 : 0,
        mute: 0, // Siempre muteado por defecto
        playsinline: 1
      },
      events: {
        onReady: event => {
          console.log(`🎬 [VIDEO] Player listo: ${videoId}`)
          this.setupCustomControls(event.target, videoId, controlsDiv)
        },
        onStateChange: event => {
          console.log(`🎬 [VIDEO] Estado cambiado: ${videoId}`, event.data)
        }
      }
    })

    // Almacenar referencia al player
    this.players.set(videoId, player)

    // Marcar primer video si es necesario
    if (isFirstVideo) {
      playerDiv.setAttribute('data-first-video', 'true')
      container.setAttribute('data-is-first-video', 'true')
    }

    console.log(`🎬 [VIDEO] Video con controles personalizados creado: ${videoId} (${orientation})`)

    return player
  },

  setupCustomControls(player, videoId, controlsDiv) {
    const volumeBtn = controlsDiv.querySelector('.volume-btn')
    const volumeSlider = controlsDiv.querySelector('.volume-slider')
    const volumeSliderContainer = controlsDiv.querySelector('.volume-slider-container')
    const mutedIcon = controlsDiv.querySelector('.volume-icon-muted')
    const unmutedIcon = controlsDiv.querySelector('.volume-icon-unmuted')

    let isMuted = true
    let currentVolume = 50

    // Función para actualizar iconos
    const updateVolumeIcon = muted => {
      if (muted) {
        mutedIcon.style.display = 'block'
        unmutedIcon.style.display = 'none'
        volumeBtn.classList.add('muted')
      } else {
        mutedIcon.style.display = 'none'
        unmutedIcon.style.display = 'block'
        volumeBtn.classList.remove('muted')
      }
    }

    // Click en botón de volumen
    volumeBtn.addEventListener('click', () => {
      if (isMuted) {
        player.unMute()
        player.setVolume(currentVolume)
        isMuted = false
        console.log(`🎬 [CONTROLS] Audio activado para ${videoId}`)
      } else {
        player.mute()
        isMuted = true
        console.log(`🎬 [CONTROLS] Audio desactivado para ${videoId}`)
      }
      updateVolumeIcon(isMuted)
    })

    // Hover para mostrar slider
    volumeBtn.addEventListener('mouseenter', () => {
      volumeSliderContainer.style.display = 'block'
    })

    volumeBtn.addEventListener('mouseleave', () => {
      setTimeout(() => {
        if (!volumeSliderContainer.matches(':hover')) {
          volumeSliderContainer.style.display = 'none'
        }
      }, 200)
    })

    volumeSliderContainer.addEventListener('mouseleave', () => {
      volumeSliderContainer.style.display = 'none'
    })

    // Cambio en slider de volumen
    volumeSlider.addEventListener('input', e => {
      currentVolume = parseInt(e.target.value)
      player.setVolume(currentVolume)

      if (currentVolume === 0) {
        player.mute()
        isMuted = true
      } else if (isMuted) {
        player.unMute()
        isMuted = false
      }

      updateVolumeIcon(isMuted)
      console.log(`🎬 [CONTROLS] Volumen cambiado a ${currentVolume}% para ${videoId}`)
    })

    // Inicializar estado
    updateVolumeIcon(isMuted)
    volumeSlider.value = currentVolume

    console.log(`🎬 [CONTROLS] Controles personalizados configurados para ${videoId}`)
  },

  // Función simple para pausar todos los videos
  pauseAllVideos() {
    this.players.forEach((player, videoId) => {
      try {
        if (player && player.pauseVideo) {
          player.pauseVideo()
          console.log(`🎬 [VIDEO] Video pausado: ${videoId}`)
        }
      } catch (e) {
        console.debug('No se pudo pausar video:', videoId, e)
      }
    })
    console.log('🎬 [VIDEO] Todos los videos pausados')
  },

  // Función para reproducir un video específico
  playVideo(videoIdOrPlayer) {
    try {
      if (typeof videoIdOrPlayer === 'string') {
        const player = this.players.get(videoIdOrPlayer)
        if (player && player.playVideo) {
          player.playVideo()
          console.log(`🎬 [VIDEO] Video reproducido: ${videoIdOrPlayer}`)
        }
      } else if (videoIdOrPlayer && videoIdOrPlayer.playVideo) {
        videoIdOrPlayer.playVideo()
        console.log('🎬 [VIDEO] Video reproducido')
      }
    } catch (e) {
      console.debug('No se pudo reproducir video:', e)
    }
  },

  // Función para pausar un video específico
  pauseVideo(videoIdOrPlayer) {
    try {
      if (typeof videoIdOrPlayer === 'string') {
        const player = this.players.get(videoIdOrPlayer)
        if (player && player.pauseVideo) {
          player.pauseVideo()
          console.log(`🎬 [VIDEO] Video pausado: ${videoIdOrPlayer}`)
        }
      } else if (videoIdOrPlayer && videoIdOrPlayer.pauseVideo) {
        videoIdOrPlayer.pauseVideo()
        console.log('🎬 [VIDEO] Video pausado')
      }
    } catch (e) {
      console.debug('No se pudo pausar video:', e)
    }
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

      // Paginación - IGUAL A RELACIONADOS
      pagination: {
        el: '.experience-carousel__pagination',
        clickable: true,
        dynamicBullets: false,
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

const handleVideoSlideChange = swiper => {
  if (!swiper?.el) return

  // Pausar todos los videos cuando se cambia de slide
  VideoYouTubeSystem.pauseAllVideos()

  console.log('🎠 [SWIPER] Slide cambiado - videos pausados')
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
    console.log('👁️ [VISIBILITY] Configurando gestión de visibilidad...')

    // Pausar videos cuando se cambia de pestaña
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        VideoYouTubeSystem.pauseAllVideos()
        console.log('👁️ [VISIBILITY] Pestaña oculta - videos pausados')
      }
    })

    // Configurar autoplay para el primer video cuando sea visible
    this.setupFirstVideoAutoplay()

    return true
  },

  setupFirstVideoAutoplay() {
    if (!window.IntersectionObserver) return

    const firstVideoContainer = document.querySelector('.experience-carousel__video-container[data-is-first-video="true"]')

    if (!firstVideoContainer) {
      console.log('👁️ [VISIBILITY] No se encontró primer video')
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const iframe = entry.target.querySelector('iframe[data-first-video="true"]')

          if (iframe) {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
              // Primer video visible al 50%, iniciar reproducción
              VideoYouTubeSystem.playVideo(iframe)
              console.log('👁️ [VISIBILITY] Primer video visible - reproduciendo')
            } else {
              // Primer video no visible, pausar
              VideoYouTubeSystem.pauseVideo(iframe)
              console.log('👁️ [VISIBILITY] Primer video no visible - pausando')
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
    console.log('👁️ [VISIBILITY] Observador configurado para primer video')
  }
}

// ███████████████████████████████████████████████████████████████████████████████
// █                        INICIALIZACIÓN PRINCIPAL                            █
// ███████████████████████████████████████████████████████████████████████████████

const ExperienciaSystem = {
  async init() {
    console.log('🚀 [EXPERIENCIA] Inicializando sistema de experiencia...')

    try {
      const checkAndInit = () => {
        if (typeof window !== 'undefined' && window.Swiper) {
          // Inicializar sistemas en orden
          const systems = {
            videoYouTube: VideoYouTubeSystem.init(),
            swiper: ExperienceSwiperSystem.init(),
            visibility: VisibilityManagement.init()
          }

          const activeSystems = Object.entries(systems)
            .filter(([_, isActive]) => isActive)
            .map(([name]) => name)

          console.log(`✅ [EXPERIENCIA] Sistema iniciado - ${activeSystems.length} sistemas activos:`, activeSystems)
          return systems
        } else {
          console.log('⏳ [EXPERIENCIA] Esperando Swiper...')
          setTimeout(checkAndInit, 300)
        }
      }

      return checkAndInit()
    } catch (error) {
      console.error('❌ [EXPERIENCIA] Error al inicializar:', error)
      return false
    }
  },

  setupCleanup() {
    window.addEventListener('beforeunload', () => {
      if (window.experienceSwiper) {
        window.experienceSwiper.destroy(true, true)
        window.experienceSwiper = null
      }
      console.log('🧹 [EXPERIENCIA] Cleanup completado')
    })
  }
}

// ===========================================
// AUTO-INICIALIZACIÓN
// ===========================================
export default () => {
  console.log('🔧 [SCRIPT] Script de experiencia cargado')

  // Inicializar cuando el DOM esté listo
  const initWhenReady = async () => {
    console.log('🔧 [SCRIPT] Iniciando sistema de experiencia...')
    await ExperienciaSystem.init()
    ExperienciaSystem.setupCleanup()
  }

  // Usar DOMHelpers si está disponible, sino usar fallback
  if (typeof DOMHelpers !== 'undefined' && DOMHelpers.isReady) {
    DOMHelpers.isReady(initWhenReady)
  } else {
    // Fallback simple para inicialización
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initWhenReady)
    } else {
      initWhenReady()
    }
  }

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
