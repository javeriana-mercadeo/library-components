<<<<<<< HEAD
import React from 'react'
import './styles.scss'
import Title from '@library/components/contain/title'
import Paragraph from '@library/components/contain/paragraph'
import Container from '@library/components/container'
import './script.js'
=======
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
>>>>>>> 2d8d35b1ac780cae4c25b45686a49a08060ebc9f

const Laboratorios = () => {
  // Datos estáticos para el render inicial - compatibles con Liferay
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

  // Funciones de navegación optimizadas para Liferay
  const handlePrevSlide = () => {
    try {
      if (typeof window !== 'undefined') {
        // Orden de prioridad para compatibilidad Liferay
        if (window.labSliderDebug && typeof window.labSliderDebug.prev === 'function') {
          window.labSliderDebug.prev()
        } else if (window.labSliderInstance && typeof window.labSliderInstance.prevSlide === 'function') {
          window.labSliderInstance.prevSlide()
        } else if (window.LabSlider && typeof window.LabSlider.prev === 'function') {
          window.LabSlider.prev()
        } else {
          console.warn('Lab Slider no está disponible, reintentando...')
          setTimeout(() => {
            if (window.labSliderDebug && typeof window.labSliderDebug.prev === 'function') {
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
        // Orden de prioridad para compatibilidad Liferay
        if (window.labSliderDebug && typeof window.labSliderDebug.next === 'function') {
          window.labSliderDebug.next()
        } else if (window.labSliderInstance && typeof window.labSliderInstance.nextSlide === 'function') {
          window.labSliderInstance.nextSlide()
        } else if (window.LabSlider && typeof window.LabSlider.next === 'function') {
          window.LabSlider.next()
        } else {
          console.warn('Lab Slider no está disponible, reintentando...')
          setTimeout(() => {
            if (window.labSliderDebug && typeof window.labSliderDebug.next === 'function') {
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
<<<<<<< HEAD
    <Container className="lab-slider-container">
      <div className="lab-slider">
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
              data-testid="slide-title"
            > 
              {initialSlide.title}
            </Title>
            <Paragraph 
              className='paragraph-lab'
              id="laboratorios-slide-description"
              data-testid="slide-description"
            >
              {initialSlide.description}
            </Paragraph>

            <div className="lab-slider-navigation">
              <button
                onClick={handlePrevSlide}
                aria-label="Imagen anterior"
                className="nav-button prev"
                type="button"
                data-action="prev"
                data-testid="prev-button"
               >
                <span><i className="ph ph-arrow-circle-left"></i></span>
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
=======
    <Container className='lab-slider-container'>
      <div>
        <Title className='lab-slider-title'>
          {' '}
          <h1>Laboratorios</h1>
        </Title>

        <div className='lab-slider-content'>
          <div className='lab-slider-text' style={{}}>
            <h3>Lorem ipsum dolor sit amet consectetur.</h3>
            <Paragraph>
              {' '}
              <p>
                Lorem ipsum dolor sit amet consectetur. Eget mi quam sit turpis. Arcu pulvinar sit ut nibh ultricies risus enim. Est tellus
                pretium consequat erat. Fermentum integer augue lectus semper imperdiet justo commodo pharetra a. Odio aliquam metus vitae
                amet velit convallis.
              </p>
            </Paragraph>

            <div style={navContainerStyle} className='lab-slider-navigation'>
              <button
                style={buttonStyle}
                onClick={prevSlide}
                aria-label='Previous image'
                className='nav-button prev'
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
                aria-label='Next image'
                className='nav-button next'
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
>>>>>>> 2d8d35b1ac780cae4c25b45686a49a08060ebc9f
              </button>
            </div>
          </div>

<<<<<<< HEAD
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
=======
          <div className='lab-slider-images'>
            <div className='image-container'>
              <img src={firstImage.imageSrc} alt='Laboratory' className='lab-image' />
              <div className='image-label'>{firstImage.label}</div>
            </div>

            {/* Second image only shows on desktop */}
            <div className='image-container desktop-only'>
              <img src={secondImage.imageSrc} alt='Laboratory' className='lab-image' />
              <div className='image-label'>{secondImage.label}</div>
>>>>>>> 2d8d35b1ac780cae4c25b45686a49a08060ebc9f
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Laboratorios