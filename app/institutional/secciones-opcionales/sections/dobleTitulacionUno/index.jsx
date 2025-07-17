import React from 'react'
import './styles.scss'
import Title from '../../../../_library/components/contain/title'
import Paragraph from '../../../../_library/components/contain/paragraph'
import Container from '@library/components/container'

const DoubleTitulacion = () => {
  return (
    <div id="double-degree-section" className="double-titulacion-container">
      <Container className="content-wrapper">
        <Title id="double-degree-main-title" className="main-title">
          Doble Titulación 1
        </Title>

        <div id="double-degree-hero" className="hero-section">
          <img 
            src="https://www.javeriana.edu.co/recursosdb/d/info-prg/fondobiblioteca" 
            alt="Biblioteca Universidad Javeriana" 
            className="hero-background-image"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
            }}
          />
          <div className="overlay"></div>
          
          <div className="hero-content">
            <Title id="double-degree-hero-title" className="hero-title">
              Internacionaliza tu MBA y amplía tu visión global
            </Title> 
            
            <Paragraph id="double-degree-hero-description" className="hero-description">
              Vive experiencias académicas en el extranjero que potencian tu perfil profesional y amplían tus oportunidades laborales.
            </Paragraph>

            <div id="double-degree-cards" className="cards-container">
              <div id="international-missions-card" className="info-card">
                <Title id="international-missions-title" className="card-title">
                  Misiones Internacionales:
                </Title>
                <Paragraph id="international-missions-description" className="card-description">
                  Dos experiencias académicas en innovación, estrategia y emprendimiento, incluidas en la matrícula.
                </Paragraph>
              </div>

              <div id="summer-business-school-card" className="info-card">
                <Title id="summer-business-school-title" className="card-title">
                  Summer Business School:
                </Title>
                <Paragraph id="summer-business-school-description" className="card-description">
                  Programa intersemestral con docentes internacionales para complementar tu formación
                </Paragraph>
              </div>

              <div id="double-degree-info-card" className="info-card">
                <Title id="double-degree-card-title" className="card-title">
                  Doble Titulación:
                </Title>
                <Paragraph id="double-degree-card-description" className="card-description">
                  A partir de 2025, opción de obtener un título adicional con la Universidad Pompeu Fabra en Barcelona.
                </Paragraph>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default DoubleTitulacion