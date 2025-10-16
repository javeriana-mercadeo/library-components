import { HeaderSimple, Footer } from '@common'

import Banner_1 from './_sections/banner_1'

import ViewComponent from '@/components/utils/ViewComponent/viewComponent'

export default function Profesional() {
  const basePath = '/openday'
  const libraryPath = '/_library/components/'

  return (
    <>
      {/* <Encabezado /> */}
      <ViewComponent path={`${libraryPath}/header_simple`}>
        <HeaderSimple />
      </ViewComponent>

      {/* <Banner 1 /> */}
      <ViewComponent path={`${basePath}/_sections/banner_1`}>
        <Banner_1 />
      </ViewComponent>

      {/* <Footer /> */}
      <ViewComponent path={`${libraryPath}/footer`}>
        <Footer />
      </ViewComponent>
    </>
  )
}
