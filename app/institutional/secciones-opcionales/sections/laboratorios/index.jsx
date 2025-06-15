import React from 'react'
import './styles.scss'
import Title from '@library/components/contain/title'
import Paragraph from '@library/components/contain/paragraph'
import Container from '@library/components/container'
// Importar solo para ejecutar el IIFE, no para obtener exports
import './script.js'

const Laboratorios = () => {
  // Datos estáticos para el render inicial
  // El JavaScript del slider se encargará de actualizar el DOM
  const initialSlide = {
    title: 'Laboratorio de Investigación Biomédica',
    description: 'Nuestro laboratorio de investigación biomédica cuenta con equipos de última generación para el análisis molecular y celular. Desarrollamos investigaciones en genética, biología molecular y medicina regenerativa.'
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

  // Funciones de navegación que usan las variables globales del script
  const handlePrevSlide = () => {
    try {
      // Intentar diferentes formas de acceder al slider
      if (typeof window !== 'undefined') {
        if (window.labSliderDebug) {
          window.labSliderDebug.prev()
        } else if (window.LabSlider) {
          window.LabSlider.prev()
        } else if (window.labSliderInstance) {
          window.labSliderInstance.prevSlide()
        } else {
          console.warn('Lab Slider no está disponible todavía')
          // Intentar inicializar si no está disponible
          setTimeout(() => {
            if (window.labSliderDebug) {
              window.labSliderDebug.prev()
            }
          }, 500)
        }
      }
    } catch (error) {
      console.error('Error en navegación anterior:', error)
    }
  }

  const handleNextSlide = () => {
    try {
      if (typeof window !== 'undefined') {
        if (window.labSliderDebug) {
          window.labSliderDebug.next()
        } else if (window.LabSlider) {
          window.LabSlider.next()
        } else if (window.labSliderInstance) {
          window.labSliderInstance.nextSlide()
        } else {
          console.warn('Lab Slider no está disponible todavía')
          // Intentar inicializar si no está disponible
          setTimeout(() => {
            if (window.labSliderDebug) {
              window.labSliderDebug.next()
            }
          }, 500)
        }
      }
    } catch (error) {
      console.error('Error en navegación siguiente:', error)
    }
  }

  return (
    <Container className="lab-slider-container">
      <div className="lab-slider"> {/* Clase importante para que el JS detecte el slider */}
        <Title 
          className="lab-slider-title"
          id="laboratorios-main-title"
        >
          Laboratorios
        </Title>

        <div className="lab-slider-content">
          <div className="lab-slider-text">
            <Title 
              className='subtitle-lab'
              id="laboratorios-slide-title"
            > 
              {initialSlide.title}
            </Title>
            <Paragraph 
              className='paragraph-lab'
              id="laboratorios-slide-description"
            >
              {initialSlide.description}
            </Paragraph>

            <div className="lab-slider-navigation">
              <button
                onClick={handlePrevSlide}
                aria-label="Previous image"
                className="nav-button prev"
                type="button"
               >
                <span><i className="ph ph-arrow-circle-left"></i></span>
              </button>
              <button
                onClick={handleNextSlide}
                aria-label="Next image"
                className="nav-button next"
                type="button">
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
              />
              <div className="image-label">{initialImages.firstImage.label}</div>
            </div>

            <div className="image-container desktop-only">
              <img 
                src={initialImages.secondImage.imageSrc} 
                alt={initialImages.secondImage.label} 
                className="lab-image" 
              />
              <div className="image-label">{initialImages.secondImage.label}</div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Laboratorios