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
