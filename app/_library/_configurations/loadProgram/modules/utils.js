// ===========================================
// UTILIDADES Y CONFIGURACIÓN GLOBAL
// ===========================================

// Configuración global
export const CONFIG = {
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

// Las utilidades ya están disponibles globalmente gracias al sistema esbuild
// No necesitamos esperar, están compiladas e incluidas en el bundle

// Estado global compartido
export let statusPage = {}

// Funciones de utilidad para el estado
export const updateStatus = (updates) => {
  statusPage = DataUtils.deepMerge(statusPage, updates)
}

export const dispatchEvent = (eventName, detail) => {
  EventManager.emit(document, eventName, detail)
}

// Función para mostrar información en pantalla
export const updateDisplay = (text, isError = false) => {
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