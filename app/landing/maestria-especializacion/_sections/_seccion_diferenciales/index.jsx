'use client'

import { Container, Title, Paragraph, Caption } from '@library/components'
import info from './info.json'
import './styles.scss'

const PorQueEstudiar = () => {
  const elementName = info.id || 'porque-estudiar'
  const baseClass = 'why-study'

  const reasons = [
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
      description: 'Acompañamiento con tu bienestar. Tendremos consejería integral que siempre apoya académica y desarrollo personal, garantiza con estrategias particulares.'
    },
    {
      id: 'different-approaches-second',
      icon: 'ph-eye',
      title: 'Diferentes aproximaciones',
      description: 'Nuestro énfasis que abre discusiones para poner en juego diferentes y aproximaciones que enriquecen la universidad y la Maestría específica.'
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
      description: 'Calidad respaldada por dos grupos de investigación reconocidos y avalados por Colciencias: Psicología, salud y Calidad de vida, y relaciones.'
    },
    {
      id: 'at-javeriana',
      icon: 'ph-hand-heart',
      title: 'En la Javeriana',
      description: 'Tu desarrollo integral en salud. Explora actividades en deporte, cultura, salud e identidad, y enriquece tu vida universitaria.'
    }
  ]

  return (
    <div className={baseClass}>
      <Container id={elementName} className={`${baseClass}_container`}>
        {/* Título */}
        <Title hierarchy='h2' className={`${baseClass}_title`} id={`${elementName}-title`}>
          ¿Por qué estudiar la Maestría en Psicología Clínica en la Javeriana?
        </Title>

        {/* Video Container */}
        <div className={`${baseClass}_media`}>
          <div
            className={`${baseClass}_video-container`}
            id={`${elementName}-video-container`}
            data-component='video-player'
            data-video-desktop-url='https://www.javeriana.edu.co/recursosdb/d/info-prg/administracion-de-empresas-7-1'
            data-video-mobile-url='https://www.javeriana.edu.co/recursosdb/d/info-prg/landing-administracion-de-empresas-mobile-vive-javeriana-360p-h264-'
            data-image-fallback='https://www.javeriana.edu.co/recursosdb/d/info-prg/img-20200414-wa0023?imagePreview=1'></div>
        </div>

        {/* Lista de razones */}
        <div className={`${baseClass}_reasons`}>
          {reasons.map(reason => (
            <div key={reason.id} className={`${baseClass}_reason-item`} id={`${elementName}-${reason.id}`}>
              <div className={`${baseClass}_reason-icon`}>
                <i className={`ph ${reason.icon}`}></i>
              </div>
              <div className={`${baseClass}_reason-content`}>
                <Caption className={`${baseClass}_reason-title`} size='md' bold={true} isEditable={false}>
                  {reason.title}
                </Caption>
                <Paragraph className={`${baseClass}_reason-description`} size='sm' isEditable={false}>
                  {reason.description}
                </Paragraph>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default PorQueEstudiar