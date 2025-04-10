import ViewComponent from '@/app/_components/viewComponent/viewComponent'
import Splash from '@library/_general/sections/Splash'

import Header from '@library/pregrado/sections/0_header'
import Hero from '@library/pregrado/sections/1_hero'
import MeetingDirector from '@library/pregrado/sections/meetingDirector'
import Btn from '@library/_general/components/buttons/btn_general/index'

const VariantButton = ({ color }: { color: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' }) => {
  return (
    <div className="space-y-2 mt-6">
      <p className="font-semibold">{color}</p>
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
      {/* <Splash />
      <Header />
      <Hero />
      <MeetingDirector /> */}
      {/* === BOTONES POR COLOR === */}
      <h1 className="text-3xl font-bold">Botones por color</h1>
      <div className="flex flex-wrap flex-col items-center justify-center w-full h-screen gap-2 ">
        {variantColorsButton.map((color, index) => (kwk
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
