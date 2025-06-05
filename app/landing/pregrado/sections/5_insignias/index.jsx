'use client'

import Container from '@library/components/container'
import altaCalidadImg from './assets/alta-calidad.png'
import impactRankingsImg from './assets/impact-rankings.png'
import mercoImg from './assets/merco.png'
import obetImg from './assets/qs-ranking.png'
import qsRankingImg from './assets/qs-ranking.png'
import theAcreditadaImg from './assets/The-acreditada.png'

import './styles.scss'

const Insignias = () => {
  // Datos de reconocimientos organizados en un array
  const reconocimientos = [
    {
      id: 1,
      src: altaCalidadImg.src,
      alt: 'Acreditación de Alta Calidad',
      description: 'Acreditación Institucional de Alta Calidad por 10 años (2020)'
    },
    {
      id: 2,
      src: impactRankingsImg.src,
      alt: 'Impact Rankings',
      description: '1er en Colombia por nuestro compromiso con los ODS (2023).'
    },
    {
      id: 3,
      src: mercoImg.src,
      alt: 'Merco',
      description: '1er en el sector educativo de Colombia (2023).'
    },
    {
      id: 4,
      src: qsRankingImg.src,
      alt: 'QS Ranking',
      description: '3ra en empleabilidad de nuestros graduados'
    },
    {
      id: 5,
      src: theAcreditadaImg.src,
      alt: 'THE Ranking',
      description: 'Tercer lugar en Colombia y 36 en Latinoamérica entre 230 instituciones.'
    },
    {
      id: 6,
      src: obetImg.src,
      alt: 'ABET',
      description: 'Acreditados en ABET.'
    }
  ]

  return (
    <section id="section-five">
      <Container className="container academic-carousel">
        <h2 className="academic-carousel__title">Reconocimientos Académicos</h2>
        <div className="slider">
          <div className="slider-track">
            {/* Primer grupo de tarjetas */}
            <div className="slider-items slider-items--original">
              {reconocimientos.map(reconocimiento => (
                <div key={reconocimiento.id} className="img-logos">
                  <img src={reconocimiento.src} alt={reconocimiento.alt} />
                  <p>{reconocimiento.description}</p>
                </div>
              ))}
            </div>
            {/* Segundo grupo de tarjetas (duplicado para efecto infinito) */}
            <div className="slider-items slider-items--duplicate">
              {reconocimientos.map(reconocimiento => (
                <div key={`duplicate-${reconocimiento.id}`} className="img-logos">
                  <img src={reconocimiento.src} alt={reconocimiento.alt} />
                  <p>{reconocimiento.description}</p>
                </div>
              ))}
            </div>
            {/* Tercer grupo para mayor fluidez */}
            <div className="slider-items slider-items--third">
              {reconocimientos.map(reconocimiento => (
                <div key={`third-${reconocimiento.id}`} className="img-logos">
                  <img src={reconocimiento.src} alt={reconocimiento.alt} />
                  <p>{reconocimiento.description}</p>
                </div>
              ))}
            </div>
            {/* Cuarto grupo para aún más fluidez */}
            <div className="slider-items slider-items--fourth">
              {reconocimientos.map(reconocimiento => (
                <div key={`fourth-${reconocimiento.id}`} className="img-logos">
                  <img src={reconocimiento.src} alt={reconocimiento.alt} />
                  <p>{reconocimiento.description}</p>
                </div>
              ))}
            </div>
            {/* Quinto grupo para máxima fluidez */}
            <div className="slider-items slider-items--fifth">
              {reconocimientos.map(reconocimiento => (
                <div key={`fifth-${reconocimiento.id}`} className="img-logos">
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
