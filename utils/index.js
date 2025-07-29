/**
 * @fileoverview Punto de entrada principal para todas las utilidades
 * @module GlobalUtils
 */

// Este archivo será compilado, por lo que las utilidades se cargarán desde archivos separados
// Los archivos ya están diseñados para funcionar sin imports

// Función de inicialización global
function initGlobalUtils(options = {}) {
  const {
    exposeToWindow = true,
    logLevel = 'DEBUG',
    namespace = '',
    enableLegacySupport = true
  } = options

  // Verificar que las utilidades estén disponibles
  const utils = {}
  
  // Core modules
  if (typeof Logger !== 'undefined') utils.Logger = Logger
  if (typeof DOMUtils !== 'undefined') utils.DOMUtils = DOMUtils
  if (typeof EventManager !== 'undefined') utils.EventManager = EventManager
  if (typeof TimingUtils !== 'undefined') utils.TimingUtils = TimingUtils
  
  // Validation modules
  if (typeof ValidatorUtils !== 'undefined') utils.ValidatorUtils = ValidatorUtils
  if (typeof FormManager !== 'undefined') utils.FormManager = FormManager
  
  // API modules
  if (typeof HTTPClient !== 'undefined') utils.HTTPClient = HTTPClient
  
  // Helper modules
  if (typeof DataUtils !== 'undefined') utils.DataUtils = DataUtils
  if (typeof StringUtils !== 'undefined') utils.StringUtils = StringUtils
  if (typeof StorageUtils !== 'undefined') utils.StorageUtils = StorageUtils

  // Configurar logger si está disponible
  if (utils.Logger && logLevel) {
    const levels = { DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3 }
    utils.Logger.setLevel(levels[logLevel] || 0)
  }

  // Exponer utilidades globalmente solo en el navegador
  if (typeof window !== 'undefined' && exposeToWindow) {
    // Legacy compatibility - mantener nombres anteriores
    if (enableLegacySupport) {
      if (utils.DOMUtils) utils.DOMHelpers = utils.DOMUtils
      if (utils.ValidatorUtils) utils.Validators = utils.ValidatorUtils
      
      // APIManager como wrapper del HTTPClient
      if (utils.HTTPClient) {
        const client = new utils.HTTPClient()
        utils.APIManager = {
          get: (url, options) => client.get(url, options),
          post: (url, data, options) => client.post(url, data, options),
          put: (url, data, options) => client.put(url, data, options),
          patch: (url, data, options) => client.patch(url, data, options),
          delete: (url, options) => client.delete(url, options)
        }
        utils.apiClient = client
        utils.createAPIClient = (baseURL, options) => new utils.HTTPClient(baseURL, options)
      }
    }

    if (namespace) {
      window[namespace] = utils
    } else {
      Object.assign(window, utils)
    }

    // Marcar como cargadas
    window.__GLOBAL_UTILS_LOADED__ = true
    window.__GLOBAL_UTILS_VERSION__ = '2.0.0'

    if (utils.Logger) {
      utils.Logger.success('✨ Utilidades globales v2.0 inicializadas')
      utils.Logger.info(`📦 Módulos cargados: ${Object.keys(utils).length}`)
      
      if (enableLegacySupport) {
        utils.Logger.info('🔄 Soporte legacy habilitado')
      }
    } else {
      console.log('✨ Utilidades globales v2.0 inicializadas')
      console.log(`📦 Módulos cargados: ${Object.keys(utils).length}`)
    }
  }

  return utils
}

// Función para obtener información del sistema de utilidades
function getUtilsInfo() {
  return {
    version: '2.0.0',
    modules: [
      'Logger', 'DOMUtils', 'EventManager', 'TimingUtils',
      'ValidatorUtils', 'FormManager', 'HTTPClient',
      'DataUtils', 'StringUtils', 'StorageUtils'
    ],
    loaded: typeof window !== 'undefined' ? !!window.__GLOBAL_UTILS_LOADED__ : false,
    environment: typeof window !== 'undefined' ? 'browser' : 'node'
  }
}

// Función para limpiar todas las utilidades
function cleanupUtils() {
  if (typeof window !== 'undefined') {
    // Limpiar event listeners
    if (window.EventManager) {
      window.EventManager.cleanup()
    }
    
    // Limpiar forms
    if (window.FormManager) {
      window.FormManager.destroyAll()
    }
    
    const logger = window.Logger || console
    logger.info('🧹 Utilidades limpiadas')
  }
}

// Auto-ejecutar si estamos en el navegador y no se han cargado ya
if (typeof window !== 'undefined' && !window.__GLOBAL_UTILS_LOADED__) {
  // Pequeño delay para asegurar que todas las utilidades estén cargadas
  setTimeout(() => {
    initGlobalUtils()
  }, 10)
}

// Exponer funciones principales
if (typeof window !== 'undefined') {
  window.initGlobalUtils = initGlobalUtils
  window.getUtilsInfo = getUtilsInfo
  window.cleanupUtils = cleanupUtils
}