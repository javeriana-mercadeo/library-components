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
      image: 'https://www.lapizdeacero.org/wp-content/uploads/2023/08/Interior-image_01.jpg',
      title: 'Comunidad Estudiantil',
      description: 'Forma parte de nuestra comunidad diversa y vibrante',
      slideData: { id: 4, type: 'comunidad' }
    },
    {
      image: 'https://marionoriegaasociados.com/wp-content/uploads/2021/02/pweb_pm_javeriana-proyectos_01.png',
      title: 'Oportunidades Internacionales',
      description: 'Descubre programas de intercambio y colaboraciones globales',
      slideData: { id: 5, type: 'internacional' }
    }
  ]

  const getPositionClass = (index, activeIndex, isMobile) => {
    if (isMobile) {
      return index === activeIndex ? 'active' : ''
    } else {
      if (index === activeIndex) return 'active left'
      if (index === (activeIndex + 1) % slides.length) return 'active center'
      if (index === (activeIndex + 2) % slides.length) return 'active right'
      return ''
    }
  }

  // Obtener el slide seleccionado para el modal
  const selectedSlide = carouselManager.selectedSlideIndex !== null ? slides[carouselManager.selectedSlideIndex] : null

  return (
    <section className="hero-carousel" id="carousel-section">
      <div>
        <Title className="carousel-title">Proyectos</Title>
      </div>
      <Container className="main-container">
        <div>
          <div 
            className="carousel-container"
            id="carousel-container"
            onTouchStart={carouselManager.handleTouchStart}
            onTouchMove={carouselManager.handleTouchMove}
            onTouchEnd={carouselManager.handleTouchEnd}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`carousel-slide ${getPositionClass(index, carouselManager.activeIndex, carouselManager.isMobile)}`}
                onClick={() => carouselManager.openModal(index)}
                style={{ cursor: 'pointer' }}
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

          <div className="carousel-controls">
            <button className="carousel-control prev" onClick={carouselManager.prevSlide}>
              <i className="ph ph-arrow-circle-left"></i>
            </button>
            <button className="carousel-control next" onClick={carouselManager.nextSlide}>
              <i className="ph ph-arrow-circle-right"></i>
            </button>
          </div>

          <div className="carousel-indicators" id="carousel-indicators">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === carouselManager.activeIndex ? 'active' : ''}`}
                onClick={() => carouselManager.setActiveSlide(index)}
                data-indicator-index={index}
              />
            ))}
          </div>
        </div>
      </Container>

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