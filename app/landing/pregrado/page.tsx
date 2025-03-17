import ViewComponent from '@/app/_components/viewComponent/viewComponent'
import Header from '@library/pregrado/sections/0_header'
import Hero from '@library/pregrado/sections/1_hero'
import MeetingDirector from '@library/pregrado/sections/meetingDirector'
import Splash from '@library/_general/sections/Splash'

export default function page() {
  return (
    <>
      <Splash />

      <ViewComponent path="/pregrado/sections/meetingDirector">
        <MeetingDirector />
      </ViewComponent>

      <ViewComponent path="pregrado/sections/0_header">
        <Header />
      </ViewComponent>

      <ViewComponent path="/pregrado/sections/1_hero">
        <Hero />
      </ViewComponent>
    </>
  )
}
