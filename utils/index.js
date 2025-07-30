/**
 * @fileoverview Punto de entrada principal para todas las utilidades
 * @module GlobalUtils
 */

// Importar todas las utilidades con named imports
import { LogLevel, Logger } from './core/logger.js'
import { DOMUtils } from './core/dom.js'
import { EventManager } from './core/events.js'
import { TimingUtils } from './core/timing.js'
import { ValidatorUtils } from './validation/validators.js'
import { FormManager } from './validation/form-manager.js'
import { HTTPClient } from './api/http-client.js'
import { DataUtils } from './helpers/data-utils.js'
import { StringUtils } from './helpers/string-utils.js'
import { StorageUtils } from './helpers/storage-utils.js'

// Función de inicialización global
function initGlobalUtils(options = {}) {
  const { exposeToWindow = true, logLevel = 'DEBUG', namespace = '', enableLegacySupport = true } = options

  // Configurar logger si está disponible
  if (Logger && logLevel) {
    const levels = { DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3 }
    if (Logger.setLevel) {
      Logger.setLevel(levels[logLevel] || 0)
    }
  }

  // Exponer utilidades globalmente solo en el navegador
  if (typeof window !== 'undefined' && exposeToWindow) {
    const utils = {
      LogLevel,
      Logger,
      DOMUtils,
      EventManager,
      TimingUtils,
      ValidatorUtils,
      FormManager,
      HTTPClient,
      DataUtils,
      StringUtils,
      StorageUtils
    }

    // Legacy compatibility - mantener nombres anteriores
    if (enableLegacySupport) {
      if (DOMUtils) utils.DOMHelpers = DOMUtils
      if (ValidatorUtils) utils.Validators = ValidatorUtils

      // APIManager como wrapper del HTTPClient
      if (HTTPClient) {
        try {
          const client = new HTTPClient()
          utils.APIManager = {
            get: (url, options) => client.get(url, options),
            post: (url, data, options) => client.post(url, data, options),
            put: (url, data, options) => client.put(url, data, options),
            patch: (url, data, options) => client.patch(url, data, options),
            delete: (url, options) => client.delete(url, options)
          }
          utils.apiClient = client
          utils.createAPIClient = (baseURL, options) => new HTTPClient(baseURL, options)
        } catch (error) {
          console.warn('Error creating HTTPClient instance:', error)
        }
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

    if (Logger && Logger.success) {
      Logger.success('✨ Utilidades globales v2.0 inicializadas')
      Logger.info(`📦 Módulos cargados: ${Object.keys(utils).length}`)

      if (enableLegacySupport) {
        Logger.info('🔄 Soporte legacy habilitado')
      }
    } else {
      console.log('✨ Utilidades globales v2.0 inicializadas')
      console.log(`📦 Módulos cargados: ${Object.keys(utils).length}`)
    }

    return utils
  }

  return {
    LogLevel,
    Logger,
    DOMUtils,
    EventManager,
    TimingUtils,
    ValidatorUtils,
    FormManager,
    HTTPClient,
    DataUtils,
    StringUtils,
    StorageUtils
  }
}

// Función para obtener información del sistema de utilidades
function getUtilsInfo() {
  return {
    version: '2.0.0',
    modules: [
      'LogLevel',
      'Logger',
      'DOMUtils',
      'EventManager',
      'TimingUtils',
      'ValidatorUtils',
      'FormManager',
      'HTTPClient',
      'DataUtils',
      'StringUtils',
      'StorageUtils'
    ],
    loaded: typeof window !== 'undefined' ? !!window.__GLOBAL_UTILS_LOADED__ : false,
    environment: typeof window !== 'undefined' ? 'browser' : 'node'
  }
}

// Auto-ejecutar si estamos en el navegador y no se han cargado ya
if (typeof window !== 'undefined' && !window.__GLOBAL_UTILS_LOADED__) {
  // Pequeño delay para asegurar que todas las utilidades estén cargadas
  setTimeout(() => {
    initGlobalUtils()
  }, 10)
}

// Exponer funciones principales en window
if (typeof window !== 'undefined') {
  window.initGlobalUtils = initGlobalUtils
  window.getUtilsInfo = getUtilsInfo
}

// Exportar funciones para uso como módulos
export {
  initGlobalUtils,
  getUtilsInfo,
  LogLevel,
  Logger,
  DOMUtils,
  EventManager,
  TimingUtils,
  ValidatorUtils,
  FormManager,
  HTTPClient,
  DataUtils,
  StringUtils,
  StorageUtils
}
