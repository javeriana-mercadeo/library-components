import ViewComponent from '@/app/_components/viewComponent/viewComponent'
import Button from '@/app/_library/components/buttons/btn_general/index'
import Splash from '@/app/_library/sections/splash'

import Header from './sections/header'
import Hero from './sections/hero'
import MeetingDirector from './sections/meetingDirector'

export default function Profesional() {
  const basePath = '/landing/pregrado'

  return (
    <>
      <Splash />
      <ViewComponent path={`${basePath}/sections/header`}>
        <Header />
      </ViewComponent>

      <ViewComponent path={`${basePath}/sections/hero`}>
        <Hero />
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
