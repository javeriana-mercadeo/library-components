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

  // Intersection Observer para autoplay compliance
  intersectionObserver: null,

  // Inicializar sistema de video
  init() {
    // Usar un delay para esperar que React renderice
    const initializeWithDelay = (delay, maxAttempts = 10) => {
      let attempts = 0

      const tryInit = () => {
        attempts++
        const containers = document.querySelectorAll('[data-component="video-player"]')

        if (containers.length > 0) {
          this.setupVideoContainers()
        } else if (attempts < maxAttempts) {
          setTimeout(tryInit, delay)
        }
      }

      tryInit()
    }

    initializeWithDelay(250)
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

        videos.forEach(video => {
          if (entry.isIntersecting) {
            // Video visible - intentar reproducir
            this.playVideoSafely(video)
          } else {
            // Video no visible - pausar para ahorrar recursos
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
    if (!video || video.readyState < 2) {
      return
    }

    // Asegurar que está muted para autoplay
    video.muted = true
    video.defaultMuted = true
    video.volume = 0

    video.play().catch(() => {
      // Autoplay bloqueado - esto es normal en algunos casos
      // El video se reproducirá cuando el usuario interactúe
    })
  },

  // Inicializar contenedor específico
  initializeVideoContainer(container) {
    // Verificar si ya está inicializado
    if (container.classList.contains('video-initialized')) {
      return
    }

    // Limpiar cualquier contenido previo
    container.innerHTML = ''

    // Obtener URLs directas desde data attributes o configuración de Liferay
    const mobileVideoUrl = this.getVideoUrl(container, 'mobile')
    const desktopVideoUrl = this.getVideoUrl(container, 'desktop')

    // Crear videos solo si las URLs son válidas
    if (mobileVideoUrl) {
      this.createVideoElement(container, mobileVideoUrl, 'mobile')
    }

    if (desktopVideoUrl) {
      this.createVideoElement(container, desktopVideoUrl, 'desktop')
    }

    // Marcar como inicializado
    container.classList.add('video-initialized')
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
    video.setAttribute('muted', '')
    video.setAttribute('loop', '')
    video.setAttribute('playsinline', '')
    video.setAttribute('preload', 'metadata')
    video.setAttribute('disablepictureinpicture', '')
    // NO establecer autoplay ni controls por políticas del navegador

    // Configuraciones adicionales para compatibilidad
    video.setAttribute('webkit-playsinline', '')

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

    // Eventos de carga optimizados
    video.addEventListener('canplay', () => {
      this.onVideoLoad(container, video, videoId)
    })

    video.addEventListener('loadeddata', () => {
      this.onVideoLoad(container, video, videoId)
    })

    video.addEventListener('error', () => {
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

      this.showError(container, type)
    })

    // Añadir video al contenedor
    container.appendChild(video)

    // Timeout de seguridad más rápido
    setTimeout(() => {
      this.onVideoLoad(container, video, videoId)

      // Si aún tiene opacity 0, forzar a 1
      if (video.style.opacity === '0') {
        video.style.opacity = '1'
        container.classList.add('video-loaded')
      }
    }, 500)
  },

  // Video cargado exitosamente
  onVideoLoad(container, video, videoId) {
    if (!container.classList.contains('video-loaded')) {
      container.classList.add('video-loaded')
      video.style.opacity = '1'
      this.loadedVideos.add(videoId)

      // El Intersection Observer manejará la reproducción
      // Solo intentar reproducir si está visible
      if (this.isVideoVisible(container)) {
        this.playVideoSafely(video)
      }
    }
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

  // Mostrar error
  showError(container, type) {
    const errorDiv = document.createElement('div')
    errorDiv.className = 'video-error'
    errorDiv.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      background: #f5f5f5;
      color: #666;
      border-radius: 8px;
      font-family: Arial, sans-serif;
    `

    errorDiv.innerHTML = `
      <div style="text-align: center; padding: 20px;">
        <p style="margin: 0 0 8px 0; font-size: 14px;">⚠️ Error cargando video</p>
        <small style="color: #999; font-size: 12px;">Video no disponible desde Liferay</small>
      </div>
    `

    // Limpiar contenedor y mostrar error
    container.innerHTML = ''
    container.appendChild(errorDiv)
    container.classList.add('video-loaded') // Ocultar loader
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
  }
}

// Inicialización principal
const initProgramDataVideo = () => {
  programDataSystem.init()
  liferayVideoSystem.init()
}

// Ejecutar inicialización
const initSystem = () => {
  // Prevenir inicializaciones múltiples
  if (window.programDataVideoInitialized) {
    return
  }
  window.programDataVideoInitialized = true

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
