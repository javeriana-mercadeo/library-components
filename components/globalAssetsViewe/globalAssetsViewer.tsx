'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { Button, Tabs, Tab, Snippet, Card, CardBody, Spinner, Chip, Pagination } from '@heroui/react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

const LINES_PER_PAGE = 300 // Mostrar solo 100 líneas por página

export default function GlobalAssetsViewer() {
  const [activeTab, setActiveTab] = useState('css')
  const [cssPage, setCssPage] = useState(1)
  const [jsPage, setJsPage] = useState(1)
  const [forceCompile, setForceCompile] = useState(true)
  const [assets, setAssets] = useState<{
    css: string
    js: string
    loading: boolean
    error: string | null
    lastBuild: string | null
    cached?: boolean
    savedFiles?: any
  }>({
    css: '',
    js: '',
    loading: true,
    error: null,
    lastBuild: null
  })

  // Dividir CSS en páginas
  const cssPages = useMemo(() => {
    if (!assets.css) return []
    const lines = assets.css.split('\n')
    const pages = []

    for (let i = 0; i < lines.length; i += LINES_PER_PAGE) {
      pages.push({
        content: lines.slice(i, i + LINES_PER_PAGE).join('\n'),
        startLine: i + 1,
        endLine: Math.min(i + LINES_PER_PAGE, lines.length)
      })
    }

    return pages
  }, [assets.css])

  // Dividir JS en páginas
  const jsPages = useMemo(() => {
    if (!assets.js) return []
    const lines = assets.js.split('\n')
    const pages = []

    for (let i = 0; i < lines.length; i += LINES_PER_PAGE) {
      pages.push({
        content: lines.slice(i, i + LINES_PER_PAGE).join('\n'),
        startLine: i + 1,
        endLine: Math.min(i + LINES_PER_PAGE, lines.length)
      })
    }

    return pages
  }, [assets.js])

  // Función para cargar assets desde la API con timeout
  const loadAssets = async () => {
    try {
      setAssets(prev => ({ ...prev, loading: true, error: null }))

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000)

      const response = await fetch(`/api/global${forceCompile ? '?force=true' : ''}`, {
        // 📌 DINÁMICO
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()

      setAssets({
        css: data.css || '',
        js: data.js || '',
        loading: false,
        error: null,
        lastBuild: new Date().toISOString(),
        cached: data.cached || false,
        savedFiles: data.savedFiles
      })
    } catch (error) {
      new Error('Error al cargar los assets globales')

      let errorMessage = 'Error desconocido al cargar los assets'

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = 'Timeout: La compilación tardó más de 30 segundos'
        } else {
          errorMessage = error.message
        }
      }

      setAssets(prev => ({
        ...prev,
        loading: false,
        error: errorMessage
      }))
    }
  }

  useEffect(() => {
    loadAssets()
  }, [])

  // Función para descargar archivo
  const downloadFile = (content: string, filename: string, type: string = 'text/plain'): void => {
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const downloadCSS = () => downloadFile(assets.css, 'global-styles.css', 'text/css')
  const downloadJS = () => downloadFile(assets.js, 'global-scripts.js', 'application/javascript')

  const recompileAssets = () => {
    loadAssets()
  }

  if (assets.error) {
    return (
      <Card className='w-full border border-red-200'>
        <CardBody className='text-center p-8'>
          <div className='text-red-500 mb-4'>
            <i className='ph ph-warning-circle text-4xl' />
          </div>
          <h3 className='text-lg font-semibold mb-2 text-[var(--neutral-200)]'>Error de compilación</h3>
          <p className='text-[var(--neutral-400)] mb-4 text-sm'>{assets.error}</p>
          <Button color='primary' onClick={recompileAssets}>
            Reintentar compilación
          </Button>
        </CardBody>
      </Card>
    )
  }

  return (
    <div className='w-full border border-[var(--neutral-800)] rounded-xl'>
      {/* Header */}
      <div className='flex justify-between items-center gap-2 p-4 border-b border-[var(--neutral-800)]'>
        <div className='flex items-center gap-3'>
          <div className='flex items-center gap-2'>
            <i className='ph ph-package text-[var(--primary-600)] text-xl' />
            <h2 className='text-lg font-semibold text-[var(--neutral-200)]'>Assets Globales</h2>
          </div>
          {assets.lastBuild && (
            <div className='flex gap-2'>
              <Chip color='success' size='sm' variant='flat'>
                Compilado: {new Date(assets.lastBuild).toLocaleTimeString()}
              </Chip>
              {assets.cached && (
                <Chip color='secondary' size='sm' variant='flat'>
                  Cache
                </Chip>
              )}
            </div>
          )}
        </div>

        <div className='flex gap-2'>
          <Button
            color={forceCompile ? 'warning' : 'default'}
            size='sm'
            startContent={<i className={forceCompile ? 'ph ph-lightning' : 'ph ph-clock'} />}
            variant={forceCompile ? 'solid' : 'flat'}
            onClick={() => setForceCompile(!forceCompile)}>
            {forceCompile ? 'Siempre recompilar' : 'Usar cache'}
          </Button>
          <Button
            isDisabled={assets.loading}
            size='sm'
            startContent={<i className='ph ph-arrow-clockwise' />}
            variant='flat'
            onClick={recompileAssets}>
            Recompilar
          </Button>
        </div>
      </div>

      {/* Loading state */}
      {assets.loading && (
        <div className='flex flex-col items-center justify-center py-12 gap-4'>
          <Spinner color='primary' size='lg' />
          <div className='text-center'>
            <p className='text-[var(--neutral-300)] font-medium'>Compilando assets globales...</p>
            <p className='text-sm text-[var(--neutral-500)] mt-1'>Procesando SCSS y JavaScript (esto puede tardar hasta 30 segundos)</p>
          </div>
        </div>
      )}

      {/* Content tabs */}
      {!assets.loading && (
        <div className='p-4'>
          <Tabs
            className='w-full'
            classNames={{
              base: 'w-full',
              tabList: 'w-full bg-[var(--background-200)] p-1 rounded-lg',
              tab: 'data-[selected=true]:bg-[var(--background-100)] data-[selected=true]:shadow-sm',
              panel: 'w-full pt-4'
            }}
            selectedKey={activeTab}
            onSelectionChange={key => {
              setActiveTab(String(key))
              // Reset páginas al cambiar de tab
              setCssPage(1)
              setJsPage(1)
            }}>
            {/* CSS Tab */}
            <Tab
              key='css'
              title={
                <div className='flex items-center gap-2'>
                  <i className='ph ph-file-css text-lg text-blue-500' />
                  <span>CSS Global</span>
                  <Chip color='primary' size='sm' variant='flat'>
                    {(assets.css.length / 1024).toFixed(1)}KB
                  </Chip>
                  <Chip color='warning' size='sm' variant='flat'>
                    {assets.css.split('\n').length} líneas
                  </Chip>
                </div>
              }>
              <div className='space-y-4'>
                {/* Actions bar */}
                <div className='flex justify-between items-center'>
                  <div className='flex items-center gap-4'>
                    <p className='text-sm text-[var(--neutral-400)]'>Estilos compilados desde SCSS</p>
                    {cssPages.length > 1 && (
                      <Chip color='danger' variant='flat'>
                        ⚠️ Archivo muy grande: {cssPages.length} páginas
                      </Chip>
                    )}
                  </div>
                  <div className='flex gap-2'>
                    <Snippet
                      classNames={{
                        base: 'bg-[var(--background-200)]',
                        copyButton: 'text-[var(--neutral-400)] hover:text-[var(--primary-600)]'
                      }}
                      codeString={assets.css}
                      size='sm'
                      symbol=''
                      variant='flat'>
                      <span className='text-xs'>Copiar CSS completo</span>
                    </Snippet>
                    <Button
                      color='primary'
                      isDisabled={!assets.css}
                      size='sm'
                      startContent={<i className='ph ph-download-simple' />}
                      variant='flat'
                      onClick={downloadCSS}>
                      Descargar
                    </Button>
                  </div>
                </div>

                {/* Paginación superior */}
                {cssPages.length > 1 && (
                  <div className='flex justify-between items-center bg-[var(--background-200)] p-3 rounded-lg'>
                    <div className='text-sm text-[var(--neutral-400)]'>
                      Página {cssPage} de {cssPages.length} • Líneas {cssPages[cssPage - 1]?.startLine} - {cssPages[cssPage - 1]?.endLine}
                    </div>
                    <Pagination showControls className='gap-2' page={cssPage} size='sm' total={cssPages.length} onChange={setCssPage} />
                  </div>
                )}

                {/* Code display */}
                {assets.css ? (
                  <div className='bg-[#2d3748] rounded-lg overflow-hidden border border-[var(--neutral-700)]'>
                    <SyntaxHighlighter
                      customStyle={{
                        margin: 0,
                        padding: '1.5rem',
                        background: 'transparent',
                        fontSize: '0.875rem',
                        lineHeight: '1.5',
                        maxHeight: '500px'
                      }}
                      language='css'
                      lineNumberStyle={{
                        minWidth: '4em',
                        paddingRight: '1em',
                        textAlign: 'right',
                        userSelect: 'none',
                        color: '#6b7280'
                      }}
                      showLineNumbers={true}
                      startingLineNumber={cssPages[cssPage - 1]?.startLine || 1}
                      style={a11yDark}
                      wrapLines={true}>
                      {cssPages[cssPage - 1]?.content || assets.css}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <Card>
                    <CardBody className='text-center p-8'>
                      <i className='ph ph-file-css text-4xl text-[var(--neutral-500)] mb-2' />
                      <p className='text-[var(--neutral-400)]'>No se encontró contenido CSS</p>
                    </CardBody>
                  </Card>
                )}

                {/* Paginación inferior */}
                {cssPages.length > 1 && (
                  <div className='flex justify-center'>
                    <Pagination showControls className='gap-2' page={cssPage} total={cssPages.length} onChange={setCssPage} />
                  </div>
                )}
              </div>
            </Tab>

            {/* JS Tab - Similar estructura */}
            <Tab
              key='js'
              title={
                <div className='flex items-center gap-2'>
                  <i className='ph ph-file-js text-lg text-yellow-500' />
                  <span>JavaScript Global</span>
                  <Chip color='warning' size='sm' variant='flat'>
                    {(assets.js.length / 1024).toFixed(1)}KB
                  </Chip>
                  <Chip color='success' size='sm' variant='flat'>
                    {assets.js.split('\n').length} líneas
                  </Chip>
                </div>
              }>
              <div className='space-y-4'>
                <div className='flex justify-between items-center'>
                  <div className='flex items-center gap-4'>
                    <p className='text-sm text-[var(--neutral-400)]'>JavaScript compilado con librerías externas</p>
                    {jsPages.length > 1 && (
                      <Chip color='warning' variant='flat'>
                        {jsPages.length} páginas
                      </Chip>
                    )}
                  </div>
                  <div className='flex gap-2'>
                    <Snippet
                      classNames={{
                        base: 'bg-[var(--background-200)]',
                        copyButton: 'text-[var(--neutral-400)] hover:text-[var(--primary-600)]'
                      }}
                      codeString={assets.js}
                      size='sm'
                      symbol=''
                      variant='flat'>
                      <span className='text-xs'>Copiar JS completo</span>
                    </Snippet>
                    <Button
                      color='primary'
                      isDisabled={!assets.js}
                      size='sm'
                      startContent={<i className='ph ph-download-simple' />}
                      variant='flat'
                      onClick={downloadJS}>
                      Descargar
                    </Button>
                  </div>
                </div>

                {jsPages.length > 1 && (
                  <div className='flex justify-between items-center bg-[var(--background-200)] p-3 rounded-lg'>
                    <div className='text-sm text-[var(--neutral-400)]'>
                      Página {jsPage} de {jsPages.length} • Líneas {jsPages[jsPage - 1]?.startLine} - {jsPages[jsPage - 1]?.endLine}
                    </div>
                    <Pagination showControls className='gap-2' page={jsPage} size='sm' total={jsPages.length} onChange={setJsPage} />
                  </div>
                )}

                {assets.js ? (
                  <div className='bg-[#2d3748] rounded-lg overflow-hidden border border-[var(--neutral-700)]'>
                    <SyntaxHighlighter
                      customStyle={{
                        margin: 0,
                        padding: '1.5rem',
                        background: 'transparent',
                        fontSize: '0.875rem',
                        lineHeight: '1.5',
                        maxHeight: '500px'
                      }}
                      language='javascript'
                      lineNumberStyle={{
                        minWidth: '4em',
                        paddingRight: '1em',
                        textAlign: 'right',
                        userSelect: 'none',
                        color: '#6b7280'
                      }}
                      showLineNumbers={true}
                      startingLineNumber={jsPages[jsPage - 1]?.startLine || 1}
                      style={a11yDark}
                      wrapLines={true}>
                      {jsPages[jsPage - 1]?.content || assets.js}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <Card>
                    <CardBody className='text-center p-8'>
                      <i className='ph ph-file-js text-4xl text-[var(--neutral-500)] mb-2' />
                      <p className='text-[var(--neutral-400)]'>No se encontró contenido JavaScript</p>
                    </CardBody>
                  </Card>
                )}

                {jsPages.length > 1 && (
                  <div className='flex justify-center'>
                    <Pagination showControls className='gap-2' page={jsPage} total={jsPages.length} onChange={setJsPage} />
                  </div>
                )}
              </div>
            </Tab>

            {/* Info Tab */}
            <Tab
              key='info'
              title={
                <div className='flex items-center gap-2'>
                  <i className='ph ph-info text-lg' />
                  <span>Análisis</span>
                </div>
              }>
              <div className='space-y-6'>
                {/* Estadísticas */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  <Card>
                    <CardBody className='p-4 text-center'>
                      <div className='text-2xl font-bold text-blue-500 mb-2'>{(assets.css.length / 1024).toFixed(1)}KB</div>
                      <p className='text-sm text-[var(--neutral-400)]'>Tamaño CSS</p>
                      <p className='text-xs text-[var(--neutral-500)]'>{assets.css.split('\n').length.toLocaleString()} líneas</p>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody className='p-4 text-center'>
                      <div className='text-2xl font-bold text-yellow-500 mb-2'>{(assets.js.length / 1024).toFixed(1)}KB</div>
                      <p className='text-sm text-[var(--neutral-400)]'>Tamaño JS</p>
                      <p className='text-xs text-[var(--neutral-500)]'>{assets.js.split('\n').length.toLocaleString()} líneas</p>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody className='p-4 text-center'>
                      <div className='text-2xl font-bold text-green-500 mb-2'>{cssPages.length + jsPages.length}</div>
                      <p className='text-sm text-[var(--neutral-400)]'>Páginas totales</p>
                      <p className='text-xs text-[var(--neutral-500)]'>{LINES_PER_PAGE} líneas por página</p>
                    </CardBody>
                  </Card>
                </div>

                {/* Recomendación de optimización */}
                {assets.css.split('\n').length > 10000 && (
                  <Card className='border-orange-200 bg-orange-50/10'>
                    <CardBody className='p-4'>
                      <h4 className='font-semibold mb-3 text-[var(--neutral-200)] flex items-center gap-2'>
                        <i className='ph ph-warning text-orange-500' />
                        ⚠️ CSS muy grande detectado
                      </h4>
                      <div className='text-sm text-[var(--neutral-400)] space-y-2'>
                        <p>
                          Tu CSS tiene <strong>{assets.css.split('\n').length.toLocaleString()} líneas</strong>. Esto puede causar problemas
                          de rendimiento.
                        </p>
                        <p>
                          <strong>Recomendaciones:</strong>
                        </p>
                        <ul className='list-disc list-inside space-y-1 ml-4'>
                          <li>Considera usar purgeCSS para eliminar estilos no usados</li>
                          <li>Revisa si hay importaciones duplicadas en SCSS</li>
                          <li>Usa importaciones específicas en lugar de importar librerías completas</li>
                        </ul>
                      </div>
                    </CardBody>
                  </Card>
                )}
              </div>
            </Tab>
          </Tabs>
        </div>
      )}
    </div>
  )
}
