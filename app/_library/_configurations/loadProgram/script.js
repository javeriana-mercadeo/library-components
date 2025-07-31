// ===========================================
// SISTEMA MODULAR DE CARGA DE PROGRAMAS
// ===========================================
// Importa módulos organizados por responsabilidad

import { updateDisplay } from './modules/utils.js'
import { initializeApiClient } from './modules/api-client.js'
import { loadDataProgram } from './modules/program-processor.js'
import { DOMUpdater } from './modules/dom-updater.js'

const codProgram = configuration['codeProgram'] // Tomada de liferay

// ===========================================
// INICIALIZACIÓN PRINCIPAL
// ===========================================

const initializeLoader = async () => {
  try {
    // Inicializar cliente API
    initializeApiClient()

    // Validar código de programa
    if (!codProgram || StringUtils.isEmpty(codProgram.toString().trim())) {
      throw new Error('Código de programa no definido o vacío')
    }

    // Validar que sea un código válido (números y letras)
    if (!StringUtils.isAlphanumeric(codProgram.toString().replace(/[-_]/g, ''))) {
      throw new Error(`Código de programa inválido: ${codProgram}`)
    }

    updateDisplay(`Código de programa: ${codProgram}`)

    // Cargar datos del programa
    await loadDataProgram(codProgram)
  } catch (error) {
    Logger.error('💥 Error al inicializar cargador:', error)
    updateDisplay(`Error: ${error.message}`, true)

    // Limpiar cache en caso de error
    DOMUpdater.clearCache()
  }
}

// ===========================================
// CONFIGURACIÓN ADICIONAL Y LISTENERS
// ===========================================

// Función para inicializar listeners de la aplicación
const initializeEventListeners = () => {
  // Cleanup cuando la página se descarga
  if (EventManager && EventManager.add) {
    EventManager.add(window, 'beforeunload', () => {
      DOMUpdater.clearCache()
      if (EventManager.cleanup) EventManager.cleanup()
    })
  } else {
    // Fallback básico sin EventManager
    window.addEventListener('beforeunload', () => {
      DOMUpdater.clearCache()
    })
  }
}

// ===========================================
// EJECUCIÓN PRINCIPAL
// ===========================================

// Ejecutar cuando el DOM esté listo
DOMUtils.isReady(async () => {
  await initializeLoader()
  initializeEventListeners()

  // Configurar interceptors del API client después de la inicialización
  const apiClient = window.apiClient
  if (apiClient && apiClient.addErrorInterceptor) {
    apiClient.addErrorInterceptor(async (error, config) => {
      Logger.error(`❌ API Error: ${config.method} ${config.url}`, error)
      throw error
    })
  }
})

// Exportar funciones principales para testing/debugging
if (typeof window !== 'undefined') {
  window.loadProgramUtils = {
    loadDataProgram,
    initializeLoader,
    updateDisplay
  }
}
