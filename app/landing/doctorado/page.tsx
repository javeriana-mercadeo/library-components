'use client'

import dynamic from 'next/dynamic'

import ViewComponent from '@/components/viewComponent/viewComponent'
import Load from '@/components/load/load'

// Lazy load heavy sections with client-side loading

const Header = dynamic(() => import('@library/components/header'), { ssr: false, loading: () => <Load /> })
const VideoDoctorado = dynamic(() => import('./sections/videoDoctorado'), { ssr: false, loading: () => <Load /> })
const Investigaciones = dynamic(() => import('./sections/investigaciones'), { ssr: false, loading: () => <Load /> })
const RedesSociales = dynamic(() => import('./sections/redesSociales'), { ssr: false, loading: () => <Load /> })
const Snies = dynamic(() => import('./sections/Snies'), { ssr: false, loading: () => <Load /> })

export default function Doctorado() {
  const basePath = '/landing/doctorado'
  const libraryPath = '/_library/components/'

  return (
    <>
      {/* <Encabezado /> */}
      {/* <ViewComponent path={`${libraryPath}/header`}>
        <Header />
      </ViewComponent> */}

      {/* <VideoDoctorado /> */}
      {/* <ViewComponent path={`${basePath}/sections/videoDoctorado`}>
        <VideoDoctorado />
      </ViewComponent> */}

      {/* <Investigaciones /> */}
      <ViewComponent path={`${basePath}/sections/investigaciones`}>
        <Investigaciones />
      </ViewComponent>

      {/* <RedesSociales /> */}
      <ViewComponent path={`${basePath}/sections/redesSociales`}>
        <RedesSociales />
      </ViewComponent>

      {/* <Snies /> */}
      <ViewComponent path={`${basePath}/sections/Snies`}>
        <Snies />
      </ViewComponent>
    </>
  )
}
