import React from 'react'
import './styles.scss'

const Index = () => {
  return (
    <section className="documentation-section">
      <h2 className="inscription-title">Internacionalización y Movilidad</h2>

      <div className="documentation-header">
        <h2>¿Qué apoyo brinda la universidad a estudiantes extranjeros?</h2>
      </div>

      <p className="note">La Javeriana ofrece varias formas de apoyo para estudiantes internacionales:</p>

      <div className="options-item">
        <ul>
          <li>
            <strong>Asesoría en movilidad:</strong> Acompañamiento antes, durante y después del intercambio.
          </li>
          <li>
            <strong>Orientación en alojamiento:</strong> Aunque la Javeriana no tiene residencias propias, brinda información sobre opciones
            seguras de vivienda.
          </li>
          <li>
            <strong>Acceso a servicios universitarios:</strong> Biblioteca, centro deportivo, bienestar universitario, actividades
            culturales, entre otros.
          </li>
          <li>
            <strong>Programas de integración:</strong> Participación en el programa de Voluntariado, Language Exchange Day (LED) y Semana
            Internacional.
          </li>
        </ul>
      </div>

      <p className="note">
        Contacto:{' '}
        <a href="foreignstudents@javeriana.edu.co" target="_blank" rel="noopener noreferrer">
          foreignstudents@javeriana.edu.co
        </a>
      </p>
    </section>
  )
}

export default Index
