// ===========================================
// DATOS PROGRAMA VIDEO - SIMPLIFIED LIFERAY SYSTEM
// ===========================================

const SimplifiedVideoSystem = {
  config: {
    defaultBreakpoint: 768,
    videoConfig: {
      autoPlay: true,
      loop: true,
      mute: true,
      hideControls: true,
      videoWidth: null,  // Se calcula dinámicamente
      videoHeight: null  // Se calcula dinámicamente
    }
  },

  players: {},

  init() {
    try {
      const videoContainer = document.getElementById('program-data-media')

      if (!videoContainer) {
        return false
      }

      // Obtener códigos de video directamente de data attributes
      const mobileVideoId = videoContainer.dataset.videoMobile
      const desktopVideoId = videoContainer.dataset.videoDesktop
      const breakpoint = parseInt(videoContainer.dataset.breakpoint) || this.config.defaultBreakpoint

      if (!mobileVideoId || !desktopVideoId) {
        return false
      }

      // Configurar estructura dual
      this.setupDualVideoStructure(videoContainer, mobileVideoId, desktopVideoId, breakpoint)
      this.setupResponsiveListener(videoContainer, breakpoint)

      // Inicializar YouTube API
      this.loadYouTubeAPI(mobileVideoId, desktopVideoId)

      return true
    } catch (error) {
      console.error('Error initializing video system:', error)
      return false
    }
  },

  setupDualVideoStructure(container, mobileVideoId, desktopVideoId, breakpoint) {
    // Limpiar contenedor
    container.innerHTML = ''

    // Crear estructura simplificada para ambos videos
    container.innerHTML = `
      <div class="video-mobile" id="video-mobile-container" style="
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
      ">
        <div class="video-loading" style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 40px;
          height: 40px;
          border: 4px solid var(--neutral-600);
          border-top-color: var(--primary);
          border-radius: 50%;
          animation: videoLoading 1s linear infinite;
          z-index: 12;
        "></div>
      </div>
      <div class="video-desktop" id="video-desktop-container" style="
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
      ">
        <div class="video-loading" style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 40px;
          height: 40px;
          border: 4px solid var(--neutral-600);
          border-top-color: var(--primary);
          border-radius: 50%;
          animation: videoLoading 1s linear infinite;
          z-index: 12;
        "></div>
      </div>
      <div class="video-mask" style="
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: transparent;
        pointer-events: auto;
        cursor: default;
        z-index: 10;
        user-select: none;
      "></div>
    `

    // Determinar visibilidad inicial
    const isMobile = window.innerWidth < breakpoint
    container.setAttribute('data-current-video', isMobile ? 'mobile' : 'desktop')
    container.setAttribute('data-breakpoint', breakpoint)
    container.setAttribute('data-mobile-video', mobileVideoId)
    container.setAttribute('data-desktop-video', desktopVideoId)
  },

  getVideoDimensions(type) {
    if (type === 'mobile') {
      return { width: 428, height: 428 }
    } else {
      const width = 520
      const height = Math.round(width * (880 / 612))
      return { width, height }
    }
  },

  getHighResDimensions(type) {
    if (type === 'mobile') {
      // Mobile: usar dimensiones 1080p cuadradas para forzar alta resolución
      return { width: 1080, height: 1080 }
    } else {
      // Desktop: usar dimensiones que mantengan el aspecto pero en alta resolución
      // Aspecto 612:880, escalado a ~1440p
      const width = 1224  // 612 * 2
      const height = 1760 // 880 * 2
      return { width, height }
    }
  },

  loadYouTubeAPI(mobileVideoId, desktopVideoId) {
    const handleAPIReady = () => {
      // Crear ambos players
      this.createYouTubePlayer('video-mobile-container', mobileVideoId, 'mobile')
      this.createYouTubePlayer('video-desktop-container', desktopVideoId, 'desktop')
    }

    if ('YT' in window && window.YT.loaded) {
      handleAPIReady()
    } else {
      const oldCallback = window.onYouTubeIframeAPIReady || function () {}
      
      window.onYouTubeIframeAPIReady = function () {
        oldCallback()
        handleAPIReady()
      }

      const apiSrc = '//www.youtube.com/iframe_api'
      let script = Array.from(document.querySelectorAll('script')).find(s => s.src.includes('iframe_api'))

      if (!script) {
        script = document.createElement('script')
        script.src = apiSrc
        document.body.appendChild(script)
      }
    }
  },

  createYouTubePlayer(containerId, videoId, type) {
    // Usar dimensiones grandes para forzar alta resolución
    const highResDimensions = this.getHighResDimensions(type)
    
    this.players[type] = new YT.Player(containerId, {
      events: {
        onReady: (event) => {
          if (this.config.videoConfig.mute) {
            event.target.mute()
          }
          this.showVideo(containerId, type)
        }
      },
      height: highResDimensions.height,
      width: highResDimensions.width,
      playerVars: {
        autoplay: this.config.videoConfig.autoPlay ? 1 : 0,
        controls: this.config.videoConfig.hideControls ? 0 : 1,
        loop: this.config.videoConfig.loop ? 1 : 0,
        playlist: this.config.videoConfig.loop ? videoId : undefined,
        mute: this.config.videoConfig.mute ? 1 : 0,
        rel: 0,
        showinfo: 0,
        modestbranding: 1,
        playsinline: 1,
        iv_load_policy: 3,
        disablekb: 1,
        fs: 0,
        cc_load_policy: 0,
        vq: 'highres',
        hd: 1,
        quality: 'highres'
      },
      videoId: videoId
    })
  },

  showVideo(containerId, type) {
    try {
      const container = document.getElementById(containerId)
      if (!container) {
        console.error(`Container ${containerId} not found`)
        return
      }

      // Quitar loading
      const loadingIndicator = container.querySelector('.video-loading')
      if (loadingIndicator) {
        loadingIndicator.remove()
      }

      // Verificar si este video debe mostrarse según el dispositivo actual
      const mainContainer = document.getElementById('program-data-media')
      if (mainContainer) {
        const currentVideo = mainContainer.getAttribute('data-current-video')
        const breakpoint = parseInt(mainContainer.getAttribute('data-breakpoint')) || 768
        const isMobile = window.innerWidth < breakpoint
        const shouldShowMobile = isMobile && type === 'mobile'
        const shouldShowDesktop = !isMobile && type === 'desktop'
        
        if (shouldShowMobile || shouldShowDesktop) {
          // Mostrar este video
          container.style.display = 'block'
          container.style.opacity = '1'
          
          // Escalar el iframe de alta resolución al tamaño del contenedor
          const iframe = container.querySelector('iframe')
          if (iframe) {
            const highResDimensions = this.getHighResDimensions(type)
            const containerDimensions = this.getVideoDimensions(type)
            
            // Calcular escala para ajustar video de alta res al contenedor
            const scaleX = containerDimensions.width / highResDimensions.width
            const scaleY = containerDimensions.height / highResDimensions.height
            const scale = Math.max(scaleX, scaleY) // Usar la escala mayor para cubrir todo
            
            iframe.style.position = 'absolute'
            iframe.style.top = '50%'
            iframe.style.left = '50%'
            iframe.style.width = `${highResDimensions.width}px`
            iframe.style.height = `${highResDimensions.height}px`
            iframe.style.transform = `translate(-50%, -50%) scale(${scale})`
            iframe.style.transformOrigin = 'center center'
            iframe.style.objectFit = 'cover'
          }
          
          // Marcar como listo
          mainContainer.classList.add('video-loaded', 'responsive-video-ready')
        } else {
          // Mantener oculto si no corresponde al dispositivo actual
          container.style.display = 'none'
        }
      }
    } catch (error) {
      console.error(`Error in showVideo for ${type}:`, error)
    }
  },

  updateVisibility(container, breakpoint) {
    const isMobile = window.innerWidth < breakpoint
    const currentVideo = container.getAttribute('data-current-video')
    const newVideo = isMobile ? 'mobile' : 'desktop'

    if (currentVideo !== newVideo) {
      container.setAttribute('data-current-video', newVideo)
      
      // Obtener ambos contenedores
      const mobileContainer = document.getElementById('video-mobile-container')
      const desktopContainer = document.getElementById('video-desktop-container')
      
      if (mobileContainer && desktopContainer) {
        if (isMobile) {
          // Mostrar mobile, ocultar desktop
          mobileContainer.style.display = 'block'
          desktopContainer.style.display = 'none'
        } else {
          // Mostrar desktop, ocultar mobile
          desktopContainer.style.display = 'block'
          mobileContainer.style.display = 'none'
        }
      }
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
      SimplifiedVideoSystem.init()
    })
  } else {
    SimplifiedVideoSystem.init()
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
