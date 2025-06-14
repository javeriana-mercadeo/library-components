import React from 'react'
import './styles.scss'
import Title from '@library/components/contain/title'
import Paragraph from '@library/components/contain/paragraph'
import Container from '@library/components/container'
import labSliderLogic from './script.js'

const Laboratorios = () => {
  // Inicializar la lógica del slider
  const slider = labSliderLogic()
  
  // Obtener el slide actual y las imágenes
  const currentSlide = slider.getCurrentSlide()
  const { firstImage, secondImage } = slider.getCurrentImages()

  return (
    <Container className="lab-slider-container">
      <div>
        <Title className="lab-slider-title">Laboratorios</Title>

        <div className="lab-slider-content">
          <div className="lab-slider-text">
           <Title className='subtitle-lab'> {currentSlide.title} </Title>
            <Paragraph className='paragraph-lab'>
              {currentSlide.description}
            </Paragraph>

            <div className="lab-slider-navigation">
              <button
                onClick={() => slider.prevSlide()}
                aria-label="Previous image"
                className="nav-button prev"
                onMouseOver={(e) => slider.handleButtonHover(e, true)}
                onMouseOut={(e) => slider.handleButtonHover(e, false)}>
                <span>&#8592;</span>
              </button>
              <button
                onClick={() => slider.nextSlide()}
                aria-label="Next image"
                className="nav-button next"
                onMouseOver={(e) => slider.handleButtonHover(e, true)}
                onMouseOut={(e) => slider.handleButtonHover(e, false)}>
                <span>&#8594;</span>
              </button>
            </div>
          </div>

          <div className="lab-slider-images">
            <div className="image-container">
              <img src={firstImage.imageSrc} alt="Laboratory" className="lab-image" />
              <div className="image-label">{firstImage.label}</div>
            </div>

            <div className="image-container desktop-only">
              <img src={secondImage.imageSrc} alt="Laboratory" className="lab-image" />
              <div className="image-label">{secondImage.label}</div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Laboratorios