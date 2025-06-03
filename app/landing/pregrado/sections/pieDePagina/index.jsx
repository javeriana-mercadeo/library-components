'use client'

import Container from '@library/components/container'
import LogoBlanco from '@library/components/logo_institucional_blanco'
import UniversidadTour from '../../../../../assets/pieDePagina/universidad-tour.gif'
import Vigilada from '../../../../../assets/pieDePagina/vigilada.png'


import './styles.scss'

const PieDePagina = () => {
  return (
    <footer id="footer">
      <div className="color-container-footer">
        <div className="footer">
          <Container>
            <div className="footer__container">
              <div className="footer__left">
                <LogoBlanco alt="Logo Pontificia Universidad Javeriana" className="footer__logo light" isEditable={false}/>
                <h3 className="footer__title">
                  Explora nuestro campus <br /> y su tecnología de punta.
                </h3>
              </div>
              <div className="footer__middle">
                <div className="footer__video">
                  <div className="footer__mp4">
                    <img src={UniversidadTour.src} alt="Tour virtual universidad" className="video-gif" />
                    <a
                      href="https://www.javeriana.edu.co/tour-virtual-javeriana/index.htm"
                      target="_blank"
                      className="video-overlay"
                      rel="noopener noreferrer"
                      aria-label="Ir al tour virtual de la universidad"></a>
                  </div>
                </div>
              </div>
              <div className="footer__right">
                <div className="footer__contact">
                  <p className="footer__container_contact">
                    <span className="footer__contact_title">Dirección:</span> Cra. 7 #40-62, Chapinero, Bogotá, Colombia.
                  </p>
                  <p className="footer__container_contact">
                    <span className="footer__contact_title">Teléfono:</span> +57 (601) 320 8320
                  </p>
                  <p className="footer__container_contact">
                    <span className="footer__contact_title">Email:</span>
                    <a href="mailto:atencionaspirantes@javeriana.edu.co">atencionaspirantes@javeriana.edu.co</a>
                  </p>
                </div>
                <div className="footer__social">
                  <div className="footer__icons">
                    <p>Síguenos en nuestras redes sociales:</p>
                    <div className="footer__icons-links">
                      <a href="#" aria-label="Facebook">
                        <i className="ph ph-facebook-logo"></i>
                      </a>
                      <a href="#" aria-label="Instagram">
                        <i className="ph ph-instagram-logo"></i>
                      </a>
                      <a href="#" aria-label="LinkedIn">
                        <i className="ph ph-linkedin-logo"></i>
                      </a>
                      <a href="#" aria-label="TikTok">
                        <i className="ph ph-tiktok-logo"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="footer__divider"></div>

            <div className="footer__bottom">
              <div className="footer__vigilada">
                <img src={Vigilada.src} alt="Logo vigilada por el Ministerio de Educación" className="footer__logoV" />
                <p className="footer__info">
                  Sujeta a inspección y vigilancia por parte del Ministerio de Educación Nacional (Artículo 39 del decreto 1295 de 2010).
                </p>
              </div>
              <p>Copyright © 2024 Pontificia Universidad Javeriana</p>
              <div className="footer__links">
                <a href="#">Políticas de Privacidad</a>
                <a href="#">Accesibilidad Digital</a>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </footer>
  )
}

export default PieDePagina
