// ===========================================
// SISTEMA DE ACTUALIZACIÓN DOM
// ===========================================

import { DataFormatter } from './data-formatter.js'

export const DOMUpdater = {
  // Cache para elementos DOM - mejorado con TTL
  _elementCache: new Map(),
  _cacheTimeout: 60000, // 1 minuto

  _getCachedElements(elementId) {
    const cacheKey = elementId
    const cached = this._elementCache.get(cacheKey)

    if (cached && Date.now() - cached.timestamp < this._cacheTimeout) {
      return cached.elements
    }

    // Usar DOMUtils global para búsqueda optimizada
    let elements = DOMUtils.findElements(`[${elementId}='true']`)

    // Fallback por ID si no se encuentra por atributo
    if (elements.length === 0) {
      const element = DOMUtils.findElement(`#${elementId}`)
      elements = element ? [element] : []
    }

    this._elementCache.set(cacheKey, {
      elements,
      timestamp: Date.now()
    })

    return elements
  },

  updateElementsText(elementId, value) {
    try {
      const elements = this._getCachedElements(elementId)

      for (const element of elements) {
        const leadElements = DOMUtils.findElements('.lead', element)

        if (leadElements.length > 0) {
          leadElements.forEach(lead => {
            lead.textContent = value
          })
        } else {
          element.textContent = value
        }
      }
    } catch (error) {
      Logger.error(`Error actualizando DOM para ${elementId}:`, error)
    }
  },

  updateRegistrationDates(fechasData) {
    try {
      const container = DOMUtils.findElement('[data-puj-registration-dates="true"]')
      if (!container) {
        Logger.warning('Contenedor de fechas de registro no encontrado')
        return false
      }

      // Limpiar contenedor existente
      DOMUtils.empty(container)

      // Crear elementos DOM de forma más segura
      fechasData.forEach(fecha => {
        const dateItem = DOMUtils.createElement('div', {
          className: 'program-dates_date-item'
        })

        const periodElement = DOMUtils.createElement('p', {
          className: 'paragraph paragraph-neutral paragraph-md paragraph-bold program-dates_date-period',
          attributes: { 'data-component': 'paragraph' },
          textContent: `${DataFormatter.capitalizeFirst(fecha.descCiclo)}:`
        })

        const valueElement = DOMUtils.createElement('p', {
          className: 'paragraph paragraph-neutral paragraph-md program-dates_date-value',
          attributes: { 'data-component': 'paragraph' },
          textContent: DataFormatter.cleanDate(fecha.fFinCierreLetra)
        })

        dateItem.appendChild(periodElement)
        dateItem.appendChild(valueElement)
        container.appendChild(dateItem)
      })

      return true
    } catch (error) {
      Logger.error('Error actualizando fechas de registro:', error)
      return false
    }
  },

  clearCache() {
    this._elementCache.clear()
  }
}
