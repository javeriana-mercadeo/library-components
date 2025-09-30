'use client'
import ViewComponent from '@/app/_components/viewComponent/viewComponent'

import VideoDoctorado from './sections/videoDoctorado'
import DocentesDoctorado from './sections/docentesDoctorado'
import AprenderasDoctorado from './sections/aprenderasDoctorado'




export default function Doctorados() {
  const basePath = '/landing/doctorado'
  return (
    <>


      <ViewComponent path={`${basePath}/sections/videoDoctorado`}>
        <VideoDoctorado />
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
