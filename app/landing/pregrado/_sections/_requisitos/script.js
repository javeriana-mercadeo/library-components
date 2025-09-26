/**
 * Script vanilla JS para el componente de Requisitos de Admisión - Gráfico Circular Interactivo
 * Compatible con Liferay DXP - Sin dependencias de React
 */

// ===========================================
// CONFIGURACIÓN DE LOGGING
// ===========================================
const LOGGING_CONFIG = {
  enabled: true, // Cambiar a false para desactivar todos los logs
  levels: {
    error: true,   // Errores críticos
    warn: true,    // Advertencias
    info: false,   // Información general
    debug: false   // Información de debugging detallada
  }
}

// Logger personalizado
const Logger = {
  error: (message, ...args) => {
    if (LOGGING_CONFIG.enabled && LOGGING_CONFIG.levels.error) {
      console.error(`[RequirementsAPI] ${message}`, ...args)
    }
  },
  warn: (message, ...args) => {
    if (LOGGING_CONFIG.enabled && LOGGING_CONFIG.levels.warn) {
      console.warn(`[RequirementsAPI] ${message}`, ...args)
    }
  },
  info: (message, ...args) => {
    if (LOGGING_CONFIG.enabled && LOGGING_CONFIG.levels.info) {
      console.log(`[RequirementsAPI] ${message}`, ...args)
    }
  },
  debug: (message, ...args) => {
    if (LOGGING_CONFIG.enabled && LOGGING_CONFIG.levels.debug) {
      console.log(`[RequirementsAPI] 🐛 ${message}`, ...args)
    }
  },

  // Funciones de control para configuración dinámica
  setEnabled: (enabled) => {
    LOGGING_CONFIG.enabled = enabled
    Logger.info(`Logging ${enabled ? 'enabled' : 'disabled'}`)
  },

  setLevel: (level, enabled) => {
    if (LOGGING_CONFIG.levels.hasOwnProperty(level)) {
      LOGGING_CONFIG.levels[level] = enabled
      Logger.info(`Logging level '${level}' ${enabled ? 'enabled' : 'disabled'}`)
    }
  },

  enableAll: () => {
    LOGGING_CONFIG.enabled = true
    Object.keys(LOGGING_CONFIG.levels).forEach(level => {
      LOGGING_CONFIG.levels[level] = true
    })
    Logger.info('All logging levels enabled')
  },

  disableAll: () => {
    Logger.info('Disabling all logging...')
    LOGGING_CONFIG.enabled = false
  },

  getConfig: () => {
    return { ...LOGGING_CONFIG }
  }
}


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
  const chartSegments = component.querySelectorAll('.admission-requirements_chart-segment')
  const contentPanels = component.querySelectorAll('.admission-requirements_content-panel')

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

  if (activeSegment && activePanel) {
    activeSegment.classList.add('is-active')
    activeSegment.style.filter = 'brightness(1.1)'

    activePanel.classList.add('is-active')
    activePanel.setAttribute('aria-hidden', 'false')

    // Anunciar el cambio
    announceContentChange(component, requirementId)
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
// API INTEGRATION
// ===========================================
async function fetchRequirementsFromAPI(programCode) {
  try {
    const apiUrl = `https://www.javeriana.edu.co/JaveMovil/ValoresMatricula-1/rs/psujsfvaportals/getrequisitos?codprograma=${programCode}`
    Logger.info(`Fetching requirements for program: ${programCode}`)
    Logger.debug(`API URL: ${apiUrl}`)

    const response = await fetch(apiUrl)
    Logger.debug(`API response status: ${response.status}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    Logger.debug('API data received:', data)

    const mappedData = mapAPIDataToRequirements(data)
    Logger.info('Requirements successfully mapped from API')
    Logger.debug('Mapped data:', mappedData)

    return mappedData
  } catch (error) {
    Logger.error('Error fetching data:', error)
    return null
  }
}

function mapAPIDataToRequirements(apiData) {
  // Agrupar datos por ujDescr100 (ACTITUD, CONOCIMIENTO, HABILIDAD)
  const groupedData = apiData.reduce((acc, item) => {
    const category = item.ujDescr100.toLowerCase()
    if (!acc[category]) {
      acc[category] = {
        percentage: item.descr,
        items: []
      }
    }
    // Agregar criterio específico (ujGrupoCriterios)
    const itemText = item.ujGrupoCriterios
    if (itemText && !acc[category].items.includes(itemText)) {
      acc[category].items.push(itemText)
    }
    return acc
  }, {})

  // Mapear a la estructura que espera nuestro componente
  const mappedRequirements = [
    {
      id: 'actitud',
      title: 'ACTITUD',
      percentage: groupedData.actitud?.percentage || 0,
      icon: 'ph ph-user-circle-plus',
      color: 'primary',
      items: groupedData.actitud?.items || ['No hay criterios disponibles']
    },
    {
      id: 'conocimiento',
      title: 'CONOCIMIENTO',
      percentage: groupedData.conocimiento?.percentage || 0,
      icon: 'ph ph-brain',
      color: 'secondary',
      items: groupedData.conocimiento?.items || ['No hay criterios disponibles']
    },
    {
      id: 'habilidad',
      title: 'HABILIDAD',
      percentage: groupedData.habilidad?.percentage || 0,
      icon: 'ph ph-atom',
      color: 'success',
      items: groupedData.habilidad?.items || ['No hay criterios disponibles']
    }
  ]

  return mappedRequirements
}

function updateReactComponent(requirementsData) {
  // Almacenar datos para acceso posterior en caso de timing issues
  if (typeof window !== 'undefined') {
    window.latestRequirementsData = requirementsData
  }

  // Disparar evento personalizado para actualizar el componente React
  const event = new CustomEvent('requirements:dataLoaded', {
    detail: { requirements: requirementsData }
  })

  document.dispatchEvent(event)

  // También intentar un dispatch retrasado por si hay timing issues
  setTimeout(() => {
    const delayedEvent = new CustomEvent('requirements:dataLoaded', {
      detail: { requirements: requirementsData }
    })
    document.dispatchEvent(delayedEvent)

    // Si no hay React component activo, actualizar directamente el DOM
    if (!window.requirementsReactTest) {
      updateDOMDirectly(requirementsData)
    }
  }, 1000)
}

// ===========================================
// ACTUALIZACIÓN DIRECTA DEL DOM (FALLBACK)
// ===========================================
function updateDOMDirectly(requirementsData) {
  const component = document.querySelector('[data-component-id="requisitos"]')
  if (!component) return

  try {
    // Actualizar los porcentajes y labels del SVG
    updateSVGChart(component, requirementsData)

    // Actualizar los paneles de contenido
    updateContentPanels(component, requirementsData)

    // Reinitializar interacciones después de actualizar el DOM
    initChartInteractions(component)
    initAccessibilityEnhancements(component)

  } catch (error) {
    Logger.error('Error updating DOM:', error)
  }
}

function updateSVGChart(component, requirementsData) {
  // Filtrar datos para excluir categorías con 0%
  const validRequirements = requirementsData.filter(requirement => requirement.percentage > 0)
  Logger.debug(`Filtering requirements: ${requirementsData.length} total, ${validRequirements.length} valid (>0%)`)

  const chartContainer = component.querySelector('.admission-requirements_chart-container')
  const contentContainer = component.querySelector('.admission-requirements_content-container')
  if (!chartContainer) return

  // Aplicar clases condicionales para altura
  if (validRequirements.length > 1) {
    chartContainer.classList.add('multiple-requirements')
    if (contentContainer) contentContainer.classList.add('multiple-requirements')
  } else {
    chartContainer.classList.remove('multiple-requirements')
    if (contentContainer) contentContainer.classList.remove('multiple-requirements')
  }

  // Verificar si hay solo un requisito
  if (validRequirements.length === 1) {
    Logger.debug('Single requirement detected, rendering icon display')
    renderSingleRequirementDisplay(chartContainer, validRequirements[0])
    return
  }

  // Recalcular y actualizar los paths del SVG para múltiples requisitos
  const svg = component.querySelector('.admission-requirements_chart')
  if (!svg) return

  // Limpiar todos los elementos dinámicos y centrales para reordenarlos
  const existingSegments = svg.querySelectorAll('.admission-requirements_chart-segment')
  const existingLabels = svg.querySelectorAll('.admission-requirements_chart-label-percentage, .admission-requirements_chart-label-title')
  const existingCenter = svg.querySelectorAll('.admission-requirements_chart-center, .admission-requirements_chart-total-label, .admission-requirements_chart-total-value')

  existingSegments.forEach(segment => segment.remove())
  existingLabels.forEach(label => label.remove())
  existingCenter.forEach(element => element.remove())

  // Recrear en el orden correcto: primero segmentos, luego elementos centrales

  // 1. Recrear los segmentos con los nuevos datos (solo válidos)
  let cumulativeAngle = 0

  validRequirements.forEach((requirement, index) => {
    const percentage = requirement.percentage
    const startAngle = cumulativeAngle
    const endAngle = startAngle + (percentage * 3.6) // Convert percentage to degrees
    cumulativeAngle = endAngle

    // Crear path del segmento
    const segment = createSVGSegment(startAngle, endAngle, percentage, requirement)
    svg.appendChild(segment)
  })

  // 2. Agregar círculo central encima de los segmentos
  const centerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
  centerCircle.setAttribute('cx', '400')
  centerCircle.setAttribute('cy', '400')
  centerCircle.setAttribute('r', '175')
  centerCircle.setAttribute('class', 'admission-requirements_chart-center')
  svg.appendChild(centerCircle)

  // 3. Agregar textos centrales encima de todo
  const totalLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text')
  totalLabel.setAttribute('x', '400')
  totalLabel.setAttribute('y', '385')
  totalLabel.setAttribute('text-anchor', 'middle')
  totalLabel.setAttribute('class', 'admission-requirements_chart-total-label')
  totalLabel.textContent = 'Total'
  svg.appendChild(totalLabel)

  const totalValue = document.createElementNS('http://www.w3.org/2000/svg', 'text')
  totalValue.setAttribute('x', '400')
  totalValue.setAttribute('y', '425')
  totalValue.setAttribute('text-anchor', 'middle')
  totalValue.setAttribute('class', 'admission-requirements_chart-total-value')
  totalValue.textContent = '100%'
  svg.appendChild(totalValue)

  // 4. Finalmente, agregar los labels de los segmentos encima de todo (solo válidos)
  cumulativeAngle = 0
  validRequirements.forEach((requirement, index) => {
    const percentage = requirement.percentage
    const startAngle = cumulativeAngle
    const endAngle = startAngle + (percentage * 3.6)
    cumulativeAngle = endAngle

    // Crear labels del segmento
    const { percentageLabel, titleLabel } = createSVGLabels(startAngle, endAngle, requirement)
    svg.appendChild(percentageLabel)
    svg.appendChild(titleLabel)
  })
}

function createSVGSegment(startAngle, endAngle, percentage, requirement) {
  const radius = 350
  const centerX = 400
  const centerY = 400

  const startAngleRad = (startAngle - 90) * (Math.PI / 180)
  const endAngleRad = (endAngle - 90) * (Math.PI / 180)

  const x1 = centerX + radius * Math.cos(startAngleRad)
  const y1 = centerY + radius * Math.sin(startAngleRad)
  const x2 = centerX + radius * Math.cos(endAngleRad)
  const y2 = centerY + radius * Math.sin(endAngleRad)

  const largeArcFlag = percentage > 50 ? 1 : 0

  const pathData = [
    `M ${centerX} ${centerY}`,
    `L ${x1} ${y1}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
    'Z'
  ].join(' ')

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute('d', pathData)
  path.setAttribute('class', `admission-requirements_chart-segment admission-requirements_chart-segment--${requirement.color}`)
  path.setAttribute('data-requirement', requirement.id)
  path.setAttribute('data-percentage', requirement.percentage)

  return path
}

function createSVGLabels(startAngle, endAngle, requirement) {
  const segmentAngle = endAngle - startAngle
  const midAngle = startAngle + segmentAngle / 2 - 90
  const midAngleRad = midAngle * (Math.PI / 180)

  const labelRadius = 260
  const centerX = 400
  const centerY = 400

  const labelX = centerX + labelRadius * Math.cos(midAngleRad)
  const labelY = centerY + labelRadius * Math.sin(midAngleRad)

  // Crear label de porcentaje
  const percentageLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text')
  percentageLabel.setAttribute('x', labelX)
  percentageLabel.setAttribute('y', labelY - 8) // Más separación hacia arriba
  percentageLabel.setAttribute('text-anchor', 'middle')
  percentageLabel.setAttribute('class', 'admission-requirements_chart-label-percentage')
  percentageLabel.setAttribute('data-requirement', requirement.id)
  percentageLabel.style.cursor = 'pointer'
  percentageLabel.textContent = `${requirement.percentage}%`

  // Crear label de título
  const titleLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text')
  titleLabel.setAttribute('x', labelX)
  titleLabel.setAttribute('y', labelY + 14) // Más separación hacia abajo
  titleLabel.setAttribute('text-anchor', 'middle')
  titleLabel.setAttribute('class', 'admission-requirements_chart-label-title')
  titleLabel.setAttribute('data-requirement', requirement.id)
  titleLabel.style.cursor = 'pointer'
  titleLabel.textContent = requirement.title

  return { percentageLabel, titleLabel }
}

function updateContentPanels(component, requirementsData) {
  // Filtrar datos para excluir categorías con 0%
  const validRequirements = requirementsData.filter(requirement => requirement.percentage > 0)

  const contentContainer = component.querySelector('.admission-requirements_content-container')
  if (!contentContainer) return

  // Limpiar paneles existentes
  contentContainer.innerHTML = ''

  // Crear nuevos paneles (solo válidos)
  validRequirements.forEach((requirement, index) => {
    const panel = createContentPanel(requirement, index === 0, validRequirements.length === 1)
    contentContainer.appendChild(panel)
  })
}

function createContentPanel(requirement, isActive = false, isSingleRequirement = false) {
  const panel = document.createElement('div')
  const classes = ['admission-requirements_content-panel']
  if (isActive) classes.push('is-active')
  if (isSingleRequirement) classes.push('single-requirement')

  panel.className = classes.join(' ')
  panel.setAttribute('data-requirement', requirement.id)
  panel.setAttribute('data-content-panel', requirement.id)

  const itemsHTML = requirement.items.map(item => `
    <li class="admission-requirements_list-item">
      <div class="admission-requirements_item-check">
        <i class="ph ph-check"></i>
      </div>
      <span class="admission-requirements_item-text">
        ${item}
      </span>
    </li>
  `).join('')

  panel.innerHTML = `
    <div class="admission-requirements_panel-header">
      <div class="admission-requirements_panel-icon admission-requirements_panel-icon--${requirement.color}">
        <i class="${requirement.icon}"></i>
      </div>
      <div class="admission-requirements_panel-title">
        <h3 class="admission-requirements_panel-main-title">
          ${requirement.title}
        </h3>
        <span class="admission-requirements_panel-subtitle">
          ${requirement.percentage}% del proceso de evaluación
        </span>
      </div>
    </div>

    <div class="admission-requirements_panel-content">
      <ul class="admission-requirements_items-list">
        ${itemsHTML}
      </ul>
    </div>
  `

  return panel
}

// ===========================================
// AUTO-INICIALIZACIÓN
// ===========================================
const initRequirementsSystem = () => {
  // Fallback simple sin dependencias externas
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initAdmissionRequirements()
      setupAPIIntegration()
    })
  } else {
    initAdmissionRequirements()
    setupAPIIntegration()
  }
}

function setupAPIIntegration() {
  // Escuchar el evento de carga de programa desde Liferay
  document.addEventListener('data_load-program', async (event) => {
    try {
      // Obtener el código de programa del evento
      const programCode = event.detail?.dataProgram?.codPrograma

      if (programCode) {
        const requirementsData = await fetchRequirementsFromAPI(programCode)

        if (requirementsData) {
          updateReactComponent(requirementsData)
        }
      }
    } catch (error) {
      Logger.error('Error in setupAPIIntegration:', error)
    }
  })
}

// ===========================================
// SINGLE REQUIREMENT DISPLAY
// ===========================================
function renderSingleRequirementDisplay(chartContainer, requirement) {
  // Limpiar el contenedor
  chartContainer.innerHTML = ''

  // Crear el display de requisito único
  const singleDisplay = document.createElement('div')
  singleDisplay.className = 'admission-requirements_single-requirement-display'

  // Crear el ícono grande (siempre usar primary para requisito único)
  const iconElement = document.createElement('div')
  iconElement.className = `admission-requirements_single-requirement-display_icon admission-requirements_single-requirement-display_icon--primary`

  const iconI = document.createElement('i')
  iconI.className = requirement.icon
  iconElement.appendChild(iconI)

  // Crear el texto de porcentaje dentro del ícono
  const percentageElement = document.createElement('div')
  percentageElement.className = 'admission-requirements_single-requirement-display_percentage'
  percentageElement.textContent = `${requirement.percentage}%`
  iconElement.appendChild(percentageElement)

  // Ensamblar el display
  singleDisplay.appendChild(iconElement)

  // Agregar al contenedor
  chartContainer.appendChild(singleDisplay)

  // Configurar accesibilidad
  singleDisplay.setAttribute('role', 'region')
  singleDisplay.setAttribute('aria-label', `Requisito único: ${requirement.title} - ${requirement.percentage}%`)

  Logger.debug(`Single requirement display rendered for: ${requirement.title}`)
}

// Auto-ejecutar si no es un módulo Y está en el cliente
if (typeof module === 'undefined' && typeof window !== 'undefined') {
  initRequirementsSystem()
}

// Exponer globalmente para compatibilidad con Liferay
if (typeof window !== 'undefined') {
  window.initAdmissionRequirements = initAdmissionRequirements
  window.initRequirementsSystem = initRequirementsSystem

  // Exponer Logger para control dinámico de logs
  window.RequirementsLogger = Logger
}

// Exportar función principal siguiendo el patrón estándar
export default initRequirementsSystem