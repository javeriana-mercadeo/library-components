'use client'

import { Card, CardBody, CardFooter, Button, Divider } from '@heroui/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ComponentCatalog({ selectedTab }) {
  const router = useRouter()

  // Datos de las diferentes categorías
  const landingPages = [
    { name: 'Pregrado', path: '/landing/pregrado', icon: 'ph-graduation-cap' },
    { name: 'Maestría y Especialización', path: '/landing/maestria-especializacion', icon: 'ph-certificate' },
    { name: 'MBA', path: '/landing/mba', icon: 'ph-briefcase' },
    { name: 'Doctorado', path: '/landing/doctorado', icon: 'ph-student' },
    { name: 'Eclesiásticos', path: '/landing/eclesiasticos', icon: 'ph-cross' }
  ]

  const institutionalPages = [
    { name: 'Centro de ayuda', path: '/institutional/centro-ayuda', icon: 'ph-lifebuoy' },
    { name: 'Secciones opcionales', path: '/institutional/secciones-opcionales', icon: 'ph-gear-six' },
    { name: 'Thank you page', path: '/institutional/thank-you-page', icon: 'ph-check-circle' },
    { name: 'Artículos', path: '/institutional/articulos', icon: 'ph-newspaper' }
  ]

  const uiComponents = [
    {
      name: 'Contenido',
      items: [
        { name: 'Botón', section: '/fragments/components/buttons', icon: 'ph-cursor-click' },
        { name: 'Título', section: '/fragments/components/titles', icon: 'ph-text-h-one' },
        { name: 'Párrafo', section: '/fragments/components/paragraph', icon: 'ph-text-align-left' },
        { name: 'Caption', section: '/fragments/components/captions', icon: 'ph-quotes' },
        { name: 'Imagen de Fondo', section: '/fragments/components/imgBackground', icon: 'ph-image' }
      ]
    }
  ]

  // Función unificada para navegación
  const handleNavigation = (path, isComponent = false) => {
    if (isComponent) {
      router.push(`/components/view?path=${path}`)
    } else {
      router.push(path)
    }
  }

  // Componente unificado para todas las tarjetas
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
          return item.section
        case 'landing':
          return 'Landing Page'
        case 'institutional':
          return 'Página Institucional'
        default:
          return ''
      }
    }

    const handleClick = () => {
      const path = item.path || item.section
      const isComponent = type === 'component'
      handleNavigation(path, isComponent)
    }

    return (
      <Card key={item.path || item.section} className="hover:shadow-md transition-shadow bg-[var(--background-100)]">
        <CardBody className="p-6">
          <div className="flex items-center gap-3">
            <div className="bg-[var(--primary-100)] text-[var(--primary-600)] p-4 rounded-lg">
              <i className={`ph ${item.icon} text-2xl`}></i>
            </div>
            <div className="flex-1">
              <h3 className="text-xl text-[var(--neutral-200)] font-semibold">{item.name}</h3>
              <p className="text-[var(--neutral-500)] text-sm truncate">{getSubtitle()}</p>
            </div>
          </div>
        </CardBody>
        <CardFooter className="bg-[var(--background-100)] border-t border-[var(--background-300)] flex justify-end">
          <Button
            className="!text-white bg-[var(--primary-700)] hover:bg-[var(--primary-800)] transition-colors"
            variant="flat"
            onClick={handleClick}>
            <span className="text-white">{getButtonText()}</span>
            <i className="ph-arrow-right ml-2 !text-[var(--primary-600)]"></i>
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <>
      {/* Landing Pages */}
      {selectedTab === 'landing-pages' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-[var(--background-200)] p-4 rounded-lg">
          {landingPages.map(page => (
            <UnifiedCard key={page.path} item={page} type="landing" />
          ))}
        </div>
      )}

      {/* Páginas Institucionales */}
      {selectedTab === 'institutional' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-[var(--background-200)] p-4 rounded-lg">
          {institutionalPages.map(page => (
            <UnifiedCard key={page.path} item={page} type="institutional" />
          ))}
        </div>
      )}

      {/* Componentes UI */}
      {selectedTab === 'components' && (
        <div className="grid grid-cols-1 gap-6 bg-[var(--background-200)] p-4 rounded-lg">
          {uiComponents.map(category => (
            <div key={category.name} className="w-full">
              <h2 className="text-xl text-[var(--neutral-200)] font-semibold mb-4 flex items-center gap-2">
                <i className="ph-folder text-[var(--primary-500)]"></i>
                {category.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {category.items.map(component => (
                  <UnifiedCard key={component.section} item={component} type="component" />
                ))}
              </div>
              <Divider className="my-4 bg-[var(--background-300)]" />
            </div>
          ))}
        </div>
      )}
    </>
  )
}
