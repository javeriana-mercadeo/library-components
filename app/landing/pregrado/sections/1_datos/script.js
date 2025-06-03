// ===========================================
// SISTEMA DE VIDEO RESPONSIVO MEJORADO
// ===========================================

const ResponsiveVideoSystem = {
  config: {
    defaultBreakpoint: 768,
    // Parámetros optimizados para YouTube
    videoParams: {
      autoplay: '1',
      mute: '1',
      loop: '1',
      controls: '0',
      showinfo: '0',
      rel: '0',
      modestbranding: '1',
      playsinline: '1',
      iv_load_policy: '3',
      disablekb: '1',
      fs: '0',
      cc_load_policy: '0',
      start: '0',
      end: '',
      enablejsapi: '0',
      hl: 'es',
      cc_lang_pref: 'es'
    }
  },

  init() {
    Logger.debug('🎬 Inicializando sistema de video responsivo...')

    // Buscar contenedores de video responsivo
    const videoContainers = document.querySelectorAll('.program-data__media[data-video-mobile][data-video-desktop]')

    if (videoContainers.length === 0) {
      Logger.debug('No se encontraron videos responsivos para cargar')
      return false
    }

    // Inicializar cada contenedor
    videoContainers.forEach(container => {
      this.initializeResponsiveVideo(container)
    })

    // Setup responsive listener
    this.setupResponsiveListener()

    Logger.success(`Videos responsivos cargados: ${videoContainers.length}`)
    return true
  },

  initializeResponsiveVideo(container) {
    const mobileVideoId = container.dataset.videoMobile
    const desktopVideoId = container.dataset.videoDesktop
    const breakpoint = parseInt(container.dataset.breakpoint) || this.config.defaultBreakpoint

    if (!mobileVideoId || !desktopVideoId) {
      Logger.warning('Videos mobile/desktop no configurados', { mobileVideoId, desktopVideoId })
      return
    }

    // Limpiar contenedor
    container.innerHTML = ''

    // Crear ambos iframes
    const mobileIframe = this.createVideoIframe(mobileVideoId, 'mobile')
    const desktopIframe = this.createVideoIframe(desktopVideoId, 'desktop')

    // Agregar al DOM
    container.appendChild(mobileIframe)
    container.appendChild(desktopIframe)

    // Configurar visibilidad inicial
    this.updateVideoVisibility(container, breakpoint)

    // Marcar como listo
    container.classList.add('responsive-video-ready')
    container.setAttribute('data-breakpoint', breakpoint)

    Logger.debug(`Videos configurados - Mobile: ${mobileVideoId}, Desktop: ${desktopVideoId}`)
  },

  createVideoIframe(videoId, type) {
    const iframe = document.createElement('iframe')

    // Parámetros con playlist para loop
    const params = { ...this.config.videoParams, playlist: videoId }
    const videoParams = new URLSearchParams(params)
    const videoSrc = `https://www.youtube.com/embed/${videoId}?${videoParams.toString()}`

    // Configurar iframe
    iframe.src = videoSrc
    iframe.title = `Video ${type} - ${videoId}`
    iframe.allow = 'autoplay; encrypted-media'
    iframe.allowFullscreen = true
    iframe.loading = 'lazy'
    iframe.frameBorder = '0'
    iframe.className = `program-data__iframe program-data__iframe--${type}`
    iframe.setAttribute('data-video-id', videoId)
    iframe.setAttribute('data-video-type', type)

    // Event listeners
    EventManager.add(iframe, 'load', () => {
      Logger.success(`Video ${type} (${videoId}) cargado correctamente`)
      iframe.style.opacity = '1'
    })

    EventManager.add(iframe, 'error', () => {
      Logger.error(`Error al cargar video ${type} (${videoId})`)
    })

    return iframe
  },

  updateVideoVisibility(container, breakpoint) {
    const isMobile = window.innerWidth < breakpoint
    const mobileIframe = container.querySelector('.program-data__iframe--mobile')
    const desktopIframe = container.querySelector('.program-data__iframe--desktop')

    if (!mobileIframe || !desktopIframe) return

    if (isMobile) {
      mobileIframe.style.display = 'block'
      desktopIframe.style.display = 'none'
      container.setAttribute('data-current-video', 'mobile')
      Logger.debug('Video mobile activado')
    } else {
      mobileIframe.style.display = 'none'
      desktopIframe.style.display = 'block'
      container.setAttribute('data-current-video', 'desktop')
      Logger.debug('Video desktop activado')
    }
  },

  setupResponsiveListener() {
    let resizeTimeout

    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = TimingUtils.delay(() => {
        const containers = document.querySelectorAll('.program-data__media.responsive-video-ready')

        containers.forEach(container => {
          const breakpoint = parseInt(container.getAttribute('data-breakpoint')) || this.config.defaultBreakpoint
          this.updateVideoVisibility(container, breakpoint)
        })
      }, 150)
    }

    EventManager.add(window, 'resize', handleResize)
  },

  // Función para pausar videos (optimización de batería)
  pauseAllVideos() {
    const iframes = document.querySelectorAll('.program-data__iframe')
    iframes.forEach(iframe => {
      const currentSrc = iframe.src
      if (currentSrc && currentSrc.includes('autoplay=1')) {
        // Cambiar autoplay a 0 temporalmente
        iframe.src = currentSrc.replace('autoplay=1', 'autoplay=0')
      }
    })
    Logger.debug('Videos pausados para ahorro de batería')
  },

  // Función para reanudar videos
  resumeAllVideos() {
    const iframes = document.querySelectorAll('.program-data__iframe')
    iframes.forEach(iframe => {
      const currentSrc = iframe.src
      if (currentSrc && currentSrc.includes('autoplay=0')) {
        // Restaurar autoplay a 1
        iframe.src = currentSrc.replace('autoplay=0', 'autoplay=1')
      }
    })
    Logger.debug('Videos reanudados')
  },

  // Utilidad para cambiar videos dinámicamente (para editores)
  updateVideo(container, type, newVideoId) {
    if (type === 'mobile') {
      container.setAttribute('data-video-mobile', newVideoId)
    } else if (type === 'desktop') {
      container.setAttribute('data-video-desktop', newVideoId)
    }

    // Reinicializar el contenedor
    this.initializeResponsiveVideo(container)
    Logger.success(`Video ${type} actualizado a: ${newVideoId}`)
  }
}

// ===========================================
// COMPATIBILIDAD CON EL SISTEMA EXISTENTE
// ===========================================

const SimpleVideoSystem = {
  init() {
    Logger.debug('Iniciando sistema de video compatibilidad...')

    // Buscar videos simples (sistema anterior)
    const simpleVideoContainers = document.querySelectorAll('.program-video[data-video-id]')

    if (simpleVideoContainers.length > 0) {
      simpleVideoContainers.forEach(container => {
        this.initializeVideo(container)
      })
      Logger.success(`Videos simples cargados: ${simpleVideoContainers.length}`)
    }

    // Inicializar videos responsivos (sistema nuevo)
    ResponsiveVideoSystem.init()

    return true
  },

  initializeVideo(container) {
    const videoId = container.dataset.videoId
    if (!videoId) {
      Logger.warning('Video sin ID encontrado')
      return
    }

    const iframe = container.querySelector('.video-iframe')
    if (!iframe) {
      Logger.error(`Video ${videoId}: iframe no encontrado`)
      return
    }

    // Usar la misma configuración que el sistema responsivo
    const params = { ...ResponsiveVideoSystem.config.videoParams, playlist: videoId }
    const videoParams = new URLSearchParams(params)
    const videoSrc = `https://www.youtube.com/embed/${videoId}?${videoParams.toString()}`

    iframe.src = videoSrc

    EventManager.add(iframe, 'load', () => {
      Logger.success(`Video simple ${videoId} cargado correctamente`)
    })

    EventManager.add(iframe, 'error', () => {
      Logger.error(`Error al cargar video simple ${videoId}`)
    })

    Logger.debug(`Video simple ${videoId} configurado`)
  }
}

// ===========================================
// AUTO-INICIALIZACIÓN
// ===========================================
export default () => {
  DOMHelpers.isReady(() => {
    // Inicializar ambos sistemas (compatibilidad completa)
    SimpleVideoSystem.init()

    // Gestión de visibilidad para ahorro de batería
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        ResponsiveVideoSystem.pauseAllVideos()
      } else {
        TimingUtils.delay(() => {
          ResponsiveVideoSystem.resumeAllVideos()
        }, 500)
      }
    })

    // Cleanup al cambiar página
    window.addEventListener('beforeunload', () => {
      Logger.debug('🧹 Limpiando sistema de videos...')
    })

    Logger.success('✅ Sistema de videos completo iniciado')
  })

  // Exponer para debugging y editores
  if (typeof window !== 'undefined') {
    window.ResponsiveVideoSystem = ResponsiveVideoSystem
    window.SimpleVideoSystem = SimpleVideoSystem
  }
}
