'use client'

import Container from '@library/components/container'
import Title from '@library/components/contain/title'
import Paragraph from '@library/components/contain/paragraph'
import Image from '@library/components/contain/image'

import info from './info.json'
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
            <li>Quieres contribuir al desarrollo de ciudades y comunidades más eficientes y seguras.</li>
          </ul>
        </>
      )
    }
  ]

  return (
    <section id="section-three" className={`${baseClass}-section`}>
      <Container id={elementName} className={baseClass}>
        <Title
          className={`${baseClass}__title`}
          id={`${elementName}-title`}
          hierarchy="h2"
          size="2xl"
          weight="bold"
          align="center"
          color="white">
          Este programa es para ti si...
        </Title>

        <div className={`${baseClass}__tabs-container`}>
          {/* Tabs navigation */}
          <div className={`${baseClass}__tabs-nav`}>
            <ul
              className={`${baseClass}__tabs-list`}
              id="profile-tabs"
              data-tabs-toggle="#profile-tabs-content"
              data-tabs-active-classes="active"
              data-tabs-inactive-classes=""
              role="tablist">
              {profileTabs.map((tab, index) => (
                <li key={tab.id} role="presentation">
                  <button
                    className={`${baseClass}__tab-button`}
                    id={`${tab.id}-tab`}
                    data-tabs-target={`#${tab.id}-panel`}
                    type="button"
                    role="tab"
                    aria-controls={`${tab.id}-panel`}
                    aria-selected={index === 0 ? 'true' : 'false'}>
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Tabs content */}
          <div id="profile-tabs-content" className={`${baseClass}__tabs-content`}>
            {profileTabs.map((tab, index) => (
              <div
                key={tab.id}
                className={`${baseClass}__tab-panel ${index !== 0 ? 'hidden' : ''}`}
                id={`${tab.id}-panel`}
                role="tabpanel"
                aria-labelledby={`${tab.id}-tab`}>
                <div className={`${baseClass}__content-wrapper`}>
                  <div className={`${baseClass}__image-container`}>
                    <Image
                      id={`${elementName}-image-${tab.id}`}
                      src={tab.image}
                      alt={tab.alt}
                      className={`${baseClass}__image`}
                      loading="lazy"
                    />
                  </div>
                  <div className={`${baseClass}__text-container`}>
                    <Paragraph id={`${elementName}-paragraph-${tab.id}`} className={`${baseClass}__paragraph`}>
                      {tab.content}
                    </Paragraph>
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
