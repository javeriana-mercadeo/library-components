import createFloatingMenuFunctions from './script.js'
import info from './info.json'
import './styles.scss'
import React from 'react';

class FloatingMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true, // Siempre abierto
      isDragging: false,
      hoveredItem: null,
      dragPosition: { x: 0, y: 0 },
      isDarkTheme: false
    };
    this.menuRef = React.createRef();
    this.dragOffset = { x: 0, y: 0 };
    this.menuFunctions = null;
  }

  componentDidMount() {
    // Verificar si la función se importó correctamente
    console.log('createFloatingMenuFunctions:', createFloatingMenuFunctions);
    
    // Inicializar funciones del menú desde script.js
    this.menuFunctions = createFloatingMenuFunctions();
    console.log('menuFunctions inicializadas:', this.menuFunctions);
    
    if (this.menuFunctions) {
      // Cargar iconos Phosphor usando la utilidad del script
      this.menuFunctions.utils.loadPhosphorIcons();
      console.log('Configuración del menú:', this.menuFunctions.config);
    } else {
      console.error('No se pudieron inicializar las funciones del menú');
      // Fallback: cargar iconos manualmente
      this.loadPhosphorIconsFallback();
    }
    
    // Forzar re-render para mostrar iconos
    this.forceUpdate();
  }

  // Fallback para cargar iconos si falla el script
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

  // Obtener elementos del menú desde script.js con fallback
  getMenuItems = () => {
    if (!this.menuFunctions) {
      console.warn('MenuFunctions no disponibles, usando configuración por defecto');
      // Fallback: configuración por defecto
      return [
        { id: 'btnOpen', icon: 'ph-magnifying-glass-plus', color: '#454F59', hoverColor: '#4866D1', action: 'toggle', title: 'Abrir/Cerrar menú' },
        { id: 'btnZoomOut', icon: 'ph-magnifying-glass-minus', color: '#454F59', hoverColor: '#FF6B6B', action: 'zoomOut', title: 'Zoom Out' },
        { id: 'btnThemeToggle', icon: 'ph-sun', color: '#454F59', hoverColor: '#F6E05E', action: 'themeToggle', title: 'Cambiar tema' },
        { id: 'btnGradient', icon: 'ph-gradient', color: '#454F59', hoverColor: '#9F7AEA', action: 'gradient', title: 'Activar gradiente' },
        { id: 'btnContrast', icon: 'ph-circle-half', color: '#454F59', hoverColor: '#718096', action: 'contrast', title: 'Cambiar contraste' },
        { id: 'btnVisibility', icon: 'ph-eye', color: '#454F59', hoverColor: '#38B2AC', action: 'visibility', title: 'Cambiar visibilidad' },
        { id: 'btnShare', icon: 'ph-share-fat', color: '#454F59', hoverColor: '#4CAF50', action: 'share', title: 'Compartir página' },
        { id: 'btnWhatsapp', icon: 'ph-whatsapp-logo', color: '#454F59', hoverColor: '#25D366', action: 'whatsapp', title: 'Compartir en WhatsApp' }
      ];
    }
    
    const items = this.menuFunctions.getMenuItems();
    console.log('Items del menú obtenidos:', items);
    return items;
  };

  // Manejo de acciones con fallback
  handleItemClick = (action, url) => {
    console.log('Acción clickeada:', action, url);
    
    if (this.menuFunctions) {
      // Usar funciones del script
      const result = this.menuFunctions.executeAction(action, url);
      
      // Actualizar estado local si es necesario
      if (action === 'themeToggle') {
        const newTheme = this.menuFunctions.utils.isDarkTheme();
        this.setState({ isDarkTheme: newTheme });
      }
      
      console.log(`Acción '${action}' ejecutada:`, result);
    } else {
      // Fallback: acciones básicas
      console.warn('Usando acciones fallback');
      this.handleFallbackActions(action, url);
    }
  };

  // Acciones fallback si no está disponible el script
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
      share: async () => {
        if (navigator.share) {
          try {
            await navigator.share({
              title: 'Mi Página Web',
              text: '¡Mira esta increíble página!',
              url: window.location.href
            });
          } catch (error) {
            console.error('Error al compartir:', error);
          }
        } else {
          alert('La funcionalidad de compartir no es compatible con tu dispositivo.');
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

  // Manejo del hover
  handleMouseEnter = (itemId) => {
    this.setState({ hoveredItem: itemId });
  };

  handleMouseLeave = () => {
    this.setState({ hoveredItem: null });
  };

  // Manejo del arrastre solo para el primer elemento
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

  // Renderizar elemento individual del menú
  renderMenuItem = (item, index) => {
    const { hoveredItem, isDragging } = this.state;
    const isFirst = index === 0;
    const isHovered = hoveredItem === item.id;
    const menuItems = this.getMenuItems();

    // Posición fija para todos los elementos
    const itemStyle = {
      zIndex: menuItems.length - index + 2
    };

    // Lógica especial para el icono del tema usando script.js
    let displayIcon = item.icon;
    let iconColor = '#454F59'; // FORZAR color gris para TODOS los iconos
    let currentHoverColor = item.hoverColor || item.color;

    if (item.id === 'btnThemeToggle' && this.menuFunctions) {
      const themeData = this.menuFunctions.getThemeIcon(isHovered);
      displayIcon = themeData.icon;
      iconColor = '#454F59'; // MANTENER gris incluso para tema
      currentHoverColor = themeData.hoverColor || themeData.color;
    }

    const iconStyle = {
      color: isHovered ? 'white' : '#454F59' // FORZAR gris cuando no hay hover
    };

    const spanStyle = {
      width: isHovered ? '3.6rem' : '0',
      height: isHovered ? '3.6rem' : '0',
      backgroundColor: currentHoverColor // Usar el color de hover correcto
    };

    return (
      <div
        key={item.id}
        className={`menu-item ${isFirst ? 'menu-toggle' : ''}`}
        style={itemStyle}
        title={item.title || item.action} // Tooltip con descripción
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

  render() {
    const menuItems = this.getMenuItems();
    const { isDragging, dragPosition } = this.state;

    // Estilos dinámicos solo para el drag del contenedor
    const containerStyle = {
      top: isDragging ? dragPosition.y + 'px' : undefined,
      left: isDragging ? dragPosition.x + 'px' : undefined,
      transition: isDragging ? 'none' : undefined
    };

    return (
      <>
        {/* Contenido de demostración */}
        <div className="demo-content">
          <h1>Menú Flotante con React y Phosphor Icons</h1>
          <p>El menú flotante está siempre desplegado</p>
          <p>Funcionalidades centralizadas en script.js:</p>
          <ul>
            <li>🌓 Modo oscuro con filtro invert</li>
            <li>🎨 Fondo gradiente dinámico</li>
            <li>🔍 Función de zoom out</li>
            <li>👁️ Control de visibilidad</li>
            <li>📤 Compartir nativo y WhatsApp</li>
            <li>🎭 Contraste mejorado</li>
          </ul>
          <p>El primer elemento permite arrastrar todo el menú</p>
          <p>🎨 Iconos: #454F59 (gris) | Hovers: colores únicos</p>
        </div>

        {/* Menú flotante principal */}
        <div
          ref={this.menuRef}
          className="floating-menu"
          style={containerStyle}
        >
          {menuItems.map((item, index) => this.renderMenuItem(item, index))}
        </div>
      </>
    );
  }
}

export default FloatingMenu;