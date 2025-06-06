'use client'

import { useEffect } from 'react'
import Container from '@library/components/container'
import Title from '@library/components/contain/title'
import Paragraph from '@library/components/contain/paragraph'

import script from './script.js'
import info from './info.json'
import './styles.scss'

const Experiencia = () => {
  const elementName = info.id || 'experiencia'
  const baseClass = 'experience-carousel'

  useEffect(() => {
    script()
  }, [])

  // Datos del carrusel - estos vendrán de Liferay
  const carouselData = [
    {
      type: 'image',
      src: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/dsc00979',
      alt: 'Estudiantes Javeriana',
      link: '#'
    },
    {
      type: 'testimonial',
      text: 'Actualmente me desempeño en la organización Terpel en el área de Inteligencia de Negocios. Mis funciones en la compañía son hacer estudios de mercado y encontrar oportunidades de mejora.',
      user: {
        name: 'Carlos Gómez',
        job: 'Analista de Negocios en Terpel',
        avatar: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/avatar-1',
        linkedin: '#'
      }
    },
    {
      type: 'video',
      videoId: 'IWZvfiu3gX4',
      link: '#'
    },
    {
      type: 'testimonial',
      text: 'La Javeriana me dio las herramientas para liderar proyectos empresariales. Hoy impulso estrategias de crecimiento en una multinacional.',
      user: {
        name: 'Anamaría López',
        job: 'Gerente de Estrategia en GlobalCorp',
        avatar: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/avatar-2',
        linkedin: '#'
      }
    }
  ]

  // Componente para renderizar imagen
  const ImageCard = ({ src, alt, link, index }) => (
    <a
      href={link}
      className={`${baseClass}__card-link`}
      data-lfr-editable-id={`experience-image-link-${index}`}
      data-lfr-editable-type="link">
      <div className={`${baseClass}__image-card`}>
        <img
          src={src}
          alt={alt}
          className={`${baseClass}__image`}
          data-lfr-editable-id={`experience-image-${index}`}
          data-lfr-editable-type="image"
        />
      </div>
    </a>
  )

  // Componente para renderizar testimonial
  const TestimonialCard = ({ text, user, index }) => (
    <div className={`${baseClass}__testimonial-card`}>
      <Paragraph className={`${baseClass}__testimonial-text`} id={`${elementName}-testimonial-text-${index}`} isEditable={false}>
        {text}
      </Paragraph>
      <div className={`${baseClass}__testimonial-user`}>
        <div className={`${baseClass}__testimonial-avatar`}>
          <img src={user.avatar} alt={user.name} data-lfr-editable-id={`experience-avatar-${index}`} data-lfr-editable-type="image" />
        </div>
        <div className={`${baseClass}__testimonial-info`}>
          <h4 className={`${baseClass}__testimonial-name`} data-lfr-editable-id={`experience-name-${index}`} data-lfr-editable-type="text">
            {user.name}
          </h4>
          <Paragraph className={`${baseClass}__testimonial-job`} id={`${elementName}-testimonial-job-${index}`} isEditable={false}>
            {user.job}
          </Paragraph>
        </div>
        <a
          href={user.linkedin}
          className={`${baseClass}__testimonial-linkedin`}
          data-lfr-editable-id={`experience-linkedin-${index}`}
          data-lfr-editable-type="link">
          <i className="ph ph-linkedin-logo"></i>
        </a>
      </div>
    </div>
  )

  // Componente para renderizar video
  const VideoCard = ({ videoId, link, index }) => (
    <a
      href={link}
      className={`${baseClass}__card-link`}
      data-lfr-editable-id={`experience-video-link-${index}`}
      data-lfr-editable-type="link">
      <div className={`${baseClass}__video-card`}>
        <div className={`${baseClass}__video-container`} data-video-id={videoId}>
          {/* El video se cargará via JavaScript */}
        </div>
      </div>
    </a>
  )

  // Función para renderizar el tipo de card correcto
  const renderCard = (item, index) => {
    switch (item.type) {
      case 'image':
        return <ImageCard key={index} {...item} index={index} />
      case 'testimonial':
        return <TestimonialCard key={index} {...item} index={index} />
      case 'video':
        return <VideoCard key={index} {...item} index={index} />
      default:
        return null
    }
  }

  return (
    <section className={`${baseClass}_container`}>
      <Container id={elementName} className={baseClass}>
        <Title hierarchy="h2" className={`${baseClass}__title`} id={`${elementName}-title`} size="2xl" weight="semibold" align="center">
          Vive la Experiencia Javeriana
        </Title>

        <Paragraph className={`${baseClass}__description`} id={`${elementName}-description`} align="center">
          Descubre historias inspiradoras, momentos únicos y experiencias de nuestros estudiantes a través de sus palabras, imágenes y
          videos.
        </Paragraph>

        <div className={`${baseClass}__carousel swiper`}>
          <div className={`${baseClass}__wrapper experience-swiper`}>
            <div className={`${baseClass}__slides swiper-wrapper`} role="list">
              {carouselData.map((item, index) => (
                <div key={index} className={`${baseClass}__slide swiper-slide`} role="listitem">
                  {renderCard(item, index)}
                </div>
              ))}
            </div>

            {/* Paginación */}
            <div className={`swiper-pagination ${baseClass}__pagination`} role="tablist" aria-label="Control de páginas del carrusel"></div>

            {/* Botones de navegación */}
            <button className={`swiper-slide-button ${baseClass}__prev`} aria-label="Ir al slide anterior" type="button">
              <i className="ph ph-arrow-circle-left" aria-hidden="true"></i>
            </button>
            <button className={`swiper-slide-button ${baseClass}__next`} aria-label="Ir al siguiente slide" type="button">
              <i className="ph ph-arrow-circle-right" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Experiencia
