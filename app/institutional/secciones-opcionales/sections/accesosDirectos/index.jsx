import React from 'react';
import './styles.scss';

class FloatingMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
      isDragging: false,
      hoveredItem: null,
      dragPosition: { x: 10, y: 142 },
      isDarkTheme: false,
      showShareModal: false
    };
    this.menuRef = React.createRef();
    this.whatsappRef = React.createRef();
    this.dragOffset = { x: 0, y: 0 };
    this.menuFunctions = null;
    
    this.config = {
      menuWidth: 42,
      menuHeight: 218,
      whatsappSize: 50,
      whatsappOffset: 20,
      initialTop: 142,
      initialLeft: 10
    };
  }

  componentDidMount() {
    if (typeof window !== 'undefined' && window.createFloatingMenuFunctions) {
      this.menuFunctions = window.createFloatingMenuFunctions();
      console.log('createFloatingMenuFunctions cargado desde window:', this.menuFunctions);
      
      if (this.menuFunctions) {
        this.menuFunctions.utils.loadPhosphorIcons();
        console.log('Configuración del menú:', this.menuFunctions.config);
      } else {
        console.error('No se pudieron inicializar las funciones del menú');
        this.loadPhosphorIconsFallback();
      }
    } else {
      console.error('window.createFloatingMenuFunctions no está disponible');
      this.loadPhosphorIconsFallback();
    }
    
    this.forceUpdate();
  }

  loadPhosphorIconsFallback = () => {
    if (typeof document !== 'undefined' && !document.querySelector('link[href*="phosphor-icons"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = 'https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/regular/style.css';
      document.head.appendChild(link);
      console.log('Iconos Phosphor cargados como fallback');
    }
  }

  getMenuItems = () => {
    if (!this.menuFunctions) {
      console.warn('MenuFunctions no disponibles, usando configuración por defecto');
      return [
        { id: 'btnOpen', icon: 'ph-magnifying-glass-plus', color: '#4866D1', hoverColor: '#4866D1', action: 'toggle', title: 'Abrir/Cerrar menú' },
        { id: 'btnZoomOut', icon: 'ph-magnifying-glass-minus', color: '#FF6B6B', hoverColor: '#FF6B6B', action: 'zoomOut', title: 'Zoom Out' },
        { id: 'btnThemeToggle', icon: 'ph-sun', color: '#F6E05E', hoverColor: '#F6E05E', action: 'themeToggle', title: 'Cambiar tema' },
        { id: 'btnShare', icon: 'ph-share-fat', color: '#4CAF50', hoverColor: '#4CAF50', action: 'share', title: 'Compartir página' }
      ];
    }
    
    const items = this.menuFunctions.getMenuItems();
    console.log('Items del menú obtenidos:', items);
    return items;
  };

  getMainMenuItems = () => {
    const excludedActions = ['gradient', 'contrast', 'visibility'];
    return this.getMenuItems().filter(item => 
      item.id !== 'btnWhatsapp' && !excludedActions.includes(item.action)
    );
  };

  getWhatsAppItem = () => {
    const item = this.getMenuItems().find(item => item.id === 'btnWhatsapp');
    return item || {
      id: 'btnWhatsapp',
      icon: 'ph-whatsapp-logo',
      color: '#25D366',
      hoverColor: '#25D366',
      action: 'whatsapp',
      title: 'Compartir en WhatsApp'
    };
  };

  handleItemClick = (action, url) => {
    console.log('Acción clickeada:', action, url);
    
    if (action === 'share') {
      this.setState({ showShareModal: true });
      return;
    }
    
    if (this.menuFunctions) {
      const result = this.menuFunctions.executeAction(action, url);
      
      if (action === 'themeToggle') {
        const newTheme = this.menuFunctions.utils.isDarkTheme();
        this.setState({ isDarkTheme: newTheme });
      }
      
      console.log(`Acción '${action}' ejecutada:`, result);
    } else {
      console.warn('Usando acciones fallback');
      this.handleFallbackActions(action, url);
    }
  };

  closeShareModal = () => {
    this.setState({ showShareModal: false });
  };

  shareToWhatsApp = () => {
    if (typeof window !== 'undefined' && window.shareToWhatsApp) {
      window.shareToWhatsApp();
    } else {
      const message = encodeURIComponent('Te invito a visitar este sitio web de la Pontificia Universidad Javeriana.');
      const currentUrl = encodeURIComponent(window.location.href);
      window.open(`https://api.whatsapp.com/send?text=${message}%20${currentUrl}`, '_blank');
    }
    this.closeShareModal();
  };

  shareToFacebook = () => {
    if (typeof window !== 'undefined' && window.shareToFacebook) {
      window.shareToFacebook();
    } else {
      const currentUrl = encodeURIComponent(window.location.href);
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`, '_blank');
    }
    this.closeShareModal();
  };

  shareToInstagram = () => {
    if (typeof window !== 'undefined' && window.shareToInstagram) {
      window.shareToInstagram();
    } else {
      this.copyLink();
      alert('Link copiado. Puedes pegarlo en tu historia de Instagram');
    }
  };

  shareToLinkedIn = () => {
    if (typeof window !== 'undefined' && window.shareToLinkedIn) {
      window.shareToLinkedIn();
    } else {
      const currentUrl = encodeURIComponent(window.location.href);
      const title = encodeURIComponent('Pontificia Universidad Javeriana');
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}&title=${title}`, '_blank');
    }
    this.closeShareModal();
  };

  shareByEmail = () => {
    if (typeof window !== 'undefined' && window.shareByEmail) {
      window.shareByEmail();
    } else {
      const subject = encodeURIComponent('Te invito a visitar este sitio web');
      const body = encodeURIComponent(`Te invito a visitar este sitio web de la Pontificia Universidad Javeriana: ${window.location.href}`);
      window.open(`mailto:?subject=${subject}&body=${body}`);
    }
    this.closeShareModal();
  };

  copyLink = async () => {
    if (typeof window !== 'undefined' && window.copyLink) {
      window.copyLink();
      return;
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copiado al portapapeles');
      this.closeShareModal();
    } catch (err) {
      console.error('Error al copiar:', err);
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        alert('Link copiado al portapapeles');
        this.closeShareModal();
      } catch (fallbackError) {
        console.error('Error en fallback:', fallbackError);
        prompt('Copia este link:', window.location.href);
      } finally {
        document.body.removeChild(textArea);
      }
    }
  };

  handleFallbackActions = (action, url) => {
    const actions = {
      toggle: () => console.log('Toggle - menú siempre abierto'),
      zoomOut: () => alert('Función de zoom out activada'),
      themeToggle: () => {
        const newTheme = !this.state.isDarkTheme;
        this.setState({ isDarkTheme: newTheme });
        if (typeof document !== 'undefined') {
          document.body.style.filter = newTheme ? 'invert(1)' : '';
        }
      },
      whatsapp: () => {
        if (url) {
          window.open(url, '_blank');
        } else {
          this.shareToWhatsApp();
        }
      }
    };

    if (actions[action]) {
      actions[action]();
    }
  };

  // ELIMINADOS los handlers de mouse enter/leave - Dejamos que CSS maneje todo
  handleMouseEnter = (itemId) => {
    // NO aplicar estilos inline - dejar que CSS maneje el hover
    console.log('Hover en:', itemId);
  };

  handleMouseLeave = () => {
    // NO aplicar estilos inline - dejar que CSS maneje el hover
    console.log('Saliendo del hover');
  };

  handleMouseDown = (e, isFirst) => {
    if (isFirst) {
      e.preventDefault();
      this.setState({ isDragging: true });
      
      const rect = e.currentTarget.getBoundingClientRect();
      const containerRect = this.menuRef.current.getBoundingClientRect();
      
      this.dragOffset = {
        x: e.clientX - containerRect.left,
        y: e.clientY - containerRect.top
      };

      const handleMouseMove = (e) => {
        if (this.state.isDragging) {
          const newX = e.clientX - this.dragOffset.x;
          const newY = e.clientY - this.dragOffset.y;
          
          this.setState({
            dragPosition: { x: newX, y: newY }
          });
        }
      };

      const handleMouseUp = () => {
        this.setState({ isDragging: false });
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  };

  renderMenuItem = (item, index, isMainMenu = true) => {
    const isFirst = index === 0 && isMainMenu;
    const menuItems = isMainMenu ? this.getMainMenuItems() : [this.getWhatsAppItem()];

    const itemStyle = {
      zIndex: menuItems.length - index + 2
    };

    let displayIcon = item.icon;

    // Lógica especial para el botón de tema
    if (item.id === 'btnThemeToggle' && this.menuFunctions) {
      const themeData = this.menuFunctions.getThemeIcon(false); // Sin hover aquí
      displayIcon = themeData.icon;
    }

    // NO aplicar estilos inline que interfieren con CSS hover
    // Los spans e iconos no tendrán estilos inline

    return (
      <div
        key={item.id}
        className={`menu-item ${isFirst ? 'menu-toggle' : ''} ${item.id === 'btnWhatsapp' ? 'whatsapp-button' : ''}`}
        style={itemStyle} // Solo z-index, sin otros estilos
        title={item.title || item.action}
        onClick={() => this.handleItemClick(item.action, item.url)}
        onMouseEnter={() => this.handleMouseEnter(item.id)}
        onMouseLeave={this.handleMouseLeave}
        onMouseDown={(e) => this.handleMouseDown(e, isFirst)}
      >
        {/* SIN estilos inline en span - CSS puro manejará el hover */}
        <span></span>
        {/* SIN estilos inline en icono - CSS puro manejará el color */}
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
              <i className="ph ph-share-fat"></i>
              <span>Copiar Link</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const mainMenuItems = this.getMainMenuItems();
    const whatsappItem = this.getWhatsAppItem();
    const { isDragging, dragPosition } = this.state;

    // Solo estilos de posicionamiento - sin interferir con hover
    const containerStyle = {
      position: 'fixed',
      top: isDragging ? `${dragPosition.y}px` : `${this.config.initialTop}px`,
      left: isDragging ? `${dragPosition.x}px` : `${this.config.initialLeft}px`,
      transition: isDragging ? 'none' : 'left 0.5s ease, top 0.5s ease',
      zIndex: 1000
    };

    const whatsappStyle = {
      position: 'fixed',
      top: isDragging 
        ? `${dragPosition.y + this.config.menuHeight + this.config.whatsappOffset}px`
        : '380px',
      left: isDragging 
        ? `${dragPosition.x + (this.config.menuWidth - this.config.whatsappSize) / 2}px`
        : '6px',
      transition: isDragging ? 'none' : 'left 0.5s ease, top 0.5s ease',
      zIndex: 1001
    };

    return (
      <>
        <div
          ref={this.menuRef}
          className="floating-menu"
          style={containerStyle}
        >
          {mainMenuItems.map((item, index) => this.renderMenuItem(item, index, true))}
        </div>
        
        <div 
          ref={this.whatsappRef}
          className="whatsapp-floating-button"
          style={whatsappStyle}
        >
          {this.renderMenuItem(whatsappItem, 0, false)}
        </div>
        
        {this.renderShareModal()}
      </>
    );
  }
}

export default FloatingMenu;