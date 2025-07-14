'use client'
import ViewComponent from '@/app/_components/viewComponent/viewComponent'
import ButtonReturn from '@/app/institutional/centroDeAyuda/sections/buttonReturn'
import NecesitasAyuda from '@/app/institutional/centroDeAyuda/sections/necesitasAyuda'
import PreguntasFrecuentes from '@/app/institutional/centroDeAyuda/sections/preguntasFrecuentes'
import VideoHelp from '@/app/institutional/centroDeAyuda/sections/videoHelp'

export default function page() {
  const basePath = '/institutional/centroDeAyuda'
  return (
    <>
      {/* <ButtonReturn /> */}
       <ViewComponent path={`${basePath}/sections/ButtonReturn`}>
        <ButtonReturn />
      </ViewComponent>

      {/* <Help /> */}
      <ViewComponent path={`${basePath}/sections/necesitasAyuda`}>
        <NecesitasAyuda />
      </ViewComponent>

      {/* <HelpQuestions />  */}
      <ViewComponent path={`${basePath}/sections/preguntasFrecuentes`}>
        <PreguntasFrecuentes />
      </ViewComponent>

      {/* <VideoHelp /> */}
      <ViewComponent path={`${basePath}/sections/videoHelp`}>
        <VideoHelp />
      </ViewComponent>


    </>



  )
}
