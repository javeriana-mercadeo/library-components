'use client'

import { useEffect } from 'react'
import Paragraph from '@library/components/contain/paragraph'
import Container from '@/app/_library/components/container/Container.jsx'

import script from './script.js'
import './styles.scss'

const ExperienciaJaveriana = () => {
  useEffect(() => {
    script()
  }, [])

  return (
    <Container>
    <section id="section-seven">
      <div className="container experience-carousel">
        <h2 className="experience-carousel__title">Vive la Experiencia Javeriana</h2>
        <p className="experience-carousel__description">
          Descubre historias inspiradoras, momentos únicos y experiencias de nuestros estudiantes a través de sus palabras,
          imágenes y videos.
        </p>
        <div className="container swiper">
          <div className="card-wrapper experience-swiper">
            <ul className="card-list-7 swiper-wrapper">
              <li className="card-item-7 swiper-slide">
                <a href="#" className="card-link-7">
                  <div className="image-card-7">
                    <img 
                      src="./assets/images/students-group.png" 
                      alt="Estudiantes Javeriana" 
                      className="experience-carousel__image" 
                    />
                  </div>
                </a>
              </li>
              <li className="card-item-7 swiper-slide">
                <a href="#" className="card-link-7">
                  <div className="testimonial-card">
                    <p className="testimonial-text">
                      Mi paso por la Javeriana fue clave para llegar a donde estoy. Ahora trabajo en diseño urbano, creando ciudades más inclusivas.
                    </p>
                    <div className="testimonial-user">
                      <div className="testimonial-avatar">
                        <img src="./assets/images/carlos-gomez.png" alt="Carlos Gómez" />
                      </div>
                      <div className="testimonial-info">
                        <h4 className="testimonial-name">Carlos Gómez</h4>
                        <p className="testimonial-job">Urbanista en CityScape</p>
                      </div>
                      <a href="#" className="testimonial-linkedin">
                        <img src="./assets/images/linkedin.svg" alt="LinkedIn" />
                      </a>
                    </div>
                  </div>
                </a>
              </li>
              <li className="card-item-7 swiper-slide">
                <a href="#" className="card-link-video">
                  <div className="video-card-7">
                    <video
                      src="./assets/images/video-section-8.mp4"
                      className="experience-carousel__video"
                      autoPlay
                      muted
                      playsInline
                    >
                    </video>
                  </div>
                </a>
              </li>
              <li className="card-item-7 swiper-slide">
                <a href="#" className="card-link-7">
                  <div className="testimonial-card">
                    <p className="testimonial-text">
                      Mi paso por la Javeriana fue clave para llegar a donde estoy. Ahora trabajo en diseño urbano, creando ciudades más inclusivas.
                    </p>
                    <div className="testimonial-user">
                      <div className="testimonial-avatar">
                        <img src="./assets/images/carlos-gomez.png" alt="Carlos Gómez" />
                      </div>
                      <div className="testimonial-info">
                        <h4 className="testimonial-name">Carlos Gómez</h4>
                        <p className="testimonial-job">Urbanista en CityScape</p>
                      </div>
                      <a href="#" className="testimonial-linkedin">
                        <img src="./assets/images/linkedin.svg" alt="LinkedIn" />
                      </a>
                    </div>
                  </div>
                </a>
              </li>
              <li className="card-item-7 swiper-slide">
                <a href="#" className="card-link-video">
                  <div className="video-card-7">
                    <video
                      src="./assets/images/video-section-8.mp4"
                      className="experience-carousel__video"
                      autoPlay
                      muted
                      playsInline
                    >
                    </video>
                  </div>
                </a>
              </li>
            </ul>
            {/* Botones de navegación */}
            <div className="swiper-slide-button experience-prev">
              <i className="ph ph-arrow-circle-left"></i>
            </div>
            <div className="swiper-slide-button experience-next">
              <i className="ph ph-arrow-circle-right"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Container>
  )
}

export default ExperienciaJaveriana
