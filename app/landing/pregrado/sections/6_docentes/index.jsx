'use client'

import { useEffect } from 'react'
import Container from '@library/components/container'
import Title from '@library/components/contain/title'
import Paragraph from '@library/components/contain/paragraph'
import Btn from '@library/components/contain/btn'
import Image from '@library/components/contain/image'

import script from './script.js'
import info from './info.json'
import './styles.scss'

const Docentes = () => {
  const elementName = info.id || 'docentes'
  const baseClass = 'expert-carousel'

  useEffect(() => {
    script()
  }, [])

  // Datos de los docentes
  const docentes = [
    {
      name: 'Alfonso Mariano Ramos',
      title: 'Ph.D. Ingeniería, Universidad de los Andes, Bogotá',
      image:
        'https://www.javeriana.edu.co/olife7/adaptive-media/imagenes7/12773788/Preview-1000x0/ConstanzaOrdon%CC%83ezTorres.png?t=1719869896884',
      profileUrl: '#'
    },
    {
      name: 'Andrés Eduardo Torres Abello',
      title: 'Ph.D. Hidrología Urbana, INSA Lyon, Francia',
      image:
        'https://www.javeriana.edu.co/olife7/adaptive-media/imagenes7/12773710/Preview-1000x0/CarlosAlbertoHerna%CC%81ndez.png?t=1719869232728',
      profileUrl: '#'
    },
    {
      name: 'Nelson',
      title: 'Ph.D. Ingeniería',
      image:
        'https://www.javeriana.edu.co/olife7/adaptive-media/imagenes7/12773759/Preview-1000x0/CarolinaEugeniaOrtizVelilla.png?t=1719869726614',
      profileUrl: '#'
    },
    {
      name: 'Daniel Mauricio Ruiz Valencia',
      title: 'Ph.D. (c) Ingeniería, Universidad de los Andes, Bogotá',
      image:
        'https://www.javeriana.edu.co/olife7/adaptive-media/imagenes7/12773729/Preview-1000x0/AndreGaviriaValenzuela+%281%29.png?t=1719869383640',
      profileUrl: '#'
    },
    {
      name: 'Jaime Andrés Lara',
      title: 'Ph.D. (c) Ingeniería, Universidad de los Andes, Bogotá',
      image: 'https://www.javeriana.edu.co/olife7/adaptive-media/imagenes7/12773745/Preview-1000x0/CarlosEduardoNietoG.png?t=1719869506461',
      profileUrl: '#'
    },
    {
      name: 'Nelson Obregón Neira',
      title: 'Ph.D. Ingeniería, Universidad de los Andes, Bogotá',
      image:
        'https://www.javeriana.edu.co/olife7/adaptive-media/imagenes7/12773759/Preview-1000x0/CarolinaEugeniaOrtizVelilla.png?t=1719869726614',
      profileUrl: '#'
    }
  ]

  // Función para renderizar una tarjeta de docente
  const renderDocenteCard = (docente, index) => {
    return (
      <div key={index} className={`${baseClass}_slide swiper-slide`} role="listitem">
        <div className={`${baseClass}_card`}>
          <div className={`${baseClass}_card-header`}>
            <Image
              id={`${elementName}-image-${index + 1}`}
              src={docente.image}
              alt={docente.name}
              className={`${baseClass}_card-image`}
              isEditable={false}
            />
          </div>

          <div className={`${baseClass}_card-content`}>
            <Title
              hierarchy="h3"
              size="md"
              weight="bold"
              className={`${baseClass}_card-name`}
              id={`${elementName}-name-${index + 1}`}
              color="neutral"
              isEditable={false}>
              {docente.name}
            </Title>

            <Paragraph
              size="sm"
              className={`${baseClass}_card-title`}
              id={`${elementName}-title-${index + 1}`}
              color="neutral"
              isEditable={false}>
              {docente.title}
            </Paragraph>

            <Btn
              href={docente.profileUrl}
              target="_blank"
              variant="link"
              size="md"
              className={`${baseClass}_card-link`}
              id={`${elementName}-link-${index + 1}`}
              color="neutral"
              isEditable={false}>
              Ver Perfil
            </Btn>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section id="section-six">
      <div className="color-container">
        <Container id={elementName} className={baseClass}>
          <Title
            hierarchy="h2"
            size="2xl"
            weight="bold"
            align="center"
            className={`${baseClass}__title`}
            id={`${elementName}-title`}
            color="neutral">
            Docentes Expertos
          </Title>

          <Paragraph align="center" className={`${baseClass}__description`} id={`${elementName}-description`} color="neutral">
            Docentes expertos con experiencia práctica y académica, comprometidos con la excelencia e innovación en Ingeniería Civil.
          </Paragraph>

          <div className={`${baseClass}_carousel swiper`}>
            <div className={`${baseClass}_wrapper expert-swiper`}>
              <div className={`${baseClass}_slides swiper-wrapper`} role="list">
                {/* Generar cards dinámicamente */}
                {docentes.map((docente, index) => renderDocenteCard(docente, index))}
              </div>

              {/* Botones de navegación */}
              <button className={`swiper-slide-button ${baseClass}_prev`} aria-label="Ir al slide anterior" type="button">
                <i className="ph ph-arrow-circle-left" aria-hidden="true"></i>
              </button>
              <button className={`swiper-slide-button ${baseClass}_next`} aria-label="Ir al siguiente slide" type="button">
                <i className="ph ph-arrow-circle-right" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}

export default Docentes
