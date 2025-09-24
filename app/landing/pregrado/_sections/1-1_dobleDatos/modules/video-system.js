// ===========================================
// VIDEO SYSTEM MODULE
// ===========================================

/**
 * Sistema de video optimizado específicamente para móviles y rendimiento
 * Maneja detección de plataforma, carga progresiva y fallbacks
 */

import { detectPlatform } from './platform-detection.js'
import { TimerManager, EventManager, isElementVisible, getVideoUrl } from './utils.js'

class VideoSystem {
  constructor() {
    this.state = {
      initialized: false,
      loadedVideos: new Set(),
      retryAttempts: new Map(),
      intersectionObserver: null,
      resourceQueue: [],
      loadingPaused: false,
      maxRetryAttempts: 3,
      currentRetryCount: 0
    }

    this.platform = null
    this.timers = new TimerManager()
    this.events = new EventManager()
    this.logger = Logger
  }

  /**
   * Inicializar sistema con detección de plataforma
   */
  init() {
    if (this.state.initialized) {
      this.logger.warning('Sistema ya inicializado')
      return
    }

    this.platform = detectPlatform()

    // Configurar estrategia basada en plataforma
    if (this.platform.isIOS) {
      this.initIOSStrategy()
    } else if (this.platform.isAndroid) {
      this.initAndroidStrategy()
    } else {
      this.initDesktopStrategy()
    }

    this.state.initialized = true
  }

  /**
   * Estrategia específica para iOS
   */
  initIOSStrategy() {
    this.setupLazyVideoContainers()
    this.setupIntersectionObserver()
    this.setupIOSTouchHandlers()
  }

  /**
   * Estrategia específica para Android
   */
  initAndroidStrategy() {
    this.setupLazyVideoContainers()

    if (this.platform.config.useIntersectionObserver) {
      this.setupIntersectionObserver()
    } else {
      this.setupManualVisibilityCheck()
    }
  }

  /**
   * Estrategia para Desktop
   */
  initDesktopStrategy() {
    this.setupLazyVideoContainers()
    this.setupIntersectionObserver()
  }

  /**
   * Configurar contenedores con lazy loading completo
   */
  setupLazyVideoContainers() {
    const containers = document.querySelectorAll('[data-component="video-player"]')

    if (containers.length === 0) {
      this.scheduleRetryInit()
      return
    }

    containers.forEach(container => {
      if (!container.classList.contains('video-initialized')) {
        this.initializeLazyContainer(container)
      }
    })
  }

  /**
   * Inicializar contenedor lazy (solo overlay, sin cargar video aún)
   */
  initializeLazyContainer(container) {
    try {
      if (!container) {
        this.logger.error('[VideoSystem] Container es null o undefined')
        return
      }

      const fallbackImage = container.getAttribute('data-image-fallback')
      let hasVideo = false

      try {
        hasVideo = getVideoUrl(container, 'mobile') || getVideoUrl(container, 'desktop')
      } catch (error) {
        this.logger.error('[VideoSystem] Error obteniendo URLs de video:', error)
        hasVideo = false
      }

      if (fallbackImage && hasVideo) {
        // Caso ideal: hay imagen de fallback y video - mostrar overlay
        this.showVideoOverlay(container)
      } else if (hasVideo && !fallbackImage) {
        // Hay video pero sin fallback - mostrar placeholder genérico
        this.showVideoPlaceholder(container, 'Video disponible')
      } else if (!hasVideo) {
        // Sin video configurado - mostrar error placeholder
        this.showVideoPlaceholder(container, 'No hay contenido disponible')
      }

      // Marcar como inicializado pero NO como cargado
      container.classList.add('video-initialized')
      container.setAttribute('data-lazy', 'true')
    } catch (error) {
      this.logger.error('[VideoSystem] Error inicializando contenedor lazy:', error)
      // Marcar como fallido para evitar reintentos infinitos
      container.classList.add('video-failed')
    }
  }

  /**
   * Mostrar placeholder cuando no hay video ni fallback
   */
  showVideoPlaceholder(container, message = 'Cargando contenido...') {
    const placeholder = document.createElement('div')
    placeholder.className = 'program-data__video-placeholder'
    placeholder.innerHTML = `
      <div class="placeholder-content">
        <i class="ph ph-video" style="font-size: 2rem; opacity: 0.3;"></i>
        <span style="font-size: 0.9rem; opacity: 0.5;">${message}</span>
      </div>
    `

    Object.assign(placeholder.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--color-neutral-100)',
      borderRadius: 'inherit'
    })

    container.appendChild(placeholder)
  }

  /**
   * Mostrar overlay con imagen de fallback
   */
  showVideoOverlay(container) {
    const fallbackImage = container.getAttribute('data-image-fallback')
    if (!fallbackImage) return

    const overlay = document.createElement('div')
    overlay.className = 'program-data__video-overlay'
    overlay.style.backgroundImage = `url(${fallbackImage})`

    container.appendChild(overlay)
    return overlay
  }

  /**
   * Cargar video con overlay y transición suave
   */
  async loadVideoWithOverlay(container, overlay, loader) {
    try {
      const video = await this.createVideoElementAsync(container)

      // Cuando el video está listo para reproducir
      const handleCanPlay = () => {
        // Ocultar loader
        this.hideVideoLoader(loader)

        // Fade out overlay
        if (overlay) {
          overlay.classList.add('program-data__video-overlay--fade-out')
          setTimeout(() => overlay.remove(), 400)
        }

        // Intentar reproducir si está visible
        if (isElementVisible(container, this.platform.config.intersectionThreshold)) {
          this.playVideoSafely(video)
        }

        video.removeEventListener('canplay', handleCanPlay)
      }

      video.addEventListener('canplay', handleCanPlay)
      container.classList.add('video-loaded')
    } catch (error) {
      this.logger.error('[VideoSystem] Error cargando video con overlay:', error)
      this.hideVideoLoader(loader)
      // Mantener overlay como fallback en caso de error
    }
  }

  /**
   * Mostrar loader CSS simple
   */
  showVideoLoader(container) {
    const existing = container.querySelector('.program-data__video-loader')
    if (existing) return existing

    const loader = document.createElement('div')
    loader.className = 'program-data__video-loader'

    container.appendChild(loader)
    return loader
  }

  /**
   * Ocultar loader
   */
  hideVideoLoader(loader) {
    if (loader) {
      loader.classList.add('program-data__video-loader--hidden')
      setTimeout(() => loader.remove(), 300)
    }
  }

  /**
   * Configurar observador de intersección
   */
  setupIntersectionObserver() {
    if (!('IntersectionObserver' in window)) {
      this.setupManualVisibilityCheck()
      return
    }

    const options = {
      root: null,
      rootMargin: this.platform.config.lazyLoadMargin || '100px',
      threshold: this.platform.config.intersectionThreshold || 0.3
    }

    this.state.intersectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.handleVideoIntersection(entry.target, true)
        } else {
          this.handleVideoIntersection(entry.target, false)
        }
      })
    }, options)

    // Observar containers existentes
    this.observeExistingContainers()
  }

  /**
   * Observar containers de video existentes
   */
  observeExistingContainers() {
    if (!this.state.intersectionObserver) return

    // Observar TODOS los contenedores, no solo los .video-loaded
    const containers = document.querySelectorAll('[data-component="video-player"]')
    containers.forEach(container => {
      this.state.intersectionObserver.observe(container)
    })
  }

  /**
   * Manejo manual de visibilidad (fallback)
   */
  setupManualVisibilityCheck() {
    const checkVisibility = TimingUtils.throttle(() => {
      this.handleVisibilityCheck()
    }, 100)

    this.events.addEventListener(window, 'scroll', checkVisibility, { passive: true })
    this.events.addEventListener(window, 'resize', checkVisibility, { passive: true })

    this.timers.setTimeout(checkVisibility, 100)
  }

  /**
   * Verificar visibilidad manualmente
   */
  handleVisibilityCheck() {
    const containers = document.querySelectorAll('[data-component="video-player"]')

    containers.forEach(container => {
      const visible = isElementVisible(container, this.platform.config.intersectionThreshold)

      if (visible && container.hasAttribute('data-lazy') && !container.classList.contains('video-loaded')) {
        // Si es visible y lazy, cargar video
        this.handleVideoIntersection(container, true)
      } else {
        // Si ya tiene videos, manejar reproducción
        const videos = container.querySelectorAll('video')
        videos.forEach(video => {
          if (visible && video.paused) {
            this.playVideoSafely(video, 1, true)
          } else if (!visible && !video.paused) {
            video.pause()
          }
        })
      }
    })
  }

  /**
   * Manejo de intersección de video (con lazy loading)
   */
  async handleVideoIntersection(container, isVisible) {
    try {
      if (!container) {
        this.logger.warning('[VideoSystem] Container nulo en intersección')
        return
      }

      // Skip containers que han fallado
      if (container.classList.contains('video-failed')) {
        return
      }

      if (isVisible) {
        // Si es lazy y aún no se ha cargado, cargarlo ahora de forma asíncrona
        if (container.hasAttribute('data-lazy') && !container.classList.contains('video-loaded')) {
          try {
            await this.loadVideoLazily(container)
          } catch (error) {
            this.logger.error('[VideoSystem] Error cargando video lazy:', error)
            container.classList.add('video-failed')
            // Mostrar fallback visual al usuario
            this.showVideoPlaceholder(container, 'Error cargando video')
          }
        } else {
          // Si ya está cargado, solo reproducir
          const videos = container.querySelectorAll('video')
          videos.forEach(video => {
            try {
              if (video.paused) {
                this.playVideoSafely(video).catch(error => {
                  this.logger.warning('[VideoSystem] Error reproduciendo video:', error.message)
                })
              }
            } catch (error) {
              this.logger.error('[VideoSystem] Error en reproducción de video:', error)
            }
          })
        }
      } else {
        // Pausar videos cuando no son visibles
        const videos = container.querySelectorAll('video')
        videos.forEach(video => {
          try {
            if (!video.paused) {
              video.pause()
            }
          } catch (error) {
            this.logger.warning('[VideoSystem] Error pausando video:', error.message)
          }
        })
      }
    } catch (error) {
      this.logger.error('[VideoSystem] Error crítico en handleVideoIntersection:', error)
    }
  }

  /**
   * Cargar video de forma lazy y no-bloqueante
   */
  async loadVideoLazily(container) {
    // Remover atributo lazy para evitar cargas múltiples
    container.removeAttribute('data-lazy')

    try {
      // Usar requestIdleCallback para no bloquear
      await this.runInBackground(() => {
        return this.loadVideoInBackground(container)
      })
    } catch (error) {
      this.logger.error('[VideoSystem] Error en carga lazy:', error)
      // Restaurar lazy state en caso de error para retry
      container.setAttribute('data-lazy', 'true')
    }
  }

  /**
   * Ejecutar función en background sin bloquear UI
   */
  async runInBackground(taskFn) {
    return new Promise((resolve, reject) => {
      // Usar requestIdleCallback si está disponible
      if ('requestIdleCallback' in window) {
        requestIdleCallback(async deadline => {
          try {
            // Solo ejecutar si tenemos tiempo disponible
            if (deadline.timeRemaining() > 5) {
              const result = await taskFn()
              resolve(result)
            } else {
              // Si no hay tiempo, programar para el siguiente idle
              const result = await this.runInBackground(taskFn)
              resolve(result)
            }
          } catch (error) {
            reject(error)
          }
        })
      } else {
        // Fallback: usar setTimeout para ceder control
        setTimeout(async () => {
          try {
            const result = await taskFn()
            resolve(result)
          } catch (error) {
            reject(error)
          }
        }, 16) // ~60fps
      }
    })
  }

  /**
   * Cargar video en background de forma no-bloqueante
   */
  async loadVideoInBackground(container) {
    const fallbackImage = container.getAttribute('data-image-fallback')
    const hasVideo = getVideoUrl(container, 'mobile') || getVideoUrl(container, 'desktop')

    if (!hasVideo) {
      throw new Error('No hay URLs de video configuradas')
    }

    // Mostrar loader de forma no-bloqueante
    await new Promise(resolve => {
      requestAnimationFrame(() => {
        const loader = this.showVideoLoader(container)
        resolve(loader)
      })
    })

    // Si hay overlay e imagen de fallback, usar el flujo con overlay
    const existingOverlay = container.querySelector('.program-data__video-overlay')
    if (existingOverlay) {
      const loader = container.querySelector('.program-data__video-loader')
      await this.loadVideoWithOverlay(container, existingOverlay, loader)
    } else {
      // Carga directa con loader
      const loader = container.querySelector('.program-data__video-loader')
      await this.initializeVideoContainer(container, loader)
    }

    return container
  }

  /**
   * Configurar manejadores táctiles específicos para iOS
   */
  setupIOSTouchHandlers() {
    this.events.addEventListener(
      document,
      'touchstart',
      e => {
        const container = e.target.closest('[data-component="video-player"]')
        if (container) {
          const videos = container.querySelectorAll('video')
          videos.forEach(video => {
            if (video.paused && isElementVisible(container, 0.3)) {
              this.playVideoSafely(video, 1, false)
            }
          })
        }
      },
      { passive: true }
    )
  }

  /**
   * Inicializar contenedor de video (versión simplificada)
   */
  async initializeVideoContainer(container, loader = null) {
    try {
      const video = await this.createVideoElementAsync(container)

      const handleCanPlay = () => {
        if (loader) this.hideVideoLoader(loader)
        if (isElementVisible(container, this.platform.config.intersectionThreshold)) {
          this.playVideoSafely(video)
        }
        video.removeEventListener('canplay', handleCanPlay)
      }

      video.addEventListener('canplay', handleCanPlay)
      container.classList.add('video-initialized', 'video-loaded')
    } catch (error) {
      this.logger.error('[VideoSystem] Error inicializando contenedor:', error)
      if (loader) this.hideVideoLoader(loader)
      this.handleVideoError(container, error)
    }
  }

  /**
   * Crear elemento de video de forma asíncrona
   */
  async createVideoElementAsync(container) {
    return new Promise((resolve, reject) => {
      const mobileUrl = getVideoUrl(container, 'mobile')
      const desktopUrl = getVideoUrl(container, 'desktop')

      if (!mobileUrl && !desktopUrl) {
        reject(new Error('Sin URLs de video configuradas'))
        return
      }

      const videoUrl = this.platform.isMobile ? mobileUrl || desktopUrl : desktopUrl || mobileUrl
      const video = this.createVideoElement(container, videoUrl)

      const handleLoadedMetadata = () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata)
        video.removeEventListener('error', handleError)
        resolve(video)
      }

      const handleError = error => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata)
        video.removeEventListener('error', handleError)
        reject(error)
      }

      video.addEventListener('loadedmetadata', handleLoadedMetadata)
      video.addEventListener('error', handleError)
    })
  }

  /**
   * Crear elemento de video (versión simplificada)
   */
  createVideoElement(container, videoUrl) {
    const video = document.createElement('video')

    // Configuración optimizada
    Object.assign(video, {
      src: videoUrl,
      muted: true,
      loop: true,
      playsInline: true,
      preload: this.platform.config.preload || 'metadata',
      controls: false
    })

    // Atributos específicos para móvil
    video.setAttribute('playsinline', 'true')
    video.setAttribute('webkit-playsinline', 'true')
    if (this.platform.isMobile) {
      video.setAttribute('x-webkit-airplay', 'allow')
    }

    // Aplicar clase CSS en lugar de estilos inline
    video.className = 'program-data__video'

    container.style.position = 'relative'
    container.appendChild(video)

    // Configurar IntersectionObserver para este contenedor si está disponible
    if (this.state.intersectionObserver) {
      this.state.intersectionObserver.observe(container)
    }

    return video
  }

  /**
   * Reproducir video de forma segura
   */
  async playVideoSafely(video, maxAttempts = null, isManual = false) {
    if (!video || video.tagName !== 'VIDEO') {
      this.logger.warning('[VideoSystem] Video inválido o nulo')
      return
    }

    // Si ya se está reproduciendo, no hacer nada
    if (!video.paused) return

    // Validar configuración de plataforma
    const finalMaxAttempts = maxAttempts || this.platform?.config?.playbackAttempts || 3 // Fallback por defecto

    let attempts = 0
    while (attempts < finalMaxAttempts) {
      try {
        await video.play()
        this.state.loadedVideos.add(video)
        this.logger.info('[VideoSystem] Video reproduciéndose exitosamente')
        break
      } catch (error) {
        attempts++
        this.logger.warning(`[VideoSystem] Intento ${attempts}/${finalMaxAttempts} falló:`, error.message)

        if (attempts >= finalMaxAttempts) {
          if (isManual) {
            this.logger.error('[VideoSystem] Reproducción manual falló después de todos los intentos')
          } else {
            this.handlePlaybackError(video, error)
          }
        } else {
          // Usar delay con fallback seguro
          const delay = this.platform?.config?.aggressivePlaybackDelay || 300
          await TimingUtils.sleep(delay)
        }
      }
    }
  }

  /**
   * Manejar error de video
   */
  handleVideoError(container, error) {
    this.logger.error('[VideoSystem] Error de video, mostrando fallback:', error)

    // Remover video fallido
    const videos = container.querySelectorAll('video')
    videos.forEach(video => video.remove())

    // Si no hay overlay, crear uno como fallback
    const existingOverlay = container.querySelector('.program-data__video-overlay')
    if (!existingOverlay) {
      const fallbackImage = container.getAttribute('data-image-fallback')
      if (fallbackImage) {
        this.showVideoOverlay(container)
      }
    }
  }

  /**
   * Manejar error de reproducción
   */
  handlePlaybackError(video, error) {
    this.logger.warning('[VideoSystem] Error de reproducción, pausando video:', error)
    video.pause()
  }

  /**
   * Programar reintento de inicialización con límite
   */
  scheduleRetryInit() {
    if (this.state.currentRetryCount >= this.state.maxRetryAttempts) {
      this.logger.error('[VideoSystem] Máximo número de reintentos alcanzado. Deshabilitando sistema de video.')
      return
    }

    this.state.currentRetryCount++
    this.logger.info(`[VideoSystem] Programando reintento ${this.state.currentRetryCount}/${this.state.maxRetryAttempts}`)

    this.timers.setTimeout(() => {
      this.setupLazyVideoContainers()
    }, 2000 * this.state.currentRetryCount) // Backoff exponencial
  }

  /**
   * Re-observar containers después de cambios dinámicos
   */
  refreshObservers() {
    if (this.state.intersectionObserver) {
      this.observeExistingContainers()
    }
  }

  /**
   * Limpiar recursos y event listeners
   */
  destroy() {
    try {
      this.logger.info('[VideoSystem] Iniciando limpieza de recursos')

      // Limpiar observadores
      if (this.state.intersectionObserver) {
        this.state.intersectionObserver.disconnect()
        this.state.intersectionObserver = null
      }

      // Limpiar completamente todos los videos
      const videos = document.querySelectorAll('[data-component="video-player"] video')
      videos.forEach(video => {
        try {
          // Pausar y limpiar video
          video.pause()
          video.currentTime = 0
          video.src = ''
          video.load()

          // Limpiar event listeners (los nativos)
          video.onloadedmetadata = null
          video.oncanplay = null
          video.onerror = null
          video.onplay = null
          video.onpause = null

          // Remover del DOM
          if (video.parentNode) {
            video.parentNode.removeChild(video)
          }
        } catch (error) {
          this.logger.warning('[VideoSystem] Error limpiando video individual:', error.message)
        }
      })

      // Limpiar containers lazy
      const containers = document.querySelectorAll('[data-component="video-player"][data-lazy]')
      containers.forEach(container => {
        try {
          container.removeAttribute('data-lazy')
          container.classList.remove('video-initialized', 'video-loaded', 'video-failed')

          // Limpiar referencias almacenadas
          if (container._preloadedVideo) {
            container._preloadedVideo.remove()
            delete container._preloadedVideo
          }
        } catch (error) {
          this.logger.warning('[VideoSystem] Error limpiando container:', error.message)
        }
      })

      // Limpiar timers y eventos
      if (this.timers) {
        this.timers.destroy()
      }
      if (this.events) {
        this.events.destroy()
      }

      // Reset estado completo
      this.state.initialized = false
      this.state.loadedVideos.clear()
      this.state.retryAttempts.clear()
      this.state.currentRetryCount = 0
      this.platform = null

      this.logger.info('[VideoSystem] Limpieza de recursos completada')
    } catch (error) {
      this.logger.error('[VideoSystem] Error durante cleanup:', error)
    }
  }
}

export { VideoSystem }
