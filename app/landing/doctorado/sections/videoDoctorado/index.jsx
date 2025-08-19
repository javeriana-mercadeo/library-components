import React from 'react'
import './style.scss'

import Container from '@library/components/container'
import Title from '@library/components/contain/title'
import Paragraph from '@library/components/contain/paragraph'

const VideoDoctorado = ({ backgroundMedia = {} }) => {
  // Configuración estática - será editable en Liferay
  const config = {
    backgroundImage: 'videoDoctorado.gif',
    title: 'Doctorado en Ciencias Sociales y Humanas',
    description: 'Comprende, analiza y explica los complejos problemas sociales y humanos en un contexto globalizado.',
    degree: 'Doctor en Ciencias Sociales y Humanas.',
    sniesCode: 'SNIES 54104',
    academicLevel: 'Posgrado',
    duration: 'Cuatro (4) semestres.',
    modality: 'Presencial / Diurna',
    timeAvailability: 'Disponibilidad de tiempo completo.',
    semesterInvestment: '$19.871.000',
    inscription: 'Descubre cómo inscribirte',
    ctaLink: '/inscripciones',
    footnote: '*Opción de clase remota y sincrónica, disponible para los estudiantes que así lo requieran',
    // Nueva configuración para el media background
    ...backgroundMedia
  }

  const handleCtaClick = () => {
    // Redirigir usando la URL configurada
    const url = config.ctaLink || '/inscripciones'
    if (url.startsWith('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGkHIOgKcsuGGX5Sg7Lt4SqcKwZ0ckNYJHUw&s')) {
      window.open(url, '_blank')
    } else {
      window.location.href = url
    }
  }

  // Función para determinar el tipo de media
  const getMediaType = (url) => {
    if (!url) return 'image'
    
    const videoExtensions = ['mp4', 'webm', 'ogg', 'mov']
    const extension = url.split('.').pop()?.toLowerCase()
    
    return videoExtensions.includes(extension) ? 'video' : 'image'
  }

  // Renderizar el background media
  const renderBackgroundMedia = () => {
    const mediaUrl = config.backgroundUrl || config.backgroundImage
    const mediaType = config.mediaType || getMediaType(mediaUrl)

    if (mediaType === 'video') {
      return (
        <video
          className="video-doctorado__background-video"
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
        >
          <source src={mediaUrl} type="video/mp4" />
          {/* Fallback para navegadores que no soporten el video */}
          <div 
            className="video-doctorado__background-fallback"
            style={{ backgroundImage: `url(${config.backgroundImage})` }}
          />
        </video>
      )
    }

    return (
      <div 
        className="video-doctorado__background-image"
        style={{ backgroundImage: `url(${mediaUrl})` }}
      />
    )
  }

  return (
    <section className="video-doctorado">
      <div className="video-doctorado__background">
        {renderBackgroundMedia()}
        <div className="video-doctorado__overlay"></div>
      </div>

      <div className="video-doctorado__container">
        <div className="video-doctorado__content">
          <Container>
            <div className="video-doctorado__header">
              <h1 className="video-doctorado__title">{config.title}</h1>
              <p className="video-doctorado__description">{config.description}</p>
            </div>
          </Container>

          <div className="video-doctorado__info">
            <div className="video-doctorado__info-grid">
              <div className="info-item">
                <div className="info-item__icon">
                  <i className="ph ph-graduation-cap"></i>
                </div>
                <div className="info-item__content">
                  <span className="info-item__label">Título</span>
                  <span className="info-item__value">{config.degree}</span>
                  <span className="info-item__code">{config.sniesCode}</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-item__icon">
                  <i className="ph ph-student"></i>
                </div>
                <div className="info-item__content">
                  <span className="info-item__label">Nivel Académico</span>
                  <span className="info-item__value">{config.academicLevel}</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-item__icon">
                 <i className="ph ph-calendar-dots"></i>
                </div>
                <div className="info-item__content">
                  <span className="info-item__label">Duración & Modalidad</span>
                  <span className="info-item__value">{config.duration}</span>
                  <span className="info-item__modality">{config.modality}</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-item__icon">
                  <i className="ph ph-clock"></i>
                </div>
                <div className="info-item__content">
                  <span className="info-item__label">Modalidad</span>
                  <span className="info-item__value">{config.timeAvailability}</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-item__icon">
                  <i className="ph ph-piggy-bank"></i>
                </div>
                <div className="info-item__content">
                  <span className="info-item__label">Inversión Semestre</span>
                  <span className="info-item__value">{config.semesterInvestment}</span>
                  <span className="info-item__value">{config.inscription}</span>
                </div>
              </div>
            </div>

            <p className="video-doctorado__footnote">{config.footnote}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VideoDoctorado