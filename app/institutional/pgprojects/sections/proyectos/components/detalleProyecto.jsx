import React from 'react'
import './styles.scss'

const DetalleProyecto = ({ slideData }) => {
  const renderDetalleContent = () => {
    switch (slideData?.type) {
      case 'universidad':
        return (
          <div className="detalle-content">
            <h2>Universidad Destacada</h2>
            <p>Información detallada sobre nuestros programas académicos...</p>
            <ul>
              <li>Programas de pregrado y posgrado</li>
              <li>Acreditaciones internacionales</li>
              <li>Cuerpo docente altamente calificado</li>
            </ul>
          </div>
        )
      
      case 'investigacion':
        return (
          <div className="detalle-content">
            <h2>Investigación de Clase Mundial</h2>
            <p>Nuestros proyectos de investigación y logros académicos...</p>
            <ul>
              <li>Centros de investigación especializados</li>
              <li>Publicaciones científicas</li>
              <li>Colaboraciones internacionales</li>
            </ul>
          </div>
        )
      
      case 'campus':
        return (
          <div className="detalle-content">
            <h2>Campus Innovador</h2>
            <p>Nuestras instalaciones modernas y entorno de aprendizaje...</p>
            <ul>
              <li>Laboratorios de última tecnología</li>
              <li>Bibliotecas digitales</li>
              <li>Espacios de colaboración</li>
            </ul>
          </div>
        )
      
      case 'comunidad':
        return (
          <div className="detalle-content">
            <h2>Comunidad Estudiantil</h2>
            <p>Forma parte de nuestra comunidad diversa y vibrante...</p>
            <ul>
              <li>Organizaciones estudiantiles</li>
              <li>Eventos culturales</li>
              <li>Programas de liderazgo</li>
            </ul>
          </div>
        )
      
      case 'internacional':
        return (
          <div className="detalle-content">
            <h2>Oportunidades Internacionales</h2>
            <p>Programas de intercambio y colaboraciones globales...</p>
            <ul>
              <li>Intercambios académicos</li>
              <li>Doble titulación</li>
              <li>Programas de inmersión</li>
            </ul>
          </div>
        )
      
      default:
        return (
          <div className="detalle-content">
            <h2>Información del Proyecto</h2>
            <p>Detalles no disponibles</p>
          </div>
        )
    }
  }

  return (
    <div className="detalle-proyecto">
      {renderDetalleContent()}
    </div>
  )
}

export default DetalleProyecto