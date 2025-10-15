// Script para Liferay - Sistema de WhatsApp con Evento Personalizado
const whatsAppConfig = configuration

// Obtener utilidades globales
const StringUtils = window.StringUtils || {
  removeAccents: str => str?.normalize('NFD').replace(/[\u0300-\u036f]/g, '') || '',
  slugify: str =>
    str
      ?.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/[\s-]+/g, '-') || ''
}

try {
  const wpAcademicLevel = whatsAppConfig['whatsAppAcademicLevel']
  const academicLevel = wpAcademicLevel.startsWith('{') ? JSON.parse(wpAcademicLevel).dataTheme : wpAcademicLevel

  const wpFaculty = whatsAppConfig['whatsAppFaculty']
  const faculty = wpFaculty.startsWith('{') ? JSON.parse(wpFaculty).dataTheme : wpFaculty

  // Función para normalizar nombres de facultades
  function normalizeFacultyName(facultyName) {
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

  let finalFaculty = faculty // Usar la faculty de la configuración primero
  let currentProgramData = null
  let whatsAppsData = null

  // Función para procesar y aplicar WhatsApp cuando tengamos ambos datos
  function processWhatsApp() {
    // Necesitamos ambos datos para continuar
    if (!whatsAppsData) return

    // Solo si la configuración es 'default', entonces detectar automáticamente
    if (faculty === 'default' && currentProgramData && currentProgramData.facultad) {
      // Aplicar normalización de facultad antes del procesamiento
      const facultadValue = Array.isArray(currentProgramData.facultad) ? currentProgramData.facultad[0] : currentProgramData.facultad
      const normalizedFaculty = normalizeFacultyName(facultadValue)
      // Usar StringUtils para crear slug de forma más eficiente
      finalFaculty = StringUtils.slugify(normalizedFaculty)
    }

    // Modifica el link de WhatsApp en elementos <a> con data-puj-link-whatsapp="true"
    document.querySelectorAll('[data-puj-link-whatsapp="true"]').forEach(el => {
      const wpType = academicLevel
      const facultyKey = whatsAppsData[finalFaculty] ? finalFaculty : 'default'
      const whatsAppNumber = whatsAppsData[facultyKey]?.[wpType]
      if (whatsAppNumber) {
        el.setAttribute('href', `https://wa.me/${whatsAppNumber.replace(/\s+/g, '')}`)
        el.setAttribute('target', '_blank')
      }
    })

    // Modifica el texto en cualquier elemento con data-puj-number-whatsapp="true"
    document.querySelectorAll('[data-puj-number-whatsapp="true"]').forEach(el => {
      const wpType = academicLevel
      const facultyKey = whatsAppsData[finalFaculty] ? finalFaculty : 'default'
      const whatsAppNumber = whatsAppsData[facultyKey]?.[wpType]
      if (whatsAppNumber) {
        el.textContent = whatsAppNumber
      }
    })
  }

  // Escuchar datos del programa actual (para detectar la facultad)
  document.addEventListener('data_load-program', function (event) {
    currentProgramData = event.detail?.dataProgram
    if (!currentProgramData) return
    processWhatsApp()
  })

  // Escuchar datos de WhatsApp
  document.addEventListener('data_load-program-whatsapp', function (event) {
    whatsAppsData = event.detail.whatsApps
    processWhatsApp()
  })

  const displayElement = document.getElementById('whatsAppSelector')
  if (displayElement)
    displayElement.textContent = `WhatsApp seleccionado: ${academicLevel === 'pre' ? 'Pregrado' : 'Posgrado'} | ${finalFaculty}`
} catch (error) {
  Logger?.error?.('Error al cargar la configuración de WhatsApp', error)
}
