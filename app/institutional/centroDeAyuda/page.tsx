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
import Separador from '@/app/institutional/centroDeAyuda/sections/separador'
import SubTitulosHelp from '@/app/institutional/centroDeAyuda/sections/subTitulosHelp'
import TituloIndicador from '@/app/institutional/centroDeAyuda/sections/tituloIndicador'

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
        <TituloHelp />
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
      {/* separador */}
      <ViewComponent path={`${basePath}/sections/separador`}>
        <Separador />
      </ViewComponent>

      {/* subTitulosHelp */}
      <ViewComponent path={`${basePath}/sections/subTitulosHelp`}>
        <SubTitulosHelp/>
      </ViewComponent>
            {/* titulo-Indicador */}
      <ViewComponent path={`${basePath}/sections/tituloIndicador`}>
        <TituloIndicador/>
      </ViewComponent>
    </>
  )
}
