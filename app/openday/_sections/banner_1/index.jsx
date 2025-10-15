'use client'
import { useEffect } from 'react'
import { Container, Title, Paragraph, Btn } from '@/app/components/index.js'

import script from './script.js'
import info from './info.json'
import './styles.scss'

const Banner = () => {
  const elementName = info.id || 'open-day-banner'
  const baseClass = 'open-day-banner'

  // Inicializar script cuando el componente se monta
  useEffect(() => {
    script()
  }, [])

  return (
    <section id={elementName} className={`${baseClass} section`}>
      <img
        src='https://www.javeriana.edu.co/recursosdb/d/info-prg/background-1'
        alt='Laboratorio de Ciencias'
        className={`${baseClass}_hero-image`}
        data-lfr-editable-id='open-day-hero-image'
        data-lfr-editable-type='image'
      />

      <div className={`${baseClass}_overlay`}>
        <Container className={`${baseClass}_container`}>
          <div className={`${baseClass}_logo-container`}>
            <img
              src='https://www.javeriana.edu.co/recursosdb/d/info-prg/ciencias?imagePreview=1'
              alt='Open Day Logo'
              className={`${baseClass}_logo`}
              data-lfr-editable-id='open-day-logo'
              data-lfr-editable-type='image'
            />
          </div>

          <div className={`${baseClass}_content`}>
            <div className={`${baseClass}_faculty-tag`}>
              <span className={`${baseClass}_faculty-text`} data-lfr-editable-id='open-day-faculty' data-lfr-editable-type='rich-text'>
                Facultad de Ciencias
              </span>
            </div>

            <Title id='open-day-main-title' hierarchy='h1' className={`${baseClass}_main-title`} size='3xl' weight='bold'>
              ¡Descubre cómo puedes transformar el mundo a través de la ciencia!
            </Title>

            <Paragraph id='open-day-description' className={`${baseClass}_description`}>
              La ciencia y la investigación son fundamentales para cuidar para el futuro. En nuestro Open Day podrás experimentar, conocer
              laboratorios, hablar con profesores y conocer todo lo que implica ser un investigador.
            </Paragraph>

            <div className={`${baseClass}_event-info`}>
              <div className={`${baseClass}_info-item`}>
                <p className={`${baseClass}_info-label`}>
                  <i className='ph ph-calendar'></i> Fecha
                </p>
                <span className={`${baseClass}_info-text`} data-lfr-editable-id='open-day-date' data-lfr-editable-type='rich-text'>
                  Lunes 5 de junio
                </span>
              </div>

              <div className={`${baseClass}_info-item`}>
                <p className={`${baseClass}_info-label`}>
                  <i className='ph ph-clock'></i> Hora
                </p>
                <span className={`${baseClass}_info-text`} data-lfr-editable-id='open-day-time' data-lfr-editable-type='rich-text'>
                  2:00 p.m. a 5:00 p.m.
                </span>
              </div>

              <div className={`${baseClass}_info-item`}>
                <p className={`${baseClass}_info-label`}>
                  <i className='ph ph-map-pin-line'></i> Ubicación
                </p>
                <span className={`${baseClass}_info-text`} data-lfr-editable-id='open-day-location' data-lfr-editable-type='rich-text'>
                  Auditorio Principal
                </span>
              </div>
            </div>

            <div className={`${baseClass}_cta-container`}>
              <Btn href='#form_SF' variant='shadow' isEditable={false}>
                Inscríbete Ahora
              </Btn>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}

export default Banner
