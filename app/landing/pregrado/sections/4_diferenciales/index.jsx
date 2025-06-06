'use client'

import { useEffect } from 'react'
import Container from '@library/components/container'
import Paragraph from '@library/components/contain/paragraph'

import whyJaverianaImg from '../../../../../app/landing/pregrado/sections/4_diferenciales/assets/estudiantes.png'

import script from './script.js'
import './styles.scss'

const Diferenciales = () => {
  useEffect(() => {
    script()
  }, [])

  const diferencialesData = [
    {
      id: 'accordion-open',
      targetId: 'accordion-open-body-1',
      icon: 'ph-graduation-cap',
      title: 'Doble titulación',
      content: 'Tendrás la posibilidad de obtener la doble titulación con universidades como el Politécnico de Turín, Politécnico de Milán y Paris Tech.'
    },
    {
      id: 'accordion-open-1',
      targetId: 'accordion-body-1',
      icon: 'ph-books',
      title: 'Múltiple programa',
      content: 'Tendrás la posibilidad de hacer dos o más carreras simultáneamente, de acuerdo con tus intereses profesionales.'
    },
    {
      id: 'accordion-open-2',
      targetId: 'accordion-body-2',
      icon: 'ph-user-circle',
      title: 'Consejería Académica',
      content: 'Te acompañamos con apoyo académico y personal, guiados por un profesor que ofrece estrategias personalizadas para tu bienestar integral.'
    },
    {
      id: 'accordion-open-3',
      targetId: 'accordion-body-3',
      icon: 'ph-star',
      title: 'Validación RIBA',
      content: 'Reconocimiento del Royal Institute of British Architects, destacando la calidad del programa y abriendo oportunidades internacionales.'
    },
    {
      id: 'accordion-open-4',
      targetId: 'accordion-body-4',
      icon: 'ph-lightbulb',
      title: 'Experiencia directa',
      content: 'Aprende a través de experiencias prácticas y formación personalizada, enfocada en tus intereses y desarrollo individual.'
    },
    {
      id: 'accordion-open-5',
      targetId: 'accordion-body-5',
      icon: 'ph-globe',
      title: 'Actividades nacionales e internacionales',
      content: 'Realiza cursos en España, Italia, México y más; participa en concursos globales y haz tu práctica preprofesional en cualquier parte del mundo.'
    }
  ]

  const AccordionItem = ({ item, isFirstColumn }) => (
    <div 
      id={item.id} 
      data-accordion="open" 
      className={`accordion-item ${isFirstColumn ? 'first-column' : 'second-column'}`}
    >
      <div className="accordion-header">
        <div className="accordion-title-wrapper">
          <i className={`ph ${item.icon} accordion-icon`}></i>
          <Paragraph className="accordion-title" isEditable={true}>
            {item.title}
          </Paragraph>
        </div>

        <button
          type="button"
          className="accordion-toggle"
          data-accordion-target={`#${item.targetId}`}
          aria-expanded="false"
          aria-controls={item.targetId}
        >
          <span className="toggle-text">Leer Más</span>
          <i className="ph ph-plus toggle-icon"></i>
        </button>
      </div>

      <div id={item.targetId} className="accordion-content">
        <p>{item.content}</p>
      </div>
    </div>
  )

  return (
    <section id="section-four">
      <Container className="container why-javeriana">
        <header className="section-header">
          <h2 className="why-javeriana__title">¿Por qué elegir la Javeriana?</h2>
        </header>

        <div className="why-javeriana__content">
          <div className="why-javeriana__grid">
            <div className="why-javeriana__column why-javeriana__column--first">
              {diferencialesData.slice(0, 3).map((item) => (
                <AccordionItem key={item.id} item={item} isFirstColumn={true} />
              ))}
            </div>

            <div className="why-javeriana__image-container">
              <img 
                src={whyJaverianaImg.src} 
                alt="Estudiantes de la Universidad Javeriana" 
                className="why-javeriana__image"
              />
            </div>

            <div className="why-javeriana__column why-javeriana__column--second">
              {diferencialesData.slice(3, 6).map((item) => (
                <AccordionItem key={item.id} item={item} isFirstColumn={false} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Diferenciales