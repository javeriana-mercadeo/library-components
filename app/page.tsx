'use client'

import { useState } from 'react'
import { Card, CardBody, CardFooter, Tabs, Tab, Button, Divider } from '@heroui/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import './style.scss'
import Splash from './library/_general/sections/Splash'

export default function Home() {
  const [selectedTab, setSelectedTab] = useState('landing-pages')
  const router = useRouter()

  // Definir categorías de componentes
  const landingPages = [
    { name: 'Pregrado', path: '/landing/pregrado', icon: 'ph-graduation-cap' },
    { name: 'Maestría y Especialización', path: '/landing/maestria-especializacion', icon: 'ph-books' },
    { name: 'MBA', path: '/landing/mba', icon: 'ph-briefcase' },
    { name: 'Doctorado', path: '/landing/doctorado', icon: 'ph-scroll' },
    { name: 'Eclesiásticos', path: '/landing/eclesiasticos', icon: 'ph-church' }
  ]

  const institutionalPages = [
    { name: 'Artículos', path: '/institutional/articles', icon: 'ph-newspaper' },
    { name: 'Ayuda', path: '/institutional/help', icon: 'ph-question' }
  ]

  const generalComponents = [
    { name: 'Meeting Director', section: 'pregrado/sections/meetingDirector', icon: 'ph-chats' },
    { name: 'Splash', section: '_general/sections/Splash', icon: 'ph-spinner-gap' },
    { name: 'Blog Header', section: '_institutional/sections/blogHeader', icon: 'ph-file-text' },
    { name: 'Blog Featured', section: '_institutional/sections/blogFeatured', icon: 'ph-star' }
  ]

  const uiComponents = [
    {
      name: 'Botones',
      items: [
        { name: 'Botón Icon', section: '/fragments/components/buttons', icon: 'ph-cursor-click' },
        { name: 'Botón Link', section: '_general/components/buttons/BtnLink', icon: 'ph-link' },
        { name: 'Botón General', section: '_general/components/buttons/btn_general', icon: 'ph-button' }
      ]
    },
    {
      name: 'Contenedores',
      items: [
        { name: 'Título', section: '_general/components/contain/title', icon: 'ph-text-h' },
        { name: 'Párrafo', section: '_general/components/contain/paragraph', icon: 'ph-text-align-left' },
        { name: 'Caption', section: '_general/components/contain/caption', icon: 'ph-text-caption' },
        { name: 'Imagen de Fondo', section: '_general/components/contain/imgBackground', icon: 'ph-image' }
      ]
    }
  ]

  const navigateToComponent = (section: string): void => {
    router.push(`/components/view?path=${section}`)
  }

  return (
    <>
      <Splash />
      <div className="w-full px-4 py-8 flex flex-col items-center bg-[var(--background-100)]">
        <div className="text-center mb-8">
          <h1 className="text-[var(--neutral-200)] text-4xl font-bold mb-2">Biblioteca de Componentes</h1>
          <p className="text-[var(--neutral-500)] max-w-xl mx-auto">
            Explora y visualiza los diferentes componentes y páginas disponibles para la construcción de sitios web.
          </p>
        </div>

        <div className="max-w-6xl w-full">
          <Tabs
            aria-label="Categorías"
            color="default"
            variant="underlined"
            selectedKey={selectedTab}
            onSelectionChange={key => setSelectedTab(String(key))}
            className="mb-8"
            classNames={{
              base: 'tabs-container',
              tabList: 'tabs-list',
              tab: 'text-[var(--neutral-500)] hover:text-[var(--primary-500)]',
              tabContent: 'tab-content-class group-data-[selected=true]:text-[var(--primary-700)]',
              cursor: 'bg-[var(--primary-500)]',
              panel: 'tab-panel',
              tabWrapper: 'tab-wrapper'
            }}>
            <Tab
              key="landing-pages"
              title={
                <div className="flex items-center gap-2">
                  <i className="ph ph-monitor text-lg"></i>
                  <span>Landing Pages</span>
                </div>
              }
            />
            <Tab
              key="institutional"
              title={
                <div className="flex items-center gap-2">
                  <i className="ph ph-buildings text-lg"></i>
                  <span>Institucional</span>
                </div>
              }
            />
            <Tab
              key="sections"
              title={
                <div className="flex items-center gap-2">
                  <i className="ph ph-layout text-lg"></i>
                  <span>Secciones</span>
                </div>
              }
            />
            <Tab
              key="components"
              title={
                <div className="flex items-center gap-2">
                  <i className="ph ph-puzzle-piece text-lg"></i>
                  <span>Componentes</span>
                </div>
              }
            />
          </Tabs>

          {selectedTab === 'landing-pages' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-[var(--background-200)] p-4 rounded-lg">
              {landingPages.map(page => (
                <Card key={page.path} className="hover:shadow-md transition-shadow bg-[var(--background-100)]">
                  <CardBody className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-[var(--primary-100)] text-[var(--primary-600)] p-4 rounded-lg">
                        <i className={`ph ${page.icon} text-2xl`}></i>
                      </div>
                      <div>
                        <h3 className="text-xl text-[var(--neutral-200)] font-semibold">{page.name}</h3>
                        <p className="text-[var(--neutral-500)] text-sm">Landing Page</p>
                      </div>
                    </div>
                  </CardBody>
                  <CardFooter className="bg-[var(--background-100)] border-t border-[var(--background-300)] flex justify-end">
                    <Link href={page.path}>
                      <Button className="text-[var(--primary-100)] bg-[var(--primary-700)]" variant="flat">
                        Ver página
                        <i className="ph ph-arrow-right ml-2"></i>
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          {selectedTab === 'institutional' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-[var(--background-200)] p-4 rounded-lg">
              {institutionalPages.map(page => (
                <Card key={page.path} className="hover:shadow-md transition-shadow bg-[var(--background-100)]">
                  <CardBody className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-[var(--primary-100)] text-[var(--primary-600)] p-4 rounded-lg">
                        <i className={`ph ${page.icon} text-2xl`}></i>
                      </div>
                      <div>
                        <h3 className="text-xl text-[var(--neutral-200)] font-semibold">{page.name}</h3>
                        <p className="text-[var(--neutral-500)] text-sm">Página Institucional</p>
                      </div>
                    </div>
                  </CardBody>
                  <CardFooter className="bg-[var(--background-100)] border-t border-[var(--background-300)] flex justify-end">
                    <Link href={page.path}>
                      <Button className="text-[var(--primary-100)] bg-[var(--primary-700)]" variant="flat">
                        Ver página
                        <i className="ph ph-arrow-right ml-2"></i>
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          {selectedTab === 'sections' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-[var(--background-200)] p-4 rounded-lg">
              {generalComponents.map(component => (
                <Card key={component.section} className="hover:shadow-md transition-shadow bg-[var(--background-100)]">
                  <CardBody className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-[var(--primary-100)] text-[var(--primary-600)] p-4 rounded-lg">
                        <i className={`ph ${component.icon} text-2xl`}></i>
                      </div>
                      <div>
                        <h3 className="text-xl text-[var(--neutral-200)] font-semibold">{component.name}</h3>
                        <p className="text-[var(--neutral-500)] text-sm truncate">{component.section}</p>
                      </div>
                    </div>
                  </CardBody>
                  <CardFooter className="bg-[var(--background-100)] border-t border-[var(--background-300)] flex justify-end">
                    <Button
                      className="text-[var(--neutral-100)] bg-[var(--primary-700)]"
                      variant="flat"
                      onClick={() => navigateToComponent(component.section)}>
                      Ver componente
                      <i className="ph ph-arrow-right ml-2"></i>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          {selectedTab === 'components' && (
            <div className="grid grid-cols-1 gap-6 bg-[var(--background-200)] p-4 rounded-lg">
              {uiComponents.map(category => (
                <div key={category.name} className="w-full">
                  <h2 className="text-xl text-[var(--neutral-200)] font-semibold mb-4 flex items-center gap-2">
                    <i className="ph ph-folder text-[var(--primary-500)]"></i>
                    {category.name}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {category.items.map(component => (
                      <Card key={component.section} className="hover:shadow-md transition-shadow bg-[var(--background-100)]">
                        <CardBody className="p-5">
                          <div className="flex items-center gap-3">
                            <div className="bg-[var(--primary-100)] text-[var(--primary-600)] p-3 rounded-lg">
                              <i className={`ph ${component.icon} text-xl`}></i>
                            </div>
                            <div>
                              <h3 className="text-lg text-[var(--neutral-200)] font-semibold">{component.name}</h3>
                              <p className="text-[var(--neutral-500)] text-xs truncate">{component.section}</p>
                            </div>
                          </div>
                        </CardBody>
                        <CardFooter className="bg-[var(--background-100)] border-t border-[var(--background-300)] flex justify-end">
                          <Link href={component.section}>
                            <Button className="text-[var(--neutral-100)] bg-[var(--primary-700)]" variant="flat">
                              Ver página
                              <i className="ph ph-arrow-right ml-2"></i>
                            </Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                  <Divider className="my-4 bg-[var(--background-300)]" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
