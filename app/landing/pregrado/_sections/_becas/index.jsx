'use client'
import { Container, Title, Paragraph, Button, Icon, Caption } from '@library/components'

import { useEffect } from 'react'

import info from './info.json'
import script from './script.js'
import './styles.scss'

const Becas = () => {
  const elementName = info.id || 'becas'
  const baseClass = 'scholarships'

  // Array con la información de las tabs
  const scholarshipTabs = [
    {
      id: 'becas',
      label: 'Nuestras Becas',
      icon: 'ph-graduation-cap',
      title: 'Becas disponibles',
      content: (
        <>
          <p>
            Contamos con un área de apoyo financiero que ofrece diferentes becas para que inicies tus estudios de pregrado.
          </p>
          <p>
            La Universidad ofrece opciones de becas* para aspirantes admitidos a pregrado con excelente desempeño académico y/o con 
            dificultades económicas. Explora los requisitos para aplicar a:
          </p>
          <ul>
            <li><strong>Beca Ingresa a la Javeriana</strong></li>
            <li><strong>Beca Bachiller Destacado</strong></li>
            <li><strong>Beca Bachiller Destacado ACODESI</strong></li>
          </ul>
          <p className="terms-note">*Aplican términos y condiciones.</p>
        </>
      ),
      buttonText: 'Más información sobre becas',
      buttonLink: '#'
    },
    {
      id: 'financiacion',
      label: 'Programa de Financiación',
      icon: 'ph-credit-card',
      title: 'Opciones de financiación',
      content: (
        <>
          <p>También contamos con opciones de financiación.</p>
          <ul>
            <li><strong>A corto plazo</strong> directamente con la Universidad, tasa de interés preferencial.</li>
            <li><strong>A mediano y largo plazo</strong> con entidades aliadas que ofrecen bajas tasas de interés.</li>
            <li>Conoce, también, nuestros <strong>descuentos y convenios</strong> con entidades públicas y privadas.</li>
          </ul>
        </>
      ),
      buttonText: 'Más información sobre financiación',
      buttonLink: '#'
    }
  ]

  useEffect(() => {
    script()
  }, [])

  return (
    <section className={`${baseClass}-section`}>
      <Container id={elementName} className={baseClass}>
        {/* Título principal de la sección */}
        <Title className={`${baseClass}__main-title`} hierarchy='h2' weight='semibold' size='2xl' align='center'>
          Becas y Financiación
        </Title>

        <div className={`${baseClass}__tabs-container`}>
          {/* Navegación de tabs */}
          <div className={`${baseClass}__tabs-nav`} role='tablist' aria-label='Opciones de becas y financiación'>
            <ul className={`${baseClass}__tabs-list`}>
              {scholarshipTabs.map((tab, index) => (
                <li key={tab.id} role='presentation'>
                  <button
                    className={`${baseClass}__tab-button`}
                    id={`${tab.id}-tab`}
                    data-tabs-target={`#${tab.id}-panel`}
                    type='button'
                    role='tab'
                    aria-controls={`${tab.id}-panel`}
                    aria-selected={index === 0 ? 'true' : 'false'}
                    tabIndex={index === 0 ? 0 : -1}>
                    <Icon icon={tab.icon} size='sm' className={`${baseClass}__tab-icon`} />
                    <span>{tab.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contenido de las tabs */}
          <div className={`${baseClass}__tabs-content`}>
            {scholarshipTabs.map((tab, index) => (
              <div
                key={tab.id}
                className={`${baseClass}__tab-panel ${index !== 0 ? 'hidden' : ''}`}
                id={`${tab.id}-panel`}
                role='tabpanel'
                aria-labelledby={`${tab.id}-tab`}
                aria-hidden={index !== 0 ? 'true' : 'false'}>
                <div className={`${baseClass}__content-wrapper`}>
                  <div className={`${baseClass}__icon-container`}>
                    <Icon icon={tab.icon} size='lg' className={`${baseClass}__content-icon`} />
                  </div>
                  <div className={`${baseClass}__text-container`}>
                    <Caption className={`${baseClass}__content-title`} size='xl' weight='semibold' color='neutral'>
                      {tab.title}
                    </Caption>
                    <div className={`${baseClass}__content-text`}>
                      {tab.content}
                    </div>
                    <Button
                      className={`${baseClass}__cta-button`}
                      variant='solid'
                      color='primary'
                      size='md'
                      href={tab.buttonLink}
                      startIcon={<Icon icon='ph-arrow-right' />}>
                      {tab.buttonText}
                    </Button>
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

export default Becas