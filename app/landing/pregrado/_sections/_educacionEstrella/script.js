// Sistema de texto enriquecido para Educación Estrella
// Compatible con Liferay DXP - JavaScript vanilla

// ==========================================
// SISTEMA DE TEXTO ENRIQUECIDO PARA EDUCACIÓN ESTRELLA
// ==========================================
const EducacionEstrellaRichTextSystem = {
  config: {
    richContentSelector: '.educacion-estrella-rich-content',
    sectionSelector: '.educacion-estrella'
  },

  // Procesar contenido enriquecido desde CMS o datos locales
  processRichContent() {
    const richContentElements = document.querySelectorAll(this.config.richContentSelector)

    if (richContentElements.length === 0) {
      console.log('[EducacionEstrellaRichText] No se encontraron elementos de contenido enriquecido')
      return
    }

    console.log(`[EducacionEstrellaRichText] Procesando ${richContentElements.length} elementos`)

    richContentElements.forEach(element => {
      let content = element.getAttribute('data-raw-content')

      if (content) {
        content = this.decodeHtmlEntities(content)

        // Auto-detección de formato
        if (!content.includes('<') && !content.includes('&lt;')) {
          content = content.replace(/\n\n/g, '</p><p>')
          content = content.replace(/\n/g, '<br>')
          content = '<p>' + content + '</p>'
        }

        element.innerHTML = content
        console.log(`[EducacionEstrellaRichText] Elemento procesado: ${element.className}`)
      }
    })
  },

  // Decodificador HTML avanzado (basado en el sistema FAQ)
  decodeHtmlEntities(text) {
    const textarea = document.createElement('textarea')
    let decoded = text
    let previousDecoded = ''

    // Hasta 3 intentos de decodificación recursiva
    for (let i = 0; i < 3 && decoded !== previousDecoded; i++) {
      previousDecoded = decoded
      textarea.innerHTML = decoded
      decoded = textarea.value
    }

    return decoded
  }
}

// ==========================================
// SISTEMA PRINCIPAL DE EDUCACIÓN ESTRELLA
// ==========================================
const EducacionEstrellaSystem = {
  init() {
    const systems = {
      richText: EducacionEstrellaRichTextSystem.processRichContent()
    }

    console.log('[EducacionEstrellaSystem] Sistemas inicializados:', systems)
    return systems
  }
}

// ==========================================
// INICIALIZACIÓN CON REINTENTOS
// ==========================================
const initEducacionEstrella = () => {
  const tryInitialize = (attempts = 0) => {
    const sections = document.querySelectorAll('.educacion-estrella')

    if (sections.length === 0 && attempts < 20) {
      // Si no encuentra los elementos, reintentar en 100ms
      setTimeout(() => tryInitialize(attempts + 1), 100)
      return
    }

    // Procesar texto enriquecido
    EducacionEstrellaRichTextSystem.processRichContent()

    console.log('[EducacionEstrella] Sección inicializada correctamente')
  }

  tryInitialize()
}

// ==========================================
// INICIALIZACIÓN Y EXPORTS
// ==========================================

// Inicializar sistema completo
const initializeEducacionEstrella = () => {
  // Exponer para debugging en desarrollo
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    window.EducacionEstrellaRichTextSystem = EducacionEstrellaRichTextSystem
    window.EducacionEstrellaSystem = EducacionEstrellaSystem
  }

  // Inicializar sistemas
  initEducacionEstrella()
}

// Export por defecto para compatibilidad
export default initializeEducacionEstrella

// También ejecutar inmediatamente en caso de compilación IIFE
if (typeof window !== 'undefined') {
  initializeEducacionEstrella()
}
