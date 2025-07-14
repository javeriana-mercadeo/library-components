import Paragraph from '@library/components/contain/paragraph'
import Title from '@library/components/contain/title'
import Container from '@library/components/container'
import React from 'react'
import './styles.scss'
const Index = () => {
  return (
    <section className="documentation-section">
      <Container>
        <Title className="inscription-title"> Becas y Financiación</Title>

        {/* Sección: Cómo aplicar */}
        <div className="documentation-header">
          <h2>¿Cuáles son las opciones de financiación para pagar la matrícula?</h2>
        </div>

        <p className="note">Si necesitas apoyo financiero, la Javeriana ofrece diversas alternativas:</p>

        <div className="aplication-item">
          <ol>
            <li>Matrícula completa cada semestre.</li>
            <li>No incurrir en prueba académica (no bajar del promedio mínimo requerido).</li>
            <li>No ser sujeto de sanciones disciplinarias dentro de la universidad.</li>
            <li>Cumplir con actividades de retribución social, si aplica.</li>
          </ol>
        </div>

        <Paragraph className="note">
          <em>
            <strong>Nota: </strong>
          </em>
          <em>Algunas becas tienen criterios específicos adicionales, por lo que debes revisar los términos de tu beneficio. </em>
        </Paragraph>
      </Container>
    </section>
  )
}

export default Index
