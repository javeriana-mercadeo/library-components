/**
 * ARCHIVO LEGACY - MANTENIDO POR COMPATIBILIDAD
 *
 * ⚠️  NOTA: Este archivo se mantiene por compatibilidad con código existente.
 * 📦 Para nuevos proyectos, usa: import { Logger, DOMUtils, etc } from './utils/index.js'
 * 🔄 Este archivo redirige automáticamente a la nueva estructura modular.
 */

import { initGlobalUtils as initModularUtils } from './index.js'

function initGlobalUtils() {
  console.warn('⚠️ utils/main.js es legacy. Migra a: import { initGlobalUtils } from "./utils/index.js"')
  return initModularUtils({
    enableLegacySupport: true,
    exposeToWindow: true
  })
}

// Auto-ejecutar si estamos en el navegador y no se han cargado ya
if (typeof window !== 'undefined' && !window.__GLOBAL_UTILS_LOADED__) {
  initGlobalUtils()
}
// Exportar la función para uso manual
export default initGlobalUtils
