import React from 'react';
import './styles.scss';

class FloatingMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
      hoveredItem: null,
      isDarkTheme: false,
      isGrayscale: false,
      showShareModal: false,
      fontScale: 1.0,
      isHoveringTheme: false,
      initialized: false
    };
    
    this.config = {
      version: '2.2.0',
      fontScale: {
        min: 0.8,
        max: 2.0,
        step: 0.1
      },
      initialization: {
        delayAfterMount: 1500,
        maxInitAttempts: 5,
        retryDelay: 1000
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
    };
  }

  componentDidMount() {
    this.initializeDelayed();
    this.setupSystemThemeDetection();
  }

  componentWillUnmount() {
    this.cleanup();
  }

  initializeDelayed = () => {
    setTimeout(() => {
      this.loadPhosphorIcons();
      this.setupInitialState();
      this.setState({ initialized: true });
      this.announceToScreenReader(this.config.messages.notifications.menuReady);
      console.log('Menú flotante inicializado correctamente');
    }, this.config.initialization.delayAfterMount);
  };

  cleanup = () => {
    this.resetFontScale();
    this.removeGrayscaleSimple();
    document.body.classList.remove('accessibility-dark-theme', 'grayscale-mode');
    document.body.style.overflow = '';
    // Restaurar tema base a light al limpiar
    document.documentElement.setAttribute('data-theme-base', 'light');
  };

  loadPhosphorIcons = () => {
    if (typeof document === 'undefined') return;
    if (!document.querySelector('link[href*="phosphor-icons"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = 'https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/regular/style.css';
      document.head.appendChild(link);
      console.log('Iconos Phosphor cargados');
    }
  };

  setupInitialState = () => {
    // Cargar tema guardado del usuario
    this.loadAndApplyTheme();
    
    if (this.state.isGrayscale) {
      this.applyGrayscaleSimple();
    }
    
    if (this.state.fontScale !== 1.0) {
      this.applyFontScale(this.state.fontScale);
    }
  };

  loadAndApplyTheme = () => {
    const savedTheme = localStorage.getItem('theme-base');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    console.log(`Cargando tema: guardado=${savedTheme}, preferencia=${prefersDark}, usar=${shouldUseDark}`);
    
    // Actualizar estado si es diferente
    if (shouldUseDark !== this.state.isDarkTheme) {
      this.setState({ isDarkTheme: shouldUseDark });
    }
    
    // Aplicar tema en ambos sistemas
    if (shouldUseDark) {
      document.body.classList.add('accessibility-dark-theme');
      document.documentElement.setAttribute('data-theme-base', 'dark');
    } else {
      document.body.classList.remove('accessibility-dark-theme');
      document.documentElement.setAttribute('data-theme-base', 'light');
    }
    
    console.log(`Tema ${shouldUseDark ? 'oscuro' : 'claro'} aplicado en la inicialización`);
  };

  setupSystemThemeDetection = () => {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      mediaQuery.addEventListener('change', (e) => {
        // Solo aplicar si no hay preferencia guardada del usuario
        const savedTheme = localStorage.getItem('theme-base');
        if (!savedTheme) {
          console.log('Cambio detectado en preferencias del sistema:', e.matches ? 'dark' : 'light');
          
          this.setState({ isDarkTheme: e.matches });
          
          if (e.matches) {
            document.body.classList.add('accessibility-dark-theme');
            document.documentElement.setAttribute('data-theme-base', 'dark');
          } else {
            document.body.classList.remove('accessibility-dark-theme');
            document.documentElement.setAttribute('data-theme-base', 'light');
          }
        }
      });
      
      console.log('Detección de cambios de tema del sistema configurada');
    }
  };

  announceToScreenReader = (message) => {
    const announcer = document.getElementById('accessibility-announcements');
    if (announcer) {
      announcer.textContent = '';
      setTimeout(() => {
        announcer.textContent = message;
      }, 100);
    }
  };

  // ===== SISTEMA DE FONT-SCALE =====
  applyFontScale = (scale) => {
    console.log(`Aplicando escala de fuente: ${scale}`);
    
    document.documentElement.style.setProperty('--accessibility-font-scale', scale);
    this.updateFontScaleCSS(scale);
    
    const targets = this.getFontScaleTargets();
    
    targets.forEach(element => {
      if (element && !this.isAccessibilityElement(element)) {
        element.style.transform = `scale(${scale})`;
        element.style.transformOrigin = 'top left';
        element.style.transition = 'transform 0.3s ease';
      }
    });
    
    return true;
  };

  updateFontScaleCSS = (scale) => {
    let styleElement = document.getElementById('accessibility-font-scale-styles');
    
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'accessibility-font-scale-styles';
      document.head.appendChild(styleElement);
    }
    
    const css = `
      :root {
        --accessibility-font-scale: ${scale};
      }
      
      body:not(.floating-menu):not(.whatsapp-floating-button) *:not([class*="accessibility"]):not(.floating-menu):not(.whatsapp-floating-button):not(.share-modal) {
        font-size: calc(1rem * var(--accessibility-font-scale)) !important;
      }
      
      .floating-menu,
      .floating-menu *,
      .whatsapp-floating-button,
      .whatsapp-floating-button *,
      .share-modal-overlay,
      .share-modal-overlay *,
      [class*="accessibility"],
      [id*="accessibility"] {
        font-size: initial !important;
        transform: none !important;
      }
    `;
    
    styleElement.textContent = css;
  };

  getFontScaleTargets = () => {
    const targets = [];
    
    const primarySelectors = [
      '#wrapper > .container-fluid:not([class*="accessibility"])',
      '#wrapper > main:not([class*="accessibility"])',
      'main:not([class*="accessibility"])',
      '.layout:not([class*="accessibility"])',
      '#content:not([class*="accessibility"])'
    ];
    
    for (const selector of primarySelectors) {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        if (!this.isAccessibilityElement(el)) {
          targets.push(el);
        }
      });
      
      if (targets.length > 0) break;
    }
    
    if (targets.length === 0) {
      const fallbackSelectors = [
        'body > .container:not([class*="accessibility"]):not(.floating-menu):not(.whatsapp-floating-button)',
        'body > main:not([class*="accessibility"]):not(.floating-menu):not(.whatsapp-floating-button)'
      ];
      
      for (const selector of fallbackSelectors) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          if (!this.isAccessibilityElement(el)) {
            targets.push(el);
          }
        });
        
        if (targets.length > 0) break;
      }
    }
    
    return targets;
  };

  isAccessibilityElement = (element) => {
    if (!element) return false;
    
    const className = element.className || '';
    const id = element.id || '';
    
    if (className.includes('accessibility') || 
        className.includes('floating-menu') || 
        className.includes('whatsapp-floating-button') ||
        className.includes('share-modal') ||
        id.includes('accessibility')) {
      return true;
    }
    
    const parent = element.closest('.floating-menu, .whatsapp-floating-button, .share-modal-overlay, [class*="accessibility"]');
    return !!parent;
  };

  resetFontScale = () => {
    this.setState({ fontScale: 1.0 });
    this.applyFontScale(1.0);
    
    const targets = this.getFontScaleTargets();
    targets.forEach(element => {
      if (element) {
        element.style.transform = '';
        element.style.transformOrigin = '';
        element.style.transition = '';
      }
    });
    
    document.documentElement.style.removeProperty('--accessibility-font-scale');
    
    const styleElement = document.getElementById('accessibility-font-scale-styles');
    if (styleElement) {
      styleElement.remove();
    }
    
    console.log('Escala de fuente reseteada');
  };

  // ===== FUNCIONES DE FONT-SCALE =====
  increaseFontSize = () => {
    const newScale = Math.min(this.config.fontScale.max, this.state.fontScale + this.config.fontScale.step);
    
    if (newScale === this.state.fontScale) {
      this.announceToScreenReader(this.config.messages.notifications.fontSizeMax);
      return;
    }
    
    this.setState({ fontScale: newScale });
    this.applyFontScale(newScale);
    
    const percentage = Math.round(newScale * 100);
    this.announceToScreenReader(`${this.config.messages.notifications.fontSizeIncreased}. Nivel: ${percentage}%`);
  };

  decreaseFontSize = () => {
    const newScale = Math.max(this.config.fontScale.min, this.state.fontScale - this.config.fontScale.step);
    
    if (newScale === this.state.fontScale) {
      this.announceToScreenReader(this.config.messages.notifications.fontSizeMin);
      return;
    }
    
    this.setState({ fontScale: newScale });
    this.applyFontScale(newScale);
    
    const percentage = Math.round(newScale * 100);
    this.announceToScreenReader(`${this.config.messages.notifications.fontSizeDecreased}. Nivel: ${percentage}%`);
  };

  // ===== FUNCIONES DE ESCALA DE GRISES =====
  applyGrayscaleSimple = () => {
    try {
      console.log('Aplicando escala de grises...');
      
      document.body.classList.add('grayscale-mode');
      this.createGrayscaleCSS();
      this.updateGrayscaleButtonState(true);
      
      console.log('Escala de grises aplicada correctamente');
      
    } catch (error) {
      console.error('Error aplicando escala de grises:', error);
    }
  };

  removeGrayscaleSimple = () => {
    try {
      console.log('Removiendo escala de grises...');
      
      document.body.classList.remove('grayscale-mode');
      this.removeGrayscaleCSS();
      this.updateGrayscaleButtonState(false);
      
      console.log('Escala de grises removida');
      
    } catch (error) {
      console.error('Error removiendo escala de grises:', error);
    }
  };

  createGrayscaleCSS = () => {
    const styleId = 'accessibility-grayscale-styles';
    let styleElement = document.getElementById(styleId);
    
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }
    
    const css = `
      body.grayscale-mode #wrapper:not(.accessibility-menu-portlet),
      body.grayscale-mode .portlet:not([class*="accessibility"]):not([id*="accessibility"]),
      body.grayscale-mode .portlet-content:not([class*="accessibility"]),
      body.grayscale-mode .journal-content-article:not([class*="accessibility"]),
      body.grayscale-mode .portlet-body:not([class*="accessibility"]),
      body.grayscale-mode main:not([class*="accessibility"]),
      body.grayscale-mode .container:not([class*="accessibility"]):not(.floating-menu):not(.whatsapp-floating-button),
      body.grayscale-mode .container-fluid:not([class*="accessibility"]):not(.floating-menu):not(.whatsapp-floating-button),
      body.grayscale-mode .content:not([class*="accessibility"]),
      body.grayscale-mode .main-content:not([class*="accessibility"]),
      body.grayscale-mode .page-content:not([class*="accessibility"]) {
        filter: grayscale(100%) !important;
        transition: filter 0.3s ease !important;
      }
      
      body.grayscale-mode img:not(.floating-menu img):not(.whatsapp-floating-button img):not(.share-modal img):not([class*="accessibility"]),
      body.grayscale-mode video:not(.floating-menu video):not(.whatsapp-floating-button video):not(.share-modal video):not([class*="accessibility"]) {
        filter: grayscale(100%) !important;
        transition: filter 0.3s ease !important;
      }
      
      body.grayscale-mode .floating-menu,
      body.grayscale-mode .floating-menu *,
      body.grayscale-mode .whatsapp-floating-button,
      body.grayscale-mode .whatsapp-floating-button *,
      body.grayscale-mode .share-modal-overlay,
      body.grayscale-mode .share-modal-overlay *,
      body.grayscale-mode [class*="accessibility"],
      body.grayscale-mode [id*="accessibility"] {
        filter: none !important;
        -webkit-filter: none !important;
        visibility: visible !important;
        opacity: 1 !important;
      }
    `;
    
    styleElement.textContent = css;
  };

  removeGrayscaleCSS = () => {
    const styleElement = document.getElementById('accessibility-grayscale-styles');
    if (styleElement) {
      styleElement.remove();
    }
  };

  updateGrayscaleButtonState = (isActive) => {
    const grayscaleButton = document.querySelector('[data-action="grayscale"]');
    
    if (grayscaleButton) {
      if (isActive) {
        grayscaleButton.classList.add('active');
        grayscaleButton.setAttribute('aria-pressed', 'true');
        grayscaleButton.setAttribute('title', 'Desactivar escala de grises');
      } else {
        grayscaleButton.classList.remove('active');
        grayscaleButton.setAttribute('aria-pressed', 'false');
        grayscaleButton.setAttribute('title', 'Activar escala de grises');
      }
    }
  };

  toggleGrayscale = () => {
    console.log('Ejecutando toggleGrayscale');
    
    this.setState(prevState => {
      const newGrayscale = !prevState.isGrayscale;
      
      if (newGrayscale) {
        this.applyGrayscaleSimple();
        this.announceToScreenReader(this.config.messages.notifications.grayscaleOn);
      } else {
        this.removeGrayscaleSimple();
        this.announceToScreenReader(this.config.messages.notifications.grayscaleOff);
      }
      
      return { isGrayscale: newGrayscale };
    });
  };

  // ===== FUNCIÓN DE TEMA INTEGRADA =====
  toggleTheme = () => {
    this.setState(prevState => {
      const newTheme = !prevState.isDarkTheme;
      
      if (newTheme) {
        // Aplicar tema oscuro en ambos sistemas
        document.body.classList.add('accessibility-dark-theme');
        document.documentElement.setAttribute('data-theme-base', 'dark');
        this.announceToScreenReader(this.config.messages.notifications.darkThemeOn);
        console.log('Tema oscuro activado en ambos sistemas');
      } else {
        // Aplicar tema claro en ambos sistemas
        document.body.classList.remove('accessibility-dark-theme');
        document.documentElement.setAttribute('data-theme-base', 'light');
        this.announceToScreenReader(this.config.messages.notifications.darkThemeOff);
        console.log('Tema claro activado en ambos sistemas');
      }
      
      // Guardar preferencia del usuario
      localStorage.setItem('theme-base', newTheme ? 'dark' : 'light');
      
      return { isDarkTheme: newTheme };
    });
  };

  // ===== MANEJO DE EVENTOS =====
  handleItemClick = (action) => {
    console.log('Acción clickeada:', action);
    
    switch (action) {
      case 'increaseFontSize':
        this.increaseFontSize();
        break;
      case 'decreaseFontSize':
        this.decreaseFontSize();
        break;
      case 'themeToggle':
        this.toggleTheme();
        break;
      case 'grayscale':
        this.toggleGrayscale();
        break;
      case 'share':
        this.setState({ showShareModal: true });
        break;
      case 'whatsapp':
        this.shareToWhatsApp();
        break;
      default:
        console.log('Acción no reconocida:', action);
    }
  };

  closeShareModal = () => {
    this.setState({ showShareModal: false });
  };

  shareToWhatsApp = () => {
    const message = encodeURIComponent('Te invito a visitar este sitio web de la Pontificia Universidad Javeriana.');
    const currentUrl = encodeURIComponent(window.location.href);
    window.open(`https://api.whatsapp.com/send?text=${message}%20${currentUrl}`, '_blank');
    this.closeShareModal();
  };

  shareToFacebook = () => {
    const currentUrl = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`, '_blank');
    this.closeShareModal();
  };

  shareToInstagram = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert(this.config.messages.notifications.instagramCopy);
    });
    this.closeShareModal();
  };

  shareToLinkedIn = () => {
    const currentUrl = encodeURIComponent(window.location.href);
    const title = encodeURIComponent('Pontificia Universidad Javeriana');
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}&title=${title}`, '_blank');
    this.closeShareModal();
  };

  shareByEmail = () => {
    const subject = encodeURIComponent('Te invito a visitar este sitio web');
    const body = encodeURIComponent(`Te invito a visitar este sitio web de la Pontificia Universidad Javeriana: ${window.location.href}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
    this.closeShareModal();
  };

  copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert(this.config.messages.notifications.linkCopied);
      this.closeShareModal();
    } catch (err) {
      prompt('Copia este link:', window.location.href);
      this.closeShareModal();
    }
  };

  handleMouseEnter = (itemId) => {
    this.setState({ hoveredItem: itemId });
    if (itemId === 'btnThemeToggle') {
      this.setState({ isHoveringTheme: true });
    }
  };

  handleMouseLeave = () => {
    this.setState({ hoveredItem: null, isHoveringTheme: false });
  };

  getMenuItems = () => {
    const baseItems = [
      {
        id: 'btnIncreaseFontSize',
        icon: 'ph-plus-circle',
        action: 'increaseFontSize',
        title: 'Aumentar tamaño de fuente'
      },
      {
        id: 'btnDecreaseFontSize',
        icon: 'ph-minus-circle',
        action: 'decreaseFontSize',
        title: 'Disminuir tamaño de fuente'
      },
      {
        id: 'btnThemeToggle',
        icon: this.state.isDarkTheme ? 'ph-moon' : 'ph-sun',
        action: 'themeToggle',
        title: 'Cambiar tema'
      },
      {
        id: 'btnGrayscale',
        icon: 'ph-circle-half',
        action: 'grayscale',
        title: 'Escala de grises'
      },
      {
        id: 'btnShare',
        icon: 'ph-share-fat',
        action: 'share',
        title: 'Compartir página'
      }
    ];

    return baseItems;
  };

  getWhatsAppItem = () => {
    return {
      id: 'btnWhatsapp',
      icon: 'ph-whatsapp-logo',
      action: 'whatsapp',
      title: 'Compartir en WhatsApp'
    };
  };

  renderMenuItem = (item, index, isMainMenu = true) => {
    const isHovered = this.state.hoveredItem === item.id;

    let displayIcon = item.icon;
    if (item.id === 'btnThemeToggle' && isHovered) {
      displayIcon = this.state.isDarkTheme ? 'ph-sun' : 'ph-moon';
    }

    return (
      <div
        key={item.id}
        className={`menu-item ${item.id === 'btnWhatsapp' ? 'whatsapp-button' : ''}`}
        data-action={item.action}
        title={item.title}
        onClick={() => this.handleItemClick(item.action)}
        onMouseEnter={() => this.handleMouseEnter(item.id)}
        onMouseLeave={this.handleMouseLeave}
      >
        <span></span>
        <i className={`ph ${displayIcon}`}></i>
      </div>
    );
  };

  renderShareModal = () => {
    if (!this.state.showShareModal) return null;

    return (
      <div className="share-modal-overlay" onClick={this.closeShareModal}>
        <div className="share-modal" onClick={(e) => e.stopPropagation()}>
          <div className="share-modal-header">
            <h3>Compartir</h3>
            <button 
              className="share-modal-close" 
              onClick={this.closeShareModal}
              aria-label="Cerrar modal"
            >
              <i className="ph ph-x"></i>
            </button>
          </div>
          
          <div className="share-options">
            <div className="share-option" onClick={this.shareToWhatsApp}>
              <i className="ph ph-whatsapp-logo"></i>
              <span>WhatsApp</span>
            </div>
            
            <div className="share-option" onClick={this.shareToFacebook}>
              <i className="ph ph-facebook-logo"></i>
              <span>Facebook</span>
            </div>
            
            <div className="share-option" onClick={this.shareToInstagram}>
              <i className="ph ph-instagram-logo"></i>
              <span>Instagram</span>
            </div>
            
            <div className="share-option" onClick={this.shareToLinkedIn}>
              <i className="ph ph-linkedin-logo"></i>
              <span>LinkedIn</span>
            </div>
            
            <div className="share-option" onClick={this.shareByEmail}>
              <i className="ph ph-paper-plane-tilt"></i>
              <span>Correo</span>
            </div>
            
            <div className="share-option" onClick={this.copyLink}>
              <i className="ph ph-copy"></i>
              <span>Copiar Link</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    if (!this.state.initialized) {
      return null;
    }

    const mainMenuItems = this.getMenuItems();
    const whatsappItem = this.getWhatsAppItem();
    
    return (
      <>
        <div className="floating-menu">
          {mainMenuItems.map((item, index) => this.renderMenuItem(item, index, true))}
        </div>
        
        <div className="whatsapp-floating-button">
          {this.renderMenuItem(whatsappItem, 0, false)}
        </div>
        
        {this.renderShareModal()}
        
        <div 
          id="accessibility-announcements" 
          aria-live="polite" 
          aria-atomic="true" 
          style={{
            position: 'absolute',
            width: '1px',
            height: '1px',
            padding: 0,
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            border: 0
          }}
        />
      </>
    );
  }
}

export default FloatingMenu;