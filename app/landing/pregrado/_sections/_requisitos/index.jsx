'use client'

import { useEffect, useState } from 'react'
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

    // Test global accessibility
    if (typeof window !== 'undefined') {
      window.requirementsReactTest = () => {
        return true
      }

      // Verificar si ya hay datos disponibles antes del event listener
      if (window.latestRequirementsData) {
        setRequirements(window.latestRequirementsData)
      }
    }

    // Escuchar datos de la API
    const handleRequirementsData = (event) => {
      if (event.detail && event.detail.requirements) {
        const { requirements } = event.detail
        setRequirements(requirements)
      }
    }

    document.addEventListener('requirements:dataLoaded', handleRequirementsData)

    return () => {
      document.removeEventListener('requirements:dataLoaded', handleRequirementsData)
    }
  }, [])

  // Estado de carga - fallback mientras se cargan los datos de la API
  const loadingRequirements = [
    {
      id: 'actitud',
      title: 'ACTITUD',
      percentage: 33,
      icon: 'ph ph-user-circle-plus',
      color: 'primary',
      items: ['Cargando criterios de evaluación...']
    },
    {
      id: 'conocimiento',
      title: 'CONOCIMIENTO',
      percentage: 33,
      icon: 'ph ph-brain',
      color: 'secondary',
      items: ['Cargando criterios de evaluación...']
    },
    {
      id: 'habilidad',
      title: 'HABILIDAD',
      percentage: 34,
      icon: 'ph ph-atom',
      color: 'success',
      items: ['Cargando criterios de evaluación...']
    }
  ]

  // Datos de requisitos (se actualizarán desde la API)
  const [requirements, setRequirements] = useState(loadingRequirements)

  return (
    <div className={baseClass} data-component-id={elementName}>
      <Container id={elementName} className={`${baseClass}_container`}>
        {/* === HEADER === */}
        <div className={`${baseClass}_header`}>
          <Title hierarchy='h2' size='2xl' weight='bold' className={`${baseClass}_title`} color='neutral'>
            Requisitos de Admisión
          </Title>
        </div>

        {/* === MAIN CONTENT - TWO COLUMNS === */}
        <div className={`${baseClass}_main-content`}>
          {/* === LEFT COLUMN - CIRCULAR CHART === */}
          <div className={`${baseClass}_chart-container`}>
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
                  const radius = 350
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
                <circle cx='400' cy='400' r='175' className={`${baseClass}_chart-center`} />

                {/* Center text */}
                <text x='400' y='385' textAnchor='middle' className={`${baseClass}_chart-total-label`}>
                  Total
                </text>
                <text x='400' y='425' textAnchor='middle' className={`${baseClass}_chart-total-value`}>
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
                  const labelRadius = 260 // Más cerca del centro, dentro del segmento
                  const centerX = 400
                  const centerY = 400

                  // Calcular posición del label
                  const labelX = centerX + labelRadius * Math.cos(midAngleRad)
                  const labelY = centerY + labelRadius * Math.sin(midAngleRad)

                  return (
                    <g key={`label-${requirement.id}`}>
                      {/* Texto del porcentaje */}
                      <text
                        x={labelX}
                        y={labelY - 8}
                        textAnchor='middle'
                        className={`${baseClass}_chart-label-percentage`}
                        data-requirement={requirement.id}
                        style={{ cursor: 'pointer' }}>
                        {requirement.percentage}%
                      </text>

                      {/* Texto del título */}
                      <text
                        x={labelX}
                        y={labelY + 14}
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
          </div>

          {/* === RIGHT COLUMN - CONTENT PANELS === */}
          <div className={`${baseClass}_content-container`}>
            {requirements.map((requirement, index) => (
              <div
                key={requirement.id}
                className={`${baseClass}_content-panel ${index === 0 ? 'is-active' : ''}`}
                data-requirement={requirement.id}
                data-content-panel={requirement.id}>
                <div className={`${baseClass}_panel-header`}>
                  <div className={`${baseClass}_panel-icon ${baseClass}_panel-icon--${requirement.color}`}>
                    <i className={requirement.icon}></i>
                  </div>
                  <div className={`${baseClass}_panel-title`}>
                    <Title hierarchy='h3' className={`${baseClass}_panel-main-title`}>
                      {requirement.title}
                    </Title>
                    <Caption color='neutral' size='md' className={`${baseClass}_panel-subtitle`}>
                      {requirement.percentage}% del proceso de evaluación
                    </Caption>
                  </div>
                </div>

                <div className={`${baseClass}_panel-content`}>
                  <ul className={`${baseClass}_items-list`}>
                    {requirement.items.map((item, itemIndex) => (
                      <li key={itemIndex} className={`${baseClass}_list-item`}>
                        <div className={`${baseClass}_item-check`}>
                          <i className='ph ph-check'></i>
                        </div>
                        <span className={`${baseClass}_item-text`}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
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
