// ===========================================
// DATOS PROGRAMA VIDEO - ULTRA OPTIMIZADO MOBILE
// ===========================================

// Sistema de video optimizado específicamente para móviles y rendimiento
const liferayVideoSystem = {
  // Estado interno del sistema
  state: {
    initialized: false,
    loadedVideos: new Set(),
    retryAttempts: new Map(),
    activeTimers: new Set(),
    intersectionObserver: null,
    periodicityObserver: null,
    performanceObserver: null,
    resourceQueue: [],
    loadingPaused: false
  },

  // Configuración específica por plataforma
  config: {
    // iOS Safari específico
    ios: {
      maxRetries: 2,
      playbackAttempts: 1,
      intersectionThreshold: 0.5,
      loadingTimeout: 8000,
      preload: 'none', // Crítico para iOS
      useIntersectionObserver: false // Safari puede tener issues
    },
    // Android específico
    android: {
      maxRetries: 3,
      playbackAttempts: 2,
      intersectionThreshold: 0.3,
      loadingTimeout: 6000,
      preload: 'metadata',
      useIntersectionObserver: true
    },
    // Desktop fallback
    desktop: {
      maxRetries: 3,
      playbackAttempts: 3,
      intersectionThreshold: 0.3,
      loadingTimeout: 5000,
      preload: 'metadata',
      useIntersectionObserver: true
    },
    // General
    aggressivePlaybackDelay: 300,
    lazyLoadMargin: '100px',
    resourcePriority: {
      critical: 0, // Imágenes de fallback
      high: 1, // Videos desktop
      normal: 2, // Videos mobile
      low: 3 // Assets secundarios
    }
  },

  // Detectar plataforma específica con más precisión
  detectPlatform() {
    const ua = navigator.userAgent
    const platform = {
      isIOS: /iPad|iPhone|iPod/.test(ua) && !window.MSStream,
      isAndroid: /Android/.test(ua),
      isSafari: /Safari/.test(ua) && !/Chrome/.test(ua),
      isChrome: /Chrome/.test(ua),
      isMobile: /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua),
      connectionSpeed: this.getConnectionSpeed(),
      hasLowMemory: navigator.deviceMemory && navigator.deviceMemory < 4
    }

    // Determinar configuración específica
    if (platform.isIOS) {
      this.platformConfig = this.config.ios
      platform.name = 'ios'
    } else if (platform.isAndroid) {
      this.platformConfig = this.config.android
      platform.name = 'android'
    } else {
      this.platformConfig = this.config.desktop
      platform.name = 'desktop'
    }

    return platform
  },

  // Detectar velocidad de conexión
  getConnectionSpeed() {
    if ('connection' in navigator) {
      const connection = navigator.connection
      if (connection.effectiveType) {
        switch (connection.effectiveType) {
          case 'slow-2g':
          case '2g':
            return 'slow'
          case '3g':
            return 'medium'
          case '4g':
            return 'fast'
          default:
            return 'unknown'
        }
      }
    }
    return 'unknown'
  },

  // Inicializar sistema con detección de plataforma
  init() {
    if (this.state.initialized) {
      console.warn('[VideoPlayer] Sistema ya inicializado')
      return
    }

    this.platform = this.detectPlatform()
    console.log(`[VideoPlayer] Plataforma detectada: ${this.platform.name}`, this.platform)

    // Configurar estrategia basada en plataforma
    if (this.platform.isIOS) {
      this.initIOSStrategy()
    } else if (this.platform.isAndroid) {
      this.initAndroidStrategy()
    } else {
      this.initDesktopStrategy()
    }

    this.state.initialized = true
  },

  // Estrategia específica para iOS
  initIOSStrategy() {
    console.log('[VideoPlayer] Usando estrategia iOS')

    // Para iOS, priorizar imágenes de fallback y evitar videos automáticos
    this.setupContainersWithFallbackFirst()

    // No usar IntersectionObserver en iOS por problemas de compatibilidad
    this.setupManualVisibilityCheck()

    // Agregar manejo específico de eventos táctiles
    this.setupIOSTouchHandlers()
  },

  // Estrategia específica para Android
  initAndroidStrategy() {
    console.log('[VideoPlayer] Usando estrategia Android')

    // Para Android, usar enfoque gradual
    this.setupProgressiveLoading()

    if (this.platformConfig.useIntersectionObserver) {
      this.setupIntersectionObserver()
    } else {
      this.setupManualVisibilityCheck()
    }
  },

  // Estrategia para Desktop
  initDesktopStrategy() {
    console.log('[VideoPlayer] Usando estrategia Desktop')

    this.setupVideoContainers()
    this.setupIntersectionObserver()
  },

  // Configurar contenedores con fallback prioritario (iOS)
  setupContainersWithFallbackFirst() {
    const containers = document.querySelectorAll('[data-component="video-player"]')

    if (containers.length === 0) {
      this.scheduleRetryInit()
      return
    }

    containers.forEach(container => {
      if (!container.classList.contains('video-initialized')) {
        // Para iOS, mostrar imagen inmediatamente y video solo bajo demanda
        this.initializeFallbackFirst(container)
      }
    })
  },

  // Inicializar con imagen de fallback primero
  initializeFallbackFirst(container) {
    const fallbackImage = container.getAttribute('data-image-fallback')

    if (fallbackImage) {
      // Mostrar imagen inmediatamente
      this.showFallbackContent(container)

      // Agregar botón de "Cargar Video" solo si hay URLs de video
      const hasVideo = container.getAttribute('data-video-mobile-url') || container.getAttribute('data-video-desktop-url')

      if (hasVideo) {
        this.addLoadVideoButton(container)
      }
    } else {
      // Si no hay imagen de fallback, usar loading minimal
      this.showMinimalLoading(container)
      this.initializeVideoContainer(container)
    }

    container.classList.add('video-initialized')
  },

  // Agregar botón para cargar video bajo demanda
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

    button.addEventListener('click', e => {
      e.preventDefault()
      button.remove()
      this.loadVideoOnDemand(container)
    })

    container.style.position = 'relative'
    container.appendChild(button)
  },

  // Cargar video bajo demanda
  async loadVideoOnDemand(container) {
    this.showMinimalLoading(container)

    // Usar requestIdleCallback si está disponible para no bloquear
    const loadVideo = () => {
      // Remover imagen de fallback
      const fallback = container.querySelector('.video-fallback-image')
      if (fallback) fallback.remove()

      this.initializeVideoContainer(container)
    }

    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadVideo, { timeout: 1000 })
    } else {
      setTimeout(loadVideo, 100)
    }
  },

  // Loading minimal para no bloquear
  showMinimalLoading(container) {
    const existing = container.querySelector('.video-loading')
    if (existing) existing.remove()

    const loading = document.createElement('div')
    loading.className = 'video-loading minimal'
    loading.innerHTML = `
      <div class="minimal-spinner"></div>
    `

    Object.assign(loading.style, {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '5'
    })

    const spinner = loading.querySelector('.minimal-spinner')
    Object.assign(spinner.style, {
      width: '20px',
      height: '20px',
      border: '2px solid rgba(255,255,255,0.3)',
      borderTop: '2px solid #fff',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    })

    container.appendChild(loading)
    return loading
  },

  // Configuración progresiva para Android
  setupProgressiveLoading() {
    // Primero cargar solo los contenedores visibles
    const containers = document.querySelectorAll('[data-component="video-player"]')

    if (containers.length === 0) {
      this.scheduleRetryInit()
      return
    }

    // Ordenar por visibilidad
    const sortedContainers = Array.from(containers).sort((a, b) => {
      const rectA = a.getBoundingClientRect()
      const rectB = b.getBoundingClientRect()

      // Priorizar elementos visibles
      const isVisibleA = rectA.top < window.innerHeight && rectA.bottom > 0
      const isVisibleB = rectB.top < window.innerHeight && rectB.bottom > 0

      if (isVisibleA && !isVisibleB) return -1
      if (!isVisibleA && isVisibleB) return 1

      return rectA.top - rectB.top
    })

    // Cargar de forma progresiva
    this.loadContainersProgressively(sortedContainers)
  },

  // Cargar contenedores de forma progresiva
  async loadContainersProgressively(containers) {
    for (let i = 0; i < containers.length; i++) {
      const container = containers[i]

      if (!container.classList.contains('video-initialized')) {
        await this.initializeVideoContainerAsync(container)

        // Pausa entre inicializaciones para no bloquear
        if (i < containers.length - 1) {
          await this.waitForNextFrame()
        }
      }
    }
  },

  // Inicializar contenedor de forma asíncrona
  async initializeVideoContainerAsync(container) {
    return new Promise(resolve => {
      // Usar requestAnimationFrame para no bloquear el hilo principal
      requestAnimationFrame(() => {
        this.initializeVideoContainer(container)
        resolve()
      })
    })
  },

  // Esperar al siguiente frame
  waitForNextFrame() {
    return new Promise(resolve => {
      requestAnimationFrame(resolve)
    })
  },

  // Manejo manual de visibilidad (fallback para iOS)
  setupManualVisibilityCheck() {
    // Throttled scroll handler
    let ticking = false

    const checkVisibility = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.handleVisibilityCheck()
          ticking = false
        })
        ticking = true
      }
    }

    // Event listeners pasivos
    window.addEventListener('scroll', checkVisibility, { passive: true })
    window.addEventListener('resize', checkVisibility, { passive: true })

    // Check inicial
    setTimeout(checkVisibility, 100)
  },

  // Verificar visibilidad manualmente
  handleVisibilityCheck() {
    const containers = document.querySelectorAll('[data-component="video-player"].video-loaded')

    containers.forEach(container => {
      const videos = container.querySelectorAll('video')
      const isVisible = this.isElementVisible(container)

      videos.forEach(video => {
        if (isVisible && video.paused) {
          this.playVideoSafely(video, 1, true) // Flag para modo manual
        } else if (!isVisible && !video.paused) {
          video.pause()
        }
      })
    })
  },

  // Configurar handlers específicos para iOS
  setupIOSTouchHandlers() {
    // Manejar evento de toque para activar reproducción
    document.addEventListener('touchstart', this.handleIOSTouch.bind(this), {
      passive: true,
      once: true
    })
  },

  // Manejar toque en iOS
  handleIOSTouch() {
    console.log('[VideoPlayer] Touch detectado en iOS, habilitando reproducción')

    // Marcar que el usuario ha interactuado
    this.userHasInteracted = true

    // Intentar reproducir videos visibles
    const containers = document.querySelectorAll('[data-component="video-player"].video-loaded')
    containers.forEach(container => {
      if (this.isElementVisible(container)) {
        const videos = container.querySelectorAll('video')
        videos.forEach(video => {
          if (video.paused) {
            this.playVideoSafely(video, 1, true)
          }
        })
      }
    })
  },

  // Crear elemento de video optimizado para móvil
  createVideoElement(container, videoUrl, type, isPriority = false) {
    const video = document.createElement('video')
    const videoId = `${type}-${this.hashString(videoUrl)}`

    // Configuración base optimizada por plataforma
    const baseConfig = {
      src: videoUrl,
      className: `program-data__video program-data__video--${type}`,
      muted: true,
      loop: true,
      playsInline: true,
      controls: false,
      autoplay: false,
      preload: this.platformConfig.preload // Crítico: 'none' para iOS
    }

    Object.assign(video, baseConfig)

    // Atributos específicos para móviles
    video.setAttribute('data-video-type', type)
    video.setAttribute('disablepictureinpicture', '')
    video.setAttribute('webkit-playsinline', 'true')
    video.setAttribute('x5-video-player-type', 'h5')
    video.setAttribute('x5-video-orientation', 'portraint')

    // Estilos optimizados
    Object.assign(video.style, {
      objectFit: 'cover',
      backgroundColor: '#000',
      opacity: '0',
      transition: 'opacity 0.5s ease',
      display: isPriority ? 'block' : 'none',
      maxWidth: '100%',
      height: 'auto'
    })

    // Event listeners optimizados
    this.attachVideoEventListenersOptimized(video, container, videoId, type)

    container.appendChild(video)

    // Timeout específico por plataforma
    const loadTimeout = setTimeout(() => {
      this.state.activeTimers.delete(loadTimeout)
      this.handleVideoLoadTimeout(video, container, videoId, type)
    }, this.platformConfig.loadingTimeout)

    this.state.activeTimers.add(loadTimeout)
  },

  // Event listeners optimizados para móvil
  attachVideoEventListenersOptimized(video, container, videoId, type) {
    const listeners = new Map()

    const addListener = (event, handler, options = {}) => {
      const wrappedHandler = e => {
        try {
          handler(e)
        } catch (error) {
          console.error(`[VideoPlayer] Error en listener ${event}:`, error)
        }
      }

      video.addEventListener(event, wrappedHandler, {
        passive: true,
        ...options
      })
      listeners.set(event, wrappedHandler)
    }

    // Eventos específicos por plataforma
    if (this.platform.isIOS) {
      // iOS necesita eventos diferentes
      addListener('loadstart', () => this.onVideoLoadStart(container, video, videoId))
      addListener('canplay', () => this.onVideoReady(container, video, videoId))
    } else {
      // Android y desktop
      addListener('canplay', () => this.onVideoReady(container, video, videoId))
      addListener('loadeddata', () => this.onVideoReady(container, video, videoId))
    }

    addListener('error', () => this.onVideoError(video, container, videoId, type))
    addListener('pause', e => this.onVideoPause(video, container, e))

    // Guardar referencia para cleanup
    video._listeners = listeners
  },

  // Manejar inicio de carga de video
  onVideoLoadStart(container, video, videoId) {
    console.log(`[VideoPlayer] Video load started: ${videoId}`)
    // Actualizar loading state
    const loading = container.querySelector('.video-loading')
    if (loading && !loading.classList.contains('minimal')) {
      const loadingText = loading.querySelector('p')
      if (loadingText) {
        loadingText.textContent = 'Conectando...'
      }
    }
  },

  // Reproducir video de forma segura con modo manual
  playVideoSafely(video, attempt = 1, manualMode = false) {
    if (!video || video.readyState < 2) {
      if (attempt <= this.platformConfig.playbackAttempts) {
        const timer = setTimeout(() => {
          this.state.activeTimers.delete(timer)
          this.playVideoSafely(video, attempt + 1, manualMode)
        }, this.config.aggressivePlaybackDelay * attempt)
        this.state.activeTimers.add(timer)
      }
      return
    }

    // Configuración específica para iOS
    if (this.platform.isIOS && !this.userHasInteracted && !manualMode) {
      // En iOS, no intentar autoplay sin interacción del usuario
      this.showPlayOverlay(video.closest('[data-component="video-player"]'), video)
      return
    }

    // Asegurar configuración para autoplay
    video.muted = true
    video.volume = 0

    const playPromise = video.play()

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log(`[VideoPlayer] Video playing successfully`)
        })
        .catch(error => {
          if (attempt <= this.platformConfig.playbackAttempts) {
            console.warn(`[VideoPlayer] Retry playback attempt ${attempt}:`, error.name)
            const timer = setTimeout(() => {
              this.state.activeTimers.delete(timer)
              this.playVideoSafely(video, attempt + 1, manualMode)
            }, this.config.aggressivePlaybackDelay * attempt)
            this.state.activeTimers.add(timer)
          } else {
            console.warn('[VideoPlayer] Autoplay bloqueado, mostrando overlay')
            this.showPlayOverlay(video.closest('[data-component="video-player"]'), video)
          }
        })
    }
  },

  // Mostrar contenido de respaldo optimizado
  showFallbackContent(container) {
    const fallbackImage = container.getAttribute('data-image-fallback')

    if (fallbackImage) {
      const imageDiv = document.createElement('div')
      imageDiv.className = 'video-fallback-image'

      // Usar background-image con loading optimizado
      Object.assign(imageDiv.style, {
        width: '100%',
        height: '100%',
        backgroundImage: `url('${fallbackImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        borderRadius: '8px',
        position: 'relative'
      })

      // Precargar imagen de forma asíncrona
      const img = new Image()
      img.onload = () => {
        imageDiv.style.backgroundImage = `url('${fallbackImage}')`
      }
      img.onerror = () => {
        console.warn('[VideoPlayer] Error cargando imagen de fallback')
        imageDiv.style.backgroundColor = '#f0f0f0'
        imageDiv.innerHTML =
          '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#666;">Imagen no disponible</div>'
      }

      // Cargar imagen con prioridad baja para no bloquear
      if ('loading' in HTMLImageElement.prototype) {
        img.loading = 'lazy'
      }
      img.src = fallbackImage

      container.innerHTML = ''
      container.appendChild(imageDiv)
    } else {
      // Fallback sin imagen
      container.innerHTML = `
        <div style="
          width: 100%;
          height: 200px;
          background: linear-gradient(45deg, #f0f0f0 25%, transparent 25%),
                      linear-gradient(-45deg, #f0f0f0 25%, transparent 25%);
          background-size: 20px 20px;
          background-position: 0 0, 10px 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
          border-radius: 8px;
        ">
          Contenido no disponible
        </div>
      `
    }

    container.classList.add('video-loaded')
  },

  // Resto de métodos optimizados...
  setupIntersectionObserver() {
    if (!('IntersectionObserver' in window) || !this.platformConfig.useIntersectionObserver) {
      console.warn('[VideoPlayer] IntersectionObserver no disponible o deshabilitado')
      this.setupManualVisibilityCheck()
      return
    }

    this.cleanup('intersectionObserver')

    const options = {
      root: null,
      rootMargin: this.config.lazyLoadMargin,
      threshold: this.platformConfig.intersectionThreshold
    }

    this.state.intersectionObserver = new IntersectionObserver(
      this.debounce(this.handleIntersection.bind(this), 150), // Debounce más largo para móvil
      options
    )

    const containers = document.querySelectorAll('[data-component="video-player"]')
    containers.forEach(container => {
      this.state.intersectionObserver.observe(container)
    })
  },

  // Inicializar contenedor específico (reutilizar del código anterior)
  initializeVideoContainer(container) {
    if (container.classList.contains('video-initialized')) {
      return
    }

    container.innerHTML = ''
    const loadingElement = this.showMinimalLoading(container)

    const mobileVideoUrl = this.getVideoUrl(container, 'mobile')
    const desktopVideoUrl = this.getVideoUrl(container, 'desktop')

    let hasValidVideo = false

    // Priorizar según plataforma y conexión
    if (this.platform.isMobile && mobileVideoUrl && this.platform.connectionSpeed !== 'slow') {
      this.createVideoElement(container, mobileVideoUrl, 'mobile', true)
      hasValidVideo = true
    }

    if (desktopVideoUrl && (!this.platform.isMobile || this.platform.connectionSpeed === 'fast')) {
      this.createVideoElement(container, desktopVideoUrl, 'desktop', !this.platform.isMobile)
      hasValidVideo = true
    }

    if (!hasValidVideo) {
      loadingElement?.remove()
      this.showFallbackContent(container)
    }

    container.classList.add('video-initialized')
  },

  // Heredar métodos restantes del código anterior
  scheduleRetryInit() {
    const retries = this.state.retryAttempts.get('init') || 0

    if (retries >= this.platformConfig.maxRetries) {
      console.warn('[VideoPlayer] Máximo de reintentos de inicialización alcanzado')
      return
    }

    const delay = Math.min(1000 * Math.pow(2, retries), 8000) // Backoff más largo para móvil
    this.state.retryAttempts.set('init', retries + 1)

    const timer = setTimeout(() => {
      this.state.activeTimers.delete(timer)
      this.setupVideoContainers()
    }, delay)

    this.state.activeTimers.add(timer)
  },

  handleIntersection(entries) {
    entries.forEach(entry => {
      const videos = entry.target.querySelectorAll('video')

      videos.forEach(video => {
        if (entry.isIntersecting) {
          this.playVideoSafely(video)
          this.removePlayOverlay(entry.target)
        } else {
          if (!video.paused) {
            video.pause()
          }
        }
      })
    })
  },

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
  },

  onVideoReady(container, video, videoId) {
    if (this.state.loadedVideos.has(videoId)) {
      return
    }

    this.state.loadedVideos.add(videoId)
    container.classList.add('video-loaded')
    video.style.opacity = '1'

    const loading = container.querySelector('.video-loading')
    loading?.remove()

    const containerId = container.id || 'unknown'
    this.state.retryAttempts.delete(containerId)

    if (this.isElementVisible(container)) {
      this.playVideoSafely(video)
    }
  },

  onVideoError(video, container, videoId, type) {
    console.warn(`[VideoPlayer] Error en video ${type}:`, {
      videoId,
      error: video.error?.code,
      src: video.src,
      platform: this.platform.name
    })

    if (this.state.loadedVideos.has(`${videoId}-error`)) {
      return
    }
    this.state.loadedVideos.add(`${videoId}-error`)

    const alternativeVideo = container.querySelector(`video[data-video-type="${type === 'mobile' ? 'desktop' : 'mobile'}"]`)
    if (alternativeVideo && alternativeVideo.readyState >= 2) {
      video.style.display = 'none'
      alternativeVideo.style.display = 'block'
      return
    }

    this.showFallbackContent(container)
  },

  onVideoPause(video, container, event) {
    if (video.ended || !this.isElementVisible(container)) {
      return
    }

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

    overlay.addEventListener(
      'touchstart',
      () => {
        playButton.style.transform = 'scale(1.1)'
      },
      { passive: true }
    )

    overlay.addEventListener(
      'touchend',
      () => {
        playButton.style.transform = 'scale(1)'
      },
      { passive: true }
    )

    overlay.addEventListener('click', e => {
      e.preventDefault()
      e.stopPropagation()

      // Marcar interacción del usuario para iOS
      this.userHasInteracted = true

      video
        .play()
        .then(() => overlay.remove())
        .catch(console.warn)
    })

    container.style.position = 'relative'
    container.appendChild(overlay)
  },

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

  handleVideoLoadTimeout(video, container, videoId, type) {
    if (video.readyState < 2 && !this.state.loadedVideos.has(videoId)) {
      console.warn(`[VideoPlayer] Timeout de carga para video ${type} en ${this.platform.name}`)
      this.onVideoError(video, container, videoId, type)
    }
  },

  getVideoUrl(container, type) {
    if (typeof configuration !== 'undefined') {
      const configUrl = type === 'mobile' ? configuration.urlVideoMobile : configuration.urlVideoDesktop
      if (configUrl?.trim()) return configUrl
    }

    const dataAttr = type === 'mobile' ? 'data-video-mobile-url' : 'data-video-desktop-url'
    const url = container.getAttribute(dataAttr)
    return url?.trim() || null
  },

  isElementVisible(element) {
    const rect = element.getBoundingClientRect()
    const windowHeight = window.innerHeight || document.documentElement.clientHeight

    return rect.top < windowHeight && rect.bottom > 0 && rect.width > 0 && rect.height > 0
  },

  hashString(str) {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash
    }
    return Math.abs(hash).toString(36)
  },

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

        document.querySelectorAll('video').forEach(video => {
          if (video._listeners) {
            video._listeners.forEach((handler, event) => {
              video.removeEventListener(event, handler)
            })
            delete video._listeners
          }
        })

        this.state = {
          initialized: false,
          loadedVideos: new Set(),
          retryAttempts: new Map(),
          activeTimers: new Set(),
          intersectionObserver: null,
          periodicityObserver: null,
          performanceObserver: null,
          resourceQueue: [],
          loadingPaused: false
        }
        break
    }
  },

  destroy() {
    this.cleanup('all')
  }
}

// Sistema de datos del programa (heredado del código anterior)
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
    if (liferayVideoSystem.state.initialized) {
      liferayVideoSystem.setupVideoContainers()
    }
  },

  updateProgramName() {
    const context = document.getElementById('datos')
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

    const periodicityElements = document.querySelectorAll('[data-puj-periodicity="true"]')
    periodicityElements.forEach(ensureLowercase)

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

    this.state.intervalId = setInterval(() => {
      const elements = document.querySelectorAll('[data-puj-periodicity="true"]')
      elements.forEach(ensureLowercase)
    }, 5000)
  },

  initModals() {
    document.addEventListener('click', this.handleModalClick.bind(this))
    document.addEventListener('keydown', this.handleModalKeydown.bind(this))
  },

  handleModalClick(e) {
    const modalTrigger = e.target.closest('[data-modal-target]')
    if (modalTrigger) {
      e.preventDefault()
      const modalId = modalTrigger.getAttribute('data-modal-target')
      this.openModal(modalId)
      return
    }

    const closeButton = e.target.closest('.program-detail-modal__close')
    if (closeButton) {
      e.preventDefault()
      const modal = closeButton.closest('.program-detail-modal')
      if (modal) this.closeModal(modal.id)
      return
    }

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

// Sistema de inicialización optimizado para móvil
const initProgramDataVideo = () => {
  try {
    programDataSystem.init()
    liferayVideoSystem.init()

    setupUserInteractionHandler()
  } catch (error) {
    console.error('[VideoPlayer] Error durante inicialización:', error)
  }
}

const setupUserInteractionHandler = () => {
  let interactionTriggered = false
  const interactionEvents = ['click', 'touchstart', 'scroll', 'keydown']

  const handleUserInteraction = () => {
    if (interactionTriggered) return
    interactionTriggered = true

    const containers = document.querySelectorAll('[data-component="video-player"].video-loaded')
    containers.forEach(container => {
      if (liferayVideoSystem.isElementVisible(container)) {
        const videos = container.querySelectorAll('video')
        videos.forEach(video => {
          if (video.paused) {
            liferayVideoSystem.playVideoSafely(video, 1, true)
          }
        })
      }
    })

    interactionEvents.forEach(eventType => {
      document.removeEventListener(eventType, handleUserInteraction, true)
    })
  }

  interactionEvents.forEach(eventType => {
    document.addEventListener(eventType, handleUserInteraction, {
      passive: true,
      capture: true,
      once: true
    })
  })

  setTimeout(() => {
    interactionEvents.forEach(eventType => {
      document.removeEventListener(eventType, handleUserInteraction, true)
    })
  }, 30000)
}

const initSystem = () => {
  if (window.programDataVideoInitialized) {
    console.warn('[VideoPlayer] Sistema ya inicializado')
    return
  }

  window.programDataVideoInitialized = true

  window.addEventListener('beforeunload', () => {
    liferayVideoSystem.destroy()
    programDataSystem.destroy()
  })

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProgramDataVideo)
  } else {
    // Diferir inicialización para no bloquear carga crítica
    if ('requestIdleCallback' in window) {
      requestIdleCallback(initProgramDataVideo, { timeout: 2000 })
    } else {
      setTimeout(initProgramDataVideo, 100)
    }
  }
}

export default initSystem

if (typeof window !== 'undefined') {
  initSystem()
}
