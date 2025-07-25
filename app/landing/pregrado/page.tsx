'use client'

import dynamic from 'next/dynamic'
import ViewComponent from '@/app/_components/viewComponent/viewComponent'
import Load from '@/app/_components/load/load'

// Lazy load heavy sections with client-side loading

const Encabezado = dynamic(() => import('./_sections/0_encabezado'), { ssr: false, loading: () => <Load /> })
const Datos = dynamic(() => import('./_sections/1_datos'), { ssr: false, loading: () => <Load /> })
const PlanEstudio = dynamic(() => import('./_sections/2_planEstudio'), { ssr: false, loading: () => <Load /> })
const Perfiles = dynamic(() => import('./_sections/3_perfiles'), { ssr: false, loading: () => <Load /> })
const Diferenciales = dynamic(() => import('./_sections/4_diferenciales'), { ssr: false, loading: () => <Load /> })
const Insignias = dynamic(() => import('./_sections/5_insignias'), { ssr: false, loading: () => <Load /> })
const Docentes = dynamic(() => import('./_sections/6_docentes'), { ssr: false, loading: () => <Load /> })
const Experiencia = dynamic(() => import('./_sections/7_experiencia'), { ssr: false, loading: () => <Load /> })
const Cita = dynamic(() => import('./_sections/8_cita'), { ssr: false, loading: () => <Load /> })
const PreguntasFrecuentes = dynamic(() => import('./_sections/9_preguntasFrecuentes'), { ssr: false, loading: () => <Load /> })
const Relacionados = dynamic(() => import('./_sections/10_relacionados'), { ssr: false, loading: () => <Load /> })
const Footer = dynamic(() => import('./_sections/11_footer'), { ssr: false, loading: () => <Load /> })

export default function Profesional() {
  const basePath = '/landing/pregrado'

  return (
    <>
      {/* <Encabezado /> */}
      <ViewComponent path={`${basePath}/_sections/0_encabezado`}>
        <Encabezado />
      </ViewComponent>

      {/* <Datos /> */}
      {/* <ViewComponent path={`${basePath}/_sections/1_datos`}>
        <Datos />
      </ViewComponent> */}

      {/* <PlanEstudio /> */}
      {/* <ViewComponent path={`${basePath}/_sections/2_planEstudio`}>
        <PlanEstudio />
      </ViewComponent> */}

      {/* <Perfiles /> */}
      {/* <ViewComponent path={`${basePath}/_sections/3_perfiles`}>
        <Perfiles />
      </ViewComponent> */}

      {/* <Diferenciales /> */}
      {/* <ViewComponent path={`${basePath}/_sections/4_diferenciales`}>
        <Diferenciales />
      </ViewComponent> */}

      {/* <Insignias /> */}
      {/* <ViewComponent path={`${basePath}/_sections/5_insignias`}>
        <Insignias />
      </ViewComponent> */}

      {/* <Docentes /> */}
      {/* <ViewComponent path={`${basePath}/_sections/6_docentes`}>
        <Docentes />
      </ViewComponent> */}

      {/* <Experiencia /> */}
      {/* <ViewComponent path={`${basePath}/_sections/7_experiencia`}>
        <Experiencia />
      </ViewComponent> */}

      {/* <Cita /> */}
      {/* <ViewComponent path={`${basePath}/_sections/8_cita`}>
        <Cita />
      </ViewComponent> */}

      {/*  <PreguntasFrecuentes /> */}
      {/* <ViewComponent path={`${basePath}/_sections/9_preguntasFrecuentes`}>
        <PreguntasFrecuentes />
      </ViewComponent> */}

      {/* <Relacionados /> */}
      {/* <ViewComponent path={`${basePath}/_sections/10_relacionados`}>
        <Relacionados />
      </ViewComponent> */}

      {/* <Footer /> */}
      <ViewComponent path={`${basePath}/_sections/11_footer`}>
        <Footer />
      </ViewComponent>
    </>
  )
}
