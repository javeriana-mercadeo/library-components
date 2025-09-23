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
      items: [
        'Ensayo sobre conocimientos en derecho y economía'
      ]
    },
    {
      id: 'habilidad',
      title: 'HABILIDAD',
      percentage: 20,
      icon: 'ph-lightning-slash',
      color: 'primary',
      items: [
        'Ensayo sobre conocimientos en derecho y economía'
      ]
    }
  ]

  return (
    <div className={baseClass} data-component-id={elementName}>
      <Container id={elementName} className={`${baseClass}_container`}>
        {/* === HEADER === */}
        <div className={`${baseClass}_header`}>
          <div className={`${baseClass}_header-icon`}>
            <i className="ph ph-chart-pie"></i>
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
              data-percentage={requirement.percentage}
            >
              {/* Progress Bar */}
              <div className={`${baseClass}_progress-wrapper`}>
                <div className={`${baseClass}_progress-bar`}>
                  <div
                    className={`${baseClass}_progress-fill`}
                    data-progress={requirement.percentage}
                  ></div>
                </div>
                <div className={`${baseClass}_progress-label`}>
                  <span className={`${baseClass}_percentage`}>
                    {requirement.percentage}%
                  </span>
                </div>
              </div>

          {/* Tabs System */}
          <div className={`${baseClass}_tabs-container`}>
            {/* Tab Headers */}
            <div className={`${baseClass}_tabs-header`}>
              {requirements.map(requirement => (
                <button
                  key={requirement.id}
                  className={`${baseClass}_tab-button ${requirement.id === 'actitud' ? 'is-active' : ''}`}
                  data-requirement={requirement.id}
                  data-tab-button={requirement.id}>
                  <div className={`${baseClass}_tab-icon`}>
                    <i className={requirement.icon}></i>
                  </div>
                  <span className={`${baseClass}_tab-title`}>{requirement.title}</span>
                  <span className={`${baseClass}_tab-percentage`}>{requirement.percentage}%</span>
                </button>
              ))}
            </div>

<<<<<<< HEAD
            {/* Tab Content */}
            <div className={`${baseClass}_tabs-content`}>
              {requirements.map(requirement => (
                <div
                  key={requirement.id}
                  className={`${baseClass}_tab-panel ${requirement.id === 'actitud' ? 'is-active' : ''}`}
                  data-requirement={requirement.id}
                  data-tab-panel={requirement.id}>
                  <div className={`${baseClass}_tab-items`}>
                    {requirement.items.map((item, itemIndex) => (
                      <div key={itemIndex} className={`${baseClass}_tab-list-item`}>
                        <div className={`${baseClass}_item-check`}>
                          <i className='ph ph-check'></i>
                        </div>
                        <Paragraph className={`${baseClass}_item-text`} size='md' isEditable={false}>
                          {item}
                        </Paragraph>
=======
              {/* Section Content */}
              <div className={`${baseClass}_section-content`}>
                <div className={`${baseClass}_items-grid`}>
                  {requirement.items.map((item, itemIndex) => (
                    <div key={itemIndex} className={`${baseClass}_item`}>
                      <div className={`${baseClass}_item-check`}>
                        <i className="ph ph-check"></i>
>>>>>>> df363ea95e373ffdcbc310eb25fcc2ba70877f45
                      </div>
                      <Paragraph
                        className={`${baseClass}_item-text`}
                        size='sm'
                        isEditable={false}
                      >
                        {item}
                      </Paragraph>
                    </div>
                  ))}
                </div>
<<<<<<< HEAD
              ))}
=======
              </div>
            </div>
          ))}
        </div>

        {/* === FOOTER INFO === */}
        <div className={`${baseClass}_footer`}>
          <div className={`${baseClass}_info-card`}>
            <div className={`${baseClass}_info-icon`}>
              <i className="ph ph-info"></i>
            </div>
            <div className={`${baseClass}_info-content`}>
              <Caption className={`${baseClass}_info-title`} size='md' bold={true}>
                Paso 3 del proceso de admisión
              </Caption>
              <Paragraph className={`${baseClass}_info-text`} size='sm' color='neutral'>
                Ingresa nuevamente a tu cuenta, agenda y completa las actividades del proceso de admisión.
              </Paragraph>
>>>>>>> df363ea95e373ffdcbc310eb25fcc2ba70877f45
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default RequisitosPregrado
