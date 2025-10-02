'use client'

import dynamic from 'next/dynamic'

import ViewComponent from '@/components/utils/ViewComponent/viewComponent'
import { Load } from '@/components/utils'

const HeaderExpo = dynamic(() => import('./_sections/1_header'), { ssr: false, loading: () => <Load /> })
const DiferencialesForm = dynamic(() => import('./_sections/2_diferencialesForm'), { ssr: false, loading: () => <Load /> })
const DatosExpo = dynamic(() => import('./_sections/3_datos'), { ssr: false, loading: () => <Load /> })
const BlogExpo = dynamic(() => import('./_sections/4_blog'), { ssr: false, loading: () => <Load /> })
const FooterExpo = dynamic(() => import('./_sections/5_footer'), { ssr: false, loading: () => <Load /> })

export default function ExpoJaverianaPregrados() {
  const basePath = '/institutional/expoJaverianaPrg'

  return (
    <>
      {/* Header */}
      <ViewComponent path={`${basePath}/_sections/1_header`}>
        <HeaderExpo />
      </ViewComponent>

      {/* Diferenciales y Formulario */}
      <ViewComponent path={`${basePath}/_sections/2_diferencialesForm`}>
        <DiferencialesForm />
      </ViewComponent>

      {/* Datos/Estadísticas */}
      <ViewComponent path={`${basePath}/_sections/3_datos`}>
        <DatosExpo />
      </ViewComponent>

      {/* Blog */}
      <ViewComponent path={`${basePath}/_sections/4_blog`}>
        <BlogExpo />
      </ViewComponent>

      {/* Footer */}
      <ViewComponent path={`${basePath}/_sections/5_footer`}>
        <FooterExpo />
      </ViewComponent>
    </>
  )
}
