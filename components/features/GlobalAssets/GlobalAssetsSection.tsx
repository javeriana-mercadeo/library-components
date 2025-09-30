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
      case 'loaded':
        return 'success'
      case 'loading':
        return 'warning'
      case 'error':
        return 'danger'
      default:
        return 'default'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'scss':
      case 'css':
        return 'ph-file-css'
      case 'js':
        return 'ph-file-js'
      case 'font':
        return 'ph-textbox'
      default:
        return 'ph-file'
    }
  }

  const renderAssetList = (assets: any[]) => (
    <div className='space-y-3'>
      {assets.map((asset, index) => (
        <div
          key={index}
          className='flex items-center justify-between p-4 border border-divider rounded-lg hover:bg-content2 transition-colors'>
          <div className='flex items-center gap-3'>
            <Avatar
              classNames={{
                base: 'bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30',
                icon: 'text-white'
              }}
              icon={<i className={`ph ${getTypeIcon(asset.type)} text-lg`} />}
              size='sm'
            />
            <div>
              <p className='font-medium'>{asset.name}</p>
              <p className='text-sm text-default-500 font-mono'>{asset.path}</p>
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <span className='text-sm text-default-500'>{asset.size}</span>
            <Chip color={getStatusColor(asset.status)} size='sm' variant='flat'>
              {asset.status}
            </Chip>
          </div>
        </div>
      ))}
    </div>
  )

  const totalSize = [...styleAssets, ...scriptAssets, ...fontAssets].reduce((total, asset) => {
    const sizeNum = parseFloat(asset.size.replace(' KB', ''))

    return total + sizeNum
  }, 0)

  const loadedAssets = [...styleAssets, ...scriptAssets, ...fontAssets].filter(asset => asset.status === 'loaded').length

  const totalAssets = styleAssets.length + scriptAssets.length + fontAssets.length

  return (
    <div className='w-full max-w-6xl mt-12'>
      <Card radius='lg' shadow='lg'>
        <CardHeader>
          <div className='flex justify-between items-center w-full'>
            <div className='flex items-center gap-3'>
              <i className='ph ph-package text-2xl text-success' />
              <div>
                <h3 className='text-xl font-bold'>Assets Globales</h3>
                <p className='text-small text-default-500'>Recursos cargados y disponibles en la aplicación</p>
              </div>
            </div>
            <div className='text-right'>
              <p className='text-sm text-default-500'>Total: {totalSize.toFixed(1)} KB</p>
              <div className='flex items-center gap-2 mt-1'>
                <AvatarGroup isBordered max={3} size='sm'>
                  <Avatar classNames={{ name: 'text-xs' }} name='CSS' />
                  <Avatar classNames={{ name: 'text-xs' }} name='JS' />
                  <Avatar classNames={{ name: 'text-xs' }} name='Fonts' />
                </AvatarGroup>
              </div>
            </div>
          </div>
        </CardHeader>

        <Divider />

        <CardBody>
          {/* Progress Summary */}
          <div className='mb-6'>
            <div className='flex justify-between items-center mb-2'>
              <span className='text-sm font-medium'>Estado de Carga</span>
              <span className='text-sm text-default-500'>
                {loadedAssets}/{totalAssets} assets
              </span>
            </div>
            <Progress showValueLabel className='max-w-full' color='success' value={(loadedAssets / totalAssets) * 100} />
          </div>

          {/* Asset Tabs */}
          <Tabs
            classNames={{
              tabList: 'gap-6 w-full relative rounded-none p-0 border-b border-divider',
              cursor: 'w-full bg-primary',
              tab: 'max-w-fit px-0 h-12',
              tabContent: 'group-data-[selected=true]:text-primary'
            }}
            selectedKey={selectedAssetTab}
            variant='underlined'
            onSelectionChange={key => setSelectedAssetTab(String(key))}>
            <Tab
              key='styles'
              title={
                <div className='flex items-center gap-2'>
                  <i className='ph ph-palette' />
                  <span>Estilos</span>
                  <Chip size='sm' variant='faded'>
                    {styleAssets.length}
                  </Chip>
                </div>
              }>
              {renderAssetList(styleAssets)}
            </Tab>

            <Tab
              key='scripts'
              title={
                <div className='flex items-center gap-2'>
                  <i className='ph ph-code' />
                  <span>Scripts</span>
                  <Chip size='sm' variant='faded'>
                    {scriptAssets.length}
                  </Chip>
                </div>
              }>
              {renderAssetList(scriptAssets)}
            </Tab>

            <Tab
              key='fonts'
              title={
                <div className='flex items-center gap-2'>
                  <i className='ph ph-textbox' />
                  <span>Fuentes</span>
                  <Chip size='sm' variant='faded'>
                    {fontAssets.length}
                  </Chip>
                </div>
              }>
              {renderAssetList(fontAssets)}
            </Tab>
          </Tabs>

          {/* Actions */}
          <div className='flex gap-3 mt-6 pt-4 border-t border-divider'>
            <Button color='primary' startContent={<i className='ph ph-download-simple' />} variant='ghost'>
              Exportar Lista
            </Button>
            <Button color='secondary' startContent={<i className='ph ph-arrows-clockwise' />} variant='light'>
              Refrescar
            </Button>
            <Button color='success' startContent={<i className='ph ph-check-circle' />} variant='light'>
              Verificar Integridad
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
