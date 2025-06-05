'use client'

import { useEffect } from 'react'
import Container from '@library/components/container'

import script from './script.js'
import './styles.scss'

const MateriasSemestre = () => {
  useEffect(() => {
    script()
  }, [])

  return (
    <section id="section-two" className="section-dos">
      <Container className="container subjects-carousel">
        <h2 className="text-align-movil subjects-carousel__title">Materias por Semestre</h2>
        <p className="text-align-movil">
          El plan de estudios profundiza en asignaturas en las áreas de: edificaciones, infraestructura vial e hidrotecnia.
        </p>

        <button
          data-dmpa-element-id="btn"
          className="btn btn-primary btn-outline btn-md"
          type="button"
          data-lfr-editable-id="btn"
          data-lfr-editable-type="text">
          <span className="btn-text">Descargar Plan de Estudios</span>
          <span className="btn-icon btn-icon-end">
            <i className="ph ph-download" aria-hidden="true"></i>
          </span>
        </button>

        {/* <a
            href="ruta/al/archivo.pdf"
            download="Plan-de-Estudios.pdf"
            className="button-plan text-blue-700 hover:text-white border border-blue-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex items-center gap-2"
            aria-label="Descargar Plan de Estudios en formato PDF">
            Descargar Plan de Estudios
            <i className="ph ph-download" aria-hidden="true"></i>
          </a> */}

        <div className="container swiper">
          <div className="card-wrapper subjects-swiper">
            {/* Card slides container */}
            <div className="card-list swiper-wrapper" role="list">
              {/* Semestre 1 - Año 1 */}
              <div className="card-item swiper-slide" role="listitem">
                <div className="card-link">
                  <div className="card-header">
                    <span className="badge">Año 1</span>
                  </div>
                  <h3 className="title-subjects mb-2 text-2xl font-bold tracking-tight text-gray-900">Semestre 1</h3>
                  <ul className="subjects-list">
                    <li>
                      <i className="ph ph-check" aria-hidden="true"></i> Cálculo Diferencial
                    </li>
                    <li>
                      <i className="ph ph-check" aria-hidden="true"></i> Álgebra Lineal
                    </li>
                    <li>
                      <i className="ph ph-check" aria-hidden="true"></i> Física Mecánica
                    </li>
                    <li>
                      <i className="ph ph-check" aria-hidden="true"></i> Química de Materiales
                    </li>
                    <li>
                      <i className="ph ph-check" aria-hidden="true"></i> Geometría Descriptiva
                    </li>
                    <li>
                      <i className="ph ph-check" aria-hidden="true"></i> Introducción a la Ingeniería
                    </li>
                    <li>
                      <i className="ph ph-check" aria-hidden="true"></i> Proyecto de Diseño en Ingeniería I
                    </li>
                  </ul>
                  <div className="content-credits">
                    <span className="credits">
                      <strong>17</strong> Créditos
                    </span>
                  </div>
                </div>
              </div>

              {/* Semestre 2 - Año 1 */}
              <div className="card-item swiper-slide" role="listitem">
                <div className="card-link">
                  <div className="card-header">
                    <span className="badge">Año 1</span>
                  </div>
                  <h3 className="title-subjects mb-2 text-2xl font-bold tracking-tight text-gray-900">Semestre 2</h3>
                  <ul className="subjects-list">
                    <li>
                      <i className="ph ph-check" aria-hidden="true"></i> Cálculo Integral
                    </li>
                    <li>
                      <i className="ph ph-check" aria-hidden="true"></i> Álgebra Abstracta
                    </li>
                    <li>
                      <i className="ph ph-check" aria-hidden="true"></i> Física Eléctrica
                    </li>
                    <li>
                      <i className="ph ph-check" aria-hidden="true"></i> Programación en C
                    </li>
                    <li>
                      <i className="ph ph-check" aria-hidden="true"></i> Ecuaciones Diferenciales
                    </li>
                    <li>
                      <i className="ph ph-check" aria-hidden="true"></i> Probabilidad y Estadística
                    </li>
                    <li>
                      <i className="ph ph-check" aria-hidden="true"></i> Proyecto de Diseño en Ingeniería II
                    </li>
                  </ul>
                  <div className="content-credits">
                    <span className="credits">
                      <strong>17</strong> Créditos
                    </span>
                  </div>
                </div>
              </div>

              {/* Semestre 1 - Año 2 */}
              <div className="card-item swiper-slide" role="listitem">
                <div className="card-link">
                  <div className="card-header">
                    <span className="badge">Año 2</span>
                  </div>
                  <h3 className="title-subjects mb-2 text-2xl font-bold tracking-tight text-gray-900">Semestre 1</h3>
                  <ul className="subjects-list">
                    <li>
                      <i className="ph ph-check" aria-hidden="true"></i> Cálculo Vectorial
                    </li>
                    <li>
                      <i className="ph ph-check" aria-hidden="true"></i> Métodos Numéricos
                    </li>
                    <li>
                      <i className="ph ph-check" aria-hidden="true"></i> Física Moderna
                    </li>
                    <li>
                      <i className="ph ph-check" aria-hidden="true"></i> Diseño Digital
                    </li>
                    <li>
                      <i className="ph ph-check" aria-hidden="true"></i> Mecánica de Materiales
                    </li>
                    <li>
                      <i className="ph ph-check" aria-hidden="true"></i> Electricidad y Magnetismo
                    </li>
                    <li>
                      <i className="ph ph-check" aria-hidden="true"></i> Proyecto de Diseño en Ingeniería III
                    </li>
                  </ul>
                  <div className="content-credits">
                    <span className="credits">
                      <strong>17</strong> Créditos
                    </span>
                  </div>
                </div>
              </div>

              {/* Semestre 2 - Año 2 */}
              <div className="card-item swiper-slide" role="listitem">
                <div className="card-link">
                  <div className="card-header">
                    <span className="badge">Año 2</span>
                  </div>
                  <h3 className="title-subjects mb-2 text-2xl font-bold tracking-tight text-gray-900">Semestre 2</h3>
                  <ul className="subjects-list">
                    <li>
                      <i className="ph ph-check" aria-hidden="true"></i> Análisis Complejo
                    </li>
                    <li>
                      <i className="ph ph-check" aria-hidden="true"></i> Sistemas de Control
                    </li>
                    <li>
                      <i className="ph ph-check" aria-hidden="true"></i> Electrónica Analógica
                    </li>
                    <li>
                      <i className="ph ph-check" aria-hidden="true"></i> Termodinámica
                    </li>
                    <li>
                      <i className="ph ph-check" aria-hidden="true"></i> Fundamentos de Redes
                    </li>
                    <li>
                      <i className="ph ph-check" aria-hidden="true"></i> Procesamiento de Señales
                    </li>
                    <li>
                      <i className="ph ph-check" aria-hidden="true"></i> Proyecto de Diseño en Ingeniería IV
                    </li>
                  </ul>
                  <div className="content-credits">
                    <span className="credits">
                      <strong>17</strong> Créditos
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Paginación */}
            <div className="swiper-pagination subjects-pagination" role="tablist" aria-label="Control de páginas del carrusel"></div>

            {/* Botones de navegación */}

            <button className="swiper-slide-button subjects-prev" aria-label="Ir al slide anterior" type="button">
              <i className="ph ph-arrow-circle-left" aria-hidden="true"></i>
            </button>
            <button className="swiper-slide-button subjects-next" aria-label="Ir al siguiente slide" type="button">
              <i className="ph ph-arrow-circle-right" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default MateriasSemestre
