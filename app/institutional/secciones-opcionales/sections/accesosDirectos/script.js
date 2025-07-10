;(function () {
  'use strict'

  // Configuración global
  var CONFIG = {
    version: '2.2.0',
    debug: false,
    
    storage: {
      enabled: true,
      key: 'javeriana_accessibility_preferences',
      expireDays: 365
    },
    
    fontScale: {
      min: 0.8,
      max: 2.0,
      step: 0.1
    },
    
    messages: {
      notifications: {
        darkThemeOn: 'Tema oscuro activado',
        darkThemeOff: 'Tema claro activado',
        grayscaleOn: 'Escala de grises activada',
        grayscaleOff: 'Escala de grises desactivada',
        linkCopied: 'Enlace copiado al portapapeles',
        linkCopyError: 'Error al copiar enlace',
        instagramCopy: 'Enlace copiado. Puedes pegarlo en tu historia de Instagram',
        fontSizeIncreased: 'Tamaño de fuente aumentado',
        fontSizeDecreased: 'Tamaño de fuente reducido',
        fontSizeMax: 'Tamaño máximo de fuente alcanzado',
        fontSizeMin: 'Tamaño mínimo de fuente alcanzado',
        menuReady: 'Barra de accesibilidad lista para usar'
      }
    }
  }

  // Variables globales de estado
  var isDarkTheme = false
  var isGrayscale = false
  var fontScale = 1.0

  // ===== SISTEMA DE ALMACENAMIENTO =====
  function savePreferences() {
    if (!CONFIG.storage.enabled) return false
    
    try {
      var preferences = {
        darkTheme: isDarkTheme,
        grayscale: isGrayscale,
        fontScale: fontScale,
        timestamp: Date.now(),
        version: CONFIG.version
      }
      
      localStorage.setItem(CONFIG.storage.key, JSON.stringify(preferences))
      if (CONFIG.debug) console.log('Preferencias guardadas:', preferences)
      return true
    } catch (error) {
      console.error('Error guardando preferencias:', error)
      return false
    }
  }

  function loadPreferences() {
    if (!CONFIG.storage.enabled) return null
    
    try {
      var stored = localStorage.getItem(CONFIG.storage.key)
      if (!stored) return null
      
      var preferences = JSON.parse(stored)
      
      // Verificar expiración
      if (preferences.timestamp) {
        var daysDiff = (Date.now() - preferences.timestamp) / (1000 * 60 * 60 * 24)
        if (daysDiff > CONFIG.storage.expireDays) {
          localStorage.removeItem(CONFIG.storage.key)
          return null
        }
      }
      
      if (CONFIG.debug) console.log('Preferencias cargadas:', preferences)
      return preferences
    } catch (error) {
      console.error('Error cargando preferencias:', error)
      return null
    }
  }

  // ===== ANUNCIOS PARA SCREEN READERS =====
  function announceToScreenReader(message) {
    var announcer = document.getElementById('accessibility-announcements')
    if (announcer) {
      announcer.textContent = ''
      setTimeout(function() {
        announcer.textContent = message
        if (CONFIG.debug) console.log('Anuncio screen reader:', message)
      }, 100)
    }
  }

  // ===== SISTEMA DE FONT-SCALE =====
  function applyFontScale(scale) {
    if (CONFIG.debug) console.log('Aplicando escala de fuente:', scale)
    
    // Aplicar CSS custom property
    document.documentElement.style.setProperty('--accessibility-font-scale', scale)
    updateFontScaleCSS(scale)
    
    // Aplicar transform a contenedores específicos
    var targets = getFontScaleTargets()
    
    for (var i = 0; i < targets.length; i++) {
      var element = targets[i]
      if (element && !isAccessibilityElement(element)) {
        element.style.transform = 'scale(' + scale + ')'
        element.style.transformOrigin = 'top left'
        element.style.transition = 'transform 0.3s ease'
      }
    }
    
    if (CONFIG.debug) console.log('Escala aplicada a', targets.length, 'elementos')
    return true
  }

  function updateFontScaleCSS(scale) {
    var styleElement = document.getElementById('accessibility-font-scale-styles')
    
    if (!styleElement) {
      styleElement = document.createElement('style')
      styleElement.id = 'accessibility-font-scale-styles'
      document.head.appendChild(styleElement)
    }
    
    var css = 
      ':root { --accessibility-font-scale: ' + scale + '; } ' +
      'body:not(.floating-menu):not(.whatsapp-floating-button) *:not([class*="accessibility"]):not(.floating-menu):not(.whatsapp-floating-button):not(.share-modal) { ' +
        'font-size: calc(1rem * var(--accessibility-font-scale)) !important; ' +
      '} ' +
      '.floating-menu, .floating-menu *, .whatsapp-floating-button, .whatsapp-floating-button *, ' +
      '.share-modal-overlay, .share-modal-overlay *, [class*="accessibility"], [id*="accessibility"] { ' +
        'font-size: initial !important; transform: none !important; ' +
      '}'
    
    styleElement.textContent = css
  }

  function getFontScaleTargets() {
    var targets = []
    
    // Selectores primarios
    var primarySelectors = [
      '#wrapper > .container-fluid:not([class*="accessibility"])',
      '#wrapper > main:not([class*="accessibility"])',
      'main:not([class*="accessibility"])',
      '.layout:not([class*="accessibility"])',
      '#content:not([class*="accessibility"])'
    ]
    
    for (var i = 0; i < primarySelectors.length; i++) {
      var selector = primarySelectors[i]
      var elements = document.querySelectorAll(selector)
      
      for (var j = 0; j < elements.length; j++) {
        var el = elements[j]
        if (!isAccessibilityElement(el)) {
          targets.push(el)
        }
      }
      
      if (targets.length > 0) break
    }
    
    // Fallback si no encuentra
    if (targets.length === 0) {
      var fallbackSelectors = [
        'body > .container:not([class*="accessibility"]):not(.floating-menu):not(.whatsapp-floating-button)',
        'body > main:not([class*="accessibility"]):not(.floating-menu):not(.whatsapp-floating-button)'
      ]
      
      for (var i = 0; i < fallbackSelectors.length; i++) {
        var selector = fallbackSelectors[i]
        var elements = document.querySelectorAll(selector)
        
        for (var j = 0; j < elements.length; j++) {
          var el = elements[j]
          if (!isAccessibilityElement(el)) {
            targets.push(el)
          }
        }
        
        if (targets.length > 0) break
      }
    }
    
    return targets
  }

  function isAccessibilityElement(element) {
    if (!element) return false
    
    var className = element.className || ''
    var id = element.id || ''
    
    if (className.includes('accessibility') || 
        className.includes('floating-menu') || 
        className.includes('whatsapp-floating-button') ||
        className.includes('share-modal') ||
        id.includes('accessibility')) {
      return true
    }
    
    var parent = element.closest('.floating-menu, .whatsapp-floating-button, .share-modal-overlay, [class*="accessibility"]')
    return !!parent
  }

  function resetFontScale() {
    fontScale = 1.0
    applyFontScale(1.0)
    
    // Limpiar estilos inline
    var targets = getFontScaleTargets()
    for (var i = 0; i < targets.length; i++) {
      var element = targets[i]
      if (element) {
        element.style.transform = ''
        element.style.transformOrigin = ''
        element.style.transition = ''
      }
    }
    
    // Limpiar CSS custom property
    document.documentElement.style.removeProperty('--accessibility-font-scale')
    
    // Remover estilos dinámicos
    var styleElement = document.getElementById('accessibility-font-scale-styles')
    if (styleElement) {
      styleElement.remove()
    }
    
    if (CONFIG.debug) console.log('Escala de fuente reseteada')
  }

  // ===== FUNCIONES DE FONT-SCALE =====
  function increaseFontSize() {
    if (CONFIG.debug) console.log('Ejecutando increaseFontSize')
    
    var newScale = Math.min(CONFIG.fontScale.max, fontScale + CONFIG.fontScale.step)
    
    if (newScale === fontScale) {
      announceToScreenReader(CONFIG.messages.notifications.fontSizeMax)
      if (CONFIG.debug) console.warn('Ya se alcanzó la escala máxima:', newScale)
      return fontScale
    }
    
    fontScale = newScale
    applyFontScale(fontScale)
    
    var percentage = Math.round(fontScale * 100)
    announceToScreenReader(CONFIG.messages.notifications.fontSizeIncreased + '. Nivel: ' + percentage + '%')
    if (CONFIG.debug) console.log('Fuente aumentada:', fontScale, '(' + percentage + '%)')
    
    savePreferences()
    return fontScale
  }

  function decreaseFontSize() {
    if (CONFIG.debug) console.log('Ejecutando decreaseFontSize')
    
    var newScale = Math.max(CONFIG.fontScale.min, fontScale - CONFIG.fontScale.step)
    
    if (newScale === fontScale) {
      announceToScreenReader(CONFIG.messages.notifications.fontSizeMin)
      if (CONFIG.debug) console.warn('Ya se alcanzó la escala mínima:', newScale)
      return fontScale
    }
    
    fontScale = newScale
    applyFontScale(fontScale)
    
    var percentage = Math.round(fontScale * 100)
    announceToScreenReader(CONFIG.messages.notifications.fontSizeDecreased + '. Nivel: ' + percentage + '%')
    if (CONFIG.debug) console.log('Fuente reducida:', fontScale, '(' + percentage + '%)')
    
    savePreferences()
    return fontScale
  }

  // ===== FUNCIONES DE ESCALA DE GRISES CORREGIDAS =====
  function applyGrayscaleSimple() {
    try {
      console.log('Aplicando escala de grises simple...')
      
      // USAR CONSISTENTEMENTE: grayscale-mode
      document.getElementById('wrapper')?.classList.add('grayscale-mode');

      
      // Crear CSS dinámico
      createGrayscaleCSS()
      
      // Actualizar estado del botón
      updateGrayscaleButtonState(true)
      
      // Actualizar estado global
      isGrayscale = true
      
      console.log('Escala de grises aplicada correctamente')
      
    } catch (error) {
      console.error('Error aplicando escala de grises:', error)
    }
  }

  function removeGrayscaleSimple() {
    try {
      console.log('Removiendo escala de grises...')
      
      // USAR CONSISTENTEMENTE: grayscale-mode
      document.body.classList.remove('grayscale-mode')
      
      // Remover CSS dinámico
      removeGrayscaleCSS()
      
      // Actualizar estado del botón
      updateGrayscaleButtonState(false)
      
      // Actualizar estado global
      isGrayscale = false
      
      console.log('Escala de grises removida')
      
    } catch (error) {
      console.error('Error removiendo escala de grises:', error)
    }
  }

  function createGrayscaleCSS() {
    var styleId = 'accessibility-grayscale-styles'
    var styleElement = document.getElementById(styleId)
    
    if (!styleElement) {
      styleElement = document.createElement('style')
      styleElement.id = styleId
      document.head.appendChild(styleElement)
    }
    
    var css = 
      'body.grayscale-mode #wrapper:not(.accessibility-menu-portlet), ' +
      'body.grayscale-mode .portlet:not([class*="accessibility"]):not([id*="accessibility"]), ' +
      'body.grayscale-mode .portlet-content:not([class*="accessibility"]), ' +
      'body.grayscale-mode .journal-content-article:not([class*="accessibility"]), ' +
      'body.grayscale-mode .portlet-body:not([class*="accessibility"]), ' +
      'body.grayscale-mode main:not([class*="accessibility"]), ' +
      'body.grayscale-mode .container:not([class*="accessibility"]):not(.floating-menu):not(.whatsapp-floating-button), ' +
      'body.grayscale-mode .container-fluid:not([class*="accessibility"]):not(.floating-menu):not(.whatsapp-floating-button), ' +
      'body.grayscale-mode .content:not([class*="accessibility"]), ' +
      'body.grayscale-mode .main-content:not([class*="accessibility"]), ' +
      'body.grayscale-mode .page-content:not([class*="accessibility"]) { ' +
        'filter: grayscale(100%) !important; transition: filter 0.3s ease !important; ' +
      '} ' +
      'body.grayscale-mode img:not(.floating-menu img):not(.whatsapp-floating-button img):not(.share-modal img):not([class*="accessibility"]), ' +
      'body.grayscale-mode video:not(.floating-menu video):not(.whatsapp-floating-button video):not(.share-modal video):not([class*="accessibility"]) { ' +
        'filter: grayscale(100%) !important; transition: filter 0.3s ease !important; ' +
      '} ' +
      'body.grayscale-mode .floating-menu, body.grayscale-mode .floating-menu *, ' +
      'body.grayscale-mode .whatsapp-floating-button, body.grayscale-mode .whatsapp-floating-button *, ' +
      'body.grayscale-mode .share-modal-overlay, body.grayscale-mode .share-modal-overlay *, ' +
      'body.grayscale-mode [class*="accessibility"], body.grayscale-mode [id*="accessibility"] { ' +
        'filter: none !important; -webkit-filter: none !important; visibility: visible !important; opacity: 1 !important; ' +
      '}'
    
    styleElement.textContent = css
  }

  function removeGrayscaleCSS() {
    var styleElement = document.getElementById('accessibility-grayscale-styles')
    if (styleElement) {
      styleElement.remove()
    }
  }

  function updateGrayscaleButtonState(isActive) {
    var grayscaleButton = document.querySelector('[data-action="grayscale"]')
    
    if (grayscaleButton) {
      if (isActive) {
        grayscaleButton.classList.add('active')
        grayscaleButton.setAttribute('aria-pressed', 'true')
        grayscaleButton.setAttribute('title', 'Desactivar escala de grises')
      } else {
        grayscaleButton.classList.remove('active')
        grayscaleButton.setAttribute('aria-pressed', 'false')
        grayscaleButton.setAttribute('title', 'Activar escala de grises')
      }
    }
  }

  function toggleGrayscale() {
    console.log('Ejecutando toggleGrayscale')
    
    if (isGrayscale) {
      removeGrayscaleSimple()
      announceToScreenReader(CONFIG.messages.notifications.grayscaleOff)
    } else {
      applyGrayscaleSimple()
      announceToScreenReader(CONFIG.messages.notifications.grayscaleOn)
    }
    
    savePreferences()
    return isGrayscale
  }

  // ===== FUNCIÓN DE TEMA =====
  function toggleTheme() {
    console.log('Ejecutando toggleTheme')
    
    isDarkTheme = !isDarkTheme
    var themeButton = document.querySelector('[data-action="themeToggle"]')
    var themeIcon = document.getElementById('theme-icon')
    
    if (isDarkTheme) {
      document.body.classList.add('accessibility-dark-theme')
      if (themeButton) {
        themeButton.classList.add('active')
        themeButton.setAttribute('aria-pressed', 'true')
      }
      if (themeIcon) {
        themeIcon.className = 'ph ph-moon'
      }
      announceToScreenReader(CONFIG.messages.notifications.darkThemeOn)
      console.log('Tema oscuro activado')
    } else {
      document.body.classList.remove('accessibility-dark-theme')
      if (themeButton) {
        themeButton.classList.remove('active')
        themeButton.setAttribute('aria-pressed', 'false')
      }
      if (themeIcon) {
        themeIcon.className = 'ph ph-sun'
      }
      announceToScreenReader(CONFIG.messages.notifications.darkThemeOff)
      console.log('Tema claro activado')
    }
    
    savePreferences()
    return isDarkTheme
  }

  // ===== FUNCIONES DE COMPARTIR =====
  function shareToWhatsApp() {
    var message = encodeURIComponent('Te invito a visitar este sitio web de la Pontificia Universidad Javeriana.')
    var url = encodeURIComponent(window.location.href)
    var whatsappUrl = 'https://api.whatsapp.com/send?text=' + message + '%20' + url
    
    window.open(whatsappUrl, '_blank')
    console.log('Compartido en WhatsApp')
    closeShareModal()
  }

  function shareToFacebook() {
    var url = encodeURIComponent(window.location.href)
    var facebookUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + url
    
    window.open(facebookUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes')
    console.log('Compartido en Facebook')
    closeShareModal()
  }

  function shareToInstagram() {
    copyToClipboard()
      .then(function() {
        alert(CONFIG.messages.notifications.instagramCopy)
        console.log('Enlace copiado para Instagram')
      })
      .catch(function() {
        fallbackCopyPrompt()
      })
    
    closeShareModal()
  }

  function shareToLinkedIn() {
    var url = encodeURIComponent(window.location.href)
    var title = encodeURIComponent('Pontificia Universidad Javeriana')
    var linkedinUrl = 'https://www.linkedin.com/sharing/share-offsite/?url=' + url + '&title=' + title
    
    window.open(linkedinUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes')
    console.log('Compartido en LinkedIn')
    closeShareModal()
  }

  function shareByEmail() {
    var subject = encodeURIComponent('Te invito a visitar este sitio web')
    var body = encodeURIComponent('Te invito a visitar este sitio web de la Pontificia Universidad Javeriana: ' + window.location.href)
    var mailtoUrl = 'mailto:?subject=' + subject + '&body=' + body
    
    window.open(mailtoUrl)
    console.log('Aplicación de email abierta')
    closeShareModal()
  }

  function copyLink() {
    copyToClipboard()
      .then(function() {
        alert(CONFIG.messages.notifications.linkCopied)
        console.log('Enlace copiado al portapapeles')
      })
      .catch(function() {
        fallbackCopyPrompt()
      })
    
    closeShareModal()
  }

  function copyToClipboard() {
    return new Promise(function(resolve, reject) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(window.location.href)
          .then(resolve)
          .catch(reject)
      } else {
        reject(new Error('Clipboard API no disponible'))
      }
    })
  }

  function fallbackCopyPrompt() {
    var url = window.location.href
    
    if (window.prompt) {
      window.prompt('Copia este enlace:', url)
    } else {
      var textArea = document.createElement('textarea')
      textArea.value = url
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      
      try {
        var successful = document.execCommand('copy')
        if (successful) {
          alert(CONFIG.messages.notifications.linkCopied)
        } else {
          alert(CONFIG.messages.notifications.linkCopyError)
        }
      } catch (err) {
        console.error('Error copiando enlace:', err)
        alert(CONFIG.messages.notifications.linkCopyError + ': ' + url)
      }
      
      document.body.removeChild(textArea)
    }
  }

  // ===== MODAL DE COMPARTIR =====
  function openShareModal() {
    var shareModal = document.getElementById('shareModal')
    if (shareModal) {
      shareModal.classList.add('show')
      shareModal.setAttribute('aria-hidden', 'false')
      document.body.style.overflow = 'hidden'
      
      setTimeout(function() {
        var closeButton = document.getElementById('shareModalClose')
        if (closeButton) {
          closeButton.focus()
        }
      }, 150)
    } else {
      // Fallback simple si no hay modal
      var options = [
        '1. WhatsApp',
        '2. Facebook', 
        '3. Instagram',
        '4. LinkedIn',
        '5. Email',
        '6. Copiar Link'
      ]
      var choice = prompt('Selecciona opción de compartir:\n' + options.join('\n'))
      
      switch (choice) {
        case '1':
          shareToWhatsApp()
          break
        case '2':
          shareToFacebook()
          break
        case '3':
          shareToInstagram()
          break
        case '4':
          shareToLinkedIn()
          break
        case '5':
          shareByEmail()
          break
        case '6':
          copyLink()
          break
      }
    }
  }

  function closeShareModal() {
    var shareModal = document.getElementById('shareModal')
    if (shareModal) {
      shareModal.classList.remove('show')
      shareModal.setAttribute('aria-hidden', 'true')
      document.body.style.overflow = ''
      
      setTimeout(function() {
        var shareButton = document.querySelector('[data-action="share"]')
        if (shareButton) {
          shareButton.focus()
        }
      }, 150)
    }
  }

  // ===== MANEJO DE EVENTOS =====
  function handleMenuClick(action) {
    console.log('Acción clickeada:', action)
    
    switch (action) {
      case 'increaseFontSize':
        increaseFontSize()
        break
      case 'decreaseFontSize':
        decreaseFontSize()
        break
      case 'themeToggle':
        toggleTheme()
        break
      case 'grayscale':
        toggleGrayscale()
        break
      case 'share':
        openShareModal()
        break
      case 'whatsapp':
        shareToWhatsApp()
        break
      default:
        console.log('Acción no reconocida:', action)
    }
  }

  function handleShareAction(action) {
    console.log('Acción de compartir:', action)
    
    var shareFunction = {
      'whatsapp': shareToWhatsApp,
      'facebook': shareToFacebook,
      'instagram': shareToInstagram,
      'linkedin': shareToLinkedIn,
      'email': shareByEmail,
      'copy': copyLink
    }[action]
    
    if (shareFunction) {
      shareFunction()
    } else {
      console.warn('Función de compartir no encontrada:', action)
    }
  }

  function handleKeyboard(event) {
    var key = event.key
    var target = event.target

    if (key === 'Escape') {
      var modal = document.getElementById('shareModal')
      if (modal && modal.classList.contains('show')) {
        event.preventDefault()
        closeShareModal()
        return
      }
    }

    if ((key === 'Enter' || key === ' ') && target) {
      var action = target.getAttribute('data-action')
      var shareAction = target.getAttribute('data-share-action')

      if (action) {
        event.preventDefault()
        handleMenuClick(action)
      } else if (shareAction) {
        event.preventDefault()
        handleShareAction(shareAction)
      } else if (target.id === 'shareModalClose') {
        event.preventDefault()
        closeShareModal()
      }
    }
  }

  function handleThemeHover(isHovering) {
    var themeIcon = document.getElementById('theme-icon')
    if (!themeIcon) return

    if (isHovering) {
      var hoverIcon = isDarkTheme ? 'ph ph-sun' : 'ph ph-moon'
      themeIcon.className = hoverIcon
    } else {
      var currentIcon = isDarkTheme ? 'ph ph-moon' : 'ph ph-sun'
      themeIcon.className = currentIcon
    }
  }

  // ===== CARGAR ICONOS =====
  function loadPhosphorIcons() {
    if (!document.querySelector('link[href*="phosphor-icons"]')) {
      var link = document.createElement('link')
      link.rel = 'stylesheet'
      link.type = 'text/css'
      link.href = 'https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/regular/style.css'
      document.head.appendChild(link)
      console.log('Iconos Phosphor cargados')
    }
  }

  // ===== INICIALIZACIÓN =====
  function setupEventListeners() {
    console.log('Configurando event listeners...')

    // Listeners para data-action
    var actionElements = document.querySelectorAll('[data-action]')
    for (var i = 0; i < actionElements.length; i++) {
      var element = actionElements[i]
      var action = element.getAttribute('data-action')
      if (action) {
        element.addEventListener('click', function(e) {
          e.preventDefault()
          e.stopPropagation()
          handleMenuClick(e.target.getAttribute('data-action'))
        })

        if (!element.hasAttribute('tabindex')) {
          element.setAttribute('tabindex', '0')
        }
      }
    }

    // Listeners para data-share-action
    var shareElements = document.querySelectorAll('[data-share-action]')
    for (var i = 0; i < shareElements.length; i++) {
      var element = shareElements[i]
      var shareAction = element.getAttribute('data-share-action')
      if (shareAction) {
        element.addEventListener('click', function(e) {
          e.preventDefault()
          e.stopPropagation()
          handleShareAction(e.target.getAttribute('data-share-action'))
        })

        if (!element.hasAttribute('tabindex')) {
          element.setAttribute('tabindex', '0')
        }
      }
    }

    // Botón cerrar modal
    var closeButton = document.getElementById('shareModalClose')
    if (closeButton) {
      closeButton.addEventListener('click', function(e) {
        e.preventDefault()
        e.stopPropagation()
        closeShareModal()
      })
    }

    // Modal overlay
    var modal = document.getElementById('shareModal')
    if (modal) {
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          closeShareModal()
        }
      })
    }

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboard)

    // Theme hover
    var themeButton = document.querySelector('[data-action="themeToggle"]')
    if (themeButton) {
      themeButton.addEventListener('mouseenter', function() {
        handleThemeHover(true)
      })
      
      themeButton.addEventListener('mouseleave', function() {
        handleThemeHover(false)
      })
    }

    console.log('Event listeners configurados')
  }

  function applyInitialState() {
    console.log('Aplicando estado inicial...')
    
    if (isDarkTheme) {
      document.body.classList.add('accessibility-dark-theme')
      var themeButton = document.querySelector('[data-action="themeToggle"]')
      var themeIcon = document.getElementById('theme-icon')
      if (themeButton) {
        themeButton.classList.add('active')
        themeButton.setAttribute('aria-pressed', 'true')
      }
      if (themeIcon) {
        themeIcon.className = 'ph ph-moon'
      }
    }
    
    if (isGrayscale) {
      applyGrayscaleSimple()
    }
    
    if (fontScale !== 1.0) {
      applyFontScale(fontScale)
    }
    
    console.log('Estado inicial aplicado')
  }

  function initialize() {
    console.log('🚀 Inicializando Barra de Accesibilidad Javeriana v' + CONFIG.version)
    
    // Cargar iconos
    loadPhosphorIcons()
    
    // Cargar preferencias guardadas
    var saved = loadPreferences()
    if (saved) {
      isDarkTheme = saved.darkTheme || false
      isGrayscale = saved.grayscale || false
      fontScale = saved.fontScale || 1.0
      console.log('Preferencias aplicadas:', saved)
    }
    
    // Configurar event listeners
    setupEventListeners()
    
    // Aplicar estado inicial
    applyInitialState()
    
    // Anuncio final
    setTimeout(function() {
      announceToScreenReader(CONFIG.messages.notifications.menuReady)
    }, 1000)
    
    console.log('✅ Barra de Accesibilidad inicializada correctamente')
  }

  // ===== API PÚBLICA =====
  var PublicAPI = {
    version: CONFIG.version,
    
    // Funciones principales
    increaseFontSize: increaseFontSize,
    decreaseFontSize: decreaseFontSize,
    toggleGrayscale: toggleGrayscale,
    toggleTheme: toggleTheme,
    openShareModal: openShareModal,
    closeShareModal: closeShareModal,
    
    // Funciones de compartir
    shareToWhatsApp: shareToWhatsApp,
    shareToFacebook: shareToFacebook,
    shareToInstagram: shareToInstagram,
    shareToLinkedIn: shareToLinkedIn,
    shareByEmail: shareByEmail,
    copyLink: copyLink,
    
    // Utilidades
    getState: function() {
      return {
        isDarkTheme: isDarkTheme,
        isGrayscale: isGrayscale,
        fontScale: fontScale,
        version: CONFIG.version
      }
    },
    
    reset: function() {
      console.log('Reseteando sistema...')
      
      document.body.classList.remove('accessibility-dark-theme', 'grayscale-mode')
      document.body.style.overflow = ''
      
      resetFontScale()
      removeGrayscaleSimple()
      closeShareModal()
      
      var themeButton = document.querySelector('[data-action="themeToggle"]')
      var grayscaleButton = document.querySelector('[data-action="grayscale"]')
      var themeIcon = document.getElementById('theme-icon')
      
      if (themeButton) {
        themeButton.classList.remove('active')
        themeButton.setAttribute('aria-pressed', 'false')
      }
      
      if (grayscaleButton) {
        grayscaleButton.classList.remove('active')
        grayscaleButton.setAttribute('aria-pressed', 'false')
      }
      
      if (themeIcon) {
        themeIcon.className = 'ph ph-sun'
      }
      
      isDarkTheme = false
      isGrayscale = false
      fontScale = 1.0
      
      localStorage.removeItem(CONFIG.storage.key)
      
      console.log('Sistema reseteado')
      announceToScreenReader('Configuración de accesibilidad reseteada')
    },
    
    setDebug: function(enabled) {
      CONFIG.debug = enabled
      console.log('Modo debug ' + (enabled ? 'activado' : 'desactivado'))
    }
  }

  // Exponer API pública
  if (typeof window !== 'undefined') {
    window.AccessibilityMenuJaveriana = PublicAPI
    
    // Funciones individuales para compatibilidad
    window.handleMenuClick = handleMenuClick
    window.handleThemeHover = handleThemeHover
    window.toggleGrayscale = toggleGrayscale
    window.toggleTheme = toggleTheme
    window.shareToWhatsApp = shareToWhatsApp
    window.shareToFacebook = shareToFacebook
    window.shareToInstagram = shareToInstagram
    window.shareToLinkedIn = shareToLinkedIn
    window.shareByEmail = shareByEmail
    window.copyLink = copyLink
    window.openShareModal = openShareModal
    window.closeShareModal = closeShareModal
    window.loadPhosphorIcons = loadPhosphorIcons
    window.increaseFontSize = increaseFontSize
    window.decreaseFontSize = decreaseFontSize
    
    console.log('🌍 API pública disponible en window.AccessibilityMenuJaveriana')
  }

  // Auto-inicialización
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize)
  } else {
    // DOM ya está listo
    setTimeout(initialize, 100)
  }

  // Backup de inicialización
  window.addEventListener('load', function() {
    setTimeout(function() {
      if (!window.AccessibilityMenuJaveriana) {
        console.warn('Inicialización backup ejecutada')
        initialize()
      }
    }, 500)
  })

})();