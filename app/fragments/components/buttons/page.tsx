'use client'

import Container from '@library/components/container'
import ViewComponent from '@/app/_components/viewComponent/viewComponent'
import Splash from '@/app/_library/components/splash'
import Btn from '@library/components/contain/btn'

/**
 * Componente que muestra las diferentes variantes de un botón por color
 * Incluye todas las variantes de HeroUI: solid, faded, bordered, light, flat, ghost, shadow
 */
const VariantButton = ({ color }: { color: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' }) => {
  return (
    <div className="space-y-6 mt-8 border p-4 rounded-lg bg-[var(--background-100)]">
      <div>
        <h3 className="text-xl font-bold mb-4 text-[var(--neutral-300)]">{color}</h3>

        {/* Variantes de estilo HeroUI */}
        <div className="space-y-4">
          <ViewComponent>
            <p className="text-sm text-[var(--neutral-500)] mb-4">Variantes de estilo</p>
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
          </ViewComponent>

          {/* Variantes de tamaño */}
          <ViewComponent>
            <p className="text-sm text-[var(--neutral-500)] mb-2">Tamaños</p>
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
          </ViewComponent>

          {/* Variantes con íconos */}
          <ViewComponent>
            <p className="text-sm text-[var(--neutral-500)] mb-2">Con íconos</p>
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
          </ViewComponent>

          {/* Comparación de variantes populares */}
          <ViewComponent>
            <p className="text-sm text-[var(--neutral-500)] mb-2">Comparación popular</p>
            <div className="flex flex-wrap gap-2">
              <Btn color={color} variant="solid">
                Solid
              </Btn>
              <Btn color={color} variant="bordered">
                Bordered
              </Btn>
              <Btn color={color} variant="ghost">
                Ghost
              </Btn>
              <Btn color={color} variant="shadow">
                Shadow
              </Btn>
            </div>
          </ViewComponent>

          {/* Variantes deshabilitadas */}
          <ViewComponent>
            <p className="text-sm text-[var(--neutral-500)] mb-2">Estados deshabilitados</p>
            <div className="flex flex-wrap gap-2">
              <Btn color={color} variant="solid" disabled>
                Solid deshabilitado
              </Btn>
              <Btn color={color} variant="bordered" disabled>
                Bordered deshabilitado
              </Btn>
              <Btn color={color} variant="ghost" disabled>
                Ghost deshabilitado
              </Btn>
              <Btn color={color} variant="faded" disabled>
                Faded deshabilitado
              </Btn>
            </div>
          </ViewComponent>

          {/* Variantes con efectos especiales */}
          <ViewComponent>
            <p className="text-sm text-[var(--neutral-500)] mb-2">Efectos especiales</p>
            <div className="flex flex-wrap gap-2">
              <Btn color={color} variant="shadow" startIcon={<i className="ph ph-magic-wand"></i>}>
                Shadow con icono
              </Btn>
              <Btn color={color} variant="faded" startIcon={<i className="ph ph-sparkle"></i>}>
                Faded con icono
              </Btn>
            </div>
          </ViewComponent>

          {/* Variante de ancho completo */}
          <ViewComponent>
            <p className="text-sm text-[var(--neutral-500)] mb-2">Ancho completo</p>
            <div className="space-y-2">
              <Btn color={color} variant="solid" fullWidth>
                Botón Solid de ancho completo
              </Btn>
              <Btn color={color} variant="bordered" fullWidth>
                Botón Bordered de ancho completo
              </Btn>
              <Btn color={color} variant="shadow" fullWidth startIcon={<i className="ph ph-crown"></i>}>
                Botón Shadow de ancho completo con icono
              </Btn>
            </div>
          </ViewComponent>
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
        {/* Header mejorado */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-[var(--neutral-200)]">Biblioteca de Botones</h1>
          <p className="text-lg text-[var(--neutral-400)] max-w-2xl mx-auto">
            Explora todas las variantes de botones disponibles con diferentes colores, tamaños y efectos. Compatible con el sistema de temas
            y todas las variantes de HeroUI.
          </p>
        </div>

        {/* Showcase de variantes principales */}
        <div className="mb-12 p-6 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]">
          <h2 className="text-2xl font-semibold mb-6 text-[var(--neutral-200)]">🎨 Variantes principales (Primary)</h2>
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
        </div>

        {/* Botones por color */}
        <h2 className="text-3xl font-bold mb-8 text-[var(--neutral-200)]">🌈 Variantes por color</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {variantColorsButton.map((color, index) => (
            <VariantButton key={index} color={color} />
          ))}
        </div>

        {/* Sección de casos de uso */}
        <div className="mt-16 p-6 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]">
          <h2 className="text-2xl font-semibold mb-6 text-[var(--neutral-200)]">💡 Casos de uso recomendados</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-[var(--neutral-300)]">Acciones principales</h3>
              <div className="space-y-2">
                <Btn variant="solid" color="primary" fullWidth>
                  Crear cuenta
                </Btn>
                <Btn variant="shadow" color="success" fullWidth>
                  Confirmar pedido
                </Btn>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-[var(--neutral-300)]">Acciones secundarias</h3>
              <div className="space-y-2">
                <Btn variant="bordered" color="secondary" fullWidth>
                  Ver detalles
                </Btn>
                <Btn variant="ghost" color="tertiary" fullWidth>
                  Cancelar
                </Btn>
              </div>
            </div>
          </div>
        </div>

        {/* Mejores prácticas */}
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
                    Usa colores semánticos: <code className="bg-[var(--neutral-800)] px-1 rounded">success</code>,{' '}
                    <code className="bg-[var(--neutral-800)] px-1 rounded">warning</code>,{' '}
                    <code className="bg-[var(--neutral-800)] px-1 rounded">danger</code>
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>Incluye íconos para mejorar la comprensión de la acción</span>
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

        {/* Código de ejemplo */}
        <div className="mt-16 p-6 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]">
          <h2 className="text-2xl font-semibold mb-6 text-[var(--neutral-200)]">💻 Ejemplos de código</h2>
          <div className="space-y-6">
            {/* Ejemplo básico */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-[var(--neutral-300)]">Uso básico</h3>
              <div className="bg-[var(--neutral-900)] p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm text-[var(--neutral-300)]">
                  {`// Importar el componente
import Btn from '@library/components/buttons/btn_general'

// Botón básico
<Btn color="primary" variant="solid">
  Mi botón
</Btn>

// Botón con icono
<Btn
  color="success"
  variant="shadow"
  startIcon={<i className="ph ph-check"></i>}
>
  Confirmar
</Btn>`}
                </pre>
              </div>
            </div>

            {/* Ejemplo de variantes */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-[var(--neutral-300)]">Todas las variantes</h3>
              <div className="bg-[var(--neutral-900)] p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm text-[var(--neutral-300)]">
                  {`// Variantes disponibles
<Btn variant="solid" color="primary">Solid</Btn>
<Btn variant="faded" color="primary">Faded</Btn>
<Btn variant="bordered" color="primary">Bordered</Btn>
<Btn variant="light" color="primary">Light</Btn>
<Btn variant="flat" color="primary">Flat</Btn>
<Btn variant="ghost" color="primary">Ghost</Btn>
<Btn variant="shadow" color="primary">Shadow</Btn>

// Tamaños disponibles
<Btn size="sm">Pequeño</Btn>
<Btn size="md">Mediano</Btn>
<Btn size="lg">Grande</Btn>`}
                </pre>
              </div>
            </div>

            {/* Ejemplo avanzado */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-[var(--neutral-300)]">Configuración avanzada</h3>
              <div className="bg-[var(--neutral-900)] p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm text-[var(--neutral-300)]">
                  {`// Botón como enlace
<Btn
  href="/dashboard"
  target="_blank"
  color="primary"
  variant="bordered"
  size="lg"
  fullWidth
  startIcon={<i className="ph ph-external-link"></i>}
>
  Ir al dashboard
</Btn>

// Botón con onClick y estado
<Btn
  color="danger"
  variant="ghost"
  onClick={() => handleDelete()}
  disabled={isLoading}
  endIcon={<i className="ph ph-trash"></i>}
>
  {isLoading ? 'Eliminando...' : 'Eliminar'}
</Btn>

// Botón con radio personalizado
<Btn
  color="secondary"
  variant="faded"
  radius={20}
  startIcon={<i className="ph ph-settings"></i>}
>
  Configuración
</Btn>`}
                </pre>
              </div>
            </div>

            {/* Ejemplo de formulario */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-[var(--neutral-300)]">En formularios</h3>
              <div className="bg-[var(--neutral-900)] p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm text-[var(--neutral-300)]">
                  {`// Botones de formulario
<form onSubmit={handleSubmit}>
  <div className="flex gap-2 justify-end">
    <Btn
      type="button"
      variant="light"
      color="secondary"
      onClick={() => handleCancel()}
    >
      Cancelar
    </Btn>
    <Btn
      type="submit"
      variant="solid"
      color="primary"
      disabled={!isValid}
      startIcon={<i className="ph ph-floppy-disk"></i>}
    >
      Guardar cambios
    </Btn>
  </div>
</form>`}
                </pre>
              </div>
            </div>

            {/* Casos de uso específicos */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-[var(--neutral-300)]">Casos de uso específicos</h3>
              <div className="bg-[var(--neutral-900)] p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm text-[var(--neutral-300)]">
                  {`// Botón de llamada a acción principal
<Btn
  variant="shadow"
  color="primary"
  size="lg"
  fullWidth
  startIcon={<i className="ph ph-rocket-launch"></i>}
>
  ¡Comenzar ahora!
</Btn>

// Botón de estado/notificación
<Btn
  variant="flat"
  color="success"
  startIcon={<i className="ph ph-check-circle"></i>}
  disabled
>
  Completado
</Btn>

// Botón de acción destructiva
<Btn
  variant="bordered"
  color="danger"
  onClick={() => confirmDelete()}
  endIcon={<i className="ph ph-warning"></i>}
>
  Eliminar permanentemente
</Btn>

// Botón para Liferay (no editable)
<Btn
  variant="solid"
  color="primary"
  isEditable={false}
  id="unique-button-id"
>
  Botón fijo
</Btn>`}
                </pre>
              </div>
            </div>

            {/* Props disponibles */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-[var(--neutral-300)]">Props disponibles</h3>
              <div className="bg-[var(--neutral-900)] p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm text-[var(--neutral-300)]">
                  {`interface BtnProps {
  // Contenido y identificación
  children: React.ReactNode
  id?: string
  className?: string

  // Navegación
  href?: string              // Convierte en enlace <a>
  target?: '_blank' | '_self' | '_parent' | '_top'

  // Apariencia
  color?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger'
  variant?: 'solid' | 'faded' | 'bordered' | 'light' | 'flat' | 'ghost' | 'shadow'
  size?: 'sm' | 'md' | 'lg'

  // Iconos
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode

  // Comportamiento
  onClick?: (event: MouseEvent) => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'

  // Layout
  fullWidth?: boolean        // Ocupa todo el ancho disponible
  radius?: number            // Radio personalizado en px

  // Liferay
  isEditable?: boolean       // Para entorno de edición (default: true)
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
