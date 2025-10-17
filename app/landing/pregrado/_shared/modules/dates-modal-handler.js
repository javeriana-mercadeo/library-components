// ===========================================
// DATES MODAL HANDLER - MÓDULO COMPARTIDO
// ===========================================

/**
 * Manejador centralizado para la lógica del modal de fechas
 * Este módulo es compartido entre múltiples componentes (1_datos, 1-1_dobleDatos, etc.)
 * Cada componente crea su propia instancia con su contexto específico
 */

export class DatesModalHandler {
  /**
   * @param {Object} options - Opciones de configuración
   * @param {string} options.scope - Selector CSS para delimitar el scope (ej: '#datos-programa-video')
   */
  constructor(options = {}) {
    this.scope = options.scope || document
    this.initialized = false
  }

  /**
   * Inicializar el handler
   */
  init() {
    if (this.initialized) return

    this.checkModalVisibility()
    this.initialized = true
  }

  /**
   * Verificar y actualizar la visibilidad del modal de fechas
   */
  checkModalVisibility() {
    // Buscar el contenido editable del modal dentro del scope
    const contentElement = this.getScopedElement('[data-modal-content-monitor="dates"]')
    if (!contentElement) return

    const hasContent = this.hasMeaningfulContent(contentElement)

    // Buscar el trigger del modal (botón "Ver detalles")
    const modalTrigger = this.getScopedElement('.program-dates_modal-trigger')

    // Buscar el contenedor de fechas automatizadas fuera del modal
    const datesContainer = this.getScopedElement('[data-puj-registration-dates]')

    // Buscar el contenedor de fechas automatizadas dentro del modal
    const datesContainerModal = this.getScopedElement('[data-puj-registration-dates-modal]')

    if (!modalTrigger || !datesContainer) return

    // Detectar si estamos en modo de edición de Liferay
    const isLiferayEditMode = this.isInLiferayEditMode()

    if (hasContent) {
      // Si hay contenido: mostrar botón modal, ocultar fechas automáticas fuera del modal
      modalTrigger.style.display = ''
      datesContainer.style.display = 'none'

      // Sincronizar fechas automatizadas del exterior al interior del modal
      if (datesContainerModal) {
        datesContainerModal.innerHTML = datesContainer.innerHTML
      }
    } else {
      // Si NO hay contenido
      if (isLiferayEditMode) {
        // En modo edición: mostrar ambos para permitir edición
        modalTrigger.style.display = ''
        datesContainer.style.display = ''
      } else {
        // En modo público: ocultar botón modal, mostrar solo fechas automáticas
        modalTrigger.style.display = 'none'
        datesContainer.style.display = ''
      }
    }
  }

  /**
   * Detectar si estamos en modo de edición de Liferay
   * @returns {boolean}
   */
  isInLiferayEditMode() {
    if (typeof document === 'undefined') return false

    const body = document.body
    return body.classList.contains('has-edit-mode-menu') && body.classList.contains('signed-in')
  }

  /**
   * Obtener elemento dentro del scope definido
   * @param {string} selector - Selector CSS
   * @returns {HTMLElement|null}
   */
  getScopedElement(selector) {
    if (typeof this.scope === 'string') {
      const scopeElement = document.querySelector(this.scope)
      return scopeElement ? scopeElement.querySelector(selector) : null
    }
    return this.scope.querySelector(selector)
  }

  /**
   * Evaluar si el contenedor del modal tiene contenido significativo
   * @param {HTMLElement} element
   * @returns {boolean}
   */
  hasMeaningfulContent(element) {
    if (!element) return false

    const text = element.textContent?.replace(/\u00a0/g, ' ').trim()

    // Textos que se consideran como "sin contenido"
    const emptyTextPatterns = ['N/A', 'No disponible', 'Sin contenido']
    const normalizedText = text.toLowerCase()

    // Solo retornar false si está vacío o es un patrón de "sin contenido"
    // De lo contrario, siempre tiene contenido (sin importar si tiene imágenes, videos, etc.)
    if (!text || emptyTextPatterns.some(pattern => normalizedText === pattern.toLowerCase())) {
      return false
    }

    return true
  }

  /**
   * Destruir el handler y limpiar recursos
   */
  destroy() {
    this.initialized = false
    this.scope = null
  }
}

/**
 * Factory function para crear instancias con configuración específica
 * @param {Object} options - Opciones de configuración
 * @returns {DatesModalHandler}
 */
export function createDatesModalHandler(options = {}) {
  return new DatesModalHandler(options)
}

export default DatesModalHandler
