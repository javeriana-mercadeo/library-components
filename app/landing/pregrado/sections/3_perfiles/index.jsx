'use client'

import { useEffect } from 'react'
import Container from '@library/components/container'
import Title from '@library/components/contain/title'
import Paragraph from '@library/components/contain/paragraph'
import Btn from '@library/components/contain/btn'
import Image from '@library/components/contain/image'

import script from './script.js'
import info from './info.json'
import './styles.scss'

const Perfiles = () => {
  const elementName = info.id || 'perfiles'
  const baseClass = 'program-profile'

  useEffect(() => {
    script()
  }, [])

  return (
    <section id="section-three">
      <div className="color-container">
        <Container id={elementName} className={baseClass}>
          <Title
            className={`${baseClass}__title`}
            id={`${elementName}-title`}
            hierarchy="h2"
            size="2xl"
            weight="bold"
            align="center"
            color="neutral">
            Este programa es para ti si...
          </Title>

          <div className={`${baseClass}__accordion`}>
            {/* Botones del acordeón */}
            <div className={`${baseClass}__buttons`}>
              <Btn
                fullWidth={true}
                id={`${elementName}-button-1`}
                className={`${baseClass}__accordion-button active`}
                data-content="content-1"
                variant="light"
                color="neutral">
                Perfil de Ingreso
              </Btn>

              <Btn
                fullWidth={true}
                id={`${elementName}-button-2`}
                className={`${baseClass}__accordion-button`}
                data-content="content-2"
                variant="light"
                color="neutral">
                Perfil de Egreso
              </Btn>

              <Btn
                fullWidth={true}
                id={`${elementName}-button-3`}
                className={`${baseClass}__accordion-button`}
                data-content="content-3"
                variant="light"
                color="neutral">
                Diferenciales
              </Btn>
            </div>

            {/* Perfil de Ingreso */}
            <div id="content-1" className={`${baseClass}__content-item`}>
              <div className={`${baseClass}__image_content`}>
                <Image
                  id={`${elementName}-image-1`}
                  src="https://www.javeriana.edu.co/recursosdb/d/info-prg/dsc00979"
                  alt="Perfil de Ingreso"
                  className={`${baseClass}__image`}
                />
              </div>

              <Paragraph id={`${elementName}-parrafo-1`}>
                <p>
                  Esperamos que los aspirantes al programa de Ingeniería Civil de la Universidad Javeriana tengan interés en diseñar,
                  construir y gestionar proyectos de infraestructura que transformen la sociedad de manera sostenible.
                </p>
                <h3>
                  <strong>Tu carrera es Ingeniería Civil si:</strong>
                </h3>
                <ul>
                  <li>Te apasiona la solución de problemas en el diseño, construcción y operación de infraestructura civil.</li>
                  <li>Tienes habilidades en matemáticas, análisis y resolución de problemas.</li>
                  <li>Te interesa la sostenibilidad y el impacto ambiental de las construcciones.</li>
                  <li>Disfrutas el trabajo en equipo en proyectos multidisciplinarios.</li>
                </ul>
              </Paragraph>
            </div>

            {/* Perfil de Egreso */}
            <div id="content-2" className={`${baseClass}__content-item hidden`}>
              <div className={`${baseClass}__image_content`}>
                <Image
                  id={`${elementName}-image-2`}
                  src="https://www.javeriana.edu.co/recursosdb/d/info-prg/dsc00859"
                  alt="Perfil de Egreso"
                  className={`${baseClass}__image`}
                />
              </div>

              <Paragraph id={`${elementName}-parrafo-2`}>
                <p>
                  Los egresados de Ingeniería Civil de la Universidad Javeriana son profesionales capacitados para diseñar, construir y
                  gestionar proyectos de infraestructura con un enfoque sostenible y ético.
                </p>

                <h3>
                  <strong>Los egresados de Ingeniería Civil:</strong>
                </h3>

                <ul>
                  <li>
                    Aplican conocimientos técnicos para resolver problemas en todas las etapas del ciclo de vida de proyectos de
                    infraestructura civil.
                  </li>
                  <li>Integran factores sociales, económicos y ambientales en la toma de decisiones.</li>
                  <li>Ejercen su profesión con responsabilidad ética y compromiso con el desarrollo sostenible.</li>
                  <li>Demuestran liderazgo y trabajan en equipos interdisciplinarios de manera colaborativa y efectiva.</li>
                </ul>
              </Paragraph>
            </div>

            {/* Diferenciales */}
            <div id="content-3" className={`${baseClass}__content-item hidden`}>
              <div className={`${baseClass}__image_content`}>
                <Image
                  id={`${elementName}-image-3`}
                  src="https://www.javeriana.edu.co/recursosdb/d/info-prg/dsc00979"
                  alt="Diferenciales del programa"
                  className={`${baseClass}__image`}
                />
              </div>

              <Paragraph id={`${elementName}-parrafo-3`}>
                <p>
                  La carrera de Ingeniería Civil en la Universidad Javeriana se distingue por su enfoque innovador y compromiso con la
                  sostenibilidad.
                </p>

                <h3>
                  <strong>Diferenciales del programa:</strong>
                </h3>

                <ul>
                  <li>Uso de tecnología avanzada y herramientas digitales para la planificación y ejecución de proyectos.</li>
                  <li>Formación interdisciplinaria con enfoque en soluciones innovadoras.</li>
                  <li>Compromiso con la sostenibilidad y el desarrollo social.</li>
                </ul>
              </Paragraph>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}

export default Perfiles
