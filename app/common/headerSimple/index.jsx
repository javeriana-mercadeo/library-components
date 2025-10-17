'use client'
import { useScript } from '@hooks'
import { Logo } from '@common'
import { Container, Button } from '@components'

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
                      href='https://www.javeriana.edu.co/info-prg/centro-de-ayuda'
                      target='_blank'
                      className='header__mobile-menu-link'
                      variant='light'
                      startIcon={<i className='ph ph-question'></i>}
                      isEditable={false}>
                      Centro de Ayuda
                    </Button>
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
