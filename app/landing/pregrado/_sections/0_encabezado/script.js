// ===========================================
// SCRIPT PRINCIPAL - HEADER Y MODAL
// ===========================================

// Importar módulos separados
import { HeaderManager } from './headerManager.js'
import { ModalForm } from './components/modalFrom.js'

// ███████████████████████████████████████████████████████████████████████████████
// █                        UTILIDADES DE ESPERA                               █
// ███████████████████████████████████████████████████████████████████████████████

// Función para esperar a que las utilidades globales estén disponibles
function waitForGlobalUtils() {
  return new Promise((resolve, reject) => {
    let attempts = 0
    const maxAttempts = 500 // 5 segundos máximo

    const checkUtils = () => {
      attempts++

      if (
        typeof window !== 'undefined' &&
        window.__GLOBAL_UTILS_LOADED__ &&
        window.Logger &&
        window.DOMHelpers &&
        window.EventManager &&
        window.TimingUtils &&
        window.Validators &&
        window.APIManager &&
        window.FormManager
      ) {
        resolve(true)
      } else if (attempts >= maxAttempts) {
        reject(new Error('Timeout: Las utilidades globales no se cargaron después de 5 segundos'))
      } else {
        setTimeout(checkUtils, 10)
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
    try {
      // Esperar a que las utilidades globales estén disponibles
      await waitForGlobalUtils()

      // Exponer ModalForm globalmente para que ContactModal pueda accederlo
      window.ModalForm = ModalForm

      // Inicializar sistemas por separado
      const headerSystems = HeaderManager.init()
      const formSystems = await ModalForm.init()

      // Reporte final
      const allSystems = { ...headerSystems, ...formSystems }
      const totalActiveSystems = Object.values(allSystems).filter(Boolean).length

      return allSystems
    } catch (error) {
      console.error('Error al inicializar la aplicación:', error.message)
      return {
        mobileMenu: false,
        contactModal: false,
        formAnimations: false,
        locationManager: false,
        formValidation: false
      }
    }
  },

  cleanup() {
    // Solo limpiar si las utilidades están disponibles
    if (typeof window !== 'undefined' && window.HeaderManager && window.ModalForm) {
      HeaderManager.cleanup()
      ModalForm.cleanup()
    }
  }
}

// ===========================================
// AUTO-INICIALIZACIÓN PARA LIFERAY
// ===========================================

function initHeaderSystem() {
  const waitForDOM = () => {
    return new Promise(resolve => {
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
      console.error('Error al inicializar sistema del header:', error)
    }
  })
}

// Auto-ejecutar si no es un módulo
if (typeof module === 'undefined') {
  initHeaderSystem()
}

if (typeof window !== 'undefined') {
  window.initHeaderSystem = initHeaderSystem
}

export default initHeaderSystem
