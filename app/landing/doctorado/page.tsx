'use client'

import dynamic from 'next/dynamic'

import ViewComponent from '@/components/utils/ViewComponent/viewComponent'
import Load from '@/components/utils/Load'

// Lazy load heavy sections with client-side loading

const Header = dynamic(() => import('@library/components/header'), { ssr: false, loading: () => <Load /> })
const Video = dynamic(() => import('./sections/1_video'), { ssr: false, loading: () => <Load /> })
const Proyectos = dynamic(() => import('../../institutional/secciones-opcionales/sections/proyectos'), {
  ssr: false,
  loading: () => <Load />
})
const DocentesDoctorado = dynamic(() => import('./sections/docentesDoctorado'), { ssr: false, loading: () => <Load /> })
const QueAprenderas = dynamic(() => import('./sections/queAprenderas'), { ssr: false, loading: () => <Load /> })
const Investigaciones = dynamic(() => import('./sections/investigaciones'), { ssr: false, loading: () => <Load /> })
const RedesSociales = dynamic(() => import('./sections/redesSociales'), { ssr: false, loading: () => <Load /> })
const Snies = dynamic(() => import('./sections/Snies'), { ssr: false, loading: () => <Load /> })

export default function Doctorado() {
  const basePath = '/landing/doctorado'
  const optionalPath = '/institutional/secciones-opcionales'

  return (
    <>
      <Header />
      {/* <ViewComponent path={`${libraryPath}/header`}>
        <Header />
      </ViewComponent> */}

      {/* <Video /> */}
      <ViewComponent path={`${basePath}/sections/1_video`}>
        <Video />
      </ViewComponent>

      <Proyectos />
      {/* <ViewComponent path={`${optionalPath}/sections/proyectos`}>
        <Proyectos />
      </ViewComponent> */}

      {/* <DocentesDoctorado /> */}
      <ViewComponent path={`${basePath}/sections/docentesDoctorado`}>
        <DocentesDoctorado />
      </ViewComponent>

      <ViewComponent path={`${basePath}/sections/queAprenderas`}>
        <QueAprenderas />
      </ViewComponent>

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
