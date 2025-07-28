// Script para Liferay - Sistema de Temas con Evento Personalizado
const selectedTheme = configuration

try {
  const rowBaseTheme = selectedTheme['themeBase']
  const baseTheme = rowBaseTheme.startsWith('{') ? JSON.parse(rowBaseTheme).dataTheme : rowBaseTheme

  const rowFacultyTheme = selectedTheme['themeFaculty']
  const facultyTheme = rowFacultyTheme.startsWith('{') ? JSON.parse(rowFacultyTheme).dataTheme : rowFacultyTheme

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
    const { facultad } = event.detail.dataProgram

    if (facultad && currentFaculty === 'default') {
      // Lista de conectores y palabras a eliminar
      const conectores = [
        'y',
        'e',
        'o',
        'u',
        'de',
        'del',
        'la',
        'las',
        'el',
        'los',
        'en',
        'con',
        'para',
        'por',
        'sin',
        'sobre',
        'bajo',
        'entre',
        'hacia',
        'hasta',
        'desde',
        'durante',
        'mediante',
        'según',
        'ante',
        'tras',
        'a',
        'al'
      ]

      // Convertir nombre de facultad a slug
      const facultySlug = facultad
        .toLowerCase()
        // Primero reemplazar acentos
        .replace(/[áàäâ]/g, 'a')
        .replace(/[éèëê]/g, 'e')
        .replace(/[íìïî]/g, 'i')
        .replace(/[óòöô]/g, 'o')
        .replace(/[úùüû]/g, 'u')
        .replace(/ñ/g, 'n')
        // Dividir en palabras, filtrar conectores y unir con guiones
        .split(/\s+/)
        .filter(palabra => palabra.length > 0 && !conectores.includes(palabra))
        .join('-')
        // Limpiar caracteres especiales
        .replace(/[^a-z0-9-]/g, '')
        // Eliminar guiones múltiples
        .replace(/-+/g, '-')
        // Eliminar guiones al inicio y final
        .replace(/^-|-$/g, '')

      currentFaculty = facultySlug

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
