// ===========================================
// PROGRAM FORMATTER MODULE - MÓDULO COMPARTIDO
// ===========================================

/**
 * Módulo que agrega dos puntos ":" al final del texto de elementos con data-puj-name="true"
 * cuando se carga la data del programa
 * Este módulo es compartido entre múltiples componentes (1_datos, 1-1_dobleDatos, etc.)
 */

export class ProgramFormatter {
  /**
   * @param {Object} options - Opciones de configuración
   * @param {string} options.scope - ID del contenedor donde buscar elementos (ej: 'datos', 'doble-datos')
   */
  constructor(options = {}) {
    this.scope = options.scope || null
    this.initialized = false
    this.init()
  }

  init() {
    if (this.initialized) return

    // Solo inicializar en el cliente
    if (typeof document === 'undefined') return

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
    // Solo ejecutar en el cliente
    if (typeof document === 'undefined') return

    // Buscar todos los elementos con data-puj-name="true"
    const context = this.scope ? document.getElementById(this.scope) : document
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
    if (typeof document === 'undefined') return

    document.removeEventListener('data_load-program', this.handleDataLoad.bind(this))
    this.initialized = false
    Logger?.info?.('ProgramFormatter: Module destroyed')
  }
}

/**
 * Factory function para crear instancias con configuración específica
 * @param {Object} options - Opciones de configuración
 * @returns {ProgramFormatter}
 */
export function createProgramFormatter(options = {}) {
  return typeof window !== 'undefined' ? new ProgramFormatter(options) : null
}

export default ProgramFormatter
