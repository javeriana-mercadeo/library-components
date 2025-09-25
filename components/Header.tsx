'use client'

import { useState, useEffect } from 'react'
import { Tabs, Tab, Button } from '@heroui/react'
import { usePathname, useRouter } from 'next/navigation'

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Map pathnames to tab keys
  const getSelectedTab = () => {
    if (pathname === '/') return 'overview'
    if (pathname === '/docs') return 'docs'
    if (pathname === '/demos') return 'demos'
    if (pathname === '/about') return 'about'
    return 'overview'
  }

  // Prevent hydration mismatch by not rendering tabs until mounted
  if (!mounted) {
    return (
      <div className='sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200'>
        <div className='container mx-auto px-4 sm:px-6'>
          <div className='flex items-center justify-between h-16'>
            {/* Logo */}
            <div className='flex items-center gap-2 sm:gap-3'>
              <div className='w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center'>
                <i className='ph ph-cube text-white text-lg sm:text-xl' />
              </div>
              <div className='hidden sm:block'>
                <h1 className='font-bold text-gray-800 text-sm sm:text-base'>Componentes PUJ</h1>
                <p className='text-xs text-gray-500'>Sistema Unificado</p>
              </div>
              <div className='block sm:hidden'>
                <h1 className='font-bold text-gray-800 text-sm'>PUJ</h1>
              </div>
            </div>
            {/* Empty space for navigation that will load */}
            <div className='hidden md:block h-12 w-80'></div>
            <div className='block md:hidden w-10 h-10'></div>
          </div>
        </div>
      </div>
    )
  }

  const handleTabChange = (key: string) => {
    switch (key) {
      case 'overview':
        router.push('/')
        break
      case 'docs':
        router.push('/docs')
        break
      case 'demos':
        router.push('/demos')
        break
      case 'about':
        router.push('/about')
        break
    }
    setMobileMenuOpen(false) // Close mobile menu when navigating
  }

  const navigationItems = [
    { key: 'overview', icon: 'ph-house', label: 'Inicio', path: '/' },
    { key: 'docs', icon: 'ph-book', label: 'Documentación', path: '/docs' },
    { key: 'demos', icon: 'ph-monitor-play', label: 'Demos', path: '/demos' },
    { key: 'about', icon: 'ph-info', label: 'Acerca de', path: '/about' }
  ]

  return (
    <div className='sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200'>
      <div className='container mx-auto px-4 sm:px-6'>
        <div className='flex items-center justify-between'>
          {/* Logo */}
          <div className='flex items-center gap-2 sm:gap-3'>
            <div className='w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center'>
              <i className='ph ph-cube text-white text-lg sm:text-xl' />
            </div>
            <div className='hidden sm:block'>
              <h1 className='font-bold text-gray-800 text-sm sm:text-base'>Componentes PUJ</h1>
              <p className='text-xs text-gray-500'>Sistema Unificado</p>
            </div>
            <div className='block sm:hidden'>
              <h1 className='font-bold text-gray-800 text-sm'>PUJ</h1>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <div className='hidden md:block'>
            <Tabs
              selectedKey={getSelectedTab()}
              onSelectionChange={key => handleTabChange(String(key))}
              variant='underlined'
              classNames={{
                tabList: 'gap-6 lg:gap-8 relative rounded-none p-0 border-b-0',
                cursor: 'w-full bg-blue-600',
                tab: 'max-w-fit px-0 h-12',
                tabContent: 'group-data-[selected=true]:text-blue-600 font-medium'
              }}>
              {navigationItems.map(item => (
                <Tab
                  key={item.key}
                  title={
                    <div className='flex items-center gap-2'>
                      <i className={`ph ${item.icon} text-lg`} />
                      <span className='hidden lg:inline'>{item.label}</span>
                    </div>
                  }
                />
              ))}
            </Tabs>
          </div>

          {/* Mobile Menu Button */}
          <div className='block md:hidden'>
            <Button isIconOnly variant='light' onPress={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label='Toggle mobile menu'>
              <i className={`ph ${mobileMenuOpen ? 'ph-x' : 'ph-list'} text-xl`} />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className='md:hidden border-t border-gray-200 py-2 bg-white/95 backdrop-blur-sm'>
            <nav className='flex flex-col gap-1'>
              {navigationItems.map(item => (
                <button
                  key={item.key}
                  onClick={() => handleTabChange(item.key)}
                  className={`flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${
                    getSelectedTab() === item.key ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-50'
                  }`}>
                  <i className={`ph ${item.icon} text-lg`} />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </div>
  )
}
