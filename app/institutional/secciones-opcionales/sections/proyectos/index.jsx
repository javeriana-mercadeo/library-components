'use client'
<<<<<<< HEAD
import React from 'react'
=======
import { UniversalComponent as UC, Container } from '@library/components'

import React, { Component } from 'react'
>>>>>>> 2d8d35b1ac780cae4c25b45686a49a08060ebc9f
import DetalleProyecto from './components/detalleProyecto'

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
      image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj2',
      title: 'Investigación de Clase Mundial',
      description: 'Conoce nuestros proyectos de investigación y logros académicos',
      slideData: { id: 2, type: 'investigacion' }
    },
        {
      image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj2',
      title: 'Investigación de Clase Mundial',
      description: 'Conoce nuestros proyectos de investigación y logros académicos',
      slideData: { id: 2, type: 'investigacion' }
    },


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

<<<<<<< HEAD
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
=======
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    this.setState({ isMobile: window.innerWidth < 768 })
  }

  nextSlide = () => {
    const { slides, activeIndex } = this.state
    const nextIndex = (activeIndex + 1) % slides.length
    this.setState({
      activeIndex: nextIndex,
      selectedSlideIndex: nextIndex
    })
  }

  prevSlide = () => {
    const { slides, activeIndex } = this.state
    const prevIndex = (activeIndex - 1 + slides.length) % slides.length
    this.setState({
      activeIndex: prevIndex,
      selectedSlideIndex: prevIndex
    })
  }

  setActiveSlide = index => {
    this.setState({ activeIndex: index })
  }

  openModal = index => {
    this.setState({ showModal: true, selectedSlideIndex: index })
  }

  closeModal = () => {
    this.setState({ showModal: false, selectedSlideIndex: null })
  }

  handleTouchStart = e => {
    this.setState({
      touchStartX: e.targetTouches[0].clientX,
      touchStartY: e.targetTouches[0].clientY
    })
  }

  handleTouchMove = e => {
    this.setState({
      touchEndX: e.targetTouches[0].clientX,
      touchEndY: e.targetTouches[0].clientY
    })
  }

  handleTouchEnd = () => {
    const { touchStartX, touchEndX, touchStartY, touchEndY } = this.state
    const deltaX = touchStartX - touchEndX
    const deltaY = Math.abs(touchStartY - touchEndY)

    if (deltaY < 50 && Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        this.nextSlide()
      } else {
        this.prevSlide()
      }
    }
  }

  handleSwipeInModal = direction => {
    if (direction === 'up') {
      this.nextSlide()
    } else if (direction === 'down') {
      this.prevSlide()
    }
  }

  render() {
    const { activeIndex, slides, isMobile, showModal, selectedSlideIndex } = this.state
    const selectedSlide = selectedSlideIndex !== null ? slides[selectedSlideIndex] : null

    const getPositionClass = index => {
      if (isMobile) {
        return index === activeIndex ? 'active' : ''
      } else {
        if (index === activeIndex) return 'active left'
        if (index === (activeIndex + 1) % slides.length) return 'active center'
        if (index === (activeIndex + 2) % slides.length) return 'active right'
        return ''
      }
    }

    return (
      <section className='hero-carousel'>
        <div>
          <Title className='carousel-title'>
            <h1>Proyectos</h1>
          </Title>
        </div>
        <Container className='main-container'>
          <div>
            <div
              className='carousel-container'
              onTouchStart={this.handleTouchStart}
              onTouchMove={this.handleTouchMove}
              onTouchEnd={this.handleTouchEnd}>
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`carousel-slide ${getPositionClass(index)}`}
                  onClick={() => this.openModal(index)}
                  style={{ cursor: 'pointer' }}>
                  <div className='slide-image' style={{ backgroundImage: `url(${slide.image})` }}>
                    <div className='slide-content'>
                      <h2>{slide.title}</h2>
                      <Paragraph>
                        <p>{slide.description}</p>
                      </Paragraph>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className='carousel-controls'>
              <button className='carousel-control prev' onClick={this.prevSlide}>
                <i className='ph ph-arrow-circle-left'></i>
              </button>
              <button className='carousel-control next' onClick={this.nextSlide}>
                <i className='ph ph-arrow-circle-right'></i>
              </button>
            </div>

            <div className='carousel-indicators'>
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === activeIndex ? 'active' : ''}`}
                  onClick={() => this.setActiveSlide(index)}
                />
              ))}
            </div>
          </div>
        </Container>

        {showModal && selectedSlide && (
          <div className='modal-backdrop'>
            <div className='modal-content'>
              <button className='modal-close' onClick={this.closeModal}>
                ×
              </button>
              <div className='modal-body'>
                <DetalleProyecto
                  proyecto={selectedSlide}
                  slideData={selectedSlide.slideData}
                  title={selectedSlide.title}
                  description={selectedSlide.description}
                  image={selectedSlide.image}
                  onSwipe={this.handleSwipeInModal}
                />
>>>>>>> 2d8d35b1ac780cae4c25b45686a49a08060ebc9f
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