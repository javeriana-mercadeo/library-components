'use client'

import Container from '@library/components/container'
import Title from '@library/components/contain/title'

import ViewComponent from '@/components/viewComponent/viewComponent'
import Splash from '@/app/_library/components/splash'

/**
 * Componente que muestra las diferentes variantes de un título por color
 * Incluye todas las jerarquías, tamaños y configuraciones disponibles
 */
const VariantTitle = ({ color }: { color: 'primary' | 'secondary' | 'tertiary' | 'neutral' | 'success' | 'warning' | 'danger' }) => {
  return (
    <div className='space-y-6 mt-8 border p-4 rounded-lg bg-[var(--background-100)]'>
      <div>
        <h3 className='text-xl font-bold mb-4 text-[var(--neutral-300)]'>{color}</h3>

        {/* Variantes de tamaño */}
        <div className='space-y-4'>
          <ViewComponent>
            <p className='text-sm text-[var(--neutral-500)] mb-4'>Tamaños de título</p>
            <div className='space-y-3'>
              <Title color={color} hierarchy='h6' size='xs'>
                Extra pequeño (xs) - Subtítulos mínimos
              </Title>
              <Title color={color} hierarchy='h5' size='sm'>
                Pequeño (sm) - Elementos secundarios
              </Title>
              <Title color={color} hierarchy='h4' size='md'>
                Mediano (md) - Texto de apoyo
              </Title>
              <Title color={color} hierarchy='h3' size='lg'>
                Grande (lg) - Secciones importantes
              </Title>
              <Title color={color} hierarchy='h2' size='xl'>
                Extra grande (xl) - Títulos principales
              </Title>
              <Title color={color} hierarchy='h1' size='2xl'>
                2x grande (2xl) - Encabezados destacados
              </Title>
              <Title color={color} hierarchy='h1' size='3xl'>
                3x grande (3xl) - Títulos hero principales
              </Title>
            </div>
          </ViewComponent>

          {/* Variantes de peso */}
          <ViewComponent>
            <p className='text-sm text-[var(--neutral-500)] mb-2'>Pesos de fuente</p>
            <div className='space-y-2'>
              <Title color={color} size='lg' weight='light'>
                Peso ligero (light)
              </Title>
              <Title color={color} size='lg' weight='regular'>
                Peso regular (regular)
              </Title>
              <Title color={color} size='lg' weight='medium'>
                Peso medio (medium)
              </Title>
              <Title color={color} size='lg' weight='semibold'>
                Peso semi-negrita (semibold)
              </Title>
              <Title color={color} size='lg' weight='bold'>
                Peso negrita (bold)
              </Title>
              <Title color={color} size='lg' weight='extrabold'>
                Peso extra-negrita (extrabold)
              </Title>
            </div>
          </ViewComponent>

          {/* Variantes de alineación */}
          <ViewComponent>
            <p className='text-sm text-[var(--neutral-500)] mb-2'>Alineación de texto</p>
            <div className='space-y-2'>
              <Title align='left' color={color} size='lg'>
                Alineado a la izquierda (left)
              </Title>
              <Title align='center' color={color} size='lg'>
                Alineado al centro (center)
              </Title>
              <Title align='right' color={color} size='lg'>
                Alineado a la derecha (right)
              </Title>
            </div>
          </ViewComponent>

          {/* Estilos especiales */}
          <ViewComponent>
            <p className='text-sm text-[var(--neutral-500)] mb-2'>Estilos especiales</p>
            <div className='space-y-2'>
              <Title uppercase color={color} size='lg'>
                Texto en mayúsculas (uppercase)
              </Title>
              <Title truncate className='max-w-xs' color={color} size='lg'>
                Este es un texto muy largo que se truncará automáticamente cuando exceda el ancho disponible
              </Title>
              <Title truncate className='max-w-md' color={color} lineClamp={2} size='lg'>
                Este es un texto muy largo que se truncará después de exactamente dos líneas, mostrando solo el contenido que cabe en ese
                espacio limitado y agregando puntos suspensivos al final del contenido visible.
              </Title>
            </div>
          </ViewComponent>

          {/* Títulos clickeables */}
          <ViewComponent>
            <p className='text-sm text-[var(--neutral-500)] mb-2'>Títulos interactivos</p>
            <div className='space-y-2'>
              <Title color={color} size='lg' onClick={() => {}}>
                Título clickeable (hover para ver efecto)
              </Title>
              <Title color={color} size='xl' weight='bold' onClick={() => {}}>
                Título interactivo con peso bold
              </Title>
            </div>
          </ViewComponent>

          {/* Jerarquías semánticas */}
          <ViewComponent>
            <p className='text-sm text-[var(--neutral-500)] mb-2'>Jerarquías HTML (mismo tamaño visual)</p>
            <div className='space-y-2'>
              <Title color={color} hierarchy='h1' size='lg'>
                Jerarquía H1 - Máxima importancia
              </Title>
              <Title color={color} hierarchy='h2' size='lg'>
                Jerarquía H2 - Sección principal
              </Title>
              <Title color={color} hierarchy='h3' size='lg'>
                Jerarquía H3 - Subsección
              </Title>
              <Title color={color} hierarchy='h4' size='lg'>
                Jerarquía H4 - Apartado
              </Title>
              <Title color={color} hierarchy='h5' size='lg'>
                Jerarquía H5 - Subpartado
              </Title>
              <Title color={color} hierarchy='h6' size='lg'>
                Jerarquía H6 - Detalle menor
              </Title>
            </div>
          </ViewComponent>
        </div>
      </div>
    </div>
  )
}

const variantColorsTitle: Array<'primary' | 'secondary' | 'tertiary' | 'neutral' | 'success' | 'warning' | 'danger'> = [
  'primary',
  'secondary',
  'tertiary',
  'neutral',
  'success',
  'warning',
  'danger'
]

export default function TitleShowcase() {
  return (
    <>
      <Splash />
      <Container>
        {/* Header mejorado */}
        <div className='text-center mb-8'>
          <Title align='center' color='primary' hierarchy='h1' size='3xl' weight='bold'>
            Biblioteca de Títulos
          </Title>
          <Title align='center' className='max-w-2xl mx-auto mt-4' color='neutral' hierarchy='h2' size='lg' weight='regular'>
            Explora todas las variantes de títulos disponibles con diferentes colores, tamaños, jerarquías y efectos. Compatible con el
            sistema de temas.
          </Title>
        </div>

        {/* Showcase de tamaños principales */}
        <div className='mb-12 p-6 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]'>
          <Title className='mb-6' color='neutral' hierarchy='h2' size='xl' weight='semibold'>
            📏 Escala de tamaños (Primary)
          </Title>
          <div className='space-y-4'>
            <Title color='primary' hierarchy='h1' size='3xl'>
              Título Hero Principal (3xl)
            </Title>
            <Title color='primary' hierarchy='h1' size='2xl'>
              Título Destacado (2xl)
            </Title>
            <Title color='primary' hierarchy='h2' size='xl'>
              Título Principal de Sección (xl)
            </Title>
            <Title color='primary' hierarchy='h3' size='lg'>
              Título de Subsección (lg)
            </Title>
            <Title color='primary' hierarchy='h4' size='md'>
              Título de Apartado (md)
            </Title>
            <Title color='primary' hierarchy='h5' size='sm'>
              Título Menor (sm)
            </Title>
            <Title color='primary' hierarchy='h6' size='xs'>
              Título Mínimo (xs)
            </Title>
          </div>
        </div>

        {/* Showcase de casos de uso */}
        <div className='mb-12 p-6 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]'>
          <Title className='mb-6' color='neutral' hierarchy='h2' size='xl' weight='semibold'>
            🎯 Casos de uso común
          </Title>
          <div className='grid md:grid-cols-2 gap-6'>
            <div className='space-y-4'>
              <Title color='success' hierarchy='h3' size='lg' weight='semibold'>
                ✅ Títulos de éxito
              </Title>
              <Title color='success' hierarchy='h4' size='md'>
                Operación completada exitosamente
              </Title>
              <Title color='success' hierarchy='h5' size='sm' weight='light'>
                Todo está funcionando correctamente
              </Title>
            </div>
            <div className='space-y-4'>
              <Title color='warning' hierarchy='h3' size='lg' weight='semibold'>
                ⚠️ Títulos de advertencia
              </Title>
              <Title color='warning' hierarchy='h4' size='md'>
                Atención: Revisa esta información
              </Title>
              <Title color='warning' hierarchy='h5' size='sm' weight='light'>
                Algunos elementos requieren tu atención
              </Title>
            </div>
          </div>
        </div>

        {/* Títulos por color */}
        <Title className='mb-8' color='neutral' hierarchy='h2' size='2xl' weight='bold'>
          🌈 Variantes por color
        </Title>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {variantColorsTitle.map((color, index) => (
            <VariantTitle key={index} color={color} />
          ))}
        </div>

        {/* Sección de mejores prácticas */}
        <div className='mt-16 p-6 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]'>
          <Title className='mb-6' color='neutral' hierarchy='h2' size='xl' weight='semibold'>
            📋 Mejores prácticas
          </Title>
          <div className='grid md:grid-cols-2 gap-8'>
            <div>
              <Title className='mb-4' color='primary' hierarchy='h3' size='lg' weight='semibold'>
                ✅ Recomendado
              </Title>
              <div className='space-y-3 text-sm text-[var(--neutral-400)]'>
                <div className='flex items-start gap-2'>
                  <span className='text-green-500'>•</span>
                  <span>Usa jerarquías HTML semánticamente correctas (h1 → h2 → h3)</span>
                </div>
                <div className='flex items-start gap-2'>
                  <span className='text-green-500'>•</span>
                  <span>Mantén consistencia en tamaños dentro de la misma sección</span>
                </div>
                <div className='flex items-start gap-2'>
                  <span className='text-green-500'>•</span>
                  <span>Usa colores semánticos (success, warning, danger) para estados</span>
                </div>
                <div className='flex items-start gap-2'>
                  <span className='text-green-500'>•</span>
                  <span>Aplica truncate para textos dinámicos largos</span>
                </div>
              </div>
            </div>
            <div>
              <Title className='mb-4' color='danger' hierarchy='h3' size='lg' weight='semibold'>
                ❌ Evitar
              </Title>
              <div className='space-y-3 text-sm text-[var(--neutral-400)]'>
                <div className='flex items-start gap-2'>
                  <span className='text-red-500'>•</span>
                  <span>Saltar niveles de jerarquía (h1 directamente a h3)</span>
                </div>
                <div className='flex items-start gap-2'>
                  <span className='text-red-500'>•</span>
                  <span>Usar tamaños muy pequeños para títulos principales</span>
                </div>
                <div className='flex items-start gap-2'>
                  <span className='text-red-500'>•</span>
                  <span>Abusar de títulos clickeables sin propósito claro</span>
                </div>
                <div className='flex items-start gap-2'>
                  <span className='text-red-500'>•</span>
                  <span>Mezclar muchos pesos de fuente en la misma sección</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Código de ejemplo */}
        <div className='mt-16 p-6 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]'>
          <Title className='mb-6' color='neutral' hierarchy='h2' size='xl' weight='semibold'>
            💻 Ejemplos de código
          </Title>
          <div className='bg-[var(--neutral-900)] p-4 rounded-lg overflow-x-auto'>
            <pre className='text-sm text-[var(--neutral-300)]'>
              {`// Título principal de página
<Title hierarchy="h1" size="3xl" color="primary" weight="bold">
  Mi aplicación increíble
</Title>

// Título de sección con truncado
<Title
  hierarchy="h2"
  size="xl"
  color="secondary"
  truncate
  lineClamp={2}
  className="max-w-md"
>
  Esta es una sección con un título muy largo...
</Title>

// Título clickeable
<Title
  hierarchy="h3"
  size="lg"
  color="tertiary"
  onClick={() => navigateToSection()}
  weight="semibold"
>
  Ir a configuración
</Title>`}
            </pre>
          </div>
        </div>
      </Container>
    </>
  )
}
