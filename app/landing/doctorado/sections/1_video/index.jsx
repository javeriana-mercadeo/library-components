'use client'

import { useEffect } from 'react'
import { Button, Container } from '@library/components'
import InfoItem from './components/InfoItem'
import script from './script.js'
import info from './info.json'
import './styles.scss'

const Video = () => {
  const elementName = info.id || 'video-doctorado'

  // Inicializar script cuando el componente se monta
  useEffect(() => {
    script()
  }, [])

  // Configuración de items del programa
  const programItems = [
    {
      id: 'data-puj-title-graduation',
      icon: 'ph-graduation-cap',
      label: 'Título',
      value: 'Cargando...',
      type: 'normal'
    },
    {
      id: 'data-puj-academic-level',
      icon: 'ph-student',
      label: 'Nivel Académico',
      value: 'Cargando...',
      type: 'normal'
    },
    {
      id: 'data-puj-duration',
      icon: 'ph-calendar-dots',
      label: 'Duración',
      value: 'Cargando...',
      type: 'normal'
    },
    {
      id: 'data-puj-modality',
      icon: 'ph-sun',
      label: 'Modalidad',
      value: 'Cargando...',
      type: 'normal'
    },
    {
      id: 'data-puj-schedule',
      icon: 'ph-clock',
      label: 'Horarios',
      value: 'Cargando...',
      type: 'modal',
      modalId: 'modal-horarios-doctorado',
      modalContent: (
        <div className='program-data__modal-content'>
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
        </div>
      )
    },
    {
      id: 'data-puj-price',
      icon: 'ph-piggy-bank',
      label: (
        <span>
          Inversión <span data-puj-periodicity>Semestre</span>
        </span>
      ),
      value: 'Cargando...',
      type: 'normal'
    }
  ]

  return (
    <section className='video-doctorado' id={elementName} data-component='video-doctorado'>
      {/* Background con video/imagen */}
      <div className='video-doctorado__background'>
        {/* === VIDEOS RESPONSIVOS === */}
        <div className='video-doctorado__media'>
          <div
            className='video-doctorado__video-container'
            id={`${elementName}-video-container`}
            data-component='video-player'
            data-video-desktop-url='https://www.javeriana.edu.co/recursosdb/d/info-prg/administracion-de-empresas-7-1'
            data-video-mobile-url='https://www.javeriana.edu.co/recursosdb/d/info-prg/landing-administracion-de-empresas-mobile-vive-javeriana-360p-h264-'
            data-image-fallback='https://www.javeriana.edu.co/recursosdb/d/info-prg/img-20200414-wa0023?imagePreview=1'></div>
        </div>

        <div className='video-doctorado__overlay'></div>
      </div>

      {/* Contenido principal */}
      <div className='video-doctorado__container'>
        <div className='video-doctorado__content'>
          <Container>
            <div className='video-doctorado__header'>
              <h1 className='video-doctorado__title' data-puj-name>
                Doctorado en Ciencias Sociales y Humanas
              </h1>

              <p className='video-doctorado__description' data-puj-description>
                Comprende, analiza y explica los complejos problemas sociales y humanos en un contexto globalizado.
              </p>
            </div>

            {/* Información del programa */}
            <div className='video-doctorado__info'>
              <div className='video-doctorado__info-grid'>
                {programItems.map((item, index) => (
                  <InfoItem key={item.id || `item-${index}`} {...item} animationOrder={index + 1} />
                ))}
              </div>

              <Button
                id={`${elementName}-enrollment-link`}
                className='enrollment-button'
                href='https://www.javeriana.edu.co/info-prg/proceso_de_inscripcion'
                target='_blank'
                variant='flat'
                startIcon={<i className='ph ph-hand-pointing'></i>}
                size='sm'>
                Conoce el proceso de inscripción
              </Button>

              {/* Información legal */}
              <div className='program-data_enrollment-note-container'>
                <p className='program-data_enrollment-note'>
                  <span data-puj-snies>SNIES 54104</span> | <span data-puj-registry>Cargando registro...</span>{' '}
                  <span data-puj-accreditation>Cargando acreditación...</span> | Lugar donde se oferta:{' '}
                  <span data-puj-full-location>Cargando lugar...</span> | Total de créditos:{' '}
                  <span data-puj-credits>Cargando créditos...</span>
                </p>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  )
}

export default Video
