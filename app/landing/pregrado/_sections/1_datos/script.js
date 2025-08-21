// ===========================================
// DATOS PROGRAMA VIDEO - SISTEMA COMPLETO
// ===========================================

// Sistema de video responsivo similar a Liferay
const videoSystem = {
  // Configuración del sistema
  config: {
    breakpoint: 768,
    // Videos por defecto para desarrollo y fallback
    defaultVideos: {
      mobile: 'HxlTZ8DQAaY',  // Video por defecto móvil
      desktop: '-dHyNNd5BM4'  // Video por defecto desktop
    },
    videoParams: {
      autoplay: '1',
      mute: '1',
      loop: '1',
      controls: '0',
      modestbranding: '1',
      playsinline: '1',
      enablejsapi: '1',
      rel: '0'
    }
  },

  // Inicializar sistema de video
  init() {
    this.setupVideoContainers()
    this.setupResponsiveDetection()
    this.setupPerformanceOptimizations()
    this.loadVideosFromConfiguration()
  },

  // Configurar contenedores de video
  setupVideoContainers() {
    const videoContainers = document.querySelectorAll('[data-component="video-player"]')
    
    videoContainers.forEach(container => {
      this.initializeVideoContainer(container)
    })
  },

  // Inicializar un contenedor específico
  initializeVideoContainer(container) {
    // Evitar inicialización múltiple
    if (container.classList.contains('video-initialized')) {
      return
    }
    container.classList.add('video-initialized')

    // Obtener IDs de video desde data attributes o configuración
    let mobileVideoId = container.getAttribute('data-video-mobile')
    let desktopVideoId = container.getAttribute('data-video-desktop')

    // Si hay configuración de Liferay disponible, usarla
    if (typeof configuration !== 'undefined') {
      mobileVideoId = configuration.codeVideoMobile || mobileVideoId
      desktopVideoId = configuration.codeVideoDesktop || desktopVideoId
    }

    // Usar videos por defecto si no hay configuración
    mobileVideoId = mobileVideoId || this.config.defaultVideos.mobile
    desktopVideoId = desktopVideoId || this.config.defaultVideos.desktop
    
    if (!mobileVideoId && !desktopVideoId) {
      this.showError(container)
      return
    }

    // Actualizar data attributes con la configuración final
    container.setAttribute('data-video-mobile', mobileVideoId || '')
    container.setAttribute('data-video-desktop', desktopVideoId || '')

    // Limpiar cualquier contenido previo excepto loader y error
    const existingIframes = container.querySelectorAll('iframe')
    existingIframes.forEach(iframe => iframe.remove())

    // Crear iframes para ambos dispositivos
    if (mobileVideoId) {
      this.createVideoIframe(container, mobileVideoId, 'mobile')
    }
    if (desktopVideoId) {
      this.createVideoIframe(container, desktopVideoId, 'desktop')
    }

    // Configurar detección responsiva
    this.setupResponsiveVideo(container)
  },

  // Crear iframe de YouTube
  createVideoIframe(container, videoId, type) {
    const iframe = document.createElement('iframe')
    const params = new URLSearchParams(this.config.videoParams)
    params.set('playlist', videoId) // Necesario para que funcione el loop

    iframe.className = `program-data__iframe program-data__iframe--${type}`
    iframe.src = `https://www.youtube.com/embed/${videoId}?${params.toString()}`
    iframe.title = `Video ${type}`
    iframe.allow = 'autoplay; encrypted-media; fullscreen'
    iframe.allowFullscreen = true
    iframe.loading = 'lazy'
    iframe.style.opacity = '0'
    iframe.style.transition = 'opacity 0.5s ease'

    // Eventos de carga
    iframe.addEventListener('load', () => {
      this.onVideoLoad(container, iframe)
    })

    iframe.addEventListener('error', () => {
      this.showError(container)
    })

    container.appendChild(iframe)
  },

  // Manejar carga exitosa del video
  onVideoLoad(container, iframe) {
    // Mostrar iframe con fade in
    iframe.style.opacity = '1'
    iframe.classList.add('loaded')

    // Agregar clases de estado - esto oculta el loader CSS ::before
    container.classList.add('video-loaded')

    // Actualizar estado actual
    this.updateCurrentVideo(container)
  },

  // Configurar detección responsiva
  setupResponsiveVideo(container) {
    this.updateCurrentVideo(container)
    
    // Escuchar cambios de tamaño
    const resizeObserver = new ResizeObserver(() => {
      this.updateCurrentVideo(container)
    })
    
    resizeObserver.observe(document.body)
  },

  // Actualizar video actual según breakpoint
  updateCurrentVideo(container) {
    const isMobile = window.innerWidth < this.config.breakpoint
    const currentVideo = isMobile ? 'mobile' : 'desktop'
    
    container.setAttribute('data-current-video', currentVideo)
  },

  // Mostrar error
  showError(container) {
    const errorMsg = container.querySelector('.error-message')
    
    // Ocultar el loader CSS agregando la clase
    container.classList.add('video-loaded')
    
    if (errorMsg) {
      errorMsg.removeAttribute('hidden')
    }
  },

  // Configurar detección responsiva global
  setupResponsiveDetection() {
    let resizeTimer
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        const containers = document.querySelectorAll('[data-component="video-player"]')
        containers.forEach(container => {
          this.updateCurrentVideo(container)
        })
      }, 100)
    })
  },

  // Optimizaciones de performance
  setupPerformanceOptimizations() {
    // Detectar conexión lenta
    if (navigator.connection && navigator.connection.effectiveType) {
      const connection = navigator.connection.effectiveType
      if (connection === 'slow-2g' || connection === '2g' || connection === '3g') {
        document.documentElement.setAttribute('data-connection', 'slow')
      }
    }
    
    // Detectar dispositivos con poca memoria
    if (navigator.deviceMemory && navigator.deviceMemory < 4) {
      document.documentElement.setAttribute('data-performance', 'low')
    }
  },

  // Cargar videos desde configuración (para Liferay)
  loadVideosFromConfiguration() {
    // Este método se ejecutará cuando esté disponible la configuración de Liferay
    if (typeof configuration !== 'undefined') {
      const containers = document.querySelectorAll('[data-component="video-player"]')
      containers.forEach(container => {
        // Reinicializar con nueva configuración si es necesario
        if (configuration.codeVideoMobile || configuration.codeVideoDesktop) {
          // Limpiar contenido existente excepto elementos de UI
          const iframes = container.querySelectorAll('iframe')
          iframes.forEach(iframe => iframe.remove())
          
          // Reinicializar
          this.initializeVideoContainer(container)
        }
      })
    }
  }
}

// Sistema de datos del programa
const programDataSystem = {
  init() {
    // Escuchar eventos de carga de datos
    document.addEventListener('data_load-program', () => {
      this.updateProgramName()
    })
    
    // También inicializar videos cuando se cargan los datos
    document.addEventListener('data_load-program', () => {
      videoSystem.loadVideosFromConfiguration()
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
  // Inicializar sistemas
  programDataSystem.init()
  videoSystem.init()
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

// También ejecutar inmediatamente en caso de compilación IIFE
if (typeof window !== 'undefined') {
  initSystem()
}