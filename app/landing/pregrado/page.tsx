import ViewComponent from '@/app/_components/viewComponent/viewComponent'
import Splash from '@/app/_library/sections/splash'

import Header from './sections/header'
import MateriasSemestre from './sections/materiasPorSemestre'
import PerfilesPrograma from './sections/perfilesPrograma'
import DatosProgramaVideo from './sections/datosProgramaVideo'
import MeetingDirector from './sections/meetingDirector'

export default function Profesional() {
  const basePath = '/landing/pregrado'

  return (
    <>
      <Splash />
      <ViewComponent path={`${basePath}/sections/header`}>
        <Header />
      </ViewComponent>

      {/* <DatosProgramaVideo /> */}

      {/* <ViewComponent path={`${basePath}/sections/datosProgramaVideo`}>
        <DatosProgramaVideo />
      </ViewComponent> */}

      {/* <ViewComponent path={`${basePath}/sections/materiasPorSemestre`}>
        <MateriasSemestre/>
      </ViewComponent> */}
      
      <ViewComponent path={`${basePath}/sections/perfilesPrograma`}>
        <PerfilesPrograma />
      </ViewComponent>

      <ViewComponent path={`${basePath}/sections/meetingDirector`}>
        <MeetingDirector />
      </ViewComponent>

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
