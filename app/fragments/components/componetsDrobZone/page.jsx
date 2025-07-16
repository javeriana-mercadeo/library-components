'use client'
import TituloHelp from '@/app/institutional/centroDeAyuda/sections/titulosHelp'
import ParrafoHelp from '@/app/institutional/centroDeAyuda/sections/parrafoHelp'
import ListaHelp from '@/app/institutional/centroDeAyuda/sections/listaHelp'

export default function page() {
  const basePath = '/institutional/centroDeAyuda'
  return (
    <>
      

    {/* titulo */}
           
      <ViewComponent path={`${basePath}/sections/tituloHelp`}>
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


    </>



  )
}
