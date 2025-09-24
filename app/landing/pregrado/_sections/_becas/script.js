// Funcionalidad de tabs para la sección de becas + SISTEMA DE TEXTO ENRIQUECIDO
// Compatible con Liferay DXP - JavaScript vanilla

// ==========================================
// SISTEMA DE TEXTO ENRIQUECIDO PARA BECAS
// ==========================================
const ScholarshipsRichTextSystem = {
  config: {
    richContentSelector: '.scholarships-rich-content',
    contentTextSelector: '.scholarships__content-text'
  },

  // Procesar contenido enriquecido desde CMS o datos locales
  processRichContent() {
    const richContentElements = document.querySelectorAll(this.config.richContentSelector)

    if (richContentElements.length === 0) {
      console.log('[ScholarshipsRichText] No se encontraron elementos de contenido enriquecido')
      return
    }

    console.log(`[ScholarshipsRichText] Procesando ${richContentElements.length} elementos`)

    richContentElements.forEach(element => {
      let content = element.getAttribute('data-raw-content')

      if (content) {
        content = this.decodeHtmlEntities(content)

        // Auto-detección de formato
        if (!content.includes('<') && !content.includes('&lt;')) {
          content = content.replace(/\n\n/g, '</p><p>')
          content = content.replace(/\n/g, '<br>')
          content = '<p>' + content + '</p>'
        }

        element.innerHTML = content
        console.log(`[ScholarshipsRichText] Elemento procesado: ${element.id || 'sin-id'}`)
      }
    })
  },

  // Decodificador HTML avanzado (basado en el sistema FAQ)
  decodeHtmlEntities(text) {
    const textarea = document.createElement('textarea')
    let decoded = text
    let previousDecoded = ''

    // Hasta 3 intentos de decodificación recursiva
    for (let i = 0; i < 3 && decoded !== previousDecoded; i++) {
      previousDecoded = decoded
      textarea.innerHTML = decoded
      decoded = textarea.value
    }

    return decoded
  }
}

// Función de inicialización con reintentos para asegurar que el componente esté montado
const initScholarshipsTabs = () => {
  const tryInitialize = (attempts = 0) => {
    const tabsContainers = document.querySelectorAll('.scholarships__tabs-container')

    if (tabsContainers.length === 0 && attempts < 20) {
      // Si no encuentra los elementos, reintentar en 100ms
      setTimeout(() => tryInitialize(attempts + 1), 100)
      return
    }

    // ✅ PROCESAR TEXTO ENRIQUECIDO ANTES DE INICIALIZAR TABS
    ScholarshipsRichTextSystem.processRichContent()

    tabsContainers.forEach(container => {
      const tabButtons = container.querySelectorAll('.scholarships__tab-button')
      const tabPanels = container.querySelectorAll('.scholarships__tab-panel')

      // Inicializar tabs
      if (tabButtons.length > 0 && tabPanels.length > 0) {
        // Activar primera tab por defecto
        activateTab(tabButtons[0], tabPanels[0])

        // Agregar event listeners a los botones
        tabButtons.forEach((button, index) => {
          button.addEventListener('click', () => {
            activateTab(tabButtons[index], tabPanels[index])
            updateTabStates(tabButtons, tabPanels, index)
          })

          // Soporte para navegación con teclado
          button.addEventListener('keydown', e => {
            handleTabKeydown(e, tabButtons, tabPanels, index)
          })
        })
      }
    })
  }

  tryInitialize()
}

const activateTab = (activeButton, activePanel) => {
  if (!activeButton || !activePanel) return

  // Obtener contenedor padre
  const container = activeButton.closest('.scholarships__tabs-container')
  if (!container) return

  // Desactivar todas las tabs
  const allButtons = container.querySelectorAll('.scholarships__tab-button')
  const allPanels = container.querySelectorAll('.scholarships__tab-panel')

  // Actualizar estados de botones
  allButtons.forEach(button => {
    const isActive = button === activeButton
    button.setAttribute('aria-selected', isActive.toString())
    button.setAttribute('tabindex', isActive ? '0' : '-1')

    // Agregar/remover clase active para el nuevo estilo
    if (isActive) {
      button.classList.add('active')
    } else {
      button.classList.remove('active')
    }
  })

  // Ocultar todos los paneles primero
  allPanels.forEach(panel => {
    panel.classList.add('hidden')
    panel.setAttribute('aria-hidden', 'true')
  })

  // Mostrar panel activo con animación (delay de 50ms como perfiles)
  if (activePanel) {
    setTimeout(() => {
      activePanel.classList.remove('hidden')
      activePanel.setAttribute('aria-hidden', 'false')

      // Trigger reflow para asegurar que la animación funcione
      activePanel.offsetHeight
    }, 50)
  }
}

const updateTabStates = (buttons, panels, activeIndex) => {
  buttons.forEach((button, index) => {
    if (index === activeIndex) {
      button.setAttribute('aria-selected', 'true')
      button.setAttribute('tabindex', '0')
      button.classList.add('active')
      panels[index]?.classList.remove('hidden')
      panels[index]?.setAttribute('aria-hidden', 'false')
    } else {
      button.setAttribute('aria-selected', 'false')
      button.setAttribute('tabindex', '-1')
      button.classList.remove('active')
      panels[index]?.classList.add('hidden')
      panels[index]?.setAttribute('aria-hidden', 'true')
    }
  })
}

const handleTabKeydown = (event, buttons, panels, currentIndex) => {
  let newIndex = currentIndex

  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault()
      newIndex = currentIndex > 0 ? currentIndex - 1 : buttons.length - 1
      break
    case 'ArrowRight':
      event.preventDefault()
      newIndex = currentIndex < buttons.length - 1 ? currentIndex + 1 : 0
      break
    case 'Home':
      event.preventDefault()
      newIndex = 0
      break
    case 'End':
      event.preventDefault()
      newIndex = buttons.length - 1
      break
    case 'Enter':
    case ' ':
      event.preventDefault()
      activateTab(buttons[currentIndex], panels[currentIndex])
      return
    default:
      return
  }

  // Cambiar foco y activar nueva tab
  buttons[newIndex].focus()
  activateTab(buttons[newIndex], panels[newIndex])
  updateTabStates(buttons, panels, newIndex)
}

// Ejecutar cuando el DOM esté listo y también observar cambios
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScholarshipsTabs)
} else {
  initScholarshipsTabs()
}

// MutationObserver para detectar cuando se agrega el componente dinámicamente
if (typeof MutationObserver !== 'undefined') {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        const addedNodes = Array.from(mutation.addedNodes)
        addedNodes.forEach(node => {
          if (
            node.nodeType === 1 && // Element node
            (node.classList?.contains('scholarships_container') || node.querySelector?.('.scholarships__tabs-container'))
          ) {
            initScholarshipsTabs()
          }
        })
      }
    })
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true
  })
}

// ==========================================
// SISTEMA PRINCIPAL DE BECAS
// ==========================================
const ScholarshipsSystem = {
  init() {
    const systems = {
      richText: ScholarshipsRichTextSystem.processRichContent(),
      tabs: initScholarshipsTabs()
    }

    console.log('[ScholarshipsSystem] Sistemas inicializados:', systems)
    return systems
  }
}

// ==========================================
// INICIALIZACIÓN Y EXPORTS
// ==========================================

// Inicializar sistema completo
const initializeScholarships = () => {
  // Exponer para debugging en desarrollo
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    window.ScholarshipsRichTextSystem = ScholarshipsRichTextSystem
    window.ScholarshipsSystem = ScholarshipsSystem
  }

  // Inicializar sistemas
  ScholarshipsSystem.init()
}

// Export por defecto para compatibilidad
export default initializeScholarships

// También ejecutar inmediatamente en caso de compilación IIFE
if (typeof window !== 'undefined') {
  initializeScholarships()
}
