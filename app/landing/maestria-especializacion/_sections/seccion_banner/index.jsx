'use client'

import { useEffect } from 'react'
import { Container, Icon, Caption, Title, Paragraph, Button as Btn } from '@library/components'

import script from './script.js'
import info from './info.json'
import './styles.scss'

const Maestria = () => {
  const elementName = info.id || 'maestria'
  const baseClass = 'maestria-banner'

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
      type: 'normal'
    },
    {
      id: 'data-puj-price',
      icon: 'ph-piggy-bank',
      label: 'Inversión Semestre',
      value: 'Cargando inversión...',
      type: 'normal'
    },
    {
      id: 'data-puj-modality',
      icon: 'ph-sun',
      label: 'Modalidad',
      value: 'Cargando modalidad...',
      type: 'normal'
    },
    // {
    //   id: 'data-puj-credits',
    //   icon: 'ph-calculator',
    //   label: 'Numero de Creditos',
    //   value: 'Cargando numero de creditos...',
    //   type: 'normal'
    // },
    {
      id: 'data-puj-clock',
      icon: 'ph-clock',
      label: 'Horarios',
      value: 'Cargando horario...',
      type: 'modal',
      modalId: 'maestria-modal-horarios'
    }
  ]

  const renderDetail = detail => {
    const { id, icon, label, value, type, modalId } = detail

    return (
      <div key={id} className={`${baseClass}__detail-item`}>
        <Icon id={`icon-${id}`} icon={icon} size='md' className={`${baseClass}__detail-icon`} />
        <div className={`${baseClass}__detail-text`}>
          <p className={`${baseClass}__detail-label`}>{label}</p>

          {type === 'normal' && (
            <p className={`${baseClass}__detail-value`} data-puj-attribute={id}>
              {value}
            </p>
          )}

          {type === 'modal' && (
            <div className={`${baseClass}__detail-modal-trigger`}>
              <Btn
                data-modal-target={modalId}
                className={`${baseClass}__detail-button`}
                variant='flat'
                size='sm'
                endIcon={<i className='ph ph-info'></i>}
                onClick={e => {
                  e.preventDefault()
                }}
                isEditable={false}>
                Ver detalles
              </Btn>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <section className={`${baseClass}__container`}>
      <Container id={elementName} className={baseClass}>
        <div className={`${baseClass}__content-wrapper`}>
          {/* Información principal */}
          <div className={`${baseClass}__main-content`}>
            <Caption className={`${baseClass}__faculty`} size='md' bold={true} isEditable={false}>
              Facultad de{' '}
            </Caption>
            <Caption data-puj-faculty className={`${baseClass}__faculty`} size='md' bold={true} isEditable={false}>
              Cargando facultad...
            </Caption>

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

          {/* Detalles del programa */}
          <div className={`${baseClass}__details-content`}>
            <div className={`${baseClass}__details-grid`}>
              {details.map(detail => renderDetail(detail))}

              {/* Fechas de inscripción */}
              <div className={`${baseClass}__dates-container`}>
                <div className={`${baseClass}__dates`}>
                  <div className={`${baseClass}__dates-icon`}>
                    <i className='ph ph-calendar-check'></i>
                  </div>

                  <div className={`${baseClass}__dates-content`}>
                    <Caption className={`${baseClass}__dates-label`} color='neutral' size='md' isEditable={false}>
                      Fechas de cierre de inscripciones
                    </Caption>

                    <div data-puj-registration-dates='true' className={`${baseClass}__dates-list`}>
                      <div className={`${baseClass}__dates-item`}>
                        <Paragraph className={`${baseClass}__dates-period`} color='neutral' size='md' bold={true} isEditable={false}>
                          Cargando fechas...
                        </Paragraph>
                      </div>
                    </div>
                  </div>
                </div>
                <Btn
                  id={`${elementName}-info-link`}
                  className={`${baseClass}__info-link mt-6`}
                  href='https://www.javeriana.edu.co/info-prg/proceso_de_inscripcion'
                  target='_blank'
                  variant='flat'
                  startIcon={<i className='ph ph-hand-pointing'></i>}
                  size='sm'>
                  Conoce el proceso de inscripción
                </Btn>
              </div>

              {/* Créditos */}
              <div className='__credit'>
                <div className={`${baseClass}__detail-item `}>
                  <Icon id='icon-calculator_detail-item' icon='ph-calculator' size='md' className={`${baseClass}__detail-icon`} />
                  <div className={`${baseClass}__detail-text`}>
                    <p className={`${baseClass}__detail-label`}>Número de Créditos</p>
                    {/* Versión dinámica (comentada hasta que data-puj-credits esté disponible) */}
                    {/* <p className={`${baseClass}__detail-value`} data-puj-attribute='data-puj-credits'>
                          Cargando numero de creditos...
                        </p> */}
                    {/* Versión manual (temporal) */}
                    <p id={`${elementName}_info-detail`} className={`${baseClass}__detail-value`}>38 créditos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Información legal */}
        <div className={`${baseClass}__info`}>
          <div className={`${baseClass}__info-note-container`}>
            <Paragraph className={`${baseClass}__info-note`} size='sm' isEditable={false}>
              <span data-puj-snies>Cargando SNIES...</span> |{/* <span data-puj-registry>Cargando registro...</span> */}{' '}
              {/* <span data-puj-accreditation>Cargando acreditación...</span>  */}
            </Paragraph>
            <Paragraph id={`${elementName}_info-registro`} className={`${baseClass}__info-note`} size='sm'>
              Registro...
            </Paragraph>
            <Paragraph id={`${elementName}_info-acreditacion`} className={`${baseClass}__info-note`} size='sm'>
              | acreditación...
            </Paragraph>
            <Paragraph className={`${baseClass}__info-note`} size='sm' isEditable={false}>
              {/* <span data-puj-registry>Cargando registro...</span> */}{' '}
              {/* <span data-puj-accreditation>Cargando acreditación...</span>  */}
             | Duración estimada: <span data-puj-duration>Cargando duración...</span> | Lugar donde se oferta:{' '}
              <span data-puj-full-location>Cargando lugar...</span>
            </Paragraph>
          </div>
        </div>
      </Container>

      {/* Modal de Horarios */}
      <div id='maestria-modal-horarios' className={`${baseClass}__modal`}>
        <div className={`${baseClass}__modal-content`}>
          <div className={`${baseClass}__modal-header`}>
            <h3 className={`${baseClass}__modal-title`}>Horarios</h3>
            <button className={`${baseClass}__modal-close`} aria-label='Cerrar modal'>
              <i className='ph ph-x'></i>
            </button>
          </div>
          <div className={`${baseClass}__modal-body`}>
            <div className={`${baseClass}__modal-text`}>
              <Paragraph className={`${baseClass}__modal-paragraph`} id={`${elementName}-horarios-modal`}>
                <p>
                  <strong>Jornada de atención:</strong>
                </p>
                <ul>
                  <li>
                    <strong>Lunes a viernes:</strong> 7:00 a.m. a 11:00 a.m.
                  </li>
                  <li>
                    <strong>Sábados:</strong> 8:00 a.m. a 12:00 p.m. (solo con cita previa)
                  </li>
                </ul>
                <p>
                  Si necesitas atención en un horario diferente, por favor comunícate con nosotros con antelación para agendar una cita
                  personalizada.
                </p>
              </Paragraph>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Maestria
