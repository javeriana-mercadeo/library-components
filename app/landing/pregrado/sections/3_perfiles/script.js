// ===========================================
// SISTEMA DE ACORDEÓN - PERFILES
// ===========================================

const AccordionSystem = {
  config: {
    buttonSelector: '.program-profile__accordion-button',
    contentSelector: '.program-profile__content-item',
    activeClass: 'active',
    hiddenClass: 'hidden',
    animationDuration: 300
  },

  init() {
    Logger.debug('Inicializando sistema de acordeón...')

    const buttons = document.querySelectorAll(this.config.buttonSelector)
    const contents = document.querySelectorAll(this.config.contentSelector)

    if (buttons.length === 0 || contents.length === 0) {
      Logger.warning('No se encontraron elementos del acordeón')
      return false
    }

    // Configurar eventos para cada botón
    buttons.forEach(button => {
      this.setupButtonEvents(button, contents, buttons)
    })

    // Configurar estado inicial
    this.setInitialState(buttons, contents)

    Logger.success(`Acordeón inicializado: ${buttons.length} botones, ${contents.length} contenidos`)
    return true
  },

  setupButtonEvents(button, contents, buttons) {
    EventManager.add(button, 'click', e => {
      e.preventDefault()
      this.handleButtonClick(button, contents, buttons)
    })

    // Accesibilidad con teclado
    EventManager.add(button, 'keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        this.handleButtonClick(button, contents, buttons)
      }
    })
  },

  handleButtonClick(clickedButton, contents, buttons) {
    const targetContentId = clickedButton.getAttribute('data-content')
    const targetContent = document.getElementById(targetContentId)

    if (!targetContent) {
      Logger.error(`Contenido no encontrado: ${targetContentId}`)
      return
    }

    // Si ya está activo, no hacer nada
    if (clickedButton.classList.contains(this.config.activeClass)) {
      Logger.debug('Tab ya está activo')
      return
    }

    // Desactivar todos los botones y ocultar contenidos
    this.deactivateAll(buttons, contents)

    // Activar el botón clickeado
    this.activateButton(clickedButton)

    // Mostrar el contenido correspondiente con animación
    this.showContent(targetContent)

    Logger.debug(`Tab activado: ${targetContentId}`)
  },

  deactivateAll(buttons, contents) {
    buttons.forEach(btn => {
      btn.classList.remove(this.config.activeClass)
      btn.setAttribute('aria-selected', 'false')
    })

    contents.forEach(content => {
      content.classList.add(this.config.hiddenClass)
      content.setAttribute('aria-hidden', 'true')
    })
  },

  activateButton(button) {
    button.classList.add(this.config.activeClass)
    button.setAttribute('aria-selected', 'true')
  },

  showContent(content) {
    // Animación de entrada suave
    content.style.opacity = '0'
    content.style.transform = 'translateY(20px)'
    content.classList.remove(this.config.hiddenClass)
    content.setAttribute('aria-hidden', 'false')

    // Animar entrada
    TimingUtils.delay(() => {
      content.style.transition = `opacity ${this.config.animationDuration}ms ease, transform ${this.config.animationDuration}ms ease`
      content.style.opacity = '1'
      content.style.transform = 'translateY(0)'
    }, 10)

    // Limpiar estilos de transición después de la animación
    TimingUtils.delay(() => {
      content.style.transition = ''
      content.style.transform = ''
      content.style.opacity = ''
    }, this.config.animationDuration + 50)
  },

  setInitialState(buttons, contents) {
    // Asegurar que el primer botón esté activo por defecto
    if (buttons.length > 0) {
      const firstButton = buttons[0]
      const firstContentId = firstButton.getAttribute('data-content')
      const firstContent = document.getElementById(firstContentId)

      if (firstContent) {
        this.deactivateAll(buttons, contents)
        this.activateButton(firstButton)
        firstContent.classList.remove(this.config.hiddenClass)
        firstContent.setAttribute('aria-hidden', 'false')
      }
    }
  }
}

// ===========================================
// INICIALIZACIÓN PRINCIPAL
// ===========================================
const PerfilesSystem = {
  init() {
    Logger.debug('🚀 Inicializando sistema de perfiles...')

    const systems = {
      accordion: AccordionSystem.init()
    }

    const activeSystems = Object.entries(systems)
      .filter(([_, isActive]) => isActive)
      .map(([name]) => name)

    Logger.success(`✅ Perfiles iniciado - ${activeSystems.length} sistemas activos: ${activeSystems.join(', ')}`)
    return systems
  }
}

// ===========================================
// AUTO-INICIALIZACIÓN
// ===========================================
export default () => {
  DOMHelpers.isReady(() => {
    PerfilesSystem.init()
  })

  // Exponer para debugging
  if (typeof window !== 'undefined') {
    window.AccordionSystem = AccordionSystem
    window.PerfilesSystem = PerfilesSystem
  }
}
