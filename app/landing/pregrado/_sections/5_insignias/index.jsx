import { useScript } from '@hooks'
import { Container, Title } from '@/app/components'

import './styles.scss'

const Insignias = () => {
  const elementName = 'insignias'
  const staticMode = false // Cambiar a true para modo estático (evitar la carga del script en desarrollo [local])
  useScript(() => import('./script.js'), { staticMode })

  const reconocimientos = [
    {
      src: 'https://www.javeriana.edu.co/recursosdb/1372208/12527648/logo-ranking-the-latin-america.png',
      alt: 'Acreditación de Alta Calidad',
      description: 'Acreditación Institucional de Alta Calidad por 10 años (2020)'
    },
    {
      src: 'https://www.javeriana.edu.co/recursosdb/1372208/12527648/alta_calidad.png',
      alt: 'Impact Rankings',
      description: '1er en Colombia por nuestro compromiso con los ODS (2023).'
    },
    {
      src: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/logo-qs-empleabilidad-lp',
      alt: 'Merco',
      description: '1er en el sector educativo de Colombia (2023).'
    },
    {
      src: 'https://www.javeriana.edu.co/recursosdb/1372208/12527648/merco-img.png',
      alt: 'QS Ranking',
      description: '3ra en empleabilidad de nuestros graduados'
    },
    {
      src: 'https://www.javeriana.edu.co/recursosdb/1372208/12527648/THE+Impact+Rankings+2024_COL_RGB.jpg',
      alt: 'THE Ranking',
      description: 'Tercer lugar en Colombia y 36 en Latinoamérica entre 230 instituciones.'
    },
    {
      src: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/logo-qs-by-subject-lp',
      alt: 'ABET',
      description: 'Acreditados en ABET.'
    }
  ]

  return (
    <section id='section-five'>
      <Container className='container academic-carousel'>
        <Title id={`title-${elementName}`} hierarchy='h2' className='academic-carousel__title' size='lg' weight='bold'>
          Reconocimientos Académicos
        </Title>

        <div className='slider'>
          <div className='slider-track'>
            {/* Solo el grupo original - JS creará los duplicados */}
            <div className='slider-items slider-items--original'>
              {reconocimientos.map((reconocimiento, index) => (
                <div key={index} className='img-logos'>
                  <img src={reconocimiento.src} alt={reconocimiento.alt} />
                  <p>{reconocimiento.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Insignias
