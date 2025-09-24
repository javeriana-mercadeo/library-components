'use client'

import { useState } from 'react'
import { Tabs, Tab } from '@heroui/react'

<<<<<<< HEAD
import ComponentCatalog from './_components/componentCatalog'
import ConfigurationSection from './_components/configurationSection'
import GlobalAssetsSection from './_components/globalAssetsSection'
=======
import ComponentCatalog from '../components/componentCatalog'
import ConfigurationSection from '../components/configurationSection'
import GlobalAssetsSection from '../components/globalAssetsSection'
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3

import './style.scss'

export default function ComponentLibraryTabs() {
  const [selectedTab, setSelectedTab] = useState('landing-pages')

  return (
<<<<<<< HEAD
    <div className="w-full px-4 py-8 flex flex-col items-center bg-[var(--background-100)]">
      {/* Header principal */}
      <div className="text-center mb-8">
        <h1 className="text-[var(--neutral-200)] text-4xl font-bold mb-2">Biblioteca de Componentes</h1>
        <p className="text-[var(--neutral-500)] max-w-xl mx-auto">
=======
    <div className='w-full px-4 py-8 flex flex-col items-center bg-[var(--background-100)]'>
      {/* Header principal */}
      <div className='text-center mb-8'>
        <h1 className='text-[var(--neutral-200)] text-4xl font-bold mb-2'>Biblioteca de Componentes</h1>
        <p className='text-[var(--neutral-500)] mx-auto'>
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
          Explora y visualiza los diferentes componentes y páginas disponibles para la construcción de sitios web.
        </p>
      </div>

<<<<<<< HEAD
      <div className="max-w-6xl w-full">
        {/* Tabs principales de navegación */}
        <Tabs
          aria-label="Categorías"
          color="default"
          variant="underlined"
          selectedKey={selectedTab}
          onSelectionChange={key => setSelectedTab(String(key))}
          className="mb-8"
=======
      <div className='max-w-6xl w-full'>
        {/* Tabs principales de navegación */}
        <Tabs
          aria-label='Categorías'
          className='mb-8'
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
          classNames={{
            base: 'tabs-container',
            tabList: 'tabs-list',
            tab: 'text-[var(--neutral-500)] hover:text-[var(--primary-500)]',
            tabContent: 'tab-content-class group-data-[selected=true]:text-[var(--primary-700)]',
            cursor: 'bg-[var(--primary-500)]',
            panel: 'tab-panel',
            tabWrapper: 'tab-wrapper'
<<<<<<< HEAD
          }}>
          <Tab
            key="landing-pages"
            title={
              <div className="flex items-center gap-2">
                <i className="ph ph-monitor text-lg"></i>
=======
          }}
          color='default'
          selectedKey={selectedTab}
          variant='underlined'
          onSelectionChange={key => setSelectedTab(String(key))}>
          <Tab
            key='landing-pages'
            title={
              <div className='flex items-center gap-2'>
                <i className='ph ph-monitor text-lg' />
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
                <span>Landing Pages</span>
              </div>
            }
          />
          <Tab
<<<<<<< HEAD
            key="institutional"
            title={
              <div className="flex items-center gap-2">
                <i className="ph ph-buildings text-lg"></i>
=======
            key='institutional'
            title={
              <div className='flex items-center gap-2'>
                <i className='ph ph-buildings text-lg' />
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
                <span>Institucional</span>
              </div>
            }
          />
          <Tab
<<<<<<< HEAD
            key="components"
            title={
              <div className="flex items-center gap-2">
                <i className="ph ph-puzzle-piece text-lg"></i>
=======
            key='components'
            title={
              <div className='flex items-center gap-2'>
                <i className='ph ph-puzzle-piece text-lg' />
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
                <span>Componentes</span>
              </div>
            }
          />
        </Tabs>

        {/* Renderizar la sección del catálogo de componentes */}
        <ComponentCatalog selectedTab={selectedTab} />
      </div>

      {/* Sección de configuración */}
      <ConfigurationSection />

      {/* Sección de assets globales */}
      <GlobalAssetsSection />
    </div>
  )
}
