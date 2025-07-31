'use client'

import React, { useEffect, useRef, useState, useMemo } from 'react'
import ReactDOMServer from 'react-dom/server'
import {
  Button,
  Tabs,
  Tab,
  Snippet,
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Spinner,
  Pagination,
  Chip
} from '@heroui/react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

import handleZipExport from './utils/handleZipExport'
import { prettierFormat } from './utils/prettierFormat'

const LINES_PER_PAGE = 300 // Líneas por página para la paginación

export default function ViewComponent({ path, children }: { path?: string; children: React.ReactNode }) {
  const [activeCodeTab, setActiveCodeTab] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  // Estados para paginación
  const [htmlPage, setHtmlPage] = useState(1)
  const [cssPage, setCssPage] = useState(1)
  const [jsPage, setJsPage] = useState(1)
  const [configPage, setConfigPage] = useState(1)

  // Estados para la información básica (solo para descarga)
  const [info, setInfo] = useState<any>({})
  const [scriptContent, setScriptContent] = useState<string>('')

  // Estados para el código (lazy loading)
  const [isLoading, setIsLoading] = useState(false)
  const [codeLoaded, setCodeLoaded] = useState(false)
  const [htmlContent, setHtmlContent] = useState<string>('')
  const [cssContent, setCssContent] = useState<string>('')
  const [jsContent, setJsContent] = useState<string>('')
  const [configContent, setConfigContent] = useState<string>('')

  // Función para dividir contenido en páginas
  const createPages = (content: string) => {
    if (!content) return []
    const lines = content.split('\n')
    const pages = []

    for (let i = 0; i < lines.length; i += LINES_PER_PAGE) {
      pages.push({
        content: lines.slice(i, i + LINES_PER_PAGE).join('\n'),
        startLine: i + 1,
        endLine: Math.min(i + LINES_PER_PAGE, lines.length)
      })
    }

    return pages
  }

  // Dividir contenido en páginas usando useMemo
  const htmlPages = useMemo(() => createPages(htmlContent), [htmlContent])
  const cssPages = useMemo(() => createPages(cssContent), [cssContent])
  const jsPages = useMemo(() => createPages(jsContent), [jsContent])
  const configPages = useMemo(() => createPages(configContent), [configContent])

  // Cargar solo la información básica al montar (solo si hay path válido)
  useEffect(() => {
    if (!path || path.trim() === '') return // No hacer nada si no hay path válido

    async function loadBasicInfo() {
      try {
        const res = await fetch(`/api/build-modules?path=${encodeURIComponent(path ?? '')}`)
        const { info, js } = await res.json()

        if (info) setInfo(info)
        if (js) setScriptContent(js)
      } catch (error) {
        throw new Error('Error al cargar la información básica del componente', { cause: error })
      }
    }

    loadBasicInfo()
  }, [path])

  // Función para cargar y procesar todo el código
  const loadAndProcessCode = async () => {
    if (codeLoaded) return // Ya está cargado

    setIsLoading(true)

    try {
      let css = '',
        js = '',
        config = ''

      // Solo hacer llamado a API si hay path válido
      if (path && path.trim() !== '') {
        const res = await fetch(`/api/build-modules?path=${encodeURIComponent(path)}`)
        const data = await res.json()

        css = data.css || ''
        js = data.js || ''
        config = data.configuration ? JSON.stringify(data.configuration, null, 2) : ''
      }

      // Procesar código en paralelo
      const [formattedHtml, formattedCss, formattedJs, formattedConfig] = await Promise.all([
        children ? prettierFormat(ReactDOMServer.renderToString(children), 'html') : '',
        css ? prettierFormat(css, 'css') : '',
        js ? prettierFormat(js, 'js') : '',
        config ? prettierFormat(config, 'json') : ''
      ])

      setHtmlContent(formattedHtml)
      setCssContent(formattedCss)
      setJsContent(formattedJs)
      setConfigContent(formattedConfig)
      setCodeLoaded(true)
    } catch (error) {
      console.error('Error procesando el código:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Manejar apertura del modal
  const handleOpenModal = async () => {
    onOpen()
    await loadAndProcessCode()
  }

  // 📌 Filtrar solo los lenguajes con contenido (solo si ya está cargado)
  const codeElements = codeLoaded
    ? [
        {
          type: 'html',
          code: htmlContent,
          label: 'HTML',
          pages: htmlPages,
          currentPage: htmlPage,
          setPage: setHtmlPage
        },
        {
          type: 'css',
          code: cssContent,
          label: 'CSS',
          pages: cssPages,
          currentPage: cssPage,
          setPage: setCssPage
        },
        {
          type: 'javascript',
          code: jsContent,
          label: 'JS',
          pages: jsPages,
          currentPage: jsPage,
          setPage: setJsPage
        },
        {
          type: 'json',
          code: configContent,
          label: 'CONFIG',
          pages: configPages,
          currentPage: configPage,
          setPage: setConfigPage
        }
      ].filter(({ code }) => code.trim() !== '')
    : []

  // Asegurar que activeCodeTab esté sincronizado con elementos disponibles
  React.useEffect(() => {
    if (codeLoaded && codeElements.length > 0) {
      const hasActiveTab = codeElements.some(el => el.type === activeCodeTab)
      if (!hasActiveTab) {
        setActiveCodeTab(codeElements[0].type)
      }
    }
  }, [codeElements, activeCodeTab, codeLoaded])

  // Función para manejar la descarga
  const handleDownload = async () => {
    // Solo descargar si hay path válido
    if (!path || path.trim() === '') return

    // Si no está cargado el código, cargarlo primero
    if (!codeLoaded) {
      await loadAndProcessCode()
    }

    console.log('🔍 ViewComponent Download Debug:', {
      path,
      codeLoaded,
      info,
      htmlLength: htmlContent?.length || 0,
      cssLength: cssContent?.length || 0,
      jsLength: jsContent?.length || 0,
      configLength: configContent?.length || 0
    })

    await handleZipExport(info, htmlContent, cssContent, jsContent, configContent, containerRef)
  }

  // Función para resetear páginas al cambiar de tab
  const handleTabChange = (key: string) => {
    setActiveCodeTab(key)
    // Resetear las páginas cuando se cambia de tab
    setHtmlPage(1)
    setCssPage(1)
    setJsPage(1)
    setConfigPage(1)
  }

  return (
    <div className='w-full border border-[var(--neutral-800)] rounded-xl'>
      {scriptContent && <script dangerouslySetInnerHTML={{ __html: scriptContent }} />}

      {/* Barra de controles */}
      <div className='flex justify-between gap-2 p-2'>
        <p className='pt-1 text-sm text-default-500 justify-self-start'>{info.name || 'Componente'}</p>
        <div className='flex justify-end gap-2'>
          {/* Botón para abrir modal de código */}
          <Button
            className='rounded-lg'
            size='sm'
            startContent={<i className='ph ph-code text-base' />}
            variant='flat'
            onPress={handleOpenModal}>
            Ver Código
          </Button>

          {/* Botón de descarga */}
          {path && path.trim() !== '' ? (
            <Button
              className='rounded-lg'
              color='primary'
              size='sm'
              startContent={<i className='ph ph-download-simple text-base' />}
              variant='solid'
              onPress={handleDownload}>
              Descargar
            </Button>
          ) : null}
        </div>
      </div>

      <Divider />

      {/* Contenido de Preview */}
      <div ref={containerRef} className='preview content w-full p-2'>
        {children}
      </div>

      {/* Modal para ver código */}
      <Modal
        backdrop='blur'
        classNames={{
          wrapper: 'z-[1001]',
          backdrop: 'bg-black/50',
          base: 'max-h-[80vh] max-w-[80vw] m-4',
          header: 'border-b border-divider flex-shrink-0',
          body: 'p-0 overflow-auto',
          footer: 'border-t border-divider flex-shrink-0'
        }}
        isOpen={isOpen}
        placement='center'
        size='5xl'
        onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className='px-4'>
                <div className='flex flex-col gap-1'>
                  <p className='text-sm text-default-500'>{info.name || 'Componente'}</p>
                </div>
              </ModalHeader>

              <ModalBody>
                <div className='px-6 py-4 pb-6'>
                  {/* Loading State */}
                  {isLoading && (
                    <div className='flex flex-col items-center justify-center py-12 gap-4'>
                      <Spinner color='primary' size='lg' />
                      <div className='text-center'>
                        <p className='text-default-700 font-medium'>Procesando código...</p>
                        <p className='text-sm text-default-500 mt-1'>Formateando y preparando los archivos</p>
                      </div>
                    </div>
                  )}

                  {/* Content - Solo mostrar si no está cargando y hay elementos */}
                  {!isLoading && codeLoaded && codeElements.length > 0 && (
                    <Tabs
                      aria-label='Opciones de código'
                      selectedKey={activeCodeTab}
                      onSelectionChange={key => handleTabChange(key.toString())}>
                      {codeElements.map(({ type, code, label, pages, currentPage, setPage }) => (
                        <Tab
                          key={type}
                          title={
                            <div className='flex items-center gap-2'>
                              <span>{label}</span>
                              <Chip color='default' size='sm' variant='flat'>
                                {(code.length / 1024).toFixed(1)}KB
                              </Chip>
                              <Chip color='primary' size='sm' variant='flat'>
                                {code.split('\n').length} líneas
                              </Chip>
                              {pages.length > 1 && (
                                <Chip color='warning' size='sm' variant='flat'>
                                  {pages.length} páginas
                                </Chip>
                              )}
                            </div>
                          }>
                          <div className='h-full flex flex-col space-y-4'>
                            {/* Actions bar */}
                            <div className='flex justify-between items-center bg-default-50 border border-divider rounded-lg p-3 flex-shrink-0'>
                              <div className='flex items-center gap-4'>
                                <p className='text-sm text-default-600'>
                                  {info.name} • {label}
                                </p>
                                {pages.length > 1 && (
                                  <Chip color='warning' size='sm' variant='flat'>
                                    Archivo grande: {pages.length} páginas
                                  </Chip>
                                )}
                              </div>
                              <Snippet
                                classNames={{
                                  base: 'bg-default-100',
                                  copyButton: 'text-default-600 hover:text-primary'
                                }}
                                codeString={code}
                                size='sm'
                                symbol=''
                                variant='flat'>
                                <span className='text-xs'>Copiar {label} completo</span>
                              </Snippet>
                            </div>

                            {/* Paginación superior */}
                            {pages.length > 1 && (
                              <div className='flex justify-between items-center bg-default-100 p-3 rounded-lg flex-shrink-0'>
                                <div className='text-sm text-default-600'>
                                  Página {currentPage} de {pages.length} • Líneas {pages[currentPage - 1]?.startLine} -{' '}
                                  {pages[currentPage - 1]?.endLine}
                                </div>
                                <Pagination
                                  showControls
                                  className='gap-2'
                                  page={currentPage}
                                  size='sm'
                                  total={pages.length}
                                  onChange={setPage}
                                />
                              </div>
                            )}

                            {/* Código con paginación */}
                            <div className='flex-1 min-h-0 bg-[#2d3748] rounded-lg overflow-auto border border-divider scrollbar-default'>
                              <SyntaxHighlighter
                                customStyle={{
                                  margin: 0,
                                  padding: '1.5rem',
                                  background: 'transparent',
                                  fontSize: '0.875rem',
                                  lineHeight: '1.5'
                                }}
                                language={type}
                                lineNumberStyle={{
                                  minWidth: '4em',
                                  paddingRight: '1em',
                                  textAlign: 'right',
                                  userSelect: 'none',
                                  color: '#6b7280'
                                }}
                                showLineNumbers={true}
                                startingLineNumber={pages[currentPage - 1]?.startLine || 1}
                                style={a11yDark}
                                wrapLines={true}>
                                {pages[currentPage - 1]?.content || code}
                              </SyntaxHighlighter>
                            </div>

                            {/* Paginación inferior */}
                            {pages.length > 1 && (
                              <div className='flex justify-center flex-shrink-0'>
                                <Pagination showControls className='gap-2' page={currentPage} total={pages.length} onChange={setPage} />
                              </div>
                            )}
                          </div>
                        </Tab>
                      ))}
                    </Tabs>
                  )}

                  {/* Estado cuando no hay código para mostrar */}
                  {!isLoading && codeLoaded && codeElements.length === 0 && (
                    <div className='flex flex-col items-center justify-center py-12 gap-4 text-default-500'>
                      <i className='ph ph-file-code text-4xl' />
                      <p>No hay código disponible para mostrar</p>
                    </div>
                  )}

                  {/* Estado inicial cuando no se ha cargado nada */}
                  {!isLoading && !codeLoaded && (
                    <div className='flex flex-col items-center justify-center py-12 gap-4 text-default-500'>
                      <i className='ph ph-code text-4xl' />
                      <p>Haz clic en "Ver Código" para cargar el contenido</p>
                    </div>
                  )}
                </div>
              </ModalBody>

              <ModalFooter className='px-6 py-4'>
                <div className='flex justify-between items-center w-full'>
                  <div className='text-sm text-default-500'>
                    {!isLoading && codeElements.length > 0 && (
                      <>
                        {(() => {
                          const currentElement = codeElements.find(el => el.type === activeCodeTab)

                          if (!currentElement) return null

                          const { label, pages, currentPage } = currentElement

                          return (
                            <div className='flex items-center gap-4'>
                              <span>
                                {label} • {info.name}
                              </span>
                              {pages.length > 1 && (
                                <div className='flex items-center gap-2'>
                                  <Chip color='primary' size='sm' variant='flat'>
                                    Página {currentPage}/{pages.length}
                                  </Chip>
                                  <Chip color='default' size='sm' variant='flat'>
                                    Líneas {pages[currentPage - 1]?.startLine}-{pages[currentPage - 1]?.endLine}
                                  </Chip>
                                </div>
                              )}
                            </div>
                          )
                        })()}
                      </>
                    )}
                  </div>
                  <div className='flex gap-2'>
                    <Button color='default' size='sm' variant='flat' onPress={onClose}>
                      Cerrar
                    </Button>
                    {/* Botón de descarga - Solo mostrar si hay path válido */}
                    {path && path.trim() !== '' && (
                      <Button
                        color='primary'
                        isDisabled={isLoading}
                        size='sm'
                        startContent={<i className='ph ph-download-simple' />}
                        onPress={async () => {
                          await handleDownload()
                          onClose()
                        }}>
                        Descargar ZIP
                      </Button>
                    )}
                  </div>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
