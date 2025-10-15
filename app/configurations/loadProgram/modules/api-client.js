// ===========================================
// CLIENTE API Y FUNCIONES DE DATOS
// ===========================================
// Usa HTTPClient global de utils/

import { CONFIG } from './utils.js'

// Cliente HTTP - se inicializará después de cargar las utilidades
let apiClient

export const initializeApiClient = () => {
  apiClient = new HTTPClient('', {
    timeout: CONFIG.TIMEOUT,
    retries: CONFIG.RETRY_ATTEMPTS,
    retryDelay: 1000
  })
  return apiClient
}

export const getApiClient = () => apiClient

// ===========================================
// FUNCIONES DE API
// ===========================================

export const fetchProgramData = async codPrg => {
  try {
    const response = await apiClient.get(`${CONFIG.API_ENDPOINTS.JAVERIANA}/filterprograma?codprograma=${codPrg}`)
    return response.data
  } catch (error) {
    Logger.error(`Error obteniendo datos del programa ${codPrg}:`, error)
    throw new Error(`Error en API principal: ${error.message}`)
  }
}

export const fetchAllPrograms = async () => {
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

export const fetchWhatsApps = async () => {
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

export const processData = (programData, allPrograms, codPrg) => {
  // Buscar datos complementarios usando DataUtils global
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
