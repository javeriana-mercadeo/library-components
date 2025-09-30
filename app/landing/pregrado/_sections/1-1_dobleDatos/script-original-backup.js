// ===========================================
// DATOS PROGRAMA VIDEO - OPTIMIZADO PRODUCTION-READY
// ===========================================

// Sistema de video HTML5 nativo optimizado para producción
const liferayVideoSystem = {
  // Estado interno del sistema
  state: {
    initialized: false,
    loadedVideos: new Set(),
    retryAttempts: new Map(),
    activeTimers: new Set(),
    intersectionObserver: null,
    periodicityObserver: null
  },

  // Configuración del sistema
  config: {
    maxRetries: 3,
    retryDelay: 1000,
    playbackAttempts: 3,
    intersectionThreshold: 0.3,
    loadingTimeout: 5000,
    aggressivePlaybackDelay: 200
  },

  // Inicializar sistema de video con estrategia adaptativa
  init() {
    if (this.state.initialized) {
      console.warn('[VideoPlayer] Sistema ya inicializado')
      return
    }

    this.setupVideoContainers()
    this.setupIntersectionObserver()
    this.state.initialized = true
  },

  // Configurar contenedores de video con estrategia simplificada
  setupVideoContainers() {
    const containers = document.querySelectorAll('[data-component="video-player"]')

    if (containers.length === 0) {
      // Retry con estrategia adaptativa
      this.scheduleRetryInit()
      return
    }

    containers.forEach(container => {
      if (!container.classList.contains('video-initialized')) {
        this.initializeVideoContainer(container)
      }
    })
  },

  // Retry de inicialización con backoff exponencial
  scheduleRetryInit() {
    const retries = this.state.retryAttempts.get('init') || 0

    if (retries >= this.config.maxRetries) {
      console.warn('[VideoPlayer] Máximo de reintentos de inicialización alcanzado')
      return
    }

    const delay = Math.min(1000 * Math.pow(2, retries), 5000) // Backoff exponencial, máx 5s
    this.state.retryAttempts.set('init', retries + 1)

    const timer = setTimeout(() => {
      this.state.activeTimers.delete(timer)
      this.setupVideoContainers()
    }, delay)

    this.state.activeTimers.add(timer)
  },

  // Configurar Intersection Observer optimizado
  setupIntersectionObserver() {
    if (!('IntersectionObserver' in window)) {
      console.warn('[VideoPlayer] IntersectionObserver no disponible')
      return
    }

    // Limpiar observer anterior si existe
    this.cleanup('intersectionObserver')

    const options = {
      root: null,
      rootMargin: '50px',
      threshold: this.config.intersectionThreshold
    }

    this.state.intersectionObserver = new IntersectionObserver(this.debounce(this.handleIntersection.bind(this), 100), options)

    // Observar contenedores existentes
    const containers = document.querySelectorAll('[data-component="video-player"]')
    containers.forEach(container => {
      this.state.intersectionObserver.observe(container)
    })
  },

  // Manejar eventos de intersección
  handleIntersection(entries) {
    entries.forEach(entry => {
      const videos = entry.target.querySelectorAll('video')
      const isMobile = this.isMobileDevice()

      videos.forEach(video => {
        if (entry.isIntersecting) {
          // Video visible - intentar reproducir
          this.playVideoSafely(video)
          this.removePlayOverlay(entry.target)
        } else {
          // Video no visible - pausar para ahorrar recursos
          if (!video.paused) {
            video.pause()
          }
        }
      })
    })
  },

  // Inicializar contenedor específico
  initializeVideoContainer(container) {
    if (container.classList.contains('video-initialized')) {
      return
    }

    container.innerHTML = ''
    const loadingElement = this.showLoadingState(container)

    const mobileVideoUrl = this.getVideoUrl(container, 'mobile')
    const desktopVideoUrl = this.getVideoUrl(container, 'desktop')
    const isMobile = this.isMobileDevice()

    let hasValidVideo = false

    // Crear video prioritario según dispositivo
    if (isMobile && mobileVideoUrl) {
      this.createVideoElement(container, mobileVideoUrl, 'mobile')
      hasValidVideo = true
    }

    if (desktopVideoUrl) {
      this.createVideoElement(container, desktopVideoUrl, 'desktop', !isMobile)
      hasValidVideo = true
    }

    if (!hasValidVideo) {
      loadingElement?.remove()
      this.showFallbackContent(container)
    }

    container.classList.add('video-initialized')
  },

  // Crear elemento de video optimizado
  createVideoElement(container, videoUrl, type, isPriority = false) {
    const video = document.createElement('video')
    const videoId = `${type}-${this.hashString(videoUrl)}`

    // Configuración base del video
    Object.assign(video, {
      src: videoUrl,
      className: `program-data__video program-data__video--${type}`,
      muted: true,
      loop: true,
      playsInline: true,
      controls: false,
      autoplay: false,
      preload: 'metadata'
    })

    // Atributos para compatibilidad
    video.setAttribute('data-video-type', type)
    video.setAttribute('disablepictureinpicture', '')
    video.setAttribute('webkit-playsinline', '')

    // Estilos CSS
    Object.assign(video.style, {
      objectFit: 'cover',
      backgroundColor: '#000',
      opacity: '0',
      transition: 'opacity 0.5s ease',
      display: isPriority ? 'block' : 'none'
    })

    // Event listeners optimizados
    this.attachVideoEventListeners(video, container, videoId, type)

    container.appendChild(video)

    // Timeout de carga con cleanup automático
    const loadTimeout = setTimeout(() => {
      this.state.activeTimers.delete(loadTimeout)
      this.handleVideoLoadTimeout(video, container, videoId, type)
    }, this.config.loadingTimeout)

    this.state.activeTimers.add(loadTimeout)
  },

  // Adjuntar event listeners con cleanup automático
  attachVideoEventListeners(video, container, videoId, type) {
    const listeners = new Map()

    // Helper para agregar listeners con cleanup automático
    const addListener = (event, handler) => {
      const wrappedHandler = e => {
        try {
          handler(e)
        } catch (error) {
          console.error(`[VideoPlayer] Error en listener ${event}:`, error)
        }
      }
      video.addEventListener(event, wrappedHandler)
      listeners.set(event, wrappedHandler)
    }

    addListener('canplay', () => this.onVideoReady(container, video, videoId))
    addListener('loadeddata', () => this.onVideoReady(container, video, videoId))
    addListener('error', () => this.onVideoError(video, container, videoId, type))
    addListener('pause', e => this.onVideoPause(video, container, e))

    // Guardar referencia para cleanup
    video._listeners = listeners
  },

  // Manejar video listo
  onVideoReady(container, video, videoId) {
    if (this.state.loadedVideos.has(videoId)) {
      return // Ya procesado
    }

    this.state.loadedVideos.add(videoId)
    container.classList.add('video-loaded')
    video.style.opacity = '1'

    // Remover loading state
    const loading = container.querySelector('.video-loading')
    loading?.remove()

    // Limpiar reintentos exitosos
    const containerId = container.id || 'unknown'
    this.state.retryAttempts.delete(containerId)

    // Intentar reproducción automática si está visible
    if (this.isElementVisible(container)) {
      this.playVideoSafely(video)
    }
  },

  // Manejar errores de video
  onVideoError(video, container, videoId, type) {
    console.warn(`[VideoPlayer] Error en video ${type}:`, {
      videoId,
      error: video.error?.code,
      src: video.src
    })

    // Evitar procesar el mismo error múltiples veces
    if (this.state.loadedVideos.has(`${videoId}-error`)) {
      return
    }
    this.state.loadedVideos.add(`${videoId}-error`)

    // Intentar video alternativo si está disponible
    const alternativeVideo = container.querySelector(`video[data-video-type="${type === 'mobile' ? 'desktop' : 'mobile'}"]`)
    if (alternativeVideo && alternativeVideo.readyState >= 2) {
      video.style.display = 'none'
      alternativeVideo.style.display = 'block'
      return
    }

    // Si no hay alternativa, mostrar contenido de respaldo
    this.showFallbackContent(container)
  },

  // Manejar pausa inesperada
  onVideoPause(video, container, event) {
    if (video.ended || !this.isElementVisible(container)) {
      return
    }

    // Si el video se pausó inesperadamente, mostrar overlay después de un delay
    const timer = setTimeout(
      () => {
        this.state.activeTimers.delete(timer)
        if (video.paused && !video.ended) {
          this.showPlayOverlay(container, video)
        }
      },
      video.currentTime === 0 ? 100 : 1000
    )

    this.state.activeTimers.add(timer)
  },

  // Reproducir video de forma segura con retry limitado
  playVideoSafely(video, attempt = 1) {
    if (!video || video.readyState < 2) {
      if (attempt <= this.config.playbackAttempts) {
        const timer = setTimeout(() => {
          this.state.activeTimers.delete(timer)
          this.playVideoSafely(video, attempt + 1)
        }, this.config.aggressivePlaybackDelay * attempt)
        this.state.activeTimers.add(timer)
      }
      return
    }

    // Asegurar configuración para autoplay
    video.muted = true
    video.volume = 0

    video
      .play()
      .then(() => {
        // Reproducción exitosa
      })
      .catch(error => {
        if (attempt <= this.config.playbackAttempts) {
          console.warn(`[VideoPlayer] Retry playback attempt ${attempt}:`, error.name)
          const timer = setTimeout(() => {
            this.state.activeTimers.delete(timer)
            this.playVideoSafely(video, attempt + 1)
          }, this.config.aggressivePlaybackDelay * attempt)
          this.state.activeTimers.add(timer)
        } else {
          console.warn('[VideoPlayer] Autoplay bloqueado, mostrando overlay')
          this.showPlayOverlay(video.closest('[data-component="video-player"]'), video)
        }
      })
  },

  // Mostrar overlay de play optimizado
  showPlayOverlay(container, video) {
    if (!container || !video || container.querySelector('.video-play-overlay')) {
      return
    }

    const overlay = document.createElement('div')
    overlay.className = 'video-play-overlay'
    overlay.innerHTML = `
      <div class="play-button">
        <svg width="80" height="80" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="35" fill="rgba(255,255,255,0.9)"/>
          <polygon points="32,25 32,55 55,40" fill="#333"/>
        </svg>
      </div>
    `

    // Estilos inline para evitar dependencias CSS externas
    Object.assign(overlay.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      background: 'rgba(0,0,0,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      zIndex: '10',
      borderRadius: 'inherit'
    })

    const playButton = overlay.querySelector('.play-button')
    Object.assign(playButton.style, {
      transition: 'transform 0.2s ease'
    })

    // Event listeners
    overlay.addEventListener('mouseenter', () => {
      playButton.style.transform = 'scale(1.1)'
    })
    overlay.addEventListener('mouseleave', () => {
      playButton.style.transform = 'scale(1)'
    })
    overlay.addEventListener('click', e => {
      e.preventDefault()
      e.stopPropagation()
      video
        .play()
        .then(() => overlay.remove())
        .catch(console.warn)
    })

    container.style.position = 'relative'
    container.appendChild(overlay)
  },

  // Remover overlay de play
  removePlayOverlay(container) {
    const overlay = container.querySelector('.video-play-overlay')
    if (overlay) {
      const timer = setTimeout(() => {
        this.state.activeTimers.delete(timer)
        overlay.remove()
      }, 300)
      this.state.activeTimers.add(timer)
    }
  },

  // Mostrar estado de carga optimizado
  showLoadingState(container) {
    const loading = document.createElement('div')
    loading.className = 'video-loading'
    loading.innerHTML = `
      <div class="spinner"></div>
      <p>Cargando video...</p>
    `

    Object.assign(loading.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#000',
      color: '#fff',
      fontSize: this.isMobileDevice() ? '12px' : '14px',
      zIndex: '5'
    })

    const spinner = loading.querySelector('.spinner')
    Object.assign(spinner.style, {
      width: '40px',
      height: '40px',
      border: '3px solid rgba(255,255,255,0.3)',
      borderTop: '3px solid #fff',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: '10px'
    })

    // Agregar CSS de animación
    if (!document.getElementById('video-loading-styles')) {
      const style = document.createElement('style')
      style.id = 'video-loading-styles'
      style.textContent = '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }'
      document.head.appendChild(style)
    }

    container.style.position = 'relative'
    container.appendChild(loading)
    return loading
  },

  // Mostrar contenido de respaldo
  showFallbackContent(container) {
    const fallbackImage = container.getAttribute('data-image-fallback')

    if (fallbackImage) {
      const imageDiv = document.createElement('div')
      imageDiv.className = 'video-fallback-image'
      Object.assign(imageDiv.style, {
        width: '100%',
        height: '100%',
        backgroundImage: `url('${fallbackImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '8px'
      })
      container.innerHTML = ''
      container.appendChild(imageDiv)
    }

    container.classList.add('video-loaded')
  },

  // Manejar timeout de carga
  handleVideoLoadTimeout(video, container, videoId, type) {
    if (video.readyState < 2 && !this.state.loadedVideos.has(videoId)) {
      console.warn(`[VideoPlayer] Timeout de carga para video ${type}`)
      this.onVideoError(video, container, videoId, type)
    }
  },

  // Obtener URL del video
  getVideoUrl(container, type) {
    // Intentar desde configuración global
    if (typeof configuration !== 'undefined') {
      const configUrl = type === 'mobile' ? configuration.urlVideoMobile : configuration.urlVideoDesktop
      if (configUrl?.trim()) return configUrl
    }

    // Obtener desde data attributes
    const dataAttr = type === 'mobile' ? 'data-video-mobile-url' : 'data-video-desktop-url'
    const url = container.getAttribute(dataAttr)
    return url?.trim() || null
  },

  // Verificar si elemento está visible (fallback para navegadores sin IntersectionObserver)
  isElementVisible(element) {
    const rect = element.getBoundingClientRect()
    const windowHeight = window.innerHeight || document.documentElement.clientHeight

    return rect.top < windowHeight && rect.bottom > 0 && rect.width > 0 && rect.height > 0
  },

  // Detectar dispositivo móvil
  isMobileDevice() {
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  },

  // Generar hash simple para identificadores únicos
  hashString(str) {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash // Convertir a 32-bit integer
    }
    return Math.abs(hash).toString(36)
  },

  // Debounce utility
  debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  },

  // Limpiar recursos específicos
  cleanup(type) {
    switch (type) {
      case 'intersectionObserver':
        if (this.state.intersectionObserver) {
          this.state.intersectionObserver.disconnect()
          this.state.intersectionObserver = null
        }
        break
      case 'timers':
        this.state.activeTimers.forEach(timer => clearTimeout(timer))
        this.state.activeTimers.clear()
        break
      case 'all':
        this.cleanup('intersectionObserver')
        this.cleanup('timers')

        // Limpiar event listeners de videos
        document.querySelectorAll('video').forEach(video => {
          if (video._listeners) {
            video._listeners.forEach((handler, event) => {
              video.removeEventListener(event, handler)
            })
            delete video._listeners
          }
        })

        // Reset estado
        this.state = {
          initialized: false,
          loadedVideos: new Set(),
          retryAttempts: new Map(),
          activeTimers: new Set(),
          intersectionObserver: null,
          periodicityObserver: null
        }
        break
    }
  },

  // Método público para destruir el sistema
  destroy() {
    this.cleanup('all')
  }
}

// Sistema de datos del programa con cleanup mejorado
const programDataSystem = {
  state: {
    periodicityObserver: null,
    intervalId: null
  },

  init() {
    document.addEventListener('data_load-program', this.handleDataLoad.bind(this))
    this.updateProgramName()
    this.initModals()
    this.initPeriodicityObserver()
  },

  handleDataLoad() {
    this.updateProgramName()
    // Reinicializar videos si es necesario
    if (liferayVideoSystem.state.initialized) {
      liferayVideoSystem.setupVideoContainers()
    }
  },

  updateProgramName() {
    const context = document.getElementById('doble-datos')
    if (!context) return

    const dataPujName = context.querySelector('[data-puj-name]')
    if (dataPujName) {
      let currentContent = dataPujName.textContent.trim()
      if (!currentContent.endsWith(':')) {
        dataPujName.textContent = `${currentContent}: `
      }
    }
  },

  initPeriodicityObserver() {
    // Limpiar observer anterior
    if (this.state.periodicityObserver) {
      this.state.periodicityObserver.disconnect()
    }
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId)
    }

    const ensureLowercase = element => {
      if (element?.textContent) {
        const currentText = element.textContent
        if (currentText.length > 0) {
          const firstChar = currentText.charAt(0)
          if (firstChar !== firstChar.toLowerCase()) {
            element.textContent = firstChar.toLowerCase() + currentText.slice(1)
          }
        }
      }
    }

    // Aplicar inicialmente
    const periodicityElements = document.querySelectorAll('[data-puj-periodicity="true"]')
    periodicityElements.forEach(ensureLowercase)

    // Crear observer optimizado
    this.state.periodicityObserver = new MutationObserver(
      liferayVideoSystem.debounce(mutations => {
        mutations.forEach(mutation => {
          if (mutation.type === 'childList' || mutation.type === 'characterData') {
            const elements = document.querySelectorAll('[data-puj-periodicity="true"]')
            elements.forEach(ensureLowercase)
          }
        })
      }, 100)
    )

    this.state.periodicityObserver.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    })

    // Verificación periódica menos frecuente
    this.state.intervalId = setInterval(() => {
      const elements = document.querySelectorAll('[data-puj-periodicity="true"]')
      elements.forEach(ensureLowercase)
    }, 5000) // Reducido de 2s a 5s
  },

  initModals() {
    // Event delegation para mejor rendimiento
    document.addEventListener('click', this.handleModalClick.bind(this))
    document.addEventListener('keydown', this.handleModalKeydown.bind(this))
  },

  handleModalClick(e) {
    // Abrir modal
    const modalTrigger = e.target.closest('[data-modal-target]')
    if (modalTrigger) {
      e.preventDefault()
      const modalId = modalTrigger.getAttribute('data-modal-target')
      this.openModal(modalId)
      return
    }

    // Cerrar modal
    const closeButton = e.target.closest('.program-detail-modal__close')
    if (closeButton) {
      e.preventDefault()
      const modal = closeButton.closest('.program-detail-modal')
      if (modal) this.closeModal(modal.id)
      return
    }

    // Cerrar modal haciendo click en overlay
    if (e.target.classList.contains('program-detail-modal') && e.target.classList.contains('program-detail-modal--active')) {
      this.closeModal(e.target.id)
    }
  },

  handleModalKeydown(e) {
    if (e.key === 'Escape') {
      const openModal = document.querySelector('.program-detail-modal--active')
      if (openModal) {
        this.closeModal(openModal.id)
      }
    }
  },

  openModal(modalId) {
    const modal = document.getElementById(modalId)
    if (!modal) return

    modal.classList.add('program-detail-modal--active')
    document.body.style.overflow = 'hidden'

    // Focus management para accesibilidad
    const closeButton = modal.querySelector('.program-detail-modal__close')
    if (closeButton) {
      closeButton.focus()
    }
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId)
    if (!modal) return

    modal.classList.remove('program-detail-modal--active')
    document.body.style.overflow = ''
  },

  // Cleanup para este sistema
  destroy() {
    if (this.state.periodicityObserver) {
      this.state.periodicityObserver.disconnect()
      this.state.periodicityObserver = null
    }
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId)
      this.state.intervalId = null
    }
  }
}

// Sistema de inicialización principal mejorado
const initProgramDataVideo = () => {
  try {
    programDataSystem.init()
    liferayVideoSystem.init()

    // Sistema de activación por interacción del usuario
    setupUserInteractionHandler()
  } catch (error) {
    console.error('[VideoPlayer] Error durante inicialización:', error)
  }
}

// Manejar interacción del usuario de forma optimizada
const setupUserInteractionHandler = () => {
  let interactionTriggered = false
  const interactionEvents = ['click', 'touchstart', 'scroll', 'keydown']

  const handleUserInteraction = () => {
    if (interactionTriggered) return
    interactionTriggered = true

    // Intentar reproducir videos pausados que estén visibles
    const containers = document.querySelectorAll('[data-component="video-player"].video-loaded')
    containers.forEach(container => {
      if (liferayVideoSystem.isElementVisible(container)) {
        const videos = container.querySelectorAll('video')
        videos.forEach(video => {
          if (video.paused) {
            liferayVideoSystem.playVideoSafely(video)
          }
        })
      }
    })

    // Remover listeners después de la primera interacción
    interactionEvents.forEach(eventType => {
      document.removeEventListener(eventType, handleUserInteraction, true)
    })
  }

  // Agregar listeners
  interactionEvents.forEach(eventType => {
    document.addEventListener(eventType, handleUserInteraction, {
      passive: true,
      capture: true,
      once: true
    })
  })

  // Auto-cleanup después de 30 segundos
  setTimeout(() => {
    interactionEvents.forEach(eventType => {
      document.removeEventListener(eventType, handleUserInteraction, true)
    })
  }, 30000)
}

// Inicialización del sistema con protección contra múltiples llamadas
const initSystem = () => {
  if (window.dobleProgramDataVideoInitialized) {
    console.warn('[VideoPlayer] Sistema ya inicializado')
    return
  }

  window.dobleProgramDataVideoInitialized = true

  // Cleanup automático cuando la página se descarga
  window.addEventListener('beforeunload', () => {
    liferayVideoSystem.destroy()
    programDataSystem.destroy()
  })

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProgramDataVideo)
  } else {
    initProgramDataVideo()
  }
}

// Exportar sistema y inicializar
export default initSystem

// Auto-inicialización en entorno browser
if (typeof window !== 'undefined') {
  initSystem()
}
