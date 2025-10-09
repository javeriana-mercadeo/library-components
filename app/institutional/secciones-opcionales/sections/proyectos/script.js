// ===========================================
// SCRIPT PRINCIPAL - PROYECTOS DESTACADOS
// ===========================================

/**
 * Script principal que orquesta todos los módulos del sistema
 * Sistema modular optimizado para producción
 */

import { onDOMReady, runWhenIdle, Logger } from './modules/utils.js'
import { CarouselSystem } from './modules/carousel-system.js'
import { VideoSystem } from './modules/video-system.js'
import { ModalSystem } from './modules/modal-system.js'

class ProyectosSystem {
  constructor() {
    // Instanciar subsistemas
    this.carouselSystem = new CarouselSystem()
    this.videoSystem = new VideoSystem()
    this.modalSystem = new ModalSystem(this.videoSystem)

    this.initialized = false
  }

  /**
   * Inicializar el sistema completo
   */
  init() {
    if (this.initialized) {
      Logger.warning('Sistema ya inicializado')
      return
    }

    try {
      Logger.info('Iniciando ProyectosSystem')

      // Inicializar subsistemas
      try {
        this.carouselSystem.init()
        Logger.info('CarouselSystem inicializado')
      } catch (error) {
        Logger.error('Error inicializando CarouselSystem:', error)
      }

      try {
        this.modalSystem.init()
        Logger.info('ModalSystem inicializado')
      } catch (error) {
        Logger.error('Error inicializando ModalSystem:', error)
      }

      // VideoSystem no necesita init explícito, se inicializa al usarse
      Logger.info('VideoSystem listo')

      this.initialized = true
      Logger.info('ProyectosSystem inicializado exitosamente')
    } catch (error) {
      Logger.error('Error crítico durante inicialización:', error)
      this.initialized = false
    }
  }

  /**
   * Destruir el sistema y limpiar recursos
   */
  destroy() {
    if (this.carouselSystem) {
      this.carouselSystem.destroy()
    }

    if (this.modalSystem) {
      this.modalSystem.destroy()
    }

    if (this.videoSystem) {
      this.videoSystem.destroy()
    }

    this.initialized = false
    Logger.info('ProyectosSystem destruido')
  }

  /**
   * Obtener estado del sistema
   */
  getStatus() {
    return {
      initialized: this.initialized,
      carousel: {
        initialized: this.carouselSystem?.state.isInitialized || false,
        currentSlide: this.carouselSystem?.state.currentSlide || 0,
        totalSlides: this.carouselSystem?.state.totalSlides || 0
      },
      modal: {
        initialized: this.modalSystem?.isInitialized || false
      },
      video: {
        apiReady: this.videoSystem?.isYouTubeAPIReady || false,
        loadedPlayers: this.videoSystem?.youtubePlayersRegistry.size || 0
      }
    }
  }
}

// Sistema global para compatibilidad
let globalProyectosSystem = null

/**
 * Función principal de inicialización
 */
function initProyectosSystem() {
  try {
    if (!globalProyectosSystem) {
      Logger.error('Sistema no inicializado')
      return
    }

    // Inicializar sistema principal
    globalProyectosSystem.init()

    // Exponer funciones globales para compatibilidad con el carousel
    if (typeof window !== 'undefined') {
      window.openCarouselModal = slideIndex => {
        globalProyectosSystem.modalSystem.openModal(slideIndex)
      }

      window.closeCarouselModal = event => {
        globalProyectosSystem.modalSystem.closeModal(event)
      }
    }
  } catch (error) {
    Logger.error('Error durante inicialización:', error)
  }
}

/**
 * Función de inicialización del sistema completo
 */
function initSystem() {
  if (typeof window !== 'undefined' && window.proyectosSystemInitialized) {
    Logger.warning('Sistema ya marcado como inicializado')
    return
  }

  // Crear instancia del sistema principal
  globalProyectosSystem = new ProyectosSystem()

  // Marcar como inicializado globalmente
  if (typeof window !== 'undefined') {
    window.proyectosSystemInitialized = true

    // Configurar cleanup automático antes de cerrar la página
    window.addEventListener('beforeunload', () => {
      if (globalProyectosSystem) {
        globalProyectosSystem.destroy()
      }
    })
  }

  // Inicializar cuando el DOM esté listo
  onDOMReady(() => {
    // Usar requestIdleCallback si está disponible para no bloquear recursos críticos
    runWhenIdle(initProyectosSystem, 1000)
  })
}

// Exponer funciones para compatibilidad con código existente
if (typeof window !== 'undefined') {
  window.ProyectosSystem = ProyectosSystem
  window.getProyectosSystemStatus = () => {
    return globalProyectosSystem?.getStatus() || { initialized: false }
  }
}

// Auto-inicialización
initSystem()

export { ProyectosSystem, initSystem as default }
