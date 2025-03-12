import logo from './assets/logo.svg'
import './styles.scss'

const Index = () => {
  return (
    <header className="container header">
      <div className="header__logo">
        <img src={logo.src} alt="Logo" className="header__logo-image" />
      </div>
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li>
            <a href="#" className="header__nav-link">
              Sobre el Programa
            </a>
          </li>
          <li>
            <a href="#" className="header__nav-link">
              Proceso de Inscripción
            </a>
          </li>
          <li>
            <a href="#" className="header__nav-link">
              Centro de Ayuda
            </a>
          </li>
        </ul>
      </nav>
      <div className="header__cta">
        <button className="button--secondary">Recibe más Información</button>
        <button className="button--primary">¡Inscríbete Ahora!</button>
      </div>
      <button className="header__menu-toggle" id="menu-toggle">
        &#9776;
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
    </header>
  )
}

export default Index
