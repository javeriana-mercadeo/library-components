'use client'
import { Container, Title } from '@library/components'

import './styles.scss'
import './script.js'

const InsigniasAlt = () => {
  const elementName = 'insignias-alt'

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
    <section id='section-five-alt' data-component='insignias-carousel' className='insignias-section'>
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

        <div className='carousel-wrapper' role='region' aria-label='Carrusel de reconocimientos académicos'>
          <div className='carousel-scroll-container'>
            <div className='carousel-track'>
              {/* Renderizar 3 grupos idénticos para loop infinito perfecto */}
              {[0, 1, 2].map(groupIndex => (
                <div key={`group-${groupIndex}`} className='carousel-group' aria-hidden={groupIndex > 0 ? 'true' : 'false'}>
                  {reconocimientos.map((item, idx) => (
                    <div key={`${groupIndex}-${item.id}-${idx}`} className='carousel-item'>
                      <div className='carousel-item__image-wrapper'>
                        <img
                          src={item.src}
                          alt={item.alt}
                          loading='lazy'
                          onError={e => handleImageError(e, item.srcFallback)}
                          className='carousel-item__image'
                        />
                      </div>
                      <p className='carousel-item__description'>{item.description}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default InsigniasAlt
