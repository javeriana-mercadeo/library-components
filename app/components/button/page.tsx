'use client'

import { Container, Button } from '@components'
import { useState } from 'react'

import Splash from '@/app/common/splash'

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
        {showCode ? (
          <div className='bg-[var(--neutral-900)] rounded-lg p-4 overflow-x-auto'>
            <pre className='text-sm text-[var(--neutral-300)]'>
              <code>{code}</code>
            </pre>
          </div>
        ) : (
          <div className='space-y-2'>{children}</div>
        )}
      </div>
    </div>
  )
}

/**
 * Componente que muestra las diferentes variantes de un botón por color
 */
const VariantButton = ({ color }: { color: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' }) => {
  return (
    <div className='space-y-6 mt-8 border p-4 rounded-lg bg-[var(--background-100)]'>
      <div>
        <h3 className='text-xl font-bold mb-4 text-[var(--neutral-300)]'>{color}</h3>

        <div className='space-y-6'>
          {/* Variantes de estilo */}
          <CodePreview
            code={`<Button color="${color}" variant="solid">Solid</Button>
<Button color="${color}" variant="faded">Faded</Button>
<Button color="${color}" variant="bordered">Bordered</Button>
<Button color="${color}" variant="light">Light</Button>
<Button color="${color}" variant="flat">Flat</Button>
<Button color="${color}" variant="ghost">Ghost</Button>
<Button color="${color}" variant="shadow">Shadow</Button>`}
            description='Todas las variantes disponibles del sistema'
            title='Variantes de estilo'>
            <div className='flex flex-wrap gap-2'>
              <Button color={color} variant='solid'>
                Solid
              </Button>
              <Button color={color} variant='faded'>
                Faded
              </Button>
              <Button color={color} variant='bordered'>
                Bordered
              </Button>
              <Button color={color} variant='light'>
                Light
              </Button>
              <Button color={color} variant='flat'>
                Flat
              </Button>
              <Button color={color} variant='ghost'>
                Ghost
              </Button>
              <Button color={color} variant='shadow'>
                Shadow
              </Button>
            </div>
          </CodePreview>

          {/* Tamaños */}
          <CodePreview
            code={`<Button color="${color}" size="sm">Pequeño</Button>
<Button color="${color}" size="md">Mediano</Button>
<Button color="${color}" size="lg">Grande</Button>`}
            description='Tres tamaños: sm, md (default), lg'
            title='Tamaños disponibles'>
            <div className='flex flex-wrap items-center gap-2'>
              <Button color={color} size='sm'>
                Pequeño
              </Button>
              <Button color={color} size='md'>
                Mediano
              </Button>
              <Button color={color} size='lg'>
                Grande
              </Button>
            </div>
          </CodePreview>

          {/* Botones con iconos */}
          <CodePreview
            code={`<Button color="${color}" startIcon={<i className="ph ph-plus"></i>}>
  Con ícono inicial
</Button>
<Button color="${color}" endIcon={<i className="ph ph-arrow-right"></i>}>
  Con ícono final
</Button>
<Button color="${color}"
     startIcon={<i className="ph ph-plus"></i>}
     endIcon={<i className="ph ph-arrow-right"></i>}>
  Con ambos íconos
</Button>`}
            description='Iconos al inicio, final o ambos'
            title='Botones con iconos'>
            <div className='flex flex-wrap gap-2'>
              <Button color={color} startIcon={<i className='ph ph-plus' />}>
                Con ícono inicial
              </Button>
              <Button color={color} endIcon={<i className='ph ph-arrow-right' />}>
                Con ícono final
              </Button>
              <Button color={color} endIcon={<i className='ph ph-arrow-right' />} startIcon={<i className='ph ph-plus' />}>
                Con ambos íconos
              </Button>
            </div>
          </CodePreview>

          {/* NUEVA SECCIÓN: Botones solo icono */}
          <CodePreview
            code={`// Tamaños disponibles para iconOnly
<Button color="${color}"
     startIcon={<i className="ph ph-heart"></i>}
     iconOnly
     size="sm">
  Me gusta
</Button>
<Button color="${color}"
     startIcon={<i className="ph ph-heart"></i>}
     iconOnly
     size="md">
  Me gusta
</Button>
<Button color="${color}"
     startIcon={<i className="ph ph-heart"></i>}
     iconOnly
     size="lg">
  Me gusta
</Button>

// Con diferentes variantes
<Button color="${color}"
     startIcon={<i className="ph ph-settings"></i>}
     iconOnly
     variant="bordered">
  Configuración
</Button>
<Button color="${color}"
     startIcon={<i className="ph ph-settings"></i>}
     iconOnly
     variant="light">
  Configuración
</Button>`}
            description='Proporciones cuadradas, solo muestra el icono'
            title='Botones solo icono (NUEVO)'>
            <div className='space-y-3'>
              <div className='flex items-center gap-2'>
                <span className='text-xs text-[var(--neutral-500)] w-16'>Tamaños:</span>
                <Button iconOnly color={color} size='sm' startIcon={<i className='ph ph-heart' />}>
                  Me gusta
                </Button>
                <Button iconOnly color={color} size='md' startIcon={<i className='ph ph-heart' />}>
                  Me gusta
                </Button>
                <Button iconOnly color={color} size='lg' startIcon={<i className='ph ph-heart' />}>
                  Me gusta
                </Button>
              </div>
              <div className='flex items-center gap-2'>
                <span className='text-xs text-[var(--neutral-500)] w-16'>Variantes:</span>
                <Button iconOnly color={color} startIcon={<i className='ph ph-settings' />} variant='solid'>
                  Configuración
                </Button>
                <Button iconOnly color={color} startIcon={<i className='ph ph-settings' />} variant='bordered'>
                  Configuración
                </Button>
                <Button iconOnly color={color} startIcon={<i className='ph ph-settings' />} variant='light'>
                  Configuración
                </Button>
                <Button iconOnly color={color} startIcon={<i className='ph ph-settings' />} variant='flat'>
                  Configuración
                </Button>
              </div>
            </div>
          </CodePreview>

          {/* Estados deshabilitados */}
          <CodePreview
            code={`<Button color="${color}" variant="solid" disabled>
  Solid deshabilitado
</Button>
<Button color="${color}" variant="bordered" disabled>
  Bordered deshabilitado
</Button>
<Button color="${color}"
     startIcon={<i className="ph ph-heart"></i>}
     iconOnly
     disabled>
  Solo icono deshabilitado
</Button>`}
            description='Botones en estado disabled'
            title='Estados deshabilitados'>
            <div className='flex flex-wrap gap-2'>
              <Button disabled color={color} variant='solid'>
                Solid deshabilitado
              </Button>
              <Button disabled color={color} variant='bordered'>
                Bordered deshabilitado
              </Button>
              <Button disabled iconOnly color={color} startIcon={<i className='ph ph-heart' />}>
                Solo icono deshabilitado
              </Button>
            </div>
          </CodePreview>

          {/* Ancho completo */}
          <CodePreview
            code={`<Button color="${color}" variant="solid" fullWidth>
  Botón Solid de ancho completo
</Button>
<Button color="${color}"
     variant="bordered"
     fullWidth
     startIcon={<i className="ph ph-crown"></i>}>
  Botón Bordered de ancho completo con icono
</Button>`}
            description='Botones que ocupan todo el ancho disponible'
            title='Ancho completo'>
            <div className='space-y-2'>
              <Button fullWidth color={color} variant='solid'>
                Botón Solid de ancho completo
              </Button>
              <Button fullWidth color={color} startIcon={<i className='ph ph-crown' />} variant='bordered'>
                Botón Bordered de ancho completo con icono
              </Button>
            </div>
          </CodePreview>
        </div>
      </div>
    </div>
  )
}

const variantColorsButton: Array<'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger'> = [
  'primary',
  'secondary',
  'tertiary',
  'success',
  'warning',
  'danger'
]

export default function ButtonShowcase() {
  return (
    <>
      <Splash />
      <Container className='' id='button-showcase-container'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold mb-4 text-[var(--neutral-200)]'>Biblioteca de Botones</h1>
          <p className='text-lg text-[var(--neutral-400)] max-w-2xl mx-auto'>
            Explora todas las variantes de botones disponibles con diferentes colores, tamaños y efectos. Compatible con el sistema de temas
            y todas las variantes de HeroUI.
            <span className='text-[var(--primary-500)] font-semibold'>¡Ahora con soporte para botones solo icono!</span>
          </p>
        </div>

        {/* Showcase principal con nueva funcionalidad */}
        <div className='mb-12 p-6 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]'>
          <h2 className='text-2xl font-semibold mb-6 text-[var(--neutral-200)]'>🎨 Variantes principales (Primary)</h2>
          <div className='grid gap-6'>
            {/* Botones normales */}
            <CodePreview
              code={`<Button color="primary" variant="solid">Solid</Button>
<Button color="primary" variant="faded">Faded</Button>
<Button color="primary" variant="bordered">Bordered</Button>
<Button color="primary" variant="light">Light</Button>
<Button color="primary" variant="flat">Flat</Button>
<Button color="primary" variant="ghost">Ghost</Button>
<Button color="primary" variant="shadow">Shadow</Button>`}
              description='Las 7 variantes principales del sistema de diseño'
              title='Variantes de estilo tradicionales'>
              <div className='flex flex-wrap gap-3 justify-center'>
                <Button color='primary' variant='solid'>
                  Solid
                </Button>
                <Button color='primary' variant='faded'>
                  Faded
                </Button>
                <Button color='primary' variant='bordered'>
                  Bordered
                </Button>
                <Button color='primary' variant='light'>
                  Light
                </Button>
                <Button color='primary' variant='flat'>
                  Flat
                </Button>
                <Button color='primary' variant='ghost'>
                  Ghost
                </Button>
                <Button color='primary' variant='shadow'>
                  Shadow
                </Button>
              </div>
            </CodePreview>

            {/* NUEVA SECCIÓN: Demostración de iconOnly */}
            <CodePreview
              code={`// Todas las variantes con iconOnly
<Button color="primary" variant="solid" iconOnly startIcon={<i className="ph ph-star"></i>}>Favorito</Button>
<Button color="primary" variant="faded" iconOnly startIcon={<i className="ph ph-star"></i>}>Favorito</Button>
<Button color="primary" variant="bordered" iconOnly startIcon={<i className="ph ph-star"></i>}>Favorito</Button>
<Button color="primary" variant="light" iconOnly startIcon={<i className="ph ph-star"></i>}>Favorito</Button>
<Button color="primary" variant="flat" iconOnly startIcon={<i className="ph ph-star"></i>}>Favorito</Button>
<Button color="primary" variant="ghost" iconOnly startIcon={<i className="ph ph-star"></i>}>Favorito</Button>
<Button color="primary" variant="shadow" iconOnly startIcon={<i className="ph ph-star"></i>}>Favorito</Button>

// Diferentes tamaños
<Button color="primary" iconOnly size="sm" startIcon={<i className="ph ph-plus"></i>}>Agregar</Button>
<Button color="primary" iconOnly size="md" startIcon={<i className="ph ph-plus"></i>}>Agregar</Button>
<Button color="primary" iconOnly size="lg" startIcon={<i className="ph ph-plus"></i>}>Agregar</Button>`}
              description='Nueva funcionalidad: botones con proporciones cuadradas que muestran solo el icono'
              title='🆕 Botones solo icono - Todas las variantes'>
              <div className='space-y-4'>
                <div className='flex flex-wrap gap-3 justify-center'>
                  <Button iconOnly color='primary' startIcon={<i className='ph ph-star' />} variant='solid'>
                    Favorito
                  </Button>
                  <Button iconOnly color='primary' startIcon={<i className='ph ph-star' />} variant='faded'>
                    Favorito
                  </Button>
                  <Button iconOnly color='primary' startIcon={<i className='ph ph-star' />} variant='bordered'>
                    Favorito
                  </Button>
                  <Button iconOnly color='primary' startIcon={<i className='ph ph-star' />} variant='light'>
                    Favorito
                  </Button>
                  <Button iconOnly color='primary' startIcon={<i className='ph ph-star' />} variant='flat'>
                    Favorito
                  </Button>
                  <Button iconOnly color='primary' startIcon={<i className='ph ph-star' />} variant='ghost'>
                    Favorito
                  </Button>
                  <Button iconOnly color='primary' startIcon={<i className='ph ph-star' />} variant='shadow'>
                    Favorito
                  </Button>
                </div>
                <div className='flex items-center justify-center gap-2'>
                  <span className='text-xs text-[var(--neutral-500)]'>Tamaños:</span>
                  <Button iconOnly color='primary' size='sm' startIcon={<i className='ph ph-plus' />}>
                    Agregar
                  </Button>
                  <Button iconOnly color='primary' size='md' startIcon={<i className='ph ph-plus' />}>
                    Agregar
                  </Button>
                  <Button iconOnly color='primary' size='lg' startIcon={<i className='ph ph-plus' />}>
                    Agregar
                  </Button>
                </div>
              </div>
            </CodePreview>
          </div>
        </div>

        {/* Casos de uso específicos para iconOnly */}
        <div className='mb-12 p-6 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]'>
          <h2 className='text-2xl font-semibold mb-6 text-[var(--neutral-200)]'>🎯 Casos de uso - Botones solo icono</h2>
          <div className='grid md:grid-cols-2 gap-6'>
            <CodePreview
              code={`<div className="flex gap-2 p-3 bg-gray-100 rounded-lg">
  <Button iconOnly variant="light" color="primary"
       startIcon={<i className="ph ph-pencil"></i>}>
    Editar
  </Button>
  <Button iconOnly variant="light" color="danger"
       startIcon={<i className="ph ph-trash"></i>}>
    Eliminar
  </Button>
  <Button iconOnly variant="light" color="secondary"
       startIcon={<i className="ph ph-download"></i>}>
    Descargar
  </Button>
  <Button iconOnly variant="light" color="tertiary"
       startIcon={<i className="ph ph-share"></i>}>
    Compartir
  </Button>
</div>`}
              description='Perfectos para barras de herramientas y acciones rápidas'
              title='Barra de herramientas'>
              <div className='flex gap-2 p-3 bg-[var(--neutral-800)] rounded-lg'>
                <Button iconOnly color='primary' startIcon={<i className='ph ph-pencil' />} variant='light'>
                  Editar
                </Button>
                <Button iconOnly color='danger' startIcon={<i className='ph ph-trash' />} variant='light'>
                  Eliminar
                </Button>
                <Button iconOnly color='secondary' startIcon={<i className='ph ph-download' />} variant='light'>
                  Descargar
                </Button>
                <Button iconOnly color='tertiary' startIcon={<i className='ph ph-share' />} variant='light'>
                  Compartir
                </Button>
              </div>
            </CodePreview>

            <CodePreview
              code={`<div className="relative h-32 bg-gray-100 rounded-lg">
  <div className="absolute bottom-4 right-4">
    <Button iconOnly
         variant="shadow"
         color="primary"
         size="lg"
         startIcon={<i className="ph ph-plus"></i>}>
      Agregar elemento
    </Button>
  </div>
</div>`}
              description='Ideal para acciones principales flotantes'
              title='Botón flotante (FAB)'>
              <div className='relative h-32 bg-[var(--neutral-800)] rounded-lg'>
                <div className='absolute bottom-4 right-4'>
                  <Button iconOnly color='primary' size='lg' startIcon={<i className='ph ph-plus' />} variant='shadow'>
                    Agregar elemento
                  </Button>
                </div>
              </div>
            </CodePreview>
          </div>
        </div>

        {/* Botones por color */}
        <h2 className='text-3xl font-bold mb-8 text-[var(--neutral-200)]'>🌈 Variantes por color</h2>
        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
          {variantColorsButton.map((color, index) => (
            <VariantButton key={index} color={color} />
          ))}
        </div>

        {/* Casos de uso recomendados */}
        <div className='mt-16 p-6 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]'>
          <h2 className='text-2xl font-semibold mb-6 text-[var(--neutral-200)]'>💡 Casos de uso recomendados</h2>
          <div className='grid md:grid-cols-2 gap-6'>
            <CodePreview
              code={`<Button variant="solid" color="primary" fullWidth>
  Crear cuenta
</Button>
<Button variant="shadow" color="success" fullWidth>
  Confirmar pedido
</Button>`}
              description='Para las acciones más importantes de la interfaz'
              title='Acciones principales'>
              <div className='space-y-2'>
                <Button fullWidth color='primary' variant='solid'>
                  Crear cuenta
                </Button>
                <Button fullWidth color='success' variant='shadow'>
                  Confirmar pedido
                </Button>
              </div>
            </CodePreview>

            <CodePreview
              code={`<Button variant="bordered" color="secondary" fullWidth>
  Ver detalles
</Button>
<Button variant="ghost" color="tertiary" fullWidth>
  Cancelar
</Button>`}
              description='Para acciones menos prominentes pero importantes'
              title='Acciones secundarias'>
              <div className='space-y-2'>
                <Button fullWidth color='secondary' variant='bordered'>
                  Ver detalles
                </Button>
                <Button fullWidth color='tertiary' variant='ghost'>
                  Cancelar
                </Button>
              </div>
            </CodePreview>
          </div>
        </div>

        {/* Mejores prácticas actualizadas */}
        <div className='mt-16 p-6 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]'>
          <h2 className='text-2xl font-semibold mb-6 text-[var(--neutral-200)]'>📋 Mejores prácticas</h2>
          <div className='grid md:grid-cols-2 gap-8'>
            <div>
              <h3 className='text-lg font-semibold mb-4 text-[var(--neutral-300)] flex items-center gap-2'>
                <span className='text-green-500'>✅</span>
                Recomendado
              </h3>
              <div className='space-y-3 text-sm text-[var(--neutral-400)]'>
                <div className='flex items-start gap-2'>
                  <span className='text-green-500'>•</span>
                  <span>
                    Usa <code className='bg-[var(--neutral-800)] px-1 rounded'>variant=&quot;solid&quot;</code> para acciones principales
                  </span>
                </div>
                <div className='flex items-start gap-2'>
                  <span className='text-green-500'>•</span>
                  <span>
                    Aplica <code className='bg-[var(--neutral-800)] px-1 rounded'>variant=&quot;bordered&quot;</code> para acciones
                    secundarias
                  </span>
                </div>
                <div className='flex items-start gap-2'>
                  <span className='text-green-500'>•</span>
                  <span>
                    Usa <code className='bg-[var(--neutral-800)] px-1 rounded'>iconOnly</code> para barras de herramientas y acciones
                    rápidas
                  </span>
                </div>
                <div className='flex items-start gap-2'>
                  <span className='text-green-500'>•</span>
                  <span>
                    Mantén el texto descriptivo en <code className='bg-[var(--neutral-800)] px-1 rounded'>children</code> para
                    accesibilidad, incluso con <code className='bg-[var(--neutral-800)] px-1 rounded'>iconOnly</code>
                  </span>
                </div>
                <div className='flex items-start gap-2'>
                  <span className='text-green-500'>•</span>
                  <span>
                    Usa colores semánticos: <code className='bg-[var(--neutral-800)] px-1 rounded'>success</code>,{' '}
                    <code className='bg-[var(--neutral-800)] px-1 rounded'>warning</code>,{' '}
                    <code className='bg-[var(--neutral-800)] px-1 rounded'>danger</code>
                  </span>
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
                  <span>
                    Usar múltiples botones <code className='bg-[var(--neutral-800)] px-1 rounded'>shadow</code> en la misma vista
                  </span>
                </div>
                <div className='flex items-start gap-2'>
                  <span className='text-red-500'>•</span>
                  <span>
                    Usar <code className='bg-[var(--neutral-800)] px-1 rounded'>iconOnly</code> sin proporcionar un icono
                  </span>
                </div>
                <div className='flex items-start gap-2'>
                  <span className='text-red-500'>•</span>
                  <span>Mezclar demasiadas variantes en un solo contenedor</span>
                </div>
                <div className='flex items-start gap-2'>
                  <span className='text-red-500'>•</span>
                  <span>Usar colores sin significado semántico claro</span>
                </div>
                <div className='flex items-start gap-2'>
                  <span className='text-red-500'>•</span>
                  <span>Botones muy pequeños para acciones importantes</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Documentación completa de la API */}
        <div className='mt-16 p-6 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]'>
          <h2 className='text-2xl font-semibold mb-6 text-[var(--neutral-200)]'>📚 Documentación de API</h2>

          <CodePreview
            code={`interface BtnProps {
  // Contenido y identificación
  children: React.ReactNode        // Texto del botón (necesario para accesibilidad)
  id?: string                      // ID único del elemento
  elementId?: string               // ID específico para JavaScript
  className?: string               // Clases CSS adicionales

  // Navegación
  href?: string                    // Convierte en enlace <a>
  target?: '_blank' | '_self' | '_parent' | '_top'

  // Apariencia
  color?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger'
  variant?: 'solid' | 'faded' | 'bordered' | 'light' | 'flat' | 'ghost' | 'shadow'
  size?: 'sm' | 'md' | 'lg'

  // Iconos
  startIcon?: React.ReactNode      // Icono al inicio
  endIcon?: React.ReactNode        // Icono al final
  iconOnly?: boolean               // 🆕 Solo mostrar icono (proporciones cuadradas)

  // Comportamiento
  onClick?: (event: MouseEvent) => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'

  // Layout
  fullWidth?: boolean              // Ocupa todo el ancho (ignorado con iconOnly)
  radius?: number                  // Radio personalizado en px

  // Liferay
  isEditable?: boolean             // Para entorno de edición (default: true)
}`}
            description='Todas las props disponibles con sus tipos y descripciones'
            title='Interface completa del componente'>
            <div className='text-[var(--neutral-400)] text-sm'>Ver el código completo de la interface del componente</div>
          </CodePreview>

          <div className='mt-6 grid md:grid-cols-2 gap-6'>
            <CodePreview
              code={`// Botón básico
<Button color="primary" variant="solid">
  Mi botón
</Button>

// Botón con icono
<Button color="success"
     variant="shadow"
     startIcon={<i className="ph ph-check"></i>}>
  Confirmar
</Button>

// Botón solo icono (NUEVO)
<Button color="primary"
     iconOnly
     startIcon={<i className="ph ph-heart"></i>}>
  Me gusta
</Button>

// Botón como enlace
<Button href="/dashboard"
     target="_blank"
     color="primary"
     variant="bordered">
  Ir al dashboard
</Button>`}
              description='Los casos más comunes de implementación'
              title='Ejemplos de uso básico'>
              <div className='space-y-2'>
                <Button color='primary' variant='solid'>
                  Mi botón
                </Button>
                <Button color='success' startIcon={<i className='ph ph-check' />} variant='shadow'>
                  Confirmar
                </Button>
                <Button iconOnly color='primary' startIcon={<i className='ph ph-heart' />}>
                  Me gusta
                </Button>
              </div>
            </CodePreview>

            <CodePreview
              code={`// Botón con estado y onClick
<Button color="danger"
     variant="ghost"
     onClick={() => handleDelete()}
     disabled={isLoading}
     endIcon={<i className="ph ph-trash"></i>}>
  {isLoading ? 'Eliminando...' : 'Eliminar'}
</Button>

// Botón con radio personalizado
<Button color="secondary"
     variant="faded"
     radius={20}
     startIcon={<i className="ph ph-settings"></i>}>
  Configuración
</Button>

// Formulario con botones
<form onSubmit={handleSubmit}>
  <div className="flex gap-2 justify-end">
    <Button type="button"
         variant="light"
         color="secondary"
         onClick={() => handleCancel()}>
      Cancelar
    </Button>
    <Button type="submit"
         variant="solid"
         color="primary"
         disabled={!isValid}
         startIcon={<i className="ph ph-floppy-disk"></i>}>
      Guardar cambios
    </Button>
  </div>
</form>

// Botón FAB con iconOnly
<Button iconOnly
     variant="shadow"
     color="primary"
     size="lg"
     startIcon={<i className="ph ph-plus"></i>}>
  Agregar elemento
</Button>`}
              description='Implementaciones más complejas con estado y lógica'
              title='Casos de uso avanzados'>
              <div className='space-y-2'>
                <div className='text-xs text-[var(--neutral-500)]'>Ver ejemplos de implementación con lógica de estado</div>
              </div>
            </CodePreview>
          </div>

          <div className='mt-6'>
            <CodePreview
              code={`// Barra de herramientas completa
<div className="flex gap-1 p-2 bg-gray-100 rounded-lg">
  <Button iconOnly variant="light" color="primary"
       startIcon={<i className="ph ph-bold"></i>}>
    Negrita
  </Button>
  <Button iconOnly variant="light" color="primary"
       startIcon={<i className="ph ph-italic"></i>}>
    Cursiva
  </Button>
  <Button iconOnly variant="light" color="primary"
       startIcon={<i className="ph ph-underline"></i>}>
    Subrayado
  </Button>
  <div className="w-px bg-gray-300 mx-1"></div>
  <Button iconOnly variant="light" color="secondary"
       startIcon={<i className="ph ph-align-left"></i>}>
    Alinear izquierda
  </Button>
  <Button iconOnly variant="light" color="secondary"
       startIcon={<i className="ph ph-align-center"></i>}>
    Centrar
  </Button>
  <Button iconOnly variant="light" color="secondary"
       startIcon={<i className="ph ph-align-right"></i>}>
    Alinear derecha
  </Button>
</div>

// Acciones de tabla/lista
<div className="flex gap-1">
  <Button iconOnly size="sm" variant="light" color="primary"
       startIcon={<i className="ph ph-eye"></i>}>
    Ver detalles
  </Button>
  <Button iconOnly size="sm" variant="light" color="warning"
       startIcon={<i className="ph ph-pencil"></i>}>
    Editar
  </Button>
  <Button iconOnly size="sm" variant="light" color="danger"
       startIcon={<i className="ph ph-trash"></i>}>
    Eliminar
  </Button>
</div>

// Estados con iconOnly
<Button iconOnly variant="flat" color="success"
     startIcon={<i className="ph ph-check-circle"></i>}
     disabled>
  Completado
</Button>

// Navegación
<div className="flex gap-2">
  <Button iconOnly variant="bordered" color="secondary"
       startIcon={<i className="ph ph-arrow-left"></i>}>
    Anterior
  </Button>
  <Button iconOnly variant="bordered" color="secondary"
       startIcon={<i className="ph ph-arrow-right"></i>}>
    Siguiente
  </Button>
</div>`}
              description='Nuevos patrones de uso con la funcionalidad iconOnly'
              title='Casos específicos con iconOnly'>
              <div className='space-y-4'>
                <div>
                  <p className='text-xs text-[var(--neutral-500)] mb-2'>Barra de herramientas de texto:</p>
                  <div className='flex gap-1 p-2 bg-[var(--neutral-800)] rounded-lg w-fit'>
                    <Button iconOnly color='primary' startIcon={<i className='ph ph-text-b' />} variant='light'>
                      Negrita
                    </Button>
                    <Button iconOnly color='primary' startIcon={<i className='ph ph-text-italic' />} variant='light'>
                      Cursiva
                    </Button>
                    <Button iconOnly color='primary' startIcon={<i className='ph ph-text-underline' />} variant='light'>
                      Subrayado
                    </Button>
                    <div className='w-px bg-[var(--neutral-600)] mx-1' />
                    <Button iconOnly color='secondary' startIcon={<i className='ph ph-text-align-left' />} variant='light'>
                      Alinear izquierda
                    </Button>
                    <Button iconOnly color='secondary' startIcon={<i className='ph ph-text-align-center' />} variant='light'>
                      Centrar
                    </Button>
                    <Button iconOnly color='secondary' startIcon={<i className='ph ph-text-align-right' />} variant='light'>
                      Alinear derecha
                    </Button>
                  </div>
                </div>
                <div>
                  <p className='text-xs text-[var(--neutral-500)] mb-2'>Acciones de fila:</p>
                  <div className='flex gap-1'>
                    <Button iconOnly color='primary' size='sm' startIcon={<i className='ph ph-eye' />} variant='light'>
                      Ver detalles
                    </Button>
                    <Button iconOnly color='warning' size='sm' startIcon={<i className='ph ph-pencil' />} variant='light'>
                      Editar
                    </Button>
                    <Button iconOnly color='danger' size='sm' startIcon={<i className='ph ph-trash' />} variant='light'>
                      Eliminar
                    </Button>
                  </div>
                </div>
              </div>
            </CodePreview>
          </div>
        </div>

        {/* Notas importantes sobre iconOnly */}
        <div className='mt-16 p-6 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-xl'>
          <h2 className='text-2xl font-semibold mb-6 text-blue-900 dark:text-blue-100'>🆕 Notas sobre la funcionalidad iconOnly</h2>
          <div className='grid md:grid-cols-2 gap-6'>
            <div>
              <h3 className='text-lg font-semibold mb-3 text-blue-800 dark:text-blue-200'>✨ Características</h3>
              <ul className='space-y-2 text-sm text-blue-700 dark:text-blue-300'>
                <li>
                  • <strong>Proporciones cuadradas:</strong> Ancho = Alto automáticamente
                </li>
                <li>
                  • <strong>Tamaños específicos:</strong> 32x32px (sm), 40x40px (md), 48x48px (lg)
                </li>
                <li>
                  • <strong>Compatible con todas las variantes:</strong> solid, bordered, light, etc.
                </li>
                <li>
                  • <strong>Accesibilidad mantenida:</strong> El texto sigue disponible para screen readers
                </li>
                <li>
                  • <strong>Efecto ripple conservado:</strong> Interacciones visuales intactas
                </li>
              </ul>
            </div>
            <div>
              <h3 className='text-lg font-semibold mb-3 text-blue-800 dark:text-blue-200'>⚠️ Consideraciones</h3>
              <ul className='space-y-2 text-sm text-blue-700 dark:text-blue-300'>
                <li>
                  • <strong>Requiere icono:</strong> Debe proporcionarse startIcon o endIcon
                </li>
                <li>
                  • <strong>fullWidth ignorado:</strong> Mantiene proporciones cuadradas
                </li>
                <li>
                  • <strong>Texto oculto visualmente:</strong> Pero presente para lectores de pantalla
                </li>
                <li>
                  • <strong>Prioridad de icono:</strong> Se usa startIcon si ambos están presentes
                </li>
                <li>
                  • <strong>Padding eliminado:</strong> Para optimizar el espacio del icono
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer con información adicional */}
        <div className='mt-16 text-center p-8 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]'>
          <h3 className='text-xl font-semibold mb-4 text-[var(--neutral-200)]'>🚀 ¿Necesitas más funcionalidades?</h3>
          <p className='text-[var(--neutral-400)] mb-6 max-w-2xl mx-auto'>
            Este componente de botón está diseñado para ser flexible y extensible. Si necesitas nuevas variantes, tamaños o funcionalidades,
            puedes extender fácilmente los estilos SCSS y las props del componente.
          </p>
          <div className='flex flex-wrap gap-3 justify-center'>
            <Button color='primary' startIcon={<i className='ph ph-book' />} variant='solid'>
              Ver documentación
            </Button>
            <Button color='secondary' startIcon={<i className='ph ph-github-logo' />} variant='bordered'>
              Ver en GitHub
            </Button>
            <Button color='tertiary' startIcon={<i className='ph ph-question' />} variant='light'>
              Preguntas frecuentes
            </Button>
          </div>
        </div>
      </Container>
    </>
  )
}
