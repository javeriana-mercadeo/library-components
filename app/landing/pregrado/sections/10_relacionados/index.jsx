'use client'

import { useEffect, useMemo } from 'react'
import Title from '@library/components/contain/title'
import Paragraph from '@library/components/contain/paragraph'

import info from './info.json'
import script from './script.js'
import './styles.scss'

// ==========================================
// DATOS DE EJEMPLO - IDEALMENTE VENDRÍAN DE PROPS O API
// ==========================================
const DEFAULT_PROGRAMS = [
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

// ==========================================
// COMPONENTE DE TARJETA INDIVIDUAL
// ==========================================
const ProgramCard = ({ program, index }) => {
  const handleCardClick = e => {
    // Prevenir doble navegación si se hace clic en el link interno
    if (e.target.closest('.related-programs__link')) {
      e.preventDefault()
    }
  }

  const handleLinkClick = e => {
    e.stopPropagation()
    // Aquí podrías agregar analytics o tracking
    console.log(`Navegando al programa: ${program.name}`)
  }

  return (
    <li className="card-item swiper-slide">
      <a href={program.url} className="card-link" onClick={handleCardClick} aria-label={`Ver detalles del programa: ${program.name}`}>
        <article className="related-programs__item">
          <div className="related-programs__overlay" aria-hidden="true"></div>
          <img
            src={program.image}
            alt={program.alt}
            className="related-programs__image"
            loading="lazy"
            onError={e => {
              e.target.src = './assets/images/program-placeholder.jpg'
              console.warn(`Error cargando imagen: ${program.image}`)
            }}
          />
          <div className="related-programs__content">
            <h3 className="related-programs__name" title={program.name}>
              {program.name}
            </h3>
            <p className="related-programs__faculty">{program.faculty}</p>
            <span className="related-programs__link" onClick={handleLinkClick} role="button" tabIndex={-1}>
              Ver Programa →
            </span>
          </div>
        </article>
      </a>
    </li>
  )
}

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================
const Relacionados = ({
  programs = DEFAULT_PROGRAMS,
  title = 'Explora Programas Relacionados',
  description = 'Conoce otros programas que complementan tus intereses y expanden tus oportunidades académicas y profesionales.',
  showNavigation = true,
  showPagination = true,
  className = '',
  sectionId = 'section-ten'
}) => {
  // ==========================================
  // HOOKS Y ESTADO
  // ==========================================
  useEffect(() => {
    const cleanup = script()

    return () => {
      // Cleanup cuando el componente se desmonte
      if (typeof cleanup === 'function') {
        cleanup()
      }
    }
  }, [programs.length]) // Re-ejecutar si cambia la cantidad de programas

  // Memorizar programas válidos para evitar re-renders innecesarios
  const validPrograms = useMemo(() => {
    return programs.filter(program => program && program.id && program.name && program.faculty)
  }, [programs])

  // ==========================================
  // HANDLERS
  // ==========================================
  const handleSectionClick = e => {
    // Prevenir navegación accidental del contenedor
    if (e.target === e.currentTarget) {
      e.preventDefault()
    }
  }

  // ==========================================
  // EARLY RETURNS
  // ==========================================
  if (!validPrograms.length) {
    return (
      <section id={sectionId} className={className} aria-hidden="true">
        <div className="related-programs">
          <div className="related-programs__empty">
            <p>No hay programas relacionados disponibles en este momento.</p>
          </div>
        </div>
      </section>
    )
  }

  // ==========================================
  // RENDER
  // ==========================================
  return (
    <section id={sectionId} className={className} onClick={handleSectionClick} aria-labelledby="related-programs-title">
      <div className="related-programs">
        {/* Header de la sección */}
        <header className="related-programs__header">
          <Title id="related-programs-title" className="related-programs__title" level={2}>
            {title}
          </Title>

          <Paragraph className="related-programs__description">{description}</Paragraph>
        </header>

        {/* Contenedor del carrusel */}
        <div className="related-programs__swiper-container">
          <div className="card-wrapper related-programs-swiper">
            {/* Lista de tarjetas */}
            <ul className="card-list swiper-wrapper" role="list" aria-label={`Lista de ${validPrograms.length} programas relacionados`}>
              {validPrograms.map((program, index) => (
                <ProgramCard key={program.id} program={program} index={index} />
              ))}
            </ul>

            {/* Paginación */}
            {showPagination && (
              <div
                className="swiper-pagination related-programs-pagination"
                role="tablist"
                aria-label="Navegación de programas relacionados"></div>
            )}

            {/* Botones de navegación */}
            {showNavigation && (
              <>
                <button
                  className="swiper-slide-button related-programs-prev"
                  type="button"
                  aria-label="Ver programas anteriores"
                  title="Ver programas anteriores">
                  <i className="ph ph-arrow-circle-left" aria-hidden="true"></i>
                </button>

                <button
                  className="swiper-slide-button related-programs-next"
                  type="button"
                  aria-label="Ver más programas"
                  title="Ver más programas">
                  <i className="ph ph-arrow-circle-right" aria-hidden="true"></i>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Relacionados
