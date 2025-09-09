// ===========================================
// VIDEO SYSTEM MODULE
// ===========================================

/**
 * Sistema de video optimizado específicamente para móviles y rendimiento
 * Maneja detección de plataforma, carga progresiva y fallbacks
 */

import { detectPlatform, hasPerformanceLimitations } from './platform-detection.js'
import {
  Logger,
  TimerManager,
  EventManager,
  waitForNextFrame,
  wait,
  debounce,
  throttle,
  isElementVisible,
  onDOMReady,
  runWhenIdle,
  getVideoUrl,
  createLoadingSpinner,
  createStyleSheet
} from './utils.js'

class VideoSystem {
  constructor() {
    this.state = {
      initialized: false,
      loadedVideos: new Set(),
      retryAttempts: new Map(),
      intersectionObserver: null,
      resourceQueue: [],
      loadingPaused: false
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
    this.setupVideoContainers()
    this.setupIntersectionObserver()
    this.setupIOSTouchHandlers()
  }

  /**
   * Estrategia específica para Android
   */
  initAndroidStrategy() {
    this.setupProgressiveLoading()

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
    this.setupVideoContainers()
    this.setupIntersectionObserver()
  }

  /**
   * Configurar contenedores con fallback prioritario (iOS)
   */
  setupContainersWithFallbackFirst() {
    const containers = document.querySelectorAll('[data-component="video-player"]')

    if (containers.length === 0) {
      this.scheduleRetryInit()
      return
    }

    containers.forEach(container => {
      if (!container.classList.contains('video-initialized')) {
        this.initializeFallbackFirst(container)
      }
    })
  }

  /**
   * Inicializar con imagen de fallback primero
   */
  initializeFallbackFirst(container) {
    const fallbackImage = container.getAttribute('data-image-fallback')
    const hasVideo = getVideoUrl(container, 'mobile') || getVideoUrl(container, 'desktop')

    if (fallbackImage && hasVideo) {
      // Mostrar fallback mientras se carga el video
      this.showFallbackContent(container)
      
      // Cargar video en segundo plano para iOS
      this.preloadVideoInBackground(container)
      
      // Botón para mostrar video manualmente
      this.addLoadVideoButton(container)
    } else {
      // Si no hay fallback, cargar video directamente
      this.showMinimalLoading(container)
      this.initializeVideoContainer(container)
    }

    container.classList.add('video-initialized')
  }

  /**
   * Mostrar contenido de fallback
   */
  showFallbackContent(container) {
    const fallbackImage = container.getAttribute('data-image-fallback')
    if (!fallbackImage) return

    const fallbackDiv = document.createElement('div')
    fallbackDiv.className = 'video-fallback-image'

    Object.assign(fallbackDiv.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      background: `url(${fallbackImage}) center/cover no-repeat`,
      zIndex: '1'
    })

    container.style.position = 'relative'
    container.appendChild(fallbackDiv)
  }

  /**
   * Agregar botón para cargar video bajo demanda
   */
  addLoadVideoButton(container) {
    const button = document.createElement('button')
    button.className = 'load-video-btn'
    button.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
        <polygon points="8,6 8,18 18,12"/>
      </svg>
      <span>Cargar video</span>
    `

    Object.assign(button.style, {
      position: 'absolute',
      bottom: '12px',
      right: '12px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      padding: '8px 12px',
      fontSize: '14px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      zIndex: '10',
      transition: 'all 0.2s ease'
    })

    this.events.addEventListener(button, 'click', e => {
      e.preventDefault()
      button.remove()
      this.loadVideoOnDemand(container)
    })

    container.style.position = 'relative'
    container.appendChild(button)
  }

  /**
   * Precargar video en segundo plano para iOS
   */
  preloadVideoInBackground(container) {
    // Crear video oculto para precargar
    const mobileUrl = getVideoUrl(container, 'mobile')
    const desktopUrl = getVideoUrl(container, 'desktop')
    const videoUrl = this.platform.isMobile ? (mobileUrl || desktopUrl) : (desktopUrl || mobileUrl)
    
    if (!videoUrl) return
    
    const preloadVideo = document.createElement('video')
    Object.assign(preloadVideo, {
      src: videoUrl,
      muted: true,
      preload: 'metadata',
      playsInline: true
    })
    
    preloadVideo.style.cssText = 'position:absolute;top:-9999px;left:-9999px;width:1px;height:1px;opacity:0;pointer-events:none;'
    
    // Almacenar referencia para uso posterior
    container._preloadedVideo = preloadVideo
    document.body.appendChild(preloadVideo)
    
    // Remover después de 30 segundos si no se usa
    this.timers.setTimeout(() => {
      if (preloadVideo.parentNode) {
        preloadVideo.remove()
      }
    }, 30000)
  }

  /**
   * Cargar video bajo demanda
   */
  async loadVideoOnDemand(container) {
    const loading = this.showMinimalLoading(container)

    const loadVideo = () => {
      const fallback = container.querySelector('.video-fallback-image')
      if (fallback) fallback.remove()
      if (loading) loading.remove()

      // Si hay video precargado, usarlo
      if (container._preloadedVideo) {
        container._preloadedVideo.remove()
        delete container._preloadedVideo
      }

      this.initializeVideoContainer(container)
    }

    runWhenIdle(loadVideo, 1000)
  }

  /**
   * Loading minimal para no bloquear
   */
  showMinimalLoading(container) {
    const existing = container.querySelector('.video-loading')
    if (existing) existing.remove()

    const loading = createLoadingSpinner('20px', '#fff')
    loading.className = 'video-loading minimal'

    Object.assign(loading.style, {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '5'
    })

    container.appendChild(loading)
    return loading
  }

  /**
   * Configuración progresiva para Android
   */
  setupProgressiveLoading() {
    const containers = document.querySelectorAll('[data-component="video-player"]')

    if (containers.length === 0) {
      this.scheduleRetryInit()
      return
    }

    // Ordenar por visibilidad
    const sortedContainers = Array.from(containers).sort((a, b) => {
      const rectA = a.getBoundingClientRect()
      const rectB = b.getBoundingClientRect()

      const isVisibleA = rectA.top < window.innerHeight && rectA.bottom > 0
      const isVisibleB = rectB.top < window.innerHeight && rectB.bottom > 0

      if (isVisibleA && !isVisibleB) return -1
      if (!isVisibleA && isVisibleB) return 1

      return rectA.top - rectB.top
    })

    this.loadContainersProgressively(sortedContainers)
  }

  /**
   * Cargar contenedores de forma progresiva
   */
  async loadContainersProgressively(containers) {
    for (let i = 0; i < containers.length; i++) {
      const container = containers[i]

      if (!container.classList.contains('video-initialized')) {
        await this.initializeVideoContainerAsync(container)

        if (i < containers.length - 1) {
          await waitForNextFrame()
        }
      }
    }
  }

  /**
   * Inicializar contenedor de forma asíncrona
   */
  async initializeVideoContainerAsync(container) {
    return new Promise(resolve => {
      requestAnimationFrame(() => {
        this.initializeVideoContainer(container)
        resolve()
      })
    })
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
      rootMargin: this.platform.config.lazyLoadMargin,
      threshold: this.platform.config.intersectionThreshold
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

    const containers = document.querySelectorAll('[data-component="video-player"].video-loaded')
    containers.forEach(container => {
      this.state.intersectionObserver.observe(container)
    })
  }

  /**
   * Manejo manual de visibilidad (fallback)
   */
  setupManualVisibilityCheck() {
    const checkVisibility = throttle(() => {
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
    const containers = document.querySelectorAll('[data-component="video-player"].video-loaded')

    containers.forEach(container => {
      const videos = container.querySelectorAll('video')
      const visible = isElementVisible(container, this.platform.config.intersectionThreshold)

      videos.forEach(video => {
        if (visible && video.paused) {
          this.playVideoSafely(video, 1, true)
        } else if (!visible && !video.paused) {
          video.pause()
        }
      })
    })
  }

  /**
   * Manejo de intersección de video
   */
  handleVideoIntersection(container, isVisible) {
    const videos = container.querySelectorAll('video')

    videos.forEach(video => {
      if (isVisible && video.paused) {
        this.playVideoSafely(video)
      } else if (!isVisible && !video.paused) {
        video.pause()
      }
    })
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
   * Configurar contenedores de video estándar
   */
  setupVideoContainers() {
    const containers = document.querySelectorAll('[data-component="video-player"]')

    if (containers.length === 0) {
      this.scheduleRetryInit()
      return
    }

    containers.forEach(container => {
      if (!container.classList.contains('video-initialized')) {
        this.initializeVideoContainer(container)
      }
    })
  }

  /**
   * Inicializar contenedor de video
   */
  initializeVideoContainer(container) {
    try {
      const mobileUrl = getVideoUrl(container, 'mobile')
      const desktopUrl = getVideoUrl(container, 'desktop')
      const fallbackImage = container.getAttribute('data-image-fallback')

      if (!mobileUrl && !desktopUrl) {
        this.logger.warning('[VideoSystem] Sin URLs de video configuradas', container)
        if (fallbackImage) {
          this.showFallbackContent(container)
        }
        return
      }

      const videoUrl = this.platform.isMobile ? mobileUrl || desktopUrl : desktopUrl || mobileUrl
      this.createVideoElement(container, videoUrl, fallbackImage)
      container.classList.add('video-initialized', 'video-loaded')
    } catch (error) {
      this.logger.error('[VideoSystem] Error inicializando contenedor de video:', error)
      this.handleVideoError(container, error)
    }
  }

  /**
   * Crear elemento de video
   */
  createVideoElement(container, videoUrl, fallbackImage) {
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

    Object.assign(video.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      zIndex: '2'
    })

    // Event listeners para el video
    this.events.addEventListener(video, 'loadedmetadata', () => {
      // Intentar reproducir cuando el metadata esté listo
      this.playVideoSafely(video)
    })

    this.events.addEventListener(video, 'canplay', () => {
      // Video listo - añadir a la lista y reproducir si es visible
      this.state.loadedVideos.add(video)
      if (isElementVisible(container, this.platform.config.intersectionThreshold)) {
        this.playVideoSafely(video)
      }
    })

    this.events.addEventListener(video, 'error', e => {
      this.logger.error('[VideoSystem] Error de video:', e)
      this.handleVideoError(container, e, fallbackImage)
    })

    container.style.position = 'relative'
    container.appendChild(video)

    // Configurar IntersectionObserver para este contenedor si está disponible
    if (this.state.intersectionObserver) {
      this.state.intersectionObserver.observe(container)
    }

    // Intentar reproducir inmediatamente si está visible
    if (isElementVisible(container, this.platform.config.intersectionThreshold)) {
      // Dar tiempo al video para cargar y luego intentar reproducir
      this.timers.setTimeout(() => {
        this.playVideoSafely(video)
      }, 100)
    }
  }

  /**
   * Reproducir video de forma segura
   */
  async playVideoSafely(video, maxAttempts = this.platform.config.playbackAttempts, isManual = false) {
    if (!video || this.state.loadedVideos.has(video)) return

    let attempts = 0
    while (attempts < maxAttempts) {
      try {
        await video.play()
        this.state.loadedVideos.add(video)
        break
      } catch (error) {
        attempts++

        if (attempts >= maxAttempts) {
          if (isManual) {
          } else {
            this.handlePlaybackError(video, error)
          }
        } else {
          await wait(this.platform.config.aggressivePlaybackDelay || 300)
        }
      }
    }
  }

  /**
   * Manejar error de video
   */
  handleVideoError(container, error, fallbackImage = null) {
    this.logger.error('[VideoSystem] Error de video, mostrando fallback:', error)

    // Remover video fallido
    const videos = container.querySelectorAll('video')
    videos.forEach(video => video.remove())

    // Mostrar imagen de fallback si está disponible
    if (fallbackImage || container.getAttribute('data-image-fallback')) {
      this.showFallbackContent(container)
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
   * Programar reintento de inicialización
   */
  scheduleRetryInit() {
    this.timers.setTimeout(() => {
      this.init()
    }, 2000)
  }

  /**
   * Limpiar recursos y event listeners
   */
  destroy() {
    // Limpiar observadores
    if (this.state.intersectionObserver) {
      this.state.intersectionObserver.disconnect()
      this.state.intersectionObserver = null
    }

    // Pausar todos los videos
    const videos = document.querySelectorAll('[data-component="video-player"] video')
    videos.forEach(video => {
      video.pause()
      video.src = ''
      video.load()
    })

    // Limpiar timers y eventos
    this.timers.destroy()
    this.events.destroy()

    // Reset estado
    this.state.initialized = false
    this.state.loadedVideos.clear()
    this.state.retryAttempts.clear()
  }
}

export { VideoSystem }
