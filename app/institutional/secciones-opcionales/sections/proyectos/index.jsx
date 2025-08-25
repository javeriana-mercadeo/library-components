import React from 'react'
import DetalleProyecto from './components/detalleProyecto'
import Title from '@library/components/contain/title'
import Paragraph from '@library/components/contain/paragraph'
import Container from '@library/components/container'

import script from './script.js'
import './styles.scss'

class Proyectos extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      isInitialized: false,
      isModalOpen: false,
      selectedSlideIndex: null
    }
    
    this.slides = [
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
    
    this.carouselManager = script()
  }

  componentDidMount() {
    console.log('🚀 Componente Proyectos montado - Sin hooks')
    
    // Listener para eventos del modal desde JavaScript
    this.modalOpenListener = (event) => {
      console.log('📤 Modal abierto desde script:', event.detail.slideIndex)
      this.setState({
        isModalOpen: true,
        selectedSlideIndex: event.detail.slideIndex
      })
    }

    this.modalCloseListener = () => {
      console.log('📥 Modal cerrado desde script')
      this.setState({
        isModalOpen: false,
        selectedSlideIndex: null
      })
    }

    document.addEventListener('carouselModalOpen', this.modalOpenListener)
    document.addEventListener('carouselModalClose', this.modalCloseListener)
    
    setTimeout(() => {
      const event = new CustomEvent('reactComponentMounted', {
        detail: { 
          component: 'Proyectos', 
          slidesCount: this.slides.length,
          timestamp: Date.now()
        }
      })
      document.dispatchEvent(event)
      
      this.setState({ isInitialized: true })
      console.log('✅ Componente notificado y listo para interacción')
    }, 200)
  }

  componentWillUnmount() {
    console.log('🧹 Limpiando componente Proyectos')
    
    document.removeEventListener('carouselModalOpen', this.modalOpenListener)
    document.removeEventListener('carouselModalClose', this.modalCloseListener)
    
    if (this.carouselManager && this.carouselManager.cleanup) {
      this.carouselManager.cleanup()
    }
  }

  getSelectedSlide() {
    if (this.state.selectedSlideIndex !== null) {
      return this.slides[this.state.selectedSlideIndex]
    }
    return null
  }

  handleCloseModal = () => {
    console.log('🔴 Cerrando modal desde componente')
    this.setState({
      isModalOpen: false,
      selectedSlideIndex: null
    })
    if (this.carouselManager && this.carouselManager.closeModal) {
      this.carouselManager.closeModal()
    }
  }

  renderSlide(slide, index) {
    return (
      <div
        key={`slide-${index}-${slide.slideData.id}`}
        className="carousel-slide swiper-slide"
        data-slide-index={index}
        id={`slide-${index}`}
        data-slide-type={slide.slideData.type}
      >
        <div 
          className="slide-image" 
          style={{ backgroundImage: `url(${slide.image})` }}
          data-slide-title={slide.title}
        >
          <div className="slide-content">
            <h2 
              id={`slide-title-${index}`}
              className="slide-title"
            >
              {slide.title}
            </h2>
            <Paragraph 
              className="description"
              id={`slide-desc-${index}`}
            >
              {slide.description}
            </Paragraph>
          </div>
        </div>
      </div>
    )
  }

  renderIndicator(slide, index) {
    return (
      <button
        key={`indicator-${index}-${slide.slideData.id}`}
        className="indicator"
        id={`indicator-${index}`}
        data-indicator-index={index}
        data-slide-type={slide.slideData.type}
        type="button"
        aria-label={`Ir a slide ${index + 1}: ${slide.title}`}
      />
    )
  }

  render() {
    const selectedSlide = this.getSelectedSlide()
    
    return (
      <section className="hero-carousel" id="carousel-section">
        <div>
          <Title 
            className="carousel-title"
            id="proyectos-title"
          >
            Proyectos
          </Title>
        </div>
        
        <Container className="main-container" id="proyectos-container">
          <div>
            <div 
              className="carousel-container swiper"
              id="carousel-container"
              data-slides-count={this.slides.length}
              data-max-cards="4"
            >
              <div className="swiper-wrapper" id="slides-wrapper">
                {this.slides.map((slide, index) => this.renderSlide(slide, index))}
              </div>
            </div>

            <div className="carousel-controls" id="carousel-controls">
              <button 
                className="carousel-control prev" 
                id="carousel-prev"
                type="button"
                aria-label="Slide anterior"
                data-control="previous"
              >
                <i className="ph ph-arrow-circle-left" aria-hidden="true"></i>
              </button>
              <button 
                className="carousel-control next" 
                id="carousel-next"
                type="button"
                aria-label="Slide siguiente"
                data-control="next"
              >
                <i className="ph ph-arrow-circle-right" aria-hidden="true"></i>
              </button>
            </div>

            <div className="carousel-indicators" id="carousel-indicators">
              {this.slides.map((slide, index) => this.renderIndicator(slide, index))}
            </div>
          </div>
        </Container>

        {/* Modal con estado sincronizado */}
        <div 
          className="modal-backdrop" 
          id="modal-backdrop" 
          style={{ display: this.state.isModalOpen ? 'flex' : 'none' }}
          role="dialog"
          aria-modal="true"
          aria-hidden={this.state.isModalOpen ? 'false' : 'true'}
          data-modal="backdrop"
        >
          <div className="modal-content" id="modal-content">
            <button 
              className="modal-close" 
              id="modal-close-btn"
              type="button"
              aria-label="Cerrar modal"
              onClick={this.handleCloseModal}
            >
              ×
            </button>
            <div className="modal-body" id="modal-body">
              {selectedSlide && (
                <DetalleProyecto
                  key={`modal-${this.state.selectedSlideIndex}`}
                  proyecto={selectedSlide}
                  slideData={selectedSlide.slideData}
                  title={selectedSlide.title}
                  description={selectedSlide.description}
                  image={selectedSlide.image}
                  onSwipe={this.carouselManager.handleSwipeInModal}
                />
              )}
            </div>
          </div>
        </div>

        {this.state.isInitialized && (
          <div 
            style={{ display: 'none' }} 
            data-component-status="initialized"
            data-slides-count={this.slides.length}
          />
        )}
      </section>
    )
  }
}

export default Proyectos