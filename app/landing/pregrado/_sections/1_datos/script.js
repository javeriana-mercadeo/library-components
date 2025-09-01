// ===========================================
// DATOS PROGRAMA VIDEO - OPTIMIZADO SIN RESIZE
// ===========================================

// Sistema de video HTML5 nativo optimizado
const liferayVideoSystem = {
  // Configuración del sistema
  config: {
    breakpoint: 768
  },

  // Videos cargados exitosamente para evitar errores repetidos
  loadedVideos: new Set(),

  // Sistema de reintentos para carga de videos
  retryAttempts: new Map(),
  maxRetries: 3,
  retryDelay: 1000,

  // Intersection Observer para autoplay compliance
  intersectionObserver: null,

  // Inicializar sistema de video
  init() {
    // Sistema de inicialización múltiple para manejar diferentes estados de carga
    const initStrategies = [
      // Estrategia 1: Inicialización inmediata (para casos donde ya está listo)
      { delay: 100, maxAttempts: 3, name: 'immediate' },
      // Estrategia 2: Inicialización estándar (para casos normales)
      { delay: 500, maxAttempts: 8, name: 'standard' },
      // Estrategia 3: Inicialización tardía (para cargas lentas como page refresh)
      { delay: 1000, maxAttempts: 15, name: 'delayed' }
    ]

    let strategyIndex = 0
    let globalInitialized = false

    const initializeWithStrategy = strategy => {
      if (globalInitialized) {
        return
      }

      let attempts = 0

      const tryInit = () => {
        if (globalInitialized) return

        attempts++
        const containers = document.querySelectorAll('[data-component="video-player"]')

        if (containers.length > 0) {
          // Verificar que los contenedores estén realmente renderizados y visibles
          const validContainers = Array.from(containers).filter(container => {
            const rect = container.getBoundingClientRect()
            return container.offsetWidth > 0 && container.offsetHeight > 0 && rect.width > 0 && rect.height > 0
          })

          if (validContainers.length > 0) {
            globalInitialized = true
            this.setupVideoContainers()
            return
          } else if (attempts < strategy.maxAttempts) {
            setTimeout(tryInit, strategy.delay)
          } else {
            console.warn(`[VideoPlayer] Estrategia ${strategy.name} falló después de ${strategy.maxAttempts} intentos`)
            // Intentar siguiente estrategia
            strategyIndex++
            if (strategyIndex < initStrategies.length && !globalInitialized) {
              setTimeout(() => initializeWithStrategy(initStrategies[strategyIndex]), 200)
            }
          }
        } else if (attempts < strategy.maxAttempts) {
          setTimeout(tryInit, strategy.delay)
        } else {
          console.warn(
            `[VideoPlayer] Estrategia ${strategy.name}: no se encontraron contenedores después de ${strategy.maxAttempts} intentos`
          )
          // Intentar siguiente estrategia
          strategyIndex++
          if (strategyIndex < initStrategies.length && !globalInitialized) {
            setTimeout(() => initializeWithStrategy(initStrategies[strategyIndex]), 200)
          }
        }
      }

      tryInit()
    }

    // Iniciar con la primera estrategia
    initializeWithStrategy(initStrategies[0])

    // Sistema de fallback adicional: si después de 8 segundos no se ha inicializado,
    // forzar una inicialización final (útil para page refreshes muy lentos)
    setTimeout(() => {
      if (!globalInitialized) {
        console.warn('[VideoPlayer] Sistema de fallback final activado después de 8 segundos')
        const containers = document.querySelectorAll('[data-component="video-player"]')
        if (containers.length > 0) {
          globalInitialized = true
          this.setupVideoContainers()
        }
      }
    }, 8000)
  },

  // Configurar contenedores de video
  setupVideoContainers() {
    const containers = document.querySelectorAll('[data-component="video-player"]')

    containers.forEach(container => {
      this.initializeVideoContainer(container)
    })

    // Configurar Intersection Observer para autoplay compliance
    this.setupIntersectionObserver()
  },

  // Configurar Intersection Observer para reproducción automática
  setupIntersectionObserver() {
    if (!('IntersectionObserver' in window)) {
      return
    }

    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect()
    }

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5 // Video debe estar 50% visible
    }

    this.intersectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const videos = entry.target.querySelectorAll('video')
        const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

        videos.forEach(video => {
          if (entry.isIntersecting) {
            // En mobile, controlar reproducción por visibilidad
            // En desktop, solo remover overlay si existe
            if (isMobile) {
              this.playVideoSafely(video)
            } else {
              // En desktop, solo reproducir si está pausado y no hay overlay
              if (video.paused && !entry.target.querySelector('.video-play-overlay')) {
                this.playVideoSafely(video)
              }
            }

            // Remover overlay de play si existe al entrar en vista (tanto mobile como desktop)
            const overlay = entry.target.querySelector('.video-play-overlay')
            if (overlay) {
              setTimeout(() => {
                if (!video.paused) {
                  overlay.remove()
                }
              }, 500) // Dar tiempo para que el video se reproduzca
            }
          } else {
            // Video no visible - pausar para ahorrar recursos (tanto mobile como desktop)
            if (!video.paused) {
              video.pause()
            }
          }
        })
      })
    }, options)

    // Observar todos los contenedores de video
    const containers = document.querySelectorAll('[data-component="video-player"]')
    containers.forEach(container => {
      this.intersectionObserver.observe(container)
    })
  },

  // Reproducir video de forma segura respetando políticas de autoplay
  playVideoSafely(video) {
    if (!video) {
      console.warn('[VideoPlayer] No hay video para reproducir')
      return
    }

    // Si el video no está listo, esperar un poco y reintentar
    if (video.readyState < 2) {
      // Intentar cargar el video si no se ha intentado
      if (video.readyState === 0 && video.src) {
        video.load()
      }

      // Esperar y reintentar
      setTimeout(() => {
        if (video.readyState >= 2) {
          this.playVideoSafely(video)
        } else {
          // Si el video definitivamente no se está cargando, activar reintentos
          if (video.readyState === 0 && video.networkState === 3) {
            console.warn('[VideoPlayer] Video falló al cargar completamente, activando reintentos')
            const container = video.closest('[data-component="video-player"]')
            if (container) {
              this.retryVideoInitialization(container)
            }
          }
        }
      }, 500)
      return
    }

    // Asegurar que está muted para autoplay
    video.muted = true
    video.defaultMuted = true
    video.volume = 0

    video
      .play()
      .then(() => {})
      .catch(error => {
        console.warn('[VideoPlayer] Autoplay bloqueado:', error.name, error.message)
        // Autoplay bloqueado - mostrar overlay de play para interacción del usuario
        this.showPlayOverlay(video.parentElement, video)
      })
  },

  // Mostrar overlay de play cuando autoplay es bloqueado
  showPlayOverlay(container, video) {
    // Si se pasa solo el video como primer parámetro, detectar contenedor
    if (!video && container && container.tagName === 'VIDEO') {
      video = container
      container = video.parentElement
    }

    if (!container || !video || container.querySelector('.video-play-overlay')) {
      console.warn('[VideoPlayer] No se puede mostrar overlay:', {
        hasContainer: !!container,
        hasVideo: !!video,
        overlayExists: !!container?.querySelector('.video-play-overlay')
      })
      return
    }

    const overlay = document.createElement('div')
    overlay.className = 'video-play-overlay'
    overlay.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 10;
      border-radius: inherit;
    `

    const playButton = document.createElement('div')
    playButton.style.cssText = `
      width: 80px;
      height: 80px;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s ease;
    `

    const playIcon = document.createElement('div')
    playIcon.style.cssText = `
      width: 0;
      height: 0;
      border-left: 25px solid #333;
      border-top: 15px solid transparent;
      border-bottom: 15px solid transparent;
      margin-left: 5px;
    `

    playButton.appendChild(playIcon)
    overlay.appendChild(playButton)

    // Hover effect
    overlay.addEventListener('mouseenter', () => {
      playButton.style.transform = 'scale(1.1)'
    })
    overlay.addEventListener('mouseleave', () => {
      playButton.style.transform = 'scale(1)'
    })

    // Click handler para reproducir video
    overlay.addEventListener('click', e => {
      e.preventDefault()
      e.stopPropagation()

      // Asegurar que está muted para autoplay
      video.muted = true
      video.defaultMuted = true
      video.volume = 0

      video
        .play()
        .then(() => {
          overlay.remove()
        })
        .catch(error => {
          console.warn('[VideoPlayer] Error al reproducir desde overlay:', error.name, error.message)
          // Si aún falla, intentar después de un breve delay
          setTimeout(() => {
            video
              .play()
              .then(() => {
                overlay.remove()
              })
              .catch(retryError => {
                console.error('[VideoPlayer] Falló definitivamente:', retryError)
              })
          }, 200)
        })
    })

    container.style.position = 'relative'
    container.appendChild(overlay)
  },

  // Inicializar contenedor específico
  initializeVideoContainer(container) {
    // Verificar si ya está inicializado
    if (container.classList.contains('video-initialized')) {
      return
    }

    // Limpiar cualquier contenido previo
    container.innerHTML = ''

    // Mostrar loading state
    const loadingState = this.showLoadingState(container)

    // Obtener URLs directas desde data attributes o configuración de Liferay
    const mobileVideoUrl = this.getVideoUrl(container, 'mobile')
    const desktopVideoUrl = this.getVideoUrl(container, 'desktop')

    // Detectar dispositivo para priorizar el video correcto
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

    // Crear videos priorizando el apropiado para el dispositivo
    let hasValidVideo = false

    if (isMobile && mobileVideoUrl) {
      this.createVideoElement(container, mobileVideoUrl, 'mobile')
      hasValidVideo = true

      // También crear desktop como fallback
      if (desktopVideoUrl) {
        this.createVideoElement(container, desktopVideoUrl, 'desktop')
      }
    } else {
      // Para desktop, crear desktop primero
      if (desktopVideoUrl) {
        this.createVideoElement(container, desktopVideoUrl, 'desktop')
        hasValidVideo = true
      }

      // También crear mobile como fallback
      if (mobileVideoUrl) {
        this.createVideoElement(container, mobileVideoUrl, 'mobile')
        hasValidVideo = true
      }
    }

    // Si no hay videos válidos, mostrar error y remover loading
    if (!hasValidVideo) {
      loadingState.remove()
      this.showError(container, 'general')
    }

    // Marcar como inicializado
    container.classList.add('video-initialized')
  },

  // Reintentar inicialización de video con reintentos
  retryVideoInitialization(container) {
    const containerId = container.id || 'unknown'
    const currentAttempts = this.retryAttempts.get(containerId) || 0

    if (currentAttempts >= this.maxRetries) {
      console.warn(`[VideoPlayer] Máximo de reintentos alcanzado para ${containerId}`)
      this.showError(container, 'max_retries')
      return
    }

    // Incrementar contador de intentos
    this.retryAttempts.set(containerId, currentAttempts + 1)

    // Limpiar contenedor antes de reintentar
    container.innerHTML = ''
    container.classList.remove('video-initialized', 'video-loaded')

    // Reintentar después del delay
    setTimeout(() => {
      this.initializeVideoContainer(container)
    }, this.retryDelay)
  },

  // Obtener URL del video (simplificado para URLs directas)
  getVideoUrl(container, type) {
    // Primero intentar desde configuración de Liferay
    if (typeof configuration !== 'undefined') {
      const configUrl = type === 'mobile' ? configuration.urlVideoMobile : configuration.urlVideoDesktop
      if (configUrl && configUrl.trim() !== '') {
        return configUrl
      }
    }

    // Obtener URL directa desde data attributes
    const dataAttr = type === 'mobile' ? 'data-video-mobile-url' : 'data-video-desktop-url'
    const url = container.getAttribute(dataAttr)

    if (url && url.trim() !== '') {
      return url
    }

    return null
  },

  // Crear elemento de video HTML5
  createVideoElement(container, videoUrl, type) {
    const video = document.createElement('video')

    // Configuración del video HTML5 nativo usando setAttribute
    video.setAttribute('src', videoUrl)
    video.setAttribute('class', `program-data__video program-data__video--${type}`)
    video.setAttribute('data-video-type', type) // Identificar el tipo
    video.setAttribute('muted', '')
    video.setAttribute('loop', '')
    video.setAttribute('playsinline', '')
    video.setAttribute('preload', 'metadata')
    video.setAttribute('disablepictureinpicture', '')
    // NO establecer autoplay ni controls por políticas del navegador

    // Configuraciones adicionales para compatibilidad móvil
    video.setAttribute('webkit-playsinline', '')
    video.setAttribute('x5-video-player-type', 'h5')
    video.setAttribute('x5-video-player-fullscreen', 'true')

    // Propiedades directas para asegurar funcionalidad y autoplay compliance
    video.autoplay = false // Será manejado por Intersection Observer
    video.muted = true
    video.loop = true
    video.playsInline = true
    video.controls = false
    video.defaultMuted = true
    video.volume = 0
    video.disablePictureInPicture = true

    // Estilos CSS - NO establecer width/height para que los estilos CSS responsive funcionen
    video.style.objectFit = 'cover'
    video.style.backgroundColor = '#000'
    video.style.opacity = '0'
    video.style.transition = 'opacity 0.5s ease'

    // Identificador único para el video
    const videoId = `${type}-${videoUrl}`

    // Detectar si es dispositivo móvil
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

    // Eventos de carga optimizados
    video.addEventListener('canplay', () => {
      this.onVideoLoad(container, video, videoId, isMobile)
    })

    video.addEventListener('loadeddata', () => {
      this.onVideoLoad(container, video, videoId, isMobile)
    })

    // Evento específico para móviles - cuando el video está listo para reproducir
    video.addEventListener('canplaythrough', () => {
      if (isMobile) {
        this.onVideoLoad(container, video, videoId, isMobile)
      }
    })

    video.addEventListener('error', () => {
      console.warn('[VideoPlayer] Error en video:', {
        videoId: videoId,
        error: video.error?.code,
        src: video.src,
        container: container.id
      })

      // Evitar errores repetidos para el mismo video
      if (this.loadedVideos.has(videoId)) {
        return
      }

      if (video.error) {
        // Intentar alternativas para errores de formato y decodificación
        if ((video.error.code === 3 || video.error.code === 4) && !this.loadedVideos.has(videoId + '-retry')) {
          this.retryVideoWithAlternatives(video, videoUrl, type, videoId)
          return
        }
      }

      // Si falla, intentar reinicializar el contenedor completo
      this.retryVideoInitialization(container)
    })

    // Event listener para pausas inesperadas (común en móviles)
    video.addEventListener('pause', e => {
      if (!video.ended && this.isVideoVisible(container)) {
        // Si el video se pausó inesperadamente y está visible, mostrar overlay
        // Timeout más corto para autoplay bloqueado, más largo para pausa inesperada
        const timeout = video.currentTime === 0 ? 100 : 1000

        setTimeout(() => {
          if (video.paused && !video.ended) {
            this.showPlayOverlay(container, video)
          }
        }, timeout)
      }
    })

    // Añadir video al contenedor
    container.appendChild(video)

    // Timeout de seguridad más rápido para móviles
    const timeout = isMobile ? 1000 : 500
    setTimeout(() => {
      this.onVideoLoad(container, video, videoId, isMobile)

      // Si aún tiene opacity 0, forzar a 1
      if (video.style.opacity === '0') {
        video.style.opacity = '1'
        container.classList.add('video-loaded')
      }
    }, timeout)

    // Timeout para detectar videos que no cargan y activar reintentos
    const loadTimeout = isMobile ? 5000 : 3000
    setTimeout(() => {
      if (video.readyState < 2 && !this.loadedVideos.has(videoId)) {
        console.warn('[VideoPlayer] Video no se cargó en tiempo esperado:', {
          videoId: videoId,
          type: type,
          readyState: video.readyState,
          networkState: video.networkState,
          error: video.error,
          src: video.src
        })

        // Si es el video móvil que no carga, intentar con el desktop
        if (type === 'mobile') {
          const desktopVideo = container.querySelector('video[data-video-type="desktop"]')
          if (desktopVideo && desktopVideo.readyState >= 2) {
            video.style.display = 'none'
            desktopVideo.style.display = 'block'
            return
          }
        }

        // Si no hay alternativa viable, activar reintentos del contenedor completo
        this.retryVideoInitialization(container)
      }
    }, loadTimeout)
  },

  // Video cargado exitosamente
  onVideoLoad(container, video, videoId, isMobile = false) {
    if (!container.classList.contains('video-loaded')) {
      container.classList.add('video-loaded')
      video.style.opacity = '1'
      this.loadedVideos.add(videoId)

      // Limpiar contador de reintentos al cargar exitosamente
      const containerId = container.id || 'unknown'
      if (this.retryAttempts.has(containerId)) {
        this.retryAttempts.delete(containerId)
      }

      // Remover loading state si existe
      const loadingState = container.querySelector('.video-loading')
      if (loadingState) {
        loadingState.remove()
      }

      // Para fresh page loads, intentar reproducción inmediata con retry agresivo
      const pageLoadTime = performance.now()
      const isFreshLoad = pageLoadTime < 5000 // Si la página se cargó hace menos de 5 segundos

      // En desktop, reproducir inmediatamente sin esperar visibilidad
      // En mobile, esperar a que esté visible (Intersection Observer)
      if (!isMobile) {
        if (isFreshLoad) {
          this.attemptAggressivePlayback(video, isMobile)
        } else {
          this.playVideoSafely(video)
        }
      } else if (this.isVideoVisible(container)) {
        // Solo para mobile, verificar visibilidad
        if (isFreshLoad) {
          this.attemptAggressivePlayback(video, isMobile)
        } else {
          setTimeout(() => {
            this.playVideoSafely(video)
          }, 200)
        }
      }
    }
  },

  // Reproducción agresiva para fresh page loads
  attemptAggressivePlayback(video, isMobile = false) {
    let attempt = 0
    const maxAttempts = 5
    const baseDelay = isMobile ? 300 : 150

    const tryPlay = () => {
      attempt++

      // Asegurar configuración para autoplay
      video.muted = true
      video.defaultMuted = true
      video.volume = 0

      // Si el video no está listo, forzar carga
      if (video.readyState < 2) {
        video.load()

        // Esperar a que esté listo y reintentar
        const readyHandler = () => {
          if (video.readyState >= 2) {
            video.removeEventListener('canplay', readyHandler)
            video.removeEventListener('loadeddata', readyHandler)
            setTimeout(() => {
              if (attempt <= maxAttempts) {
                tryPlay()
              }
            }, 100)
          }
        }

        video.addEventListener('canplay', readyHandler, { once: true })
        video.addEventListener('loadeddata', readyHandler, { once: true })

        // Timeout de seguridad
        setTimeout(() => {
          video.removeEventListener('canplay', readyHandler)
          video.removeEventListener('loadeddata', readyHandler)
          if (attempt <= maxAttempts) {
            tryPlay()
          }
        }, baseDelay * 2)

        return
      }

      // Intentar reproducir
      video
        .play()
        .then(() => {})
        .catch(error => {
          console.warn(`[VideoPlayer] Fallo en intento agresivo ${attempt}:`, error.name)

          if (attempt < maxAttempts) {
            // Incrementar delay progresivamente
            const delay = baseDelay * attempt
            setTimeout(tryPlay, delay)
          } else {
            console.warn('[VideoPlayer] Reproducción agresiva falló, mostrando overlay')
            this.showPlayOverlay(video.parentElement, video)
          }
        })
    }

    // Comenzar intentos inmediatamente
    tryPlay()
  },

  // Verificar si el video está visible en viewport
  isVideoVisible(container) {
    const rect = container.getBoundingClientRect()
    const windowHeight = window.innerHeight || document.documentElement.clientHeight
    const windowWidth = window.innerWidth || document.documentElement.clientWidth

    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= windowHeight && rect.right <= windowWidth && rect.width > 0 && rect.height > 0
  },

  // Obtener mensaje de error descriptivo
  getVideoErrorMessage(errorCode) {
    const errorMessages = {
      1: 'MEDIA_ERR_ABORTED - Carga abortada',
      2: 'MEDIA_ERR_NETWORK - Error de red',
      3: 'MEDIA_ERR_DECODE - Error decodificando',
      4: 'MEDIA_ERR_SRC_NOT_SUPPORTED - Formato no soportado'
    }
    return errorMessages[errorCode] || `Error desconocido (${errorCode})`
  },

  // Reintentar video con alternativas para Liferay
  retryVideoWithAlternatives(video, videoUrl, type, videoId) {
    // Marcar que se está intentando un retry
    this.loadedVideos.add(videoId + '-retry')

    const alternatives = [
      videoUrl + '?v=' + Date.now(), // Cache bust
      videoUrl + '?format=mp4', // Forzar formato
      videoUrl.replace(/\/$/, '') + '?codec=h264', // Forzar codec H.264
      videoUrl.replace(/\/$/, '') // Sin parámetros
    ]

    let currentIndex = 0

    const tryNext = () => {
      if (currentIndex >= alternatives.length) {
        this.showError(video.parentElement, type)
        return
      }

      const newUrl = alternatives[currentIndex]
      video.src = newUrl

      const errorHandler = () => {
        currentIndex++
        video.removeEventListener('error', errorHandler)
        tryNext()
      }

      video.addEventListener('error', errorHandler, { once: true })
      video.load()
    }

    tryNext()
  },

  // Mostrar imagen de fallback cuando falla el video
  showError(container, type) {
    // Log del error en consola para debugging
    console.warn(`[VideoPlayer] Error cargando video (${type}):`, {
      container: container.id,
      desktopUrl: container.getAttribute('data-video-desktop-url'),
      mobileUrl: container.getAttribute('data-video-mobile-url'),
      fallbackImage: container.getAttribute('data-image-fallback')
    })

    // Siempre intentar mostrar imagen de fallback
    const fallbackImage = container.getAttribute('data-image-fallback')

    if (fallbackImage && fallbackImage.trim()) {
      this.showFallbackImage(container, fallbackImage)
    } else {
      console.error('[VideoPlayer] No hay imagen de fallback configurada')
      // En lugar de mostrar error, mostrar contenedor vacío
      container.innerHTML = ''
      container.classList.add('video-loaded')
    }
  },

  // Mostrar imagen de fallback
  showFallbackImage(container, imageUrl) {
    const imageDiv = document.createElement('div')
    imageDiv.className = 'video-fallback-image'
    imageDiv.style.cssText = `
      width: 100%;
      height: 100%;
      background-image: url('${imageUrl}');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      border-radius: 8px;
      position: relative;
    `

    container.innerHTML = ''
    container.appendChild(imageDiv)
    container.classList.add('video-loaded')
  },

  // Agregar loading state específico para móviles
  showLoadingState(container) {
    const loadingDiv = document.createElement('div')
    loadingDiv.className = 'video-loading'
    loadingDiv.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      background: #000;
      color: #fff;
      border-radius: 8px;
      font-family: Arial, sans-serif;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 5;
    `

    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    const fontSize = isMobile ? '12px' : '14px'

    loadingDiv.innerHTML = `
      <div style="text-align: center; padding: 20px;">
        <div style="
          width: 40px;
          height: 40px;
          border: 3px solid rgba(255,255,255,0.3);
          border-top: 3px solid #fff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 10px auto;
        "></div>
        <p style="margin: 0; font-size: ${fontSize}; opacity: 0.8;">
          ${isMobile ? 'Cargando video...' : 'Preparando video...'}
        </p>
      </div>
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    `

    container.style.position = 'relative'
    container.appendChild(loadingDiv)

    // Auto-remove loading after timeout
    setTimeout(() => {
      if (loadingDiv.parentElement) {
        loadingDiv.remove()
      }
    }, 5000)

    return loadingDiv
  }
}

// Sistema de datos del programa
const programDataSystem = {
  init() {
    // Escuchar eventos de carga de datos desde Liferay
    document.addEventListener('data_load-program', () => {
      this.updateProgramName()
      // Reinicializar videos con nueva configuración
      liferayVideoSystem.init()
    })
    
    // Inicializar sistema de modales
    this.initModals()
  },

  updateProgramName() {
    const context = document.getElementById('datos')
    if (context) {
      const dataPujName = context.querySelector('[data-puj-name]')
      if (dataPujName) {
        let currentContent = dataPujName.textContent.trim()
        if (!currentContent.endsWith(':')) {
          dataPujName.textContent = `${currentContent}: `
        }
      }
    }
  },

  initModals() {
    // Configurar eventos para abrir modales
    document.addEventListener('click', (e) => {
      // Botón para abrir modal
      if (e.target.hasAttribute('data-modal-target') || e.target.closest('[data-modal-target]')) {
        e.preventDefault()
        const button = e.target.hasAttribute('data-modal-target') ? e.target : e.target.closest('[data-modal-target]')
        const modalId = button.getAttribute('data-modal-target')
        this.openModal(modalId)
      }
      
      // Botón para cerrar modal
      if (e.target.classList.contains('program-detail-modal__close') || e.target.closest('.program-detail-modal__close')) {
        e.preventDefault()
        const modal = e.target.closest('.program-detail-modal')
        if (modal) {
          this.closeModal(modal.id)
        }
      }
    })

    // Cerrar modal al hacer clic en el overlay
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('program-detail-modal') && e.target.classList.contains('program-detail-modal--active')) {
        this.closeModal(e.target.id)
      }
    })

    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const openModal = document.querySelector('.program-detail-modal--active')
        if (openModal) {
          this.closeModal(openModal.id)
        }
      }
    })
  },

  openModal(modalId) {
    const modal = document.getElementById(modalId)
    if (modal) {
      modal.classList.add('program-detail-modal--active')
      document.body.style.overflow = 'hidden' // Prevenir scroll del body
      
      // Enfocar el modal para accesibilidad
      const closeButton = modal.querySelector('.program-detail-modal__close')
      if (closeButton) {
        closeButton.focus()
      }
    }
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId)
    if (modal) {
      modal.classList.remove('program-detail-modal--active')
      document.body.style.overflow = '' // Restaurar scroll del body
    }
  }
}

// Inicialización principal
const initProgramDataVideo = () => {
  programDataSystem.init()
  liferayVideoSystem.init()

  // Sistema de activación por interacción del usuario (útil para autoplay policies)
  const setupUserInteractionTrigger = () => {
    let interactionTriggered = false

    const handleUserInteraction = () => {
      if (interactionTriggered) return
      interactionTriggered = true

      // Intentar reproducir todos los videos cargados que estén pausados
      const containers = document.querySelectorAll('[data-component="video-player"].video-loaded')
      containers.forEach(container => {
        const videos = container.querySelectorAll('video')
        videos.forEach(video => {
          if (video.paused && liferayVideoSystem.isVideoVisible(container)) {
            liferayVideoSystem.playVideoSafely(video)
          }
        })
      })

      // Remover listeners después de la primera interacción
      document.removeEventListener('click', handleUserInteraction, true)
      document.removeEventListener('touchstart', handleUserInteraction, true)
      document.removeEventListener('scroll', handleUserInteraction, true)
      document.removeEventListener('keydown', handleUserInteraction, true)
    }

    // Agregar listeners para diferentes tipos de interacción
    document.addEventListener('click', handleUserInteraction, { passive: true, capture: true })
    document.addEventListener('touchstart', handleUserInteraction, { passive: true, capture: true })
    document.addEventListener('scroll', handleUserInteraction, { passive: true, capture: true })
    document.addEventListener('keydown', handleUserInteraction, { passive: true, capture: true })

    // Auto-remover después de 30 segundos si no hay interacción
    setTimeout(() => {
      document.removeEventListener('click', handleUserInteraction, true)
      document.removeEventListener('touchstart', handleUserInteraction, true)
      document.removeEventListener('scroll', handleUserInteraction, true)
      document.removeEventListener('keydown', handleUserInteraction, true)
    }, 30000)
  }

  // Configurar trigger de interacción después de un breve delay
  setTimeout(setupUserInteractionTrigger, 1000)
}

// Ejecutar inicialización
const initSystem = () => {
  // Prevenir inicializaciones múltiples
  if (window.doubleProgramDataVideoInitialized) {
    return
  }
  window.doubleProgramDataVideoInitialized = true

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProgramDataVideo)
  } else {
    initProgramDataVideo()
  }
}

// Exportar función e inicializar inmediatamente
export default initSystem

// Ejecutar inmediatamente
if (typeof window !== 'undefined') {
  initSystem()
}
