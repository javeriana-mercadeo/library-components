'use client'

import { Card, CardHeader, CardBody, Button, Chip, Progress, Avatar, AvatarGroup, Tabs, Tab, Divider } from '@heroui/react'
import { useState } from 'react'

export default function GlobalAssetsSection() {
  const [selectedAssetTab, setSelectedAssetTab] = useState('styles')

  const styleAssets = [
    {
      name: 'Global Styles',
      path: '/styles/global.scss',
      size: '45.2 KB',
      status: 'loaded',
      type: 'scss'
    },
    {
      name: 'Tailwind Config',
      path: '/styles/vendors/_tailwind.css',
      size: '128.7 KB',
      status: 'loaded',
      type: 'css'
    },
    {
      name: 'Theme Variables',
      path: '/styles/theme.scss',
      size: '12.3 KB',
      status: 'loaded',
      type: 'scss'
    }
  ]

  const scriptAssets = [
    {
      name: 'Flowbite JS',
      path: 'cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js',
      size: '89.4 KB',
      status: 'loaded',
      type: 'js'
    },
    {
      name: 'Swiper Bundle',
      path: 'cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',
      size: '156.8 KB',
      status: 'loaded',
      type: 'js'
    },
    {
      name: 'Utils Main',
      path: '/utils/main.js',
      size: '23.1 KB',
      status: 'loaded',
      type: 'js'
    }
  ]

  const fontAssets = [
    {
      name: 'Phosphor Icons Regular',
      path: 'cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/regular/style.css',
      size: '67.2 KB',
      status: 'loaded',
      type: 'font'
    },
    {
      name: 'Phosphor Icons Fill',
      path: 'cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/fill/style.css',
      size: '58.9 KB',
      status: 'loaded',
      type: 'font'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'loaded': return 'success'
      case 'loading': return 'warning'
      case 'error': return 'danger'
      default: return 'default'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'scss':
      case 'css': return 'ph-file-css'
      case 'js': return 'ph-file-js'
      case 'font': return 'ph-textbox'
      default: return 'ph-file'
    }
  }

  const renderAssetList = (assets: any[]) => (
    <div className="space-y-3">
      {assets.map((asset, index) => (
        <div key={index} className="flex items-center justify-between p-4 border border-divider rounded-lg hover:bg-content2 transition-colors">
          <div className="flex items-center gap-3">
            <Avatar
              icon={<i className={`ph ${getTypeIcon(asset.type)} text-lg`} />}
              classNames={{
                base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
                icon: "text-white",
              }}
              size="sm"
            />
            <div>
              <p className="font-medium">{asset.name}</p>
              <p className="text-sm text-default-500 font-mono">{asset.path}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-default-500">{asset.size}</span>
            <Chip
              color={getStatusColor(asset.status)}
              size="sm"
              variant="flat"
            >
              {asset.status}
            </Chip>
          </div>
        </div>
      ))}
    </div>
  )

  const totalSize = [
    ...styleAssets,
    ...scriptAssets,
    ...fontAssets
  ].reduce((total, asset) => {
    const sizeNum = parseFloat(asset.size.replace(' KB', ''))
    return total + sizeNum
  }, 0)

  const loadedAssets = [
    ...styleAssets,
    ...scriptAssets,
    ...fontAssets
  ].filter(asset => asset.status === 'loaded').length

  const totalAssets = styleAssets.length + scriptAssets.length + fontAssets.length

  return (
    <div className="w-full max-w-6xl mt-12">
      <Card shadow="lg" radius="lg">
        <CardHeader>
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-3">
              <i className="ph ph-package text-2xl text-success" />
              <div>
                <h3 className="text-xl font-bold">Assets Globales</h3>
                <p className="text-small text-default-500">
                  Recursos cargados y disponibles en la aplicación
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-default-500">Total: {totalSize.toFixed(1)} KB</p>
              <div className="flex items-center gap-2 mt-1">
                <AvatarGroup isBordered max={3} size="sm">
                  <Avatar name="CSS" classNames={{ name: "text-xs" }} />
                  <Avatar name="JS" classNames={{ name: "text-xs" }} />
                  <Avatar name="Fonts" classNames={{ name: "text-xs" }} />
                </AvatarGroup>
              </div>
            </div>
          </div>
        </CardHeader>

        <Divider />

        <CardBody>
          {/* Progress Summary */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Estado de Carga</span>
              <span className="text-sm text-default-500">{loadedAssets}/{totalAssets} assets</span>
            </div>
            <Progress
              value={(loadedAssets / totalAssets) * 100}
              color="success"
              className="max-w-full"
              showValueLabel
            />
          </div>

          {/* Asset Tabs */}
          <Tabs
            selectedKey={selectedAssetTab}
            onSelectionChange={(key) => setSelectedAssetTab(String(key))}
            variant="underlined"
            classNames={{
              tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
              cursor: "w-full bg-primary",
              tab: "max-w-fit px-0 h-12",
              tabContent: "group-data-[selected=true]:text-primary"
            }}
          >
            <Tab
              key="styles"
              title={
                <div className="flex items-center gap-2">
                  <i className="ph ph-palette" />
                  <span>Estilos</span>
                  <Chip size="sm" variant="faded">{styleAssets.length}</Chip>
                </div>
              }
            >
              {renderAssetList(styleAssets)}
            </Tab>

            <Tab
              key="scripts"
              title={
                <div className="flex items-center gap-2">
                  <i className="ph ph-code" />
                  <span>Scripts</span>
                  <Chip size="sm" variant="faded">{scriptAssets.length}</Chip>
                </div>
              }
            >
              {renderAssetList(scriptAssets)}
            </Tab>

            <Tab
              key="fonts"
              title={
                <div className="flex items-center gap-2">
                  <i className="ph ph-textbox" />
                  <span>Fuentes</span>
                  <Chip size="sm" variant="faded">{fontAssets.length}</Chip>
                </div>
              }
            >
              {renderAssetList(fontAssets)}
            </Tab>
          </Tabs>

          {/* Actions */}
          <div className="flex gap-3 mt-6 pt-4 border-t border-divider">
            <Button color="primary" variant="ghost" startContent={<i className="ph ph-download-simple" />}>
              Exportar Lista
            </Button>
            <Button color="secondary" variant="light" startContent={<i className="ph ph-arrows-clockwise" />}>
              Refrescar
            </Button>
            <Button color="success" variant="light" startContent={<i className="ph ph-check-circle" />}>
              Verificar Integridad
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}