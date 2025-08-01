// ===========================================
// DATOS PROGRAMA VIDEO - SCRIPT PRINCIPAL
// ===========================================

// Sistema de Video Responsivo

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
    try {
      const dataVideoDesktop = configuration['codeVideoDesktop'] // Tomada de liferay
      const dataVideoMobile = configuration['codeVideoMobile'] // Tomada de liferay

      // Buscar contenedores de video responsivo
      const videoContainers = document.querySelectorAll('.program-data_media[data-video-mobile][data-video-desktop]')

      if (!dataVideoDesktop && !dataVideoMobile) {
        return false
      }

      if (videoContainers.length === 0) {
        return false
      }

      // Inicializar cada contenedor
      videoContainers.forEach(container => {
        this.initializeResponsiveVideo(container, dataVideoMobile, dataVideoDesktop)
      })

      // Setup responsive listener
      this.setupResponsiveListener()
      return true
    } catch (error) {
      return false
    }
  },

  initializeResponsiveVideo(container, dataVideoMobile, dataVideoDesktop) {
    const mobileVideoId = dataVideoMobile || container.dataset.videoMobile
    const desktopVideoId = dataVideoDesktop || container.dataset.videoDesktop
    const breakpoint = parseInt(container.dataset.breakpoint) || this.config.defaultBreakpoint

    if (!mobileVideoId || !desktopVideoId) {
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
      iframe.style.opacity = '1'
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
    } else {
      mobileIframe.style.display = 'none'
      desktopIframe.style.display = 'block'
      container.setAttribute('data-current-video', 'desktop')
    }
  },

  setupResponsiveListener() {
    let resizeTimeout
    let cachedContainers = []
    let lastUpdate = 0

    const handleResize = () => {
      const now = Date.now()

      // Throttle: mínimo 150ms entre actualizaciones
      if (now - lastUpdate < 150) {
        clearTimeout(resizeTimeout)
        resizeTimeout = setTimeout(handleResize, 150)
        return
      }

      // Actualizar cache de contenedores si está vacío
      if (cachedContainers.length === 0) {
        cachedContainers = Array.from(document.querySelectorAll('.program-data_media.responsive-video-ready'))
      }

      for (const container of cachedContainers) {
        const breakpoint = parseInt(container.getAttribute('data-breakpoint')) || this.config.defaultBreakpoint
        this.updateVideoVisibility(container, breakpoint)
      }

      lastUpdate = now
    }

    EventManager.add(window, 'resize', handleResize)

    // Limpiar cache periódicamente
    setInterval(() => {
      cachedContainers = []
    }, 30000) // 30 segundos
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
  }
}

// Sistema de Modales

const ModalSystem = {
  init() {
    // Buscar todos los elementos que pueden activar modales
    const modalTriggers = document.querySelectorAll('[data-modal-target]')

    if (modalTriggers.length === 0) {
      return false
    }

    modalTriggers.forEach(trigger => {
      this.setupModalTrigger(trigger)
    })

    return true
  },

  setupModalTrigger(trigger) {
    const modalId = trigger.getAttribute('data-modal-target')
    const modal = document.getElementById(modalId)

    if (!modal || modalId === 'contact-modal') {
      return
    }

    const closeBtn = modal.querySelector('.program-detail-modal__close')

    // Eventos para abrir modal
    EventManager.add(trigger, 'click', e => {
      e.preventDefault()
      this.openModal(modal)
    })

    // Eventos para cerrar modal
    if (closeBtn) {
      EventManager.add(closeBtn, 'click', e => {
        e.preventDefault()
        this.closeModal(modal)
      })
    }

    // Cerrar con ESC
    EventManager.add(document, 'keydown', e => {
      if (e.key === 'Escape' && modal.classList.contains('program-detail-modal--active')) {
        this.closeModal(modal)
      }
    })

    // Cerrar clickeando fuera
    EventManager.add(modal, 'click', e => {
      if (e.target === modal) {
        this.closeModal(modal)
      }
    })
  },

  openModal(modal) {
    modal.classList.add('program-detail-modal--active')
    document.body.style.overflow = 'hidden'
  },

  closeModal(modal) {
    modal.classList.remove('program-detail-modal--active')
    document.body.style.overflow = ''
  }
}

// Inicialización Principal

const DatosProgramaVideoSystem = {
  async init() {
    try {
      // Inicializar sistemas locales únicamente
      const systems = {
        responsiveVideo: ResponsiveVideoSystem.init(),
        modal: ModalSystem.init()
      }

      // Configurar gestión de visibilidad para ahorro de batería
      this.setupBatteryOptimization()

      // Configurar cleanup
      this.setupCleanup()

      // Log solo en desarrollo
      if (process.env.NODE_ENV === 'development') {
        const activeSystems = Object.entries(systems)
          .filter(([_, isActive]) => isActive)
          .map(([name]) => name)

        if (activeSystems.length > 0) {
          console.log('Sistemas activos:', activeSystems)
        }
      }
      return systems
    } catch (error) {
      return false
    }
  },

  setupBatteryOptimization() {
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
  },

  setupCleanup() {
    const cleanup = () => {
      // Restaurar overflow del body
      document.body.style.overflow = ''

      // Los datos del programa se manejan globalmente en loadProgram

      // Limpiar eventos
      if (typeof EventManager !== 'undefined' && EventManager.cleanup) {
        EventManager.cleanup()
      }
    }

    // Cleanup al cambiar página
    window.addEventListener('beforeunload', cleanup)

    // Cleanup en hot reload (desarrollo)
    if (typeof module !== 'undefined' && module.hot) {
      module.hot.dispose(cleanup)
    }

    return cleanup
  }
}

// ===========================================
// AUTO-INICIALIZACIÓN
// ===========================================
export default () => {
  if (typeof DOMUtils !== 'undefined' && DOMUtils.isReady) {
    DOMUtils.isReady(async () => {
      await DatosProgramaVideoSystem.init()
    })
  } else {
    // Fallback si no hay utilidades DOM disponibles
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', async () => {
        await DatosProgramaVideoSystem.init()
      })
    } else {
      DatosProgramaVideoSystem.init()
    }
  }

  // Exponer solo en desarrollo (sistemas locales)
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    window.DatosProgramaVideoSections = {
      ResponsiveVideoSystem,
      ModalSystem
    }
  }
}
