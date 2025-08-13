import ViewComponent from '@/components/viewComponent/viewComponent'

import VideoDoctorado from './sections/videoDoctorado/'

export default function Profesional () {
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
