'use client'
import React from 'react'
import DetalleProyecto from './components/detalleProyecto'
import Title from '@library/components/contain/title'
import Paragraph from '@library/components/contain/paragraph'
import Container from '@library/components/container'

import script from './script.js'
import './styles.scss'

// Inicializar el script una sola vez
const carouselManager = script()

const Proyectos = () => {
  const slides = [
    {
      image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj1',
      title: 'Universidad Destacada',
      description: 'Descubre nuestros programas académicos y la experiencia universitaria',
      slideData: { id: 1, type: 'universidad' }
    },
    {
      image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj2',
      title: 'Investigación de Clase Mundial',
      description: 'Conoce nuestros proyectos de investigación y logros académicos',
      slideData: { id: 2, type: 'investigacion' }
    },
    {
      image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj3',
      title: 'Campus Innovador',
      description: 'Explora nuestras instalaciones modernas y entorno de aprendizaje',
      slideData: { id: 3, type: 'campus' }
    },
    {
      image: 'https://marionoriegaasociados.com/wp-content/uploads/2021/02/pweb_pm_javeriana-proyectos_01.png',
      title: 'Oportunidades Internacionales',
      description: 'Descubre programas de intercambio y colaboraciones globales',
      slideData: { id: 4, type: 'internacional' }
    },
    {
      image: 'https://revistaaxxis.com.co/wp-content/uploads/2024/05/Edifiico_Sapiencia_3-1024x683.png',
      title: 'Universidad Destacada',
      description: 'Descubre nuestros programas académicos y la experiencia universitaria',
      slideData: { id: 5, type: 'universidad' }
    },
    {
      image: 'https://www.javeriana.edu.co/sostenibilidad/wp-content/uploads/2021/07/Campus-Sustentable_0009_Javeriana-Sostenible.jpg',
      title: 'Investigación de Clase Mundial',
      description: 'Conoce nuestros proyectos de investigación y logros académicos',
      slideData: { id: 6, type: 'investigacion' }
    },
    {
      image: 'https://www.javeriana.edu.co/recursosdb/664630/725325/compromisosocial2.png/2b84da22-005b-de8f-208a-7b90a466cba1?t=1603222055696',
      title: 'Universidad Destacada',
      description: 'Descubre nuestros programas académicos y la experiencia universitaria',
      slideData: { id: 7, type: 'universidad' }
    },
    {
      image: 'https://i.ytimg.com/vi/mGd4pvXwQOo/maxresdefault.jpg',
      title: 'Campus Innovador',
      description: 'Explora nuestras instalaciones modernas y entorno de aprendizaje',
      slideData: { id: 8, type: 'campus' }
    }
  ]

  // Obtener el slide seleccionado para el modal
  const selectedSlide = carouselManager.selectedSlideIndex !== null ? slides[carouselManager.selectedSlideIndex] : null

  return (
    <section className="hero-carousel" id="carousel-section">
      <div>
        <Title className="carousel-title">Proyectos</Title>
      </div>
      <Container className="main-container">
        <div>
          {/* ESTRUCTURA PARA SWIPER.JS */}
          <div 
            className="carousel-container swiper"
            id="carousel-container"
          >
            <div className="swiper-wrapper">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className="carousel-slide swiper-slide"
                  data-slide-index={index}
                >
                  <div className="slide-image" style={{ backgroundImage: `url(${slide.image})` }}>
                    <div className="slide-content">
                      <h2>{slide.title}</h2>
                      <Paragraph className='description'>
                        {slide.description}
                      </Paragraph>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CONTROLES DE NAVEGACIÓN */}
          <div className="carousel-controls">
            <button className="carousel-control prev" id="carousel-prev">
              <i className="ph ph-arrow-circle-left"></i>
            </button>
            <button className="carousel-control next" id="carousel-next">
              <i className="ph ph-arrow-circle-right"></i>
            </button>
          </div>

          {/* INDICADORES */}
          <div className="carousel-indicators" id="carousel-indicators">
            {slides.map((_, index) => (
              <button
                key={index}
                className="indicator"
                data-indicator-index={index}
              />
            ))}
          </div>
        </div>
      </Container>

      {/* MODAL */}
      <div className="modal-backdrop" id="modal-backdrop" style={{ display: carouselManager.showModal ? 'flex' : 'none' }}>
        <div className="modal-content">
          <button className="modal-close" onClick={carouselManager.closeModal}>
            ×
          </button>
          <div className="modal-body">
            {selectedSlide && (
              <DetalleProyecto
                proyecto={selectedSlide}
                slideData={selectedSlide.slideData}
                title={selectedSlide.title}
                description={selectedSlide.description}
                image={selectedSlide.image}
                onSwipe={carouselManager.handleSwipeInModal}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Proyectos