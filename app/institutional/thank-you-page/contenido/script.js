// ==========================================
// THANK YOU PAGE - LIFERAY FRAGMENT SCRIPT
// ==========================================

const ThankYouPageScript = () => {
  // ==========================================
  // CONFIGURACIÓN THANK YOU PAGE
  // ==========================================
  const THANKYOU_CONFIG = {
    backButtonId: 'thanks-back-to-program', // Correcto según info.json
    logSettings: {
      enableLogs: false, // Control maestro - cambiar a true para activar TODOS los logs
      showErrors: true,  // Siempre mostrar errores críticos
      showWarnings: false // Advertencias opcionales
    }
  }

  // ==========================================
  // SISTEMA DE LOGGING CENTRALIZADO
  // ==========================================

  const Logger = {
    /**
     * Logs informativos (se pueden desactivar)
     */
    info: function(message, ...args) {
      if (THANKYOU_CONFIG.logSettings.enableLogs && typeof console !== 'undefined' && console.log) {
        console.log('[ThankYou]', message, ...args)
      }
    },

    /**
     * Logs de éxito (se pueden desactivar)
     */
    success: function(message, ...args) {
      if (THANKYOU_CONFIG.logSettings.enableLogs && typeof console !== 'undefined' && console.log) {
        console.log('[ThankYou] ✅', message, ...args)
      }
    },

    /**
     * Advertencias (configurables)
     */
    warn: function(message, ...args) {
      if (THANKYOU_CONFIG.logSettings.showWarnings && typeof console !== 'undefined' && console.warn) {
        console.warn('[ThankYou] ⚠️', message, ...args)
      }
    },

    /**
     * Errores críticos (siempre se muestran)
     */
    error: function(message, ...args) {
      if (THANKYOU_CONFIG.logSettings.showErrors && typeof console !== 'undefined' && console.error) {
        console.error('[ThankYou] ❌', message, ...args)
      }
    },

    /**
     * Debug específico (solo cuando logs están activados)
     */
    debug: function(message, ...args) {
      if (THANKYOU_CONFIG.logSettings.enableLogs && typeof console !== 'undefined' && console.debug) {
        console.debug('[ThankYou] 🔍', message, ...args)
      }
    }
  }

  // ==========================================
  // GESIÓN DEL BOTÓN DE REGRESO
  // ==========================================

  const setupBackButton = () => {
    let button = document.getElementById(THANKYOU_CONFIG.backButtonId)
    
    // Si no encontramos el botón por ID, buscar por texto o clase
    if (!button) {
      Logger.warn(`Botón no encontrado por ID: ${THANKYOU_CONFIG.backButtonId}`)
      
      // Buscar por texto "Volver"
      const possibleButtons = document.querySelectorAll('a, button')
      for (let btn of possibleButtons) {
        if (btn.textContent && btn.textContent.toLowerCase().includes('volver')) {
          Logger.debug(`Botón alternativo encontrado: ID="${btn.id}" TEXT="${btn.textContent.trim()}"`)
          button = btn
          break
        }
      }
    }
    
    if (!button) {
      Logger.error(`No se encontró ningún botón con "Volver"`)
      return false
    }

    // Verificar si ya tiene un onClick de React (para evitar duplicar eventos)
    if (button.onclick) {
      Logger.info('Botón ya tiene onClick (React), no agregando script handler')
      
      // Limpiar el href="#" para mejor UX
      if (button.href && button.href.endsWith('#')) {
        button.removeAttribute('href')
        button.style.cursor = 'pointer'
        Logger.debug('Limpiado href="#" del botón React')
      }
      
      return true
    }

    // Solo agregar el evento si no está ya configurado por el script
    if (!button.hasAttribute('data-thankyou-configured')) {
      button.addEventListener('click', function(e) {
        e.preventDefault()
        Logger.info('Navegando usando history.back()')
        
        // Usar history.back() como el botón atrás del navegador
        try {
          window.history.back()
        } catch (error) {
          Logger.error('Error con history.back(), redirigiendo a inicio:', error)
          window.location.href = '/'
        }
      })
      
      // Solo agregar el atributo en entornos que no sean React SSR
      if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
        button.setAttribute('data-thankyou-configured', 'true')
      }
      
      Logger.success('Botón de regreso configurado correctamente')
      return true
    }
    
    Logger.info('Botón ya estaba configurado por script')
    return false
  }

  // ==========================================
  // INICIALIZACIÓN
  // ==========================================

  Logger.info('Script cargado - inicializando sistema de navegación...')

  // DEBUGGING: Mostrar todos los botones/enlaces disponibles
  const allButtons = document.querySelectorAll('a, button')
  Logger.debug('Botones/enlaces encontrados en la página:')
  allButtons.forEach((btn, index) => {
    if (btn.textContent && btn.textContent.toLowerCase().includes('volver')) {
      Logger.debug(`  ${index}: ID="${btn.id}" CLASS="${btn.className}" TEXT="${btn.textContent.trim()}"`)
    }
  })

  // Verificar que estemos en una página de thank you
  const isThankYouPage = document.getElementById(THANKYOU_CONFIG.backButtonId) || 
                        window.location.pathname.includes('thank-you')

  if (!isThankYouPage) {
    Logger.info('No es una página de thank you, saltando inicialización')
    return
  }

  Logger.info('Página de thank you detectada')
  
  // Intentar configurar inmediatamente
  const setupSuccess = setupBackButton()
  
  if (!setupSuccess) {
    Logger.info('Botón no encontrado inicialmente, esperando contenido dinámico...')
    
    // Si no funciona, esperar un poco (para contenido dinámico)
    setTimeout(() => {
      setupBackButton()
    }, 500)

    // Observer para contenido dinámico (Liferay)
    if (typeof MutationObserver !== 'undefined' && document.body) {
      const observer = new MutationObserver(function (mutations) {
        for (const mutation of mutations) {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            for (const node of mutation.addedNodes) {
              if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.id === THANKYOU_CONFIG.backButtonId || 
                    (node.querySelector && node.querySelector(`#${THANKYOU_CONFIG.backButtonId}`))) {
                  Logger.debug('Botón detectado dinámicamente, configurando...')
                  setTimeout(() => {
                    setupBackButton()
                    observer.disconnect() // Desconectar después de configurar
                  }, 100)
                  return
                }
              }
            }
          }
        }
      })

      observer.observe(document.body, { 
        childList: true, 
        subtree: true 
      })
      
      Logger.debug('Observer configurado para contenido dinámico')
    }
  }

  Logger.success('Sistema de navegación inicializado')
}

// ==========================================
// AUTO-EJECUCIÓN PARA LIFERAY
// ==========================================

// Ejecutar inmediatamente si estamos en Liferay (no hay module system)
if (typeof module === 'undefined' && typeof window !== 'undefined') {
  // Verificar si el DOM está listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ThankYouPageScript)
  } else {
    ThankYouPageScript()
  }
  
  // Usar Logger interno para consistencia
  if (typeof console !== 'undefined' && console.log) {
    console.log('[ThankYou] Auto-ejecutándose en Liferay')
  }
}

// ==========================================
// EXPORT PARA REACT/WEBPACK
// ==========================================

export default ThankYouPageScript