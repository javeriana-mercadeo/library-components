'use client'

import { Button } from '@heroui/react'
import Link from 'next/link'

export default function LibraryHome() {
  // Hero Section Component
  const OverviewSection = () => (
    <div className='py-12'>
      <div className='container mx-auto px-6'>
        <div className='text-center mb-16'>
          {/* Hero Section */}
          <div className='mb-12 text-center'>
            <div className='inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs font-medium text-blue-700 mb-4'>
              <i className='ph ph-sparkle text-xs' />
              Sistema Unificado | Dirección de Mercadeo de Programas Académicos
            </div>
            <h1 className='text-3xl font-bold text-gray-800 mb-4 leading-tight'>
              Biblioteca de Componentes
              <br />
              <span className='bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent'>para Liferay PUJ</span>
            </h1>
            <p className='text-base text-gray-600 max-w-2xl mx-auto leading-normal'>
              Sistema de diseño modular para la creación de landing pages y sitios institucionales con soporte completo para múltiples temas
              por facultad. <strong>Desarrollado para facilitar compatibilidad con Liferay.</strong>
            </p>

            <div className='mt-6 flex flex-col sm:flex-row gap-4 justify-center mb-8'>
              <Link href='/demos'>
                <Button className='font-semibold px-8' color='primary' startContent={<i className='ph ph-rocket-launch text-lg' />}>
                  Ver Demos
                </Button>
              </Link>
              <Link href='/docs'>
                <Button className='font-semibold px-8' startContent={<i className='ph ph-file-text text-lg' />} variant='bordered'>
                  Documentación
                </Button>
              </Link>
            </div>
          </div>

          {/* Statistics */}
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto'>
            <div className='text-center'>
              <div className='text-2xl font-bold text-blue-600 mb-2'>Gestión</div>
              <div className='text-sm text-gray-600'>De elementos editables</div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-green-600 mb-2'>42</div>
              <div className='text-sm text-gray-600'>Temas por Facultad</div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-purple-600 mb-2'>Total</div>
              <div className='text-sm text-gray-600'>Compatibilidad con Liferay</div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-orange-600 mb-2'>100%</div>
              <div className='text-sm text-gray-600'>Vanilla JS</div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10'>
          <div className='bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow'>
            <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3'>
              <i className='ph ph-cube text-blue-600 text-lg' />
            </div>
            <h3 className='text-base font-bold text-gray-800 mb-2'>Componentes Modulares</h3>
            <p className='text-sm text-gray-600 leading-relaxed'>
              Componentes reutilizables diseñados específicamente para Liferay DXP con vanilla JavaScript.
            </p>
          </div>

          <div className='bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow'>
            <div className='w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3'>
              <i className='ph ph-palette text-green-600 text-lg' />
            </div>
            <h3 className='text-base font-bold text-gray-800 mb-2'>Sistema de Temas</h3>
            <p className='text-sm text-gray-600 leading-relaxed'>
              42 temas únicos: institucional base + temas específicos por facultad, con modo claro y oscuro.
            </p>
          </div>

          <div className='bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow'>
            <div className='w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3'>
              <i className='ph ph-code text-purple-600 text-lg' />
            </div>
            <h3 className='text-base font-bold text-gray-800 mb-2'>Vanilla JavaScript</h3>
            <p className='text-sm text-gray-600 leading-relaxed'>
              Sin dependencias de React en producción. Código JavaScript puro para máxima compatibilidad.
            </p>
          </div>

          <div className='bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow'>
            <div className='w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-3'>
              <i className='ph ph-rocket-launch text-orange-600 text-lg' />
            </div>
            <h3 className='text-base font-bold text-gray-800 mb-2'>Desarrollo Ágil</h3>
            <p className='text-sm text-gray-600 leading-relaxed'>
              Acelera el desarrollo con componentes preconstruidos y documentación completa.
            </p>
          </div>

          <div className='bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow'>
            <div className='w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-3'>
              <i className='ph ph-shield-check text-red-600 text-lg' />
            </div>
            <h3 className='text-base font-bold text-gray-800 mb-2'>Accesible</h3>
            <p className='text-sm text-gray-600 leading-relaxed'>
              Cumple con estándares WCAG 2.1 AA para garantizar accesibilidad en todos los componentes.
            </p>
          </div>

          <div className='bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow'>
            <div className='w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-3'>
              <i className='ph ph-monitor-arrow-up text-indigo-600 text-lg' />
            </div>
            <h3 className='text-base font-bold text-gray-800 mb-2'>Optimización SEO</h3>
            <p className='text-sm text-gray-600 leading-relaxed'>
              Componentes optimizados para motores de búsqueda con marcado semántico y meta tags estructurados.
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className='bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 text-center text-white'>
          <h2 className='text-lg font-bold mb-2'>¿Listo para empezar?</h2>
          <p className='text-gray-300 mb-4 max-w-2xl mx-auto text-base'>
            Explora nuestra biblioteca de componentes, revisa la documentación o conoce más sobre nuestro equipo.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link href='/demos'>
              <Button className='font-semibold px-8' color='primary' startContent={<i className='ph ph-rocket-launch text-lg' />}>
                Ver Demos
              </Button>
            </Link>
            <Link href='/docs'>
              <Button
                className='font-semibold px-8 border-white text-white hover:bg-white/10'
                startContent={<i className='ph ph-file-text text-lg' />}
                variant='bordered'>
                Documentación
              </Button>
            </Link>
            <Link href='/about'>
              <Button
                className='font-semibold px-8 text-white hover:bg-white/10'
                startContent={<i className='ph ph-info text-lg' />}
                variant='light'>
                Acerca de
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50'>
      <OverviewSection />
    </div>
  )
}
