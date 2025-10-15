// ===========================================
// PROCESADOR PRINCIPAL DE DATOS DEL PROGRAMA
// ===========================================
// Usa las utilidades globales disponibles en window

import { FacultyNormalizer, LocationNormalizer, DataFormatter } from './data-formatter.js'
import { DOMUpdater } from './dom-updater.js'
import { fetchProgramData, fetchAllPrograms, fetchWhatsApps, processData } from './api-client.js'
import { CONFIG, updateStatus, dispatchEvent } from './utils.js'

// ===========================================
// SISTEMA DE PROCESAMIENTO DE DATOS DEL PROGRAMA
// ===========================================

export const ProgramDataProcessor = {
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

      // Para data-puj-simple-location: si es Bogotá D.C., mostrar solo "Bogotá"
      const simpleLocation = normalizedLocation === 'Bogotá D.C.' ? 'Bogotá' : normalizedLocation
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

    throw error
  }
}
