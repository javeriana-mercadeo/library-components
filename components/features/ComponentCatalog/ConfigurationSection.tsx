'use client'

import { Card, CardHeader, CardBody, Button, Switch, Input, Select, SelectItem, Chip, Divider } from '@heroui/react'
import { useState } from 'react'

export default function ConfigurationSection() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [config, setConfig] = useState({
    theme: 'auto',
    environment: 'development',
    enableAnalytics: false,
    enableDebug: true,
    cacheEnabled: true
  })

  const environments = [
    { key: 'development', label: 'Desarrollo' },
    { key: 'staging', label: 'Staging' },
    { key: 'production', label: 'Producción' }
  ]

  const themes = [
    { key: 'light', label: 'Claro' },
    { key: 'dark', label: 'Oscuro' },
    { key: 'auto', label: 'Automático' }
  ]

  return (
    <div className='w-full max-w-6xl mt-12'>
      <Card radius='lg' shadow='lg'>
        <CardHeader className='flex justify-between items-center'>
          <div className='flex items-center gap-3'>
            <i className='ph ph-gear text-2xl text-primary' />
            <div>
              <h3 className='text-xl font-bold'>Configuración Global</h3>
              <p className='text-small text-default-500'>Ajustes para el entorno de desarrollo y visualización</p>
            </div>
          </div>
          <Button isIconOnly variant='light' onPress={() => setIsExpanded(!isExpanded)}>
            <i className={`ph ${isExpanded ? 'ph-caret-up' : 'ph-caret-down'} text-lg`} />
          </Button>
        </CardHeader>

        {isExpanded && (
          <>
            <Divider />
            <CardBody className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {/* Configuración de Tema */}
                <div className='space-y-3'>
                  <label className='text-sm font-medium flex items-center gap-2' htmlFor='theme-select'>
                    <i className='ph ph-palette text-primary' />
                    Tema de la interfaz
                  </label>
                  <Select
                    id='theme-select'
                    placeholder='Seleccionar tema'
                    value={config.theme}
                    variant='bordered'
                    onChange={value => setConfig({ ...config, theme: value.target.value })}>
                    {themes.map(theme => (
                      <SelectItem key={theme.key}>{theme.label}</SelectItem>
                    ))}
                  </Select>
                </div>

                {/* Configuración de Entorno */}
                <div className='space-y-3'>
                  <label className='text-sm font-medium flex items-center gap-2' htmlFor='environment-select'>
                    <i className='ph ph-globe text-secondary' />
                    Entorno
                  </label>
                  <Select
                    id='environment-select'
                    placeholder='Seleccionar entorno'
                    value={config.environment}
                    variant='bordered'
                    onChange={value => setConfig({ ...config, environment: value.target.value })}>
                    {environments.map(env => (
                      <SelectItem key={env.key}>{env.label}</SelectItem>
                    ))}
                  </Select>
                </div>

                {/* URL Base */}
                <div className='space-y-3'>
                  <label className='text-sm font-medium flex items-center gap-2' htmlFor='url-base-input'>
                    <i className='ph ph-link text-success' />
                    URL Base
                  </label>
                  <Input
                    id='url-base-input'
                    placeholder='https://ejemplo.com'
                    startContent={<i className='ph ph-globe text-default-400' />}
                    variant='bordered'
                  />
                </div>
              </div>

              <Divider />

              {/* Switches de configuración */}
              <div className='space-y-4'>
                <h4 className='text-lg font-semibold flex items-center gap-2'>
                  <i className='ph ph-toggles text-warning' />
                  Configuraciones Avanzadas
                </h4>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='flex justify-between items-center p-4 border border-divider rounded-lg'>
                    <div>
                      <p className='font-medium'>Analytics</p>
                      <p className='text-sm text-default-500'>Habilitar seguimiento de analytics</p>
                    </div>
                    <Switch
                      color='primary'
                      isSelected={config.enableAnalytics}
                      onValueChange={value => setConfig({ ...config, enableAnalytics: value })}
                    />
                  </div>

                  <div className='flex justify-between items-center p-4 border border-divider rounded-lg'>
                    <div>
                      <p className='font-medium'>Modo Debug</p>
                      <p className='text-sm text-default-500'>Mostrar información de depuración</p>
                    </div>
                    <Switch
                      color='secondary'
                      isSelected={config.enableDebug}
                      onValueChange={value => setConfig({ ...config, enableDebug: value })}
                    />
                  </div>

                  <div className='flex justify-between items-center p-4 border border-divider rounded-lg'>
                    <div>
                      <p className='font-medium'>Caché</p>
                      <p className='text-sm text-default-500'>Habilitar caché de componentes</p>
                    </div>
                    <Switch
                      color='success'
                      isSelected={config.cacheEnabled}
                      onValueChange={value => setConfig({ ...config, cacheEnabled: value })}
                    />
                  </div>

                  <div className='flex justify-between items-center p-4 border border-divider rounded-lg'>
                    <div>
                      <p className='font-medium'>Estado Actual</p>
                      <div className='flex gap-2 mt-1'>
                        <Chip color='success' size='sm' variant='flat'>
                          {config.environment}
                        </Chip>
                        <Chip color='primary' size='sm' variant='dot'>
                          {config.theme}
                        </Chip>
                      </div>
                    </div>
                    <Button color='primary' size='sm' variant='ghost'>
                      Aplicar
                    </Button>
                  </div>
                </div>
              </div>
            </CardBody>
          </>
        )}
      </Card>
    </div>
  )
}
