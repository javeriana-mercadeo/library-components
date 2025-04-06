import React from 'react'
import './styles.scss'

const Index = () => {
  return (
    <section className="requirements-section">
      <h2 className="inscription-title">Proceso de inscripción</h2>
      <div className="requirements-header">
        <h2>¿Cuáles son los requisitos para aplicar a un programa de pregrado o posgrado?</h2>
      </div>

      <div className="requirements-links">
        <div className="requirements-p">
          <h3>Pregrados:</h3>
        </div>

        <div className="requirements-item">
          <ul>
            <li>Haber terminado el bachillerato y contar con el diploma o acta de grado.</li>
            <li>Haber presentado la prueba SABER 11 (ICFES) o un examen extranjero homologado.</li>
            <li>Documento de identidad vigente.</li>
            <li>Para programas de salud: certificado de afiliación a EPS.</li>
          </ul>
        </div>

        <div className="requirements-p">
          <h3>Posgrados:</h3>
        </div>
        <div className="requirements-item">
          <ul>
            <li>Título universitario (acta de grado o diploma).</li>
            <li>Documento de identidad o pasaporte y visa (para extranjeros).</li>
            <li>Certificado de afiliación a EPS (para programas de salud).</li>
            <li>Algunos programas pueden solicitar cartas de recomendación, ensayos o entrevistas.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Index
