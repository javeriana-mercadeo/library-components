import script from './script.js'
import info from './info.json'
import './styles.scss'
import React from 'react';

<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/regular/style.css" />
class FloatingMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isDragging: false,
      hoveredItem: null,
      dragPosition: { x: 0, y: 0 }
    };
    this.menuRef = React.createRef();
    this.dragOffset = { x: 0, y: 0 };
  }

  // Demostración inicial del menú
  componentDidMount() {
    // Cargar iconos Phosphor dinámicamente
    if (!document.querySelector('script[src*="phosphor-icons"]')) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@phosphor-icons/web';
      script.async = true;
      document.head.appendChild(script);
    }

    // Abrir menú y mantenerlo abierto
    setTimeout(() => {
      this.setState({ isOpen: true });
      // Comentado para mantener siempre abierto
      // setTimeout(() => {
      //   this.setState({ isOpen: false });
      // }, 1000);
    }, 50);
  }

  // Configuración de elementos del menú
  getMenuItems = () => [
    { id: 'btnOpen', icon: 'ph-magnifying-glass-plus', color: '#4866D1', action: 'toggle' },
    { id: 'btnZoomOut', icon: 'ph-magnifying-glass-minus', color: '#FF6B6B', action: 'zoomOut' },
    { id: 'btnDarkMode', icon: 'ph-moon', color: '#2D3748', action: 'darkMode' },
    { id: 'btnLightMode', icon: 'ph-sun', color: '#F6E05E', action: 'lightMode' },
    { id: 'btnGradient', icon: 'ph-gradient', color: '#9F7AEA', action: 'gradient' },
    { id: 'btnContrast', icon: 'ph-circle-half', color: '#718096', action: 'contrast' },
    { id: 'btnVisibility', icon: 'ph-eye', color: '#38B2AC', action: 'visibility' },
    { id: 'btnShare', icon: 'ph-share-fat', color: '#4CAF50', action: 'share' },
    {
      id: 'btnWhatsapp',
      icon: 'ph-whatsapp-logo',
      color: '#25D366',
      action: 'whatsapp',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(
        'Te invito a visitar este sitio web de la Pontificia Universidad Javeriana.'
      )}%20${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`
    }
  ];

  // Manejo de acciones de los botones
  handleItemClick = (action, url) => {
    if (action === 'toggle') {
      this.setState({ isOpen: !this.state.isOpen });
      return;
    }

    const actions = {
      zoomOut: () => alert('Función de zoom out activada'),
      darkMode: () => {
        if (typeof document !== 'undefined') {
          document.body.style.filter = document.body.style.filter === 'invert(1)' ? '' : 'invert(1)';
        }
      },
      lightMode: () => {
        if (typeof document !== 'undefined') {
          document.body.style.filter = '';
        }
      },
      gradient: () => {
        if (typeof document !== 'undefined') {
          document.body.style.background = document.body.style.background.includes('gradient')
            ? ''
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        }
      },
      contrast: () => {
        if (typeof document !== 'undefined') {
          document.body.style.filter = document.body.style.filter.includes('contrast')
            ? ''
            : 'contrast(1.5)';
        }
      },
      visibility: () => {
        if (typeof document !== 'undefined') {
          const content = document.querySelector('.demo-content');
          if (content) {
            content.style.opacity = content.style.opacity === '0.5' ? '1' : '0.5';
          }
        }
      },
      share: async () => {
        if (typeof navigator !== 'undefined' && navigator.share) {
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
        if (url && typeof window !== 'undefined') {
          window.open(url, '_blank');
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

  // Manejo del arrastre simplificado
  handleMouseDown = (e, isFirst) => {
    if (isFirst) {
      e.preventDefault();
      this.setState({ isDragging: true });
      
      const rect = e.currentTarget.getBoundingClientRect();
      this.dragOffset = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
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
        this.setState({ isDragging: false, isOpen: false });
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  };

  handleMouseUp = (isFirst) => {
    if (isFirst && !this.state.isDragging) {
      this.setState({ isOpen: !this.state.isOpen });
    }
  };

  // Renderizar elemento individual del menú
  renderMenuItem = (item, index) => {
    const { isOpen, hoveredItem, isDragging, dragPosition } = this.state;
    const isFirst = index === 0;
    const isHovered = hoveredItem === item.id;
    const menuItems = this.getMenuItems();

    let top = '0px';
    let left = '0px';

    if (isDragging && isFirst) {
      left = dragPosition.x + 'px';
      top = dragPosition.y + 'px';
    } else if (isOpen && !isFirst) {
      top = (index * 50) + 'px';
    }

    const itemStyle = {
      position: 'absolute',
      left: left,
      top: top,
      width: '38px',
      height: '38px',
      backgroundColor: 'white',
      borderRadius: '50%',
      border: `1px solid ${item.color}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      overflow: 'hidden',
      transition: isDragging && isFirst ? 'none' : 'all 0.5s ease',
      zIndex: menuItems.length - index + 2,
      userSelect: 'none'
    };

    const iconStyle = {
      fontSize: '19px',
      color: isHovered ? 'white' : item.color,
      transition: 'all 0.3s ease',
      zIndex: 1,
      position: 'relative',
      pointerEvents: 'none'
    };

    const spanStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: isHovered ? '3.6rem' : '0',
      height: isHovered ? '3.6rem' : '0',
      backgroundColor: item.color,
      borderRadius: '50%',
      transform: 'translate(-50%, -50%)',
      transition: 'all 0.3s ease',
      zIndex: 0
    };

    return (
      <div
        key={item.id}
        className={`menu-item ${isFirst ? 'menu-toggle' : ''}`}
        style={itemStyle}
        onClick={() => this.handleItemClick(item.action, item.url)}
        onMouseEnter={() => this.handleMouseEnter(item.id)}
        onMouseLeave={this.handleMouseLeave}
        onMouseDown={(e) => this.handleMouseDown(e, isFirst)}
        onMouseUp={() => this.handleMouseUp(isFirst)}
      >
        <span style={spanStyle}></span>
        <i className={`ph ${item.icon}`} style={iconStyle}></i>
      </div>
    );
  };

  render() {
    const menuItems = this.getMenuItems();

    return (
      <>
        {/* Contenido de demostración */}
        <div className="demo-content" style={{
          color: 'white',
          textAlign: 'center',
          padding: '50px 20px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          minHeight: '100vh',
          margin: '-20px',
          fontFamily: 'Arial, sans-serif'
        }}>
          <h1>Menú Flotante con React y Phosphor Icons</h1>
          <p>Haz clic en el primer icono del menú flotante para ver la animación</p>
          <p>Los botones tienen diferentes funcionalidades como modo oscuro, compartir, etc.</p>
          <p>El primer elemento es arrastrable</p>
        </div>

        {/* Menú flotante principal */}
        <div
          ref={this.menuRef}
          className="floating-menu"
          style={{
            position: 'fixed',
            top: '142px',
            left: '10px',
            width: '38px',
            height: '38px',
            zIndex: 1000
          }}
        >
          {menuItems.map((item, index) => this.renderMenuItem(item, index))}
        </div>

        {/* Estilos CSS para responsive */}
        <style jsx>{`
          @media (max-width: 768px) {
            .floating-menu {
              top: 100px !important;
              left: 20px !important;
            }
          }
          
          .menu-item:focus,
          .menu-item:focus-visible,
          .menu-item:active {
            outline: none;
          }
          
          body {
            margin: 0;
            padding: 20px;
          }
        `}</style>
      </>
    );
  }
}

export default FloatingMenu;