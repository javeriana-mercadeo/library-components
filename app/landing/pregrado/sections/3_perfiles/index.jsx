'use client'

import { useEffect } from 'react'
import Container from '@library/components/container'
import Paragraph from '@library/components/contain/paragraph'
import Title from '@library/components/contain/title'
import perfilIngresoImg from '../../../../../assets/perfiles/perfil-ingreso.png'
import perfilEgresoImg from '../../../../../assets/perfiles/perfil-egreso.png'
import script from './script.js'

import './styles.scss'

const Perfiles = () => {
  const base = 'perfiles-programa'
  useEffect(() => {
    script()
  }, [])

  return (
    <section id="section-three">
      <div className="color-container">
        <Container>
          <section className="program-profile">
            <Title className="program-profile__title">Este programa es para ti si...</Title>

            <div className="program-profile__accordion">
              <div className="program-profile__buttons">
                <button type="button" className="program-profile__accordion-button active" data-content="content-1">
                  <span>Perfil de Ingreso</span>
                </button>

                <button type="button" className="program-profile__accordion-button" data-content="content-2">
                  <span>Perfil de Egreso</span>
                </button>

                <button type="button" className="program-profile__accordion-button" data-content="content-3">
                  <span>Diferenciales</span>
                </button>
              </div>
              <div id="content-1" className="program-profile__content-item">
                <div className="program-profile__image_content">
                  <img src={perfilIngresoImg.src} alt="Perfil de Ingreso" className="program-profile__image" />
                </div>
                <div className="p-content">
                  <Paragraph id={`${base}-parrafo`} isEditable={true}>
                    Esperamos que los aspirantes al programa de Ingeniería Civil de la Universidad Javeriana tengan interés en diseñar,
                    construir y gestionar proyectos de infraestructura que transformen la sociedad de manera sostenible.
                  </Paragraph>
                  <br></br>
                  <h3>
                    <strong>Tu carrera es Ingeniería Civil si:</strong>
                  </h3>
                  <div className="program-profile__list">
                    <div className="program-profile__item">
                      <div className="program-profile__icon-container">
                        <i className="ph ph-check-circle"></i>
                      </div>
                      <Paragraph className="program-profile__text">
                        Te apasiona la solución de problemas en el diseño, construcción y operación de infraestructura civil.
                      </Paragraph>
                    </div>
                    <div className="program-profile__item">
                      <div className="program-profile__icon-container">
                        <i className="ph ph-check-circle"></i>
                      </div>
                      <Paragraph className="program-profile__text">
                        Tienes habilidades en matemáticas, análisis y resolución de problemas.
                      </Paragraph>
                    </div>
                    <div className="program-profile__item">
                      <div className="program-profile__icon-container">
                        <i className="ph ph-check-circle"></i>
                      </div>
                      <Paragraph className="program-profile__text">
                        Te interesa la sostenibilidad y el impacto ambiental de las construcciones.
                      </Paragraph>
                    </div>
                    <div className="program-profile__item">
                      <div className="program-profile__icon-container">
                        <i className="ph ph-check-circle"></i>
                      </div>
                      <Paragraph className="program-profile__text">
                        Disfrutas el trabajo en equipo en proyectos multidisciplinarios.
                      </Paragraph>
                    </div>
                  </div>
                </div>
              </div>
              <div id="content-2" className="program-profile__content-item hidden">
                <div className="program-profile__image_content">
                  <img src={perfilEgresoImg.src} alt="Perfil de Egreso" className="program-profile__image" />
                </div>
                <div className="p-content">
                  <Paragraph id={`${base}-parrafo-2`} isEditable={true}>
                    Los egresados de Ingeniería Civil de la Universidad Javeriana son profesionales capacitados para diseñar, construir y
                    gestionar proyectos de infraestructura con un enfoque sostenible y ético.
                  </Paragraph>
                  <br></br>
                  <h3>
                    <strong>Los egresados de Ingeniería Civil:</strong>
                  </h3>
                  <div className="program-profile__list">
                    <div className="program-profile__item">
                      <div className="program-profile__icon-container">
                        <i className="ph ph-check-circle"></i>
                      </div>
                      <Paragraph className="program-profile__text">
                        Aplican conocimientos técnicos para resolver problemas en todas las etapas del ciclo de vida de proyectos de
                        infraestructura civil.
                      </Paragraph>
                    </div>
                    <div className="program-profile__item">
                      <div className="program-profile__icon-container">
                        <i className="ph ph-check-circle"></i>
                      </div>
                      <Paragraph className="program-profile__text">
                        Integran factores sociales, económicos y ambientales en la toma de decisiones.
                      </Paragraph>
                    </div>
                    <div className="program-profile__item">
                      <div className="program-profile__icon-container">
                        <i className="ph ph-check-circle"></i>
                      </div>
                      <Paragraph className="program-profile__text">
                        Ejercen su profesión con responsabilidad ética y compromiso con el desarrollo sostenible.
                      </Paragraph>
                    </div>
                    <div className="program-profile__item">
                      <div className="program-profile__icon-container">
                        <i className="ph ph-check-circle"></i>
                      </div>
                      <Paragraph className="program-profile__text">
                        Demuestran liderazgo y trabajan en equipos interdisciplinarios de manera colaborativa y efectiva.
                      </Paragraph>
                    </div>
                  </div>
                </div>
              </div>
              <div id="content-3" className="program-profile__content-item hidden">
                <div className="program-profile__image_content">
                  <img src={perfilIngresoImg.src} alt="Perfil de Ingreso" className="program-profile__image" />
                </div>

                <div className="p-content">
                  <Paragraph id={`${base}-parrafo-3`} isEditable={true}>
                    La carrera de Ingeniería Civil en la Universidad Javeriana se distingue por su enfoque innovador y compromiso con la
                    sostenibilidad.
                  </Paragraph>
                  <br></br>
                  <h3>
                    <strong>Diferenciales del programa:</strong>
                  </h3>
                  <div className="program-profile__list">
                    <div className="program-profile__item">
                      <div className="program-profile__icon-container">
                        <i className="ph ph-check-circle"></i>
                      </div>
                      <Paragraph className="program-profile__text">
                        Uso de tecnología avanzada y herramientas digitales para la planificación y ejecución de proyectos.
                      </Paragraph>
                    </div>
                    <div className="program-profile__item">
                      <div className="program-profile__icon-container">
                        <i className="ph ph-check-circle"></i>
                      </div>
                      <Paragraph lassName="program-profile__text">
                        Formación interdisciplinaria con enfoque en soluciones innovadoras.
                      </Paragraph>
                    </div>
                    <div className="program-profile__item">
                      <div className="program-profile__icon-container">
                        <i className="ph ph-check-circle"></i>
                      </div>
                      <Paragraph className="program-profile__text">Compromiso con la sostenibilidad y el desarrollo social.</Paragraph>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Container>
      </div>
    </section>
  )
}
export default Perfiles
