// ===========================================
// DATOS PROGRAMA VIDEO - LIFERAY NATIVO DEFINITIVO
// ===========================================

// Sistema de video HTML5 nativo usando URLs directas de Liferay
const liferayVideoSystem = {
  // Configuración del sistema
  config: {
    breakpoint: 768
  },

  // Inicializar sistema de video
  init() {
    console.log('🎬 Inicializando sistema de video Liferay nativo...')
    this.setupVideoContainers()
    this.setupResponsiveDetection()
    console.log('✅ Sistema de video Liferay nativo inicializado')
  },

  // Configurar contenedores de video
  setupVideoContainers() {
    const containers = document.querySelectorAll('[data-component="video-player"]')
    console.log(`📦 Encontrados ${containers.length} contenedores de video`)

    containers.forEach((container, index) => {
      console.log(`📹 Inicializando contenedor ${index + 1}`)
      this.initializeVideoContainer(container)
    })
  },

  // Inicializar contenedor específico
  initializeVideoContainer(container) {
    // Verificar si ya está inicializado
    if (container.classList.contains('video-initialized')) {
      console.log('⏭️ Contenedor ya inicializado, saltando...')
      return
    }

    // Limpiar cualquier contenido previo
    container.innerHTML = ''

    // Obtener URLs directas desde data attributes o configuración de Liferay
    const mobileVideoUrl = this.getVideoUrl(container, 'mobile')
    const desktopVideoUrl = this.getVideoUrl(container, 'desktop')

    console.log('📱 Mobile Video URL:', mobileVideoUrl)
    console.log('🖥️ Desktop Video URL:', desktopVideoUrl)

    // Crear videos solo si las URLs son válidas
    if (mobileVideoUrl) {
      this.createVideoElement(container, mobileVideoUrl, 'mobile')
    }

    if (desktopVideoUrl) {
      this.createVideoElement(container, desktopVideoUrl, 'desktop')
    }

    // Configurar detección responsiva
    this.setupResponsiveVideo(container)

    // Marcar como inicializado
    container.classList.add('video-initialized')
  },

  // Obtener URL del video (simplificado para URLs directas)
  getVideoUrl(container, type) {
    // Primero intentar desde configuración de Liferay
    if (typeof configuration !== 'undefined') {
      const configUrl = type === 'mobile' ? configuration.urlVideoMobile : configuration.urlVideoDesktop
      if (configUrl && configUrl.trim() !== '') {
        console.log(`📋 URL desde configuración ${type}:`, configUrl)
        return configUrl
      }
    }

    // Obtener URL directa desde data attributes
    const dataAttr = type === 'mobile' ? 'data-video-mobile-url' : 'data-video-desktop-url'
    const url = container.getAttribute(dataAttr)

    if (url && url.trim() !== '') {
      console.log(`🏷️ URL desde data attribute ${type}:`, url)
      return url
    }

    console.log(`⚠️ No se encontró URL para video ${type}`)
    return null
  },

  // Crear elemento de video HTML5
  createVideoElement(container, videoUrl, type) {
    console.log(`🎞️ Creando video HTML5 ${type} para URL: ${videoUrl}`)

    const video = document.createElement('video')

    // Configuración del video HTML5 nativo
    video.src = videoUrl
    video.className = `program-data__video program-data__video--${type}`
    video.autoplay = true
    video.muted = true
    video.loop = true
    video.playsInline = true
    video.preload = 'metadata'
    video.controls = false
    video.style.width = '100%'
    video.style.height = '100%'
    video.style.objectFit = 'cover'
    video.style.backgroundColor = '#000'
    video.style.transition = 'opacity 0.5s ease'

    // Configuraciones adicionales para compatibilidad
    video.setAttribute('webkit-playsinline', 'true')
    video.setAttribute('playsinline', 'true')

    // Establecer dimensiones del contenedor
    this.setVideoSize(video, container)

    // Eventos de carga con múltiples puntos de activación para ocultar loader
    video.addEventListener('loadedmetadata', () => {
      console.log(`✅ Video ${type}: Metadata cargada`)
      this.hideLoader(container, video)
    })

    video.addEventListener('loadeddata', () => {
      console.log(`📦 Video ${type}: Datos iniciales cargados`)
      this.hideLoader(container, video)
    })

    video.addEventListener('canplay', () => {
      console.log(`▶️ Video ${type}: Puede empezar a reproducir`)
      this.hideLoader(container, video)
    })

    video.addEventListener('canplaythrough', () => {
      console.log(`✅ Video ${type}: Completamente listo`)
      this.onVideoLoad(container, video)
    })

    video.addEventListener('error', (event) => {
      console.warn(`⚠️ Error cargando video ${type}:`, video.src)

      if (video.error) {
        console.warn(`🔍 Error: ${this.getVideoErrorMessage(video.error.code)}`)

        // Intentar alternativas para Liferay
        if (video.error.code === 4) {
          this.retryVideoWithAlternatives(video, videoUrl, type)
          return
        }
      }

      this.showError(container, type)
    })

    // Añadir video al contenedor
    container.appendChild(video)

    // Timeout de seguridad: ocultar loader después de 3 segundos
    setTimeout(() => {
      this.hideLoader(container, video)
    }, 3000)
  },

  // Método unificado para ocultar el loader
  hideLoader(container, video) {
    if (!container.classList.contains('video-loaded')) {
      container.classList.add('video-loaded')
      video.style.opacity = '1'
      console.log('🎯 Loader CSS ocultado')

      // Intentar reproducir si está pausado
      if (video.paused) {
        video.play().catch(error => {
          console.warn('⚠️ Autoplay bloqueado:', error.message)
        })
      }
    }
  },

  // Establecer tamaño del video con aspect ratio correcto
  setVideoSize(video, container) {
    const currentWidth = window.innerWidth
    const isMobile = currentWidth < this.config.breakpoint

    // Resetear estilos inline para permitir CSS natural
    container.style.width = ''
    container.style.height = ''
    container.style.maxWidth = ''
    container.style.maxHeight = ''

    console.log(`📐 Ajustando video size: ${currentWidth}px (Mobile: ${isMobile})`)

    if (!isMobile) {
      // En desktop, calcular dimensiones respetando aspect ratio
      const videoCard = container.closest('.program-data_video-card')
      if (videoCard) {
        // Esperar un frame para asegurar que el layout se haya actualizado
        requestAnimationFrame(() => {
          const cardRect = videoCard.getBoundingClientRect()
          const aspectRatio = 612 / 880 // Relación específica para desktop

          console.log(`📏 Video card dimensions: ${cardRect.width}x${cardRect.height}`)

          // Solo ajustar si tenemos dimensiones válidas
          if (cardRect.height > 0 && cardRect.width > 0) {
            const calculatedWidth = cardRect.height * aspectRatio

            // Asegurar que no exceda el ancho disponible
            const maxWidth = Math.min(calculatedWidth, cardRect.width)

            // Aplicar dimensiones con límites seguros
            container.style.width = `${maxWidth}px`
            container.style.height = `${cardRect.height}px`
            container.style.maxWidth = '100%'

            console.log(`✅ Dimensiones aplicadas: ${maxWidth}x${cardRect.height}px`)
          }
        })
      }
    } else {
      // En mobile, permitir que CSS maneje completamente
      console.log('📱 Modo mobile: usando CSS responsive')
    }

    // Asegurar que el video mantenga object-fit y llene el contenedor
    video.style.objectFit = 'cover'
    video.style.width = '100%'
    video.style.height = '100%'
    video.style.objectPosition = 'center'
  },

  // Video cargado exitosamente
  onVideoLoad(container, video) {
    console.log('✅ Video HTML5 completamente cargado')
    this.hideLoader(container, video)
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
  retryVideoWithAlternatives(video, videoUrl, type) {
    console.log(`🔧 Reintentando video ${type} con alternativas...`)

    const alternatives = [
      videoUrl + '?v=' + Date.now(),  // Cache bust
      videoUrl + '?format=mp4',      // Forzar formato
      videoUrl                        // URL original
    ]

    let currentIndex = 0

    const tryNext = () => {
      if (currentIndex >= alternatives.length) {
        console.warn(`⚠️ Todas las alternativas fallaron para ${type}`)
        this.showError(video.parentElement, type)
        return
      }

      const newUrl = alternatives[currentIndex]
      console.log(`🔄 Intentando: ${newUrl}`)

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
    console.warn('⚠️ Mostrando mensaje de error')

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
  },

  // Configurar video responsivo sin bucles
  setupResponsiveVideo(container) {
    let resizeTimeout
    let isResizing = false
    let lastWidth = window.innerWidth

    const handleResize = (source = 'window') => {
      // Prevenir bucles: solo procesar si el ancho realmente cambió significativamente
      const currentWidth = window.innerWidth
      if (isResizing || Math.abs(currentWidth - lastWidth) < 10) {
        return
      }

      isResizing = true
      lastWidth = currentWidth

      // Debounce para evitar múltiples ejecuciones
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        const isMobile = currentWidth < this.config.breakpoint
        const videos = container.querySelectorAll('video')

        console.log(`🔄 Resize [${source}]: ${currentWidth}px (Mobile: ${isMobile})`)

        // Resetear completamente el contenedor antes de aplicar nuevos estilos
        container.style.width = ''
        container.style.height = ''
        container.style.maxWidth = ''
        container.style.maxHeight = ''

        videos.forEach(video => {
          const isMobileVideo = video.classList.contains('program-data__video--mobile')
          const isDesktopVideo = video.classList.contains('program-data__video--desktop')

          // Mostrar/ocultar videos según breakpoint
          if (isMobile && isMobileVideo) {
            video.style.display = 'block'
            container.setAttribute('data-current-video', 'mobile')
            this.setVideoSize(video, container)
          } else if (!isMobile && isDesktopVideo) {
            video.style.display = 'block'
            container.setAttribute('data-current-video', 'desktop')
            this.setVideoSize(video, container)
          } else {
            video.style.display = 'none'
          }
        })

        // Si no hay video mobile, usar desktop en mobile
        if (isMobile && !container.querySelector('.program-data__video--mobile')) {
          const desktopVideo = container.querySelector('.program-data__video--desktop')
          if (desktopVideo) {
            desktopVideo.style.display = 'block'
            container.setAttribute('data-current-video', 'desktop-fallback')
            this.setVideoSize(desktopVideo, container)
          }
        }

        // Liberar flag después de un tiempo
        setTimeout(() => {
          isResizing = false
        }, 500)
      }, 300) // Debounce más largo para evitar bucles
    }

    // Ejecutar inicialmente
    handleResize('init')

    // Solo escuchar resize de window (NO ResizeObserver para evitar bucles)
    window.addEventListener('resize', () => handleResize('window'))

    // También escuchar orientationchange para móviles
    window.addEventListener('orientationchange', () => {
      setTimeout(() => handleResize('orientation'), 250)
    })
  },

  // Configurar detección responsiva simplificada (sin ResizeObserver)
  setupResponsiveDetection() {
    // ResizeObserver deshabilitado para evitar bucles infinitos
    // Solo usamos window.resize que es suficiente para responsive
    console.log('📱 Detección responsiva: Solo window.resize (ResizeObserver deshabilitado)')
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
  console.log('🚀 Inicializando sistema de datos y video nativo definitivo...')
  programDataSystem.init()
  liferayVideoSystem.init()
}

// Ejecutar inicialización
const initSystem = () => {
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
