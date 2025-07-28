'use client'

import Container from '@library/components/container'
import ViewComponent from '@/app/_components/viewComponent/viewComponent'
import Splash from '@/app/_library/components/splash'
import Btn from '@library/components/contain/btn'
import { useState } from 'react'

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
    <div className="border border-[var(--neutral-800)] rounded-lg bg-[var(--background-100)] overflow-hidden">
      <div className="flex items-center justify-between p-4 bg-[var(--background-200)] border-b border-[var(--neutral-800)]">
        <div>
          <h4 className="text-sm font-semibold text-[var(--neutral-200)]">{title}</h4>
          {description && <p className="text-xs text-[var(--neutral-500)] mt-1">{description}</p>}
        </div>
        <button
          onClick={() => setShowCode(!showCode)}
          className="text-xs px-3 py-1 bg-[var(--neutral-800)] text-[var(--neutral-300)] rounded hover:bg-[var(--neutral-700)] transition-colors">
          {showCode ? 'Ver resultado' : 'Ver código'}
        </button>
      </div>

      <div className="p-4">
        {showCode ? (
          <div className="bg-[var(--neutral-900)] rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-[var(--neutral-300)]">
              <code>{code}</code>
            </pre>
          </div>
        ) : (
          <div className="space-y-2">{children}</div>
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
    <div className="space-y-6 mt-8 border p-4 rounded-lg bg-[var(--background-100)]">
      <div>
        <h3 className="text-xl font-bold mb-4 text-[var(--neutral-300)]">{color}</h3>

        <div className="space-y-6">
          {/* Variantes de estilo */}
          <CodePreview
            title="Variantes de estilo"
            description="Todas las variantes disponibles del sistema"
            code={`<Btn color="${color}" variant="solid">Solid</Btn>
<Btn color="${color}" variant="faded">Faded</Btn>
<Btn color="${color}" variant="bordered">Bordered</Btn>
<Btn color="${color}" variant="light">Light</Btn>
<Btn color="${color}" variant="flat">Flat</Btn>
<Btn color="${color}" variant="ghost">Ghost</Btn>
<Btn color="${color}" variant="shadow">Shadow</Btn>`}>
            <div className="flex flex-wrap gap-2">
              <Btn color={color} variant="solid">
                Solid
              </Btn>
              <Btn color={color} variant="faded">
                Faded
              </Btn>
              <Btn color={color} variant="bordered">
                Bordered
              </Btn>
              <Btn color={color} variant="light">
                Light
              </Btn>
              <Btn color={color} variant="flat">
                Flat
              </Btn>
              <Btn color={color} variant="ghost">
                Ghost
              </Btn>
              <Btn color={color} variant="shadow">
                Shadow
              </Btn>
            </div>
          </CodePreview>

          {/* Tamaños */}
          <CodePreview
            title="Tamaños disponibles"
            description="Tres tamaños: sm, md (default), lg"
            code={`<Btn color="${color}" size="sm">Pequeño</Btn>
<Btn color="${color}" size="md">Mediano</Btn>
<Btn color="${color}" size="lg">Grande</Btn>`}>
            <div className="flex flex-wrap items-center gap-2">
              <Btn color={color} size="sm">
                Pequeño
              </Btn>
              <Btn color={color} size="md">
                Mediano
              </Btn>
              <Btn color={color} size="lg">
                Grande
              </Btn>
            </div>
          </CodePreview>

          {/* Botones con iconos */}
          <CodePreview
            title="Botones con iconos"
            description="Iconos al inicio, final o ambos"
            code={`<Btn color="${color}" startIcon={<i className="ph ph-plus"></i>}>
  Con ícono inicial
</Btn>
<Btn color="${color}" endIcon={<i className="ph ph-arrow-right"></i>}>
  Con ícono final
</Btn>
<Btn color="${color}"
     startIcon={<i className="ph ph-plus"></i>}
     endIcon={<i className="ph ph-arrow-right"></i>}>
  Con ambos íconos
</Btn>`}>
            <div className="flex flex-wrap gap-2">
              <Btn color={color} startIcon={<i className="ph ph-plus"></i>}>
                Con ícono inicial
              </Btn>
              <Btn color={color} endIcon={<i className="ph ph-arrow-right"></i>}>
                Con ícono final
              </Btn>
              <Btn color={color} startIcon={<i className="ph ph-plus"></i>} endIcon={<i className="ph ph-arrow-right"></i>}>
                Con ambos íconos
              </Btn>
            </div>
          </CodePreview>

          {/* NUEVA SECCIÓN: Botones solo icono */}
          <CodePreview
            title="Botones solo icono (NUEVO)"
            description="Proporciones cuadradas, solo muestra el icono"
            code={`// Tamaños disponibles para iconOnly
<Btn color="${color}"
     startIcon={<i className="ph ph-heart"></i>}
     iconOnly
     size="sm">
  Me gusta
</Btn>
<Btn color="${color}"
     startIcon={<i className="ph ph-heart"></i>}
     iconOnly
     size="md">
  Me gusta
</Btn>
<Btn color="${color}"
     startIcon={<i className="ph ph-heart"></i>}
     iconOnly
     size="lg">
  Me gusta
</Btn>

// Con diferentes variantes
<Btn color="${color}"
     startIcon={<i className="ph ph-settings"></i>}
     iconOnly
     variant="bordered">
  Configuración
</Btn>
<Btn color="${color}"
     startIcon={<i className="ph ph-settings"></i>}
     iconOnly
     variant="light">
  Configuración
</Btn>`}>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[var(--neutral-500)] w-16">Tamaños:</span>
                <Btn color={color} startIcon={<i className="ph ph-heart"></i>} iconOnly size="sm">
                  Me gusta
                </Btn>
                <Btn color={color} startIcon={<i className="ph ph-heart"></i>} iconOnly size="md">
                  Me gusta
                </Btn>
                <Btn color={color} startIcon={<i className="ph ph-heart"></i>} iconOnly size="lg">
                  Me gusta
                </Btn>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[var(--neutral-500)] w-16">Variantes:</span>
                <Btn color={color} startIcon={<i className="ph ph-settings"></i>} iconOnly variant="solid">
                  Configuración
                </Btn>
                <Btn color={color} startIcon={<i className="ph ph-settings"></i>} iconOnly variant="bordered">
                  Configuración
                </Btn>
                <Btn color={color} startIcon={<i className="ph ph-settings"></i>} iconOnly variant="light">
                  Configuración
                </Btn>
                <Btn color={color} startIcon={<i className="ph ph-settings"></i>} iconOnly variant="flat">
                  Configuración
                </Btn>
              </div>
            </div>
          </CodePreview>

          {/* Estados deshabilitados */}
          <CodePreview
            title="Estados deshabilitados"
            description="Botones en estado disabled"
            code={`<Btn color="${color}" variant="solid" disabled>
  Solid deshabilitado
</Btn>
<Btn color="${color}" variant="bordered" disabled>
  Bordered deshabilitado
</Btn>
<Btn color="${color}"
     startIcon={<i className="ph ph-heart"></i>}
     iconOnly
     disabled>
  Solo icono deshabilitado
</Btn>`}>
            <div className="flex flex-wrap gap-2">
              <Btn color={color} variant="solid" disabled>
                Solid deshabilitado
              </Btn>
              <Btn color={color} variant="bordered" disabled>
                Bordered deshabilitado
              </Btn>
              <Btn color={color} startIcon={<i className="ph ph-heart"></i>} iconOnly disabled>
                Solo icono deshabilitado
              </Btn>
            </div>
          </CodePreview>

          {/* Ancho completo */}
          <CodePreview
            title="Ancho completo"
            description="Botones que ocupan todo el ancho disponible"
            code={`<Btn color="${color}" variant="solid" fullWidth>
  Botón Solid de ancho completo
</Btn>
<Btn color="${color}"
     variant="bordered"
     fullWidth
     startIcon={<i className="ph ph-crown"></i>}>
  Botón Bordered de ancho completo con icono
</Btn>`}>
            <div className="space-y-2">
              <Btn color={color} variant="solid" fullWidth>
                Botón Solid de ancho completo
              </Btn>
              <Btn color={color} variant="bordered" fullWidth startIcon={<i className="ph ph-crown"></i>}>
                Botón Bordered de ancho completo con icono
              </Btn>
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
      <Container>
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-[var(--neutral-200)]">Biblioteca de Botones</h1>
          <p className="text-lg text-[var(--neutral-400)] max-w-2xl mx-auto">
            Explora todas las variantes de botones disponibles con diferentes colores, tamaños y efectos. Compatible con el sistema de temas
            y todas las variantes de HeroUI.
            <span className="text-[var(--primary-500)] font-semibold">¡Ahora con soporte para botones solo icono!</span>
          </p>
        </div>

        {/* Showcase principal con nueva funcionalidad */}
        <div className="mb-12 p-6 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]">
          <h2 className="text-2xl font-semibold mb-6 text-[var(--neutral-200)]">🎨 Variantes principales (Primary)</h2>
          <div className="grid gap-6">
            {/* Botones normales */}
            <CodePreview
              title="Variantes de estilo tradicionales"
              description="Las 7 variantes principales del sistema de diseño"
              code={`<Btn color="primary" variant="solid">Solid</Btn>
<Btn color="primary" variant="faded">Faded</Btn>
<Btn color="primary" variant="bordered">Bordered</Btn>
<Btn color="primary" variant="light">Light</Btn>
<Btn color="primary" variant="flat">Flat</Btn>
<Btn color="primary" variant="ghost">Ghost</Btn>
<Btn color="primary" variant="shadow">Shadow</Btn>`}>
              <div className="flex flex-wrap gap-3 justify-center">
                <Btn color="primary" variant="solid">
                  Solid
                </Btn>
                <Btn color="primary" variant="faded">
                  Faded
                </Btn>
                <Btn color="primary" variant="bordered">
                  Bordered
                </Btn>
                <Btn color="primary" variant="light">
                  Light
                </Btn>
                <Btn color="primary" variant="flat">
                  Flat
                </Btn>
                <Btn color="primary" variant="ghost">
                  Ghost
                </Btn>
                <Btn color="primary" variant="shadow">
                  Shadow
                </Btn>
              </div>
            </CodePreview>

            {/* NUEVA SECCIÓN: Demostración de iconOnly */}
            <CodePreview
              title="🆕 Botones solo icono - Todas las variantes"
              description="Nueva funcionalidad: botones con proporciones cuadradas que muestran solo el icono"
              code={`// Todas las variantes con iconOnly
<Btn color="primary" variant="solid" iconOnly startIcon={<i className="ph ph-star"></i>}>Favorito</Btn>
<Btn color="primary" variant="faded" iconOnly startIcon={<i className="ph ph-star"></i>}>Favorito</Btn>
<Btn color="primary" variant="bordered" iconOnly startIcon={<i className="ph ph-star"></i>}>Favorito</Btn>
<Btn color="primary" variant="light" iconOnly startIcon={<i className="ph ph-star"></i>}>Favorito</Btn>
<Btn color="primary" variant="flat" iconOnly startIcon={<i className="ph ph-star"></i>}>Favorito</Btn>
<Btn color="primary" variant="ghost" iconOnly startIcon={<i className="ph ph-star"></i>}>Favorito</Btn>
<Btn color="primary" variant="shadow" iconOnly startIcon={<i className="ph ph-star"></i>}>Favorito</Btn>

// Diferentes tamaños
<Btn color="primary" iconOnly size="sm" startIcon={<i className="ph ph-plus"></i>}>Agregar</Btn>
<Btn color="primary" iconOnly size="md" startIcon={<i className="ph ph-plus"></i>}>Agregar</Btn>
<Btn color="primary" iconOnly size="lg" startIcon={<i className="ph ph-plus"></i>}>Agregar</Btn>`}>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3 justify-center">
                  <Btn color="primary" variant="solid" iconOnly startIcon={<i className="ph ph-star"></i>}>
                    Favorito
                  </Btn>
                  <Btn color="primary" variant="faded" iconOnly startIcon={<i className="ph ph-star"></i>}>
                    Favorito
                  </Btn>
                  <Btn color="primary" variant="bordered" iconOnly startIcon={<i className="ph ph-star"></i>}>
                    Favorito
                  </Btn>
                  <Btn color="primary" variant="light" iconOnly startIcon={<i className="ph ph-star"></i>}>
                    Favorito
                  </Btn>
                  <Btn color="primary" variant="flat" iconOnly startIcon={<i className="ph ph-star"></i>}>
                    Favorito
                  </Btn>
                  <Btn color="primary" variant="ghost" iconOnly startIcon={<i className="ph ph-star"></i>}>
                    Favorito
                  </Btn>
                  <Btn color="primary" variant="shadow" iconOnly startIcon={<i className="ph ph-star"></i>}>
                    Favorito
                  </Btn>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xs text-[var(--neutral-500)]">Tamaños:</span>
                  <Btn color="primary" iconOnly size="sm" startIcon={<i className="ph ph-plus"></i>}>
                    Agregar
                  </Btn>
                  <Btn color="primary" iconOnly size="md" startIcon={<i className="ph ph-plus"></i>}>
                    Agregar
                  </Btn>
                  <Btn color="primary" iconOnly size="lg" startIcon={<i className="ph ph-plus"></i>}>
                    Agregar
                  </Btn>
                </div>
              </div>
            </CodePreview>
          </div>
        </div>

        {/* Casos de uso específicos para iconOnly */}
        <div className="mb-12 p-6 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]">
          <h2 className="text-2xl font-semibold mb-6 text-[var(--neutral-200)]">🎯 Casos de uso - Botones solo icono</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <CodePreview
              title="Barra de herramientas"
              description="Perfectos para barras de herramientas y acciones rápidas"
              code={`<div className="flex gap-2 p-3 bg-gray-100 rounded-lg">
  <Btn iconOnly variant="light" color="primary"
       startIcon={<i className="ph ph-pencil"></i>}>
    Editar
  </Btn>
  <Btn iconOnly variant="light" color="danger"
       startIcon={<i className="ph ph-trash"></i>}>
    Eliminar
  </Btn>
  <Btn iconOnly variant="light" color="secondary"
       startIcon={<i className="ph ph-download"></i>}>
    Descargar
  </Btn>
  <Btn iconOnly variant="light" color="tertiary"
       startIcon={<i className="ph ph-share"></i>}>
    Compartir
  </Btn>
</div>`}>
              <div className="flex gap-2 p-3 bg-[var(--neutral-800)] rounded-lg">
                <Btn iconOnly variant="light" color="primary" startIcon={<i className="ph ph-pencil"></i>}>
                  Editar
                </Btn>
                <Btn iconOnly variant="light" color="danger" startIcon={<i className="ph ph-trash"></i>}>
                  Eliminar
                </Btn>
                <Btn iconOnly variant="light" color="secondary" startIcon={<i className="ph ph-download"></i>}>
                  Descargar
                </Btn>
                <Btn iconOnly variant="light" color="tertiary" startIcon={<i className="ph ph-share"></i>}>
                  Compartir
                </Btn>
              </div>
            </CodePreview>

            <CodePreview
              title="Botón flotante (FAB)"
              description="Ideal para acciones principales flotantes"
              code={`<div className="relative h-32 bg-gray-100 rounded-lg">
  <div className="absolute bottom-4 right-4">
    <Btn iconOnly
         variant="shadow"
         color="primary"
         size="lg"
         startIcon={<i className="ph ph-plus"></i>}>
      Agregar elemento
    </Btn>
  </div>
</div>`}>
              <div className="relative h-32 bg-[var(--neutral-800)] rounded-lg">
                <div className="absolute bottom-4 right-4">
                  <Btn iconOnly variant="shadow" color="primary" size="lg" startIcon={<i className="ph ph-plus"></i>}>
                    Agregar elemento
                  </Btn>
                </div>
              </div>
            </CodePreview>
          </div>
        </div>

        {/* Botones por color */}
        <h2 className="text-3xl font-bold mb-8 text-[var(--neutral-200)]">🌈 Variantes por color</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {variantColorsButton.map((color, index) => (
            <VariantButton key={index} color={color} />
          ))}
        </div>

        {/* Casos de uso recomendados */}
        <div className="mt-16 p-6 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]">
          <h2 className="text-2xl font-semibold mb-6 text-[var(--neutral-200)]">💡 Casos de uso recomendados</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <CodePreview
              title="Acciones principales"
              description="Para las acciones más importantes de la interfaz"
              code={`<Btn variant="solid" color="primary" fullWidth>
  Crear cuenta
</Btn>
<Btn variant="shadow" color="success" fullWidth>
  Confirmar pedido
</Btn>`}>
              <div className="space-y-2">
                <Btn variant="solid" color="primary" fullWidth>
                  Crear cuenta
                </Btn>
                <Btn variant="shadow" color="success" fullWidth>
                  Confirmar pedido
                </Btn>
              </div>
            </CodePreview>

            <CodePreview
              title="Acciones secundarias"
              description="Para acciones menos prominentes pero importantes"
              code={`<Btn variant="bordered" color="secondary" fullWidth>
  Ver detalles
</Btn>
<Btn variant="ghost" color="tertiary" fullWidth>
  Cancelar
</Btn>`}>
              <div className="space-y-2">
                <Btn variant="bordered" color="secondary" fullWidth>
                  Ver detalles
                </Btn>
                <Btn variant="ghost" color="tertiary" fullWidth>
                  Cancelar
                </Btn>
              </div>
            </CodePreview>
          </div>
        </div>

        {/* Mejores prácticas actualizadas */}
        <div className="mt-16 p-6 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]">
          <h2 className="text-2xl font-semibold mb-6 text-[var(--neutral-200)]">📋 Mejores prácticas</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[var(--neutral-300)] flex items-center gap-2">
                <span className="text-green-500">✅</span>
                Recomendado
              </h3>
              <div className="space-y-3 text-sm text-[var(--neutral-400)]">
                <div className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>
                    Usa <code className="bg-[var(--neutral-800)] px-1 rounded">variant="solid"</code> para acciones principales
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>
                    Aplica <code className="bg-[var(--neutral-800)] px-1 rounded">variant="bordered"</code> para acciones secundarias
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>
                    Usa <code className="bg-[var(--neutral-800)] px-1 rounded">iconOnly</code> para barras de herramientas y acciones
                    rápidas
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>
                    Mantén el texto descriptivo en <code className="bg-[var(--neutral-800)] px-1 rounded">children</code> para
                    accesibilidad, incluso con <code className="bg-[var(--neutral-800)] px-1 rounded">iconOnly</code>
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>
                    Usa colores semánticos: <code className="bg-[var(--neutral-800)] px-1 rounded">success</code>,{' '}
                    <code className="bg-[var(--neutral-800)] px-1 rounded">warning</code>,{' '}
                    <code className="bg-[var(--neutral-800)] px-1 rounded">danger</code>
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[var(--neutral-300)] flex items-center gap-2">
                <span className="text-red-500">❌</span>
                Evitar
              </h3>
              <div className="space-y-3 text-sm text-[var(--neutral-400)]">
                <div className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>
                    Usar múltiples botones <code className="bg-[var(--neutral-800)] px-1 rounded">shadow</code> en la misma vista
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>
                    Usar <code className="bg-[var(--neutral-800)] px-1 rounded">iconOnly</code> sin proporcionar un icono
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Mezclar demasiadas variantes en un solo contenedor</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Usar colores sin significado semántico claro</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Botones muy pequeños para acciones importantes</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Documentación completa de la API */}
        <div className="mt-16 p-6 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]">
          <h2 className="text-2xl font-semibold mb-6 text-[var(--neutral-200)]">📚 Documentación de API</h2>

          <CodePreview
            title="Interface completa del componente"
            description="Todas las props disponibles con sus tipos y descripciones"
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
}`}>
            <div className="text-[var(--neutral-400)] text-sm">Ver el código completo de la interface del componente</div>
          </CodePreview>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <CodePreview
              title="Ejemplos de uso básico"
              description="Los casos más comunes de implementación"
              code={`// Botón básico
<Btn color="primary" variant="solid">
  Mi botón
</Btn>

// Botón con icono
<Btn color="success"
     variant="shadow"
     startIcon={<i className="ph ph-check"></i>}>
  Confirmar
</Btn>

// Botón solo icono (NUEVO)
<Btn color="primary"
     iconOnly
     startIcon={<i className="ph ph-heart"></i>}>
  Me gusta
</Btn>

// Botón como enlace
<Btn href="/dashboard"
     target="_blank"
     color="primary"
     variant="bordered">
  Ir al dashboard
</Btn>`}>
              <div className="space-y-2">
                <Btn color="primary" variant="solid">
                  Mi botón
                </Btn>
                <Btn color="success" variant="shadow" startIcon={<i className="ph ph-check"></i>}>
                  Confirmar
                </Btn>
                <Btn color="primary" iconOnly startIcon={<i className="ph ph-heart"></i>}>
                  Me gusta
                </Btn>
              </div>
            </CodePreview>

            <CodePreview
              title="Casos de uso avanzados"
              description="Implementaciones más complejas con estado y lógica"
              code={`// Botón con estado y onClick
<Btn color="danger"
     variant="ghost"
     onClick={() => handleDelete()}
     disabled={isLoading}
     endIcon={<i className="ph ph-trash"></i>}>
  {isLoading ? 'Eliminando...' : 'Eliminar'}
</Btn>

// Botón con radio personalizado
<Btn color="secondary"
     variant="faded"
     radius={20}
     startIcon={<i className="ph ph-settings"></i>}>
  Configuración
</Btn>

// Formulario con botones
<form onSubmit={handleSubmit}>
  <div className="flex gap-2 justify-end">
    <Btn type="button"
         variant="light"
         color="secondary"
         onClick={() => handleCancel()}>
      Cancelar
    </Btn>
    <Btn type="submit"
         variant="solid"
         color="primary"
         disabled={!isValid}
         startIcon={<i className="ph ph-floppy-disk"></i>}>
      Guardar cambios
    </Btn>
  </div>
</form>

// Botón FAB con iconOnly
<Btn iconOnly
     variant="shadow"
     color="primary"
     size="lg"
     startIcon={<i className="ph ph-plus"></i>}>
  Agregar elemento
</Btn>`}>
              <div className="space-y-2">
                <div className="text-xs text-[var(--neutral-500)]">Ver ejemplos de implementación con lógica de estado</div>
              </div>
            </CodePreview>
          </div>

          <div className="mt-6">
            <CodePreview
              title="Casos específicos con iconOnly"
              description="Nuevos patrones de uso con la funcionalidad iconOnly"
              code={`// Barra de herramientas completa
<div className="flex gap-1 p-2 bg-gray-100 rounded-lg">
  <Btn iconOnly variant="light" color="primary"
       startIcon={<i className="ph ph-bold"></i>}>
    Negrita
  </Btn>
  <Btn iconOnly variant="light" color="primary"
       startIcon={<i className="ph ph-italic"></i>}>
    Cursiva
  </Btn>
  <Btn iconOnly variant="light" color="primary"
       startIcon={<i className="ph ph-underline"></i>}>
    Subrayado
  </Btn>
  <div className="w-px bg-gray-300 mx-1"></div>
  <Btn iconOnly variant="light" color="secondary"
       startIcon={<i className="ph ph-align-left"></i>}>
    Alinear izquierda
  </Btn>
  <Btn iconOnly variant="light" color="secondary"
       startIcon={<i className="ph ph-align-center"></i>}>
    Centrar
  </Btn>
  <Btn iconOnly variant="light" color="secondary"
       startIcon={<i className="ph ph-align-right"></i>}>
    Alinear derecha
  </Btn>
</div>

// Acciones de tabla/lista
<div className="flex gap-1">
  <Btn iconOnly size="sm" variant="light" color="primary"
       startIcon={<i className="ph ph-eye"></i>}>
    Ver detalles
  </Btn>
  <Btn iconOnly size="sm" variant="light" color="warning"
       startIcon={<i className="ph ph-pencil"></i>}>
    Editar
  </Btn>
  <Btn iconOnly size="sm" variant="light" color="danger"
       startIcon={<i className="ph ph-trash"></i>}>
    Eliminar
  </Btn>
</div>

// Estados con iconOnly
<Btn iconOnly variant="flat" color="success"
     startIcon={<i className="ph ph-check-circle"></i>}
     disabled>
  Completado
</Btn>

// Navegación
<div className="flex gap-2">
  <Btn iconOnly variant="bordered" color="secondary"
       startIcon={<i className="ph ph-arrow-left"></i>}>
    Anterior
  </Btn>
  <Btn iconOnly variant="bordered" color="secondary"
       startIcon={<i className="ph ph-arrow-right"></i>}>
    Siguiente
  </Btn>
</div>`}>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-[var(--neutral-500)] mb-2">Barra de herramientas de texto:</p>
                  <div className="flex gap-1 p-2 bg-[var(--neutral-800)] rounded-lg w-fit">
                    <Btn iconOnly variant="light" color="primary" startIcon={<i className="ph ph-text-b"></i>}>
                      Negrita
                    </Btn>
                    <Btn iconOnly variant="light" color="primary" startIcon={<i className="ph ph-text-italic"></i>}>
                      Cursiva
                    </Btn>
                    <Btn iconOnly variant="light" color="primary" startIcon={<i className="ph ph-text-underline"></i>}>
                      Subrayado
                    </Btn>
                    <div className="w-px bg-[var(--neutral-600)] mx-1"></div>
                    <Btn iconOnly variant="light" color="secondary" startIcon={<i className="ph ph-text-align-left"></i>}>
                      Alinear izquierda
                    </Btn>
                    <Btn iconOnly variant="light" color="secondary" startIcon={<i className="ph ph-text-align-center"></i>}>
                      Centrar
                    </Btn>
                    <Btn iconOnly variant="light" color="secondary" startIcon={<i className="ph ph-text-align-right"></i>}>
                      Alinear derecha
                    </Btn>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-[var(--neutral-500)] mb-2">Acciones de fila:</p>
                  <div className="flex gap-1">
                    <Btn iconOnly size="sm" variant="light" color="primary" startIcon={<i className="ph ph-eye"></i>}>
                      Ver detalles
                    </Btn>
                    <Btn iconOnly size="sm" variant="light" color="warning" startIcon={<i className="ph ph-pencil"></i>}>
                      Editar
                    </Btn>
                    <Btn iconOnly size="sm" variant="light" color="danger" startIcon={<i className="ph ph-trash"></i>}>
                      Eliminar
                    </Btn>
                  </div>
                </div>
              </div>
            </CodePreview>
          </div>
        </div>

        {/* Notas importantes sobre iconOnly */}
        <div className="mt-16 p-6 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-xl">
          <h2 className="text-2xl font-semibold mb-6 text-blue-900 dark:text-blue-100">🆕 Notas sobre la funcionalidad iconOnly</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-blue-800 dark:text-blue-200">✨ Características</h3>
              <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
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
              <h3 className="text-lg font-semibold mb-3 text-blue-800 dark:text-blue-200">⚠️ Consideraciones</h3>
              <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
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
        <div className="mt-16 text-center p-8 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]">
          <h3 className="text-xl font-semibold mb-4 text-[var(--neutral-200)]">🚀 ¿Necesitas más funcionalidades?</h3>
          <p className="text-[var(--neutral-400)] mb-6 max-w-2xl mx-auto">
            Este componente de botón está diseñado para ser flexible y extensible. Si necesitas nuevas variantes, tamaños o funcionalidades,
            puedes extender fácilmente los estilos SCSS y las props del componente.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Btn variant="solid" color="primary" startIcon={<i className="ph ph-book"></i>}>
              Ver documentación
            </Btn>
            <Btn variant="bordered" color="secondary" startIcon={<i className="ph ph-github-logo"></i>}>
              Ver en GitHub
            </Btn>
            <Btn variant="light" color="tertiary" startIcon={<i className="ph ph-question"></i>}>
              Preguntas frecuentes
            </Btn>
          </div>
        </div>
      </Container>
    </>
  )
}
