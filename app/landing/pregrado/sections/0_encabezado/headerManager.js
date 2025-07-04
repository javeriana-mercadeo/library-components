// ===========================================
// HEADER MANAGER - Gestión del Header
// ===========================================

// ███████████████████████████████████████████████████████████████████████████████
// █                         SECCIÓN: MENÚ MÓVIL                               █
// ███████████████████████████████████████████████████████████████████████████████

const MobileMenu = {
  init() {
    // Verificar que las utilidades globales estén disponibles
    if (typeof window === 'undefined' || !window.DOMHelpers || !window.Logger || !window.EventManager) {
      console.warn('⚠️ Utilidades globales no disponibles para HeaderManager')
      return false
    }

    Logger.debug('Buscando elementos del menú móvil...')
    
    // Buscar elementos igual que el modal
    this.mobileMenu = DOMHelpers.findElement('#mobile-menu')
    this.menuOverlay = DOMHelpers.findElement('#menu-overlay')  
    this.menuIcon = DOMHelpers.findElement('#menu-icon')
    this.triggers = DOMHelpers.findElements('[data-menu-target="mobile-menu"]')
    
    // Fallback para el trigger si no usa data-attribute
    if (this.triggers.length === 0) {
      const fallbackTrigger = DOMHelpers.findElement('#menu-toggle')
      if (fallbackTrigger) {
        this.triggers = [fallbackTrigger]
      }
    }

    Logger.debug('Elementos encontrados:', {
      triggers: this.triggers.length,
      mobileMenu: !!this.mobileMenu,
      menuOverlay: !!this.menuOverlay,
      menuIcon: !!this.menuIcon
    })

    if (this.triggers.length === 0 || !this.mobileMenu) {
      Logger.warning('Elementos básicos del menú móvil no encontrados')
      return false
    }

    this.setupEventListeners()
    this.setupKeyboardNavigation()
    this.setupLinkHandlers()

    Logger.success('Menú móvil inicializado')
    return true
  },

  setupEventListeners() {
    Logger.debug('Configurando eventos del menú móvil...')
    
    // Configurar triggers (igual que el modal)
    this.triggers.forEach(trigger => {
      EventManager.add(trigger, 'click', e => {
        e.preventDefault()
        Logger.debug('Click en trigger del menú móvil detectado')
        
        const isOpen = this.mobileMenu.classList.contains('show')
        if (isOpen) {
          this.close()
        } else {
          this.open()
        }
      })
    })

    // Configurar overlay
    if (this.menuOverlay) {
      EventManager.add(this.menuOverlay, 'click', e => {
        if (e.target === this.menuOverlay && !e.defaultPrevented) {
          e.preventDefault()
          this.close()
        }
      })
    }

    // Prevenir que clicks dentro del menú lo cierren
    EventManager.add(this.mobileMenu, 'click', e => {
      e.stopPropagation()
    })

    Logger.debug('Eventos configurados exitosamente')
  },

  setupKeyboardNavigation() {
    EventManager.add(document, 'keydown', (e) => {
      if (e.key === 'Escape' && this.mobileMenu.classList.contains('show')) {
        this.close()
      }
    })
  },

  setupLinkHandlers() {
    const menuLinks = DOMHelpers.findElements('a', this.mobileMenu)
    menuLinks.forEach(link => {
      EventManager.add(link, 'click', () => {
        this.close()
      })
    })
  },

  open() {
    Logger.debug('Abriendo menú móvil...')

    // Paso 1: Aplicar 'show' inmediatamente (igual que el modal)
    DOMHelpers.toggleClasses(this.mobileMenu, ['show'], true)
    DOMHelpers.toggleClasses(document.body, ['menu-open'], true)
    
    if (this.menuOverlay) {
      DOMHelpers.toggleClasses(this.menuOverlay, ['active'], true)
    }

    // Paso 2: Aplicar 'active' con un pequeño delay (igual que el modal)
    TimingUtils.delay(() => {
      DOMHelpers.toggleClasses(this.mobileMenu, ['active'], true)
      
      if (this.menuIcon) {
        DOMHelpers.toggleClasses(this.menuIcon, ['active'], true)
      }
      
      Logger.debug('Menú móvil abierto - clases aplicadas')
      Logger.debug('Clases del menú:', this.mobileMenu.classList.toString())
    }, 10)
  },

  close() {
    Logger.debug('Cerrando menú móvil...')

    // Paso 1: Quitar clases de body y overlay
    DOMHelpers.toggleClasses(document.body, ['menu-open'], false)
    
    if (this.menuIcon) {
      DOMHelpers.toggleClasses(this.menuIcon, ['active'], false)
    }

    // Paso 2: Quitar 'active' inmediatamente
    DOMHelpers.toggleClasses(this.mobileMenu, ['active'], false)

    // Paso 3: Quitar 'show' y overlay con delay (igual que el modal)
    TimingUtils.delay(() => {
      DOMHelpers.toggleClasses(this.mobileMenu, ['show'], false)
      
      if (this.menuOverlay) {
        DOMHelpers.toggleClasses(this.menuOverlay, ['active'], false)
      }
      
      Logger.debug('Menú móvil cerrado - clases removidas')
      Logger.debug('Clases del menú:', this.mobileMenu.classList.toString())
    }, 300)
  },

  // Modo básico sin utilidades globales
  initBasicMode() {
    console.log('🔧 Inicializando menú móvil en modo básico...')
    
    // Buscar elementos básicos
    const menuToggle = document.querySelector('#menu-toggle') || 
                      document.querySelector('button.header__menu-toggle') ||
                      document.querySelector('[aria-label="Abrir menú de navegación"]')
    
    const mobileMenu = document.querySelector('#mobile-menu') || 
                      document.querySelector('.header__mobile-menu')
                      
    const menuOverlay = document.querySelector('#menu-overlay') || 
                       document.querySelector('.header__overlay')
                       
    const menuIcon = document.querySelector('#menu-icon') || 
                    document.querySelector('.menu-icon')

    console.log('🔍 Elementos encontrados:', {
      menuToggle: !!menuToggle,
      mobileMenu: !!mobileMenu,
      menuOverlay: !!menuOverlay,
      menuIcon: !!menuIcon
    })

    if (!menuToggle || !mobileMenu) {
      console.error('❌ No se encontraron los elementos básicos del menú móvil')
      return false
    }

    // Configurar eventos básicos
    const toggleMenu = () => {
      console.log('🔧 Toggle menú móvil (modo básico)')
      const isOpen = mobileMenu.classList.contains('active')
      
      if (isOpen) {
        // Cerrar menú
        mobileMenu.classList.remove('active')
        if (menuOverlay) menuOverlay.classList.remove('active')
        if (menuIcon) menuIcon.classList.remove('active')
        document.body.classList.remove('menu-open')
        
        // TEMPORAL: Limpiar estilos inline para testing
        mobileMenu.style.transform = ''
        mobileMenu.style.opacity = ''
        mobileMenu.style.visibility = ''
        
        console.log('🔧 Menú cerrado')
        console.log('🔧 Clases del menú después de cerrar:', mobileMenu.classList.toString())
      } else {
        // Abrir menú
        mobileMenu.classList.add('active')
        if (menuOverlay) menuOverlay.classList.add('active')
        if (menuIcon) menuIcon.classList.add('active')
        document.body.classList.add('menu-open')
        
        // TEMPORAL: Forzar estilos inline para testing
        mobileMenu.style.transform = 'translateY(0)'
        mobileMenu.style.opacity = '1'
        mobileMenu.style.visibility = 'visible'
        
        console.log('🔧 Menú abierto')
        console.log('🔧 Clases del menú después de abrir:', mobileMenu.classList.toString())
        console.log('🔧 Estilos del menú después de abrir:', mobileMenu.style.cssText)
      }
    }

    // Agregar eventos
    menuToggle.addEventListener('click', (e) => {
      e.preventDefault()
      toggleMenu()
    })

    if (menuOverlay) {
      menuOverlay.addEventListener('click', () => {
        console.log('🔧 Click en overlay (modo básico)')
        if (mobileMenu.classList.contains('active')) {
          mobileMenu.classList.remove('active')
          menuOverlay.classList.remove('active')
          if (menuIcon) menuIcon.classList.remove('active')
          document.body.classList.remove('menu-open')
        }
      })
    }

    // Tecla ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active')
        if (menuOverlay) menuOverlay.classList.remove('active')
        if (menuIcon) menuIcon.classList.remove('active')
        document.body.classList.remove('menu-open')
      }
    })

    // Cerrar al hacer clic en enlaces
    const menuLinks = mobileMenu.querySelectorAll('a')
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active')
        if (menuOverlay) menuOverlay.classList.remove('active')
        if (menuIcon) menuIcon.classList.remove('active')
        document.body.classList.remove('menu-open')
      })
    })

    console.log('✅ Menú móvil inicializado en modo básico')
    return true
  }
}

// ███████████████████████████████████████████████████████████████████████████████
// █                         SECCIÓN: CONTACT MODAL                            █
// ███████████████████████████████████████████████████████████████████████████████

const ContactModal = {
  init() {
    // Verificar que las utilidades globales estén disponibles
    if (typeof window === 'undefined' || !window.DOMHelpers || !window.Logger || !window.EventManager) {
      console.warn('⚠️ Utilidades globales no disponibles para ContactModal')
      return false
    }

    this.modal = DOMHelpers.findElement('#contact-modal')
    this.overlay = DOMHelpers.findElement('#modal-overlay')
    this.closeBtn = DOMHelpers.findElement('#modal-close')
    this.form = DOMHelpers.findElement('#contact-form')
    this.triggers = DOMHelpers.findElements('[data-modal-target="contact-modal"]')

    if (!this.modal || !this.overlay) {
      Logger.warning('Elementos del modal no encontrados')
      return false
    }

    this.setupEventListeners()
    this.setupUTMTracking()
    this.setupFormValidation()

    Logger.success('Modal de contacto inicializado')
    return true
  },

  setupEventListeners() {
    this.triggers.forEach(trigger => {
      EventManager.add(trigger, 'click', e => {
        e.preventDefault()
        this.open()
      })
    })

    if (this.closeBtn) {
      Logger.debug('Configurando botón de cerrar modal')
      EventManager.add(this.closeBtn, 'click', e => {
        e.preventDefault()
        e.stopPropagation()
        Logger.debug('Botón cerrar clickeado')
        this.close()
      })
    } else {
      Logger.warning('Botón de cerrar no encontrado')
    }

    EventManager.add(this.overlay, 'click', e => {
      if (e.target === this.overlay && !e.defaultPrevented) {
        e.preventDefault()
        this.close()
      }
    })

    EventManager.add(this.modal, 'click', e => {
      e.stopPropagation()
    })

    EventManager.add(document, 'keydown', e => {
      if (e.key === 'Escape' && this.modal.classList.contains('show')) {
        this.close()
      }
    })
  },

  async open() {
    Logger.debug('Abriendo modal...')

    DOMHelpers.toggleClasses(this.modal, ['show'], true)
    DOMHelpers.toggleClasses(this.overlay, ['active'], true)
    DOMHelpers.toggleClasses(document.body, ['modal-open'], true)

    TimingUtils.delay(() => {
      DOMHelpers.toggleClasses(this.modal, ['active'], true)
    }, 10)

    this.showLoadingState()

    // Notificar al FormManager para que inicialice los datos
    if (typeof window !== 'undefined' && window.FormManager) {
      try {
        await window.FormManager.initLocationData()
        this.hideLoadingState()

        TimingUtils.delay(() => {
          if (typeof window !== 'undefined' && window.FormManager) {
            window.FormManager.initFormAnimations()
          }
        }, 50)

        TimingUtils.delay(() => {
          const firstInput = DOMHelpers.findElement('input:not([type="radio"]):not([type="checkbox"])', this.modal)
          if (firstInput) firstInput.focus()
        }, 300)
      } catch (error) {
        this.showErrorState('Error al cargar datos de ubicaciones')
      }
    }

    Logger.debug('Modal abierto')
  },

  showLoadingState() {
    const paisSelect = DOMHelpers.findElement('#00N5G00000WmhvJ')
    const prefijoSelect = DOMHelpers.findElement('#00NJw000002mzb7')

    if (paisSelect) {
      paisSelect.disabled = true
      paisSelect.innerHTML = '<option value="">Cargando países...</option>'
    }

    if (prefijoSelect) {
      prefijoSelect.disabled = true
      prefijoSelect.innerHTML = '<option value="">Cargando indicativos...</option>'
    }
  },

  hideLoadingState() {
    const paisSelect = DOMHelpers.findElement('#00N5G00000WmhvJ')
    const prefijoSelect = DOMHelpers.findElement('#00NJw000002mzb7')

    if (paisSelect) {
      paisSelect.disabled = false
    }

    if (prefijoSelect) {
      prefijoSelect.disabled = false
    }
  },

  showErrorState(message) {
    const paisSelect = DOMHelpers.findElement('#00N5G00000WmhvJ')
    const prefijoSelect = DOMHelpers.findElement('#00NJw000002mzb7')

    if (paisSelect) {
      paisSelect.disabled = false
      paisSelect.innerHTML = `<option value="">Error: ${message}</option>`
    }

    if (prefijoSelect) {
      prefijoSelect.disabled = false
      prefijoSelect.innerHTML = `<option value="">Error: ${message}</option>`
    }
  },

  close() {
    Logger.debug('Cerrando modal...')

    DOMHelpers.toggleClasses(document.body, ['modal-open'], false)
    document.body.style.overflow = ''
    document.body.style.position = ''
    document.body.style.width = ''

    DOMHelpers.toggleClasses(this.modal, ['active'], false)

    TimingUtils.delay(() => {
      DOMHelpers.toggleClasses(this.modal, ['show'], false)
      DOMHelpers.toggleClasses(this.overlay, ['active'], false)
      document.body.classList.remove('modal-open')
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }, 400)

    Logger.debug('Modal cerrado')
  },

  setupUTMTracking() {
    const urlParams = new URLSearchParams(window.location.search)

    const utmSource = DOMHelpers.findElement('#utm-source')
    const utmSubsource = DOMHelpers.findElement('#utm-subsource')
    const utmMedium = DOMHelpers.findElement('#utm-medium')
    const utmCampaign = DOMHelpers.findElement('#utm-campaign')
    const programaField = DOMHelpers.findElement('#programa')

    if (utmSource) utmSource.value = urlParams.get('utm_source') || 'Javeriana'
    if (utmSubsource) utmSubsource.value = urlParams.get('utm_subsource') || 'Organico'
    if (utmMedium) utmMedium.value = urlParams.get('utm_medium') || 'Landing'
    if (utmCampaign) utmCampaign.value = urlParams.get('utm_campaign') || 'Mercadeo'

    if (programaField && typeof codPrograma !== 'undefined') {
      programaField.value = codPrograma
    }

    Logger.debug('UTM tracking configurado', {
      source: utmSource?.value,
      subsource: utmSubsource?.value,
      medium: utmMedium?.value,
      campaign: utmCampaign?.value
    })
  },

  setupFormValidation() {
    // Configurar validación del formulario usando FormManager
    if (this.form && typeof window !== 'undefined' && window.FormManager) {
      window.FormManager.setupFormValidation(this.form)
      Logger.debug('Validación de formulario configurada')
    }
  }
}

// ███████████████████████████████████████████████████████████████████████████████
// █                        SISTEMA PRINCIPAL DEL HEADER                       █
// ███████████████████████████████████████████████████████████████████████████████

const HeaderManager = {
  init() {
    Logger.debug('Inicializando sistemas del header...')
    
    const systems = { 
      mobileMenu: MobileMenu.init(),
      contactModal: ContactModal.init()
    }

    const activeSystems = Object.entries(systems)
      .filter(([_, isActive]) => isActive)
      .map(([name]) => name)

    if (activeSystems.length > 0) {
      Logger.success(`Header - Sistemas activos: ${activeSystems.join(', ')}`)
    }
    
    return systems
  },

  cleanup() {
    if (typeof window !== 'undefined' && window.Logger) {
      Logger.debug('Limpiando eventos del header...')
    }
    if (typeof window !== 'undefined' && window.EventManager) {
      EventManager.cleanup()
    }
  }
}

// Exportar para uso como módulo ES6
export default HeaderManager

// Para compatibilidad con diferentes sistemas
if (typeof window !== 'undefined') {
  window.HeaderManager = HeaderManager
}