/**
 * @fileoverview Global Assets - Sistema de inicialización de componentes globales
 * @description Punto de entrada principal que inicializa todos los componentes y utilidades
 * globales necesarios para el funcionamiento de la biblioteca de componentes PUJ.
 * Este archivo se compila y despliega en producción para garantizar que todos los
 * componentes interactivos estén disponibles en el entorno Liferay.
 * @version 1.0.0
 * @author Pontificia Universidad Javeriana
 */

// ==========================================
// IMPORTACIONES
// ==========================================

// Utilidades globales del sistema
import initGlobalUtils from '../../utils/main'

// Componentes globales
import initButtonSystem from '../../components/button/script.js'
import initModalSystem from '../../components/modal/script.js'
import initCacheBanner from '../../common/cacheBanner/script.js'

// ==========================================
// CONFIGURACIÓN DE COMPONENTES
// ==========================================

/**
 * @typedef {Object} ComponentConfig
 * @property {string} name - Nombre del componente para logging
 * @property {Function|null} init - Función de inicialización (null si auto-ejecutable)
 */

/**
 * Registro de componentes globales
 * Todos los componentes se inicializan de forma manual y consistente
 */
const COMPONENTS = [
  { name: 'GlobalUtils', init: initGlobalUtils },
  { name: 'ButtonSystem', init: initButtonSystem },
  { name: 'ModalSystem', init: initModalSystem },
  { name: 'CacheBanner', init: initCacheBanner }
]

// ==========================================
// INICIALIZACIÓN
// ==========================================

/**
 * Inicializa todos los componentes registrados
 */
const initializeComponents = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('[GlobalAssets] 🚀 Inicializando componentes globales...')
  }

  // Inicializar cada componente
  COMPONENTS.forEach(({ name, init }) => {
    try {
      // Todos los componentes se inicializan de forma consistente
      if (typeof init === 'function') {
        init()
      }

      if (process.env.NODE_ENV === 'development') {
        console.log(`[GlobalAssets] ✅ ${name} inicializado`)
      }
    } catch (error) {
      console.error(`[GlobalAssets] ❌ Error al inicializar ${name}:`, error)
    }
  })

  // Exponer API global para debugging/compatibilidad con Liferay
  if (typeof window !== 'undefined') {
    window.PUJ_GlobalAssets = {
      version: '1.0.0',
      components: COMPONENTS.map(c => c.name)
    }
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('[GlobalAssets] ✨ Inicialización completa')
  }
}

// ==========================================
// AUTO-INICIALIZACIÓN
// ==========================================

// Inicializar cuando el DOM esté listo (o inmediatamente si ya está listo)
if (typeof document !== 'undefined') {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initializeComponents()
  } else {
    document.addEventListener('DOMContentLoaded', initializeComponents, { once: true })
  }
}

// ==========================================
// EXPORTS
// ==========================================

export default initializeComponents
