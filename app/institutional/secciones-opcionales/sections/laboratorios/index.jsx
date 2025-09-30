'use client'
import React, { useEffect } from 'react'
import './styles.scss'
import Title from '@library/components/contain/title'
import Paragraph from '@library/components/contain/paragraph'
import Container from '@library/components/container'

const Laboratorios = () => {
  useEffect(() => {
    import('./script.js')
  }, [])
  // Datos estáticos para el render inicial - compatibles con Liferay
  const initialSlide = {
    title: 'Laboratorio de Investigación Biomédica',
    description:
      'Nuestro laboratorio de investigación biomédica cuenta con equipos de última generación para el análisis molecular y celular. Desarrollamos investigaciones en genética, biología molecular y medicina regenerativa.'
  }

  const initialImages = {
    firstImage: {
      imageSrc: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/project-uno',
      label: 'Lab. Biomédica'
    },
    secondImage: {
      imageSrc: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/project-dos',
      label: 'Lab. Materiales'
    }
  }

  // Funciones de navegación optimizadas para Liferay
  const handlePrevSlide = () => {
    try {
      if (window.LabSliderInstance && typeof window.LabSliderInstance.previousSlide === 'function') {
        window.LabSliderInstance.previousSlide()
      }
    } catch (error) {
      console.error('Error en navegación anterior:', error)
    }
  }

  const handleNextSlide = () => {
    try {
      if (window.LabSliderInstance && typeof window.LabSliderInstance.nextSlide === 'function') {
        window.LabSliderInstance.nextSlide()
      }
    } catch (error) {
      console.error('Error en navegación siguiente:', error)
    }
  }

  return (
    <Container className='lab-slider-container'>
      <div className='lab-slider'>
        <Title className='lab-slider-title' id='laboratorios-main-title'>
          Laboratorios
        </Title>

        <div className='lab-slider-content'>
          <div className='lab-slider-text'>
            <Title className='subtitle-lab' id='laboratorios-slide-title' data-testid='slide-title'>
              {initialSlide.title}
            </Title>
            <Paragraph className='paragraph-lab' id='laboratorios-slide-description' data-testid='slide-description'>
              {initialSlide.description}
            </Paragraph>

            <div className='lab-slider-navigation'>
              <button
                onClick={handlePrevSlide}
                aria-label='Imagen anterior'
                className='nav-button prev'
                type='button'
                data-action='prev'
                data-testid='prev-button'>
                <span>
                  <i className='ph ph-arrow-circle-left'></i>
                </span>
              </button>
              <button
                onClick={handleNextSlide}
                aria-label="Siguiente imagen"
                className="nav-button next"
                type="button"
                data-action="next"
                data-testid="next-button"
              >
                <span><i className="ph ph-arrow-circle-right"></i></span>
              </button>
            </div>
          </div>

          <div className="lab-slider-images">
            <div className="image-container">
              <img
                src={initialImages.firstImage.imageSrc}
                alt={initialImages.firstImage.label}
                className="lab-image"
                data-testid="first-image"
              />
              <div className="image-label" data-testid="first-label">
                {initialImages.firstImage.label}
              </div>
            </div>

            <div className="image-container desktop-only">
              <img
                src={initialImages.secondImage.imageSrc}
                alt={initialImages.secondImage.label}
                className="lab-image"
                data-testid="second-image"
              />
              <div className="image-label" data-testid="second-label">
                {initialImages.secondImage.label}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Laboratorios
