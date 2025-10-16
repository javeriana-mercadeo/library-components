// ===== CÓDIGO COMPILADO CON ESBUILD (IIFE) =====
// Compilado el: 15/10/2025, 08:54:03 a. m. (COT)

'use strict'
;(() => {
  // app/landing/pregrado/_sections/1-1_dobleDatos/modules/platform-detection.js
  var PLATFORM_CONFIGS = {
    // iOS Safari específico
    ios: {
      maxRetries: 2,
      playbackAttempts: 1,
      intersectionThreshold: 0.3,
      loadingTimeout: 6e3,
      preload: 'metadata',
      // Cambiar a metadata para mejor experiencia
      useIntersectionObserver: true
      // Habilitar para mejor performance
    },
    // Android específico
    android: {
      maxRetries: 3,
      playbackAttempts: 2,
      intersectionThreshold: 0.3,
      loadingTimeout: 6e3,
      preload: 'metadata',
      useIntersectionObserver: true
    },
    // Desktop fallback
    desktop: {
      maxRetries: 3,
      playbackAttempts: 3,
      intersectionThreshold: 0.3,
      loadingTimeout: 5e3,
      preload: 'metadata',
      useIntersectionObserver: true
    }
  }
  var GENERAL_CONFIG = {
    aggressivePlaybackDelay: 300,
    lazyLoadMargin: '100px',
    resourcePriority: {
      critical: 0,
      // Imágenes de fallback
      high: 1,
      // Videos desktop
      normal: 2,
      // Videos mobile
      low: 3
      // Assets secundarios
    }
  }
  function getConnectionSpeed() {
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
  }
  function detectPlatform() {
    const ua = navigator.userAgent
    const platform = {
      isIOS: /iPad|iPhone|iPod/.test(ua) && !window.MSStream,
      isAndroid: /Android/.test(ua),
      isSafari: /Safari/.test(ua) && !/Chrome/.test(ua),
      isChrome: /Chrome/.test(ua),
      isMobile: /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua),
      connectionSpeed: getConnectionSpeed(),
      hasLowMemory: navigator.deviceMemory && navigator.deviceMemory < 4
    }
    let config
    if (platform.isIOS) {
      config = PLATFORM_CONFIGS.ios
      platform.name = 'ios'
    } else if (platform.isAndroid) {
      config = PLATFORM_CONFIGS.android
      platform.name = 'android'
    } else {
      config = PLATFORM_CONFIGS.desktop
      platform.name = 'desktop'
    }
    return {
      ...platform,
      config: { ...config, ...GENERAL_CONFIG }
    }
  }

  // app/landing/pregrado/_sections/1-1_dobleDatos/modules/utils.js
  var TimerManager = class {
    constructor() {
      this.scheduler = TimingUtils.createScheduler()
    }
    setTimeout(callback, delay) {
      return this.scheduler.schedule(callback, delay)
    }
    setInterval(callback, interval) {
      const intervalFn = () => {
        callback()
        this.setTimeout(intervalFn, interval)
      }
      return this.setTimeout(intervalFn, interval)
    }
    clearTimer(timer) {
      this.scheduler.cancel(timer)
    }
    clearAll() {
      this.scheduler.cancelAll()
    }
    destroy() {
      this.clearAll()
    }
  }
  var ModuleEventManager = class {
    constructor() {
      this.listeners = /* @__PURE__ */ new Set()
    }
    addEventListener(element, event, handler, options = {}) {
      const key = EventManager.add(element, event, handler, options)
      this.listeners.add(key)
      return key
    }
    removeEventListener(element, event, handler) {
      EventManager.removeByElement(element)
    }
    destroy() {
      this.listeners.forEach(key => EventManager.remove(key))
      this.listeners.clear()
    }
  }
  var debounce = TimingUtils.debounce
  var throttle = TimingUtils.throttle
  var wait = TimingUtils.sleep
  function isElementVisible(element, threshold = 0.1) {
    if (DOMUtils && DOMUtils.isElementVisible) {
      return DOMUtils.isElementVisible(element, threshold)
    }
    if (!element) return false
    const rect = element.getBoundingClientRect()
    const windowHeight = window.innerHeight || document.documentElement.clientHeight
    const windowWidth = window.innerWidth || document.documentElement.clientWidth
    const verticalVisible =
      rect.top + rect.height * threshold < windowHeight && rect.bottom - rect.height * threshold > 0
    const horizontalVisible =
      rect.left + rect.width * threshold < windowWidth && rect.right - rect.width * threshold > 0
    return verticalVisible && horizontalVisible
  }
  function onDOMReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback)
    } else {
      callback()
    }
  }
  function runWhenIdle(callback, timeout = 2e3) {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(callback, { timeout })
    } else {
      setTimeout(callback, 100)
    }
  }
  function getVideoUrl(container, type) {
    if (typeof configuration !== 'undefined') {
      const configUrl =
        type === 'mobile' ? configuration.urlVideoMobile : configuration.urlVideoDesktop
      if (configUrl?.trim()) return configUrl
    }
    const dataAttr = type === 'mobile' ? 'data-video-mobile-url' : 'data-video-desktop-url'
    const url = container.getAttribute(dataAttr)
    return url?.trim() || null
  }

  // app/landing/pregrado/_sections/1-1_dobleDatos/modules/video-system.js
  var VideoSystem = class {
    constructor() {
      this.state = {
        initialized: false,
        loadedVideos: /* @__PURE__ */ new Set(),
        retryAttempts: /* @__PURE__ */ new Map(),
        intersectionObserver: null,
        resourceQueue: [],
        loadingPaused: false,
        maxRetryAttempts: 3,
        currentRetryCount: 0
      }
      this.platform = null
      this.timers = new TimerManager()
      this.events = new ModuleEventManager()
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
          this.showVideoOverlay(container)
        } else if (hasVideo && !fallbackImage) {
          this.showVideoPlaceholder(container, 'Video disponible')
        } else if (!hasVideo) {
          this.showVideoPlaceholder(container, 'No hay contenido disponible')
        }
        container.classList.add('video-initialized')
        container.setAttribute('data-lazy', 'true')
      } catch (error) {
        this.logger.error('[VideoSystem] Error inicializando contenedor lazy:', error)
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
        const handleCanPlay = () => {
          this.hideVideoLoader(loader)
          if (overlay) {
            overlay.classList.add('program-data__video-overlay--fade-out')
            setTimeout(() => overlay.remove(), 400)
          }
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
      this.observeExistingContainers()
    }
    /**
     * Observar containers de video existentes
     */
    observeExistingContainers() {
      if (!this.state.intersectionObserver) return
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
        if (
          visible &&
          container.hasAttribute('data-lazy') &&
          !container.classList.contains('video-loaded')
        ) {
          this.handleVideoIntersection(container, true)
        } else {
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
          this.logger.warning('[VideoSystem] Container nulo en intersecci\xF3n')
          return
        }
        if (container.classList.contains('video-failed')) {
          return
        }
        if (isVisible) {
          if (
            container.hasAttribute('data-lazy') &&
            !container.classList.contains('video-loaded')
          ) {
            try {
              await this.loadVideoLazily(container)
            } catch (error) {
              this.logger.error('[VideoSystem] Error cargando video lazy:', error)
              container.classList.add('video-failed')
              this.showVideoPlaceholder(container, 'Error cargando video')
            }
          } else {
            const videos = container.querySelectorAll('video')
            videos.forEach(video => {
              try {
                if (video.paused) {
                  this.playVideoSafely(video).catch(error => {
                    this.logger.warning('[VideoSystem] Error reproduciendo video:', error.message)
                  })
                }
              } catch (error) {
                this.logger.error('[VideoSystem] Error en reproducci\xF3n de video:', error)
              }
            })
          }
        } else {
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
        this.logger.error('[VideoSystem] Error cr\xEDtico en handleVideoIntersection:', error)
      }
    }
    /**
     * Cargar video de forma lazy y no-bloqueante
     */
    async loadVideoLazily(container) {
      container.removeAttribute('data-lazy')
      try {
        await this.runInBackground(() => {
          return this.loadVideoInBackground(container)
        })
      } catch (error) {
        this.logger.error('[VideoSystem] Error en carga lazy:', error)
        container.setAttribute('data-lazy', 'true')
      }
    }
    /**
     * Ejecutar función en background sin bloquear UI
     */
    async runInBackground(taskFn) {
      return new Promise((resolve, reject) => {
        if ('requestIdleCallback' in window) {
          requestIdleCallback(async deadline => {
            try {
              if (deadline.timeRemaining() > 5) {
                const result = await taskFn()
                resolve(result)
              } else {
                const result = await this.runInBackground(taskFn)
                resolve(result)
              }
            } catch (error) {
              reject(error)
            }
          })
        } else {
          setTimeout(async () => {
            try {
              const result = await taskFn()
              resolve(result)
            } catch (error) {
              reject(error)
            }
          }, 16)
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
      await new Promise(resolve => {
        requestAnimationFrame(() => {
          const loader = this.showVideoLoader(container)
          resolve(loader)
        })
      })
      const existingOverlay = container.querySelector('.program-data__video-overlay')
      if (existingOverlay) {
        const loader = container.querySelector('.program-data__video-loader')
        await this.loadVideoWithOverlay(container, existingOverlay, loader)
      } else {
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
      Object.assign(video, {
        src: videoUrl,
        muted: true,
        loop: true,
        playsInline: true,
        preload: this.platform.config.preload || 'metadata',
        controls: false
      })
      video.setAttribute('playsinline', 'true')
      video.setAttribute('webkit-playsinline', 'true')
      if (this.platform.isMobile) {
        video.setAttribute('x-webkit-airplay', 'allow')
      }
      video.className = 'program-data__video'
      container.style.position = 'relative'
      container.appendChild(video)
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
        this.logger.warning('[VideoSystem] Video inv\xE1lido o nulo')
        return
      }
      if (!video.paused) return
      const finalMaxAttempts = maxAttempts || this.platform?.config?.playbackAttempts || 3
      let attempts = 0
      while (attempts < finalMaxAttempts) {
        try {
          await video.play()
          this.state.loadedVideos.add(video)
          this.logger.info('[VideoSystem] Video reproduci\xE9ndose exitosamente')
          break
        } catch (error) {
          attempts++
          this.logger.warning(
            `[VideoSystem] Intento ${attempts}/${finalMaxAttempts} fall\xF3:`,
            error.message
          )
          if (attempts >= finalMaxAttempts) {
            if (isManual) {
              this.logger.error(
                '[VideoSystem] Reproducci\xF3n manual fall\xF3 despu\xE9s de todos los intentos'
              )
            } else {
              this.handlePlaybackError(video, error)
            }
          } else {
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
      const videos = container.querySelectorAll('video')
      videos.forEach(video => video.remove())
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
      this.logger.warning('[VideoSystem] Error de reproducci\xF3n, pausando video:', error)
      video.pause()
    }
    /**
     * Programar reintento de inicialización con límite
     */
    scheduleRetryInit() {
      if (this.state.currentRetryCount >= this.state.maxRetryAttempts) {
        this.logger.error(
          '[VideoSystem] M\xE1ximo n\xFAmero de reintentos alcanzado. Deshabilitando sistema de video.'
        )
        return
      }
      this.state.currentRetryCount++
      this.logger.info(
        `[VideoSystem] Programando reintento ${this.state.currentRetryCount}/${this.state.maxRetryAttempts}`
      )
      this.timers.setTimeout(() => {
        this.setupLazyVideoContainers()
      }, 2e3 * this.state.currentRetryCount)
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
        if (this.state.intersectionObserver) {
          this.state.intersectionObserver.disconnect()
          this.state.intersectionObserver = null
        }
        const videos = document.querySelectorAll('[data-component="video-player"] video')
        videos.forEach(video => {
          try {
            video.pause()
            video.currentTime = 0
            video.src = ''
            video.load()
            video.onloadedmetadata = null
            video.oncanplay = null
            video.onerror = null
            video.onplay = null
            video.onpause = null
            if (video.parentNode) {
              video.parentNode.removeChild(video)
            }
          } catch (error) {
            this.logger.warning('[VideoSystem] Error limpiando video individual:', error.message)
          }
        })
        const containers = document.querySelectorAll('[data-component="video-player"][data-lazy]')
        containers.forEach(container => {
          try {
            container.removeAttribute('data-lazy')
            container.classList.remove('video-initialized', 'video-loaded', 'video-failed')
            if (container._preloadedVideo) {
              container._preloadedVideo.remove()
              delete container._preloadedVideo
            }
          } catch (error) {
            this.logger.warning('[VideoSystem] Error limpiando container:', error.message)
          }
        })
        if (this.timers) {
          this.timers.destroy()
        }
        if (this.events) {
          this.events.destroy()
        }
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

  // app/landing/pregrado/_sections/1-1_dobleDatos/modules/modal-system.js
  var ModalSystem = class {
    constructor() {
      this.events = new ModuleEventManager()
      this.logger = Logger
      this.activeModal = null
    }
    /**
     * Inicializar sistema de modales
     */
    init() {
      this.events.addEventListener(document, 'click', this.handleModalClick.bind(this))
      this.events.addEventListener(document, 'keydown', this.handleModalKeydown.bind(this))
    }
    /**
     * Manejar clicks en elementos relacionados con modales
     */
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
      if (
        e.target.classList.contains('program-detail-modal') &&
        e.target.classList.contains('program-detail-modal--active')
      ) {
        this.closeModal(e.target.id)
      }
    }
    /**
     * Manejar eventos de teclado
     */
    handleModalKeydown(e) {
      if (e.key === 'Escape') {
        const openModal = document.querySelector('.program-detail-modal--active')
        if (openModal) {
          this.closeModal(openModal.id)
        }
      }
      if (e.key === 'Tab' && this.activeModal) {
        this.handleTabNavigation(e)
      }
    }
    /**
     * Manejar navegación con Tab dentro del modal
     */
    handleTabNavigation(e) {
      const modal = this.activeModal
      if (!modal) return
      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const focusableArray = Array.from(focusableElements)
      if (focusableArray.length === 0) return
      const firstElement = focusableArray[0]
      const lastElement = focusableArray[focusableArray.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }
    /**
     * Abrir modal por ID
     */
    openModal(modalId) {
      const modal = document.getElementById(modalId)
      if (!modal) {
        this.logger.warning(`[ModalSystem] Modal no encontrado: ${modalId}`)
        return
      }
      if (this.activeModal) {
        this.closeModal(this.activeModal.id)
      }
      modal.classList.add('program-detail-modal--active')
      document.body.style.overflow = 'hidden'
      this.activeModal = modal
      this.focusModal(modal)
      const openEvent = new CustomEvent('modal:opened', {
        detail: { modalId, modal }
      })
      document.dispatchEvent(openEvent)
    }
    /**
     * Cerrar modal por ID
     */
    closeModal(modalId) {
      const modal = document.getElementById(modalId)
      if (!modal) {
        this.logger.warning(`[ModalSystem] Modal no encontrado: ${modalId}`)
        return
      }
      modal.classList.remove('program-detail-modal--active')
      document.body.style.overflow = ''
      this.restoreFocus(modalId)
      this.activeModal = null
      const closeEvent = new CustomEvent('modal:closed', {
        detail: { modalId, modal }
      })
      document.dispatchEvent(closeEvent)
    }
    /**
     * Enfocar elementos dentro del modal
     */
    focusModal(modal) {
      const closeButton = modal.querySelector('.program-detail-modal__close')
      if (closeButton) {
        closeButton.focus()
        return
      }
      const focusableElement = modal.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (focusableElement) {
        focusableElement.focus()
      }
    }
    /**
     * Restaurar foco al elemento que disparó el modal
     */
    restoreFocus(modalId) {
      const trigger = document.querySelector(`[data-modal-target="${modalId}"]`)
      if (trigger && typeof trigger.focus === 'function') {
        setTimeout(() => {
          trigger.focus()
        }, 100)
      }
    }
    /**
     * Cerrar todos los modales abiertos
     */
    closeAllModals() {
      const openModals = document.querySelectorAll('.program-detail-modal--active')
      openModals.forEach(modal => {
        this.closeModal(modal.id)
      })
    }
    /**
     * Verificar si hay algún modal abierto
     */
    hasOpenModal() {
      return this.activeModal !== null
    }
    /**
     * Obtener modal actualmente activo
     */
    getActiveModal() {
      return this.activeModal
    }
    /**
     * Crear modal programáticamente
     */
    createModal(id, content, options = {}) {
      const existingModal = document.getElementById(id)
      if (existingModal) {
        this.logger.warning(`[ModalSystem] Modal con ID ${id} ya existe`)
        return existingModal
      }
      const modal = document.createElement('div')
      modal.id = id
      modal.className = 'program-detail-modal'
      modal.setAttribute('role', 'dialog')
      modal.setAttribute('aria-modal', 'true')
      if (options.ariaLabel) {
        modal.setAttribute('aria-label', options.ariaLabel)
      }
      modal.innerHTML = `
      <div class="program-detail-modal__content">
        <button class="program-detail-modal__close" aria-label="Cerrar modal">
          <span>&times;</span>
        </button>
        <div class="program-detail-modal__body">
          ${content}
        </div>
      </div>
    `
      document.body.appendChild(modal)
      return modal
    }
    /**
     * Eliminar modal del DOM
     */
    destroyModal(modalId) {
      const modal = document.getElementById(modalId)
      if (!modal) return
      if (modal.classList.contains('program-detail-modal--active')) {
        this.closeModal(modalId)
      }
      modal.remove()
    }
    /**
     * Limpiar sistema de modales
     */
    destroy() {
      this.closeAllModals()
      document.body.style.overflow = ''
      this.events.destroy()
      this.activeModal = null
    }
  }

  // app/landing/pregrado/_sections/1-1_dobleDatos/modules/periodicity-observer.js
  var PeriodicityObserver = class {
    constructor() {
      this.state = {
        periodicityObserver: null,
        intervalId: null
      }
      this.timers = new TimerManager()
      this.logger = Logger
      this.targetSelector = '[data-puj-periodicity="true"]'
    }
    /**
     * Inicializar el observador de periodicidad
     */
    init() {
      this.cleanup()
      this.applyLowercaseToAll()
      this.setupMutationObserver()
      this.setupPeriodicCheck()
    }
    /**
     * Aplicar lowercase a todos los elementos existentes
     */
    applyLowercaseToAll() {
      const elements = document.querySelectorAll(this.targetSelector)
      elements.forEach(element => this.ensureLowercase(element))
    }
    /**
     * Configurar MutationObserver para detectar cambios en el DOM
     */
    setupMutationObserver() {
      const debouncedHandler = TimingUtils.debounce(mutations => {
        this.handleMutations(mutations)
      }, 100)
      this.state.periodicityObserver = new MutationObserver(debouncedHandler)
      this.state.periodicityObserver.observe(document.body, {
        childList: true,
        // Observar adición/eliminación de nodos
        subtree: true,
        // Observar todo el subárbol
        characterData: true
        // Observar cambios en el contenido de texto
      })
    }
    /**
     * Manejar mutaciones del DOM
     */
    handleMutations(mutations) {
      let hasRelevantChanges = false
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' || mutation.type === 'characterData') {
          hasRelevantChanges = true
        }
      })
      if (hasRelevantChanges) {
        this.applyLowercaseToAll()
      }
    }
    /**
     * Configurar verificación periódica como respaldo
     */
    setupPeriodicCheck() {
      this.state.intervalId = this.timers.setInterval(() => {
        this.applyLowercaseToAll()
      }, 5e3)
    }
    /**
     * Asegurar que el primer carácter del elemento esté en minúscula
     */
    ensureLowercase(element) {
      if (!element || !element.textContent) return
      const currentText = element.textContent
      if (currentText.length === 0) return
      const firstChar = currentText.charAt(0)
      const firstCharLower = firstChar.toLowerCase()
      if (firstChar !== firstCharLower) {
        const newText = firstCharLower + currentText.slice(1)
        element.textContent = newText
      }
    }
    /**
     * Procesar elemento específico si tiene el atributo correcto
     */
    processElement(element) {
      if (element.hasAttribute && element.hasAttribute('data-puj-periodicity')) {
        const value = element.getAttribute('data-puj-periodicity')
        if (value === 'true') {
          this.ensureLowercase(element)
        }
      }
      const childElements =
        element.querySelectorAll && element.querySelectorAll(this.targetSelector)
      if (childElements) {
        childElements.forEach(child => this.ensureLowercase(child))
      }
    }
    /**
     * Añadir elemento para observación
     */
    addElement(element) {
      if (!element) return
      if (element.matches && element.matches(this.targetSelector)) {
        this.ensureLowercase(element)
      }
      this.processElement(element)
    }
    /**
     * Pausar observación
     */
    pause() {
      if (this.state.periodicityObserver) {
        this.state.periodicityObserver.disconnect()
      }
      if (this.state.intervalId) {
        this.timers.clearTimer(this.state.intervalId)
        this.state.intervalId = null
      }
    }
    /**
     * Reanudar observación
     */
    resume() {
      if (!this.state.periodicityObserver) {
        this.setupMutationObserver()
      }
      if (!this.state.intervalId) {
        this.setupPeriodicCheck()
      }
      this.applyLowercaseToAll()
    }
    /**
     * Verificar si el observador está activo
     */
    isActive() {
      return this.state.periodicityObserver !== null && this.state.intervalId !== null
    }
    /**
     * Obtener estadísticas del observador
     */
    getStats() {
      const elements = document.querySelectorAll(this.targetSelector)
      return {
        isActive: this.isActive(),
        elementCount: elements.length,
        hasPeriodicCheck: this.state.intervalId !== null,
        hasMutationObserver: this.state.periodicityObserver !== null
      }
    }
    /**
     * Limpiar recursos
     */
    cleanup() {
      if (this.state.periodicityObserver) {
        this.state.periodicityObserver.disconnect()
        this.state.periodicityObserver = null
      }
      if (this.state.intervalId) {
        this.timers.clearTimer(this.state.intervalId)
        this.state.intervalId = null
      }
    }
    /**
     * Destruir completamente el observador
     */
    destroy() {
      this.cleanup()
      this.timers.destroy()
    }
  }

  // app/landing/pregrado/_sections/1-1_dobleDatos/modules/program-formatter.js
  var ProgramFormatter = class {
    constructor() {
      this.initialized = false
      this.init()
    }
    init() {
      if (this.initialized) return
      document.addEventListener('data_load-program', this.handleDataLoad.bind(this))
      this.initialized = true
      Logger?.info?.('ProgramFormatter: Module initialized')
    }
    handleDataLoad(event) {
      try {
        Logger?.info?.('ProgramFormatter: Data load event detected, processing elements')
        this.addColonsToElements()
      } catch (error) {
        Logger?.error?.('ProgramFormatter: Error processing data load event', error)
      }
    }
    addColonsToElements() {
      const context = document.getElementById('doble-datos')
      const elements = context ? context.querySelectorAll('[data-puj-name="true"]') : []
      Logger?.info?.(`ProgramFormatter: Found ${elements.length} elements to process`)
      elements.forEach((element, index) => {
        this.addColonToElement(element, index)
      })
    }
    addColonToElement(element, index) {
      try {
        const currentText = element.textContent || ''
        if (!currentText.endsWith(':') && !currentText.endsWith('::')) {
          const newText = currentText + ':'
          element.textContent = newText
          Logger?.debug?.(
            `ProgramFormatter: Added colon to element ${index + 1}: "${currentText}" -> "${newText}"`
          )
        } else {
          Logger?.debug?.(
            `ProgramFormatter: Element ${index + 1} already has colon(s): "${currentText}"`
          )
        }
      } catch (error) {
        Logger?.error?.(`ProgramFormatter: Error processing element ${index + 1}`, error)
      }
    }
    // Método para agregar colons manualmente si es necesario
    formatElementsNow() {
      Logger?.info?.('ProgramFormatter: Manual formatting triggered')
      this.addColonsToElements()
    }
    destroy() {
      document.removeEventListener('data_load-program', this.handleDataLoad.bind(this))
      this.initialized = false
      Logger?.info?.('ProgramFormatter: Module destroyed')
    }
  }
  var programFormatter = new ProgramFormatter()
  if (typeof window !== 'undefined') {
    window.ProgramFormatter = ProgramFormatter
    window.programFormatter = programFormatter
  }

  // app/landing/pregrado/_sections/1-1_dobleDatos/script.js
  var ProgramDataSystem = class {
    constructor() {
      this.platform = null
      this.videoSystem = new VideoSystem()
      this.modalSystem = new ModalSystem()
      this.periodicityObserver = new PeriodicityObserver()
      this.programFormatter = programFormatter
      this.initialized = false
    }
    /**
     * Inicializar el sistema completo
     */
    init() {
      if (this.initialized) {
        return
      }
      try {
        Logger.info('[ProgramDataSystem] Iniciando inicializaci\xF3n del sistema')
        this.platform = detectPlatform()
        this.setupDataEventListeners()
        try {
          this.modalSystem.init()
          Logger.info('[ProgramDataSystem] ModalSystem inicializado')
        } catch (error) {
          Logger.error('[ProgramDataSystem] Error inicializando ModalSystem:', error)
        }
        try {
          this.periodicityObserver.init()
          Logger.info('[ProgramDataSystem] PeriodicityObserver inicializado')
        } catch (error) {
          Logger.error('[ProgramDataSystem] Error inicializando PeriodicityObserver:', error)
        }
        try {
          this.videoSystem.init()
          Logger.info('[ProgramDataSystem] VideoSystem inicializado')
        } catch (error) {
          Logger.error('[ProgramDataSystem] Error inicializando VideoSystem:', error)
        }
        Logger.info('[ProgramDataSystem] ProgramFormatter inicializado')
        this.initialized = true
        Logger.info('[ProgramDataSystem] Sistema inicializado exitosamente')
      } catch (error) {
        Logger.error('[ProgramDataSystem] Error cr\xEDtico durante inicializaci\xF3n:', error)
        this.initialized = false
      }
    }
    /**
     * Configurar event listeners para datos del programa
     */
    setupDataEventListeners() {
      document.addEventListener('data_load-program', this.handleDataLoad.bind(this))
    }
    /**
     * Manejar carga de datos del programa
     */
    handleDataLoad() {
      if (this.videoSystem.state.initialized) {
        this.videoSystem.setupLazyVideoContainers()
      }
    }
    /**
     * Destruir el sistema y limpiar recursos
     */
    destroy() {
      if (this.videoSystem) {
        this.videoSystem.destroy()
      }
      if (this.modalSystem) {
        this.modalSystem.destroy()
      }
      if (this.periodicityObserver) {
        this.periodicityObserver.destroy()
      }
      if (this.programFormatter) {
        this.programFormatter.destroy()
      }
      this.initialized = false
    }
    /**
     * Obtener estado del sistema
     */
    getStatus() {
      return {
        initialized: this.initialized,
        platform: this.platform?.name || 'unknown',
        videoSystem: {
          initialized: this.videoSystem?.state.initialized || false,
          loadedVideos: this.videoSystem?.state.loadedVideos.size || 0
        },
        modalSystem: {
          hasActiveModal: this.modalSystem?.hasOpenModal() || false,
          activeModal: this.modalSystem?.getActiveModal()?.id || null
        },
        periodicityObserver: {
          isActive: this.periodicityObserver?.isActive() || false,
          ...this.periodicityObserver?.getStats()
        }
      }
    }
  }
  var globalProgramDataSystem = null
  function setupUserInteractionHandler() {
    let interactionTriggered = false
    const interactionEvents = ['click', 'touchstart', 'scroll', 'keydown']
    const handleUserInteraction = () => {
      if (interactionTriggered) return
      interactionTriggered = true
      const containers = document.querySelectorAll('[data-component="video-player"].video-loaded')
      containers.forEach(container => {
        if (isElementVisible(container)) {
          const videos = container.querySelectorAll('video')
          videos.forEach(video => {
            if (video.paused) {
              globalProgramDataSystem.videoSystem.playVideoSafely(video, 1, true)
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
    }, 3e4)
  }
  function initProgramDataVideo() {
    try {
      if (!globalProgramDataSystem) {
        Logger.error('[ProgramDataSystem] Sistema no inicializado')
        return
      }
      globalProgramDataSystem.init()
      setupUserInteractionHandler()
    } catch (error) {
      Logger.error('[ProgramDataSystem] Error durante inicializaci\xF3n:', error)
    }
  }
  function initSystem() {
    if (typeof window !== 'undefined' && window.programDataVideoInitialized) {
      return
    }
    globalProgramDataSystem = new ProgramDataSystem()
    if (typeof window !== 'undefined') {
      window.programDataVideoInitialized = true
      window.addEventListener('beforeunload', () => {
        if (globalProgramDataSystem) {
          globalProgramDataSystem.destroy()
        }
      })
    }
    onDOMReady(() => {
      runWhenIdle(initProgramDataVideo, 2e3)
    })
  }
  if (typeof window !== 'undefined') {
    window.ProgramDataSystem = ProgramDataSystem
    window.getProgramDataSystemStatus = () => {
      return globalProgramDataSystem?.getStatus() || { initialized: false }
    }
  }
  initSystem()
})()
