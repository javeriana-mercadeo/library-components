'use client'

import Header from '@library/components/header'

import Proyectos from '../../institutional/secciones-opcionales/sections/proyectos'

import Video from './_sections/video'
import DocentesDoctorado from './_sections/docentesDoctorado'
import QueAprenderas from './_sections/queAprenderas'
import Investigaciones from './_sections/investigaciones'
import RedesSociales from './_sections/redesSociales'
import Snies from './_sections/Snies'

import ViewComponent from '@/components/utils/ViewComponent/viewComponent'

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
      <ViewComponent path={`${basePath}/_sections/video`}>
        <Video />
      </ViewComponent>

      <Proyectos />
      {/* <ViewComponent path={`${optionalPath}/sections/proyectos`}>
        <Proyectos />
      </ViewComponent> */}

      {/* <DocentesDoctorado /> */}
      {/* <ViewComponent path={`${basePath}/sections/docentesDoctorado`}>
        <DocentesDoctorado />
      </ViewComponent> */}

      {/* <ViewComponent path={`${basePath}/sections/queAprenderas`}>
        <QueAprenderas />
      </ViewComponent> */}

      {/* <Investigaciones /> */}
      {/* <ViewComponent path={`${basePath}/sections/investigaciones`}>
        <Investigaciones />
      </ViewComponent> */}

      {/* <RedesSociales /> */}
      {/* <ViewComponent path={`${basePath}/sections/redesSociales`}>
        <RedesSociales />
      </ViewComponent> */}

      {/* <Snies /> */}
      {/* <ViewComponent path={`${basePath}/sections/Snies`}>
        <Snies />
      </ViewComponent> */}
    </>
  )
}
