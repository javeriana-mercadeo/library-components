'use client'
import Proyectos from './sections/proyectos'
import Laboratorios from './sections/laboratorios'
import Estudiantes from './sections/estudiantes'
import Multimedia from './sections/multimedia'
import MultimediaRedes from './sections/multimediaRedes'
import DobleTitulacionUno from './sections/dobleTitulacionUno'
import DobleTitulacionDos from './sections/dobleTitulacionDos'
import Herramientas from './sections/herramientas'
<<<<<<< HEAD
import ViewComponent from '@/app/_components/viewComponent/viewComponent'

export default function SeccionesOpcionales() {
  const basePath = '/institutional/pgProjects'
=======

export default function SeccionesOpcionales() {
  const basePath = '/institutional/pgProjects'

>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
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
