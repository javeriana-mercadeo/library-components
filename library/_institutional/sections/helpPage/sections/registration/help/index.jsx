import './styles.scss'

import React from 'react'

import Paragraph from '@library/components/contain/paragraph'
import Title from '@library/components/contain/title'
import Container from '@library/components/container'

const Index = () => {
  return (
    <section className="help-section">
      <Container>
        <div className="help-header">
          <Title className="title-help"> ¿Necesitas ayuda?</Title>
          <a href="/institutional/helpPage/pgInscription">
            Ver más <i className="ph ph-arrow-right"></i>
          </a>
        </div>

        <div className="help-links">
          <div className="help-item">
            <a href="/institutional/helpPage/questionFrequently">
              Proceso de Inscripción <i className="ph ph-arrow-up-right"></i>
            </a>
            <Paragraph>Todo lo que necesitas saber para inscribirte en la Universidad Javeriana.</Paragraph>
          </div>

          <div className="help-item">
            <a href="/institutional/helpPage/financing/financingQuestionFrequently">
              Becas y Financiación <i className="ph ph-arrow-up-right"></i>
            </a>
            <Paragraph>Opciones de apoyo económico para facilitar tu ingreso a la universidad. </Paragraph>
          </div>

          <div className="help-item">
            <a href="/institutional/helpPage/internationalization/internationalizationQuestionFrequently">
              Internacionalización y Movilidad <i className="ph ph-arrow-up-right"></i>
            </a>
            <Paragraph>Oportunidades de estudios en el extranjero y experiencias internacionales. </Paragraph>
          </div>
        </div>
      </Container>
    </section>
  )
}
export default Index
