import ViewComponent from '@/app/_components/viewComponent/viewComponent'

import HeaderSimple from '@library/components/header_simple'
import EventosForm from './form'
import Footer from '@library/components/footer'

export default function EventosRelacionamientoPage() {
  const basePath = '/institutional/eventos-relacionamiento'
  const libraryPath = '/_library/components/'

  return (
    <>
      <ViewComponent path={`${libraryPath}/header_simple`}>
        <HeaderSimple />
      </ViewComponent>

      <ViewComponent path={`${basePath}/form`}>
        <EventosForm />
      </ViewComponent>

      <ViewComponent path={`${libraryPath}/footer`}>
        <Footer />
      </ViewComponent>
    </>
  )
}
