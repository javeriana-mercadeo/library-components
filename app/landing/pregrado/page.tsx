'use client'

import dynamic from 'next/dynamic'

import ViewComponent from '@/components/utils/ViewComponent/viewComponent'
import { Load } from '@/components/utils'

const Header = dynamic(() => import('@library/components/header'), { ssr: false, loading: () => <Load /> })
const Datos = dynamic(() => import('./_sections/1_datos'), { ssr: false, loading: () => <Load /> })
const DobleDatos = dynamic(() => import('./_sections/1-1_dobleDatos'), { ssr: false, loading: () => <Load /> })
const PlanEstudio = dynamic(() => import('./_sections/2_planEstudio'), { ssr: false, loading: () => <Load /> })
const DoblePlanEstudio = dynamic(() => import('./_sections/2-1_doblePlanEstudio'), { ssr: false, loading: () => <Load /> })
const Perfiles = dynamic(() => import('./_sections/3_perfiles'), { ssr: false, loading: () => <Load /> })
const Diferenciales = dynamic(() => import('./_sections/4_diferenciales'), { ssr: false, loading: () => <Load /> })
// Versión original con useEffect (deprecada - no compatible Liferay)
// const Insignias = dynamic(() => import('./_sections/5_insignias'), { ssr: false, loading: () => <Load /> })
// Versión 2.0 - 100% compatible con Liferay (sin hooks) - con bugs de drag
const Insignias = dynamic(() => import('./_sections/5-1_insignias'), { ssr: false, loading: () => <Load /> })
// Versión 3.0 - Con Swiper.js - Drag robusto y sin bugs
const InsigniasSwiper = dynamic(() => import('./_sections/5-2_insignias'), { ssr: false, loading: () => <Load /> })
const Docentes = dynamic(() => import('./_sections/6_docentes'), { ssr: false, loading: () => <Load /> })
const Experiencia = dynamic(() => import('./_sections/7_experiencia'), { ssr: false, loading: () => <Load /> })
const Cita = dynamic(() => import('./_sections/8_cita'), { ssr: false, loading: () => <Load /> })
const PreguntasFrecuentes = dynamic(() => import('./_sections/9_preguntasFrecuentes'), { ssr: false, loading: () => <Load /> })
const Relacionados = dynamic(() => import('./_sections/10_relacionados'), { ssr: false, loading: () => <Load /> })
const EducacionEstrella = dynamic(() => import('./_sections/_educacionEstrella'), { ssr: false, loading: () => <Load /> })
const Becas = dynamic(() => import('./_sections/_becas'), { ssr: false, loading: () => <Load /> })
const Requisitos = dynamic(() => import('./_sections/_requisitos'), { ssr: false, loading: () => <Load /> })
const Footer = dynamic(() => import('@library/components/footer'), { ssr: false, loading: () => <Load /> })

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
