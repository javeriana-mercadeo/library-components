'use client'

// Reusable Components
import SectionTitle from '@/components/ui/SectionTitle'
import DemoCard from '@/components/ui/DemoCard'

export default function DemosPage() {
  return (
    <div className='min-h-screen bg-slate-50 py-12'>
      <div className='container mx-auto px-6'>
        <SectionTitle
          className='mb-12'
          description='Explora todos los componentes y páginas disponibles en nuestra biblioteca'
          title='Demos en Vivo'
        />

        <div className='max-w-7xl mx-auto'>
          {/* Programas Académicos */}
          <div className='mb-12'>
            <h3 className='text-2xl font-bold text-slate-800 mb-2'>Programas Académicos</h3>
            <p className='text-slate-600 mb-6'>Landing pages optimizadas para diferentes niveles educativos</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              <DemoCard
                chips={[{ label: 'Pregrados', color: 'primary' }]}
                description='Landing Pages Pregrado con formularios de inscripción y información detallada'
                icon='graduation-cap'
                image='/images/demos/pregrado-preview.png'
                route='/landing/pregrado'
                title='Pregrado'
              />
              <DemoCard
                chips={[{ label: 'Doctorados', color: 'success' }]}
                description='Páginas especializadas para programas doctorales y de investigación'
                icon='book-open'
                image='/images/demos/doctorado-preview.png'
                route='/landing/doctorado'
                title='Doctorado'
              />
              <DemoCard
                chips={[
                  { label: 'Maestrías', color: 'secondary' },
                  { label: 'Especializaciones', color: 'warning' }
                ]}
                description='Programas de posgrado con enfoque profesional y académico'
                icon='trophy'
                image='/images/demos/maestria-especializacion-preview.png'
                route='/landing/maestrias'
                title='Maestrías'
              />
              <DemoCard
                chips={[{ label: 'MBA', color: 'danger' }]}
                description='Programa ejecutivo de alta dirección empresarial'
                icon='briefcase'
                image='/images/demos/mba-preview.png'
                route='/landing/mba'
                title='MBA'
              />
            </div>
          </div>

          {/* Páginas Institucionales */}
          <div className='mb-12'>
            <h3 className='text-2xl font-bold text-slate-800 mb-2'>Páginas Institucionales</h3>
            <p className='text-slate-600 mb-6'>Páginas corporativas y de servicios para la comunidad universitaria</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              <DemoCard
                chips={[{ label: 'Eventos', color: 'primary' }]}
                description='Eventos institucionales'
                icon='calendar-star'
                route='/institutional/open-day'
                title='Open Day'
              />
              <DemoCard
                chips={[
                  { label: 'FAQ', color: 'success' },
                  { label: 'Soporte', color: 'warning' }
                ]}
                description='Soporte y ayuda'
                icon='question'
                route='/institutional/help-center'
                title='Centro de Ayuda'
              />
              <DemoCard
                chips={[{ label: 'Registro', color: 'secondary' }]}
                description='Agradecimiento - Registro'
                icon='check-circle'
                route='/institutional/thank-you-1'
                title='Thank You Page 1'
              />
              <DemoCard
                chips={[{ label: 'Solicitud', color: 'danger' }]}
                description='Agradecimiento - Solicitud'
                icon='hand-heart'
                route='/institutional/thank-you-2'
                title='Thank You Page 2'
              />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6'>
              <DemoCard
                chips={[{ label: 'Descarga', color: 'primary' }]}
                description='Agradecimiento - Descarga'
                icon='download'
                route='/institutional/thank-you-3'
                title='Thank You Page 3'
              />
            </div>
          </div>

          {/* Componentes UI */}
          <div>
            <h3 className='text-2xl font-bold text-slate-800 mb-2'>Componentes UI</h3>
            <p className='text-slate-600 mb-6'>Biblioteca de componentes reutilizables para interfaces de usuario</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              <DemoCard
                chips={[{ label: 'Botones', color: 'primary' }]}
                description='Botones y acciones'
                icon='cursor-click'
                route='/components/buttons'
                title='Buttons'
              />
              <DemoCard
                chips={[{ label: 'Modales', color: 'secondary' }]}
                description='Modales y pop-ups'
                icon='window'
                route='/components/modals'
                title='Modals'
              />
              <DemoCard
                chips={[{ label: 'Acordeones', color: 'success' }]}
                description='Acordeones y desplegables'
                icon='list-dashes'
                route='/components/accordions'
                title='Accordions'
              />
              <DemoCard
                chips={[{ label: 'Formularios', color: 'warning' }]}
                description='Formularios y inputs'
                icon='text-aa'
                route='/components/forms'
                title='Forms'
              />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6'>
              <DemoCard
                chips={[{ label: 'Tarjetas', color: 'danger' }]}
                description='Tarjetas y contenedores'
                icon='squares-four'
                route='/components/cards'
                title='Cards'
              />
              <DemoCard
                chips={[{ label: 'Navegación', color: 'primary' }]}
                description='Navegación y menús'
                icon='compass'
                route='/components/navigation'
                title='Navigation'
              />
              <DemoCard
                chips={[{ label: 'Tablas', color: 'secondary' }]}
                description='Tablas y listas'
                icon='table'
                route='/components/tables'
                title='Tables'
              />
              <DemoCard
                chips={[{ label: 'Multimedia', color: 'success' }]}
                description='Imágenes y multimedia'
                icon='image'
                route='/components/media'
                title='Media'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
