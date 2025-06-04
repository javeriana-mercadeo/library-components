'use client'

import React, { useEffect, useRef, useState } from 'react'
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
  Spinner
} from '@heroui/react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import handleZipExport from './utils/handleZipExport'
import { prettierFormat } from './utils/prettierFormat'

export default function ViewComponent({ path, children }: { path?: string; children: React.ReactNode }) {
  const [activeCodeTab, setActiveCodeTab] = useState('html')
  const containerRef = useRef<HTMLDivElement>(null)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  // Estados para la información básica (solo para descarga)
  const [info, setInfo] = useState<any>({})
  const [scriptContent, setScriptContent] = useState<string>('')

  // Estados para el código (lazy loading)
  const [isLoading, setIsLoading] = useState(false)
  const [codeLoaded, setCodeLoaded] = useState(false)
  const [htmlContent, setHtmlContent] = useState<string>('')
  const [cssContent, setCssContent] = useState<string>('')
  const [jsContent, setJsContent] = useState<string>('')

  // Cargar solo la información básica al montar (solo si hay path válido)
  useEffect(() => {
    if (!path || path.trim() === '') return // No hacer nada si no hay path válido

    async function loadBasicInfo() {
      try {
        const res = await fetch(`/api/file?path=${encodeURIComponent(path ?? '')}`)
        const { info, js } = await res.json()

        if (info) setInfo(info)
        if (js) setScriptContent(js)
      } catch (error) {
        console.error('Error cargando información básica:', error)
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
        js = ''

      // Solo hacer llamado a API si hay path válido
      if (path && path.trim() !== '') {
        const res = await fetch(`/api/file?path=${encodeURIComponent(path)}`)
        const data = await res.json()
        css = data.css || ''
        js = data.js || ''
      }

      // Procesar código en paralelo
      const [formattedHtml, formattedCss, formattedJs] = await Promise.all([
        children ? prettierFormat(ReactDOMServer.renderToString(children), 'html') : '',
        css ? prettierFormat(css, 'css') : '',
        js ? prettierFormat(js, 'js') : ''
      ])

      setHtmlContent(formattedHtml)
      setCssContent(formattedCss)
      setJsContent(formattedJs)
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
        { type: 'html', code: htmlContent, label: 'HTML' },
        { type: 'css', code: cssContent, label: 'CSS' },
        { type: 'javascript', code: jsContent, label: 'JS' }
      ].filter(({ code }) => code.trim() !== '')
    : []

  // Función para manejar la descarga
  const handleDownload = async () => {
    // Solo descargar si hay path válido
    if (!path || path.trim() === '') return

    // Si no está cargado el código, cargarlo primero
    if (!codeLoaded) {
      await loadAndProcessCode()
    }
    await handleZipExport(info, htmlContent, cssContent, jsContent, containerRef)
  }

  return (
    <div className="w-full border border-[var(--neutral-800)] rounded-xl">
      {scriptContent && <script dangerouslySetInnerHTML={{ __html: scriptContent }} />}

      {/* Barra de controles */}
      <div className="flex justify-between gap-2 p-2">
        <p className="pt-1 text-sm text-default-500 justify-self-start">{info.name || 'Componente'}</p>
        <div className="flex justify-end gap-2">
          {/* Botón para abrir modal de código */}
          <Button
            className="rounded-lg"
            variant="flat"
            size="sm"
            onPress={handleOpenModal}
            startContent={<i className="ph ph-code text-base"></i>}>
            Ver Código
          </Button>

          {/* Botón de descarga */}
          {path && path.trim() !== '' ? (
            <Button
              className="rounded-lg"
              color="primary"
              variant="solid"
              size="sm"
              onPress={handleDownload}
              startContent={<i className="ph ph-download-simple text-base"></i>}>
              Descargar
            </Button>
          ) : null}
        </div>
      </div>

      <Divider />

      {/* Contenido de Preview */}
      <div className="preview content w-full p-2" ref={containerRef}>
        {children}
      </div>

      {/* Modal para ver código */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="5xl"
        placement="center"
        backdrop="blur"
        classNames={{
          wrapper: 'z-[1001]',
          backdrop: 'bg-black/50',
          base: 'max-h-[80vh] max-w-[80vw] m-4',
          header: 'border-b border-divider flex-shrink-0',
          body: 'p-0 overflow-auto',
          footer: 'border-t border-divider flex-shrink-0'
        }}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="px-4">
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-default-500">{info.name || 'Componente'}</p>
                </div>
              </ModalHeader>

              <ModalBody>
                <div className="px-6 py-4 pb-6">
                  {/* Loading State */}
                  {isLoading && (
                    <div className="flex flex-col items-center justify-center py-12 gap-4">
                      <Spinner size="lg" color="primary" />
                      <div className="text-center">
                        <p className="text-default-700 font-medium">Procesando código...</p>
                        <p className="text-sm text-default-500 mt-1">Formateando y preparando los archivos</p>
                      </div>
                    </div>
                  )}

                  {/* Content - Solo mostrar si no está cargando y hay elementos */}
                  {!isLoading && codeElements.length > 0 && (
                    <Tabs
                      aria-label="Opciones de código"
                      selectedKey={activeCodeTab}
                      onSelectionChange={key => setActiveCodeTab(key.toString())}>
                      {codeElements.map(({ type, code, label }) => (
                        <Tab key={type} title={label}>
                          <div className="h-full flex flex-col">
                            {/* Snippet para copiar */}
                            <div className="bg-default-50 border border-divider rounded-lg mb-4 flex-shrink-0">
                              <Snippet
                                variant="flat"
                                codeString={code}
                                symbol=""
                                className="w-full"
                                classNames={{
                                  base: 'bg-transparent max-w-full',
                                  pre: 'text-xs overflow-hidden',
                                  copyButton: 'text-default-600 hover:text-primary'
                                }}>
                                <span className="text-xs text-default-600 truncate">
                                  Copiar {label} - {info.name}
                                </span>
                              </Snippet>
                            </div>

                            {/* Código con scroll */}
                            <div className="flex-1 min-h-0 bg-[#2d3748] rounded-lg overflow-auto border border-divider scrollbar-default">
                              <SyntaxHighlighter
                                language={type}
                                style={a11yDark}
                                customStyle={{
                                  margin: 0,
                                  padding: '1.5rem',
                                  background: 'transparent',
                                  fontSize: '0.875rem',
                                  lineHeight: '1.5'
                                }}
                                showLineNumbers={true}
                                wrapLines={true}
                                lineNumberStyle={{
                                  minWidth: '3em',
                                  paddingRight: '1em',
                                  textAlign: 'right',
                                  userSelect: 'none'
                                }}>
                                {code}
                              </SyntaxHighlighter>
                            </div>
                          </div>
                        </Tab>
                      ))}
                    </Tabs>
                  )}

                  {/* Estado cuando no hay código para mostrar */}
                  {!isLoading && codeLoaded && codeElements.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 gap-4 text-default-500">
                      <i className="ph ph-file-code text-4xl"></i>
                      <p>No hay código disponible para mostrar</p>
                    </div>
                  )}
                </div>
              </ModalBody>

              <ModalFooter className="px-6 py-4">
                <div className="flex justify-between items-center w-full">
                  <div className="text-sm text-default-500">
                    {!isLoading && codeElements.length > 0 && (
                      <>
                        {codeElements.find(el => el.type === activeCodeTab)?.label} • {info.name}
                      </>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button color="default" variant="flat" onPress={onClose} size="sm">
                      Cerrar
                    </Button>
                    {/* Botón de descarga - Solo mostrar si hay path válido */}
                    {path && path.trim() !== '' && (
                      <Button
                        color="primary"
                        onPress={async () => {
                          await handleDownload()
                          onClose()
                        }}
                        startContent={<i className="ph ph-download-simple"></i>}
                        size="sm"
                        isDisabled={isLoading}>
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
