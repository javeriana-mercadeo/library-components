'use client'

import { useEffect } from 'react'
import { Title, Paragraph, Container } from '@library/components'

import script from './script.js'
import info from './info.json'
import './styles.scss'

const Relacionados = () => {
  const elementName = info.id || 'relacionados'
  const baseClass = 'related-programs'

  useEffect(() => {
    console.log('🔧 [REACT] useEffect ejecutándose, llamando script')
    try {
      script()
      console.log('🔧 [REACT] Script llamado exitosamente')
    } catch (error) {
      console.error('🔧 [REACT] Error al ejecutar script:', error)
    }
  }, [])

  // Los datos se cargarán dinámicamente desde el script

  return (
    <section className={`${baseClass}_container`} id="section-ten">
      <Container id={elementName} className={baseClass}>
        <Title hierarchy="h2" className={`${baseClass}__title`} id={`${elementName}-title`} size="2xl" weight="semibold" align="center">
          Explora Programas Relacionados
        </Title>

        <Paragraph className={`${baseClass}__description`} id={`${elementName}-description`} align="center">
          Conoce otros programas que complementan tus intereses y expanden tus oportunidades académicas y profesionales.
        </Paragraph>

        {/* CONTENEDOR PRINCIPAL - ESTRATEGIA PLANESTUDIO */}
        <div className={`${baseClass}__carousel-container`}>
          {/* Carousel con botones absolutos DENTRO */}
          <div className={`${baseClass}__carousel swiper related-programs-swiper`}>
            {/* Botón Anterior - DENTRO con posición absoluta */}
            <button
              className={`swiper-slide-button ${baseClass}__prev related-programs-prev`}
              aria-label="Ver programas anteriores"
              type="button">
              <i className="ph ph-arrow-circle-left" aria-hidden="true"></i>
            </button>

            <div className={`${baseClass}__slides swiper-wrapper card-list`} role="list" id="relatedPrograms">
              {/* Los slides se crearán dinámicamente desde JavaScript */}
            </div>

            {/* Botón Siguiente - DENTRO con posición absoluta */}
            <button className={`swiper-slide-button ${baseClass}__next related-programs-next`} aria-label="Ver más programas" type="button">
              <i className="ph ph-arrow-circle-right" aria-hidden="true"></i>
            </button>

            {/* Paginación - DENTRO del carousel */}
            <div
              className={`swiper-pagination ${baseClass}__pagination related-programs-pagination`}
              role="tablist"
              aria-label="Control de páginas del carrusel"></div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Relacionados
