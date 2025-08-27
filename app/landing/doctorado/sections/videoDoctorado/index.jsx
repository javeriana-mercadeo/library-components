import React from 'react'
import './styles.scss'

let fragmentElement = null
let observer = null
let timeoutId = null

const VideoDoctorado = ({ 
  // Background configuration
  backgroundMedia = {
    backgroundUrl: 'https://cloudfront-us-east-1.images.arcpublishing.com/semana/BFV7EVLSUNEGJBWIRE4XO64FXM.gif',
    mediaType: 'image'
  },
  
  // Content configuration
  title = 'Doctorado en Ciencias Sociales y Humanas',
  description = 'Comprende, analiza y explica los complejos problemas sociales y humanos en un contexto globalizado.',
  
  // Program information
  degree = 'Doctor en Ciencias Sociales y Humanas.',
  sniesCode = 'SNIES 54104',
  academicLevel = 'Posgrado',
  duration = 'Cuatro (4) semestres.',
  modality = 'Presencial / Diurna',
  timeAvailability = 'Disponibilidad de tiempo completo.',
  semesterInvestment = '$19.871.000',
  inscription = 'Descubre cómo inscribirte',
  ctaLink = '/inscripciones',
  footnote = '*Opción de clase remota y sincrónica, disponible para los estudiantes que así lo requieran',
  
  // Advanced configuration
  showAnimations = true,
  isEditMode = false
}) => {

  // Función para actualizar background dinámicamente (idéntica a Liferay)
  function updateBackgroundFromEditableImage() {
    if (!fragmentElement) return

    const editableContainer = fragmentElement.querySelector('[data-editable="background-media"]')
    if (editableContainer) {
      const img = editableContainer.querySelector('img')
      if (img && img.src) {
        const backgroundDiv = fragmentElement.querySelector('.video-doctorado__background-container')
        if (backgroundDiv) {
          // Asegurar que la imagen se vea correctamente
          img.style.position = 'absolute'
          img.style.top = '0'
          img.style.left = '0'
          img.style.width = '100%'
          img.style.height = '100%'
          img.style.objectFit = 'cover'
          img.style.objectPosition = 'center'
        }
      }
    }
  }

  // Setup del background observer (igual que en Liferay)
  function setupBackgroundObserver() {
    // Solo ejecutar si NO está en modo edición
    if (isEditMode) return

    // Ejecutar cuando el componente se monta
    setTimeout(() => {
      updateBackgroundFromEditableImage()
    }, 100)
    
    // Observar cambios en el elemento editable
    observer = new MutationObserver(updateBackgroundFromEditableImage)
    
    timeoutId = setTimeout(() => {
      if (fragmentElement) {
        const editableElement = fragmentElement.querySelector('[data-editable="background-media"]')
        if (editableElement) {
          observer.observe(editableElement, { 
            childList: true, 
            subtree: true, 
            attributes: true,
            attributeFilter: ['src']
          })
        }
        updateBackgroundFromEditableImage()
      }
    }, 1000)
  }

  // Cleanup function
  function cleanup() {
    if (observer) {
      observer.disconnect()
      observer = null
    }
    
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  // Ref callback para configurar el elemento
  const setFragmentRef = (element) => {
    // Cleanup anterior si existe
    cleanup()
    
    fragmentElement = element
    
    if (element) {
      // Setup del observer cuando el elemento esté disponible
      setupBackgroundObserver()
    }
  }

  // Handle CTA click
  const handleCtaClick = () => {
    const url = ctaLink || '/inscripciones'
    
    try {
      if (url.startsWith('http://') || url.startsWith('https://')) {
        window.open(url, '_blank', 'noopener,noreferrer')
      } else {
        window.location.href = url
      }
    } catch (error) {
      console.error('Error al navegar:', error)
      window.location.href = url
    }
  }

  // Determine media type automatically
  const getMediaType = (url) => {
    if (!url) return 'image'
    
    const videoExtensions = ['mp4', 'webm', 'ogg', 'mov', 'avi']
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']
    
    try {
      const extension = url.split('.').pop()?.toLowerCase()
      
      if (videoExtensions.includes(extension)) return 'video'
      if (imageExtensions.includes(extension)) return 'image'
      
      return 'image'
    } catch (error) {
      console.warn('Error determinando tipo de media:', error)
      return 'image'
    }
  }

  // Render background media
  const renderBackgroundMedia = () => {
    const mediaUrl = backgroundMedia.backgroundUrl
    const mediaType = backgroundMedia.mediaType || getMediaType(mediaUrl)

    if (process.env.NODE_ENV === 'development') {
      console.log('🎬 VideoDoctorado - Media URL:', mediaUrl)
      console.log('🎬 VideoDoctorado - Media Type:', mediaType)
    }

    if (!mediaUrl) {
      console.warn('No se proporcionó URL para el background media')
      return <div className="video-doctorado__background-placeholder" />
    }

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
          preload="metadata"
          onError={(e) => {
            console.error('Error cargando video:', e)
            console.error('URL del video:', mediaUrl)
          }}
          onLoadStart={() => {
            if (process.env.NODE_ENV === 'development') {
              console.log('Iniciando carga de video:', mediaUrl)
            }
          }}
          onLoadedData={() => {
            if (process.env.NODE_ENV === 'development') {
              console.log('Video cargado exitosamente')
            }
          }}
        >
          <source src={mediaUrl} type="video/mp4" />
          <div 
            className="video-doctorado__background-fallback"
            style={{ backgroundImage: `url(${backgroundMedia.backgroundUrl})` }}
            role="img"
            aria-label="Imagen de fondo del doctorado"
          />
        </video>
      )
    }

    return (
      <div 
        className="video-doctorado__background-image"
        style={{ 
          backgroundImage: `url(${mediaUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
        role="img"
        aria-label="Imagen de fondo del doctorado"
        onLoad={() => {
          if (process.env.NODE_ENV === 'development') {
            console.log('Imagen cargada exitosamente')
          }
        }}
        onError={(e) => {
          console.error('Error cargando imagen:', e)
          console.error('URL de la imagen:', mediaUrl)
        }}
      />
    )
  }

  const sectionClasses = `video-doctorado ${showAnimations ? 'with-animations' : ''}`

  return (
    <section 
      ref={setFragmentRef}
      className={sectionClasses} 
      role="main" 
      aria-labelledby="doctorado-title"
    >
      {/* Background Media */}
      <div className="video-doctorado__background" aria-hidden="true">
        <div 
          className="video-doctorado__background-container"
          data-editable="background-media"
        >
          {renderBackgroundMedia()}
        </div>
        <div className="video-doctorado__overlay"></div>
      </div>

      {/* Main Content */}
      <div className="video-doctorado__container">
        <div className="video-doctorado__content">
          
          {/* Header */}
          <div className="container">
            <div className="video-doctorado__header">
              <h1 id="doctorado-title" className="video-doctorado__title">
                {title}
              </h1>
              <p className="video-doctorado__description">
                {description}
              </p>
            </div>
          </div>

          {/* Program Information */}
          <div className="video-doctorado__info" role="region" aria-label="Información del programa">
            <div className="video-doctorado__info-grid">
              
              {/* Title */}
              <div className="info-item" role="article">
                <div className="info-item__icon" aria-hidden="true">
                  <i className="ph ph-graduation-cap"></i>
                </div>
                <div className="info-item__content">
                  <span className="info-item__label">Título</span>
                  <span className="info-item__value">{degree}</span>
                  <span className="info-item__code">{sniesCode}</span>
                </div>
              </div>

              {/* Academic Level */}
              <div className="info-item" role="article">
                <div className="info-item__icon" aria-hidden="true">
                  <i className="ph ph-student"></i>
                </div>
                <div className="info-item__content">
                  <span className="info-item__label">Nivel Académico</span>
                  <span className="info-item__value">{academicLevel}</span>
                </div>
              </div>

              {/* Duration & Modality */}
              <div className="info-item" role="article">
                <div className="info-item__icon" aria-hidden="true">
                  <i className="ph ph-calendar-dots"></i>
                </div>
                <div className="info-item__content">
                  <span className="info-item__label">Duración & Modalidad</span>
                  <span className="info-item__value">{duration}</span>
                  <span className="info-item__modality">{modality}</span>
                </div>
              </div>

              {/* Modality */}
              <div className="info-item" role="article">
                <div className="info-item__icon" aria-hidden="true">
                  <i className="ph ph-clock"></i>
                </div>
                <div className="info-item__content">
                  <span className="info-item__label">Modalidad</span>
                  <span className="info-item__value">{timeAvailability}</span>
                </div>
              </div>

              {/* Investment */}
              <div className="info-item" role="article">
                <div className="info-item__icon" aria-hidden="true">
                  <i className="ph ph-piggy-bank"></i>
                </div>
                <div className="info-item__content">
                  <span className="info-item__label">Inversión Semestre</span>
                  <span className="info-item__value">{semesterInvestment}</span>
                  {inscription && (
                    <span className="info-item__value">
                      <button 
                        onClick={handleCtaClick}
                        aria-label={`${inscription} - Abrir información de inscripciones`}
                      >
                        {inscription}
                      </button>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Footnote */}
            {footnote && (
              <p className="video-doctorado__footnote">
                {footnote}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default VideoDoctorado