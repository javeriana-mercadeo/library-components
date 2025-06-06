'use client'

import { useEffect } from 'react'
import Container from '@library/components/container'
import Title from '@library/components/contain/title'
import Paragraph from '@library/components/contain/paragraph'
import Caption from '@library/components/contain/caption'
import Btn from '@library/components/contain/btn'
import Image from '@library/components/contain/image'

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
    }
  ]

  // Componente reutilizable para cada item del acordeón
  const AccordionItem = ({ item, index, isFirstColumn }) => {
    const itemId = `${elementName}-item-${index + 1}`
    const contentId = `${elementName}-content-${index + 1}`

    return (
      <div className={`${baseClass}__accordion-item`} data-accordion="open" data-column={isFirstColumn ? 'first' : 'second'}>
        {/* Header del acordeón */}
        <div className={`${baseClass}__accordion-header`}>
          <div className={`${baseClass}__title-wrapper`}>
            <div className={`${baseClass}__icon-container`}>
              <i className={`ph ${item.icon} ${baseClass}__icon`} aria-hidden="true"></i>
            </div>

            <Caption id={`${itemId}-title`} className={`${baseClass}__accordion-title`} size="lg" weight="semibold" color="neutral">
              {item.title}
            </Caption>
          </div>

          {/* Botón toggle - solo visible en móvil */}
          <Btn
            className={`${baseClass}__accordion-toggle`}
            variant="light"
            size="sm"
            data-accordion-target={`#${contentId}`}
            aria-expanded="false"
            aria-controls={contentId}
            isEditable={false}
            endIcon={<i className="ph ph-plus toggle-icon" aria-hidden="true"></i>}>
            <span className="toggle-text">Leer Más</span>
          </Btn>
        </div>

        {/* Contenido del acordeón */}
        <div id={contentId} className={`${baseClass}__accordion-content`} aria-labelledby={itemId}>
          <Paragraph id={`${itemId}-content`} className={`${baseClass}__accordion-text`} size="md" color="neutral">
            {item.content}
          </Paragraph>
        </div>
      </div>
    )
  }

  return (
    <section id="section-four" className={baseClass}>
      <Container id={elementName} className={`${baseClass}__container`}>
        {/* Header de la sección */}
        <header className={`${baseClass}__header`}>
          <Title
            id={`${elementName}-title`}
            className={`${baseClass}__title`}
            hierarchy="h2"
            size="2xl"
            weight="bold"
            align="center"
            color="neutral">
            ¿Por qué elegir la Javeriana?
          </Title>
        </header>

        {/* Contenido principal */}
        <div className={`${baseClass}__content`}>
          <div className={`${baseClass}__grid`}>
            {/* Primera columna */}
            <div className={`${baseClass}__column ${baseClass}__column--first`}>
              {diferencialesData.slice(0, 3).map((item, index) => (
                <AccordionItem key={item.id} item={item} index={index} isFirstColumn={true} />
              ))}
            </div>

            {/* Contenedor de imagen central */}
            <div className={`${baseClass}__image-container`}>
              <Image
                id={`${elementName}-image`}
                src="https://www.javeriana.edu.co/recursosdb/d/info-prg/banner-web-maestria-en-innovacion-en-la-construccion-1-"
                alt="Estudiantes de la Universidad Javeriana"
                className={`${baseClass}__image`}
              />
            </div>

            {/* Segunda columna */}
            <div className={`${baseClass}__column ${baseClass}__column--second`}>
              {diferencialesData.slice(3, 6).map((item, index) => (
                <AccordionItem key={item.id} item={item} index={index + 3} isFirstColumn={false} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Diferenciales
