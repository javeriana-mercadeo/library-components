export default () => {
  const initializeProfileTabs = () => {
    // Buscar todos los componentes de perfiles en la página
    const profileComponents = document.querySelectorAll('.program-profile')

    if (!profileComponents.length) {
      return
    }

    profileComponents.forEach((component, index) => {
      const tabButtons = component.querySelectorAll('.program-profile__tab-button')
      const tabPanels = component.querySelectorAll('.program-profile__tab-panel')

      if (!tabButtons.length || !tabPanels.length) {
        return
      }

      // Limpiar eventos existentes si ya fueron inicializados
      tabButtons.forEach(button => {
        if (button.hasAttribute('data-tabs-initialized')) return
        button.setAttribute('data-tabs-initialized', 'true')
      })

      // Configurar estado inicial - mostrar primera tab
      setActiveTab(component, 0)

      // Agregar eventos a cada botón
      tabButtons.forEach((button, buttonIndex) => {
        button.addEventListener('click', function (event) {
          event.preventDefault()
          handleTabClick(component, buttonIndex)
        })

        // Soporte para navegación con teclado
        button.addEventListener('keydown', function (event) {
          handleTabKeydown(event, component, buttonIndex)
        })
      })
    })
  }

  const handleTabClick = (component, clickedIndex) => {
    const tabButtons = component.querySelectorAll('.program-profile__tab-button')
    const clickedButton = tabButtons[clickedIndex]

    // Solo proceder si la tab clickeada no está ya activa
    if (!clickedButton.classList.contains('active')) {
      setActiveTab(component, clickedIndex)

      // Anunciar cambio para lectores de pantalla
      announceTabChange(clickedButton.textContent)
    }
  }

  const handleTabKeydown = (event, component, currentIndex) => {
    const tabButtons = component.querySelectorAll('.program-profile__tab-button')
    let newIndex = currentIndex

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault()
        newIndex = currentIndex > 0 ? currentIndex - 1 : tabButtons.length - 1
        break

      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault()
        newIndex = currentIndex < tabButtons.length - 1 ? currentIndex + 1 : 0
        break

      case 'Home':
        event.preventDefault()
        newIndex = 0
        break

      case 'End':
        event.preventDefault()
        newIndex = tabButtons.length - 1
        break

      default:
        return
    }

    // Activar nueva tab y enfocarla
    tabButtons[newIndex].focus()
    setActiveTab(component, newIndex)
    announceTabChange(tabButtons[newIndex].textContent)
  }

  const setActiveTab = (component, activeIndex) => {
    const tabButtons = component.querySelectorAll('.program-profile__tab-button')
    const tabPanels = component.querySelectorAll('.program-profile__tab-panel')

    // Actualizar estados de botones
    tabButtons.forEach((button, index) => {
      const isActive = index === activeIndex

      // Actualizar clases CSS
      button.classList.toggle('active', isActive)

      // Actualizar atributos ARIA
      button.setAttribute('aria-selected', isActive.toString())
      button.setAttribute('tabindex', isActive ? '0' : '-1')
    })

    // Ocultar todos los paneles primero
    tabPanels.forEach(panel => {
      panel.classList.add('hidden')
      panel.setAttribute('aria-hidden', 'true')
    })

    // Mostrar panel activo con animación
    const activePanel = tabPanels[activeIndex]
    if (activePanel) {
      // Pequeño delay para permitir que se complete la ocultación
      setTimeout(() => {
        activePanel.classList.remove('hidden')
        activePanel.setAttribute('aria-hidden', 'false')

        // Trigger reflow para asegurar que la animación funcione
        activePanel.offsetHeight
      }, 50)
    }
  }

  const announceTabChange = tabName => {
    // Crear anuncio para lectores de pantalla
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', 'polite')
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = `Mostrando ${tabName}`

    document.body.appendChild(announcement)

    // Remover el anuncio después de un momento
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement)
      }
    }, 1000)
  }

  const checkAndInit = () => {
    if (typeof window !== 'undefined' && document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeProfileTabs)
    } else {
      initializeProfileTabs()
    }
  }

  // API pública para controlar las tabs programáticamente
  if (!window.ProfileTabs) {
    window.ProfileTabs = {
      switchTo: function (componentSelector, tabId) {
        const component = document.querySelector(componentSelector)
        if (!component) {
          return false
        }

        const targetButton = component.querySelector(`button[data-tabs-target="#${tabId}-panel"]`)
        if (!targetButton) {
          return false
        }

        const tabButtons = component.querySelectorAll('.program-profile__tab-button')
        const targetIndex = Array.from(tabButtons).indexOf(targetButton)

        if (targetIndex !== -1) {
          setActiveTab(component, targetIndex)
          return true
        }

        return false
      },

      getCurrentTab: function (componentSelector) {
        const component = document.querySelector(componentSelector)
        if (!component) {
          return null
        }

        const activeButton = component.querySelector('.program-profile__tab-button.active')
        if (!activeButton) return null

        const targetId = activeButton.getAttribute('data-tabs-target')
        return targetId ? targetId.replace('#', '').replace('-panel', '') : null
      },

      reinitialize: function () {
        initializeProfileTabs()
      }
    }
  }

  // Inicializar
  checkAndInit()
}
