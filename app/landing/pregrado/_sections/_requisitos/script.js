/**
 * Script vanilla JS para el componente de Requisitos de Admisión - Gráfico Circular Interactivo
 * Compatible con Liferay DXP - Sin dependencias de React
 */


/**
 * Inicializa todos los componentes de requisitos de admisión
 */
function initAdmissionRequirements() {
  const components = document.querySelectorAll('[data-component-id="requisitos"]')

  if (components.length === 0) {
    return
  }

  components.forEach(component => {
    initChartInteractions(component)
    initAccessibilityEnhancements(component)
  })
}

/**
 * Inicializa las interacciones del gráfico circular
 * @param {HTMLElement} component - Elemento del componente
 */
function initChartInteractions(component) {
  const chartSegments = component.querySelectorAll('.admission-requirements_chart-segment')
  const chartLabels = component.querySelectorAll('.admission-requirements_chart-label-percentage, .admission-requirements_chart-label-title')


  // Hover effects para segmentos del gráfico
  chartSegments.forEach(segment => {
    const requirementId = segment.dataset.requirement
    const percentage = segment.dataset.percentage

    segment.addEventListener('mouseenter', () => {
      // Destacar segmento con efecto hover más suave
      segment.style.filter = 'brightness(1.1)'

      // Anunciar para lectores de pantalla
      announceToScreenReader(component, `${requirementId}: ${percentage}%`)
    })

    segment.addEventListener('mouseleave', () => {
      // Restaurar segmento si no está activo
      if (!segment.classList.contains('is-active')) {
        segment.style.filter = 'brightness(1)'
      }
    })

    // Click para activar contenido correspondiente
    segment.addEventListener('click', () => {
      switchContent(component, requirementId)
    })
  })

  // Hover effects e interactividad para labels del gráfico (texto SVG)
  chartLabels.forEach(labelText => {
    const requirementId = labelText.dataset.requirement

    labelText.addEventListener('mouseenter', () => {
      // Destacar segmento correspondiente
      const correspondingSegment = component.querySelector(`[data-requirement="${requirementId}"].admission-requirements_chart-segment`)
      if (correspondingSegment) {
        correspondingSegment.style.filter = 'brightness(1.1)'
      }
    })

    labelText.addEventListener('mouseleave', () => {
      // Restaurar segmento correspondiente si no está activo
      const correspondingSegment = component.querySelector(`[data-requirement="${requirementId}"].admission-requirements_chart-segment`)
      if (correspondingSegment && !correspondingSegment.classList.contains('is-active')) {
        correspondingSegment.style.filter = 'brightness(1)'
      }
    })

    // Click para activar contenido correspondiente
    labelText.addEventListener('click', () => {
      switchContent(component, requirementId)
    })
  })
}

/**
 * Cambia el contenido activo basado en el segmento seleccionado
 * @param {HTMLElement} component - Elemento del componente
 * @param {string} requirementId - ID del requisito a activar
 */
function switchContent(component, requirementId) {
  console.log('[DEBUG] switchContent llamado con requirementId:', requirementId)

  const chartSegments = component.querySelectorAll('.admission-requirements_chart-segment')
  const contentPanels = component.querySelectorAll('.admission-requirements_content-panel')

  console.log('[DEBUG] Segmentos encontrados:', chartSegments.length)
  console.log('[DEBUG] Paneles encontrados:', contentPanels.length)

  // Desactivar todos los segmentos y paneles
  chartSegments.forEach(segment => {
    segment.classList.remove('is-active')
    segment.style.filter = 'brightness(1)'
  })

  contentPanels.forEach(panel => {
    panel.classList.remove('is-active')
    panel.setAttribute('aria-hidden', 'true')
  })

  // Activar el segmento y panel seleccionados
  const activeSegment = component.querySelector(`[data-requirement="${requirementId}"].admission-requirements_chart-segment`)
  const activePanel = component.querySelector(`[data-content-panel="${requirementId}"]`)

  console.log('[DEBUG] Segmento activo encontrado:', !!activeSegment, activeSegment)
  console.log('[DEBUG] Panel activo encontrado:', !!activePanel, activePanel)

  if (activeSegment && activePanel) {
    activeSegment.classList.add('is-active')
    activeSegment.style.filter = 'brightness(1.1)'

    activePanel.classList.add('is-active')
    activePanel.setAttribute('aria-hidden', 'false')

    console.log('[DEBUG] Panel activado exitosamente para:', requirementId)
    // Anunciar el cambio
    announceContentChange(component, requirementId)
  } else {
    console.log('[DEBUG] ERROR: No se pudo activar el panel para:', requirementId)
  }
}

/**
 * Mejoras de accesibilidad
 * @param {HTMLElement} component - Elemento del componente
 */
function initAccessibilityEnhancements(component) {
  // Configurar el gráfico como elemento interactivo
  const chartContainer = component.querySelector('.admission-requirements_chart-container')
  if (chartContainer) {
    chartContainer.setAttribute('role', 'region')
    chartContainer.setAttribute('aria-label', 'Gráfico circular interactivo de requisitos de admisión')
  }

  // Configurar el gráfico SVG
  const chart = component.querySelector('.admission-requirements_chart')
  if (chart) {
    chart.setAttribute('role', 'img')
    chart.setAttribute('aria-label', 'Gráfico circular mostrando: 50% actitud, 30% conocimiento, 20% habilidad')
  }

  // Configurar segmentos del gráfico
  const chartSegments = component.querySelectorAll('.admission-requirements_chart-segment')
  chartSegments.forEach(segment => {
    const requirementId = segment.dataset.requirement
    const percentage = segment.dataset.percentage

    segment.setAttribute('role', 'button')
    segment.setAttribute('tabindex', '0')
    segment.setAttribute('aria-label', `${requirementId}: ${percentage}%. Presiona para ver detalles`)

    // Soporte para teclado en segmentos
    segment.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        switchContent(component, requirementId)
      }
    })
  })

  // Configurar labels de texto SVG
  const chartLabels = component.querySelectorAll('.admission-requirements_chart-label-percentage, .admission-requirements_chart-label-title')
  chartLabels.forEach(labelText => {
    const requirementId = labelText.dataset.requirement

    labelText.setAttribute('role', 'button')
    labelText.setAttribute('tabindex', '0')
    labelText.setAttribute('aria-label', `${requirementId}. Presiona para ver detalles`)

    // Soporte para teclado en labels
    labelText.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        switchContent(component, requirementId)
      }
    })
  })

  // Configurar paneles de contenido
  const contentPanels = component.querySelectorAll('.admission-requirements_content-panel')
  contentPanels.forEach((panel, index) => {
    const requirementId = panel.dataset.requirement

    panel.setAttribute('role', 'region')
    panel.setAttribute('id', `content-panel-${requirementId}`)
    panel.setAttribute('aria-labelledby', `chart-segment-${requirementId}`)
    panel.setAttribute('aria-hidden', index === 0 ? 'false' : 'true')
  })

  // Agregar live region para anuncios
  if (!component.querySelector('#admission-requirements-live-region')) {
    const liveRegion = document.createElement('div')
    liveRegion.setAttribute('aria-live', 'polite')
    liveRegion.setAttribute('aria-atomic', 'true')
    liveRegion.style.position = 'absolute'
    liveRegion.style.left = '-10000px'
    liveRegion.style.width = '1px'
    liveRegion.style.height = '1px'
    liveRegion.style.overflow = 'hidden'
    liveRegion.id = 'admission-requirements-live-region'

    component.appendChild(liveRegion)
  }
}

/**
 * Anuncia información para lectores de pantalla
 * @param {HTMLElement} component - Elemento del componente
 * @param {string} message - Mensaje a anunciar
 */
function announceToScreenReader(component, message) {
  const liveRegion = component.querySelector('#admission-requirements-live-region')
  if (liveRegion) {
    liveRegion.textContent = message

    // Limpiar después de un momento
    setTimeout(() => {
      liveRegion.textContent = ''
    }, 1000)
  }
}

/**
 * Anuncia el cambio de contenido
 * @param {HTMLElement} component - Elemento del componente
 * @param {string} requirementId - ID del requisito activado
 */
function announceContentChange(component, requirementId) {
  const activePanel = component.querySelector(`[data-content-panel="${requirementId}"]`)

  if (activePanel) {
    const title = activePanel.querySelector('.admission-requirements_panel-main-title')?.textContent
    const subtitle = activePanel.querySelector('.admission-requirements_panel-subtitle')?.textContent

    announceToScreenReader(component, `Mostrando detalles de ${title}. ${subtitle}`)
  }
}

/**
 * Funciones utilitarias para integración externa
 */
window.AdmissionRequirements = {
  /**
   * Activa un contenido específico
   * @param {string} requirementId - ID del requisito
   */
  switchContent: function(requirementId) {
    const component = document.querySelector('[data-component-id="requisitos"]')
    if (component) {
      switchContent(component, requirementId)
    }
  },

  /**
   * Obtiene el contenido activo
   * @returns {string|null} ID del contenido activo
   */
  getActiveContent: function() {
    const component = document.querySelector('[data-component-id="requisitos"]')
    if (component) {
      const activePanel = component.querySelector('.admission-requirements_content-panel.is-active')
      return activePanel ? activePanel.dataset.requirement : null
    }
    return null
  },

  /**
   * Obtiene todos los datos de requisitos
   * @returns {Array} Array con los datos de todos los requisitos
   */
  getRequirementsData: function() {
    const component = document.querySelector('[data-component-id="requisitos"]')
    if (!component) return []

    const chartSegments = component.querySelectorAll('.admission-requirements_chart-segment')
    return Array.from(chartSegments).map(segment => {
      const requirementId = segment.dataset.requirement
      const percentage = segment.dataset.percentage
      const isActive = segment.classList.contains('is-active')
      const contentPanel = component.querySelector(`[data-content-panel="${requirementId}"]`)
      const title = contentPanel?.querySelector('.admission-requirements_panel-main-title')?.textContent

      return {
        id: requirementId,
        title,
        percentage: percentage ? parseInt(percentage) : 0,
        isActive
      }
    })
  },

  /**
   * Reinicia todas las interacciones
   */
  reinitialize: function() {
    const component = document.querySelector('[data-component-id="requisitos"]')
    if (component) {
      // Limpiar event listeners existentes (básico)
      const newComponent = component.cloneNode(true)
      component.parentNode.replaceChild(newComponent, component)

      // Reinicializar
      initChartInteractions(newComponent)
      initAccessibilityEnhancements(newComponent)
    }
  }
}

// ===========================================
// AUTO-INICIALIZACIÓN
// ===========================================
const initRequirementsSystem = () => {
  // Fallback simple sin dependencias externas
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initAdmissionRequirements()
    })
  } else {
    initAdmissionRequirements()
  }
}

// Auto-ejecutar si no es un módulo Y está en el cliente
if (typeof module === 'undefined' && typeof window !== 'undefined') {
  initRequirementsSystem()
}

// Exponer globalmente para compatibilidad con Liferay
if (typeof window !== 'undefined') {
  window.initAdmissionRequirements = initAdmissionRequirements
  window.initRequirementsSystem = initRequirementsSystem
}

// Exportar función principal siguiendo el patrón estándar
export default initRequirementsSystem