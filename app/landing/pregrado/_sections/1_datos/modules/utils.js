// ===========================================
// UTILITIES MODULE - USING GLOBAL UTILS
// ===========================================

/**
 * Módulo de utilidades que usa las utilidades globales existentes
 * Sin fallbacks - asume que las utilidades globales están siempre disponibles
 */

// Las utilidades globales están disponibles directamente como window.Logger, etc.

// TimerManager simplificado usando scheduler global
class TimerManager {
  constructor() {
    this.scheduler = TimingUtils.createScheduler()
  }

  setTimeout(callback, delay) {
    return this.scheduler.schedule(callback, delay)
  }

  setInterval(callback, interval) {
    const intervalFn = () => {
      callback()
      this.setTimeout(intervalFn, interval)
    }
    return this.setTimeout(intervalFn, interval)
  }

  clearTimer(timer) {
    this.scheduler.cancel(timer)
  }

  clearAll() {
    this.scheduler.cancelAll()
  }

  destroy() {
    this.clearAll()
  }
}

// EventManager simplificado usando global EventManager
class ModuleEventManager {
  constructor() {
    this.listeners = new Set()
  }

  addEventListener(element, event, handler, options = {}) {
    const key = EventManager.add(element, event, handler, options)
    this.listeners.add(key)
    return key
  }

  removeEventListener(element, event, handler) {
    EventManager.removeByElement(element)
  }

  destroy() {
    this.listeners.forEach(key => EventManager.remove(key))
    this.listeners.clear()
  }
}

/**
 * Generar hash simple para identificadores únicos
 */
function hashString(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convertir a 32-bit integer
  }
  return Math.abs(hash).toString(36)
}

/**
 * Verificar si elemento está visible en viewport
 */
function isElementVisible(element, threshold = 0.1) {
  // Usar utilidad global si está disponible
  if (DOMUtils && DOMUtils.isElementVisible) {
    return DOMUtils.isElementVisible(element, threshold)
  }

  // Fallback simple
  if (!element) return false

  const rect = element.getBoundingClientRect()
  const windowHeight = window.innerHeight || document.documentElement.clientHeight
  const windowWidth = window.innerWidth || document.documentElement.clientWidth

  const verticalVisible = rect.top + rect.height * threshold < windowHeight && rect.bottom - rect.height * threshold > 0
  const horizontalVisible = rect.left + rect.width * threshold < windowWidth && rect.right - rect.width * threshold > 0

  return verticalVisible && horizontalVisible
}

/**
 * Esperar al siguiente frame de animación
 */
function waitForNextFrame() {
  return new Promise(resolve => {
    requestAnimationFrame(resolve)
  })
}

/**
 * Ejecutar función cuando el DOM esté listo
 */
function onDOMReady(callback) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback)
  } else {
    callback()
  }
}

/**
 * Ejecutar función cuando sea idle o después de timeout
 */
function runWhenIdle(callback, timeout = 2000) {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(callback, { timeout })
  } else {
    setTimeout(callback, 100)
  }
}

/**
 * Crear estilos CSS dinámicamente
 */
function createStyleSheet(id, css) {
  let style = document.getElementById(id)

  if (!style) {
    style = document.createElement('style')
    style.id = id
    document.head.appendChild(style)
  }

  style.textContent = css
  return style
}

/**
 * Obtener URL de video desde contenedor
 */
function getVideoUrl(container, type) {
  // Intentar desde configuración global
  if (typeof configuration !== 'undefined') {
    const configUrl = type === 'mobile' ? configuration.urlVideoMobile : configuration.urlVideoDesktop
    if (configUrl?.trim()) return configUrl
  }

  // Obtener desde data attributes
  const dataAttr = type === 'mobile' ? 'data-video-mobile-url' : 'data-video-desktop-url'
  const url = container.getAttribute(dataAttr)
  return url?.trim() || null
}

/**
 * Crear loading spinner reutilizable
 */
function createLoadingSpinner(size = '40px', color = '#fff') {
  const spinner = document.createElement('div')
  spinner.className = 'loading-spinner'

  Object.assign(spinner.style, {
    width: size,
    height: size,
    border: `3px solid rgba(255,255,255,0.3)`,
    borderTop: `3px solid ${color}`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  })

  // Asegurar que la animación CSS esté disponible
  createStyleSheet(
    'loading-spinner-animation',
    `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `
  )

  return spinner
}

export {
  // Solo utilidades locales específicas del módulo
  TimerManager,
  ModuleEventManager as EventManager,
  hashString,
  isElementVisible,
  waitForNextFrame,
  onDOMReady,
  runWhenIdle,
  getVideoUrl,
  createStyleSheet,
  createLoadingSpinner
}
