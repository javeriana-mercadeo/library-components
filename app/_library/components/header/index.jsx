'use client'

import { useEffect } from 'react'
import { UniversalComponent as UC, Btn, Container, Logo } from '@library/components'
import ModalForm from './components/ModalForm.jsx'

import script from './script.js'
import './styles.scss'

const EncabezadoFix = () => {
  useEffect(() => {
    script()
  }, [])

  return (
    <>
      <header className='header'>
        <Container className='header__container'>
          <Logo />

          {/* Navegación desktop */}
          <nav className='header__nav'>
            <ul className='header__nav-list'>
              <li>
                <Btn href='https://www.javeriana.edu.co/info-prg/centro-de-ayuda' target='_blank' variant='light' isEditable={false}>
                  Centro de Ayuda
                </Btn>
              </li>
            </ul>
          </nav>

          {/* CTA Buttons - Solo desktop */}
          <div className='header__cta'>
            <Btn elementId='info-btn' variant='faded' data-modal-target='contact-modal' isEditable={false}>
              Recibe más información
            </Btn>

            <Btn
              elementId='register-btn'
              isEditable={false}
              href='https://cs.javeriana.edu.co:9443/psp/CSADGST/EMPLOYEE/SA/c/UJ_INSCRIPCIONES_AUTOSERVICIO.UJ_AUTO_BIENVENIDO.GBL'
              target='_blank'>
              Inscríbete ahora
            </Btn>
          </div>

          {/* Botón de menú móvil con icono animado */}
          <Btn
            className='header__menu-toggle'
            elementId='menu-toggle'
            aria-label='Abrir menú de navegación'
            data-menu-target='mobile-menu'
            isEditable={false}
            variant='light'
            type='button'
            startIcon={
              <div className='menu-icon' id='menu-icon'>
                <span></span>
                <span></span>
                <span></span>
              </div>
            }
            iconOnly
          />

          {/* Overlay para cerrar menú */}
          <div className='header__overlay' id='menu-overlay'></div>

          {/* Menú móvil */}
          <div className='header__mobile-menu' id='mobile-menu'>
            <div className='header__mobile-menu-content'>
              <Logo />

              <nav>
                <ul className='header__mobile-menu-list'>
                  <li>
                    <Btn
                      href='https://www.javeriana.edu.co/info-prg/proceso_de_inscripcion'
                      target='_blank'
                      className='header__mobile-menu-link'
                      variant='light'
                      startIcon={<i className='ph ph-clipboard-text'></i>}
                      isEditable={false}>
                      Proceso de inscripción
                    </Btn>
                  </li>
                  <li>
                    <Btn
                      href='https://www.javeriana.edu.co/info-prg/centro-de-ayuda'
                      target='_blank'
                      className='header__mobile-menu-link'
                      variant='light'
                      startIcon={<i className='ph ph-question'></i>}
                      isEditable={false}>
                      Centro de Ayuda
                    </Btn>
                  </li>
                  <li>
                    <Btn
                      href='#'
                      className='header__mobile-menu-link whats'
                      variant='light'
                      startIcon={<i className='ph ph-whatsapp-logo'></i>}
                      isEditable={false}
                      data-puj-link-whatsapp='true'>
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
      <div className='mobile-cta-fixed'>
        <Container className='mobile-cta-fixed__container'>
          <Btn
            className='mobile-cta-fixed__btn'
            fullWidth
            size='md'
            color='primary'
            isEditable={false}
            href='https://cs.javeriana.edu.co:9443/psp/CSADGST/EMPLOYEE/SA/c/UJ_INSCRIPCIONES_AUTOSERVICIO.UJ_AUTO_BIENVENIDO.GBL'
            target='_blank'>
            Inscríbete ahora
          </Btn>
          <Btn
            className='mobile-cta-fixed__btn'
            fullWidth
            size='md'
            color='primary'
            variant='faded'
            data-modal-target='contact-modal'
            isEditable={false}>
            Recibe más información
          </Btn>
        </Container>
      </div>

      <ModalForm />
    </>
  )
}

export default EncabezadoFix
