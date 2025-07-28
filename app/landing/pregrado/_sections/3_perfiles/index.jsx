'use client'
import { Container, Title, Paragraph, Button, Image } from '@library/components'

import { useEffect } from 'react'

import info from './info.json'
import script from './script.js'
import './styles.scss'

const Perfiles = () => {
  const elementName = info.id || 'perfiles'
  const baseClass = 'program-profile'

  // Array con la información de las tabs
  const profileTabs = [
    {
      id: 'ingreso',
      label: 'Perfil de Ingreso',
      image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/dsc00979',
      alt: 'Perfil de Ingreso',
      content: (
        <>
          <p>
            Esperamos que los aspirantes al programa de Ingeniería Civil de la Universidad Javeriana tengan interés en diseñar, construir y
            gestionar proyectos de infraestructura que transformen la sociedad de manera sostenible.
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
        </>
      )
    },
    {
      id: 'egreso',
      label: 'Perfil de Egreso',
      image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/dsc00859',
      alt: 'Perfil de Egreso',
      content: (
        <>
          <p>
            Los egresados de Ingeniería Civil de la Universidad Javeriana son profesionales capacitados para diseñar, construir y gestionar
            proyectos de infraestructura con un enfoque sostenible y ético.
          </p>
          <h3>
            <strong>Los egresados de Ingeniería Civil:</strong>
          </h3>
          <ul>
            <li>
              Aplican conocimientos técnicos para resolver problemas en todas las etapas del ciclo de vida de proyectos de infraestructura
              civil.
            </li>
            <li>Integran factores sociales, económicos y ambientales en la toma de decisiones.</li>
            <li>Ejercen su profesión con responsabilidad ética y compromiso con el desarrollo sostenible.</li>
            <li>Demuestran liderazgo y trabajan en equipos interdisciplinarios de manera colaborativa y efectiva.</li>
          </ul>
        </>
      )
    },
    {
      id: 'desempeño',
      label: 'En lo que me puedo desempeñar',
      image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/dsc00979',
      alt: 'Campo laboral',
      content: (
        <>
          <p>
            Los egresados de Ingeniería Civil tienen un amplio campo de acción profesional en el sector público y privado, contribuyendo al
            desarrollo sostenible de la sociedad.
          </p>
          <h3>
            <strong>Campos de desempeño profesional:</strong>
          </h3>
          <ul>
            <li>Diseño y construcción de obras civiles: edificaciones, carreteras, puentes y sistemas de infraestructura.</li>
            <li>Gerencia y dirección de proyectos de construcción e infraestructura.</li>
            <li>Consultoría en ingeniería estructural, geotécnica, hidráulica y ambiental.</li>
            <li>Investigación y desarrollo en nuevas tecnologías de construcción sostenible.</li>
            <li>Gestión de recursos hídricos y sistemas de saneamiento urbano y rural.</li>
          </ul>
        </>
      )
    }
  ]

  useEffect(() => {
    script()
  }, [])

  return (
    <section className={`${baseClass}-section`}>
      <Container id={elementName} className={baseClass}>
        <div className={`${baseClass}__tabs-container`}>
          {/* Navegación de tabs */}
          <div className={`${baseClass}__tabs-nav`} role="tablist" aria-label="Perfiles del programa">
            <ul className={`${baseClass}__tabs-list`}>
              {profileTabs.map((tab, index) => (
                <li key={tab.id} role="presentation">
                  <button
                    className={`${baseClass}__tab-button`}
                    id={`${tab.id}-tab`}
                    data-tabs-target={`#${tab.id}-panel`}
                    type="button"
                    role="tab"
                    aria-controls={`${tab.id}-panel`}
                    aria-selected={index === 0 ? 'true' : 'false'}
                    tabIndex={index === 0 ? 0 : -1}>
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contenido de las tabs */}
          <div className={`${baseClass}__tabs-content`}>
            {profileTabs.map((tab, index) => (
              <div
                key={tab.id}
                className={`${baseClass}__tab-panel ${index !== 0 ? 'hidden' : ''}`}
                id={`${tab.id}-panel`}
                role="tabpanel"
                aria-labelledby={`${tab.id}-tab`}
                aria-hidden={index !== 0 ? 'true' : 'false'}>
                <div className={`${baseClass}__content-wrapper`}>
                  <div className={`${baseClass}__image-container`}>
                    <Image src={tab.image} alt={tab.alt} className={`${baseClass}__image`} isEditable={false} />
                  </div>
                  <div className={`${baseClass}__text-container`}>
                    <div className={`${baseClass}__paragraph`}>
                      {tab.content}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Perfiles
