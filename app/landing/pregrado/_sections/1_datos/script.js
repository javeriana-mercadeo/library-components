// ===========================================
// SCRIPT PRINCIPAL - DATOS PROGRAMA
// ===========================================

/**
 * Script principal que orquesta todos los módulos del sistema
 * Sistema modular optimizado para producción
 */

import { detectPlatform } from '../../_shared/modules/platform-detection.js'
import { VideoSystem } from '../../_shared/modules/video-system.js'
import { PeriodicityObserver } from '../../_shared/modules/periodicity-observer.js'
import { createProgramFormatter } from '../../_shared/modules/program-formatter.js'
import { createDatesModalHandler } from '../../_shared/modules/dates-modal-handler.js'

/**
 * Ejecutar función cuando el DOM esté listo
 */
function onDOMReady(callback) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback)
  } else {
    callback()
  }
}

class ProgramDataSystem {
  constructor() {
    this.platform = null

    // Instanciar subsistemas
    this.videoSystem = new VideoSystem()
    this.periodicityObserver = new PeriodicityObserver()
    this.programFormatter = createProgramFormatter({ scope: 'datos' })
    this.datesModalHandler = createDatesModalHandler({ scope: '#datos' })

    this.initialized = false
  }

  /**
   * Inicializar el sistema completo
   */
  init() {
    if (this.initialized) {
      return
    }

    try {
      // Detectar plataforma
      this.platform = detectPlatform()

      // Configurar event listeners para datos del programa
      this.setupDataEventListeners()

      // Inicializar subsistemas uno por uno
      try {
        this.periodicityObserver.init()
      } catch (error) {
        Logger.error('[ProgramDataSystem] Error inicializando PeriodicityObserver:', error)
      }

      try {
        this.videoSystem.init()
      } catch (error) {
        Logger.error('[ProgramDataSystem] Error inicializando VideoSystem:', error)
      }

      try {
        this.datesModalHandler.init()
      } catch (error) {
        Logger.error('[ProgramDataSystem] Error inicializando DatesModalHandler:', error)
      }

      // Configurar visibilidad de triggers de modal basados en contenido
      this.scheduleModalContentVisibilityCheck()

      this.initialized = true
    } catch (error) {
      Logger.error('[ProgramDataSystem] Error crítico durante inicialización:', error)
      this.initialized = false
    }
  }

  /**
   * Configurar event listeners para datos del programa
   */
  setupDataEventListeners() {
    document.addEventListener('data_load-program', this.handleDataLoad.bind(this))
  }

  /**
   * Manejar carga de datos del programa
   */
  handleDataLoad() {
    // Reconfigurar contenedores de video si el sistema ya está inicializado
    if (this.videoSystem.state.initialized) {
      this.videoSystem.setupLazyVideoContainers()
    }

    this.scheduleModalContentVisibilityCheck()
  }

  /**
   * Verificar contenido para controlar visibilidad de triggers de modal
   */
  scheduleModalContentVisibilityCheck() {
    const contentElements = document.querySelectorAll('[data-modal-content-monitor]')
    if (!contentElements.length) return

    contentElements.forEach(contentElement => {
      const overlayId = contentElement.dataset.modalOverlayId
      if (!overlayId) return

      // Caso especial para modal de fechas - delegar al handler compartido
      if (contentElement.dataset.modalContentMonitor === 'dates') {
        if (this.datesModalHandler) {
          this.datesModalHandler.checkModalVisibility()
        }
        return
      }

      const triggerWrapper = document.querySelector(`[data-puj-modal-trigger="${overlayId}"]`)
      if (!triggerWrapper) return

      const shouldDisplay = this.hasMeaningfulContent(contentElement)
      triggerWrapper.classList.toggle('program-data_modal-trigger--hidden', !shouldDisplay)
    })
  }

  /**
   * Evaluar si el contenedor del modal tiene contenido significativo
   * @param {HTMLElement} element
   * @returns {boolean}
   */
  hasMeaningfulContent(element) {
    if (!element) return false

    const text = element.textContent?.replace(/\u00a0/g, ' ').trim()

    // Textos que se consideran como "sin contenido"
    const emptyTextPatterns = ['N/A', 'No disponible', 'Sin contenido']
    const normalizedText = text.toLowerCase()

    if (!text || emptyTextPatterns.some(pattern => normalizedText === pattern.toLowerCase())) {
      return false
    }

    const mediaSelector = 'img, video, iframe, audio, object, embed, picture, svg, table, ul, ol, li, blockquote'
    return Boolean(element.querySelector(mediaSelector))
  }

  /**
   * Destruir el sistema y limpiar recursos
   */
  destroy() {
    // Destruir subsistemas
    if (this.videoSystem) {
      this.videoSystem.destroy()
    }

    if (this.periodicityObserver) {
      this.periodicityObserver.destroy()
    }

    if (this.programFormatter) {
      this.programFormatter.destroy()
    }

    if (this.datesModalHandler) {
      this.datesModalHandler.destroy()
    }

    this.initialized = false
  }

  /**
   * Obtener estado del sistema
   */
  getStatus() {
    return {
      initialized: this.initialized,
      platform: this.platform?.name || 'unknown',
      videoSystem: {
        initialized: this.videoSystem?.state.initialized || false,
        loadedVideos: this.videoSystem?.state.loadedVideos.size || 0
      },
      periodicityObserver: {
        isActive: this.periodicityObserver?.isActive() || false,
        ...this.periodicityObserver?.getStats()
      }
    }
  }
}

// Sistema global para compatibilidad
let globalProgramDataSystem = null

/**
 * Configurar manejador de interacción del usuario para videos
 * Necesario para reproductores automáticos en móviles
 */
function setupUserInteractionHandler() {
  let interactionTriggered = false
  const interactionEvents = ['click', 'touchstart', 'scroll', 'keydown']

  const handleUserInteraction = () => {
    if (interactionTriggered) return
    interactionTriggered = true

    // Intentar reproducir videos visibles
    const containers = document.querySelectorAll('[data-component="video-player"].video-loaded')
    containers.forEach(container => {
      if (DOMUtils.isElementVisible(container)) {
        const videos = container.querySelectorAll('video')
        videos.forEach(video => {
          if (video.paused) {
            globalProgramDataSystem.videoSystem.playVideoSafely(video, 1, true)
          }
        })
      }
    })

    // Limpiar event listeners
    interactionEvents.forEach(eventType => {
      document.removeEventListener(eventType, handleUserInteraction, true)
    })
  }

  // Configurar event listeners
  interactionEvents.forEach(eventType => {
    document.addEventListener(eventType, handleUserInteraction, {
      passive: true,
      capture: true,
      once: true
    })
  })

  // Auto-cleanup después de 30 segundos
  setTimeout(() => {
    interactionEvents.forEach(eventType => {
      document.removeEventListener(eventType, handleUserInteraction, true)
    })
  }, 30000)
}

/**
 * Función principal de inicialización
 */
function initProgramDataVideo() {
  try {
    if (!globalProgramDataSystem) {
      Logger.error('[ProgramDataSystem] Sistema no inicializado')
      return
    }

    // Inicializar sistema principal
    globalProgramDataSystem.init()

    // Configurar manejo de interacciones de usuario
    setupUserInteractionHandler()
  } catch (error) {
    Logger.error('[ProgramDataSystem] Error durante inicialización:', error)
  }
}

/**
 * Función de inicialización del sistema completo
 */
function initSystem() {
  if (typeof window !== 'undefined' && window.programDataVideoInitialized) {
    return
  }

  // Crear instancia del sistema principal
  globalProgramDataSystem = new ProgramDataSystem()

  // Marcar como inicializado globalmente
  if (typeof window !== 'undefined') {
    window.programDataVideoInitialized = true

    // Configurar cleanup automático antes de cerrar la página
    window.addEventListener('beforeunload', () => {
      if (globalProgramDataSystem) {
        globalProgramDataSystem.destroy()
      }
    })
  }

  // Inicializar cuando el DOM esté listo
  onDOMReady(() => {
    initProgramDataVideo()
  })
}

// Exponer funciones para compatibilidad con código existente
if (typeof window !== 'undefined') {
  window.ProgramDataSystem = ProgramDataSystem
  window.getProgramDataSystemStatus = () => {
    return globalProgramDataSystem?.getStatus() || { initialized: false }
  }
}

// Auto-inicialización
initSystem()

export { ProgramDataSystem, initSystem as default }
