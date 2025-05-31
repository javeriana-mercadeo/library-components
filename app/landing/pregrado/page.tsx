import ViewComponent from '@/app/_components/viewComponent/viewComponent'
import Splash from '@/app/_library/components/splash'

import Header from './sections/encabezado'
import DatosProgramaVideo from './sections/datosProgramaVideo'
import MeetingDirector from './sections/citaDirector'

export default function Profesional() {
  const basePath = '/landing/pregrado'

  return (
    <>
      <Splash />
      <Header />
      {/* <ViewComponent path={`${basePath}/sections/header`}>
        <Header />
      </ViewComponent> */}

      <DatosProgramaVideo />
      {/* <ViewComponent path={`${basePath}/sections/datosProgramaVideo`}>
        <DatosProgramaVideo />
      </ViewComponent> */}

      <MeetingDirector />
      {/* <ViewComponent path={`${basePath}/sections/meetingDirector`}>
        <MeetingDirector />
      </ViewComponent> */}

      {/*       <ViewComponent path="pregrado/sections/0_header">
        <Header />
      </ViewComponent>

      <ViewComponent path="/pregrado/sections/1_hero">
        <Hero />
      </ViewComponent>

      <ViewComponent path="/pregrado/sections/meetingDirector">
        <MeetingDirector />
      </ViewComponent> */}
    </>
  )
}
