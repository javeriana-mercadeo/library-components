// ===========================================
// SISTEMA DE ACTUALIZACIÓN DOM
// ===========================================

import { DataFormatter } from './data-formatter.js'

export const DOMUpdater = {
  updateElementsText(elementId, value) {
    try {
      const elements = DOMUtils.findElements(`[${elementId}]`)
      for (const element of elements) element.innerHTML = value
    } catch (error) {
      Logger.error(`Error actualizando DOM para ${elementId}:`, error)
    }
  },

  updateElementsTextEditable(elementId, value) {
    try {
      const elements = DOMUtils.findElements(`[${elementId}]`)
      for (const element of elements) {
        const elementAutomatic = DOMUtils.findElements('.lead', element)
        if (elementAutomatic.length) {
          elementAutomatic.forEach(textLead => {
            textLead.textContent = value
          })
        }
      }
    } catch (error) {
      Logger.error(`Error actualizando DOM para ${elementId}:`, error)
    }
  },

  updateRegistrationDates(fechasData) {
    try {
      const containers = DOMUtils.findElements('[data-puj-registration-dates="true"]')
      if (!containers || containers.length === 0) {
        Logger.warning('Contenedor de fechas de registro no encontrado')
        return false
      }

      // Procesar cada contenedor encontrado
      containers.forEach(container => {
        // Limpiar contenedor existente
        DOMUtils.empty(container)

        // Si no hay fechas disponibles, mostrar mensaje de próxima apertura
        if (!fechasData || fechasData.length === 0) {
          const dateItem = DOMUtils.createElement('div', {
            className: 'program-dates_date-item'
          })

          const messageElement = DOMUtils.createElement('p', {
            className: 'paragraph paragraph-neutral paragraph-md program-dates_date-period',
            attributes: { 'data-component': 'paragraph' },
            textContent: 'Próxima apertura siguiente semestre'
          })

          dateItem.appendChild(messageElement)
          container.appendChild(dateItem)
          return
        }

        // Crear elementos DOM de forma más segura
        fechasData.forEach(fecha => {
          const dateItem = DOMUtils.createElement('div', {
            className: 'program-dates_date-item'
          })

          const periodElement = DOMUtils.createElement('p', {
            className: 'paragraph paragraph-neutral paragraph-md paragraph-bold program-dates_date-period',
            attributes: { 'data-component': 'paragraph' },
            textContent: `${DataFormatter.capitalizeFirst(fecha.descCiclo)}: `
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
      })

      return true
    } catch (error) {
      Logger.error('Error actualizando fechas de registro:', error)
      return false
    }
  },

  updateElementsAttribute(elementId, attribute, value) {
    try {
      const elements = DOMUtils.findElements(`[${elementId}]`)
      for (const element of elements) {
        element.setAttribute(attribute, value)
      }
    } catch (error) {
      Logger.error(`Error actualizando atributo ${attribute} para ${elementId}:`, error)
    }
  },

  removeElements(elementId) {
    try {
      const elements = DOMUtils.findElements(`[${elementId}]`)
      if (elements && elements.length > 0) {
        for (const element of elements) {
          element.remove()
        }
        return true // Indica que se eliminaron elementos
      }
      return false // No había elementos que eliminar
    } catch (error) {
      Logger.error(`Error eliminando elementos con ${elementId}:`, error)
      return false
    }
  }
}
