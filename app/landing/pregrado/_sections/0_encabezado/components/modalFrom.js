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
  async loadLocationData() {
    try {
      const [ubicaciones, codigosPais, periodos] = await Promise.all([
        window.APIManager.get(API_ENDPOINTS.ubicaciones),
        window.APIManager.get(API_ENDPOINTS.codigosPais),
        window.APIManager.get(API_ENDPOINTS.periodos)
      ])

      LOCATION_DATA = this.processLocationData(ubicaciones)
      COUNTRY_CODES = this.processCountryCodes(codigosPais)
      PERIODS_DATA = periodos

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
      Logger.error('Elementos de ubicación no encontrados')
      return false
    }

    this.populateCountrySelect(paisSelect)
    this.populateCountryCodeSelect()
    this.setupLocationHandlers(paisSelect, departamentoSelect, ciudadSelect)

    const checkSelectValue = () => {
      const selectedCountry = paisSelect.value
      if (selectedCountry && selectedCountry === 'Colombia') {
        DOMHelpers.toggleClasses(locationRow, ['show'], true)
      } else {
        DOMHelpers.toggleClasses(locationRow, ['show'], false)
        if (departamentoSelect) departamentoSelect.value = ''
        if (ciudadSelect) ciudadSelect.value = ''
      }
    }

    EventManager.add(paisSelect, 'change', checkSelectValue)
    checkSelectValue()

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

      if (selectedCountry && selectedDepartment && LOCATION_DATA[selectedCountry] && LOCATION_DATA[selectedCountry][selectedDepartment]) {
        LOCATION_DATA[selectedCountry][selectedDepartment].sort().forEach(ciudad => {
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

// FormValidation ahora usa las utilidades globales pero mantiene lógica específica
const FormValidation = {
  // Lógica específica de manejo de submit para este formulario
  handleSubmit(form) {
    // Usar el FormManager global para validación
    const validation = window.FormManager.validateForm(form)

    // Mostrar errores usando FormManager global
    Object.entries(validation.results).forEach(([fieldName, result]) => {
      const field = DOMHelpers.findElement(`[name="${fieldName}"]`, form)
      if (field && field.id) {
        if (!result.isValid) {
          window.FormManager.showFieldError(field.id, result.message)
        } else {
          window.FormManager.markFieldAsValid(field.id)
        }
      }
    })

    // Validación específica de términos y condiciones
    const autorizacionChecked = DOMHelpers.findElement('input[name="00N5G00000WmhvF"]:checked', form)
    if (!autorizacionChecked) {
      validation.isValid = false
      const termsGroup = DOMHelpers.findElement('.terms-group', form)
      if (termsGroup) termsGroup.classList.add('error')
    }

    if (!validation.isValid) {
      return false
    }

    // Configuración específica antes del envío
    const retURL = DOMHelpers.findElement('#retURL')
    if (retURL) {
      retURL.value = window.location.href
    }

    const submitBtn = DOMHelpers.findElement('[type="submit"]', form)
    if (submitBtn) {
      submitBtn.textContent = 'Enviando...'
      submitBtn.disabled = true
    }

    form.submit()
    return true
  },

  // Configurar el formulario usando FormManager global
  setupFormValidation(form) {
    if (!form) return

    // Usar FormManager global para configurar validación en tiempo real
    window.FormManager.setupLiveValidation(form)

    // Configurar submit específico de este formulario
    EventManager.add(form, 'submit', e => {
      e.preventDefault()
      this.handleSubmit(form)
    })
  }
}

// ███████████████████████████████████████████████████████████████████████████████
// █                      SISTEMA PRINCIPAL DEL FORMULARIO                     █
// ███████████████████████████████████████████████████████████████████████████████

const ModalForm = {
  async initLocationData() {
    // Verificar que las utilidades globales estén disponibles
    if (typeof window === 'undefined' || !window.Logger || !window.DOMHelpers || !window.EventManager) {
      throw new Error('Utilidades globales no disponibles')
    }

    try {
      await APIManager.loadLocationData()
      await LocationManager.init()
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
    // Configurar UTMs cuando se configura el formulario
    this.setupUTMTracking(form)
  },

  setupUTMTracking(form) {
    // Configuración de UTMs para el formulario
    const urlParams = new URLSearchParams(window.location.search)

    const utmSource = DOMHelpers.findElement('#utm-source', form)
    const utmSubsource = DOMHelpers.findElement('#utm-subsource', form)
    const utmMedium = DOMHelpers.findElement('#utm-medium', form)
    const utmCampaign = DOMHelpers.findElement('#utm-campaign', form)
    const programaField = DOMHelpers.findElement('#programa', form)

    if (utmSource) utmSource.value = urlParams.get('utm_source') || 'Javeriana'
    if (utmSubsource) utmSubsource.value = urlParams.get('utm_subsource') || 'Organico'
    if (utmMedium) utmMedium.value = urlParams.get('utm_medium') || 'Landing'
    if (utmCampaign) utmCampaign.value = urlParams.get('utm_campaign') || 'Mercadeo'

    if (programaField && typeof codPrograma !== 'undefined') {
      programaField.value = codPrograma
    }
  },

  // Métodos para compatibilidad con el HeaderManager
  async init() {
    return {
      formAnimations: true,
      locationManager: false, // Se inicializa bajo demanda
      formValidation: true
    }
  },

  cleanup() {
    if (typeof window !== 'undefined' && window.EventManager) {
      EventManager.cleanup()
    }
  }
}

export default ModalForm
