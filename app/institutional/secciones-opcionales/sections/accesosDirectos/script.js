// ===== FLOATING MENU SCRIPT CON ZOOM SIMPLE (COMO TU EJEMPLO) =====
(function(window, document, Liferay) {
  'use strict';

  // Evitar múltiples instancias
  if (window.FloatingMenuLiferay) {
    console.log('FloatingMenu ya existe, reinicializando...');
    window.FloatingMenuLiferay.destroy();
  }

  // ===== FUNCIONES DE UTILIDAD (BASADAS EN TU EJEMPLO) =====
  function parseThemeBase(themeId) {
    if (!themeId) return "light";
    return themeId.includes("dark") ? "dark" : "light";
  }

  function detectCurrentTheme() {
    // Usar variables globales directas como en tu ejemplo
    if (typeof currentBase !== "undefined") return currentBase;
    if (typeof themeDisplay !== "undefined") {
      return parseThemeBase(themeDisplay.getThemeId());
    }
    return document.body.classList.contains("dark") ? "dark" : "light";
  }

  var FloatingMenuLiferay = {
    // ===== CONFIGURACIÓN =====
    config: {
      version: '3.4.0-liferay-simple-zoom',
      initialization: {
        delayAfterMount: 300
      },
      breakpoints: {
        mobile: 768
      }
    },

    // ===== ESTADO =====
    state: {
      isMobile: false,
      isMenuExpanded: false,
      showShareModal: false,
      initialized: false,
      themeState: 'light',
      scaleLevel: 0, // Como en tu ejemplo
      isGrayscaleActive: false
    },

    // ===== ELEMENTOS DOM =====
    elements: {},
    eventListeners: [],

    // ===== INICIALIZACIÓN =====
    init: function(customConfig, portletId) {
      console.log('=== INICIANDO FLOATING MENU LIFERAY v' + this.config.version + ' ===');
      
      if (customConfig) {
        for (var key in customConfig) {
          if (customConfig.hasOwnProperty(key)) {
            this.config[key] = customConfig[key];
          }
        }
      }
      
      // Verificar que el DOM esté cargado
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', this.initializeComponent.bind(this));
      } else {
        this.initializeComponent();
      }
    },

    initializeComponent: function() {
      console.log('=== INICIALIZANDO COMPONENTE ===');
      
      try {
        // Cache de elementos DOM
        if (!this.cacheElements()) {
          console.error('FloatingMenu: No se pudieron encontrar los elementos necesarios');
          return;
        }

        // Estado inicial
        this.updateInitialState();

        // Detectar tema actual
        this.state.themeState = detectCurrentTheme();
        currentBase = this.state.themeState;
        window.currentBase = this.state.themeState;
        console.log('Tema inicial detectado:', this.state.themeState);

        // Asegurar modal oculto
        this.ensureModalHidden();

        // Aplicar display inicial
        this.applyInitialDisplay();

        // Configurar con delay mínimo
        setTimeout(function() {
          this.loadPhosphorIcons();
          this.setupEventListeners();
          this.updateState({ initialized: true });
          this.forceCorrectDisplay();
          console.log('=== FLOATING MENU INICIALIZADO CORRECTAMENTE ===');
        }.bind(this), this.config.initialization.delayAfterMount);

      } catch (error) {
        console.error('Error inicializando FloatingMenu:', error);
      }
    },

    cacheElements: function() {
      console.log('=== BUSCANDO ELEMENTOS DOM ===');
      
      this.elements = {
        container: document.getElementById('floating-menu-container'),
        mainMenu: document.getElementById('floating-menu-main'),
        toggleButton: document.querySelector('.menu-toggle-button'),
        closeButton: document.querySelector('.menu-close-button'),
        menuItems: document.querySelectorAll('.menu-item'),
        whatsappButton: document.getElementById('whatsapp-floating-button'),
        shareModal: document.getElementById('share-modal-overlay'),
        shareOptions: document.querySelectorAll('.share-option'),
        
        // Elementos específicos por ID (como en tu ejemplo)
        btnIncreaseFontSize: document.getElementById('btnIncreaseFontSize'),
        btnDecreaseFontSize: document.getElementById('btnDecreaseFontSize'),
        btnThemeToggle: document.getElementById('btnThemeToggle'),
        btnGrayscale: document.getElementById('btnGrayscale'),
        btnShare: document.getElementById('btnShare'),
        btnWhatsapp: document.getElementById('btnWhatsapp')
      };

      var found = {
        container: !!this.elements.container,
        mainMenu: !!this.elements.mainMenu,
        btnIncreaseFontSize: !!this.elements.btnIncreaseFontSize,
        btnDecreaseFontSize: !!this.elements.btnDecreaseFontSize,
        btnThemeToggle: !!this.elements.btnThemeToggle,
        btnGrayscale: !!this.elements.btnGrayscale,
        btnShare: !!this.elements.btnShare,
        btnWhatsapp: !!this.elements.btnWhatsapp
      };

      console.log('Elementos encontrados:', found);

      if (!this.elements.container || !this.elements.mainMenu) {
        console.error('FloatingMenu: Elementos críticos no encontrados');
        return false;
      }

      return true;
    },

    ensureModalHidden: function() {
      if (this.elements.shareModal) {
        this.elements.shareModal.classList.add('share-modal-hidden');
        this.elements.shareModal.classList.remove('share-modal-visible');
      }
    },

    // ===== UTILIDADES =====
    checkMobileDevice: function() {
      return window.innerWidth <= this.config.breakpoints.mobile;
    },

    loadPhosphorIcons: function() {
      if (document.querySelector('link[href*="phosphor-icons"]')) {
        console.log('Phosphor Icons ya cargados');
        return;
      }
      
      try {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = 'https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/regular/style.css';
        link.onload = function() { console.log('Phosphor Icons cargados'); };
        link.onerror = function() { console.warn('Error cargando Phosphor Icons'); };
        document.head.appendChild(link);
      } catch (error) {
        console.warn('Error cargando iconos:', error);
      }
    },

    updateInitialState: function() {
      var isMobile = this.checkMobileDevice();
      console.log('Estado inicial - Es móvil:', isMobile, '(ancho:', window.innerWidth + 'px)');
      
      this.state.isMobile = isMobile;
      this.state.isMenuExpanded = !isMobile; // Desktop expandido, móvil colapsado
    },

    updateState: function(newState) {
      for (var key in newState) {
        if (newState.hasOwnProperty(key)) {
          this.state[key] = newState[key];
        }
      }
      this.updateMenuDisplay();
    },

    applyInitialDisplay: function() {
      console.log('=== APLICANDO DISPLAY INICIAL ===');
      
      if (!this.elements.mainMenu) return;
      
      var isMobile = this.state.isMobile;
      var isExpanded = this.state.isMenuExpanded;
      
      console.log('Display inicial:', { isMobile: isMobile, isExpanded: isExpanded });
      
      // Aplicar clases correctas
      if (isMobile) {
        this.elements.mainMenu.className = isExpanded ? 'floating-menu mobile-expanded' : 'floating-menu collapsed';
      } else {
        this.elements.mainMenu.className = 'floating-menu';
      }
      
      // Forzar visibilidad
      this.elements.mainMenu.style.display = 'flex';
      this.elements.mainMenu.style.visibility = 'visible';
      this.elements.mainMenu.style.opacity = '1';
      
      console.log('Clases aplicadas:', this.elements.mainMenu.className);
    },

    forceCorrectDisplay: function() {
      console.log('=== FORZANDO DISPLAY CORRECTO ===');
      
      var isMobile = this.state.isMobile;
      
      if (!isMobile) {
        // Desktop: ocultar botones toggle/close
        if (this.elements.toggleButton) this.elements.toggleButton.style.display = 'none';
        if (this.elements.closeButton) this.elements.closeButton.style.display = 'none';
        
        // Mostrar todos los elementos principales
        if (this.elements.btnIncreaseFontSize) this.elements.btnIncreaseFontSize.style.display = 'flex';
        if (this.elements.btnDecreaseFontSize) this.elements.btnDecreaseFontSize.style.display = 'flex';
        if (this.elements.btnThemeToggle) this.elements.btnThemeToggle.style.display = 'flex';
        if (this.elements.btnGrayscale) this.elements.btnGrayscale.style.display = 'flex';
        if (this.elements.btnShare) this.elements.btnShare.style.display = 'flex';
        
        this.elements.mainMenu.className = 'floating-menu';
        console.log('Modo desktop: todos los elementos visibles');
        
      } else {
        // Mobile: aplicar lógica móvil
        this.updateMenuDisplay();
        console.log('Modo móvil: aplicando lógica móvil');
      }
    },

    // ===== FUNCIONES DE ZOOM SIMPLE (EXACTAMENTE COMO TU EJEMPLO) =====
    
    // 🔠 Escala de fuente - AUMENTAR (como tu ejemplo)
    increaseFontSize: function() {
      console.log('=== AUMENTAR FUENTE (MÉTODO SIMPLE) ===');
      
      // Exactamente como tu ejemplo
      var scaleSteps = [1, 1.1, 1.2];
      this.state.scaleLevel = (this.state.scaleLevel + 1) % scaleSteps.length;
      
      // Tu línea exacta
      document.documentElement.style.fontSize = (16 * scaleSteps[this.state.scaleLevel]) + 'px';
      
      console.log('Escala aplicada:', scaleSteps[this.state.scaleLevel], '- Tamaño:', (16 * scaleSteps[this.state.scaleLevel]) + 'px');
      this.showNotification('Fuente: ' + Math.round(scaleSteps[this.state.scaleLevel] * 100) + '%');
    },

    // 🔠 Escala de fuente - DISMINUIR (adaptación de tu ejemplo)
    decreaseFontSize: function() {
      console.log('=== DISMINUIR FUENTE (MÉTODO SIMPLE) ===');
      
      // Ciclo hacia atrás en el array
      var scaleSteps = [1, 1.1, 1.2];
      this.state.scaleLevel = this.state.scaleLevel === 0 ? scaleSteps.length - 1 : this.state.scaleLevel - 1;
      
      // Tu línea exacta
      document.documentElement.style.fontSize = (16 * scaleSteps[this.state.scaleLevel]) + 'px';
      
      console.log('Escala aplicada:', scaleSteps[this.state.scaleLevel], '- Tamaño:', (16 * scaleSteps[this.state.scaleLevel]) + 'px');
      this.showNotification('Fuente: ' + Math.round(scaleSteps[this.state.scaleLevel] * 100) + '%');
    },

    // 🌓 Alternar tema (exactamente como tu ejemplo)
    themeToggle: function() {
      console.log('=== CAMBIO DE TEMA ===');
      
      try {
        if (typeof applyTheme !== "function") {
          console.warn("⚠️ applyTheme no está disponible.");
          this.showNotification('Función de tema no disponible');
          return;
        }
        
        var newTheme = this.state.themeState === "dark" ? "light" : "dark";
        console.log('Cambiando tema de', this.state.themeState, 'a', newTheme);
        
        // Actualizar variables globales (como en tu ejemplo)
        this.state.themeState = newTheme;
        currentBase = newTheme;
        window.currentBase = newTheme;
        
        applyTheme(newTheme, currentFaculty || "default");
        
        this.showNotification('Tema: ' + (newTheme === 'dark' ? 'Oscuro' : 'Claro'));
        console.log("🌓 Tema cambiado a:", newTheme);
        
        this.updateThemeIcon();
        
      } catch (error) {
        console.error("❌ Error al cambiar el tema:", error);
        this.showNotification('Error al cambiar el tema');
      }
    },

    updateThemeIcon: function() {
      var themeButton = this.elements.btnThemeToggle;
      if (themeButton) {
        var iconElement = themeButton.querySelector('i');
        if (iconElement) {
          var isDark = this.state.themeState === 'dark';
          iconElement.className = isDark ? 'ph ph-moon' : 'ph ph-sun';
          console.log('Icono actualizado:', isDark ? 'luna' : 'sol');
        }
      }
    },

    // ⚫ Escala de grises (exactamente como tu ejemplo)
    toggleGrayscale: function() {
      console.log('=== TOGGLE ESCALA DE GRISES ===');
      
      var htmlElement = document.documentElement;
      console.log('Antes:', htmlElement.classList.contains('grayscale'));
      
      htmlElement.classList.toggle("grayscale");
      
      var isActive = htmlElement.classList.contains('grayscale');
      this.state.isGrayscaleActive = isActive;
      
      console.log('Después:', isActive);
      this.showNotification(isActive ? 'Escala de grises activada' : 'Escala de grises desactivada');
    },

    // ===== FUNCIONES DE COMPARTIR =====
    shareOnFacebook: function() {
      var url = encodeURIComponent(window.location.href);
      var text = encodeURIComponent(document.title);
      var shareUrl = "https://www.facebook.com/sharer/sharer.php?u=" + url + "&quote=" + text;
      window.open(shareUrl, "_blank");
    },

    shareOnWhatsApp: function() {
      var url = encodeURIComponent(window.location.href);
      var text = encodeURIComponent('¡Mira este programa académico de la Pontificia Universidad Javeriana!');
      var whatsappUrl = "https://wa.me/?text=" + text + "%20" + url;
      window.open(whatsappUrl, "_blank");
    },

    // ===== MANEJADORES DE ACCIONES =====
    handleMenuAction: function(action) {
      console.log('=== ACCIÓN:', action, '===');
      
      switch (action) {
        case 'toggleMenu':
          this.toggleMobileMenu();
          break;
        case 'share':
          this.openShareModal();
          break;
        case 'increaseFontSize':
          this.increaseFontSize();
          break;
        case 'decreaseFontSize':
          this.decreaseFontSize();
          break;
        case 'themeToggle':
          this.themeToggle();
          break;
        case 'grayscale':
          this.toggleGrayscale();
          break;
        case 'whatsapp':
          this.shareOnWhatsApp();
          break;
        default:
          console.log('Acción no reconocida:', action);
      }
    },

    // ===== DISPLAY Y RESPONSIVE =====
    updateMenuDisplay: function() {
      if (!this.elements.mainMenu) return;

      var isMobile = this.state.isMobile;
      var isExpanded = this.state.isMenuExpanded;
      var menuClasses = ['floating-menu'];
      
      console.log('Actualizando display:', { isMobile: isMobile, isExpanded: isExpanded });
      
      if (isMobile && isExpanded) {
        menuClasses.push('mobile-expanded');
      } else if (isMobile && !isExpanded) {
        menuClasses.push('collapsed');
      }

      this.elements.mainMenu.className = menuClasses.join(' ');

      // Control de visibilidad de elementos
      this.updateToggleButtons();
      this.updateMenuItems();
      this.updateWhatsAppButton();
      this.updateShareModal();
    },

    updateToggleButtons: function() {
      var isMobile = this.state.isMobile;
      var isExpanded = this.state.isMenuExpanded;

      if (this.elements.toggleButton) {
        this.elements.toggleButton.style.display = !isMobile ? 'none' : (!isExpanded ? 'flex' : 'none');
      }

      if (this.elements.closeButton) {
        this.elements.closeButton.style.display = !isMobile ? 'none' : (isExpanded ? 'flex' : 'none');
      }
    },

    updateMenuItems: function() {
      var isMobile = this.state.isMobile;
      var isExpanded = this.state.isMenuExpanded;

      // Actualizar elementos principales por ID
      var mainItems = [
        this.elements.btnIncreaseFontSize,
        this.elements.btnDecreaseFontSize,
        this.elements.btnThemeToggle,
        this.elements.btnGrayscale,
        this.elements.btnShare
      ];

      for (var i = 0; i < mainItems.length; i++) {
        var item = mainItems[i];
        if (item) {
          if (isMobile && !isExpanded) {
            item.style.display = 'none';
          } else {
            item.style.display = 'flex';
          }
        }
      }
    },

    updateWhatsAppButton: function() {
      if (this.elements.whatsappButton) {
        var shouldShow = !this.state.isMobile || this.state.isMenuExpanded;
        this.elements.whatsappButton.style.display = shouldShow ? 'block' : 'none';
      }
    },

    updateShareModal: function() {
      if (this.elements.shareModal) {
        if (this.state.showShareModal) {
          this.elements.shareModal.classList.remove('share-modal-hidden');
          this.elements.shareModal.classList.add('share-modal-visible');
        } else {
          this.elements.shareModal.classList.remove('share-modal-visible');
          this.elements.shareModal.classList.add('share-modal-hidden');
        }
      }
    },

    toggleMobileMenu: function() {
      if (!this.state.isMobile) {
        console.log('Intento de toggle en desktop - ignorado');
        return;
      }

      console.log('Toggle móvil:', this.state.isMenuExpanded, '->', !this.state.isMenuExpanded);
      
      this.updateState({
        isMenuExpanded: !this.state.isMenuExpanded
      });
    },

    // ===== MODAL DE COMPARTIR =====
    openShareModal: function() {
      console.log('Abriendo modal de compartir');
      this.updateState({ showShareModal: true });
      document.body.style.overflow = 'hidden';
    },

    closeShareModal: function() {
      console.log('Cerrando modal de compartir');
      this.updateState({ showShareModal: false });
      document.body.style.overflow = '';
    },

    // ===== NOTIFICACIONES =====
    showNotification: function(message) {
      var notification = document.createElement('div');
      notification.textContent = message;
      notification.className = 'floating-menu-notification';
      notification.style.cssText = 
        'position: fixed; top: 20px; right: 20px; background: #4866d1; color: white; ' +
        'padding: 12px 24px; border-radius: 8px; z-index: 10000; font-size: 14px; ' +
        'box-shadow: 0 4px 12px rgba(0,0,0,0.2); opacity: 0; transform: translateX(100%); ' +
        'transition: all 0.3s ease;';

      document.body.appendChild(notification);

      setTimeout(function() {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
      }, 10);

      setTimeout(function() {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(function() {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 300);
      }, 3000);
    },

    // ===== EVENT LISTENERS =====
    setupEventListeners: function() {
      console.log('=== CONFIGURANDO EVENT LISTENERS ===');
      
      var self = this;

      // Resize listener
      this.addEventListener(window, 'resize', function() {
        var isMobile = self.checkMobileDevice();
        var wasInMobile = self.state.isMobile;

        if (isMobile !== wasInMobile) {
          console.log('Cambio de viewport:', wasInMobile ? 'mobile' : 'desktop', '->', isMobile ? 'mobile' : 'desktop');
          
          self.updateState({
            isMobile: isMobile,
            isMenuExpanded: !isMobile
          });

          if (!isMobile) {
            self.forceCorrectDisplay();
          }
        }
      });

      // Event listeners por elemento específico
      if (this.elements.btnIncreaseFontSize) {
        this.addEventListener(this.elements.btnIncreaseFontSize, 'click', function(e) {
          e.preventDefault();
          self.increaseFontSize();
        });
        console.log('Listener configurado para aumentar fuente');
      }

      if (this.elements.btnDecreaseFontSize) {
        this.addEventListener(this.elements.btnDecreaseFontSize, 'click', function(e) {
          e.preventDefault();
          self.decreaseFontSize();
        });
        console.log('Listener configurado para disminuir fuente');
      }

      if (this.elements.btnThemeToggle) {
        this.addEventListener(this.elements.btnThemeToggle, 'click', function(e) {
          e.preventDefault();
          self.themeToggle();
        });
        console.log('Listener configurado para cambio de tema');
      }

      if (this.elements.btnGrayscale) {
        this.addEventListener(this.elements.btnGrayscale, 'click', function(e) {
          e.preventDefault();
          self.toggleGrayscale();
        });
        console.log('Listener configurado para escala de grises');
      }

      if (this.elements.btnShare) {
        this.addEventListener(this.elements.btnShare, 'click', function(e) {
          e.preventDefault();
          self.openShareModal();
        });
        console.log('Listener configurado para compartir');
      }

      if (this.elements.btnWhatsapp) {
        this.addEventListener(this.elements.btnWhatsapp, 'click', function(e) {
          e.preventDefault();
          self.shareOnWhatsApp();
        });
        console.log('Listener configurado para WhatsApp');
      }

      // Toggle buttons para mobile
      if (this.elements.toggleButton) {
        this.addEventListener(this.elements.toggleButton, 'click', function(e) {
          e.preventDefault();
          self.toggleMobileMenu();
        });
      }

      if (this.elements.closeButton) {
        this.addEventListener(this.elements.closeButton, 'click', function(e) {
          e.preventDefault();
          self.toggleMobileMenu();
        });
      }

      // Modal close
      var closeButton = document.querySelector('.share-modal-close');
      if (closeButton) {
        this.addEventListener(closeButton, 'click', function(e) {
          e.preventDefault();
          self.closeShareModal();
        });
      }

      // Share options
      if (this.elements.shareOptions) {
        for (var i = 0; i < this.elements.shareOptions.length; i++) {
          var option = this.elements.shareOptions[i];
          var shareType = option.getAttribute('data-share');
          if (shareType) {
            (function(type) {
              self.addEventListener(option, 'click', function(e) {
                e.preventDefault();
                self.handleShareAction(type);
              });
            })(shareType);
          }
        }
      }

      // ESC key
      this.addEventListener(document, 'keydown', function(e) {
        if (e.key === 'Escape' && self.state.showShareModal) {
          self.closeShareModal();
        }
      });

      console.log('Event listeners configurados exitosamente');
    },

    handleShareAction: function(shareType) {
      console.log('Acción de compartir:', shareType);
      
      switch(shareType) {
        case 'whatsapp':
          this.shareOnWhatsApp();
          break;
        case 'facebook':
          this.shareOnFacebook();
          break;
        case 'instagram':
          this.copyToClipboard();
          this.showNotification('Enlace copiado. Compártelo en tu historia de Instagram.');
          break;
        case 'linkedin':
          var url = encodeURIComponent(window.location.href);
          var title = encodeURIComponent(document.title);
          window.open('https://www.linkedin.com/sharing/share-offsite/?url=' + url + '&title=' + title, '_blank');
          break;
        case 'email':
          var subject = encodeURIComponent('Programa académico - ' + document.title);
          var body = encodeURIComponent('Te comparto este programa de la Pontificia Universidad Javeriana: ' + window.location.href);
          window.location.href = 'mailto:?subject=' + subject + '&body=' + body;
          break;
        case 'copy':
          this.copyToClipboard();
          break;
      }
      
      this.closeShareModal();
    },

    copyToClipboard: function() {
      var self = this;
      
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(window.location.href).then(function() {
          self.showNotification('Enlace copiado al portapapeles');
        }).catch(function() {
          self.fallbackCopyToClipboard();
        });
      } else {
        this.fallbackCopyToClipboard();
      }
    },

    fallbackCopyToClipboard: function() {
      var textArea = document.createElement('textarea');
      textArea.value = window.location.href;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand('copy');
        this.showNotification('Enlace copiado al portapapeles');
      } catch (err) {
        this.showNotification('No se pudo copiar el enlace');
      }

      document.body.removeChild(textArea);
    },

    addEventListener: function(element, event, handler) {
      element.addEventListener(event, handler);
      this.eventListeners.push({ element: element, event: event, handler: handler });
    },

    // ===== CLEANUP =====
    destroy: function() {
      console.log('=== DESTRUYENDO FLOATING MENU ===');

      for (var i = 0; i < this.eventListeners.length; i++) {
        var listener = this.eventListeners[i];
        listener.element.removeEventListener(listener.event, listener.handler);
      }
      this.eventListeners = [];

      document.body.style.overflow = '';

      this.state = {
        isMobile: false,
        isMenuExpanded: false,
        showShareModal: false,
        initialized: false,
        themeState: 'light',
        scaleLevel: 0,
        isGrayscaleActive: false
      };

      this.elements = {};
      console.log('FloatingMenu destruido correctamente');
    }
  };

  // ===== REGISTRO E INICIALIZACIÓN =====
  window.FloatingMenuLiferay = FloatingMenuLiferay;

  if (typeof Liferay !== 'undefined') {
    Liferay.FloatingMenu = FloatingMenuLiferay;
    
    Liferay.on('portletDestroy', function(event) {
      if (FloatingMenuLiferay.state.portletId === event.portletId) {
        FloatingMenuLiferay.destroy();
      }
    });
  }

  // ===== INICIALIZACIÓN CON VERIFICACIÓN =====
  var checkInterval = setInterval(function() {
    var elementsReady = document.getElementById('floating-menu-container') &&
                       document.getElementById('floating-menu-main') &&
                       document.getElementById('btnIncreaseFontSize') &&
                       document.getElementById('btnDecreaseFontSize') &&
                       document.getElementById('btnThemeToggle') &&
                       document.getElementById('btnGrayscale');
    
    if (elementsReady) {
      console.log('✅ Elementos detectados, inicializando FloatingMenu');
      FloatingMenuLiferay.init();
      clearInterval(checkInterval);
    } else {
      console.log('⏳ Esperando elementos del DOM...');
    }
  }, 300);

  // Timeout de seguridad
  setTimeout(function() {
    clearInterval(checkInterval);
    if (!FloatingMenuLiferay.state.initialized) {
      console.warn('⚠️ Timeout: Inicializando FloatingMenu sin todos los elementos');
      FloatingMenuLiferay.init();
    }
  }, 5000);

  return FloatingMenuLiferay;

})(window, document, window.Liferay || {});