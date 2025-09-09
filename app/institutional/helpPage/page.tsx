'use client'
import HelpHero from '@/components/_institutional/helpHero'
import ViewComponent from '@/components/viewComponent/viewComponent'

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
