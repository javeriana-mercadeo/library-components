import ViewComponent from '@/app/_components/viewComponent/viewComponent'
import Splash from '@/app/_library/sections/splash'
import Btn from '@library/components/buttons/btn_general/index'

import Header from './sections/header'
import Hero from './sections/hero'
import MeetingDirector from './sections/meetingDirector'

/**
 * Componente que muestra las diferentes variantes de un botón por color
 * Incluye ejemplos de tamaños y estados deshabilitados
 */
const VariantButton = ({ color }: { color: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' }) => {
  return (
    <div className="space-y-6 mt-8 border p-4 rounded-lg bg-[var(--background-100)]">
      <div>
        <h3 className="text-xl font-bold mb-4 text-[var(--neutral-300)]">{color}</h3>

        {/* Variantes de estilo */}
        <div className="space-y-4">
          <div>
            <p className="text-sm text-[var(--neutral-500)]">Estilos</p>
            <div className="flex flex-wrap gap-2">
              <Btn color={color}>Botón normal</Btn>
              <Btn color={color} variant="outline">
                Botón Outline
              </Btn>
              <Btn color={color} variant="ghost">
                Botón Ghost
              </Btn>
              <Btn color={color} variant="link">
                Botón Link
              </Btn>
            </div>
          </div>

          {/* Variantes de tamaño */}
          <div>
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
          </div>

          {/* Variantes con íconos */}
          <div>
            <p className="text-sm text-[var(--neutral-500)] mb-2">Con íconos</p>
            <div className="flex flex-wrap gap-2">
              <Btn color={color} startIcon={<i className="ph ph-plus"></i>}>
                Con ícono inicial
              </Btn>
              <Btn color={color} endIcon={<i className="ph ph-arrow-right"></i>}>
                Con ícono final
              </Btn>
              <Btn color={color} startIcon={<i className="ph ph-plus"></i>} endIcon={<i className="ph ph-arrow-right"></i>}>
                Con íconos inicial y final
              </Btn>
            </div>
          </div>

          {/* Variantes deshabilitadas */}
          <div>
            <p className="text-sm text-[var(--neutral-500)] mb-2">Deshabilitados</p>
            <div className="flex flex-wrap gap-2">
              <Btn color={color} disabled>
                Normal deshabilitado
              </Btn>
              <Btn color={color} variant="outline" disabled>
                Outline deshabilitado
              </Btn>
              <Btn color={color} variant="ghost" disabled>
                Ghost deshabilitado
              </Btn>
              <Btn color={color} variant="link" disabled>
                Link deshabilitado
              </Btn>
            </div>
          </div>

          {/* Variante de ancho completo */}
          <div>
            <p className="text-sm text-[var(--neutral-500)] mb-2">Ancho completo</p>
            <Btn color={color} fullWidth>
              Botón de ancho completo
            </Btn>
          </div>
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

export default function Profesional() {
  return (
    <>
      <Splash />
      <Header />
      <Hero />
      <MeetingDirector />
      {/* === BOTONES POR COLOR === */}
      <h1 className="text-3xl font-bold">Botones por color</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {variantColorsButton.map((color, index) => (
          <VariantButton key={index} color={color} />
        ))}
      </div>

      {/*       <ViewComponent path="pregrado/sections/0_header">
        <Header />
      </ViewComponent>

      <ViewComponent path="/pregrado/sections/1_hero">
        <Hero />
      </ViewComponent>

      <ViewComponent path="/pregrado/sections/meetingDirector">
        <MeetingDirector />
      </ViewComponent> */}
    </>
  )
}
