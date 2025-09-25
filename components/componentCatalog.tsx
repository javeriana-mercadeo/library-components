'use client'

import { Card, CardHeader, CardBody, CardFooter, Button, Chip, Divider } from '@heroui/react'
import { useState } from 'react'

interface ComponentCatalogProps {
  selectedTab: string
}

export default function ComponentCatalog({ selectedTab }: ComponentCatalogProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  // Datos de programas académicos
  const academicPrograms = [
    {
      id: 'pregrados',
      title: 'Pregrados y Eclesiásticos',
      description: 'Programas de pregrado y formación eclesiástica',
      icon: '🎓',
      color: 'primary' as const,
      count: 12,
      routes: ['/landing/pregrado', '/landing/eclesiastico']
    },
    {
      id: 'maestrias',
      title: 'Maestrías y Especializaciones',
      description: 'Programas de posgrado y especialización',
      icon: '📚',
      color: 'secondary' as const,
      count: 8,
      routes: ['/landing/maestrias', '/landing/especializaciones']
    },
    {
      id: 'doctorados',
      title: 'Doctorados',
      description: 'Programas doctorales de investigación',
      icon: '🔬',
      color: 'success' as const,
      count: 5,
      routes: ['/landing/doctorado']
    },
    {
      id: 'mba',
      title: 'MBA',
      description: 'Master in Business Administration',
      icon: '💼',
      color: 'warning' as const,
      count: 2,
      routes: ['/landing/mba']
    },
    {
      id: 'secciones',
      title: 'Secciones Opcionales',
      description: 'Componentes modulares para páginas',
      icon: '🧩',
      color: 'danger' as const,
      count: 15,
      routes: ['/institutional/secciones-opcionales']
    }
  ]

  // Datos institucionales
  const institutionalPages = [
    {
      id: 'openday',
      title: 'Open Day',
      description: 'Páginas de eventos institucionales',
      icon: '🎉',
      color: 'primary' as const,
      count: 2,
      variants: ['Versión 1', 'Versión 2']
    },
    {
      id: 'help-center',
      title: 'Centro de Ayuda',
      description: 'Mini sitio de soporte y ayuda',
      icon: '🆘',
      color: 'secondary' as const,
      count: 6,
      variants: ['FAQ', 'Contacto', 'Guías', 'Tutoriales']
    },
    {
      id: 'thankyou',
      title: 'Thank You Pages',
      description: 'Páginas de agradecimiento',
      icon: '🙏',
      color: 'success' as const,
      count: 3,
      variants: ['Registro', 'Solicitud', 'Descarga']
    }
  ]

  // Componentes UI
  const uiComponents = [
    {
      id: 'modals',
      title: 'Pop-ups y Modales',
      description: 'Modales y ventanas emergentes',
      icon: '💬',
      color: 'primary' as const,
      count: 8
    },
    {
      id: 'buttons',
      title: 'Botones',
      description: 'Variantes de botones y acciones',
      icon: '🔘',
      color: 'secondary' as const,
      count: 12
    },
    {
      id: 'accessibility',
      title: 'Barras de Accesibilidad',
      description: 'Herramientas de accesibilidad',
      icon: '♿',
      color: 'success' as const,
      count: 3
    },
    {
      id: 'layout',
      title: 'Headers y Footers',
      description: 'Cabeceras y pies de página',
      icon: '🏗️',
      color: 'warning' as const,
      count: 6
    },
    {
      id: 'content',
      title: 'Contenido Textual',
      description: 'Títulos, párrafos y texto',
      icon: '📝',
      color: 'danger' as const,
      count: 10
    },
    {
      id: 'multimedia',
      title: 'Contenido Multimedia',
      description: 'Imágenes, videos y galerías',
      icon: '🎬',
      color: 'default' as const,
      count: 7
    },
    {
      id: 'ui-elements',
      title: 'Elementos UI',
      description: 'Acordeones, sliders, tabs',
      icon: '🎛️',
      color: 'primary' as const,
      count: 15
    }
  ]

  const renderCards = (items: any[], showVariants = false) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Card
            key={item.id}
            isHoverable
            shadow={hoveredCard === item.id ? 'lg' : 'md'}
            radius="lg"
            className="transition-all duration-200"
            onMouseEnter={() => setHoveredCard(item.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <CardHeader className="flex gap-3">
              <div className="flex flex-col">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="text-md font-semibold">{item.title}</p>
                    <p className="text-small text-default-500">{item.description}</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <Divider/>
            <CardBody>
              <div className="flex justify-between items-center mb-3">
                <Chip color={item.color} variant="flat" size="sm">
                  {item.count} {item.count === 1 ? 'elemento' : 'elementos'}
                </Chip>
              </div>
              {showVariants && item.variants && (
                <div className="flex flex-wrap gap-1">
                  {item.variants.map((variant: string, index: number) => (
                    <Chip key={index} size="sm" variant="bordered">
                      {variant}
                    </Chip>
                  ))}
                </div>
              )}
            </CardBody>
            <CardFooter>
              <Button
                color={item.color}
                variant="ghost"
                size="sm"
                fullWidth
                endContent={<i className="ph ph-arrow-right" />}
              >
                Explorar
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (selectedTab === 'landing-pages') {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Programas Académicos
          </h2>
          <p className="text-default-500">
            Landing pages organizadas por tipo de programa académico
          </p>
        </div>
        {renderCards(academicPrograms)}
      </div>
    )
  }

  if (selectedTab === 'institutional') {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Páginas Institucionales
          </h2>
          <p className="text-default-500">
            Landings especiales para eventos y servicios institucionales
          </p>
        </div>
        {renderCards(institutionalPages, true)}
      </div>
    )
  }

  if (selectedTab === 'components') {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Elementos y Componentes UI
          </h2>
          <p className="text-default-500">
            Componentes reutilizables para desarrollo web
          </p>
        </div>
        {renderCards(uiComponents)}
      </div>
    )
  }

  return null
}