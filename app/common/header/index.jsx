import { useScript } from '@hooks'
import { Logo } from '@common'
import { Container, Button } from '@components'
import ModalForm from './components/ModalForm.jsx'

import './styles.scss'

const EncabezadoFix = () => {
  const staticMode = false // Cambiar a true para modo estático (evitar la carga del script en desarrollo [local])
  useScript(() => import('./script.js'), { staticMode })

  return (
    <>
      <header className='header'>
        <Container className='header__container'>
          <Logo />

          {/* Navegación desktop */}
          <nav className='header__nav'>
            <ul className='header__nav-list'>
              <li>
                <Button href='https://www.javeriana.edu.co/info-prg/centro-de-ayuda' target='_blank' variant='light' isEditable={false}>
                  Centro de Ayuda
                </Button>
              </li>
            </ul>
          </nav>

          {/* CTA Buttons - Solo desktop */}
          <div className='header__cta'>
            <Button elementId='info-btn' variant='faded' data-modal-target='contact-modal' isEditable={false}>
              Recibe más información
            </Button>

            <Button
              elementId='register-btn'
              isEditable={false}
              href='https://cs.javeriana.edu.co:9443/psp/CSADGST/EMPLOYEE/SA/c/UJ_INSCRIPCIONES_AUTOSERVICIO.UJ_AUTO_BIENVENIDO.GBL'
              target='_blank'>
              Inscríbete ahora
            </Button>
          </div>

          {/* Botón de menú móvil con icono animado */}
          <Button
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
                    <Button
                      href='https://www.javeriana.edu.co/info-prg/proceso_de_inscripcion'
                      target='_blank'
                      className='header__mobile-menu-link'
                      variant='light'
                      startIcon={<i className='ph ph-clipboard-text'></i>}
                      isEditable={false}>
                      Proceso de inscripción
                    </Button>
                  </li>
                  <li>
                    <Button
                      href='https://www.javeriana.edu.co/info-prg/centro-de-ayuda'
                      target='_blank'
                      className='header__mobile-menu-link'
                      variant='light'
                      startIcon={<i className='ph ph-question'></i>}
                      isEditable={false}>
                      Centro de Ayuda
                    </Button>
                  </li>
                  <li>
                    <Button
                      href='#'
                      className='header__mobile-menu-link whats'
                      variant='light'
                      startIcon={<i className='ph ph-whatsapp-logo'></i>}
                      isEditable={false}
                      data-puj-link-whatsapp='true'>
                      Escríbenos por WhatsApp
                    </Button>
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
          <Button
            className='mobile-cta-fixed__btn'
            fullWidth
            size='md'
            color='primary'
            isEditable={false}
            href='https://cs.javeriana.edu.co:9443/psp/CSADGST/EMPLOYEE/SA/c/UJ_INSCRIPCIONES_AUTOSERVICIO.UJ_AUTO_BIENVENIDO.GBL'
            target='_blank'>
            Inscríbete ahora
          </Button>
          <Button
            className='mobile-cta-fixed__btn'
            fullWidth
            size='md'
            color='primary'
            variant='faded'
            data-modal-target='contact-modal'
            isEditable={false}>
            Recibe más información
          </Button>
        </Container>
      </div>

      <ModalForm />
    </>
  )
}

export default EncabezadoFix
