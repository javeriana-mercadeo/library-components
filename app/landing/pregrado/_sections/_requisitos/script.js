/**
 * Script vanilla JS para el componente de Requisitos de Admisión
 * Compatible con Liferay DXP - Sin dependencias de React
 */

// Eliminamos la ejecución automática para usar solo la manual desde React

/**
 * Inicializa todos los componentes de requisitos de admisión
 */
function initAdmissionRequirements() {
  const components = document.querySelectorAll('[data-component-id="requisitos"]')

  if (components.length === 0) {
    console.log('AdmissionRequirements: No se encontraron componentes')
    return
  }

  components.forEach(component => {
    initProgressAnimations(component)
    initCardInteractions(component)
    initAccessibilityEnhancements(component)

    // Ejecutar animaciones inmediatamente con un pequeño delay
    setTimeout(() => {
      triggerProgressAnimations(component)
    }, 500)
  })

  console.log(`AdmissionRequirements: ${components.length} componente(s) inicializado(s)`)
}

/**
 * Inicializa las animaciones de barras de progreso
 * @param {HTMLElement} component - Elemento del componente
 */
function initProgressAnimations(component) {
  const sections = component.querySelectorAll('[data-requirement]')

  sections.forEach(section => {
    const percentage = parseInt(section.dataset.percentage) || 0
    const progressFill = section.querySelector('.admission-requirements_progress-fill')

    if (progressFill) {
      // Establecer el valor inicial (sin animación)
      progressFill.style.transform = 'scaleX(0)'
      progressFill.style.transition = 'none' // Sin transición inicial

      // Guardar el porcentaje para animación posterior
      progressFill.dataset.targetWidth = percentage / 100
    }
  })
}

/**
 * Inicializa las interacciones de las secciones
 * @param {HTMLElement} component - Elemento del componente
 */
function initCardInteractions(component) {
  const sections = component.querySelectorAll('.admission-requirements_section')

  sections.forEach(section => {
    // Solo mantenemos click y keyboard para accesibilidad básica si es necesario
    // Pero sin comportamiento interactivo ya que son solo informativos

    // Agregar aria-label descriptivo para lectores de pantalla
    const requirement = section.dataset.requirement
    const percentage = section.dataset.percentage
    const title = section.querySelector('.admission-requirements_section-title')?.textContent || requirement

    section.setAttribute('aria-label', `${title}: ${percentage}% del proceso de evaluación`)
  })
}

// Funciones de interacción eliminadas - las secciones son solo informativas

/**
 * Mejoras de accesibilidad
 * @param {HTMLElement} component - Elemento del componente
 */
function initAccessibilityEnhancements(component) {
  // Agregar landmarks ARIA
  const dashboard = component.querySelector('.admission-requirements_dashboard')
  if (dashboard) {
    dashboard.setAttribute('role', 'region')
    dashboard.setAttribute('aria-label', 'Requisitos de admisión al programa')
  }

  // Mejorar la descripción de los porcentajes
  const percentages = component.querySelectorAll('.admission-requirements_percentage-number')
  percentages.forEach(percentage => {
    const value = percentage.textContent
    percentage.setAttribute('aria-label', `${value} por ciento`)
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
 * Inicializa el observer de intersección para animaciones on-scroll
 * @param {HTMLElement} component - Elemento del componente
 */
function initIntersectionObserver(component) {
  // Verificar soporte del browser
  if (!('IntersectionObserver' in window)) {
    // Fallback: ejecutar animaciones inmediatamente
    triggerProgressAnimations(component)
    return
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.log('AdmissionRequirements: Componente visible, activando animaciones')
          triggerProgressAnimations(entry.target)
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1, // Reducir threshold para activar más fácilmente
      rootMargin: '0px 0px -100px 0px' // Activar un poco antes
    }
  )

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
  updatePercentage: function (requirementId, newPercentage) {
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
  getRequirementsData: function () {
    const cards = document.querySelectorAll('[data-requirement]')
    return Array.from(cards).map(card => ({
      id: card.dataset.requirement,
      percentage: parseInt(card.dataset.percentage),
      title: card.querySelector('.admission-requirements_card-title-text')?.textContent,
      isActive: card.classList.contains('is-active')
    }))
  },

  /**
   * Reinicia todas las animaciones
   */
  resetAnimations: function () {
    const components = document.querySelectorAll('[data-component-id="requisitos"]')
    components.forEach(component => {
      initProgressAnimations(component)
      setTimeout(() => triggerProgressAnimations(component), 100)
    })
  }
}

// Estilos de ripple eliminados - ya no son necesarios

// Exportar función principal para uso externo
export default initAdmissionRequirements
