import React from 'react';

class ShareModal extends React.Component {
  constructor(props) {
    super(props);
    this.modalRef = React.createRef();
  }

  componentDidMount() {
    // Cerrar modal al hacer clic fuera de él
    document.addEventListener('mousedown', this.handleClickOutside);
    
    // Prevenir scroll del body cuando el modal está abierto
    if (this.props.isOpen) {
      document.body.classList.add('modal-open');
    }
  }

  componentDidUpdate(prevProps) {
    // Gestionar el scroll del body según el estado del modal
    if (prevProps.isOpen !== this.props.isOpen) {
      if (this.props.isOpen) {
        document.body.classList.add('modal-open');
      } else {
        document.body.classList.remove('modal-open');
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    document.body.classList.remove('modal-open');
  }

  handleClickOutside = (event) => {
    if (this.modalRef.current && !this.modalRef.current.contains(event.target)) {
      this.props.onClose();
    }
  };

  handleShareOption = (platform) => {
    const { onClose, shareFunction } = this.props;
    
    if (shareFunction) {
      shareFunction(platform);
    }
    
    // Cerrar modal después de compartir
    onClose();
  };

  // Manejo de teclas (ESC para cerrar)
  handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { isOpen, onClose } = this.props;
    
    if (!isOpen) return null;

    const shareOptions = [
      {
        id: 'whatsapp',
        icon: 'ph-whatsapp-logo',
        label: 'WhatsApp',
        color: '#25D366'
      },
      {
        id: 'facebook',
        icon: 'ph-facebook-logo', 
        label: 'Facebook',
        color: '#1877F2'
      },
      {
        id: 'instagram',
        icon: 'ph-instagram-logo',
        label: 'Instagram',
        color: '#E4405F'
      },
      {
        id: 'linkedin',
        icon: 'ph-linkedin-logo',
        label: 'LinkedIn',
        color: '#0A66C2'
      },
      {
        id: 'email',
        icon: 'ph-paper-plane-tilt',
        label: 'Correo',
        color: '#EA4335'
      },
      {
        id: 'copylink',
        icon: 'ph-link-simple',
        label: 'Copiar Link',
        color: '#6B7280'
      }
    ];

    return (
      <div 
        className="share-modal-overlay"
        onKeyDown={this.handleKeyDown}
        tabIndex={-1}
      >
        <div className="share-modal" ref={this.modalRef}>
          <div className="share-modal-header">
            <h3>Compartir</h3>
            <button 
              className="close-button"
              onClick={onClose}
              aria-label="Cerrar modal"
              type="button"
            >
              <i className="ph ph-x"></i>
            </button>
          </div>
          
          <div className="share-options-grid">
            {shareOptions.map((option) => (
              <button
                key={option.id}
                className="share-option"
                onClick={() => this.handleShareOption(option.id)}
                title={`Compartir en ${option.label}`}
                type="button"
              >
                <div 
                  className="share-icon"
                  style={{ '--hover-color': option.color }}
                >
                  <i className={`ph ${option.icon}`}></i>
                </div>
                <span className="share-label">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ShareModal;