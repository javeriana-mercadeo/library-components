'use client'

// Reusable Components
import SectionTitle from '@/components/ui/SectionTitle'
import DemoCard from '@/components/ui/DemoCard'

export default function DemosPage() {
  return (
    <div className='min-h-screen bg-slate-50 py-12'>
      <div className='container mx-auto px-6'>
        <SectionTitle
          title='Demos en Vivo'
          description='Explora todos los componentes y páginas disponibles en nuestra biblioteca'
          className='mb-12'
        />

        <div className='max-w-7xl mx-auto'>
          {/* Programas Académicos */}
          <div className='mb-12'>
            <h3 className='text-2xl font-bold text-slate-800 mb-2'>Programas Académicos</h3>
            <p className='text-slate-600 mb-6'>Landing pages optimizadas para diferentes niveles educativos</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              <DemoCard
                title='Pregrado'
                icon='graduation-cap'
                description='Landing Pages Pregrado con formularios de inscripción y información detallada'
                route='/landing/pregrado'
                image='/images/demos/pregrado-preview.jpg'
                chips={[{ label: 'Pregrados', color: 'primary' }]}
              />
              <DemoCard
                title='Doctorado'
                icon='book-open'
                description='Páginas especializadas para programas doctorales y de investigación'
                route='/landing/doctorado'
                image='/images/demos/doctorado-preview.jpg'
                chips={[{ label: 'Doctorados', color: 'success' }]}
              />
              <DemoCard
                title='Maestrías'
                icon='trophy'
                description='Programas de posgrado con enfoque profesional y académico'
                route='/landing/maestrias'
                image='/images/demos/maestrias-preview.jpg'
                chips={[
                  { label: 'Maestrías', color: 'secondary' },
                  { label: 'Especializaciones', color: 'warning' }
                ]}
              />
              <DemoCard
                title='MBA'
                icon='briefcase'
                description='Programa ejecutivo de alta dirección empresarial'
                route='/landing/mba'
                image='/images/demos/mba-preview.jpg'
                chips={[{ label: 'MBA', color: 'danger' }]}
              />
            </div>
          </div>

          {/* Páginas Institucionales */}
          <div className='mb-12'>
            <h3 className='text-2xl font-bold text-slate-800 mb-2'>Páginas Institucionales</h3>
            <p className='text-slate-600 mb-6'>Páginas corporativas y de servicios para la comunidad universitaria</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              <DemoCard
                title='Open Day'
                icon='calendar-star'
                description='Eventos institucionales'
                route='/institutional/open-day'
                chips={[{ label: 'Eventos', color: 'primary' }]}
              />
              <DemoCard
                title='Centro de Ayuda'
                icon='question'
                description='Soporte y ayuda'
                route='/institutional/help-center'
                chips={[
                  { label: 'FAQ', color: 'success' },
                  { label: 'Soporte', color: 'warning' }
                ]}
              />
              <DemoCard
                title='Thank You Page 1'
                icon='check-circle'
                description='Agradecimiento - Registro'
                route='/institutional/thank-you-1'
                chips={[{ label: 'Registro', color: 'secondary' }]}
              />
              <DemoCard
                title='Thank You Page 2'
                icon='hand-heart'
                description='Agradecimiento - Solicitud'
                route='/institutional/thank-you-2'
                chips={[{ label: 'Solicitud', color: 'danger' }]}
              />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6'>
              <DemoCard
                title='Thank You Page 3'
                icon='download'
                description='Agradecimiento - Descarga'
                route='/institutional/thank-you-3'
                chips={[{ label: 'Descarga', color: 'primary' }]}
              />
            </div>
          </div>

          {/* Componentes UI */}
          <div>
            <h3 className='text-2xl font-bold text-slate-800 mb-2'>Componentes UI</h3>
            <p className='text-slate-600 mb-6'>Biblioteca de componentes reutilizables para interfaces de usuario</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              <DemoCard
                title='Buttons'
                icon='cursor-click'
                description='Botones y acciones'
                route='/components/buttons'
                chips={[{ label: 'Botones', color: 'primary' }]}
              />
              <DemoCard
                title='Modals'
                icon='window'
                description='Modales y pop-ups'
                route='/components/modals'
                chips={[{ label: 'Modales', color: 'secondary' }]}
              />
              <DemoCard
                title='Accordions'
                icon='list-dashes'
                description='Acordeones y desplegables'
                route='/components/accordions'
                chips={[{ label: 'Acordeones', color: 'success' }]}
              />
              <DemoCard
                title='Forms'
                icon='text-aa'
                description='Formularios y inputs'
                route='/components/forms'
                chips={[{ label: 'Formularios', color: 'warning' }]}
              />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6'>
              <DemoCard
                title='Cards'
                icon='squares-four'
                description='Tarjetas y contenedores'
                route='/components/cards'
                chips={[{ label: 'Tarjetas', color: 'danger' }]}
              />
              <DemoCard
                title='Navigation'
                icon='compass'
                description='Navegación y menús'
                route='/components/navigation'
                chips={[{ label: 'Navegación', color: 'primary' }]}
              />
              <DemoCard
                title='Tables'
                icon='table'
                description='Tablas y listas'
                route='/components/tables'
                chips={[{ label: 'Tablas', color: 'secondary' }]}
              />
              <DemoCard
                title='Media'
                icon='image'
                description='Imágenes y multimedia'
                route='/components/media'
                chips={[{ label: 'Multimedia', color: 'success' }]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}