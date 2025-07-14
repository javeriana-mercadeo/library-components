import React from 'react'
import './styles.scss'

import Paragraph from '@library/components/contain/paragraph'
import Title from '@library/components/contain/title'
import Container from '@library/components/container'

const Index = () => {
  return (
    <section className="documentation-section">
      <Container>
     <Title className="inscription-title">   Internacionalización y Movilidad</Title>

        {/* Sección: Cómo aplicar */}
        <div className="documentation-header">
          <h2>¿Cuántas universidades tienen convenio con la Javeriana para intercambios?</h2>
        </div>

        <Paragraph className="note">
          La Javeriana tiene más de 400 convenios internacionales con universidades en 40 países y más de 40 convenios nacionales a través
          del Convenio Sígueme, Explora CCYK y acuerdos bilaterales.
        </Paragraph>

        <div className="aplication-item">
          <ol>
            <li>Matrícula completa cada semestre.</li>
            <li>No incurrir en prueba académica (no bajar del promedio mínimo requerido).</li>
            <li>No ser sujeto de sanciones disciplinarias dentro de la universidad.</li>
            <li>Cumplir con actividades de retribución social, si aplica.</li>
          </ol>
        </div>

        <Paragraph className="note">
          Puedes consultar la lista de universidades con convenio{' '}
          <a href="dobletitulacion@javeriana.edu.co" target="_blank" rel="noopener noreferrer">
            aquí.
          </a>
        </Paragraph>
      </Container>
    </section>
  )
}

export default Index
