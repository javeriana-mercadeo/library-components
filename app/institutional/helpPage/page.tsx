'use client'
import ViewComponent from '@/components/viewComponent/viewComponent'
import HelpHero from '@library/_institutional/helpHero'

export default function page() {
  const basePath = '/institutional/helpPage'

  return (
    <>
      <ViewComponent path={`${basePath}/sections/helpHero`}>
        <HelpHero />
      </ViewComponent>
    </>
  )
}
