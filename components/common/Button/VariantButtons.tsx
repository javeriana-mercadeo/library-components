import { Button } from '@components'

/**
 * Componente que muestra las diferentes variantes de un botón por color
 * Incluye ejemplos de tamaños y estados deshabilitados
 */
const VariantButton = ({ color }: { color: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' }) => {
  return (
    <div className='space-y-6 mt-8 border p-4 rounded-lg bg-[var(--background-100)]'>
      <div>
        <h3 className='text-xl font-bold mb-4 text-[var(--neutral-300)]'>{color}</h3>

        {/* Variantes de estilo */}
        <div className='space-y-4'>
          <div>
            <p className='text-sm text-[var(--neutral-500)]'>Estilos</p>
            <div className='flex flex-wrap gap-2'>
              <Button color={color}>Botón normal</Button>
              <Button color={color} variant='bordered'>
                Botón Bordered
              </Button>
              <Button color={color} variant='ghost'>
                Botón Ghost
              </Button>
              <Button color={color} variant='link'>
                Botón Link
              </Button>
            </div>
          </div>

          {/* Variantes de tamaño */}
          <div>
            <p className='text-sm text-[var(--neutral-500)] mb-2'>Tamaños</p>
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
          </div>

          {/* Variantes con íconos */}
          <div>
            <p className='text-sm text-[var(--neutral-500)] mb-2'>Con íconos</p>
            <div className='flex flex-wrap gap-2'>
              <Button color={color} startIcon={<i className='ph ph-plus' />}>
                Con ícono inicial
              </Button>
              <Button color={color} endIcon={<i className='ph ph-arrow-right' />}>
                Con ícono final
              </Button>
              <Button color={color} endIcon={<i className='ph ph-arrow-right' />} startIcon={<i className='ph ph-plus' />}>
                Con íconos inicial y final
              </Button>
            </div>
          </div>

          {/* Variantes deshabilitadas */}
          <div>
            <p className='text-sm text-[var(--neutral-500)] mb-2'>Deshabilitados</p>
            <div className='flex flex-wrap gap-2'>
              <Button disabled color={color}>
                Normal deshabilitado
              </Button>
              <Button disabled color={color} variant='bordered'>
                Bordered deshabilitado
              </Button>
              <Button disabled color={color} variant='ghost'>
                Ghost deshabilitado
              </Button>
              <Button disabled color={color} variant='link'>
                Link deshabilitado
              </Button>
            </div>
          </div>

          {/* Variante de ancho completo */}
          <div>
            <p className='text-sm text-[var(--neutral-500)] mb-2'>Ancho completo</p>
            <Button fullWidth color={color}>
              Botón de ancho completo
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VariantButton
