'use client'

import { useEffect } from 'react'

import script from './script.js'
import info from './info.json'
import './styles.scss'

const DatosExpo = () => {
  const elementName = info.id || 'datos-expo'
  const baseClass = 'datos-expo'

  // Inicializar script cuando el componente se monta
  useEffect(() => {
    script()
  }, [])

  return (
    <div className={baseClass} id={elementName}>
      {/* Rectángulo Naranja Superior - Estadísticas */}
      <div className={`${baseClass}__stats-container`}>
        <div className={`${baseClass}__stats-box`}>
          <div className={`${baseClass}__stat-item`}>
            <span className={`${baseClass}__stat-number`}>+21.000</span>
            <span className={`${baseClass}__stat-label`}>estudiantes</span>
          </div>
          <div className={`${baseClass}__stat-item`}>
            <span className={`${baseClass}__stat-number`}>+3400</span>
            <span className={`${baseClass}__stat-label`}>docentes</span>
          </div>
          <div className={`${baseClass}__stat-item`}>
            <span className={`${baseClass}__stat-number`}>+45</span>
            <span className={`${baseClass}__stat-label`}>programas</span>
          </div>
        </div>
      </div>

      {/* Texto Azul Central */}
      <div className={`${baseClass}__main-title-container`}>
        <h2 className={`${baseClass}__main-title`}>Estudia en la Javeriana y vive una experiencia única</h2>
      </div>

      {/* Contenedor con Franja Naranja y Contenido Sobrepuesto */}
      <div className={`${baseClass}__bottom-section`}>
        {/* Franja Naranja de Fondo */}
        <div className={`${baseClass}__orange-strip`}></div>

        {/* Contenedor de 2 Columnas (Sobrepuesto) */}
        <div className={`${baseClass}__content-wrapper`}>
          <div className={`${baseClass}__content-grid`}>
            {/* Columna Izquierda - Imagen */}
            <div className={`${baseClass}__image-column`}>
              <img
                src="https://www.javeriana.edu.co/recursosdb/d/expojaveriana/imagen-estudia-en-la-javeriana-500-x-300px"
                alt="Estudia en la Javeriana"
                className={`${baseClass}__image`}
                loading="lazy"
              />
            </div>

            {/* Columna Derecha - Contenedor Amarillo con Lista */}
            <div className={`${baseClass}__yellow-column`}>
              <div className={`${baseClass}__yellow-box`}>
                <ul className={`${baseClass}__benefits-list`}>
                  <li className={`${baseClass}__benefit-item`}>
                    Explora oportunidades de intercambios y dobles titulaciones con{' '}
                    <strong>más de 390 convenios con instituciones en Colombia y en más de 40 países.</strong>
                  </li>
                  <li className={`${baseClass}__benefit-item`}>
                    Disfruta de nuestro amplio campus de más de{' '}
                    <strong>más de 18 hectáreas, equipado con tecnología de vanguardia.</strong>
                  </li>
                  <li className={`${baseClass}__benefit-item`}>
                    Fomentamos la investigación{' '}
                    <strong>interdisciplinaria, para que amplíes tu visión y enriquezcas tu formación.</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DatosExpo
