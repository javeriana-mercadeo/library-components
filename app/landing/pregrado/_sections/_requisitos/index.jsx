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
      color: 'secondary',
      items: ['Ensayo sobre conocimientos en derecho y economía']
    },
    {
      id: 'habilidad',
      title: 'HABILIDAD',
      percentage: 20,
      icon: 'ph-lightning',
      color: 'success',
      items: ['Pensamiento lógico-matemático', 'Composición escrita', 'Comprensión de lectura']
    }
  ]

  return (
    <div className={baseClass} data-component-id={elementName}>
      <Container id={elementName} className={`${baseClass}_container`}>
        {/* === HEADER === */}
        <div className={`${baseClass}_header`}>
          <Title hierarchy='h2' className={`${baseClass}_title`}>
            Requisitos de Admisión
          </Title>
        </div>

        {/* === CIRCULAR CHART SECTION === */}
        <div className={`${baseClass}_chart-container`}>
          {/* SVG Circular Chart */}
          <div className={`${baseClass}_chart-wrapper`}>
            <svg className={`${baseClass}_chart`} viewBox='0 0 800 800' width='800' height='800'>
              {/* Chart segments */}
              {requirements.map((requirement, index) => {
                let startAngle = 0
                for (let i = 0; i < index; i++) {
                  startAngle += requirements[i].percentage * 3.6 // Convert percentage to degrees
                }
                const endAngle = startAngle + requirement.percentage * 3.6

                // Calculate path for each segment
                const radius = 240
                const centerX = 400
                const centerY = 400

                const startAngleRad = (startAngle - 90) * (Math.PI / 180)
                const endAngleRad = (endAngle - 90) * (Math.PI / 180)

                const x1 = centerX + radius * Math.cos(startAngleRad)
                const y1 = centerY + radius * Math.sin(startAngleRad)
                const x2 = centerX + radius * Math.cos(endAngleRad)
                const y2 = centerY + radius * Math.sin(endAngleRad)

                const largeArcFlag = requirement.percentage > 50 ? 1 : 0

                const pathData = [
                  `M ${centerX} ${centerY}`,
                  `L ${x1} ${y1}`,
                  `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                  'Z'
                ].join(' ')

                return (
                  <g key={requirement.id}>
                    <path
                      d={pathData}
                      className={`${baseClass}_chart-segment ${baseClass}_chart-segment--${requirement.color}`}
                      data-requirement={requirement.id}
                      data-percentage={requirement.percentage}
                    />
                  </g>
                )
              })}

              {/* Center circle */}
              <circle cx='400' cy='400' r='120' className={`${baseClass}_chart-center`} />

              {/* Center text */}
              <text x='400' y='395' textAnchor='middle' className={`${baseClass}_chart-total-label`}>
                Total
              </text>
              <text x='400' y='415' textAnchor='middle' className={`${baseClass}_chart-total-value`}>
                100%
              </text>

              {/* Chart Labels dentro del SVG */}
              {requirements.map((requirement, index) => {
                // Calcular posición de cada label dentro del segmento
                let startAngle = 0
                for (let i = 0; i < index; i++) {
                  startAngle += requirements[i].percentage * 3.6
                }
                const segmentAngle = requirement.percentage * 3.6
                const midAngle = startAngle + segmentAngle / 2 - 90 // -90 para empezar desde arriba

                // Convertir a radianes
                const midAngleRad = midAngle * (Math.PI / 180)

                // Radio para posicionar los labels dentro del segmento
                const labelRadius = 180 // Más cerca del centro, dentro del segmento
                const centerX = 400
                const centerY = 400

                // Calcular posición del label
                const labelX = centerX + labelRadius * Math.cos(midAngleRad)
                const labelY = centerY + labelRadius * Math.sin(midAngleRad)

                return (
                  <g key={requirement.id}>
                    {/* Texto del porcentaje */}
                    <text
                      x={labelX}
                      y={labelY - 5}
                      textAnchor='middle'
                      className={`${baseClass}_chart-label-percentage`}
                      data-requirement={requirement.id}
                      style={{ cursor: 'pointer' }}>
                      {requirement.percentage}%
                    </text>

                    {/* Texto del título */}
                    <text
                      x={labelX}
                      y={labelY + 10}
                      textAnchor='middle'
                      className={`${baseClass}_chart-label-title`}
                      data-requirement={requirement.id}
                      style={{ cursor: 'pointer' }}>
                      {requirement.title}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>

          {/* Accordion Lists */}
          <div className={`${baseClass}_accordion-container`}>
            {requirements.map(requirement => (
              <div key={requirement.id} className={`${baseClass}_accordion-item`} data-requirement={requirement.id}>
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

                <div className={`${baseClass}_accordion-content`}>
                  <div className={`${baseClass}_accordion-items`}>
                    {requirement.items.map((item, itemIndex) => (
                      <div key={itemIndex} className={`${baseClass}_accordion-list-item`}>
                        <div className={`${baseClass}_item-check`}>
                          <i className='ph ph-check'></i>
                        </div>
                        <Paragraph className={`${baseClass}_item-text`} size='md' isEditable={false}>
                          {item}
                        </Paragraph>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default RequisitosPregrado
