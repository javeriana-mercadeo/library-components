'use client'

import { useEffect } from 'react'
import Container from '@library/components/container'

import SocialEmbed from './components/SocialEmbed'

import swiperScript from './script.js'
import socialScript from './components/socialScript.js'
import './styles.scss'

const Multimedia = () => {
  // Array de URLs de redes sociales - aquí puedes agregar las URLs que necesites
  const socialUrls = [
    'https://www.instagram.com/reel/DKUvIluyJEJ/?utm_source=ig_embed&utm_campaign=loading',
    'https://www.tiktok.com/@elpal4/video/7192001549596413189?is_from_webapp=1&sender_device=pc&web_id=7514531579344668166',
    'https://www.instagram.com/reel/DKPc0JPu_4P/?utm_source=ig_web_copy_link&igsh=bmJuaTJkd3R4NWk4',
    'https://www.tiktok.com/@unijaveriana/video/7484274989944884535?is_from_webapp=1&sender_device=pc&web_id=7514531579344668166'
  ]

  useEffect(() => {
    // Inicializar Swiper
    swiperScript()

    // Inicializar Social Embeds
    socialScript()
  }, [])

  return (
    <Container className="section-dos">
      <div id="section-two">
        <div className="container subjects-carousel">
          <h2 className="text-align-movil subjects-carousel__title">Multimedia</h2>
          <p className="text-align-movil"></p>

          <div className="container swiper">
            <div className="card-wrapper subjects-swiper">
              {/* Card slides container */}
              <div className="card-list swiper-wrapper" role="list">
                {socialUrls.map((url, index) => (
                  <div key={index} className="card-item swiper-slide" role="listitem">
                    <div className="card-link">
                      <SocialEmbed url={url} type="auto" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Paginación */}
              <div className="swiper-pagination subjects-pagination" role="tablist" aria-label="Control de páginas del carrusel"></div>

              {/* Botones de navegación */}
              <button className="swiper-slide-button subjects-prev" aria-label="Ir al slide anterior" type="button">
                <i className="ph ph-arrow-circle-left" aria-hidden="true"></i>
              </button>
              <button className="swiper-slide-button subjects-next" aria-label="Ir al siguiente slide" type="button">
                <i className="ph ph-arrow-circle-right" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Multimedia
