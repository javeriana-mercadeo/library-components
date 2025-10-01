'use client'

// Reusable Components
import { Chip } from '@heroui/react'

import { Splash } from '../_library/components'

// UI Components
import { SectionTitle, CodeBlock, FeatureList } from '@/components/ui'
import { InlineCode } from '@/components/ui/CodeBlock'
import { WarningAlert } from '@/components/ui/Alerts'
import { APIEndpointCard, EnvironmentCard, TechStackCard } from '@/components/ui/Cards'
// Common Components (Cards)
import { ResourceCard, SectionCard, InfoCard } from '@/components/common/Card'
import ViewComponent from '@/components/utils/ViewComponent/viewComponent'
// Features Components
import { PhaseCard } from '@/components/features'
// Configuration Components - Real imports
import GlobalAssets from '@/app/_library/_configurations/globalAssets'
import StateProgram from '@/app/_library/_configurations/stateProgram'
import LoadTheme from '@/app/_library/_configurations/loadTheme'
import LoadProgram from '@/app/_library/_configurations/loadProgram'
import LoadProgramV2 from '@/app/_library/_configurations/loadProgram-v2'
import SelectWhatsapp from '@/app/_library/_configurations/selectWhatsapp'

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
            <SectionTitle className='text-left mb-0' title='Proyecto Pikachu - Contexto' />
          </div>

          <SectionCard className='mb-6' icon='flag' iconColor='purple' title='Visión del Proyecto'>
            <p className='text-sm text-gray-600 mb-4 leading-relaxed'>
              La reestructuración de las Landing Pages de la oferta académica de la Pontificia Universidad Javeriana tiene como objetivo
              principal <strong>mejorar la experiencia de usuario, especialmente en dispositivos móviles</strong>.
            </p>
            <p className='text-sm text-gray-600 leading-relaxed'>
              Este proyecto facilitará el acceso a la información sobre los programas académicos y optimizará el proceso de inscripción con
              una <strong>arquitectura modular y fragmentada basada en Liferay</strong>, permitiendo gestión simplificada de contenido y
              segmentación por nivel académico.
            </p>
          </SectionCard>

          <div className='grid md:grid-cols-2 gap-4 mb-6'>
            <InfoCard
              borderColor='green'
              icon='check-circle'
              iconColor='green'
              items={[
                { text: 'Experiencia mobile-first optimizada' },
                { text: 'Comunicación segmentada por nivel académico' },
                { text: 'Biblioteca de componentes reutilizables' },
                { text: 'Automatización de procesos clave' },
                { text: 'Integración con Salesforce y Liferay' }
              ]}
              title='Lo que resolvemos'
            />

            <InfoCard
              borderColor='blue'
              icon='users'
              iconColor='blue'
              items={[
                { text: 'Aspirantes de pregrado y posgrado' },
                { text: 'Estudiantes internacionales' },
                { text: 'Personal administrativo y profesores' },
                { text: 'Egresados buscando actualización' },
                { text: 'Padres de familia' }
              ]}
              title='Usuarios objetivo'
            />
          </div>
        </section>

        {/* Arquitectura del Sistema */}
        <section className='mb-12'>
          <div className='flex items-center gap-3 mb-6'>
            <div className='w-6 h-6 bg-orange-100 rounded-md flex items-center justify-center'>
              <i className='ph ph-gear text-orange-600 text-sm' />
            </div>
            <SectionTitle className='text-left mb-0' title='Arquitectura del Sistema' />
          </div>

          <TechStackCard
            icon='stack'
            iconColor='orange'
            items={[
              {
                category: 'Frontend',
                description:
                  '<strong>Desarrollo:</strong> <code>Next.js</code> sin hooks para crear componentes que se compilan a HTML, CSS y JavaScript vanilla para máxima compatibilidad.<br/><strong>Producción:</strong> HTML, CSS (Sass) y JavaScript vanilla implementado en <code>Liferay Fragments</code>.',
                technologies: [
                  { name: 'Next.js', color: 'blue' },
                  { name: 'Sass', color: 'green' },
                  { name: 'Vanilla JS', color: 'yellow' },
                  { name: 'Liferay Fragments', color: 'purple' }
                ]
              },
              {
                category: 'Backend',
                description:
                  '<strong>Responsable:</strong> Área de DTI (Dirección de Tecnologías de la Información)<br/>Arquitectura basada en <code>Spring Boot</code> con <code>JPA/Hibernate</code> para persistencia de datos académicos.',
                technologies: [
                  { name: 'Spring Boot', color: 'green' },
                  { name: 'JPA', color: 'blue' },
                  { name: 'Hibernate', color: 'purple' }
                ]
              },
              {
                category: 'Plataforma',
                description:
                  'Despliegue en <code>Liferay DXP</code> con integración a <code>Salesforce</code> para gestión de leads y seguimiento de prospecto.',
                technologies: [
                  { name: 'Liferay DXP', color: 'indigo' },
                  { name: 'Salesforce', color: 'orange' }
                ]
              }
            ]}
            title='Stack Tecnológico'
          />
        </section>

        {/* Servicios Backend - DTI */}
        <section className='mb-12'>
          <div className='flex items-center gap-3 mb-6'>
            <div className='w-6 h-6 bg-green-100 rounded-md flex items-center justify-center'>
              <i className='ph ph-database text-green-600 text-sm' />
            </div>
            <SectionTitle className='text-left mb-0' title='Servicios Backend - DTI' />
          </div>

          <APIEndpointCard
            endpoints={[
              {
                method: 'POST',
                path: '/{tp}',
                description: 'Actualiza los datos de la fuente'
              },
              {
                method: 'GET',
                path: '/filter',
                description: 'Parámetros de filtro disponibles:',
                parameters: ['particula', 'tipoGrado', 'nivelEstudio', 'operacion', 'facultad', 'eclesiastico']
              },
              {
                method: 'GET',
                path: '/filterprograma',
                description: 'Filtro por código de programa: codprograma'
              },
              {
                method: 'GET',
                path: '/getrequisitos',
                description: 'Obtiene requisitos por código de programa: codprograma'
              },
              {
                method: 'GET',
                path: '/getrequisitosbyadmittype',
                description: 'Obtiene requisitos por tipo de admisión: codprograma'
              }
            ]}
            icon='gear'
            iconColor='green'
            title='API Endpoints Disponibles'
          />

          <div className='grid md:grid-cols-2 gap-6'>
            <EnvironmentCard
              description='Base URL para desarrollo y pruebas:'
              icon='test-tube'
              iconColor='blue'
              title='Entorno de Pruebas'
              url='https://dti-pru.javeriana.edu.co/val-matricula/api/psujsfvaportals/'
            />

            <EnvironmentCard
              description='Base URL para producción:'
              icon='globe'
              iconColor='green'
              title='Entorno de Producción'
              url='https://www.javeriana.edu.co/JaveMovil/ValoresMatricula-1/rs/psujsfvaportals'
            />
          </div>
        </section>

        {/* Implementación Rápida */}
        <section className='mb-12'>
          <div className='flex items-center gap-3 mb-6'>
            <div className='w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center'>
              <i className='ph ph-rocket-launch text-blue-600 text-sm' />
            </div>
            <SectionTitle className='text-left mb-0' title='Implementación Rápida' />
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
                      &lt;meta name=&quot;google-site-verification&quot; content=&quot;JHV6TL0irU6ND-d9N5NydsmFnB64PkR3_QOCcIT4Fcw&quot;
                      /&gt;
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
            <SectionTitle className='text-left mb-0' title='Compatibilidad con Liferay' />
          </div>

          <WarningAlert className='mb-6' title='⚠️ Importante' type='warning'>
            <p className='mb-2'>
              <strong>NO se pueden usar hooks de React</strong> (useState, useEffect, etc.) en los componentes.
            </p>
            <p>
              Todo el JavaScript debe ser <strong>vanilla JS</strong> para garantizar compatibilidad total con Liferay DXP.
            </p>
          </WarningAlert>

          <div className='grid lg:grid-cols-2 gap-8'>
            <SectionCard icon='x-circle' iconColor='red' title='NO Permitido'>
              <FeatureList
                items={[
                  { text: 'Hooks de React (useState, useEffect, etc.)' },
                  { text: 'Imports dinámicos de React' },
                  { text: 'Context API de React' },
                  { text: 'Estado local de React' }
                ]}
                type='forbidden'
              />
            </SectionCard>

            <SectionCard icon='check-circle' iconColor='green' title='SÍ Permitido'>
              <FeatureList
                items={[
                  { text: 'JSX estático sin estado' },
                  { text: 'Vanilla JavaScript en archivos .js' },
                  { text: 'Event listeners con addEventListener' },
                  { text: 'DOM manipulation puro' }
                ]}
                type='allowed'
              />
            </SectionCard>
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
                  <Chip color='primary' size='sm' variant='flat'>
                    light / dark
                  </Chip>
                  <Chip color='secondary' size='sm' variant='flat'>
                    medicina
                  </Chip>
                  <Chip color='success' size='sm' variant='flat'>
                    ingeniería
                  </Chip>
                  <Chip color='warning' size='sm' variant='flat'>
                    ciencias
                  </Chip>
                  <Chip color='danger' size='sm' variant='flat'>
                    derecho
                  </Chip>
                  <Chip color='default' size='sm' variant='flat'>
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
            <SectionTitle className='text-left mb-0' title='Estructura de Componentes' />
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
                      <span className='w-2 h-2 bg-blue-500 rounded-full flex-shrink-0' />
                      <InlineCode>1_datos/</InlineCode> - Información básica
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='w-2 h-2 bg-green-500 rounded-full flex-shrink-0' />
                      <InlineCode>2_planEstudio/</InlineCode> - Plan de estudios
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='w-2 h-2 bg-purple-500 rounded-full flex-shrink-0' />
                      <InlineCode>3_perfiles/</InlineCode> - Perfiles profesionales
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='w-2 h-2 bg-orange-500 rounded-full flex-shrink-0' />
                      <InlineCode>4_diferenciales/</InlineCode> - Diferenciales
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0' />
                      <InlineCode>5_insignias/</InlineCode> - Insignias y logros
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='w-2 h-2 bg-pink-500 rounded-full flex-shrink-0' />
                      <InlineCode>6_docentes/</InlineCode> - Planta docente
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='w-2 h-2 bg-teal-500 rounded-full flex-shrink-0' />
                      <InlineCode>7_experiencia/</InlineCode> - Experiencias
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='w-2 h-2 bg-red-500 rounded-full flex-shrink-0' />
                      <InlineCode>8_cita/</InlineCode> - Agendar citas
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className='font-medium text-gray-800 mb-3'>Secciones Opcionales/Variantes</h4>
                  <div className='space-y-1 text-sm text-gray-600'>
                    <div className='flex items-center gap-2'>
                      <span className='w-2 h-2 bg-gray-400 rounded-full flex-shrink-0' />
                      <InlineCode>_becas/</InlineCode> - Información de becas
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='w-2 h-2 bg-gray-400 rounded-full flex-shrink-0' />
                      <InlineCode>_educacionEstrella/</InlineCode> - Educación estrella
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='w-2 h-2 bg-gray-400 rounded-full flex-shrink-0' />
                      <InlineCode>_requisitos/</InlineCode> - Requisitos específicos
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='w-2 h-2 bg-gray-500 rounded-full flex-shrink-0' />
                      <InlineCode>1-1_dobleDatos/</InlineCode> - Doble titulación datos
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='w-2 h-2 bg-gray-500 rounded-full flex-shrink-0' />
                      <InlineCode>2-1_doblePlanEstudio/</InlineCode> - Doble titulación plan
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='w-2 h-2 bg-gray-500 rounded-full flex-shrink-0' />
                      <InlineCode>6-1_docentes/</InlineCode> - Docentes variante
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0' />
                      <InlineCode>9_preguntasFrecuentes/</InlineCode> - FAQ
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='w-2 h-2 bg-cyan-500 rounded-full flex-shrink-0' />
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
            <SectionTitle className='text-left mb-0' title='Fases de Implementación' />
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <PhaseCard color='blue' description='Análisis y benchmarking' phase='1' title='Investigación' />
            <PhaseCard color='purple' description='UI/UX y prototipos' phase='2' title='Diseño' />
            <PhaseCard color='orange' description='Frontend y Backend' phase='3' title='Desarrollo' />
            <PhaseCard color='green' description='Despliegue y soporte' phase='4' title='Lanzamiento' />
          </div>
        </section>

        {/* Detalles de Implementación del README */}
        <section className='mb-12'>
          <div className='flex items-center gap-3 mb-6'>
            <div className='w-6 h-6 bg-indigo-100 rounded-md flex items-center justify-center'>
              <i className='ph ph-file-text text-indigo-600 text-sm' />
            </div>
            <SectionTitle className='text-left mb-0' title='Detalles de Implementación' />
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
            <SectionTitle className='text-left mb-0' title='Fragmentos de Configuracion Global' />
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
          </div>
        </section>

        {/* Enlaces y Recursos - Estilo GitHub */}
        <section>
          <div className='flex items-center gap-3 mb-6'>
            <div className='w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center'>
              <i className='ph ph-link text-blue-600 text-sm' />
            </div>
            <SectionTitle className='text-left mb-0' title='Enlaces y Recursos' />
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <ResourceCard
              icon='figma-logo'
              iconBgColor='blue'
              iconColor='blue'
              links={[
                {
                  label: 'Figma Design System',
                  href: 'https://www.figma.com/design/ZU91ri7LBUL90ovSxX4efe/Javeriana-WebOnePage-Visual?node-id=1999-15993&t=tCZYXhdv5uhlRT44-1'
                },
                { label: 'HyperUI Components', href: 'https://www.hyperui.dev/components/marketing' }
              ]}
              title='Diseño'
            />
            <ResourceCard
              icon='github-logo'
              iconBgColor='gray'
              iconColor='gray'
              links={[
                { label: 'Repositorio GitHub', href: 'https://github.com/javeriana-mercadeo/Library-components' },
                { label: 'Documentación Liferay', href: 'https://help.liferay.com/hc/es' }
              ]}
              title='Desarrollo'
            />
            <ResourceCard
              icon='package'
              iconBgColor='green'
              iconColor='green'
              links={[
                { label: 'Phosphor Icons', href: 'https://phosphoricons.com/' },
                { label: 'Swiper.js', href: 'https://swiperjs.com/' }
              ]}
              title='Librerías'
            />
          </div>
        </section>
      </div>
    </div>
  )
}
