'use client'

import { useEffect } from 'react'
import { Container, Title, Paragraph, Caption } from '@library/components'
import script from './script.js'
import info from './info.json'
import './styles.scss'

const Diferenciales = () => {
  const elementName = info.id || 'diferenciales'
  const baseClass = 'differentials'

  // Inicializar script cuando el componente se monta
  useEffect(() => {
    script()
  }, [])

  const differentials = [
    {
      id: 'different-approaches',
      icon: 'ph-brain',
      title: 'Diferentes enfoques',
      description: 'La maestría ofrece la posibilidad de elegir uno de tres enfoques: Cognitivo, Psicoanalítico y Sistémico.'
    },
    {
      id: 'library-service',
      icon: 'ph-books',
      title: 'Servicio bibliotecario experto',
      description: 'La Biblioteca General Alfonso Borrero Cabal, S.J. tiene uno de los repositorios más importantes de América Latina.'
    },
    {
      id: 'faculty',
      icon: 'ph-chalkboard-teacher',
      title: 'Planta docente',
      description: 'Acompañamiento por profesionales de alta calidad que tienen notable experiencia en psicología clínica.'
    },
    {
      id: 'integral-counseling',
      icon: 'ph-flower',
      title: 'Consejería integral',
      description:
        'Acompañamiento con tu bienestar. Tendremos consejería integral que siempre apoya académica y desarrollo personal, garantiza con estrategias particulares.'
    },
    {
      id: 'different-approaches-second',
      icon: 'ph-eye',
      title: 'Diferentes aproximaciones',
      description:
        'Nuestro énfasis que abre discusiones para poner en juego diferentes y aproximaciones que enriquecen la universidad y la Maestría específica.'
    },
    {
      id: 'experience',
      icon: 'ph-briefcase',
      title: 'Experiencia',
      description: 'Los estudiantes cuentan con un equipo de supervisores con más de 20 años de experiencia clínica.'
    },
    {
      id: 'research-leaders',
      icon: 'ph-microscope',
      title: 'Líderes en investigación',
      description:
        'Calidad respaldada por dos grupos de investigación reconocidos y avalados por Colciencias: Psicología, salud y Calidad de vida, y relaciones.'
    },
    {
      id: 'at-javeriana',
      icon: 'ph-hand-heart',
      title: 'En la Javeriana',
      description:
        'Tu desarrollo integral en salud. Explora actividades en deporte, cultura, salud e identidad, y enriquece tu vida universitaria.'
    }
  ]

  return (
    <div className={baseClass}>
      <Container id={elementName} className={`${baseClass}_container`}>
        {/* Contenedor de video */}
        <div className={`${baseClass}_media`}>
          <div
            className={`${baseClass}_video-container`}
            id={`${elementName}-video-container`}
            data-component='video-player'
            data-video-desktop-url='https://www.javeriana.edu.co/recursosdb/d/info-prg/administracion-de-empresas-7-1'
            data-video-mobile-url='https://www.javeriana.edu.co/recursosdb/d/info-prg/landing-administracion-de-empresas-mobile-vive-javeriana-360p-h264-'
            data-image-fallback='https://www.javeriana.edu.co/recursosdb/d/info-prg/img-20200414-wa0023?imagePreview=1'></div>
        </div>

        {/* Contenedor de contenido con scroll (título + lista) */}
        <div className={`${baseClass}_content`}>
          {/* Título principal */}
          <Title hierarchy='h2' className={`${baseClass}_title`} id={`${elementName}-title`}>
            ¿Por qué estudiar la Maestría en Psicología Clínica en la Javeriana?
          </Title>

          {/* Lista de diferenciales */}
          <div className={`${baseClass}_list`}>
            {differentials.map((item, index) => (
              <div key={item.id} className={`${baseClass}_item`} id={`${elementName}-${item.id}`}>
                <div className={`${baseClass}_item-icon`}>
                  <i className={`ph ${item.icon}`}></i>
                </div>
                <div className={`${baseClass}_item-content`}>
                  <Caption className={`${baseClass}_item-title`} size='lg' bold={true} isEditable={false}>
                    {item.title}
                  </Caption>
                  <Paragraph className={`${baseClass}_item-description`} size='md' isEditable={false}>
                    {item.description}
                  </Paragraph>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Diferenciales
