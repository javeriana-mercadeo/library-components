import { HeaderPartial, Footer } from '@common'

import Contenido from './contenido'

import ViewComponent from '@/components/utils/ViewComponent/viewComponent'

export default function ThankYouPage() {
  const basePath = '/institutional/thank-you-page'
  const libraryPath = '/_library/components/'

  return (
    <>
      <ViewComponent path={`${libraryPath}/header`}>
        <HeaderPartial />
      </ViewComponent>

      <ViewComponent path={`${basePath}/contenido`}>
        <Contenido />
      </ViewComponent>

      <ViewComponent path={`${libraryPath}/footer`}>
        <Footer />
      </ViewComponent>
    </>
  )
}
