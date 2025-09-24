'use client'
import { UniversalComponent as UC, Container } from '@library/components'

import React, { Component } from 'react'
import DetalleProyecto from './components/detalleProyecto'

import script from './script.js'
import './styles.scss'

class Proyectos extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 0,
      showModal: false,
      selectedSlideIndex: null,
      isMobile: false,
      touchStartX: 0,
      touchEndX: 0,
      touchStartY: 0,
      touchEndY: 0,
      slides: [
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
    }
  }

  componentDidMount() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
    script()
  }

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
<<<<<<< HEAD
      <section className="hero-carousel">
        <div>
          <Title className="carousel-title">
            <h1>Proyectos</h1>
          </Title>
        </div>
        <Container className="main-container">
          <div>
            <div
              className="carousel-container"
=======
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
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
              onTouchStart={this.handleTouchStart}
              onTouchMove={this.handleTouchMove}
              onTouchEnd={this.handleTouchEnd}>
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`carousel-slide ${getPositionClass(index)}`}
                  onClick={() => this.openModal(index)}
                  style={{ cursor: 'pointer' }}>
<<<<<<< HEAD
                  <div className="slide-image" style={{ backgroundImage: `url(${slide.image})` }}>
                    <div className="slide-content">
=======
                  <div className='slide-image' style={{ backgroundImage: `url(${slide.image})` }}>
                    <div className='slide-content'>
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
                      <h2>{slide.title}</h2>
                      <Paragraph>
                        <p>{slide.description}</p>
                      </Paragraph>
                    </div>
                  </div>
                </div>
              ))}
            </div>

<<<<<<< HEAD
            <div className="carousel-controls">
              <button className="carousel-control prev" onClick={this.prevSlide}>
                <i className="ph ph-arrow-circle-left"></i>
              </button>
              <button className="carousel-control next" onClick={this.nextSlide}>
                <i className="ph ph-arrow-circle-right"></i>
              </button>
            </div>

            <div className="carousel-indicators">
=======
            <div className='carousel-controls'>
              <button className='carousel-control prev' onClick={this.prevSlide}>
                <i className='ph ph-arrow-circle-left'></i>
              </button>
              <button className='carousel-control next' onClick={this.nextSlide}>
                <i className='ph ph-arrow-circle-right'></i>
              </button>
            </div>

            <div className='carousel-indicators'>
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
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
<<<<<<< HEAD
          <div className="modal-backdrop">
            <div className="modal-content">
              <button className="modal-close" onClick={this.closeModal}>
                ×
              </button>
              <div className="modal-body">
=======
          <div className='modal-backdrop'>
            <div className='modal-content'>
              <button className='modal-close' onClick={this.closeModal}>
                ×
              </button>
              <div className='modal-body'>
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
                <DetalleProyecto
                  proyecto={selectedSlide}
                  slideData={selectedSlide.slideData}
                  title={selectedSlide.title}
                  description={selectedSlide.description}
                  image={selectedSlide.image}
                  onSwipe={this.handleSwipeInModal}
                />
              </div>
            </div>
          </div>
        )}
      </section>
    )
  }
}

export default Proyectos
