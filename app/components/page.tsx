'use client'

import { SectionTitle } from '@/components/ui'
import { DemoCard } from '@/components/common'

export default function ComponentsPage() {
  return (
    <div className='min-h-screen bg-slate-50 py-12'>
      <div className='container mx-auto px-6'>
        <SectionTitle
          className='mb-12'
          description='Explora todos los componentes reutilizables de nuestra biblioteca de diseño'
          title='Biblioteca de Componentes'
        />

        <div className='max-w-7xl mx-auto'>
          {/* Componentes de Contención */}
          <div className='mb-12'>
            <h3 className='text-2xl font-bold text-slate-800 mb-2'>Componentes de Contención</h3>
            <p className='text-slate-600 mb-6'>Componentes básicos para estructura y contenido</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              <DemoCard
                chips={[{ label: 'Contenido', color: 'primary' }]}
                description='Componente de botones con múltiples variantes y estilos'
                icon='cursor-click'
                route='/components/buttons'
                title='Buttons'
              />
              <DemoCard
                chips={[{ label: 'Texto', color: 'secondary' }]}
                description='Componente de títulos con diferentes tamaños y colores'
                icon='text-aa'
                route='/components/titles'
                title='Titles'
              />
              <DemoCard
                chips={[{ label: 'Texto', color: 'secondary' }]}
                description='Componente de captions para textos descriptivos'
                icon='text-t'
                route='/components/captions'
                title='Captions'
              />
            </div>
          </div>

          {/* Componentes de Feedback */}
          <div className='mb-12'>
            <h3 className='text-2xl font-bold text-slate-800 mb-2'>Componentes de Feedback</h3>
            <p className='text-slate-600 mb-6'>Componentes para interacción y retroalimentación del usuario</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              <DemoCard
                chips={[{ label: 'Feedback', color: 'warning' }]}
                description='Sistema de modales reutilizables con múltiples opciones de configuración'
                icon='window'
                route='/components/modal'
                title='Modal'
              />
            </div>
          </div>

          {/* Próximamente */}
          <div className='mb-12'>
            <h3 className='text-2xl font-bold text-slate-800 mb-2'>Próximamente</h3>
            <p className='text-slate-600 mb-6'>Componentes en desarrollo que estarán disponibles pronto</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              <DemoCard
                chips={[{ label: 'Navegación', color: 'primary' }]}
                description='Componentes de navegación y menús (próximamente)'
                icon='compass'
                route='#'
                title='Navigation'
              />
              <DemoCard
                chips={[{ label: 'Formularios', color: 'success' }]}
                description='Inputs y formularios personalizados (próximamente)'
                icon='text-aa'
                route='#'
                title='Forms'
              />
              <DemoCard
                chips={[{ label: 'Contenido', color: 'secondary' }]}
                description='Componentes de tarjetas y contenedores (próximamente)'
                icon='squares-four'
                route='#'
                title='Cards'
              />
              <DemoCard
                chips={[{ label: 'Contenido', color: 'danger' }]}
                description='Acordeones y elementos desplegables (próximamente)'
                icon='list-dashes'
                route='#'
                title='Accordions'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
