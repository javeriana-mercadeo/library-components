'use client'
import ViewComponent from '@/app/_components/viewComponent/viewComponent'
import ButtonReturn from '@/app/institutional/centroDeAyuda/sections/buttonReturn'
import NecesitasAyuda from '@/app/institutional/centroDeAyuda/sections/necesitasAyuda'
import PreguntasFrecuentes from '@/app/institutional/centroDeAyuda/sections/preguntasFrecuentes'
import VideoHelp from '@/app/institutional/centroDeAyuda/sections/videoHelp'
import TituloHelp from '@/app/institutional/centroDeAyuda/sections/titulosHelp'
import ParrafoHelp from '@/app/institutional/centroDeAyuda/sections/parrafoHelp'
import ListaHelp from '@/app/institutional/centroDeAyuda/sections/listaHelp'
import ListaNhelp from '@/app/institutional/centroDeAyuda/sections/listaNhelp'

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

    {/* titulo */}
           
      <ViewComponent path={`${basePath}/sections/titulosHelp`}>
        <TituloHelp/>
      </ViewComponent>

     {/* parrafo */}

      <ViewComponent path={`${basePath}/sections/parrafoHelp`}>
        <ParrafoHelp />
      </ViewComponent>

      {/* lista */}

      <ViewComponent path={`${basePath}/sections/listaHelp`}>
        <ListaHelp />
      </ViewComponent>

      <ViewComponent path={`${basePath}/sections/listaNhelp`}>
        <ListaNhelp />
      </ViewComponent>
    </>



  )
}
