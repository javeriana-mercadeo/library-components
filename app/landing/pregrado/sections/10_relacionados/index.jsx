'use client'

import { useEffect } from 'react'
import Container from '@library/components/container'
import Title from '@library/components/contain/title'
import Paragraph from '@library/components/contain/paragraph'

import script from './script.js'
import info from './info.json'
import './styles.scss'

const Relacionados = () => {
  const elementName = info.id || 'relacionados'
  const baseClass = 'related-programs'

  useEffect(() => {
    script()
  }, [])

  // Datos de programas relacionados - estos vendrán de Liferay
  const programsData = [
    {
      id: 1,
      name: 'Especialización en Gerencia de Proyectos de Tecnologías de la Información',
      faculty: 'Facultad de Ingeniería',
      image: './assets/images/program1.jpg',
      url: '/programa/especializacion-gerencia-proyectos-ti',
      alt: 'Especialización en Gerencia de Proyectos TI'
    },
    {
      id: 2,
      name: 'Pregrado en Ingeniería de Sistemas',
      faculty: 'Facultad de Ingeniería',
      image: './assets/images/program2.jpg',
      url: '/programa/pregrado-ingenieria-sistemas',
      alt: 'Pregrado en Ingeniería de Sistemas'
    },
    {
      id: 3,
      name: 'Pregrado en Ingeniería Industrial',
      faculty: 'Facultad de Ingeniería',
      image: './assets/images/program3.jpg',
      url: '/programa/pregrado-ingenieria-industrial',
      alt: 'Pregrado en Ingeniería Industrial'
    },
    {
      id: 4,
      name: 'Pregrado en Ingeniería Mecatrónica',
      faculty: 'Facultad de Ingeniería',
      image: './assets/images/program4.jpg',
      url: '/programa/pregrado-ingenieria-mecatronica',
      alt: 'Pregrado en Ingeniería Mecatrónica'
    }
  ]

  // Componente para renderizar tarjeta de programa
  const ProgramCard = ({ program, index }) => (
    <div className={`${baseClass}__program-card`}>
      <div className={`${baseClass}__overlay`}></div>
      <img
        src={program.image}
        alt={program.alt}
        className={`${baseClass}__image`}
        data-lfr-editable-id={`program-image-${index}`}
        data-lfr-editable-type="image"
        loading="lazy"
      />
      <div className={`${baseClass}__content`}>
        <h3 className={`${baseClass}__name`} data-lfr-editable-id={`program-name-${index}`} data-lfr-editable-type="text">
          {program.name}
        </h3>
        <Paragraph className={`${baseClass}__faculty`} id={`${elementName}-faculty-${index}`} isEditable={false}>
          {program.faculty}
        </Paragraph>
        <a
          href={program.url}
          className={`${baseClass}__link`}
          data-lfr-editable-id={`program-link-${index}`}
          data-lfr-editable-type="link"
          aria-label={`Ver detalles del programa: ${program.name}`}>
          Ver Programa →
        </a>
      </div>
    </div>
  )

  return (
    <section className={`${baseClass}_container`} id="section-ten">
      <Container id={elementName} className={baseClass}>
        <Title hierarchy="h2" className={`${baseClass}__title`} id={`${elementName}-title`} size="2xl" weight="semibold" align="center">
          Explora Programas Relacionados
        </Title>

        <Paragraph className={`${baseClass}__description`} id={`${elementName}-description`} align="center">
          Conoce otros programas que complementan tus intereses y expanden tus oportunidades académicas y profesionales.
        </Paragraph>

        <div className={`${baseClass}__carousel swiper`}>
          <div className={`${baseClass}__wrapper related-programs-swiper`}>
            <div className={`${baseClass}__slides swiper-wrapper card-list`} role="list">
              {programsData.map((program, index) => (
                <div key={program.id} className={`${baseClass}__slide swiper-slide card-item`} role="listitem">
                  <ProgramCard program={program} index={index} />
                </div>
              ))}
            </div>

            {/* Paginación */}
            <div
              className={`swiper-pagination ${baseClass}__pagination related-programs-pagination`}
              role="tablist"
              aria-label="Control de páginas del carrusel"></div>

            {/* Botones de navegación */}
            <button
              className={`swiper-slide-button ${baseClass}__prev related-programs-prev`}
              aria-label="Ver programas anteriores"
              type="button">
              <i className="ph ph-arrow-circle-left" aria-hidden="true"></i>
            </button>
            <button className={`swiper-slide-button ${baseClass}__next related-programs-next`} aria-label="Ver más programas" type="button">
              <i className="ph ph-arrow-circle-right" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Relacionados
