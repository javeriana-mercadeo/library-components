'use client'
import React, { Component } from 'react'
import Title from '../../../../../_library/components/contain/title'
import Paragraph from '../../../../../_library/components/contain/paragraph'
import './styles.scss'

class DetalleProyecto extends Component {
  constructor(props) {
    super(props)
    this.projectDetailsRef = React.createRef()
    this.startY = 0
    this.currentY = 0
    this.isDragging = false
  }

  componentDidMount() {
    const element = this.projectDetailsRef.current
    if (element && this.isMobile()) {
      // Touch events
      element.addEventListener('touchstart', this.handleTouchStart, { passive: false })
      element.addEventListener('touchmove', this.handleTouchMove, { passive: false })
      element.addEventListener('touchend', this.handleTouchEnd, { passive: false })
    }
  }

  componentWillUnmount() {
    const element = this.projectDetailsRef.current
    if (element) {
      element.removeEventListener('touchstart', this.handleTouchStart)
      element.removeEventListener('touchmove', this.handleTouchMove)
      element.removeEventListener('touchend', this.handleTouchEnd)
    }
  }

  isMobile = () => {
    return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  }

  handleTouchStart = e => {
    this.startY = e.touches[0].clientY
    this.isDragging = true

    // Añadir clase para transiciones suaves
    const element = this.projectDetailsRef.current
    if (element) {
      element.style.transition = 'none'
    }
  }

  handleTouchMove = e => {
    if (!this.isDragging) return

    e.preventDefault() // Prevenir scroll del navegador
    this.currentY = e.touches[0].clientY
    const deltaY = this.currentY - this.startY

    const element = this.projectDetailsRef.current
    if (element) {
      // Aplicar transformación con resistencia en los extremos
      const resistance = this.getScrollResistance(deltaY)
      element.style.transform = `translateY(${deltaY * resistance}px)`
    }
  }

  handleTouchEnd = e => {
    if (!this.isDragging) return

    this.isDragging = false
    const deltaY = this.currentY - this.startY
    const element = this.projectDetailsRef.current

    if (element) {
      // Restaurar transición
      element.style.transition = 'transform 0.3s ease-out'

      // Determinar si hacer snap o regresar
      const threshold = 50

      // Dentro de handleTouchEnd en DetalleProyecto
      if (Math.abs(deltaY) > threshold) {
        console.log('Touch gesture detected:', deltaY > 0 ? 'down' : 'up')

        // Esta línea ejecuta el callback del componente padre
        if (this.props.onSwipe) {
          this.props.onSwipe(deltaY > 0 ? 'down' : 'up') // <-- Aquí se ejecuta
        }
      }

      // Regresar a posición original
      element.style.transform = 'translateY(0px)'
    }

    this.startY = 0
    this.currentY = 0
  }

  getScrollResistance = deltaY => {
    // Agregar resistencia cuando se llega a los límites
    const maxScroll = window.innerHeight * 0.3 // 30% de la altura de pantalla
    const resistance = Math.max(0.1, 1 - Math.abs(deltaY) / maxScroll)
    return resistance
  }

  getProjectData = () => {
    const { slideData, title, description, image } = this.props

    switch (slideData?.type) {
      case 'universidad':
        return {
          titulo: 'Universidad Destacada - Programas Académicos',
          fecha: '2024',
          estudiante: 'Equipo Académico',
          descripcion:
            'Descubre nuestros programas académicos de alta calidad y la experiencia universitaria integral que ofrecemos. Contamos con acreditaciones internacionales y un cuerpo docente altamente calificado que garantiza una formación de excelencia.',
          imagenes: [
            image,
            'https://www.javeriana.edu.co/sostenibilidad/wp-content/uploads/2021/07/Campus-Sustentable_0000_Javeriana-Sostenible.jpg',
            'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj2'
          ]
        }

      case 'investigacion':
        return {
          titulo: 'Investigación de Clase Mundial',
          fecha: '2023-2024',
          estudiante: 'Centro de Investigación',
          descripcion:
            'Conoce nuestros proyectos de investigación innovadores y logros académicos que contribuyen al avance del conocimiento. Nuestros centros especializados desarrollan investigación de alto impacto con colaboraciones internacionales.',
          imagenes: [
            image,
            'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj2',
            'https://www.javeriana.edu.co/sostenibilidad/wp-content/uploads/2021/07/Campus-Sustentable_0000_Javeriana-Sostenible.jpg'
          ]
        }

      case 'campus':
        return {
          titulo: 'Campus Innovador - Instalaciones Modernas',
          fecha: '2024',
          estudiante: 'Departamento de Infraestructura',
          descripcion:
            'Explora nuestras instalaciones modernas y entorno de aprendizaje diseñado para potenciar el desarrollo académico. Contamos con laboratorios de última tecnología, bibliotecas digitales y espacios colaborativos.',
          imagenes: [
            image,
            'https://www.javeriana.edu.co/sostenibilidad/wp-content/uploads/2021/07/Campus-Sustentable_0000_Javeriana-Sostenible.jpg',
            'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj1'
          ]
        }

      case 'comunidad':
        return {
          titulo: 'Comunidad Estudiantil Diversa',
          fecha: '2024',
          estudiante: 'Bienestar Universitario',
          descripcion:
            'Forma parte de nuestra comunidad diversa y vibrante donde cada estudiante encuentra su lugar. Ofrecemos múltiples organizaciones estudiantiles, eventos culturales y programas de liderazgo que enriquecen la experiencia universitaria.',
          imagenes: [
            image,
            'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj3',
            'https://marionoriegaasociados.com/wp-content/uploads/2021/02/pweb_pm_javeriana-proyectos_01.png'
          ]
        }

      case 'internacional':
        return {
          titulo: 'Oportunidades Internacionales',
          fecha: '2023-2024',
          estudiante: 'Oficina de Relaciones Internacionales',
          descripcion:
            'Descubre programas de intercambio y colaboraciones globales que amplían tu perspectiva académica y cultural. Ofrecemos intercambios académicos, doble titulación y programas de inmersión en universidades de prestigio mundial.',
          imagenes: [
            image,
            'https://marionoriegaasociados.com/wp-content/uploads/2021/02/pweb_pm_javeriana-proyectos_01.png',
            'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj1'
          ]
        }

      default:
        return {
          titulo: title || 'Proyecto Universitario',
          fecha: '2024',
          estudiante: 'Equipo de Desarrollo',
          descripcion: description || 'Información detallada sobre este proyecto universitario y sus características principales.',
          imagenes: [
            image,
            'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj1',
            'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj2'
          ]
        }
    }
  }

  render() {
    const projectData = this.getProjectData()

    return (
      <div
        className='project-details'
        ref={this.projectDetailsRef}
        style={{
          touchAction: 'pan-y',
          userSelect: 'none'
        }}>
        <div className='project-layout'>
          <div className='project-info'>
            <Title>
              <h2>{projectData.titulo}</h2>
            </Title>
            <div className='info-row'>
              <strong>Fecha</strong>
              <span>{projectData.fecha}</span>
            </div>
            <div className='info-row'>
              <strong>Responsable</strong>
              <span>{projectData.estudiante}</span>
            </div>
            <div className='info-row'>
              <strong>Descripción</strong>
              <Paragraph>
                {' '}
                <p>{projectData.descripcion}</p>
              </Paragraph>
            </div>
          </div>

          <div className='project-gallery'>
            {projectData.imagenes.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`${projectData.titulo} - Imagen ${index + 1}`}
                style={{
                  width: '100%',
                  marginBottom: '1rem',
                  objectFit: 'cover',
                  pointerEvents: 'none'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default DetalleProyecto
