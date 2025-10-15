import HeaderSimple from '@/app/common/headerSimple'
import Footer from '@/app/common/footer'

import EventosForm from './form'

import ViewComponent from '@/components/viewComponent/viewComponent'

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
