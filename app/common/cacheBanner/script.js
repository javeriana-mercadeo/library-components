/**
 * Cookie Banner Configuration Modal Fallback
 * Script que funciona con la estructura HTML existente del modal de cookies
 * Proporciona funcionalidad sin Bootstrap
 */

class CookieModalFallback {
  constructor() {
    this.modal = null
    this.backdrop = null
    this.isOpen = false
    this.init()
  }

  init() {
    // Esperar a que el DOM esté listo
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup())
    } else {
      this.setup()
    }
  }

  setup() {
    this.findExistingModal()
    this.bindEvents()
    this.setupBannerObserver()
    this.updateBodyPadding() // Verificación inicial
  }

  findExistingModal() {
    // Buscar el modal existente en el DOM
    this.modal = document.getElementById('cookiesBannerConfiguration')
    this.backdrop = document.querySelector('.modal-backdrop')

    if (this.modal) {
      // Si existe, asegurar que esté oculto inicialmente
      this.hideModal()
    }
  }

  bindEvents() {
    // Event listener para botones de configuración en el banner
    document.addEventListener('click', e => {
      // Detectar clic en botón de configuración
      if (this.isConfigurationButton(e.target)) {
        e.preventDefault()
        e.stopPropagation()
        this.showModal()
      }

      // Detectar clic en botón de cerrar modal
      if (this.isCloseButton(e.target)) {
        e.preventDefault()
        e.stopPropagation()
        this.hideModal()
      }

      // Detectar clic en botones de acción del modal
      if (this.isModalActionButton(e.target)) {
        e.preventDefault()
        e.stopPropagation()
        this.handleModalAction(e.target)
      }

      // Detectar clic en backdrop para cerrar
      if (e.target === this.backdrop) {
        this.hideModal()
      }
    })

    // Cerrar modal con tecla ESC
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && this.isOpen) {
        this.hideModal()
      }
    })
  }

  isConfigurationButton(element) {
    // Detectar si es un botón de configuración usando el ID específico de Liferay
    return (
      element.matches('#_com_liferay_cookies_banner_web_portlet_CookiesBannerPortlet_configurationButton') ||
      element.id === '_com_liferay_cookies_banner_web_portlet_CookiesBannerPortlet_configurationButton' ||
      // Fallback para otros casos
      (element.matches('.btn-link') && element.textContent?.toLowerCase().includes('configuración'))
    )
  }

  isCloseButton(element) {
    // Detectar botón de cerrar
    return (
      element.matches('.close') ||
      element.closest('.close') ||
      element.matches('[aria-label="close"]') ||
      element.closest('[aria-label="close"]')
    )
  }

  isModalActionButton(element) {
    // Detectar botones de acción del modal
    if (!this.modal || !this.modal.contains(element)) return false

    const text = element.textContent?.toLowerCase() || ''
    return element.matches('.btn') && (text.includes('confirmar') || text.includes('aceptar') || text.includes('rechazar'))
  }

  showModal() {
    if (!this.modal) {
      console.warn('Modal de configuración de cookies no encontrado')
      return
    }

    // Crear backdrop si no existe
    if (!this.backdrop) {
      this.createBackdrop()
    }

    // Mostrar backdrop
    if (this.backdrop) {
      this.backdrop.style.display = 'block'
      this.backdrop.classList.add('show')
      this.backdrop.removeAttribute('inert')
      this.backdrop.setAttribute('aria-hidden', 'false')
    }

    // Mostrar modal
    this.modal.style.display = 'block'
    this.modal.classList.add('show', 'd-block')
    this.modal.setAttribute('aria-hidden', 'false')
    this.modal.removeAttribute('inert')

    // Prevenir scroll del body
    document.body.style.overflow = 'hidden'
    this.isOpen = true

    // Focus en el primer elemento focuseable
    const firstFocusable = this.modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    if (firstFocusable) {
      firstFocusable.focus()
    }

    // Actualizar iframe src si existe
    this.updateIframeSrc()
  }

  hideModal() {
    if (!this.modal) return

    // Ocultar modal
    this.modal.style.display = 'none'
    this.modal.classList.remove('show', 'd-block')
    this.modal.setAttribute('aria-hidden', 'true')
    this.modal.setAttribute('inert', '')

    // Ocultar backdrop
    if (this.backdrop) {
      this.backdrop.style.display = 'none'
      this.backdrop.classList.remove('show')
      this.backdrop.setAttribute('aria-hidden', 'true')
      this.backdrop.setAttribute('inert', '')
    }

    // Restaurar scroll del body
    document.body.style.overflow = ''
    this.isOpen = false
  }

  createBackdrop() {
    // Crear backdrop si no existe
    this.backdrop = document.createElement('div')
    this.backdrop.className = 'modal-backdrop fade'
    this.backdrop.setAttribute('aria-hidden', 'true')
    this.backdrop.setAttribute('data-suppressed', 'true')
    this.backdrop.setAttribute('inert', '')

    // Insertar antes del modal
    if (this.modal.parentNode) {
      this.modal.parentNode.insertBefore(this.backdrop, this.modal)
    }
  }

  updateIframeSrc() {
    const iframe = this.modal.querySelector('iframe')
    if (!iframe) return

    // Si el iframe no tiene src o está vacío, generar URL
    if (!iframe.src || iframe.src === 'about:blank') {
      iframe.src = this.generateIframeUrl()
    }
  }

  generateIframeUrl() {
    // Generar URL del iframe basada en la página actual
    const currentUrl = window.location.href.split('?')[0]
    const params = new URLSearchParams({
      p_p_id: 'com_liferay_cookies_banner_web_portlet_CookiesBannerConfigurationPortlet',
      p_p_lifecycle: '0',
      p_p_state: 'pop_up',
      p_p_mode: 'view',
      _com_liferay_cookies_banner_web_portlet_CookiesBannerConfigurationPortlet_mvcPath: '/cookies_banner_configuration/view.jsp',
      p_p_auth: this.generateAuthToken(),
      _com_liferay_cookies_banner_web_portlet_CookiesBannerConfigurationPortlet_bodyCssClass: 'cadmin dialog-iframe-popup'
    })

    return `${currentUrl}?${params.toString()}`
  }

  generateAuthToken() {
    // Generar un token simple (en producción esto vendría del servidor)
    return Math.random().toString(36).substring(2, 15)
  }

  handleModalAction(button) {
    const text = button.textContent?.toLowerCase() || ''

    if (text.includes('confirmar')) {
      // Confirmar selecciones actuales
      this.confirmPreferences()
    } else if (text.includes('aceptar')) {
      // Aceptar todas las cookies
      this.setCookiePreferences('all')
      this.hideModal()
      this.hideBanner()
    } else if (text.includes('rechazar')) {
      // Rechazar cookies opcionales
      this.setCookiePreferences('necessary')
      this.hideModal()
      this.hideBanner()
    }
  }

  confirmPreferences() {
    // Comunicar con el iframe para confirmar selecciones
    const iframe = this.modal.querySelector('iframe')
    if (iframe && iframe.contentWindow) {
      try {
        iframe.contentWindow.postMessage({ action: 'confirm' }, '*')
      } catch (e) {
        console.warn('No se pudo comunicar con el iframe:', e)
      }
    }

    // Simular confirmación después de un breve delay
    setTimeout(() => {
      this.hideModal()
      this.hideBanner()
    }, 500)
  }

  setCookiePreferences(type) {
    // Configurar preferencias de cookies
    const preferences = {
      necessary: true,
      functional: type === 'all',
      analytics: type === 'all',
      advertising: type === 'all',
      timestamp: Date.now()
    }

    // Guardar en localStorage (en producción sería una cookie)
    try {
      localStorage.setItem('cookiePreferences', JSON.stringify(preferences))
    } catch (e) {
      console.warn('No se pudieron guardar las preferencias:', e)
    }

    // Disparar evento personalizado
    window.dispatchEvent(
      new CustomEvent('cookiePreferencesUpdated', {
        detail: preferences
      })
    )

    console.log('Preferencias de cookies actualizadas:', preferences)
  }

  hideBanner() {
    // Ocultar el banner de cookies
    const banner = document.querySelector('.cookies-banner')
    if (banner) {
      banner.classList.add('cookies-banner--hidden')

      // Remover padding del body después de la animación
      setTimeout(() => {
        this.updateBodyPadding()
      }, 300)
    }
  }

  // Nueva función para detectar y actualizar padding según visibilidad del banner
  updateBodyPadding() {
    const banner = document.querySelector('.cookies-banner')
    const body = document.body

    if (!banner) return

    // Detectar si el banner está oculto (por clase o inline style)
    const isHidden = banner.classList.contains('cookies-banner--hidden') || window.getComputedStyle(banner).display === 'none'

    if (isHidden) {
      body.classList.add('cookies-banner-hidden')
      body.style.paddingBottom = ''
    } else {
      body.classList.remove('cookies-banner-hidden')
    }
  }

  // Observador para detectar cambios dinámicos en el banner
  setupBannerObserver() {
    const banner = document.querySelector('.cookies-banner')
    if (!banner) return

    // Crear observer para cambios en atributos y clases
    const observer = new MutationObserver(() => {
      this.updateBodyPadding()
    })

    // Observar cambios en style y class
    observer.observe(banner, {
      attributes: true,
      attributeFilter: ['style', 'class']
    })

    // Guardar referencia para poder desconectarlo después
    this.bannerObserver = observer
  }
}

/**
 * Función de inicialización del sistema de cookies banner
 * @returns {CookieModalFallback} Instancia del banner
 */
const initializeCacheBanner = () => {
  const cookieModalFallback = new CookieModalFallback()

  // Exportar para uso global si es necesario
  if (typeof window !== 'undefined') {
    window.CookieModalFallback = CookieModalFallback
  }

  return cookieModalFallback
}

// Export por defecto
export default initializeCacheBanner
