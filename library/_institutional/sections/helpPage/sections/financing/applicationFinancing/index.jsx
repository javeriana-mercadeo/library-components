import React from 'react'
import './styles.scss'

const Index = () => {
  return (
    <section className="documentation-section">
      <h2 className="inscription-title">Becas y Financiación</h2>

      {/* Sección: Cómo aplicar */}
      <div className="documentation-header">
        <h2>¿Cómo puedo aplicar a una beca o ayuda financiera?</h2>
      </div>

      <p className="note">El proceso de postulación varía según el tipo de beca. En general, debes:</p>

      <div className="aplication-item">
        <ol>
          <li>Revisar los requisitos específicos de la beca de interés.</li>
          <li>Completar el formulario de solicitud en línea.</li>
          <li>Adjuntar los documentos requeridos, como certificados académicos, carta de motivación o pruebas económicas.</li>
          <li>Esperar la evaluación de tu solicitud y la publicación de resultados.</li>
        </ol>
      </div>

      <p className="note">
        <strong>Importante:</strong> Algunas becas no requieren postulación, como la <em>Beca Semestral por Excelencia Académica</em>, que
        se otorga automáticamente al mejor estudiante de cada carrera.
      </p>

      <p className="note">
        Accede al formulario de solicitud aquí:{' '}
        <a href="https://www.javeriana.edu.co/becas" target="_blank" rel="noopener noreferrer">
          Portal de Becas Javeriana ↗
        </a>
      </p>
    </section>
  )
}

export default Index
