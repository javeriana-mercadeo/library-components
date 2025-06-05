'use client'

import { useEffect } from 'react'
import Paragraph from '@library/components/contain/paragraph'
import Container from '@/app/_library/components/container'

import linkedInImg from './assets/linkedin.svg'

import script from './script.js'
import './styles.scss'

const ExperienciaJaveriana = () => {
  useEffect(() => {
    script()
  }, [])

  // Base para IDs únicos
  const base = 'experiencia-javeriana'

  // Datos del carrusel
  const carouselData = [
    {
      type: 'image',
      src: 'https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg',
      alt: 'Estudiantes Javeriana',
      link: '#'
    },
    {
      type: 'testimonial',
      text: 'Actualmente me desempeño en la organización Terpel en el área de Inteligencia de Negocios. Mis funciones en la compañía son hacer estudios de mercado y encontrar oportunidades de mejora, que permitan al área comercial, de mercadeo y financiera potenciar los resultados de la compañía.',
      user: {
        name: 'Carlos Gómez',
        job: 'Urbanista en CityScape',
        avatar: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
        linkedin: '#'
      }
    },
    {
      type: 'video',
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      link: '#'
    },
    {
      type: 'testimonial',
      text: 'La Javeriana me dio las herramientas para liderar proyectos empresariales. Hoy impulso estrategias de crecimiento en una multinacional.',
      user: {
        name: 'Anamaría López',
        job: 'Gerente de estrategia en GlobalCorp',
        avatar: 'https://gravatar.com/images/homepage/avatar-07.png',
        linkedin: '#'
      }
    },
    {
      type: 'video',
      src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
      link: '#'
    },
    {
      type: 'testimonial',
      text: 'Mi paso por la Javeriana fue clave para llegar a donde estoy. Ahora trabajo en diseño urbano, creando ciudades más inclusivas.',
      user: {
        name: 'Isabella Martínez',
        job: 'Economista',
        avatar: 'https://pfpmaker.com/images/ai/examples/first/results/result-pic-1.png',
        linkedin: '#'
      }
    }
  ]

  // Componente para renderizar imagen
  const ImageCard = ({ src, alt, link }) => (
    <a href={link} className="card-link-7">
      <div className="image-card-7">
        <img src={src} alt={alt} className="experience-carousel__image" />
      </div>
    </a>
  )

  // Componente para renderizar testimonial
  const TestimonialCard = ({ text, user, index }) => (
    <div className="testimonial-card">
      <Paragraph className="testimonial-text" id={`${base}-testimonial-text-${index}`}>
        {text}
      </Paragraph>
      <div className="testimonial-user">
        <div className="testimonial-avatar">
          <img src={user.avatar} alt={user.name} />
        </div>
        <div className="testimonial-info">
          <h4 className="testimonial-name">{user.name}</h4>
          <Paragraph className="testimonial-job" id={`${base}-testimonial-job-${index}`}>
            {user.job}
          </Paragraph>
        </div>
        <a href={user.linkedin} className="testimonial-linkedin">
          <i className="ph ph-linkedin-logo"></i>
        </a>
      </div>
    </div>
  )

  // Componente para renderizar video
  const VideoCard = ({ src, link }) => (
    <a href={link} className="card-link-video">
      <div className="video-card-7">
        <video src={src} className="experience-carousel__video" autoPlay muted playsInline />
      </div>
    </a>
  )

  // Función para renderizar el tipo de card correcto
  const renderCard = (item, index) => {
    switch (item.type) {
      case 'image':
        return <ImageCard key={index} {...item} />
      case 'testimonial':
        return <TestimonialCard key={index} {...item} index={index} />
      case 'video':
        return <VideoCard key={index} {...item} />
      default:
        return null
    }
  }

  return (
    <section id="section-seven">
      <Container className="container experience-carousel">
        <h2 className="experience-carousel__title">Vive la Experiencia Javeriana</h2>
        <Paragraph className="experience-carousel__description" id={`${base}-description`}>
          Descubre historias inspiradoras, momentos únicos y experiencias de nuestros estudiantes a través de sus palabras, imágenes y
          videos.
        </Paragraph>
        <div className="container swiper">
          <div className="card-wrapper experience-swiper">
            <ul className="card-list-7 swiper-wrapper">
              {carouselData.map((item, index) => (
                <li key={index} className="card-item-7 swiper-slide">
                  {renderCard(item, index)}
                </li>
              ))}
            </ul>
            {/* Botones de navegación */}
            <div className="swiper-slide-button experience-prev">
              <i className="ph ph-arrow-circle-left"></i>
            </div>
            <div className="swiper-slide-button experience-next">
              <i className="ph ph-arrow-circle-right"></i>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default ExperienciaJaveriana
