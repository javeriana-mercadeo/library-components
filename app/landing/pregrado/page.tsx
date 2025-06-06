import ViewComponent from '@/app/_components/viewComponent/viewComponent'

import Encabezado from './sections/0_encabezado'
import Datos from './sections/1_datos'
import PlanEstudio from './sections/2_planEstudio'
import Perfiles from './sections/3_perfiles'
import Diferenciales from './sections/4_diferenciales'
import Insignias from './sections/5_insignias'
import Docentes from './sections/6_docentes'
import Experiencia from './sections/7_experiencia'
import Cita from './sections/8_cita'
import PreguntasFrecuentes from './sections/9_preguntasFrecuentes'
//import Relacionados from './sections/10_relacionados'
import Footer from './sections/11_footer'

export default function Profesional() {
  const basePath = '/landing/pregrado'

  return (
    <>
      {/* <Encabezado /> */}
      <ViewComponent path={`${basePath}/sections/encabezado`}>
        <Encabezado />
      </ViewComponent>

      {/* <Datos /> */}
      <ViewComponent path={`${basePath}/sections/1_datos`}>
        <Datos />
      </ViewComponent>

      {/* <PlanEstudio /> */}
      <ViewComponent path={`${basePath}/sections/2_planEstudio`}>
        <PlanEstudio />
      </ViewComponent>

      {/* <Perfiles /> */}
      <ViewComponent path={`${basePath}/sections/3_perfiles`}>
        <Perfiles />
      </ViewComponent>

      {/* <Diferenciales /> */}
      <ViewComponent path={`${basePath}/sections/4_diferenciales`}>
        <Diferenciales />
      </ViewComponent>

      {/* <Insignias /> */}
      <ViewComponent path={`${basePath}/sections/5_insignias`}>
        <Insignias />
      </ViewComponent>

      {/* <Docentes /> */}
      <ViewComponent path={`${basePath}/sections/6_docentes`}>
        <Docentes />
      </ViewComponent>

      {/* <Experiencia /> */}
      <ViewComponent path={`${basePath}/sections/7_experiencia`}>
        <Experiencia />
      </ViewComponent>

      {/* <Cita /> */}
      <ViewComponent path={`${basePath}/sections/8_cita`}>
        <Cita />
      </ViewComponent>

      {/*  <PreguntasFrecuentes /> */}
      <ViewComponent path={`${basePath}/sections/9_preguntasFrecuentes`}>
        <PreguntasFrecuentes />
      </ViewComponent>

      {/*  <Relacionados /> */}
      {/* <ViewComponent path={`${basePath}/sections/10_relacionados`}>
        <Relacionados />
      </ViewComponent> */}

      {/* <Footer /> */}
      <ViewComponent path={`${basePath}/sections/11_footer`}>
        <Footer />
      </ViewComponent>
    </>
  )
}
