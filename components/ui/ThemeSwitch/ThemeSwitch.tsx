'use client'

import { useEffect, useState } from 'react'
import { Select, SelectItem, Button, Card, CardBody, Chip } from '@heroui/react'
import { useIsSSR } from '@react-aria/ssr'

import { useTheme } from '../../../hooks/usetheme'

const CollapsibleThemeSwitch = () => {
  const { themeBase, themeFaculty, setBaseTheme, setFacultyTheme, isLoading } = useTheme()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMinimized, setIsMinimized] = useState(true)

  const isSSR = useIsSSR()

  // Configurar tema inicial
  useEffect(() => {
    if (!isSSR && !isLoading) {
      if (!themeBase) {
        setBaseTheme('light')
      }
      if (!themeFaculty) {
        setFacultyTheme('default')
      }
    }
  }, [isSSR, isLoading, themeBase, themeFaculty, setBaseTheme, setFacultyTheme])

  // Opciones de tema base
  const baseThemes = [
    { key: 'light', label: '☀️ Tema Claro', icon: 'ph-sun' },
    { key: 'dark', label: '🌙 Tema Oscuro', icon: 'ph-moon' }
  ]

  // Opciones de facultades
  const facultyThemes = [
    { key: 'default', label: 'Institucional (Por defecto)' },
    { key: 'arquitectura-diseno', label: 'Arquitectura y Diseño' },
    { key: 'artes', label: 'Artes' },
    { key: 'ciencias', label: 'Ciencias' },
    { key: 'ciencias-economicas-administrativas', label: 'Ciencias Económicas y Administrativas' },
    { key: 'ciencias-juridicas', label: 'Ciencias Jurídicas' },
    { key: 'ciencias-politicas-relaciones-internacionales', label: 'Ciencias Políticas y RRII' },
    { key: 'ciencias-sociales', label: 'Ciencias Sociales' },
    { key: 'comunicacion-lenguaje', label: 'Comunicación y Lenguaje' },
    { key: 'derecho-canonico', label: 'Derecho Canónico' },
    { key: 'educacion', label: 'Educación' },
    { key: 'enfermeria', label: 'Enfermería' },
    { key: 'estudios-ambientales-rurales', label: 'Estudios Ambientales y Rurales' },
    { key: 'expo-javeriana', label: 'Expo Javeriana - Pregrado' },
    { key: 'filosofia', label: 'Filosofía' },
    { key: 'ingenieria', label: 'Ingeniería' },
    { key: 'instituto-pensar', label: 'Instituto Pensar' },
    { key: 'instituto-salud-publica', label: 'Instituto de Salud Pública' },
    { key: 'medicina', label: 'Medicina' },
    { key: 'odontologia', label: 'Odontología' },
    { key: 'psicologia', label: 'Psicología' },
    { key: 'teologia', label: 'Teología' }
  ]

  // Manejar cambio de tema base
  const handleBaseThemeChange = (keys: { currentKey?: string }) => {
    const key = keys.currentKey

    if (key !== undefined && key !== null) {
      setBaseTheme(String(key))
    }
  }

  // Manejar cambio de tema de facultad
  const handleFacultyThemeChange = (keys: { currentKey?: string }): void => {
    const key = keys.currentKey

    if (key !== undefined && key !== null) {
      setFacultyTheme(String(key))
    }
  }

  // Obtener valores actuales para los selects
  const currentBaseTheme = isSSR ? 'light' : themeBase || 'light'
  const currentFacultyTheme = isSSR ? 'default' : themeFaculty || 'default'

  // Toggle entre estados
  const toggleExpanded = () => {
    if (isMinimized) {
      setIsMinimized(false)
      setIsExpanded(true)
    } else {
      setIsExpanded(!isExpanded)
    }
  }

  const minimizePanel = () => {
    setIsExpanded(false)
    setIsMinimized(true)
  }

  // Estado de carga
  if (isLoading) {
    return (
      <div className='fixed bottom-5 left-5 z-[9999]'>
        <Button isIconOnly className='animate-pulse' variant='flat'>
          <i className='ph ph-palette text-lg' />
        </Button>
      </div>
    )
  }

  // Panel minimizado (solo icono)
  if (isMinimized) {
    return (
      <div className='fixed bottom-2 left-20 z-[9999]'>
        <Button
          isIconOnly
          aria-label='Abrir selector de temas'
          className='shadow-lg'
          color='primary'
          variant='shadow'
          onPress={toggleExpanded}>
          <i className='ph ph-palette text-lg' />
        </Button>
      </div>
    )
  }

  return (
    <div className='fixed bottom-2 left-20 z-[9999] w-full max-w-80'>
      <Card className='shadow-xl border-1 border-default-200 bg-background/95 backdrop-blur-md'>
        <CardBody className='p-4'>
          {/* Panel expandible - ahora va ARRIBA */}
          {isExpanded && (
            <div className='space-y-4 animate-in slide-in-from-bottom-2 duration-300 mb-4'>
              {/* Selectores */}
              <div className='grid grid-cols-1 gap-3'>
                {/* Selector de tema base */}
                <Select
                  aria-label='Cambiar tema base'
                  className='w-full'
                  labelPlacement='outside'
                  placeholder='Seleccionar...'
                  selectedKeys={new Set([currentBaseTheme])}
                  selectorIcon={<i className='ph ph-caret-down' />}
                  size='sm'
                  onSelectionChange={handleBaseThemeChange}>
                  {baseThemes.map(theme => (
                    <SelectItem key={theme.key} startContent={<i className={`ph ${theme.icon}`} />}>
                      {theme.label}
                    </SelectItem>
                  ))}
                </Select>

                {/* Selector de facultad */}
                <Select
                  aria-label='Cambiar tema de facultad'
                  className='w-full'
                  labelPlacement='outside'
                  placeholder='Seleccionar facultad...'
                  selectedKeys={new Set([currentFacultyTheme])}
                  selectorIcon={<i className='ph ph-caret-down' />}
                  size='sm'
                  onSelectionChange={handleFacultyThemeChange}>
                  {facultyThemes.map(theme => (
                    <SelectItem key={theme.key} className={theme.key === 'default' ? 'font-medium' : ''}>
                      {theme.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              {/* Preview de colores */}
              <div className='flex items-center justify-between p-3 bg-default-100 rounded-lg'>
                <span className='text-xs text-foreground-600 font-medium'>Vista previa de colores:</span>
                <div className='flex gap-2'>
                  <div
                    className='w-4 h-4 rounded-full border-2 border-background shadow-sm'
                    style={{ backgroundColor: 'var(--primary-500)' }}
                    title='Primary'
                  />
                  <div
                    className='w-4 h-4 rounded-full border-2 border-background shadow-sm'
                    style={{ backgroundColor: 'var(--secondary-500)' }}
                    title='Secondary'
                  />
                  <div
                    className='w-4 h-4 rounded-full border-2 border-background shadow-sm'
                    style={{ backgroundColor: 'var(--success-500)' }}
                    title='Success'
                  />
                </div>
              </div>

              {/* Acciones rápidas */}
              <div className='flex gap-2'>
                <Button
                  className='flex-1 text-xs'
                  size='sm'
                  startContent={<i className='ph ph-arrow-clockwise' />}
                  variant='flat'
                  onPress={() => {
                    setBaseTheme('light')
                    setFacultyTheme('default')
                  }}>
                  Reset
                </Button>

                <Button className='text-xs' size='sm' variant='flat' onPress={() => setIsExpanded(false)}>
                  Ocultar
                </Button>
              </div>
            </div>
          )}

          {/* Header con controles - ahora va ABAJO */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <i className='ph ph-palette text-primary text-lg' />
              <span className='text-sm font-medium text-foreground-600'>Personalizar Tema</span>
            </div>

            <div className='flex gap-1'>
              <Button
                isIconOnly
                aria-label={isExpanded ? 'Contraer panel' : 'Expandir panel'}
                className='min-w-6 w-6 h-6'
                size='sm'
                variant='light'
                onPress={toggleExpanded}>
                <i className={`ph text-sm ${isExpanded ? 'ph-caret-down' : 'ph-caret-up'}`} />
              </Button>

              <Button isIconOnly aria-label='Minimizar panel' className='min-w-6 w-6 h-6' size='sm' variant='light' onPress={minimizePanel}>
                <i className='ph ph-minus text-sm' />
              </Button>
            </div>
          </div>

          {/* Indicador de tema actual (siempre visible) - también abajo */}
          <div className='flex items-center justify-between mt-3'>
            <div className='flex gap-1'>
              <Chip className='text-xs' color='primary' size='sm' variant='flat'>
                {currentBaseTheme === 'light' ? '☀️' : '🌙'} {currentBaseTheme}
              </Chip>
              {currentFacultyTheme !== 'default' && (
                <Chip className='text-xs' color='secondary' size='sm' variant='flat'>
                  {currentFacultyTheme}
                </Chip>
              )}
            </div>

            {/* Botón de toggle rápido */}
            <Button
              className='text-xs'
              size='sm'
              startContent={<i className={`ph ${currentBaseTheme === 'light' ? 'ph-moon' : 'ph-sun'}`} />}
              variant='flat'
              onPress={() => setBaseTheme(currentBaseTheme === 'light' ? 'dark' : 'light')}>
              Toggle
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default CollapsibleThemeSwitch
