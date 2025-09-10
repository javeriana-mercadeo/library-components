// ===========================================
// PROGRAM FORMATTER MODULE
// ===========================================

/**
 * Módulo que agrega dos puntos ":" al final del texto de elementos con data-puj-name="true"
 * cuando se carga la data del programa
 */

class ProgramFormatter {
  constructor() {
    this.initialized = false
    this.init()
  }

  init() {
    if (this.initialized) return

    // Escuchar el evento de carga de data
    document.addEventListener('data_load-program', this.handleDataLoad.bind(this))
    this.initialized = true

    Logger?.info?.('ProgramFormatter: Module initialized')
  }

  handleDataLoad(event) {
    try {
      Logger?.info?.('ProgramFormatter: Data load event detected, processing elements')
      this.addColonsToElements()
    } catch (error) {
      Logger?.error?.('ProgramFormatter: Error processing data load event', error)
    }
  }

  addColonsToElements() {
    // Buscar todos los elementos con data-puj-name="true"
    const context = document.getElementById('datos')
    const elements = context ? context.querySelectorAll('[data-puj-name="true"]') : []

    Logger?.info?.(`ProgramFormatter: Found ${elements.length} elements to process`)

    elements.forEach((element, index) => {
      this.addColonToElement(element, index)
    })
  }

  addColonToElement(element, index) {
    try {
      const currentText = element.textContent || ''

      // Solo agregar los dos puntos si no los tiene ya
      if (!currentText.endsWith(':') && !currentText.endsWith('::')) {
        const newText = currentText + ':'
        element.textContent = newText

        Logger?.debug?.(`ProgramFormatter: Added colon to element ${index + 1}: "${currentText}" -> "${newText}"`)
      } else {
        Logger?.debug?.(`ProgramFormatter: Element ${index + 1} already has colon(s): "${currentText}"`)
      }
    } catch (error) {
      Logger?.error?.(`ProgramFormatter: Error processing element ${index + 1}`, error)
    }
  }

  // Método para agregar colons manualmente si es necesario
  formatElementsNow() {
    Logger?.info?.('ProgramFormatter: Manual formatting triggered')
    this.addColonsToElements()
  }

  destroy() {
    document.removeEventListener('data_load-program', this.handleDataLoad.bind(this))
    this.initialized = false
    Logger?.info?.('ProgramFormatter: Module destroyed')
  }
}

// Crear instancia única del formateador
const programFormatter = new ProgramFormatter()

// Exportar funciones públicas
export { programFormatter, ProgramFormatter }

// También disponible globalmente para compatibilidad
if (typeof window !== 'undefined') {
  window.ProgramFormatter = ProgramFormatter
  window.programFormatter = programFormatter
}
