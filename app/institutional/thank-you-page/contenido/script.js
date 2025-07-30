/**
 * @fileoverview Thank You Page - Navigation Context Script
 * @description Sistema de navegacion contextual para capturar URL de origen y personalizar boton "Volver al programa"
 * @version 1.0.0
 * @compatible Liferay DXP - Vanilla JavaScript only
 */

;(function () {
  'use strict'

  // ===============================================
  // CONFIGURACION Y CONSTANTES
  // ===============================================

  const CONFIG = {
    // Selectores de elementos
    backButtonId: 'thanks-back-to-program',
    containerSelector: '[data-dmpa-element-id="thanks"]',
    
    // Claves para almacenamiento
    storageKeys: {
      previousUrl: 'puj_previous_url',
      programName: 'puj_program_name',
      timestamp: 'puj_navigation_timestamp'
    },
    
    // Mapeo de URLs a nombres de programas
    programMap: {
      '/landing/pregrado': 'pregrado',
      '/landing/doctorado': 'doctorado',
      '/landing/mba': 'MBA',
      '/landing/maestria-especializacion': 'maestria',
      '/landing/eclesiasticos': 'programa eclesiastico'
    },
    
    // Configuracion de timeouts
    maxWaitTime: 5000, // 5 segundos maximo para encontrar elementos
    checkInterval: 100, // Verificar cada 100ms
    sessionTTL: 30 * 60 * 1000 // 30 minutos TTL para session data
  }

  // ===============================================
  // UTILIDADES DE LOGGING
  // ===============================================

  const Logger = {
    prefix: '[ThankYou-Nav]',
    
    debug: function (message, ...args) {
      if (typeof console !== 'undefined' && console.log) {
        console.log(`${this.prefix} DEBUG ${message}`, ...args)
      }
    },
    
    info: function (message, ...args) {
      if (typeof console !== 'undefined' && console.info) {
        console.info(`${this.prefix} INFO ${message}`, ...args)
      }
    },
    
    warn: function (message, ...args) {
      if (typeof console !== 'undefined' && console.warn) {
        console.warn(`${this.prefix} WARN ${message}`, ...args)
      }
    },
    
    error: function (message, ...args) {
      if (typeof console !== 'undefined' && console.error) {
        console.error(`${this.prefix} ERROR ${message}`, ...args)
      }
    }
  }

  // ===============================================
  // UTILIDADES DE ALMACENAMIENTO
  // ===============================================

  const StorageManager = {
    /**
     * Verificar si sessionStorage esta disponible
     */
    isAvailable: function () {
      try {
        if (typeof Storage === 'undefined' || typeof sessionStorage === 'undefined') {
          return false
        }
        const testKey = '__storage_test__'
        sessionStorage.setItem(testKey, 'test')
        sessionStorage.removeItem(testKey)
        return true
      } catch (e) {
        return false
      }
    },

    /**
     * Guardar datos con timestamp
     */
    set: function (key, value) {
      if (!this.isAvailable()) {
        Logger.warn('SessionStorage no disponible')
        return false
      }

      try {
        const data = {
          value: value,
          timestamp: Date.now()
        }
        sessionStorage.setItem(key, JSON.stringify(data))
        Logger.debug(`Guardado en sessionStorage: ${key} = ${value}`)
        return true
      } catch (e) {
        Logger.error('Error guardando en sessionStorage:', e)
        return false
      }
    },

    /**
     * Obtener datos verificando TTL
     */
    get: function (key, ttl = CONFIG.sessionTTL) {
      if (!this.isAvailable()) {
        Logger.warn('SessionStorage no disponible')
        return null
      }

      try {
        const item = sessionStorage.getItem(key)
        if (!item) return null

        const data = JSON.parse(item)
        const now = Date.now()

        // Verificar TTL si se especifica
        if (ttl && data.timestamp && (now - data.timestamp) > ttl) {
          Logger.debug(`Dato expirado removido: ${key}`)
          this.remove(key)
          return null
        }

        Logger.debug(`Recuperado de sessionStorage: ${key} = ${data.value}`)
        return data.value
      } catch (e) {
        Logger.error('Error leyendo de sessionStorage:', e)
        return null
      }
    },

    /**
     * Remover dato especifico
     */
    remove: function (key) {
      if (!this.isAvailable()) return false

      try {
        sessionStorage.removeItem(key)
        Logger.debug(`Removido de sessionStorage: ${key}`)
        return true
      } catch (e) {
        Logger.error('Error removiendo de sessionStorage:', e)
        return false
      }
    },

    /**
     * Limpiar todos los datos del namespace
     */
    clear: function () {
      if (!this.isAvailable()) return false

      try {
        Object.values(CONFIG.storageKeys).forEach(key => {
          sessionStorage.removeItem(key)
        })
        Logger.debug('SessionStorage limpiado')
        return true
      } catch (e) {
        Logger.error('Error limpiando sessionStorage:', e)
        return false
      }
    }
  }

  // ===============================================
  // UTILIDADES DE NAVEGACION
  // ===============================================

  const NavigationUtils = {
    /**
     * Extraer nombre del programa desde una URL
     */
    extractProgramName: function (url) {
      if (!url || typeof url !== 'string') {
        return 'programa'
      }

      // Normalizar URL
      const normalizedUrl = url.toLowerCase()

      // Buscar coincidencias en el mapa de programas
      for (const [path, name] of Object.entries(CONFIG.programMap)) {
        if (normalizedUrl.includes(path.toLowerCase())) {
          Logger.debug(`Programa detectado: ${name} desde ${path}`)
          return name
        }
      }

      // Intentar extraer desde el path si contiene palabras clave
      const pathKeywords = {
        pregrado: 'pregrado',
        doctorado: 'doctorado',
        mba: 'MBA',
        maestria: 'maestria',
        especializacion: 'especializacion',
        eclesiasticos: 'programa eclesiastico'
      }

      for (const [keyword, name] of Object.entries(pathKeywords)) {
        if (normalizedUrl.includes(keyword)) {
          Logger.debug(`Programa inferido por keyword: ${name}`)
          return name
        }
      }

      Logger.debug('No se pudo determinar el programa, usando fallback')
      return 'programa'
    },

    /**
     * Obtener parametros de query string
     */
    getQueryParams: function () {
      try {
        if (typeof URLSearchParams === 'undefined') {
          // Fallback para browsers antiguos
          const params = {}
          const queryString = window.location.search.substring(1)
          const vars = queryString.split('&')

          for (let i = 0; i < vars.length; i++) {
            const pair = vars[i].split('=')
            if (pair.length === 2) {
              params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1])
            }
          }
          return params
        }

        const params = new URLSearchParams(window.location.search)
        const result = {}
        for (const [key, value] of params.entries()) {
          result[key] = value
        }
        return result
      } catch (e) {
        Logger.error('Error obteniendo query params:', e)
        return {}
      }
    },

    /**
     * Obtener contexto de navegacion desde multiples fuentes
     */
    getNavigationContext: function () {
      Logger.info('Obteniendo contexto de navegacion...')

      // 1. Prioridad: Query parameters
      const queryParams = this.getQueryParams()
      if (queryParams.from) {
        const url = decodeURIComponent(queryParams.from)
        const program = queryParams.program || this.extractProgramName(url)
        
        Logger.info(`Contexto desde query params: ${program} (${url})`)
        return {
          url: url,
          programName: program,
          source: 'query_params'
        }
      }

      // 2. Fallback: SessionStorage
      const storedUrl = StorageManager.get(CONFIG.storageKeys.previousUrl)
      const storedProgram = StorageManager.get(CONFIG.storageKeys.programName)

      if (storedUrl) {
        const program = storedProgram || this.extractProgramName(storedUrl)
        
        Logger.info(`Contexto desde sessionStorage: ${program} (${storedUrl})`)
        
        // Limpiar despues de usar
        StorageManager.clear()
        
        return {
          url: storedUrl,
          programName: program,
          source: 'session_storage'
        }
      }

      // 3. Fallback: Document referrer
      if (document.referrer && document.referrer !== window.location.href) {
        const program = this.extractProgramName(document.referrer)
        
        Logger.info(`Contexto desde referrer: ${program} (${document.referrer})`)
        return {
          url: document.referrer,
          programName: program,
          source: 'document_referrer'
        }
      }

      // 4. Fallback final
      Logger.warn('No se pudo obtener contexto de navegacion, usando fallbacks')
      return {
        url: '/',
        programName: 'programa',
        source: 'fallback'
      }
    }
  }

  // ===============================================
  // GESTOR DE BOTON
  // ===============================================

  const ButtonManager = {
    /**
     * Actualizar el boton de regreso con contexto
     */
    updateBackButton: function (context) {
      const button = document.getElementById(CONFIG.backButtonId)
      
      if (!button) {
        Logger.warn(`Boton no encontrado: ${CONFIG.backButtonId}`)
        return false
      }

      try {
        // Actualizar URL
        if (context.url && context.url !== '#') {
          button.href = context.url
          Logger.debug(`URL actualizada: ${context.url}`)
        }

        // Actualizar texto
        const newText = `Volver al ${context.programName}`
        
        // Buscar el texto dentro del boton (puede estar en un span o directamente)
        const textNodes = this.getTextNodes(button)
        
        if (textNodes.length > 0) {
          // Actualizar el ultimo nodo de texto que contenga "Volver"
          for (let i = textNodes.length - 1; i >= 0; i--) {
            const node = textNodes[i]
            if (node.textContent && node.textContent.includes('Volver')) {
              node.textContent = newText
              Logger.debug(`Texto actualizado: ${newText}`)
              break
            }
          }
        } else {
          // Si no hay nodos de texto, crear uno nuevo
          const textNode = document.createTextNode(newText)
          button.appendChild(textNode)
          Logger.debug(`Texto agregado: ${newText}`)
        }

        // Agregar atributos de tracking
        button.setAttribute('data-puj-navigation-context', context.source)
        button.setAttribute('data-puj-program', context.programName)
        
        // Agregar evento de click para analytics (opcional)
        if (!button.hasAttribute('data-puj-tracked')) {
          button.addEventListener('click', this.handleBackButtonClick.bind(this, context))
          button.setAttribute('data-puj-tracked', 'true')
        }

        Logger.info(`Boton actualizado exitosamente: "${newText}" -> ${context.url}`)
        return true

      } catch (e) {
        Logger.error('Error actualizando boton:', e)
        return false
      }
    },

    /**
     * Obtener todos los nodos de texto de un elemento
     */
    getTextNodes: function (element) {
      const textNodes = []
      const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        null,
        false
      )

      let node
      while ((node = walker.nextNode())) {
        if (node.textContent.trim()) {
          textNodes.push(node)
        }
      }

      return textNodes
    },

    /**
     * Manejar click en boton de regreso (para analytics)
     */
    handleBackButtonClick: function (context, event) {
      Logger.info(`Navegando de regreso: ${context.programName} -> ${context.url}`)
      
      // Aqui se puede agregar tracking de analytics si es necesario
      if (typeof gtag !== 'undefined') {
        gtag('event', 'back_to_program_click', {
          program_name: context.programName,
          source_url: context.url,
          navigation_source: context.source
        })
      }
    }
  }

  // ===============================================
  // INICIALIZADOR PRINCIPAL
  // ===============================================

  const ThankYouNavigation = {
    initialized: false,
    
    /**
     * Inicializar el sistema de navegacion
     */
    init: function () {
      if (this.initialized) {
        Logger.debug('Ya inicializado, saltando...')
        return
      }

      Logger.info('Inicializando sistema de navegacion contextual')

      try {
        // Obtener contexto de navegacion
        const context = NavigationUtils.getNavigationContext()
        
        // Intentar actualizar el boton
        this.waitForButton(context)
        
        this.initialized = true
        Logger.info('Sistema inicializado correctamente')

      } catch (e) {
        Logger.error('Error durante inicializacion:', e)
      }
    },

    /**
     * Esperar a que el boton este disponible y actualizarlo
     */
    waitForButton: function (context) {
      let attempts = 0
      const maxAttempts = CONFIG.maxWaitTime / CONFIG.checkInterval

      const checkButton = () => {
        attempts++
        const button = document.getElementById(CONFIG.backButtonId)

        if (button) {
          Logger.debug(`Boton encontrado en el intento ${attempts}`)
          ButtonManager.updateBackButton(context)
        } else if (attempts < maxAttempts) {
          setTimeout(checkButton, CONFIG.checkInterval)
        } else {
          Logger.warn(`Timeout: Boton no encontrado despues de ${CONFIG.maxWaitTime}ms`)
        }
      }

      checkButton()
    },

    /**
     * Re-inicializar si es necesario (para contenido dinamico)
     */
    reinit: function () {
      this.initialized = false
      this.init()
    }
  }

  // ===============================================
  // INICIALIZACION AUTOMATICA
  // ===============================================

  /**
   * Funcion principal de inicializacion
   */
  function initializeThankYouNavigation() {
    // Verificar que estemos en el browser
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return
    }

    // Verificar que estemos en la pagina correcta
    const isThankYouPage = document.getElementById(CONFIG.backButtonId) || 
                          document.querySelector(CONFIG.containerSelector) ||
                          window.location.pathname.includes('thank-you')

    if (!isThankYouPage) {
      Logger.debug('No es una pagina de thank you, saltando inicializacion')
      return
    }

    Logger.info('Pagina de thank you detectada, inicializando...')
    ThankYouNavigation.init()
  }

  // Inicializacion basada en el estado del DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeThankYouNavigation)
  } else {
    // DOM ya esta listo
    initializeThankYouNavigation()
  }

  // Observer para contenido dinamico (importante para fragmentos de Liferay)
  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(function (mutations) {
      let shouldReinit = false

      for (const mutation of mutations) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          for (const node of mutation.addedNodes) {
            if (node.nodeType === Node.ELEMENT_NODE) {
              // Verificar si se agrego nuestro boton o contenedor
              if (node.id === CONFIG.backButtonId || 
                  node.querySelector && node.querySelector(`#${CONFIG.backButtonId}`)) {
                shouldReinit = true
                break
              }
            }
          }
          if (shouldReinit) break
        }
      }

      if (shouldReinit) {
        Logger.debug('Contenido dinamico detectado, re-inicializando...')
        setTimeout(() => ThankYouNavigation.reinit(), 100)
      }
    })

    // Iniciar observacion cuando el body este disponible
    if (document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: true
      })
    } else {
      document.addEventListener('DOMContentLoaded', function () {
        if (document.body) {
          observer.observe(document.body, {
            childList: true,
            subtree: true
          })
        }
      })
    }
  }

  // ===============================================
  // API PUBLICA (para uso desde otros scripts)
  // ===============================================

  if (typeof window !== 'undefined') {
    window.ThankYouNavigation = {
      init: ThankYouNavigation.init.bind(ThankYouNavigation),
      reinit: ThankYouNavigation.reinit.bind(ThankYouNavigation),
      updateContext: function (url, programName) {
        const context = {
          url: url,
          programName: programName || NavigationUtils.extractProgramName(url),
          source: 'manual'
        }
        ButtonManager.updateBackButton(context)
      },
      storePreviousUrl: function (url, programName) {
        StorageManager.set(CONFIG.storageKeys.previousUrl, url)
        if (programName) {
          StorageManager.set(CONFIG.storageKeys.programName, programName)
        }
        Logger.info(`URL anterior guardada: ${programName} -> ${url}`)
      }
    }
  }

  Logger.info('Thank You Navigation Script cargado')

})()

// Export para uso en componentes React
export default function initThankYouNavigation() {
  if (typeof window !== 'undefined' && window.ThankYouNavigation) {
    window.ThankYouNavigation.init()
  }
}