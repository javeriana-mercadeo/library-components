'use client'

import { useState, useEffect } from 'react'
import Btn from '@library/_general/components/buttons/btn_general'
import Container from '@library/_general/components/container/Container'

import logo from '../../../../../assets/logos/logo-jave-h-blue.svg'
import logoDark from '../../../../../assets/logos/logo-jave-h-white.svg'

import './styles.scss'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Cerrar el menú al hacer clic fuera o en los enlaces
  useEffect(() => {
    const handleOutsideClick = e => {
      if (!e.target.closest('#mobile-menu') && !e.target.closest('#menu-toggle')) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
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

        {/* CTA Buttons */}
        <div className="header__cta">
          <Btn id="info-btn" className="button--secondary">
            Recibe más Información
          </Btn>
          <Btn id="register-btn" className="button--primary" variant="primary">
            ¡Inscríbete Ahora!
          </Btn>
        </div>

        {/* Botón de menú móvil */}
        <button
          className="header__menu-toggle"
          id="menu-toggle"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Abrir menú de navegación">
          <i className="ph ph-list"></i>
        </button>

        {/* Menú móvil */}
        <div className={`header__mobile-menu ${isMenuOpen ? 'active' : ''}`} id="mobile-menu">
          <nav>
            <ul className="header__mobile-menu-list">
              <li>
                <a href="#" className="header__mobile-menu-link">
                  Sobre el Programa
                </a>
              </li>
              <li>
                <a href="#" className="header__mobile-menu-link">
                  Proceso de Inscripción
                </a>
              </li>
              <li>
                <a href="#" className="header__mobile-menu-link">
                  Centro de Ayuda
                </a>
              </li>
            </ul>
          </nav>
          <div className="header__mobile-actions">
            <ul className="header__mobile-cta">
              <li>
                <a href="#" className="header__mobile-cta-link">
                  Escríbenos por WhatsApp
                </a>
              </li>
              <li>
                <a href="#" className="header__mobile-cta-link">
                  Recibe más Información
                </a>
              </li>
              <li>
                <a href="#" className="header__mobile-cta-link">
                  Inscríbete Ahora!
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Header
