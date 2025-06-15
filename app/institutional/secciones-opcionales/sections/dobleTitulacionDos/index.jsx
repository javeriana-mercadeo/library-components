'use client'
import React from 'react'
import './styles.scss'
import Title from '../../../../_library/components/contain/title'
import Paragraph from '../../../../_library/components/contain/paragraph'
import Container from '@library/components/container'
// Importar la función de scroll
import scrollLogic from './script.js'

const DobleTitulacion2 = () => {
  // Ejecutar la lógica de scroll cuando se renderiza
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      scrollLogic()
    }, 100)
  }

  // Datos para renderizar
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
    {
      id: 3,
      image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/tutulacion-uno',
      alt: 'Intercambio Académico',
      title: 'Intercambio Académico:',
      description: 'Experimenta la educación internacional con programas de intercambio en universidades prestigiosas.'
    },
    {
      id: 4,
      image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/titulacion-dos',
      alt: 'Networking Internacional',
      title: 'Networking Global:',
      description: 'Construye una red de contactos internacionales que impulse tu carrera profesional.'
    },
    {
      id: 5,
      image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/tutulacion-uno',
      alt: 'Certificaciones',
      title: 'Certificaciones Internacionales:',
      description: 'Obtén certificaciones reconocidas mundialmente que validen tus competencias.'
    },
    {
      id: 6,
      image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/titulacion-dos',
      alt: 'Investigación',
      title: 'Proyectos de Investigación:',
      description: 'Participa en investigaciones conjuntas con universidades europeas.'
    }
  ]

  return (
    <div className="doble-titulacion-container" id="doble-titulacion-container">
      <Container className="content-wrapper">
        <div>
          <Title className="main-title">Doble Titulación 2</Title>

          <div className="two-column-layout">
            <div className="left-column">
              {/* Título solo para móvil - fuera del overlay */}
              <h2 className="mobile-title-outside">Internacionaliza tu MBA y amplía tu visión global</h2>
              
              <div className="university-building">
                {/* Imagen de desktop */}
                <img
                  src="https://www.javeriana.edu.co/recursosdb/d/info-prg/titulacion-tres"
                  alt="Universidad Pompeu Fabra - Edificio"
                  className="university-image desktop-only"
                />
                
                {/* Imagen de móvil */}
                <img
                  src="https://www.javeriana.edu.co/recursosdb/d/info-prg/titulacion-tres"
                  alt="Universidad Pompeu Fabra - Edificio"
                  className="university-image mobile-only"
                />

                {/* Overlay sobre ambas imágenes */}
                <div className="overlay-content">
                  <h2 className="overlay-title">Internacionaliza tu MBA y amplía tu visión global</h2>
                  <Paragraph className="overlay-description">
                    Vive experiencias académicas en el extranjero que potencian tu perfil profesional y amplían tus oportunidades laborales.
                  </Paragraph>
                </div>
              </div>
            </div>

            <div className="right-column" id="right-column-scroll">
              <div className="scroll-container" id="scroll-container">
                <div className="header-section">
                  <div className="title-section">
                    <h2 className="section-title">Esquema de Doble Titulación</h2>
                    <Paragraph className="university-info">
                      con la Universidad Pompeu Fabra - Barcelona School of Management (BSM)
                    </Paragraph>
                  </div>

                  <div className="logo-container">
                    <img
                      src="https://www.javeriana.edu.co/recursosdb/d/info-prg/logobarcelona"
                      alt="Barcelona School of Management"
                      className="university-logo"
                    />
                    <img
                      src="https://www.javeriana.edu.co/recursosdb/d/info-prg/logoUPF"
                      alt="Universidad Pompeu Fabra"
                      className="university-logo"
                    />
                  </div>
                </div>

                <div className="program-items">
                  {programItems.map((item) => (
                    <div key={item.id} className="program-item">
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="program-image"
                      />
                      <div className="program-info">
                        <h3 className="program-title">{item.title}</h3>
                        <Paragraph className="program-description">
                          {item.description}
                        </Paragraph>
                      </div>
                    </div>
                  ))}
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