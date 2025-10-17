// ===== CÓDIGO COMPILADO CON ESBUILD (IIFE) =====
// Compilado el: 09/09/2025, 03:53:34 p. m. (COT)

'use strict'
;(() => {
  // app/_library/_configurations/loadProgram/modules/utils.js
  var CONFIG = {
    EVENT_NAME: 'data_load-program',
    API_ENDPOINTS: {
      JAVERIANA: 'https://www.javeriana.edu.co/JaveMovil/ValoresMatricula-1/rs/psujsfvaportals',
      SEARCH: 'https://www.javeriana.edu.co/prg-api/searchpuj/general-search-program',
      WHATSAPP: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/whatsapps'
    },
    CACHE_TTL: 3e5,
    // 5 minutos
    RETRY_ATTEMPTS: 3,
    TIMEOUT: 1e4
  }
  var statusPage = {}
  if (typeof window !== 'undefined') window.statusPage = statusPage
  var updateStatus = updates => {
    statusPage = DataUtils.deepMerge(statusPage, updates)
    if (typeof window !== 'undefined') window.statusPage = statusPage
  }
  var dispatchEvent = (eventName, detail) => {
    EventManager.emit(document, eventName, detail)
  }
  var updateDisplay = (text, isError = false) => {
    const displayElement = DOMUtils.findElement('#code-program-configuration')
    if (displayElement) {
      displayElement.textContent = text
      displayElement.style.color = isError ? '#dc3545' : '#28a745'
    }
    if (isError) {
      Logger.error(`Display: ${text}`)
    } else {
      Logger.info(`Display: ${text}`)
    }
  }

  // app/_library/_configurations/loadProgram/modules/api-client.js
  var apiClient
  var initializeApiClient = () => {
    apiClient = new HTTPClient('', {
      timeout: CONFIG.TIMEOUT,
      retries: CONFIG.RETRY_ATTEMPTS,
      retryDelay: 1e3
    })
    return apiClient
  }
  var fetchProgramData = async codPrg => {
    try {
      const response = await apiClient.get(`${CONFIG.API_ENDPOINTS.JAVERIANA}/filterprograma?codprograma=${codPrg}`)
      return response.data
    } catch (error) {
      Logger.error(`Error obteniendo datos del programa ${codPrg}:`, error)
      throw new Error(`Error en API principal: ${error.message}`)
    }
  }
  var fetchAllPrograms = async () => {
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
  var fetchWhatsApps = async () => {
    try {
      const response = await apiClient.get(CONFIG.API_ENDPOINTS.WHATSAPP)
      return response.data
    } catch (error) {
      Logger.error('Error obteniendo configuraci\xF3n de WhatsApp:', error)
      throw new Error(`Error al cargar la configuraci\xF3n de WhatsApp: ${error.message}`)
    }
  }
  var processData = (programData, allPrograms, codPrg) => {
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
        timestamp: /* @__PURE__ */ new Date().toISOString(),
        programCode: codPrg,
        foundInComplementaryAPI: !!complementaryProgramData,
        totalPrograms: allPrograms.length,
        processingTime: performance.now()
      }
    }
    return consolidatedData
  }

  // app/_library/_configurations/loadProgram/modules/data-formatter.js
  var FacultyNormalizer = {
    normalize(facultyName) {
      if (!facultyName || typeof facultyName !== 'string') return ''
      let clean = facultyName.replace(/^Facultad de /i, '').trim()
      const facultyMappings = {
        'Cs.Econ\xF3micas y Administrativ.': 'Ciencias Econ\xF3micas y Administrativas',
        'Cs.Econ\xF3micas y Administrativas': 'Ciencias Econ\xF3micas y Administrativas',
        'Cs.Pol\xEDticas y Relaciones Int.': 'Ciencias Pol\xEDticas y Relaciones Internacionales',
        'Arquitectura y Dise\xF1o': 'Arquitectura y Dise\xF1o'
      }
      return facultyMappings[clean] || clean
    }
  }
  var LocationNormalizer = {
    normalize(locationName) {
      if (!locationName || typeof locationName !== 'string') return ''
      const trimmed = typeof StringUtils !== 'undefined' && StringUtils.trim ? StringUtils.trim(locationName) : locationName.trim()
      const locationMappings = {
        'Bogot\xE1 D.c.': 'Bogot\xE1 D.C.',
        'Bogota D.c.': 'Bogot\xE1 D.C.',
        'Bogota D.C.': 'Bogot\xE1 D.C.',
        'BOGOT\xC1 D.c.': 'Bogot\xE1 D.C.',
        'BOGOTA D.c.': 'Bogot\xE1 D.C.',
        'bogot\xE1 d.c.': 'Bogot\xE1 D.C.'
      }
      return locationMappings[trimmed] || trimmed
    }
  }
  var DataFormatter = {
    // Cache para números convertidos
    _numberWordsCache: /* @__PURE__ */ new Map(),
    // Diccionarios para conversión de números a palabras
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
        'diecis\xE9is',
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
    numberToWords(number) {
      if (this._numberWordsCache.has(number)) {
        return this._numberWordsCache.get(number)
      }
      const { units, tens, hundreds } = this._numberDictionary
      const specialCases = { 0: 'cero', 100: 'cien', 1e3: 'mil' }
      if (specialCases[number]) {
        this._numberWordsCache.set(number, specialCases[number])
        return specialCases[number]
      }
      let result = ''
      let remaining = number
      if (remaining >= 1e3) {
        const thousands = Math.floor(remaining / 1e3)
        result += thousands === 1 ? 'mil ' : `${this.numberToWords(thousands)} mil `
        remaining %= 1e3
      }
      if (remaining >= 100) {
        result += hundreds[Math.floor(remaining / 100)] + ' '
        remaining %= 100
      }
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
      if (number === 1) {
        if (unitLower.endsWith('s')) {
          return unitLower.slice(0, -1)
        }
        return unitLower
      } else {
        if (!unitLower.endsWith('s')) {
          return unitLower + 's'
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
      const connectors = [
        // Artículos
        'el',
        'la',
        'los',
        'las',
        'un',
        'una',
        'unos',
        'unas',
        // Preposiciones
        'de',
        'del',
        'al',
        'en',
        'con',
        'por',
        'para',
        'sin',
        'sobre',
        'bajo',
        'entre',
        'hacia',
        'hasta',
        'desde',
        'durante',
        'mediante',
        'ante',
        'tras',
        'seg\xFAn',
        'como',
        'a',
        // Conjunciones
        'y',
        'e',
        'o',
        'u',
        'pero',
        'mas',
        'sino',
        'aunque',
        // Otros conectores
        'que',
        'cual',
        'donde',
        'cuando'
      ]
      let result = title
      connectors.forEach(connector => {
        const regex = new RegExp(`\\b${connector}\\b`, 'gi')
        result = result.replace(regex, (match, offset) => {
          return offset === 0 ? match : connector
        })
      })
      return result
    },
    capitalizeFirst(str) {
      if (typeof StringUtils !== 'undefined' && StringUtils.capitalize) {
        return StringUtils.capitalize(str)
      }
      if (!str) return ''
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
    },
    capitalizeWords(str) {
      if (typeof StringUtils !== 'undefined' && StringUtils.capitalizeWords) {
        return StringUtils.capitalizeWords(str)
      }
      let result = str.toLowerCase().replace(/(?:^|\s)([a-záéíóúüñ])/g, (match, letter) => {
        return match.replace(letter, letter.toUpperCase())
      })
      result = result.replace(/d\.c\./gi, 'D.C.')
      result = result.replace(/D\.c\./g, 'D.C.')
      return result
    },
    formatProgramName(programName) {
      if (!programName || typeof programName !== 'string') {
        return programName || ''
      }
      try {
        const trimmed = typeof StringUtils !== 'undefined' && StringUtils.trim ? StringUtils.trim(programName) : programName.trim()
        const capitalized = this.capitalizeWords(trimmed)
        const formatted = this.clearUpperUnions(capitalized)
        return formatted
      } catch (error) {
        if (typeof Logger !== 'undefined' && Logger.warning) {
          Logger.warning('Error formateando nombre de programa:', error)
        } else {
          console.warn('Error formateando nombre de programa:', error)
        }
        return programName
      }
    },
    formatCurrencyCOP(amount) {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0
      })
        .format(amount)
        .replace(/\$[\s\u00A0]+/g, '$')
    },
    cleanDate(dateString) {
      if (!dateString || typeof dateString !== 'string') {
        return dateString || ''
      }
      try {
        const cleanedDate = dateString.trim()
        if (/^\d{4}-\d{2}-\d{2}/.test(cleanedDate)) {
          const date = new Date(cleanedDate)
          if (!isNaN(date.getTime())) {
            return date.toLocaleDateString('es-CO', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })
          }
        }
        return cleanedDate
      } catch (error) {
        if (typeof Logger !== 'undefined' && Logger.warning) {
          Logger.warning('Error limpiando fecha:', error)
        } else {
          console.warn('Error limpiando fecha:', error)
        }
        return dateString
      }
    }
  }

  // app/_library/_configurations/loadProgram/modules/dom-updater.js
  var DOMUpdater = {
    updateElementsText(elementId, value) {
      try {
        const elements = DOMUtils.findElements(`[${elementId}]`)
        for (const element of elements) element.innerHTML = value
      } catch (error) {
        Logger.error(`Error actualizando DOM para ${elementId}:`, error)
      }
    },
    updateElementsTextEditable(elementId, value) {
      try {
        const elements = DOMUtils.findElements(`[${elementId}]`)
        for (const element of elements) {
          const elementAutomatic = DOMUtils.findElements('.lead', element)
          if (elementAutomatic.length) {
            elementAutomatic.forEach(textLead => {
              textLead.textContent = value
            })
          }
        }
      } catch (error) {
        Logger.error(`Error actualizando DOM para ${elementId}:`, error)
      }
    },
    updateRegistrationDates(fechasData) {
      try {
        const containers = DOMUtils.findElements('[data-puj-registration-dates="true"]')
        if (!containers || containers.length === 0) {
          Logger.warning('Contenedor de fechas de registro no encontrado')
          return false
        }
        containers.forEach(container => {
          DOMUtils.empty(container)
          if (!fechasData || fechasData.length === 0) {
            const dateItem = DOMUtils.createElement('div', {
              className: 'program-dates_date-item'
            })
            const messageElement = DOMUtils.createElement('p', {
              className: 'paragraph paragraph-neutral paragraph-md program-dates_date-period',
              attributes: { 'data-component': 'paragraph' },
              textContent: 'Pr\xF3xima apertura siguiente semestre'
            })
            dateItem.appendChild(messageElement)
            container.appendChild(dateItem)
            return
          }
          fechasData.forEach(fecha => {
            const dateItem = DOMUtils.createElement('div', {
              className: 'program-dates_date-item'
            })
            const periodElement = DOMUtils.createElement('p', {
              className: 'paragraph paragraph-neutral paragraph-md paragraph-bold program-dates_date-period',
              attributes: { 'data-component': 'paragraph' },
              textContent: `${DataFormatter.capitalizeFirst(fecha.descCiclo)}: `
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
        })
        return true
      } catch (error) {
        Logger.error('Error actualizando fechas de registro:', error)
        return false
      }
    }
  }

  // app/_library/_configurations/loadProgram/modules/program-processor.js
  var ProgramDataProcessor = {
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
        ciudad,
        tipo,
        periodicidad
      } = dataProgram
      let automationUpdates = {}
      if (facultad) {
        const normalizedFaculty = FacultyNormalizer.normalize(facultad)
        DOMUpdater.updateElementsText('data-puj-faculty', DataFormatter.formatProgramName(normalizedFaculty))
        automationUpdates.faculty = true
      }
      if (programa) {
        DOMUpdater.updateElementsText('data-puj-name', `${DataFormatter.formatProgramName(programa)}`)
        automationUpdates.program = true
      }
      const sniesSelector = 'data-puj-snies'
      const rawSniesValue = snies !== undefined && snies !== null ? String(snies).trim() : ''
      const invalidSniesTokens = ['999999', '9999999', '0']
      const sniesDigitGroups = rawSniesValue.match(/\d+/g) || []
      const hasInvalidSnies = !rawSniesValue || sniesDigitGroups.some(token => invalidSniesTokens.includes(token))

      if (hasInvalidSnies) {
        // Fallback manual porque la versión V1 no expone DOMUpdater.removeElements
        let removed = false

        if (typeof DOMUtils !== 'undefined') {
          const elements = DOMUtils.findElements(`[${sniesSelector}]`)
          if (elements.length) {
            elements.forEach(element => element.remove())
            removed = true
          }
        }

        if (!removed) {
          DOMUpdater.updateElementsText(sniesSelector, '')
        }

        automationUpdates.snies = false
        automationUpdates.sniesRemoved = true
      } else {
        DOMUpdater.updateElementsText(sniesSelector, `SNIES ${rawSniesValue}`)
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
        DOMUpdater.updateElementsTextEditable('data-puj-clock', DataFormatter.formatProgramName(jornada))
        automationUpdates.schedule = true
      }
      if (Array.isArray(datosFechaCierreInscripcion)) {
        DOMUpdater.updateRegistrationDates(datosFechaCierreInscripcion)
        automationUpdates.deadline = true
      }
      if (ciudad) {
        const normalizedLocation = LocationNormalizer.normalize(ciudad)
        DOMUpdater.updateElementsText('data-puj-full-location', normalizedLocation)
        const simpleLocation = normalizedLocation === 'Bogot\xE1 D.C.' ? 'Bogot\xE1' : normalizedLocation
        DOMUpdater.updateElementsText('data-puj-simple-location', simpleLocation)
        automationUpdates.city = true
      }
      if (tipo) {
        DOMUpdater.updateElementsText('data-puj-type', tipo)
        automationUpdates.type = true
      }
      if (periodicidad) {
        const periodicidadFormatted = DataFormatter.capitalizeFirst(periodicidad)
        DOMUpdater.updateElementsText('data-puj-periodicity', periodicidadFormatted)
        automationUpdates.periodicity = true
      }
      if (Object.keys(automationUpdates).length && typeof window !== 'undefined' && window.statusPage) {
        window.statusPage = DataUtils.deepMerge(window.statusPage, {
          automation: automationUpdates
        })
      }
      return automationUpdates
    }
  }
  var loadDataProgram = async codPrg => {
    const startTime = performance.now()
    try {
      updateStatus({
        loadDataProgram: '\u{1F7E1} Cargando informaci\xF3n del programa...',
        codigo: codPrg,
        startTime: /* @__PURE__ */ new Date().toISOString()
      })
      const [programData, allPrograms, whatsApps] = await Promise.all([fetchProgramData(codPrg), fetchAllPrograms(), fetchWhatsApps()])
      const consolidatedData = processData(programData, allPrograms, codPrg)
      const loadTime = performance.now() - startTime
      updateStatus({
        loadDataProgram: '\u{1F7E2} Datos del programa cargados correctamente',
        programa: programData.programa,
        hasComplementaryData: !!consolidatedData.complementaryProgram,
        loadTime: `${loadTime.toFixed(2)}ms`,
        endTime: /* @__PURE__ */ new Date().toISOString()
      })
      const domUpdates = ProgramDataProcessor.processAndUpdateDOM(consolidatedData.mainProgram)
      dispatchEvent(CONFIG.EVENT_NAME, {
        dataProgram: consolidatedData.mainProgram,
        consolidatedData,
        allPrograms,
        whatsApps,
        domUpdates,
        performance: {
          loadTime,
          timestamp: /* @__PURE__ */ new Date().toISOString()
        }
      })
      return consolidatedData
    } catch (error) {
      const loadTime = performance.now() - startTime
      Logger.error(`\u274C Error cargando programa ${codPrg}:`, error)
      updateStatus({
        loadDataProgram: '\u274C Error al cargar informaci\xF3n',
        error: error.message,
        loadTime: `${loadTime.toFixed(2)}ms`,
        errorTime: /* @__PURE__ */ new Date().toISOString()
      })
      throw error
    }
  }

  // app/_library/_configurations/loadProgram/script.js
  var codProgram = configuration['codeProgram']
  var initializeLoader = async () => {
    try {
      initializeApiClient()
      if (typeof StringUtils === 'undefined' || !StringUtils) {
        throw new Error('StringUtils no est\xE1 disponible. Verificar carga de utilidades globales.')
      }
      const isEmptyCode = StringUtils.isEmpty
        ? StringUtils.isEmpty(codProgram?.toString()?.trim())
        : !codProgram || codProgram.toString().trim().length === 0
      if (!codProgram || isEmptyCode) throw new Error('C\xF3digo de programa no definido o vac\xEDo')
      const cleanCode = codProgram.toString().replace(/[-_]/g, '')
      const isValidCode = StringUtils.isAlphanumeric ? StringUtils.isAlphanumeric(cleanCode) : /^[a-zA-Z0-9]+$/.test(cleanCode)
      if (!isValidCode) throw new Error(`C\xF3digo de programa inv\xE1lido: ${codProgram}`)
      updateDisplay(`C\xF3digo de programa: ${codProgram}`)
      await loadDataProgram(codProgram)
    } catch (error) {
      if (typeof Logger !== 'undefined' && Logger.error) {
        Logger.error('\u{1F4A5} Error al inicializar cargador:', error)
      } else {
        console.error('\u{1F4A5} Error al inicializar cargador:', error)
      }
      updateDisplay(`Error: ${error.message}`, true)
      if (typeof DOMUpdater !== 'undefined' && DOMUpdater.clearCache) {
        DOMUpdater.clearCache()
      }
    }
  }
  var initializeEventListeners = () => {
    if (EventManager && EventManager.add) {
      EventManager.add(window, 'beforeunload', () => {
        DOMUpdater.clearCache()
        if (EventManager.cleanup) EventManager.cleanup()
      })
    } else {
      window.addEventListener('beforeunload', () => {
        DOMUpdater.clearCache()
      })
    }
  }
  DOMUtils.isReady(async () => {
    await initializeLoader()
    initializeEventListeners()
    const apiClient2 = window.apiClient
    if (apiClient2 && apiClient2.addErrorInterceptor) {
      apiClient2.addErrorInterceptor(async (error, config) => {
        Logger.error(`\u274C API Error: ${config.method} ${config.url}`, error)
        throw error
      })
    }
  })
  if (typeof window !== 'undefined') {
    window.loadProgramUtils = {
      loadDataProgram,
      initializeLoader,
      updateDisplay
    }
  }
})()
