'use client'
import { Title, Paragraph, Container, Image, Icon } from '@library/components'

import script from './script.js'
import info from './info.json'
import './styles.scss'

const Experiencia = () => {
  const elementName = info.id || 'experiencia'
  const baseClass = 'experience-carousel'

  // Inicializar script manualmente cuando el componente se monta
  if (typeof window !== 'undefined') {
    // Usar setTimeout para asegurar que el DOM esté completamente renderizado
    setTimeout(() => {
      if (typeof script === 'function') {
        script()
      }
    }, 100)
  }

  // Datos del carrusel - estos vendrán de Liferay
  const carouselData = [
    {
      type: 'image',
      src: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/dsc00979',
      alt: 'Estudiantes Javeriana',
      link: '#'
    },
    {
      type: 'video',
      orientation: 'vertical',
      videoId: 'coJHjliTbKM'
    },
    {
      type: 'testimonial',
      text: 'Actualmente me desempeño en la organización Terpel en el área de Inteligencia de Negocios. Mis funciones en la compañía son hacer estudios de mercado y encontrar oportunidades de mejora.',
      user: {
        name: 'Carlos Gómez',
        job: 'Analista de Negocios en Terpel',
        avatar:
          'https://www.javeriana.edu.co/olife7/adaptive-media/imagenes7/12773710/Preview-1000x0/CarlosAlbertoHerna%CC%81ndez.png?t=1719869232728',
        linkedin: '#'
      }
    },
    {
      type: 'video',
      orientation: 'vertical',
      videoId: 'IWZvfiu3gX4',
      link: '#'
    },
    {
      type: 'testimonial',
      text: 'La Javeriana me dio las herramientas para liderar proyectos empresariales. Hoy impulso estrategias de crecimiento en una multinacional.',
      user: {
        name: 'Anamaría López',
        job: 'Gerente de Estrategia en GlobalCorp',
        avatar:
          'https://www.javeriana.edu.co/olife7/adaptive-media/imagenes7/12773745/Preview-1000x0/CarlosEduardoNietoG.png?t=1719869506461',
        linkedin: '#'
      }
    }
    // {
    //   type: 'video',
    //   orientation: 'vertical',
    //   videoId: 'wUmYyNrVjfg'
    // }
  ]

  // Componente para renderizar imagen
  const ImageCard = ({ src, alt, link }) => (
    <a href={link} target='' className={`${baseClass}__card-link`}>
      <div className={`${baseClass}__image-card`}>
        <Image src={src} alt={alt} className={`${baseClass}__image`} isEditable={false} />
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
          <Image src={user.avatar} alt={user.name} data-lfr-editable-id={`experience-avatar-${index}`} data-lfr-editable-type='image' />
        </div>
        <div className={`${baseClass}__testimonial-info`}>
          <h4 className={`${baseClass}__testimonial-name`} data-lfr-editable-id={`experience-name-${index}`} data-lfr-editable-type='text'>
            {user.name}
          </h4>
          <Paragraph className={`${baseClass}__testimonial-job`} id={`${elementName}-testimonial-job-${index}`} isEditable={false}>
            {user.job}
          </Paragraph>
        </div>
        <a href={user.linkedin} className={`${baseClass}__testimonial-linkedin`} target='_blank' rel='noopener noreferrer'>
          <Icon icon='ph-linkedin-logo' isEditable={false} size='xs' />
        </a>
      </div>
    </div>
  )

  // Componente simplificado para videos sin miniatura
  const VideoCard = ({ videoId, orientation, index }) => {
    const aspectRatio = orientation === 'vertical' ? '9/16' : '16/9'
    const isFirstVideo = index === 0
    const isHorizontal = orientation === 'horizontal'

    return (
      <div
        className={`${baseClass}__video-card ${baseClass}__video-card--${orientation} ${isHorizontal ? `${baseClass}__video-card--double-width` : ''}`}>
        <div
          className={`${baseClass}__video-container`}
          data-video-id={videoId}
          data-video-orientation={orientation}
          data-is-first-video={isFirstVideo}
          style={{
            aspectRatio: aspectRatio
          }}>
          {/* El video se cargará directamente desde el script */}
        </div>
      </div>
    )
  }

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
        <Title hierarchy='h2' className={`${baseClass}__title`} id={`${elementName}-title`} size='2xl' weight='semibold' align='center'>
          Vive la Experiencia Javeriana
        </Title>

        <Paragraph className={`${baseClass}__description`} id={`${elementName}-description`} align='center'>
          Descubre historias inspiradoras, momentos únicos y experiencias de nuestros estudiantes a través de sus palabras, imágenes y
          videos.
        </Paragraph>

        <div className={`${baseClass}__carousel swiper`}>
          <div className={`${baseClass}__wrapper experience-swiper`}>
            <div className={`${baseClass}__slides swiper-wrapper`} role='list'>
              {carouselData.map((item, index) => (
                <div key={index} className={`${baseClass}__slide swiper-slide`} role='listitem'>
                  {renderCard(item, index)}
                </div>
              ))}
            </div>

            {/* Paginación - DENTRO del carousel como en 10_relacionados */}
            <div className={`swiper-pagination ${baseClass}__pagination`} role='tablist' aria-label='Control de páginas del carrusel'></div>

            {/* Botones de navegación */}
            <button className={`swiper-slide-button ${baseClass}__prev`} aria-label='Ir al slide anterior' type='button'>
              <i className='ph ph-arrow-circle-left' aria-hidden='true'></i>
            </button>
            <button className={`swiper-slide-button ${baseClass}__next`} aria-label='Ir al siguiente slide' type='button'>
              <i className='ph ph-arrow-circle-right' aria-hidden='true'></i>
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Experiencia
