import { Header, Footer } from '@common'

import Contenido from './contenido'

import ViewComponent from '@/components/utils/ViewComponent/viewComponent'

export default function ThankYouPage() {
  const basePath = '/institutional/thank-you-page'
  const libraryPath = '/_library/components/'

  return (
    <>
      <ViewComponent path={`${libraryPath}/header`}>
        <Header />
      </ViewComponent>

      <ViewComponent path={`${basePath}/relacionameinto/_contenido`}>
        <Contenido />
      </ViewComponent>

      <ViewComponent path={`${libraryPath}/footer`}>
        <Footer />
      </ViewComponent>
    </>
  )
}
