'use client'

import { Card, CardBody, CardFooter, Button } from '@heroui/react'
import Link from 'next/link'

export default function ComponentCatalog({ selectedTab }) {
  const landingPages = [
    {
      name: 'Pregrado',
      path: '/landing/pregrado',
      icon: 'ph-graduation-cap',
      description: 'Landing page para programas de pregrado'
    },
    {
      name: 'Maestría y Especialización',
      path: '/landing/maestria-especializacion',
      icon: 'ph-certificate',
      description: 'Landing page para maestrías y especializaciones'
    },
    {
      name: 'MBA',
      path: '/landing/mba',
      icon: 'ph-briefcase',
      description: 'Landing page para programas MBA'
    },
    {
      name: 'Doctorado',
      path: '/landing/doctorado',
      icon: 'ph-student',
      description: 'Landing page para programas de doctorado'
    },
    {
      name: 'Eclesiásticos',
      path: '/landing/eclesiasticos',
      icon: 'ph-cross',
      description: 'Landing page para programas eclesiásticos'
    }
  ]

  const institutionalPages = [
    {
      name: 'Centro de ayuda',
      path: '/institutional/centro-ayuda',
      icon: 'ph-lifebuoy',
      description: 'Página de centro de ayuda y soporte'
    },
    {
      name: 'Secciones opcionales',
      path: '/institutional/secciones-opcionales',
      icon: 'ph-gear-six',
      description: 'Configuración de secciones opcionales'
    },
    {
      name: 'Thank you page',
      path: '/institutional/thank-you-page',
      icon: 'ph-check-circle',
      description: 'Página de agradecimiento post-conversión'
    },
    {
      name: 'Artículos',
      path: '/institutional/articulos',
      icon: 'ph-newspaper',
      description: 'Gestión y visualización de artículos'
    }
  ]

  // Ahora uiComponents es una lista directa como las demás
  const uiComponents = [
    {
      name: 'Botón',
      path: '/fragments/components/buttons',
      icon: 'ph-cursor-click',
      description: 'Página de demostración del componente botón'
    },
    {
      name: 'Título',
      path: '/fragments/components/titles',
      icon: 'ph-text-h-one',
      description: 'Página de demostración del componente título'
    },
    {
      name: 'Párrafo',
      path: '/fragments/components/paragraph',
      icon: 'ph-text-align-left',
      description: 'Página de demostración del componente párrafo'
    },
    {
      name: 'Caption',
      path: '/fragments/components/captions',
      icon: 'ph-quotes',
      description: 'Página de demostración del componente caption'
    },
    {
      name: 'Imagen de Fondo',
      path: '/fragments/components/imgBackground',
      icon: 'ph-image',
      description: 'Página de demostración del componente imagen de fondo'
    }
  ]

  // Componente unificado - ahora más simple
  const UnifiedCard = ({ item, type }) => {
    const getButtonText = () => {
      switch (type) {
        case 'component':
          return 'Ver componente'
        case 'landing':
          return 'Ver página'
        case 'institutional':
          return 'Ver página'
        default:
          return 'Ver'
      }
    }

    const getSubtitle = () => {
      switch (type) {
        case 'component':
          return 'Componente UI'
        case 'landing':
          return 'Landing Page'
        case 'institutional':
          return 'Página Institucional'
        default:
          return ''
      }
    }

    // Ahora todos usan la misma navegación simple
    const targetUrl = item.path

    return (
      <Card key={item.path} className='hover:shadow-md transition-shadow bg-[var(--background-100)]'>
        {/* Todo el CardBody es clickeable */}
        <Link href={targetUrl} className='block'>
          <CardBody className='p-6 cursor-pointer hover:bg-[var(--background-50)] transition-colors'>
            <div className='flex items-center gap-3'>
              <div className='bg-[var(--primary-100)] text-[var(--primary-600)] p-4 rounded-lg flex-shrink-0'>
                <i className={`ph ${item.icon} text-2xl`}></i>
              </div>
              <div className='flex-1 min-w-0'>
                <h3 className='text-xl text-[var(--neutral-200)] font-semibold truncate'>{item.name}</h3>
                <p className='text-[var(--neutral-500)] text-sm line-clamp-2'>{item.description || getSubtitle()}</p>
                {/* Mostrar el path para debug - solo en desarrollo */}
                {process.env.NODE_ENV === 'development' && (
                  <p className='text-[var(--neutral-600)] text-xs mt-1 font-mono'>→ {targetUrl}</p>
                )}
              </div>
            </div>
          </CardBody>
        </Link>

        <CardFooter className='bg-[var(--background-100)] border-t border-[var(--background-300)] flex justify-end'>
          <Link href={targetUrl}>
            <Button
              className='!text-white bg-[var(--primary-700)] hover:bg-[var(--primary-800)] transition-colors'
              variant='flat'
              size='sm'
              endContent={<i className='ph-arrow-right text-white'></i>}
              as='div'>
              <span className='text-white'>{getButtonText()}</span>
            </Button>
          </Link>
        </CardFooter>
      </Card>
    )
  }

  return (
    <>
      {/* Landing Pages */}
      {selectedTab === 'landing-pages' && (
        <div className='space-y-4'>
          <div className='flex items-center gap-2 mb-4'>
            <i className='ph-rocket text-[var(--primary-500)] text-xl'></i>
            <h2 className='text-2xl font-semibold text-[var(--neutral-200)]'>Landing Pages</h2>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-[var(--background-200)] p-4 rounded-lg'>
            {landingPages.map(page => (
              <UnifiedCard key={page.path} item={page} type='landing' />
            ))}
          </div>
        </div>
      )}

      {/* Páginas Institucionales */}
      {selectedTab === 'institutional' && (
        <div className='space-y-4'>
          <div className='flex items-center gap-2 mb-4'>
            <i className='ph-buildings text-[var(--primary-500)] text-xl'></i>
            <h2 className='text-2xl font-semibold text-[var(--neutral-200)]'>Páginas Institucionales</h2>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-[var(--background-200)] p-4 rounded-lg'>
            {institutionalPages.map(page => (
              <UnifiedCard key={page.path} item={page} type='institutional' />
            ))}
          </div>
        </div>
      )}

      {/* Páginas de Componentes UI */}
      {selectedTab === 'components' && (
        <div className='space-y-4'>
          <div className='flex items-center gap-2 mb-4'>
            <i className='ph-stack text-[var(--primary-500)] text-xl'></i>
            <h2 className='text-2xl font-semibold text-[var(--neutral-200)]'>Páginas de Componentes UI</h2>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-[var(--background-200)] p-4 rounded-lg'>
            {uiComponents.map(component => (
              <UnifiedCard key={component.path} item={component} type='component' />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
