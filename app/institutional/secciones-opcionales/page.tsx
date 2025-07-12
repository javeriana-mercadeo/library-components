'use client'
import DobleTitulacionDos from './sections/dobleTitulacionDos'
import DobleTitulacionUno from './sections/dobleTitulacionUno'
import Estudiantes from './sections/estudiantes'
import Herramientas from './sections/herramientas'
import Laboratorios from './sections/laboratorios'
import Multimedia from './sections/multimedia'
import MultimediaRedes from './sections/multimediaRedes'
import Proyectos from './sections/proyectos'

export default function SeccionesOpcionales() {
  const basePath = '/institutional/pgProjects'
  return (
    <>
      <Proyectos />
      {/* <ViewComponent path={`${basePath}/sections/proyectos`}>
        <Proyectos />
      </ViewComponent> */}

      <Laboratorios />
      {/* <ViewComponent path={`${basePath}/sections/laboratorios`}>
        <Laboratorios/>
      </ViewComponent> */}

      <Estudiantes />
      {/* <ViewComponent path={`${basePath}/sections/estudiantes`}>
        <Estudiantes />
      </ViewComponent> */}

      <Multimedia />
      {/* <ViewComponent path={`${basePath}/sections/multimedia`}>
        <Multimedia />
      </ViewComponent> */}

      <MultimediaRedes />
      {/* <ViewComponent path={`${basePath}/sections/multimediaRedes`}>
        <MultimediaRedes />
      </ViewComponent> */}

      <DobleTitulacionUno />
      {/* <ViewComponent path={`${basePath}/sections/dobleTitulacionUno`}>
        <DobleTitulacionUno />
      </ViewComponent> */}

      <DobleTitulacionDos />
      {/* <ViewComponent path={`${basePath}/sections/dobleTitulacionDos`}>
        <DobleTitulacionDos />
      </ViewComponent> */}

      <Herramientas />
      {/* <ViewComponent path={`${basePath}/sections/herramientas`}>
        <Herramientas />
      </ViewComponent> */}
    </>
  )
}
