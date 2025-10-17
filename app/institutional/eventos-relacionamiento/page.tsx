import { HeaderSimple, Footer } from '@common'

import EventosForm from './form'

import ViewComponent from '@/components/utils/ViewComponent/viewComponent'

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
