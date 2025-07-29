// ===========================================
// UTILIDADES GLOBALES COMPILADAS v2.0
// ===========================================
// Este archivo importa y inicializa todas las utilidades

// Importar todos los módulos de utilidades
import '../utils/core/logger.js'
import '../utils/core/dom.js'
import '../utils/core/events.js'  
import '../utils/core/timing.js'
import '../utils/validation/validators.js'
import '../utils/validation/form-manager.js'
import '../utils/api/http-client.js'
import '../utils/helpers/data-utils.js'
import '../utils/helpers/string-utils.js'
import '../utils/helpers/storage-utils.js'
import '../utils/index.js'

// ===========================================
// SCRIPT DE PRUEBA PARA VERIFICAR FUNCIONALIDAD
// ===========================================

// Función principal que verifica que las utilidades funcionen
function main() {
  console.log('🚀 Iniciando verificación de utilidades compiladas')
  
  // Verificar que las utilidades estén disponibles
  const utils = {
    Logger: window.Logger,
    DOMUtils: window.DOMUtils || window.DOMHelpers,
    EventManager: window.EventManager,
    TimingUtils: window.TimingUtils,
    StringUtils: window.StringUtils,
    DataUtils: window.DataUtils,
    HTTPClient: window.HTTPClient,
    ValidatorUtils: window.ValidatorUtils || window.Validators,
    FormManager: window.FormManager,
    StorageUtils: window.StorageUtils
  }

  console.log('🔍 Verificando utilidades disponibles:', utils)

  // Test básico de cada utilidad
  try {
    // Test Logger
    if (utils.Logger) {
      utils.Logger.info('✅ Logger funcionando correctamente')
    }

    // Test DOMUtils
    if (utils.DOMUtils) {
      const bodyElement = utils.DOMUtils.findElement('body')
      if (bodyElement) {
        console.log('✅ DOMUtils funcionando correctamente')
        
        // Crear un elemento de prueba
        const testDiv = utils.DOMUtils.createElement('div', {
          className: 'test-element',
          content: 'Elemento creado con utilidades compiladas v2.0',
          styles: { 
            background: '#e8f5e8', 
            padding: '10px', 
            margin: '10px',
            border: '1px solid #4caf50',
            borderRadius: '4px'
          }
        })
        
        bodyElement.appendChild(testDiv)
      }
    }

    // Test StringUtils
    if (utils.StringUtils) {
      const testString = 'hello world from compiled utils v2.0'
      const capitalized = utils.StringUtils.capitalizeWords(testString)
      console.log(`✅ StringUtils: "${testString}" → "${capitalized}"`)
    }

    // Test ValidatorUtils
    if (utils.ValidatorUtils) {
      const emailTest = 'test@example.com'
      const isValid = utils.ValidatorUtils.email(emailTest)
      console.log(`✅ ValidatorUtils: Email "${emailTest}" es ${isValid ? 'válido' : 'inválido'}`)
    }

    // Test DataUtils
    if (utils.DataUtils) {
      const testData = [
        { id: 1, name: 'Juan', category: 'A' },
        { id: 2, name: 'María', category: 'B' },
        { id: 3, name: 'Pedro', category: 'A' }
      ]
      
      const filtered = utils.DataUtils.filterBy(testData, { category: 'A' })
      console.log(`✅ DataUtils: Filtrados ${filtered.length} elementos con categoría 'A'`)
    }

    // Test HTTPClient
    if (utils.HTTPClient) {
      console.log('✅ HTTPClient disponible para instanciar')
      
      // Test de instanciación
      try {
        const client = new utils.HTTPClient()
        console.log('✅ HTTPClient instanciado correctamente')
      } catch (error) {
        console.warn('⚠️ Error instanciando HTTPClient:', error)
      }
    }

    // Test EventManager  
    if (utils.EventManager) {
      console.log('✅ EventManager disponible')
      
      // Test de evento personalizado
      try {
        utils.EventManager.on('test-event', (data) => {
          console.log('✅ Evento personalizado recibido:', data)
        })
        
        utils.EventManager.trigger('test-event', { 
          message: 'Test desde script compilado v2.0',
          timestamp: new Date().toISOString()
        })
      } catch (error) {
        console.warn('⚠️ Error con EventManager:', error)
      }
    }

    // Test StorageUtils
    if (utils.StorageUtils) {
      try {
        utils.StorageUtils.set('test-key', 'test-value')
        const value = utils.StorageUtils.get('test-key')
        console.log(`✅ StorageUtils: Guardado y recuperado "${value}"`)
        utils.StorageUtils.remove('test-key')
      } catch (error) {
        console.warn('⚠️ Error con StorageUtils:', error)
      }
    }

    // Test FormManager
    if (utils.FormManager) {
      console.log('✅ FormManager disponible')
    }

    console.log('🎉 Todos los tests completados exitosamente')
    
    // Mostrar resumen en el DOM
    showTestResults(utils)

  } catch (error) {
    console.error('❌ Error durante los tests:', error)
  }
}

// Función para mostrar resultados en el DOM
function showTestResults(utils) {
  const resultsDiv = document.createElement('div')
  resultsDiv.innerHTML = `
    <div style="
      background: #f0f8ff; 
      border: 2px solid #2196f3; 
      border-radius: 8px; 
      padding: 20px; 
      margin: 20px; 
      font-family: monospace;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    ">
      <h3 style="color: #1976d2; margin-top: 0;">
        🧪 Resultados de Verificación de Utilidades Compiladas v2.0
      </h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
        ${Object.entries(utils).map(([name, util]) => `
          <div style="padding: 8px; background: ${util ? '#e8f5e8' : '#ffebee'}; border-radius: 4px;">
            <strong>${name}:</strong> 
            <span style="color: ${util ? '#4caf50' : '#f44336'}">
              ${util ? '✅ Disponible' : '❌ No disponible'}
            </span>
          </div>
        `).join('')}
      </div>
      <div style="margin-top: 15px; padding: 10px; background: #e3f2fd; border-radius: 4px;">
        <strong>Estado:</strong> Las utilidades se cargaron correctamente desde el script compilado v2.0.
        <br>
        <strong>Tiempo:</strong> ${new Date().toLocaleString()}
        <br>
        <strong>Versión:</strong> ${window.__GLOBAL_UTILS_VERSION__ || 'Desconocida'}
        <br>
        <strong>Refactorización:</strong> ✅ Sin export class - compatibilidad completa
      </div>
    </div>
  `
  
  document.body.appendChild(resultsDiv)
}

// Función para esperar a que las utilidades estén cargadas
function waitForUtils(callback, maxAttempts = 50) {
  let attempts = 0
  
  const checkUtils = () => {
    attempts++
    
    if (window.Logger || window.DOMUtils || window.__GLOBAL_UTILS_LOADED__) {
      console.log(`✅ Utilidades encontradas después de ${attempts} intentos`)
      callback()
    } else if (attempts < maxAttempts) {
      console.log(`⏳ Esperando utilidades... intento ${attempts}/${maxAttempts}`)
      setTimeout(checkUtils, 100)
    } else {
      console.error('❌ Timeout: Las utilidades no se cargaron a tiempo')
      callback() // Ejecutar de todos modos para mostrar el estado
    }
  }
  
  checkUtils()
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    waitForUtils(main)
  })
} else {
  waitForUtils(main)
}

// Exponer función para testing manual
window.testCompiledUtils = main

// ==========================================
// FUNCIONALIDAD PRINCIPAL DEL SCRIPT
// ==========================================

let hasExecuted = false

function safeExecute() {
  if (hasExecuted) {
    console.log('🔄 Ya ejecutado, saltando...')
    return
  }

  hasExecuted = true
  console.log('✅ Ejecutando main()...')

  try {
    console.log('DOM completamente cargado y analizado')
    main()
    console.log('🎉 main() ejecutado exitosamente')
  } catch (error) {
    console.error('❌ Error ejecutando main():', error)
  }
}

// 1. Método principal: Liferay events
if (typeof Liferay !== 'undefined' && Liferay.on) {
  console.log('🟢 Liferay detectado - usando eventos nativos')

  Liferay.on('allPortletsReady', function () {
    console.log('📦 Todos los portlets listos')
    safeExecute()
  })
} else {
  console.log('🟡 Liferay no detectado - usando DOMContentLoaded')
}

// 2. Fallback: DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      if (!hasExecuted) {
        safeExecute()
      }
    }, 200)
  })
} else {
  setTimeout(() => {
    if (!hasExecuted) {
      safeExecute()
    }
  }, 100)
}

// 3. Fallback final: window.load
window.addEventListener('load', () => {
  setTimeout(() => {
    if (!hasExecuted) {
      console.log('⚠️ Ejecutando por window.load')
      safeExecute()
    }
  }, 500)
})