'use client'
import { useScript } from '@hooks'
import { Container, Title } from '@/app/components'

import './styles.scss'

const InsigniasSwiper = () => {
  const elementName = 'insignias-swiper'
  const staticMode = false // Cambiar a true para modo estático (evitar la carga del script en desarrollo [local])
  useScript(() => import('./script.js'), { staticMode })

  const reconocimientos = [
    {
      id: 'the-latin-america',
      src: 'https://www.javeriana.edu.co/recursosdb/1372208/12527648/logo-ranking-the-latin-america.png',
      srcFallback: '/assets/insignias/The-acreditada.png',
      alt: 'THE Latin America Rankings',
      description: 'Tercer lugar en Colombia y 36 en Latinoamérica entre 230 instituciones.'
    },
    {
      id: 'alta-calidad',
      src: 'https://www.javeriana.edu.co/recursosdb/1372208/12527648/alta_calidad.png',
      srcFallback: '/assets/insignias/alta-calidad.png',
      alt: 'Acreditación de Alta Calidad',
      description: 'Acreditación Institucional de Alta Calidad por 10 años (2020)'
    },
    {
      id: 'qs-empleabilidad',
      src: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/logo-qs-empleabilidad-lp',
      srcFallback: '/assets/insignias/qs-ranking.png',
      alt: 'QS Empleabilidad',
      description: '3ra en empleabilidad de nuestros graduados'
    },
    {
      id: 'merco',
      src: 'https://www.javeriana.edu.co/recursosdb/1372208/12527648/merco-img.png',
      srcFallback: '/assets/insignias/merco.png',
      alt: 'MERCO',
      description: '1er en el sector educativo de Colombia (2023).'
    },
    {
      id: 'the-impact',
      src: 'https://www.javeriana.edu.co/recursosdb/1372208/12527648/THE+Impact+Rankings+2024_COL_RGB.jpg',
      srcFallback: '/assets/insignias/impact-rankings.png',
      alt: 'THE Impact Rankings',
      description: '1er en Colombia por nuestro compromiso con los ODS (2023).'
    },
    {
      id: 'qs-by-subject',
      src: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/logo-qs-by-subject-lp',
      srcFallback: '/assets/insignias/obet.png',
      alt: 'QS by Subject - ABET',
      description: 'Acreditados en ABET.'
    }
  ]

  // Handler para fallback de imágenes
  const handleImageError = (e, fallbackSrc) => {
    if (e.target.src !== fallbackSrc) {
      e.target.src = fallbackSrc
    }
  }

  return (
    <section id='section-five-swiper' data-component='insignias-swiper' className='insignias-section'>
      <Container className='container insignias-container'>
        <Title
          id={`title-${elementName}`}
          hierarchy='h2'
          className='insignias__title'
          size='lg'
          weight='bold'
          aria-label='Reconocimientos académicos de la Universidad Javeriana'>
          Reconocimientos Académicos
        </Title>

        {/* Swiper Container */}
        <div className='swiper insignias-swiper' role='region' aria-label='Carrusel de reconocimientos académicos'>
          <div className='swiper-wrapper'>
            {reconocimientos.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className='swiper-slide'>
                <div className='slide-content'>
                  <div className='slide-content__image-wrapper'>
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading='lazy'
                      onError={e => handleImageError(e, item.srcFallback)}
                      className='slide-content__image'
                    />
                  </div>
                  <p className='slide-content__description'>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Paginación */}
          <div className='swiper-pagination'></div>
        </div>
      </Container>
    </section>
  )
}

export default InsigniasSwiper
