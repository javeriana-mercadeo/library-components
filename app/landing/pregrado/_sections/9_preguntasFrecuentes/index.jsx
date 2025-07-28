'use client'
import { Title, Container } from '@library/components'

import { useEffect } from 'react'

import script from './script.js'
import './styles.scss'

const PreguntasFrecuentes = () => {
  {
    /*Ejecutar el script cuando el componente se monta*/
  }
  useEffect(() => {
    script()
  }, [])

  return (
    <section id="section-eleven">
      <Container className="container faq">
        <div>
          <Title className="faq__title" hierarchy="h2">
            Preguntas Frecuentes
          </Title>
          <div className="faq__container">
            {/* Primera pregunta expandida por defecto */}
            <div className="faq__item active">
              <button className="faq__question">
                ¿Cuál es el perfil de ingreso al programa?
                <span className="faq__icon">
                  <i className="ph ph-caret-down"></i>
                </span>
              </button>
              <div className="faq__answer">
                <div className="faq__sub-questions">
                  <p className="faq__sub-question">¿Cuáles son los pasos para inscribirme en la universidad?</p>
                  <p className="faq__sub-question">¿Cuáles son los requisitos para aplicar a un programa de pregrado o posgrado?</p>
                  <p className="faq__sub-question">¿Dónde puedo consultar las fechas clave del proceso de admisión?</p>
                  <p className="faq__sub-question">¿Qué documentos necesito para completar mi inscripción?</p>
                  <p className="faq__sub-question">¿Cuándo y cómo recibiré los resultados de admisión?</p>
                  <p className="faq__sub-question">¿Cómo subo mis documentos a la plataforma?</p>
                  <p className="faq__sub-question">¿Cómo funciona la entrevista o prueba de admisión, si mi programa la requiere?</p>
                </div>
              </div>
            </div>

            {/* Preguntas colapsadas */}
            <div className="faq__item">
              <button className="faq__question">
                ¿Qué debo tener en cuenta al momento de realizar la inscripción?
                <span className="faq__icon">
                  <i className="ph ph-caret-up"></i>
                </span>
              </button>
              <div className="faq__answer">
                <div className="faq__sub-questions">
                  <p className="faq__sub-question">¿Cuáles son los pasos para inscribirme en la universidad?</p>
                  <p className="faq__sub-question">¿Cuáles son los requisitos para aplicar a un programa de pregrado o posgrado?</p>
                  <p className="faq__sub-question">¿Dónde puedo consultar las fechas clave del proceso de admisión?</p>
                  <p className="faq__sub-question">¿Qué documentos necesito para completar mi inscripción?</p>
                  <p className="faq__sub-question">¿Cuándo y cómo recibiré los resultados de admisión?</p>
                  <p className="faq__sub-question">¿Cómo subo mis documentos a la plataforma?</p>
                  <p className="faq__sub-question">¿Cómo funciona la entrevista o prueba de admisión, si mi programa la requiere?</p>
                </div>
              </div>
            </div>

            <div className="faq__item">
              <button className="faq__question">
                ¿Qué oportunidades tendré para desarrollarme profesionalmente?
                <span className="faq__icon">
                  <i className="ph ph-caret-down"></i>
                </span>
              </button>
              <div className="faq__answer">
                <div className="faq__sub-questions">
                  <p className="faq__sub-question">¿Cuáles son los pasos para inscribirme en la universidad?</p>
                  <p className="faq__sub-question">¿Cuáles son los requisitos para aplicar a un programa de pregrado o posgrado?</p>
                  <p className="faq__sub-question">¿Dónde puedo consultar las fechas clave del proceso de admisión?</p>
                  <p className="faq__sub-question">¿Qué documentos necesito para completar mi inscripción?</p>
                  <p className="faq__sub-question">¿Cuándo y cómo recibiré los resultados de admisión?</p>
                  <p className="faq__sub-question">¿Cómo subo mis documentos a la plataforma?</p>
                  <p className="faq__sub-question">¿Cómo funciona la entrevista o prueba de admisión, si mi programa la requiere?</p>
                </div>
              </div>
            </div>

            <div className="faq__item">
              <button className="faq__question">
                Estoy interesado en la investigación, ¿Qué oferta tiene el programa?
                <span className="faq__icon">
                  <i className="ph ph-caret-down"></i>
                </span>
              </button>
              <div className="faq__answer">
                <p>Información sobre las oportunidades de investigación disponibles en el programa.</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
export default PreguntasFrecuentes
