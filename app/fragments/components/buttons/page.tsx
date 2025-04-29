import ViewComponent from '@/app/_components/viewComponent/viewComponent'
import Splash from '@library/_general/sections/Splash'

import VariantButton from '@/app/_components/variantsButtons/variant-buttons'

/**
 * Componente que muestra las diferentes variantes de un botón por color
 * Incluye ejemplos de tamaños y estados deshabilitados
 */

const variantColorsButton: Array<'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger'> = [
  'primary',
  'secondary',
  'tertiary',
  'success',
  'warning',
  'danger'
]

export default function Buttons() {
  return (
    <>
      <Splash />
      {/* === BOTONES POR COLOR === */}
      <h1 className="text-3xl font-bold">Botones por color</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {variantColorsButton.map((color, index) => (
          <VariantButton key={index} color={color} />
        ))}
      </div>
    </>
  )
}
