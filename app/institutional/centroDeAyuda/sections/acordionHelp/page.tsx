'use client'
import ViewComponent from '@/app/_components/viewComponent/viewComponent'
import AcordionHelp from '@/app/institutional/centroDeAyuda/sections/acordionHelp'

export default function page() {
  const basePath = '/institutional/centroDeAyuda'
  return (
    <>
      {/* <ButtonReturn /> */}
       <ViewComponent path={`${basePath}/sections/acordionHelp`}>
        <AcordionHelp />
      </ViewComponent>

    </>
  )
}
