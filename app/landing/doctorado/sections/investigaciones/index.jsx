'use client'

import { Container, Title, Paragraph, Image } from '@library/components'
import { useEffect, useState } from 'react'
import React from 'react'

import info from './info.json'
import script from './script.js'
import './styles.scss'

const Investigaciones = () => {
  const elementName = info.id || 'investigaciones'
  const baseClass = 'investigations'

  // Modal manejado completamente por JavaScript vanilla

  useEffect(() => {
    // ✅ PATRÓN LIFERAY COMPATIBLE: Verificar tipo de función antes de ejecutar
    const initScript = script()
    if (typeof initScript === 'function') {
      initScript()
    }

    // Sincronizar alturas después de que se rendericen las cards
    const syncCardHeights = () => {
      const mainCard = document.querySelector('.investigations_card--main')
      const secondaryCards = document.querySelectorAll('.investigations_card--secondary')

      if (mainCard && secondaryCards.length > 0) {
        // Resetear alturas para obtener altura natural
        mainCard.style.height = 'auto'
        secondaryCards.forEach(card => (card.style.height = 'auto'))

        // Obtener todas las alturas
        const allCards = [mainCard, ...Array.from(secondaryCards)]
        const heights = allCards.map(card => card.offsetHeight)
        const maxHeight = Math.max(...heights)

        // Aplicar la altura máxima a todas las cards
        allCards.forEach(card => {
          card.style.height = `${maxHeight}px`
        })

        console.log('[INVESTIGATIONS] Alturas sincronizadas:', maxHeight + 'px')
      }
    }

    // Ejecutar después de que se rendericen las cards
    setTimeout(syncCardHeights, 500)

    // También sincronizar en resize
    const handleResize = () => {
      setTimeout(syncCardHeights, 100)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Modal manejado por JavaScript vanilla - no necesita funciones React

  // ==========================================
  // DATOS DE LAS INVESTIGACIONES
  // ==========================================
  const investigacionesData = [
    {
      id: 1,
      year: '2024',
      title: 'Desafíos sociales en América Latina',
      description:
        'Investigación interdisciplinaria que analizó la desigualdad y las políticas públicas en América Latina, proponiendo soluciones basadas en enfoques participativos y equitativos.',
      image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/innvestigaciones-1',
      alt: 'Desafíos sociales en América Latina',
      type: 'main'
    },
    {
      id: 2,
      year: '2023',
      title: 'Métodos Cualitativos Avanzados en Investigación Social',
      description: 'Desarrollo de herramientas para el análisis cualitativo aplicadas a conflictos sociales y dinámicas comunitarias.',
      image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/innvestigaciones-2',
      alt: 'Métodos Cualitativos Avanzados',
      type: 'secondary'
    },
    {
      id: 3,
      year: '2022',
      title: 'Perspectivas Críticas en Derechos Humanos',
      description:
        'Análisis comparativo de las políticas de derechos humanos en América Latina, con recomendaciones para organismos internacionales.',
      image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/innvestigaciones-3',
      alt: 'Perspectivas Críticas en Derechos Humanos',
      type: 'secondary'
    },
    {
      id: 4,
      year: '2021',
      title: 'Innovación Educativa en Contextos Vulnerables',
      description:
        'Estrategias pedagógicas innovadoras para comunidades en situación de vulnerabilidad social y económica. Hola mundo, lo he logrado',
      image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/innvestigaciones-4',
      alt: 'Innovación Educativa',
      type: 'secondary'
    },
    {
      id: 5,
      year: '2020',
      title: 'Tecnología y Desarrollo Sostenible',
      description:
        'Esta investigación interdisciplinaria aborda la implementación estratégica de tecnologías emergentes para el desarrollo sostenible en América Latina, centrándose en soluciones innovadoras que integren el crecimiento económico con la preservación ambiental y la equidad social. El estudio analiza casos específicos en Colombia, México, Brasil y Chile, donde se han implementado sistemas de energía renovable, tecnologías de agricultura de precisión y plataformas digitales para la gestión sostenible de recursos naturales. La metodología empleada combina análisis cuantitativo de indicadores de sostenibilidad con estudios cualitativos de impacto comunitario, incluyendo entrevistas en profundidad con más de 200 beneficiarios directos y 50 líderes comunitarios. Los resultados demuestran que la adopción de tecnologías verdes en comunidades rurales puede incrementar la productividad agrícola hasta en un 35% mientras reduce el consumo de agua en un 28% y las emisiones de carbono en un 42%. Además, se identificaron factores críticos de éxito como la participación comunitaria activa, la capacitación técnica continua y el acceso a financiamiento flexible. El proyecto también reveló desafíos significativos, incluyendo resistencia al cambio tecnológico en comunidades tradicionales, limitaciones en infraestructura de conectividad rural y necesidad de marcos regulatorios más adaptativos. Las recomendaciones incluyen el desarrollo de programas de alfabetización digital específicos para adultos mayores, la creación de cooperativas tecnológicas locales y la implementación de políticas públicas que incentiven la adopción gradual de tecnologías sostenibles. Este trabajo contribuye significativamente al entendimiento de cómo las tecnologías emergentes pueden ser herramientas efectivas para el desarrollo sostenible cuando se implementan con enfoques participativos y culturalmente sensibles.',
      image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/innvestigaciones-5',
      alt: 'Tecnología y Desarrollo Sostenible',
      type: 'secondary'
    }
  ]

  // ==========================================
  // EXPONER DATOS GLOBALMENTE PARA EL MODAL
  // ==========================================
  useEffect(() => {
    // Exponer los datos en window para que el modal vanilla JS pueda acceder a ellos
    window.investigacionesData = investigacionesData
    console.log('[INVESTIGACIONES] Datos expuestos en window para el modal')

    return () => {
      // Cleanup al desmontar el componente
      delete window.investigacionesData
    }
  }, [investigacionesData])

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
  // SEPARAR DATOS: PRINCIPAL Y SECUNDARIAS
  // ==========================================
  const mainInvestigacion = investigacionesData.find(item => item.type === 'main')
  const secondaryInvestigaciones = investigacionesData.filter(item => item.type === 'secondary')

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
    <section className={`${baseClass}_container`}>
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
