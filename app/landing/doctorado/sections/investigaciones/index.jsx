import { Container, Title, Paragraph, Image } from '@library/components'
import { useEffect } from 'react'
import React from 'react'

import info from './info.json'
import script from './script.js'
import './styles.scss'

const Investigaciones = () => {
  const elementName = info.id || 'investigaciones'
  const baseClass = 'investigations'

  useEffect(() => {
    const initScript = script()
    if (typeof initScript === 'function') {
      initScript()
    }
  }, [])

  // ==========================================
  // DATOS DE LAS INVESTIGACIONES
  // ==========================================
  const investigacionesData = [
    {
      id: 2,
      year: '2024',
      title: 'Desafíos sociales en América Latina',
      description:
        'Investigación interdisciplinaria que analizó la desigualdad y las políticas públicas en América Latina, proponiendo soluciones basadas en enfoques participativos y equitativos.',
      image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/innvestigaciones-1',
      alt: 'Desafíos sociales en América Latina'
    },
    {
      id: 3,
      year: '2023',
      title: 'Métodos Cualitativos Avanzados en Investigación Social',
      description: 'Desarrollo de herramientas para el análisis cualitativo aplicadas a conflictos sociales y dinámicas comunitarias.',
      image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/innvestigaciones-2',
      alt: 'Métodos Cualitativos Avanzados'
    },
    {
      id: 4,
      year: '2022',
      title: 'Perspectivas Críticas en Derechos Humanos',
      description:
        'Análisis comparativo de las políticas de derechos humanos en América Latina, con recomendaciones para organismos internacionales.',
      image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/innvestigaciones-3',
      alt: 'Perspectivas Críticas en Derechos Humanos'
    },
    {
      id: 5,
      year: '2021',
      title: 'Innovación Educativa en Contextos Vulnerables',
      description:
        'Estrategias pedagógicas innovadoras para comunidades en situación de vulnerabilidad social y económica. Hola mundo, lo he logrado',
      image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/innvestigaciones-4',
      alt: 'Innovación Educativa'
    },
    {
      id: 6,
      year: '2020',
      title: 'Tecnología y Desarrollo Sostenible',
      description:
        'Esta investigación interdisciplinaria aborda la implementación estratégica de tecnologías emergentes para el desarrollo sostenible en América Latina, centrándose en soluciones innovadoras que integren el crecimiento económico con la preservación ambiental y la equidad social. El estudio analiza casos específicos en Colombia, México, Brasil y Chile, donde se han implementado sistemas de energía renovable, tecnologías de agricultura de precisión y plataformas digitales para la gestión sostenible de recursos naturales. La metodología empleada combina análisis cuantitativo de indicadores de sostenibilidad con estudios cualitativos de impacto comunitario, incluyendo entrevistas en profundidad con más de 200 beneficiarios directos y 50 líderes comunitarios. Los resultados demuestran que la adopción de tecnologías verdes en comunidades rurales puede incrementar la productividad agrícola hasta en un 35% mientras reduce el consumo de agua en un 28% y las emisiones de carbono en un 42%. Además, se identificaron factores críticos de éxito como la participación comunitaria activa, la capacitación técnica continua y el acceso a financiamiento flexible. El proyecto también reveló desafíos significativos, incluyendo resistencia al cambio tecnológico en comunidades tradicionales, limitaciones en infraestructura de conectividad rural y necesidad de marcos regulatorios más adaptativos. Las recomendaciones incluyen el desarrollo de programas de alfabetización digital específicos para adultos mayores, la creación de cooperativas tecnológicas locales y la implementación de políticas públicas que incentiven la adopción gradual de tecnologías sostenibles. Este trabajo contribuye significativamente al entendimiento de cómo las tecnologías emergentes pueden ser herramientas efectivas para el desarrollo sostenible cuando se implementan con enfoques participativos y culturalmente sensibles.',
      image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/innvestigaciones-5',
      alt: 'Tecnología y Desarrollo Sostenible'
    },
    {
      id: 1,
      year: '2025',
      title: 'Investigación principal',
      description:
        ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam luctus dolor eget urna ullamcorper posuere. Vivamus sem diam, consequat et lobortis at, aliquam vitae felis. Nulla at sodales ligula. Duis quis condimentum neque, id mattis lorem. Curabitur cursus nulla id ipsum varius, sit amet cursus augue gravida. Ut ut neque sit amet metus commodo cursus. Sed quis ante vel justo egestas suscipit in non turpis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras lobortis, nunc in ullamcorper pretium, nibh eros mollis eros, ut finibus dolor metus sit amet leo. Curabitur lorem augue, dapibus id ultrices nec, convallis quis dolor. Quisque consectetur ipsum sit amet elit tristique rhoncus. Quisque tortor elit, egestas non viverra a, scelerisque eu ex. Quisque eget elit in dui aliquet eleifend sed sit amet purus. Proin mollis orci orci, bibendum hendrerit lectus scelerisque sit amet. Vivamus aliquet, eros eget consectetur pulvinar, leo ipsum tempus justo, id volutpat magna magna eu metus. Aenean fringilla semper erat, at blandit sapien sollicitudin eget. Fusce pulvinar ante eget semper convallis. Quisque convallis dui a laoreet molestie. Maecenas eleifend massa hendrerit nisi euismod scelerisque. Aenean pharetra dictum massa et tincidunt. Maecenas mi tellus, pulvinar eu velit eget, tristique eleifend turpis. Suspendisse potenti.',
      image: 'https://sobrehistoria.com/wp-content/uploads/2010/08/era-victoriana.jpg',
      alt: 'Desafíos sociales en América Latina'
    }
  ]

  // ==========================================
  // FUNCIÓN PARA TRUNCAR TEXTO POR PALABRAS
  // ==========================================
  const truncateText = (text, maxWords = 20) => {
    if (!text) return ''
    const words = text.split(' ')
    if (words.length <= maxWords) return text
    return words.slice(0, maxWords).join(' ') + '...'
  }

  // ==========================================
  // ORDENAMIENTO DINÁMICO: AUTO-PROMOCIÓN POR AÑO
  // ==========================================

  // Ordenar todas las investigaciones por año (más reciente primero)
  const sortedInvestigaciones = [...investigacionesData].sort((a, b) => {
    const yearA = parseInt(a.year) || 0
    const yearB = parseInt(b.year) || 0
    return yearB - yearA // Descendente: 2025, 2024, 2023...
  })

  // La más reciente automáticamente se convierte en principal
  const mainInvestigacion = sortedInvestigaciones[0]

  // Las demás van al swiper (ya ordenadas por año)
  const secondaryInvestigaciones = sortedInvestigaciones.slice(1)

  // ==========================================
  // RENDERIZAR CARD PRINCIPAL FIJA
  // ==========================================
  const renderMainCard = investigacion => {
    const { id, year, title, description, image, alt } = investigacion

    return (
      <div className={`${baseClass}_main-card`}>
        <div className={`${baseClass}_card ${baseClass}_card--main investigations_card`} role='button' tabIndex={0} data-id={id}>
          <Image
            id={`image-${elementName}-${id}`}
            src={image}
            alt={alt}
            className={`${baseClass}_image ${baseClass}_image--main`}
            loading='lazy'
          />

          <div className={`${baseClass}_content`}>
            <span className={`${baseClass}_badge`}>{year}</span>

            <Title hierarchy='h3' isEditable={false} className={`${baseClass}_title`} size='lg' weight='semibold'>
              {title}
            </Title>

            <Paragraph className={`${baseClass}_description`}>
              {truncateText(description, 20)}
              <span>
                <i className='ph ph-arrow-square-in'></i>
              </span>
            </Paragraph>
          </div>
        </div>
      </div>
    )
  }

  // ==========================================
  // RENDERIZAR CARDS SECUNDARIAS PARA SWIPER
  // ==========================================
  const renderSecondaryCard = (investigacion, index) => {
    const { id, year, title, description, image, alt } = investigacion

    return (
      <div key={id} className={`${baseClass}_slide ${baseClass}_slide--secondary swiper-slide`} role='listitem'>
        <div className={`${baseClass}_card ${baseClass}_card--secondary investigations_card`} role='button' tabIndex={0} data-id={id}>
          <Image
            id={`image-${elementName}-${id}`}
            src={image}
            alt={alt}
            className={`${baseClass}_image ${baseClass}_image--secondary`}
            loading='lazy'
          />

          <div className={`${baseClass}_content`}>
            <span className={`${baseClass}_badge`}>{year}</span>

            <Title hierarchy='h3' isEditable={false} className={`${baseClass}_title`} size='md' weight='semibold'>
              {title}
            </Title>

            <Paragraph className={`${baseClass}_description`}>
              {truncateText(description, 20)}
              <span>
                <i className='ph ph-arrow-square-in'></i>
              </span>
            </Paragraph>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section
      className={`${baseClass}_container`}
      data-component-id={elementName}
      data-investigations-data={JSON.stringify(investigacionesData)}>
      <Container id={elementName} className={baseClass}>
        <Title weight='semibold' size='2xl' align='center' id={`${elementName}-title`} className={`${baseClass}_main-title`}>
          Investigaciones
        </Title>

        {/* Layout de dos columnas: Card fija + Swiper */}
        <div className={`${baseClass}_layout`}>
          {/* Columna izquierda - Card principal fija */}
          <div className={`${baseClass}_fixed-column`}>{mainInvestigacion && renderMainCard(mainInvestigacion)}</div>

          {/* Columna derecha - Swiper con cards secundarias */}
          <div className={`${baseClass}_slider-column`}>
            <div className={`${baseClass}_mask-container`}>
              <div className={`${baseClass}_wrapper investigations-swiper swiper`}>
                <div className={`${baseClass}_slides swiper-wrapper`} role='list'>
                  {/* ✅ SOLO CARDS SECUNDARIAS EN EL SWIPER */}
                  {secondaryInvestigaciones.map((investigacion, index) => renderSecondaryCard(investigacion, index))}
                </div>
              </div>

              {/* Botones de navegación */}
              <button className={`swiper-slide-button ${baseClass}_prev`} aria-label='Ir al slide anterior' type='button'>
                <i className='ph ph-arrow-circle-left' aria-hidden='true'></i>
              </button>
              <button className={`swiper-slide-button ${baseClass}_next`} aria-label='Ir al siguiente slide' type='button'>
                <i className='ph ph-arrow-circle-right' aria-hidden='true'></i>
              </button>
            </div>
          </div>
        </div>
      </Container>

      {/* Modal se crea dinámicamente con JavaScript vanilla */}
    </section>
  )
}

export default Investigaciones
