<<<<<<< HEAD
const codProgram = configuration["codeProgram"] // Tomada de liferay
let statusPage = {}

// ===========================================
// CONFIGURACIÓN
// ===========================================
const nameEvent = 'data_load-program'
const URL_API_JAVERIANA = 'https://www.javeriana.edu.co/JaveMovil/ValoresMatricula-1/rs/psujsfvaportals'
const URL_API_SEARCH = 'https://www.javeriana.edu.co/prg-api/searchpuj/general-search-program'

// ===========================================
// UTILIDADES
// ===========================================
const updateDisplay = (text, isError = false) => {
  const displayElement = document.getElementById('code-program-configuration')
  if (displayElement) {
    displayElement.textContent = text
    displayElement.style.color = isError ? 'red' : ''
  }
}

const updateStatus = updates => {
  statusPage = { ...statusPage, ...updates }
}

const dispatchEvent = (eventName, detail) => {
  const event = new CustomEvent(eventName, { detail })
  document.dispatchEvent(event)
}

// ===========================================
// FUNCIONES DE API
// ===========================================
const fetchProgramData = async codPrg => {
  const response = await fetch(`${URL_API_JAVERIANA}/filterprograma?codprograma=${codPrg}`)
  if (!response.ok) {
    throw new Error(`Error en API principal: ${response.status} ${response.statusText}`)
  }
  return response.json()
}

const fetchAllPrograms = async () => {
  const response = await fetch(URL_API_SEARCH, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: '',
      visibilidad: 'yes',
      tipoPrograma: '',
      areas: '',
      facultad: ''
    })
  })
  if (!response.ok) {
    throw new Error(`Error en API complementaria: ${response.status} ${response.statusText}`)
  }
  return response.json()
}

// ===========================================
// PROCESAMIENTO DE DATOS
// ===========================================
const processData = (programData, allPrograms, codPrg) => {
  const complementaryProgramData = allPrograms.find(program => program.codigo == codPrg)

  return {
    mainProgram: {
      ...programData,
      ...(complementaryProgramData && {
        modalidad: complementaryProgramData.modalidad,
        duracion: complementaryProgramData.duracion,
        unidadDuracion: complementaryProgramData.unidadDuracion,
        tituloOtorgado: complementaryProgramData.tituloOtorgado
      })
    },
    complementaryProgram: complementaryProgramData || null,
    allPrograms,
    metadata: {
      timestamp: new Date().toISOString(),
      programCode: codPrg,
      foundInComplementaryAPI: !!complementaryProgramData,
      totalPrograms: allPrograms.length
    }
  }
}

// ===========================================
// FUNCIÓN PRINCIPAL
// ===========================================
const loadDataProgram = async codPrg => {
  try {
    updateStatus({
      loadDataProgram: '🟡 Cargando información del programa...',
      codigo: codPrg
    })

    const [programData, allPrograms] = await Promise.all([fetchProgramData(codPrg), fetchAllPrograms()])
    const consolidatedData = processData(programData, allPrograms, codPrg)

    updateStatus({
      loadDataProgram: '🟢 Datos del programa cargados correctamente',
      programa: programData.programa,
      hasComplementaryData: !!consolidatedData.complementaryProgram
    })

    // Logs para debugging
    console.log('🔍 Programa principal:', programData)
    console.log('🔍 Programa complementario:', consolidatedData.complementaryProgram)

    dispatchEvent(nameEvent, {
      dataProgram: consolidatedData.mainProgram,
      consolidatedData
    })

    return
  } catch (error) {
    console.error('❌ Error al cargar la información del programa:', error)
    updateStatus({
      loadDataProgram: '❌ Error al cargar información',
      error: error.message
    })
    throw error
  }
}

// ===========================================
// INICIALIZACIÓN
// ===========================================
const initializeLoader = async () => {
  try {
    if (!codProgram || codProgram.trim() === '') {
      throw new Error('Código de programa no definido o vacío')
    }
    updateDisplay(`Código de programa: ${codProgram}`)
    await loadDataProgram(codProgram)
  } catch (error) {
    console.error('💥 Error al inicializar:', error)
    updateDisplay(`Error: ${error.message}`, true)
  }
}

initializeLoader()
=======
// ===========================================
// SISTEMA MODULAR DE CARGA DE PROGRAMAS
// ===========================================
// Importa módulos organizados por responsabilidad

import { updateDisplay } from './modules/utils.js'
import { initializeApiClient } from './modules/api-client.js'
import { loadDataProgram } from './modules/program-processor.js'
import { DOMUpdater } from './modules/dom-updater.js'

const codProgram = configuration['codeProgram'] // Tomada de liferay

// ===========================================
// INICIALIZACIÓN PRINCIPAL
// ===========================================

const initializeLoader = async () => {
  try {
    // Inicializar cliente API
    initializeApiClient()

    // Verificar disponibilidad de utilidades
    if (typeof StringUtils === 'undefined' || !StringUtils) {
      throw new Error('StringUtils no está disponible. Verificar carga de utilidades globales.')
    }

    // Validar código de programa
    const isEmptyCode = StringUtils.isEmpty
      ? StringUtils.isEmpty(codProgram?.toString()?.trim())
      : !codProgram || codProgram.toString().trim().length === 0

    if (!codProgram || isEmptyCode) throw new Error('Código de programa no definido o vacío')

    // Validar que sea un código válido (números y letras)
    const cleanCode = codProgram.toString().replace(/[-_]/g, '')
    const isValidCode = StringUtils.isAlphanumeric ? StringUtils.isAlphanumeric(cleanCode) : /^[a-zA-Z0-9]+$/.test(cleanCode)
    if (!isValidCode) throw new Error(`Código de programa inválido: ${codProgram}`)

    updateDisplay(`Código de programa: ${codProgram}`)
    await loadDataProgram(codProgram)
  } catch (error) {
    // Usar Logger si está disponible, sino console
    if (typeof Logger !== 'undefined' && Logger.error) {
      Logger.error('💥 Error al inicializar cargador:', error)
    } else {
      console.error('💥 Error al inicializar cargador:', error)
    }

    updateDisplay(`Error: ${error.message}`, true)

    // Limpiar cache en caso de error si DOMUpdater está disponible
    if (typeof DOMUpdater !== 'undefined' && DOMUpdater.clearCache) {
      DOMUpdater.clearCache()
    }
  }
}

// ===========================================
// CONFIGURACIÓN ADICIONAL Y LISTENERS
// ===========================================

// Función para inicializar listeners de la aplicación
const initializeEventListeners = () => {
  // Cleanup cuando la página se descarga
  if (EventManager && EventManager.add) {
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
}

// ===========================================
// EJECUCIÓN PRINCIPAL
// ===========================================

// Ejecutar cuando el DOM esté listo
DOMUtils.isReady(async () => {
  await initializeLoader()
  initializeEventListeners()

  // Configurar interceptors del API client después de la inicialización
  const apiClient = window.apiClient
  if (apiClient && apiClient.addErrorInterceptor) {
    apiClient.addErrorInterceptor(async (error, config) => {
      Logger.error(`❌ API Error: ${config.method} ${config.url}`, error)
      throw error
    })
  }
})

// Exportar funciones principales para testing/debugging
if (typeof window !== 'undefined') {
  window.loadProgramUtils = {
    loadDataProgram,
    initializeLoader,
    updateDisplay
  }
}
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
