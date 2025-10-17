'use client'
import { Splash } from '@common'
import { Button, Caption, Paragraph, Container } from '@components'
import { useState } from 'react'

import { openModalById, closeModalById, closeAll } from './script.js'

import Modal from './index'

/**
 * Componente para mostrar código y su resultado renderizado
 */
const CodePreview = ({
  title,
  code,
  children,
  description
}: {
  title: string
  code: string
  children: React.ReactNode
  description?: string
}) => {
  const [showCode, setShowCode] = useState(false)

  return (
    <div className='border border-[var(--neutral-800)] rounded-lg bg-[var(--background-100)] overflow-hidden'>
      <div className='flex items-center justify-between p-4 bg-[var(--background-200)] border-b border-[var(--neutral-800)]'>
        <div>
          <h4 className='text-sm font-semibold text-[var(--neutral-200)]'>{title}</h4>
          {description && <p className='text-xs text-[var(--neutral-500)] mt-1'>{description}</p>}
        </div>
        <button
          className='text-xs px-3 py-1 bg-[var(--neutral-800)] text-[var(--neutral-300)] rounded hover:bg-[var(--neutral-700)] transition-colors'
          onClick={() => setShowCode(!showCode)}>
          {showCode ? 'Ver resultado' : 'Ver código'}
        </button>
      </div>

      <div className='p-4'>
        <div className='bg-[var(--neutral-900)] rounded-lg p-4 overflow-x-auto' style={{ display: showCode ? 'block' : 'none' }}>
          <pre className='text-sm text-[var(--neutral-300)]'>
            <code>{code}</code>
          </pre>
        </div>
        <div className='space-y-2' style={{ display: showCode ? 'none' : 'block' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

/**
 * Componente para mostrar tablas de especificaciones
 */
const SpecTable = ({ data }: { data: Array<{ prop: string; type: string; default?: string; description: string }> }) => {
  return (
    <div className='overflow-x-auto'>
      <table className='w-full text-sm text-left border border-[var(--neutral-800)] rounded-lg'>
        <thead className='bg-[var(--background-200)] border-b border-[var(--neutral-800)]'>
          <tr>
            <th className='px-4 py-3 text-[var(--neutral-200)] font-semibold'>Prop</th>
            <th className='px-4 py-3 text-[var(--neutral-200)] font-semibold'>Tipo</th>
            <th className='px-4 py-3 text-[var(--neutral-200)] font-semibold'>Default</th>
            <th className='px-4 py-3 text-[var(--neutral-200)] font-semibold'>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className='border-b border-[var(--neutral-800)] hover:bg-[var(--background-100)]'>
              <td className='px-4 py-3'>
                <code className='text-xs bg-[var(--neutral-800)] px-2 py-1 rounded text-[var(--primary-400)]'>{row.prop}</code>
              </td>
              <td className='px-4 py-3'>
                <code className='text-xs text-[var(--neutral-400)]'>{row.type}</code>
              </td>
              <td className='px-4 py-3'>
                {row.default && <code className='text-xs text-[var(--neutral-500)]'>{row.default}</code>}
                {!row.default && <span className='text-xs text-[var(--neutral-600)]'>-</span>}
              </td>
              <td className='px-4 py-3 text-[var(--neutral-400)]'>{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function ModalShowcase() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [activeTab, setActiveTab] = useState<'docs' | 'content'>('docs')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    closeModalById('modal-form-modal-overlay')
  }

  return (
    <>
      <Splash />
      <Container className='' id='modal-showcase-container'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold mb-4 text-[var(--neutral-200)]'>Componente Modal</h1>
          <p className='text-lg text-[var(--neutral-400)] max-w-2xl mx-auto'>
            Sistema de modales reutilizables con header, footer y soporte completo para accesibilidad y eventos personalizados.
          </p>
        </div>

        {/* Toggle entre Documentación Técnica y Requerimientos de Contenido */}
        <div className='mb-8 flex justify-center gap-4'>
          <Button
            color={activeTab === 'docs' ? 'primary' : 'secondary'}
            variant={activeTab === 'docs' ? 'solid' : 'light'}
            onClick={() => setActiveTab('docs')}>
            📚 Documentación Técnica
          </Button>
          <Button
            color={activeTab === 'content' ? 'primary' : 'secondary'}
            variant={activeTab === 'content' ? 'solid' : 'light'}
            onClick={() => setActiveTab('content')}>
            📝 Requerimientos de Contenido
          </Button>
        </div>

        {/* DOCUMENTACIÓN TÉCNICA */}
        {activeTab === 'docs' && (
          <div className='space-y-12'>
            {/* Showcase principal */}
            <div className='p-6 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]'>
              <h2 className='text-2xl font-semibold mb-6 text-[var(--neutral-200)]'>Ejemplos Básicos</h2>
              <div className='space-y-6'>
                {/* Modal básico con nuevas características */}
                <CodePreview
                  code={`<Modal
  id='basic-modal'
  title='Mi Modal'
  trigger={<Button>Abrir Modal</Button>}>
  <p>Contenido del modal</p>
</Modal>`}
                  description='Modal con título obligatorio y footer por defecto'
                  title='Modal Básico'>
                  <Modal id='basic-modal' title='Hola, Mundo' trigger={<Button color='primary'>Abrir Modal Básico</Button>}>
                    <div className='space-y-4'>
                      <p className='text-[var(--neutral-400)]'>Este es un modal básico con título en el header y botón en el footer.</p>
                    </div>
                  </Modal>
                </CodePreview>

                {/* Modal personalizado */}
                <CodePreview
                  code={`<Modal
  id='custom-modal'
  title='Configuración'
  titleProps={{ color: 'secondary', size: 'xl', bold: true }}
  footerButtonText='Guardar'
  footerButton={true}
  trigger={<Button>Abrir Modal Personalizado</Button>}>
  <p>Contenido personalizado</p>
</Modal>`}
                  description='Personaliza el título y el botón del footer'
                  title='Modal Personalizado'>
                  <Modal
                    id='custom-modal'
                    title='Configuración Avanzada'
                    titleProps={{ color: 'secondary', size: 'xl', bold: true }}
                    footerButtonText='Guardar cambios'
                    trigger={<Button color='secondary'>Abrir Modal Personalizado</Button>}>
                    <div className='space-y-4'>
                      <p className='text-[var(--neutral-400)]'>El título y el botón son completamente personalizables.</p>
                    </div>
                  </Modal>
                </CodePreview>

                {/* Modal sin footer */}
                <CodePreview
                  code={`<Modal
  id='no-footer-modal'
  title='Sin Footer'
  footerButton={false}
  trigger={<Button>Modal Sin Footer</Button>}>
  <p>Este modal no tiene footer</p>
</Modal>`}
                  description='Oculta el footer completamente'
                  title='Modal Sin Footer'>
                  <Modal
                    id='no-footer-modal'
                    title='Modal Sin Footer'
                    footerButton={false}
                    trigger={<Button color='tertiary'>Abrir Modal Sin Footer</Button>}>
                    <div className='space-y-4'>
                      <p className='text-[var(--neutral-400)]'>Este modal no tiene footer, ideal para contenido de solo lectura.</p>
                    </div>
                  </Modal>
                </CodePreview>

                {/* Modal con botón personalizado en footer */}
                <CodePreview
                  code={`<Modal
  id='custom-footer-modal'
  title='Footer Personalizado'
  footerButton={
    <div className='flex gap-2'>
      <Button variant='light'>Cancelar</Button>
      <Button color='success'>Confirmar</Button>
    </div>
  }
  trigger={<Button>Modal con Footer Custom</Button>}>
  <p>Contenido con botones personalizados</p>
</Modal>`}
                  description='Pasa tus propios componentes al footer'
                  title='Footer Personalizado'>
                  <Modal
                    id='custom-footer-modal'
                    title='Confirmar Acción'
                    footerButton={
                      <div className='flex gap-2'>
                        <Button variant='light' onClick={() => closeModalById('modal-custom-footer-modal-overlay')}>
                          Cancelar
                        </Button>
                        <Button color='success' onClick={() => closeModalById('modal-custom-footer-modal-overlay')}>
                          Confirmar
                        </Button>
                      </div>
                    }
                    trigger={<Button color='success'>Abrir Modal con Footer Custom</Button>}>
                    <div className='space-y-4'>
                      <p className='text-[var(--neutral-400)]'>Este modal tiene botones completamente personalizados en el footer.</p>
                    </div>
                  </Modal>
                </CodePreview>

                {/* Modal con tamaños */}
                <CodePreview
                  code={`// Tamaños disponibles: 'sm' | 'md' | 'lg' | 'xl' | 'full'

<Modal id='small-modal' size='sm' title='Modal Pequeño' trigger={<Button>Pequeño</Button>}>
  <p>Modal pequeño (450px)</p>
</Modal>

<Modal id='large-modal' size='lg' title='Modal Grande' trigger={<Button>Grande</Button>}>
  <p>Modal grande (900px)</p>
</Modal>`}
                  description='Controla el ancho del modal con la prop size'
                  title='Tamaños Diferentes'>
                  <div className='flex flex-wrap gap-3'>
                    <Modal id='small-modal' size='sm' title='Pequeño' trigger={<Button color='primary' size='sm'>Modal Pequeño</Button>}>
                      <div className='space-y-4'>
                        <p className='text-[var(--neutral-400)]'>Este modal tiene un ancho de 450px</p>
                      </div>
                    </Modal>

                    <Modal
                      id='medium-modal'
                      size='md'
                      title='Mediano (Default)'
                      trigger={<Button color='secondary' size='sm'>Modal Mediano</Button>}>
                      <div className='space-y-4'>
                        <p className='text-[var(--neutral-400)]'>Este modal tiene un ancho de 600px</p>
                      </div>
                    </Modal>

                    <Modal id='large-modal' size='lg' title='Grande' trigger={<Button color='tertiary' size='sm'>Modal Grande</Button>}>
                      <div className='space-y-4'>
                        <p className='text-[var(--neutral-400)]'>Este modal tiene un ancho de 900px</p>
                      </div>
                    </Modal>

                    <Modal id='xl-modal' size='xl' title='Extra Grande' trigger={<Button color='success' size='sm'>Modal XL</Button>}>
                      <div className='space-y-4'>
                        <p className='text-[var(--neutral-400)]'>Este modal tiene un ancho de 1200px</p>
                      </div>
                    </Modal>
                  </div>
                </CodePreview>
              </div>
            </div>

            {/* Props API */}
            <div className='p-6 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]'>
              <h2 className='text-2xl font-semibold mb-6 text-[var(--neutral-200)]'>API de Props</h2>

              <div className='space-y-6'>
                <div>
                  <h3 className='text-lg font-semibold mb-3 text-[var(--neutral-300)]'>Props Principales</h3>
                  <SpecTable
                    data={[
                      {
                        prop: 'id',
                        type: 'string',
                        default: "'modal'",
                        description: 'ID único del modal'
                      },
                      {
                        prop: 'title',
                        type: 'string',
                        default: "'Título del Modal'",
                        description: 'Título que aparece en el header (obligatorio)'
                      },
                      {
                        prop: 'titleProps',
                        type: 'CaptionProps',
                        default: '{}',
                        description: 'Props adicionales para personalizar el componente Caption del título'
                      },
                      {
                        prop: 'children',
                        type: 'ReactNode',
                        description: 'Contenido del modal'
                      },
                      {
                        prop: 'trigger',
                        type: 'ReactNode',
                        description: 'Elemento que abre el modal al hacer click'
                      }
                    ]}
                  />
                </div>

                <div>
                  <h3 className='text-lg font-semibold mb-3 text-[var(--neutral-300)]'>Props del Footer</h3>
                  <SpecTable
                    data={[
                      {
                        prop: 'footerButton',
                        type: 'boolean | ReactNode',
                        default: 'true',
                        description: 'Controla el footer: true (muestra botón por defecto), false (oculta footer), o ReactNode (componente personalizado)'
                      },
                      {
                        prop: 'footerButtonText',
                        type: 'string',
                        default: "'Continuar'",
                        description: 'Texto del botón por defecto del footer'
                      },
                      {
                        prop: 'onFooterButtonClick',
                        type: 'Function',
                        description: 'Callback cuando se hace click en el botón del footer (por defecto cierra el modal)'
                      }
                    ]}
                  />
                </div>

                <div>
                  <h3 className='text-lg font-semibold mb-3 text-[var(--neutral-300)]'>Props de Comportamiento</h3>
                  <SpecTable
                    data={[
                      {
                        prop: 'autoOpen',
                        type: 'boolean',
                        default: 'false',
                        description: 'Abrir el modal automáticamente al cargar la página'
                      },
                      {
                        prop: 'closeOnOverlayClick',
                        type: 'boolean',
                        default: 'true',
                        description: 'Cerrar el modal al hacer click fuera del contenido'
                      },
                      {
                        prop: 'closeOnEsc',
                        type: 'boolean',
                        default: 'true',
                        description: 'Cerrar el modal con la tecla Escape'
                      },
                      {
                        prop: 'centered',
                        type: 'boolean',
                        default: 'true',
                        description: 'Centrar el modal verticalmente'
                      }
                    ]}
                  />
                </div>

                <div>
                  <h3 className='text-lg font-semibold mb-3 text-[var(--neutral-300)]'>Props de Estilo</h3>
                  <SpecTable
                    data={[
                      {
                        prop: 'size',
                        type: "'sm'|'md'|'lg'|'xl'|'full'",
                        default: "'md'",
                        description: 'Tamaño del modal: sm(450px), md(600px), lg(900px), xl(1200px), full(95vw)'
                      },
                      {
                        prop: 'className',
                        type: 'string',
                        default: "''",
                        description: 'Clases CSS adicionales para el overlay'
                      },
                      {
                        prop: 'contentClassName',
                        type: 'string',
                        default: "''",
                        description: 'Clases CSS adicionales para el contenido'
                      }
                    ]}
                  />
                </div>

                <div>
                  <h3 className='text-lg font-semibold mb-3 text-[var(--neutral-300)]'>Callbacks</h3>
                  <SpecTable
                    data={[
                      {
                        prop: 'onOpen',
                        type: 'Function',
                        description: 'Callback que se ejecuta cuando el modal se abre'
                      },
                      {
                        prop: 'onClose',
                        type: 'Function',
                        description: 'Callback que se ejecuta cuando el modal se cierra'
                      }
                    ]}
                  />
                </div>
              </div>
            </div>

            {/* Control Programático */}
            <div className='p-6 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]'>
              <h2 className='text-2xl font-semibold mb-6 text-[var(--neutral-200)]'>Control Programático</h2>
              <div className='space-y-6'>
                <CodePreview
                  code={`import { openModalById, closeModalById, closeAll } from '@/app/components/modal/script.js'

function Example() {
  const handleOpenModal = () => {
    openModalById('modal-programmatic-overlay')
  }

  const handleCloseModal = () => {
    closeModalById('modal-programmatic-overlay')
  }

  return (
    <div>
      <button onClick={handleOpenModal}>Abrir Modal</button>
      <button onClick={handleCloseModal}>Cerrar Modal</button>

      <Modal id='programmatic' title='Modal Programático'>
        <h2>Modal controlado programáticamente</h2>
      </Modal>
    </div>
  )
}`}
                  description='Abre o cierra modales desde JavaScript'
                  title='API Programática'>
                  <div className='flex flex-wrap gap-3'>
                    <Button color='primary' onClick={() => openModalById('modal-programmatic-overlay')}>
                      Abrir Modal
                    </Button>
                    <Button color='danger' onClick={() => closeModalById('modal-programmatic-overlay')}>
                      Cerrar Modal
                    </Button>
                    <Button color='warning' onClick={() => closeAll()}>
                      Cerrar Todos
                    </Button>
                  </div>

                  <Modal id='programmatic' title='Modal Controlado Programáticamente'>
                    <div className='space-y-4'>
                      <p className='text-[var(--neutral-400)]'>Este modal fue abierto/cerrado usando funciones de JavaScript.</p>
                    </div>
                  </Modal>
                </CodePreview>
              </div>
            </div>

            {/* Características */}
            <div className='p-6 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]'>
              <h2 className='text-2xl font-semibold mb-6 text-[var(--neutral-200)]'>Características Clave</h2>
              <div className='grid md:grid-cols-2 gap-6'>
                <div className='space-y-3 text-sm text-[var(--neutral-400)]'>
                  <div className='flex items-start gap-2'>
                    <span className='text-green-500'>✅</span>
                    <span>
                      <strong className='text-[var(--neutral-300)]'>Header estructurado:</strong> Título (Caption) a la izquierda, botón de
                      cerrar a la derecha
                    </span>
                  </div>
                  <div className='flex items-start gap-2'>
                    <span className='text-green-500'>✅</span>
                    <span>
                      <strong className='text-[var(--neutral-300)]'>Footer configurable:</strong> Botón por defecto, personalizable u
                      ocultable
                    </span>
                  </div>
                  <div className='flex items-start gap-2'>
                    <span className='text-green-500'>✅</span>
                    <span>
                      <strong className='text-[var(--neutral-300)]'>SEO friendly:</strong> El título usa Caption (span) en lugar de
                      elementos H
                    </span>
                  </div>
                  <div className='flex items-start gap-2'>
                    <span className='text-green-500'>✅</span>
                    <span>
                      <strong className='text-[var(--neutral-300)]'>Accesibilidad:</strong> Focus trap, navegación con teclado, ARIA labels
                    </span>
                  </div>
                </div>
                <div className='space-y-3 text-sm text-[var(--neutral-400)]'>
                  <div className='flex items-start gap-2'>
                    <span className='text-green-500'>✅</span>
                    <span>
                      <strong className='text-[var(--neutral-300)]'>Múltiples instancias:</strong> Soporta múltiples modales en la misma
                      página
                    </span>
                  </div>
                  <div className='flex items-start gap-2'>
                    <span className='text-green-500'>✅</span>
                    <span>
                      <strong className='text-[var(--neutral-300)]'>Responsive:</strong> Tamaños adaptados para móvil, tablet y desktop
                    </span>
                  </div>
                  <div className='flex items-start gap-2'>
                    <span className='text-green-500'>✅</span>
                    <span>
                      <strong className='text-[var(--neutral-300)]'>Tema oscuro:</strong> Soporte automático para dark mode
                    </span>
                  </div>
                  <div className='flex items-start gap-2'>
                    <span className='text-green-500'>✅</span>
                    <span>
                      <strong className='text-[var(--neutral-300)]'>Prevención de scroll:</strong> El body no hace scroll cuando hay un
                      modal activo
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* REQUERIMIENTOS DE CONTENIDO */}
        {activeTab === 'content' && (
          <div className='space-y-12'>
            {/* Introducción */}
            <div className='p-6 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]'>
              <h2 className='text-2xl font-semibold mb-4 text-[var(--neutral-200)]'>Guía de Contenido para el Componente Modal</h2>
              <p className='text-[var(--neutral-400)]'>
                Esta sección proporciona las especificaciones de contenido necesarias para el equipo de contenidos. Incluye límites de
                caracteres, requisitos de imágenes y mejores prácticas para cada elemento del modal.
              </p>
            </div>

            {/* Título del Modal */}
            <div className='p-6 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]'>
              <h3 className='text-xl font-semibold mb-4 text-[var(--neutral-200)]'>📋 Título del Modal</h3>

              <div className='space-y-4'>
                <div className='bg-[var(--neutral-900)] p-4 rounded-lg'>
                  <div className='grid md:grid-cols-2 gap-4 text-sm'>
                    <div>
                      <p className='text-[var(--neutral-500)] mb-1'>Caracteres recomendados:</p>
                      <p className='text-[var(--neutral-200)] font-semibold'>25-40 caracteres</p>
                    </div>
                    <div>
                      <p className='text-[var(--neutral-500)] mb-1'>Máximo absoluto:</p>
                      <p className='text-[var(--warning-400)] font-semibold'>60 caracteres</p>
                    </div>
                    <div>
                      <p className='text-[var(--neutral-500)] mb-1'>Componente usado:</p>
                      <p className='text-[var(--neutral-200)]'>Caption (no afecta SEO)</p>
                    </div>
                    <div>
                      <p className='text-[var(--neutral-500)] mb-1'>Tamaño por defecto:</p>
                      <p className='text-[var(--neutral-200)]'>lg, bold, color primary</p>
                    </div>
                  </div>
                </div>

                <div className='space-y-2'>
                  <p className='text-sm font-semibold text-[var(--neutral-300)]'>Ejemplos Correctos:</p>
                  <div className='bg-[var(--neutral-900)] p-3 rounded'>
                    <p className='text-sm text-green-400'>✅ "Configuración de Cuenta" (24 caracteres)</p>
                    <p className='text-sm text-green-400'>✅ "Detalles del Programa Académico" (33 caracteres)</p>
                    <p className='text-sm text-green-400'>✅ "Información de Contacto" (25 caracteres)</p>
                  </div>
                </div>

                <div className='space-y-2'>
                  <p className='text-sm font-semibold text-[var(--neutral-300)]'>Ejemplos Incorrectos:</p>
                  <div className='bg-[var(--neutral-900)] p-3 rounded'>
                    <p className='text-sm text-red-400'>
                      ❌ "Este es un título muy largo que no debería usarse porque excede el límite" (80 caracteres)
                    </p>
                    <p className='text-sm text-red-400'>❌ "Info" (4 caracteres - demasiado corto)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contenido del Modal */}
            <div className='p-6 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]'>
              <h3 className='text-xl font-semibold mb-4 text-[var(--neutral-200)]'>📄 Contenido del Modal (Body)</h3>

              <div className='space-y-4'>
                <div className='bg-[var(--neutral-900)] p-4 rounded-lg'>
                  <div className='grid md:grid-cols-2 gap-4 text-sm'>
                    <div>
                      <p className='text-[var(--neutral-500)] mb-1'>Texto recomendado:</p>
                      <p className='text-[var(--neutral-200)] font-semibold'>150-300 palabras</p>
                    </div>
                    <div>
                      <p className='text-[var(--neutral-500)] mb-1'>Máximo sugerido:</p>
                      <p className='text-[var(--warning-400)] font-semibold'>500 palabras</p>
                    </div>
                    <div>
                      <p className='text-[var(--neutral-500)] mb-1'>Párrafos recomendados:</p>
                      <p className='text-[var(--neutral-200)]'>2-4 párrafos</p>
                    </div>
                    <div>
                      <p className='text-[var(--neutral-500)] mb-1'>Scroll:</p>
                      <p className='text-[var(--neutral-200)]'>Automático si excede altura</p>
                    </div>
                  </div>
                </div>

                <div className='space-y-2'>
                  <p className='text-sm font-semibold text-[var(--neutral-300)]'>Tipos de Contenido Soportados:</p>
                  <div className='bg-[var(--neutral-900)] p-3 rounded space-y-2'>
                    <p className='text-sm text-[var(--neutral-400)]'>• Texto plano y párrafos</p>
                    <p className='text-sm text-[var(--neutral-400)]'>• Listas (ordenadas y no ordenadas)</p>
                    <p className='text-sm text-[var(--neutral-400)]'>• Formularios</p>
                    <p className='text-sm text-[var(--neutral-400)]'>• Imágenes (ver sección de imágenes)</p>
                    <p className='text-sm text-[var(--neutral-400)]'>• Componentes de la biblioteca (Button, Caption, Paragraph, etc.)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Imágenes */}
            <div className='p-6 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]'>
              <h3 className='text-xl font-semibold mb-4 text-[var(--neutral-200)]'>🖼️ Imágenes en el Modal</h3>

              <div className='space-y-6'>
                {/* Imagen según tamaño de modal */}
                <div>
                  <p className='text-sm font-semibold text-[var(--neutral-300)] mb-3'>Dimensiones Recomendadas por Tamaño de Modal:</p>
                  <div className='overflow-x-auto'>
                    <table className='w-full text-sm text-left border border-[var(--neutral-800)] rounded-lg'>
                      <thead className='bg-[var(--background-200)] border-b border-[var(--neutral-800)]'>
                        <tr>
                          <th className='px-4 py-3 text-[var(--neutral-200)]'>Tamaño Modal</th>
                          <th className='px-4 py-3 text-[var(--neutral-200)]'>Ancho Modal</th>
                          <th className='px-4 py-3 text-[var(--neutral-200)]'>Imagen Ancho Completo</th>
                          <th className='px-4 py-3 text-[var(--neutral-200)]'>Imagen Thumbnail</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className='border-b border-[var(--neutral-800)]'>
                          <td className='px-4 py-3'>
                            <code className='text-xs bg-[var(--neutral-800)] px-2 py-1 rounded'>sm</code>
                          </td>
                          <td className='px-4 py-3 text-[var(--neutral-400)]'>450px</td>
                          <td className='px-4 py-3 text-[var(--neutral-400)]'>420px × 280px (3:2)</td>
                          <td className='px-4 py-3 text-[var(--neutral-400)]'>200px × 200px (1:1)</td>
                        </tr>
                        <tr className='border-b border-[var(--neutral-800)]'>
                          <td className='px-4 py-3'>
                            <code className='text-xs bg-[var(--neutral-800)] px-2 py-1 rounded'>md</code>
                          </td>
                          <td className='px-4 py-3 text-[var(--neutral-400)]'>600px</td>
                          <td className='px-4 py-3 text-[var(--neutral-400)]'>570px × 380px (3:2)</td>
                          <td className='px-4 py-3 text-[var(--neutral-400)]'>250px × 250px (1:1)</td>
                        </tr>
                        <tr className='border-b border-[var(--neutral-800)]'>
                          <td className='px-4 py-3'>
                            <code className='text-xs bg-[var(--neutral-800)] px-2 py-1 rounded'>lg</code>
                          </td>
                          <td className='px-4 py-3 text-[var(--neutral-400)]'>900px</td>
                          <td className='px-4 py-3 text-[var(--neutral-400)]'>870px × 580px (3:2)</td>
                          <td className='px-4 py-3 text-[var(--neutral-400)]'>300px × 300px (1:1)</td>
                        </tr>
                        <tr className='border-b border-[var(--neutral-800)]'>
                          <td className='px-4 py-3'>
                            <code className='text-xs bg-[var(--neutral-800)] px-2 py-1 rounded'>xl</code>
                          </td>
                          <td className='px-4 py-3 text-[var(--neutral-400)]'>1200px</td>
                          <td className='px-4 py-3 text-[var(--neutral-400)]'>1170px × 780px (3:2)</td>
                          <td className='px-4 py-3 text-[var(--neutral-400)]'>350px × 350px (1:1)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Especificaciones técnicas */}
                <div>
                  <p className='text-sm font-semibold text-[var(--neutral-300)] mb-3'>Especificaciones Técnicas:</p>
                  <div className='bg-[var(--neutral-900)] p-4 rounded-lg'>
                    <div className='grid md:grid-cols-2 gap-4 text-sm'>
                      <div>
                        <p className='text-[var(--neutral-500)] mb-1'>Formatos aceptados:</p>
                        <p className='text-[var(--neutral-200)]'>JPG, PNG, WebP (preferido)</p>
                      </div>
                      <div>
                        <p className='text-[var(--neutral-500)] mb-1'>Peso máximo por imagen:</p>
                        <p className='text-[var(--warning-400)]'>300KB (WebP) / 500KB (JPG/PNG)</p>
                      </div>
                      <div>
                        <p className='text-[var(--neutral-500)] mb-1'>Ratio de aspecto recomendado:</p>
                        <p className='text-[var(--neutral-200)]'>3:2 (horizontal) o 1:1 (cuadrado)</p>
                      </div>
                      <div>
                        <p className='text-[var(--neutral-500)] mb-1'>Alt text:</p>
                        <p className='text-[var(--neutral-200)]'>Obligatorio, 50-125 caracteres</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cantidad de imágenes */}
                <div>
                  <p className='text-sm font-semibold text-[var(--neutral-300)] mb-3'>Cantidad de Imágenes Recomendada:</p>
                  <div className='bg-[var(--neutral-900)] p-3 rounded space-y-2'>
                    <p className='text-sm text-green-400'>✅ Modal pequeño (sm): 1 imagen principal</p>
                    <p className='text-sm text-green-400'>✅ Modal mediano (md): 1-2 imágenes</p>
                    <p className='text-sm text-green-400'>✅ Modal grande (lg): 2-4 imágenes</p>
                    <p className='text-sm text-green-400'>✅ Modal XL (xl): 3-6 imágenes</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Botón del Footer */}
            <div className='p-6 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]'>
              <h3 className='text-xl font-semibold mb-4 text-[var(--neutral-200)]'>🔘 Botón del Footer</h3>

              <div className='space-y-4'>
                <div className='bg-[var(--neutral-900)] p-4 rounded-lg'>
                  <div className='grid md:grid-cols-2 gap-4 text-sm'>
                    <div>
                      <p className='text-[var(--neutral-500)] mb-1'>Texto recomendado:</p>
                      <p className='text-[var(--neutral-200)] font-semibold'>8-20 caracteres</p>
                    </div>
                    <div>
                      <p className='text-[var(--neutral-500)] mb-1'>Máximo absoluto:</p>
                      <p className='text-[var(--warning-400)] font-semibold'>30 caracteres</p>
                    </div>
                    <div>
                      <p className='text-[var(--neutral-500)] mb-1'>Texto por defecto:</p>
                      <p className='text-[var(--neutral-200)]'>"Continuar"</p>
                    </div>
                    <div>
                      <p className='text-[var(--neutral-500)] mb-1'>Acción por defecto:</p>
                      <p className='text-[var(--neutral-200)]'>Cierra el modal</p>
                    </div>
                  </div>
                </div>

                <div className='space-y-2'>
                  <p className='text-sm font-semibold text-[var(--neutral-300)]'>Ejemplos de Textos para Botones:</p>
                  <div className='bg-[var(--neutral-900)] p-3 rounded grid md:grid-cols-2 gap-2'>
                    <p className='text-sm text-green-400'>✅ "Guardar cambios"</p>
                    <p className='text-sm text-green-400'>✅ "Continuar"</p>
                    <p className='text-sm text-green-400'>✅ "Aceptar"</p>
                    <p className='text-sm text-green-400'>✅ "Enviar formulario"</p>
                    <p className='text-sm text-green-400'>✅ "Confirmar acción"</p>
                    <p className='text-sm text-green-400'>✅ "Cerrar"</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Casos de Uso por Tamaño */}
            <div className='p-6 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]'>
              <h3 className='text-xl font-semibold mb-4 text-[var(--neutral-200)]'>📐 Casos de Uso por Tamaño de Modal</h3>

              <div className='space-y-4'>
                {[
                  {
                    size: 'sm',
                    width: '450px',
                    use: 'Alertas, confirmaciones, mensajes cortos',
                    text: '50-150 palabras',
                    images: '0-1 imagen pequeña'
                  },
                  {
                    size: 'md',
                    width: '600px',
                    use: 'Formularios simples, detalles de elementos, información general',
                    text: '150-300 palabras',
                    images: '1-2 imágenes medianas'
                  },
                  {
                    size: 'lg',
                    width: '900px',
                    use: 'Formularios complejos, galerías, contenido educativo',
                    text: '300-500 palabras',
                    images: '2-4 imágenes'
                  },
                  {
                    size: 'xl',
                    width: '1200px',
                    use: 'Presentaciones, documentación extensa, dashboards',
                    text: '500+ palabras',
                    images: '3-6 imágenes grandes'
                  }
                ].map(item => (
                  <div key={item.size} className='bg-[var(--neutral-900)] p-4 rounded-lg'>
                    <div className='flex items-center gap-3 mb-3'>
                      <code className='text-sm bg-[var(--primary-900)] text-[var(--primary-200)] px-3 py-1 rounded'>{item.size}</code>
                      <span className='text-sm text-[var(--neutral-500)]'>{item.width}</span>
                    </div>
                    <div className='grid md:grid-cols-3 gap-3 text-sm'>
                      <div>
                        <p className='text-[var(--neutral-500)] mb-1'>Caso de uso:</p>
                        <p className='text-[var(--neutral-200)]'>{item.use}</p>
                      </div>
                      <div>
                        <p className='text-[var(--neutral-500)] mb-1'>Texto:</p>
                        <p className='text-[var(--neutral-200)]'>{item.text}</p>
                      </div>
                      <div>
                        <p className='text-[var(--neutral-500)] mb-1'>Imágenes:</p>
                        <p className='text-[var(--neutral-200)]'>{item.images}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Checklist de Contenido */}
            <div className='p-6 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]'>
              <h3 className='text-xl font-semibold mb-4 text-[var(--neutral-200)]'>✅ Checklist de Contenido</h3>

              <div className='grid md:grid-cols-2 gap-6'>
                <div>
                  <h4 className='text-md font-semibold mb-3 text-[var(--neutral-300)]'>Antes de Publicar - Verificar:</h4>
                  <div className='space-y-2 text-sm'>
                    <label className='flex items-start gap-2 cursor-pointer hover:bg-[var(--neutral-900)] p-2 rounded'>
                      <input type='checkbox' className='mt-1' />
                      <span className='text-[var(--neutral-400)]'>Título entre 25-40 caracteres</span>
                    </label>
                    <label className='flex items-start gap-2 cursor-pointer hover:bg-[var(--neutral-900)] p-2 rounded'>
                      <input type='checkbox' className='mt-1' />
                      <span className='text-[var(--neutral-400)]'>Contenido del body no excede 500 palabras</span>
                    </label>
                    <label className='flex items-start gap-2 cursor-pointer hover:bg-[var(--neutral-900)] p-2 rounded'>
                      <input type='checkbox' className='mt-1' />
                      <span className='text-[var(--neutral-400)]'>Imágenes optimizadas (WebP preferido)</span>
                    </label>
                    <label className='flex items-start gap-2 cursor-pointer hover:bg-[var(--neutral-900)] p-2 rounded'>
                      <input type='checkbox' className='mt-1' />
                      <span className='text-[var(--neutral-400)]'>Todas las imágenes tienen alt text</span>
                    </label>
                    <label className='flex items-start gap-2 cursor-pointer hover:bg-[var(--neutral-900)] p-2 rounded'>
                      <input type='checkbox' className='mt-1' />
                      <span className='text-[var(--neutral-400)]'>Peso de imágenes bajo 300KB</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className='text-md font-semibold mb-3 text-[var(--neutral-300)]'>Calidad del Contenido:</h4>
                  <div className='space-y-2 text-sm'>
                    <label className='flex items-start gap-2 cursor-pointer hover:bg-[var(--neutral-900)] p-2 rounded'>
                      <input type='checkbox' className='mt-1' />
                      <span className='text-[var(--neutral-400)]'>El título es claro y descriptivo</span>
                    </label>
                    <label className='flex items-start gap-2 cursor-pointer hover:bg-[var(--neutral-900)] p-2 rounded'>
                      <input type='checkbox' className='mt-1' />
                      <span className='text-[var(--neutral-400)]'>El contenido está bien estructurado (párrafos, listas)</span>
                    </label>
                    <label className='flex items-start gap-2 cursor-pointer hover:bg-[var(--neutral-900)] p-2 rounded'>
                      <input type='checkbox' className='mt-1' />
                      <span className='text-[var(--neutral-400)]'>El texto del botón describe la acción claramente</span>
                    </label>
                    <label className='flex items-start gap-2 cursor-pointer hover:bg-[var(--neutral-900)] p-2 rounded'>
                      <input type='checkbox' className='mt-1' />
                      <span className='text-[var(--neutral-400)]'>El tamaño del modal es apropiado para el contenido</span>
                    </label>
                    <label className='flex items-start gap-2 cursor-pointer hover:bg-[var(--neutral-900)] p-2 rounded'>
                      <input type='checkbox' className='mt-1' />
                      <span className='text-[var(--neutral-400)]'>Probado en mobile y desktop</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className='mt-16 text-center p-8 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]'>
          <h3 className='text-xl font-semibold mb-4 text-[var(--neutral-200)]'>¿Necesitas más información?</h3>
          <p className='text-[var(--neutral-400)] mb-6 max-w-2xl mx-auto'>
            Consulta el código fuente del componente o contacta al equipo de desarrollo para casos de uso específicos.
          </p>
          <div className='flex flex-wrap gap-3 justify-center'>
            <Button color='primary' startIcon={<i className='ph ph-github-logo' />} variant='bordered'>
              Ver código fuente
            </Button>
            <Button color='secondary' startIcon={<i className='ph ph-book' />} variant='light'>
              Documentación completa
            </Button>
          </div>
        </div>
      </Container>
    </>
  )
}
