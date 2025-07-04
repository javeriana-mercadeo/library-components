// ===========================================
// FORM MANAGER - Solo lógica del formulario
// ===========================================

// URLs de las APIs
const API_ENDPOINTS = {
  ubicaciones: 'https://www.javeriana.edu.co/recursosdb/1372208/10609114/ubicaciones.json',
  codigosPais: 'https://www.javeriana.edu.co/recursosdb/1372208/10609114/codigos_pais.json',
  programas: 'https://www.javeriana.edu.co/recursosdb/1372208/10609114/programas.json',
  periodos: 'https://www.javeriana.edu.co/recursosdb/1372208/10609114/periodos.json'
}

// Cache para los datos de las APIs
let LOCATION_DATA = {}
let COUNTRY_CODES = {}
let PROGRAM_URL = ''
let PERIODS_DATA = []

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
      const [ubicaciones, codigosPais, periodos] = await Promise.all([
        this.fetchData(API_ENDPOINTS.ubicaciones),
        this.fetchData(API_ENDPOINTS.codigosPais),
        this.fetchData(API_ENDPOINTS.periodos)
      ])

      LOCATION_DATA = this.processLocationData(ubicaciones)
      COUNTRY_CODES = this.processCountryCodes(codigosPais)
      PERIODS_DATA = periodos

      Logger.success('Datos de ubicaciones cargados')
      return { LOCATION_DATA, COUNTRY_CODES, PERIODS_DATA }
    } catch (error) {
      Logger.error('Error al cargar datos de ubicaciones:', error)
      throw error
    }
  },

  processLocationData(data) {
    return data.reduce((acc, location) => {
      const { PAIS, DEPTO, CIUDAD } = location
      
      if (!acc[PAIS]) {
        acc[PAIS] = {}
      }
      if (!acc[PAIS][DEPTO]) {
        acc[PAIS][DEPTO] = []
      }
      if (!acc[PAIS][DEPTO].includes(CIUDAD)) {
        acc[PAIS][DEPTO].push(CIUDAD)
      }
      
      return acc
    }, {})
  },

  processCountryCodes(data) {
    return data.reduce((acc, country) => {
      acc[country.PAIS] = country.INDICATIVO
      return acc
    }, {})
  }
}

// ███████████████████████████████████████████████████████████████████████████████
// █                      SECCIÓN: ANIMACIONES DE FORMULARIO                   █
// ███████████████████████████████████████████████████████████████████████████████

const FormAnimations = {
  init() {
    const formGroups = DOMHelpers.findElements('.form-group')
    
    formGroups.forEach((group, index) => {
      TimingUtils.delay(() => {
        DOMHelpers.toggleClasses(group, ['animate-in'], true)
      }, index * 50)
    })

    Logger.debug('Animaciones de formulario inicializadas')
  },

  showError(fieldId) {
    const field = DOMHelpers.findElement(`#${fieldId}`)
    const label = field?.parentElement.querySelector('.form-label')

    if (field) {
      DOMHelpers.toggleClasses(field, ['error'], true)
      DOMHelpers.toggleClasses(field, ['validated'], false)
      if (label) {
        DOMHelpers.toggleClasses(label, ['error'], true)
      }
    }
  },

  clearError(fieldId) {
    const field = DOMHelpers.findElement(`#${fieldId}`)
    const label = field?.parentElement.querySelector('.form-label')

    if (field) {
      DOMHelpers.toggleClasses(field, ['error'], false)
      if (label) DOMHelpers.toggleClasses(label, ['error'], false)
    }
  },

  markAsValid(fieldId) {
    const field = DOMHelpers.findElement(`#${fieldId}`)
    const label = field?.parentElement.querySelector('.form-label')

    if (field) {
      DOMHelpers.toggleClasses(field, ['validated'], true)
      DOMHelpers.toggleClasses(field, ['error'], false)
      if (label) {
        DOMHelpers.toggleClasses(label, ['error'], false)
      }
    }
  }
}

// ███████████████████████████████████████████████████████████████████████████████
// █                     SECCIÓN: GESTOR DE UBICACIONES                        █
// ███████████████████████████████████████████████████████████████████████████████

const LocationManager = {
  async init() {
    const paisSelect = DOMHelpers.findElement('#00N5G00000WmhvJ')
    const departamentoSelect = DOMHelpers.findElement('#00N5G00000WmhvX')
    const ciudadSelect = DOMHelpers.findElement('#00N5G00000WmhvO')
    const locationRow = DOMHelpers.findElement('#location-row')

    if (!paisSelect || !locationRow) {
      Logger.warning('Elementos de ubicación no encontrados')
      return false
    }

    this.populateCountrySelect(paisSelect)
    this.populateCountryCodeSelect()
    this.setupLocationHandlers(paisSelect, departamentoSelect, ciudadSelect)

    const checkSelectValue = () => {
      const selectedCountry = paisSelect.value
      if (selectedCountry && selectedCountry === 'Colombia') {
        DOMHelpers.toggleClasses(locationRow, ['show'], true)
        Logger.debug('Campos de Colombia mostrados')
      } else {
        DOMHelpers.toggleClasses(locationRow, ['show'], false)
        if (departamentoSelect) departamentoSelect.value = ''
        if (ciudadSelect) ciudadSelect.value = ''
        Logger.debug('Campos de Colombia ocultados')
      }
    }

    EventManager.add(paisSelect, 'change', checkSelectValue)
    checkSelectValue()

    Logger.success('Gestor de ubicaciones inicializado')
    return true
  },

  populateCountrySelect(paisSelect) {
    paisSelect.innerHTML = '<option value="">Selecciona un país</option>'
    
    Object.keys(LOCATION_DATA)
      .sort()
      .forEach(pais => {
        const option = DOMHelpers.createElement('option')
        option.value = pais
        option.textContent = pais
        paisSelect.appendChild(option)
      })

    Logger.debug('Países cargados en select')
  },

  populateCountryCodeSelect() {
    const prefijoSelect = DOMHelpers.findElement('#00NJw000002mzb7')
    if (!prefijoSelect) return

    prefijoSelect.innerHTML = '<option value="">Indicativo</option>'
    
    Object.entries(COUNTRY_CODES)
      .sort(([, a], [, b]) => a - b)
      .forEach(([pais, codigo]) => {
        const option = DOMHelpers.createElement('option')
        option.value = codigo
        option.textContent = `+${codigo} (${pais})`
        prefijoSelect.appendChild(option)
      })

    Logger.debug('Códigos de país cargados')
  },

  setupLocationHandlers(paisSelect, departamentoSelect, ciudadSelect) {
    if (!departamentoSelect || !ciudadSelect) return

    EventManager.add(paisSelect, 'change', () => {
      const selectedCountry = paisSelect.value
      
      departamentoSelect.innerHTML = '<option value="">Selecciona un departamento</option>'
      ciudadSelect.innerHTML = '<option value="">Selecciona una ciudad</option>'

      if (selectedCountry && LOCATION_DATA[selectedCountry]) {
        Object.keys(LOCATION_DATA[selectedCountry])
          .sort()
          .forEach(depto => {
            const option = DOMHelpers.createElement('option')
            option.value = depto
            option.textContent = depto
            departamentoSelect.appendChild(option)
          })
      }
    })

    EventManager.add(departamentoSelect, 'change', () => {
      const selectedCountry = paisSelect.value
      const selectedDepartment = departamentoSelect.value
      
      ciudadSelect.innerHTML = '<option value="">Selecciona una ciudad</option>'

      if (selectedCountry && selectedDepartment && 
          LOCATION_DATA[selectedCountry] && 
          LOCATION_DATA[selectedCountry][selectedDepartment]) {
        LOCATION_DATA[selectedCountry][selectedDepartment]
          .sort()
          .forEach(ciudad => {
            const option = DOMHelpers.createElement('option')
            option.value = ciudad
            option.textContent = ciudad
            ciudadSelect.appendChild(option)
          })
      }
    })
  }
}

// ███████████████████████████████████████████████████████████████████████████████
// █                     SECCIÓN: VALIDACIÓN DE FORMULARIO                     █
// ███████████████████████████████████████████████████████████████████████████████

const FormValidation = {
  validateField(input) {
    const { name, value } = input
    let isValid = true
    let message = ''

    switch (name) {
      case 'first_name':
      case 'last_name':
        isValid = Validators.name(value)
        message = 'Mínimo 2 caracteres, solo letras'
        break
      case '00N5G00000WmhsT':
        isValid = Validators.required(value)
        message = 'Selecciona un tipo de identificación'
        break
      case '00NJw000002mzbM':
        isValid = Validators.required(value)
        message = 'Ingresa un número de identificación'
        break
      case 'phone':
        isValid = Validators.required(value)
        message = 'Ingresa un número de teléfono'
        break
      case 'email':
        isValid = value.trim() !== '' ? Validators.email(value) : true
        message = 'Ingresa un email válido'
        break
      case '00N5G00000WmhvJ':
        isValid = Validators.required(value)
        message = 'Selecciona un país'
        break
      case '00N5G00000WmhvX':
        isValid = Validators.required(value)
        message = 'Selecciona un departamento'
        break
      case '00N5G00000WmhvO':
        isValid = Validators.required(value)
        message = 'Selecciona una ciudad'
        break
    }

    this.updateFieldStatus(input, isValid, message)
    return isValid
  },

  updateFieldStatus(input, isValid, message) {
    const container = input.closest('.form-group') || input.parentElement
    if (!container) return

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

  setupFormValidation(form) {
    if (!form) return

    EventManager.add(form, 'submit', e => {
      e.preventDefault()
      this.handleSubmit(form)
    })

    const inputs = DOMHelpers.findElements('input, select', form)
    inputs.forEach(input => {
      EventManager.add(input, 'blur', () => {
        if (input.hasAttribute('required')) {
          this.validateField(input)
        }
      })

      if (input.type === 'email') {
        EventManager.add(input, 'input', () => {
          if (input.value.trim() !== '') {
            this.validateField(input)
          }
        })
      }
    })
  },

  handleSubmit(form) {
    const inputs = DOMHelpers.findElements('input[required], select[required]', form)
    let isValid = true

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false
      }
    })

    const autorizacionChecked = DOMHelpers.findElement('input[name="00N5G00000WmhvF"]:checked', form)
    if (!autorizacionChecked) {
      isValid = false
      const termsGroup = DOMHelpers.findElement('.terms-group', form)
      if (termsGroup) termsGroup.classList.add('error')
    }

    if (!isValid) {
      Logger.warning('Formulario con errores de validación')
      return false
    }

    const retURL = DOMHelpers.findElement('#retURL')
    if (retURL) {
      retURL.value = window.location.href
    }

    const submitBtn = DOMHelpers.findElement('[type="submit"]', form)
    if (submitBtn) {
      submitBtn.textContent = 'Enviando...'
      submitBtn.disabled = true
    }

    Logger.debug('Enviando formulario a Salesforce usando form.submit()...')
    form.submit()

    return true
  }
}

// ███████████████████████████████████████████████████████████████████████████████
// █                      SISTEMA PRINCIPAL DEL FORMULARIO                     █
// ███████████████████████████████████████████████████████████████████████████████

const FormManager = {
  async initLocationData() {
    // Verificar que las utilidades globales estén disponibles
    if (typeof window === 'undefined' || !window.Logger || !window.DOMHelpers || !window.EventManager) {
      console.warn('⚠️ Utilidades globales no disponibles para FormManager')
      throw new Error('Utilidades globales no disponibles')
    }

    Logger.debug('Inicializando datos de ubicaciones...')

    try {
      await APIManager.loadLocationData()
      await LocationManager.init()
      Logger.success('Datos de ubicaciones inicializados')
      return true
    } catch (error) {
      Logger.error('Error al inicializar datos de ubicaciones:', error)
      throw error
    }
  },

  initFormAnimations() {
    FormAnimations.init()
  },

  setupFormValidation(form) {
    FormValidation.setupFormValidation(form)
  },

  // Métodos para compatibilidad con el HeaderManager
  async init() {
    Logger.debug('FormManager inicializado (solo utilidades)')
    return {
      formAnimations: true,
      locationManager: false, // Se inicializa bajo demanda
      formValidation: true
    }
  },

  cleanup() {
    if (typeof window !== 'undefined' && window.Logger) {
      Logger.debug('Limpiando eventos del formulario...')
    }
    if (typeof window !== 'undefined' && window.EventManager) {
      EventManager.cleanup()
    }
  }
}

// Exportar para uso como módulo ES6
export default FormManager

// Para compatibilidad con diferentes sistemas
if (typeof window !== 'undefined') {
  window.FormManager = FormManager
  window.APIManager = APIManager
  window.LocationManager = LocationManager
  window.FormValidation = FormValidation
  window.FormAnimations = FormAnimations
}