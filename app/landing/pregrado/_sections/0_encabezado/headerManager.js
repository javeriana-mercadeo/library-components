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
    if (typeof window === 'undefined' || !window.DOMHelpers || !window.Logger || !window.EventManager) {
      return false
    }

    // Buscar elementos del menú móvil
    this.mobileMenu = DOMHelpers.findElement('#mobile-menu')
    this.menuOverlay = DOMHelpers.findElement('#menu-overlay')
    this.menuIcon = DOMHelpers.findElement('#menu-icon')
    this.triggers = DOMHelpers.findElements('[data-menu-target="mobile-menu"]')

    // Fallback para el trigger si no usa data-attribute
    if (this.triggers.length === 0) {
      const fallbackTrigger = DOMHelpers.findElement('#menu-toggle')
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
    const menuLinks = DOMHelpers.findElements('a', this.mobileMenu)
    menuLinks.forEach(link => {
      EventManager.add(link, 'click', () => {
        this.close()
      })
    })
  },

  open() {
    // Aplicar 'show' inmediatamente
    DOMHelpers.toggleClasses(this.mobileMenu, ['show'], true)

    if (this.menuOverlay) {
      DOMHelpers.toggleClasses(this.menuOverlay, ['active'], true)
    }

    // Aplicar 'active' con delay para animación
    TimingUtils.delay(() => {
      DOMHelpers.toggleClasses(this.mobileMenu, ['active'], true)

      if (this.menuIcon) {
        DOMHelpers.toggleClasses(this.menuIcon, ['active'], true)
      }
    }, 10)
  },

  close() {
    // Quitar clases del menú
    if (this.menuIcon) {
      DOMHelpers.toggleClasses(this.menuIcon, ['active'], false)
    }

    // Quitar 'active' inmediatamente
    DOMHelpers.toggleClasses(this.mobileMenu, ['active'], false)

    // Quitar 'show' y overlay con delay para animación
    TimingUtils.delay(() => {
      DOMHelpers.toggleClasses(this.mobileMenu, ['show'], false)

      if (this.menuOverlay) {
        DOMHelpers.toggleClasses(this.menuOverlay, ['active'], false)
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
// █                         SECCIÓN: CONTACT MODAL                            █
// ███████████████████████████████████████████████████████████████████████████████

const ContactModal = {
  // Namespace específico para evitar conflictos
  namespace: 'puj-contact-modal',
  initialized: false,

  init() {
    // Prevenir múltiples inicializaciones
    if (this.initialized) {
      return true
    }

    // Verificar que las utilidades globales estén disponibles
    if (typeof window === 'undefined' || !window.DOMHelpers || !window.Logger || !window.EventManager) {
      return false
    }

    // Elementos específicos del modal de contacto
    this.modal = DOMHelpers.findElement('#contact-modal')
    this.overlay = DOMHelpers.findElement('#modal-overlay')
    this.closeBtn = null // Se configurará dinámicamente
    this.form = DOMHelpers.findElement('#contact-form')
    this.triggers = DOMHelpers.findElements('[data-modal-target="contact-modal"]')

    // Verificar que es específicamente nuestro modal
    if (this.modal && !this.modal.classList.contains('contact-modal')) {
      return false // No es nuestro modal
    }

    if (!this.modal || !this.overlay) {
      return false
    }

    this.setupEventListeners()

    this.initialized = true
    return true
  },

  setupEventListeners() {
    this.triggers.forEach(trigger => {
      EventManager.add(trigger, 'click', e => {
        e.preventDefault()
        this.open()
      })
    })

    // Setup close button using normal EventManager approach
    this.setupCloseButton()

    EventManager.add(this.overlay, 'click', e => {
      // Cerrar al hacer click en el overlay
      if (e.target === this.overlay && !e.defaultPrevented) {
        e.preventDefault()
        this.close()
      }

      // Fallback ESPECÍFICO: solo botones de cerrar en NUESTRO modal de contacto
      const isOurModal = e.target.closest('#contact-modal.contact-modal')
      const isCloseButton =
        e.target.id === 'modal-close' ||
        e.target.closest('#modal-close') ||
        e.target.closest('.modal-header button') ||
        (e.target.matches('button') && e.target.closest('.modal-header'))

      if (isOurModal && isCloseButton) {
        e.preventDefault()
        e.stopPropagation()
        this.close()
      }
    })

    EventManager.add(this.modal, 'click', e => {
      e.stopPropagation()
    })

    // ESC key - solo si NUESTRO modal está activo
    EventManager.add(document, 'keydown', e => {
      if (e.key === 'Escape' && this.modal && this.modal.classList.contains('show') && this.modal.classList.contains('contact-modal')) {
        this.close()
      }
    })
  },

  setupCloseButton() {
    // Buscar el botón de cerrar cada vez que se necesite
    const findAndSetupCloseButton = () => {
      // Buscar ESPECÍFICAMENTE en nuestro modal de contacto
      const closeBtn = DOMHelpers.findElement('#modal-close', this.modal) || DOMHelpers.findElement('.modal-header button', this.modal)

      if (closeBtn) {
        // Verificar si ya tiene nuestro event listener específico
        if (!closeBtn.hasAttribute(`data-${this.namespace}-setup`)) {
          // Agregar event listener usando EventManager
          EventManager.add(closeBtn, 'click', e => {
            e.preventDefault()
            e.stopPropagation()
            this.close()
          })

          // Marcar como configurado con nuestro namespace
          closeBtn.setAttribute(`data-${this.namespace}-setup`, 'true')
        }
        return true
      }
      return false
    }

    // Intentar inmediatamente
    if (findAndSetupCloseButton()) {
      return
    }

    // Si no se encuentra, intentar con un delay (para renderizado de React)
    TimingUtils.delay(() => {
      if (findAndSetupCloseButton()) {
        return
      }

      // Intentar una vez más con delay más largo
      TimingUtils.delay(() => {
        if (!findAndSetupCloseButton()) {
          // No mostrar warning - el event delegation funcionará como fallback
        }
      }, 200)
    }, 50)
  },

  async open() {
    // Aplicar 'show' inmediatamente (patrón similar al menú móvil)
    DOMHelpers.toggleClasses(this.modal, ['show'], true)
    DOMHelpers.toggleClasses(this.overlay, ['active'], true)
    DOMHelpers.toggleClasses(document.body, ['modal-open'], true)

    // Aplicar 'active' con delay sutil para animación
    TimingUtils.delay(() => {
      DOMHelpers.toggleClasses(this.modal, ['active'], true)
    }, 10)

    // Asegurar que el botón de cerrar esté configurado cuando se abre el modal
    TimingUtils.delay(() => {
      this.setupCloseButton()
    }, 50)

    // Delegar inicialización del formulario al ModalForm
    this.initializeForm()
  },

  async initializeForm() {
    // Delegar toda la lógica del formulario al ModalForm
    if (typeof window !== 'undefined' && window.ModalFormManager) {
      try {
        await window.ModalFormManager.initLocationData()

        TimingUtils.delay(() => {
          window.ModalFormManager.initFormAnimations()
        }, 50)

        TimingUtils.delay(() => {
          const firstInput = DOMHelpers.findElement('input:not([type="radio"]):not([type="checkbox"])', this.modal)
          if (firstInput) firstInput.focus()
        }, 100)

        // Configurar validación del formulario
        if (this.form) {
          window.ModalFormManager.setupFormValidation(this.form)
        }
      } catch (error) {
        console.error('Error al inicializar formulario del modal:', error)
      }
    }
  },

  close() {
    // Quitar 'active' inmediatamente para comenzar animación de salida
    DOMHelpers.toggleClasses(this.modal, ['active'], false)

    // CRÍTICO: Limpiar TODAS las clases de modal que puedan existir
    if (this.modal) {
      // Remover clases del otro sistema de modales
      this.modal.classList.remove('program-detail-modal--active')
      // Remover cualquier otra clase de modal genérica
      const modalClasses = Array.from(this.modal.classList).filter(cls => cls.includes('modal') && cls.includes('active'))
      modalClasses.forEach(cls => this.modal.classList.remove(cls))
    }

    // Quitar 'show' y limpiar completamente con delay para animación
    TimingUtils.delay(() => {
      DOMHelpers.toggleClasses(this.modal, ['show'], false)
      DOMHelpers.toggleClasses(this.overlay, ['active'], false)
      DOMHelpers.toggleClasses(document.body, ['modal-open'], false)

      // Limpiar estilos del body completamente
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.height = ''

      // Reset completo del modal - forzar estado inicial
      this.modal.style.transform = ''
      this.modal.style.opacity = ''
      this.modal.style.visibility = ''
      this.modal.style.pointerEvents = ''
      this.overlay.style.opacity = ''
      this.overlay.style.visibility = ''
      this.overlay.style.pointerEvents = ''

      // Asegurar limpieza completa SOLO de nuestro modal
      if (this.modal && this.modal.classList.contains('contact-modal')) {
        this.modal.classList.remove('program-detail-modal--active', 'show', 'active')
      }
      if (this.overlay) {
        this.overlay.classList.remove('active')
      }

      // Forzar reflow para asegurar que los cambios se apliquen
      this.overlay.offsetHeight
    }, 200)
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
      mobileMenu: MobileMenu.init(),
      contactModal: ContactModal.init()
    }

    return systems
  },

  cleanup() {
    MobileMenu.cleanup()
    ContactModal.cleanup()
    if (typeof window !== 'undefined' && window.EventManager) {
      EventManager.cleanup()
    }
  }
}

export { HeaderManager }
