import React from 'react'
import './styles.scss'


const Index = () => {
  return (
    <section className="upload-section">
      <h2 className="inscription-title">Proceso de inscripción</h2>
      <div className="upload-header">
        <h2>¿Cómo subo mis documentos a la plataforma?</h2>
      </div>

      <div className="upload-links">
        <div className="upload-item">
          <ol>
            <li>Ingresa a ACCESO con tu usuario y contraseña.</li>
            <li>Dirígete a la pestaña de INSCRIPCIÓN y selecciona la sección "Adjuntar documentos".</li>
            <li>Sube cada documento en formato PDF (máximo 4 MB).</li>
            <li>Verifica que los archivos sean legibles y estén completos.</li>
            <li>Guarda y revisa el estado de tu carga en la plataforma.</li>
          </ol>
        </div>

        <div className="sub-title">
          <h2>Video explicativo: Cómo subir documentos a ACCESO</h2>
        </div>

        {/* Sección del video */}
        <div className="video-container">
          <video controls width="100%">
            <source src="/assets/help.mp4" type="video/mp4" />
            Tu navegador no soporta la etiqueta de video.
          </video>
        </div>
      </div>
    </section>
  )
}

export default Index
