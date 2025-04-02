import React from 'react'
import './styles.scss'
import MoreDoubts from '@library/_institutional/sections/helpPage/sections/moreDoubts'
const Index = () => {
  return (
    <section className="when-section">
      <h2 className='inscription-title'>Proceso de inscripción</h2>
      <div className="when-header">
        <h2>¿Cuándo y cómo recibiré los resultados de admisión?</h2>
      </div>

      <p className="note">
        Los resultados estarán disponibles en ACCESO, en la pestaña de ADMISIÓN. También recibirás una notificación por correo electrónico.
      </p>

      <div className="when-links">
        <div className="when-p">
          <h3>Si eres admitido, el sistema te permitirá:</h3>
        </div>

        <div className="when-item">
          <ul>
            <li>Descargar tu Certificado de Admisión.</li>
            <li>Aceptar, reservar o declinar tu cupo.</li>
            <li>Generar el recibo de matrícula para pago en línea o en bancos autorizados.</li>
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
