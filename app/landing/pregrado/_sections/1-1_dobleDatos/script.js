// ===========================================
// SCRIPT PRINCIPAL - DOBLE DATOS PROGRAMA
// ===========================================

/**
 * Script principal que orquesta todos los módulos del sistema
 * Versión específica para doble datos con ID "doble-datos"
 */

import { detectPlatform } from './modules/platform-detection.js'
import { Logger, onDOMReady, runWhenIdle } from './modules/utils.js'
import { VideoSystem } from './modules/video-system.js'
import { ModalSystem } from './modules/modal-system.js'
import { PeriodicityObserver } from './modules/periodicity-observer.js'

class DoubleProgramDataSystem {
  constructor() {
    this.platform = null
    
    // Instanciar subsistemas
    this.videoSystem = new VideoSystem()
    this.modalSystem = new ModalSystem()
    this.periodicityObserver = new PeriodicityObserver()
    
    this.initialized = false
    
    // ID específico para doble datos
    this.contextId = 'doble-datos'
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
      
      // Actualizar nombre del programa
      this.updateProgramName()
      
      // Inicializar subsistemas
      this.modalSystem.init()
      this.periodicityObserver.init()
      this.videoSystem.init()
      
      this.initialized = true
      
    } catch (error) {
      Logger.error('[DoubleProgramDataSystem] Error durante inicialización:', error)
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
    this.updateProgramName()
    
    // Reconfigurar contenedores de video si el sistema ya está inicializado
    if (this.videoSystem.state.initialized) {
      this.videoSystem.setupVideoContainers()
    }
  }

  /**
   * Actualizar nombre del programa en la interfaz
   * Versión específica para doble datos
   */
  updateProgramName() {
    const context = document.getElementById(this.contextId)
    if (!context) return

    const dataPujName = context.querySelector('[data-puj-name]')
    if (dataPujName) {
      const programName = dataPujName.textContent.trim()
      if (programName) {
        // Dispatch evento personalizado para otros componentes
        const event = new CustomEvent('program:nameUpdated', {
          detail: { 
            programName, 
            element: dataPujName, 
            contextId: this.contextId,
            isDoubleData: true 
          }
        })
        document.dispatchEvent(event)
      }
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
    
    this.initialized = false
  }

  /**
   * Obtener estado del sistema
   */
  getStatus() {
    return {
      initialized: this.initialized,
      contextId: this.contextId,
      isDoubleData: true,
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
let globalDoubleProgramDataSystem = null

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
      if (globalDoubleProgramDataSystem.videoSystem.isElementVisible && 
          globalDoubleProgramDataSystem.videoSystem.isElementVisible(container)) {
        
        const videos = container.querySelectorAll('video')
        videos.forEach(video => {
          if (video.paused) {
            globalDoubleProgramDataSystem.videoSystem.playVideoSafely(video, 1, true)
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
function initDoubleProgramDataVideo() {
  try {
    // Inicializar sistema principal
    globalDoubleProgramDataSystem.init()
    
    // Configurar manejo de interacciones de usuario
    setupUserInteractionHandler()
    
  } catch (error) {
    Logger.error('[DoubleProgramDataSystem] Error durante inicialización:', error)
  }
}

/**
 * Función de inicialización del sistema completo
 */
function initSystem() {
  if (typeof window !== 'undefined' && window.doubleProgramDataVideoInitialized) {
    return
  }

  // Crear instancia del sistema principal
  globalDoubleProgramDataSystem = new DoubleProgramDataSystem()

  // Marcar como inicializado globalmente
  if (typeof window !== 'undefined') {
    window.doubleProgramDataVideoInitialized = true
    
    // Configurar cleanup automático antes de cerrar la página
    window.addEventListener('beforeunload', () => {
      if (globalDoubleProgramDataSystem) {
        globalDoubleProgramDataSystem.destroy()
      }
    })
  }

  // Inicializar cuando el DOM esté listo
  onDOMReady(() => {
    // Usar requestIdleCallback si está disponible para no bloquear recursos críticos
    runWhenIdle(initDoubleProgramDataVideo, 2000)
  })
}

// Exponer funciones para compatibilidad con código existente
if (typeof window !== 'undefined') {
  window.DoubleProgramDataSystem = DoubleProgramDataSystem
  window.getDoubleProgramDataSystemStatus = () => {
    return globalDoubleProgramDataSystem?.getStatus() || { initialized: false, isDoubleData: true }
  }
}

// Auto-inicialización
initSystem()

export { DoubleProgramDataSystem, initSystem as default }