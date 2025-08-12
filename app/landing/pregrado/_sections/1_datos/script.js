// ===========================================
// DATOS PROGRAMA VIDEO - SCRIPT OPTIMIZADO
// ===========================================

const ResponsiveVideoSystem = {
  config: {
    defaultBreakpoint: 768,
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
      vq: 'hd1080',
      enablejsapi: '0'
    }
  },

  init() {
    try {
      // Buscar por ID específico
      const videoContainer = document.getElementById('program-data-media')

      if (!videoContainer) {
        return false
      }

      // Obtener códigos de video (configuración o HTML)
      const mobileVideoId = this.getVideoCode('codeVideoMobile', videoContainer.dataset.videoMobile)
      const desktopVideoId = this.getVideoCode('codeVideoDesktop', videoContainer.dataset.videoDesktop)
      const breakpoint = parseInt(videoContainer.dataset.breakpoint) || this.config.defaultBreakpoint

      if (!mobileVideoId || !desktopVideoId) {
        return false
      }

      // Inicializar videos
      this.setupVideo(videoContainer, mobileVideoId, desktopVideoId, breakpoint)
      this.setupResponsiveListener(videoContainer, breakpoint)

      return true
    } catch (error) {
      return false
    }
  },

  getVideoCode(configKey, fallback) {
    try {
      return (typeof configuration !== 'undefined' && configuration?.[configKey]) || fallback
    } catch {
      return fallback
    }
  },

  setupVideo(container, mobileVideoId, desktopVideoId, breakpoint) {
    // Limpiar contenedor
    container.innerHTML = ''

    // Determinar qué video cargar según el dispositivo actual
    const isMobile = window.innerWidth < breakpoint
    const videoId = isMobile ? mobileVideoId : desktopVideoId
    const deviceType = isMobile ? 'mobile' : 'desktop'

    // Crear solo el iframe necesario
    const iframe = this.createIframe(videoId, deviceType)
    iframe.style.display = 'block'

    // Agregar al DOM
    container.appendChild(iframe)

    // Marcar como listo y guardar información para cambios de dispositivo
    container.classList.add('responsive-video-ready')
    container.setAttribute('data-breakpoint', breakpoint)
    container.setAttribute('data-current-device', deviceType)
    container.setAttribute('data-mobile-video', mobileVideoId)
    container.setAttribute('data-desktop-video', desktopVideoId)
  },

  createIframe(videoId, type) {
    const iframe = document.createElement('iframe')

    // URL con parámetros optimizados
    const params = { ...this.config.videoParams, playlist: videoId }
    const videoSrc = `https://www.youtube.com/embed/${videoId}?${new URLSearchParams(params)}`

    // Configurar iframe
    Object.assign(iframe, {
      src: videoSrc,
      title: `Video ${type}`,
      allow: 'autoplay; encrypted-media',
      allowFullscreen: false,
      loading: 'lazy',
      frameBorder: '0',
      className: `program-data__iframe program-data__iframe--${type}`
    })

    // Atributos adicionales
    iframe.setAttribute('scrolling', 'no')
    iframe.setAttribute('data-video-type', type)

    // Event listener para mostrar video cuando cargue
    iframe.addEventListener('load', () => {
      setTimeout(() => {
        const container = iframe.closest('#program-data-media')
        if (container) {
          container.classList.add('video-loaded')
          setTimeout(() => {
            iframe.style.opacity = '1'
          }, 300)
        }
      }, 500)
    })

    return iframe
  },

  updateVisibility(container, breakpoint) {
    const isMobile = window.innerWidth < breakpoint
    const currentDevice = container.getAttribute('data-current-device')
    const newDevice = isMobile ? 'mobile' : 'desktop'

    // Solo recargar si cambió el tipo de dispositivo
    if (currentDevice && currentDevice !== newDevice) {
      const mobileVideoId = container.getAttribute('data-mobile-video')
      const desktopVideoId = container.getAttribute('data-desktop-video')

      // Recargar con el video correcto
      this.setupVideo(container, mobileVideoId, desktopVideoId, breakpoint)
    }
  },

  setupResponsiveListener(container, breakpoint) {
    let resizeTimeout

    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        this.updateVisibility(container, breakpoint)
      }, 150)
    }

    window.addEventListener('resize', handleResize)
  }
}

// Inicialización
const initVideoSystem = () => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      ResponsiveVideoSystem.init()
    })
  } else {
    ResponsiveVideoSystem.init()
  }

  document.addEventListener('data_load-program', () => {
    const context = document.getElementById('datos')
    const dataPujName = context.querySelector('[data-puj-name]')
    let currentContent = dataPujName.textContent.trim()
    dataPujName.textContent = `${currentContent}: `
  })
}

// Exportar función e inicializar inmediatamente
export default initVideoSystem

// También ejecutar inmediatamente en caso de compilación IIFE
if (typeof window !== 'undefined') {
  initVideoSystem()
}
