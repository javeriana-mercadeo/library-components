// Script para Liferay - Sistema de Temas con Evento Personalizado
const whatsAppConfig = configuration

try {
  const wpAcademicLevel = whatsAppConfig['whatsAppAcademicLevel']
  const academicLevel = wpAcademicLevel.startsWith('{') ? JSON.parse(wpAcademicLevel).dataTheme : wpAcademicLevel

  const wpFaculty = whatsAppConfig['whatsAppFaculty']
  const faculty = wpFaculty.startsWith('{') ? JSON.parse(wpFaculty).dataTheme : wpFaculty

  const displayElement = document.getElementById('whatsAppSelector')
  if (displayElement)
    displayElement.textContent = `WhatsApp seleccionado: ${academicLevel === 'pre' ? 'Pregrado' : 'Posgrado'} | ${faculty}`

  document.addEventListener('data_load-program', function (event) {
    const dataProgram = event.detail.dataProgram
    const whatsApps = event.detail.whatsApps

    let finalFaculty = faculty // Usar la faculty de la configuración primero

    // Solo si la configuración es 'default', entonces detectar automáticamente
    if (faculty === 'default' && dataProgram.facultad) {
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
      finalFaculty = dataProgram.facultad
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
    }

    // Modifica el link de WhatsApp en elementos <a> con data-puj-link-whatsapp="true"
    document.querySelectorAll('[data-puj-link-whatsapp="true"]').forEach(el => {
      const wpType = academicLevel
      const facultyKey = whatsApps[finalFaculty] ? finalFaculty : 'default'
      const whatsAppNumber = whatsApps[facultyKey][wpType]
      if (whatsAppNumber) {
        el.setAttribute('href', `https://wa.me/${whatsAppNumber.replace(/\s+/g, '')}`)
        el.setAttribute('target', '_blank')
      }
    })

    // Modifica el texto en cualquier elemento con data-puj-number-whatsapp="true"
    document.querySelectorAll('[data-puj-number-whatsapp="true"]').forEach(el => {
      const wpType = academicLevel
      const facultyKey = whatsApps[finalFaculty] ? finalFaculty : 'default'
      const whatsAppNumber = whatsApps[facultyKey][wpType]
      if (whatsAppNumber) {
        el.textContent = whatsAppNumber
      }
    })
  })
} catch (error) {
  console.error('Error al cargar la configuración de WhatsApp:', error)
}
