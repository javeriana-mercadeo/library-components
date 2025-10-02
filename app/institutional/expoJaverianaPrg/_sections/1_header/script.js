// ===========================================
// SCRIPT - HEADER EXPO JAVERIANA
// ===========================================

/**
 * Sistema de inicializacion para el header de Expo Javeriana
 */
class HeaderExpoSystem {
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
      // Inicializacion aqui

      this.initialized = true
    } catch (error) {
      console.error('[HeaderExpoSystem] Error durante inicializacion:', error)
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
let globalHeaderExpoSystem = null

/**
 * Funcion de inicializacion del sistema
 */
function initSystem() {
  if (typeof window !== 'undefined' && window.headerExpoSystemInitialized) {
    return
  }

  globalHeaderExpoSystem = new HeaderExpoSystem()

  if (typeof window !== 'undefined') {
    window.headerExpoSystemInitialized = true

    window.addEventListener('beforeunload', () => {
      if (globalHeaderExpoSystem) {
        globalHeaderExpoSystem.destroy()
      }
    })
  }

  // Inicializar cuando el DOM este listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      globalHeaderExpoSystem.init()
    })
  } else {
    globalHeaderExpoSystem.init()
  }
}

// Auto-inicializacion
initSystem()

export { HeaderExpoSystem, initSystem as default }
