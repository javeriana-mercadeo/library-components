import ViewComponent from '@/app/_components/viewComponent/viewComponent'
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
      <Hero />
      <MeetingDirector />

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
