'use client'

import { useEffect } from 'react'
import Btn from '@library/components/buttons/btn_general'
import Container from '@library/components/container/Container'

import logo from '../../../../../assets/logos/logo-jave-h-blue.svg'
import logoDark from '../../../../../assets/logos/logo-jave-h-white.svg'

import script from './script.js'
import './styles.scss'

const Header = () => {
  // Ejecutar el script cuando el componente se monta
  useEffect(() => {
    script()
  }, [])

  return (
    <>
      <header className="header">
        <Container className="header__container">
          {/* Logo */}
          <figure className="header__logo">
            <img src={logo.src} alt="Logo" className="header__logo-image light" />
            <img src={logoDark.src} alt="Logo" className="header__logo-image dark" />
          </figure>

          {/* Navegación desktop */}
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li>
                <a href="#" className="header__nav-link">
                  Centro de Ayuda
                </a>
              </li>
            </ul>
          </nav>

          {/* CTA Buttons - Solo desktop */}
          <div className="header__cta">
            <Btn id="info-btn" variant="outline" data-modal-target="contact-modal">
              Recibe más Información
            </Btn>

            <Btn id="register-btn">¡Inscríbete Ahora!</Btn>
          </div>

          {/* Botón de menú móvil con icono animado */}
          <Btn
            className="header__menu-toggle"
            id="menu-toggle"
            aria-label="Abrir menú de navegación"
            isEditable={false}
            variant="ghost"
            type="button">
            <div className="menu-icon" id="menu-icon">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </Btn>

          {/* Overlay para cerrar menú */}
          <div className="header__overlay" id="menu-overlay"></div>

          {/* Menú móvil mejorado - SIN CTA */}
          <div className="header__mobile-menu" id="mobile-menu">
            <div className="header__mobile-menu-content">
              {/* Logo */}
              <figure className="header__logo">
                <img src={logo.src} alt="Logo" className="header__logo-image light" />
                <img src={logoDark.src} alt="Logo" className="header__logo-image dark" />
              </figure>

              <nav>
                <ul className="header__mobile-menu-list">
                  <li>
                    <Btn href="#" className="header__mobile-menu-link" variant="link" startIcon={<i className="ph ph-clipboard-text"></i>}>
                      Proceso de Inscripción
                    </Btn>
                  </li>
                  <li>
                    <Btn href="#" className="header__mobile-menu-link" variant="link" startIcon={<i className="ph ph-question"></i>}>
                      Centro de Ayuda
                    </Btn>
                  </li>
                  <li>
                    <Btn
                      href="#"
                      className="header__mobile-menu-link whats"
                      variant="link"
                      startIcon={<i className="ph ph-whatsapp-logo"></i>}>
                      Escríbenos por WhatsApp
                    </Btn>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </Container>
      </header>

      {/* CTA Fixed Bottom - Solo móvil */}
      <div className="mobile-cta-fixed">
        <Container className="mobile-cta-fixed__container">
          <Btn href="#" className="mobile-cta-fixed__btn" fullWidth size="md" color="primary">
            ¡Inscríbete Ahora!
          </Btn>
          <Btn className="mobile-cta-fixed__btn" fullWidth size="md" color="primary" variant="outline" data-modal-target="contact-modal">
            Recibe más Información
          </Btn>
        </Container>
      </div>

      {/* MODAL DE CONTACTO RESPONSIVO */}
      <div className="modal-overlay" id="modal-overlay">
        <div className="contact-modal" id="contact-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          {/* Imagen lateral - Solo visible en desktop */}
          <div
            className="modal-image"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")'
            }}
          />

          {/* Contenedor del formulario */}
          <div className="modal-form-container">
            {/* Header del Modal */}
            <div className="modal-header">
              <h2 className="modal-header__title" id="modal-title">
                ¿Tienes dudas?
              </h2>
              <p className="modal-header__subtitle">
                Déjanos tus datos y te contactaremos para brindarte toda la información del programa.
              </p>
              <button className="modal-header__close" id="modal-close" aria-label="Cerrar modal" />
            </div>

            {/* Contenido del Modal */}
            <div className="modal-content">
              <form className="contact-form" id="contact-form" noValidate>
                {/* Nombres */}
                <div className="form-group">
                  <label htmlFor="nombres" className="form-label required">
                    Nombres
                  </label>
                  <input
                    type="text"
                    id="nombres"
                    name="nombres"
                    className="form-input"
                    placeholder="Escribe tu(s) nombre(s)"
                    required
                    autoComplete="given-name"
                  />
                </div>

                {/* Apellidos */}
                <div className="form-group">
                  <label htmlFor="apellidos" className="form-label required">
                    Apellidos
                  </label>
                  <input
                    type="text"
                    id="apellidos"
                    name="apellidos"
                    className="form-input"
                    placeholder="Escribe tu(s) apellido(s)"
                    required
                    autoComplete="family-name"
                  />
                </div>

                {/* Número de documento */}
                <div className="form-group">
                  <label htmlFor="documento" className="form-label required">
                    Número de documento
                  </label>
                  <input
                    type="text"
                    id="documento"
                    name="documento"
                    className="form-input"
                    placeholder="Ingresa tu número de documento"
                    required
                    autoComplete="off"
                  />
                </div>

                {/* Celular */}
                <div className="form-group">
                  <label htmlFor="celular" className="form-label required">
                    Celular
                  </label>
                  <input
                    type="tel"
                    id="celular"
                    name="celular"
                    className="form-input"
                    placeholder="Ingresa tu número de celular"
                    required
                    autoComplete="tel"
                  />
                </div>

                {/* Correo Electrónico */}
                <div className="form-group">
                  <label htmlFor="email" className="form-label required">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    placeholder="Ingresa tu correo electrónico"
                    required
                    autoComplete="email"
                  />
                </div>

                {/* Checkbox de términos y condiciones */}
                <div className="terms-group" id="terms-group">
                  <input type="checkbox" id="terms" name="terms" className="terms-checkbox" required />
                  <label htmlFor="terms" className="terms-label">
                    Acepto la{' '}
                    <a href="#" className="terms-link">
                      política de privacidad
                    </a>{' '}
                    y el{' '}
                    <a href="#" className="terms-link">
                      tratamiento de datos
                    </a>{' '}
                    de la Pontificia Universidad Javeriana.
                  </label>
                </div>

                {/* Botón de envío */}
                <button type="submit" className="submit-btn">
                  Enviar Ahora
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
