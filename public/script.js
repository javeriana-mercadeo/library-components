/**
 * Formulario de inscripción mejorado - Pontificia Universidad Javeriana
 * Version: 2.0
 */

const PERSONALIZATION = {
  // Modo debug
  DEBUG: false,
  EMAIL_DEBUG: '',
  // Eventos
  CAMPAIGN: 'MERCA_ENFER_ENFER'
}

// Configuración global
const CONFIG = {
  // URLs de destino
  DESTINATION_URL: 'https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8',
  URL_THANK_YOU: 'https://cloud.cx.javeriana.edu.co/EVENTOS_TKY',

  // URLs de los recursos JSON
  JSON_URLS: {
    UBICACIONES: './json/ubicaciones.json',
    PREFIJOS: './json/codigos_pais.json',
    PROGRAMAS: './json/programas.json',
    PERIODOS: './json/periodos.json'
  },

  // Configuración de validación
  VALIDATION: {
    EMAIL_REGEX:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    PHONE_MIN_LENGTH: 8,
    PHONE_MAX_LENGTH: 15
  },

  // Configuración de pasos
  STEPS: {
    TOTAL: 2,
    PROGRESS_WIDTH: ['50%', '100%']
  }
}

// IDs de los campos del formulario
const INPUTS = {
  urlDestination: 'https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8',
  id: '00Df4000003l8Bf',
  fistName: 'first_name',
  lastName: 'last_name',
  typeDocument: '00N5G00000WmhsT',
  document: '00N5G00000WmhsR',
  email: 'email',
  phoneCode: '00NJw000002mzb7',
  phone: 'mobile',
  country: '00N5G00000WmhvJ',
  department: '00N5G00000WmhvX',
  city: '00N5G00000WmhvO',
  admissionPeriod: '00N5G00000WmhvI',
  originCandidate: 'lead_source',
  sourceAuthorization: '00N5G00000WmhvT',
  codeSAE: '00N5G00000WmhvV',
  event: {
    TypeAttendee: '00NJw000001J3g6',
    academicLevel: 'nivelacademico',
    faculty: 'Facultad',
    dayAttendance: '00NJw000004iuIj',
    school: '00NJw0000041omr'
  },
  originRequest: '00NJw000001J3Hl',
  source: '00N5G00000WmhvW',
  subSource: '00N5G00000WmhvZ',
  mean: '00NJw000001J3g8',
  campaign: '00N5G00000Wmi8x',
  dataAuthorization: '00N5G00000WmhvF'
}

const INPUTS_TEST = {
  urlDestination: 'https://test.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8',
  id: '00D7j0000004eQD',
  fistName: 'first_name',
  lastName: 'last_name',
  typeDocument: '00N7j000002BI3X',
  document: '00N7j000002BI3V',
  email: 'email',
  phoneCode: '00NO4000002lUPh',
  phone: 'mobile',
  country: '00N7j000002BY1c',
  department: '00N7j000002BY1h',
  city: '00N7j000002BY1i',
  admissionPeriod: '00N7j000002BY2L',
  originCandidate: 'lead_source',
  sourceAuthorization: '00N7j000002BY26',
  codeSAE: '00N7j000002BI3p',
  event: {
    TypeAttendee: '00NO40000000sTR',
    academicLevel: 'nivelacademico',
    faculty: 'Facultad',
    dayAttendance: '00NO4000007qrPB',
    school: '00NO4000005begL'
  },
  originRequest: '00NO40000002ZeP',
  source: '00N7j000002BKgW',
  subSource: '00N7j000002BKgb',
  mean: '00NO40000001izt',
  campaign: '00N7j000002BfkF',
  dataAuthorization: '00N7j000002BI3m'
}

// Datos predeterminados (fallback) en caso de que falle la carga de los JSON
const DATOS_FALLBACK = {
  ubicaciones: {
    COL: {
      nombre: 'Colombia',
      departamentos: [
        {
          codigo: '05',
          nombre: 'Antioquia',
          ciudades: [
            { codigo: '05001', nombre: 'Medellín' },
            { codigo: '05266', nombre: 'Envigado' },
            { codigo: '05360', nombre: 'Itagüí' }
          ]
        },
        {
          codigo: '11',
          nombre: 'Bogotá D.C.',
          ciudades: [{ codigo: '11001', nombre: 'Bogotá' }]
        },
        {
          codigo: '76',
          nombre: 'Valle del Cauca',
          ciudades: [
            { codigo: '76001', nombre: 'Cali' },
            { codigo: '76520', nombre: 'Palmira' }
          ]
        }
      ]
    },
    USA: {
      nombre: 'Estados Unidos',
      departamentos: []
    },
    ESP: {
      nombre: 'España',
      departamentos: []
    },
    MEX: {
      nombre: 'México',
      departamentos: []
    },
    CAN: {
      nombre: 'Canadá',
      departamentos: []
    }
  },
  prefijoCel: [
    { iso2: 'CO', phoneCode: '57', phoneName: 'Colombia' },
    { iso2: 'US', phoneCode: '1', phoneName: 'Estados Unidos' },
    { iso2: 'ES', phoneCode: '34', phoneName: 'España' },
    { iso2: 'MX', phoneCode: '52', phoneName: 'México' },
    { iso2: 'AR', phoneCode: '54', phoneName: 'Argentina' },
    { iso2: 'BR', phoneCode: '55', phoneName: 'Brasil' },
    { iso2: 'CL', phoneCode: '56', phoneName: 'Chile' },
    { iso2: 'PE', phoneCode: '51', phoneName: 'Perú' },
    { iso2: 'EC', phoneCode: '593', phoneName: 'Ecuador' },
    { iso2: 'VE', phoneCode: '58', phoneName: 'Venezuela' }
  ],
  programas: {
    PREG: {
      '01': {
        FacultadCodigo: 'Facultad de Administración y Ciencias Económicas',
        Programas: [
          { Codigo: 'ADM01', Nombre: 'Administración de Empresas' },
          { Codigo: 'ECO01', Nombre: 'Economía' },
          { Codigo: 'CON01', Nombre: 'Contaduría Pública' }
        ]
      },
      '02': {
        FacultadCodigo: 'Facultad de Ingeniería',
        Programas: [
          { Codigo: 'ING01', Nombre: 'Ingeniería de Sistemas' },
          { Codigo: 'ING02', Nombre: 'Ingeniería Industrial' },
          { Codigo: 'ING03', Nombre: 'Ingeniería Civil' }
        ]
      },
      '03': {
        FacultadCodigo: 'Facultad de Ciencias',
        Programas: [
          { Codigo: 'BIO01', Nombre: 'Biología' },
          { Codigo: 'MAT01', Nombre: 'Matemáticas' }
        ]
      }
    },
    GRAD: {
      '01': {
        FacultadCodigo: 'Facultad de Administración y Ciencias Económicas',
        Programas: [
          { Codigo: 'MBA01', Nombre: 'Maestría en Administración de Empresas' },
          { Codigo: 'FIN01', Nombre: 'Maestría en Finanzas' }
        ]
      },
      '02': {
        FacultadCodigo: 'Facultad de Ingeniería',
        Programas: [
          { Codigo: 'MING01', Nombre: 'Maestría en Ingeniería' },
          { Codigo: 'MING02', Nombre: 'Maestría en Ciencias de la Computación' }
        ]
      }
    },
    ECLE: {
      '04': {
        FacultadCodigo: 'Facultad de Teología',
        Programas: [{ Codigo: 'TEO01', Nombre: 'Licenciatura en Teología' }]
      }
    },
    ETDH: {
      '05': {
        FacultadCodigo: 'Educación Continua',
        Programas: [
          { Codigo: 'TEC01', Nombre: 'Técnico en Gestión Administrativa' },
          { Codigo: 'TEC02', Nombre: 'Técnico en Desarrollo de Software' }
        ]
      }
    }
  },
  periodos: {
    PREG: {
      '2025-1': 'Primer semestre 2025',
      '2025-2': 'Segundo semestre 2025',
      '2026-1': 'Primer semestre 2026'
    },
    GRAD: {
      '2025-1': 'Primer semestre 2025',
      '2025-2': 'Segundo semestre 2025',
      '2026-1': 'Primer semestre 2026'
    },
    ECLE: {
      '2025-1': 'Primer semestre 2025',
      '2025-2': 'Segundo semestre 2025'
    },
    ETDH: {
      '2025-ENE': 'Enero 2025',
      '2025-MAR': 'Marzo 2025',
      '2025-JUN': 'Junio 2025',
      '2025-SEP': 'Septiembre 2025'
    }
  }
}

// Variables globales para almacenar datos cargados desde JSON
let ubicaciones = {}
let prefijoCel = []
let programas = {}
let periodos = {}

// Estado del formulario
let formState = {
  // Datos de usuario
  datos: {
    first_name: '',
    last_name: '',
    tipo_doc: '',
    numero_doc: '',
    email: '',
    mobile: '',
    prefijoCel: '',
    pais: '',
    departamento: '',
    ciudad: '',
    tipo_asistente: 'Aspirante',
    nivelacademico: '',
    facultad: '',
    programa: '',
    periodo_esperado: '',
    origen_sol: 'Web to Lead',
    fuenteAutoriza: 'Landing Eventos',
    lead: 'Landing Pages',
    company: 'NA',
    fuente: '',
    subfuente: '',
    medio: '',
    campana: CONFIG.CAMPANA_DEFAULT,
    autoriza: ''
  },

  // Estado de validación
  validacion: {
    paso1Valido: false,
    paso2Valido: false,
    paso3Valido: false
  },

  // Estado de UI
  ui: {
    pasoActual: 1,
    formularioEnviando: false,
    alertaVisible: false
  },

  // Registro de campos validados
  camposValidados: {},

  // Registro de errores
  errores: {}
}

// Función principal que inicializa todo cuando el DOM está cargado
document.addEventListener('DOMContentLoaded', () => {
  console.log('Inicializando formulario mejorado...')

  // Cargar datos necesarios desde los JSON
  cargarDatosIniciales()

  // Obtener parámetros UTM de la URL
  obtenerParametrosURL()

  // Configurar navegación por pasos
  configurarNavegacion()

  // Configurar eventos para los campos del formulario con validación en tiempo real
  configurarValidacionTiempoReal()

  // Configurar vista previa
  configurarVistaPrevia()

  // Configurar evento de envío del formulario
  configurarEnvioFormulario()
})

/**
 * Carga los datos iniciales desde los archivos JSON con gestión de caché y fallback
 */
async function cargarDatosIniciales() {
  try {
    mostrarCargando()

    // Primero intentar cargar desde localStorage (caché)
    const datosCacheados = obtenerDatosCacheados()

    if (datosCacheados) {
      console.log('Usando datos cacheados')
      ubicaciones = datosCacheados.ubicaciones
      prefijoCel = datosCacheados.prefijoCel
      programas = datosCacheados.programas
      periodos = datosCacheados.periodos

      // Inicializar selectores con los datos cacheados
      inicializarSelectores()
      ocultarCargando()
      return
    }

    // Si no hay caché, intentar cargar desde los endpoints
    try {
      const [respUbicaciones, respPrefijos, respProgramas, respPeriodos] = await Promise.all([
        fetch(CONFIG.JSON_URLS.UBICACIONES),
        fetch(CONFIG.JSON_URLS.PREFIJOS),
        fetch(CONFIG.JSON_URLS.PROGRAMAS),
        fetch(CONFIG.JSON_URLS.PERIODOS)
      ])

      // Verificar si todas las respuestas son exitosas
      if (respUbicaciones.ok && respPrefijos.ok && respProgramas.ok && respPeriodos.ok) {
        ubicaciones = await respUbicaciones.json()

        const datosPrefijos = await respPrefijos.json()
        prefijoCel = datosPrefijos.map(pais => ({
          iso2: pais.iso2,
          phoneCode: pais.phoneCode,
          phoneName: pais.nameES
        }))

        programas = await respProgramas.json()
        periodos = await respPeriodos.json()

        // Guardar en caché (localStorage)
        guardarEnCache({
          ubicaciones,
          prefijoCel,
          programas,
          periodos
        })
      } else {
        throw new Error('Una o más solicitudes fallaron')
      }
    } catch (error) {
      console.warn('No se pudieron cargar los datos desde la fuente. Usando datos predefinidos:', error)

      // Usar datos fallback
      ubicaciones = DATOS_FALLBACK.ubicaciones
      prefijoCel = DATOS_FALLBACK.prefijoCel
      programas = DATOS_FALLBACK.programas
      periodos = DATOS_FALLBACK.periodos

      // Mostrar notificación al usuario
      mostrarNotificacion(
        'Estamos utilizando datos predeterminados. Si necesitas información específica, por favor contacta al administrador.',
        'advertencia'
      )
    }

    // Inicializar selectores con los datos cargados o datos fallback
    inicializarSelectores()
    ocultarCargando()

    console.log('Datos iniciales cargados correctamente')
  } catch (error) {
    console.error('Error al inicializar datos:', error)

    // Usar datos fallback en caso de cualquier error
    ubicaciones = DATOS_FALLBACK.ubicaciones
    prefijoCel = DATOS_FALLBACK.prefijoCel
    programas = DATOS_FALLBACK.programas
    periodos = DATOS_FALLBACK.periodos

    inicializarSelectores()
    ocultarCargando()

    mostrarNotificacion(
      'Se produjo un error al cargar la información. Estamos utilizando datos básicos para que puedas continuar.',
      'advertencia'
    )
  }
}

/**
 * Inicializa todos los selectores una vez cargados los datos
 */
function inicializarSelectores() {
  cargarPaises()
  cargarPrefijosSelect()
}

/**
 * Obtiene datos cacheados del localStorage
 */
function obtenerDatosCacheados() {
  try {
    const datosJSON = localStorage.getItem('jv_form_data')
    if (!datosJSON) return null

    const datos = JSON.parse(datosJSON)
    const timestamp = localStorage.getItem('jv_form_timestamp')

    // Verificar si el caché es reciente (menos de 24 horas)
    if (timestamp && Date.now() - parseInt(timestamp) < 24 * 60 * 60 * 1000) {
      return datos
    }

    // Si el caché es antiguo, limpiarlo
    localStorage.removeItem('jv_form_data')
    localStorage.removeItem('jv_form_timestamp')
    return null
  } catch (error) {
    console.error('Error al recuperar datos cacheados:', error)
    return null
  }
}

/**
 * Guarda datos en el localStorage con timestamp
 */
function guardarEnCache(datos) {
  try {
    localStorage.setItem('jv_form_data', JSON.stringify(datos))
    localStorage.setItem('jv_form_timestamp', Date.now().toString())
  } catch (error) {
    console.error('Error al guardar en caché:', error)
    // Intentar limpiar el localStorage en caso de error (posiblemente por cuota excedida)
    try {
      localStorage.removeItem('jv_form_data')
      localStorage.removeItem('jv_form_timestamp')
    } catch (e) {
      console.error('No se pudo limpiar localStorage:', e)
    }
  }
}

/**
 * Carga la lista de países en el select correspondiente
 */
function cargarPaises() {
  const paisSelect = document.getElementById(INPUTS.country)
  if (!paisSelect) {
    console.error('No se encontró el elemento select de países')
    return
  }

  // Limpiar opciones existentes, dejando solo la primera
  while (paisSelect.options.length > 1) {
    paisSelect.remove(1)
  }

  // Verificar que tengamos datos de ubicaciones
  if (!ubicaciones || Object.keys(ubicaciones).length === 0) {
    console.error('No hay datos de ubicaciones disponibles')
    return
  }

  // Ordenar países por nombre para mejor usabilidad
  const paisesSorted = Object.entries(ubicaciones).sort((a, b) => a[1].nombre.localeCompare(b[1].nombre))

  // Agregar cada país como una opción
  for (const [codigo, pais] of paisesSorted) {
    const option = document.createElement('option')
    option.value = codigo
    option.textContent = pais.nombre

    // Destacar Colombia
    if (codigo === 'COL') {
      option.style.fontWeight = '700'
      option.style.backgroundColor = 'aliceBlue'
    }

    paisSelect.appendChild(option)
  }
}

/**
 * Carga los prefijos telefónicos en el select correspondiente
 */
function cargarPrefijosSelect() {
  const prefijoSelect = document.getElementById(INPUTS.phoneCode)
  if (!prefijoSelect) {
    console.error('No se encontró el elemento select de prefijos telefónicos')
    return
  }

  // Limpiar opciones existentes, dejando solo la primera
  while (prefijoSelect.options.length > 1) {
    prefijoSelect.remove(1)
  }

  // Verificar que tengamos datos de prefijos
  if (!prefijoCel || prefijoCel.length === 0) {
    console.error('No hay datos de prefijos telefónicos disponibles')
    return
  }

  // Ordenar los prefijos por nombre para mejor usabilidad
  const prefijosSorted = [...prefijoCel].sort((a, b) => a.phoneName.localeCompare(b.phoneName))

  // Agregar cada prefijo como una opción
  prefijosSorted.forEach(pais => {
    const option = document.createElement('option')
    option.value = pais.phoneCode
    option.textContent = `+${pais.phoneCode} - ${pais.phoneName}`

    // Destacar Colombia
    if (pais.phoneName === 'Colombia') {
      option.style.backgroundColor = 'aliceBlue'
      option.style.color = '#000000'
      option.style.fontWeight = '900'
    }

    prefijoSelect.appendChild(option)
  })
}

/**
 * Carga los departamentos según el país seleccionado
 */
function cargarDepartamentos() {
  const paisSeleccionado = formState.datos.pais
  const deptoContainer = document.getElementById('departamentoContainer')
  const deptoSelect = document.getElementById(INPUTS.department)

  if (!deptoContainer || !deptoSelect) {
    console.error('No se encontraron los elementos para departamentos')
    return
  }

  // Si el país es Colombia, mostrar el selector de departamentos
  if (paisSeleccionado === 'COL') {
    deptoContainer.style.display = 'block'

    // Limpiar opciones existentes, dejando solo la primera
    while (deptoSelect.options.length > 1) {
      deptoSelect.remove(1)
    }

    // Verificar que la estructura de datos sea correcta
    if (!ubicaciones.COL || !ubicaciones.COL.departamentos) {
      console.error('Estructura de datos incorrecta para departamentos de Colombia')
      return
    }

    // Ordenar departamentos por nombre
    const departamentos = [...ubicaciones.COL.departamentos].sort((a, b) => a.nombre.localeCompare(b.nombre))

    // Agregar cada departamento como una opción
    departamentos.forEach(depto => {
      const option = document.createElement('option')
      option.value = depto.codigo
      option.textContent = depto.nombre
      deptoSelect.appendChild(option)
    })

    // Hacer el campo requerido
    deptoSelect.required = true
  } else {
    // Si no es Colombia, ocultar el selector
    deptoContainer.style.display = 'none'
    deptoSelect.required = false

    // Restablecer valores relacionados
    const ciudadContainer = document.getElementById('ciudadContainer')
    if (ciudadContainer) {
      ciudadContainer.style.display = 'none'
    }
    formState.datos.departamento = ''
    formState.datos.ciudad = ''
  }
}

/**
 * Carga las ciudades según el departamento seleccionado
 */
function cargarCiudades() {
  const deptoSeleccionado = formState.datos.departamento
  const ciudadContainer = document.getElementById('ciudadContainer')
  const ciudadSelect = document.getElementById(INPUTS.city)

  if (!ciudadContainer || !ciudadSelect) {
    console.error('No se encontraron los elementos para ciudades')
    return
  }

  // Si hay un departamento seleccionado, mostrar el selector de ciudades
  if (deptoSeleccionado) {
    ciudadContainer.style.display = 'block'

    // Limpiar opciones existentes, dejando solo la primera
    while (ciudadSelect.options.length > 1) {
      ciudadSelect.remove(1)
    }

    // Verificar que la estructura de datos sea correcta
    if (!ubicaciones.COL || !ubicaciones.COL.departamentos) {
      console.error('Estructura de datos incorrecta para departamentos de Colombia')
      return
    }

    // Encontrar el departamento seleccionado
    const departamento = ubicaciones.COL.departamentos.find(d => d.codigo === deptoSeleccionado)

    if (departamento && departamento.ciudades) {
      // Ordenar ciudades por nombre
      const ciudades = [...departamento.ciudades].sort((a, b) => a.nombre.localeCompare(b.nombre))

      // Agregar cada ciudad como una opción
      ciudades.forEach(ciudad => {
        const option = document.createElement('option')
        option.value = ciudad.codigo
        option.textContent = ciudad.nombre
        ciudadSelect.appendChild(option)
      })
    } else {
      console.warn(`No se encontraron ciudades para el departamento ${deptoSeleccionado}`)
    }

    // Hacer el campo requerido
    ciudadSelect.required = true
  } else {
    // Si no hay departamento, ocultar el selector
    ciudadContainer.style.display = 'none'
    ciudadSelect.required = false
    formState.datos.ciudad = ''
  }
}

/**
 * Carga las facultades según el nivel académico seleccionado
 */
function cargarFacultades() {
  const nivelAcademico = formState.datos.nivelacademico
  const facultadRow = document.getElementById('facultadRow')
  const facultadSelect = document.getElementById(INPUTS.event.faculty)

  if (!facultadRow || !facultadSelect) {
    console.error('No se encontraron los elementos para facultades')
    return
  }

  // Si hay un nivel académico seleccionado, mostrar el selector de facultades
  if (nivelAcademico) {
    facultadRow.style.display = 'block'

    // Limpiar opciones existentes, dejando solo la primera
    while (facultadSelect.options.length > 1) {
      facultadSelect.remove(1)
    }

    // Verificar que tengamos datos para el nivel académico seleccionado
    if (!programas[nivelAcademico]) {
      console.warn(`No hay datos de programas para el nivel académico ${nivelAcademico}`)
      return
    }

    // Obtener facultades únicas
    const facultades = []
    const facultadesSet = new Set()

    for (const [codigo, facultad] of Object.entries(programas[nivelAcademico])) {
      if (!facultadesSet.has(codigo)) {
        facultadesSet.add(codigo)
        facultades.push({ codigo, nombre: facultad.FacultadCodigo })
      }
    }

    // Ordenar facultades alfabéticamente
    facultades.sort((a, b) => a.nombre.localeCompare(b.nombre))

    // Agregar cada facultad como una opción
    facultades.forEach(facultad => {
      const option = document.createElement('option')
      option.value = facultad.codigo
      option.textContent = facultad.nombre
      facultadSelect.appendChild(option)
    })

    // Hacer el campo requerido
    facultadSelect.required = true

    // Cargar periodos para el nivel académico
    cargarPeriodos(nivelAcademico)
  } else {
    // Si no hay nivel académico, ocultar el selector
    facultadRow.style.display = 'none'
    facultadSelect.required = false

    // Ocultar secciones dependientes
    const programaRow = document.getElementById('programaRow')
    const periodoRow = document.getElementById('periodoRow')

    if (programaRow) programaRow.style.display = 'none'
    if (periodoRow) periodoRow.style.display = 'none'

    formState.datos.facultad = ''
    formState.datos.programa = ''
    formState.datos.periodo_esperado = ''
  }
}

/**
 * Carga los programas según la facultad seleccionada
 */
function cargarProgramas() {
  const nivelAcademico = formState.datos.nivelacademico
  const facultad = formState.datos.facultad
  const programaRow = document.getElementById('programaRow')
  const programaSelect = document.getElementById(INPUTS.codeSAE)

  if (!programaRow || !programaSelect) {
    console.error('No se encontraron los elementos para programas')
    return
  }

  // Si hay una facultad seleccionada, mostrar el selector de programas
  if (facultad) {
    programaRow.style.display = 'block'

    // Limpiar opciones existentes, dejando solo la primera y la opción NOAP
    while (programaSelect.options.length > 2) {
      if (programaSelect.options[1].value !== 'NOAP') {
        programaSelect.remove(1)
      } else {
        programaSelect.remove(2)
      }
    }

    // Verificar que tengamos datos para el nivel académico y facultad seleccionados
    if (!programas[nivelAcademico] || !programas[nivelAcademico][facultad]) {
      console.warn(`No hay datos de programas para nivel ${nivelAcademico} - facultad ${facultad}`)
      return
    }

    const programasFacultad = programas[nivelAcademico][facultad].Programas || []

    // Ordenar programas por nombre
    const programasOrdenados = [...programasFacultad].sort((a, b) => a.Nombre.localeCompare(b.Nombre))

    // Agregar cada programa como una opción
    programasOrdenados.forEach(programa => {
      const option = document.createElement('option')
      option.value = programa.Codigo
      option.textContent = programa.Nombre
      programaSelect.appendChild(option)
    })

    // Hacer el campo requerido
    programaSelect.required = true

    // Mostrar el selector de periodos
    const periodoRow = document.getElementById('periodoRow')
    if (periodoRow) {
      periodoRow.style.display = 'block'
    }
  } else {
    // Si no hay facultad, ocultar el selector
    programaRow.style.display = 'none'
    programaSelect.required = false
    formState.datos.programa = ''
  }
}

/**
 * Carga los periodos según el nivel académico seleccionado
 */
function cargarPeriodos(nivelAcademico) {
  const periodoRow = document.getElementById('periodoRow')
  const periodoSelect = document.getElementById(INPUTS.admissionPeriod)

  if (!periodoRow || !periodoSelect) {
    console.error('No se encontraron los elementos para periodos')
    return
  }

  // Si hay un nivel académico seleccionado, mostrar el selector de periodos
  if (nivelAcademico) {
    periodoRow.style.display = 'block'

    // Limpiar opciones existentes, dejando solo la primera
    while (periodoSelect.options.length > 1) {
      periodoSelect.remove(1)
    }

    // Verificar que tengamos datos para el nivel académico seleccionado
    if (!periodos[nivelAcademico]) {
      console.warn(`No hay datos de periodos para el nivel académico ${nivelAcademico}`)
      return
    }

    // Convertir objeto a array para ordenar
    const periodosArray = Object.entries(periodos[nivelAcademico])
      .map(([codigo, nombre]) => ({ codigo, nombre }))
      .sort((a, b) => a.nombre.localeCompare(b.nombre))

    // Agregar cada periodo como una opción
    periodosArray.forEach(periodo => {
      const option = document.createElement('option')
      option.value = periodo.codigo
      option.textContent = periodo.nombre
      periodoSelect.appendChild(option)
    })

    // Hacer el campo requerido
    periodoSelect.required = true
  } else {
    // Si no hay nivel académico, ocultar el selector
    periodoRow.style.display = 'none'
    periodoSelect.required = false
    formState.datos.periodo_esperado = ''
  }
}

/**
 * Configura el evento de envío del formulario
 */
function inicializarErrorModal() {
  // Obtener referencias a los elementos
  const errorButton = document.getElementById('errorButton')
  const errorModal = document.getElementById('errorModal')
  const errorModalContent = document.getElementById('errorModalContent')
  const errorModalClose = document.querySelector('.jv-error-modal-close')

  if (!errorButton || !errorModal || !errorModalContent || !errorModalClose) {
    console.warn('No se encontraron todos los elementos necesarios para el modal de errores')
    return
  }

  // Configurar evento de clic para mostrar modal
  errorButton.addEventListener('click', () => {
    errorModal.style.display = 'block'
    // Prevenir scroll en el body
    document.body.style.overflow = 'hidden'
  })

  // Configurar evento de cierre del modal
  errorModalClose.addEventListener('click', () => {
    errorModal.style.display = 'none'
    // Restaurar scroll en el body
    document.body.style.overflow = ''
  })

  // Cerrar modal cuando se hace clic fuera del contenido
  window.addEventListener('click', e => {
    if (e.target === errorModal) {
      errorModal.style.display = 'none'
      document.body.style.overflow = ''
    }
  })

  // Cerrar modal con tecla Escape
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && errorModal.style.display === 'block') {
      errorModal.style.display = 'none'
      document.body.style.overflow = ''
    }
  })
}

/**
 * Configura la navegación por pasos
 */
function configurarNavegacion() {
  // Verificar que existan los elementos necesarios
  const toStep2Btn = document.getElementById('toStep2Btn')
  const toStep1Btn = document.getElementById('toStep1Btn')

  if (!toStep2Btn || !toStep1Btn) {
    console.error('No se encontraron todos los botones de navegación')
    mostrarNotificacion('Error en la configuración de navegación del formulario', 'error')
    return
  }

  // Mostrar paso inicial
  mostrarPaso(1)

  // Configurar botones de navegación
  toStep2Btn.addEventListener('click', () => {
    if (validarPaso(1)) {
      mostrarPaso(2)
    }
  })

  toStep1Btn.addEventListener('click', () => {
    mostrarPaso(1)
  })

  // Configurar navegación por clics en los indicadores de pasos
  const progressSteps = document.querySelectorAll('.jv-progress-step')
  if (progressSteps.length > 0) {
    progressSteps.forEach(step => {
      step.addEventListener('click', e => {
        const targetStep = parseInt(e.currentTarget.dataset.step)
        const currentStep = formState.ui.pasoActual

        // Solo permitir ir a pasos anteriores o validados
        if (targetStep < currentStep || validarPaso(currentStep)) {
          mostrarPaso(targetStep)
        }
      })
    })
  } else {
    console.warn('No se encontraron elementos de pasos de progreso')
  }

  // Inicializar el modal de errores
  inicializarErrorModal()
}

/**
 * Muestra un paso específico y actualiza la barra de progreso
 */
function mostrarPaso(numeroPaso) {
  // Validar el número de paso
  if (numeroPaso < 1 || numeroPaso > CONFIG.STEPS.TOTAL) {
    console.error(`Número de paso inválido: ${numeroPaso}`)
    return
  }

  // Obtener elementos necesarios
  const pasoContenidos = document.querySelectorAll('.jv-step-content')
  const barraProgreso = document.getElementById('formProgress')
  const indicadoresPasos = document.querySelectorAll('.jv-progress-step')

  if (pasoContenidos.length === 0 || !barraProgreso || indicadoresPasos.length === 0) {
    console.error('No se encontraron elementos necesarios para mostrar el paso')
    return
  }

  // Ocultar todos los pasos
  pasoContenidos.forEach(content => {
    content.classList.remove('active')
  })

  // Mostrar el paso solicitado
  const pasoActual = document.getElementById(`step${numeroPaso}Content`)
  if (pasoActual) {
    pasoActual.classList.add('active')
  } else {
    console.error(`No se encontró el contenido para el paso ${numeroPaso}`)
    return
  }

  // Actualizar la barra de progreso
  barraProgreso.style.width = CONFIG.STEPS.PROGRESS_WIDTH[numeroPaso - 1]

  // Actualizar estados de los pasos
  indicadoresPasos.forEach(step => {
    const stepNumber = parseInt(step.dataset.step)

    // Eliminar todas las clases de estado
    step.classList.remove('active', 'completed')

    // Asignar clases según el paso actual
    if (stepNumber === numeroPaso) {
      step.classList.add('active')
    } else if (stepNumber < numeroPaso) {
      step.classList.add('completed')
    }
  })

  // Actualizar estado actual
  formState.ui.pasoActual = numeroPaso

  // Scroll al inicio del formulario
  const formulario = document.querySelector('.jv-form')
  if (formulario) {
    formulario.scrollIntoView({ behavior: 'smooth' })
  }
}

/**
 * Configura eventos para validación en tiempo real
 */
function configurarValidacionTiempoReal() {
  // Verificar que existan los elementos necesarios para cada campo
  const camposObligatorios = [
    { id: INPUTS.fistName, stateKey: 'first_name', errorId: 'first_name_error' },
    { id: INPUTS.lastName, stateKey: 'last_name', errorId: 'last_name_error' },
    { id: INPUTS.typeDocument, stateKey: 'tipo_doc', errorId: 'tipo_doc_error' },
    { id: INPUTS.document, stateKey: 'numero_doc', errorId: 'numero_doc_error' },
    { id: INPUTS.email, stateKey: 'email', errorId: 'email_error' },
    { id: INPUTS.phoneCode, stateKey: 'prefijoCel', errorId: 'prefijoCel_error' },
    { id: INPUTS.phone, stateKey: 'mobile', errorId: 'mobile_error' }
  ]

  // Comprobar que existen los elementos antes de configurar eventos
  camposObligatorios.forEach(campo => {
    if (!document.getElementById(campo.id) || !document.getElementById(campo.errorId)) {
      console.warn(`No se encontró el campo ${campo.id} o su elemento de error`)
    }
  })

  // Eventos para el paso 1 - Datos personales
  configurarValidacionCampo(INPUTS.fistName, 'first_name', validarCampoRequerido, 'first_name_error', 'Por favor ingresa tu nombre')
  configurarValidacionCampo(INPUTS.lastName, 'last_name', validarCampoRequerido, 'last_name_error', 'Por favor ingresa tus apellidos')
  configurarValidacionCampo(INPUTS.typeDocument, 'tipo_doc', validarCampoRequerido, 'tipo_doc_error', 'Selecciona un tipo de documento')
  configurarValidacionCampo(INPUTS.document, 'numero_doc', validarDocumento, 'numero_doc_error', 'Ingresa un número de documento válido')
  configurarValidacionCampo(INPUTS.email, 'email', validarEmail, 'email_error', 'Ingresa un correo electrónico válido')
  configurarValidacionCampo(INPUTS.phoneCode, 'prefijoCel', validarCampoRequerido, 'prefijoCel_error', 'Selecciona un prefijo telefónico')
  configurarValidacionCampo(INPUTS.phone, 'mobile', validarTelefono, 'mobile_error', 'Ingresa un número de teléfono válido (8-15 dígitos)')

  // Auto-formateo para el teléfono
  const campoTelefono = document.getElementById(INPUTS.phone)
  if (campoTelefono) {
    campoTelefono.addEventListener('input', function (e) {
      const valorLimpio = limpiarNumeros(e.target.value)
      e.target.value = formatearTelefono(valorLimpio)
      formState.datos.mobile = valorLimpio
    })
  }

  // Eventos para el paso 2 - Ubicación
  configurarValidacionCampo(INPUTS.country, 'pais', validarCampoRequerido, 'pais_error', 'Selecciona un país')

  // Manejar cambio de país para mostrar/ocultar departamentos
  const selectPais = document.getElementById(INPUTS.country)
  if (selectPais) {
    selectPais.addEventListener('change', function (e) {
      formState.datos.pais = e.target.value
      validarCampoSimple(INPUTS.country, 'pais', validarCampoRequerido, 'pais_error')
      cargarDepartamentos()

      // Si el país no es Colombia, validar el paso 2 de inmediato
      if (formState.datos.pais !== 'COL') {
        formState.validacion.paso2Valido = true
      } else {
        formState.validacion.paso2Valido = false
      }
    })
  }

  // Evento para departamento
  const selectDepartamento = document.getElementById(INPUTS.department)
  if (selectDepartamento) {
    selectDepartamento.addEventListener('change', function (e) {
      formState.datos.departamento = e.target.value
      validarCampoSimple(INPUTS.department, 'departamento', validarCampoRequerido, 'departamento_error')
      cargarCiudades()
    })
  }

  // Evento para ciudad
  const selectCiudad = document.getElementById(INPUTS.city)
  if (selectCiudad) {
    selectCiudad.addEventListener('change', function (e) {
      formState.datos.ciudad = e.target.value
      validarCampoSimple(INPUTS.city, 'ciudad', validarCampoRequerido, 'ciudad_error')
    })
  }

  // Eventos para el paso 3 - Información académica
  configurarValidacionCampo(
    INPUTS.event.academicLevel,
    'nivelacademico',
    validarCampoRequerido,
    'nivelacademico_error',
    'Selecciona un nivel académico'
  )

  // Manejar cambio de nivel académico
  const selectNivelAcademico = document.getElementById(INPUTS.event.academicLevel)
  if (selectNivelAcademico) {
    selectNivelAcademico.addEventListener('change', function (e) {
      formState.datos.nivelacademico = e.target.value
      validarCampoSimple(INPUTS.event.academicLevel, 'nivelacademico', validarCampoRequerido, 'nivelacademico_error')
      cargarFacultades()
    })
  }

  // Evento para facultad
  const selectFacultad = document.getElementById(INPUTS.event.faculty)
  if (selectFacultad) {
    selectFacultad.addEventListener('change', function (e) {
      formState.datos.facultad = e.target.value
      validarCampoSimple(INPUTS.event.faculty, 'facultad', validarCampoRequerido, 'facultad_error')
      cargarProgramas()
    })
  }

  // Evento para programa
  const selectPrograma = document.getElementById(INPUTS.codeSAE)
  if (selectPrograma) {
    selectPrograma.addEventListener('change', function (e) {
      formState.datos.programa = e.target.value
      validarCampoSimple(INPUTS.codeSAE, 'programa', validarCampoRequerido, 'programa_error')
    })
  }

  // Evento para periodo
  const selectPeriodo = document.getElementById(INPUTS.admissionPeriod)
  if (selectPeriodo) {
    selectPeriodo.addEventListener('change', function (e) {
      formState.datos.periodo_esperado = e.target.value
      validarCampoSimple(INPUTS.admissionPeriod, 'periodo_esperado', validarCampoRequerido, 'periodo_esperado_error')
    })
  }

  // Evento para la autorización de datos
  const radiosAutorizacion = document.querySelectorAll(`input[name="${INPUTS.dataAuthorization}"]`)
  if (radiosAutorizacion.length > 0) {
    radiosAutorizacion.forEach(radio => {
      radio.addEventListener('change', function (e) {
        formState.datos.autoriza = e.target.value
        validarAutorizacion()
      })
    })
  } else {
    console.warn('No se encontraron los botones de radio para autorización de datos')
  }
}

/**
 * Configura eventos de validación para un campo específico
 */
function configurarValidacionCampo(inputId, stateKey, validatorFn, errorId, errorMsg) {
  const input = document.getElementById(inputId)
  if (!input) {
    console.warn(`No se encontró el elemento con ID ${inputId}`)
    return
  }

  const errorElement = document.getElementById(errorId)
  if (!errorElement) {
    console.warn(`No se encontró el elemento de error con ID ${errorId}`)
  }

  // Función para actualizar el valor en el estado
  const updateStateValue = e => {
    formState.datos[stateKey] = e.target.value
  }

  // Evento para actualizar valor al cambiar
  input.addEventListener('change', updateStateValue)
  input.addEventListener('input', updateStateValue)

  // Evento para validar al perder el foco
  input.addEventListener('blur', () => {
    validarCampoSimple(inputId, stateKey, validatorFn, errorId, errorMsg)
  })

  // Para inputs tipo texto, validar mientras escribe (debounced)
  if (input.type === 'text' || input.type === 'email' || input.type === 'tel') {
    const debounced = debounce(() => {
      validarCampoSimple(inputId, stateKey, validatorFn, errorId, errorMsg)
    }, 500)

    input.addEventListener('input', debounced)
  }
}

/**
 * Valida un campo individual
 */
function validarCampoSimple(inputId, stateKey, validatorFn, errorId, customErrorMsg) {
  const input = document.getElementById(inputId)
  const errorElement = document.getElementById(errorId)
  if (!input) {
    console.warn(`No se encontró el elemento con ID ${inputId}`)
    return false
  }
  if (!errorElement) {
    console.warn(`No se encontró el elemento de error con ID ${errorId}`)
    return false
  }

  const value = formState.datos[stateKey]
  const esValido = validatorFn(value)

  // Actualizar UI
  if (esValido) {
    input.classList.remove('jv-error')
    input.classList.add('jv-validated')
    errorElement.style.display = 'none'
    formState.camposValidados[stateKey] = true
    delete formState.errores[stateKey]
  } else {
    input.classList.add('jv-error')
    input.classList.remove('jv-validated')
    errorElement.textContent = customErrorMsg || 'Completa este campo correctamente'
    errorElement.style.display = 'block'
    formState.camposValidados[stateKey] = false
    formState.errores[stateKey] = true
  }

  return esValido
}

/**
 * Validar un paso completo del formulario
 */
function validarPaso(numeroPaso) {
  if (numeroPaso < 1 || numeroPaso > CONFIG.STEPS.TOTAL) {
    console.error(`Número de paso inválido: ${numeroPaso}`)
    return false
  }

  let pasoValido = true
  const errores = []

  // Validar campos según el paso
  switch (numeroPaso) {
    case 1: // Datos personales y ubicación
      if (!validarCampoSimple(INPUTS.fistName, 'first_name', validarCampoRequerido, 'first_name_error', 'Por favor ingresa tu nombre')) {
        pasoValido = false
        errores.push('Debes completar tu nombre')
      }

      if (!validarCampoSimple(INPUTS.lastName, 'last_name', validarCampoRequerido, 'last_name_error', 'Por favor ingresa tus apellidos')) {
        pasoValido = false
        errores.push('Debes completar tus apellidos')
      }

      if (
        !validarCampoSimple(INPUTS.typeDocument, 'tipo_doc', validarCampoRequerido, 'tipo_doc_error', 'Selecciona un tipo de documento')
      ) {
        pasoValido = false
        errores.push('Debes seleccionar un tipo de documento')
      }

      if (
        !validarCampoSimple(INPUTS.document, 'numero_doc', validarDocumento, 'numero_doc_error', 'Ingresa un número de documento válido')
      ) {
        pasoValido = false
        errores.push('El número de documento no es válido')
      }

      if (!validarCampoSimple(INPUTS.email, 'email', validarEmail, 'email_error', 'Ingresa un correo electrónico válido')) {
        pasoValido = false
        errores.push('El correo electrónico no es válido')
      }

      if (
        !validarCampoSimple(INPUTS.phoneCode, 'prefijoCel', validarCampoRequerido, 'prefijoCel_error', 'Selecciona un prefijo telefónico')
      ) {
        pasoValido = false
        errores.push('Debes seleccionar un prefijo telefónico')
      }

      if (
        !validarCampoSimple(INPUTS.phone, 'mobile', validarTelefono, 'mobile_error', 'Ingresa un número de teléfono válido (8-15 dígitos)')
      ) {
        pasoValido = false
        errores.push('El número de teléfono no es válido')
      }

      // Validar ubicación (que antes estaba en el paso 2)
      if (!validarCampoSimple(INPUTS.country, 'pais', validarCampoRequerido, 'pais_error', 'Selecciona un país')) {
        pasoValido = false
        errores.push('Debes seleccionar un país')
      }

      // Si es Colombia, validar departamento y ciudad
      if (formState.datos.pais === 'COL') {
        if (
          !validarCampoSimple(INPUTS.department, 'departamento', validarCampoRequerido, 'departamento_error', 'Selecciona un departamento')
        ) {
          pasoValido = false
          errores.push('Debes seleccionar un departamento')
        }

        if (!validarCampoSimple(INPUTS.city, 'ciudad', validarCampoRequerido, 'ciudad_error', 'Selecciona una ciudad')) {
          pasoValido = false
          errores.push('Debes seleccionar una ciudad')
        }
      }

      formState.validacion.paso1Valido = pasoValido
      break

    case 2: // Información académica (antes paso 3)
      if (
        !validarCampoSimple(
          INPUTS.event.academicLevel,
          'nivelacademico',
          validarCampoRequerido,
          'nivelacademico_error',
          'Selecciona un nivel académico'
        )
      ) {
        pasoValido = false
        errores.push('Debes seleccionar un nivel académico')
      }

      if (formState.datos.nivelacademico) {
        if (!validarCampoSimple(INPUTS.event.faculty, 'facultad', validarCampoRequerido, 'facultad_error', 'Selecciona una facultad')) {
          pasoValido = false
          errores.push('Debes seleccionar una facultad')
        }

        if (!validarCampoSimple(INPUTS.codeSAE, 'programa', validarCampoRequerido, 'programa_error', 'Selecciona un programa')) {
          pasoValido = false
          errores.push('Debes seleccionar un programa')
        }

        if (
          !validarCampoSimple(
            INPUTS.admissionPeriod,
            'periodo_esperado',
            validarCampoRequerido,
            'periodo_esperado_error',
            'Selecciona un periodo'
          )
        ) {
          pasoValido = false
          errores.push('Debes seleccionar un periodo de ingreso')
        }
      }

      if (!validarAutorizacion()) {
        pasoValido = false
        errores.push('Debes autorizar el tratamiento de datos personales')
      }

      formState.validacion.paso2Valido = pasoValido
      break
  }

  // Si hay errores, mostrar mensaje general
  if (!pasoValido && errores.length > 0) {
    mostrarErroresGenerales(errores)
  } else {
    ocultarErroresGenerales()
  }

  return pasoValido
}

/**
 * Mostrar errores generales
 */
function mostrarErroresGenerales(errores) {
  const errorButton = document.getElementById('errorButton')
  const errorModalContent = document.getElementById('errorModalContent')

  if (!errorButton || !errorModalContent) {
    console.warn('No se encontraron los elementos necesarios para mostrar errores')
    return
  }

  // Actualizar contador de errores
  const currentErrorCount = errores.length
  const errorCount = document.querySelector('.jv-error-count')
  if (errorCount) {
    errorCount.textContent = currentErrorCount.toString()
  }

  // Mostrar el botón de errores
  errorButton.style.display = 'flex'

  // Animar el botón para llamar la atención (agregamos clase css)
  errorButton.classList.add('jv-error-button-pulse')
  setTimeout(() => {
    errorButton.classList.remove('jv-error-button-pulse')
  }, 1000)

  // Actualizar contenido del modal
  let errorHTML = '<ul class="jv-error-list">'
  errores.forEach(error => {
    errorHTML += `
      <li>
        <div class="jv-error-item">
          <i class="fas fa-exclamation-circle"></i>
          <div class="jv-error-item-content">${error}</div>
        </div>
      </li>`
  })
  errorHTML += '</ul>'

  errorModalContent.innerHTML = errorHTML
}

/**
 * Ocultar errores generales
 */
function ocultarErroresGenerales() {
  const errorButton = document.getElementById('errorButton')
  const errorModal = document.getElementById('errorModal')

  if (errorButton) {
    errorButton.style.display = 'none'
  }

  if (errorModal) {
    errorModal.style.display = 'none'
  }
}

const estiloAnimacionErrores = document.createElement('style')
estiloAnimacionErrores.textContent = `
  @keyframes jv-error-pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }

  .jv-error-button-pulse {
    animation: jv-error-pulse 0.5s ease-in-out 3;
  }
`
document.head.appendChild(estiloAnimacionErrores)

/**
 * Funciones de validación específicas
 */
function validarCampoRequerido(valor) {
  return valor !== null && valor !== undefined && valor.trim() !== ''
}

function validarEmail(email) {
  return CONFIG.VALIDATION.EMAIL_REGEX.test(email)
}

function validarTelefono(telefono) {
  const numeroLimpio = limpiarNumeros(telefono)
  return numeroLimpio.length >= CONFIG.VALIDATION.PHONE_MIN_LENGTH && numeroLimpio.length <= CONFIG.VALIDATION.PHONE_MAX_LENGTH
}

function validarDocumento(documento) {
  const tipoDocumento = formState.datos.tipo_doc
  const numeroDocumento = documento.trim()

  if (!numeroDocumento) return false

  // Validaciones específicas según tipo de documento
  switch (tipoDocumento) {
    case 'CC': // Cédula de Ciudadanía (solo números, min 6, max 10)
      return /^\d{6,10}$/.test(numeroDocumento)

    case 'CE': // Cédula de Extranjería (números y letras, min 6, max 12)
      return /^[A-Za-z0-9]{6,12}$/.test(numeroDocumento)

    case 'PA': // Pasaporte (alfanumérico, min 6, max 15)
      return /^[A-Za-z0-9]{6,15}$/.test(numeroDocumento)

    case 'TI': // Tarjeta de Identidad (solo números, min 10, max 11)
      return /^\d{10,11}$/.test(numeroDocumento)

    default: // Si no hay tipo seleccionado o es otro, validación general
      return numeroDocumento.length >= 6 && numeroDocumento.length <= 15
  }
}

/**
 * Validar la autorización de datos personales
 */
function validarAutorizacion() {
  const autorizaErrorMsg = document.getElementById('autorizacionErrorMessage')
  if (!autorizaErrorMsg) {
    console.warn('No se encontró el contenedor de error para autorización')
    return false
  }

  if (formState.datos.autoriza === '1') {
    autorizaErrorMsg.style.display = 'none'
    return true
  } else if (formState.datos.autoriza === '0') {
    autorizaErrorMsg.style.display = 'block'
    return false
  } else {
    autorizaErrorMsg.style.display = 'none'
    return false
  }
}

/**
 * Configura la funcionalidad de vista previa
 */
function configurarVistaPrevia() {
  const previewBtn = document.getElementById('previewBtn')
  const modal = document.getElementById('previewModal')
  const closeBtns = document.querySelectorAll('.jv-modal-close')
  const confirmBtn = document.getElementById('confirmSubmitBtn')

  if (!previewBtn || !modal || closeBtns.length === 0 || !confirmBtn) {
    console.error('No se encontraron los elementos necesarios para la vista previa')
    return
  }

  // Mostrar modal de vista previa
  previewBtn.addEventListener('click', () => {
    // Antes: if (validarPaso(3)) { ... }
    // Ahora: Validamos el paso 2 que contiene la información académica
    if (validarPaso(2)) {
      generarVistaPrevia()
      mostrarModal()
    }
  })

  // Cerrar modal
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      cerrarModal()
    })
  })

  // Cerrar modal con Escape
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      cerrarModal()
    }
  })

  // Cerrar modal al hacer clic fuera del contenido
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      cerrarModal()
    }
  })

  // Confirmar envío desde la vista previa
  confirmBtn.addEventListener('click', e => {
    e.preventDefault()
    enviarFormulario()
    cerrarModal()
  })

  function mostrarModal() {
    modal.style.display = 'block'
    // Desplazamiento suave al modal
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function cerrarModal() {
    modal.style.display = 'none'
  }
}

/**
 * Genera el contenido para la vista previa
 */
function generarVistaPrevia() {
  const previewContent = document.getElementById('previewContent')
  if (!previewContent) {
    console.error('No se encontró el contenedor para la vista previa')
    return
  }

  // Recopilar datos organizados por secciones
  const datosPersonales = [
    { label: 'Nombre', valor: formState.datos.first_name },
    { label: 'Apellidos', valor: formState.datos.last_name },
    { label: 'Tipo de documento', valor: obtenerTextoSelect(INPUTS.typeDocument) },
    { label: 'Número de documento', valor: formState.datos.numero_doc },
    { label: 'Email', valor: formState.datos.email },
    { label: 'Teléfono', valor: `+${formState.datos.prefijoCel} ${formatearTelefono(formState.datos.mobile)}` }
  ]

  const datosUbicacion = [{ label: 'País', valor: obtenerTextoSelect(INPUTS.country) }]

  // Agregar departamento y ciudad si es Colombia
  if (formState.datos.pais === 'COL') {
    datosUbicacion.push(
      { label: 'Departamento', valor: obtenerTextoSelect(INPUTS.department) },
      { label: 'Ciudad', valor: obtenerTextoSelect(INPUTS.city) }
    )
  }

  const datosAcademicos = [
    { label: 'Nivel académico', valor: obtenerTextoSelect(INPUTS.event.academicLevel) },
    { label: 'Facultad', valor: obtenerTextoSelect(INPUTS.event.faculty) },
    { label: 'Programa', valor: obtenerTextoSelect(INPUTS.codeSAE) },
    { label: 'Periodo esperado', valor: obtenerTextoSelect(INPUTS.admissionPeriod) }
  ]

  // Generar HTML
  let html = `
    <div class="jv-preview-section">
      <h5>Datos Personales</h5>
      ${generarFilasPreview(datosPersonales)}
    </div>

    <div class="jv-preview-section">
      <h5>Ubicación</h5>
      ${generarFilasPreview(datosUbicacion)}
    </div>

    <div class="jv-preview-section">
      <h5>Información Académica</h5>
      ${generarFilasPreview(datosAcademicos)}
    </div>
  `

  previewContent.innerHTML = html
}

/**
 * Genera filas HTML para la vista previa
 */
function generarFilasPreview(datos) {
  return datos
    .map(
      item => `
    <div class="jv-preview-item">
      <div class="jv-preview-label">${item.label}:</div>
      <div class="jv-preview-value">${item.valor || '-'}</div>
    </div>
  `
    )
    .join('')
}

/**
 * Obtiene el texto visible de un elemento select por su ID
 */
function obtenerTextoSelect(selectId) {
  const select = document.getElementById(selectId)
  if (!select) {
    console.warn(`No se encontró el elemento select con ID ${selectId}`)
    return '-'
  }

  if (select && select.selectedIndex >= 0) {
    return select.options[select.selectedIndex].text
  }
  return '-'
}

/**
 * Configura el evento de envío del formulario
 */
function configurarEnvioFormulario() {
  const formulario = document.getElementById('form_SF')
  const submitBtn = document.getElementById('submitBtn')

  if (!formulario || !submitBtn) {
    console.error('No se encontró el formulario o el botón de envío')
    return
  }

  // Configurar la URL de destino y la URL de retorno
  formulario.action = CONFIG.DESTINATION_URL
  const retURLInput = document.getElementById('retURL')
  if (retURLInput) {
    retURLInput.value = CONFIG.URL_THANK_YOU
  }

  formulario.addEventListener('submit', function (event) {
    // Prevenir el envío por defecto
    event.preventDefault()

    // Si el formulario ya se está enviando, no hacer nada
    if (formState.ui.formularioEnviando) return

    // Validar todo el formulario
    if (validarFormularioCompleto()) {
      enviarFormulario()
    } else {
      // Mostrar mensaje general de error
      mostrarErroresGenerales(['Por favor revisa los campos marcados en rojo y completa la información requerida.'])

      // Ir al primer paso con error
      if (!formState.validacion.paso1Valido) {
        mostrarPaso(1)
      } else if (!formState.validacion.paso2Valido) {
        mostrarPaso(2)
      }
      // Eliminar la referencia al paso 3
      // } else {
      //   mostrarPaso(3);
      // }
    }
  })
}

/**
 * Valida todo el formulario
 */
function validarFormularioCompleto() {
  // Validar cada paso
  validarPaso(1)
  validarPaso(2)

  // Verificar si todos los pasos son válidos
  return formState.validacion.paso1Valido && formState.validacion.paso2Valido
}

/**
 * Envía el formulario
 */
function enviarFormulario() {
  const formulario = document.getElementById('form_SF')
  if (!formulario) {
    console.error('No se encontró el formulario para enviar')
    return
  }

  // Evitar múltiples envíos
  if (formState.ui.formularioEnviando) return

  formState.ui.formularioEnviando = true

  // Cambiar estado del botón de envío
  const submitBtn = document.getElementById('submitBtn')
  if (submitBtn) {
    const textoOriginal = submitBtn.innerHTML
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...'
    submitBtn.disabled = true
  }

  // Mostrar mensaje de éxito y enviar el formulario después de un breve retraso
  const successMsg = document.getElementById('successMsg')
  if (successMsg) {
    successMsg.style.display = 'block'
  }

  setTimeout(() => {
    try {
      formulario.submit()
    } catch (error) {
      console.error('Error al enviar el formulario:', error)
      formState.ui.formularioEnviando = false
      if (submitBtn) {
        submitBtn.innerHTML = 'Inscríbete ahora'
        submitBtn.disabled = false
      }
      mostrarNotificacion('Hubo un problema al enviar el formulario. Por favor, intenta nuevamente.', 'error')
    }
  }, 1500)
}

/**
 * Obtiene los parámetros UTM de la URL y los asigna a sus campos correspondientes
 */
function obtenerParametrosURL() {
  const urlParams = new URLSearchParams(window.location.search)

  // Asignar valores de parámetros UTM si existen
  formState.datos.fuente = urlParams.get('utm_source') || ''
  formState.datos.subfuente = urlParams.get('utm_subsource') || ''
  formState.datos.medio = urlParams.get('utm_medium') || ''
  formState.datos.campana = urlParams.get('utm_campaign') || CONFIG.CAMPANA_DEFAULT

  // Asignar valores a los campos ocultos
  if (formState.datos.fuente) {
    const campoFuente = document.getElementById(INPUTS.source)
    if (campoFuente) campoFuente.value = formState.datos.fuente
  }
  if (formState.datos.subfuente) {
    const campoSubfuente = document.getElementById(INPUTS.subSource)
    if (campoSubfuente) campoSubfuente.value = formState.datos.subfuente
  }
  if (formState.datos.medio) {
    const campoMedio = document.getElementById(INPUTS.mean)
    if (campoMedio) campoMedio.value = formState.datos.medio
  }
  if (formState.datos.campana) {
    const campoCampana = document.getElementById(INPUTS.campaign)
    if (campoCampana) campoCampana.value = formState.datos.campana
  }
}

/**
 * Formatea un número de teléfono para mejor legibilidad
 */
function formatearTelefono(numero) {
  const limpioNumeros = limpiarNumeros(numero)

  if (limpioNumeros.length <= 3) {
    return limpioNumeros
  } else if (limpioNumeros.length <= 7) {
    return limpioNumeros.replace(/(\d{3})(\d+)/, '$1 $2')
  } else {
    return limpioNumeros.replace(/(\d{3})(\d{3})(\d+)/, '$1 $2 $3')
  }
}

/**
 * Limpia un texto para que solo contenga números
 */
function limpiarNumeros(texto) {
  return texto ? texto.replace(/[^\d]/g, '') : ''
}

/**
 * Funciones de utilidad
 */

/**
 * Función debounce para limitar la frecuencia de ejecución de una función
 */
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Mostrar indicador de carga
 */
function mostrarCargando() {
  // Verificar si ya existe un indicador de carga
  let cargando = document.getElementById('jv-loading')

  if (cargando) {
    // Si ya existe, solo asegurarse de que esté visible
    cargando.classList.remove('jv-loading-fade-out')
    cargando.style.display = 'flex'
    return
  }

  cargando = document.createElement('div')
  cargando.id = 'jv-loading'
  cargando.className = 'jv-loading'
  cargando.innerHTML = `
    <div class="jv-loading-spinner">
      <i class="fas fa-spinner fa-spin"></i>
    </div>
    <div class="jv-loading-text">Cargando...</div>
  `

  document.body.appendChild(cargando)
}

/**
 * Ocultar indicador de carga
 */
function ocultarCargando() {
  const cargando = document.getElementById('jv-loading')
  if (cargando) {
    cargando.classList.add('jv-loading-fade-out')
    setTimeout(() => {
      if (cargando.parentNode) {
        cargando.parentNode.removeChild(cargando)
      }
    }, 500)
  }
}

/**
 * Mostrar un mensaje de error general
 */
function mostrarError(mensaje) {
  // Crear contenedor de error si no existe
  let errorContainer = document.getElementById('jv-error-general-container')

  if (!errorContainer) {
    errorContainer = document.createElement('div')
    errorContainer.id = 'jv-error-general-container'
    errorContainer.className = 'jv-error-general'

    // Insertar al principio del formulario
    const formulario = document.getElementById('form_SF')
    if (formulario) {
      formulario.insertBefore(errorContainer, formulario.firstChild)
    } else {
      // Si no se encuentra el formulario, agregarlo al body
      document.body.appendChild(errorContainer)
    }
  }

  // Actualizar mensaje
  errorContainer.innerHTML = `
    <i class="fas fa-exclamation-triangle"></i>
    <span>${mensaje}</span>
    <button type="button" class="jv-error-close">&times;</button>
  `

  // Mostrar mensaje
  errorContainer.style.display = 'flex'

  // Configurar botón de cierre
  const closeBtn = errorContainer.querySelector('.jv-error-close')
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      errorContainer.style.display = 'none'
    })
  }

  // Auto-eliminar después de 8 segundos
  setTimeout(() => {
    if (errorContainer.parentNode) {
      errorContainer.style.display = 'none'
    }
  }, 8000)

  // Scroll hacia el mensaje
  errorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

/**
 * Muestra una notificación personalizada
 * @param {string} mensaje - El mensaje a mostrar
 * @param {string} tipo - El tipo de notificación: 'info', 'exito', 'advertencia', 'error'
 */
function mostrarNotificacion(mensaje, tipo = 'info') {
  // Crear contenedor de notificación si no existe
  let notificacionContainer = document.getElementById('jv-notificacion-container')

  if (!notificacionContainer) {
    notificacionContainer = document.createElement('div')
    notificacionContainer.id = 'jv-notificacion-container'
    notificacionContainer.style.position = 'fixed'
    notificacionContainer.style.top = '20px'
    notificacionContainer.style.right = '20px'
    notificacionContainer.style.zIndex = '9999'
    notificacionContainer.style.maxWidth = '350px'
    document.body.appendChild(notificacionContainer)
  }

  // Crear nueva notificación
  const notificacion = document.createElement('div')
  notificacion.className = `jv-notificacion jv-notificacion-${tipo}`
  notificacion.style.backgroundColor = '#fff'
  notificacion.style.border = `1px solid ${getTipoColor(tipo)}`
  notificacion.style.borderLeft = `4px solid ${getTipoColor(tipo)}`
  notificacion.style.borderRadius = '4px'
  notificacion.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)'
  notificacion.style.padding = '15px'
  notificacion.style.marginBottom = '10px'
  notificacion.style.display = 'flex'
  notificacion.style.alignItems = 'center'
  notificacion.style.position = 'relative'
  notificacion.style.opacity = '0'
  notificacion.style.transform = 'translateX(30px)'
  notificacion.style.transition = 'opacity 0.3s, transform 0.3s'

  // Icono según tipo
  notificacion.innerHTML = `
    <div style="margin-right: 12px; color: ${getTipoColor(tipo)}">
      ${getTipoIcono(tipo)}
    </div>
    <div style="flex: 1">${mensaje}</div>
    <button style="background: none; border: none; cursor: pointer; font-size: 18px; opacity: 0.5;"
            onclick="this.parentNode.remove()">&times;</button>
  `

  // Agregar al contenedor
  notificacionContainer.appendChild(notificacion)

  // Animar entrada
  setTimeout(() => {
    notificacion.style.opacity = '1'
    notificacion.style.transform = 'translateX(0)'
  }, 10)

  // Auto-eliminar después de 5 segundos
  setTimeout(() => {
    notificacion.style.opacity = '0'
    notificacion.style.transform = 'translateX(30px)'

    // Eliminar del DOM después de la animación
    setTimeout(() => {
      if (notificacion.parentNode) {
        notificacion.parentNode.removeChild(notificacion)
      }

      // Si no quedan notificaciones, eliminar el contenedor
      if (notificacionContainer.children.length === 0) {
        document.body.removeChild(notificacionContainer)
      }
    }, 300)
  }, 5000)

  // Funciones auxiliares para obtener color e icono según el tipo
  function getTipoColor(tipo) {
    switch (tipo) {
      case 'exito':
        return '#10b981'
      case 'error':
        return '#ef4444'
      case 'advertencia':
        return '#f59e0b'
      default:
        return '#3b82f6' // info
    }
  }

  function getTipoIcono(tipo) {
    switch (tipo) {
      case 'exito':
        return '<i class="fas fa-check-circle"></i>'
      case 'error':
        return '<i class="fas fa-times-circle"></i>'
      case 'advertencia':
        return '<i class="fas fa-exclamation-triangle"></i>'
      default:
        return '<i class="fas fa-info-circle"></i>' // info
    }
  }
}

// Estilos adicionales para el indicador de carga y mensajes
const estilosAdicionales = document.createElement('style')
estilosAdicionales.textContent = `
  .jv-loading {
    align-items: center;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    left: 0;
    position: fixed;
    top: 0;
    transition: opacity 0.5s;
    width: 100%;
    z-index: 9999;
  }

  .jv-loading-fade-out {
    opacity: 0;
  }

  .jv-loading-spinner {
    color: var(--jv-color-primary);
    font-size: 3rem;
    margin-bottom: var(--jv-spacing-md);
  }

  .jv-loading-text {
    color: var(--jv-color-primary);
    font-size: var(--jv-font-size-base);
    font-weight: var(--jv-font-weight-medium);
  }

  .jv-error-general {
    align-items: center;
    background-color: rgba(239, 68, 68, 0.1);
    border-left: 4px solid var(--jv-color-error);
    border-radius: 0 var(--jv-border-radius-sm) var(--jv-border-radius-sm) 0;
    color: var(--jv-color-error);
    display: flex;
    margin-bottom: var(--jv-spacing-lg);
    padding: var(--jv-spacing-md);
  }

  .jv-error-general i {
    font-size: 1.5rem;
    margin-right: var(--jv-spacing-md);
  }

  .jv-error-general span {
    flex: 1;
  }

  .jv-error-close {
    background: none;
    border: none;
    color: var(--jv-color-text-light);
    cursor: pointer;
    font-size: 1.25rem;
    padding: 0;
  }

  .jv-error-close:hover {
    color: var(--jv-color-error);
  }

  /* Fix para el campo teléfono en móviles */
  @media (max-width: 768px) {
    .jv-phone-code-wrapper {
      width: 100%;
    }

    .jv-phone-code-select {
      width: 100%;
    }
  }

  /* Estilos para campos requeridos */
  .jv-form-label::after {
    content: " *";
    color: var(--jv-color-error);
  }

  /* Fix para mejorar la accesibilidad - foco visible */
  .jv-form-input:focus {
    outline: 2px solid var(--jv-color-primary-light);
    outline-offset: 1px;
  }

  .jv-btn-prev:focus,
  .jv-btn-next:focus,
  .jv-btn-preview:focus,
  .jv-btn-submit:focus {
    outline: 2px solid var(--jv-color-primary-light);
    outline-offset: 2px;
  }
`

// Agregar estilos adicionales al documento
document.head.appendChild(estilosAdicionales)
