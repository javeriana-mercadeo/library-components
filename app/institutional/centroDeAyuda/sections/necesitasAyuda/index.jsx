import './styles.scss'

import React from 'react'

import Paragraph from '@library/components/contain/paragraph'
import Title from '@library/components/contain/title'
import Container from '@library/components/container'

const Index = () => {
  return (
    <section className="help-section" id="help-section">
      <Container>
        <div className="help-header" id="help-header">
          <Title className="title-help" id="title-help">
            ¿Necesitas ayuda?
          </Title>
          <a href="/institutional/helpPage/pgInscription" id="help-header-link">
            Ver más <i className="ph ph-arrow-right"></i>
          </a>
        </div>

        <div className="help-links" id="help-links">
          <div className="help-item" id="help-item-inscription">
            <a href="/institutional/centroDeAyuda/sections/acordionHelp" id="link-inscription">
              <span id="text-inscription" data-lfr-editable-id="link-inscription-text" data-lfr-editable-type="text">
                Proceso de Inscripción
              </span>
              <i className="ph ph-arrow-up-right"></i>
            </a>

            <Paragraph id="paragraph-inscription">Todo lo que necesitas saber para inscribirte en la Universidad Javeriana.</Paragraph>
          </div>

          <div className="help-item" id="help-item-financing">
            <a href="/institutional/helpPage/financing/financingQuestionFrequently" id="link-financing">
              <span id="text-financing" data-lfr-editable-id="link-financing-text" data-lfr-editable-type="text">
                Becas y Financiación
              </span>
              <i className="ph ph-arrow-up-right"></i>
            </a>

            <Paragraph id="paragraph-financing">Opciones de apoyo económico para facilitar tu ingreso a la universidad. </Paragraph>
          </div>

          <div className="help-item" id="help-item-internationalization">
            <a href="/institutional/helpPage/internationalization/internationalizationQuestionFrequently" id="link-internationalization">
              <span id="text-internationalization" data-lfr-editable-id="link-internationalization-text" data-lfr-editable-type="text">
                Internacionalización y Movilidad
              </span>
              <i className="ph ph-arrow-up-right"></i>
            </a>
            <Paragraph id="paragraph-internationalization">
              Oportunidades de estudios en el extranjero y experiencias internacionales.{' '}
            </Paragraph>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Index
