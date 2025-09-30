;(function () {
  'use strict'

  // ========================================
  // CONFIGURACIÓN
  // ========================================

  const CONFIG = {
    version: '1.0.0',
    breakpoints: {
      mobile: 768
    },
    scaleSteps: [1, 1.1, 1.2],
    whatsappGeneral: '+573133912876'
  }

  // ========================================
  // ESTADO GLOBAL
  // ========================================

  let state = {
    isMobile: false,
    isMenuExpanded: false,
    showShareModal: false,
    initialized: false,
    currentTheme: 'light',
    scaleLevel: 0,
    isGrayscaleActive: false
  }

  let elements = {}
  let eventListeners = []

  // ========================================
  // GENERACIÓN DE HTML
  // ========================================

  function generateMenuHTML() {
    return `
      <div id="floating-menu-container" class="floating-menu-container">
        <div id="floating-menu-main" class="floating-menu collapsed">
          
          <!-- Toggle Button (Mobile) -->
          <div class="menu-toggle-button menu-item" 
               id="menu-toggle-btn"
               title="Abrir menú de accesibilidad"
               tabindex="0"
               role="button"
               aria-label="Abrir menú de accesibilidad">
            <i class="ph ph-person"></i>
          </div>

          <!-- Close Button (Mobile) -->
          <div class="menu-close-button menu-item"
               id="menu-close-btn"
               title="Cerrar menú de accesibilidad"
               tabindex="0"
               role="button"
               aria-label="Cerrar menú de accesibilidad"
               style="display: none;">
            <i class="ph ph-x"></i>
          </div>

          <!-- Aumentar Fuente -->
          <div class="menu-item"
               id="btn-increase-font"
               title="Aumentar tamaño de fuente"
               aria-label="Aumentar tamaño de fuente"
               tabindex="0"
               role="button">
            <i class="ph ph-plus-circle"></i>
          </div>

          <!-- Disminuir Fuente -->
          <div class="menu-item"
               id="btn-decrease-font"
               title="Disminuir tamaño de fuente"
               aria-label="Disminuir tamaño de fuente"
               tabindex="0"
               role="button">
            <i class="ph ph-minus-circle"></i>
          </div>

          <!-- Cambiar Tema -->
          <div class="menu-item"
               id="btn-theme-toggle"
               title="Cambiar tema"
               aria-label="Cambiar tema de color"
               tabindex="0"
               role="button">
            <i class="ph ph-sun"></i>
          </div>

          <!-- Escala de Grises -->
          <div class="menu-item"
               id="btn-grayscale"
               title="Escala de grises"
               aria-label="Activar escala de grises"
               tabindex="0"
               role="button">
            <i class="ph ph-circle-half"></i>
          </div>

          <!-- Compartir -->
          <div class="menu-item"
               id="btn-share"
               title="Compartir página"
               aria-label="Abrir opciones para compartir"
               tabindex="0"
               role="button">
            <i class="ph ph-share-fat"></i>
          </div>
        </div>

        <!-- Botón WhatsApp Flotante -->
        <div id="whatsapp-floating-button" class="whatsapp-floating-button">
          <a href="#" 
             class="menu-item whatsapp-button"
             id="btn-whatsapp"
             data-whatsapp-button="true"
             title="Contactar por WhatsApp"
             aria-label="Contactar por WhatsApp"
             tabindex="0"
             role="button">
            <i class="ph ph-whatsapp-logo"></i>
          </a>
        </div>

        <!-- Modal Compartir -->
        <div id="share-modal-overlay"
             role="dialog"
             aria-modal="true"
             aria-labelledby="share-modal-title"
             class="share-modal-overlay share-modal-hidden">
          <div class="share-modal">
            <div class="share-modal-header">
              <p id="share-modal-title">Compartir</p>
              <button class="share-modal-close" 
                      aria-label="Cerrar modal de compartir" 
                      type="button">
                <i class="ph ph-x"></i>
              </button>
            </div>
            <div class="share-options">
              <div class="share-option" data-share="whatsapp" tabindex="0" role="button">
                <i class="ph ph-whatsapp-logo"></i>
                <span>WhatsApp</span>
              </div>
              <div class="share-option" data-share="facebook" tabindex="0" role="button">
                <i class="ph ph-facebook-logo"></i>
                <span>Facebook</span>
              </div>
              <div class="share-option" data-share="x" tabindex="0" role="button">
                <i class="ph ph-x-logo"></i>
                <span>X</span>
              </div>
              <div class="share-option" data-share="linkedin" tabindex="0" role="button">
                <i class="ph ph-linkedin-logo"></i>
                <span>LinkedIn</span>
              </div>
              <div class="share-option" data-share="email" tabindex="0" role="button">
                <i class="ph ph-paper-plane-tilt"></i>
                <span>Correo</span>
              </div>
              <div class="share-option" data-share="copy" tabindex="0" role="button">
                <i class="ph ph-copy"></i>
                <span>Copiar Link</span>
              </div>
            </div>
          </div>
        </div>

        <div id="floating-menu-notifications" class="floating-menu-notifications"></div>
      </div>
    `
  }

  // ========================================
  // UTILIDADES
  // ========================================

  function isMobileDevice() {
    return window.innerWidth <= CONFIG.breakpoints.mobile
  }

  function loadPhosphorIcons() {
    if (document.querySelector('link[href*="phosphor-icons"]')) {
      return
    }

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/@phosphor-icons/web@2.0.3/src/regular/style.css'
    document.head.appendChild(link)
  }

  function showNotification(message) {
    const notification = document.createElement('div')
    notification.textContent = message
    notification.className = 'floating-menu-notification'
    notification.style.cssText =
      'position: fixed; top: 20px; right: 20px; background: #0066cc; color: white; ' +
      'padding: 12px 24px; border-radius: 8px; z-index: 10000; font-size: 14px; ' +
      'box-shadow: 0 4px 12px rgba(0,0,0,0.2); opacity: 0; transform: translateX(100%); ' +
      'transition: all 0.3s ease;'

    document.body.appendChild(notification)

    setTimeout(() => {
      notification.style.opacity = '1'
      notification.style.transform = 'translateX(0)'
    }, 10)

    setTimeout(() => {
      notification.style.opacity = '0'
      notification.style.transform = 'translateX(100%)'
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification)
        }
      }, 300)
    }, 3000)
  }

  // ========================================
  // FUNCIONES DE ACCESIBILIDAD
  // ========================================

  function increaseFontSize() {
    const maxLevel = CONFIG.scaleSteps.length - 1

    if (state.scaleLevel < maxLevel) {
      state.scaleLevel++
      const newSize = 16 * CONFIG.scaleSteps[state.scaleLevel]
      document.documentElement.style.fontSize = newSize + 'px'
      showNotification('Fuente: ' + Math.round(CONFIG.scaleSteps[state.scaleLevel] * 100) + '%')
    } else {
      showNotification('Fuente en tamaño máximo')
    }
  }

  function decreaseFontSize() {
    if (state.scaleLevel > 0) {
      state.scaleLevel--
      const newSize = 16 * CONFIG.scaleSteps[state.scaleLevel]
      document.documentElement.style.fontSize = newSize + 'px'
      showNotification('Fuente: ' + Math.round(CONFIG.scaleSteps[state.scaleLevel] * 100) + '%')
    } else {
      showNotification('Fuente en tamaño mínimo')
    }
  }

  function toggleTheme() {
    state.currentTheme = state.currentTheme === 'light' ? 'dark' : 'light'
    document.body.classList.toggle('dark-theme', state.currentTheme === 'dark')

    const themeIcon = elements.btnThemeToggle?.querySelector('i')
    if (themeIcon) {
      themeIcon.className = state.currentTheme === 'dark' ? 'ph ph-moon' : 'ph ph-sun'
    }

    showNotification('Tema: ' + (state.currentTheme === 'dark' ? 'Oscuro' : 'Claro'))
  }

  function toggleGrayscale() {
    state.isGrayscaleActive = !state.isGrayscaleActive
    document.documentElement.classList.toggle('grayscale', state.isGrayscaleActive)
    showNotification(state.isGrayscaleActive ? 'Escala de grises activada' : 'Escala de grises desactivada')
  }

  // ========================================
  // COMPARTIR
  // ========================================

  function openShareModal() {
    state.showShareModal = true
    if (elements.shareModal) {
      elements.shareModal.classList.remove('share-modal-hidden')
      elements.shareModal.classList.add('share-modal-visible')
    }
    document.body.style.overflow = 'hidden'
  }

  function closeShareModal() {
    state.showShareModal = false
    if (elements.shareModal) {
      elements.shareModal.classList.remove('share-modal-visible')
      elements.shareModal.classList.add('share-modal-hidden')
    }
    document.body.style.overflow = ''
  }

  function handleShare(type) {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(document.title)

    switch (type) {
      case 'whatsapp':
        window.open('https://wa.me/?text=' + text + '%20' + url, '_blank')
        break
      case 'facebook':
        window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank')
        break
      case 'x':
        window.open('https://twitter.com/intent/tweet?url=' + url + '&text=' + text, '_blank')
        break
      case 'linkedin':
        window.open('https://www.linkedin.com/sharing/share-offsite/?url=' + url, '_blank')
        break
      case 'email':
        const subject = encodeURIComponent('Interesante: ' + document.title)
        const body = encodeURIComponent('Te comparto este enlace: ' + window.location.href)
        window.location.href = 'mailto:?subject=' + subject + '&body=' + body
        break
      case 'copy':
        copyToClipboard()
        break
    }

    closeShareModal()
  }

  function copyToClipboard() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => showNotification('Enlace copiado'))
        .catch(() => fallbackCopyToClipboard())
    } else {
      fallbackCopyToClipboard()
    }
  }

  function fallbackCopyToClipboard() {
    const textArea = document.createElement('textarea')
    textArea.value = window.location.href
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    document.body.appendChild(textArea)
    textArea.select()

    try {
      document.execCommand('copy')
      showNotification('Enlace copiado')
    } catch (err) {
      showNotification('No se pudo copiar')
    }

    document.body.removeChild(textArea)
  }

  // ========================================
  // WHATSAPP FALLBACK
  // ========================================

  function setupWhatsAppFallback() {
    const whatsappBtn = document.querySelector('[data-whatsapp-button="true"]')

    if (whatsappBtn) {
      addEventListener(whatsappBtn, 'click', function (e) {
        e.preventDefault()

        const message = encodeURIComponent(
          '¡Hola! Me interesa información.\n\n' + 'Página: ' + document.title + '\n' + 'Enlace: ' + window.location.href
        )
        const whatsappUrl = 'https://wa.me/' + CONFIG.whatsappGeneral.replace('+', '') + '?text=' + message

        window.open(whatsappUrl, '_blank')
      })
    }
  }

  // ========================================
  // NAVEGACIÓN MÓVIL
  // ========================================

  function toggleMobileMenu() {
    if (!state.isMobile) return

    state.isMenuExpanded = !state.isMenuExpanded
    updateMenuDisplay()
  }

  function updateMenuDisplay() {
    if (!elements.mainMenu) return

    const isMobile = state.isMobile
    const isExpanded = state.isMenuExpanded

    if (isMobile && isExpanded) {
      elements.mainMenu.className = 'floating-menu mobile-expanded'
    } else if (isMobile && !isExpanded) {
      elements.mainMenu.className = 'floating-menu collapsed'
    } else {
      elements.mainMenu.className = 'floating-menu'
    }

    updateButtonsVisibility()
  }

  function updateButtonsVisibility() {
    const isMobile = state.isMobile
    const isExpanded = state.isMenuExpanded

    if (elements.toggleButton) {
      elements.toggleButton.style.display = !isMobile ? 'none' : !isExpanded ? 'flex' : 'none'
    }

    if (elements.closeButton) {
      elements.closeButton.style.display = !isMobile ? 'none' : isExpanded ? 'flex' : 'none'
    }

    const menuItems = [
      elements.btnIncreaseFontSize,
      elements.btnDecreaseFontSize,
      elements.btnThemeToggle,
      elements.btnGrayscale,
      elements.btnShare
    ]

    menuItems.forEach(item => {
      if (item) {
        item.style.display = isMobile && !isExpanded ? 'none' : 'flex'
      }
    })
  }

  // ========================================
  // EVENT LISTENERS
  // ========================================

  function addEventListener(element, event, handler) {
    element.addEventListener(event, handler)
    eventListeners.push({ element, event, handler })
  }

  function setupEventListeners() {
    if (elements.btnIncreaseFontSize) {
      addEventListener(elements.btnIncreaseFontSize, 'click', increaseFontSize)
    }

    if (elements.btnDecreaseFontSize) {
      addEventListener(elements.btnDecreaseFontSize, 'click', decreaseFontSize)
    }

    if (elements.btnThemeToggle) {
      addEventListener(elements.btnThemeToggle, 'click', toggleTheme)
    }

    if (elements.btnGrayscale) {
      addEventListener(elements.btnGrayscale, 'click', toggleGrayscale)
    }

    if (elements.btnShare) {
      addEventListener(elements.btnShare, 'click', openShareModal)
    }

    if (elements.toggleButton) {
      addEventListener(elements.toggleButton, 'click', toggleMobileMenu)
    }

    if (elements.closeButton) {
      addEventListener(elements.closeButton, 'click', toggleMobileMenu)
    }

    const closeModalBtn = document.querySelector('.share-modal-close')
    if (closeModalBtn) {
      addEventListener(closeModalBtn, 'click', closeShareModal)
    }

    const shareOptions = document.querySelectorAll('.share-option')
    shareOptions.forEach(option => {
      const shareType = option.getAttribute('data-share')
      if (shareType) {
        addEventListener(option, 'click', () => handleShare(shareType))
      }
    })

    addEventListener(document, 'keydown', e => {
      if (e.key === 'Escape' && state.showShareModal) {
        closeShareModal()
      }
    })

    addEventListener(window, 'resize', () => {
      const wasMobile = state.isMobile
      state.isMobile = isMobileDevice()

      if (wasMobile !== state.isMobile) {
        state.isMenuExpanded = !state.isMobile
        updateMenuDisplay()
      }
    })
  }

  // ========================================
  // INICIALIZACIÓN
  // ========================================

  function cacheElements() {
    elements = {
      container: document.getElementById('floating-menu-container'),
      mainMenu: document.getElementById('floating-menu-main'),
      toggleButton: document.getElementById('menu-toggle-btn'),
      closeButton: document.getElementById('menu-close-btn'),
      btnIncreaseFontSize: document.getElementById('btn-increase-font'),
      btnDecreaseFontSize: document.getElementById('btn-decrease-font'),
      btnThemeToggle: document.getElementById('btn-theme-toggle'),
      btnGrayscale: document.getElementById('btn-grayscale'),
      btnShare: document.getElementById('btn-share'),
      shareModal: document.getElementById('share-modal-overlay')
    }

    return elements.container && elements.mainMenu
  }

  function initialize(targetElement) {
    if (!targetElement) {
      console.error('Elemento objetivo no encontrado')
      return
    }

    targetElement.innerHTML = generateMenuHTML()

    if (!cacheElements()) {
      console.error('No se pudieron cachear los elementos')
      return
    }

    state.isMobile = isMobileDevice()
    state.isMenuExpanded = !state.isMobile

    loadPhosphorIcons()
    setupEventListeners()
    setupWhatsAppFallback()
    updateMenuDisplay()

    state.initialized = true
    console.log('Accesos Directos inicializado correctamente')
  }

  // ========================================
  // API PÚBLICA
  // ========================================

  window.AccesosDirectos = {
    initialize: initialize,
    increaseFontSize: increaseFontSize,
    decreaseFontSize: decreaseFontSize,
    toggleTheme: toggleTheme,
    toggleGrayscale: toggleGrayscale,
    openShareModal: openShareModal,
    closeShareModal: closeShareModal,
    getState: () => ({ ...state })
  }

  // Inicialización automática
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      const target = document.getElementById('accesos-directos-root')
      if (target) {
        initialize(target)
      }
    })
  } else {
    const target = document.getElementById('accesos-directos-root')
    if (target) {
      initialize(target)
    }
  }

  console.log('Módulo Accesos Directos cargado v' + CONFIG.version)
})()
