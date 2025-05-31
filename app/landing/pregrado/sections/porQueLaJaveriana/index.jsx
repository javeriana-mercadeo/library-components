'use client'

import { useEffect } from 'react'
import Paragraph from '@library/components/contain/paragraph'

import whyJaverianaImg from '../../../../../assets/whyJaveriana/why-javeriana.png'

import script from './script.js'
import './styles.scss'

const PorqueLaJaveriana = () => {
  // Ejecutar el script cuando el componente se monta
  useEffect(() => {
    script()
  }, [])

  return (
<section id="section-four">
  <div className="container why-javeriana">
    <div className="section-four-title">
      <h2 className="why-javeriana__title">¿Por qué elegir la Javeriana?</h2>
    </div>

    <div className="why-javeriana__container">
      <div className="why-javeriana__column">

        <div id="accordion-open" data-accordion="open" className="border border-gray-200 p-4 rounded-lg">
          {/* Título e Ícono */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <i className="ph ph-graduation-cap text-blue-500 text-2xl"></i>
              <Paragraph className="font-semibold text-gray-900" isEditable={true}>Doble titulación</Paragraph>
            </div>

            {/* Botón solo en mobile */}
            <button type="button"
              className="flex items-center text-blue-500 font-bold gap-2 focus:outline-none transition-all lg:hidden"
              data-accordion-target="#accordion-open-body-1"
              aria-expanded="false"
              aria-controls="accordion-open-body-1">
              <span className="toggle-text">Leer Más</span>
              <i className="ph ph-plus"></i>
            </button>
          </div>

          {/* Contenido */}
          <div id="accordion-open-body-1" className="mt-2 text-gray-700 accordion-content">
            <p>
              Tendrás la posibilidad de obtener la doble titulación con universidades como el Politécnico de Turín, Politécnico de Milán y Paris Tech.
            </p>
          </div>
        </div>

        {/* Múltiple programa */}
        <div id="accordion-open-1" data-accordion="open" className="border border-gray-200 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <i className="ph ph-books text-blue-500 text-2xl"></i>
              <p className="font-semibold text-gray-900">Múltiple programa</p>
            </div>

            {/* Botón solo en mobile */}
            <button type="button"
              className="flex items-center text-blue-500 font-bold gap-2 focus:outline-none transition-all lg:hidden"
              data-accordion-target="#accordion-body-1" 
              aria-expanded="false" 
              aria-controls="accordion-body-1">
              <span className="toggle-text">Leer Más</span>
              <i className="ph ph-plus"></i>
            </button>
          </div>

          <div id="accordion-body-1" className="mt-2 text-gray-700 accordion-content">
            <p>
              Tendrás la posibilidad de hacer dos o más carreras simultáneamente, de acuerdo con tus intereses profesionales.
            </p>
          </div>
        </div>

        {/* Consejería Académica */}
        <div id="accordion-open-2" data-accordion="open" className="border border-gray-200 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <i className="ph ph-user-circle text-blue-500 text-2xl"></i>
              <p className="font-semibold text-gray-900">Consejería Académica</p>
            </div>

            <button type="button"
              className="flex items-center text-blue-500 font-bold gap-2 focus:outline-none transition-all lg:hidden"
              data-accordion-target="#accordion-body-2" 
              aria-expanded="false" 
              aria-controls="accordion-body-2">
              <span className="toggle-text">Leer Más</span>
              <i className="ph ph-plus"></i>
            </button>
          </div>

          <div id="accordion-body-2" className="mt-2 text-gray-700 accordion-content">
            <p>
              Te acompañamos con apoyo académico y personal, guiados por un profesor que ofrece estrategias personalizadas para tu bienestar integral.
            </p>
          </div>
        </div>

      </div>

      <div className="why-javeriana__image">
        <img src={whyJaverianaImg.src} alt="Estudiantes en laboratorio" />
      </div>

      <div className="why-javeriana__column">

        {/* Validación RIBA */}
        <div id="accordion-open-3" data-accordion="open" className="border border-gray-200 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <i className="ph ph-star text-blue-500 text-2xl"></i>
              <p className="font-semibold text-gray-900">Validación RIBA</p>
            </div>

            <button type="button"
              className="flex items-center text-blue-500 font-bold gap-2 focus:outline-none transition-all lg:hidden"
              data-accordion-target="#accordion-body-3" 
              aria-expanded="false" 
              aria-controls="accordion-body-3">
              <span className="toggle-text">Leer Más</span>
              <i className="ph ph-plus"></i>
            </button>
          </div>

          <div id="accordion-body-3" className="mt-2 text-gray-700 accordion-content">
            <p>
              Reconocimiento del Royal Institute of British Architects, destacando la calidad del programa y abriendo oportunidades internacionales.
            </p>
          </div>
        </div>

        {/* Experiencia directa */}
        <div id="accordion-open-4" data-accordion="open" className="border border-gray-200 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <i className="ph ph-lightbulb text-blue-500 text-2xl"></i>
              <p className="font-semibold text-gray-900">Experiencia directa</p>
            </div>

            <button type="button"
              className="flex items-center text-blue-500 font-bold gap-2 focus:outline-none transition-all lg:hidden"
              data-accordion-target="#accordion-body-4" 
              aria-expanded="false" 
              aria-controls="accordion-body-4">
              <span className="toggle-text">Leer Más</span>
              <i className="ph ph-plus"></i>
            </button>
          </div>

          <div id="accordion-body-4" className="mt-2 text-gray-700 accordion-content">
            <p>
              Aprende a través de experiencias prácticas y formación personalizada, enfocada en tus intereses y desarrollo individual.
            </p>
          </div>
        </div>

        {/* Actividades nacionales e internacionales */}
        <div id="accordion-open-5" data-accordion="open" className="border border-gray-200 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <i className="ph ph-globe text-blue-500 text-2xl"></i>
              <p className="font-semibold text-gray-900">Actividades nacionales e internacionales</p>
            </div>

            <button type="button"
              className="flex items-center text-blue-500 font-bold gap-2 focus:outline-none transition-all lg:hidden"
              data-accordion-target="#accordion-body-5" 
              aria-expanded="false" 
              aria-controls="accordion-body-5">
              <span className="toggle-text">Leer Más</span>
              <i className="ph ph-plus"></i>
            </button>
          </div>

          <div id="accordion-body-5" className="mt-2 text-gray-700 accordion-content">
            <p>
              Realiza cursos en España, Italia, México y más; participa en concursos globales y haz tu práctica preprofesional en cualquier parte del mundo.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}
export default PorqueLaJaveriana