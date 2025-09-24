/**
 * Punto de entrada principal para utilidades globales
 * @module GlobalUtilsMain
 */

import { initGlobalUtils as initModularUtils } from './index.js'

function initGlobalUtils(options = {}) {
  return initModularUtils({
    exposeToWindow: true,
    logLevel: 'INFO',
    ...options
  })
}

// Auto-ejecutar si estamos en el navegador y no se han cargado ya
if (typeof window !== 'undefined' && !window.__GLOBAL_UTILS_LOADED__) {
  initGlobalUtils()
}
// Exportar la función para uso manual
export default initGlobalUtils
