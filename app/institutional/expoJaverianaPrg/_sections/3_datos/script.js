// ===========================================
// SCRIPT - DATOS EXPO JAVERIANA
// ===========================================

/**
 * Sistema de inicialización para datos/estadísticas
 */
class DatosExpoSystem {
  constructor() {
    this.initialized = false
  }

  /**
   * Inicializar el sistema
   */
  init() {
    if (this.initialized) {
      return
    }

    try {
      // Inicialización aquí

      this.initialized = true
    } catch (error) {
      console.error('[DatosExpoSystem] Error durante inicialización:', error)
      this.initialized = false
    }
  }

  /**
   * Destruir el sistema y limpiar recursos
   */
  destroy() {
    this.initialized = false
  }
}

// Sistema global
let globalDatosExpoSystem = null

/**
 * Función de inicialización del sistema
 */
function initSystem() {
  if (typeof window !== 'undefined' && window.datosExpoSystemInitialized) {
    return
  }

  globalDatosExpoSystem = new DatosExpoSystem()

  if (typeof window !== 'undefined') {
    window.datosExpoSystemInitialized = true

    window.addEventListener('beforeunload', () => {
      if (globalDatosExpoSystem) {
        globalDatosExpoSystem.destroy()
      }
    })
  }

  // Inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      globalDatosExpoSystem.init()
    })
  } else {
    globalDatosExpoSystem.init()
  }
}

// Auto-inicialización
initSystem()

export { DatosExpoSystem, initSystem as default }
