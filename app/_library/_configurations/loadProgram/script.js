// ===========================================
// ACCESO A UTILIDADES GLOBALES
// ===========================================
// Las utilidades globales se cargan automáticamente y están disponibles en window
// Este script será compilado por el sistema de build que resuelve las dependencias

const codProgram = configuration['codeProgram'] // Tomada de liferay

// Función para obtener utilidades globales del window con fallback
const getGlobalUtils = () => {
  if (typeof window === 'undefined') {
    console.warn('Window no disponible, usando fallbacks básicos')
    return {
      Logger: {
        debug: console.log,
        info: console.log,
        success: console.log,
        warning: console.warn,
        error: console.error,
        group: console.group || (() => {}),
        groupEnd: console.groupEnd || (() => {})
      },
      DOMUtils: {
        findElement: selector => document.querySelector(selector),
        findElements: (selector, context = document) => Array.from(context.querySelectorAll(selector)),
        createElement: (tag, options = {}) => {
          const element = document.createElement(tag)
          if (options.className) element.className = options.className
          if (options.textContent) element.textContent = options.textContent
          return element
        },
        empty: element => {
          if (element) element.innerHTML = ''
        },
        isReady: callback => {
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', callback)
          } else {
            callback()
          }
        }
      },
      HTTPClient: class {
        constructor() {}
        async get(url) {
          const response = await fetch(url)
          return { data: await response.json() }
        }
        async post(url, data) {
          const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          })
          return { data: await response.json() }
        }
      },
      EventManager: {
        emit: (element, eventType, detail) => {
          const event = new CustomEvent(eventType, { detail })
          element.dispatchEvent(event)
        },
        add: (element, event, handler) => {
          element.addEventListener(event, handler)
        }
      },
      StringUtils: {
        capitalize: str => (str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : ''),
        capitalizeWords: str => (str ? str.replace(/\b\w/g, char => char.toUpperCase()) : ''),
        isEmpty: str => !str || str.toString().trim().length === 0,
        isAlphanumeric: str => /^[a-zA-Z0-9]+$/.test(str),
        replace: (str, search, replacement) => str.replace(new RegExp(search, 'g'), replacement),
        trim: str => (str ? str.trim() : '')
      },
      DataUtils: {
        deepMerge: (target, source) => ({ ...target, ...source }),
        filterBy: (array, filters) => array.filter(item => Object.entries(filters).every(([key, value]) => item[key] === value)),
        pick: (obj, keys) => {
          const result = {}
          keys.forEach(key => {
            if (key in obj) result[key] = obj[key]
          })
          return result
        }
      }
    }
  }

  // Intentar obtener las utilidades del window (cargadas por ClientSideUtils)
  return {
    Logger: window.Logger || window.getGlobalUtils?.()?.Logger,
    DOMUtils: window.DOMUtils || window.DOMHelpers,
    HTTPClient: window.HTTPClient,
    EventManager: window.EventManager,
    StringUtils: window.StringUtils,
    DataUtils: window.DataUtils
  }
}

// Obtener utilidades con fallback seguro
const { Logger, DOMUtils, HTTPClient, EventManager, StringUtils, DataUtils } = getGlobalUtils()
let statusPage = {}

// ===========================================
// CONFIGURACIÓN
// ===========================================
//
// Este archivo maneja la carga global de datos del programa y
// actualiza automáticamente todos los elementos DOM que tengan
// atributos data-puj-* en toda la aplicación.
//
const CONFIG = {
  EVENT_NAME: 'data_load-program',
  API_ENDPOINTS: {
    JAVERIANA: 'https://www.javeriana.edu.co/JaveMovil/ValoresMatricula-1/rs/psujsfvaportals',
    SEARCH: 'https://www.javeriana.edu.co/prg-api/searchpuj/general-search-program',
    WHATSAPP: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/whatsapps'
  },
  CACHE_TTL: 300000, // 5 minutos
  RETRY_ATTEMPTS: 3,
  TIMEOUT: 10000
}

// Cliente HTTP configurado con reintentos y timeout
const apiClient = HTTPClient
  ? new HTTPClient('', {
      timeout: CONFIG.TIMEOUT,
      retries: CONFIG.RETRY_ATTEMPTS,
      retryDelay: 1000
    })
  : new (getGlobalUtils().HTTPClient)()

// ===========================================
// NORMALIZACIÓN DE FACULTADES
// ===========================================
const FacultyNormalizer = {
  /**
   * Normaliza nombres de facultades para hacer comparaciones flexibles
   * Maneja abreviaciones y variaciones comunes
   */
  normalize(facultyName) {
    if (!facultyName || typeof facultyName !== 'string') return ''

    // Limpiar espacios y quitar "Facultad de" al inicio
    let clean = facultyName.replace(/^Facultad de /i, '').trim()

    // Mapeo de abreviaciones conocidas a nombres completos
    const facultyMappings = {
      'Cs.Económicas y Administrativ.': 'Ciencias Económicas y Administrativas',
      'Cs.Económicas y Administrativas': 'Ciencias Económicas y Administrativas',
      'Cs.Políticas y Relaciones Int.': 'Ciencias Políticas y Relaciones Internacionales',
      'Arquitectura y Diseño': 'Arquitectura y Diseño'
      // Agregar más mapeos según sea necesario
    }

    // Aplicar mapeo si existe
    if (facultyMappings[clean]) {
      return facultyMappings[clean]
    }

    return clean
  }
}

// ===========================================
// SISTEMA DE FORMATEO DE DATOS
// ===========================================
const DataFormatter = {
  // Cache para números convertidos - usando Map nativo optimizado
  _numberWordsCache: new Map(),

  // Diccionarios optimizados (solo hasta 20 para casos comunes)
  _numberDictionary: {
    units: [
      '',
      'uno',
      'dos',
      'tres',
      'cuatro',
      'cinco',
      'seis',
      'siete',
      'ocho',
      'nueve',
      'diez',
      'once',
      'doce',
      'trece',
      'catorce',
      'quince',
      'dieciséis',
      'diecisiete',
      'dieciocho',
      'diecinueve'
    ],
    tens: ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'],
    hundreds: [
      '',
      'ciento',
      'doscientos',
      'trescientos',
      'cuatrocientos',
      'quinientos',
      'seiscientos',
      'setecientos',
      'ochocientos',
      'novecientos'
    ]
  },

  capitalizeFirst(str) {
    return StringUtils.capitalize(str)
  },

  cleanDate(dateStr) {
    if (!dateStr) return dateStr
    return StringUtils.replace(dateStr, '.', '', false).trim()
  },

  numberToWords(number) {
    // Usar cache para números ya convertidos
    if (this._numberWordsCache.has(number)) {
      return this._numberWordsCache.get(number)
    }

    const { units, tens, hundreds } = this._numberDictionary

    // Casos especiales
    const specialCases = { 0: 'cero', 100: 'cien', 1000: 'mil' }
    if (specialCases[number]) {
      this._numberWordsCache.set(number, specialCases[number])
      return specialCases[number]
    }

    let result = ''
    let remaining = number

    // Miles (optimizado para casos comunes < 10000)
    if (remaining >= 1000) {
      const thousands = Math.floor(remaining / 1000)
      result += thousands === 1 ? 'mil ' : `${this.numberToWords(thousands)} mil `
      remaining %= 1000
    }

    // Centenas
    if (remaining >= 100) {
      result += hundreds[Math.floor(remaining / 100)] + ' '
      remaining %= 100
    }

    // Decenas y unidades
    if (remaining >= 20) {
      const tensDigit = Math.floor(remaining / 10)
      const unitsDigit = remaining % 10
      result += tens[tensDigit] + (unitsDigit > 0 ? ` y ${units[unitsDigit]}` : '')
    } else if (remaining > 0) {
      result += units[remaining]
    }

    const finalResult = result.trim()
    this._numberWordsCache.set(number, finalResult)
    return finalResult
  },

  formatUnit(unit, number) {
    if (!unit) return ''

    const unitLower = unit.toLowerCase()

    // Reglas de pluralización en español
    if (number === 1) {
      // Singular
      if (unitLower.endsWith('s')) {
        return unitLower.slice(0, -1) // "semestres" → "semestre"
      }
      return unitLower
    } else {
      // Plural
      if (!unitLower.endsWith('s')) {
        return unitLower + 's' // "semestre" → "semestres"
      }
      return unitLower
    }
  },

  formatDuration(duracion, unidadDuracion) {
    if (!duracion || !unidadDuracion) {
      return ''
    }

    try {
      const number = typeof duracion === 'string' ? parseInt(duracion, 10) : duracion

      if (isNaN(number) || number <= 0) {
        return `${duracion} ${unidadDuracion}`.trim()
      }

      const numberInWords = this.capitalizeFirst(this.numberToWords(number))
      const formattedUnit = this.formatUnit(unidadDuracion, number)

      return `${numberInWords} (${number}) ${formattedUnit}.`
    } catch (error) {
      return `${duracion} ${unidadDuracion}`.trim()
    }
  },

  clearUpperUnions(title) {
    const connectorsMap = {
      En: 'en',
      La: 'la',
      Los: 'los',
      Las: 'las',
      El: 'el',
      Y: 'y',
      E: 'e',
      O: 'o',
      Para: 'para',
      De: 'de',
      Del: 'del',
      Al: 'al',
      Desde: 'desde',
      Como: 'como',
      Con: 'con',
      Sin: 'sin',
      Por: 'por',
      Sobre: 'sobre',
      Bajo: 'bajo',
      Entre: 'entre',
      Hacia: 'hacia',
      Hasta: 'hasta',
      Según: 'según',
      Durante: 'durante',
      Mediante: 'mediante',
      Ante: 'ante',
      Tras: 'tras',
      Él: 'el',
      UN: 'un',
      UNA: 'una',
      UNOS: 'unos',
      UNAS: 'unas'
    }

    let result = title
    for (const [upperCase, lowerCase] of Object.entries(connectorsMap)) {
      const regex = new RegExp(` ${upperCase} `, 'g')
      result = result.replace(regex, ` ${lowerCase} `)
    }
    return result
  },

  capitalizeWords(str) {
    return StringUtils.capitalizeWords(str)
  },

  formatProgramName(programName) {
    if (!programName || typeof programName !== 'string') {
      return programName || ''
    }

    try {
      const capitalized = this.capitalizeWords(StringUtils.trim(programName))
      const formatted = this.clearUpperUnions(capitalized)
      return formatted
    } catch (error) {
      Logger.warning('Error formateando nombre de programa:', error)
      return programName
    }
  },

  formatCurrencyCOP(amount) {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(amount)
  }
}

// ===========================================
// SISTEMA DE ACTUALIZACIÓN DOM
// ===========================================
const DOMUpdater = {
  // Cache para elementos DOM - mejorado con TTL
  _elementCache: new Map(),
  _cacheTimeout: 60000, // 1 minuto

  _getCachedElements(elementId) {
    const cacheKey = elementId
    const cached = this._elementCache.get(cacheKey)

    if (cached && Date.now() - cached.timestamp < this._cacheTimeout) {
      return cached.elements
    }

    // Usar DOMUtils para búsqueda optimizada
    let elements = DOMUtils.findElements(`[${elementId}='true']`)

    // Fallback por ID si no se encuentra por atributo
    if (elements.length === 0) {
      const element = DOMUtils.findElement(`#${elementId}`)
      elements = element ? [element] : []
    }

    this._elementCache.set(cacheKey, {
      elements,
      timestamp: Date.now()
    })

    return elements
  },

  updateElementsText(elementId, value) {
    try {
      const elements = this._getCachedElements(elementId)

      for (const element of elements) {
        const leadElements = DOMUtils.findElements('.lead', element)

        if (leadElements.length > 0) {
          leadElements.forEach(lead => {
            lead.textContent = value
          })
        } else {
          element.textContent = value
        }
      }

    } catch (error) {
      Logger.error(`Error actualizando DOM para ${elementId}:`, error)
    }
  },

  updateRegistrationDates(fechasData) {
    try {
      const container = DOMUtils.findElement('[data-puj-registration-dates="true"]')
      if (!container) {
        Logger.warning('Contenedor de fechas de registro no encontrado')
        return false
      }

      // Limpiar contenedor existente
      DOMUtils.empty(container)

      // Crear elementos DOM de forma más segura
      fechasData.forEach(fecha => {
        const dateItem = DOMUtils.createElement('div', {
          className: 'program-dates_date-item'
        })

        const periodElement = DOMUtils.createElement('p', {
          className: 'paragraph paragraph-neutral paragraph-md paragraph-bold program-dates_date-period',
          attributes: { 'data-component': 'paragraph' },
          textContent: `${DataFormatter.capitalizeFirst(fecha.descCiclo)}:`
        })

        const valueElement = DOMUtils.createElement('p', {
          className: 'paragraph paragraph-neutral paragraph-md program-dates_date-value',
          attributes: { 'data-component': 'paragraph' },
          textContent: DataFormatter.cleanDate(fecha.fFinCierreLetra)
        })

        dateItem.appendChild(periodElement)
        dateItem.appendChild(valueElement)
        container.appendChild(dateItem)
      })

      return true
    } catch (error) {
      Logger.error('Error actualizando fechas de registro:', error)
      return false
    }
  },

  clearCache() {
    this._elementCache.clear()
  }
}

// ===========================================
// SISTEMA DE PROCESAMIENTO DE DATOS DEL PROGRAMA
// ===========================================
const ProgramDataProcessor = {
  processAndUpdateDOM(dataProgram) {
    const {
      facultad,
      programa,
      costo,
      jornada,
      snies,
      tituloOtorgado,
      grado,
      duracion,
      unidadDuracion,
      modalidad,
      datosFechaCierreInscripcion,
      ciudad
    } = dataProgram

    let automationUpdates = {}

    if (facultad) {
      // Aplicar normalización de facultad antes del formateo
      const normalizedFaculty = FacultyNormalizer.normalize(facultad)
      DOMUpdater.updateElementsText('data-puj-faculty', DataFormatter.formatProgramName(normalizedFaculty))
      automationUpdates.faculty = true
    }

    if (programa) {
      DOMUpdater.updateElementsText('data-puj-name', `${DataFormatter.formatProgramName(programa)}`)
      automationUpdates.program = true
    }

    if (snies) {
      DOMUpdater.updateElementsText('data-puj-snies', `SNIES ${snies}`)
      automationUpdates.snies = true
    }

    if (tituloOtorgado) {
      DOMUpdater.updateElementsText('data-puj-title-graduation', DataFormatter.formatProgramName(tituloOtorgado))
      automationUpdates.degree = true
    }

    if (grado) {
      DOMUpdater.updateElementsText('data-puj-academic-level', DataFormatter.formatProgramName(grado))
      automationUpdates.level = true
    }

    if (duracion && unidadDuracion) {
      const duracionFormatted = DataFormatter.formatDuration(duracion, unidadDuracion)
      if (duracionFormatted) {
        DOMUpdater.updateElementsText('data-puj-duration', duracionFormatted)
        automationUpdates.duration = true
      }
    }

    if (modalidad) {
      DOMUpdater.updateElementsText('data-puj-modality', DataFormatter.formatProgramName(modalidad))
      automationUpdates.modality = true
    }

    if (costo) {
      DOMUpdater.updateElementsText('data-puj-price', `*${DataFormatter.formatCurrencyCOP(costo)}`)
      automationUpdates.price = true
    }

    if (jornada) {
      DOMUpdater.updateElementsText('data-puj-clock', DataFormatter.formatProgramName(jornada))
      automationUpdates.schedule = true
    }

    if (datosFechaCierreInscripcion && Array.isArray(datosFechaCierreInscripcion)) {
      DOMUpdater.updateRegistrationDates(datosFechaCierreInscripcion)
      automationUpdates.deadline = true
    }

    if (ciudad) {
      DOMUpdater.updateElementsText('data-puj-location', DataFormatter.formatProgramName(ciudad))
      automationUpdates.city = true
    }

    // Actualizar statusPage usando DataUtils para merge profundo
    if (Object.keys(automationUpdates).length && typeof window !== 'undefined' && window.statusPage) {
      window.statusPage = DataUtils.deepMerge(window.statusPage, {
        automation: automationUpdates
      })
    }

    return automationUpdates
  }
}

// ===========================================
// UTILIDADES
// ===========================================
const updateDisplay = (text, isError = false) => {
  const displayElement = DOMUtils.findElement('#code-program-configuration')
  if (displayElement) {
    displayElement.textContent = text
    displayElement.style.color = isError ? '#dc3545' : '#28a745'

    if (isError) {
      Logger.error(`Display: ${text}`)
    } else {
      Logger.info(`Display: ${text}`)
    }
  }
}

const updateStatus = updates => {
  statusPage = DataUtils.deepMerge(statusPage, updates)
}

const dispatchEvent = (eventName, detail) => {
  EventManager.emit(document, eventName, detail)
}

// ===========================================
// FUNCIONES DE API - USANDO HTTPClient
// ===========================================
const fetchProgramData = async codPrg => {
  try {
    const response = await apiClient.get(`${CONFIG.API_ENDPOINTS.JAVERIANA}/filterprograma?codprograma=${codPrg}`)
    return response.data
  } catch (error) {
    Logger.error(`Error obteniendo datos del programa ${codPrg}:`, error)
    throw new Error(`Error en API principal: ${error.message}`)
  }
}

const fetchAllPrograms = async () => {
  try {
    const response = await apiClient.post(CONFIG.API_ENDPOINTS.SEARCH, {
      query: '',
      visibilidad: 'yes',
      tipoPrograma: '',
      areas: '',
      facultad: ''
    })
    return response.data
  } catch (error) {
    Logger.error('Error obteniendo lista de programas:', error)
    throw new Error(`Error en API complementaria: ${error.message}`)
  }
}

const fetchWhatsApps = async () => {
  try {
    const response = await apiClient.get(CONFIG.API_ENDPOINTS.WHATSAPP)
    return response.data
  } catch (error) {
    Logger.error('Error obteniendo configuración de WhatsApp:', error)
    throw new Error(`Error al cargar la configuración de WhatsApp: ${error.message}`)
  }
}

// ===========================================
// PROCESAMIENTO DE DATOS
// ===========================================
const processData = (programData, allPrograms, codPrg) => {
  // Buscar datos complementarios usando DataUtils
  const complementaryProgramData =
    DataUtils.filterBy(allPrograms, {
      codigo: codPrg
    })[0] || null

  const consolidatedData = {
    mainProgram: DataUtils.deepMerge(
      programData,
      complementaryProgramData
        ? DataUtils.pick(complementaryProgramData, ['modalidad', 'duracion', 'unidadDuracion', 'tituloOtorgado'])
        : {}
    ),
    complementaryProgram: complementaryProgramData,
    allPrograms,
    metadata: {
      timestamp: new Date().toISOString(),
      programCode: codPrg,
      foundInComplementaryAPI: !!complementaryProgramData,
      totalPrograms: allPrograms.length,
      processingTime: performance.now()
    }
  }

  return consolidatedData
}

// ===========================================
// FUNCIÓN PRINCIPAL
// ===========================================
const loadDataProgram = async codPrg => {
  const startTime = performance.now()

  try {
    updateStatus({
      loadDataProgram: '🟡 Cargando información del programa...',
      codigo: codPrg,
      startTime: new Date().toISOString()
    })

    // Realizar todas las llamadas en paralelo con manejo de errores robusto
    const [programData, allPrograms, whatsApps] = await Promise.all([fetchProgramData(codPrg), fetchAllPrograms(), fetchWhatsApps()])

    const consolidatedData = processData(programData, allPrograms, codPrg)
    const loadTime = performance.now() - startTime

    updateStatus({
      loadDataProgram: '🟢 Datos del programa cargados correctamente',
      programa: programData.programa,
      hasComplementaryData: !!consolidatedData.complementaryProgram,
      loadTime: `${loadTime.toFixed(2)}ms`,
      endTime: new Date().toISOString()
    })

    // Procesar y actualizar DOM automáticamente
    const domUpdates = ProgramDataProcessor.processAndUpdateDOM(consolidatedData.mainProgram)

    // Disparar evento con datos consolidados
    dispatchEvent(CONFIG.EVENT_NAME, {
      dataProgram: consolidatedData.mainProgram,
      consolidatedData,
      allPrograms,
      whatsApps,
      domUpdates,
      performance: {
        loadTime,
        timestamp: new Date().toISOString()
      }
    })

    return consolidatedData
  } catch (error) {
    const loadTime = performance.now() - startTime

    Logger.error(`❌ Error cargando programa ${codPrg}:`, error)

    updateStatus({
      loadDataProgram: '❌ Error al cargar información',
      error: error.message,
      loadTime: `${loadTime.toFixed(2)}ms`,
      errorTime: new Date().toISOString()
    })

    updateDisplay(`Error: ${error.message}`, true)
    throw error
  }
}

// ===========================================
// INICIALIZACIÓN
// ===========================================
const initializeLoader = async () => {
  try {
    // Validación mejorada del código de programa
    if (!codProgram || StringUtils.isEmpty(codProgram.toString().trim())) {
      throw new Error('Código de programa no definido o vacío')
    }

    // Validar que sea un código válido (números y letras)
    if (!StringUtils.isAlphanumeric(codProgram.toString().replace(/[-_]/g, ''))) {
      throw new Error(`Código de programa inválido: ${codProgram}`)
    }

    updateDisplay(`Código de programa: ${codProgram}`)

    // Cargar datos del programa
    await loadDataProgram(codProgram)
  } catch (error) {
    Logger.error('💥 Error al inicializar cargador:', error)
    updateDisplay(`Error: ${error.message}`, true)

    // Limpiar cache en caso de error
    DOMUpdater.clearCache()
  }
}

// ===========================================
// CONFIGURACIÓN ADICIONAL Y LISTENERS
// ===========================================

// Configurar interceptors solo si están disponibles (HTTPClient completo)
if (apiClient.addRequestInterceptor) {
  // Agregar interceptor de errores para logging consistente
  apiClient.addErrorInterceptor(async (error, config) => {
    Logger.error(`❌ API Error: ${config.method} ${config.url}`, error)
    throw error
  })
}

// Configurar event listeners solo si EventManager está disponible
if (EventManager && EventManager.add) {
  // Cleanup cuando la página se descarga
  EventManager.add(window, 'beforeunload', () => {
    DOMUpdater.clearCache()
    if (EventManager.cleanup) EventManager.cleanup()
  })
} else {
  // Fallback básico sin EventManager
  window.addEventListener('beforeunload', () => {
    DOMUpdater.clearCache()
  })
}

// Ejecutar cuando el DOM esté listo
DOMUtils.isReady(initializeLoader)

// Exportar funciones principales para testing/debugging
if (typeof window !== 'undefined') {
  window.loadProgramUtils = {
    loadDataProgram,
    DataFormatter,
    DOMUpdater,
    CONFIG
  }
}
