import React from 'react'
import './styles.scss'

import Paragraph from '@library/components/contain/paragraph'
import Title from '@library/components/contain/title'
import Container from '@library/components/container'

const Index = () => {
  return (
    <section className="documentation-section">
      <Container>
      <Title className="inscription-title">  Internacionalización y Movilidad</Title>

        <div className="documentation-header">
          <h2>¿Qué apoyo brinda la universidad a estudiantes extranjeros?</h2>
        </div>

      <Paragraph className="note"> La Javeriana ofrece varias formas de apoyo para estudiantes internacionales: </Paragraph>

        <div className="options-item">
          <ul>
            <li>
              <strong>Asesoría en movilidad:</strong> Acompañamiento antes, durante y después del intercambio.
            </li>
            <li>
              <strong>Orientación en alojamiento:</strong> Aunque la Javeriana no tiene residencias propias, brinda información sobre
              opciones seguras de vivienda.
            </li>
            <li>
              <strong>Acceso a servicios universitarios:</strong> Biblioteca, centro deportivo, bienestar universitario, actividades
              culturales, entre otros.
            </li>
            <li>
              <strong>Programas de integración:</strong> Participación en el programa de Voluntariado, Language Exchange Day (LED) y Semana
              Internacional.
            </li>
          </ul>
        </div>

        <Paragraph className="note">
          Contacto:
          <a href="foreignstudents@javeriana.edu.co" target="_blank" rel="noopener noreferrer">
            foreignstudents@javeriana.edu.co
          </a>
        </Paragraph>
      </Container>
    </section>
  )
}

export default Index
