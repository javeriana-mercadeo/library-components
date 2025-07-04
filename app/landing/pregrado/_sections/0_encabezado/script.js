// ===========================================
// SCRIPT PRINCIPAL - HEADER Y MODAL
// ===========================================

// Importar módulos separados
import HeaderManager from './headerManager.js'
import FormManager from './formManager.js'

// ███████████████████████████████████████████████████████████████████████████████
// █                        UTILIDADES DE ESPERA                               █
// ███████████████████████████████████████████████████████████████████████████████

// Función para esperar a que las utilidades globales estén disponibles
function waitForGlobalUtils() {
  return new Promise((resolve) => {
    const checkUtils = () => {
      if (typeof window !== 'undefined' && 
          window.__GLOBAL_UTILS_LOADED__ &&
          window.Logger && 
          window.DOMHelpers && 
          window.EventManager && 
          window.TimingUtils && 
          window.Validators) {
        resolve(true)
      } else {
        setTimeout(checkUtils, 10) // Reducir el intervalo para mayor velocidad
      }
    }
    checkUtils()
  })
}

// ███████████████████████████████████████████████████████████████████████████████
// █                        INICIALIZACIÓN GENERAL                              █
// ███████████████████████████████████████████████████████████████████████████████

const AppSystem = {
  async init() {
    // Esperar a que las utilidades globales estén disponibles
    await waitForGlobalUtils()
    
    Logger.debug('Inicializando aplicación...')

    try {
      // Inicializar sistemas por separado
      const headerSystems = HeaderManager.init()
      const formSystems = await FormManager.init()

      // Reporte final
      const allSystems = { ...headerSystems, ...formSystems }
      const totalActiveSystems = Object.values(allSystems).filter(Boolean).length

      Logger.success(`Aplicación iniciada - ${totalActiveSystems} sistemas activos`)
      return allSystems
    } catch (error) {
      Logger.warning('Aplicación iniciada con limitaciones - Error al cargar datos externos')

      // Inicializar sistemas básicos sin datos externos
      const headerSystems = HeaderManager.init()
      const formSystems = await FormManager.init()

      return { ...headerSystems, ...formSystems }
    }
  },

  cleanup() {
    if (typeof Logger !== 'undefined') {
      Logger.debug('Limpiando aplicación...')
    }
    HeaderManager.cleanup()
    FormManager.cleanup()
  }
}

// ===========================================
// AUTO-INICIALIZACIÓN PARA LIFERAY
// ===========================================

function initHeaderModal() {
  const waitForDOM = () => {
    return new Promise((resolve) => {
      if (typeof document === 'undefined') {
        setTimeout(() => waitForDOM().then(resolve), 50)
        return
      }

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resolve)
      } else {
        resolve()
      }
    })
  }

  waitForDOM().then(async () => {
    try {
      // Agregar un pequeño delay para asegurar que React haya terminado de renderizar
      await new Promise(resolve => setTimeout(resolve, 100))
      
      await AppSystem.init()

      // Cleanup global al cambiar de página
      window.addEventListener('beforeunload', () => {
        AppSystem.cleanup()
      })
    } catch (error) {
      console.error('Error al inicializar aplicación:', error)
    }
  })
}

// Auto-ejecutar si no es un módulo
if (typeof module === 'undefined') {
  initHeaderModal()
}

// Exportar para uso como módulo (si es necesario)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = initHeaderModal
}

// Para compatibilidad con diferentes sistemas
if (typeof window !== 'undefined') {
  window.initHeaderModal = initHeaderModal
}

// Exportar por defecto para Next.js
export default initHeaderModal
