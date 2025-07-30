'use client'
import { Container, Title, Paragraph, Button as Btn, Icon, Image, Caption } from '@library/components'

import { useEffect } from 'react'

import script from './script.js'
import info from './info.json'
import './styles.scss'

const Diferenciales = () => {
  const elementName = info.id || 'diferenciales'
  const baseClass = 'why-javeriana'

  useEffect(() => {
    script()
  }, [])

  // Configuración de todos los diferenciales
  const diferencialesData = [
    {
      id: 'diferencial-1',
      icon: 'ph-graduation-cap',
      title: 'Doble titulación',
      content:
        'Tendrás la posibilidad de obtener la doble titulación con universidades como el Politécnico de Turín, Politécnico de Milán y Paris Tech.'
    },
    {
      id: 'diferencial-2',
      icon: 'ph-books',
      title: 'Múltiple programa',
      content: 'Tendrás la posibilidad de hacer dos o más carreras simultáneamente, de acuerdo con tus intereses profesionales.'
    },
    {
      id: 'diferencial-3',
      icon: 'ph-user-circle',
      title: 'Consejería Académica',
      content:
        'Te acompañamos con apoyo académico y personal, guiados por un profesor que ofrece estrategias personalizadas para tu bienestar integral.'
    },
    {
      id: 'diferencial-4',
      icon: 'ph-star',
      title: 'Validación RIBA',
      content:
        'Reconocimiento del Royal Institute of British Architects, destacando la calidad del programa y abriendo oportunidades internacionales.'
    },
    {
      id: 'diferencial-5',
      icon: 'ph-lightbulb',
      title: 'Experiencia directa',
      content: 'Aprende a través de experiencias prácticas y formación personalizada, enfocada en tus intereses y desarrollo individual.'
    },
    {
      id: 'diferencial-6',
      icon: 'ph-globe',
      title: 'Actividades nacionales e internacionales',
      content:
        'Realiza cursos en España, Italia, México y más; participa en concursos globales y haz tu práctica preprofesional en cualquier parte del mundo.'
    },
    {
      id: 'diferencial-7',
      icon: 'ph-map-pin', // Cambié el icono para diferenciarlo
      title: 'Red de egresados global',
      content: 'Conecta con una red internacional de más de 15,000 egresados javerianos trabajando en empresas líderes alrededor del mundo.'
    },
    {
      id: 'diferencial-8',
      icon: 'ph-certificate', // Cambié el icono para diferenciarlo
      title: 'Certificaciones internacionales',
      content: 'Obtén certificaciones reconocidas mundialmente que potencian tu perfil profesional y abren nuevas oportunidades laborales.'
    }
  ]

  // Componente reutilizable para cada item del acordeón
  const AccordionItem = ({ item, globalIndex, isFirstColumn }) => {
    // Usar globalIndex para mantener numeración secuencial única
    const itemNumber = globalIndex + 1
    const itemId = `${elementName}-item-${itemNumber}`
    const contentId = `${elementName}-content-${itemNumber}`

    return (
      <div className={`${baseClass}__accordion-item`} data-accordion='open' data-column={isFirstColumn ? 'first' : 'second'}>
        {/* Header del acordeón */}
        <div className={`${baseClass}__accordion-header`}>
          <div className={`${baseClass}__title-wrapper`}>
            <div className={`${baseClass}__icon-container`}>
              <Icon id={`${baseClass}-icons-${globalIndex}`} icon={item.icon} size='sm' color='primary' className={`${baseClass}__icon`} />
            </div>

            <Caption
              id={`caption-${elementName}-item-${itemNumber}-title`}
              className={`${baseClass}__accordion-title`}
              size='lg'
              weight='semibold'
              color='neutral'>
              {item.title}
            </Caption>
          </div>

          {/* Botón toggle - solo visible en móvil */}
          <Btn
            className={`${baseClass}__accordion-toggle`}
            variant='light'
            size='sm'
            data-accordion-target={`#${contentId}`}
            aria-expanded='false'
            aria-controls={contentId}
            isEditable={false}
            endIcon={<i className='ph ph-plus toggle-icon' aria-hidden='true'></i>}>
            <span className='toggle-text'>Leer Más</span>
          </Btn>
        </div>

        {/* Contenido del acordeón */}
        <div id={contentId} className={`${baseClass}__accordion-content`} aria-labelledby={itemId}>
          <Paragraph id={`${itemId}-content`} className={`${baseClass}__accordion-text`} size='md' color='neutral'>
            {item.content}
          </Paragraph>
        </div>
      </div>
    )
  }

  return (
    <section id='section-four' className={baseClass}>
      <Container id={elementName} className={`${baseClass}__container`}>
        {/* Header de la sección */}
        <header className={`${baseClass}__header`}>
          <Title
            id={`title-${elementName}-title`}
            hierarchy='h2'
            className={`${baseClass}__title`}
            weight='semibold'
            size='2xl'
            align='center'>
            ¿Por qué elegir la Javeriana?
          </Title>
        </header>

        {/* Contenido principal */}
        <div className={`${baseClass}__content`}>
          <div className={`${baseClass}__grid`}>
            {/* Primera columna */}
            <div className={`${baseClass}__column ${baseClass}__column--first`}>
              {diferencialesData.slice(0, 4).map((item, index) => (
                <AccordionItem key={item.id} item={item} globalIndex={index} isFirstColumn={true} />
              ))}
            </div>

            {/* Contenedor de imagen central */}
            <div className={`${baseClass}__image-container`}>
              <Image
                id={`image-${elementName}-image`}
                src='https://www.javeriana.edu.co/recursosdb/d/info-prg/banner-web-maestria-en-innovacion-en-la-construccion-1-'
                alt='Estudiantes de la Universidad Javeriana'
                className={`${baseClass}__image`}
              />
            </div>

            {/* Segunda columna */}
            <div className={`${baseClass}__column ${baseClass}__column--second`}>
              {diferencialesData.slice(4, 8).map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  globalIndex={index + 4} // ✅ CORREGIDO: ahora es +4 en lugar de +3
                  isFirstColumn={false}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Diferenciales
