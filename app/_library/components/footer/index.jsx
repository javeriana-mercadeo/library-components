'use client'
import { useEffect } from 'react'
import { Title, Container } from '@library/components'

import LogoBlanco from '@library/components/logo_institucional_blanco'
import script from './script.js'

import './styles.scss'

const Footer = () => {
  useEffect(() => {
    const initScript = script()
    if (typeof initScript === 'function') {
      initScript()
    }
  }, [])

  return (
    <footer id='footer'>
      <div className='color-container-footer'>
        <div className='footer'>
          <Container>
            <div className='footer__container'>
              <div className='footer__left'>
                <LogoBlanco alt='Logo Pontificia Universidad Javeriana' className='footer__logo light' isEditable={false} />
                <p className='footer__title'>
                  Explora nuestro campus <br /> y su tecnología de punta.
                </p>
              </div>
              <div className='footer__middle'>
                <div className='footer__video'>
                  <div className='footer__mp4'>
                    <video
                      src='http://www.javeriana.edu.co/recursosdb/d/info-prg/javeriana_somos-todos-1'
                      className='video-player'
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload='auto'
                      aria-label='Video institucional Universidad Javeriana'>
                      Tu navegador no soporta el elemento video.
                    </video>
                    <a
                      href='https://www.javeriana.edu.co/tour-virtual-javeriana/index.htm'
                      target='_blank'
                      className='video-overlay'
                      rel='noopener noreferrer'
                      aria-label='Ir al tour virtual de la universidad'>
                      <div className='play-button'>
                        <i className='ph ph-play-circle'></i>
                        <span className='play-text'>Ver tour virtual</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div className='footer__right'>
                <div className='footer__contact'>
                  <p className='footer__container_contact'>
                    <span className='footer__contact_title'>Dirección:</span> Cra. 7 #40-62, Chapinero, Bogotá, Colombia.
                  </p>
                  <p className='footer__container_contact'>
                    <span className='footer__contact_title'>Teléfono:</span> +57 (601) 320 8320, opción 3
                  </p>
                  <p className='footer__container_contact'>
                    <span className='footer__contact_title'>Email:</span>
                    <a href='mailto:atencionaspirantes@javeriana.edu.co'>atencionaspirantes@javeriana.edu.co</a>
                  </p>
                </div>
                <div className='footer__social'>
                  <div className='footer__icons'>
                    <p>Síguenos en nuestras redes sociales:</p>
                    <div className='footer__icons-links'>
                      <a href='https://www.facebook.com/unijaveriana' target='_blank' aria-label='Facebook'>
                        <i className='ph ph-facebook-logo'></i>
                      </a>
                      <a href='https://www.instagram.com/unijaveriana' target='_blank' aria-label='Instagram'>
                        <i className='ph ph-instagram-logo'></i>
                      </a>
                      <a
                        href='https://www.linkedin.com/school/pontificia-universidad-javeriana/mycompany/'
                        target='_blank'
                        aria-label='LinkedIn'>
                        <i className='ph ph-linkedin-logo'></i>
                      </a>
                      <a href='https://www.tiktok.com/@unijaveriana' target='_blank' aria-label='TikTok'>
                        <i className='ph ph-tiktok-logo'></i>
                      </a>
                      <a href='#' data-puj-link-whatsapp='true' target='_blank' aria-label='WhatsApp'>
                        <i className='ph ph-whatsapp-logo'></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='footer__divider'></div>

            <div className='footer__bottom'>
              <div className='footer__vigilada'>
                <img
                  src='https://www.javeriana.edu.co/recursosdb/d/info-prg/vigilada'
                  alt='Logo vigilada por el Ministerio de Educación'
                  className='footer__logoV'
                />
                <p className='footer__info'>
                  Sujeta a inspección y vigilancia por parte del Ministerio de Educación Nacional (Artículo 39 del decreto 1295 de 2010).
                </p>
              </div>
              <p>Copyright © 2025 Pontificia Universidad Javeriana</p>
            </div>
          </Container>
        </div>
      </div>
    </footer>
  )
}

export default Footer
