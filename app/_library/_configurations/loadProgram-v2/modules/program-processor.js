// ===========================================
// PROCESADOR PRINCIPAL DE DATOS DEL PROGRAMA V2
// ===========================================
// 🔄 MIGRACIÓN DE API V1 → V2
//
// CAMPOS MODIFICADOS DESDE V1:
// • tituloOtorgado → titulo
// • modalidad → metodologia
// • duracion + unidadDuracion → duracion (string completo)
//
// CAMPOS NUEVOS EN V2:
// • codPrograma, area, creditos (información adicional del programa)
// • acredit, estadoAcredit, numResolAcredit, fechaIniAcredit, fechaFinAcredit, vigenciaAcredit, obserAcredit (acreditación de alta calidad)
// • estadoRegisCali, numResolRegisCali, fechaIniRegisCali, fechaFinRegisCali, vigenciaRegisCali, obserRegisCali (registro calificado)
// • url, urlImagen, descripcion (contenido multimedia)
//
// CAMPOS QUE SE MANTIENEN IGUALES:
// • facultad, programa, costo, jornada, snies, grado, ciudad, tipo, periodicidad, datosFechaCierreInscripcion
// ===========================================

import { FacultyNormalizer, LocationNormalizer, DataFormatter } from './data-formatter.js'
import { DOMUpdater } from './dom-updater.js'
import { fetchProgramData, fetchAllPrograms, fetchWhatsApps, processData, initializeApiClient } from './api-client.js'
import { CONFIG, updateStatus, dispatchEvent } from './utils.js'

const FIELD_CONFIGS = {
  basic: [
    // CAMPOS QUE SE MANTIENEN DESDE V1
    {
      dataKey: 'facultad',
      selector: 'data-puj-faculty',
      updateKey: 'faculty',
      formatter: val => DataFormatter.formatProgramName(FacultyNormalizer.normalize(val))
    },
    {
      dataKey: 'programa',
      selector: 'data-puj-name',
      updateKey: 'program',
      formatter: val => DataFormatter.formatProgramName(val)
    },
    {
      dataKey: 'snies',
      selector: 'data-puj-snies',
      updateKey: 'snies',
      formatter: val => `SNIES ${val}`,
      special: true
    },
    {
      dataKey: 'nivelAcad',
      selector: 'data-puj-academic-level',
      updateKey: 'level',
      formatter: val => DataFormatter.formatProgramName(val)
    },
    {
      dataKey: 'costo',
      selector: 'data-puj-price',
      updateKey: 'price',
      formatter: val => `*${DataFormatter.formatCurrencyCOP(val)}`
    },
    {
      dataKey: 'tipo',
      selector: 'data-puj-type',
      updateKey: 'type'
    },
    {
      dataKey: 'periodicidad',
      selector: 'data-puj-periodicity',
      updateKey: 'periodicity',
      formatter: val => DataFormatter.capitalizeFirst(val)
    },

    // CAMPOS MODIFICADOS EN V2
    // V1: tituloOtorgado - Ahora maneja arrays de títulos
    {
      dataKey: 'titulo',
      selector: 'data-puj-title-graduation',
      updateKey: 'degree',
      special: true // Marcado como especial para manejo personalizado
    },
    // V1: duracion + unidadDuracion
    {
      dataKey: 'duracion',
      selector: 'data-puj-duration',
      updateKey: 'duration'
    },
    // V1: modalidad
    {
      dataKey: 'metodologia',
      selector: 'data-puj-modality',
      updateKey: 'modality',
      formatter: val => DataFormatter.formatProgramName(val)
    },

    // CAMPOS NUEVOS EN V2
    {
      dataKey: 'codPrograma',
      selector: 'data-puj-code',
      updateKey: 'programCode'
    },
    {
      dataKey: 'area',
      selector: 'data-puj-area',
      updateKey: 'area'
    },
    {
      dataKey: 'creditos',
      selector: 'data-puj-credits',
      updateKey: 'credits',
      formatter: val => `${val} créditos`
    },
    {
      dataKey: 'url',
      selector: 'data-puj-program-url',
      updateKey: 'programUrl',
      method: 'updateElementsAttribute',
      attribute: 'href'
    },
    {
      dataKey: 'urlImagen',
      selector: 'data-puj-program-image',
      updateKey: 'programImage',
      method: 'updateElementsAttribute',
      attribute: 'src'
    },
    {
      dataKey: 'descripcion',
      selector: 'data-puj-description',
      updateKey: 'description'
    },

    // CAMPOS CON LÓGICA ESPECIAL (solo para referencia de selectores)
    {
      dataKey: 'jornada',
      selector: 'data-puj-clock',
      updateKey: 'schedule',
      special: true // Marcador para indicar que requiere lógica especial
    },
    {
      dataKey: 'ciudad_full',
      selector: 'data-puj-full-location',
      updateKey: 'city',
      special: true
    },
    {
      dataKey: 'ciudad_simple',
      selector: 'data-puj-simple-location',
      updateKey: 'city',
      special: true
    }
  ],

  // NUEVA FUNCIONALIDAD V2: Acreditación de alta calidad - Usando un solo selector
  accreditation: [
    {
      dataKey: 'accreditationData',
      selector: 'data-puj-accreditation',
      updateKey: 'accreditation',
      special: true // Marcador para indicar que requiere lógica especial
    }
  ],

  // NUEVA FUNCIONALIDAD V2: Registro calificado
  registration: [
    {
      dataKey: 'registryData',
      selector: 'data-puj-registry',
      updateKey: 'registry',
      special: true // Marcador para indicar que requiere lógica especial
    }
  ]
}

// Función auxiliar para extraer selectores de las configuraciones
const getSelectorsFromConfig = configKey => {
  return FIELD_CONFIGS[configKey]?.map(config => config.selector) || []
}

const getSelector = (configKey, dataKey) => {
  const config = FIELD_CONFIGS[configKey]?.find(item => item.dataKey === dataKey)
  return config?.selector
}

export const ProgramDataProcessor = {
  // Función auxiliar para manejar grupos de elementos relacionados
  _handleElementGroup(groupName, shouldShow, elements, automationUpdates) {
    if (shouldShow) {
      return // No hacer nada, los elementos se actualizan individualmente
    }

    // Si no se debe mostrar, eliminar todos los elementos del grupo
    let removedElements = false
    elements.forEach(elementId => {
      if (DOMUpdater.removeElements(elementId)) {
        removedElements = true
      }
    })

    automationUpdates[groupName] = false
    if (removedElements) {
      automationUpdates[`${groupName}ElementsRemoved`] = true
    }
  },

  // Función auxiliar mejorada para actualizaciones simples de campos
  _updateField(value, selector, updateKey, automationUpdates, formatter = null, method = 'updateElementsText', attribute = null) {
    if (!value) return false

    const formattedValue = formatter ? formatter(value) : value

    if (method === 'updateElementsAttribute' && attribute) {
      DOMUpdater[method](selector, attribute, formattedValue)
    } else {
      DOMUpdater[method](selector, formattedValue)
    }

    automationUpdates[updateKey] = true
    return true
  },

  // Función especializada para procesar campos configurados desde FIELD_CONFIGS
  _processConfiguredFields(configKey, dataProgram, automationUpdates) {
    const configs = FIELD_CONFIGS[configKey]
    if (!configs) return

    configs.forEach(config => {
      const { dataKey, selector, updateKey, formatter, method, attribute, value, special } = config
      // Saltar campos marcados como especiales (se procesan manualmente)
      if (special) return

      const fieldValue = value !== undefined ? value : dataProgram[dataKey]
      this._updateField(fieldValue, selector, updateKey, automationUpdates, formatter, method, attribute)
    })
  },

  _processSnies(dataProgram, automationUpdates) {
    const selector = getSelector('basic', 'snies')
    if (!selector) return

    const rawValue = dataProgram.snies
    const sniesString = rawValue !== undefined && rawValue !== null ? String(rawValue).trim() : ''
    const invalidTokens = ['999999', '9999999', '0']
    const digitGroups = sniesString.match(/\d+/g) || []
    const hasInvalidToken = !sniesString || digitGroups.some(token => invalidTokens.includes(token))

    if (hasInvalidToken) {
      const removed = DOMUpdater.removeElements(selector)

      if (!removed && typeof DOMUtils !== 'undefined') {
        const elements = DOMUtils.findElements(`[${selector}]`)
        elements.forEach(element => {
          element.textContent = ''
          element.style.display = 'none'
        })
      }

      automationUpdates.snies = false
      automationUpdates.sniesRemoved = true
      return
    }

    DOMUpdater.updateElementsText(selector, `SNIES ${sniesString}`)
    automationUpdates.snies = true
  },

  // Función especializada para manejo de acreditación
  _processAccreditation(dataProgram, automationUpdates) {
    const { acredit, estadoAcredit, numResolAcredit, fechaIniAcredit, fechaFinAcredit, vigenciaAcredit, recuReposAcredit, obserAcredit } =
      dataProgram

    const isAccreditationActive = acredit === 'Activo' && estadoAcredit === 'Activo'
    const accreditationSelector = 'data-puj-accreditation'

    if (isAccreditationActive && numResolAcredit && fechaIniAcredit && fechaFinAcredit && vigenciaAcredit) {
      // Construir el texto completo de la acreditación
      let accreditationText = `Resolución de Acreditación de Alta Calidad: ${numResolAcredit} del ${fechaIniAcredit}, vigente por ${vigenciaAcredit} años, hasta el ${fechaFinAcredit}`

      // Si recuReposAcredit es true y hay observaciones, agregarlas
      if (recuReposAcredit === true && obserAcredit && obserAcredit.trim()) {
        accreditationText += `. ${obserAcredit.trim()}`
      }

      // Terminar con "|" en lugar de "."
      accreditationText += ` |`

      DOMUpdater.updateElementsText(accreditationSelector, accreditationText)
      automationUpdates.accreditation = true
    } else {
      // Si no hay acreditación válida, ocultar elemento y agregar comentario
      const elements = DOMUtils.findElements(`[${accreditationSelector}]`)
      elements.forEach(element => {
        // Crear comentario HTML
        const comment = document.createComment('Acreditación de Alta Calidad no disponible - Estado Inactivo')
        element.parentNode.insertBefore(comment, element)
        element.style.display = 'none'
        element.textContent = ''
      })
      automationUpdates.accreditation = false
    }
  },

  // Función especializada para manejo de registro calificado
  _processRegistration(dataProgram, automationUpdates) {
    const { estadoRegisCali, numResolRegisCali, fechaIniRegisCali, fechaFinRegisCali, modRegisCali, obserRegisCali } = dataProgram

    const hasRegistration = estadoRegisCali && estadoRegisCali.toLowerCase() === 'activo'
    const registrySelector = 'data-puj-registry'

    if (hasRegistration && numResolRegisCali && fechaIniRegisCali && fechaFinRegisCali) {
      // Construir el texto completo del registro calificado
      let registryText = `Resolución de Registro Calificado: ${numResolRegisCali} del ${fechaIniRegisCali}, vigente hasta el ${fechaFinRegisCali}`

      // Si modRegisCali es true y hay observaciones, agregarlas
      if (modRegisCali === true && obserRegisCali && obserRegisCali.trim()) {
        registryText += `. ${obserRegisCali.trim()}`
      }

      // Terminar con "|" en lugar de "."
      registryText += ` |`

      DOMUpdater.updateElementsText(registrySelector, registryText)
      automationUpdates.registry = true
    } else {
      // Si no hay registro calificado válido, ocultar elemento y agregar comentario
      const elements = DOMUtils.findElements(`[${registrySelector}]`)
      elements.forEach(element => {
        // Crear comentario HTML
        const comment = document.createComment('Registro calificado no disponible - Estado Inactivo')
        element.parentNode.insertBefore(comment, element)
        element.style.display = 'none'
        element.textContent = ''
      })
      automationUpdates.registry = false
    }
  },

  // Función especializada para manejo de título otorgar con modal para textos largos
  _processTitleGraduation(dataProgram, automationUpdates) {
    const { titulo } = dataProgram
    const titleSelector = 'data-puj-title-graduation'

    if (!titulo) return

    let titleText = ''
    let fullTitleText = ''

    if (Array.isArray(titulo)) {
      fullTitleText = titulo.join(' - ')
    } else {
      fullTitleText = DataFormatter.formatProgramName(titulo)
    }

    // Definir límite de caracteres para mostrar el modal (por ejemplo, 50 caracteres)
    const MAX_CHAR_LIMIT = 50
    const shouldShowModal = fullTitleText.length > MAX_CHAR_LIMIT

    if (shouldShowModal) {
      // Si es muy largo, mostrar versión truncada + "..."
      titleText = fullTitleText.substring(0, MAX_CHAR_LIMIT) + '...'

      // Actualizar elementos con la versión truncada
      DOMUpdater.updateElementsText(titleSelector, titleText)

      // Agregar atributos para modal
      const elements = DOMUtils.findElements(`[${titleSelector}]`)
      elements.forEach(element => {
        element.setAttribute('data-modal-content', fullTitleText)
        element.setAttribute('data-show-modal', 'true')
        element.setAttribute('title', fullTitleText) // Tooltip como fallback
      })

      automationUpdates.degree = true
      automationUpdates.degreeModal = true
    } else {
      // Si no es muy largo, mostrar texto completo normalmente
      DOMUpdater.updateElementsText(titleSelector, fullTitleText)
      automationUpdates.degree = true
      automationUpdates.degreeModal = false
    }
  },

  processAndUpdateDOM(dataProgram) {
    const { jornada, datosFechaCierreInscripcion, ciudad, acredit, estadoAcredit, estadoRegisCali } = dataProgram
    let automationUpdates = {}

    // Procesar campos básicos
    this._processConfiguredFields('basic', dataProgram, automationUpdates)
    this._processSnies(dataProgram, automationUpdates)

    // Campos con lógica especial (se mantienen desde V1)
    if (jornada) {
      DOMUpdater.updateElementsTextEditable(getSelector('basic', 'jornada'), DataFormatter.formatProgramName(jornada))
      automationUpdates.schedule = true
    }

    if (Array.isArray(datosFechaCierreInscripcion)) {
      DOMUpdater.updateRegistrationDates(datosFechaCierreInscripcion)
      automationUpdates.deadline = true
    }

    if (ciudad) {
      const normalizedLocation = LocationNormalizer.normalize(ciudad)
      DOMUpdater.updateElementsText(getSelector('basic', 'ciudad_full'), normalizedLocation)
      const simpleLocation = normalizedLocation === 'Bogotá D.C.' ? 'Bogotá' : normalizedLocation
      DOMUpdater.updateElementsText(getSelector('basic', 'ciudad_simple'), simpleLocation)
      automationUpdates.city = true
    }

    // Nuevas funcionalidades V2
    this._processAccreditation(dataProgram, automationUpdates)
    this._processRegistration(dataProgram, automationUpdates)
    this._processTitleGraduation(dataProgram, automationUpdates)

    // Actualizar statusPage usando DataUtils global para merge profundo
    if (Object.keys(automationUpdates).length && typeof window !== 'undefined' && window.statusPage) {
      window.statusPage = DataUtils.deepMerge(window.statusPage, {
        automation: automationUpdates
      })
    }

    return automationUpdates
  }
}

// ===========================================
// FUNCIÓN PRINCIPAL DE CARGA
// ===========================================

export const loadDataProgram = async codPrg => {
  // Verificar dependencias globales

  if (!window.HTTPClient) throw new Error('HTTPClient no está disponible. Asegúrate de que las utilidades estén cargadas.')
  if (!window.Logger) throw new Error('Logger no está disponible. Asegúrate de que las utilidades estén cargadas.')
  if (!window.DataUtils) throw new Error('DataUtils no está disponible. Asegúrate de que las utilidades estén cargadas.')

  initializeApiClient()

  const startTime = performance.now()
  let consolidatedData = { mainProgram: null, complementaryProgram: null }
  let allPrograms = null

  try {
    updateStatus({
      loadDataProgram: '🟡 Cargando información del programa...',
      codigo: codPrg,
      startTime: new Date().toISOString()
    })

    // Función auxiliar para manejar datos del programa principal
    const handleProgramData = async () => {
      try {
        const data = await fetchProgramData(codPrg)
        const apiTime = performance.now() - startTime

        consolidatedData = processData(data, allPrograms, codPrg)

        const domUpdates = ProgramDataProcessor.processAndUpdateDOM(consolidatedData.mainProgram)

        updateStatus({
          programData: '🟢 Datos principales cargados',
          programa: data.programa,
          loadTime: `${apiTime.toFixed(2)}ms`
        })

        dispatchEvent(CONFIG.EVENT_NAMES.PROGRAM_DATA, {
          dataProgram: consolidatedData.mainProgram,
          domUpdates,
          performance: {
            loadTime: apiTime,
            timestamp: new Date().toISOString()
          }
        })

        return data
      } catch (error) {
        Logger.error(`❌ Error cargando datos del programa:`, error)
        throw error
      }
    }

    // Función auxiliar para manejar lista de programas
    const handleAllPrograms = async () => {
      try {
        const data = await fetchAllPrograms()
        const apiTime = performance.now() - startTime
        allPrograms = data

        updateStatus({
          allPrograms: '🟢 Lista completa de programas cargada',
          programCount: data?.length || 0,
          loadTime: `${apiTime.toFixed(2)}ms`
        })

        dispatchEvent(CONFIG.EVENT_NAMES.ALL_PROGRAMS, {
          allPrograms: data,
          performance: {
            loadTime: apiTime,
            timestamp: new Date().toISOString()
          }
        })

        return data
      } catch (error) {
        Logger.error(`❌ Error cargando lista de programas:`, error)
        return null
      }
    }

    // Función auxiliar para manejar WhatsApp
    const handleWhatsApp = async () => {
      try {
        const data = await fetchWhatsApps()
        const apiTime = performance.now() - startTime

        updateStatus({
          whatsApps: '🟢 Datos de WhatsApp cargados',
          whatsAppCount: data?.length || 0,
          loadTime: `${apiTime.toFixed(2)}ms`
        })

        dispatchEvent(CONFIG.EVENT_NAMES.WHATSAPP, {
          whatsApps: data,
          performance: {
            loadTime: apiTime,
            timestamp: new Date().toISOString()
          }
        })

        return data
      } catch (error) {
        Logger.error(`❌ Error cargando datos de WhatsApp:`, error)
        return null
      }
    }

    // Ejecutar datos principales primero (crítico)
    await handleProgramData()

    // Ejecutar APIs secundarias en paralelo sin bloquear
    handleAllPrograms()
    handleWhatsApp()

    const totalTime = performance.now() - startTime

    updateStatus({
      loadDataProgram: '🟢 Datos del programa cargados correctamente',
      totalTime: `${totalTime.toFixed(2)}ms`,
      endTime: new Date().toISOString()
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

    throw error
  }
}
