'use client'
import { UniversalComponent as UC, Container } from '@library/components'

import GlobalAssets from '@library/_configurations/globalAssets'
import StateProgram from '@library/_configurations/stateProgram'
import LoadTheme from '@library/_configurations/loadTheme'
import LoadProgram from '@library/_configurations/loadProgram'
import SelectWhatsapp from '@library/_configurations/selectWhatsapp'
import selectWhatsappGral from '@library/_configurations/selectWhatsapp_gral'
import Splash from '@library/components/splash'
import ViewComponent from '../viewComponent/viewComponent'

export default function ConfigurationSection() {
  return (
    <div className='bg-[var(--background-100)] py-8 w-full'>
      <Container className='max-w-6xl'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-[var(--neutral-200)] mb-2'>Componentes de Configuración</h1>
          <p className='text-[var(--neutral-400)] mx-auto'>
            Área de trabajo para componentes de configuración y herramientas de desarrollo.
          </p>
        </div>

        {/* Contenedor para componentes */}
        <div className='p-6 bg-[var(--background-200)] rounded-lg border border-[var(--neutral-700)] min-h-[400px]'>
          <div className='flex items-start gap-3 mb-4'>
            <i className='ph ph-code text-[var(--primary-600)] mt-1 text-xl'></i>
            <div className='text-sm'>
              <p className='font-medium text-[var(--neutral-200)] mb-1'>🛠️ Área de Componentes</p>
              <p className='text-[var(--neutral-400)]'>
                Agrega tus componentes de configuración aquí. Se renderizarán automáticamente dentro de este contenedor.
              </p>
            </div>
          </div>

          {/* Contenedor donde se renderizan los componentes */}
          <div className='component-container bg-[var(--background-100)] rounded-lg p-4 border border-[var(--neutral-800)] min-h-[300px]'>
            <ViewComponent path='/_library/_configurations/globalAssets'>
              <GlobalAssets />
            </ViewComponent>

            <ViewComponent path='/_library/_configurations/stateProgram'>
              <StateProgram />
            </ViewComponent>

            <ViewComponent path='/_library/_configurations/loadTheme'>
              <LoadTheme />
            </ViewComponent>

            <ViewComponent path='/_library/_configurations/loadProgram'>
              <LoadProgram />
            </ViewComponent>

            <ViewComponent path='/_library/_configurations/selectWhatsapp'>
              <SelectWhatsapp />
            </ViewComponent>

            <ViewComponent path='/_library/_configurations/selectWhatsapp_gral'>
              <selectWhatsappGral />
            </ViewComponent>

            <ViewComponent path='/_library/components/splash'>
              <Splash />
            </ViewComponent>
          </div>
        </div>
      </Container>
    </div>
  )
}
