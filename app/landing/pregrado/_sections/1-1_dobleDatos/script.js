// ===========================================
// SCRIPT PRINCIPAL - DATOS PROGRAMA
// ===========================================

/**
 * Script principal que orquesta todos los módulos del sistema
 * Sistema modular optimizado para producción
 */

import { detectPlatform } from './modules/platform-detection.js'
import { onDOMReady, runWhenIdle, isElementVisible } from './modules/utils.js'
import { VideoSystem } from './modules/video-system.js'
import { ModalSystem } from './modules/modal-system.js'
import { PeriodicityObserver } from './modules/periodicity-observer.js'
import { programFormatter } from './modules/program-formatter.js'

class ProgramDataSystem {
  constructor() {
    this.platform = null

    // Instanciar subsistemas
    this.videoSystem = new VideoSystem()
    this.modalSystem = new ModalSystem()
    this.periodicityObserver = new PeriodicityObserver()
    this.programFormatter = programFormatter

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
      Logger.info('[ProgramDataSystem] Iniciando inicialización del sistema')

      // Detectar plataforma
      this.platform = detectPlatform()

      // Configurar event listeners para datos del programa
      this.setupDataEventListeners()

      // Inicializar subsistemas uno por uno
      try {
        this.modalSystem.init()
        Logger.info('[ProgramDataSystem] ModalSystem inicializado')
      } catch (error) {
        Logger.error('[ProgramDataSystem] Error inicializando ModalSystem:', error)
      }

      try {
        this.periodicityObserver.init()
        Logger.info('[ProgramDataSystem] PeriodicityObserver inicializado')
      } catch (error) {
        Logger.error('[ProgramDataSystem] Error inicializando PeriodicityObserver:', error)
      }

      try {
        this.videoSystem.init()
        Logger.info('[ProgramDataSystem] VideoSystem inicializado')
      } catch (error) {
        Logger.error('[ProgramDataSystem] Error inicializando VideoSystem:', error)
        // VideoSystem es crítico, pero no debe romper todo el sistema
      }

      // ProgramFormatter no necesita inicialización explícita ya que se auto-inicializa
      Logger.info('[ProgramDataSystem] ProgramFormatter inicializado')

      this.initialized = true
      Logger.info('[ProgramDataSystem] Sistema inicializado exitosamente')
    } catch (error) {
      Logger.error('[ProgramDataSystem] Error crítico durante inicialización:', error)
      // NO marcar como initialized si hay error crítico
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
  }

  /**
   * Destruir el sistema y limpiar recursos
   */
  destroy() {
    // Destruir subsistemas
    if (this.videoSystem) {
      this.videoSystem.destroy()
    }

    if (this.modalSystem) {
      this.modalSystem.destroy()
    }

    if (this.periodicityObserver) {
      this.periodicityObserver.destroy()
    }

    if (this.programFormatter) {
      this.programFormatter.destroy()
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
      modalSystem: {
        hasActiveModal: this.modalSystem?.hasOpenModal() || false,
        activeModal: this.modalSystem?.getActiveModal()?.id || null
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
      if (isElementVisible(container)) {
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
    // Usar requestIdleCallback si está disponible para no bloquear recursos críticos
    runWhenIdle(initProgramDataVideo, 2000)
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
