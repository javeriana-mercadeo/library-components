import React from 'react'
import './styles.scss'
import MoreDoubts from '@library/_institutional/sections/helpPage/sections/moreDoubts'
const Index = () => {
  return (
    <section className="data-section">
      <h2 className='inscription-title'>Proceso de inscripción</h2>
      <div className="data-header">
        <h2>¿Dónde puedo consultar las fechas clave del proceso de admisión?</h2>
      </div>

      <div className="data-links">
        <div className="data-p">
          <p>Las fechas de inscripciones, pruebas y publicación de resultados varían según el programa. Puedes consultarlas en:</p>
        </div>

        <div className="data-item">
          <ul>
            <li>Página oficial de admisiones en la sección de Calendario académico.</li>
            <li>Comunicaciones enviadas a tu correo registrado en ACCESO.</li>
            <li>Redes sociales y boletines informativos de la universidad.</li>
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
