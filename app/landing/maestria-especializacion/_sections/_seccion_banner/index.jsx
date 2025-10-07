'use client'

import { useEffect } from 'react'
import { Container, Icon, Caption, Title, Paragraph, Button as Btn } from '@library/components'

import script from './script.js'
import info from './info.json'
import './styles.scss'

const Maestria = () => {
  const elementName = info.id || 'maestria'
  const baseClass = 'mastership-banner'

  useEffect(() => {
    script()
  }, [])

  const details = [
    {
      id: 'data-puj-title-graduation',
      icon: 'ph-graduation-cap',
      label: 'Título',
      value: 'Cargando título...',
      type: 'normal'
    },
    {
      id: 'data-puj-academic-level',
      icon: 'ph-student',
      label: 'Nivel Académico',
      value: 'Cargando nivel académico...',
      type: 'normal'
    },
    {
      id: 'data-puj-duration',
      icon: 'ph-calendar-dots',
      label: 'Duración estimada',
      value: 'Cargando duración...',
      value2: 'Duración adicional...',
      prefix: 'Diurna',
      prefix2: 'Nocturna',
      type: 'doble'
    },
    {
      id: 'data-puj-price',
      icon: 'ph-piggy-bank',
      label: 'Inversión Semestre',
      value: 'Cargando inversión...',
      value2: 'Inversión adicional...',
      prefix: 'Diurno',
      prefix2: 'Nocturno',
      type: 'doble'
    },
    {
      id: 'data-puj-modality',
      icon: 'ph-sun',
      label: 'Modalidad',
      value: 'Cargando modalidad...',
      type: 'normal'
    },
    {
      id: 'data-puj-clock',
      icon: 'ph-clock',
      label: 'Horarios',
      value: 'Cargando horario...',
      value2: '',
      prefix: '',
      prefix2: 'Nocturno',
      type: 'normal'
    }
  ]

  const renderDetail = detail => {
    const { id, icon, label, value, value2, prefix, prefix2, type } = detail

    return (
      <div key={id} className={`${baseClass}__detail-item`}>
        <Icon icon={icon} size='md' className={`${baseClass}__detail-icon`} />
        <div className={`${baseClass}__detail-text`}>
          <p className={`${baseClass}__detail-label`}>{label}</p>

          {type === 'normal' && (
            <p className={`${baseClass}__detail-value`} data-puj-attribute={id}>
              {value}
            </p>
          )}

          {type === 'doble' && (
            <>
              {/* Caso 1: Ambos prefixes vacíos - mostrar solo value sin etiqueta */}
              {!prefix && !prefix2 && (
                <p className={`${baseClass}__detail-value`}>
                  <span data-puj-attribute={id}>{value}</span>
                </p>
              )}

              {/* Caso 2: Hay prefix - mostrar con etiqueta */}
              {prefix && (
                <p className={`${baseClass}__detail-value`}>
                  <strong>{prefix}:</strong> <span data-puj-attribute={id}>{value}</span>
                </p>
              )}

              {/* Caso 3: Hay prefix2 Y value2 - mostrar segundo valor con etiqueta */}
              {prefix2 && value2 && (
                <p className={`${baseClass}__detail-value`}>
                  <strong>{prefix2}:</strong> <span data-puj-attribute={`${id}-2`}>{value2}</span>
                </p>
              )}
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <section className={`${baseClass}_container`}>
      <Container id={elementName} className={baseClass}>
        <div className={`${baseClass}__content-wrapper`}>
          {/* Columna izquierda - Información principal */}
          <div className={`${baseClass}__main-content`}>
            <Caption className={`${baseClass}__faculty`} size='md' bold={true} isEditable={false}>
              Facultad de{' '}
            </Caption>
            <Caption data-puj-faculty className={`${baseClass}__faculty`} size='md' bold={true} isEditable={false}>
              Cargando facultad...
            </Caption>

            {/* === TÍTULO === */}
            <Title hierarchy='h1' isEditable={false} className={`${baseClass}__title`}>
              <Caption id={`${elementName}_title-study`} className={`${baseClass}__title-program`}>
                Estudia{' '}
              </Caption>
              <Caption id={`${elementName}_title-program`} className={`${baseClass}__title-program`} data-puj-name='true'>
                Maestría en Psicología Clínica:{' '}
              </Caption>
            </Title>

            <Paragraph id={`${elementName}_description`} className={`${baseClass}__description`}>
              Fortalece tus competencias clínicas e investigativas
            </Paragraph>
          </div>

          {/* Columna derecha - Detalles del programa */}
          <div className={`${baseClass}__details-content`}>
            <div className={`${baseClass}__details-grid`}>
              {details.map(detail => renderDetail(detail))}
              {/* === FECHAS DE INSCRIPCIÓN === */}
              <div className='program-dates-container'>
                <div className='program-dates program-dates--dates'>
                  <div className='program-dates_icon'>
                    <i className='ph ph-calendar-check'></i>
                  </div>

                  <div className='program-dates_content'>
                    <Caption className='program-dates_label' color='neutral' size='md' isEditable={false}>
                      Fechas de cierre de inscripciones
                    </Caption>

                    <div data-puj-registration-dates='true' className='program-dates_dates'>
                      <div className='program-dates_date-item'>
                        <Paragraph className='program-dates_date-period' color='neutral' size='md' bold={true} isEditable={false}>
                          Cargando fechas...
                        </Paragraph>
                      </div>
                    </div>
                  </div>
                </div>

                <Btn
                  id={`${elementName}-enrollment-link-1`}
                  className='mastership-banner_enrollment-link mt-6'
                  href='https://www.javeriana.edu.co/info-prg/proceso_de_inscripcion'
                  target='_blank'
                  variant='flat'
                  startIcon={<i className='ph ph-hand-pointing'></i>}
                  size='sm'>
                  Conoce el proceso de inscripción
                </Btn>
              </div>
            </div>
          </div>
        </div>

        {/* === INFORMACIÓN LEGAL === */}
        <div className={`${baseClass}_enrollment`}>
          <div className={`${baseClass}_enrollment-note-container`}>
            <Paragraph className={`${baseClass}_enrollment-note`} size='sm' isEditable={false}>
              <span data-puj-snies>Cargando SNIES...</span> | <span data-puj-registry>Cargando registro...</span>{' '}
              <span data-puj-accreditation>Cargando acreditación...</span> Duración estimada:{' '}
              <span data-puj-duration>Cargando duración...</span> | Lugar donde se oferta:{' '}
              <span data-puj-full-location>Cargando lugar...</span>
            </Paragraph>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Maestria
