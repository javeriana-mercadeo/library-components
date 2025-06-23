// ===========================================
// SCRIPT MEJORADO - HEADER Y MODAL CON APIs
// ===========================================

// URLs de las APIs
const API_ENDPOINTS = {
  ubicaciones: 'https://www.javeriana.edu.co/recursosdb/1372208/10609114/ubicaciones.json',
  codigosPais: 'https://www.javeriana.edu.co/recursosdb/1372208/10609114/codigos_pais.json'
}

// Cache para los datos de las APIs
let LOCATION_DATA = {}
let COUNTRY_CODES = {}

// ███████████████████████████████████████████████████████████████████████████████
// █                         SECCIÓN: UTILIDADES BÁSICAS                        █
// ███████████████████████████████████████████████████████████████████████████████

const Logger = {
  debug: (msg, ...args) => console.log(`🐛 ${msg}`, ...args),
  success: (msg, ...args) => console.log(`✅ ${msg}`, ...args),
  warning: (msg, ...args) => console.warn(`⚠️ ${msg}`, ...args),
  error: (msg, ...args) => console.error(`❌ ${msg}`, ...args)
}

const EventManager = {
  events: new Map(),
  
  add(element, event, handler) {
    if (!element) return false
    
    element.addEventListener(event, handler)
    
    // Guardar para cleanup
    const key = `${element.id || 'element'}-${event}`
    if (!this.events.has(key)) {
      this.events.set(key, [])
    }
    this.events.get(key).push({ element, event, handler })
    
    return true
  },
  
  cleanup() {
    this.events.forEach(eventList => {
      eventList.forEach(({ element, event, handler }) => {
        element?.removeEventListener(event, handler)
      })
    })
    this.events.clear()
    Logger.debug('Event listeners limpiados')
  }
}

const DOMHelpers = {
  isReady(callback) {
    // Verificar que estamos en el navegador
    if (typeof document === 'undefined') {
      return
    }
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback)
    } else {
      callback()
    }
  },
  
  toggleClasses(element, classes, add) {
    if (!element || !classes) return
    
    classes.forEach(className => {
      if (add) {
        element.classList.add(className)
      } else {
        element.classList.remove(className)
      }
    })
  },
  
  createElement(tag, className, textContent) {
    if (typeof document === 'undefined') {
      return null
    }
    const element = document.createElement(tag)
    if (className) element.className = className
    if (textContent) element.textContent = textContent
    return element
  }
}

const TimingUtils = {
  delay(callback, ms = 0) {
    return setTimeout(callback, ms)
  }
}

const Validators = {
  required(value) {
    return value && value.trim().length > 0
  },
  
  name(value) {
    return value && value.trim().length >= 2 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value.trim())
  },
  
  email(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return value && emailRegex.test(value.trim())
  },
  
  phone(value) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/
    return value && value.trim().length >= 7 && phoneRegex.test(value.trim())
  },
  
  document(value) {
    const docRegex = /^\d{6,12}$/
    return value && docRegex.test(value.trim())
  }
}

// ███████████████████████████████████████████████████████████████████████████████
// █                         SECCIÓN: API MANAGER                               █
// ███████████████████████████████████████████████████████████████████████████████

const APIManager = {
  async fetchData(url) {
    try {
      Logger.debug(`Cargando datos desde: ${url}`)
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      Logger.success(`Datos cargados exitosamente desde: ${url}`)
      return data
    } catch (error) {
      Logger.error(`Error al cargar datos de ${url}:`, error)
      throw error
    }
  },

  async loadLocationData() {
    try {
      // Cargar ambas APIs en paralelo
      const [ubicaciones, codigosPais] = await Promise.all([
        this.fetchData(API_ENDPOINTS.ubicaciones),
        this.fetchData(API_ENDPOINTS.codigosPais)
      ])

      // Procesar datos de ubicaciones
      LOCATION_DATA = this.processLocationData(ubicaciones)
      COUNTRY_CODES = this.processCountryCodes(codigosPais)

      Logger.success('Datos de ubicaciones y códigos de país cargados correctamente')
      return { ubicaciones: LOCATION_DATA, codigosPais: COUNTRY_CODES }
    } catch (error) {
      Logger.error('Error al cargar datos de ubicaciones:', error)
      // Usar datos de fallback si es necesario
      this.loadFallbackData()
      throw error
    }
  },

  processLocationData(ubicaciones) {
    const processed = {}

    // Procesar según la estructura real de la API
    // Estructura: { "COL": { nombre: "Colombia", departamentos: [...] }, "AFG": { nombre: "Afghanistan" }, ... }
    Object.keys(ubicaciones).forEach(countryCode => {
      const country = ubicaciones[countryCode]
      
      if (country && country.nombre) {
        const countryName = country.nombre
        processed[countryName] = {}

        // Solo Colombia tiene departamentos detallados
        if (country.departamentos && Array.isArray(country.departamentos)) {
          country.departamentos.forEach(depto => {
            if (depto.nombre && depto.ciudades) {
              const cities = depto.ciudades.map(ciudad => ciudad.nombre || ciudad)
              processed[countryName][depto.nombre] = cities
            }
          })
        }
      }
    })

    return processed
  },

  processCountryCodes(codigosPais) {
    const processed = {}

    // Procesar códigos de país
    // Estructura: [{ nameES: "Colombia", phoneCode: "57", ... }, ...]
    if (Array.isArray(codigosPais)) {
      codigosPais.forEach(country => {
        if (country.nameES && country.phoneCode) {
          processed[country.nameES] = `+${country.phoneCode}`
        }
      })
    }

    return processed
  },

  loadFallbackData() {
    Logger.warning('Usando datos de fallback para ubicaciones')
    LOCATION_DATA = {
      Colombia: {
        'Bogotá D.C.': ['Bogotá D.C.'],
        Antioquia: ['Medellín', 'Bello', 'Itagüí', 'Envigado', 'Sabaneta'],
        'Valle del Cauca': ['Cali', 'Palmira', 'Buenaventura', 'Tuluá']
      }
    }

    COUNTRY_CODES = {
      Colombia: '+57',
      'Estados Unidos': '+1',
      México: '+52'
    }
  }
}

// ███████████████████████████████████████████████████████████████████████████████
// █                            SECCIÓN: HEADER                                 █
// ███████████████████████████████████████████████████████████████████████████████

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

    EventManager.add(menuToggle, 'click', e => {
      e.preventDefault()
      const isOpen = mobileMenu.classList.contains('active')

      if (isOpen) {
        this.closeMenu(mobileMenu, menuOverlay, menuIcon)
      } else {
        this.openMenu(mobileMenu, menuOverlay, menuIcon)
      }
    })

    if (menuOverlay) {
      EventManager.add(menuOverlay, 'click', () => {
        this.closeMenu(mobileMenu, menuOverlay, menuIcon)
      })
    }

    EventManager.add(document, 'keydown', e => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        this.closeMenu(mobileMenu, menuOverlay, menuIcon)
      }
    })

    const menuLinks = mobileMenu.querySelectorAll('a')
    menuLinks.forEach(link => {
      EventManager.add(link, 'click', () => {
        this.closeMenu(mobileMenu, menuOverlay, menuIcon)
      })
    })

    Logger.success('Menú móvil inicializado')
    return true
  },

  openMenu(menu, overlay, icon) {
    DOMHelpers.toggleClasses(menu, ['active'], true)
    if (overlay) DOMHelpers.toggleClasses(overlay, ['active'], true)
    if (icon) DOMHelpers.toggleClasses(icon, ['active'], true)
    DOMHelpers.toggleClasses(document.body, ['menu-open'], true)
  },

  closeMenu(menu, overlay, icon) {
    DOMHelpers.toggleClasses(menu, ['active'], false)
    if (overlay) DOMHelpers.toggleClasses(overlay, ['active'], false)
    if (icon) DOMHelpers.toggleClasses(icon, ['active'], false)
    DOMHelpers.toggleClasses(document.body, ['menu-open'], false)
  }
}

const HeaderSystem = {
  init() {
    Logger.debug('Inicializando sistemas del header...')
    const systems = { mobileMenu: MobileMenu.init() }

    const activeSystems = Object.entries(systems)
      .filter(([_, isActive]) => isActive)
      .map(([name]) => name)

    if (activeSystems.length > 0) {
      Logger.success(`Header - Sistemas activos: ${activeSystems.join(', ')}`)
    }
    return systems
  }
}

// ███████████████████████████████████████████████████████████████████████████████
// █                             SECCIÓN: MODAL                                 █
// ███████████████████████████████████████████████████████████████████████████████

const FormAnimations = {
  init() {
    Logger.debug('Inicializando animaciones del formulario...')

    const inputs = document.querySelectorAll('.form-input')
    const selects = document.querySelectorAll('.form-select')

    inputs.forEach(input => this.setupInputAnimations(input))
    selects.forEach(select => this.setupSelectAnimations(select))

    Logger.success(`Animaciones inicializadas: ${inputs.length} inputs, ${selects.length} selects`)
  },

  setupInputAnimations(input) {
    const checkInputContent = () => {
      const hasContent = input.value.trim() !== ''

      if (hasContent) {
        input.classList.add('has-content')
      } else {
        input.classList.remove('has-content')
      }
    }

    EventManager.add(input, 'blur', checkInputContent)
    EventManager.add(input, 'input', checkInputContent)

    checkInputContent()
  },

  setupSelectAnimations(select) {
    const checkSelectValue = () => {
      const hasSelection = select.value !== '' && select.value !== null

      if (hasSelection) {
        select.classList.add('has-selection')
      } else {
        select.classList.remove('has-selection')
      }
    }

    EventManager.add(select, 'blur', checkSelectValue)
    EventManager.add(select, 'change', checkSelectValue)

    checkSelectValue()
  },

  showError(fieldId) {
    const field = document.getElementById(fieldId)
    const label = field?.parentElement.querySelector('.form-label')

    if (field) {
      field.classList.add('error')
      field.classList.remove('validated')
      if (label) {
        label.classList.add('error')
      }
    }
  },

  clearError(fieldId) {
    const field = document.getElementById(fieldId)
    const label = field?.parentElement.querySelector('.form-label')

    if (field) {
      field.classList.remove('error')
      if (label) label.classList.remove('error')
    }
  },

  markAsValid(fieldId) {
    const field = document.getElementById(fieldId)
    const label = field?.parentElement.querySelector('.form-label')

    if (field) {
      field.classList.add('validated')
      field.classList.remove('error')
      if (label) {
        label.classList.remove('error')
      }
    }
  }
}

const LocationManager = {
  async init() {
    // Buscar elementos por ID de Salesforce o ID genérico
    const paisSelect = document.getElementById('00N7j000002BY1c') || document.getElementById('paisResidencia')
    const departamentoSelect = document.getElementById('d00N7j000002BY1h') || document.getElementById('departamento')
    const ciudadSelect = document.getElementById('00N7j000002BY1i') || document.getElementById('ciudad')
    const locationRow = document.getElementById('location-row')
    const phoneCodeDisplay = document.getElementById('phone-code') // Para mostrar código de país
    const prefijoSelect = document.getElementById('p00NO4000002lUPh') || document.getElementById('prefijo')

    if (!paisSelect || !departamentoSelect || !ciudadSelect) {
      Logger.warning('Elementos de ubicación no encontrados')
      return false
    }

    // Cargar datos de ubicaciones si no están cargados
    if (Object.keys(LOCATION_DATA).length === 0) {
      try {
        await APIManager.loadLocationData()
      } catch (error) {
        Logger.error('Error al cargar datos de ubicaciones')
        return false
      }
    }

    // Poblar países e indicativos
    this.populateCountries(paisSelect)
    if (prefijoSelect) {
      this.populatePhoneCodes(prefijoSelect)
    }

    EventManager.add(paisSelect, 'change', () => {
      this.handleCountryChange(
        paisSelect.value,
        departamentoSelect,
        ciudadSelect,
        locationRow,
        phoneCodeDisplay
      )
    })

    EventManager.add(departamentoSelect, 'change', () => {
      this.handleStateChange(paisSelect.value, departamentoSelect.value, ciudadSelect)
    })

    Logger.success('Gestor de ubicaciones inicializado')
    return true
  },

  populateCountries(paisSelect) {
    // Limpiar opciones existentes (excepto la primera)
    const firstOption = paisSelect.querySelector('option[value=""]')
    paisSelect.innerHTML = ''
    if (firstOption) {
      paisSelect.appendChild(firstOption.cloneNode(true))
    }

    // Agregar TODOS los países desde COUNTRY_CODES (que tiene la lista completa)
    const sortedCountries = Object.keys(COUNTRY_CODES).sort()
    sortedCountries.forEach(country => {
      const option = document.createElement('option')
      option.value = country
      option.textContent = country
      paisSelect.appendChild(option)
    })
  },

  populatePhoneCodes(prefijoSelect) {
    // Limpiar opciones existentes
    prefijoSelect.innerHTML = ''

    // Agregar indicativos desde COUNTRY_CODES, ordenados por país
    const sortedCountries = Object.keys(COUNTRY_CODES).sort()
    sortedCountries.forEach(country => {
      const phoneCode = COUNTRY_CODES[country]
      const option = document.createElement('option')
      option.value = phoneCode
      option.textContent = `${country} ${phoneCode}`
      // Si hay banderas disponibles, se podrían agregar aquí
      prefijoSelect.appendChild(option)
    })

    // Seleccionar Colombia por defecto si existe
    if (COUNTRY_CODES['Colombia']) {
      prefijoSelect.value = COUNTRY_CODES['Colombia']
    }
  },

  handleCountryChange(country, departamentoSelect, ciudadSelect, locationRow, phoneCodeDisplay) {
    // Limpiar selects
    this.clearSelect(departamentoSelect)
    this.clearSelect(ciudadSelect)

    // Mostrar código de país si existe el elemento
    if (phoneCodeDisplay && COUNTRY_CODES[country]) {
      phoneCodeDisplay.textContent = COUNTRY_CODES[country]
    }

    // Solo mostrar departamentos/ciudades para Colombia
    if (country === 'Colombia' && LOCATION_DATA[country]) {
      // Mostrar fila de ubicación
      if (locationRow) {
        locationRow.style.display = 'flex'

        // Animar la aparición
        TimingUtils.delay(() => {
          locationRow.style.opacity = '1'
          locationRow.style.transform = 'translateY(0)'
        }, 10)
      }

      // Poblar departamentos
      const states = Object.keys(LOCATION_DATA[country])
      states.forEach(state => {
        const option = document.createElement('option')
        option.value = state
        option.textContent = state
        departamentoSelect.appendChild(option)
      })

      departamentoSelect.disabled = false

      // Reinicializar animaciones
      FormAnimations.setupSelectAnimations(departamentoSelect)
      FormAnimations.setupSelectAnimations(ciudadSelect)
    } else {
      // Ocultar fila de ubicación para otros países
      if (locationRow) {
        locationRow.style.display = 'none'
      }
      departamentoSelect.disabled = true
      ciudadSelect.disabled = true
    }
  },

  handleStateChange(country, state, ciudadSelect) {
    this.clearSelect(ciudadSelect)

    if (!country || !state || !LOCATION_DATA[country] || !LOCATION_DATA[country][state]) {
      ciudadSelect.disabled = true
      return
    }

    // Poblar ciudades
    const cities = LOCATION_DATA[country][state]
    cities.forEach(city => {
      const option = document.createElement('option')
      option.value = city
      option.textContent = city
      ciudadSelect.appendChild(option)
    })

    ciudadSelect.disabled = false
  },

  clearSelect(select) {
    // Mantener la primera opción vacía
    const firstOption = select.querySelector('option[value=""]')
    select.innerHTML = ''
    if (firstOption) {
      select.appendChild(firstOption.cloneNode(true))
    }
  }
}

const ContactModal = {
  init() {
    this.modal = document.getElementById('contact-modal')
    this.overlay = document.getElementById('modal-overlay')
    this.closeBtn = document.getElementById('modal-close')
    this.form = document.getElementById('contact-form')
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

    // Botón cerrar - MEJORADO
    if (this.closeBtn) {
      Logger.debug('Configurando botón de cerrar modal')
      EventManager.add(this.closeBtn, 'click', e => {
        e.preventDefault()
        e.stopPropagation()
        Logger.debug('Botón cerrar clickeado')
        this.close()
      })
    } else {
      Logger.warning('Botón de cerrar no encontrado')
    }

    // Cerrar con overlay - mejorado para evitar interferencia con elementos internos
    EventManager.add(this.overlay, 'click', e => {
      // Solo cerrar si el click es exactamente en el overlay, no en elementos hijos
      if (e.target === this.overlay && !e.defaultPrevented) {
        e.preventDefault()
        this.close()
      }
    })

    // Prevenir que clicks dentro del modal cierren el modal
    EventManager.add(this.modal, 'click', e => {
      e.stopPropagation()
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
    const inputs = this.form.querySelectorAll('input, select')
    inputs.forEach(input => {
      EventManager.add(input, 'blur', () => {
        if (input.hasAttribute('required')) {
          this.validateField(input)
        }
      })
    })
  },

  async open() {
    Logger.debug('Abriendo modal...')
    
    // Mostrar modal
    DOMHelpers.toggleClasses(this.modal, ['show'], true)
    DOMHelpers.toggleClasses(this.overlay, ['active'], true)
    DOMHelpers.toggleClasses(document.body, ['modal-open'], true)

    // Activar animación
    TimingUtils.delay(() => {
      DOMHelpers.toggleClasses(this.modal, ['active'], true)
    }, 10)

    // Mostrar loading mientras se cargan los datos
    this.showLoadingState()

    // Inicializar sistemas del formulario
    try {
      await LocationManager.init()
      this.hideLoadingState()

      TimingUtils.delay(() => {
        FormAnimations.init()
      }, 50)

      // Enfocar primer input
      TimingUtils.delay(() => {
        const firstInput = this.modal.querySelector(
          'input:not([type="radio"]):not([type="checkbox"])'
        )
        if (firstInput) firstInput.focus()
      }, 300)
    } catch (error) {
      this.showErrorState('Error al cargar datos de ubicaciones')
    }

    Logger.debug('Modal abierto')
  },

  showLoadingState() {
    const paisSelect = document.getElementById('00N7j000002BY1c') || document.getElementById('paisResidencia')
    const prefijoSelect = document.getElementById('p00NO4000002lUPh') || document.getElementById('prefijo')
    
    if (paisSelect) {
      paisSelect.disabled = true
      paisSelect.innerHTML = '<option value="">Cargando países...</option>'
    }
    
    if (prefijoSelect) {
      prefijoSelect.disabled = true
      prefijoSelect.innerHTML = '<option value="">Cargando indicativos...</option>'
    }
  },

  hideLoadingState() {
    const paisSelect = document.getElementById('00N7j000002BY1c') || document.getElementById('paisResidencia')
    const prefijoSelect = document.getElementById('p00NO4000002lUPh') || document.getElementById('prefijo')
    
    if (paisSelect) {
      paisSelect.disabled = false
    }
    
    if (prefijoSelect) {
      prefijoSelect.disabled = false
    }
  },

  showErrorState(message) {
    const paisSelect = document.getElementById('00N7j000002BY1c') || document.getElementById('paisResidencia')
    const prefijoSelect = document.getElementById('p00NO4000002lUPh') || document.getElementById('prefijo')
    
    if (paisSelect) {
      paisSelect.disabled = false
      paisSelect.innerHTML = `<option value="">Error: ${message}</option>`
    }
    
    if (prefijoSelect) {
      prefijoSelect.disabled = false
      prefijoSelect.innerHTML = `<option value="">Error: ${message}</option>`
    }
  },

  close() {
    Logger.debug('Cerrando modal...')
    
    // Remover inmediatamente la clase modal-open del body para restaurar scroll
    DOMHelpers.toggleClasses(document.body, ['modal-open'], false)
    
    // Restaurar overflow del body inmediatamente
    document.body.style.overflow = ''
    document.body.style.position = ''
    document.body.style.width = ''
    
    // Quitar animación
    DOMHelpers.toggleClasses(this.modal, ['active'], false)

    // Ocultar modal después de la animación
    TimingUtils.delay(() => {
      DOMHelpers.toggleClasses(this.modal, ['show'], false)
      DOMHelpers.toggleClasses(this.overlay, ['active'], false)
      // Asegurar que la clase se remueva por segunda vez por seguridad
      document.body.classList.remove('modal-open')
      // Restaurar overflow por segunda vez por seguridad
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }, 400)

    Logger.debug('Modal cerrado')
  },

  validateField(input) {
    const { name, value } = input
    let isValid = true
    let message = ''

    switch (name) {
      case 'nombres':
      case 'apellidos':
        isValid = Validators.name(value)
        message = 'Mínimo 2 caracteres, solo letras'
        break
      case 'tipoDocumento':
        isValid = Validators.required(value)
        message = 'Selecciona un tipo de documento'
        break
      case 'numeroDocumento':
        isValid = Validators.document(value)
        message = 'Entre 6 y 12 dígitos'
        break
      case 'telefono':
        isValid = Validators.phone(value)
        message = 'Número de teléfono válido'
        break
      case 'email':
        isValid = Validators.email(value)
        message = 'Correo electrónico válido'
        break
      case 'paisResidencia':
      case 'departamento':
      case 'ciudad':
      case 'periodoIngreso':
        isValid = Validators.required(value)
        message = 'Este campo es obligatorio'
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

    FormAnimations.clearError(input.id)

    if (message) {
      FormAnimations.showError(input.id)
      const errorElement = DOMHelpers.createElement('span', 'field-error', message)
      container.appendChild(errorElement)
    } else {
      FormAnimations.markAsValid(input.id)
    }
  },

  async handleSubmit() {
    const formData = new FormData(this.form)
    const data = Object.fromEntries(formData.entries())

    // Validar todos los campos
    const inputs = this.form.querySelectorAll('input[required], select[required]')
    let isValid = true

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false
      }
    })

    // Validar autorización
    const autorizacionChecked = this.form.querySelector('input[name="autorizacion"]:checked')
    if (!autorizacionChecked) {
      isValid = false
      const termsGroup = this.form.querySelector('.terms-group')
      if (termsGroup) termsGroup.classList.add('error')
    }

    if (!isValid) {
      Logger.warning('Formulario con errores de validación')
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

      Logger.success('Formulario enviado correctamente', data)
      this.showSuccess()

      // Cerrar modal después de un momento
      TimingUtils.delay(() => {
        this.close()
        this.form.reset()
      }, 3000)
    } catch (error) {
      Logger.error('Error al enviar formulario:', error)
      this.showError('Ocurrió un error al enviar el formulario. Intenta nuevamente.')
    } finally {
      submitBtn.textContent = originalText
      submitBtn.disabled = false
    }
  },

  showSuccess() {
    const successHTML = `
      <div class="success-message">
        <div class="success-icon">✅</div>
        <p><strong>¡Gracias! Hemos recibido tu información.</strong></p>
        <p>Te contactaremos pronto con más detalles del programa.</p>
      </div>
    `

    const modalContent = this.modal.querySelector('.modal-content')
    modalContent.innerHTML = successHTML
  },

  showError(message) {
    const errorHTML = `
      <div class="error-message">
        <div class="error-icon">❌</div>
        <p><strong>Error al enviar</strong></p>
        <p>${message}</p>
        <button class="btn btn-primary" onclick="location.reload()">Intentar nuevamente</button>
      </div>
    `

    const modalContent = this.modal.querySelector('.modal-content')
    modalContent.innerHTML = errorHTML
  }
}

const ModalSystem = {
  init() {
    Logger.debug('Inicializando sistemas del modal...')

    const systems = {
      contactModal: ContactModal.init(),
      formAnimations: true,
      locationManager: true
    }

    const activeSystems = Object.entries(systems)
      .filter(([_, isActive]) => isActive)
      .map(([name]) => name)

    if (activeSystems.length > 0) {
      Logger.success(`Modal - Sistemas activos: ${activeSystems.join(', ')}`)
    }
    return systems
  }
}

// ███████████████████████████████████████████████████████████████████████████████
// █                        INICIALIZACIÓN GENERAL                              █
// ███████████████████████████████████████████████████████████████████████████████

const AppSystem = {
  async init() {
    Logger.debug('🚀 Inicializando aplicación...')

    try {
      // Pre-cargar datos de ubicaciones
      Logger.debug('Pre-cargando datos de ubicaciones...')
      await APIManager.loadLocationData()

      // Inicializar sistemas
      const headerSystems = HeaderSystem.init()
      const modalSystems = ModalSystem.init()

      // Reporte final
      const allSystems = { ...headerSystems, ...modalSystems }
      const totalActiveSystems = Object.values(allSystems).filter(Boolean).length

      Logger.success(`✅ Aplicación iniciada - ${totalActiveSystems} sistemas activos`)
      return allSystems
    } catch (error) {
      Logger.warning('⚠️ Aplicación iniciada con limitaciones - Error al cargar datos externos')

      // Inicializar sistemas básicos sin datos externos
      const headerSystems = HeaderSystem.init()
      const modalSystems = ModalSystem.init()

      return { ...headerSystems, ...modalSystems }
    }
  }
}

// ===========================================
// AUTO-INICIALIZACIÓN PARA LIFERAY
// ===========================================

// Función principal para usar en Liferay
function initHeaderModal() {
  DOMHelpers.isReady(async () => {
    await AppSystem.init()

    // Cleanup global al cambiar de página
    window.addEventListener('beforeunload', () => {
      Logger.debug('🧹 Limpiando eventos globales...')
      EventManager.cleanup()
    })
  })
}

// Auto-ejecutar si no es un módulo
if (typeof module === 'undefined') {
  initHeaderModal()
}

// Exportar para uso como módulo (si es necesario)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = initHeaderModal
}

// Para compatibilidad con diferentes sistemas
if (typeof window !== 'undefined') {
  window.initHeaderModal = initHeaderModal
}

// Exportar por defecto para Next.js
export default initHeaderModal