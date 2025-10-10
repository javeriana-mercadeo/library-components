'use client'

import { useEffect, useState } from 'react'
import { Button, Container, Title, Paragraph } from '@library/components'
import InfoItem from './components/InfoItem'
import info from './info.json'
import script from './script.js'
import './styles.scss'

const Video = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      script()
    }
  }, [mounted])

  if (!mounted) return null

  const elementName = info.id || 'video-doctorado'

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
      value: '',
      type: 'modal',
      modalId: 'modal-horarios-doctorado',
      modalContent: (
        <Paragraph className='program-data__modal-content' id={`${elementName}-horarios-modal`}>
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
              <Title hierarchy='h1' size='3xl' className='video-doctorado__title' data-puj-name='true' id={`${elementName}-title`}>
                Doctorado en Ciencias Sociales y Humanas
              </Title>

              <Paragraph className='video-doctorado__description' size='lg' data-puj-description='true' id={`${elementName}-description`}>
                Comprende, analiza y explica los complejos problemas sociales y humanos en un contexto globalizado.
              </Paragraph>
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
                isEditable={false}
                startIcon={<i className='ph ph-hand-pointing'></i>}
                size='sm'>
                Conoce el proceso de inscripción
              </Button>

              {/* Información legal */}
              <div className='program-data_enrollment-note-container'>
                {/* <Paragraph className='program-data_enrollment-note' size='sm' isEditable={false}>
                  <span data-puj-snies='true'>SNIES 54104</span> | <span data-puj-registry='true'>Cargando registro...</span>{' '}
                  <span data-puj-accreditation='true'>Cargando acreditación...</span> | Lugar donde se oferta:{' '}
                  <span data-puj-full-location='true'>Cargando lugar...</span> | Total de créditos:{' '}
                  <span data-puj-credits='true'>Cargando créditos...</span>
                </Paragraph> */}

                <Paragraph className='program-data_enrollment-note' size='sm' isEditable={false}>
                  <span data-puj-snies='true'>SNIES 54104</span> |{' '}
                  <Paragraph as='span' size='sm' id={`${elementName}-registry`}>
                    <span data-puj-registry='true'>Registro calificado vigente</span>
                  </Paragraph>{' '}
                  |{' '}
                  <Paragraph as='span' size='sm' id={`${elementName}-accreditation`}>
                    <span data-puj-accreditation='true'>Acreditación de alta calidad</span>
                  </Paragraph>{' '}
                  | Lugar donde se oferta: <span data-puj-full-location='true'>Cargando lugar...</span>
                </Paragraph>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  )
}

export default Video
