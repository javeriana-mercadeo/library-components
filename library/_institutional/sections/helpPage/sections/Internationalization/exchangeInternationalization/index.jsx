import React from 'react'
import './styles.scss'
import Paragraph from '@library/components/contain/paragraph'
import Title from '@library/components/contain/title'
import Container from '@library/components/container'
const Index = () => {
  return (
    <section className="exchange-section">
      <Container>
      <Title className="exchange-title">  Internacionalización y Movilidad</Title>

        {/* Sección: Cómo aplicar */}
        <div className="exchange-header">
          <h2>¿Puedo hacer un intercambio académico si soy estudiante nuevo?</h2>
        </div>

        <Paragraph className="note">
          {' '}
          <p>
            No, para aplicar a un intercambio internacional debes haber completado al menos dos años de estudios en la Javeriana. La mayoría
            de los programas de movilidad internacional requieren que estés iniciando tu quinto semestre (cuarto semestre en el caso de
            Psicología e Ingenierías).
          </p>
        </Paragraph>
      </Container>
    </section>
  )
}

export default Index
