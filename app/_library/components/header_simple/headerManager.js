// ===========================================
// HEADER MANAGER - Gestión del Header
// ===========================================

// ███████████████████████████████████████████████████████████████████████████████
// █                         SECCIÓN: MENÚ MÓVIL                               █
// ███████████████████████████████████████████████████████████████████████████████

const MobileMenu = {
  // Namespace específico para evitar conflictos
  namespace: 'puj-mobile-menu',
  initialized: false,

  init() {
    // Prevenir múltiples inicializaciones
    if (this.initialized) {
      return true
    }

    // Verificar que las utilidades globales estén disponibles
    if (typeof window === 'undefined' || !window.DOMUtils || !window.Logger || !window.EventManager) {
      return false
    }

    // Buscar elementos del menú móvil
    this.mobileMenu = DOMUtils.findElement('#mobile-menu')
    this.menuOverlay = DOMUtils.findElement('#menu-overlay')
    this.menuIcon = DOMUtils.findElement('#menu-icon')
    this.triggers = DOMUtils.findElements('[data-menu-target="mobile-menu"]')

    // Fallback para el trigger si no usa data-attribute
    if (this.triggers.length === 0) {
      const fallbackTrigger = DOMUtils.findElement('#menu-toggle')
      if (fallbackTrigger) {
        this.triggers = [fallbackTrigger]
      }
    }

    // Eliminar duplicados si el elemento tiene ambos atributos
    const uniqueTriggers = []
    const seenElements = new Set()

    this.triggers.forEach(trigger => {
      if (!seenElements.has(trigger)) {
        seenElements.add(trigger)
        uniqueTriggers.push(trigger)
      }
    })

    this.triggers = uniqueTriggers

    if (this.triggers.length === 0 || !this.mobileMenu) {
      return false
    }

    this.setupEventListeners()
    this.setupKeyboardNavigation()
    this.setupLinkHandlers()

    this.initialized = true
    return true
  },

  setupEventListeners() {
    // Configurar triggers del menú
    this.triggers.forEach(trigger => {
      EventManager.add(trigger, 'click', e => {
        e.preventDefault()
        e.stopPropagation()

        const isOpen = this.mobileMenu.classList.contains('show')
        if (isOpen) {
          this.close()
        } else {
          this.open()
        }
      })
    })

    // Configurar overlay para cerrar
    if (this.menuOverlay) {
      EventManager.add(this.menuOverlay, 'click', e => {
        if (e.target === this.menuOverlay && !e.defaultPrevented) {
          e.preventDefault()
          this.close()
        }
      })
    }

    // Prevenir que clicks dentro del menú lo cierren
    EventManager.add(this.mobileMenu, 'click', e => {
      e.stopPropagation()
    })
  },

  setupKeyboardNavigation() {
    // ESC key - solo si NUESTRO menú móvil está activo
    EventManager.add(document, 'keydown', e => {
      if (e.key === 'Escape' && this.mobileMenu && this.mobileMenu.classList.contains('show') && this.mobileMenu.id === 'mobile-menu') {
        this.close()
      }
    })
  },

  setupLinkHandlers() {
    const menuLinks = DOMUtils.findElements('a', this.mobileMenu)
    menuLinks.forEach(link => {
      EventManager.add(link, 'click', () => {
        this.close()
      })
    })
  },

  open() {
    // Aplicar 'show' inmediatamente
    DOMUtils.toggleClasses(this.mobileMenu, ['show'], true)

    if (this.menuOverlay) {
      DOMUtils.toggleClasses(this.menuOverlay, ['active'], true)
    }

    // Aplicar 'active' con delay para animación
    TimingUtils.delay(() => {
      DOMUtils.toggleClasses(this.mobileMenu, ['active'], true)

      if (this.menuIcon) {
        DOMUtils.toggleClasses(this.menuIcon, ['active'], true)
      }
    }, 10)
  },

  close() {
    // Quitar clases del menú
    if (this.menuIcon) {
      DOMUtils.toggleClasses(this.menuIcon, ['active'], false)
    }

    // Quitar 'active' inmediatamente
    DOMUtils.toggleClasses(this.mobileMenu, ['active'], false)

    // Quitar 'show' y overlay con delay para animación
    TimingUtils.delay(() => {
      DOMUtils.toggleClasses(this.mobileMenu, ['show'], false)

      if (this.menuOverlay) {
        DOMUtils.toggleClasses(this.menuOverlay, ['active'], false)
      }
    }, 300)
  },

  cleanup() {
    this.initialized = false
    if (typeof window !== 'undefined' && window.EventManager) {
      EventManager.cleanup()
    }
  }
}

// ███████████████████████████████████████████████████████████████████████████████
// █                        SISTEMA PRINCIPAL DEL HEADER                       █
// ███████████████████████████████████████████████████████████████████████████████

const HeaderManager = {
  // Namespace principal del header
  namespace: 'puj-header-manager',

  init() {
    const systems = {
      mobileMenu: MobileMenu.init()
    }

    return systems
  },

  cleanup() {
    MobileMenu.cleanup()
    if (typeof window !== 'undefined' && window.EventManager) {
      EventManager.cleanup()
    }
  }
}

export { HeaderManager }
