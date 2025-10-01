'use client'
import ViewComponent from '@/app/_components/viewComponent/viewComponent'

import Temporizador from './sections/temporizador'
import DocentesDoctorado from './sections/docentesDoctorado'
import AprenderasDoctorado from './sections/aprenderasDoctorado'

export default function Doctorados() {
  const basePath = '/landing/open-day'
  return (
    <>
      {/* <VideoDoctorado /> */}
      <ViewComponent path={`${basePath}/sections/temporizador`}>
        <Temporizador />
      </ViewComponent>
      <ViewComponent path={`${basePath}/sections/docentesDoctorado`}>
        <DocentesDoctorado />
      </ViewComponent>

      <ViewComponent path={`${basePath}/sections/aprenderasDoctorado`}>
        <AprenderasDoctorado />
      </ViewComponent>
    </>
  )
}
