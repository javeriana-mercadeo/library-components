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
      tabIndex="0"
      role="button"
      aria-label="Abrir menú de accesibilidad">
      <i className="ph ph-person"></i>
    </div>
    <div
      className="menu-close-button menu-item"
      data-action="toggleMenu"
      title="Cerrar menú de accesibilidad"
      tabIndex="0"
      role="button"
      aria-label="Cerrar menú de accesibilidad"
      style={{display:'none'}}>
      <i className="ph ph-x"></i>
    </div>
    <div
      className="menu-item"
      id="btnIncreaseFontSize"
      data-action="increaseFontSize"
      title="Aumentar tamaño de fuente"
      aria-label="Aumentar tamaño de fuente"
      tabIndex="0"
      role="button">
      <span></span>
      <i className="ph ph-plus-circle"></i>
    </div>
    <div
      className="menu-item"
      id="btnDecreaseFontSize"
      data-action="decreaseFontSize"
      title="Disminuir tamaño de fuente"
      aria-label="Disminuir tamaño de fuente"
      tabIndex="0"
      role="button">
      <span></span>
      <i className="ph ph-minus-circle"></i>
    </div>
    <div
      className="menu-item"
      id="btnThemeToggle"
      data-action="themeToggle"
      title="Cambiar tema"
      aria-label="Cambiar tema de color"
      tabIndex="0"
      role="button">
      <span></span>
      <i className="ph ph-sun"></i>
    </div>
    <div
      className="menu-item"
      id="btnGrayscale"
      data-action="grayscale"
      title="Escala de grises"
      aria-label="Activar escala de grises"
      tabIndex="0"
      role="button">
      <span></span>
      <i className="ph ph-circle-half"></i>
    </div>
    <div
      className="menu-item"
      id="btnShare"
      data-action="share"
      title="Compartir página"
      aria-label="Abrir opciones para compartir"
      tabIndex="0"
      role="button">
      <span></span>
      <i className="ph ph-share-fat"></i>
    </div>
  </div>
  
 <div id="whatsapp-floating-button" className="whatsapp-floating-button">
    <a href="#" 
       className="menu-item whatsapp-button"
       id="btnWhatsapp"
       data-puj-link-whatsapp="true" 
       title="Contactar por WhatsApp"
       aria-label="Contactar por WhatsApp"
       tabIndex="0"
       role="button">
      <span></span>
      <i className="ph ph-whatsapp-logo"></i>
    </a>
  </div>
  
  <div
    id="share-modal-overlay"
    role="dialog"
    aria-modal="true"
    aria-labelledby="share-modal-title"
    className="share-modal-overlay share-modal-hidden">
    <div className="share-modal">
      <div className="share-modal-header">
        <h3 id="share-modal-title">Compartir</h3>
        <button className="share-modal-close" aria-label="Cerrar modal de compartir" type="button">
          <i className="ph ph-x"></i>
        </button>
      </div>
      <div className="share-options">
        <div
          className="share-option"
          data-share="whatsapp"
          tabIndex="0"
					data-puj-link-whatsapp="true"
          role="button"
          aria-label="Compartir en WhatsApp">
          <i className="ph ph-whatsapp-logo"></i>
          <span>WhatsApp</span>
        </div>
        <div
          className="share-option"
          data-share="facebook"
          tabIndex="0"
          role="button"
          aria-label="Compartir en Facebook">
          <i className="ph ph-facebook-logo"></i>
          <span>Facebook</span>
        </div>
        <div
          className="share-option"
          data-share="instagram"
          tabIndex="0"
          role="button"
          aria-label="Compartir en Instagram">
          <i className="ph ph-instagram-logo"></i>
          <span>Instagram</span>
        </div>
        <div
          className="share-option"
          data-share="linkedin"
          tabIndex="0"
          role="button"
          aria-label="Compartir en LinkedIn">
          <i className="ph ph-linkedin-logo"></i>
          <span>LinkedIn</span>
        </div>
        <div
          className="share-option"
          data-share="email"
          tabIndex="0"
          role="button"
          aria-label="Compartir por correo electrónico">
          <i className="ph ph-paper-plane-tilt"></i>
          <span>Correo</span>
        </div>
        <div
          className="share-option"
          data-share="copy"
          tabIndex="0"
          role="button"
          aria-label="Copiar enlace al portapapeles">
          <i className="ph ph-copy"></i>
          <span>Copiar Link</span>
        </div>
      </div>
    </div>
  </div>
  <div id="floating-menu-notifications" className="floating-menu-notifications"></div>
</div>
  );
};

export default FloatingMenu;