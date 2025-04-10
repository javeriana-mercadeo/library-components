'use client'
import React from 'react'
import '../styles/projectDetails.scss'

const ProjectDetails = () => {
  const images = [
    'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj1',
    'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj2',
    'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj3'
  ]

  return (
    <div className="project-details">
      <div className="project-layout">
        {/* Info Section */}
        <div className="project-info">
          <h2>Lorem ipsum dolor sit amet consectetur.</h2>
          <div className="info-row">
            <strong>Fecha</strong>
            <span>Fecha</span>
          </div>
          <div className="info-row">
            <strong>Estudiante</strong>
            <span>Saul Runte</span>
          </div>
          <div className="info-row">
            <strong>Descripción</strong>
            <p>
              Lorem ipsum dolor sit amet consectetur. Lacus clus volutpat pharetra eget. Fames netus ultricies mattis tristique elementum
              diam aenean. Molestie nullam tempor arcu dignissim vel velit. Eget placerat vestibulum felis egestas nibh ultricies odio
              risus. Purus pellentesque lobortis urna ultricies vestibulum. Cursus et duis sed donec interdum.
            </p>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="project-gallery">
          {images.map((src, index) => (
            <img key={index} src={src} alt={`Imagen ${index + 1}`} style={{ width: '100%', marginBottom: '1rem', objectFit: 'cover' }} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails
