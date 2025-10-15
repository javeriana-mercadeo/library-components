'use client'

import { Header, Footer } from '@common'

import Datos from './_sections/1_datos'
import DobleDatos from './_sections/1-1_dobleDatos'
import DoblePlanEstudio from './_sections/2-1_doblePlanEstudio'
import Perfiles from './_sections/3_perfiles'
import Diferenciales from './_sections/4_diferenciales'
import Insignias from './_sections/5-1_insignias'
import InsigniasSwiper from './_sections/5-2_insignias'
import Docentes from './_sections/6_docentes'
import Experiencia from './_sections/7_experiencia'
import Cita from './_sections/8_cita'
import PreguntasFrecuentes from './_sections/9_preguntasFrecuentes'
import Relacionados from './_sections/10_relacionados'
import EducacionEstrella from './_sections/_educacionEstrella'
import Becas from './_sections/_becas'
import Requisitos from './_sections/_requisitos'
import PlanEstudio from './_sections/2_planEstudio'

import ViewComponent from '@/components/utils/ViewComponent/viewComponent'

export default function Profesional() {
  const basePath = '/landing/pregrado'
  const libraryPath = '/_library/components/'

  return (
    <>
      {/* <Encabezado /> */}
      <ViewComponent path={`${libraryPath}/header`}>
        <Header />
      </ViewComponent>

      {/* <Datos /> */}
      <ViewComponent path={`${basePath}/_sections/1_datos`}>
        <Datos />
      </ViewComponent>

      {/* <DobleDatos /> */}
      <ViewComponent path={`${basePath}/_sections/1-1_dobleDatos`}>
        <DobleDatos />
      </ViewComponent>

      {/* <PlanEstudio /> */}
      <ViewComponent path={`${basePath}/_sections/2_planEstudio`}>
        <PlanEstudio />
      </ViewComponent>

      {/* <DoblePlanEstudio /> */}
      <ViewComponent path={`${basePath}/_sections/2-1_doblePlanEstudio`}>
        <DoblePlanEstudio />
      </ViewComponent>

      {/* <Perfiles /> */}
      <ViewComponent path={`${basePath}/_sections/3_perfiles`}>
        <Perfiles />
      </ViewComponent>

      {/* <Diferenciales /> */}
      <ViewComponent path={`${basePath}/_sections/4_diferenciales`}>
        <Diferenciales />
      </ViewComponent>

      <ViewComponent path={`${basePath}/_sections/5-1_insignias`}>
        <Insignias />
      </ViewComponent>

      {/* <InsigniasSwiper /> - Versión 3.0 con Swiper.js */}
      <ViewComponent path={`${basePath}/_sections/5-2_insignias`}>
        <InsigniasSwiper />
      </ViewComponent>

      {/* <Docentes /> */}
      <ViewComponent path={`${basePath}/_sections/6_docentes`}>
        <Docentes />
      </ViewComponent>

      {/* <Experiencia /> */}
      <ViewComponent path={`${basePath}/_sections/7_experiencia`}>
        <Experiencia />
      </ViewComponent>

      {/* <Cita /> */}
      <ViewComponent path={`${basePath}/_sections/8_cita`}>
        <Cita />
      </ViewComponent>

      {/* <EducacionEstrella /> */}
      <ViewComponent path={`${basePath}/_sections/_educacionEstrella`}>
        <EducacionEstrella />
      </ViewComponent>

      {/* <Becas /> */}
      <ViewComponent path={`${basePath}/_sections/_becas`}>
        <Becas />
      </ViewComponent>

      {/* <Requisitos /> */}
      <ViewComponent path={`${basePath}/_sections/_requisitos`}>
        <Requisitos />
      </ViewComponent>

      {/*  <PreguntasFrecuentes /> */}
      <ViewComponent path={`${basePath}/_sections/9_preguntasFrecuentes`}>
        <PreguntasFrecuentes />
      </ViewComponent>

      {/* <Relacionados /> */}
      <ViewComponent path={`${basePath}/_sections/10_relacionados`}>
        <Relacionados />
      </ViewComponent>

      {/* <Footer /> */}
      <ViewComponent path={`${libraryPath}/footer`}>
        <Footer />
      </ViewComponent>
    </>
  )
}
