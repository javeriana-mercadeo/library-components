'use client'

import dynamic from 'next/dynamic'

import ViewComponent from '@/components/utils/ViewComponent/viewComponent'
import { Load } from '@/components/utils'

const Seccion_banner = dynamic(() => import('./_sections/_seccion_banner'), { ssr: false, loading: () => <Load /> })
const Seccion_diferenciales = dynamic(() => import('./_sections/_seccion_diferenciales'), { ssr: false, loading: () => <Load /> })


export default function Profesional() {
  const basePath = '/landing/maestria-especializacion'
  const libraryPath = '/_library/components/'

  return (
    <>

      {/* <Seccion_banner /> */}
      <ViewComponent path={`${basePath}/_sections/_seccion_banner`}>
        <Seccion_banner />
      </ViewComponent>

            {/* <Seccion_diferenciales /> */}
      <ViewComponent path={`${basePath}/_sections/_seccion_diferenciales`}>
        <Seccion_diferenciales />
      </ViewComponent>
    </>
  )
}

