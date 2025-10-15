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

export default function ModalShowcase() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

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
            Sistema de modales reutilizables estilo Bootstrap con soporte para múltiples instancias, accesibilidad completa y eventos
            personalizados.
          </p>
        </div>

        {/* Showcase principal */}
        <div className='mb-12 p-6 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]'>
          <h2 className='text-2xl font-semibold mb-6 text-[var(--neutral-200)]'>Ejemplos Básicos</h2>
          <div className='space-y-6'>
            {/* Modal básico */}
            <CodePreview
              code={`<Modal id='basic-modal' trigger={<Button>Abrir Modal</Button>}>
  <h2>¡Hola!</h2>
  <p>Este es un modal básico.</p>
</Modal>`}
              description='La forma más simple: un botón que abre el modal'
              title='Modal Básico'>
              <Modal id='basic-modal' trigger={<Button color='primary'>Abrir Modal Básico</Button>}>
                <div className='space-y-4'>
                  <h2 className='text-2xl font-bold text-[var(--neutral-200)]'>¡Hola!</h2>
                  <p className='text-[var(--neutral-400)]'>Este es un modal básico.</p>
                </div>
              </Modal>
            </CodePreview>

            {/* Modal con tamaños */}
            <CodePreview
              code={`// Tamaños disponibles: 'sm' | 'md' | 'lg' | 'xl' | 'full'

<Modal id='small-modal' size='sm' trigger={<Button>Modal Pequeño</Button>}>
  <p>Modal pequeño (400px)</p>
</Modal>

<Modal id='large-modal' size='lg' trigger={<Button>Modal Grande</Button>}>
  <p>Modal grande (900px)</p>
</Modal>

<Modal id='full-modal' size='full' trigger={<Button>Modal Pantalla Completa</Button>}>
  <p>Modal de pantalla completa (95vw x 95vh)</p>
</Modal>`}
              description='Controla el ancho del modal con la prop size'
              title='Tamaños Diferentes'>
              <div className='flex flex-wrap gap-3'>
                <Modal
                  id='small-modal'
                  size='sm'
                  trigger={
                    <Button color='primary' size='sm'>
                      Modal Pequeño
                    </Button>
                  }>
                  <div className='space-y-4'>
                    <h3 className='text-xl font-bold text-[var(--neutral-200)]'>Modal Pequeño</h3>
                    <p className='text-[var(--neutral-400)]'>Este modal tiene un ancho de 400px</p>
                  </div>
                </Modal>

                <Modal
                  id='medium-modal'
                  size='md'
                  trigger={
                    <Button color='secondary' size='sm'>
                      Modal Mediano
                    </Button>
                  }>
                  <div className='space-y-4'>
                    <h3 className='text-xl font-bold text-[var(--neutral-200)]'>Modal Mediano (Default)</h3>
                    <p className='text-[var(--neutral-400)]'>Este modal tiene un ancho de 600px</p>
                  </div>
                </Modal>

                <Modal
                  id='large-modal'
                  size='lg'
                  trigger={
                    <Button color='tertiary' size='sm'>
                      Modal Grande
                    </Button>
                  }>
                  <div className='space-y-4'>
                    <h3 className='text-xl font-bold text-[var(--neutral-200)]'>Modal Grande</h3>
                    <p className='text-[var(--neutral-400)]'>Este modal tiene un ancho de 900px</p>
                  </div>
                </Modal>

                <Modal
                  id='xl-modal'
                  size='xl'
                  trigger={
                    <Button color='success' size='sm'>
                      Modal Extra Grande
                    </Button>
                  }>
                  <div className='space-y-4'>
                    <h3 className='text-xl font-bold text-[var(--neutral-200)]'>Modal Extra Grande</h3>
                    <p className='text-[var(--neutral-400)]'>Este modal tiene un ancho de 1200px</p>
                  </div>
                </Modal>

                <Modal
                  id='full-modal'
                  size='full'
                  trigger={
                    <Button color='warning' size='sm'>
                      Modal Pantalla Completa
                    </Button>
                  }>
                  <div className='space-y-4'>
                    <h3 className='text-xl font-bold text-[var(--neutral-200)]'>Modal Pantalla Completa</h3>
                    <p className='text-[var(--neutral-400)]'>Este modal ocupa 95vw x 95vh</p>
                  </div>
                </Modal>
              </div>
            </CodePreview>

            {/* Modal con auto-open */}
            <CodePreview
              code={`<Modal id='welcome-modal' autoOpen={true} trigger={<Button>Volver a abrir</Button>}>
  <h2>¡Bienvenido!</h2>
  <p>Este modal se abrió automáticamente.</p>
</Modal>`}
              description='Modal que se abre automáticamente al cargar la página'
              title='Auto-open'>
              <Modal id='welcome-modal' trigger={<Button color='primary'>Abrir Modal Auto-open</Button>}>
                <div className='space-y-4'>
                  <h2 className='text-2xl font-bold text-[var(--neutral-200)]'>¡Bienvenido!</h2>
                  <p className='text-[var(--neutral-400)]'>
                    Este modal puede configurarse para abrirse automáticamente con la prop <code>autoOpen=true</code>
                  </p>
                </div>
              </Modal>
            </CodePreview>
          </div>
        </div>

        {/* Comportamientos */}
        <div className='mb-12 p-6 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]'>
          <h2 className='text-2xl font-semibold mb-6 text-[var(--neutral-200)]'>Comportamientos Personalizados</h2>
          <div className='space-y-6'>
            <CodePreview
              code={`<Modal
  id='no-close-button'
  showCloseButton={false}
  trigger={<Button>Modal sin X</Button>}>
  <p>Este modal no tiene botón de cerrar.</p>
  <p>Presiona Escape o haz click fuera para cerrar.</p>
</Modal>`}
              description='Oculta el botón X del modal'
              title='Sin Botón de Cerrar'>
              <Modal id='no-close-button' showCloseButton={false} trigger={<Button color='primary'>Modal sin Botón X</Button>}>
                <div className='space-y-4'>
                  <h3 className='text-xl font-bold text-[var(--neutral-200)]'>Modal sin Botón X</h3>
                  <p className='text-[var(--neutral-400)]'>Este modal no tiene botón de cerrar.</p>
                  <p className='text-[var(--neutral-400)]'>Presiona Escape o haz click fuera para cerrar.</p>
                </div>
              </Modal>
            </CodePreview>

            <CodePreview
              code={`<Modal
  id='no-overlay-close'
  closeOnOverlayClick={false}
  trigger={<Button>Modal Persistente</Button>}>
  <h2>Modal Persistente</h2>
  <p>Solo se cierra con el botón X o la tecla Escape.</p>
</Modal>`}
              description='No se cierra al hacer click fuera del contenido'
              title='No Cerrar al Click Fuera'>
              <Modal closeOnOverlayClick={false} id='no-overlay-close' trigger={<Button color='warning'>Modal Persistente</Button>}>
                <div className='space-y-4'>
                  <h3 className='text-xl font-bold text-[var(--neutral-200)]'>Modal Persistente</h3>
                  <p className='text-[var(--neutral-400)]'>Solo se cierra con el botón X o la tecla Escape.</p>
                </div>
              </Modal>
            </CodePreview>

            <CodePreview
              code={`<Modal
  id='no-escape'
  closeOnEsc={false}
  trigger={<Button>Modal sin Escape</Button>}>
  <p>No se puede cerrar con la tecla Escape.</p>
</Modal>`}
              description='Desactiva el cierre con tecla Escape'
              title='Sin Escape'>
              <Modal closeOnEsc={false} id='no-escape' trigger={<Button color='danger'>Modal sin Escape</Button>}>
                <div className='space-y-4'>
                  <h3 className='text-xl font-bold text-[var(--neutral-200)]'>Modal sin Escape</h3>
                  <p className='text-[var(--neutral-400)]'>No se puede cerrar con la tecla Escape.</p>
                  <p className='text-[var(--neutral-400)]'>Solo puedes cerrarlo con el botón X o haciendo click fuera.</p>
                </div>
              </Modal>
            </CodePreview>

            <CodePreview
              code={`<Modal
  id='top-modal'
  centered={false}
  trigger={<Button>Modal Arriba</Button>}>
  <p>Este modal está alineado en la parte superior.</p>
</Modal>`}
              description='Modal alineado arriba en lugar de centrado'
              title='Posición Superior'>
              <Modal centered={false} id='top-modal' trigger={<Button color='secondary'>Modal Arriba</Button>}>
                <div className='space-y-4'>
                  <h3 className='text-xl font-bold text-[var(--neutral-200)]'>Modal Arriba</h3>
                  <p className='text-[var(--neutral-400)]'>Este modal está alineado en la parte superior de la pantalla.</p>
                </div>
              </Modal>
            </CodePreview>
          </div>
        </div>

        {/* Control Programático */}
        <div className='mb-12 p-6 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]'>
          <h2 className='text-2xl font-semibold mb-6 text-[var(--neutral-200)]'>Control Programático</h2>
          <div className='space-y-6'>
            <CodePreview
              code={`import { openModalById, closeModalById, closeAll } from '@library/components/feedback/modal/script.js'

function Example() {
  const handleOpenModal = () => {
    // Opción 1: Usar la función exportada
    openModalById('modal-programmatic-overlay')

    // Opción 2: Usar evento personalizado
    window.dispatchEvent(
      new CustomEvent('modal:open', {
        detail: { modalId: 'modal-programmatic-overlay' }
      })
    )
  }

  const handleCloseModal = () => {
    closeModalById('modal-programmatic-overlay')
  }

  return (
    <div>
      <button onClick={handleOpenModal}>Abrir Modal</button>
      <button onClick={handleCloseModal}>Cerrar Modal</button>

      <Modal id='programmatic'>
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

              <Modal id='programmatic'>
                <div className='space-y-4'>
                  <h3 className='text-xl font-bold text-[var(--neutral-200)]'>Modal Controlado Programáticamente</h3>
                  <p className='text-[var(--neutral-400)]'>Este modal fue abierto/cerrado usando funciones de JavaScript.</p>
                </div>
              </Modal>
            </CodePreview>
          </div>
        </div>

        {/* Casos de uso complejos */}
        <div className='mb-12 p-6 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]'>
          <h2 className='text-2xl font-semibold mb-6 text-[var(--neutral-200)]'>Casos de Uso Complejos</h2>
          <div className='space-y-6'>
            {/* Modal con formulario */}
            <CodePreview
              code={`function Example() {
  const handleSubmit = (e) => {
    e.preventDefault()
    // Procesar formulario
    closeModalById('form-modal-overlay')
  }

  return (
    <Modal id='form-modal' size='md' trigger={<Button>Abrir Formulario</Button>}>
      <h2>Formulario de Contacto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Nombre:</label>
          <input type='text' id='name' name='name' required />
        </div>
        <div>
          <label htmlFor='email'>Email:</label>
          <input type='email' id='email' name='email' required />
        </div>
        <div>
          <label htmlFor='message'>Mensaje:</label>
          <textarea id='message' name='message' rows='4' required />
        </div>
        <button type='submit'>Enviar</button>
      </form>
    </Modal>
  )
}`}
              description='Modal con formulario completo y validación'
              title='Formulario Completo'>
              <Modal id='form-modal' size='md' trigger={<Button color='primary'>Abrir Formulario</Button>}>
                <div className='space-y-4'>
                  <h2 className='text-2xl font-bold text-[var(--neutral-200)]'>Formulario de Contacto</h2>
                  <form className='space-y-4' onSubmit={handleSubmit}>
                    <div>
                      <label className='block text-sm font-medium text-[var(--neutral-300)] mb-1' htmlFor='name'>
                        Nombre:
                      </label>
                      <input
                        required
                        className='w-full px-3 py-2 bg-[var(--neutral-800)] border border-[var(--neutral-700)] rounded text-[var(--neutral-200)]'
                        id='name'
                        name='name'
                        type='text'
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-[var(--neutral-300)] mb-1' htmlFor='email'>
                        Email:
                      </label>
                      <input
                        required
                        className='w-full px-3 py-2 bg-[var(--neutral-800)] border border-[var(--neutral-700)] rounded text-[var(--neutral-200)]'
                        id='email'
                        name='email'
                        type='email'
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-[var(--neutral-300)] mb-1' htmlFor='message'>
                        Mensaje:
                      </label>
                      <textarea
                        required
                        className='w-full px-3 py-2 bg-[var(--neutral-800)] border border-[var(--neutral-700)] rounded text-[var(--neutral-200)]'
                        id='message'
                        name='message'
                        rows={4}
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>
                    <div className='flex gap-2 justify-end'>
                      <Button color='secondary' type='button' variant='light' onClick={() => closeModalById('modal-form-modal-overlay')}>
                        Cancelar
                      </Button>
                      <Button color='primary' type='submit'>
                        Enviar
                      </Button>
                    </div>
                  </form>
                </div>
              </Modal>
            </CodePreview>

            {/* Modal con InfoItem (caso real) */}
            <CodePreview
              code={`function InfoItem({ label, icon, modalContent, modalId }) {
  return (
    <div className='info-item'>
      <div className='info-item__icon'>
        <i className={\`ph \${icon}\`}></i>
      </div>

      <div className='info-item__content'>
        <Caption size='sm'>{label}</Caption>

        <Modal
          id={modalId}
          size='sm'
          trigger={
            <Button variant='shadow' size='sm' endIcon={<i className='ph ph-info'></i>}>
              Ver detalles
            </Button>
          }>
          <div className='program-detail-modal__header'>
            <Caption as='h3' size='lg' bold={true}>
              {label}
            </Caption>
          </div>
          <div className='program-detail-modal__body'>
            {modalContent}
          </div>
        </Modal>
      </div>
    </div>
  )
}

// Uso
<InfoItem
  icon='ph-clock'
  label='Horarios'
  modalId='modal-horarios'
  modalContent={
    <Paragraph>
      <p><strong>Jornada de atención:</strong></p>
      <ul>
        <li><strong>Lunes a viernes:</strong> 7:00 a.m. a 11:00 a.m.</li>
        <li><strong>Sábados:</strong> 8:00 a.m. a 12:00 p.m.</li>
      </ul>
    </Paragraph>
  }
/>`}
              description='Ejemplo real del proyecto: InfoItem con modal integrado'
              title='InfoItem con Modal (Caso Real)'>
              <div className='border border-[var(--neutral-700)] rounded-lg p-4 bg-[var(--neutral-800)]'>
                <div className='flex items-start gap-3'>
                  <div className='text-2xl text-[var(--primary-500)]'>
                    <i className='ph ph-clock' />
                  </div>
                  <div className='space-y-2'>
                    <Caption size='sm'>Horarios</Caption>
                    <Modal
                      id='modal-horarios-example'
                      size='sm'
                      trigger={
                        <Button endIcon={<i className='ph ph-info' />} size='sm' variant='shadow'>
                          Ver detalles
                        </Button>
                      }>
                      <div className='space-y-4'>
                        <h3 className='text-xl font-bold text-[var(--neutral-200)]'>Horarios</h3>
                        <Paragraph>
                          <p>
                            <strong>Jornada de atención:</strong>
                          </p>
                          <ul className='list-disc list-inside space-y-1 mt-2'>
                            <li>
                              <strong>Lunes a viernes:</strong> 7:00 a.m. a 11:00 a.m.
                            </li>
                            <li>
                              <strong>Sábados:</strong> 8:00 a.m. a 12:00 p.m.
                            </li>
                          </ul>
                        </Paragraph>
                      </div>
                    </Modal>
                  </div>
                </div>
              </div>
            </CodePreview>

            {/* Múltiples modales */}
            <CodePreview
              code={`<Modal id='modal-1' trigger={<Button>Modal 1</Button>}>
  <h2>Primer Modal</h2>
</Modal>

<Modal id='modal-2' trigger={<Button>Modal 2</Button>}>
  <h2>Segundo Modal</h2>
</Modal>

<Modal id='modal-3' trigger={<Button>Modal 3</Button>}>
  <h2>Tercer Modal</h2>
</Modal>`}
              description='El sistema soporta múltiples modales en la misma página'
              title='Múltiples Modales'>
              <div className='flex flex-wrap gap-3'>
                <Modal id='modal-1' trigger={<Button color='primary'>Modal 1</Button>}>
                  <div className='space-y-4'>
                    <h2 className='text-2xl font-bold text-[var(--neutral-200)]'>Primer Modal</h2>
                    <p className='text-[var(--neutral-400)]'>Este es el primer modal.</p>
                  </div>
                </Modal>

                <Modal id='modal-2' trigger={<Button color='secondary'>Modal 2</Button>}>
                  <div className='space-y-4'>
                    <h2 className='text-2xl font-bold text-[var(--neutral-200)]'>Segundo Modal</h2>
                    <p className='text-[var(--neutral-400)]'>Este es el segundo modal.</p>
                  </div>
                </Modal>

                <Modal id='modal-3' trigger={<Button color='tertiary'>Modal 3</Button>}>
                  <div className='space-y-4'>
                    <h2 className='text-2xl font-bold text-[var(--neutral-200)]'>Tercer Modal</h2>
                    <p className='text-[var(--neutral-400)]'>Este es el tercer modal.</p>
                  </div>
                </Modal>
              </div>
            </CodePreview>
          </div>
        </div>

        {/* Documentación de API */}
        <div className='mb-12 p-6 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]'>
          <h2 className='text-2xl font-semibold mb-6 text-[var(--neutral-200)]'>Documentación de API</h2>

          <CodePreview
            code={`interface ModalProps {
  // Identificación
  id?: string                      // ID único del modal (default: 'modal')
  className?: string               // Clases adicionales para el overlay
  contentClassName?: string        // Clases para el contenido

  // Contenido
  children: React.ReactNode        // Contenido del modal
  trigger?: React.ReactNode        // Elemento que abre el modal

  // Comportamiento
  autoOpen?: boolean               // Abrir automáticamente (default: false)
  closeOnOverlayClick?: boolean    // Cerrar al click fuera (default: true)
  closeOnEsc?: boolean             // Cerrar con Escape (default: true)
  showCloseButton?: boolean        // Mostrar botón X (default: true)

  // Callbacks
  onOpen?: Function                // Callback al abrir
  onClose?: Function               // Callback al cerrar

  // Apariencia
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'  // Tamaño del modal (default: 'md')
  centered?: boolean               // Centrado verticalmente (default: true)

  // Modo estático (interno)
  staticMode?: boolean             // Para ViewComponent de Liferay
}`}
            description='Props disponibles del componente Modal'
            title='Interface de Props'>
            <div className='text-[var(--neutral-400)] text-sm'>Ver el código completo de la interface del componente</div>
          </CodePreview>

          <div className='mt-6'>
            <CodePreview
              code={`import { openModalById, closeModalById, closeAll, initializeAllModals } from '@library/components/feedback/modal/script.js'

// Abrir modal por ID
openModalById('my-modal-overlay')      // Retorna true si existe

// Cerrar modal por ID
closeModalById('my-modal-overlay')     // Retorna true si existe

// Cerrar todos los modales
closeAll()

// Inicializar modales manualmente
initializeAllModals()`}
              description='Funciones exportadas para control programático'
              title='API de Script'>
              <div className='text-[var(--neutral-400)] text-sm'>Funciones disponibles para controlar modales desde JavaScript</div>
            </CodePreview>
          </div>

          <div className='mt-6'>
            <CodePreview
              code={`// Escuchar apertura de modal
window.addEventListener('modal:opened', (e) => {
  console.log('Modal abierto:', e.detail.modalId)
})

// Escuchar cierre de modal
window.addEventListener('modal:closed', (e) => {
  console.log('Modal cerrado:', e.detail.modalId)
})

// Abrir modal mediante evento
window.dispatchEvent(
  new CustomEvent('modal:open', {
    detail: { modalId: 'modal-my-modal-overlay' }
  })
)

// Cerrar modal mediante evento
window.dispatchEvent(
  new CustomEvent('modal:close', {
    detail: { modalId: 'modal-my-modal-overlay' }
  })
)

// Cerrar todos los modales mediante evento
window.dispatchEvent(new CustomEvent('modal:close'))`}
              description='Eventos personalizados para integración avanzada'
              title='Eventos Personalizados'>
              <div className='text-[var(--neutral-400)] text-sm'>Sistema de eventos para control avanzado y callbacks externos</div>
            </CodePreview>
          </div>
        </div>

        {/* Características */}
        <div className='mb-12 p-6 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]'>
          <h2 className='text-2xl font-semibold mb-6 text-[var(--neutral-200)]'>Características Clave</h2>
          <div className='grid md:grid-cols-2 gap-6'>
            <div className='space-y-3 text-sm text-[var(--neutral-400)]'>
              <div className='flex items-start gap-2'>
                <span className='text-green-500'>✅</span>
                <span>
                  <strong className='text-[var(--neutral-300)]'>Accesibilidad:</strong> Focus trap, navegación con teclado, ARIA labels
                </span>
              </div>
              <div className='flex items-start gap-2'>
                <span className='text-green-500'>✅</span>
                <span>
                  <strong className='text-[var(--neutral-300)]'>Múltiples instancias:</strong> Soporta múltiples modales en la misma página
                </span>
              </div>
              <div className='flex items-start gap-2'>
                <span className='text-green-500'>✅</span>
                <span>
                  <strong className='text-[var(--neutral-300)]'>Modales dinámicos:</strong> MutationObserver detecta modales agregados
                  después del DOM load
                </span>
              </div>
              <div className='flex items-start gap-2'>
                <span className='text-green-500'>✅</span>
                <span>
                  <strong className='text-[var(--neutral-300)]'>Responsive:</strong> Tamaños adaptados para móvil, tablet y desktop
                </span>
              </div>
            </div>
            <div className='space-y-3 text-sm text-[var(--neutral-400)]'>
              <div className='flex items-start gap-2'>
                <span className='text-green-500'>✅</span>
                <span>
                  <strong className='text-[var(--neutral-300)]'>Tema oscuro:</strong> Soporte automático para dark mode
                </span>
              </div>
              <div className='flex items-start gap-2'>
                <span className='text-green-500'>✅</span>
                <span>
                  <strong className='text-[var(--neutral-300)]'>Liferay compatible:</strong> Visible en modo edición de Liferay
                </span>
              </div>
              <div className='flex items-start gap-2'>
                <span className='text-green-500'>✅</span>
                <span>
                  <strong className='text-[var(--neutral-300)]'>Performance:</strong> Usa requestIdleCallback para inicialización no
                  bloqueante
                </span>
              </div>
              <div className='flex items-start gap-2'>
                <span className='text-green-500'>✅</span>
                <span>
                  <strong className='text-[var(--neutral-300)]'>Prevención de scroll:</strong> El body no hace scroll cuando hay un modal
                  activo
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mejores prácticas */}
        <div className='mt-16 p-6 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]'>
          <h2 className='text-2xl font-semibold mb-6 text-[var(--neutral-200)]'>Mejores Prácticas</h2>
          <div className='grid md:grid-cols-2 gap-8'>
            <div>
              <h3 className='text-lg font-semibold mb-4 text-[var(--neutral-300)] flex items-center gap-2'>
                <span className='text-green-500'>✅</span>
                Recomendado
              </h3>
              <div className='space-y-3 text-sm text-[var(--neutral-400)]'>
                <div className='flex items-start gap-2'>
                  <span className='text-green-500'>•</span>
                  <span>Usar IDs únicos para cada modal en la página</span>
                </div>
                <div className='flex items-start gap-2'>
                  <span className='text-green-500'>•</span>
                  <span>Mantener el contenido del modal simple y enfocado</span>
                </div>
                <div className='flex items-start gap-2'>
                  <span className='text-green-500'>•</span>
                  <span>Usar callbacks para lógica personalizada al abrir/cerrar</span>
                </div>
                <div className='flex items-start gap-2'>
                  <span className='text-green-500'>•</span>
                  <span>Elegir el tamaño apropiado según el contenido</span>
                </div>
                <div className='flex items-start gap-2'>
                  <span className='text-green-500'>•</span>
                  <span>Permitir cerrar con Escape y click fuera para mejor UX</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className='text-lg font-semibold mb-4 text-[var(--neutral-300)] flex items-center gap-2'>
                <span className='text-red-500'>❌</span>
                Evitar
              </h3>
              <div className='space-y-3 text-sm text-[var(--neutral-400)]'>
                <div className='flex items-start gap-2'>
                  <span className='text-red-500'>•</span>
                  <span>Usar modales para contenido largo (considera una página completa)</span>
                </div>
                <div className='flex items-start gap-2'>
                  <span className='text-red-500'>•</span>
                  <span>Anidar modales dentro de otros modales</span>
                </div>
                <div className='flex items-start gap-2'>
                  <span className='text-red-500'>•</span>
                  <span>Deshabilitar todas las formas de cerrar el modal</span>
                </div>
                <div className='flex items-start gap-2'>
                  <span className='text-red-500'>•</span>
                  <span>Abrir modales automáticamente en cada carga sin razón</span>
                </div>
                <div className='flex items-start gap-2'>
                  <span className='text-red-500'>•</span>
                  <span>Usar IDs duplicados en la misma página</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='mt-16 text-center p-8 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]'>
          <h3 className='text-xl font-semibold mb-4 text-[var(--neutral-200)]'>Más Información</h3>
          <p className='text-[var(--neutral-400)] mb-6 max-w-2xl mx-auto'>
            Para ver más detalles sobre la implementación, revisa el código fuente del componente o consulta el archivo{' '}
            <code className='bg-[var(--neutral-800)] px-2 py-1 rounded'>MODAL_USAGE_EXAMPLES.md</code>
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
