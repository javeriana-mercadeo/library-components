import Container from '@library/components/container'
import Title from '@library/components/contain/title'
import Image from '@library/components/contain/image'

import React from 'react'
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

  // Ejecutar script al cargar el componente
  if (typeof window !== 'undefined') {
    // Usar setTimeout para ejecutar después del render
    setTimeout(() => {
      try {
        console.log('Ejecutando script del slider desde JSX...')
        script()
      } catch (error) {
        console.error('Error ejecutando script:', error)
      }
    }, 100)
  }

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
              <div key={`student-${index}`} className='student-card' id={`${elementName}-card-${index}`} data-index={index}>
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
              className='dot'
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
