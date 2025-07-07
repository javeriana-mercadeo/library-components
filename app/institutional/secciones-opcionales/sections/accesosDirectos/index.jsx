import createFloatingMenuFunctions from './script.js'
import info from './info.json'
import './styles.scss'
import React from 'react';

class FloatingMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
      isDragging: false,
      hoveredItem: null,
      dragPosition: { x: 0, y: 0 },
      isDarkTheme: false,
      showShareModal: false
    };
    this.menuRef = React.createRef();
    this.dragOffset = { x: 0, y: 0 };
    this.menuFunctions = null;
  }

  componentDidMount() {
    console.log('createFloatingMenuFunctions:', createFloatingMenuFunctions);
    
    this.menuFunctions = createFloatingMenuFunctions();
    console.log('menuFunctions inicializadas:', this.menuFunctions);
    
    if (this.menuFunctions) {
      this.menuFunctions.utils.loadPhosphorIcons();
      console.log('Configuración del menú:', this.menuFunctions.config);
    } else {
      console.error('No se pudieron inicializar las funciones del menú');
      this.loadPhosphorIconsFallback();
    }
    
    this.forceUpdate();
  }

  loadPhosphorIconsFallback = () => {
    if (!document.querySelector('link[href*="phosphor-icons"]')) {
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
        { id: 'btnOpen', icon: 'ph-magnifying-glass-plus', color: '#454F59', hoverColor: '#4866D1', action: 'toggle', title: 'Abrir/Cerrar menú' },
        { id: 'btnZoomOut', icon: 'ph-magnifying-glass-minus', color: '#454F59', hoverColor: '#FF6B6B', action: 'zoomOut', title: 'Zoom Out' },
        { id: 'btnThemeToggle', icon: 'ph-sun', color: '#454F59', hoverColor: '#F6E05E', action: 'themeToggle', title: 'Cambiar tema' },
        { id: 'btnShare', icon: 'ph-share-fat', color: '#454F59', hoverColor: '#4CAF50', action: 'share', title: 'Compartir página' }
      ];
    }
    
    const items = this.menuFunctions.getMenuItems();
    console.log('Items del menú obtenidos:', items);
    return items;
  };

  // Separar items principales de WhatsApp y filtrar elementos no deseados
  getMainMenuItems = () => {
    const excludedActions = ['gradient', 'contrast', 'visibility'];
    return this.getMenuItems().filter(item => 
      item.id !== 'btnWhatsapp' && !excludedActions.includes(item.action)
    );
  };

  getWhatsAppItem = () => {
    return this.getMenuItems().find(item => item.id === 'btnWhatsapp');
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
    this.copyLink();
    alert('Link copiado. Puedes pegarlo en tu historia de Instagram');
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
      alert('Link copiado al portapapeles');
      this.closeShareModal();
    } catch (err) {
      console.error('Error al copiar:', err);
      alert('No se pudo copiar el link');
    }
  };

  handleFallbackActions = (action, url) => {
    const actions = {
      toggle: () => console.log('Toggle - menú siempre abierto'),
      zoomOut: () => alert('Función de zoom out activada'),
      themeToggle: () => {
        const newTheme = !this.state.isDarkTheme;
        this.setState({ isDarkTheme: newTheme });
        document.body.style.filter = newTheme ? 'invert(1)' : '';
      },
      gradient: () => {
        const hasGradient = document.body.style.background.includes('gradient');
        document.body.style.background = hasGradient ? '' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      },
      contrast: () => {
        const currentFilter = document.body.style.filter;
        const hasContrast = currentFilter.includes('contrast');
        if (hasContrast) {
          const newFilter = currentFilter.replace(/contrast\([^)]*\)\s*/g, '').trim();
          document.body.style.filter = newFilter;
        } else {
          const newFilter = currentFilter ? `${currentFilter} contrast(1.5)` : 'contrast(1.5)';
          document.body.style.filter = newFilter;
        }
      },
      visibility: () => {
        const content = document.querySelector('.demo-content');
        if (content) {
          content.style.opacity = content.style.opacity === '0.5' ? '1' : '0.5';
        }
      },
      whatsapp: () => {
        if (url) {
          window.open(url, '_blank');
        } else {
          const message = encodeURIComponent('Te invito a visitar este sitio web de la Pontificia Universidad Javeriana.');
          const currentUrl = encodeURIComponent(window.location.href);
          window.open(`https://api.whatsapp.com/send?text=${message}%20${currentUrl}`, '_blank');
        }
      }
    };

    if (actions[action]) {
      actions[action]();
    }
  };

  handleMouseEnter = (itemId) => {
    this.setState({ hoveredItem: itemId });
  };

  handleMouseLeave = () => {
    this.setState({ hoveredItem: null });
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
          this.setState({
            dragPosition: {
              x: e.clientX - this.dragOffset.x,
              y: e.clientY - this.dragOffset.y
            }
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
    const { hoveredItem, isDragging } = this.state;
    const isFirst = index === 0 && isMainMenu;
    const isHovered = hoveredItem === item.id;
    const menuItems = isMainMenu ? this.getMainMenuItems() : [this.getWhatsAppItem()];

    const itemStyle = {
      zIndex: menuItems.length - index + 2
    };

    let displayIcon = item.icon;
    let iconColor = '#454F59';
    let currentHoverColor = item.hoverColor || item.color;

    if (item.id === 'btnThemeToggle' && this.menuFunctions) {
      const themeData = this.menuFunctions.getThemeIcon(isHovered);
      displayIcon = themeData.icon;
      iconColor = '#454F59';
      currentHoverColor = themeData.hoverColor || themeData.color;
    }

    // Estilos especiales para WhatsApp
    if (item.id === 'btnWhatsapp') {
      iconColor = isHovered ? 'white' : '#25D366';
      currentHoverColor = '#25D366';
    }

    const iconStyle = {
      color: isHovered ? 'white' : iconColor
    };

    const spanStyle = {
      width: isHovered ? (item.id === 'btnWhatsapp' ? '4rem' : '3.6rem') : '0',
      height: isHovered ? (item.id === 'btnWhatsapp' ? '4rem' : '3.6rem') : '0',
      backgroundColor: currentHoverColor
    };

    return (
      <div
        key={item.id}
        className={`menu-item ${isFirst ? 'menu-toggle' : ''} ${item.id === 'btnWhatsapp' ? 'whatsapp-button' : ''}`}
        style={itemStyle}
        title={item.title || item.action}
        onClick={() => this.handleItemClick(item.action, item.url)}
        onMouseEnter={() => this.handleMouseEnter(item.id)}
        onMouseLeave={this.handleMouseLeave}
        onMouseDown={(e) => this.handleMouseDown(e, isFirst)}
      >
        <span style={spanStyle}></span>
        <i className={`ph ${displayIcon}`} style={iconStyle}></i>
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

    const containerStyle = {
      top: isDragging ? dragPosition.y + 'px' : undefined,
      left: isDragging ? dragPosition.x + 'px' : undefined,
      transition: isDragging ? 'none' : undefined
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
        
        {/* Botón de WhatsApp separado */}
        {whatsappItem && (
          <div className="whatsapp-floating-button">
            {this.renderMenuItem(whatsappItem, 0, false)}
          </div>
        )}
        
        {this.renderShareModal()}
      </>
    );
  }
}

export default FloatingMenu;