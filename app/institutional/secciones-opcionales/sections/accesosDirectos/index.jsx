import React from 'react';
import './styles.scss';

const FloatingMenu = () => {
  return (
    <div id="floating-menu-container" className="floating-menu-container">
      <div id="floating-menu-main" className="floating-menu collapsed">
        <div
          className="menu-toggle-button menu-item"
          data-action="toggleMenu"
          title="Abrir menú de accesibilidad"
          tabIndex={0}
          role="button"
          aria-label="Abrir menú de accesibilidad"
        >
          <i className="ph ph-person"></i>
        </div>
        <div
          className="menu-close-button menu-item"
          data-action="toggleMenu"
          title="Cerrar menú de accesibilidad"
          tabIndex={0}
          role="button"
          aria-label="Cerrar menú de accesibilidad"
          style={{ display: 'none' }}
        >
          <i className="ph ph-x"></i>
        </div>
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

      {/* Botón de WhatsApp */}
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

      {/* Configuración del número de WhatsApp */}
      <div style={{ display: 'none' }} className="whatsapp-config">
        <span
          className="editable-whatsapp-number"
          data-lfr-editable-id="whatsapp-number"
          data-lfr-editable-type="text"
          data-placeholder="Número de WhatsApp (ej: +573001234567)"
        >
          +573001234567
        </span>
      </div>

      {/* Modal para compartir */}
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
            {[
              { id: 'whatsapp', label: 'WhatsApp' },
              { id: 'facebook', label: 'Facebook' },
              { id: 'instagram', label: 'Instagram' },
              { id: 'linkedin', label: 'LinkedIn' },
              { id: 'email', label: 'Correo' },
              { id: 'copy', label: 'Copiar Link' },
            ].map(({ id, label }) => (
              <div
                key={id}
                className="share-option"
                data-share={id}
                tabIndex={0}
                role="button"
                aria-label={`Compartir en ${label}`}
              >
                <i className={`ph ph-${id === 'copy' ? 'copy' : `${id}-logo`}`}></i>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="floating-menu-notifications" className="floating-menu-notifications"></div>
    </div>
  );
};

export default FloatingMenu;