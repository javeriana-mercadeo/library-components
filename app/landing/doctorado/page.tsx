'use client'
import ViewComponent from '@/app/_components/viewComponent/viewComponent'

import VideoDoctorado from './sections/videoDoctorado'
import Proyectos from './sections/proyectos'


export default function Doctorados() {
  const basePath = '/app/landing/doctorado'
  return (
    <>

      {/* <VideoDoctorado /> */}
      <ViewComponent path={`${basePath}/sections/videoDoctorado`}>
        <VideoDoctorado />
      </ViewComponent>

            <ViewComponent path={`${basePath}/sections/proyectos`}>
        <Proyectos />
      </ViewComponent>



    </>
  )
}
