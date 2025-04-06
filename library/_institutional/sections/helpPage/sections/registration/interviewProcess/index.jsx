import React from 'react'
import './styles.scss'

const Index = () => {
  return (
    <section className="interview-section">
      <h2 className="inscription-title">Proceso de inscripción</h2>
      <h2 className="interview-title">¿Cómo funciona la entrevista o prueba de admisión, si mi programa la requiere?</h2>

      <div className="interview-content">
        <p>
          <strong>Prueba de admisión:</strong> Algunos programas exigen exámenes específicos de conocimientos o habilidades. Las fechas y
          requisitos estarán disponibles en ACCESO.
        </p>

        <p>
          <strong>Entrevista:</strong> Si tu programa requiere entrevista, esta puede ser presencial o virtual. Recibirás una citación con
          la fecha y hora asignada.
        </p>

        <p>
          <strong>Pruebas adicionales:</strong> Para algunos programas (como Música, Artes Visuales o Arquitectura), puede ser necesario
          presentar audiciones o portafolios.
        </p>
      </div>
    </section>
  )
}

export default Index
