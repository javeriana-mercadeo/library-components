import React from 'react'
import './styles.scss'
import MoreDoubts from '@library/_institutional/sections/helpPage/sections/moreDoubts'
const Index = () => {
  return (
    <section className="documentation-section">
      <h2 className='inscription-title'>Proceso de inscripción</h2>
      <div className="documentation-header">
        <h2>¿Qué documentos necesito para completar mi inscripción?</h2>
      </div>

      <p className='note'>Depende del tipo de programa:</p>

      <div className="documentation-links">
        <div className="documentation-p">
          <h3>Pregrado Nacional:</h3>
        </div>

        <div className="documentation-item">
          <ul>
            <li>Acta de grado o diploma de bachillerato.</li>
            <li>Documento de identidad.</li>
            <li>Resultado de la prueba SABER 11 o examen equivalente.</li>
            <li>Certificado de EPS (solo para programas de salud).</li>
          </ul>
        </div>

        <div className="documentation-p">
          <h3>Pregrado Extranjero:</h3>
        </div>
        <div className="documentation-item">
          <ul>
            <li>Acta de grado o diploma, apostillado y convalidado.</li>
            <li>Examen de estado reconocido por el ICFES.</li>
            <li>Pasaporte, visa y cédula de extranjería (si aplica).</li>
            <li>Seguro médico internacional.</li>
          </ul>
        </div>

        <div className="documentation-p">
          <h3>Posgrado Nacional:</h3>
        </div>
        <div className="documentation-item">
          <ul>
            <li>Acta de grado o diploma de pregrado.</li>
            <li>Documento de identidad.</li>
            <li>Certificado de EPS (para programas de salud).</li>
          </ul>
        </div>

        <div className="documentation-p">
          <h3>Posgrado Extranjero:</h3>
        </div>
        <div className="documentation-item">
          <ul>
            <li>Título universitario apostillado o convalidado.</li>
            <li>Pasaporte, visa y cédula de extranjería.</li>
            <li>Seguro médico internacional.</li>
          </ul>
        </div>
      </div>
      <div className="more-doubts-container">
        <MoreDoubts />
      </div>
    </section>
  )
}

export default Index
