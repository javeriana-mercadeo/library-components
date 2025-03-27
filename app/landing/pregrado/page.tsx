import ViewComponent from '@/app/_components/viewComponent/viewComponent'
import Splash from '@library/_general/sections/Splash'

import Header from '@library/pregrado/sections/0_header'
import Hero from '@library/pregrado/sections/1_hero'
import MeetingDirector from '@library/pregrado/sections/meetingDirector'
import Btn from '@library/_general/components/buttons/btn_general'

export default function Profesional() {
  return (
    <>
      <Splash />

      <Header />

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

      <ViewComponent path="/_general/components/buttons/btn_general">
        <Btn id="1" className="c" color="primary" />
      </ViewComponent>
    </>
  )
}
