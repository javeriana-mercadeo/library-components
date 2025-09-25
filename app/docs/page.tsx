'use client'

// Reusable Components
import SectionTitle from '@/components/ui/SectionTitle'
import CodeBlock, { InlineCode } from '@/components/ui/CodeBlock'
import ResourceCard from '@/components/ui/ResourceCard'
import ViewComponent from '@/components/viewComponent/viewComponent'
import { Chip } from '@heroui/react'

// Configuration Components - Real imports
import GlobalAssets from '@/app/_library/_configurations/globalAssets'
import StateProgram from '@/app/_library/_configurations/stateProgram'
import LoadTheme from '@/app/_library/_configurations/loadTheme'
import LoadProgram from '@/app/_library/_configurations/loadProgram'
import LoadProgramV2 from '@/app/_library/_configurations/loadProgram-v2'
import SelectWhatsapp from '@/app/_library/_configurations/selectWhatsapp'
import MetaData from '@/app/_library/_configurations/metaData'

// Splash component (check if exists)
const Splash = () => <div>Splash - Component not found</div>

export default function DocsPage() {
  return (
    <div className='min-h-screen bg-gray-50 py-12'>
      <div className='container mx-auto px-6'>
        {/* Context del Proyecto */}
        <section className='mb-12'>
          <div className='flex items-center gap-3 mb-6'>
            <div className='w-6 h-6 bg-purple-100 rounded-md flex items-center justify-center'>
              <i className='ph ph-target text-purple-600 text-sm' />
            </div>
            <SectionTitle title='Proyecto Pikachu - Contexto' className='text-left mb-0' />
          </div>

          <div className='bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-6'>
            <div className='bg-purple-50 px-4 py-3 border-b border-gray-200'>
              <h3 className='text-base font-semibold text-gray-800 flex items-center gap-2'>
                <i className='ph ph-flag text-purple-600 text-sm' />
                Visión del Proyecto
              </h3>
            </div>
            <div className='p-6'>
              <p className='text-sm text-gray-600 mb-4 leading-relaxed'>
                La reestructuración de las Landing Pages de la oferta académica de la Pontificia Universidad Javeriana tiene como objetivo
                principal <strong>mejorar la experiencia de usuario, especialmente en dispositivos móviles</strong>.
              </p>
              <p className='text-sm text-gray-600 leading-relaxed'>
                Este proyecto facilitará el acceso a la información sobre los programas académicos y optimizará el proceso de inscripción
                con una <strong>arquitectura modular y fragmentada basada en Liferay</strong>, permitiendo gestión simplificada de contenido
                y segmentación por nivel académico.
              </p>
            </div>
          </div>

          <div className='grid md:grid-cols-2 gap-4 mb-6'>
            <div className='bg-white border border-green-200 rounded-lg p-4'>
              <div className='flex items-center gap-2 mb-3'>
                <i className='ph ph-check-circle text-green-600' />
                <h4 className='font-semibold text-gray-800'>Lo que resolvemos</h4>
              </div>
              <ul className='space-y-2 text-sm text-gray-600'>
                <li className='flex items-center gap-2'>
                  <i className='ph ph-dot-outline text-green-500 text-sm' />
                  Experiencia mobile-first optimizada
                </li>
                <li className='flex items-center gap-2'>
                  <i className='ph ph-dot-outline text-green-500 text-sm' />
                  Comunicación segmentada por nivel académico
                </li>
                <li className='flex items-center gap-2'>
                  <i className='ph ph-dot-outline text-green-500 text-sm' />
                  Biblioteca de componentes reutilizables
                </li>
                <li className='flex items-center gap-2'>
                  <i className='ph ph-dot-outline text-green-500 text-sm' />
                  Automatización de procesos clave
                </li>
                <li className='flex items-center gap-2'>
                  <i className='ph ph-dot-outline text-green-500 text-sm' />
                  Integración con Salesforce y Liferay
                </li>
              </ul>
            </div>

            <div className='bg-white border border-blue-200 rounded-lg p-4'>
              <div className='flex items-center gap-2 mb-3'>
                <i className='ph ph-users text-blue-600' />
                <h4 className='font-semibold text-gray-800'>Usuarios objetivo</h4>
              </div>
              <ul className='space-y-2 text-sm text-gray-600'>
                <li className='flex items-center gap-2'>
                  <i className='ph ph-dot-outline text-blue-500 text-sm' />
                  Aspirantes de pregrado y posgrado
                </li>
                <li className='flex items-center gap-2'>
                  <i className='ph ph-dot-outline text-blue-500 text-sm' />
                  Estudiantes internacionales
                </li>
                <li className='flex items-center gap-2'>
                  <i className='ph ph-dot-outline text-blue-500 text-sm' />
                  Personal administrativo y profesores
                </li>
                <li className='flex items-center gap-2'>
                  <i className='ph ph-dot-outline text-blue-500 text-sm' />
                  Egresados buscando actualización
                </li>
                <li className='flex items-center gap-2'>
                  <i className='ph ph-dot-outline text-blue-500 text-sm' />
                  Padres de familia
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Arquitectura del Sistema */}
        <section className='mb-12'>
          <div className='flex items-center gap-3 mb-6'>
            <div className='w-6 h-6 bg-orange-100 rounded-md flex items-center justify-center'>
              <i className='ph ph-gear text-orange-600 text-sm' />
            </div>
            <SectionTitle title='Arquitectura del Sistema' className='text-left mb-0' />
          </div>

          <div className='bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-6'>
            <div className='bg-orange-50 px-4 py-3 border-b border-gray-200'>
              <h3 className='text-base font-semibold text-gray-800 flex items-center gap-2'>
                <i className='ph ph-stack text-orange-600 text-sm' />
                Stack Tecnológico
              </h3>
            </div>
            <div className='p-4 space-y-4'>
              <div>
                <h4 className='font-medium text-gray-800 mb-2'>Frontend</h4>
                <p className='text-sm text-gray-600 mb-2'>
                  <strong>Desarrollo:</strong> <InlineCode>Next.js</InlineCode> sin hooks para crear componentes que se compilan a HTML, CSS
                  y JavaScript vanilla para máxima compatibilidad.
                  <br />
                  <strong>Producción:</strong> HTML, CSS (Sass) y JavaScript vanilla implementado en{' '}
                  <InlineCode>Liferay Fragments</InlineCode>.
                </p>
                <div className='flex flex-wrap gap-1'>
                  <span className='px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded'>Next.js</span>
                  <span className='px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded'>Sass</span>
                  <span className='px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded'>Vanilla JS</span>
                  <span className='px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded'>Liferay Fragments</span>
                </div>
              </div>
              <div>
                <h4 className='font-medium text-gray-800 mb-2'>Backend</h4>
                <p className='text-sm text-gray-600 mb-2'>
                  <strong>Responsable:</strong> Área de DTI (Dirección de Tecnologías de la Información)
                  <br />
                  Arquitectura basada en <InlineCode>Spring Boot</InlineCode> con <InlineCode>JPA/Hibernate</InlineCode> para persistencia
                  de datos académicos.
                </p>
                <div className='flex flex-wrap gap-1'>
                  <span className='px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded'>Spring Boot</span>
                  <span className='px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded'>JPA</span>
                  <span className='px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded'>Hibernate</span>
                </div>
              </div>
              <div>
                <h4 className='font-medium text-gray-800 mb-2'>Plataforma</h4>
                <p className='text-sm text-gray-600 mb-2'>
                  Despliegue en <InlineCode>Liferay DXP</InlineCode> con integración a <InlineCode>Salesforce</InlineCode> para gestión de
                  leads y seguimiento de prospecto.
                </p>
                <div className='flex flex-wrap gap-1'>
                  <span className='px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded'>Liferay DXP</span>
                  <span className='px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded'>Salesforce</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Servicios Backend - DTI */}
        <section className='mb-12'>
          <div className='flex items-center gap-3 mb-6'>
            <div className='w-6 h-6 bg-green-100 rounded-md flex items-center justify-center'>
              <i className='ph ph-database text-green-600 text-sm' />
            </div>
            <SectionTitle title='Servicios Backend - DTI' className='text-left mb-0' />
          </div>

          <div className='bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-6'>
            <div className='bg-green-50 px-4 py-3 border-b border-gray-200'>
              <h3 className='text-base font-semibold text-gray-800 flex items-center gap-2'>
                <i className='ph ph-gear text-green-600 text-sm' />
                API Endpoints Disponibles
              </h3>
            </div>
            <div className='p-4'>
              <div className='space-y-4'>
                <div className='bg-gray-50 rounded-lg p-4'>
                  <div className='flex items-center gap-2 mb-2'>
                    <span className='px-2 py-1 bg-orange-100 text-orange-800 text-xs font-mono rounded'>POST</span>
                    <InlineCode>/{'{tp}'}</InlineCode>
                  </div>
                  <p className='text-sm text-gray-600'>Actualiza los datos de la fuente</p>
                </div>

                <div className='bg-gray-50 rounded-lg p-4'>
                  <div className='flex items-center gap-2 mb-2'>
                    <span className='px-2 py-1 bg-blue-100 text-blue-800 text-xs font-mono rounded'>GET</span>
                    <InlineCode>/filter</InlineCode>
                  </div>
                  <p className='text-sm text-gray-600 mb-2'>Parámetros de filtro disponibles:</p>
                  <div className='flex flex-wrap gap-1'>
                    <span className='px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded'>particula</span>
                    <span className='px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded'>tipoGrado</span>
                    <span className='px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded'>nivelEstudio</span>
                    <span className='px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded'>operacion</span>
                    <span className='px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded'>facultad</span>
                    <span className='px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded'>eclesiastico</span>
                  </div>
                </div>

                <div className='bg-gray-50 rounded-lg p-4'>
                  <div className='flex items-center gap-2 mb-2'>
                    <span className='px-2 py-1 bg-blue-100 text-blue-800 text-xs font-mono rounded'>GET</span>
                    <InlineCode>/filterprograma</InlineCode>
                  </div>
                  <p className='text-sm text-gray-600'>
                    Filtro por código de programa: <InlineCode>codprograma</InlineCode>
                  </p>
                </div>

                <div className='bg-gray-50 rounded-lg p-4'>
                  <div className='flex items-center gap-2 mb-2'>
                    <span className='px-2 py-1 bg-blue-100 text-blue-800 text-xs font-mono rounded'>GET</span>
                    <InlineCode>/getrequisitos</InlineCode>
                  </div>
                  <p className='text-sm text-gray-600'>
                    Obtiene requisitos por código de programa: <InlineCode>codprograma</InlineCode>
                  </p>
                </div>

                <div className='bg-gray-50 rounded-lg p-4'>
                  <div className='flex items-center gap-2 mb-2'>
                    <span className='px-2 py-1 bg-blue-100 text-blue-800 text-xs font-mono rounded'>GET</span>
                    <InlineCode>/getrequisitosbyadmittype</InlineCode>
                  </div>
                  <p className='text-sm text-gray-600'>
                    Obtiene requisitos por tipo de admisión: <InlineCode>codprograma</InlineCode>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='grid md:grid-cols-2 gap-6'>
            {/* Enlaces de Prueba */}
            <div className='bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm'>
              <div className='bg-blue-50 px-4 py-3 border-b border-gray-200'>
                <h3 className='text-base font-semibold text-gray-800 flex items-center gap-2'>
                  <i className='ph ph-test-tube text-blue-600 text-sm' />
                  Entorno de Pruebas
                </h3>
              </div>
              <div className='p-4'>
                <p className='text-sm text-gray-600 mb-3'>Base URL para desarrollo y pruebas:</p>
                <div className='bg-gray-50 border border-gray-200 rounded-lg p-3 font-mono text-sm break-all'>
                  <span className='text-gray-800'>https://dti-pru.javeriana.edu.co/val-matricula/api/psujsfvaportals/</span>
                </div>
              </div>
            </div>

            {/* Enlaces de Producción */}
            <div className='bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm'>
              <div className='bg-green-50 px-4 py-3 border-b border-gray-200'>
                <h3 className='text-base font-semibold text-gray-800 flex items-center gap-2'>
                  <i className='ph ph-globe text-green-600 text-sm' />
                  Entorno de Producción
                </h3>
              </div>
              <div className='p-4'>
                <p className='text-sm text-gray-600 mb-3'>Base URL para producción:</p>
                <div className='bg-gray-50 border border-gray-200 rounded-lg p-3 font-mono text-sm break-all'>
                  <span className='text-gray-800'>https://www.javeriana.edu.co/JaveMovil/ValoresMatricula-1/rs/psujsfvaportals</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Implementación Rápida */}
        <section className='mb-12'>
          <div className='flex items-center gap-3 mb-6'>
            <div className='w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center'>
              <i className='ph ph-rocket-launch text-blue-600 text-sm' />
            </div>
            <SectionTitle title='Implementación Rápida' className='text-left mb-0' />
          </div>

          <div className='grid lg:grid-cols-2 gap-6'>
            {/* Scripts en HEAD */}
            <div className='bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow'>
              <div className='bg-blue-50 px-4 py-3 border-b border-gray-200'>
                <h3 className='text-base font-semibold text-gray-800 flex items-center gap-2'>
                  <i className='ph ph-code text-blue-600 text-sm' />
                  Scripts en &lt;head&gt;
                </h3>
              </div>
              <div className='p-4 space-y-4'>
                <div>
                  <p className='font-medium text-gray-700 mb-2 text-sm'>CSS Externos</p>
                  <div className='space-y-2'>
                    <CodeBlock>https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css</CodeBlock>
                    <CodeBlock>https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.css</CodeBlock>
                    <CodeBlock>https://www.javeriana.edu.co/recursosdb/d/info-prg/form-modules-style</CodeBlock>
                  </div>
                </div>

                <div>
                  <p className='font-medium text-gray-700 mb-2 text-sm'>Scripts de Seguimiento</p>
                  <div className='flex flex-wrap gap-2'>
                    <span className='px-2 py-1 bg-green-100 text-green-800 text-xs rounded'>Google Analytics</span>
                    <span className='px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded'>Facebook Pixel</span>
                    <span className='px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded'>TikTok Pixel</span>
                  </div>
                </div>

                <div>
                  <p className='font-medium text-gray-700 mb-2 text-sm'>Meta Tags</p>
                  <div className='space-y-2'>
                    <CodeBlock>
                      &lt;meta name="google-site-verification" content="JHV6TL0irU6ND-d9N5NydsmFnB64PkR3_QOCcIT4Fcw" /&gt;
                    </CodeBlock>
                  </div>
                </div>
              </div>
            </div>

            {/* Scripts en BODY */}
            <div className='bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow'>
              <div className='bg-green-50 px-4 py-3 border-b border-gray-200'>
                <h3 className='text-base font-semibold text-gray-800 flex items-center gap-2'>
                  <i className='ph ph-brackets-curly text-green-600 text-sm' />
                  Scripts en &lt;body&gt;
                </h3>
              </div>
              <div className='p-4 space-y-4'>
                <div>
                  <p className='font-medium text-gray-700 mb-2 text-sm'>Librerías JavaScript</p>
                  <div className='space-y-2'>
                    <CodeBlock>https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js</CodeBlock>
                    <CodeBlock>https://unpkg.com/@phosphor-icons/web@2.1.1</CodeBlock>
                    <CodeBlock>https://www.javeriana.edu.co/planestudio/pages/libraries/tailwindcss/tailwindcss.js</CodeBlock>
                    <CodeBlock>https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js</CodeBlock>
                  </div>
                </div>

                <div>
                  <p className='font-medium text-gray-700 mb-2 text-sm'>Optimizaciones</p>
                  <ul className='space-y-1 text-sm text-gray-600'>
                    <li className='flex items-center gap-2'>
                      <i className='ph ph-check text-green-500 text-xs' />
                      Optimización CSS de Liferay
                    </li>
                    <li className='flex items-center gap-2'>
                      <i className='ph ph-check text-green-500 text-xs' />
                      Detección de modo edición
                    </li>
                    <li className='flex items-center gap-2'>
                      <i className='ph ph-check text-green-500 text-xs' />
                      Generación automática de títulos
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Archivos Compilados */}
          <div className='mt-6 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm'>
            <div className='bg-gray-50 px-4 py-3 border-b border-gray-200'>
              <h3 className='text-base font-semibold text-gray-800 flex items-center gap-2'>
                <i className='ph ph-file-code text-gray-600 text-sm' />
                Archivos Compilados del Sistema
              </h3>
            </div>
            <div className='p-4'>
              <p className='text-sm text-gray-600 mb-4'>
                El sistema entrega archivos CSS y JavaScript compilados listos para usar en Liferay:
              </p>
              <div className='grid md:grid-cols-2 gap-3'>
                <div className='bg-blue-50 border border-blue-200 rounded-lg p-3 font-mono text-sm flex items-center justify-between'>
                  <span className='text-blue-800'>global-styles.min.css</span>
                  <i className='ph ph-file-css text-blue-600' />
                </div>
                <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-3 font-mono text-sm flex items-center justify-between'>
                  <span className='text-yellow-800'>global-scripts.min.js</span>
                  <i className='ph ph-file-js text-yellow-600' />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Compatibilidad Liferay - Estilo advertencia GitHub */}
        <section className='mb-12'>
          <div className='flex items-center gap-3 mb-6'>
            <div className='w-6 h-6 bg-yellow-100 rounded-md flex items-center justify-center'>
              <i className='ph ph-warning text-yellow-600 text-sm' />
            </div>
            <SectionTitle title='Compatibilidad con Liferay' className='text-left mb-0' />
          </div>

          {/* Advertencia prominente */}
          <div className='bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg mb-6'>
            <div className='flex items-start gap-3'>
              <i className='ph ph-warning-circle text-yellow-600 text-xl flex-shrink-0 mt-1' />
              <div>
                <h3 className='text-base font-semibold text-yellow-800 mb-2'>⚠️ Importante</h3>
                <p className='text-yellow-700 mb-2'>
                  <strong>NO se pueden usar hooks de React</strong> (useState, useEffect, etc.) en los componentes.
                </p>
                <p className='text-yellow-700'>
                  Todo el JavaScript debe ser <strong>vanilla JS</strong> para garantizar compatibilidad total con Liferay DXP.
                </p>
              </div>
            </div>
          </div>

          <div className='grid lg:grid-cols-2 gap-8'>
            {/* NO Permitido */}
            <div className='bg-white border border-red-200 rounded-xl overflow-hidden'>
              <div className='bg-red-50 px-4 py-3 border-b border-red-200'>
                <h4 className='text-sm font-semibold text-red-800 flex items-center gap-2'>
                  <i className='ph ph-x-circle text-sm' />
                  NO Permitido
                </h4>
              </div>
              <div className='p-4'>
                <ul className='space-y-3 text-sm'>
                  {[
                    'Hooks de React (useState, useEffect, etc.)',
                    'Imports dinámicos de React',
                    'Context API de React',
                    'Estado local de React'
                  ].map(item => (
                    <li key={item} className='flex items-center gap-3 text-red-700'>
                      <i className='ph ph-x text-red-500 flex-shrink-0' />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* SÍ Permitido */}
            <div className='bg-white border border-green-200 rounded-xl overflow-hidden'>
              <div className='bg-green-50 px-4 py-3 border-b border-green-200'>
                <h4 className='text-sm font-semibold text-green-800 flex items-center gap-2'>
                  <i className='ph ph-check-circle text-sm' />
                  SÍ Permitido
                </h4>
              </div>
              <div className='p-4'>
                <ul className='space-y-3 text-sm'>
                  {[
                    'JSX estático sin estado',
                    'Vanilla JavaScript en archivos .js',
                    'Event listeners con addEventListener',
                    'DOM manipulation puro'
                  ].map(item => (
                    <li key={item} className='flex items-center gap-3 text-green-700'>
                      <i className='ph ph-check text-green-500 flex-shrink-0' />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Sistema de Temas */}
        <section className='mb-12'>
          <div className='flex items-center gap-3 mb-6'>
            <div className='w-6 h-6 bg-purple-100 rounded-md flex items-center justify-center'>
              <i className='ph ph-palette text-purple-600 text-sm' />
            </div>
            <h2 className='text-xl font-bold text-gray-800'>Sistema de Temas por Facultad</h2>
          </div>

          <p className='text-sm text-gray-600 mb-6'>
            El sistema incluye <strong>42 temas</strong> diferentes: tema base institucional y temas específicos para cada facultad, todos
            disponibles en modo claro y oscuro para personalizar la experiencia visual.
          </p>

          <div className='grid lg:grid-cols-2 gap-8'>
            {/* Uso de Variables */}
            <div className='bg-white border border-gray-200 rounded-xl overflow-hidden'>
              <div className='bg-gray-50 px-6 py-4 border-b border-gray-200'>
                <h3 className='text-lg font-semibold text-gray-800'>Uso de Variables CSS</h3>
              </div>
              <div className='p-6'>
                <div className='bg-gray-900 rounded-lg p-4 overflow-x-auto'>
                  <pre className='text-sm'>
                    <code className='text-gray-300'>
                      <span className='text-blue-400'>.mi-componente</span> {'{\\n'}
                      {'  '}
                      <span className='text-green-400'>background-color</span>: <span className='text-yellow-300'>var(--primary-600)</span>;
                      <br />
                      {'  '}
                      <span className='text-green-400'>color</span>: <span className='text-yellow-300'>var(--neutral-100)</span>;
                      <br />
                      {'  '}
                      <span className='text-green-400'>padding</span>: <span className='text-yellow-300'>var(--spacing-md)</span>;
                      <br />
                      {'}'}
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            {/* Temas Disponibles */}
            <div className='bg-white border border-gray-200 rounded-xl overflow-hidden'>
              <div className='bg-gray-50 px-6 py-4 border-b border-gray-200'>
                <h3 className='text-lg font-semibold text-gray-800'>Temas Disponibles</h3>
              </div>
              <div className='p-6'>
                <div className='flex flex-wrap gap-2'>
                  <Chip size='sm' color='primary' variant='flat'>
                    light / dark
                  </Chip>
                  <Chip size='sm' color='secondary' variant='flat'>
                    medicina
                  </Chip>
                  <Chip size='sm' color='success' variant='flat'>
                    ingeniería
                  </Chip>
                  <Chip size='sm' color='warning' variant='flat'>
                    ciencias
                  </Chip>
                  <Chip size='sm' color='danger' variant='flat'>
                    derecho
                  </Chip>
                  <Chip size='sm' color='default' variant='flat'>
                    + 37 más
                  </Chip>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Estructura - Estilo GitHub */}
        <section className='mb-12'>
          <div className='flex items-center gap-3 mb-6'>
            <div className='w-6 h-6 bg-green-100 rounded-md flex items-center justify-center'>
              <i className='ph ph-tree-structure text-green-600 text-sm' />
            </div>
            <SectionTitle title='Estructura de Componentes' className='text-left mb-0' />
          </div>

          <p className='text-sm text-gray-600 mb-4'>
            Cada componente sigue una estructura específica para garantizar compatibilidad con Liferay:
          </p>

          <div className='bg-white border border-gray-200 rounded-xl overflow-hidden'>
            <div className='bg-gray-50 px-6 py-4 border-b border-gray-200'>
              <h3 className='text-lg font-semibold text-gray-800'>Estructura de Archivos</h3>
            </div>
            <div className='p-6'>
              <div className='bg-gray-900 rounded-lg p-6'>
                <pre className='text-sm text-gray-300 font-mono leading-relaxed'>
                  <span className='text-blue-400'>mi-componente/</span>
                  <br />
                  <span className='text-gray-500'>├──</span> <span className='text-green-400'>index.jsx</span>{' '}
                  <span className='text-gray-500'># Componente React (sin hooks)</span>
                  <br />
                  <span className='text-gray-500'>├──</span> <span className='text-yellow-400'>styles.scss</span>{' '}
                  <span className='text-gray-500'># Estilos específicos</span>
                  <br />
                  <span className='text-gray-500'>├──</span> <span className='text-purple-400'>script.js</span>{' '}
                  <span className='text-gray-500'># JavaScript vanilla</span>
                  <br />
                  <span className='text-gray-500'>├──</span> <span className='text-red-400'>info.json</span>{' '}
                  <span className='text-gray-500'># Metadatos del componente</span>
                  <br />
                  <span className='text-gray-500'>└──</span> <span className='text-blue-400'>assets/</span>{' '}
                  <span className='text-gray-500'># Recursos del componente</span>
                </pre>
              </div>
            </div>
          </div>

          <div className='bg-white border border-gray-200 rounded-xl overflow-hidden mt-6'>
            <div className='bg-gray-50 px-6 py-4 border-b border-gray-200'>
              <h3 className='text-lg font-semibold text-gray-800'>Secciones de Pregrado Disponibles</h3>
            </div>
            <div className='p-6'>
              <p className='text-sm text-gray-600 mb-4'>
                Estructura actual de las secciones en <InlineCode>app/landing/pregrado/_sections/</InlineCode>:
              </p>
              <div className='grid md:grid-cols-2 gap-4'>
                <div>
                  <h4 className='font-medium text-gray-800 mb-3'>Secciones Principales</h4>
                  <div className='space-y-1 text-sm text-gray-600'>
                    <div className='flex items-center gap-2'>
                      <span className='w-2 h-2 bg-blue-500 rounded-full flex-shrink-0'></span>
                      <InlineCode>1_datos/</InlineCode> - Información básica
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='w-2 h-2 bg-green-500 rounded-full flex-shrink-0'></span>
                      <InlineCode>2_planEstudio/</InlineCode> - Plan de estudios
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='w-2 h-2 bg-purple-500 rounded-full flex-shrink-0'></span>
                      <InlineCode>3_perfiles/</InlineCode> - Perfiles profesionales
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='w-2 h-2 bg-orange-500 rounded-full flex-shrink-0'></span>
                      <InlineCode>4_diferenciales/</InlineCode> - Diferenciales
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0'></span>
                      <InlineCode>5_insignias/</InlineCode> - Insignias y logros
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='w-2 h-2 bg-pink-500 rounded-full flex-shrink-0'></span>
                      <InlineCode>6_docentes/</InlineCode> - Planta docente
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='w-2 h-2 bg-teal-500 rounded-full flex-shrink-0'></span>
                      <InlineCode>7_experiencia/</InlineCode> - Experiencias
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='w-2 h-2 bg-red-500 rounded-full flex-shrink-0'></span>
                      <InlineCode>8_cita/</InlineCode> - Agendar citas
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className='font-medium text-gray-800 mb-3'>Secciones Opcionales/Variantes</h4>
                  <div className='space-y-1 text-sm text-gray-600'>
                    <div className='flex items-center gap-2'>
                      <span className='w-2 h-2 bg-gray-400 rounded-full flex-shrink-0'></span>
                      <InlineCode>_becas/</InlineCode> - Información de becas
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='w-2 h-2 bg-gray-400 rounded-full flex-shrink-0'></span>
                      <InlineCode>_educacionEstrella/</InlineCode> - Educación estrella
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='w-2 h-2 bg-gray-400 rounded-full flex-shrink-0'></span>
                      <InlineCode>_requisitos/</InlineCode> - Requisitos específicos
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='w-2 h-2 bg-gray-500 rounded-full flex-shrink-0'></span>
                      <InlineCode>1-1_dobleDatos/</InlineCode> - Doble titulación datos
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='w-2 h-2 bg-gray-500 rounded-full flex-shrink-0'></span>
                      <InlineCode>2-1_doblePlanEstudio/</InlineCode> - Doble titulación plan
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='w-2 h-2 bg-gray-500 rounded-full flex-shrink-0'></span>
                      <InlineCode>6-1_docentes/</InlineCode> - Docentes variante
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0'></span>
                      <InlineCode>9_preguntasFrecuentes/</InlineCode> - FAQ
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='w-2 h-2 bg-cyan-500 rounded-full flex-shrink-0'></span>
                      <InlineCode>10_relacionados/</InlineCode> - Programas relacionados
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fases del Proyecto */}
        <section className='mb-12'>
          <div className='flex items-center gap-3 mb-6'>
            <div className='w-6 h-6 bg-indigo-100 rounded-md flex items-center justify-center'>
              <i className='ph ph-steps text-indigo-600 text-sm' />
            </div>
            <SectionTitle title='Fases de Implementación' className='text-left mb-0' />
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {[
              { phase: '1', title: 'Investigación', desc: 'Análisis y benchmarking', color: 'blue' },
              { phase: '2', title: 'Diseño', desc: 'UI/UX y prototipos', color: 'purple' },
              { phase: '3', title: 'Desarrollo', desc: 'Frontend y Backend', color: 'orange' },
              { phase: '4', title: 'Lanzamiento', desc: 'Despliegue y soporte', color: 'green' }
            ].map(item => (
              <div key={item.phase} className='bg-white border border-gray-200 rounded-lg p-4 text-center'>
                <div className={`w-8 h-8 bg-${item.color}-100 rounded-full flex items-center justify-center mx-auto mb-2`}>
                  <span className={`text-${item.color}-600 font-bold text-sm`}>{item.phase}</span>
                </div>
                <h4 className='font-semibold text-gray-800 text-sm mb-1'>{item.title}</h4>
                <p className='text-xs text-gray-600'>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Detalles de Implementación del README */}
        <section className='mb-12'>
          <div className='flex items-center gap-3 mb-6'>
            <div className='w-6 h-6 bg-indigo-100 rounded-md flex items-center justify-center'>
              <i className='ph ph-file-text text-indigo-600 text-sm' />
            </div>
            <SectionTitle title='Detalles de Implementación' className='text-left mb-0' />
          </div>

          <div className='bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg mb-6'>
            <div className='flex items-start gap-3'>
              <i className='ph ph-info text-yellow-600 text-xl flex-shrink-0 mt-1' />
              <div>
                <h3 className='text-base font-semibold text-yellow-800 mb-2'>📖 Consulta el README.md</h3>
                <p className='text-yellow-700'>
                  Para detalles completos de implementación, estructura de archivos, ejemplos de código y guías de desarrollo, consulta el
                  archivo <InlineCode>README.md</InlineCode> ubicado en la raíz del proyecto.
                </p>
              </div>
            </div>
          </div>

          <div className='grid lg:grid-cols-2 gap-6'>
            <div className='bg-white border border-gray-200 rounded-xl overflow-hidden'>
              <div className='bg-gray-50 px-4 py-3 border-b border-gray-200'>
                <h3 className='text-base font-semibold text-gray-800 flex items-center gap-2'>
                  <i className='ph ph-cube text-gray-600 text-sm' />
                  Estructura de Componentes
                </h3>
              </div>
              <div className='p-4'>
                <p className='text-sm text-gray-600 mb-3'>Cada componente incluye:</p>
                <ul className='space-y-2 text-sm text-gray-600'>
                  <li className='flex items-center gap-2'>
                    <i className='ph ph-file-jsx text-blue-500 text-xs' />
                    <InlineCode>index.jsx</InlineCode> - Componente React (sin hooks)
                  </li>
                  <li className='flex items-center gap-2'>
                    <i className='ph ph-file-css text-purple-500 text-xs' />
                    <InlineCode>styles.scss</InlineCode> - Estilos específicos
                  </li>
                  <li className='flex items-center gap-2'>
                    <i className='ph ph-file-js text-yellow-500 text-xs' />
                    <InlineCode>script.js</InlineCode> - JavaScript vanilla
                  </li>
                  <li className='flex items-center gap-2'>
                    <i className='ph ph-file-text text-green-500 text-xs' />
                    <InlineCode>info.json</InlineCode> - Metadatos
                  </li>
                </ul>
              </div>
            </div>

            <div className='bg-white border border-gray-200 rounded-xl overflow-hidden'>
              <div className='bg-gray-50 px-4 py-3 border-b border-gray-200'>
                <h3 className='text-base font-semibold text-gray-800 flex items-center gap-2'>
                  <i className='ph ph-palette text-gray-600 text-sm' />
                  Sistema de Temas
                </h3>
              </div>
              <div className='p-4'>
                <p className='text-sm text-gray-600 mb-3'>42 temas disponibles:</p>
                <ul className='space-y-2 text-sm text-gray-600'>
                  <li className='flex items-center gap-2'>
                    <i className='ph ph-circle text-blue-500 text-xs' />
                    Tema institucional base (light/dark)
                  </li>
                  <li className='flex items-center gap-2'>
                    <i className='ph ph-circle text-green-500 text-xs' />
                    20 facultades × 2 modos = 40 temas
                  </li>
                  <li className='flex items-center gap-2'>
                    <i className='ph ph-circle text-purple-500 text-xs' />
                    Variables CSS automáticas
                  </li>
                  <li className='flex items-center gap-2'>
                    <i className='ph ph-circle text-orange-500 text-xs' />
                    Escalas de color generadas
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Fragmentos de Configuracion Global */}
        <section className='mb-12'>
          <div className='flex items-center gap-3 mb-6'>
            <div className='w-6 h-6 bg-violet-100 rounded-md flex items-center justify-center'>
              <i className='ph ph-gear-six text-violet-600 text-sm' />
            </div>
            <SectionTitle title='Fragmentos de Configuracion Global' className='text-left mb-0' />
          </div>

          <div className='bg-violet-50 border-l-4 border-violet-400 p-4 rounded-r-lg mb-6'>
            <div className='flex items-start gap-3'>
              <i className='ph ph-info text-violet-600 text-xl flex-shrink-0 mt-1' />
              <div>
                <h3 className='text-base font-semibold text-violet-800 mb-2'>Componentes de Configuracion</h3>
                <p className='text-violet-700'>
                  Estos fragmentos contienen la configuracion global necesaria para el funcionamiento del sistema. Cada uno incluye codigo
                  descargable para implementacion en Liferay.
                </p>
              </div>
            </div>
          </div>

          <div className='grid lg:grid-cols-2 gap-6'>
            {/* GlobalAssets */}
            <div className='bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm'>
              <div className='bg-gray-50 px-4 py-3 border-b border-gray-200'>
                <h3 className='text-base font-semibold text-gray-800 flex items-center gap-2'>
                  <i className='ph ph-globe text-blue-600 text-sm' />
                  Assets Globales
                </h3>
              </div>
              <div className='p-4'>
                <ViewComponent path='/_library/_configurations/globalAssets'>
                  <GlobalAssets />
                </ViewComponent>
              </div>
            </div>

            {/* StateProgram */}
            <div className='bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm'>
              <div className='bg-gray-50 px-4 py-3 border-b border-gray-200'>
                <h3 className='text-base font-semibold text-gray-800 flex items-center gap-2'>
                  <i className='ph ph-database text-green-600 text-sm' />
                  Estado del Programa
                </h3>
              </div>
              <div className='p-4'>
                <ViewComponent path='/_library/_configurations/stateProgram'>
                  <StateProgram />
                </ViewComponent>
              </div>
            </div>

            {/* LoadTheme */}
            <div className='bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm'>
              <div className='bg-gray-50 px-4 py-3 border-b border-gray-200'>
                <h3 className='text-base font-semibold text-gray-800 flex items-center gap-2'>
                  <i className='ph ph-palette text-purple-600 text-sm' />
                  Carga de Temas
                </h3>
              </div>
              <div className='p-4'>
                <ViewComponent path='/_library/_configurations/loadTheme'>
                  <LoadTheme />
                </ViewComponent>
              </div>
            </div>

            {/* LoadProgram */}
            <div className='bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm'>
              <div className='bg-gray-50 px-4 py-3 border-b border-gray-200'>
                <h3 className='text-base font-semibold text-gray-800 flex items-center gap-2'>
                  <i className='ph ph-code text-orange-600 text-sm' />
                  Carga de Programas
                </h3>
              </div>
              <div className='p-4'>
                <ViewComponent path='/_library/_configurations/loadProgram'>
                  <LoadProgram />
                </ViewComponent>
              </div>
            </div>

            {/* LoadProgram V2 */}
            <div className='bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm'>
              <div className='bg-gray-50 px-4 py-3 border-b border-gray-200'>
                <h3 className='text-base font-semibold text-gray-800 flex items-center gap-2'>
                  <i className='ph ph-code text-red-600 text-sm' />
                  Carga de Programas V2
                </h3>
              </div>
              <div className='p-4'>
                <ViewComponent path='/_library/_configurations/loadProgram-v2'>
                  <LoadProgramV2 />
                </ViewComponent>
              </div>
            </div>

            {/* SelectWhatsapp */}
            <div className='bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm'>
              <div className='bg-gray-50 px-4 py-3 border-b border-gray-200'>
                <h3 className='text-base font-semibold text-gray-800 flex items-center gap-2'>
                  <i className='ph ph-chat-circle text-green-600 text-sm' />
                  Seleccion de WhatsApp
                </h3>
              </div>
              <div className='p-4'>
                <ViewComponent path='/_library/_configurations/selectWhatsapp'>
                  <SelectWhatsapp />
                </ViewComponent>
              </div>
            </div>

            {/* Splash */}
            <div className='bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm'>
              <div className='bg-gray-50 px-4 py-3 border-b border-gray-200'>
                <h3 className='text-base font-semibold text-gray-800 flex items-center gap-2'>
                  <i className='ph ph-monitor-play text-indigo-600 text-sm' />
                  Pantalla de Carga
                </h3>
              </div>
              <div className='p-4'>
                <ViewComponent path='/_library/components/splash'>
                  <Splash />
                </ViewComponent>
              </div>
            </div>

            {/* MetaData */}
            <div className='bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm'>
              <div className='bg-gray-50 px-4 py-3 border-b border-gray-200'>
                <h3 className='text-base font-semibold text-gray-800 flex items-center gap-2'>
                  <i className='ph ph-file-html text-blue-600 text-sm' />
                  Meta Data
                </h3>
              </div>
              <div className='p-4'>
                <ViewComponent path='/_library/_configurations/metaData'>
                  <MetaData />
                </ViewComponent>
              </div>
            </div>
          </div>
        </section>

        {/* Enlaces y Recursos - Estilo GitHub */}
        <section>
          <div className='flex items-center gap-3 mb-6'>
            <div className='w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center'>
              <i className='ph ph-link text-blue-600 text-sm' />
            </div>
            <SectionTitle title='Enlaces y Recursos' className='text-left mb-0' />
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <ResourceCard
              title='Diseño'
              icon='figma-logo'
              iconColor='blue'
              iconBgColor='blue'
              links={[
                {
                  label: 'Figma Design System',
                  href: 'https://www.figma.com/design/ZU91ri7LBUL90ovSxX4efe/Javeriana-WebOnePage-Visual?node-id=1999-15993&t=tCZYXhdv5uhlRT44-1'
                },
                { label: 'HyperUI Components', href: 'https://www.hyperui.dev/components/marketing' }
              ]}
            />
            <ResourceCard
              title='Desarrollo'
              icon='github-logo'
              iconColor='gray'
              iconBgColor='gray'
              links={[
                { label: 'Repositorio GitHub', href: 'https://github.com/javeriana-mercadeo/Library-components' },
                { label: 'Documentación Liferay', href: 'https://help.liferay.com/hc/es' }
              ]}
            />
            <ResourceCard
              title='Librerías'
              icon='package'
              iconColor='green'
              iconBgColor='green'
              links={[
                { label: 'Phosphor Icons', href: 'https://phosphoricons.com/' },
                { label: 'Swiper.js', href: 'https://swiperjs.com/' }
              ]}
            />
          </div>
        </section>
      </div>
    </div>
  )
}
