// script.js - Versión autocontenida para Maestría

// ==========================================
// UTILIDADES
// ==========================================
function onDOMReady(callback) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback)
  } else {
    callback()
  }
}

// ==========================================
// SYSTEM PRINCIPAL
// ==========================================
class MastershipSystem {
  constructor() {
    this.initialized = false
  }

  init() {
    if (this.initialized) return

    try {
      console.log('[MastershipSystem] Inicializando sistema')

      // Aquí el programFormatter o API cargaría los datos
      // Por ahora solo marca como inicializado
      this.initialized = true

      console.log('[MastershipSystem] Sistema inicializado exitosamente')
    } catch (error) {
      console.error('[MastershipSystem] Error durante inicialización:', error)
    }
  }

  destroy() {
    this.initialized = false
    console.log('[MastershipSystem] Sistema destruido')
  }
}

// ==========================================
// INSTANCIA GLOBAL
// ==========================================
let globalMastershipSystem = null

function initMastership() {
  if (!globalMastershipSystem) {
    globalMastershipSystem = new MastershipSystem()
  }
  globalMastershipSystem.init()
}

function initSystem() {
  if (typeof window !== 'undefined' && window.mastershipInitialized) {
    return
  }

  globalMastershipSystem = new MastershipSystem()

  if (typeof window !== 'undefined') {
    window.mastershipInitialized = true

    window.addEventListener('beforeunload', () => {
      if (globalMastershipSystem) {
        globalMastershipSystem.destroy()
      }
    })
  }

  onDOMReady(() => {
    if (typeof requestIdleCallback !== 'undefined') {
      requestIdleCallback(() => initMastership(), { timeout: 2000 })
    } else {
      setTimeout(initMastership, 100)
    }
  })
}

// Auto-inicialización
initSystem()

export { MastershipSystem, initSystem as default }
