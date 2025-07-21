// ===== FLOATING MENU SCRIPT =====
// Script independiente para el menú flotante de accesibilidad

const FloatingMenuScript = {
  // ===== CONFIGURACIÓN INICIAL =====
  config: {
    version: '3.0.0',
    initialization: {
      delayAfterMount: 1500,
    },
    breakpoints: {
      mobile: 768
    }
  },

  // ===== ESTADO INTERNO =====
  state: {
    isMobile: false,
    isMenuExpanded: false,
    showShareModal: false,
    initialized: false
  },

  // ===== ELEMENTOS DOM =====
  elements: {},

  // ===== EVENT LISTENERS =====
  eventListeners: [],
  modalElementsCached: false,
  modalListenersSetup: false,

  // ===== MÉTODOS DE INICIALIZACIÓN =====
  init(customConfig = {}) {
    // Combinar configuración personalizada
    this.config = { ...this.config, ...customConfig };
    
    // Verificar que el DOM esté cargado
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeComponent());
    } else {
      this.initializeComponent();
    }
  },

  initializeComponent() {
    console.log('Inicializando FloatingMenu v' + this.config.version);
    
    // Cache de elementos DOM
    this.cacheElements();
    
    // Estado inicial
    this.updateInitialState();
    
    // Asegurar que el modal esté oculto al inicio
    this.ensureModalHidden();
    
    // Configurar con delay
    setTimeout(() => {
      this.loadPhosphorIcons();
      this.setupEventListeners();
      this.updateState({ initialized: true });
      this.updateMenuDisplay();
      // Forzar ocultamiento de botones en desktop al inicializar
      this.forceHideToggleButtonsOnDesktop();
      console.log('FloatingMenu inicializado correctamente');
    }, this.config.initialization.delayAfterMount);
  },

  cacheElements() {
    this.elements = {
      container: document.getElementById('floating-menu-container'),
      mainMenu: document.getElementById('floating-menu-main'),
      toggleButton: document.querySelector('.menu-toggle-button'),
      closeButton: document.querySelector('.menu-close-button'),
      menuItems: document.querySelectorAll('.menu-item'), // Incluye todos los menu-item (toggle, close y regulares)
      whatsappButton: document.getElementById('whatsapp-floating-button'),
      shareModal: document.getElementById('share-modal-overlay'),
      shareOptions: document.querySelectorAll('.share-option'),
      notifications: document.getElementById('floating-menu-notifications')
    };

    // Verificar elementos críticos
    if (!this.elements.container) {
      console.error('FloatingMenu: Contenedor principal no encontrado');
      return false;
    }

    // Debug: verificar que los botones se encontraron
    console.log('FloatingMenu: Toggle button found:', !!this.elements.toggleButton);
    console.log('FloatingMenu: Close button found:', !!this.elements.closeButton);
    console.log('FloatingMenu: Total menu items found:', this.elements.menuItems.length);

    return true;
  },

  // Método para cache dinámico de elementos del modal (cuando se abre)
  cacheModalElements() {
    if (!this.modalElementsCached) {
      this.elements.shareCloseButton = document.querySelector('.share-modal-close');
      this.modalElementsCached = true;
    }
  },

  ensureModalHidden() {
    // Asegurar que el modal esté oculto al inicio
    if (this.elements.shareModal) {
      this.elements.shareModal.classList.add('share-modal-hidden');
      this.elements.shareModal.classList.remove('share-modal-visible');
      console.log('FloatingMenu: Modal asegurado como oculto');
    }
  },

  // ===== UTILIDADES =====
  checkMobileDevice() {
    return window.innerWidth <= this.config.breakpoints.mobile;
  },

  loadPhosphorIcons() {
    if (typeof document === 'undefined') return;
    
    if (!document.querySelector('link[href*="phosphor-icons"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = 'https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/regular/style.css';
      document.head.appendChild(link);
      console.log('FloatingMenu: Phosphor Icons cargados');
    }
  },

  updateInitialState() {
    const isMobile = this.checkMobileDevice();
    this.updateState({
      isMobile,
      isMenuExpanded: !isMobile // Desktop: expandido, Mobile: colapsado
    });
    
    // Debug: verificar estado inicial
    console.log('FloatingMenu: Estado inicial -', {
      isMobile,
      isMenuExpanded: !isMobile,
      windowWidth: window.innerWidth
    });
  },

  updateState(newState) {
    Object.assign(this.state, newState);
    this.updateMenuDisplay();
  },

  // ===== MÉTODO PRINCIPAL DE DISPLAY CORREGIDO =====
  updateMenuDisplay() {
    if (!this.elements.mainMenu) return;

    const { isMobile, isMenuExpanded, showShareModal } = this.state;
    
    // Debug: estado actual
    console.log('FloatingMenu: Actualizando display -', {
      isMobile,
      isMenuExpanded,
      windowWidth: window.innerWidth
    });
    
    // Actualizar clases del menú principal
    const menuClasses = ['floating-menu'];
    if (isMobile && isMenuExpanded) {
      menuClasses.push('mobile-expanded');
    } else if (isMobile && !isMenuExpanded) {
      menuClasses.push('collapsed');
    }
    // Desktop no necesita clase especial
    
    this.elements.mainMenu.className = menuClasses.join(' ');
    
    // CONTROL ESTRICTO DE BOTONES TOGGLE/CLOSE
    // REGLA: Desktop = NUNCA visibles, Mobile = según estado
    
    if (this.elements.toggleButton) {
      if (!isMobile) {
        // Desktop: SIEMPRE oculto
        this.elements.toggleButton.style.display = 'none';
        console.log('FloatingMenu: Toggle button - OCULTO en desktop');
      } else {
        // Mobile: solo visible cuando collapsed
        const shouldShowToggle = !isMenuExpanded;
        this.elements.toggleButton.style.display = shouldShowToggle ? 'flex' : 'none';
        console.log('FloatingMenu: Toggle button - Mobile:', shouldShowToggle ? 'VISIBLE' : 'OCULTO');
      }
    }
    
    if (this.elements.closeButton) {
      if (!isMobile) {
        // Desktop: SIEMPRE oculto
        this.elements.closeButton.style.display = 'none';
        console.log('FloatingMenu: Close button - OCULTO en desktop');
      } else {
        // Mobile: solo visible cuando expanded
        const shouldShowClose = isMenuExpanded;
        this.elements.closeButton.style.display = shouldShowClose ? 'flex' : 'none';
        console.log('FloatingMenu: Close button - Mobile:', shouldShowClose ? 'VISIBLE' : 'OCULTO');
      }
    }
    
    // Control de visibilidad de menu items principales (excluyendo toggle/close)
    this.elements.menuItems.forEach(item => {
      const isToggleButton = item.classList.contains('menu-toggle-button');
      const isCloseButton = item.classList.contains('menu-close-button');
      
      if (!isToggleButton && !isCloseButton) {
        if (isMobile && !isMenuExpanded) {
          // Mobile collapsed: ocultar items principales
          item.style.display = 'none';
        } else {
          // Desktop o mobile expanded: mostrar items principales
          item.style.display = 'flex';
        }
      }
    });
    
    // Mostrar/ocultar modal de compartir con clases CSS
    if (this.elements.shareModal) {
      if (showShareModal) {
        this.elements.shareModal.classList.remove('share-modal-hidden');
        this.elements.shareModal.classList.add('share-modal-visible');
      } else {
        this.elements.shareModal.classList.remove('share-modal-visible');
        this.elements.shareModal.classList.add('share-modal-hidden');
      }
    }
    
    // Mostrar/ocultar botón WhatsApp
    if (this.elements.whatsappButton) {
      // En desktop siempre visible, en mobile solo cuando no está collapsed
      const shouldShowWhatsApp = !isMobile || isMenuExpanded;
      this.elements.whatsappButton.style.display = shouldShowWhatsApp ? 'block' : 'none';
      console.log('FloatingMenu: WhatsApp button display =', shouldShowWhatsApp ? 'VISIBLE' : 'OCULTO');
    }
  },

  // ===== MÉTODO ADICIONAL PARA FORZAR OCULTAMIENTO EN DESKTOP =====
  forceHideToggleButtonsOnDesktop() {
    if (!this.state.isMobile) {
      if (this.elements.toggleButton) {
        this.elements.toggleButton.style.display = 'none';
      }
      if (this.elements.closeButton) {
        this.elements.closeButton.style.display = 'none';
      }
      console.log('FloatingMenu: Botones toggle/close forzados a ocultos en desktop');
    }
  },

 
  themeToggle() {
    const rootElement = document.documentElement;
    const currentTheme = rootElement.getAttribute('data-theme') || 'light';
    const isDark = currentTheme.includes('-dark');
    
    let newTheme;
    if (isDark) {
      // Cambiar a tema claro
      newTheme = currentTheme.replace('-dark', '');
    } else {
      // Cambiar a tema oscuro
      newTheme = currentTheme === 'light' ? 'dark' : `${currentTheme}-dark`;
    }
    
    rootElement.setAttribute('data-theme', newTheme);
    
    // Actualizar icono
    this.updateThemeIcon();
    
    this.showNotification(`Tema: ${isDark ? 'Claro' : 'Oscuro'}`);
    console.log(`Tema cambiado a: ${newTheme}`);
  },

  updateThemeIcon() {
    const themeButton = document.querySelector('[data-action="themeToggle"] i');
    if (themeButton) {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const isDark = currentTheme.includes('-dark');
      themeButton.className = isDark ? 'ph ph-moon' : 'ph ph-sun';
    }
  },

  toggleGrayscale() {
    const rootElement = document.documentElement;
    const isGrayscale = rootElement.classList.contains('grayscale-mode');
    
    if (isGrayscale) {
      rootElement.classList.remove('grayscale-mode');
      rootElement.style.filter = '';
  
      this.showNotification('Escala de grises desactivada');
    } else {
      rootElement.classList.add('grayscale-mode');
      rootElement.style.filter = 'grayscale(100%)';
  
      this.showNotification('Escala de grises activada');
    }
    
    console.log(`Escala de grises: ${!isGrayscale ? 'activada' : 'desactivada'}`);
  },

  // ===== FUNCIONES DE COMPARTIR =====
  shareActions: {
    whatsapp() {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent('¡Mira este programa académico de la Pontificia Universidad Javeriana!');
      const whatsappUrl = `https://wa.me/?text=${text}%20${url}`;
      window.open(whatsappUrl, '_blank');
    },

    facebook() {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    },

    instagram() {
      // Instagram no permite compartir URLs directamente
      FloatingMenuScript.copyToClipboard();
      FloatingMenuScript.showNotification('Enlace copiado. Compártelo en tu historia de Instagram.');
    },

    linkedin() {
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(document.title);
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`, '_blank');
    },

    email() {
      const subject = encodeURIComponent(`Programa académico - ${document.title}`);
      const body = encodeURIComponent(`Te comparto este programa de la Pontificia Universidad Javeriana: ${window.location.href}`);
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    },

    copy() {
      FloatingMenuScript.copyToClipboard();
    }
  },

  async copyToClipboard() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      this.showNotification('Enlace copiado al portapapeles');
    } catch (err) {
      // Fallback para navegadores que no soportan clipboard API
      const textArea = document.createElement('textarea');
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
    }
  },

  shareOnWhatsApp() {
    this.shareActions.whatsapp();
  },

  // ===== MANEJADORES DE ACCIONES =====
  toggleMobileMenu() {
    if (!this.state.isMobile) {
      console.log('FloatingMenu: Intento de toggle en desktop - ignorado');
      return;
    }
    
    const newExpandedState = !this.state.isMenuExpanded;
    console.log('FloatingMenu: Toggling menu -', {
      from: this.state.isMenuExpanded,
      to: newExpandedState
    });
    
    this.updateState({
      isMenuExpanded: newExpandedState
    });
  },

  openShareModal() {
    console.log('FloatingMenu: Abriendo modal de compartir');
    this.updateState({ showShareModal: true });
    document.body.style.overflow = 'hidden';
    
    // Cache elementos del modal cuando se abre (ya están en el DOM)
    this.cacheModalElements();
    this.setupModalEventListeners();
  },

  closeShareModal() {
    console.log('FloatingMenu: Cerrando modal de compartir');
    this.updateState({ showShareModal: false });
    document.body.style.overflow = '';
  },

  // Setup específico para event listeners del modal
  setupModalEventListeners() {
    // Evitar duplicar listeners
    if (this.modalListenersSetup) return;
    
    // Botón cerrar del modal
    if (this.elements.shareCloseButton) {
      this.addEventListener(this.elements.shareCloseButton, 'click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.closeShareModal();
      });
      
      this.addEventListener(this.elements.shareCloseButton, 'keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.closeShareModal();
        }
      });
      
      console.log('FloatingMenu: Modal close button event listeners configurados');
    } else {
      console.warn('FloatingMenu: Botón de cerrar modal no encontrado');
    }
    
    this.modalListenersSetup = true;
  },

  handleMenuAction(action) {
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

  handleShareAction(shareType) {
    if (this.shareActions[shareType]) {
      this.shareActions[shareType]();
    }
    this.closeShareModal();
  },

  // ===== NOTIFICACIONES =====
  showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = 'floating-menu-notification';
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--primary-600);
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      z-index: 10000;
      font-size: 14px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      opacity: 0;
      transform: translateX(100%);
      transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Animación de salida y eliminación
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100%)';
      
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  },

  // ===== EVENT LISTENERS =====
  setupEventListeners() {
    // Resize listener para responsividad - ACTUALIZADO
    const handleResize = () => {
      const isMobile = this.checkMobileDevice();
      const wasInMobile = this.state.isMobile;
      
      // Si cambió de desktop ↔ mobile, resetear estado
      if (isMobile !== wasInMobile) {
        console.log('FloatingMenu: Cambio de viewport detectado -', {
          from: wasInMobile ? 'mobile' : 'desktop',
          to: isMobile ? 'mobile' : 'desktop',
          windowWidth: window.innerWidth
        });
        
        this.updateState({ 
          isMobile, 
          isMenuExpanded: !isMobile // Desktop: expanded, Mobile: collapsed
        });
        
        // Forzar ocultamiento si cambió a desktop
        if (!isMobile) {
          this.forceHideToggleButtonsOnDesktop();
        }
      }
    };
    
    this.addEventListener(window, 'resize', handleResize);
    
    // Click listeners para acciones del menú - solo items regulares (no toggle/close)
    this.elements.menuItems.forEach(item => {
      const isToggleButton = item.classList.contains('menu-toggle-button');
      const isCloseButton = item.classList.contains('menu-close-button');
      
      // Solo agregar listeners a items regulares
      if (!isToggleButton && !isCloseButton) {
        const action = item.getAttribute('data-action');
        if (action) {
          this.addEventListener(item, 'click', (e) => this.handleClickEvent(e, action));
          this.addEventListener(item, 'keydown', (e) => this.handleKeyboardEvent(e, action));
        }
      }
    });
    
    // Toggle button - manejo específico
    if (this.elements.toggleButton) {
      this.addEventListener(this.elements.toggleButton, 'click', (e) => this.handleClickEvent(e, 'toggleMenu'));
      this.addEventListener(this.elements.toggleButton, 'keydown', (e) => this.handleKeyboardEvent(e, 'toggleMenu'));
      console.log('FloatingMenu: Toggle button events attached');
    }
    
    // Close button - manejo específico
    if (this.elements.closeButton) {
      this.addEventListener(this.elements.closeButton, 'click', (e) => this.handleClickEvent(e, 'toggleMenu'));
      this.addEventListener(this.elements.closeButton, 'keydown', (e) => this.handleKeyboardEvent(e, 'toggleMenu'));
      console.log('FloatingMenu: Close button events attached');
    }
    
    // Share modal - Solo el overlay y ESC
    if (this.elements.shareModal) {
      this.addEventListener(this.elements.shareModal, 'click', (e) => {
        if (e.target === this.elements.shareModal) {
          this.closeShareModal();
        }
      });
    }
    
    // Share options
    this.elements.shareOptions.forEach(option => {
      const shareType = option.getAttribute('data-share');
      if (shareType) {
        this.addEventListener(option, 'click', () => this.handleShareAction(shareType));
        this.addEventListener(option, 'keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.handleShareAction(shareType);
          }
        });
      }
    });
    
    // ESC key listener global
    this.addEventListener(document, 'keydown', (e) => {
      if (e.key === 'Escape' && this.state.showShareModal) {
        this.closeShareModal();
      }
    });
    
    console.log('FloatingMenu: Event listeners configurados');
  },

  addEventListener(element, event, handler) {
    element.addEventListener(event, handler);
    this.eventListeners.push({ element, event, handler });
  },

  handleKeyboardEvent(event, action) {
    const { key } = event;
    
    if (key === 'Enter' || key === ' ') {
      event.preventDefault();
      this.handleMenuAction(action);
    }
  },

  handleClickEvent(event, action) {
    event.preventDefault();
    
    const target = event.currentTarget;
    if (target) {
      target.classList.add('clicked');
      setTimeout(() => {
        target.classList.remove('clicked');
      }, 200);
    }
    
    this.handleMenuAction(action);
  },

  // ===== CLEANUP =====
  destroy() {
    console.log('Destruyendo FloatingMenu...');
    
    // Remover todos los event listeners
    this.eventListeners.forEach(({ element, event, handler }) => {
      element.removeEventListener(event, handler);
    });
    this.eventListeners = [];
    
    // Restaurar estilos del body
    document.body.style.overflow = '';
    
    // Reset estado
    this.state = {
      isMobile: false,
      isMenuExpanded: false,
      showShareModal: false,
      initialized: false
    };
    
    // Limpiar elementos
    this.elements = {};
    
    // Reset flags
    this.modalElementsCached = false;
    this.modalListenersSetup = false;
    
    console.log('FloatingMenu destruido correctamente');
  }
};

// Exportar para uso como módulo
export default FloatingMenuScript;