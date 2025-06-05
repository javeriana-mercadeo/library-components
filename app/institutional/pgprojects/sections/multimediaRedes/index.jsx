'use client'

import { useEffect } from 'react'
import Container from '@library/components/container/Container'
import Post from './components/post'

import script from './script.js'
import './styles.scss'

const Multimedia = () => {
  useEffect(() => {
    script()
  }, [])

  return (
    <Container className="section-dos">
      <div id="section-two" >
        <div className="container subjects-carousel">
          <h2 className="text-align-movil subjects-carousel__title">Multimedia</h2>
          <p className="text-align-movil"></p>

          <div className="container swiper">
            <div className="card-wrapper subjects-swiper">
              {/* Card slides container */}
              <div className="card-list swiper-wrapper" role="list">
                <div className="card-item swiper-slide" role="listitem">
                  <div className="card-link">
                    <Post />
                  </div>
                </div>

                <div className="card-item swiper-slide" role="listitem">
                  <div className="card-link">
                    <Post />
                  </div>
                </div>

                <div className="card-item swiper-slide" role="listitem">
                  <div className="card-link">
                    <Post />
                  </div>
                </div>

                <div className="card-item swiper-slide" role="listitem">
                  <div className="card-link">
                    <Post />
                  </div>
                </div>
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
