// ===========================================
// SCRIPT - FOOTER EXPO JAVERIANA
// ===========================================

/**
 * Sistema de inicialización para footer
 */
class FooterExpoSystem {
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
      console.error('[FooterExpoSystem] Error durante inicialización:', error)
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
let globalFooterExpoSystem = null

/**
 * Función de inicialización del sistema
 */
function initSystem() {
  if (typeof window !== 'undefined' && window.footerExpoSystemInitialized) {
    return
  }

  globalFooterExpoSystem = new FooterExpoSystem()

  if (typeof window !== 'undefined') {
    window.footerExpoSystemInitialized = true

    window.addEventListener('beforeunload', () => {
      if (globalFooterExpoSystem) {
        globalFooterExpoSystem.destroy()
      }
    })
  }

  // Inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      globalFooterExpoSystem.init()
    })
  } else {
    globalFooterExpoSystem.init()
  }
}

// Auto-inicialización
initSystem()

export { FooterExpoSystem, initSystem as default }
