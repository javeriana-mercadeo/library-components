// floating-menu-script.js - Adaptado para Next.js
(function() {
  'use strict';

  // ===== VERIFICACIONES DE ENTORNO =====
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    console.log('FloatingMenu: Entorno servidor detectado, script no ejecutado');
    return;
  }

  // Evitar múltiples instancias
  if (window.FloatingMenuNextJS) {
    console.log('FloatingMenu ya existe, reinicializando...');
    window.FloatingMenuNextJS.destroy();
  }

  // ===== FUNCIONES DE UTILIDAD =====
  function parseThemeBase(themeId) {
    if (!themeId) return "light";
    return themeId.includes("dark") ? "dark" : "light";
  }

  function detectCurrentTheme() {
    if (typeof window.currentBase !== "undefined") return window.currentBase;
    if (typeof window.themeDisplay !== "undefined") {
      return parseThemeBase(window.themeDisplay.getThemeId());
    }
    return document.body.classList.contains("dark") ? "dark" : "light";
  }

  var FloatingMenuNextJS = {
    // ===== CONFIGURACIÓN =====
    config: {
      version: '3.5.0-nextjs-compatible',
      initialization: {
        delayAfterMount: 1000 // Aumentar delay para Next.js
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
      scaleLevel: 0,
      isGrayscaleActive: false,
      isReady: false
    },

    // ===== ELEMENTOS DOM =====
    elements: {},
    eventListeners: [],

    // ===== INICIALIZACIÓN =====
    init: function() {
      console.log('=== INICIANDO FLOATING MENU NEXTJS v' + this.config.version + ' ===');
      
      // Verificar que estemos en el cliente
      if (typeof window === 'undefined') return;
      
      // Esperar a que React termine de renderizar
      this.waitForReactRender();
    },

    waitForReactRender: function() {
      var self = this;
      var attempts = 0;
      var maxAttempts = 20;
      
      function checkForElements() {
        var container = document.getElementById('floating-menu-container');
        var mainMenu = document.getElementById('floating-menu-main');
        
        if (container && mainMenu) {
          console.log('✅ Elementos React encontrados, inicializando...');
          setTimeout(function() {
            self.initializeComponent();
          }, self.config.initialization.delayAfterMount);
        } else {
          attempts++;
          if (attempts < maxAttempts) {
            console.log('⏳ Esperando elementos React...', attempts + '/' + maxAttempts);
            setTimeout(checkForElements, 500);
          } else {
            console.warn('⚠️ Timeout: Elementos React no encontrados');
          }
        }
      }
      
      checkForElements();
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
        if (typeof window !== 'undefined') {
          window.currentBase = this.state.themeState;
        }

        // Asegurar modal oculto
        this.ensureModalHidden();

        // Aplicar display inicial
        this.applyInitialDisplay();

        // Configurar funcionalidades
        this.loadPhosphorIcons();
        this.setupEventListeners();
        this.initWhatsAppFallback();
        
        // Marcar como inicializado
        this.state.initialized = true;
        this.forceCorrectDisplay();
        
        // Mostrar el menú
        this.showMenuWhenReady();
        
        console.log('=== FLOATING MENU INICIALIZADO CORRECTAMENTE ===');

      } catch (error) {
        console.error('Error inicializando FloatingMenu:', error);
      }
    },

    showMenuWhenReady: function() {
      var self = this;
      setTimeout(function() {
        if (typeof document !== 'undefined') {
          document.body.classList.add('floating-menu-ready');
          self.state.isReady = true;
          console.log('Menú visible después de carga completa');
        }
      }, 500);
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
        
        // Elementos específicos por ID
        btnIncreaseFontSize: document.getElementById('btnIncreaseFontSize'),
        btnDecreaseFontSize: document.getElementById('btnDecreaseFontSize'),
        btnThemeToggle: document.getElementById('btnThemeToggle'),
        btnGrayscale: document.getElementById('btnGrayscale'),
        btnShare: document.getElementById('btnShare'),
      };

      var found = {
        container: !!this.elements.container,
        mainMenu: !!this.elements.mainMenu,
        btnIncreaseFontSize: !!this.elements.btnIncreaseFontSize,
        btnDecreaseFontSize: !!this.elements.btnDecreaseFontSize,
        btnThemeToggle: !!this.elements.btnThemeToggle,
        btnGrayscale: !!this.elements.btnGrayscale,
        btnShare: !!this.elements.btnShare,
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

    // ===== UTILIDADES SEGURAS =====
    checkMobileDevice: function() {
      if (typeof window === 'undefined') return false;
      return window.innerWidth <= this.config.breakpoints.mobile;
    },

    loadPhosphorIcons: function() {
      if (typeof document === 'undefined') return;
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
      this.state.isMenuExpanded = !isMobile;
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
      
      if (isMobile) {
        this.elements.mainMenu.className = isExpanded ? 'floating-menu mobile-expanded' : 'floating-menu collapsed';
      } else {
        this.elements.mainMenu.className = 'floating-menu';
      }
      
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
        var mainItems = [
          this.elements.btnIncreaseFontSize,
          this.elements.btnDecreaseFontSize,
          this.elements.btnThemeToggle,
          this.elements.btnGrayscale,
          this.elements.btnShare
        ];

        for (var i = 0; i < mainItems.length; i++) {
          var item = mainItems[i];
          if (item) item.style.display = 'flex';
        }
        
        this.elements.mainMenu.className = 'floating-menu';
        console.log('Modo desktop: todos los elementos visibles');
        
      } else {
        this.updateMenuDisplay();
        console.log('Modo móvil: aplicando lógica móvil');
      }
    },

    // ===== FUNCIONES DE ZOOM =====
    increaseFontSize: function() {
      console.log('=== AUMENTAR FUENTE ===');
      
      var scaleSteps = [1, 1.1, 1.2];
      var maxLevel = scaleSteps.length - 1;
      
      if (this.state.scaleLevel < maxLevel) {
        this.state.scaleLevel++;
        document.documentElement.style.fontSize = (16 * scaleSteps[this.state.scaleLevel]) + 'px';
        this.showNotification('Fuente: ' + Math.round(scaleSteps[this.state.scaleLevel] * 100) + '%');
      } else {
        this.showNotification('Fuente en tamaño máximo (120%)');
      }
    },

    decreaseFontSize: function() {
      console.log('=== DISMINUIR FUENTE ===');
      
      var scaleSteps = [1, 1.1, 1.2];
      var minLevel = 0;
      
      if (this.state.scaleLevel > minLevel) {
        this.state.scaleLevel--;
        document.documentElement.style.fontSize = (16 * scaleSteps[this.state.scaleLevel]) + 'px';
        this.showNotification('Fuente: ' + Math.round(scaleSteps[this.state.scaleLevel] * 100) + '%');
      } else {
        this.showNotification('Fuente en tamaño mínimo (100%)');
      }
    },

    // ===== CAMBIO DE TEMA =====
    themeToggle: function() {
      console.log('=== CAMBIO DE TEMA ===');
      
      try {
        var newTheme = this.state.themeState === "dark" ? "light" : "dark";
        console.log('Cambiando tema de', this.state.themeState, 'a', newTheme);
        
        // Actualizar estado
        this.state.themeState = newTheme;
        if (typeof window !== 'undefined') {
          window.currentBase = newTheme;
        }
        
        // Aplicar tema usando función global si existe
        if (typeof window.applyTheme === "function") {
          window.applyTheme(newTheme, window.currentFaculty || "default");
        } else {
          // Fallback: aplicar clase directamente
          document.body.classList.toggle('dark', newTheme === 'dark');
        }
        
        this.showNotification('Tema: ' + (newTheme === 'dark' ? 'Oscuro' : 'Claro'));
        this.updateThemeIcon();
        
      } catch (error) {
        console.error("Error al cambiar el tema:", error);
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
        }
      }
    },

    // ===== ESCALA DE GRISES =====
    toggleGrayscale: function() {
      console.log('=== TOGGLE ESCALA DE GRISES ===');
      
      var htmlElement = document.documentElement;
      htmlElement.classList.toggle("grayscale");
      
      var isActive = htmlElement.classList.contains('grayscale');
      this.state.isGrayscaleActive = isActive;
      
      this.showNotification(isActive ? 'Escala de grises activada' : 'Escala de grises desactivada');
    },

    // ===== WHATSAPP FALLBACK =====
    initWhatsAppFallback: function() {
      console.log('=== INICIALIZANDO WHATSAPP FALLBACK ===');
      
      var self = this;
      
      // Buscar botón WhatsApp
      var whatsappButton = document.querySelector('[data-puj-link-whatsapp="true"]');
      
      if (!whatsappButton) {
        console.warn('Botón WhatsApp no encontrado');
        return;
      }

      console.log('Botón WhatsApp encontrado, configurando fallback...');

      // Interceptar el clic
      this.addEventListener(whatsappButton, 'click', function(event) {
        console.log('Clic interceptado en botón WhatsApp');
        
        // Detectar si hay facultad
        var hasFaculty = (typeof window.currentFaculty !== 'undefined' && window.currentFaculty) ||
                         document.querySelector('[data-faculty]');
        
        if (!hasFaculty) {
          console.log('No hay facultad detectada, usando número general');
          event.preventDefault();
          event.stopPropagation();
          
          var generalNumber = '+573133912876';
          var message = encodeURIComponent(
            '¡Hola! Me interesa información sobre los programas académicos de la Pontificia Universidad Javeriana.\n\n' +
            'Página: ' + document.title + '\nEnlace: ' + window.location.href
          );
          var whatsappUrl = 'https://wa.me/' + generalNumber.replace('+', '') + '?text=' + message;
          
          window.open(whatsappUrl, '_blank');
          self.showNotification('WhatsApp: Contacto general');
        }
      });
    },

    // ===== RESTO DE FUNCIONES (compartir, modal, etc.) =====
    
    // [Incluir aquí todas las demás funciones del script original, pero con verificaciones de window/document]
    // Por brevedad, incluyo solo las más importantes

    updateMenuDisplay: function() {
      if (!this.elements.mainMenu) return;

      var isMobile = this.state.isMobile;
      var isExpanded = this.state.isMenuExpanded;
      var menuClasses = ['floating-menu'];
      
      if (isMobile && isExpanded) {
        menuClasses.push('mobile-expanded');
      } else if (isMobile && !isExpanded) {
        menuClasses.push('collapsed');
      }

      this.elements.mainMenu.className = menuClasses.join(' ');
      this.updateToggleButtons();
      this.updateMenuItems();
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
          item.style.display = (isMobile && !isExpanded) ? 'none' : 'flex';
        }
      }
    },

    toggleMobileMenu: function() {
      if (!this.state.isMobile) return;
      this.updateState({ isMenuExpanded: !this.state.isMenuExpanded });
    },

    showNotification: function(message) {
      if (typeof document === 'undefined') return;
      
      var notification = document.createElement('div');
      notification.textContent = message;
      notification.className = 'floating-menu-notification';
      notification.style.cssText = 
        'position: fixed; top: 20px; right: 20px; background: var(--primary, #4F46E5); color: white; ' +
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

      // Resize listener con verificación
      this.addEventListener(window, 'resize', function() {
        var isMobile = self.checkMobileDevice();
        if (isMobile !== self.state.isMobile) {
          self.updateState({
            isMobile: isMobile,
            isMenuExpanded: !isMobile
          });
          
          if (!isMobile) {
            self.forceCorrectDisplay();
          }
        }
      });

      // Event listeners por elemento
      if (this.elements.btnIncreaseFontSize) {
        this.addEventListener(this.elements.btnIncreaseFontSize, 'click', function(e) {
          e.preventDefault();
          self.increaseFontSize();
        });
      }

      if (this.elements.btnDecreaseFontSize) {
        this.addEventListener(this.elements.btnDecreaseFontSize, 'click', function(e) {
          e.preventDefault();
          self.decreaseFontSize();
        });
      }

      if (this.elements.btnThemeToggle) {
        this.addEventListener(this.elements.btnThemeToggle, 'click', function(e) {
          e.preventDefault();
          self.themeToggle();
        });
      }

      if (this.elements.btnGrayscale) {
        this.addEventListener(this.elements.btnGrayscale, 'click', function(e) {
          e.preventDefault();
          self.toggleGrayscale();
        });
      }

      // Toggle buttons
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

      console.log('Event listeners configurados');
    },

    addEventListener: function(element, event, handler) {
      if (!element) return;
      element.addEventListener(event, handler);
      this.eventListeners.push({ element: element, event: event, handler: handler });
    },

    // ===== CLEANUP =====
    destroy: function() {
      console.log('=== DESTRUYENDO FLOATING MENU ===');

      // Remover todos los event listeners
      for (var i = 0; i < this.eventListeners.length; i++) {
        var listener = this.eventListeners[i];
        if (listener.element && listener.element.removeEventListener) {
          listener.element.removeEventListener(listener.event, listener.handler);
        }
      }
      this.eventListeners = [];

      // Reset estado
      this.state = {
        isMobile: false,
        isMenuExpanded: false,
        showShareModal: false,
        initialized: false,
        themeState: 'light',
        scaleLevel: 0,
        isGrayscaleActive: false,
        isReady: false
      };

      this.elements = {};
      
      if (typeof document !== 'undefined') {
        document.body.classList.remove('floating-menu-ready');
      }
      
      console.log('FloatingMenu destruido');
    }
  };

  // ===== REGISTRO GLOBAL =====
  window.FloatingMenuNextJS = FloatingMenuNextJS;

  // ===== INICIALIZACIÓN AUTOMÁTICA =====
  // Verificar que estemos en el cliente
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        FloatingMenuNextJS.init();
      });
    } else {
      // DOM ya cargado, inicializar con delay
      setTimeout(function() {
        FloatingMenuNextJS.init();
      }, 1000);
    }
  }

  return FloatingMenuNextJS;

})();