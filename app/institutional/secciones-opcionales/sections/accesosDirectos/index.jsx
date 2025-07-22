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
      } else {
        FloatingMenuScript.init(configuration);
      }
    });
  }

<<<<<<< HEAD
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
=======
  return (
    <div id="floating-menu-container" className="floating-menu-container">
      {/* Menú Principal */}
      <div id="floating-menu-main" className="floating-menu collapsed">
        <div
          className="menu-item menu-toggle-button"
          data-action="toggleMenu"
          title="Abrir menú de accesibilidad"
          tabIndex={0}
          role="button"
          aria-label="Abrir menú de accesibilidad"
        >
          <i className="ph ph-person"></i>
        </div>
>>>>>>> 07b12853ddfb10d8b49076d8d67b4974c4b81a86

        <div
          className="menu-item menu-close-button"
          data-action="toggleMenu"
          title="Cerrar menú de accesibilidad"
          tabIndex={0}
          role="button"
          aria-label="Cerrar menú de accesibilidad"
          style={{ display: 'none' }}
        >
          <i className="ph ph-x"></i>
        </div>

        {/* Items del menú */}
        <div
          className="menu-item"
          id="btnIncreaseFontSize"
          data-action="increaseFontSize"
          title="Aumentar tamaño de fuente"
          aria-label="Aumentar tamaño de fuente"
          tabIndex={0}
          role="button"
        >
          <span></span>
          <i className="ph ph-plus-circle"></i>
        </div>

        <div
          className="menu-item"
          id="btnDecreaseFontSize"
          data-action="decreaseFontSize"
          title="Disminuir tamaño de fuente"
          aria-label="Disminuir tamaño de fuente"
          tabIndex={0}
          role="button"
        >
          <span></span>
          <i className="ph ph-minus-circle"></i>
        </div>

        <div
          className="menu-item"
          id="btnThemeToggle"
          data-action="themeToggle"
          title="Cambiar tema"
          aria-label="Cambiar tema de color"
          tabIndex={0}
          role="button"
        >
          <span></span>
          <i className="ph ph-sun"></i>
        </div>

        <div
          className="menu-item"
          id="btnGrayscale"
          data-action="grayscale"
          title="Escala de grises"
          aria-label="Activar escala de grises"
          tabIndex={0}
          role="button"
        >
          <span></span>
          <i className="ph ph-circle-half"></i>
        </div>

        <div
          className="menu-item"
          id="btnShare"
          data-action="share"
          title="Compartir página"
          aria-label="Abrir opciones para compartir"
          tabIndex={0}
          role="button"
        >
          <span></span>
          <i className="ph ph-share-fat"></i>
        </div>
      </div>

      {/* Botón WhatsApp Flotante */}
      <div id="whatsapp-floating-button" className="whatsapp-floating-button">
        <div
          className="menu-item whatsapp-button"
          id="btnWhatsapp"
          data-action="whatsapp"
          title="Compartir en WhatsApp"
          aria-label="Compartir página en WhatsApp"
          tabIndex={0}
          role="button"
        >
          <span></span>
          <i className="ph ph-whatsapp-logo"></i>
        </div>
      </div>

      {/* Modal de Compartir */}
      <div 
        id="share-modal-overlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-modal-title"
        className="share-modal-overlay share-modal-hidden"
      >
        <div className="share-modal">
          <div className="share-modal-header">
            <h3 id="share-modal-title">Compartir</h3>
            <button 
              className="share-modal-close" 
              aria-label="Cerrar modal de compartir"
              type="button"
            >
              <i className="ph ph-x"></i>
            </button>
          </div>
          
          <div className="share-options">
            <div
              className="share-option"
              data-share="whatsapp"
              tabIndex={0}
              role="button"
              aria-label="Compartir en WhatsApp"
            >
              <i className="ph ph-whatsapp-logo"></i>
              <span>WhatsApp</span>
            </div>

            <div
              className="share-option"
              data-share="facebook"
              tabIndex={0}
              role="button"
              aria-label="Compartir en Facebook"
            >
              <i className="ph ph-facebook-logo"></i>
              <span>Facebook</span>
            </div>

            <div
              className="share-option"
              data-share="instagram"
              tabIndex={0}
              role="button"
              aria-label="Compartir en Instagram"
            >
              <i className="ph ph-instagram-logo"></i>
              <span>Instagram</span>
            </div>

            <div
              className="share-option"
              data-share="linkedin"
              tabIndex={0}
              role="button"
              aria-label="Compartir en LinkedIn"
            >
              <i className="ph ph-linkedin-logo"></i>
              <span>LinkedIn</span>
            </div>

            <div
              className="share-option"
              data-share="email"
              tabIndex={0}
              role="button"
              aria-label="Compartir por correo electrónico"
            >
              <i className="ph ph-paper-plane-tilt"></i>
              <span>Correo</span>
            </div>

            <div
              className="share-option"
              data-share="copy"
              tabIndex={0}
              role="button"
              aria-label="Copiar enlace al portapapeles"
            >
              <i className="ph ph-copy"></i>
              <span>Copiar Link</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notificaciones */}
      <div id="floating-menu-notifications" className="floating-menu-notifications"></div>
    </div>
  );
};

export default FloatingMenu;