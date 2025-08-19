import ViewComponent from '@/app/_components/viewComponent/viewComponent'

import VideoDoctorado from './sections/videoDoctorado'
import Investigaciones from './sections/investigaciones'

export default function Profesional() {
  const basePath = '/landing/doctorado'
  return (
    <>
      {/* <VideoDoctorado /> */}
      <ViewComponent path={`${basePath}/sections/videoDoctorado/`}>
        <VideoDoctorado />
      </ViewComponent>

      {/* <Investigaciones />
      <ViewComponent path={`${basePath}/sections/investigaciones`}>
        <Investigaciones />
      </ViewComponent> */}
    </>
  )
}
