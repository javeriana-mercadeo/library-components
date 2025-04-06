import React from 'react'
import './styles.scss'
const Index = () => {
  return (
    <section className="steps-section">
      <h2 className="inscription-title">Proceso de inscripción</h2>
      <div className="steps-header">
        <h2>¿Cuáles son los pasos para inscribirme en la universidad?</h2>
      </div>

      <div className="steps-links">
        <div className="steps-p">
          <p>El proceso de inscripción en la Javeriana se realiza a través del sistema ACCESO. Sigue estos pasos:</p>
        </div>

        <div className="steps-item">
          <ol>
            <li>Ingresa a la página oficial de la universidad y haz clic en "Estudia en la Javeriana" &gt; "Inscríbete".</li>
            <li>Regístrate y crea un usuario en el sistema de Autoservicio de Admisiones (ACCESO).</li>
            <li>Completa el formulario con datos personales y académicos.</li>
            <li>Selecciona el programa al que deseas aplicar y realiza el pago de inscripción.</li>
            <li>Si tu programa lo requiere, agéndate para pruebas o entrevistas.</li>
            <li>Adjunta los documentos necesarios.</li>
            <li>Consulta el estado de tu inscripción y sigue el proceso en línea.</li>
          </ol>
        </div>

        <div className="sub-title">
          <h2>Video explicativo: Proceso de inscripción</h2>
        </div>

        {/* Sección del video */}
        <div className="video-container">
          <video controls width="100%">
            <source src="../../assets/help.mp4" type="video/mp4" />
            Tu navegador no soporta la etiqueta de video.
          </video>
        </div>
      </div>
    </section>
  )
}

export default Index
