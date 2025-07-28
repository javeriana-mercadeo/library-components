'use client'

import { useEffect } from 'react'
import { UniversalComponent as UC, Btn, Container, Logo } from '@library/components'

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
                      startIcon={<i className="ph ph-question"></i>}
                      isEditable={false}>
                      Centro de Ayuda
                    </Btn>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </Container>
      </header>


    </>
  )
}

export default EncabezadoFix
