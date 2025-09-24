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

    // Verificar disponibilidad de utilidades
    if (typeof StringUtils === 'undefined' || !StringUtils) {
      throw new Error('StringUtils no está disponible. Verificar carga de utilidades globales.')
    }

    // Validar código de programa
    const isEmptyCode = StringUtils.isEmpty
      ? StringUtils.isEmpty(codProgram?.toString()?.trim())
      : !codProgram || codProgram.toString().trim().length === 0

    if (!codProgram || isEmptyCode) throw new Error('Código de programa no definido o vacío')

    // Validar que sea un código válido (números y letras)
    const cleanCode = codProgram.toString().replace(/[-_]/g, '')
    const isValidCode = StringUtils.isAlphanumeric ? StringUtils.isAlphanumeric(cleanCode) : /^[a-zA-Z0-9]+$/.test(cleanCode)
    if (!isValidCode) throw new Error(`Código de programa inválido: ${codProgram}`)

    updateDisplay(`Código de programa: ${codProgram}`)
    await loadDataProgram(codProgram)
  } catch (error) {
    // Usar Logger si está disponible, sino console
    if (typeof Logger !== 'undefined' && Logger.error) {
      Logger.error('💥 Error al inicializar cargador:', error)
    } else {
      console.error('💥 Error al inicializar cargador:', error)
    }

    updateDisplay(`Error: ${error.message}`, true)

    // Limpiar cache en caso de error si DOMUpdater está disponible
    if (typeof DOMUpdater !== 'undefined' && DOMUpdater.clearCache) {
      DOMUpdater.clearCache()
    }
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
