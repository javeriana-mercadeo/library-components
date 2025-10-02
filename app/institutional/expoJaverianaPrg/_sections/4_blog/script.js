// ===========================================
// SCRIPT - BLOG EXPO JAVERIANA
// ===========================================

/**
 * Sistema de inicialización para blog
 */
class BlogExpoSystem {
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
      console.error('[BlogExpoSystem] Error durante inicialización:', error)
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
let globalBlogExpoSystem = null

/**
 * Función de inicialización del sistema
 */
function initSystem() {
  if (typeof window !== 'undefined' && window.blogExpoSystemInitialized) {
    return
  }

  globalBlogExpoSystem = new BlogExpoSystem()

  if (typeof window !== 'undefined') {
    window.blogExpoSystemInitialized = true

    window.addEventListener('beforeunload', () => {
      if (globalBlogExpoSystem) {
        globalBlogExpoSystem.destroy()
      }
    })
  }

  // Inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      globalBlogExpoSystem.init()
    })
  } else {
    globalBlogExpoSystem.init()
  }
}

// Auto-inicialización
initSystem()

export { BlogExpoSystem, initSystem as default }
