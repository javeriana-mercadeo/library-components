// ===========================================
// UTILIDADES GENERALES
// ===========================================

/**
 * Sistema de logging mejorado
 */
const Logger = {
  debug: (message, data = null) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔍 ${message}`, data || '')
    }
  },
  success: message => console.log(`✅ ${message}`),
  warning: message => console.warn(`⚠️ ${message}`),
  error: message => console.error(`❌ ${message}`)
}

/**
 * Manejo de elementos del DOM
 */
const DOMHelpers = {
  // Encontrar múltiples elementos con validación
  findElements(selectors) {
    const elements = {}
    const missing = []

    Object.entries(selectors).forEach(([key, selector]) => {
      const element = document.getElementById(selector) || document.querySelector(selector)
      elements[key] = element
      if (!element) missing.push(selector)
    })

    return { elements, missing }
  },

  // Verificar si el DOM está listo
  isReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback)
    } else {
      // Pequeño delay para asegurar que React haya terminado
      setTimeout(callback, 100)
    }
  },

  // Añadir/remover clases de forma segura
  toggleClasses(element, classNames, add = true) {
    if (!element) return false

    const method = add ? 'add' : 'remove'
    classNames.forEach(className => {
      element.classList[method](className)
    })
    return true
  }
}

/**
 * Manejo de eventos con cleanup automático
 */
const EventManager = {
  listeners: new Map(),

  // Añadir event listener con tracking
  add(element, event, handler, options = {}) {
    if (!element) return null

    const wrappedHandler = e => {
      try {
        handler(e)
      } catch (error) {
        Logger.error(`Error en event handler: ${error.message}`)
      }
    }

    element.addEventListener(event, wrappedHandler, options)

    // Guardar referencia para cleanup
    const key = `${element.id || 'anonymous'}-${event}`
    this.listeners.set(key, { element, event, handler: wrappedHandler })

    return key
  },

  // Remover event listener específico
  remove(key) {
    const listener = this.listeners.get(key)
    if (listener) {
      listener.element.removeEventListener(listener.event, listener.handler)
      this.listeners.delete(key)
    }
  },

  // Limpiar todos los listeners
  cleanup() {
    this.listeners.forEach((listener, key) => {
      this.remove(key)
    })
  }
}

/**
 * Utilidades de timing
 */
const TimingUtils = {
  debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  },

  delay(callback, ms = 100) {
    setTimeout(callback, ms)
  }
}

// ===========================================
// COMPONENTE MENU MÓVIL MODULAR
// ===========================================

/**
 * Clase para manejar el estado del menú
 */
class MenuState {
  constructor() {
    this.isOpen = false
    this.observers = []
  }

  // Patrón Observer para reactividad
  subscribe(callback) {
    this.observers.push(callback)
  }

  // Notificar cambios de estado
  notify() {
    this.observers.forEach(callback => callback(this.isOpen))
  }

  open() {
    if (this.isOpen) return false
    this.isOpen = true
    this.notify()
    Logger.debug('Menú abierto')
    return true
  }

  close() {
    if (!this.isOpen) return false
    this.isOpen = false
    this.notify()
    Logger.debug('Menú cerrado')
    return true
  }

  toggle() {
    return this.isOpen ? this.close() : this.open()
  }
}

/**
 * Configuración del menú
 */
const MENU_CONFIG = {
  selectors: {
    toggle: 'menu-toggle',
    menu: 'mobile-menu',
    icon: 'menu-icon',
    overlay: 'menu-overlay'
  },
  classes: {
    active: 'active',
    menuOpen: 'menu-open'
  },
  breakpoint: 768,
  animationDelay: 150,
  links: '.header__mobile-menu-link, .header__mobile-cta-link'
}

/**
 * Módulo principal del menú móvil
 */
const MobileMenu = {
  // Inicialización
  init(config = MENU_CONFIG) {
    this.config = config
    this.state = new MenuState()
    this.elements = {}

    Logger.debug('Inicializando menú móvil...')

    if (!this.findElements()) {
      Logger.error('No se pudieron encontrar elementos esenciales del menú')
      return false
    }

    this.setupStateObserver()
    this.setupEventListeners()
    this.setupAccessibility()

    Logger.success('Sistema de menú móvil inicializado correctamente')
    return true
  },

  // Encontrar elementos del DOM
  findElements() {
    const { elements, missing } = DOMHelpers.findElements(this.config.selectors)
    this.elements = elements

    if (missing.length > 0) {
      Logger.warning(`Elementos no encontrados: ${missing.join(', ')}`)
    }

    return !!(elements.toggle && elements.menu)
  },

  // Configurar observer de estado
  setupStateObserver() {
    this.state.subscribe(isOpen => {
      this.updateUI(isOpen)
      this.updateAccessibility(isOpen)
    })
  },

  // Actualizar UI basado en el estado
  updateUI(isOpen) {
    const { menu, icon, overlay } = this.elements
    const { classes } = this.config

    // Actualizar clases
    DOMHelpers.toggleClasses(menu, [classes.active], isOpen)
    DOMHelpers.toggleClasses(icon, [classes.active], isOpen)
    DOMHelpers.toggleClasses(overlay, [classes.active], isOpen)
    DOMHelpers.toggleClasses(document.body, [classes.menuOpen], isOpen)
  },

  // Actualizar accesibilidad
  updateAccessibility(isOpen) {
    const { toggle } = this.elements
    if (toggle) {
      toggle.setAttribute('aria-expanded', isOpen.toString())
    }
  },

  // Configurar event listeners
  setupEventListeners() {
    this.setupToggleListener()
    this.setupOverlayListener()
    this.setupOutsideClickListener()
    this.setupMenuLinksListeners()
    this.setupKeyboardListeners()
    this.setupResizeListener()
  },

  // Listener del botón toggle
  setupToggleListener() {
    EventManager.add(this.elements.toggle, 'click', e => {
      e.stopPropagation()
      e.preventDefault()
      this.state.toggle()
    })
  },

  // Listener del overlay
  setupOverlayListener() {
    if (this.elements.overlay) {
      EventManager.add(this.elements.overlay, 'click', e => {
        e.stopPropagation()
        this.state.close()
      })
    }
  },

  // Listener para clicks fuera
  setupOutsideClickListener() {
    const handleOutsideClick = e => {
      if (this.state.isOpen && !this.elements.menu.contains(e.target) && !this.elements.toggle.contains(e.target)) {
        this.state.close()
      }
    }

    EventManager.add(document, 'click', e => {
      TimingUtils.delay(() => handleOutsideClick(e), 10)
    })
  },

  // Listeners de los enlaces del menú
  setupMenuLinksListeners() {
    DOMHelpers.isReady(() => {
      const menuLinks = document.querySelectorAll(this.config.links)

      menuLinks.forEach(link => {
        EventManager.add(link, 'click', e => {
          // Prevenir navegación en enlaces hash
          if (link.getAttribute('href') === '#') {
            e.preventDefault()
          }

          // Cerrar menú con delay para UX
          TimingUtils.delay(() => {
            this.state.close()
          }, this.config.animationDelay)
        })
      })

      Logger.debug(`Configurados ${menuLinks.length} enlaces de menú`)
    })
  },

  // Listeners de teclado
  setupKeyboardListeners() {
    // Cerrar con ESC
    EventManager.add(document, 'keydown', e => {
      if (e.key === 'Escape' && this.state.isOpen) {
        this.state.close()
      }
    })

    // Manejo de Tab para accesibilidad (configurado en setupAccessibility)
  },

  // Listener de redimensionado
  setupResizeListener() {
    const handleResize = TimingUtils.debounce(() => {
      if (window.innerWidth >= this.config.breakpoint && this.state.isOpen) {
        this.state.close()
      }
    }, 150)

    EventManager.add(window, 'resize', handleResize)
  },

  // Configurar accesibilidad
  setupAccessibility() {
    DOMHelpers.isReady(() => {
      const focusableElements = this.elements.menu.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])')

      if (focusableElements.length === 0) {
        Logger.warning('No se encontraron elementos enfocables en el menú')
        return
      }

      const firstFocusable = focusableElements[0]
      const lastFocusable = focusableElements[focusableElements.length - 1]

      // Manejo de Tab dentro del menú
      EventManager.add(this.elements.menu, 'keydown', e => {
        if (e.key === 'Tab' && this.state.isOpen) {
          if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
              e.preventDefault()
              lastFocusable.focus()
            }
          } else {
            if (document.activeElement === lastFocusable) {
              e.preventDefault()
              firstFocusable.focus()
            }
          }
        }
      })

      // Enfocar primer elemento al abrir
      this.state.subscribe(isOpen => {
        if (isOpen) {
          TimingUtils.delay(() => {
            firstFocusable?.focus()
          }, 100)
        }
      })
    })
  },

  // Método de limpieza
  destroy() {
    EventManager.cleanup()
    this.state = null
    this.elements = {}
    Logger.debug('Menú móvil destruido')
  }
}

// ===========================================
// EXPORTACIÓN Y AUTO-INICIALIZACIÓN
// ===========================================

export default () => {
  DOMHelpers.isReady(() => {
    MobileMenu.init()
  })
}

// Exportar utilidades para reutilización
export { Logger, DOMHelpers, EventManager, TimingUtils, MobileMenu }
