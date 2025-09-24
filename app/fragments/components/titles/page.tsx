'use client'

import Container from '@library/components/container'
<<<<<<< HEAD
import ViewComponent from '@/app/_components/viewComponent/viewComponent'
import Splash from '@/app/_library/components/splash'
import Title from '@library/components/contain/title'

=======
import Title from '@library/components/contain/title'

import ViewComponent from '@/components/viewComponent/viewComponent'
import Splash from '@/app/_library/components/splash'

>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
/**
 * Componente que muestra las diferentes variantes de un título por color
 * Incluye todas las jerarquías, tamaños y configuraciones disponibles
 */
const VariantTitle = ({ color }: { color: 'primary' | 'secondary' | 'tertiary' | 'neutral' | 'success' | 'warning' | 'danger' }) => {
  return (
<<<<<<< HEAD
    <div className="space-y-6 mt-8 border p-4 rounded-lg bg-[var(--background-100)]">
      <div>
        <h3 className="text-xl font-bold mb-4 text-[var(--neutral-300)]">{color}</h3>

        {/* Variantes de tamaño */}
        <div className="space-y-4">
          <ViewComponent>
            <p className="text-sm text-[var(--neutral-500)] mb-4">Tamaños de título</p>
            <div className="space-y-3">
              <Title color={color} size="xs" hierarchy="h6">
                Extra pequeño (xs) - Subtítulos mínimos
              </Title>
              <Title color={color} size="sm" hierarchy="h5">
                Pequeño (sm) - Elementos secundarios
              </Title>
              <Title color={color} size="md" hierarchy="h4">
                Mediano (md) - Texto de apoyo
              </Title>
              <Title color={color} size="lg" hierarchy="h3">
                Grande (lg) - Secciones importantes
              </Title>
              <Title color={color} size="xl" hierarchy="h2">
                Extra grande (xl) - Títulos principales
              </Title>
              <Title color={color} size="2xl" hierarchy="h1">
                2x grande (2xl) - Encabezados destacados
              </Title>
              <Title color={color} size="3xl" hierarchy="h1">
=======
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
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
                3x grande (3xl) - Títulos hero principales
              </Title>
            </div>
          </ViewComponent>

          {/* Variantes de peso */}
          <ViewComponent>
<<<<<<< HEAD
            <p className="text-sm text-[var(--neutral-500)] mb-2">Pesos de fuente</p>
            <div className="space-y-2">
              <Title color={color} size="lg" weight="light">
                Peso ligero (light)
              </Title>
              <Title color={color} size="lg" weight="regular">
                Peso regular (regular)
              </Title>
              <Title color={color} size="lg" weight="medium">
                Peso medio (medium)
              </Title>
              <Title color={color} size="lg" weight="semibold">
                Peso semi-negrita (semibold)
              </Title>
              <Title color={color} size="lg" weight="bold">
                Peso negrita (bold)
              </Title>
              <Title color={color} size="lg" weight="extrabold">
=======
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
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
                Peso extra-negrita (extrabold)
              </Title>
            </div>
          </ViewComponent>

          {/* Variantes de alineación */}
          <ViewComponent>
<<<<<<< HEAD
            <p className="text-sm text-[var(--neutral-500)] mb-2">Alineación de texto</p>
            <div className="space-y-2">
              <Title color={color} size="lg" align="left">
                Alineado a la izquierda (left)
              </Title>
              <Title color={color} size="lg" align="center">
                Alineado al centro (center)
              </Title>
              <Title color={color} size="lg" align="right">
=======
            <p className='text-sm text-[var(--neutral-500)] mb-2'>Alineación de texto</p>
            <div className='space-y-2'>
              <Title align='left' color={color} size='lg'>
                Alineado a la izquierda (left)
              </Title>
              <Title align='center' color={color} size='lg'>
                Alineado al centro (center)
              </Title>
              <Title align='right' color={color} size='lg'>
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
                Alineado a la derecha (right)
              </Title>
            </div>
          </ViewComponent>

          {/* Estilos especiales */}
          <ViewComponent>
<<<<<<< HEAD
            <p className="text-sm text-[var(--neutral-500)] mb-2">Estilos especiales</p>
            <div className="space-y-2">
              <Title color={color} size="lg" uppercase>
                Texto en mayúsculas (uppercase)
              </Title>
              <Title color={color} size="lg" truncate className="max-w-xs">
                Este es un texto muy largo que se truncará automáticamente cuando exceda el ancho disponible
              </Title>
              <Title color={color} size="lg" truncate lineClamp={2} className="max-w-md">
=======
            <p className='text-sm text-[var(--neutral-500)] mb-2'>Estilos especiales</p>
            <div className='space-y-2'>
              <Title uppercase color={color} size='lg'>
                Texto en mayúsculas (uppercase)
              </Title>
              <Title truncate className='max-w-xs' color={color} size='lg'>
                Este es un texto muy largo que se truncará automáticamente cuando exceda el ancho disponible
              </Title>
              <Title truncate className='max-w-md' color={color} lineClamp={2} size='lg'>
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
                Este es un texto muy largo que se truncará después de exactamente dos líneas, mostrando solo el contenido que cabe en ese
                espacio limitado y agregando puntos suspensivos al final del contenido visible.
              </Title>
            </div>
          </ViewComponent>

          {/* Títulos clickeables */}
          <ViewComponent>
<<<<<<< HEAD
            <p className="text-sm text-[var(--neutral-500)] mb-2">Títulos interactivos</p>
            <div className="space-y-2">
              <Title color={color} size="lg" onClick={() => alert(`Clickeaste el título ${color}!`)}>
                Título clickeable (hover para ver efecto)
              </Title>
              <Title color={color} size="xl" weight="bold" onClick={() => console.log('Título clickeado')}>
=======
            <p className='text-sm text-[var(--neutral-500)] mb-2'>Títulos interactivos</p>
            <div className='space-y-2'>
              <Title color={color} size='lg' onClick={() => alert(`Clickeaste el título ${color}!`)}>
                Título clickeable (hover para ver efecto)
              </Title>
              <Title color={color} size='xl' weight='bold' onClick={() => console.log('Título clickeado')}>
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
                Título interactivo con peso bold
              </Title>
            </div>
          </ViewComponent>

          {/* Jerarquías semánticas */}
          <ViewComponent>
<<<<<<< HEAD
            <p className="text-sm text-[var(--neutral-500)] mb-2">Jerarquías HTML (mismo tamaño visual)</p>
            <div className="space-y-2">
              <Title color={color} size="lg" hierarchy="h1">
                Jerarquía H1 - Máxima importancia
              </Title>
              <Title color={color} size="lg" hierarchy="h2">
                Jerarquía H2 - Sección principal
              </Title>
              <Title color={color} size="lg" hierarchy="h3">
                Jerarquía H3 - Subsección
              </Title>
              <Title color={color} size="lg" hierarchy="h4">
                Jerarquía H4 - Apartado
              </Title>
              <Title color={color} size="lg" hierarchy="h5">
                Jerarquía H5 - Subpartado
              </Title>
              <Title color={color} size="lg" hierarchy="h6">
=======
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
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
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
<<<<<<< HEAD
        <div className="text-center mb-8">
          <Title hierarchy="h1" size="3xl" color="primary" align="center" weight="bold">
            Biblioteca de Títulos
          </Title>
          <Title hierarchy="h2" size="lg" color="neutral" align="center" weight="regular" className="max-w-2xl mx-auto mt-4">
=======
        <div className='text-center mb-8'>
          <Title align='center' color='primary' hierarchy='h1' size='3xl' weight='bold'>
            Biblioteca de Títulos
          </Title>
          <Title align='center' className='max-w-2xl mx-auto mt-4' color='neutral' hierarchy='h2' size='lg' weight='regular'>
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
            Explora todas las variantes de títulos disponibles con diferentes colores, tamaños, jerarquías y efectos. Compatible con el
            sistema de temas.
          </Title>
        </div>

        {/* Showcase de tamaños principales */}
<<<<<<< HEAD
        <div className="mb-12 p-6 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]">
          <Title hierarchy="h2" size="xl" color="neutral" weight="semibold" className="mb-6">
            📏 Escala de tamaños (Primary)
          </Title>
          <div className="space-y-4">
            <Title color="primary" size="3xl" hierarchy="h1">
              Título Hero Principal (3xl)
            </Title>
            <Title color="primary" size="2xl" hierarchy="h1">
              Título Destacado (2xl)
            </Title>
            <Title color="primary" size="xl" hierarchy="h2">
              Título Principal de Sección (xl)
            </Title>
            <Title color="primary" size="lg" hierarchy="h3">
              Título de Subsección (lg)
            </Title>
            <Title color="primary" size="md" hierarchy="h4">
              Título de Apartado (md)
            </Title>
            <Title color="primary" size="sm" hierarchy="h5">
              Título Menor (sm)
            </Title>
            <Title color="primary" size="xs" hierarchy="h6">
=======
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
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
              Título Mínimo (xs)
            </Title>
          </div>
        </div>

        {/* Showcase de casos de uso */}
<<<<<<< HEAD
        <div className="mb-12 p-6 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]">
          <Title hierarchy="h2" size="xl" color="neutral" weight="semibold" className="mb-6">
            🎯 Casos de uso común
          </Title>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Title hierarchy="h3" size="lg" color="success" weight="semibold">
                ✅ Títulos de éxito
              </Title>
              <Title hierarchy="h4" size="md" color="success">
                Operación completada exitosamente
              </Title>
              <Title hierarchy="h5" size="sm" color="success" weight="light">
                Todo está funcionando correctamente
              </Title>
            </div>
            <div className="space-y-4">
              <Title hierarchy="h3" size="lg" color="warning" weight="semibold">
                ⚠️ Títulos de advertencia
              </Title>
              <Title hierarchy="h4" size="md" color="warning">
                Atención: Revisa esta información
              </Title>
              <Title hierarchy="h5" size="sm" color="warning" weight="light">
=======
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
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
                Algunos elementos requieren tu atención
              </Title>
            </div>
          </div>
        </div>

        {/* Títulos por color */}
<<<<<<< HEAD
        <Title hierarchy="h2" size="2xl" color="neutral" weight="bold" className="mb-8">
          🌈 Variantes por color
        </Title>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
=======
        <Title className='mb-8' color='neutral' hierarchy='h2' size='2xl' weight='bold'>
          🌈 Variantes por color
        </Title>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
          {variantColorsTitle.map((color, index) => (
            <VariantTitle key={index} color={color} />
          ))}
        </div>

        {/* Sección de mejores prácticas */}
<<<<<<< HEAD
        <div className="mt-16 p-6 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]">
          <Title hierarchy="h2" size="xl" color="neutral" weight="semibold" className="mb-6">
            📋 Mejores prácticas
          </Title>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <Title hierarchy="h3" size="lg" color="primary" weight="semibold" className="mb-4">
                ✅ Recomendado
              </Title>
              <div className="space-y-3 text-sm text-[var(--neutral-400)]">
                <div className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>Usa jerarquías HTML semánticamente correctas (h1 → h2 → h3)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>Mantén consistencia en tamaños dentro de la misma sección</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>Usa colores semánticos (success, warning, danger) para estados</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
=======
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
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
                  <span>Aplica truncate para textos dinámicos largos</span>
                </div>
              </div>
            </div>
            <div>
<<<<<<< HEAD
              <Title hierarchy="h3" size="lg" color="danger" weight="semibold" className="mb-4">
                ❌ Evitar
              </Title>
              <div className="space-y-3 text-sm text-[var(--neutral-400)]">
                <div className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Saltar niveles de jerarquía (h1 directamente a h3)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Usar tamaños muy pequeños para títulos principales</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Abusar de títulos clickeables sin propósito claro</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
=======
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
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
                  <span>Mezclar muchos pesos de fuente en la misma sección</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Código de ejemplo */}
<<<<<<< HEAD
        <div className="mt-16 p-6 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]">
          <Title hierarchy="h2" size="xl" color="neutral" weight="semibold" className="mb-6">
            💻 Ejemplos de código
          </Title>
          <div className="bg-[var(--neutral-900)] p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm text-[var(--neutral-300)]">
=======
        <div className='mt-16 p-6 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]'>
          <Title className='mb-6' color='neutral' hierarchy='h2' size='xl' weight='semibold'>
            💻 Ejemplos de código
          </Title>
          <div className='bg-[var(--neutral-900)] p-4 rounded-lg overflow-x-auto'>
            <pre className='text-sm text-[var(--neutral-300)]'>
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
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
