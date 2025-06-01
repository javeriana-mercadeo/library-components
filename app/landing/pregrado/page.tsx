import ViewComponent from '@/app/_components/viewComponent/viewComponent'
import Splash from '@/app/_library/components/splash'

import MateriasSemestre from './sections/materiasSemestre'
import PerfilesPrograma from './sections/perfilesPrograma'
import Encabezado from './sections/encabezado'
import DatosProgramaVideo from './sections/datosProgramaVideo'
import PorQueLaJaveriana from './sections/porQueLaJaveriana'
import Reconocimientos from './sections/reconocimientos'
import MeetingDirector from './sections/citaDirector'
import ExperienciaJaveriana from './sections/experienciaJaveriana'
import PreguntasFrecuentes from './sections/preguntasFrecuentes'
import PieDePagina from './sections/pieDePagina'

export default function Profesional() {
  const basePath = '/landing/pregrado'

  return (
    <>
      <Splash />
      <Encabezado />
      {/* <ViewComponent path={`${basePath}/sections/header`}>
        <Encabezado />
      </ViewComponent> */}

      <DatosProgramaVideo />
      {/* <ViewComponent path={`${basePath}/sections/datosProgramaVideo`}>
        <DatosProgramaVideo />
      </ViewComponent> */}

      <MateriasSemestre />
      {/* <ViewComponent path={`${basePath}/sections/materiasPorSemestre`}>
        <MateriasSemestre />
      </ViewComponent> */}

      <PerfilesPrograma />
      {/* <ViewComponent path={`${basePath}/sections/perfilesPrograma`}>
        <PerfilesPrograma />
      </ViewComponent> */}

      <PorQueLaJaveriana />
      {/* <ViewComponent path={`${basePath}/sections`}>
        <PorQueLaJaveriana />
      </ViewComponent> */}

      <Reconocimientos />
      {/* <ViewComponent path={`${basePath}/reconocimientos`}>
        <Reconocimientos />
      </ViewComponent> */}

      <ExperienciaJaveriana />
      {/* <ViewComponent path={`${basePath}/sections/experienciaJaveriana`}>
        <ExperienciaJaveriana />
      </ViewComponent> */}

      <MeetingDirector />
      {/* <ViewComponent path={`${basePath}/sections/meetingDirector`}>
        <MeetingDirector />
      </ViewComponent> */}

      <PreguntasFrecuentes />
      {/* <ViewComponent path={`${basePath}/sections/preguntasFrecuentes`}>
        <PreguntasFrecuentes />
      </ViewComponent> */}

      <PieDePagina />
      {/* <ViewComponent path={`${basePath}/sections/PieDePagina`}>
        <PieDePagina />
      </ViewComponent> */}
    </>
  )
}
