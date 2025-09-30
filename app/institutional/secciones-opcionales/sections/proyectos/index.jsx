'use client'
import React from 'react'
import { Container } from '@library/components'
import Title from '@library/components/contain/title'
import Paragraph from '@library/components/contain/paragraph'

import './script.js'
import './styles.scss'

const Proyectos = () => {
  // El script IIFE se auto-inicializa cuando se carga
  // No necesitamos hacer nada manualmente aquí

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
    }
  ]


  return (
    <section className='hero-carousel' id='carousel-section' data-slides-count={slides.length}>
      <div>
        <Title className='carousel-title'>Proyectos Destacados</Title>
      </div>
      <Container className='main-container'>
        <div>
          <div
            className="carousel-container swiper"
            id="carousel-container"
            data-slides-count={slides.length}>
            <div className="swiper-wrapper" id="slides-wrapper">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className="carousel-slide swiper-slide"
                  data-slide-index={index}
                  data-slide-type={slide.slideData?.type || 'default'}>
                  <div className="slide-image" style={{ backgroundImage: `url(${slide.image})` }}>
                    <div className="slide-content">
                      <h2 className="slide-title">{slide.title}</h2>
                      <Paragraph className="description">{slide.description}</Paragraph>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className='carousel-controls' id='carousel-controls'>
              <button className='carousel-control prev' id='carousel-prev' type='button' aria-label='Slide anterior'>
                <i className='ph ph-arrow-circle-left' aria-hidden='true'></i>
              </button>
              <button className='carousel-control next' id='carousel-next' type='button' aria-label='Slide siguiente'>
                <i className='ph ph-arrow-circle-right' aria-hidden='true'></i>
              </button>
            </div>

            <div className='carousel-indicators' id='carousel-indicators'>
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === 0 ? 'active' : ''}`}
                  data-indicator-index={index}
                  type='button'
                  aria-label={`Ir a slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* El modal es manejado por el script de la IIFE */}
    </section>
  )
}

export default Proyectos

{
  /* <section class="container hero-carousel" id="carousel-section">
    <!-- Título principal -->
    <div>
        <h2 class="title title-lg carousel-title"
            data-lfr-editable-id="carousel-main-title"
            data-lfr-editable-type="rich-text">
            Proyectos Destacados
        </h2>
    </div>

    <!-- Container principal -->
    <div class="container main-container" id="proyectos-container">
        <div>
            <!-- Carousel container -->
            <div class="carousel-container swiper"
                 id="carousel-container"
                 data-slides-count="8"
                 data-max-cards="4">

                <!-- Wrapper de slides -->
                <div class="swiper-wrapper" id="slides-wrapper">

                    <!-- Slide 0 -->
                    <div class="carousel-slide swiper-slide"
                         data-slide-index="0"
                         data-slide-type="universidad"
                         onclick="window.openCarouselModal && window.openCarouselModal(0)">
                        <div class="slide-image"
                             style="background-image: url('https://www.javeriana.edu.co/recursosdb/d/info-prg/proj1')">
                            <div class="slide-content">
                                <lfr-editable id="slide-title-0"
                                            type="rich-text"
                                            class="slide-title">
                                    Universidad Destacada
                                </lfr-editable>
                                <lfr-editable id="slide-desc-0"
                                            type="rich-text"
                                            class="paragraph paragraph-neutral paragraph-md description">
                                    Descubre nuestros programas académicos de alta calidad
                                </lfr-editable>
                            </div>
                        </div>
                    </div>

                    <!-- Slide 1 -->
                    <div class="carousel-slide swiper-slide"
                         data-slide-index="1"
                         data-slide-type="investigacion"
                         onclick="window.openCarouselModal && window.openCarouselModal(1)">
                        <div class="slide-image"
                             style="background-image: url('https://www.javeriana.edu.co/recursosdb/d/info-prg/proj2')">
                            <div class="slide-content">
                                <lfr-editable id="slide-title-1"
                                            type="rich-text"
                                            class="slide-title">
                                    Investigación de Clase Mundial
                                </lfr-editable>
                                <lfr-editable id="slide-desc-1"
                                            type="rich-text"
                                            class="paragraph paragraph-neutral paragraph-md description">
                                    Proyectos innovadores y logros académicos destacados
                                </lfr-editable>
                            </div>
                        </div>
                    </div>

                    <!-- Slide 2 -->
                    <div class="carousel-slide swiper-slide"
                         data-slide-index="2"
                         data-slide-type="campus"
                         onclick="window.openCarouselModal && window.openCarouselModal(2)">
                        <div class="slide-image"
                             style="background-image: url('https://www.javeriana.edu.co/sostenibilidad/wp-content/uploads/2021/07/Campus-Sustentable_0000_Javeriana-Sostenible.jpg')">
                            <div class="slide-content">
                                <lfr-editable id="slide-title-2"
                                            type="rich-text"
                                            class="slide-title">
                                    Campus Innovador
                                </lfr-editable>
                                <lfr-editable id="slide-desc-2"
                                            type="rich-text"
                                            class="paragraph paragraph-neutral paragraph-md description">
                                    Instalaciones modernas y espacios de vanguardia
                                </lfr-editable>
                            </div>
                        </div>
                    </div>

                    <!-- Slide 3 -->
                    <div class="carousel-slide swiper-slide"
                         data-slide-index="3"
                         data-slide-type="internacional"
                         onclick="window.openCarouselModal && window.openCarouselModal(3)">
                        <div class="slide-image"
                             style="background-image: url('https://marionoriegaasociados.com/wp-content/uploads/2021/02/pweb_pm_javeriana-proyectos_01.png')">
                            <div class="slide-content">
                                <lfr-editable id="slide-title-3"
                                            type="rich-text"
                                            class="slide-title">
                                    Oportunidades Internacionales
                                </lfr-editable>
                                <lfr-editable id="slide-desc-3"
                                            type="rich-text"
                                            class="paragraph paragraph-neutral paragraph-md description">
                                    Programas de intercambio y colaboraciones globales
                                </lfr-editable>
                            </div>
                        </div>
                    </div>

                    <!-- Slides adicionales... -->
                    <div class="carousel-slide swiper-slide"
                         data-slide-index="4"
                         data-slide-type="universidad"
                         onclick="window.openCarouselModal && window.openCarouselModal(4)">
                        <div class="slide-image"
                             style="background-image: url('https://www.javeriana.edu.co/recursosdb/d/info-prg/proj3')">
                            <div class="slide-content">
                                <lfr-editable id="slide-title-4"
                                            type="rich-text"
                                            class="slide-title">
                                    Excelencia Académica
                                </lfr-editable>
                                <lfr-editable id="slide-desc-4"
                                            type="rich-text"
                                            class="paragraph paragraph-neutral paragraph-md description">
                                    Formación integral de la más alta calidad
                                </lfr-editable>
                            </div>
                        </div>
                    </div>

                </div> <!-- /swiper-wrapper -->

                <!-- Controles de navegación -->
                <div class="carousel-controls" id="carousel-controls">
                    <button class="carousel-control prev"
                            id="carousel-prev"
                            type="button"
                            aria-label="Slide anterior"
                            onclick="window.carouselPrevSlide && window.carouselPrevSlide()">
                        <i class="ph ph-arrow-circle-left" aria-hidden="true"></i>
                    </button>
                    <button class="carousel-control next"
                            id="carousel-next"
                            type="button"
                            aria-label="Slide siguiente"
                            onclick="window.carouselNextSlide && window.carouselNextSlide()">
                        <i class="ph ph-arrow-circle-right" aria-hidden="true"></i>
                    </button>
                </div>

                <!-- Indicadores -->
                <div class="carousel-indicators" id="carousel-indicators">
                    <button class="indicator active" data-indicator-index="0" type="button"></button>
                    <button class="indicator" data-indicator-index="1" type="button"></button>
                    <button class="indicator" data-indicator-index="2" type="button"></button>
                    <button class="indicator" data-indicator-index="3" type="button"></button>
                    <button class="indicator" data-indicator-index="4" type="button"></button>
                </div>

            </div> <!-- /carousel-container -->
        </div>
    </div>

    <!-- MODAL PARA PROYECTOS CON CAMPOS EDITABLES -->
    <div class="modal-backdrop"
         id="modal-backdrop-carousel"
         style="display: none;"
         onclick="window.closeCarouselModal && window.closeCarouselModal(event)">

        <div class="modal-content" onclick="event.stopPropagation()">

            <button class="modal-close"
                    onclick="window.closeCarouselModal && window.closeCarouselModal()"
                    aria-label="Cerrar modal">
                &times;
            </button>

            <div class="modal-body">
                <div class="project-details">
                    <div class="project-layout">

                        <!-- Información del proyecto con campos editables -->
                        <div class="project-info">
                            <!-- Datos editables para cada slide -->
                            <div class="project-data" data-project="0" style="display: none;">
                                <lfr-editable id="project-title-0" type="rich-text" class="project-title">
                                    Universidad Destacada - Programas Académicos
                                </lfr-editable>
                                <div class="info-row">
                                    <strong>Fecha</strong>
                                    <lfr-editable id="project-date-0" type="text">2024</lfr-editable>
                                </div>
                                <div class="info-row">
                                    <strong>Responsable</strong>
                                    <lfr-editable id="project-responsible-0" type="text">Equipo Académico</lfr-editable>
                                </div>
                                <div class="info-row">
                                    <strong>Video URL</strong>
                                    <lfr-editable id="project-video-0" type="text">https://www.youtube.com/watch?v=Y2KdypoCAYg&t=27s</lfr-editable>
                                </div>
                                <div class="info-row">
                                    <strong>Descripción</strong>
                                    <lfr-editable id="project-description-0" type="rich-text" class="project-description">
                                        Descubre nuestros programas académicos de alta calidad y la experiencia universitaria integral que ofrecemos.
                                    </lfr-editable>
                                </div>
                                <div class="info-row">
                                    <strong>Galería de Imágenes (URLs separadas por comas)</strong>
                                    <lfr-editable id="project-gallery-0" type="text">
                                        https://www.javeriana.edu.co/sostenibilidad/wp-content/uploads/2021/07/Campus-Sustentable_0000_Javeriana-Sostenible.jpg,
                                        https://www.javeriana.edu.co/recursosdb/d/info-prg/proj2,
                                        https://www.javeriana.edu.co/recursosdb/d/info-prg/proj3
                                    </lfr-editable>
                                </div>
                            </div>

                            <!-- Datos para slide 1 -->
                            <div class="project-data" data-project="1" style="display: none;">
                                <lfr-editable id="project-title-1" type="rich-text" class="project-title">
                                    Investigación de Clase Mundial
                                </lfr-editable>
                                <div class="info-row">
                                    <strong>Fecha</strong>
                                    <lfr-editable id="project-date-1" type="text">2023-2024</lfr-editable>
                                </div>
                                <div class="info-row">
                                    <strong>Responsable</strong>
                                    <lfr-editable id="project-responsible-1" type="text">Centro de Investigación</lfr-editable>
                                </div>
                                <div class="info-row">
                                    <strong>Video URL</strong>
                                    <lfr-editable id="project-video-1" type="text">https://www.youtube.com/watch?v=h3GuFxrk8aI</lfr-editable>
                                </div>
                                <div class="info-row">
                                    <strong>Descripción</strong>
                                    <lfr-editable id="project-description-1" type="rich-text" class="project-description">
                                        Conoce nuestros proyectos de investigación innovadores y logros académicos destacados.
                                    </lfr-editable>
                                </div>
                                <div class="info-row">
                                    <strong>Galería de Imágenes</strong>
                                    <lfr-editable id="project-gallery-1" type="text">
                                        https://www.javeriana.edu.co/recursosdb/d/info-prg/proj2,
                                        https://www.javeriana.edu.co/sostenibilidad/wp-content/uploads/2021/07/Campus-Sustentable_0000_Javeriana-Sostenible.jpg
                                    </lfr-editable>
                                </div>
                            </div>

                            <!-- Datos para slide 2 -->
                            <div class="project-data" data-project="2" style="display: none;">
                                <lfr-editable id="project-title-2" type="rich-text" class="project-title">
                                    Campus Innovador
                                </lfr-editable>
                                <div class="info-row">
                                    <strong>Fecha</strong>
                                    <lfr-editable id="project-date-2" type="text">2024</lfr-editable>
                                </div>
                                <div class="info-row">
                                    <strong>Responsable</strong>
                                    <lfr-editable id="project-responsible-2" type="text">Departamento de Infraestructura</lfr-editable>
                                </div>
                                <div class="info-row">
                                    <strong>Video URL</strong>
                                    <lfr-editable id="project-video-2" type="text">https://www.youtube.com/watch?v=Y2KdypoCAYg&t=27s</lfr-editable>
                                </div>
                                <div class="info-row">
                                    <strong>Descripción</strong>
                                    <lfr-editable id="project-description-2" type="rich-text" class="project-description">
                                        Explora nuestras instalaciones modernas y entorno de aprendizaje de vanguardia.
                                    </lfr-editable>
                                </div>
                                <div class="info-row">
                                    <strong>Galería de Imágenes</strong>
                                    <lfr-editable id="project-gallery-2" type="text">
                                        https://www.javeriana.edu.co/sostenibilidad/wp-content/uploads/2021/07/Campus-Sustentable_0000_Javeriana-Sostenible.jpg,
                                        https://www.javeriana.edu.co/recursosdb/d/info-prg/proj1
                                    </lfr-editable>
                                </div>
                            </div>

                            <!-- Contenedor dinámico donde se muestra la información -->
                            <div id="dynamic-project-info">
                                <h2 id="modal-project-title" class="project-title">
                                    <!-- Título dinámico del proyecto -->
                                </h2>

                                <div class="info-row">
                                    <strong>Fecha</strong>
                                    <span id="modal-project-date">
                                        <!-- Fecha dinámica -->
                                    </span>
                                </div>

                                <div class="info-row">
                                    <strong>Responsable</strong>
                                    <span id="modal-project-responsible">
                                        <!-- Responsable dinámico -->
                                    </span>
                                </div>

                                <div class="info-row">
                                    <strong>Descripción</strong>
                                    <p id="modal-project-description" class="project-description">
                                        <!-- Descripción dinámica -->
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Galería multimedia -->
                        <div class="project-gallery" id="modal-project-gallery">

                            <!-- Contenedor de video -->
                            <div id="modal-project-video" class="video-container">
                                <!-- El video se insertará dinámicamente -->
                            </div>

                            <!-- Contenedor de imágenes -->
                            <div id="modal-project-gallery-items" class="gallery-items">
                                <!-- Las imágenes se insertarán dinámicamente -->
                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </div>

    </div>

</section> */}
