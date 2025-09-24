'use client'

import dynamic from 'next/dynamic'

import ViewComponent from '@/components/viewComponent/viewComponent'
import Load from '@/components/load/load'

const Header = dynamic(() => import('@library/components/header_simple'), { ssr: false, loading: () => <Load /> })
const Banner_1 = dynamic(() => import('./_sections/banner_1'), { ssr: false, loading: () => <Load /> })
const Footer = dynamic(() => import('@library/components/footer'), { ssr: false, loading: () => <Load /> })

export default function Profesional() {
  const basePath = '/openday'
  const libraryPath = '/_library/components/'

  return (
    <>
      {/* <Encabezado /> */}
      <ViewComponent path={`${libraryPath}/header_simple`}>
        <Header />
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
