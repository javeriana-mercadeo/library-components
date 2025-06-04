'use client'
import React, { Component } from 'react'
import './script'
import './styles.scss'
import DetalleProyecto from './components/detalleProyecto'
import Title from '../../../../_library/components/contain/title'
import Paragraph from '../../../../_library/components/contain/paragraph'
import Container from '@library/components/container/Container'

class Proyectos extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 0,
      showModal: false,
      selectedSlideIndex: null,
      isMobile: false,
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

  nextSlide = () => {
    const { slides, activeIndex } = this.state
    this.setState({
      activeIndex: (activeIndex + 1) % slides.length
    })
  }

  prevSlide = () => {
    const { slides, activeIndex } = this.state
    this.setState({
      activeIndex: (activeIndex - 1 + slides.length) % slides.length
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

  handleResize = () => {
    this.setState({ isMobile: window.innerWidth < 768 })
  }

  componentDidMount() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  render() {
    const { activeIndex, slides, isMobile, showModal, selectedSlideIndex } = this.state

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
      <section className="hero-carousel">
        <div>
          <Title className="carousel-title">
            <h1>Proyectos</h1>
          </Title>
        </div>
        <Container className="main-container">
          <div>
            <div className="carousel-container">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`carousel-slide ${getPositionClass(index)}`}
                  onClick={() => this.openModal(index)}
                  style={{ cursor: 'pointer' }}>
                  <div className="slide-image" style={{ backgroundImage: `url(${slide.image})` }}>
                    <div className="slide-content">
                      <h2>{slide.title}</h2>
                      <Paragraph><p>{slide.description}</p></Paragraph>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="carousel-controls">
              <button className="carousel-control prev" onClick={this.prevSlide}>
                <i className="ph ph-arrow-circle-left"></i>
              </button>
              <button className="carousel-control next" onClick={this.nextSlide}>
                <i className="ph ph-arrow-circle-right"></i>
              </button>
            </div>

            <div className="carousel-indicators">
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
        {showModal && (
          <div className="modal-backdrop">
            <div className="modal-content">
              <button className="modal-close" onClick={this.closeModal}>
                ×
              </button>
              <div className="modal-body">
                <DetalleProyecto slideData={slides[selectedSlideIndex]?.slideData} />
              </div>
            </div>
          </div>
        )}
      </section>
    )
  }
}

export default Proyectos
