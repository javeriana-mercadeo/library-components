'use client'

import { useEffect } from 'react'
import { Container, Caption, Title, Paragraph, Button as Btn } from '@library/components'
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
<<<<<<< HEAD
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
=======
      type: 'normal'
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
    },
    {
      id: 'data-puj-academic-level',
      icon: 'ph-student',
<<<<<<< HEAD
      label: 'Nivel Académico',
=======
      label: 'Nivel académico',
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
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
      id: 'data-puj-modality',
      icon: 'ph-sun',
      label: 'Modalidad',
      value: 'Cargando modalidad...',
      type: 'normal'
    },
    {
      id: 'data-puj-price',
      icon: 'ph-piggy-bank',
<<<<<<< HEAD
      label: 'Inversión Semestre',
=======
      label: 'Inversión <span data-puj-periodicity="true">cargando periodo...</span>',
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
      value: 'Cargando inversión...',
      type: 'normal'
    },
    {
      id: 'data-puj-clock',
      icon: 'ph-clock',
<<<<<<< HEAD
      label: 'Horarios',
      value: 'Cargando horarios...',
      type: 'normal'
    }
    /* {
=======
      label: 'Horario',
      value: 'Cargando horario...',
      type: 'editable'
    } /* ,
    {
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
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
    } */
  ]

  return (
    <div className={baseClass}>
      <Container id={elementName} className={`${baseClass}_container`}>
        {/* === FACULTAD === */}
        <div className={`${baseClass}_faculty-container`}>
<<<<<<< HEAD
          <Caption className={`${baseClass}_faculty`} color="primary" size="md" bold={true} isEditable={false}>
            Facultad de{' '}
          </Caption>
          <Caption data-puj-faculty="true" className={`${baseClass}_faculty`} color="primary" size="md" bold={true} isEditable={false}>
=======
          <Caption className={`${baseClass}_faculty`} size='md' bold={true} isEditable={false}>
            Facultad de{' '}
          </Caption>
          <Caption data-puj-faculty className={`${baseClass}_faculty`} size='md' bold={true} isEditable={false}>
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
            Cargando facultad...
          </Caption>
        </div>

        {/* === TÍTULO === */}
<<<<<<< HEAD
        <Title hierarchy="h1" isEditable={false} className={`${baseClass}_title`}>
          <Caption id={`${elementName}_title-program`} className={`${baseClass}_title-program`} data-puj-name="true">
            Ingeniería Civil:
          </Caption>{' '}
=======
        <Title hierarchy='h1' isEditable={false} className={`${baseClass}_title`}>
          <Caption id={`${elementName}_title-study`} className={`${baseClass}_title-program`}>
            Estudia{' '}
          </Caption>
          <Caption id={`${elementName}_title-program`} className={`${baseClass}_title-program`} data-puj-name>
            Ingeniería Civil:{' '}
          </Caption>
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
          <Caption id={`${elementName}_title-secondary`}>Construyendo el Futuro Sostenible de Colombia</Caption>
        </Title>

        {/* === SNIES === */}
<<<<<<< HEAD
        <Caption
          data-puj-snies="true"
          className={`${baseClass}_snies`}
          id={`${elementName}-snies`}
          color="neutral"
          size="md"
          isEditable={false}>
=======
        <Caption data-puj-snies className={`${baseClass}_snies`} id={`${elementName}-snies`} color='neutral' size='md' isEditable={false}>
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
          Cargando SNIES...
        </Caption>

        {/* === DESCRIPCIÓN === */}
        <Paragraph className={`${baseClass}_description`} id={`${elementName}-description`}>
          Diseña y gestiona proyectos de infraestructura civil con un{' '}
          <strong>enfoque sostenible y responsable con el medio ambiente</strong>. Aprende a optimizar recursos considerando aspectos
          técnicos, económicos y éticos. En nuestra carrera de Ingeniería Civil, elige entre distintos énfasis según tu interés y accede a
          laboratorios y tecnología de vanguardia para potenciar tu aprendizaje.
        </Paragraph>

        {/* === VIDEOS RESPONSIVOS === */}
<<<<<<< HEAD
        <div className={`${baseClass}_media`} data-video-mobile="HxlTZ8DQAaY" data-video-desktop="IWZvfiu3gX4" data-breakpoint="768">
          {/* Placeholder para videos que se cargarán via JavaScript */}
        </div>

        {/* === DETALLES DEL PROGRAMA === */}
        <div className="program-details">
=======
        <div className={`${baseClass}_media`}>
          <div
            className={`${baseClass}_video-container`}
            id={`${elementName}-video-container`}
            data-component='video-player'
            data-video-desktop-url='https://www.javeriana.edu.co/recursosdb/d/info-prg/administracion-de-empresas-7-1'
            data-video-mobile-url='https://www.javeriana.edu.co/recursosdb/d/info-prg/landing-administracion-de-empresas-mobile-vive-javeriana-360p-h264-'
            data-image-fallback='https://www.javeriana.edu.co/recursosdb/d/info-prg/img-20200414-wa0023?imagePreview=1'></div>
        </div>

        {/* === DETALLES DEL PROGRAMA === */}
        <div className='program-details'>
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
          {details.map((detail, index) => (
            <ProgramDetail key={detail.id || `detail-${index}`} {...detail} />
          ))}
        </div>

        {/* === FECHAS DE INSCRIPCIÓN === */}
<<<<<<< HEAD
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
=======
        <div className='program-dates-container'>
          <div className='program-dates program-dates--dates'>
            <div className='program-dates_icon'>
              <i className='ph ph-calendar-check'></i>
            </div>

            <div className='program-dates_content'>
              <Caption className='program-dates_label' color='neutral' size='md' isEditable={false}>
                Fechas de cierre de inscripciones
              </Caption>

              <div data-puj-registration-dates className='program-dates_dates'>
                {/* Las fechas se cargarán dinámicamente via JavaScript */}
                <div className='program-dates_date-item'>
                  <Paragraph className='program-dates_date-period' color='neutral' size='md' bold={true} isEditable={false}>
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
                    Cargando fechas...
                  </Paragraph>
                </div>
              </div>
            </div>
          </div>

          <Btn
<<<<<<< HEAD
            target="_blank"
            id={`${elementName}-enrollment-link`}
            className="program-data_enrollment-link mt-6"
            href="https://www.javeriana.edu.co/info-prg/centro-de-ayuda"
            variant="flat"
            startIcon={<i className="ph ph-hand-pointing"></i>}
            size="sm">
            Conoce el proceso de inscripción
          </Btn>

          <Paragraph id={`${elementName}-enrollment-note`} className={`${baseClass}_enrollment-note`} size="sm">
            *Aspirantes 2025: El valor de matrícula corresponde al costo fijado para el año 2025.
=======
            id={`${elementName}-enrollment-link-1`}
            className='program-data_enrollment-link mt-6'
            href='https://www.javeriana.edu.co/info-prg/proceso_de_inscripcion'
            target='_blank'
            variant='flat'
            startIcon={<i className='ph ph-hand-pointing'></i>}
            size='sm'>
            Conoce el proceso de inscripción
          </Btn>

          <Paragraph className={`${baseClass}_enrollment-note`} size='sm' isEditable={false}>
            *Aspirantes a ingresar a la Universidad en 2026: Aprovecha este valor hasta el 03 de octubre de 2025. Después, habrá incrementos
            graduales. ¡Infórmate sobre nuestras opciones de financiación y becas para aprovechar este beneficio!
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
          </Paragraph>
        </div>

        {/* === INFORMACIÓN LEGAL === */}
        <div className={`${baseClass}_enrollment`}>
          <div className={`${baseClass}_enrollment-note-container`}>
<<<<<<< HEAD
            <Paragraph data-puj-snies="true" className={`${baseClass}_enrollment-note`} size="sm" isEditable={false}>
              Cargando SNIES...
            </Paragraph>

            <Paragraph id={`${elementName}-enrollment-legal`} className={`${baseClass}_enrollment-note`} size="sm">
=======
            <Paragraph data-puj-snies className={`${baseClass}_enrollment-note`} size='sm' isEditable={false}>
              Cargando SNIES...
            </Paragraph>

            <Paragraph id={`${elementName}-enrollment-legal`} className={`${baseClass}_enrollment-note`} size='sm'>
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
              {' '}
              | Resolución de Registro Calificado: 9406 del 27 de mayo de 2022, vigente hasta el 27 de mayo de 2030. | Resolución de
              Acreditación de Alta Calidad: 9406 del 27 de mayo del 2022, vigente por 8 años, hasta el 27 de mayo de 2030.
            </Paragraph>

<<<<<<< HEAD
            <Paragraph className={`${baseClass}_enrollment-note`} size="sm" isEditable={false}>
=======
            <Paragraph className={`${baseClass}_enrollment-note`} size='sm' isEditable={false}>
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
              {' '}
              | Duración estimada:{' '}
            </Paragraph>

<<<<<<< HEAD
            <Paragraph data-puj-duration="true" className={`${baseClass}_enrollment-note`} size="sm" isEditable={false}>
              Cargando duración...
            </Paragraph>

            <Paragraph className={`${baseClass}_enrollment-note`} size="sm" isEditable={false}>
=======
            <Paragraph data-puj-duration='true' className={`${baseClass}_enrollment-note`} size='sm' isEditable={false}>
              Cargando duración...
            </Paragraph>

            <Paragraph className={`${baseClass}_enrollment-note`} size='sm' isEditable={false}>
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
              {' '}
              / Lugar donde se oferta:{' '}
            </Paragraph>

<<<<<<< HEAD
            <Paragraph data-puj-location="true" className={`${baseClass}_enrollment-note`} size="sm" isEditable={false}>
=======
            <Paragraph data-puj-full-location className={`${baseClass}_enrollment-note`} size='sm' isEditable={false}>
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
              Cargando lugar...
            </Paragraph>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default DatosProgramaVideo
