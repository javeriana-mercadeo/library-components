'use client'

import { useEffect } from 'react'
import { Container, Caption, Title, Paragraph } from '@library/components'

import script from './script.js'
import info from './info.json'
import './styles.scss'

const RequisitosPregrado = () => {
  const elementName = info.id || 'requisitos-pregrado'
  const baseClass = 'admission-requirements'

  // Inicializar script cuando el componente se monta
  useEffect(() => {
    script()
  }, [])

  // Datos de los requisitos de admisión
  const requirements = [
    {
      id: 'actitud',
      title: 'ACTITUD',
      percentage: 50,
      icon: 'ph-heart',
      color: 'primary',
      items: ['Entrevista personal', 'Manejo de situaciones', 'Relaciones interpersonales', 'Sensibilidad social', 'Motivación']
    },
    {
      id: 'conocimiento',
      title: 'CONOCIMIENTO',
      percentage: 30,
      icon: 'ph-book-open',
      color: 'primary',
      items: ['Ensayo sobre conocimientos en derecho y economía']
    },
    {
      id: 'habilidad',
      title: 'HABILIDAD',
      percentage: 20,
      icon: 'ph-lightning-slash',
      color: 'primary',
      items: ['Ensayo sobre conocimientos en derecho y economía']
    }
  ]

  return (
    <div className={baseClass} data-component-id={elementName}>
      <Container id={elementName} className={`${baseClass}_container`}>
        {/* === HEADER === */}
        <div className={`${baseClass}_header`}>
          <div className={`${baseClass}_header-icon`}>
            <i className='ph ph-chart-pie'></i>
          </div>
          <div className={`${baseClass}_header-content`}>
            <Title hierarchy='h2' className={`${baseClass}_title`}>
              Requisitos de Admisión
            </Title>
            <Caption className={`${baseClass}_subtitle`} size='lg' color='neutral'>
              Programa de Pregrado
            </Caption>
          </div>
        </div>

        {/* === REQUIREMENTS SECTIONS === */}
        <div className={`${baseClass}_sections`}>
          {requirements.map((requirement, index) => (
            <div
              key={requirement.id}
              className={`${baseClass}_section ${baseClass}_section--${requirement.color}`}
              data-requirement={requirement.id}
              data-percentage={requirement.percentage}>
              {/* Progress Bar */}
              <div className={`${baseClass}_progress-wrapper`}>
                <div className={`${baseClass}_progress-bar`}>
                  <div className={`${baseClass}_progress-fill`} data-progress={requirement.percentage}></div>
                </div>
                <div className={`${baseClass}_progress-label`}>
                  <span className={`${baseClass}_percentage`}>{requirement.percentage}%</span>
                </div>
              </div>

              {/* Accordion Item */}
              <div className={`${baseClass}_accordion-item`} data-requirement={requirement.id}>
                <div className={`${baseClass}_accordion-header`}>
                  <div className={`${baseClass}_accordion-icon`}>
                    <i className={requirement.icon}></i>
                  </div>
                  <Title hierarchy='h3' className={`${baseClass}_accordion-title`}>
                    {requirement.title}
                  </Title>
                  <div className={`${baseClass}_accordion-percentage`}>{requirement.percentage}%</div>
                  <div className={`${baseClass}_accordion-toggle`}>
                    <i className='ph ph-caret-down'></i>
                  </div>
                </div>

                {/* Section Content */}
                <div className={`${baseClass}_section-content`}>
                  <div className={`${baseClass}_items-grid`}>
                    {requirement.items.map((item, itemIndex) => (
                      <div key={itemIndex} className={`${baseClass}_item`}>
                        <div className={`${baseClass}_item-check`}>
                          <i className='ph ph-check'></i>
                        </div>
                        <Paragraph className={`${baseClass}_item-text`} size='sm' isEditable={false}>
                          {item}
                        </Paragraph>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* === FOOTER INFO === */}
        <div className={`${baseClass}_footer`}>
          <div className={`${baseClass}_info-card`}>
            <div className={`${baseClass}_info-icon`}>
              <i className='ph ph-info'></i>
            </div>
            <div className={`${baseClass}_info-content`}>
              <Caption className={`${baseClass}_info-title`} size='md' bold={true}>
                Paso 3 del proceso de admisión
              </Caption>
              <Paragraph className={`${baseClass}_info-text`} size='sm' color='neutral'>
                Ingresa nuevamente a tu cuenta, agenda y completa las actividades del proceso de admisión.
              </Paragraph>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default RequisitosPregrado
