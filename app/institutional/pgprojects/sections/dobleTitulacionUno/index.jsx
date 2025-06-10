import React from 'react'
import './styles.scss'
import Title from '../../../../_library/components/contain/title'
import Paragraph from '../../../../_library/components/contain/paragraph'
import Container from '@library/components/container/Container'

const DoubleTitulacion = () => {
  return (
   
      <div className="double-titulacion-container">
        <Container className="content-wrapper"> <div >
          <Title className="main-title">
            {' '}
            <h1>Doble Titulación 1</h1>
          </Title>

          <div className="hero-section">
            <div className="overlay">
              <div className="hero-content">
                <h2 className="hero-title">Internacionaliza tu MBA y amplía tu visión global</h2>
                <Paragraph className="hero-description">
                  {' '}
                  <p>
                    Vive experiencias académicas en el extranjero que potencian tu perfil profesional y amplían tus oportunidades laborales.
                  </p>
                </Paragraph>

                <div className="cards-container">
                  <div className="info-card">
                    <h3 className="card-title">Misiones Internacionales:</h3>
                    <Paragraph className="card-description">
                      {' '}
                      <p>Dos experiencias académicas en innovación, estrategia y emprendimiento, incluidas en la matrícula.</p>
                    </Paragraph>
                  </div>

                  <div className="info-card">
                    <h3 className="card-title">Summer Business School:</h3>
                    <Paragraph className="card-description">
                      {' '}
                      <p>Programa intersemestral con docentes internacionales para complementar tu formación</p>
                    </Paragraph>
                  </div>

                  <div className="info-card">
                    <h3 className="card-title">Doble Titulación:</h3>
                    <Paragraph className="card-description">
                      {' '}
                      <p>A partir de 2025, opción de obtener un título adicional con la Universidad Pompeu Fabra en Barcelona.</p>
                    </Paragraph>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> </Container>
      </div>
   
  )
}

export default DoubleTitulacion
