/**
 * VideoDoctorado - JavaScript Vanilla
 * Sistema de gestión de videos de fondo y modales compatible con Liferay
 */

export default function initVideoDoctorado() {
  // Configuración global
  const CONFIG = {
    SELECTORS: {
      root: '[data-component="video-doctorado"]',
      youtubeContainer: '#youtube-container',
      html5Container: '#html5-video-container',
      bgImage: '[data-background-image]',
      modalTrigger: '[data-modal-target]',
      modalClose: '.program-detail-modal__close',
      modal: '.program-detail-modal'
    },
    CLASSES: {
      active: 'active',
      modalActive: 'program-detail-modal--active',
      loading: 'video-loading'
    },
    DELAYS: {
      resize: 300,
      configUpdate: 50
    }
  }

  // Estado del sistema
  let systemState = {
    initialized: false,
    currentVideoType: 'none', // 'youtube', 'html5', 'none'
    activeModal: null,
    resizeTimeout: null
  }

  /* =====================
       UTILIDADES DE VIDEO
    ===================== */

  /**
   * Extrae ID de video de YouTube desde URL
   */
  function extractYouTubeId(url) {
    if (!url) return null
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  /**
   * Verifica si una URL es de YouTube
   */
  function isYouTubeUrl(text) {
    return !!text && (text.includes('youtube.com') || text.includes('youtu.be'))
  }

  /**
   * Verifica si es URL de video directo
   */
  function isDirectVideoUrl(text) {
    if (!text) return false
    return (
      /\.(mp4|webm|ogg|mov|avi)(\?|$)/i.test(text) ||
      text.includes('cloudfront') ||
      text.includes('amazonaws') ||
      text.includes('.mp4') ||
      text.includes('.webm')
    )
  }

  /**
   * Debounce function para optimizar eventos
   */
  function debounce(fn, delay) {
    let timeout
    return function () {
      const context = this
      const args = arguments
      clearTimeout(timeout)
      timeout = setTimeout(() => fn.apply(context, args), delay)
    }
  }

  /* =====================
       CREADORES DE ELEMENTOS
    ===================== */

  /**
   * Crea iframe de YouTube
   */
  function createYouTubeIframe(videoId) {
    const iframe = document.createElement('iframe')
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1`
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
    iframe.allowFullscreen = true
    iframe.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: none;
      object-fit: cover;
    `
    return iframe
  }

  /**
   * Crea elemento video HTML5
   */
  function createHTML5Video(videoUrl) {
    const video = document.createElement('video')
    video.src = videoUrl
    video.setAttribute('muted', '')
    video.setAttribute('loop', '')
    video.setAttribute('autoplay', '')
    video.setAttribute('playsinline', '')
    video.muted = true
    video.loop = true
    video.autoplay = true
    video.playsInline = true
    video.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    `

    // Manejar eventos de video
    video.addEventListener('canplay', () => {
      video.play().catch(e => console.log('Autoplay blocked:', e))
    })

    return video
  }

  /**
   * Crea indicador de carga
   */
  function createLoadingIndicator() {
    const loading = document.createElement('div')
    loading.className = CONFIG.CLASSES.loading
    loading.innerHTML = `
      <div style="text-align: center;">
        <div class="video-loading-spinner"></div>
        <p>Cargando video...</p>
      </div>
    `
    return loading
  }

  /* =====================
       GESTIÓN DE VIDEOS
    ===================== */

  /**
   * Obtiene la URL configurada según el dispositivo
   */
  function getConfiguredUrl() {
    const root = document.querySelector(CONFIG.SELECTORS.root)
    if (!root) return ''

    const isMobile = window.matchMedia('(max-width: 767px)').matches
    const desktop = root.getAttribute('data-video-desktop') || ''
    const mobile = root.getAttribute('data-video-mobile') || ''

    return isMobile && mobile ? mobile : desktop
  }

  /**
   * Limpia todos los contenedores de video
   */
  function clearContainers() {
    const root = document.querySelector(CONFIG.SELECTORS.root)
    if (!root) return

    const youtubeContainer = root.querySelector(CONFIG.SELECTORS.youtubeContainer)
    const html5Container = root.querySelector(CONFIG.SELECTORS.html5Container)
    const bgImage = root.querySelector(CONFIG.SELECTORS.bgImage)

    if (youtubeContainer) {
      youtubeContainer.innerHTML = ''
      youtubeContainer.classList.remove(CONFIG.CLASSES.active)
    }

    if (html5Container) {
      html5Container.innerHTML = ''
      html5Container.classList.remove(CONFIG.CLASSES.active)
    }

    if (bgImage) {
      bgImage.style.display = 'block'
    }

    systemState.currentVideoType = 'none'
  }

  /**
   * Actualiza el fondo de video según configuración
   */
  function updateVideoBackground() {
    const root = document.querySelector(CONFIG.SELECTORS.root)
    if (!root) return

    clearContainers()

    const url = getConfiguredUrl()
    if (!url) return

    const youtubeContainer = root.querySelector(CONFIG.SELECTORS.youtubeContainer)
    const html5Container = root.querySelector(CONFIG.SELECTORS.html5Container)
    const bgImage = root.querySelector(CONFIG.SELECTORS.bgImage)

    // Procesamiento de YouTube
    if (isYouTubeUrl(url)) {
      const id = extractYouTubeId(url)

      if (id && youtubeContainer) {
        const iframe = createYouTubeIframe(id)
        youtubeContainer.appendChild(iframe)
        youtubeContainer.classList.add(CONFIG.CLASSES.active)
        if (bgImage) bgImage.style.display = 'none'
        systemState.currentVideoType = 'youtube'
      }
      return
    }

    // Procesamiento de video HTML5
    if (isDirectVideoUrl(url)) {
      if (!html5Container) return

      const loading = createLoadingIndicator()
      html5Container.appendChild(loading)
      html5Container.classList.add(CONFIG.CLASSES.active)

      const video = createHTML5Video(url)

      video.addEventListener('loadeddata', () => {
        if (loading && loading.parentNode) {
          loading.remove()
        }
      })

      video.addEventListener('error', e => {
        console.error('Error en video HTML5:', e)
        loading.innerHTML = '<p style="color:#ff6b6b;">Error cargando video</p>'
        setTimeout(() => {
          html5Container.classList.remove(CONFIG.CLASSES.active)
          if (bgImage) bgImage.style.display = 'block'
          systemState.currentVideoType = 'none'
        }, 3000)
      })

      html5Container.appendChild(video)
      if (bgImage) bgImage.style.display = 'none'
      systemState.currentVideoType = 'html5'
    }
  }

  /* =====================
       SISTEMA DE MODALES
    ===================== */

  const ModalSystem = {
    /**
     * Inicializa el sistema de modales
     */
    init() {
      this.setupEventListeners()
    },

    /**
     * Configura event listeners
     */
    setupEventListeners() {
      // Abrir modales
      document.addEventListener('click', e => {
        const trigger = e.target.closest(CONFIG.SELECTORS.modalTrigger)
        if (trigger) {
          e.preventDefault()
          const modalId = trigger.getAttribute('data-modal-target')
          this.openModal(modalId)
        }

        // Cerrar modales
        const closeBtn = e.target.closest(CONFIG.SELECTORS.modalClose)
        if (closeBtn) {
          e.preventDefault()
          this.closeModal()
        }

        // Cerrar con backdrop
        if (e.target.classList.contains('program-detail-modal') && e.target.classList.contains(CONFIG.CLASSES.modalActive)) {
          this.closeModal()
        }
      })

      // Cerrar con Escape
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && systemState.activeModal) {
          this.closeModal()
        }
      })
    },

    /**
     * Abre modal específico
     */
    openModal(modalId) {
      const modal = document.getElementById(modalId)
      if (modal) {
        modal.classList.add(CONFIG.CLASSES.modalActive)
        document.body.style.overflow = 'hidden'
        systemState.activeModal = modalId

        // Focus para accesibilidad
        const closeButton = modal.querySelector(CONFIG.SELECTORS.modalClose)
        if (closeButton) {
          closeButton.focus()
        }
      }
    },

    /**
     * Cierra modal activo
     */
    closeModal() {
      if (systemState.activeModal) {
        const modal = document.getElementById(systemState.activeModal)
        if (modal) {
          modal.classList.remove(CONFIG.CLASSES.modalActive)
        }
      }

      document.body.style.overflow = ''
      systemState.activeModal = null
    }
  }

  /* =====================
       INICIALIZACIÓN
    ===================== */

  /**
   * Inicializa el sistema completo
   */
  function initializeSystem() {
    if (systemState.initialized) return

    const root = document.querySelector(CONFIG.SELECTORS.root)
    if (!root) return

    // Configurar video inicial con delay
    setTimeout(() => {
      updateVideoBackground()
    }, 100)

    // Configurar resize listener
    const onResize = debounce(updateVideoBackground, CONFIG.DELAYS.resize)
    window.addEventListener('resize', onResize)

    // Inicializar sistema de modales
    ModalSystem.init()

    systemState.initialized = true
  }

  // Inicialización automática
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSystem)
  } else {
    initializeSystem()
  }

  // Fallbacks para diferentes entornos
  setTimeout(initializeSystem, 100)
  setTimeout(initializeSystem, 500)
}
