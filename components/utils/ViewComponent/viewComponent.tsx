'use client'

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react'
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

  // Reset states when path changes
  useEffect(() => {
    setCodeLoaded(false)
    setHtmlContent('')
    setCssContent('')
    setJsContent('')
    setConfigContent('')
    setActiveCodeTab('')
    setIsLoading(false)
    setInfo(null)
  }, [path])

  // Cargar solo la información básica al montar (solo si hay path válido)
  useEffect(() => {
    if (!path || path.trim() === '') return

    let isMounted = true // Flag para evitar memory leaks

    async function loadBasicInfo() {
      try {
        const res = await fetch(`/api/component-info?path=${encodeURIComponent(path ?? '')}`)
        const { info } = await res.json()

        // Solo actualizar estado si el componente sigue montado
        if (isMounted) {
          if (info) setInfo(info)
          // No cargamos el script aquí, solo la info básica
        }
      } catch {
        // console.error('Error al cargar la información básica del componente:', error)
      }
    }

    loadBasicInfo()

    return () => {
      isMounted = false
    }
  }, [path])

  // Función para cargar y procesar todo el código con manejo mejorado de memoria - Memoized
  const loadAndProcessCode = useCallback(async () => {
    // Verificar si realmente tiene contenido válido
    const hasValidContent = htmlContent.length > 0 || cssContent.length > 0 || jsContent.length > 0 || configContent.length > 0

    if (codeLoaded && hasValidContent) {
      return
    }

    if (codeLoaded && !hasValidContent) {
      setCodeLoaded(false) // Force reload
    }
    setIsLoading(true)

    try {
      let css = '',
        js = '',
        config = ''

      if (path && path.trim() !== '') {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 30000) // Timeout de 30s

        // Fetch data from API

        const res = await fetch(`/api/build-modules?path=${encodeURIComponent(path)}`, {
          signal: controller.signal
        })

        clearTimeout(timeoutId)

        if (!res.ok) {
          throw new Error(`Error al cargar módulos: ${res.status}`)
        }
        const data = await res.json()

        // Data received successfully

        css = data.css || ''
        js = data.js || ''
        config = data.configuration ? JSON.stringify(data.configuration, null, 2) : ''

        // Data assigned to variables
      }

      // Procesar código con límites de memoria
      const processWithLimit = async (content: string, type: string) => {
        // Process content

        if (content.length > 1000000) {
          content = content.substring(0, 1000000) + '\n\n// ... contenido truncado por tamaño'
        }

        if (!content) {
          return ''
        }

        try {
          const formatted = await prettierFormat(content, type)

          return formatted
        } catch {
          // Return original content if formatting fails
          return content
        }
      }

      // Generar HTML de forma más eficiente
      let htmlContent = ''

      if (children) {
        try {
          const htmlString = ReactDOMServer.renderToString(children)

          // Limpiar específicamente los links de preload que genera Next.js
          const cleanedHtml = htmlString
            .replace(/<link[^>]*rel="preload"[^>]*>/g, '') // Remover links de preload
            .replace(/<!--\$-->/g, '') // Remover comentarios de React
            .replace(/<!--\/\$-->/g, '') // Remover comentarios de cierre de React
            .replace(/\s*rel="preload"/g, '') // Remover atributos preload sobrantes
            .replace(/\s*fetchpriority="[^"]*"/g, '') // Remover fetchpriority
            .replace(/\s*data-nimg="[^"]*"/g, '') // Remover data-nimg de Next.js
            .replace(/\n\s*\n/g, '\n') // Limpiar líneas vacías extra

          htmlContent = await processWithLimit(cleanedHtml, 'html')
        } catch {
          htmlContent = '<!-- Error renderizando componente -->'
        }
      }

      const [formattedCss, formattedJs, formattedConfig] = await Promise.all([
        processWithLimit(css, 'css'),
        processWithLimit(js, 'js'),
        processWithLimit(config, 'json')
      ])

      // Content formatted successfully

      setHtmlContent(htmlContent)
      setCssContent(formattedCss)
      setJsContent(formattedJs)
      setConfigContent(formattedConfig)
      setCodeLoaded(true)
    } catch {
      setHtmlContent('')
      setCssContent('')
      setJsContent('')
      setConfigContent('')
      setCodeLoaded(true)
    } finally {
      setIsLoading(false)
    }
  }, [path, codeLoaded, htmlContent, cssContent, jsContent, configContent, children])

  // Efecto para cargar código cuando se abre el modal
  useEffect(() => {
    if (isOpen && !codeLoaded && !isLoading) {
      loadAndProcessCode()
    }
  }, [isOpen, codeLoaded, isLoading])

  // Función para recompilar el código
  const handleRecompile = React.useCallback(async () => {
    // Resetear el estado de carga de código
    setCodeLoaded(false)
    setHtmlContent('')
    setCssContent('')
    setJsContent('')
    setConfigContent('')

    // Resetear páginas
    setHtmlPage(1)
    setCssPage(1)
    setJsPage(1)
    setConfigPage(1)
    setActiveCodeTab('')

    // Forzar recarga del código
    await loadAndProcessCode()
  }, [])

  // Función para resetear estados cuando se cierra el modal
  const resetModalStates = React.useCallback(() => {
    // Resetear páginas y estados
    setHtmlPage(1)
    setCssPage(1)
    setJsPage(1)
    setConfigPage(1)
    setActiveCodeTab('')
  }, [])

  // Efecto para resetear páginas cuando se cierra el modal
  useEffect(() => {
    if (!isOpen) {
      setHtmlPage(1)
      setCssPage(1)
      setJsPage(1)
      setConfigPage(1)
      setActiveCodeTab('')
    }
  }, [isOpen])

  // Efecto para manejar el scroll cuando el modal cambie de estado
  useEffect(() => {
    if (isOpen) {
      // Asegurar que el cuerpo permita scroll
      document.body.style.overflow = 'hidden'
    } else {
      // Restaurar scroll cuando se cierre
      document.body.style.overflow = 'auto'
      document.documentElement.style.overflow = 'auto'

      // Limpiar focus residual
      if (document.activeElement && document.activeElement !== document.body) {
        ;(document.activeElement as HTMLElement).blur()
      }

      // Forzar scroll enable después de un pequeño delay
      setTimeout(() => {
        document.body.style.removeProperty('overflow')
        document.documentElement.style.removeProperty('overflow')
      }, 300)
    }
  }, [isOpen])

  // Cleanup cuando el componente se desmonta
  useEffect(() => {
    return () => {
      // Restaurar scroll si el modal estaba abierto
      document.body.style.overflow = 'auto'
      document.documentElement.style.overflow = 'auto'
      document.body.style.removeProperty('overflow')
      document.documentElement.style.removeProperty('overflow')

      // Limpiar todos los estados para liberar memoria
      setHtmlContent('')
      setCssContent('')
      setJsContent('')
      setConfigContent('')
      setCodeLoaded(false)
      setInfo({})
      setScriptContent('')
    }
  }, [])

  // Manejar apertura del modal con limpieza de memoria - Memoized
  const handleOpenModal = useCallback(async () => {
    // Limpiar estados previos para evitar acumulación de memoria
    if (!codeLoaded) {
      setHtmlContent('')
      setCssContent('')
      setJsContent('')
      setConfigContent('')
    }

    onOpen()

    // Cargar el código después de abrir el modal
    await loadAndProcessCode()
  }, [codeLoaded, onOpen, loadAndProcessCode])

  // 📌 Filtrar solo los lenguajes con contenido (solo si ya está cargado) - Memoized
  const codeElements = useMemo(() => {
    if (!codeLoaded) return []

    return [
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
    ].filter(({ code }) => code.trim().length > 0)
  }, [
    codeLoaded,
    htmlContent,
    cssContent,
    jsContent,
    configContent,
    htmlPages,
    cssPages,
    jsPages,
    configPages,
    htmlPage,
    cssPage,
    jsPage,
    configPage,
    setHtmlPage,
    setCssPage,
    setJsPage,
    setConfigPage
  ])

  // Code elements ready for display

  // Asegurar que activeCodeTab esté sincronizado con elementos disponibles
  React.useEffect(() => {
    if (codeLoaded && codeElements.length > 0) {
      const hasActiveTab = codeElements.some(el => el.type === activeCodeTab)

      if (!hasActiveTab) {
        setActiveCodeTab(codeElements[0].type)
      }
    }
  }, [codeElements, activeCodeTab, codeLoaded])

  // Función para manejar la descarga - Memoized
  const handleDownload = useCallback(async () => {
    // Solo descargar si hay path válido
    if (!path || path.trim() === '') return

    // Si no está cargado el código, cargarlo primero
    if (!codeLoaded) {
      await loadAndProcessCode()
    }

    await handleZipExport(info, htmlContent, cssContent, jsContent, configContent, containerRef)
  }, [path, codeLoaded, loadAndProcessCode, info, htmlContent, cssContent, jsContent, configContent, containerRef])

  // Función para cambiar de tab - Memoized
  const handleTabChange = useCallback((key: string) => {
    setActiveCodeTab(key)
  }, [])

  return (
    <div className='w-full border border-[var(--neutral-800)] rounded-xl'>
      {scriptContent && <script dangerouslySetInnerHTML={{ __html: scriptContent }} />}

      {/* Barra de controles */}
      <div className='flex justify-between gap-2 p-2'>
        <p className='pt-1 text-sm text-default-500 justify-self-start'>{info?.name || 'Componente'}</p>
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

      {/* Modal para ver código - Siguiendo patrón HeroUI recomendado */}
      <Modal
        backdrop='blur'
        classNames={{
          wrapper: 'z-[1001]',
          backdrop: 'bg-black/50',
          base: 'max-h-[80vh] max-w-[80vw] m-4',
          header: 'border-b border-divider flex-shrink-0',
          body: 'p-0 overflow-auto',
          footer: 'border-t border-divider flex-shrink-0',
          closeButton: 'cursor-pointer hover:bg-default-200 transition-colors'
        }}
        isDismissable={true}
        isKeyboardDismissDisabled={false}
        isOpen={isOpen}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: 'easeOut'
              }
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: 'easeIn'
              }
            }
          }
        }}
        placement='center'
        scrollBehavior='inside'
        size='5xl'
        onOpenChange={() => {
          resetModalStates()
          onOpenChange()
        }}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className='px-4'>
                <div className='flex flex-col gap-1'>
                  <p className='text-sm text-default-500'>{info?.name || 'Componente'}</p>
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
                        <Tab key={type} title={<span>{label}</span>}>
                          <div className='h-full flex flex-col space-y-4'>
                            {/* Actions bar */}
                            <div className='flex justify-between items-center bg-default-50 border border-divider rounded-lg p-3 flex-shrink-0'>
                              <div className='flex items-center gap-4'>
                                <p className='text-sm text-default-600'>
                                  {info?.name || 'Componente'} • {label}
                                </p>
                                <div className='flex items-center gap-2'>
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
                              </div>
                              <div className='flex items-center gap-2'>
                                <Button
                                  color='warning'
                                  isDisabled={isLoading}
                                  size='sm'
                                  startContent={<i className='ph ph-arrow-clockwise' />}
                                  variant='flat'
                                  onPress={handleRecompile}>
                                  {isLoading ? 'Recompilando...' : 'Recompilar'}
                                </Button>
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
                      <p>Haz clic en &apos;Ver Código&apos; para cargar el contenido</p>
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
                                {label} • {info?.name || 'Componente'}
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
