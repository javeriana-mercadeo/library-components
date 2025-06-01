'use client'

import { useEffect } from 'react'
import Container from '@library/components/container/Container'

import script from './script.js'
import './styles.scss'

const Reconocimientos = () => {
  // Ejecutar el script cuando el componente se monta
  useEffect(() => {
    script()
  }, [])

  return (
    <Container>
      <section id="section-five">
      <div className="container academic-carousel">
        <h2 className="academic-carousel__title">Reconocimientos Académicos</h2>
        <section>
          <div className="slider">
            <div className="slider-items">
              <div className="img-logos">
                <img 
                  src="./assets/images/alta-calidad.png"
                  alt="Acreditación de Alta Calidad"
                />
                <p>Acreditación Institucional de Alta Calidad por 10 años (2020)</p>
              </div>
              <div className="img-logos">
                <img 
                  src="./assets/images/impact-rankings.png"
                  alt="Impact Rankings"
                />
                <p>1er en Colombia por nuestro compromiso con los ODS (2023).</p>
              </div>
              <div className="img-logos">
                <img 
                  src="./assets/images/merco.png"
                  alt="Merco"
                />
                <p>1er en el sector educativo de Colombia (2023).</p>
              </div>
              <div className="img-logos">
                <img 
                  src="./assets/images/qs-ranking.png"
                  alt="QS Ranking"
                />
                <p>3ra en empleabilidad de nuestros graduados</p>
              </div>
              <div className="img-logos">
                <img 
                  src="./assets/images/The-acreditada.png"
                  alt="THE Ranking"
                />
                <p>Tercer lugar en Colombia y 36 en Latinoamérica entre 230 instituciones.</p>
              </div>
              <div className="img-logos">
                <img 
                  src="./assets/images/obet.png" 
                  alt="ABET"
                />
                <p>Acreditados en ABET.</p>
              </div>
              <div className="img-logos">
                <img 
                  src="./assets/images/alta-calidad.png"
                  alt="Acreditación de Alta Calidad"
                />
                <p>Acreditación Institucional de Alta Calidad por 10 años (2020)</p>
              </div>
              <div className="img-logos">
                <img 
                  src="./assets/images/impact-rankings.png"
                  alt="Impact Rankings"
                />
                <p>1er en Colombia por nuestro compromiso con los ODS (2023).</p>
              </div>
              <div className="img-logos">
                <img 
                  src="./assets/images/merco.png"
                  alt="Merco"
                />
                <p>1er en el sector educativo de Colombia (2023).</p>
              </div>
              <div className="img-logos">
                <img 
                  src="./assets/images/qs-ranking.png"
                  alt="QS Ranking"
                />
                <p>3ra en empleabilidad de nuestros graduados</p>
              </div>
              <div className="img-logos">
                <img 
                  src="./assets/images/The-acreditada.png"
                  alt="THE Ranking"
                />
                <p>Tercer lugar en Colombia y 36 en Latinoamérica entre 230 instituciones.</p>
              </div>
              <div className="img-logos">
                <img 
                  src="./assets/images/obet.png" 
                  alt="ABET"
                />
                <p>Acreditados en ABET.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
    </Container>
  )
}
export default Reconocimientos