'use client'

import { useEffect } from 'react'
import Container from '@library/components/container'
import script from './script.js'
import './styles.scss'
import Caption from '@/app/_library/components/contain/caption/index.jsx'

const ProgramDataVideo = () => {
  // Inicializar script del video
  useEffect(() => {
    script()
  }, [])

  const programDetails = [
    {
      icon: 'ph-graduation-cap',
      label: 'Título',
      value: 'Ingeniero Civil'
    },
    {
      icon: 'ph-student',
      label: 'Nivel Académico',
      value: 'Pregrado'
    },
    {
      icon: 'ph-calendar-dots',
      label: 'Duración',
      value: 'Ocho (8) semestres.'
    },
    {
      icon: 'ph-sun',
      label: 'Modalidad',
      value: 'Presencial / Diurna'
    },
    {
      icon: 'ph-piggy-bank',
      label: 'Inversión Semestre',
      value: '$18,059,000 Semestral*'
    },
    {
      icon: 'ph-sun',
      label: 'Costo Inscripción',
      value: '$150.000'
    }
  ]

  return (
    <Container id="program-data-video-section" className="program-data-video">
      <div className="program-container">
        {/* Contenido principal del programa */}
        <div className="program-content">
          <Caption className="program-content__faculty">Facultad de Ingeniería</Caption>

          <h1 className="program-content__title">
            <span className="highlight">Ingeniería Civil:</span> Construyendo el Futuro Sostenible de Colombia
          </h1>

          <p className="program-content__snies">SNIES 959</p>

          <p className="program-content__description">
            Diseña y gestiona proyectos de infraestructura civil con un{' '}
            <strong>enfoque sostenible y responsable con el medio ambiente</strong>. Aprende a optimizar recursos considerando aspectos
            técnicos, económicos y éticos. En nuestra carrera de Ingeniería Civil, elige entre distintos énfasis según tu interés y accede a
            laboratorios y tecnología de vanguardia para potenciar tu aprendizaje.
          </p>

          {/* Detalles del programa */}
          <div className="program-details">
            {programDetails.map((detail, index) => (
              <div key={index} className="program-details__item">
                <div className="program-details__icon">
                  <i className={`ph ${detail.icon}`}></i>
                </div>
                <div className="program-details__content">
                  <span className="program-details__label">{detail.label}</span>
                  <p className="program-details__value">{detail.value}</p>
                </div>
              </div>
            ))}

            {/* Fechas de cierre */}
            <div className="program-details__item program-details__dates">
              <div className="program-details__icon">
                <i className="ph ph-calendar-check"></i>
              </div>
              <div className="program-details__content">
                <span className="program-details__label">Fechas de cierre de inscripciones</span>
                <div className="dates-content">
                  <div className="date-item">
                    <span className="period">Segundo semestre 2025:</span> 30 de enero de 2025
                  </div>
                  <div className="date-item">
                    <span className="period">Primer semestre 2026:</span> 30 de junio de 2025
                  </div>
                  <div className="date-item">
                    <span className="period">Segundo semestre 2026:</span> 30 de enero de 2026
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Información de inscripción */}
          <div className="enrollment-section">
            <a href="#" className="enrollment-link">
              Conoce el proceso de inscripción
            </a>

            <p className="note">*Aspirantes 2025: El valor de matrícula corresponde al costo fijado para el año 2025.</p>
          </div>
        </div>

        {/* Video simplificado - Solo reproducción automática */}
        <div className="program-video" data-video-id="Yb6XUiG2ZWc">
          <iframe
            src="https://www.youtube.com/embed/Yb6XUiG2ZWc?autoplay=1&mute=1&loop=1&playlist=Yb6XUiG2ZWc&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=1&fs=0&cc_load_policy=0&end=&start="
            title="Video del programa Ingeniería Civil"
            allow="autoplay; encrypted-media"
            allowFullScreen
            loading="lazy"
            className="video-iframe"
            frameBorder="0"
          />
        </div>
      </div>
    </Container>
  )
}

export default ProgramDataVideo
