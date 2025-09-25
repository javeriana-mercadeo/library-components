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
    <div className="w-full max-w-6xl mt-12">
      <Card shadow="lg" radius="lg">
        <CardHeader className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <i className="ph ph-gear text-2xl text-primary" />
            <div>
              <h3 className="text-xl font-bold">Configuración Global</h3>
              <p className="text-small text-default-500">
                Ajustes para el entorno de desarrollo y visualización
              </p>
            </div>
          </div>
          <Button
            isIconOnly
            variant="light"
            onPress={() => setIsExpanded(!isExpanded)}
          >
            <i className={`ph ${isExpanded ? 'ph-caret-up' : 'ph-caret-down'} text-lg`} />
          </Button>
        </CardHeader>

        {isExpanded && (
          <>
            <Divider />
            <CardBody className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Configuración de Tema */}
                <div className="space-y-3">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <i className="ph ph-palette text-primary" />
                    Tema de la interfaz
                  </label>
                  <Select
                    value={config.theme}
                    onChange={(value) => setConfig({ ...config, theme: value.target.value })}
                    placeholder="Seleccionar tema"
                    variant="bordered"
                  >
                    {themes.map((theme) => (
                      <SelectItem key={theme.key} value={theme.key}>
                        {theme.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>

                {/* Configuración de Entorno */}
                <div className="space-y-3">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <i className="ph ph-globe text-secondary" />
                    Entorno
                  </label>
                  <Select
                    value={config.environment}
                    onChange={(value) => setConfig({ ...config, environment: value.target.value })}
                    placeholder="Seleccionar entorno"
                    variant="bordered"
                  >
                    {environments.map((env) => (
                      <SelectItem key={env.key} value={env.key}>
                        {env.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>

                {/* URL Base */}
                <div className="space-y-3">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <i className="ph ph-link text-success" />
                    URL Base
                  </label>
                  <Input
                    placeholder="https://ejemplo.com"
                    variant="bordered"
                    startContent={<i className="ph ph-globe text-default-400" />}
                  />
                </div>

              </div>

              <Divider />

              {/* Switches de configuración */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold flex items-center gap-2">
                  <i className="ph ph-toggles text-warning" />
                  Configuraciones Avanzadas
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between items-center p-4 border border-divider rounded-lg">
                    <div>
                      <p className="font-medium">Analytics</p>
                      <p className="text-sm text-default-500">Habilitar seguimiento de analytics</p>
                    </div>
                    <Switch
                      isSelected={config.enableAnalytics}
                      onValueChange={(value) => setConfig({ ...config, enableAnalytics: value })}
                      color="primary"
                    />
                  </div>

                  <div className="flex justify-between items-center p-4 border border-divider rounded-lg">
                    <div>
                      <p className="font-medium">Modo Debug</p>
                      <p className="text-sm text-default-500">Mostrar información de depuración</p>
                    </div>
                    <Switch
                      isSelected={config.enableDebug}
                      onValueChange={(value) => setConfig({ ...config, enableDebug: value })}
                      color="secondary"
                    />
                  </div>

                  <div className="flex justify-between items-center p-4 border border-divider rounded-lg">
                    <div>
                      <p className="font-medium">Caché</p>
                      <p className="text-sm text-default-500">Habilitar caché de componentes</p>
                    </div>
                    <Switch
                      isSelected={config.cacheEnabled}
                      onValueChange={(value) => setConfig({ ...config, cacheEnabled: value })}
                      color="success"
                    />
                  </div>

                  <div className="flex justify-between items-center p-4 border border-divider rounded-lg">
                    <div>
                      <p className="font-medium">Estado Actual</p>
                      <div className="flex gap-2 mt-1">
                        <Chip size="sm" color="success" variant="flat">
                          {config.environment}
                        </Chip>
                        <Chip size="sm" color="primary" variant="dot">
                          {config.theme}
                        </Chip>
                      </div>
                    </div>
                    <Button color="primary" variant="ghost" size="sm">
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