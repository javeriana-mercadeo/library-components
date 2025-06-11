import ViewComponent from '@/app/_components/viewComponent/viewComponent'

import Encabezado from './sections/0_encabezado'
import Contenido from './sections/1_contenido'

export default function ThankYouPage() {
  const basePath = '/institutional/thank-you-page'

  return (
    <>
      {/* <ViewComponent path={`${basePath}/sections/encabezado`}>
        <Encabezado />
      </ViewComponent> */}

      <ViewComponent path={`${basePath}/sections/1_contenido`}>
        <Contenido />
      </ViewComponent>
    </>
  )
}
