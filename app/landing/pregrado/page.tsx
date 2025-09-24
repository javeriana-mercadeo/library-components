'use client'

import dynamic from 'next/dynamic'
<<<<<<< HEAD
import ViewComponent from '@/app/_components/viewComponent/viewComponent'
import Load from '@/app/_components/load/load'
import Logo from '@/app/_components/Logo/Logo.jsx'
import Content from '@/app/_components/Logo/components/Content'

// Lazy load heavy sections with client-side loading
const Encabezado = dynamic(() => import('./_sections/0_encabezado'), { ssr: false, loading: () => <Load /> })
const Datos = dynamic(() => import('./_sections/1_datos'), { ssr: false, loading: () => <Load /> })
const PlanEstudio = dynamic(() => import('./_sections/2_planEstudio'), { ssr: false, loading: () => <Load /> })
=======
import ViewComponent from '@/components/viewComponent/viewComponent'
import Load from '@/components/load/load'

import Popup from '@/app/_components/popup/Popup'

const Header = dynamic(() => import('@library/components/header'), { ssr: false, loading: () => <Load /> })
const Datos = dynamic(() => import('./_sections/1_datos'), { ssr: false, loading: () => <Load /> })
const DobleDatos = dynamic(() => import('./_sections/1-1_dobleDatos'), { ssr: false, loading: () => <Load /> })
const PlanEstudio = dynamic(() => import('./_sections/2_planEstudio'), { ssr: false, loading: () => <Load /> })
const DoblePlanEstudio = dynamic(() => import('./_sections/2-1_doblePlanEstudio'), { ssr: false, loading: () => <Load /> })
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
const Perfiles = dynamic(() => import('./_sections/3_perfiles'), { ssr: false, loading: () => <Load /> })
const Diferenciales = dynamic(() => import('./_sections/4_diferenciales'), { ssr: false, loading: () => <Load /> })
const Insignias = dynamic(() => import('./_sections/5_insignias'), { ssr: false, loading: () => <Load /> })
const Docentes = dynamic(() => import('./_sections/6_docentes'), { ssr: false, loading: () => <Load /> })
const Experiencia = dynamic(() => import('./_sections/7_experiencia'), { ssr: false, loading: () => <Load /> })
const Cita = dynamic(() => import('./_sections/8_cita'), { ssr: false, loading: () => <Load /> })
const PreguntasFrecuentes = dynamic(() => import('./_sections/9_preguntasFrecuentes'), { ssr: false, loading: () => <Load /> })
const Relacionados = dynamic(() => import('./_sections/10_relacionados'), { ssr: false, loading: () => <Load /> })
<<<<<<< HEAD
const Footer = dynamic(() => import('./_sections/11_footer'), { ssr: false, loading: () => <Load /> })
=======
const EducacionEstrella = dynamic(() => import('./_sections/_educacionEstrella'), { ssr: false, loading: () => <Load /> })
const Becas = dynamic(() => import('./_sections/_becas'), { ssr: false, loading: () => <Load /> })
const Requisitos = dynamic(() => import('./_sections/_requisitos'), { ssr: false, loading: () => <Load /> })
const Footer = dynamic(() => import('@library/components/footer'), { ssr: false, loading: () => <Load /> })
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3

export default function Profesional() {
  const basePath = '/landing/pregrado'
  const libraryPath = '/_library/components/'

  return (
    <>
      {/* <Encabezado /> */}
<<<<<<< HEAD
      <ViewComponent path={`${basePath}/_sections/0_encabezado`}>
        <Encabezado />
=======
      <ViewComponent path={`${libraryPath}/header`}>
        <Header />
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
      </ViewComponent>

      {/* <Datos /> */}
      <ViewComponent path={`${basePath}/_sections/1_datos`}>
        <Datos />
      </ViewComponent>

<<<<<<< HEAD
      {/* <PlanEstudio /> */}
      <ViewComponent path={`${basePath}/_sections/2_planEstudio`}>
        <PlanEstudio />
      </ViewComponent>

=======
      {/* <DobleDatos /> */}
      <ViewComponent path={`${basePath}/_sections/1-1_dobleDatos`}>
        <DobleDatos />
      </ViewComponent>

      {/* <PlanEstudio /> */}
      <ViewComponent path={`${basePath}/_sections/2_planEstudio`}>
        <PlanEstudio />
      </ViewComponent>

>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
      {/* <ViewComponent path={`${basePath}/_sections/2_planEstudio`}>
        <Logo width={14} height={10}> <Content/> </Logo>
      </ViewComponent> */}

      {/* <Perfiles /> */}
      <ViewComponent path={`${basePath}/_sections/3_perfiles`}>
        <Perfiles />
      </ViewComponent>

      {/* <Diferenciales /> */}
      <ViewComponent path={`${basePath}/_sections/4_diferenciales`}>
        <Diferenciales />
      </ViewComponent>

      {/* <Insignias /> */}
      <ViewComponent path={`${basePath}/_sections/5_insignias`}>
        <Insignias />
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

<<<<<<< HEAD
=======
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

>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
      {/*  <PreguntasFrecuentes /> */}
      <ViewComponent path={`${basePath}/_sections/9_preguntasFrecuentes`}>
        <PreguntasFrecuentes />
      </ViewComponent>

      {/* <Relacionados /> */}
<<<<<<< HEAD
      {/* <ViewComponent path={`${basePath}/_sections/10_relacionados`}>
        <Relacionados />
      </ViewComponent> */}

      {/* <Footer /> */}
      <ViewComponent path={`${basePath}/_sections/11_footer`}>
        <Footer />
      </ViewComponent>
=======
      <ViewComponent path={`${basePath}/_sections/10_relacionados`}>
        <Relacionados />
      </ViewComponent>

      {/* <Footer /> */}
      <ViewComponent path={`${libraryPath}/footer`}>
        <Footer />
      </ViewComponent>

      {/* Popup Component */}
      <ViewComponent path='/app/_components/popup'>
        <Popup />
      </ViewComponent>
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
    </>
  )
}
