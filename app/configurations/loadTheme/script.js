// Script para Liferay - Sistema de Temas con Evento Personalizado
const selectedTheme = configuration

// ===========================================
// ACCESO A UTILIDADES GLOBALES
// ===========================================
// Función para obtener utilidades globales del window con fallback
const getGlobalUtils = () => {
  if (typeof window === 'undefined') {
    console.warn('Window no disponible, usando fallbacks básicos')
    return {
      StringUtils: {
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
    }
  }

  // Intentar obtener las utilidades del window
  return {
    StringUtils: window.StringUtils || {
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
  }
}

// Obtener utilidades con fallback seguro
const { StringUtils } = getGlobalUtils()

try {
  const rowBaseTheme = selectedTheme['themeBase']
  const baseTheme = rowBaseTheme.startsWith('{') ? JSON.parse(rowBaseTheme).dataTheme : rowBaseTheme

  const rowFacultyTheme = selectedTheme['themeFaculty']
  const facultyTheme = rowFacultyTheme.startsWith('{') ? JSON.parse(rowFacultyTheme).dataTheme : rowFacultyTheme

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

  // Variables para manejar el estado del tema
  let currentBase = baseTheme || 'light'
  let currentFaculty = facultyTheme || 'default'

  function parseThemeBase(theme) {
    if (theme === 'dark' || theme.endsWith('-dark')) {
      return 'dark'
    }
    return 'light'
  }

  function applyTheme(base, faculty) {
    const html = document.documentElement
    html.setAttribute('data-theme-base', base)

    if (faculty === 'default' || !faculty) {
      html.removeAttribute('data-theme-faculty')
    } else {
      html.setAttribute('data-theme-faculty', faculty)
    }

    window.currentBase = currentBase
    window.currentFaculty = currentFaculty
    window.applyTheme = applyTheme

    // Construir tema combinado para compatibilidad
    let combinedTheme
    if (faculty === 'default' || !faculty) {
      combinedTheme = base
    } else {
      combinedTheme = base === 'dark' ? `${faculty}-dark` : faculty
    }

    html.setAttribute('data-theme', combinedTheme)

    // Actualizar display si existe
    const displayElement = document.getElementById('themeSelector')
    if (displayElement) {
      displayElement.textContent = `Tema seleccionado: ${combinedTheme}`
    }
  }

  document.addEventListener('data_load-program', function (event) {
    const dataProgram = event.detail?.dataProgram
    if (!dataProgram) {
      console.warn('⚠️ [THEME] No se recibieron datos del programa')
      return
    }

    const { facultad } = dataProgram

    if (facultad && currentFaculty === 'default') {
      // Aplicar normalización de facultad antes del procesamiento
      const facultadValue = Array.isArray(facultad) ? facultad[0] : facultad
      const normalizedFaculty = normalizeFacultyName(facultadValue)
      // Usar StringUtils para crear slug de forma más eficiente
      const facultySlug = StringUtils.slugify(normalizedFaculty)

      currentFaculty = facultySlug

      console.log('📍 [THEME] Facultad detectada automáticamente:', currentFaculty)

      // Aplicar tema con la nueva facultad
      applyTheme(currentBase, currentFaculty)
    }
  })

  // Parsear tema base
  currentBase = parseThemeBase(baseTheme)

  if (facultyTheme && facultyTheme !== 'default') {
    currentFaculty = facultyTheme
  }

  applyTheme(currentBase, currentFaculty)
} catch (error) {
  console.error('Error en la configuración del tema:', error)
}
