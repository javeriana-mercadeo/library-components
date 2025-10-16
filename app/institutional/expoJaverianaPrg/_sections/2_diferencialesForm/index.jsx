'use client'

import { useEffect } from 'react'

import Btn from '@/app/_library/components/contain/btn'
import script from './script.js'
import info from './info.json'
import './styles.scss'

const DiferencialesForm = () => {
  const elementName = info.id || 'diferenciales-form'
  const baseClass = 'diferenciales-form'

  // Inicializar script cuando el componente se monta
  useEffect(() => {
    script()
  }, [])

  return (
    <div className={baseClass} id={elementName}>
      <div className={`${baseClass}__container`}>
        {/* Columna Izquierda - Contenido de texto */}
        <div className={`${baseClass}__left`}>
          <div className={`${baseClass}__content`}>
            <h2 className={`${baseClass}__title`} data-lfr-editable-id='diferenciales-title-1' data-lfr-editable-type='text'>
              ¿Por qué llevar a tus estudiantes a Expojaveriana?
            </h2>

            <p className={`${baseClass}__description`} data-lfr-editable-id='diferenciales-description' data-lfr-editable-type='rich-text'>
              La elección de universidad es un momento decisivo en la vida de cada joven. En la Javeriana, encontrarán un espacio académico
              y humano que los inspira a crecer, explorar y transformar su futuro.
            </p>

            <h2 className={`${baseClass}__title`} data-lfr-editable-id='diferenciales-title-2' data-lfr-editable-type='text'>
              Razones para elegir la Javeriana
            </h2>

            {/* Grid de razones */}
            <div className={`${baseClass}__reasons-grid`}>
              {/* Fila 1 */}
              <div className={`${baseClass}__reason-item`}>
                <div className={`${baseClass}__reason-icon`}>
                  <i className='ph ph-graduation-cap'></i>
                </div>
                <div
                  className={`${baseClass}__reason-text`}
                  data-lfr-editable-id='diferenciales-reason-1'
                  data-lfr-editable-type='rich-text'>
                  <strong>Excelencia académica:</strong> más de 90 años formando profesionales; 97% de nuestros pregrados acreditados en
                  alta calidad.
                </div>
              </div>

              {/* Fila 2 */}
              <div className={`${baseClass}__reason-item`}>
                <div className={`${baseClass}__reason-icon`}>
                  <i className='ph ph-users-three'></i>
                </div>
                <div
                  className={`${baseClass}__reason-text`}
                  data-lfr-editable-id='diferenciales-reason-2'
                  data-lfr-editable-type='rich-text'>
                  <strong>Oportunidades reales:</strong> becas, financiación y programas de doble titulación que amplían horizontes.
                </div>
              </div>

              {/* Fila 3 */}
              <div className={`${baseClass}__reason-item`}>
                <div className={`${baseClass}__reason-icon`}>
                  <i className='ph ph-globe-hemisphere-west'></i>
                </div>
                <div
                  className={`${baseClass}__reason-text`}
                  data-lfr-editable-id='diferenciales-reason-3'
                  data-lfr-editable-type='rich-text'>
                  <strong>Internacionalización:</strong> Convenios con más de 400 en 40 países y dobles titulaciones con instituciones como
                  Sorbonne, Boston College, ParisTech, Queensland o PoliTo.
                </div>
              </div>

              {/* Fila 4 */}
              <div className={`${baseClass}__reason-item`}>
                <div className={`${baseClass}__reason-icon`}>
                  <i className='ph ph-gear-six'></i>
                </div>
                <div
                  className={`${baseClass}__reason-text`}
                  data-lfr-editable-id='diferenciales-reason-4'
                  data-lfr-editable-type='rich-text'>
                  <strong>Innovación y tecnología:</strong> 44 nuevos laboratorios, bibliotecas y espacios de vanguardia para el
                  aprendizaje.
                </div>
              </div>

              {/* Fila 5 */}
              <div className={`${baseClass}__reason-item`}>
                <div className={`${baseClass}__reason-icon`}>
                  <i className='ph ph-handshake'></i>
                </div>
                <div
                  className={`${baseClass}__reason-text`}
                  data-lfr-editable-id='diferenciales-reason-5'
                  data-lfr-editable-type='rich-text'>
                  <strong>Formación integral:</strong> investigación, voluntariado y proyectos sociales que forman líderes comprometidos con
                  el país.
                </div>
              </div>

              {/* Fila 6 */}
              <div className={`${baseClass}__reason-item`}>
                <div className={`${baseClass}__reason-icon`}>
                  <i className='ph ph-tree'></i>
                </div>
                <div
                  className={`${baseClass}__reason-text`}
                  data-lfr-editable-id='diferenciales-reason-6'
                  data-lfr-editable-type='rich-text'>
                  <strong>Campus sostenible:</strong> con certificación Carbono Neutro y espacios innovadores reconocidos por el Banco
                  Mundial (EDGE).
                </div>
              </div>
            </div>

            {/* Botón de inscripción */}
            <div className={`${baseClass}__cta-container`}>
              <Btn color='tertiary' variant='solid' size='lg'>
                Inscribe tu colegio ahora
              </Btn>
            </div>
          </div>
        </div>

        {/* Columna Derecha - Formulario (Drop Zone Liferay) */}
        <div className={`${baseClass}__right`}>
          <lfr-drop-zone id='drop-zone'></lfr-drop-zone>
        </div>
      </div>
    </div>
  )
}

export default DiferencialesForm
