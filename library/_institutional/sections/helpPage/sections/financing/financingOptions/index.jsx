import './styles.scss'

import React from 'react'

import Paragraph from '@library/components/contain/paragraph'
import Title from '@library/components/contain/title'
import Container from '@library/components/container'

const Index = () => {
  return (
    <section className="documentation-section">
      <Container>
        <Title className="inscription-title"> Becas y Financiación</Title>

        {/* Sección: Opciones de financiación */}
        <div className="documentation-header">
          <h2>¿Cuáles son las opciones de financiación para pagar la matrícula?</h2>
        </div>

        <p className="note">Si necesitas apoyo financiero, la Javeriana ofrece diversas alternativas:</p>

        {/* Financiación directa con la universidad */}
        <div className="note">
          <h3>Financiación directa con la universidad</h3>
        </div>
        <div className="options-item">
          <ul>
            <li>
              <strong>Corto Plazo:</strong> Pago hasta en 6 cuotas dentro del semestre.
            </li>
            <li>
              <strong>Largo Plazo:</strong> Financiación de hasta el 80% de la matrícula con pago posterior a la graduación.
            </li>
          </ul>
        </div>

        {/* Créditos con entidades externas */}
        <div className="note">
          <h3>Créditos con entidades externas</h3>
        </div>
        <div className="options-item">
          <ul>
            <li>
              <strong>ICETEX:</strong> Financiación hasta del 100% de la matrícula.
            </li>
            <li>
              <strong>LUMNI:</strong> Financiación hasta del 85% de la carrera, con pago basado en ingresos después de graduarte.
            </li>
            <li>
              <strong>Créditos bancarios:</strong> con Banco de Bogotá, Fincomercio, Sufi (Bancolombia), AV Villas, Davivienda, entre otros.
            </li>
          </ul>
        </div>

        <Paragraph className="note">
          <em>
            <strong>Nota:</strong> Cada opción tiene requisitos y tasas de interés diferentes.
          </em>
        </Paragraph>

        <p className="note">
          Consulta todas las opciones aquí:{' '}
          <a href="https://www.javeriana.edu.co/financiacion" target="_blank" rel="noopener noreferrer">
            Opciones de financiación ↗
          </a>
        </p>
      </Container>
    </section>
  )
}

export default Index
