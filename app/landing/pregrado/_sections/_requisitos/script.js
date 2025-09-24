/**
 * Script vanilla JS para el componente de Requisitos de Admisión - Gráfico Circular
 * Compatible con Liferay DXP - Sin dependencias de React
 */

/**
 * Inicializa todos los componentes de requisitos de admisión
 */
function initAdmissionRequirements() {
  const components = document.querySelectorAll('[data-component-id="requisitos-pregrado"]')

  if (components.length === 0) {
    console.log('AdmissionRequirements: No se encontraron componentes')
    return
  }

  components.forEach(component => {
    initChartInteractions(component)
    initAccordionInteractions(component)
    initAccessibilityEnhancements(component)
  })

  console.log(`AdmissionRequirements: ${components.length} componente(s) inicializado(s)`)
}

/**
 * Inicializa las interacciones del gráfico circular
 * @param {HTMLElement} component - Elemento del componente
 */
function initChartInteractions(component) {
  const chartSegments = component.querySelectorAll('.admission-requirements_chart-segment')
  const chartLabelTexts = component.querySelectorAll('.admission-requirements_chart-label-percentage, .admission-requirements_chart-label-title')

  // Hover effects para segmentos del gráfico
  chartSegments.forEach(segment => {
    const requirementId = segment.dataset.requirement
    const percentage = segment.dataset.percentage

    segment.addEventListener('mouseenter', () => {
      // Destacar segmento
      segment.style.transform = 'scale(1.02)'
      segment.style.transformOrigin = 'center'

      // Anunciar para lectores de pantalla
      announceToScreenReader(component, `${requirementId}: ${percentage}%`)
    })

    segment.addEventListener('mouseleave', () => {
      // Restaurar segmento
      segment.style.transform = 'scale(1)'
    })

    // Click para activar acordeón
    segment.addEventListener('click', () => {
      toggleAccordion(component, requirementId)
    })
  })

  // Hover effects para labels del gráfico (texto SVG)
  chartLabelTexts.forEach(labelText => {
    const requirementId = labelText.dataset.requirement

    labelText.addEventListener('mouseenter', () => {
      // Destacar segmento correspondiente
      const correspondingSegment = component.querySelector(`[data-requirement="${requirementId}"].admission-requirements_chart-segment`)
      if (correspondingSegment) {
        correspondingSegment.style.transform = 'scale(1.02)'
        correspondingSegment.style.transformOrigin = 'center'
      }
    })

    labelText.addEventListener('mouseleave', () => {
      // Restaurar segmento correspondiente
      const correspondingSegment = component.querySelector(`[data-requirement="${requirementId}"].admission-requirements_chart-segment`)
      if (correspondingSegment) {
        correspondingSegment.style.transform = 'scale(1)'
      }
    })

    // Click para activar acordeón
    labelText.addEventListener('click', () => {
      toggleAccordion(component, requirementId)
    })
  })
}

/**
 * Inicializa las interacciones del acordeón
 * @param {HTMLElement} component - Elemento del componente
 */
function initAccordionInteractions(component) {
  const accordionHeaders = component.querySelectorAll('.admission-requirements_accordion-header')

  accordionHeaders.forEach(header => {
    const accordionItem = header.closest('.admission-requirements_accordion-item')
    const requirementId = accordionItem.dataset.requirement

    header.addEventListener('click', () => {
      toggleAccordion(component, requirementId)
    })

    // Soporte para teclado
    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        toggleAccordion(component, requirementId)
      }
    })

    // Hacer focusable para accesibilidad
    header.setAttribute('tabindex', '0')
    header.setAttribute('role', 'button')
    header.setAttribute('aria-expanded', 'false')
  })
}

/**
 * Alterna el estado del acordeón para un requisito específico
 * @param {HTMLElement} component - Elemento del componente
 * @param {string} requirementId - ID del requisito
 */
function toggleAccordion(component, requirementId) {
  const accordionItem = component.querySelector(`[data-requirement="${requirementId}"].admission-requirements_accordion-item`)
  const accordionContent = accordionItem.querySelector('.admission-requirements_accordion-content')
  const accordionHeader = accordionItem.querySelector('.admission-requirements_accordion-header')

  if (!accordionItem || !accordionContent) return

  const isActive = accordionItem.classList.contains('is-active')

  if (isActive) {
    // Cerrar acordeón
    accordionItem.classList.remove('is-active')
    accordionContent.style.maxHeight = '0'
    accordionHeader.setAttribute('aria-expanded', 'false')

    // Anunciar para lectores de pantalla
    announceToScreenReader(component, `${requirementId} colapsado`)
  } else {
    // Cerrar otros acordeones primero (comportamiento opcional)
    const activeAccordions = component.querySelectorAll('.admission-requirements_accordion-item.is-active')
    activeAccordions.forEach(activeItem => {
      if (activeItem !== accordionItem) {
        activeItem.classList.remove('is-active')
        const activeContent = activeItem.querySelector('.admission-requirements_accordion-content')
        const activeHeader = activeItem.querySelector('.admission-requirements_accordion-header')
        if (activeContent) activeContent.style.maxHeight = '0'
        if (activeHeader) activeHeader.setAttribute('aria-expanded', 'false')
      }
    })

    // Abrir acordeón
    accordionItem.classList.add('is-active')
    accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px'
    accordionHeader.setAttribute('aria-expanded', 'true')

    // Anunciar para lectores de pantalla
    announceToScreenReader(component, `${requirementId} expandido`)
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
 * Mejoras de accesibilidad
 * @param {HTMLElement} component - Elemento del componente
 */
function initAccessibilityEnhancements(component) {
  // Agregar landmarks ARIA para el gráfico
  const chartContainer = component.querySelector('.admission-requirements_chart-container')
  if (chartContainer) {
    chartContainer.setAttribute('role', 'region')
    chartContainer.setAttribute('aria-label', 'Gráfico circular de requisitos de admisión')
  }

  // Mejorar la descripción del gráfico SVG
  const chart = component.querySelector('.admission-requirements_chart')
  if (chart) {
    chart.setAttribute('role', 'img')
    chart.setAttribute('aria-label', 'Gráfico circular mostrando: 60% actitud, 20% conocimiento, 20% habilidad')
  }

  // Mejorar segmentos del gráfico
  const chartSegments = component.querySelectorAll('.admission-requirements_chart-segment')
  chartSegments.forEach(segment => {
    const requirementId = segment.dataset.requirement
    const percentage = segment.dataset.percentage
    segment.setAttribute('role', 'button')
    segment.setAttribute('tabindex', '0')
    segment.setAttribute('aria-label', `${requirementId}: ${percentage}%. Presiona para expandir detalles`)

    // Soporte para teclado en segmentos
    segment.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        toggleAccordion(component, requirementId)
      }
    })
  })

  // Mejorar labels del gráfico (texto SVG)
  const chartLabelTexts = component.querySelectorAll('.admission-requirements_chart-label-percentage, .admission-requirements_chart-label-title')
  chartLabelTexts.forEach(labelText => {
    const requirementId = labelText.dataset.requirement
    labelText.setAttribute('role', 'button')
    labelText.setAttribute('tabindex', '0')
    labelText.setAttribute('aria-label', `${requirementId}. Presiona para expandir detalles`)

    // Soporte para teclado en labels
    labelText.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        toggleAccordion(component, requirementId)
      }
    })
  })

  // Agregar live region para anuncios dinámicos
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

/**
 * Actualiza las interacciones cuando el contenido cambia dinámicamente
 * @param {HTMLElement} component - Elemento del componente
 */
function updateInteractions(component) {
  // Reinicializar todas las interacciones
  initChartInteractions(component)
  initAccordionInteractions(component)
  initAccessibilityEnhancements(component)
}

/**
 * Funciones utilitarias para integración externa
 */
window.AdmissionRequirements = {
  /**
   * Actualiza el porcentaje de un requisito específico
   * @param {string} requirementId - ID del requisito
   * @param {number} newPercentage - Nuevo porcentaje
   */
  updatePercentage: function(requirementId, newPercentage) {
    const component = document.querySelector('[data-component-id="requisitos-pregrado"]')
    if (!component) return

    // Actualizar segmento del gráfico
    const segment = component.querySelector(`[data-requirement="${requirementId}"].admission-requirements_chart-segment`)
    if (segment) {
      segment.dataset.percentage = newPercentage
    }

    // Actualizar label del gráfico
    const labelPercentage = component.querySelector(`[data-requirement="${requirementId}"] .admission-requirements_label-percentage`)
    if (labelPercentage) {
      labelPercentage.textContent = `${newPercentage}%`
    }

    // Actualizar acordeón
    const accordionPercentage = component.querySelector(`[data-requirement="${requirementId}"] .admission-requirements_accordion-percentage`)
    if (accordionPercentage) {
      accordionPercentage.textContent = `${newPercentage}%`
    }

    // Anunciar el cambio para lectores de pantalla
    announceToScreenReader(component, `${requirementId} actualizado a ${newPercentage} por ciento`)
  },

  /**
   * Obtiene el estado actual de todos los requisitos
   * @returns {Array} Array con los datos de todos los requisitos
   */
  getRequirementsData: function() {
    const component = document.querySelector('[data-component-id="requisitos-pregrado"]')
    if (!component) return []

    const accordionItems = component.querySelectorAll('.admission-requirements_accordion-item')
    return Array.from(accordionItems).map(item => ({
      id: item.dataset.requirement,
      percentage: parseInt(item.querySelector('.admission-requirements_chart-segment')?.dataset.percentage || 0),
      title: item.querySelector('.admission-requirements_accordion-title')?.textContent,
      isActive: item.classList.contains('is-active')
    }))
  },

  /**
   * Abre un acordeón específico
   * @param {string} requirementId - ID del requisito
   */
  openAccordion: function(requirementId) {
    const component = document.querySelector('[data-component-id="requisitos-pregrado"]')
    if (component) {
      toggleAccordion(component, requirementId)
    }
  },

  /**
   * Cierra todos los acordeones
   */
  closeAllAccordions: function() {
    const component = document.querySelector('[data-component-id="requisitos-pregrado"]')
    if (!component) return

    const activeAccordions = component.querySelectorAll('.admission-requirements_accordion-item.is-active')
    activeAccordions.forEach(item => {
      const requirementId = item.dataset.requirement
      toggleAccordion(component, requirementId)
    })
  },

  /**
   * Reinicia todas las interacciones
   */
  reinitialize: function() {
    const component = document.querySelector('[data-component-id="requisitos-pregrado"]')
    if (component) {
      updateInteractions(component)
    }
  }
}

// Estilos de ripple eliminados - ya no son necesarios

// Exportar función principal para uso externo
export default initAdmissionRequirements