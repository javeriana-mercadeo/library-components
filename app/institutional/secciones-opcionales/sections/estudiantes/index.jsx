'use client'
import Container from '@library/components/container'
import Title from '@library/components/contain/title'
import Image from '@library/components/contain/image'

import React, { useEffect } from 'react'
import script from './script.js'
import info from './info.json'
import './styles.scss'

const StudentSlider = () => {
  const elementName = info.id || 'student-slider'

  // Datos de estudiantes
  const studentsData = [
    {
      name: 'Elena Ramírez',
      position: 'Chief Innovation Officer',
      company: 'Tesla',
      logo: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/tesla',
      image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/estudiante-uno'
    },
    {
      name: 'Ricardo Fernández',
      position: 'Vicepresidente de Estrategia Global',
      company: 'Google',
      logo: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/google',
      image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/estudiante-dos'
    },
    {
      name: 'Elena Ramírez',
      position: 'Chief Innovation Officer',
      company: 'Tesla',
      logo: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/tesla',
      image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/estudiante-uno'
    },
    {
      name: 'Ricardo Fernández',
      position: 'Vicepresidente de Estrategia Global',
      company: 'Google',
      logo: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/google',
      image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj3'
    },
    {
      name: 'Valeria López',
      position: 'Directora de Desarrollo de Negocios',
      company: 'Microsoft',
      logo: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/microsoft',
      image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/estudiante-tres'
    }
  ]

  // Función para obtener la clase inicial de cada card
  const getInitialCardClass = (index) => {
    if (index === 0) return 'student-card active'
    if (index === 1) return 'student-card next'
    if (index === 2) return 'student-card next-next'
    if (index === studentsData.length - 2) return 'student-card prev-prev'
    if (index === studentsData.length - 1) return 'student-card prev'
    return 'student-card'
  }

  // Ejecutar script al cargar el componente
  useEffect(() => {
    script()
  }, [])

  return (
    <section id={elementName}>
      <Container className='slider-container'>
        <Title className='slider-title'>Estudiantes</Title>

        <div className='slider-content' id={`${elementName}-content`}>
          <div className='carousel-controlsE'>
            <button className='carousel-controlE prev' id={`${elementName}-prev`} aria-label='Anterior estudiante' type='button'>
              <i className='ph ph-arrow-circle-left'></i>
            </button>
            <button className='carousel-controlE next' id={`${elementName}-next`} aria-label='Siguiente estudiante' type='button'>
              <i className='ph ph-arrow-circle-right'></i>
            </button>
          </div>

          <div className='slider-cards' id={`${elementName}-cards`}>
            {studentsData.map((student, index) => (
              <div key={`student-${index}`} className={getInitialCardClass(index)} id={`${elementName}-card-${index}`} data-index={index}>
                <div className='student-image'>
                  <Image id={`${elementName}-image-${index}`} src={student.image} alt={student.name} />
                </div>
                <div className='student-info'>
                  <h3 id={`${elementName}-name-${index}`}>{student.name}</h3>
                  <p id={`${elementName}-position-${index}`}>{student.position}</p>
                  <div className='company-logo'>
                    <Image className='imglogoC' id={`${elementName}-logo-${index}`} src={student.logo} alt={student.company} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='slider-dots' id={`${elementName}-dots`}>
          {studentsData.map((_, index) => (
            <span
              key={`dot-${index}`}
              className={index === 0 ? 'dot active' : 'dot'}
              id={`${elementName}-dot-${index}`}
              data-slide={index}
              role='button'
              tabIndex={0}
              aria-label={`Ir al estudiante ${index + 1}`}></span>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default StudentSlider
