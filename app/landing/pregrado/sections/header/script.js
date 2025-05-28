// ===========================================
// SCRIPT PRINCIPAL INTEGRADO - HEADER + MODAL
// ===========================================

// ===========================================
// UTILIDADES GENERALES
// ===========================================
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

const DOMHelpers = {
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

  isReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback)
    } else {
      setTimeout(callback, 100)
    }
  },

  toggleClasses(element, classNames, add = true) {
    if (!element) return false
    const method = add ? 'add' : 'remove'
    classNames.forEach(className => {
      element.classList[method](className)
    })
    return true
  }
}

const EventManager = {
  listeners: new Map(),

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
    const key = `${element.id || 'anonymous'}-${event}-${Date.now()}`
    this.listeners.set(key, { element, event, handler: wrappedHandler })
    return key
  },

  remove(key) {
    const listener = this.listeners.get(key)
    if (listener) {
      listener.element.removeEventListener(listener.event, listener.handler)
      this.listeners.delete(key)
    }
  },

  cleanup() {
    this.listeners.forEach((listener, key) => {
      this.remove(key)
    })
  }
}

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
// MENÚ MÓVIL (simplificado)
// ===========================================
const MobileMenu = {
  init() {
    const menuToggle = document.getElementById('menu-toggle')
    const mobileMenu = document.getElementById('mobile-menu')
    const menuOverlay = document.getElementById('menu-overlay')
    const menuIcon = document.getElementById('menu-icon')

    if (!menuToggle || !mobileMenu) {
      Logger.warning('Elementos del menú móvil no encontrados')
      return false
    }

    // Toggle del menú
    EventManager.add(menuToggle, 'click', e => {
      e.preventDefault()
      const isOpen = mobileMenu.classList.contains('active')

      if (isOpen) {
        this.closeMenu(mobileMenu, menuOverlay, menuIcon)
      } else {
        this.openMenu(mobileMenu, menuOverlay, menuIcon)
      }
    })

    // Cerrar con overlay
    if (menuOverlay) {
      EventManager.add(menuOverlay, 'click', () => {
        this.closeMenu(mobileMenu, menuOverlay, menuIcon)
      })
    }

    // Cerrar con ESC
    EventManager.add(document, 'keydown', e => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        this.closeMenu(mobileMenu, menuOverlay, menuIcon)
      }
    })

    Logger.success('Menú móvil inicializado')
    return true
  },

  openMenu(menu, overlay, icon) {
    DOMHelpers.toggleClasses(menu, ['active'], true)
    DOMHelpers.toggleClasses(overlay, ['active'], true)
    DOMHelpers.toggleClasses(icon, ['active'], true)
    DOMHelpers.toggleClasses(document.body, ['menu-open'], true)
  },

  closeMenu(menu, overlay, icon) {
    DOMHelpers.toggleClasses(menu, ['active'], false)
    DOMHelpers.toggleClasses(overlay, ['active'], false)
    DOMHelpers.toggleClasses(icon, ['active'], false)
    DOMHelpers.toggleClasses(document.body, ['menu-open'], false)
  }
}

// ===========================================
// MODAL DE CONTACTO
// ===========================================
const ContactModal = {
  init() {
    this.modal = document.getElementById('contact-modal')
    this.overlay = document.getElementById('modal-overlay')
    this.closeBtn = document.getElementById('modal-close')
    this.form = document.getElementById('contact-form')

    // Buscar todos los triggers
    this.triggers = document.querySelectorAll('[data-modal-target="contact-modal"]')

    if (!this.modal || !this.overlay) {
      Logger.warning('Elementos del modal no encontrados')
      return false
    }

    this.setupEventListeners()
    this.setupFormValidation()

    Logger.success('Modal de contacto inicializado')
    return true
  },

  setupEventListeners() {
    // Triggers para abrir
    this.triggers.forEach(trigger => {
      EventManager.add(trigger, 'click', e => {
        e.preventDefault()
        this.open()
      })
    })

    // Botón cerrar
    if (this.closeBtn) {
      EventManager.add(this.closeBtn, 'click', e => {
        e.preventDefault()
        this.close()
      })
    }

    // Cerrar con overlay
    EventManager.add(this.overlay, 'click', e => {
      if (e.target === this.overlay) {
        this.close()
      }
    })

    // Cerrar con ESC
    EventManager.add(document, 'keydown', e => {
      if (e.key === 'Escape' && this.modal.classList.contains('show')) {
        this.close()
      }
    })
  },

  setupFormValidation() {
    if (!this.form) return

    EventManager.add(this.form, 'submit', e => {
      e.preventDefault()
      this.handleSubmit()
    })

    // Validación en tiempo real
    const inputs = this.form.querySelectorAll('input')
    inputs.forEach(input => {
      EventManager.add(input, 'blur', () => {
        this.validateField(input)
      })
    })
  },

  open() {
    // Mostrar modal
    DOMHelpers.toggleClasses(this.modal, ['show'], true)
    DOMHelpers.toggleClasses(this.overlay, ['active'], true)
    DOMHelpers.toggleClasses(document.body, ['modal-open'], true)

    // Activar animación
    TimingUtils.delay(() => {
      DOMHelpers.toggleClasses(this.modal, ['active'], true)
    }, 10)

    // Enfocar primer input
    TimingUtils.delay(() => {
      const firstInput = this.modal.querySelector('input')
      if (firstInput) firstInput.focus()
    }, 300)

    Logger.debug('Modal abierto')
  },

  close() {
    // Quitar animación
    DOMHelpers.toggleClasses(this.modal, ['active'], false)

    // Ocultar modal después de la animación
    TimingUtils.delay(() => {
      DOMHelpers.toggleClasses(this.modal, ['show'], false)
      DOMHelpers.toggleClasses(this.overlay, ['active'], false)
      DOMHelpers.toggleClasses(document.body, ['modal-open'], false)
    }, 400)

    Logger.debug('Modal cerrado')
  },

  validateField(input) {
    const { name, value } = input
    let isValid = true
    let message = ''

    // Validaciones básicas
    switch (name) {
      case 'nombres':
      case 'apellidos':
        isValid = value.length >= 2 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)
        message = 'Mínimo 2 caracteres, solo letras'
        break
      case 'documento':
        isValid = /^\d{6,12}$/.test(value)
        message = 'Entre 6 y 12 dígitos'
        break
      case 'celular':
        isValid = /^[+]?[\d\s-()]{10,15}$/.test(value)
        message = 'Número de celular válido'
        break
      case 'email':
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        message = 'Correo electrónico válido'
        break
    }

    this.showFieldError(input, isValid ? null : message)
    return isValid
  },

  showFieldError(input, message) {
    const container = input.closest('.form-group')
    if (!container) return

    // Remover error anterior
    const existingError = container.querySelector('.field-error')
    if (existingError) existingError.remove()

    input.classList.remove('error')

    if (message) {
      input.classList.add('error')
      const errorElement = document.createElement('span')
      errorElement.className = 'field-error'
      errorElement.textContent = message
      container.appendChild(errorElement)
    }
  },

  async handleSubmit() {
    const formData = new FormData(this.form)
    const data = Object.fromEntries(formData.entries())

    // Validar todos los campos
    const inputs = this.form.querySelectorAll('input')
    let isValid = true

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false
      }
    })

    if (!isValid) {
      Logger.warning('Formulario con errores')
      return
    }

    // Simular envío
    const submitBtn = this.form.querySelector('[type="submit"]')
    const originalText = submitBtn.textContent

    try {
      submitBtn.textContent = 'Enviando...'
      submitBtn.disabled = true

      // Simular delay de envío
      await new Promise(resolve => setTimeout(resolve, 2000))

      Logger.success('Formulario enviado correctamente')

      // Mostrar mensaje de éxito
      this.showSuccess()

      // Cerrar modal después de un momento
      TimingUtils.delay(() => {
        this.close()
        this.form.reset()
      }, 2000)
    } catch (error) {
      Logger.error('Error al enviar formulario:', error)
    } finally {
      submitBtn.textContent = originalText
      submitBtn.disabled = false
    }
  },

  showSuccess() {
    const successHTML = `
      <div class="success-message">
        <div class="success-icon">✅</div>
        <p>¡Gracias! Hemos recibido tu información.</p>
        <p>Te contactaremos pronto.</p>
      </div>
    `

    const modalContent = this.modal.querySelector('.modal-content')
    modalContent.innerHTML = successHTML
  }
}

// ===========================================
// INICIALIZACIÓN PRINCIPAL
// ===========================================
export default () => {
  DOMHelpers.isReady(() => {
    Logger.debug('Inicializando sistemas del header...')

    const systems = {
      mobileMenu: MobileMenu.init(),
      contactModal: ContactModal.init()
    }

    const activeSystems = Object.entries(systems)
      .filter(([_, isActive]) => isActive)
      .map(([name]) => name)

    if (activeSystems.length > 0) {
      Logger.success(`Sistemas activos: ${activeSystems.join(', ')}`)
    } else {
      Logger.warning('No se pudieron inicializar los sistemas')
    }

    // Cleanup al cambiar de página
    window.addEventListener('beforeunload', () => {
      EventManager.cleanup()
    })
  })
}
