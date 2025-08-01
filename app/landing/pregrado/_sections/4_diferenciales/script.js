// ===========================================
// SISTEMA DE ACORDEÓN RESPONSIVO - DIFERENCIALES
// ===========================================

const AccordionSystem = {
  config: {
    mobileBreakpoint: 1024,
    buttonSelector: '[data-accordion-target]',
    contentSelector: '.why-javeriana__accordion-content',
    itemSelector: '.why-javeriana__accordion-item',
    toggleSelector: '.why-javeriana__accordion-toggle',
    iconSelector: '.toggle-icon',
    textSelector: '.toggle-text',
    hiddenClass: 'hidden',
    expandedAttribute: 'aria-expanded',
    animationDuration: 300
  },

  init() {
    Logger.debug('Inicializando sistema de acordeón responsivo...')

    // Verificar que existe el DOM
    const accordionItems = document.querySelectorAll(this.config.itemSelector)

    if (accordionItems.length === 0) {
      Logger.warning('No se encontraron elementos del acordeón')
      return false
    }

    // Configurar comportamiento inicial
    this.setupAccordionBehavior()

    // Configurar eventos
    this.attachEventListeners()

    // Configurar responsive listener
    this.setupResponsiveListener()

    Logger.success(`Acordeón inicializado: ${accordionItems.length} items`)
    return true
  },

  isMobileView() {
    return window.innerWidth < this.config.mobileBreakpoint
  },

  setupAccordionBehavior() {
    const buttons = document.querySelectorAll(this.config.buttonSelector)

    buttons.forEach(button => {
      const targetId = button.getAttribute('data-accordion-target')
      const content = document.querySelector(targetId)

      if (!content) {
        Logger.warning(`Contenido del acordeón no encontrado: ${targetId}`)
        return
      }

      if (this.isMobileView()) {
        // Móvil: ocultar contenido, mostrar botones
        content.classList.add(this.config.hiddenClass)
        button.style.display = 'flex'
        this.resetButtonState(button)
      } else {
        // Desktop: mostrar contenido, ocultar botones
        content.classList.remove(this.config.hiddenClass)
        button.style.display = 'none'
      }
    })
  },

  resetButtonState(button) {
    const icon = button.querySelector(this.config.iconSelector)
    const text = button.querySelector(this.config.textSelector)

    if (text) text.textContent = 'Leer Más'
    if (icon) {
      icon.classList.remove('ph-minus')
      icon.classList.add('ph-plus')
    }

    button.setAttribute(this.config.expandedAttribute, 'false')
  },

  toggleAccordion(button) {
    const targetId = button.getAttribute('data-accordion-target')
    const content = document.querySelector(targetId)

    if (!content) {
      Logger.error(`Contenido no encontrado: ${targetId}`)
      return
    }

    const isHidden = content.classList.contains(this.config.hiddenClass)
    const icon = button.querySelector(this.config.iconSelector)
    const text = button.querySelector(this.config.textSelector)

    // Alternar visibilidad del contenido
    if (isHidden) {
      // Abriendo
      this.openAccordionItem(content, button, icon, text)
    } else {
      // Cerrando
      this.closeAccordionItem(content, button, icon, text)
    }
  },

  openAccordionItem(content, button, icon, text) {
    // Animación de entrada suave
    content.style.opacity = '0'
    content.style.transform = 'translateY(-10px)'
    content.classList.remove(this.config.hiddenClass)

    // Actualizar estado del botón
    if (text) text.textContent = 'Leer Menos'
    if (icon) {
      icon.classList.remove('ph-plus')
      icon.classList.add('ph-minus')
    }
    button.setAttribute(this.config.expandedAttribute, 'true')

    // Animar entrada
    TimingUtils.delay(() => {
      content.style.transition = `opacity ${this.config.animationDuration}ms ease, transform ${this.config.animationDuration}ms ease`
      content.style.opacity = '1'
      content.style.transform = 'translateY(0)'
    }, 10)

    // Limpiar estilos después de la animación
    TimingUtils.delay(() => {
      content.style.transition = ''
      content.style.transform = ''
      content.style.opacity = ''
    }, this.config.animationDuration + 50)
  },

  closeAccordionItem(content, button, icon, text) {
    // Actualizar estado del botón
    if (text) text.textContent = 'Leer Más'
    if (icon) {
      icon.classList.remove('ph-minus')
      icon.classList.add('ph-plus')
    }
    button.setAttribute(this.config.expandedAttribute, 'false')

    // Animar salida
    content.style.transition = `opacity ${this.config.animationDuration}ms ease, transform ${this.config.animationDuration}ms ease`
    content.style.opacity = '0'
    content.style.transform = 'translateY(-10px)'

    // Ocultar después de la animación
    TimingUtils.delay(() => {
      content.classList.add(this.config.hiddenClass)
      content.style.transition = ''
      content.style.transform = ''
      content.style.opacity = ''
    }, this.config.animationDuration)
  },

  attachEventListeners() {
    // Limpiar eventos existentes clonando botones
    const buttons = document.querySelectorAll(this.config.buttonSelector)

    buttons.forEach(button => {
      // Clonar para remover eventos anteriores
      const newButton = button.cloneNode(true)
      if (button.parentNode) {
        button.parentNode.replaceChild(newButton, button)
      }
    })

    // Agregar nuevos eventos
    const newButtons = document.querySelectorAll(this.config.buttonSelector)

    newButtons.forEach(button => {
      EventManager.add(button, 'click', e => {
        e.preventDefault()

        // Solo funcionar en vista móvil
        if (!this.isMobileView()) return

        this.toggleAccordion(button)
      })

      // Accesibilidad con teclado
      EventManager.add(button, 'keydown', e => {
        if ((e.key === 'Enter' || e.key === ' ') && this.isMobileView()) {
          e.preventDefault()
          this.toggleAccordion(button)
        }
      })
    })
  },

  setupResponsiveListener() {
    let resizeTimeout

    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = TimingUtils.delay(() => {
        this.setupAccordionBehavior()
      }, 150)
    }

    EventManager.add(window, 'resize', handleResize)
  }
}

// ===========================================
// INICIALIZACIÓN PRINCIPAL
// ===========================================
const DiferencialesSystem = {
  init() {
    const systems = {
      accordion: AccordionSystem.init()
    }

    const activeSystems = Object.entries(systems)
      .filter(([_, isActive]) => isActive)
      .map(([name]) => name)

    return systems
  }
}

// ===========================================
// AUTO-INICIALIZACIÓN
// ===========================================
export default () => {
  if (typeof DOMUtils !== 'undefined' && DOMUtils.isReady) {
    DOMUtils.isReady(() => {
      DiferencialesSystem.init()
    })
  } else {
    // Fallback si no hay utilidades DOM disponibles
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        DiferencialesSystem.init()
      })
    } else {
      DiferencialesSystem.init()
    }
  }

  // Exponer para debugging
  if (typeof window !== 'undefined') {
    window.AccordionSystem = AccordionSystem
    window.DiferencialesSystem = DiferencialesSystem
  }
}
