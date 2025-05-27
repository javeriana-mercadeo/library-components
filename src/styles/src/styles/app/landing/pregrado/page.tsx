import ViewComponent from '@/app/_components/viewComponent/viewComponent'
import Header from '@library/pregrado/sections/0_header'
import Hero from '@library/pregrado/sections/1_hero'

export default function page() {
  return (
    <>
      <ViewComponent path="pregrado/sections/0_header">
        <Header />
      </ViewComponent>

      <ViewComponent path="/pregrado/sections/1_hero">
        <Hero />
      </ViewComponent>
    </>
  )
}
