'use client'
import ViewComponent from '@/app/_components/viewComponent/viewComponent'
import AcordionHelpdropzone from '@/app/institutional/centroDeAyuda/sections/acordionHelpDropZone'

export default function page() {
  const basePath = '/institutional/centroDeAyuda'
  return (
    <>
      {/* <ButtonReturn /> */}
       <ViewComponent path={`${basePath}/sections/acordionHelpDropZone`}>
        <AcordionHelpdropzone />
      </ViewComponent>

    </>
  )
}
