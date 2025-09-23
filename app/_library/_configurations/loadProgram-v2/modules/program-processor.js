// ===========================================
// PROCESADOR PRINCIPAL DE DATOS DEL PROGRAMA
// ===========================================
// Usa las utilidades globales disponibles en window
//
// 🔄 ACTUALIZADO PARA NUEVA ESTRUCTURA DE API
// ===========================================
// CAMPOS CAMBIADOS:
// - tituloOtorgado → titulo
// - modalidad → metodologia
// - duracion + unidadDuracion → duracion (string completo)
//
// NUEVOS CAMPOS DISPONIBLES:
// - codPrograma, area, ano, eclesiastico, creditos
// - acredit, url, urlImagen, descripcion
// ===========================================

import { FacultyNormalizer, LocationNormalizer, DataFormatter } from './data-formatter.js'
import { DOMUpdater } from './dom-updater.js'
import { fetchProgramData, fetchAllPrograms, fetchWhatsApps, processData } from './api-client.js'
import { CONFIG, updateStatus, dispatchEvent } from './utils.js'

// ===========================================
// SISTEMA DE PROCESAMIENTO DE DATOS DEL PROGRAMA
// ===========================================

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

  // Función auxiliar para actualizaciones simples de campos
  _updateField(value, elementId, updateKey, automationUpdates, formatter = null, method = 'updateElementsText', attribute = null) {
    if (!value) return false
    
    const formattedValue = formatter ? formatter(value) : value
    
    if (method === 'updateElementsAttribute' && attribute) {
      DOMUpdater[method](elementId, attribute, formattedValue)
    } else {
      DOMUpdater[method](elementId, formattedValue)
    }
    
    automationUpdates[updateKey] = true
    return true
  },

  processAndUpdateDOM(dataProgram) {
    // ===========================================
    // NUEVOS CAMPOS DE LA API (Nueva estructura)
    // ===========================================
    const {
      facultad, // ✅ Mismo nombre
      programa, // ✅ Mismo nombre
      costo, // ✅ Mismo nombre
      jornada, // ✅ Mismo nombre
      snies, // ✅ Mismo nombre
      titulo, // 🔄 NUEVO: reemplaza 'tituloOtorgado'
      grado, // ✅ Mismo nombre
      duracion, // ✅ Mismo nombre (ahora es string, ej: "8 Semestres")
      metodologia, // 🔄 NUEVO: reemplaza 'modalidad'
      datosFechaCierreInscripcion, // ✅ Mismo nombre
      ciudad, // ✅ Mismo nombre
      tipo, // ✅ Mismo nombre
      periodicidad, // ✅ Mismo nombre

      // ===========================================
      // CAMPOS ADICIONALES DISPONIBLES EN LA NUEVA API
      // ===========================================

      creditos, // 🆕 NUEVO: número de créditos
      // Acreditación de alta calidad
      acredit, // 🆕 NUEVO: estado de acreditación
      estadoAcredit,
      numResolAcredit,
      fechaIniAcredit,
      fechaFinAcredit,
      vigenciaAcredit,

      recuReposAcredit,
      obserAcredit,

      // Registro calificado
      estadoRegisCali,
      numResolRegisCali,
      fechaIniRegisCali,
      fechaFinRegisCali,
      vigenciaRegisCali,

      url, // 🆕 NUEVO: URL del programa
      urlImagen, // 🆕 NUEVO: URL de la imagen
      descripcion // 🆕 NUEVO: descripción del programa
    } = dataProgram

    // ===========================================
    // CAMPOS ELIMINADOS DE LA ESTRUCTURA ANTERIOR
    // ===========================================
    // - tituloOtorgado -> ahora es 'titulo'
    // - unidadDuracion -> ya no existe (incluido en 'duracion')
    // - modalidad -> ahora es 'metodologia'

    let automationUpdates = {}

    // ===========================================
    // 📋 CAMPOS BÁSICOS DEL PROGRAMA
    // ===========================================
    
    // Facultad (con normalización)
    this._updateField(
      facultad, 
      'data-puj-faculty', 
      'faculty', 
      automationUpdates, 
      val => DataFormatter.formatProgramName(FacultyNormalizer.normalize(val))
    )

    // Nombre del programa
    this._updateField(programa, 'data-puj-name', 'program', automationUpdates, DataFormatter.formatProgramName)

    // SNIES
    this._updateField(snies, 'data-puj-snies', 'snies', automationUpdates, val => `SNIES ${val}`)

    // 🔄 Título (antes 'tituloOtorgado')
    this._updateField(titulo, 'data-puj-title-graduation', 'degree', automationUpdates, DataFormatter.formatProgramName)

    // Nivel académico
    this._updateField(grado, 'data-puj-academic-level', 'level', automationUpdates, DataFormatter.formatProgramName)

    // 🔄 Duración (ahora string completo)
    this._updateField(duracion, 'data-puj-duration', 'duration', automationUpdates)

    // 🔄 Metodología (antes 'modalidad')
    this._updateField(metodologia, 'data-puj-modality', 'modality', automationUpdates, DataFormatter.formatProgramName)

    // Costo
    this._updateField(costo, 'data-puj-price', 'price', automationUpdates, val => `*${DataFormatter.formatCurrencyCOP(val)}`)

    // Jornada (método especial)
    if (jornada) {
      DOMUpdater.updateElementsTextEditable('data-puj-clock', DataFormatter.formatProgramName(jornada))
      automationUpdates.schedule = true
    }

    // Fechas de inscripción (método especial)
    if (Array.isArray(datosFechaCierreInscripcion)) {
      DOMUpdater.updateRegistrationDates(datosFechaCierreInscripcion)
      automationUpdates.deadline = true
    }

    // Ciudad (lógica especial para ubicaciones)
    if (ciudad) {
      const normalizedLocation = LocationNormalizer.normalize(ciudad)
      DOMUpdater.updateElementsText('data-puj-full-location', normalizedLocation)
      
      // Para data-puj-simple-location: si es Bogotá D.C., mostrar solo "Bogotá"
      const simpleLocation = normalizedLocation === 'Bogotá D.C.' ? 'Bogotá' : normalizedLocation
      DOMUpdater.updateElementsText('data-puj-simple-location', simpleLocation)
      
      automationUpdates.city = true
    }

    // Tipo
    this._updateField(tipo, 'data-puj-type', 'type', automationUpdates)

    // Periodicidad
    this._updateField(periodicidad, 'data-puj-periodicity', 'periodicity', automationUpdates, DataFormatter.capitalizeFirst)

    // ===========================================
    // 🆕 NUEVOS CAMPOS DISPONIBLES
    // ===========================================

    this._updateField(codPrograma, 'data-puj-code', 'programCode', automationUpdates)
    this._updateField(area, 'data-puj-area', 'area', automationUpdates)
    this._updateField(creditos, 'data-puj-credits', 'credits', automationUpdates, val => `${val} créditos`)

    // ===========================================
    // 🔐 LÓGICA DE ACREDITACIÓN DE ALTA CALIDAD
    // ===========================================
    // Solo mostrar información cuando AMBOS campos sean "Activo"
    const isAccreditationActive = acredit === 'Activo' && estadoAcredit === 'Activo'

    if (isAccreditationActive) {
      // Estado de acreditación
      DOMUpdater.updateElementsText('data-puj-accreditation-status', 'Activo')
      automationUpdates.accreditation = true

      // Información adicional de acreditación (solo si está activa)
      if (numResolAcredit && numResolAcredit.trim()) {
        DOMUpdater.updateElementsText('data-puj-accreditation-resolution', numResolAcredit.trim())
        automationUpdates.accreditationResolution = true
      }

      if (fechaIniAcredit) {
        DOMUpdater.updateElementsText('data-puj-accreditation-start-date', fechaIniAcredit)
        automationUpdates.accreditationStartDate = true
      }

      if (fechaFinAcredit) {
        DOMUpdater.updateElementsText('data-puj-accreditation-end-date', fechaFinAcredit)
        automationUpdates.accreditationEndDate = true
      }

      if (vigenciaAcredit) {
        DOMUpdater.updateElementsText('data-puj-accreditation-validity', `${vigenciaAcredit} años`)
        automationUpdates.accreditationValidity = true
      }

      if (obserAcredit) {
        DOMUpdater.updateElementsText('data-puj-accreditation-observations', obserAcredit)
        automationUpdates.accreditationObservations = true
      }
    }

    // Manejar elementos de acreditación (mostrar o eliminar)
    this._handleElementGroup(
      'accreditation',
      isAccreditationActive,
      [
        'data-puj-accreditation-status',
        'data-puj-accreditation-resolution',
        'data-puj-accreditation-start-date',
        'data-puj-accreditation-end-date',
        'data-puj-accreditation-validity',
        'data-puj-accreditation-observations'
      ],
      automationUpdates
    )

    // ===========================================
    // 📋 LÓGICA DE REGISTRO CALIFICADO
    // ===========================================
    const hasRegistration = !!estadoRegisCali

    if (hasRegistration) {
      DOMUpdater.updateElementsText('data-puj-registration-status', estadoRegisCali)
      automationUpdates.registrationStatus = true

      // Información adicional del registro calificado
      if (numResolRegisCali) {
        DOMUpdater.updateElementsText('data-puj-registration-resolution', numResolRegisCali)
        automationUpdates.registrationResolution = true
      }

      if (fechaIniRegisCali) {
        DOMUpdater.updateElementsText('data-puj-registration-start-date', fechaIniRegisCali)
        automationUpdates.registrationStartDate = true
      }

      if (fechaFinRegisCali) {
        DOMUpdater.updateElementsText('data-puj-registration-end-date', fechaFinRegisCali)
        automationUpdates.registrationEndDate = true
      }

      if (vigenciaRegisCali) {
        DOMUpdater.updateElementsText('data-puj-registration-validity', `${vigenciaRegisCali} años`)
        automationUpdates.registrationValidity = true
      }

      if (obserRegisCali) {
        DOMUpdater.updateElementsText('data-puj-registration-observations', obserRegisCali)
        automationUpdates.registrationObservations = true
      }
    }

    // Manejar elementos de registro calificado (mostrar o eliminar)
    this._handleElementGroup(
      'registration',
      hasRegistration,
      [
        'data-puj-registration-status',
        'data-puj-registration-resolution',
        'data-puj-registration-start-date',
        'data-puj-registration-end-date',
        'data-puj-registration-validity',
        'data-puj-registration-observations'
      ],
      automationUpdates
    )

    // URLs y descripción
    this._updateField(url, 'data-puj-program-url', 'programUrl', automationUpdates, null, 'updateElementsAttribute', 'href')
    this._updateField(urlImagen, 'data-puj-program-image', 'programImage', automationUpdates, null, 'updateElementsAttribute', 'src')
    this._updateField(descripcion, 'data-puj-description', 'description', automationUpdates)

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
