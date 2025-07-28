'use client'
import { UniversalComponent as UC, Container } from '@library/components'

import React, { useEffect, useState } from 'react'
import './styles.scss'

import {
  buttonColor,
  labImages,
  darkenColor,
  getNextSlide,
  getPrevSlide,
  getCurrentImages,
  getButtonStyle,
  navContainerStyle
} from './script.js'

const Laboratorios = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Verificar si estamos en el navegador antes de acceder a window
  useEffect(() => {
    // Solo se ejecuta en el cliente
    setIsMobile(window.innerWidth <= 768)

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const nextSlide = () => {
    setCurrentSlide(prev => getNextSlide(prev, labImages.length))
  }

  const prevSlide = () => {
    setCurrentSlide(prev => getPrevSlide(prev, labImages.length))
  }

  const { firstImage, secondImage } = getCurrentImages(currentSlide, labImages)
  const buttonStyle = getButtonStyle(buttonColor)

  return (
    <Container className="lab-slider-container">
      <div>
        <Title className="lab-slider-title">
          {' '}
          <h1>Laboratorios</h1>
        </Title>

        <div className="lab-slider-content">
          <div className="lab-slider-text" style={{}}>
            <h3>Lorem ipsum dolor sit amet consectetur.</h3>
            <Paragraph>
              {' '}
              <p>
                Lorem ipsum dolor sit amet consectetur. Eget mi quam sit turpis. Arcu pulvinar sit ut nibh ultricies risus enim. Est tellus
                pretium consequat erat. Fermentum integer augue lectus semper imperdiet justo commodo pharetra a. Odio aliquam metus vitae
                amet velit convallis.
              </p>
            </Paragraph>

            <div style={navContainerStyle} className="lab-slider-navigation">
              <button
                style={buttonStyle}
                onClick={prevSlide}
                aria-label="Previous image"
                className="nav-button prev"
                onMouseOver={e => {
                  e.currentTarget.style.backgroundColor = darkenColor(buttonColor, 20)
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 6px 10px rgba(0, 0, 0, 0.15)'
                }}
                onMouseOut={e => {
                  e.currentTarget.style.backgroundColor = buttonColor
                  e.currentTarget.style.transform = 'none'
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}>
                <span>&#8592;</span>
              </button>
              <button
                style={buttonStyle}
                onClick={nextSlide}
                aria-label="Next image"
                className="nav-button next"
                onMouseOver={e => {
                  e.currentTarget.style.backgroundColor = darkenColor(buttonColor, 20)
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 6px 10px rgba(0, 0, 0, 0.15)'
                }}
                onMouseOut={e => {
                  e.currentTarget.style.backgroundColor = buttonColor
                  e.currentTarget.style.transform = 'none'
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}>
                <span>&#8594;</span>
              </button>
            </div>
          </div>

          <div className="lab-slider-images">
            <div className="image-container">
              <img src={firstImage.imageSrc} alt="Laboratory" className="lab-image" />
              <div className="image-label">{firstImage.label}</div>
            </div>

            {/* Second image only shows on desktop */}
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
