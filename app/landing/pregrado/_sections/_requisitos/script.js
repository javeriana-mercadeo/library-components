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
    initTabsInteractions(component)
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

    // Click para activar tab
    segment.addEventListener('click', () => {
      switchTab(component, requirementId)
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

    // Click para activar tab
    labelText.addEventListener('click', () => {
      switchTab(component, requirementId)
    })
  })
}

/**
 * Inicializa las interacciones de los tabs
 * @param {HTMLElement} component - Elemento del componente
 */
function initTabsInteractions(component) {
  const tabButtons = component.querySelectorAll('.admission-requirements_tab-button')

  tabButtons.forEach(button => {
    const requirementId = button.dataset.requirement

    button.addEventListener('click', () => {
      switchTab(component, requirementId)
    })

    // Soporte para teclado
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        switchTab(component, requirementId)
      }
    })

    // Hacer focusable para accesibilidad
    button.setAttribute('tabindex', '0')
    button.setAttribute('role', 'tab')
    button.setAttribute('aria-selected', button.classList.contains('is-active') ? 'true' : 'false')
  })
}

/**
 * Cambia al tab especificado
 * @param {HTMLElement} component - Elemento del componente
 * @param {string} requirementId - ID del requisito
 */
function switchTab(component, requirementId) {
  // Desactivar todos los tabs
  const allTabButtons = component.querySelectorAll('.admission-requirements_tab-button')
  const allTabPanels = component.querySelectorAll('.admission-requirements_tab-panel')

  allTabButtons.forEach(button => {
    button.classList.remove('is-active')
    button.setAttribute('aria-selected', 'false')
  })

  allTabPanels.forEach(panel => {
    panel.classList.remove('is-active')
  })

  // Activar el tab seleccionado
  const targetTabButton = component.querySelector(`[data-tab-button="${requirementId}"]`)
  const targetTabPanel = component.querySelector(`[data-tab-panel="${requirementId}"]`)

  if (targetTabButton && targetTabPanel) {
    targetTabButton.classList.add('is-active')
    targetTabButton.setAttribute('aria-selected', 'true')
    targetTabPanel.classList.add('is-active')

    // Anunciar para lectores de pantalla
    announceToScreenReader(component, `${requirementId} seleccionado`)
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
    segment.setAttribute('aria-label', `${requirementId}: ${percentage}%. Presiona para seleccionar`)

    // Soporte para teclado en segmentos
    segment.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        switchTab(component, requirementId)
      }
    })
  })

  // Mejorar labels del gráfico (texto SVG)
  const chartLabelTexts = component.querySelectorAll('.admission-requirements_chart-label-percentage, .admission-requirements_chart-label-title')
  chartLabelTexts.forEach(labelText => {
    const requirementId = labelText.dataset.requirement
    labelText.setAttribute('role', 'button')
    labelText.setAttribute('tabindex', '0')
    labelText.setAttribute('aria-label', `${requirementId}. Presiona para seleccionar`)

    // Soporte para teclado en labels
    labelText.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        switchTab(component, requirementId)
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
<<<<<<< HEAD
function updateInteractions(component) {
  // Reinicializar todas las interacciones
  initChartInteractions(component)
  initTabsInteractions(component)
  initAccessibilityEnhancements(component)
=======
function initIntersectionObserver(component) {
  // Verificar soporte del browser
  if (!('IntersectionObserver' in window)) {
    // Fallback: ejecutar animaciones inmediatamente
    triggerProgressAnimations(component)
    return
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log('AdmissionRequirements: Componente visible, activando animaciones')
        triggerProgressAnimations(entry.target)
        observer.unobserve(entry.target)
      }
    })
  }, {
    threshold: 0.1, // Reducir threshold para activar más fácilmente
    rootMargin: '0px 0px -100px 0px' // Activar un poco antes
  })

  observer.observe(component)
}

/**
 * Activa las animaciones de progreso cuando el componente es visible
 * @param {HTMLElement} component - Elemento del componente
 */
function triggerProgressAnimations(component) {
  const sections = component.querySelectorAll('[data-requirement]')

  sections.forEach((section, index) => {
    setTimeout(() => {
      const percentage = parseInt(section.dataset.percentage) || 0
      const progressFill = section.querySelector('.admission-requirements_progress-fill')

      if (progressFill) {
        // Usar el porcentaje directo del data attribute
        const targetWidth = percentage / 100
        progressFill.style.transition = 'transform 2s ease-out'
        progressFill.style.transform = `scaleX(${targetWidth})`

        // Actualizar el dataset también
        progressFill.dataset.targetWidth = targetWidth
      }

      // Agregar clase para animaciones adicionales
      section.classList.add('is-animated')

    }, index * 300) // Stagger animation con más delay
  })
>>>>>>> df363ea95e373ffdcbc310eb25fcc2ba70877f45
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
    const card = document.querySelector(`[data-requirement="${requirementId}"]`)
    if (card) {
      card.dataset.percentage = newPercentage
      const percentageElement = card.querySelector('.admission-requirements_percentage-number')
      if (percentageElement) {
        percentageElement.textContent = newPercentage
      }

      // Recalcular animación de progreso
      const radius = 50
      const circumference = 2 * Math.PI * radius
      card.dataset.targetOffset = circumference * (1 - newPercentage / 100)

      // Anunciar el cambio para lectores de pantalla
      const liveRegion = document.getElementById('admission-requirements-live-region')
      if (liveRegion) {
        liveRegion.textContent = `${requirementId} actualizado a ${newPercentage} por ciento`
      }
    }
  },

  /**
   * Obtiene el estado actual de todos los requisitos
   * @returns {Array} Array con los datos de todos los requisitos
   */
  getRequirementsData: function() {
<<<<<<< HEAD
    const component = document.querySelector('[data-component-id="requisitos-pregrado"]')
    if (!component) return []

    const tabButtons = component.querySelectorAll('.admission-requirements_tab-button')
    return Array.from(tabButtons).map(button => ({
      id: button.dataset.requirement,
      percentage: parseInt(component.querySelector('.admission-requirements_chart-segment')?.dataset.percentage || 0),
      title: button.querySelector('.admission-requirements_tab-title')?.textContent,
      isActive: button.classList.contains('is-active')
=======
    const cards = document.querySelectorAll('[data-requirement]')
    return Array.from(cards).map(card => ({
      id: card.dataset.requirement,
      percentage: parseInt(card.dataset.percentage),
      title: card.querySelector('.admission-requirements_card-title-text')?.textContent,
      isActive: card.classList.contains('is-active')
>>>>>>> df363ea95e373ffdcbc310eb25fcc2ba70877f45
    }))
  },

  /**
   * Selecciona un tab específico
   * @param {string} requirementId - ID del requisito
   */
  selectTab: function(requirementId) {
    const component = document.querySelector('[data-component-id="requisitos-pregrado"]')
    if (component) {
      switchTab(component, requirementId)
    }
  },

  /**
   * Obtiene el tab activo actual
   * @returns {string|null} ID del requisito activo
   */
<<<<<<< HEAD
  getActiveTab: function() {
    const component = document.querySelector('[data-component-id="requisitos-pregrado"]')
    if (!component) return null

    const activeTab = component.querySelector('.admission-requirements_tab-button.is-active')
    return activeTab ? activeTab.dataset.requirement : null
  },

  /**
   * Reinicia todas las interacciones
   */
  reinitialize: function() {
    const component = document.querySelector('[data-component-id="requisitos-pregrado"]')
    if (component) {
      updateInteractions(component)
    }
=======
  resetAnimations: function() {
    const components = document.querySelectorAll('[data-component-id="requisitos"]')
    components.forEach(component => {
      initProgressAnimations(component)
      setTimeout(() => triggerProgressAnimations(component), 100)
    })
>>>>>>> df363ea95e373ffdcbc310eb25fcc2ba70877f45
  }
}

// Estilos de ripple eliminados - ya no son necesarios

// Exportar función principal para uso externo
export default initAdmissionRequirements
