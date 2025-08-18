import React from 'react'
import { Title, Paragraph, Image } from '@library/components'

const ModalInvestigacion = ({ investigacion, onClose }) => {
  if (!investigacion) return null

  // Simular imágenes adicionales para la galería scrolleable
  const additionalImages = [
    `${investigacion.image}-2`,
    `${investigacion.image}-3`,
    `${investigacion.image}-4`
  ]

  return (
    <div className='investigations-modal-overlay active' onClick={onClose}>
      <div 
        className='investigations-modal'
        role='dialog'
        aria-modal='true'
        aria-labelledby='modal-title'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Columna izquierda - Galería de imágenes scrolleable */}
        <div className='investigations-modal__gallery'>
          <div className='investigations-modal__images-container'>
            {/* Imagen principal de la card */}
            <div className='investigations-modal__image-wrapper'>
              <Image
                src={investigacion.image}
                alt={investigacion.alt}
                className='investigations-modal__image'
                loading='lazy'
              />
            </div>
            
            {/* Imágenes adicionales */}
            {additionalImages.map((imgSrc, index) => (
              <div key={index} className='investigations-modal__image-wrapper'>
                <Image
                  src={imgSrc}
                  alt={`${investigacion.title} - Imagen ${index + 2}`}
                  className='investigations-modal__image'
                  loading='lazy'
                />
              </div>
            ))}
          </div>
        </div>

        {/* Columna derecha - Información */}
        <div className='investigations-modal__content'>
          {/* Header con botón de cerrar */}
          <div className='investigations-modal__header'>
            <button
              className='investigations-modal__close'
              onClick={onClose}
              aria-label='Cerrar modal'
              type='button'
            >
              <i className='ph ph-x'></i>
            </button>
          </div>

          {/* Información principal */}
          <div className='investigations-modal__info'>
            {/* Badge del año */}
            <span className='investigations-modal__badge'>{investigacion.year}</span>

            {/* Título */}
            <Title 
              hierarchy='h2' 
              size='xl' 
              weight='bold' 
              className='investigations-modal__title'
              id='modal-title'
            >
              {investigacion.title}
            </Title>

            {/* Metadatos en formato horizontal */}
            <div className='investigations-modal__metadata'>
              <div className='investigations-modal__metadata-item'>
                <span className='investigations-modal__label'>Fecha:</span>
                <span className='investigations-modal__value'>Enero 2024</span>
              </div>
              
              <div className='investigations-modal__metadata-item'>
                <span className='investigations-modal__label'>Estudiante:</span>
                <span className='investigations-modal__value'>María González</span>
              </div>
            </div>

            {/* Descripción expandida */}
            <div className='investigations-modal__description'>
              <Paragraph>
                {investigacion.description}
              </Paragraph>
              
              {/* Contenido adicional expandido */}
              <Paragraph>
                Esta investigación aborda los complejos desafíos que enfrentan las sociedades latinoamericanas 
                en el siglo XXI, analizando desde una perspectiva interdisciplinaria los factores económicos, 
                políticos y culturales que configuran la región.
              </Paragraph>
              
              <Paragraph>
                El estudio incluye un análisis comparativo entre diferentes países de la región, 
                identificando patrones comunes y particularidades específicas que contribuyen 
                a una mejor comprensión de la dinámica social contemporánea.
              </Paragraph>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalInvestigacion