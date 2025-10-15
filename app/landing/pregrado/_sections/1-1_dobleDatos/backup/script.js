// ===== CÓDIGO COMPILADO CON ESBUILD (IIFE) =====
// Compilado el: 25/08/2025, 11:26:40 a. m. (COT)

'use strict'
;(() => {
  // app/landing/pregrado/_sections/1-1_dobleDatos/script.js
  var liferayVideoSystem = {
    // Configuración del sistema
    config: {
      breakpoint: 768
    },
    // Videos cargados exitosamente para evitar errores repetidos
    loadedVideos: /* @__PURE__ */ new Set(),
    // Sistema de reintentos para carga de videos
    retryAttempts: /* @__PURE__ */ new Map(),
    maxRetries: 3,
    retryDelay: 1e3,
    // Intersection Observer para autoplay compliance
    intersectionObserver: null,
    // Inicializar sistema de video
    init() {
      const initStrategies = [
        // Estrategia 1: Inicialización inmediata (para casos donde ya está listo)
        { delay: 100, maxAttempts: 3, name: 'immediate' },
        // Estrategia 2: Inicialización estándar (para casos normales)
        { delay: 500, maxAttempts: 8, name: 'standard' },
        // Estrategia 3: Inicialización tardía (para cargas lentas como page refresh)
        { delay: 1e3, maxAttempts: 15, name: 'delayed' }
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
              console.warn(`[VideoPlayer] Estrategia ${strategy.name} fall\xF3 despu\xE9s de ${strategy.maxAttempts} intentos`)
              strategyIndex++
              if (strategyIndex < initStrategies.length && !globalInitialized) {
                setTimeout(() => initializeWithStrategy(initStrategies[strategyIndex]), 200)
              }
            }
          } else if (attempts < strategy.maxAttempts) {
            setTimeout(tryInit, strategy.delay)
          } else {
            console.warn(
              `[VideoPlayer] Estrategia ${strategy.name}: no se encontraron contenedores despu\xE9s de ${strategy.maxAttempts} intentos`
            )
            strategyIndex++
            if (strategyIndex < initStrategies.length && !globalInitialized) {
              setTimeout(() => initializeWithStrategy(initStrategies[strategyIndex]), 200)
            }
          }
        }
        tryInit()
      }
      initializeWithStrategy(initStrategies[0])
      setTimeout(() => {
        if (!globalInitialized) {
          console.warn('[VideoPlayer] Sistema de fallback final activado despu\xE9s de 8 segundos')
          const containers = document.querySelectorAll('[data-component="video-player"]')
          if (containers.length > 0) {
            globalInitialized = true
            this.setupVideoContainers()
          }
        }
      }, 8e3)
    },
    // Configurar contenedores de video
    setupVideoContainers() {
      const containers = document.querySelectorAll('[data-component="video-player"]')
      containers.forEach(container => {
        this.initializeVideoContainer(container)
      })
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
        threshold: 0.5
        // Video debe estar 50% visible
      }
      this.intersectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const videos = entry.target.querySelectorAll('video')
          const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
          videos.forEach(video => {
            if (entry.isIntersecting) {
              if (isMobile) {
                this.playVideoSafely(video)
              } else {
                if (video.paused && !entry.target.querySelector('.video-play-overlay')) {
                  this.playVideoSafely(video)
                }
              }
              const overlay = entry.target.querySelector('.video-play-overlay')
              if (overlay) {
                setTimeout(() => {
                  if (!video.paused) {
                    overlay.remove()
                  }
                }, 500)
              }
            } else {
              if (!video.paused) {
                video.pause()
              }
            }
          })
        })
      }, options)
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
      if (video.readyState < 2) {
        if (video.readyState === 0 && video.src) {
          video.load()
        }
        setTimeout(() => {
          if (video.readyState >= 2) {
            this.playVideoSafely(video)
          } else {
            if (video.readyState === 0 && video.networkState === 3) {
              console.warn('[VideoPlayer] Video fall\xF3 al cargar completamente, activando reintentos')
              const container = video.closest('[data-component="video-player"]')
              if (container) {
                this.retryVideoInitialization(container)
              }
            }
          }
        }, 500)
        return
      }
      video.muted = true
      video.defaultMuted = true
      video.volume = 0
      video
        .play()
        .then(() => {})
        .catch(error => {
          console.warn('[VideoPlayer] Autoplay bloqueado:', error.name, error.message)
          this.showPlayOverlay(video.parentElement, video)
        })
    },
    // Mostrar overlay de play cuando autoplay es bloqueado
    showPlayOverlay(container, video) {
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
      overlay.addEventListener('mouseenter', () => {
        playButton.style.transform = 'scale(1.1)'
      })
      overlay.addEventListener('mouseleave', () => {
        playButton.style.transform = 'scale(1)'
      })
      overlay.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()
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
            setTimeout(() => {
              video
                .play()
                .then(() => {
                  overlay.remove()
                })
                .catch(retryError => {
                  console.error('[VideoPlayer] Fall\xF3 definitivamente:', retryError)
                })
            }, 200)
          })
      })
      container.style.position = 'relative'
      container.appendChild(overlay)
    },
    // Inicializar contenedor específico
    initializeVideoContainer(container) {
      if (container.classList.contains('video-initialized')) {
        return
      }
      container.innerHTML = ''
      const loadingState = this.showLoadingState(container)
      const mobileVideoUrl = this.getVideoUrl(container, 'mobile')
      const desktopVideoUrl = this.getVideoUrl(container, 'desktop')
      const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      let hasValidVideo = false
      if (isMobile && mobileVideoUrl) {
        this.createVideoElement(container, mobileVideoUrl, 'mobile')
        hasValidVideo = true
        if (desktopVideoUrl) {
          this.createVideoElement(container, desktopVideoUrl, 'desktop')
        }
      } else {
        if (desktopVideoUrl) {
          this.createVideoElement(container, desktopVideoUrl, 'desktop')
          hasValidVideo = true
        }
        if (mobileVideoUrl) {
          this.createVideoElement(container, mobileVideoUrl, 'mobile')
          hasValidVideo = true
        }
      }
      if (!hasValidVideo) {
        loadingState.remove()
        this.showError(container, 'general')
      }
      container.classList.add('video-initialized')
    },
    // Reintentar inicialización de video con reintentos
    retryVideoInitialization(container) {
      const containerId = container.id || 'unknown'
      const currentAttempts = this.retryAttempts.get(containerId) || 0
      if (currentAttempts >= this.maxRetries) {
        console.warn(`[VideoPlayer] M\xE1ximo de reintentos alcanzado para ${containerId}`)
        this.showError(container, 'max_retries')
        return
      }
      this.retryAttempts.set(containerId, currentAttempts + 1)
      container.innerHTML = ''
      container.classList.remove('video-initialized', 'video-loaded')
      setTimeout(() => {
        this.initializeVideoContainer(container)
      }, this.retryDelay)
    },
    // Obtener URL del video (simplificado para URLs directas)
    getVideoUrl(container, type) {
      if (typeof configuration !== 'undefined') {
        const configUrl = type === 'mobile' ? configuration.urlVideoMobile : configuration.urlVideoDesktop
        if (configUrl && configUrl.trim() !== '') {
          return configUrl
        }
      }
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
      video.setAttribute('src', videoUrl)
      video.setAttribute('class', `program-data__video program-data__video--${type}`)
      video.setAttribute('data-video-type', type)
      video.setAttribute('muted', '')
      video.setAttribute('loop', '')
      video.setAttribute('playsinline', '')
      video.setAttribute('preload', 'metadata')
      video.setAttribute('disablepictureinpicture', '')
      video.setAttribute('webkit-playsinline', '')
      video.setAttribute('x5-video-player-type', 'h5')
      video.setAttribute('x5-video-player-fullscreen', 'true')
      video.autoplay = false
      video.muted = true
      video.loop = true
      video.playsInline = true
      video.controls = false
      video.defaultMuted = true
      video.volume = 0
      video.disablePictureInPicture = true
      video.style.objectFit = 'cover'
      video.style.backgroundColor = '#000'
      video.style.opacity = '0'
      video.style.transition = 'opacity 0.5s ease'
      const videoId = `${type}-${videoUrl}`
      const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      video.addEventListener('canplay', () => {
        this.onVideoLoad(container, video, videoId, isMobile)
      })
      video.addEventListener('loadeddata', () => {
        this.onVideoLoad(container, video, videoId, isMobile)
      })
      video.addEventListener('canplaythrough', () => {
        if (isMobile) {
          this.onVideoLoad(container, video, videoId, isMobile)
        }
      })
      video.addEventListener('error', () => {
        console.warn('[VideoPlayer] Error en video:', {
          videoId,
          error: video.error?.code,
          src: video.src,
          container: container.id
        })
        if (this.loadedVideos.has(videoId)) {
          return
        }
        if (video.error) {
          if ((video.error.code === 3 || video.error.code === 4) && !this.loadedVideos.has(videoId + '-retry')) {
            this.retryVideoWithAlternatives(video, videoUrl, type, videoId)
            return
          }
        }
        this.retryVideoInitialization(container)
      })
      video.addEventListener('pause', e => {
        if (!video.ended && this.isVideoVisible(container)) {
          const timeout2 = video.currentTime === 0 ? 100 : 1e3
          setTimeout(() => {
            if (video.paused && !video.ended) {
              this.showPlayOverlay(container, video)
            }
          }, timeout2)
        }
      })
      container.appendChild(video)
      const timeout = isMobile ? 1e3 : 500
      setTimeout(() => {
        this.onVideoLoad(container, video, videoId, isMobile)
        if (video.style.opacity === '0') {
          video.style.opacity = '1'
          container.classList.add('video-loaded')
        }
      }, timeout)
      const loadTimeout = isMobile ? 5e3 : 3e3
      setTimeout(() => {
        if (video.readyState < 2 && !this.loadedVideos.has(videoId)) {
          console.warn('[VideoPlayer] Video no se carg\xF3 en tiempo esperado:', {
            videoId,
            type,
            readyState: video.readyState,
            networkState: video.networkState,
            error: video.error,
            src: video.src
          })
          if (type === 'mobile') {
            const desktopVideo = container.querySelector('video[data-video-type="desktop"]')
            if (desktopVideo && desktopVideo.readyState >= 2) {
              video.style.display = 'none'
              desktopVideo.style.display = 'block'
              return
            }
          }
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
        const containerId = container.id || 'unknown'
        if (this.retryAttempts.has(containerId)) {
          this.retryAttempts.delete(containerId)
        }
        const loadingState = container.querySelector('.video-loading')
        if (loadingState) {
          loadingState.remove()
        }
        const pageLoadTime = performance.now()
        const isFreshLoad = pageLoadTime < 5e3
        if (!isMobile) {
          if (isFreshLoad) {
            this.attemptAggressivePlayback(video, isMobile)
          } else {
            this.playVideoSafely(video)
          }
        } else if (this.isVideoVisible(container)) {
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
        video.muted = true
        video.defaultMuted = true
        video.volume = 0
        if (video.readyState < 2) {
          video.load()
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
          setTimeout(() => {
            video.removeEventListener('canplay', readyHandler)
            video.removeEventListener('loadeddata', readyHandler)
            if (attempt <= maxAttempts) {
              tryPlay()
            }
          }, baseDelay * 2)
          return
        }
        video
          .play()
          .then(() => {})
          .catch(error => {
            console.warn(`[VideoPlayer] Fallo en intento agresivo ${attempt}:`, error.name)
            if (attempt < maxAttempts) {
              const delay = baseDelay * attempt
              setTimeout(tryPlay, delay)
            } else {
              console.warn('[VideoPlayer] Reproducci\xF3n agresiva fall\xF3, mostrando overlay')
              this.showPlayOverlay(video.parentElement, video)
            }
          })
      }
      tryPlay()
    },
    // Verificar si el video está visible en viewport
    isVideoVisible(container) {
      const rect = container.getBoundingClientRect()
      const windowHeight = window.innerHeight || document.documentElement.clientHeight
      const windowWidth = window.innerWidth || document.documentElement.clientWidth
      return (
        rect.top >= 0 && rect.left >= 0 && rect.bottom <= windowHeight && rect.right <= windowWidth && rect.width > 0 && rect.height > 0
      )
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
      this.loadedVideos.add(videoId + '-retry')
      const alternatives = [
        videoUrl + '?v=' + Date.now(),
        // Cache bust
        videoUrl + '?format=mp4',
        // Forzar formato
        videoUrl.replace(/\/$/, '') + '?codec=h264',
        // Forzar codec H.264
        videoUrl.replace(/\/$/, '')
        // Sin parámetros
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
      console.warn(`[VideoPlayer] Error cargando video (${type}):`, {
        container: container.id,
        desktopUrl: container.getAttribute('data-video-desktop-url'),
        mobileUrl: container.getAttribute('data-video-mobile-url'),
        fallbackImage: container.getAttribute('data-image-fallback')
      })
      const fallbackImage = container.getAttribute('data-image-fallback')
      if (fallbackImage && fallbackImage.trim()) {
        this.showFallbackImage(container, fallbackImage)
      } else {
        console.error('[VideoPlayer] No hay imagen de fallback configurada')
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
      setTimeout(() => {
        if (loadingDiv.parentElement) {
          loadingDiv.remove()
        }
      }, 5e3)
      return loadingDiv
    }
  }
  var programDataSystem = {
    init() {
      document.addEventListener('data_load-program', () => {
        this.updateProgramName()
        liferayVideoSystem.init()
      })
    },
    updateProgramName() {
      const context = document.getElementById('doble-datos')
      if (context) {
        const dataPujName = context.querySelector('[data-puj-name]')
        if (dataPujName) {
          let currentContent = dataPujName.textContent.trim()
          if (!currentContent.endsWith(':')) {
            dataPujName.textContent = `${currentContent}: `
          }
        }
      }
    }
  }
  var initProgramDataVideo = () => {
    programDataSystem.init()
    liferayVideoSystem.init()
    const setupUserInteractionTrigger = () => {
      let interactionTriggered = false
      const handleUserInteraction = () => {
        if (interactionTriggered) return
        interactionTriggered = true
        const containers = document.querySelectorAll('[data-component="video-player"].video-loaded')
        containers.forEach(container => {
          const videos = container.querySelectorAll('video')
          videos.forEach(video => {
            if (video.paused && liferayVideoSystem.isVideoVisible(container)) {
              liferayVideoSystem.playVideoSafely(video)
            }
          })
        })
        document.removeEventListener('click', handleUserInteraction, true)
        document.removeEventListener('touchstart', handleUserInteraction, true)
        document.removeEventListener('scroll', handleUserInteraction, true)
        document.removeEventListener('keydown', handleUserInteraction, true)
      }
      document.addEventListener('click', handleUserInteraction, { passive: true, capture: true })
      document.addEventListener('touchstart', handleUserInteraction, {
        passive: true,
        capture: true
      })
      document.addEventListener('scroll', handleUserInteraction, { passive: true, capture: true })
      document.addEventListener('keydown', handleUserInteraction, { passive: true, capture: true })
      setTimeout(() => {
        document.removeEventListener('click', handleUserInteraction, true)
        document.removeEventListener('touchstart', handleUserInteraction, true)
        document.removeEventListener('scroll', handleUserInteraction, true)
        document.removeEventListener('keydown', handleUserInteraction, true)
      }, 3e4)
    }
    setTimeout(setupUserInteractionTrigger, 1e3)
  }
  var initSystem = () => {
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
  var script_default = initSystem
  if (typeof window !== 'undefined') {
    initSystem()
  }
})()
