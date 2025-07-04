'use client'

import { useEffect } from 'react'
import Btn from '@library/components/contain/btn'
import Container from '@library/components/container'
import Logo from '@library/components/logo_institucional'

import ModalForm from './components/modalForm/index.jsx'

import script from './script.js'
import './styles.scss'

const EncabezadoFix = () => {
  useEffect(() => {
    script()
  }, [])

  return (
    <>
      <header className="header">
        <Container className="header__container">
          <Logo />

          {/* Navegación desktop */}
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li>
                <Btn href="#" variant="light" isEditable={false}>
                  Centro de Ayuda
                </Btn>
              </li>
            </ul>
          </nav>

          {/* CTA Buttons - Solo desktop */}
          <div className="header__cta">
            <Btn elementId="info-btn" variant="faded" data-modal-target="contact-modal" isEditable={false}>
              Recibe más Información
            </Btn>

            <Btn elementId="register-btn" isEditable={false}>
              ¡Inscríbete Ahora!
            </Btn>
          </div>

          {/* Botón de menú móvil con icono animado */}
          <Btn
            className="header__menu-toggle"
            elementId="menu-toggle"
            aria-label="Abrir menú de navegación"
            data-menu-target="mobile-menu"
            isEditable={false}
            variant="light"
            type="button"
            startIcon={
              <div className="menu-icon" id="menu-icon">
                <span></span>
                <span></span>
                <span></span>
              </div>
            }
            iconOnly
            {...{ 'data-menu-target': 'mobile-menu' }}
          />

          {/* Overlay para cerrar menú */}
          <div className="header__overlay" id="menu-overlay"></div>

          {/* Menú móvil */}
          <div className="header__mobile-menu" id="mobile-menu">
            <div className="header__mobile-menu-content">
              <Logo />

              <nav>
                <ul className="header__mobile-menu-list">
                  <li>
                    <Btn
                      href="#"
                      className="header__mobile-menu-link"
                      variant="light"
                      startIcon={<i className="ph ph-clipboard-text"></i>}
                      isEditable={false}>
                      Proceso de Inscripción
                    </Btn>
                  </li>
                  <li>
                    <Btn
                      href="#"
                      className="header__mobile-menu-link"
                      variant="light"
                      startIcon={<i className="ph ph-question"></i>}
                      isEditable={false}>
                      Centro de Ayuda
                    </Btn>
                  </li>
                  <li>
                    <Btn
                      href="#"
                      className="header__mobile-menu-link whats"
                      variant="light"
                      startIcon={<i className="ph ph-whatsapp-logo"></i>}
                      isEditable={false}>
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
          <Btn href="#" className="mobile-cta-fixed__btn" fullWidth size="md" color="primary" isEditable={false}>
            ¡Inscríbete Ahora!
          </Btn>
          <Btn
            className="mobile-cta-fixed__btn"
            fullWidth
            size="md"
            color="primary"
            variant="faded"
            data-modal-target="contact-modal"
            isEditable={false}>
            Recibe más Información
          </Btn>
        </Container>
      </div>

      <ModalForm />
    </>
  )
}

export default EncabezadoFix
