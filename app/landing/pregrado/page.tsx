import ViewComponent from '@/app/_components/viewComponent/viewComponent'
import Splash from '@/app/_library/components/splash'

import Encabezado from './sections/0_encabezado'
import Datos from './sections/1_datos'
import PlanEstudio from './sections/2_planEstudio'
import Perfiles from './sections/3_perfiles'
import Diferenciales from './sections/4_diferenciales'
import Insignias from './sections/5_insignias'
//import Insignias from './sections/6_insignias'
import Experiencia from './sections/7_experiencia'
import Cita from './sections/8_cita'
import PreguntasFrecuentes from './sections/9_preguntasFrecuentes'
import Footer from './sections/10_footer'

export default function Profesional() {
  const basePath = '/landing/pregrado'

  return (
    <>
      <Encabezado />
      {/* <ViewComponent path={`${basePath}/sections/encabezado`}>
        <Encabezado />
      </ViewComponent> */}

      <Datos />
      {/* <ViewComponent path={`${basePath}/sections/1_datos`}>
        <Datos />
      </ViewComponent> */}

      {/* <PlanEstudio /> */}
      <ViewComponent path={`${basePath}/sections/2_planEstudio`}>
        <PlanEstudio />
      </ViewComponent>

      {/* <Perfiles /> */}
      <ViewComponent path={`${basePath}/sections/perfiles`}>
        <Perfiles />
      </ViewComponent>

      {/* <Diferenciales /> */}
      <ViewComponent path={`${basePath}/sections/Diferenciales`}>
        <Diferenciales />
      </ViewComponent>

      {/* <Insignias /> */}
      <ViewComponent path={`${basePath}/sections/Insignias`}>
        <Insignias />
      </ViewComponent>

      {/* <Experiencia /> */}
      <ViewComponent path={`${basePath}/sections/experiencia`}>
        <Experiencia />
      </ViewComponent>

      {/* <Cita /> */}
      <ViewComponent path={`${basePath}/sections/citaDirector`}>
        <Cita />
      </ViewComponent>

      {/*  <PreguntasFrecuentes /> */}
      <ViewComponent path={`${basePath}/sections/preguntasFrecuentes`}>
        <PreguntasFrecuentes />
      </ViewComponent>

      {/* <Footer /> */}
      <ViewComponent path={`${basePath}/sections/Footer`}>
        <Footer />
      </ViewComponent>
    </>
  )
}
