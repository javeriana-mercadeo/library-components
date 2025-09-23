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
  const { exposeToWindow = true, logLevel = 'INFO', namespace = '' } = options

  // Configurar logger si está disponible
  if (Logger && logLevel) {
    const levels = { DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3 }
    if (Logger.setLevel) {
      Logger.setLevel(levels[logLevel] || 1)
    }
  }

  // Crear objeto de utilidades limpio
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

  // Exponer utilidades globalmente solo en el navegador
  if (typeof window !== 'undefined' && exposeToWindow) {
    if (namespace) {
      window[namespace] = utils
    } else {
      // Exponer cada utilidad individualmente
      Object.assign(window, utils)
    }

    // Ejecutar limpieza automática de cookies para prevenir error 431
    try {
      if (StorageUtils && StorageUtils.cleanLargeCookies) {
        StorageUtils.cleanLargeCookies()
      }
    } catch (error) {
      // Silenciar errores de limpieza de cookies en inicialización
      if (Logger && Logger.debug) {
        Logger.debug('Error en limpieza automática de cookies:', error)
      }
    }

    // Marcar como cargadas
    window.__GLOBAL_UTILS_LOADED__ = true
    window.__GLOBAL_UTILS_VERSION__ = '3.0.0'

    return utils
  }

  return utils
}

// Función para obtener información del sistema de utilidades
function getUtilsInfo() {
  return {
    version: '3.0.0',
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
