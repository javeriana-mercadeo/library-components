'use client'
import ViewComponent from '@/app/_components/viewComponent/viewComponent'

import VideoDoctorado from './sections/videoDoctorado'



export default function Doctorados() {
  const basePath = '/landing/doctorado'
  return (
    <>

      {/* <VideoDoctorado /> */}
      <ViewComponent path={`${basePath}/sections/videoDoctorado`}>
        <VideoDoctorado />
      </ViewComponent>


    </>
  )
}
