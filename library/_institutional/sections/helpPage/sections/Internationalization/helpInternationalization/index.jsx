import React from 'react'
import './styles.scss'

const Index = () => {
  return (
    <section className="documentation-section">
      <h2 className="inscription-title">Internacionalización y Movilidad</h2>

      <div className="documentation-header">
        <h2>¿Existen becas o ayudas económicas para intercambios internacionales?</h2>
      </div>

      <p className="note ">
      Actualmente, la Javeriana no ofrece becas directas para intercambios, pero puedes aplicar a diferentes opciones de financiamiento:
      </p>

      <div className="documentation-links">
        {/* Becas por Excelencia Académica */}
        <div className="documentation-p">
          <h3>Becas por Excelencia Académica:</h3>
        </div>
        <div className="documentation-item">
          <ul>
            <li>
              <strong> Becas externas:</strong>  Algunas organizaciones y gobiernos ofrecen becas para estudiantes internacionales. Consulta con la Oficina de Movilidad Internacional sobre oportunidades vigentes.
            </li>
            <li>
              <strong>Convenios de reciprocidad:</strong>  Algunos acuerdos permiten no pagar matrícula en la universidad de destino.
            </li>
            <li>
              <strong>Apoyo financiero y créditos educativos:</strong>  Puedes explorar opciones con entidades como ICETEX o programas de financiamiento interno. 
             
            </li>
          
          </ul>
        </div>

        
        </div>

      <p className="note">
      Para más información:{' '}
        <a href="movilidadinternacional@javeriana.edu.co" target="_blank" rel="noopener noreferrer">
        movilidadinternacional@javeriana.edu.co
        </a>
      </p>
    </section>
  )
}

export default Index
