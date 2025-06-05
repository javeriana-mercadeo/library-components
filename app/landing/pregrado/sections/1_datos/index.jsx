'use client'

import { useEffect } from 'react'
import Container from '@library/components/container'
import Title from '@/app/_library/components/contain/title'
import Caption from '@/app/_library/components/contain/caption'
import Paragraph from '@/app/_library/components/contain/paragraph'
import Btn from '@/app/_library/components/contain/btn'
import ProgramDetail from './components/ProgramDetail.jsx'

import script from './script.js'
import info from './info.json'
import './styles.scss'

const DatosProgramaVideo = () => {
  const elementName = info.id || 'datos-programa-video'
  const baseClass = 'program-data'

  // Inicializar script cuando el componente se monta
  useEffect(() => {
    script()
  }, [])

  // Configuración de todos los detalles del programa
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
      label: 'Duración',
      value: 'Cargando duración...',
      type: 'normal'
    },
    {
      id: 'data-puj-modality',
      icon: 'ph-sun',
      label: 'Modalidad',
      value: 'Cargando modalidad...',
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
      id: 'horarios-programa',
      icon: 'ph-clock',
      label: 'Horarios',
      value: 'Lunes a viernes: 7:00 a 11:00 a.m.',
      type: 'modal',
      modalContent: (
        <Paragraph className={`${baseClass}__modal-content`} id={`${elementName}-horarios-modal`}>
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
      )
    }
  ]

  return (
    <Container id={elementName} className={baseClass}>
      {/* === FACULTAD === */}
      <Caption
        data-puj-faculty="true"
        className={`${baseClass}_faculty`}
        id={`${elementName}-faculty`}
        color="primary"
        size="md"
        bold={true}
        isEditable={false}>
        Facultad de Ingeniería
      </Caption>

      {/* === TÍTULO === */}
      <Title hierarchy="h1" data-puj-name="true" className={`${baseClass}_title`} id={`${elementName}-title`}>
        <span className="lead">Ingeniería Civil:</span> Construyendo el Futuro Sostenible de Colombia
      </Title>

      {/* === SNIES === */}
      <Caption
        data-puj-snies="true"
        className={`${baseClass}_snies`}
        id={`${elementName}-snies`}
        color="neutral"
        size="md"
        isEditable={false}>
        Cargando SNIES...
      </Caption>

      {/* === DESCRIPCIÓN === */}
      <Paragraph className={`${baseClass}_description`} id={`${elementName}-description`}>
        Diseña y gestiona proyectos de infraestructura civil con un <strong>enfoque sostenible y responsable con el medio ambiente</strong>.
        Aprende a optimizar recursos considerando aspectos técnicos, económicos y éticos. En nuestra carrera de Ingeniería Civil, elige
        entre distintos énfasis según tu interés y accede a laboratorios y tecnología de vanguardia para potenciar tu aprendizaje.
      </Paragraph>

      {/* === VIDEOS RESPONSIVOS === */}
      <div className={`${baseClass}_media`} data-video-mobile="HxlTZ8DQAaY" data-video-desktop="IWZvfiu3gX4" data-breakpoint="768">
        {/* Placeholder para videos que se cargarán via JavaScript */}
      </div>

      {/* === DETALLES DEL PROGRAMA === */}
      <div className="program-details">
        {details.map((detail, index) => (
          <ProgramDetail key={detail.id || `detail-${index}`} {...detail} />
        ))}
      </div>

      {/* === FECHAS DE INSCRIPCIÓN === */}
      <div className="program-dates-container">
        <div className="program-dates program-dates--dates">
          <div className="program-dates_icon">
            <i className="ph ph-calendar-check"></i>
          </div>

          <div className="program-dates_content">
            <Caption className="program-dates_label" color="neutral" size="md" isEditable={false}>
              Fechas de cierre de inscripciones
            </Caption>

            <div data-puj-registration-dates="true" className="program-dates_dates">
              {/* Las fechas se cargarán dinámicamente via JavaScript */}
              <div className="program-dates_date-item">
                <Paragraph className="program-dates_date-period" color="neutral" size="md" bold={true} isEditable={false}>
                  Cargando fechas...
                </Paragraph>
              </div>
            </div>
          </div>
        </div>

        <Btn
          id={`${elementName}-enrollment-link`}
          className="program-data_enrollment-link mt-6"
          href="#"
          variant="flat"
          startIcon={<i className="ph ph-hand-pointing"></i>}
          size="sm">
          Conoce el proceso de inscripción
        </Btn>
      </div>

      {/* === INFORMACIÓN LEGAL === */}
      <div className={`${baseClass}_enrollment`}>
        <Paragraph id={`${elementName}-enrollment-note`} className={`${baseClass}_enrollment-note`} size="sm">
          *Aspirantes 2025: El valor de matrícula corresponde al costo fijado para el año 2025.
        </Paragraph>

        <div className={`${baseClass}_enrollment-note-container`}>
          <Paragraph data-puj-snies="true" className={`${baseClass}_enrollment-note`} size="sm" isEditable={false}>
            Cargando SNIES...
          </Paragraph>

          <Paragraph id={`${elementName}-enrollment-legal-note`} className={`${baseClass}_enrollment-note`} size="sm">
            {' '}
            | Resolución de Registro Calificado: 9406 del 27 de mayo de 2022, vigente hasta el 27 de mayo de 2030. | Resolución de
            Acreditación de Alta Calidad: 9406 del 27 de mayo del 2022, vigente por 8 años, hasta el 27 de mayo de 2030. | Duración del
            programa:{' '}
          </Paragraph>

          <Paragraph data-puj-duration="true" className={`${baseClass}_enrollment-note`} size="sm" isEditable={false}>
            Cargando duración...
          </Paragraph>

          <Paragraph className={`${baseClass}_enrollment-note`} size="sm" isEditable={false}>
            {' '}
            / Lugar donde se oferta:{' '}
          </Paragraph>

          <Paragraph data-puj-location="true" className={`${baseClass}_enrollment-note`} size="sm" isEditable={false}>
            Cargando lugar...
          </Paragraph>
        </div>
      </div>
    </Container>
  )
}

export default DatosProgramaVideo
