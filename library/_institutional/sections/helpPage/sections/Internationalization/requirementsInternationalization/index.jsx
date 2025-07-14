import React from 'react'
import './styles.scss'

import Paragraph from '@library/components/contain/paragraph'
import Title from '@library/components/contain/title'
import Container from '@library/components/container'

const Index = () => {
  return (
    <section className="requirements-section">
      <Container>
        <Title className="requirements-title"> Internacionalización y Movilidad</Title>

        {/* Sección: Cómo aplicar */}
        <div className="documentation-header">
          <h2>¿Cuáles son los requisitos para aplicar a un programa de movilidad internacional?</h2>
        </div>

        <p className="note">Para aplicar a un intercambio internacional, debes cumplir con los siguientes requisitos:</p>

        <div className="requirements-item">
          <ol>
            <li>
              Haber completado dos años de estudios en la Javeriana (mínimo 5° semestre, excepto Psicología e Ingenierías que pueden aplicar
              desde 4° semestre).
            </li>
            <li>Promedio igual o superior a 3.75.</li>
            <li>No tener sanciones académicas ni disciplinarias.</li>
            <li>Certificado de idioma B2 si el intercambio es en un idioma distinto al español.</li>
            <li>Definir tu ruta académica con tu consejero y elegir las universidades de interés.</li>
            <li>Asistir a una charla informativa y programar una asesoría con la Oficina de Movilidad Internacional.</li>
          </ol>
        </div>

        <Paragraph className="note">
          <em>
            <strong>Importante: </strong>
          </em>
          <em>
           
            Las convocatorias se abren con seis meses de anticipación al intercambio, por lo que debes iniciar el proceso con suficiente
            tiempo.
          </em>
        </Paragraph>
      </Container>
    </section>
  )
}

export default Index
