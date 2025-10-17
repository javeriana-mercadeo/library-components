'use client'

// Reusable Components
import { SectionTitle } from '@/components/ui'
import { DemoCard } from '@/components/common'

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
              <DemoCard
                chips={[{ label: 'Evento', color: 'primary' }]}
                description='Landing page para Expo Javeriana 2026 - Registro de grupos de estudiantes'
                icon='presentation'
                route='/institutional/expoJaverianaPrg'
                title='Expo Javeriana Pregrados'
              />
            </div>
          </div>

          {/* Secciones y Fragmentos */}
          <div>
            <h3 className='text-2xl font-bold text-slate-800 mb-2'>Secciones y Fragmentos</h3>
            <p className='text-slate-600 mb-6'>Secciones reutilizables y fragmentos de páginas</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              <DemoCard
                chips={[{ label: 'Hero', color: 'primary' }]}
                description='Secciones hero y banners principales'
                icon='image-square'
                route='/fragments/heroes'
                title='Heroes'
              />
              <DemoCard
                chips={[{ label: 'Features', color: 'secondary' }]}
                description='Secciones de características y beneficios'
                icon='star'
                route='/fragments/features'
                title='Features'
              />
              <DemoCard
                chips={[{ label: 'CTA', color: 'success' }]}
                description='Call to actions y conversión'
                icon='megaphone'
                route='/fragments/cta'
                title='Call to Actions'
              />
              <DemoCard
                chips={[{ label: 'Testimonials', color: 'warning' }]}
                description='Testimonios y reseñas'
                icon='chat-circle'
                route='/fragments/testimonials'
                title='Testimonials'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
