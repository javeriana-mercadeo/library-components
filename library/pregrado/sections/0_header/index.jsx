import Btn from '@library/_general/components/buttons/btn_general'
import Container from '@/library/_general/components/container/Container'

import logo from '../../../../assets/logos/logo-jave-h-blue-.svg'
import logoDark from '../../../../assets/logos/logo-jave-h-white-.svg'
import './styles.scss'

const Index = () => {
  return (
    <header className="header">
      <Container className="container">
        <figure className="header__logo">
          <img src={logo.src} alt="Logo" className="header__logo-image light" />
          <img src={logoDark.src} alt="Logo" className="header__logo-image dark" />
        </figure>

        <nav className="header__nav">
          <ul className="header__nav-list">
            <li>
              <a href="#" className="header__nav-link">
                Centro de Ayuda
              </a>
            </li>
          </ul>
        </nav>

        <div className="header__cta">
          <Btn id="1" className="button--secondary">
            Recibe más Información
          </Btn>

          <Btn id="1" className="button--primary" variant="primary">
            ¡Inscríbete Ahora!
          </Btn>
        </div>

        {/* Responsive */}
        <button className="header__menu-toggle" id="menu-toggle">
          <i className="ph ph-list"></i>
        </button>

        <div className="header__mobile-menu" id="mobile-menu">
          <ul className="header__mobile-menu-list">
            <li>
              <a href="#" className="header__mobile-menu-list-link">
                Sobre el Programa
              </a>
            </li>
            <li>
              <a href="#" className="header__mobile-menu-list-link">
                Proceso de Inscripción
              </a>
            </li>
            <li>
              <a href="#" className="header__mobile-menu-list-link">
                Centro de Ayuda
              </a>
            </li>
          </ul>
          <ul className="header__mobile-menu-cta">
            <li>
              <a href="#" className="header__mobile-menu-cta-link">
                Escríbenos por WhatsApp
              </a>
            </li>
            <li>
              <a href="#" className="header__mobile-menu-cta-link">
                Recibe más Información
              </a>
            </li>
            <li>
              <a href="#" className="header__mobile-menu-cta-link">
                Inscríbete Ahora!
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </header>
  )
}

export default Index
