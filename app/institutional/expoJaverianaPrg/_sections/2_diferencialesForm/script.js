// ===========================================
// SCRIPT - DIFERENCIALES Y FORMULARIO
// ===========================================

/**
 * Sistema de inicialización para diferenciales y formulario
 */
class DiferencialesFormSystem {
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
      console.error('[DiferencialesFormSystem] Error durante inicialización:', error)
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
let globalDiferencialesFormSystem = null

/**
 * Función de inicialización del sistema
 */
function initSystem() {
  if (typeof window !== 'undefined' && window.diferencialesFormSystemInitialized) {
    return
  }

  globalDiferencialesFormSystem = new DiferencialesFormSystem()

  if (typeof window !== 'undefined') {
    window.diferencialesFormSystemInitialized = true

    window.addEventListener('beforeunload', () => {
      if (globalDiferencialesFormSystem) {
        globalDiferencialesFormSystem.destroy()
      }
    })
  }

  // Inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      globalDiferencialesFormSystem.init()
    })
  } else {
    globalDiferencialesFormSystem.init()
  }
}

// Auto-inicialización
initSystem()

export { DiferencialesFormSystem, initSystem as default }
