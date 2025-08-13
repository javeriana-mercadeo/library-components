import React from 'react'
import './styles.scss'
import Title from '../../../../_library/components/contain/title'
import Paragraph from '../../../../_library/components/contain/paragraph'
import Container from '@library/components/container'
import scrollLogic from './script.js'

const DobleTitulacion2 = () => {
  // Ejecutar scroll logic solo en cliente
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      scrollLogic()
    }, 100)
  }

  const programItems = [
    {
      id: 1,
      image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/tutulacion-uno',
      alt: 'Campus Universitario',
      title: 'Misiones Internacionales:',
      description: 'Dos experiencias académicas en innovación, estrategia y emprendimiento, incluidas en la matrícula.'
    },
    {
      id: 2,
      image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/titulacion-dos',
      alt: 'Aula de clases',
      title: 'Summer Business School:',
      description: 'Programa intersemestral con docentes internacionales para complementar tu formación.'
    },
  ]

<<<<<<< HEAD
  return (
    <div className="doble-titulacion-container" id="doble-titulacion-container">
      <Container className="content-wrapper">
        <div>
          {/* Título principal con ID único */}
          <Title className="main-title" id="dt2-main-title-header">
            Doble Titulación 2
          </Title>

          <div className="two-column-layout">
            {/* Columna izquierda - Hero section */}
            <div className="left-column">
              {/* Título móvil fuera del overlay - restaurado con Title component */}
              <Title className="mobile-title-outside" id="dt2-mobile-title-desktop">
                Internacionaliza tu MBA y amplía tu visión global
              </Title>
              
              <div className="university-building">
                <img
                  src="https://www.javeriana.edu.co/recursosdb/d/info-prg/titulacion-tres"
                  alt="Universidad Pompeu Fabra - Edificio"
                  className="university-image"
                  data-lfr-editable-id="dt2-university-building-image"
                  data-lfr-editable-type="image"
=======
      this.handleWheel = e => {
        const isMouseOverRightColumn = rightColumn.contains(e.target)
        const deltaY = e.deltaY

        if (isMouseOverRightColumn) return

        const scrollTop = rightColumn.scrollTop
        const scrollHeight = rightColumn.scrollHeight
        const clientHeight = rightColumn.clientHeight
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 2

        if (deltaY > 0 && !isAtBottom) {
          e.preventDefault()
          rightColumn.scrollBy({ top: deltaY, behavior: 'auto' })
        }
      }

      container.addEventListener('wheel', this.handleWheel, { passive: false })

      this.handleResize = () => {}

      window.addEventListener('resize', this.handleResize)
    }
  }

  componentWillUnmount() {
    if (this.containerRef.current && this.handleWheel) {
      this.containerRef.current.removeEventListener('wheel', this.handleWheel)
    }

    if (this.handleResize) {
      window.removeEventListener('resize', this.handleResize)
    }
  }

  render() {
    return (
      <div className='doble-titulacion-container' ref={this.containerRef}>
        <div className='content-wrapper'>
          <h1 className='main-title'>Doble Titulación 2</h1>

          <div className='two-column-layout'>
            <div className='left-column'>
              <div className='university-building'>
                <div className='overlay-content'>
                  <h2 className='overlay-title'>Internacionaliza tu MBA y amplía tu visión global</h2>

                  <img
                    src='https://www.javeriana.edu.co/recursosdb/d/info-prg/titulacion-tres'
                    alt='Universidad Pompeu Fabra - Edificio'
                    className='university-image mobile-only'
                  />

                  <p className='overlay-description'>
                    Vive experiencias académicas en el extranjero que potencian tu perfil profesional y amplían tus oportunidades laborales.
                  </p>
                </div>

                <img
                  src='https://www.javeriana.edu.co/recursosdb/d/info-prg/titulacion-tres'
                  alt='Universidad Pompeu Fabra - Edificio'
                  className='university-image desktop-only'
>>>>>>> 2d8d35b1ac780cae4c25b45686a49a08060ebc9f
                />

                {/* Overlay con contenido */}
                <div className="overlay-content">
                  {/* Título overlay - restaurado con Title component y clase correcta */}
                  <Title className="overlay-title" id="dt2-mobile-title-overlay">
                    Internacionaliza tu MBA y amplía tu visión global
                  </Title>
                  <Paragraph className="overlay-description-principal" id="dt2-overlay-description-text">
                    Vive experiencias académicas en el extranjero que potencian tu perfil profesional y amplían tus oportunidades laborales.
                  </Paragraph>
                </div>
              </div>
            </div>

<<<<<<< HEAD
            {/* Columna derecha - Contenido con scroll */}
            <div className="right-column" id="right-column-scroll">
              <div className="scroll-container" id="scroll-container">
                {/* Header section - solo desktop */}
                <div className="header-section">
                  <div className="title-section">
                    <h2 
                      className="section-title" 
                      id="dt2-section-title-esquema"
                      data-lfr-editable-id="dt2-section-title-esquema"
                      data-lfr-editable-type="rich-text"
                    >
                      Esquema de Doble Titulación
                    </h2>
                    <Paragraph className="university-info" id="dt2-university-info-text">
                      con la Universidad Pompeu Fabra - Barcelona School of Management (BSM)
                    </Paragraph>
                  </div>

                  <div className="logo-container">
                    <img
                      src="https://www.javeriana.edu.co/recursosdb/d/info-prg/logobarcelona"
                      alt="Barcelona School of Management"
                      className="university-logo"
                      data-lfr-editable-id="dt2-logo-barcelona"
                      data-lfr-editable-type="image"
                    />
                    <img
                      src="https://www.javeriana.edu.co/recursosdb/d/info-prg/logoUPF"
                      alt="Universidad Pompeu Fabra"
                      className="university-logo"
                      data-lfr-editable-id="dt2-logo-upf"
                      data-lfr-editable-type="image"
                    />
                  </div>
                </div>

                {/* Items del programa */}
                <div className="program-items">
                  {programItems.map((item) => (
                    <div key={item.id} className="program-item">
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="program-image"
                        data-lfr-editable-id={`dt2-program-image-${item.id}`}
                        data-lfr-editable-type="image"
                      />
                      <div className="program-info">
                        <h3 
                          className="program-title" 
                          id={`dt2-program-title-${item.id}`}
                          data-lfr-editable-id={`dt2-program-title-${item.id}`}
                          data-lfr-editable-type="rich-text"
                        >
                          {item.title}
                        </h3>
                        <Paragraph className="program-description" id={`dt2-program-description-${item.id}`}>
                          {item.description}
                        </Paragraph>
                      </div>
                    </div>
                  ))}
=======
            <div className='right-column' ref={this.rightColumnRef}>
              <div className='header-section'>
                <div className='title-section'>
                  <h2 className='section-title'>Esquema de Doble Titulación</h2>
                  <p className='university-info'>con la Universidad Pompeu Fabra - Barcelona School of Management (BSM)</p>
                </div>

                <div className='logo-container'>
                  <img
                    src='https://www.javeriana.edu.co/recursosdb/d/info-prg/logobarcelona'
                    alt='Barcelona School of Management'
                    className='university-logo'
                  />
                  <img
                    src='https://www.javeriana.edu.co/recursosdb/d/info-prg/logoUPF'
                    alt='Universidad Pompeu Fabra'
                    className='university-logo'
                  />
                </div>
              </div>

              <div className='scroll-container'>
                <div className='program-items'>
                  <div className='program-item'>
                    <img
                      src='https://www.javeriana.edu.co/recursosdb/d/info-prg/tutulacion-uno'
                      alt='Campus Universitario'
                      className='program-image'
                    />
                    <div className='program-info'>
                      <h3 className='program-title'>Misiones Internacionales:</h3>
                      <p className='program-description'>
                        Dos experiencias académicas en innovación, estrategia y emprendimiento, incluidas en la matrícula.
                      </p>
                    </div>
                  </div>

                  <div className='program-item'>
                    <img
                      src='https://www.javeriana.edu.co/recursosdb/d/info-prg/titulacion-dos'
                      alt='Aula de clases'
                      className='program-image'
                    />
                    <div className='program-info'>
                      <h3 className='program-title'>Summer Business School:</h3>
                      <p className='program-description'>
                        Programa intersemestral con docentes internacionales para complementar tu formación.
                      </p>
                    </div>
                  </div>
>>>>>>> 2d8d35b1ac780cae4c25b45686a49a08060ebc9f
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default DobleTitulacion2