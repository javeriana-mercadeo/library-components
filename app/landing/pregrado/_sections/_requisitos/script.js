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
    error: true, // Errores críticos
    warn: true, // Advertencias
    info: false, // Información general
    debug: false // Información de debugging detallada
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
  setEnabled: enabled => {
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

// ===========================================
// CONFIGURACIÓN DE EXCLUSIÓN DE PROGRAMAS
// ===========================================

/**
 * Configuración para excluir programas de mostrar requisitos de admisión
 *
 * @property {boolean} enabled - Activar/desactivar la funcionalidad de exclusión
 * @property {string[]} programs - Lista de códigos de programa a excluir (case-insensitive)
 * @property {string} hideMode - Modo de ocultación: 'display' (display:none) o 'remove' (eliminar del DOM)
 * @property {boolean} logExclusions - Registrar en consola cuando un programa es excluido
 *
 * @example
 * // Para agregar un nuevo código a la lista de exclusión:
 * programs: ['EMSCL', 'PROG123', 'TEST001']
 */
const PROGRAM_EXCLUSION_CONFIG = {
  enabled: true,
  programs: [
    'EMSCL'
    // Agregar más códigos de programa aquí según sea necesario
  ],
  hideMode: 'display', // 'display' (ocultar) o 'remove' (eliminar del DOM)
  logExclusions: true
}

/**
 * Verifica si un código de programa está en la lista de exclusión
 * @param {string} programCode - Código del programa a verificar
 * @returns {boolean} true si el programa está excluido, false en caso contrario
 */
function isProgramExcluded(programCode) {
  // Si la funcionalidad está desactivada, ningún programa está excluido
  if (!PROGRAM_EXCLUSION_CONFIG.enabled) {
    return false
  }

  // Validar que se proporcione un código
  if (!programCode) {
    return false
  }

  // Normalizar el código (trim y uppercase) y verificar en la lista
  const normalizedCode = programCode.trim().toUpperCase()
  const isExcluded = PROGRAM_EXCLUSION_CONFIG.programs.includes(normalizedCode)

  // Logging opcional para debugging
  if (isExcluded && PROGRAM_EXCLUSION_CONFIG.logExclusions) {
    Logger.warn(`Program "${programCode}" is in exclusion list - component will be hidden`)
  }

  return isExcluded
}

/**
 * Oculta el componente de requisitos del DOM
 * Soporta dos modos: display (ocultar) o remove (eliminar)
 */
function hideRequirementsComponent() {
  const component = document.querySelector('[data-component-id="requisitos"]')

  if (!component) {
    Logger.warn('Requirements component not found in DOM for hiding')
    return
  }

  if (PROGRAM_EXCLUSION_CONFIG.hideMode === 'remove') {
    // Modo 1: Eliminar completamente del DOM
    component.remove()
    Logger.info('Requirements component removed from DOM')
  } else {
    // Modo 2: Ocultar con display: none (por defecto)
    component.style.display = 'none'
    component.setAttribute('aria-hidden', 'true')
    Logger.info('Requirements component hidden with display:none')
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
    initMobileAccordion(component)
    initNavigationButton(component)
  })
}

/**
 * Inicializa el botón de navegación hacia FAQ
 * @param {HTMLElement} component - Elemento del componente
 */
function initNavigationButton(component) {
  const navigationButtons = component.querySelectorAll('.btn[data-dmpa-element-id="btn"]')

  navigationButtons.forEach(navigationButton => {
    if (navigationButton) {
      // Limpiar listeners previos
      const newButton = navigationButton.cloneNode(true)
      navigationButton.parentNode.replaceChild(newButton, navigationButton)

      // Agregar event listener
      newButton.addEventListener('click', () => {
        window.AdmissionRequirements.navigateToFAQ()
      })

      // Soporte para teclado
      newButton.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          window.AdmissionRequirements.navigateToFAQ()
        }
      })

      // Configurar accesibilidad
      newButton.setAttribute('role', 'button')
      newButton.setAttribute('tabindex', '0')
    }
  })
}

/**
 * Inicializa las interacciones del gráfico circular
 * @param {HTMLElement} component - Elemento del componente
 */
function initChartInteractions(component) {
  const chartSegments = component.querySelectorAll('.admission-requirements_chart-segment')
  const chartLabels = component.querySelectorAll(
    '.admission-requirements_chart-label-percentage, .admission-requirements_chart-label-title'
  )
  const chartLabelBgs = component.querySelectorAll('.admission-requirements_chart-label-bg')

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

  // Hover effects e interactividad para RECTÁNGULOS DE FONDO (nuevos)
  chartLabelBgs.forEach(labelBg => {
    const requirementId = labelBg.dataset.requirement

    labelBg.addEventListener('mouseenter', () => {
      // Destacar segmento correspondiente
      const correspondingSegment = component.querySelector(`[data-requirement="${requirementId}"].admission-requirements_chart-segment`)
      if (correspondingSegment) {
        correspondingSegment.style.filter = 'brightness(1.1)'
      }
    })

    labelBg.addEventListener('mouseleave', () => {
      // Restaurar segmento correspondiente si no está activo
      const correspondingSegment = component.querySelector(`[data-requirement="${requirementId}"].admission-requirements_chart-segment`)
      if (correspondingSegment && !correspondingSegment.classList.contains('is-active')) {
        correspondingSegment.style.filter = 'brightness(1)'
      }
    })

    // Click para activar contenido correspondiente
    labelBg.addEventListener('click', () => {
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
    segment.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        switchContent(component, requirementId)
      }
    })
  })

  // Configurar rectángulos de fondo (interactivos)
  const chartLabelBgs = component.querySelectorAll('.admission-requirements_chart-label-bg')
  chartLabelBgs.forEach(labelBg => {
    const requirementId = labelBg.dataset.requirement

    labelBg.setAttribute('role', 'button')
    labelBg.setAttribute('tabindex', '0')
    labelBg.setAttribute('aria-label', `${requirementId}. Presiona para ver detalles`)

    // Soporte para teclado en rectángulos de fondo
    labelBg.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        switchContent(component, requirementId)
      }
    })
  })

  // Configurar labels de texto SVG (ahora sin tabindex ya que el fondo maneja la interacción)
  const chartLabels = component.querySelectorAll(
    '.admission-requirements_chart-label-percentage, .admission-requirements_chart-label-title'
  )
  chartLabels.forEach(labelText => {
    // Los textos ahora solo son decorativos, el fondo maneja la interacción
    labelText.setAttribute('aria-hidden', 'true')
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
  switchContent: function (requirementId) {
    const component = document.querySelector('[data-component-id="requisitos"]')
    if (component) {
      switchContent(component, requirementId)
    }
  },

  /**
   * Navega a la sección de preguntas frecuentes
   */
  navigateToFAQ: function () {
    const faqSection = document.getElementById('section-eleven')
    if (faqSection) {
      faqSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })

      // Analytics tracking (opcional)
      if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'navigation', {
          event_category: 'requirements',
          event_label: 'navigate_to_faq',
          value: 1
        })
      }
    }
  },

  /**
   * Obtiene el contenido activo
   * @returns {string|null} ID del contenido activo
   */
  getActiveContent: function () {
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
  getRequirementsData: function () {
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
  reinitialize: function () {
    const component = document.querySelector('[data-component-id="requisitos"]')
    if (component) {
      // Limpiar event listeners existentes (básico)
      const newComponent = component.cloneNode(true)
      component.parentNode.replaceChild(newComponent, component)

      // Reinicializar
      initChartInteractions(newComponent)
      initAccessibilityEnhancements(newComponent)
    }
  },

  // ===========================================
  // FUNCIONES DE CONTROL DE EXCLUSIÓN
  // ===========================================

  /**
   * Obtiene la configuración actual de exclusión
   * @returns {Object} Configuración de exclusión de programas
   */
  getExclusionConfig: function () {
    return {
      enabled: PROGRAM_EXCLUSION_CONFIG.enabled,
      programs: [...PROGRAM_EXCLUSION_CONFIG.programs],
      hideMode: PROGRAM_EXCLUSION_CONFIG.hideMode,
      logExclusions: PROGRAM_EXCLUSION_CONFIG.logExclusions
    }
  },

  /**
   * Verifica si un programa está excluido
   * @param {string} programCode - Código del programa a verificar
   * @returns {boolean} true si está excluido
   */
  isProgramExcluded: function (programCode) {
    return isProgramExcluded(programCode)
  },

  /**
   * Agrega un código de programa a la lista de exclusión
   * @param {string} programCode - Código del programa a excluir
   */
  addExcludedProgram: function (programCode) {
    if (!programCode) {
      Logger.warn('Cannot add empty program code to exclusion list')
      return
    }

    const normalizedCode = programCode.trim().toUpperCase()

    if (PROGRAM_EXCLUSION_CONFIG.programs.includes(normalizedCode)) {
      Logger.warn(`Program "${normalizedCode}" is already in exclusion list`)
      return
    }

    PROGRAM_EXCLUSION_CONFIG.programs.push(normalizedCode)
    Logger.info(`Added "${normalizedCode}" to exclusion list`)
    Logger.info(`Current exclusion list: ${PROGRAM_EXCLUSION_CONFIG.programs.join(', ')}`)
  },

  /**
   * Remueve un código de programa de la lista de exclusión
   * @param {string} programCode - Código del programa a remover
   */
  removeExcludedProgram: function (programCode) {
    if (!programCode) {
      Logger.warn('Cannot remove empty program code from exclusion list')
      return
    }

    const normalizedCode = programCode.trim().toUpperCase()
    const index = PROGRAM_EXCLUSION_CONFIG.programs.indexOf(normalizedCode)

    if (index === -1) {
      Logger.warn(`Program "${normalizedCode}" is not in exclusion list`)
      return
    }

    PROGRAM_EXCLUSION_CONFIG.programs.splice(index, 1)
    Logger.info(`Removed "${normalizedCode}" from exclusion list`)
    Logger.info(`Current exclusion list: ${PROGRAM_EXCLUSION_CONFIG.programs.join(', ')}`)
  },

  /**
   * Limpia toda la lista de exclusión
   */
  clearExclusionList: function () {
    const previousCount = PROGRAM_EXCLUSION_CONFIG.programs.length
    PROGRAM_EXCLUSION_CONFIG.programs = []
    Logger.info(`Cleared exclusion list (removed ${previousCount} programs)`)
  },

  /**
   * Activa o desactiva la funcionalidad de exclusión
   * @param {boolean} enabled - true para activar, false para desactivar
   */
  setExclusionEnabled: function (enabled) {
    PROGRAM_EXCLUSION_CONFIG.enabled = !!enabled
    Logger.info(`Program exclusion ${enabled ? 'enabled' : 'disabled'}`)
  },

  /**
   * Cambia el modo de ocultación del componente
   * @param {string} mode - 'display' (ocultar) o 'remove' (eliminar del DOM)
   */
  setHideMode: function (mode) {
    if (mode !== 'display' && mode !== 'remove') {
      Logger.warn(`Invalid hide mode: "${mode}". Use 'display' or 'remove'`)
      return
    }

    PROGRAM_EXCLUSION_CONFIG.hideMode = mode
    Logger.info(`Hide mode set to: ${mode}`)
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
  Logger.debug('updateReactComponent called with data:', requirementsData)

  // Almacenar datos para acceso posterior en caso de timing issues
  if (typeof window !== 'undefined') {
    window.latestRequirementsData = requirementsData
  }

  // Sistema de reintentos con backoff exponencial
  let attempt = 0
  const maxAttempts = 20 // Intentar hasta 20 veces
  const delays = [100, 200, 300, 500, 500, 1000, 1000, 1000, 2000, 2000, 2000, 3000, 3000, 3000, 5000, 5000, 5000, 5000, 5000, 5000] // Total: ~45 segundos

  function tryRender() {
    Logger.debug(`Render attempt ${attempt + 1}/${maxAttempts}`)
    const rendered = renderFullHTML(requirementsData)

    if (!rendered && attempt < maxAttempts - 1) {
      attempt++
      const delay = delays[attempt] || 5000
      Logger.debug(`Retry scheduled in ${delay}ms`)
      setTimeout(tryRender, delay)
    } else if (rendered) {
      Logger.info('Requirements component rendered successfully')
    } else {
      Logger.error('Failed to render requirements after all attempts')
    }
  }

  tryRender()
  Logger.info('Requirements render initiated')
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
  const existingCenter = svg.querySelectorAll(
    '.admission-requirements_chart-center, .admission-requirements_chart-total-label, .admission-requirements_chart-total-value'
  )

  existingSegments.forEach(segment => segment.remove())
  existingLabels.forEach(label => label.remove())
  existingCenter.forEach(element => element.remove())

  // Recrear en el orden correcto: primero segmentos, luego elementos centrales

  // 1. Recrear los segmentos con los nuevos datos (solo válidos)
  let cumulativeAngle = 0

  validRequirements.forEach((requirement, index) => {
    const percentage = requirement.percentage
    const startAngle = cumulativeAngle
    const endAngle = startAngle + percentage * 3.6 // Convert percentage to degrees
    cumulativeAngle = endAngle

    // Crear path del segmento
    const segment = createSVGSegment(startAngle, endAngle, percentage, requirement)
    svg.appendChild(segment)
  })

  // 2. Agregar círculo central encima de los segmentos
  const centerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
  centerCircle.setAttribute('cx', '400')
  centerCircle.setAttribute('cy', '400')
  centerCircle.setAttribute('r', '150') // Reducido de 175 a 150 para anillo más grueso
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
  // Orden: rectángulos primero, luego textos para que el texto esté encima
  cumulativeAngle = 0
  validRequirements.forEach((requirement, index) => {
    const percentage = requirement.percentage
    const startAngle = cumulativeAngle
    const endAngle = startAngle + percentage * 3.6
    cumulativeAngle = endAngle

    // Crear labels del segmento con sus fondos
    const { percentageBg, percentageLabel, titleBg, titleLabel } = createSVGLabels(startAngle, endAngle, requirement)

    // Insertar en orden: fondo primero, texto después
    svg.appendChild(percentageBg)
    svg.appendChild(percentageLabel)
    svg.appendChild(titleBg)
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

  const pathData = [`M ${centerX} ${centerY}`, `L ${x1} ${y1}`, `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`, 'Z'].join(' ')

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

  // === RECTÁNGULO DE FONDO PARA PORCENTAJE ===
  const percentageBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
  percentageBg.setAttribute('x', labelX - 50) // Centrado horizontal
  percentageBg.setAttribute('width', '100') // Ancho del rectángulo
  percentageBg.setAttribute('height', '36') // Altura del rectángulo
  // Ajuste visual: subir 3px más para mejor centrado
  percentageBg.setAttribute('y', labelY - 35) // Centrado visual con el texto
  percentageBg.setAttribute('rx', '8') // Bordes redondeados
  percentageBg.setAttribute('class', 'admission-requirements_chart-label-bg')
  percentageBg.setAttribute('data-requirement', requirement.id)
  percentageBg.style.cursor = 'pointer'

  // === LABEL DE PORCENTAJE ===
  const percentageLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text')
  percentageLabel.setAttribute('x', labelX)
  percentageLabel.setAttribute('y', labelY - 8) // Posición del baseline del texto
  percentageLabel.setAttribute('text-anchor', 'middle')
  percentageLabel.setAttribute('class', 'admission-requirements_chart-label-percentage')
  percentageLabel.setAttribute('data-requirement', requirement.id)
  percentageLabel.textContent = `${requirement.percentage}%`

  // === RECTÁNGULO DE FONDO PARA TÍTULO ===
  // Calcular ancho dinámico basado en longitud del texto
  const titleWidth = requirement.title.length * 11 + 30
  const titleBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
  titleBg.setAttribute('x', labelX - titleWidth / 2) // Centrado horizontal
  titleBg.setAttribute('width', titleWidth.toString())
  titleBg.setAttribute('height', '30') // Altura del rectángulo
  // Ajustar posición vertical considerando el nuevo espaciado
  titleBg.setAttribute('y', labelY - 2) // Centrado visual con el nuevo espaciado (+2px más abajo)
  titleBg.setAttribute('rx', '8') // Bordes redondeados
  titleBg.setAttribute('class', 'admission-requirements_chart-label-bg')
  titleBg.setAttribute('data-requirement', requirement.id)
  titleBg.style.cursor = 'pointer'

  // === LABEL DE TÍTULO ===
  const titleLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text')
  titleLabel.setAttribute('x', labelX)
  titleLabel.setAttribute('y', labelY + 20) // Mayor separación (antes +18, ahora +20 = +2px más)
  titleLabel.setAttribute('text-anchor', 'middle')
  titleLabel.setAttribute('class', 'admission-requirements_chart-label-title')
  titleLabel.setAttribute('data-requirement', requirement.id)
  titleLabel.textContent = requirement.title

  return { percentageBg, percentageLabel, titleBg, titleLabel }
}

function updateContentPanels(component, requirementsData) {
  // Filtrar datos para excluir categorías con 0%
  const validRequirements = requirementsData.filter(requirement => requirement.percentage > 0)

  const contentContainer = component.querySelector('.admission-requirements_content-container')
  if (!contentContainer) return

  // Limpiar solo los paneles existentes, NO todo el contenedor
  // Esto preserva el botón de navegación fijo
  const existingPanels = contentContainer.querySelectorAll('.admission-requirements_content-panel')
  existingPanels.forEach(panel => panel.remove())

  // Crear nuevos paneles (solo válidos) e insertarlos antes del botón de navegación
  const navigationButton = contentContainer.querySelector('.admission-requirements_panel-navigation-fixed')

  validRequirements.forEach((requirement, index) => {
    const panel = createContentPanel(requirement, index === 0, validRequirements.length === 1)
    // Insertar antes del botón de navegación si existe, sino al final
    if (navigationButton) {
      contentContainer.insertBefore(panel, navigationButton)
    } else {
      contentContainer.appendChild(panel)
    }
  })

  // Reinicializar el acordeón después de crear los paneles dinámicamente
  initMobileAccordion(component)
}

function createContentPanel(requirement, isActive = false, isSingleRequirement = false) {
  const panel = document.createElement('div')
  const classes = ['admission-requirements_content-panel']
  if (isActive) classes.push('is-active')
  if (isSingleRequirement) classes.push('single-requirement')

  panel.className = classes.join(' ')
  panel.setAttribute('data-requirement', requirement.id)
  panel.setAttribute('data-content-panel', requirement.id)

  const itemsHTML = requirement.items
    .map(
      item => `
    <li class="admission-requirements_list-item">
      <div class="admission-requirements_item-check">
        <i class="ph ph-check"></i>
      </div>
      <span class="admission-requirements_item-text">
        ${item}
      </span>
    </li>
  `
    )
    .join('')

  // Construir HTML condicionalmente
  let headerHTML = ''
  if (!isSingleRequirement) {
    // Solo mostrar header para múltiples requisitos
    headerHTML = `
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
    `
  }

  panel.innerHTML = `
    ${headerHTML}
    <div class="admission-requirements_panel-content">
      <ul class="admission-requirements_items-list ${requirement.items.length > 5 ? 'has-many-items' : ''}">
        ${itemsHTML}
      </ul>
      ${
        requirement.items.length > 5
          ? `
        <button class="admission-requirements_read-more-toggle"
                aria-expanded="false"
                aria-controls="admission-requirements_items-list-${requirement.id}">
          <span class="toggle-text">Leer más</span>
          <i class="ph ph-plus toggle-icon" aria-hidden="true"></i>
        </button>
      `
          : ''
      }
    </div>
  `

  return panel
}

// ===========================================
// SISTEMA DE ACORDEÓN PARA MÓVIL
// ===========================================
function initMobileAccordion(component) {
  const isMobile = () => window.innerWidth <= 991

  // Remover listeners previos para evitar duplicados
  const existingButtons = component.querySelectorAll('.admission-requirements_read-more-toggle')
  existingButtons.forEach(button => {
    const newButton = button.cloneNode(true)
    button.parentNode.replaceChild(newButton, button)
  })

  function setupAccordionBehavior() {
    const readMoreButtons = component.querySelectorAll('.admission-requirements_read-more-toggle')

    readMoreButtons.forEach(button => {
      button.addEventListener('click', function (e) {
        e.preventDefault()

        const isExpanded = this.getAttribute('aria-expanded') === 'true'
        const listContainer = this.parentElement.querySelector('.admission-requirements_items-list')
        const hiddenItems = listContainer.querySelectorAll('.admission-requirements_list-item:nth-child(n+6)')
        const toggleText = this.querySelector('.toggle-text')
        const toggleIcon = this.querySelector('.toggle-icon')

        if (isExpanded) {
          // Colapsar
          hiddenItems.forEach(item => {
            item.style.display = 'none'
            item.classList.remove('show-all')
          })
          this.setAttribute('aria-expanded', 'false')
          toggleText.textContent = 'Leer más'
          toggleIcon.className = 'ph ph-plus toggle-icon'
        } else {
          // Expandir
          hiddenItems.forEach(item => {
            item.style.display = 'flex'
            item.classList.add('show-all')
          })
          this.setAttribute('aria-expanded', 'true')
          toggleText.textContent = 'Leer menos'
          toggleIcon.className = 'ph ph-minus toggle-icon'
        }
      })
    })
  }

  function handleResize() {
    const allItems = component.querySelectorAll('.admission-requirements_list-item')

    if (!isMobile()) {
      // En desktop, mostrar todos los elementos y limpiar estilos inline
      allItems.forEach(item => {
        item.style.display = ''
        item.classList.remove('show-all')
      })
    } else {
      // En móvil, aplicar lógica de acordeón
      component.querySelectorAll('.admission-requirements_items-list.has-many-items').forEach(list => {
        const hiddenItems = list.querySelectorAll('.admission-requirements_list-item:nth-child(n+6)')
        const readMoreButton = list.parentElement.querySelector('.admission-requirements_read-more-toggle')

        if (readMoreButton && readMoreButton.getAttribute('aria-expanded') !== 'true') {
          hiddenItems.forEach(item => {
            item.style.display = 'none'
          })
        }
      })
    }
  }

  // Configurar eventos
  setupAccordionBehavior()

  // Configurar resize handler (solo una vez)
  if (!component.hasAttribute('data-accordion-initialized')) {
    window.addEventListener('resize', () => handleResize())
    component.setAttribute('data-accordion-initialized', 'true')
  }

  // Aplicar estado inicial
  handleResize()
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
  document.addEventListener('data_load-program', async event => {
    try {
      // Obtener el código de programa del evento
      const programCode = event.detail?.dataProgram?.codPrograma

      if (programCode) {
        // ✅ VERIFICAR SI EL PROGRAMA ESTÁ EN LA LISTA DE EXCLUSIÓN
        if (isProgramExcluded(programCode)) {
          hideRequirementsComponent()
          return // Salir sin llamar API ni renderizar
        }

        // Continuar con el flujo normal si NO está excluido
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

  // Crear el contenedor del ícono (solo para el ícono)
  const iconElement = document.createElement('div')
  iconElement.className = `admission-requirements_single-requirement-display_icon admission-requirements_single-requirement-display_icon--${requirement.color}`

  // Crear el ícono dentro del contenedor de ícono
  const iconI = document.createElement('i')
  iconI.className = requirement.icon
  iconElement.appendChild(iconI)

  // Crear el contenedor de texto separado
  const textContainer = document.createElement('div')
  textContainer.className = 'admission-requirements_single-requirement-display_text-container'

  // Crear el texto de porcentaje dentro del contenedor de texto
  const percentageElement = document.createElement('div')
  percentageElement.className = 'admission-requirements_single-requirement-display_percentage'
  percentageElement.textContent = `${requirement.percentage}%`
  textContainer.appendChild(percentageElement)

  // Crear el título dentro del contenedor de texto
  const titleElement = document.createElement('div')
  titleElement.className = 'admission-requirements_single-requirement-display_title'
  titleElement.textContent = requirement.title
  textContainer.appendChild(titleElement)

  // Ensamblar el display: ícono + texto como hermanos
  singleDisplay.appendChild(iconElement)
  singleDisplay.appendChild(textContainer)

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

// ===========================================
// RENDERIZADO COMPLETO DEL HTML
// ===========================================
function renderFullHTML(requirementsData) {
  Logger.debug('renderFullHTML called with data:', requirementsData)

  // Intentar múltiples selectores para encontrar dónde renderizar
  let container = document.getElementById('admission-requirements_dynamic-content')

  if (!container) {
    Logger.debug('Primary container not found, trying alternative selectors')

    // Intentar diferentes selectores
    const selectors = [
      '[data-component-id="requisitos-pregrado"]',
      '[data-component-id="requisitos"]',
      '.admission-requirements',
      '#requisitos-pregrado',
      '#section-seven' // ID de la sección según info.json
    ]

    let targetElement = null

    for (const selector of selectors) {
      targetElement = document.querySelector(selector)
      Logger.debug(`Trying selector "${selector}":`, targetElement ? 'found' : 'not found')
      if (targetElement) break
    }

    if (!targetElement) {
      const stats = {
        allDivs: document.querySelectorAll('div[data-component-id]').length,
        sections: document.querySelectorAll('section').length
      }
      Logger.error('No suitable container found with any selector. Available elements:', stats)
      return false
    }

    Logger.debug('Target element found:', targetElement)

    // Buscar o crear el contenedor dinámico
    container = targetElement.querySelector('#admission-requirements_dynamic-content')

    if (!container) {
      // Crear el contenedor dinámico
      container = document.createElement('div')
      container.id = 'admission-requirements_dynamic-content'
      container.className = 'admission-requirements_dynamic-content'
      targetElement.appendChild(container)
      Logger.debug('Dynamic container created')
    }
  }

  Logger.debug('Container ready for rendering')

  const validRequirements = requirementsData.filter(req => req.percentage > 0)
  const isSingleRequirement = validRequirements.length === 1
  const baseClass = 'admission-requirements'

  Logger.debug(`Valid requirements: ${validRequirements.length}, Single requirement: ${isSingleRequirement}`)

  // Generar HTML completo
  const html = `
    <div class="${baseClass}_main-content ${isSingleRequirement ? 'single-requirement-layout' : ''}">
      <!-- LEFT COLUMN - CHART OR SINGLE REQUIREMENT -->
      <div class="${baseClass}_chart-container ${validRequirements.length > 1 ? 'multiple-requirements' : ''}">
        ${isSingleRequirement ? renderSingleRequirementHTML(validRequirements[0]) : renderMultipleRequirementsHTML(validRequirements)}
      </div>

      <!-- RIGHT COLUMN - CONTENT PANELS -->
      <div class="${baseClass}_content-container ${validRequirements.length > 1 ? 'multiple-requirements' : ''}">
        ${renderContentPanelsHTML(validRequirements, isSingleRequirement)}

        ${
          validRequirements.length > 1
            ? `
          <!-- BUTTON FOR MULTIPLE REQUIREMENTS -->
          <div class="${baseClass}_panel-navigation-fixed">
            <button class="btn btn-primary btn-solid" data-dmpa-element-id="btn" onclick="document.getElementById('section-eleven')?.scrollIntoView({behavior: 'smooth', block: 'start'})">
              <span class="btn-text">Ver detalles de evaluación</span>
              <span class="btn-icon btn-icon-end">
                <i class="ph ph-arrow-down" aria-hidden="true"></i>
              </span>
            </button>
          </div>
        `
            : ''
        }
      </div>

      ${
        isSingleRequirement
          ? `
        <!-- BUTTON ROW FOR SINGLE REQUIREMENT -->
        <div class="${baseClass}_single-requirement-button-row">
          <button class="btn btn-primary btn-solid" data-dmpa-element-id="btn" onclick="document.getElementById('section-eleven')?.scrollIntoView({behavior: 'smooth', block: 'start'})">
            <span class="btn-text">Ver detalles de evaluación</span>
            <span class="btn-icon btn-icon-end">
              <i class="ph ph-arrow-down" aria-hidden="true"></i>
            </span>
          </button>
        </div>
      `
          : ''
      }
    </div>
  `

  Logger.debug('Setting innerHTML to container')

  // Buscar el loading state (puede estar en el contenedor o en su padre)
  let loadingState = container.querySelector('.admission-requirements_loading-state')

  if (!loadingState) {
    // Si no está dentro del contenedor, buscar en el mismo nivel
    loadingState = container.parentElement?.querySelector('.admission-requirements_loading-state')
  }

  // Renderizar el contenido primero
  container.innerHTML = html
  Logger.debug('HTML content set successfully')

  // Activar animación de fade out del loading state
  if (loadingState) {
    Logger.debug('Hiding loading state with animation')
    loadingState.classList.add('hidden')

    // Remover completamente después de la transición (500ms)
    setTimeout(() => {
      loadingState.remove()
      Logger.debug('Loading state removed from DOM')
    }, 500)
  }

  // Reinicializar interacciones después de renderizar
  // Buscar el componente que contiene el contenedor (subir en el árbol DOM)
  let component =
    container.closest('[data-component-id="requisitos-pregrado"]') ||
    container.closest('[data-component-id="requisitos"]') ||
    container.closest('.admission-requirements') ||
    container.parentElement

  Logger.debug('Component for interactions:', component ? 'found' : 'not found')

  if (component) {
    Logger.debug('Initializing component interactions')

    // Esperar un tick para que el DOM se actualice completamente
    setTimeout(() => {
      try {
        initChartInteractions(component)
        Logger.debug('Chart interactions initialized')
      } catch (error) {
        Logger.error('Error initializing chart interactions:', error)
      }

      try {
        initAccessibilityEnhancements(component)
        Logger.debug('Accessibility enhancements initialized')
      } catch (error) {
        Logger.error('Error initializing accessibility:', error)
      }

      try {
        initMobileAccordion(component)
        Logger.debug('Mobile accordion initialized')
      } catch (error) {
        Logger.error('Error initializing mobile accordion:', error)
      }

      Logger.info('All component interactions initialized successfully')
    }, 50)
  } else {
    Logger.warn('Component not found for interaction initialization')
  }

  return true // Retornar true si tiene éxito
}

function renderSingleRequirementHTML(requirement) {
  return `
    <div class="admission-requirements_single-requirement-display">
      <div class="admission-requirements_single-requirement-display_icon admission-requirements_single-requirement-display_icon--${requirement.color}">
        <i class="${requirement.icon}"></i>
      </div>
      <div class="admission-requirements_single-requirement-display_text-container">
        <div class="admission-requirements_single-requirement-display_percentage">${requirement.percentage}%</div>
        <div class="admission-requirements_single-requirement-display_title">${requirement.title}</div>
      </div>
    </div>
  `
}

function renderMultipleRequirementsHTML(requirements) {
  let cumulativeAngle = 0
  const segments = requirements
    .map(req => {
      const startAngle = cumulativeAngle
      const endAngle = startAngle + req.percentage * 3.6
      cumulativeAngle = endAngle

      return createSVGSegmentHTML(startAngle, endAngle, req)
    })
    .join('')

  const labels = requirements
    .map((req, index) => {
      let startAngle = 0
      for (let i = 0; i < index; i++) {
        startAngle += requirements[i].percentage * 3.6
      }
      const midAngle = startAngle + (req.percentage * 3.6) / 2 - 90
      const midAngleRad = midAngle * (Math.PI / 180)
      const labelX = 400 + 260 * Math.cos(midAngleRad)
      const labelY = 400 + 260 * Math.sin(midAngleRad)

      // Calcular ancho dinámico del título
      const titleWidth = req.title.length * 11 + 30

      return `
      <!-- Rectángulo de fondo para porcentaje (centrado visual con texto) -->
      <rect x="${labelX - 50}" y="${labelY - 35}" width="100" height="36" rx="8"
            class="admission-requirements_chart-label-bg"
            data-requirement="${req.id}" style="cursor: pointer;" />
      <!-- Texto de porcentaje -->
      <text x="${labelX}" y="${labelY - 8}" text-anchor="middle"
            class="admission-requirements_chart-label-percentage"
            data-requirement="${req.id}">${req.percentage}%</text>

      <!-- Rectángulo de fondo para título (centrado visual con texto) -->
      <rect x="${labelX - titleWidth / 2}" y="${labelY - 2}" width="${titleWidth}" height="30" rx="8"
            class="admission-requirements_chart-label-bg"
            data-requirement="${req.id}" style="cursor: pointer;" />
      <!-- Texto de título -->
      <text x="${labelX}" y="${labelY + 20}" text-anchor="middle"
            class="admission-requirements_chart-label-title"
            data-requirement="${req.id}">${req.title}</text>
    `
    })
    .join('')

  return `
    <div class="admission-requirements_chart-wrapper">
      <svg class="admission-requirements_chart" viewBox="0 0 800 800" width="800" height="800">
        ${segments}
        <circle cx="400" cy="400" r="150" class="admission-requirements_chart-center" />
        <text x="400" y="385" text-anchor="middle" class="admission-requirements_chart-total-label">Total</text>
        <text x="400" y="425" text-anchor="middle" class="admission-requirements_chart-total-value">100%</text>
        ${labels}
      </svg>
    </div>
  `
}

function createSVGSegmentHTML(startAngle, endAngle, requirement) {
  const radius = 350
  const centerX = 400
  const centerY = 400

  const startAngleRad = (startAngle - 90) * (Math.PI / 180)
  const endAngleRad = (endAngle - 90) * (Math.PI / 180)

  const x1 = centerX + radius * Math.cos(startAngleRad)
  const y1 = centerY + radius * Math.sin(startAngleRad)
  const x2 = centerX + radius * Math.cos(endAngleRad)
  const y2 = centerY + radius * Math.sin(endAngleRad)

  const largeArcFlag = requirement.percentage > 50 ? 1 : 0
  const pathData = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`

  return `<path d="${pathData}" class="admission-requirements_chart-segment admission-requirements_chart-segment--${requirement.color}" data-requirement="${requirement.id}" data-percentage="${requirement.percentage}" />`
}

function renderContentPanelsHTML(requirements, isSingleRequirement) {
  return requirements
    .map(
      (req, index) => `
    <div class="admission-requirements_content-panel ${index === 0 ? 'is-active' : ''} ${isSingleRequirement ? 'single-requirement' : ''}" data-requirement="${req.id}" data-content-panel="${req.id}">
      ${
        !isSingleRequirement
          ? `
        <div class="admission-requirements_panel-header">
          <div class="admission-requirements_panel-icon admission-requirements_panel-icon--${req.color}">
            <i class="${req.icon}"></i>
          </div>
          <div class="admission-requirements_panel-title">
            <h3 class="admission-requirements_panel-main-title">${req.title}</h3>
            <p class="admission-requirements_panel-subtitle">${req.percentage}% del proceso de evaluación</p>
          </div>
        </div>
      `
          : ''
      }

      <div class="admission-requirements_panel-content">
        <ul class="admission-requirements_items-list">
          ${req.items
            .map(
              item => `
            <li class="admission-requirements_list-item">
              <div class="admission-requirements_item-check">
                <i class="ph ph-check"></i>
              </div>
              <span class="admission-requirements_item-text">${item}</span>
            </li>
          `
            )
            .join('')}
        </ul>
      </div>
    </div>
  `
    )
    .join('')
}

// Exponer globalmente para compatibilidad con Liferay
if (typeof window !== 'undefined') {
  window.initAdmissionRequirements = initAdmissionRequirements
  window.initRequirementsSystem = initRequirementsSystem
  window.renderFullHTML = renderFullHTML

  // Exponer Logger para control dinámico de logs
  window.RequirementsLogger = Logger
}

// Exportar función principal siguiendo el patrón estándar
export default initRequirementsSystem
