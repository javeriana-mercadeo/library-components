/**
 * VideoDoctorado - Sistema de gestión de videos HTML5
 * Compatible con Liferay y optimizado para producción
 */

import { ModalSystem } from './components/modal-system.js'

function initVideoDoctoradoSystem() {
  const CONFIG = {
    selectors: {
      videoContainers: '[data-component="video-player"]'
    },
    classes: {
      videoLoaded: 'video-loaded',
      videoFailed: 'video-failed',
      containerActive: 'active'
    }
  }

  // Instanciar sistema de modales
  const modalSystem = new ModalSystem()

  /**
   * Detectar dispositivo móvil
   */
  function isMobileDevice() {
    return window.matchMedia('(max-width: 767px)').matches
  }

  /**
   * Crear elemento video HTML5 optimizado
   */
  function createVideoElement(url, fallbackImage) {
    const video = document.createElement('video')

    video.muted = true
    video.autoplay = true
    video.loop = true
    video.playsInline = true
    video.preload = 'metadata'
    video.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    `

    if (fallbackImage) {
      video.poster = fallbackImage
    }

    video.src = url
    return video
  }

  /**
   * Mostrar imagen fallback en caso de error
   */
  function showFallbackImage(container, imageUrl) {
    const overlay = document.createElement('div')
    overlay.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url(${imageUrl});
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      z-index: 1;
    `

    container.appendChild(overlay)
  }

  /**
   * Cargar y configurar video en contenedor
   */
  function loadVideo(container) {
    try {
      const desktopUrl = container.getAttribute('data-video-desktop-url')
      const mobileUrl = container.getAttribute('data-video-mobile-url')
      const fallbackImage = container.getAttribute('data-image-fallback')

      // Seleccionar URL apropiada según dispositivo
      const isMobile = isMobileDevice()
      const videoUrl = isMobile && mobileUrl ? mobileUrl : desktopUrl

      if (!videoUrl) {
        if (fallbackImage) {
          showFallbackImage(container, fallbackImage)
        }
        return
      }

      const video = createVideoElement(videoUrl, fallbackImage)

      // Configurar eventos del video
      video.addEventListener('loadedmetadata', () => {
        // Video metadata cargada - preparando reproducción
      })

      video.addEventListener('canplay', () => {
        container.classList.add(CONFIG.classes.videoLoaded, CONFIG.classes.containerActive)

        video.play().catch(() => {
          // Autoplay falló - normal en algunos navegadores
        })
      })

      video.addEventListener('error', () => {
        container.classList.add(CONFIG.classes.videoFailed)

        if (fallbackImage) {
          showFallbackImage(container, fallbackImage)
        }
      })

      container.appendChild(video)
    } catch (error) {
      // Error general - mostrar fallback
      const fallbackImage = container.getAttribute('data-image-fallback')
      if (fallbackImage) {
        showFallbackImage(container, fallbackImage)
      }
    }
  }

  /**
   * Inicializar sistema de videos
   */
  function initializeVideos() {
    const containers = document.querySelectorAll(CONFIG.selectors.videoContainers)

    containers.forEach(container => {
      loadVideo(container)
    })
  }

  /**
   * Inicializar sistema completo
   */
  function initialize() {
    try {
      initializeVideos()
      modalSystem.init()
    } catch (error) {
      console.error('[VideoDoctorado] Error durante inicialización:', error)
    }
  }

  // Ejecutar inicialización
  initialize()

  // Exposición global para compatibilidad con Liferay
  if (typeof window !== 'undefined') {
    window.initializeVideoDoctorado = initialize
    window.loadVideoDoctorado = loadVideo
    window.videoDoctoradoModalSystem = modalSystem
  }
}

// Auto-ejecutar cuando se importa el módulo
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVideoDoctoradoSystem)
  } else {
    // DOM ya está listo, ejecutar inmediatamente
    initVideoDoctoradoSystem()
  }
}

// Exportar para uso con useEffect también
export default initVideoDoctoradoSystem
