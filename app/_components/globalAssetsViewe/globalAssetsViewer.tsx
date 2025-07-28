'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { Button, Tabs, Tab, Snippet, Card, CardBody, Spinner, Chip, Pagination } from '@heroui/react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

const LINES_PER_PAGE = 300 // Mostrar solo 100 líneas por página

export default function GlobalAssetsViewer() {
  const [activeTab, setActiveTab] = useState('css')
  const [cssPage, setCssPage] = useState(1)
  const [jsPage, setJsPage] = useState(1)
  const [forceCompile, setForceCompile] = useState(true) // 📌 NUEVO: Estado para forzar compilación
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

      console.log('🔄 Iniciando petición a /api/global...')

      const response = await fetch(`/api/global${forceCompile ? '?force=true' : ''}`, {
        // 📌 DINÁMICO
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      console.log('📡 Respuesta recibida:', response.status, response.statusText)

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      console.log('✅ Datos procesados:', {
        cssSize: data.css?.length || 0,
        jsSize: data.js?.length || 0,
        cssLines: data.css?.split('\n').length || 0,
        jsLines: data.js?.split('\n').length || 0,
        cached: data.cached,
        compilationTime: data.compilationTime,
        savedFiles: data.savedFiles
      })

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
      console.error('❌ Error cargando assets:', error)

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
    console.log('🔄 Recompilando assets...')
    loadAssets()
  }

  if (assets.error) {
    return (
      <Card className="w-full border border-red-200">
        <CardBody className="text-center p-8">
          <div className="text-red-500 mb-4">
            <i className="ph ph-warning-circle text-4xl"></i>
          </div>
          <h3 className="text-lg font-semibold mb-2 text-[var(--neutral-200)]">Error de compilación</h3>
          <p className="text-[var(--neutral-400)] mb-4 text-sm">{assets.error}</p>
          <Button color="primary" onClick={recompileAssets}>
            Reintentar compilación
          </Button>
        </CardBody>
      </Card>
    )
  }

  return (
    <div className="w-full border border-[var(--neutral-800)] rounded-xl">
      {/* Header */}
      <div className="flex justify-between items-center gap-2 p-4 border-b border-[var(--neutral-800)]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <i className="ph ph-package text-[var(--primary-600)] text-xl"></i>
            <h2 className="text-lg font-semibold text-[var(--neutral-200)]">Assets Globales</h2>
          </div>
          {assets.lastBuild && (
            <div className="flex gap-2">
              <Chip color="success" variant="flat" size="sm">
                Compilado: {new Date(assets.lastBuild).toLocaleTimeString()}
              </Chip>
              {assets.cached && (
                <Chip color="secondary" variant="flat" size="sm">
                  Cache
                </Chip>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant={forceCompile ? 'solid' : 'flat'}
            color={forceCompile ? 'warning' : 'default'}
            startContent={<i className={forceCompile ? 'ph ph-lightning' : 'ph ph-clock'}></i>}
            onClick={() => setForceCompile(!forceCompile)}>
            {forceCompile ? 'Siempre recompilar' : 'Usar cache'}
          </Button>
          <Button
            size="sm"
            variant="flat"
            startContent={<i className="ph ph-arrow-clockwise"></i>}
            onClick={recompileAssets}
            isDisabled={assets.loading}>
            Recompilar
          </Button>
        </div>
      </div>

      {/* Loading state */}
      {assets.loading && (
        <div className="flex flex-col items-center justify-center py-12 gap-4">
          <Spinner size="lg" color="primary" />
          <div className="text-center">
            <p className="text-[var(--neutral-300)] font-medium">Compilando assets globales...</p>
            <p className="text-sm text-[var(--neutral-500)] mt-1">Procesando SCSS y JavaScript (esto puede tardar hasta 30 segundos)</p>
          </div>
        </div>
      )}

      {/* Content tabs */}
      {!assets.loading && (
        <div className="p-4">
          <Tabs
            selectedKey={activeTab}
            onSelectionChange={key => {
              setActiveTab(String(key))
              // Reset páginas al cambiar de tab
              setCssPage(1)
              setJsPage(1)
            }}
            className="w-full"
            classNames={{
              base: 'w-full',
              tabList: 'w-full bg-[var(--background-200)] p-1 rounded-lg',
              tab: 'data-[selected=true]:bg-[var(--background-100)] data-[selected=true]:shadow-sm',
              panel: 'w-full pt-4'
            }}>
            {/* CSS Tab */}
            <Tab
              key="css"
              title={
                <div className="flex items-center gap-2">
                  <i className="ph ph-file-css text-lg text-blue-500"></i>
                  <span>CSS Global</span>
                  <Chip size="sm" variant="flat" color="primary">
                    {(assets.css.length / 1024).toFixed(1)}KB
                  </Chip>
                  <Chip size="sm" variant="flat" color="warning">
                    {assets.css.split('\n').length} líneas
                  </Chip>
                </div>
              }>
              <div className="space-y-4">
                {/* Actions bar */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <p className="text-sm text-[var(--neutral-400)]">Estilos compilados desde SCSS</p>
                    {cssPages.length > 1 && (
                      <Chip color="danger" variant="flat">
                        ⚠️ Archivo muy grande: {cssPages.length} páginas
                      </Chip>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Snippet
                      variant="flat"
                      size="sm"
                      codeString={assets.css}
                      symbol=""
                      classNames={{
                        base: 'bg-[var(--background-200)]',
                        copyButton: 'text-[var(--neutral-400)] hover:text-[var(--primary-600)]'
                      }}>
                      <span className="text-xs">Copiar CSS completo</span>
                    </Snippet>
                    <Button
                      size="sm"
                      color="primary"
                      variant="flat"
                      startContent={<i className="ph ph-download-simple"></i>}
                      onClick={downloadCSS}
                      isDisabled={!assets.css}>
                      Descargar
                    </Button>
                  </div>
                </div>

                {/* Paginación superior */}
                {cssPages.length > 1 && (
                  <div className="flex justify-between items-center bg-[var(--background-200)] p-3 rounded-lg">
                    <div className="text-sm text-[var(--neutral-400)]">
                      Página {cssPage} de {cssPages.length} • Líneas {cssPages[cssPage - 1]?.startLine} - {cssPages[cssPage - 1]?.endLine}
                    </div>
                    <Pagination size="sm" total={cssPages.length} page={cssPage} onChange={setCssPage} showControls className="gap-2" />
                  </div>
                )}

                {/* Code display */}
                {assets.css ? (
                  <div className="bg-[#2d3748] rounded-lg overflow-hidden border border-[var(--neutral-700)]">
                    <SyntaxHighlighter
                      language="css"
                      style={a11yDark}
                      customStyle={{
                        margin: 0,
                        padding: '1.5rem',
                        background: 'transparent',
                        fontSize: '0.875rem',
                        lineHeight: '1.5',
                        maxHeight: '500px'
                      }}
                      showLineNumbers={true}
                      startingLineNumber={cssPages[cssPage - 1]?.startLine || 1}
                      wrapLines={true}
                      lineNumberStyle={{
                        minWidth: '4em',
                        paddingRight: '1em',
                        textAlign: 'right',
                        userSelect: 'none',
                        color: '#6b7280'
                      }}>
                      {cssPages[cssPage - 1]?.content || assets.css}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <Card>
                    <CardBody className="text-center p-8">
                      <i className="ph ph-file-css text-4xl text-[var(--neutral-500)] mb-2"></i>
                      <p className="text-[var(--neutral-400)]">No se encontró contenido CSS</p>
                    </CardBody>
                  </Card>
                )}

                {/* Paginación inferior */}
                {cssPages.length > 1 && (
                  <div className="flex justify-center">
                    <Pagination total={cssPages.length} page={cssPage} onChange={setCssPage} showControls className="gap-2" />
                  </div>
                )}
              </div>
            </Tab>

            {/* JS Tab - Similar estructura */}
            <Tab
              key="js"
              title={
                <div className="flex items-center gap-2">
                  <i className="ph ph-file-js text-lg text-yellow-500"></i>
                  <span>JavaScript Global</span>
                  <Chip size="sm" variant="flat" color="warning">
                    {(assets.js.length / 1024).toFixed(1)}KB
                  </Chip>
                  <Chip size="sm" variant="flat" color="success">
                    {assets.js.split('\n').length} líneas
                  </Chip>
                </div>
              }>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <p className="text-sm text-[var(--neutral-400)]">JavaScript compilado con librerías externas</p>
                    {jsPages.length > 1 && (
                      <Chip color="warning" variant="flat">
                        {jsPages.length} páginas
                      </Chip>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Snippet
                      variant="flat"
                      size="sm"
                      codeString={assets.js}
                      symbol=""
                      classNames={{
                        base: 'bg-[var(--background-200)]',
                        copyButton: 'text-[var(--neutral-400)] hover:text-[var(--primary-600)]'
                      }}>
                      <span className="text-xs">Copiar JS completo</span>
                    </Snippet>
                    <Button
                      size="sm"
                      color="primary"
                      variant="flat"
                      startContent={<i className="ph ph-download-simple"></i>}
                      onClick={downloadJS}
                      isDisabled={!assets.js}>
                      Descargar
                    </Button>
                  </div>
                </div>

                {jsPages.length > 1 && (
                  <div className="flex justify-between items-center bg-[var(--background-200)] p-3 rounded-lg">
                    <div className="text-sm text-[var(--neutral-400)]">
                      Página {jsPage} de {jsPages.length} • Líneas {jsPages[jsPage - 1]?.startLine} - {jsPages[jsPage - 1]?.endLine}
                    </div>
                    <Pagination size="sm" total={jsPages.length} page={jsPage} onChange={setJsPage} showControls className="gap-2" />
                  </div>
                )}

                {assets.js ? (
                  <div className="bg-[#2d3748] rounded-lg overflow-hidden border border-[var(--neutral-700)]">
                    <SyntaxHighlighter
                      language="javascript"
                      style={a11yDark}
                      customStyle={{
                        margin: 0,
                        padding: '1.5rem',
                        background: 'transparent',
                        fontSize: '0.875rem',
                        lineHeight: '1.5',
                        maxHeight: '500px'
                      }}
                      showLineNumbers={true}
                      startingLineNumber={jsPages[jsPage - 1]?.startLine || 1}
                      wrapLines={true}
                      lineNumberStyle={{
                        minWidth: '4em',
                        paddingRight: '1em',
                        textAlign: 'right',
                        userSelect: 'none',
                        color: '#6b7280'
                      }}>
                      {jsPages[jsPage - 1]?.content || assets.js}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <Card>
                    <CardBody className="text-center p-8">
                      <i className="ph ph-file-js text-4xl text-[var(--neutral-500)] mb-2"></i>
                      <p className="text-[var(--neutral-400)]">No se encontró contenido JavaScript</p>
                    </CardBody>
                  </Card>
                )}

                {jsPages.length > 1 && (
                  <div className="flex justify-center">
                    <Pagination total={jsPages.length} page={jsPage} onChange={setJsPage} showControls className="gap-2" />
                  </div>
                )}
              </div>
            </Tab>

            {/* Info Tab */}
            <Tab
              key="info"
              title={
                <div className="flex items-center gap-2">
                  <i className="ph ph-info text-lg"></i>
                  <span>Análisis</span>
                </div>
              }>
              <div className="space-y-6">
                {/* Estadísticas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardBody className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-500 mb-2">{(assets.css.length / 1024).toFixed(1)}KB</div>
                      <p className="text-sm text-[var(--neutral-400)]">Tamaño CSS</p>
                      <p className="text-xs text-[var(--neutral-500)]">{assets.css.split('\n').length.toLocaleString()} líneas</p>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody className="p-4 text-center">
                      <div className="text-2xl font-bold text-yellow-500 mb-2">{(assets.js.length / 1024).toFixed(1)}KB</div>
                      <p className="text-sm text-[var(--neutral-400)]">Tamaño JS</p>
                      <p className="text-xs text-[var(--neutral-500)]">{assets.js.split('\n').length.toLocaleString()} líneas</p>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-500 mb-2">{cssPages.length + jsPages.length}</div>
                      <p className="text-sm text-[var(--neutral-400)]">Páginas totales</p>
                      <p className="text-xs text-[var(--neutral-500)]">{LINES_PER_PAGE} líneas por página</p>
                    </CardBody>
                  </Card>
                </div>

                {/* Recomendación de optimización */}
                {assets.css.split('\n').length > 10000 && (
                  <Card className="border-orange-200 bg-orange-50/10">
                    <CardBody className="p-4">
                      <h4 className="font-semibold mb-3 text-[var(--neutral-200)] flex items-center gap-2">
                        <i className="ph ph-warning text-orange-500"></i>
                        ⚠️ CSS muy grande detectado
                      </h4>
                      <div className="text-sm text-[var(--neutral-400)] space-y-2">
                        <p>
                          Tu CSS tiene <strong>{assets.css.split('\n').length.toLocaleString()} líneas</strong>. Esto puede causar problemas
                          de rendimiento.
                        </p>
                        <p>
                          <strong>Recomendaciones:</strong>
                        </p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
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
