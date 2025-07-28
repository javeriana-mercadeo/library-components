import ViewComponent from '@/app/_components/viewComponent/viewComponent'

import Header from '@library/components/header'
import Contenido from './contenido'
import Footer from '@library/components/footer'

export default function ThankYouPage() {
  const basePath = '/institutional/thank-you-page'
  const libraryPath = '/_library/components/'

  return (
    <>
      <ViewComponent path={`${libraryPath}/header`}>
        <Header />
      </ViewComponent>

      <ViewComponent path={`${basePath}/sections/1_contenido`}>
        <Contenido />
      </ViewComponent>

      <ViewComponent path={`${libraryPath}/footer`}>
        <Footer />
      </ViewComponent>
    </>
  )
}
