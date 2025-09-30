'use client'

// Reusable Components
import { Button } from '@heroui/react'

import SectionTitle from '@/components/ui/SectionTitle'
import TeamCard from '@/components/ui/TeamCard'

export default function AboutPage() {
  return (
    <div className='min-h-screen bg-gray-50 py-12'>
      <div className='container mx-auto px-6'>
        <div className='max-w-4xl mx-auto text-center'>
          <SectionTitle
            className='mb-12'
            description='Equipo de desarrollo de la Pontificia Universidad Javeriana, comprometido con crear herramientas de calidad para la comunidad educativa.'
            title='Sobre Nosotros'
          />

          {/* Mission Section */}
          <section className='mb-12'>
            <div className='bg-white rounded-2xl p-8 shadow-sm border border-gray-200'>
              <div className='flex items-center justify-center mb-6'>
                <div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center'>
                  <i className='ph ph-target text-white text-2xl' />
                </div>
              </div>
              <h3 className='text-xl font-bold text-gray-800 mb-4'>Nuestra Misión</h3>
              <p className='text-gray-600 leading-relaxed'>
                Desarrollar y mantener un sistema unificado de componentes UI que facilite la creación de experiencias web consistentes y
                accesibles en toda la Pontificia Universidad Javeriana. Nuestro objetivo es acelerar el desarrollo mientras mantenemos los
                más altos estándares de calidad y compatibilidad con Liferay DXP.
              </p>
            </div>
          </section>

          {/* Team Section */}
          <section className='mb-12'>
            <h3 className='text-xl font-bold text-gray-800 mb-8'>Nuestro Equipo</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              <TeamCard avatarColor='blue' description='Especialistas en React, TypeScript y UI/UX' name='Equipo Frontend' role='group' />
              <TeamCard
                avatarColor='green'
                description='Expertos en Liferay y arquitecturas escalables'
                name='Equipo Backend'
                role='group'
              />
              <TeamCard avatarColor='purple' description='Diseñadores UX/UI enfocados en accesibilidad' name='Equipo Diseño' role='group' />
            </div>
          </section>

          {/* Values Section */}
          <section className='mb-12'>
            <h3 className='text-xl font-bold text-gray-800 mb-8'>Nuestros Valores</h3>
            <div className='grid md:grid-cols-2 gap-6'>
              <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-left'>
                <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4'>
                  <i className='ph ph-check-circle text-green-600 text-xl' />
                </div>
                <h4 className='font-semibold text-gray-800 mb-2'>Calidad</h4>
                <p className='text-sm text-gray-600'>
                  Cada componente pasa por rigurosas pruebas de calidad y cumple con estándares de accesibilidad web.
                </p>
              </div>
              <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-left'>
                <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4'>
                  <i className='ph ph-users text-blue-600 text-xl' />
                </div>
                <h4 className='font-semibold text-gray-800 mb-2'>Colaboración</h4>
                <p className='text-sm text-gray-600'>
                  Trabajamos estrechamente con todas las facultades para entender y satisfacer sus necesidades específicas.
                </p>
              </div>
              <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-left'>
                <div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4'>
                  <i className='ph ph-lightbulb text-purple-600 text-xl' />
                </div>
                <h4 className='font-semibold text-gray-800 mb-2'>Innovación</h4>
                <p className='text-sm text-gray-600'>
                  Adoptamos las mejores prácticas y tecnologías emergentes para mantenernos a la vanguardia.
                </p>
              </div>
              <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-left'>
                <div className='w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4'>
                  <i className='ph ph-heart text-orange-600 text-xl' />
                </div>
                <h4 className='font-semibold text-gray-800 mb-2'>Compromiso</h4>
                <p className='text-sm text-gray-600'>
                  Estamos comprometidos con el éxito de cada proyecto y la satisfacción de nuestra comunidad universitaria.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className='bg-white rounded-2xl p-8 shadow-sm border border-gray-200'>
            <div className='flex items-center justify-center mb-6'>
              <div className='w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center'>
                <i className='ph ph-envelope text-white text-2xl' />
              </div>
            </div>
            <h3 className='text-xl font-bold text-gray-800 mb-4'>¿Necesitas Ayuda?</h3>
            <p className='text-gray-600 mb-6'>
              Nuestro equipo está disponible para ayudarte con la implementación, resolver dudas técnicas o recibir feedback sobre los
              componentes.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Button color='primary' size='md' startContent={<i className='ph ph-envelope text-lg' />} variant='solid'>
                Contactar Equipo
              </Button>
              <Button color='default' size='md' startContent={<i className='ph ph-github-logo text-lg' />} variant='bordered'>
                Ver en GitHub
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
