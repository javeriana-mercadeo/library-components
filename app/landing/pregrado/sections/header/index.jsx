'use client'

import { useState, useEffect } from 'react'
import Btn from '@library/components/buttons/btn_general'
import Container from '@library/components/container/Container'

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

    // Prevenir scroll cuando el menú está abierto
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick)
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <>
      <header className="header h-20">
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
            <Btn id="info-btn" variant="outline" data-modal-target="authentication-modal" data-modal-toggle="authentication-modal">
              Recibe más Información
            </Btn>

            <Btn id="register-btn">¡Inscríbete Ahora!</Btn>
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

      <div
        id="authentication-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Sign in to our platform</h3>
              <button
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="p-4 md:p-5">
              <form className="space-y-4" action="#">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
                <div className="flex justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                        required
                      />
                    </div>
                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Remember me
                    </label>
                  </div>
                  <a href="#" className="text-sm text-blue-700 hover:underline dark:text-blue-500">
                    Lost Password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Login to your account
                </button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Not registered?{' '}
                  <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">
                    Create account
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
