'use client'

import React, { useEffect, useRef, useState } from 'react'
import ReactDOMServer from 'react-dom/server'
import { Button, Tabs, Tab, Card, CardBody, Snippet, Divider } from '@heroui/react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import handleZipExport from './utils/handleZipExport'
import { prettierFormat } from './utils/prettierFormat'

export default function ViewComponent({ path, children }: { path: string; children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState('preview')
  const containerRef = useRef<HTMLDivElement>(null)

  const [info, setInfo] = useState<any>({})
  const [htmlContent, setHtmlContent] = useState<string>('')
  const [cssContent, setCssContent] = useState<string>('')
  const [jsContent, setJsContent] = useState<string>('')
  const [scriptContent, setScriptContent] = useState<string>('')

  useEffect(() => {
    async function loadComponent() {
      try {
        const res = await fetch(`/api/file?path=${encodeURIComponent(path)}`)
        const { info, css, js } = await res.json()

        if (info) setInfo(info)
        if (css) setCssContent(await prettierFormat(css, 'css'))
        if (js) setJsContent(await prettierFormat(js, 'js'))

        setScriptContent(js)
      } catch (error) {
        console.error('Error cargando el componente:', error)
      }
    }

    loadComponent()
  }, [path])

  useEffect(() => {
    if (!children) return

    async function formatHtml() {
      if (children) {
        setHtmlContent(await prettierFormat(ReactDOMServer.renderToString(children), 'html'))
      }
    }

    formatHtml()
  }, [children])

  // 📌 Filtrar solo los lenguajes con contenido
  const codeElements = [
    { type: 'html', code: htmlContent },
    { type: 'css', code: cssContent },
    { type: 'javascript', code: `${jsContent ? `Liferay.on('allPortletsReady', () => {${jsContent}});` : jsContent}` }
  ].filter(({ code }) => code.trim() !== '')

  return (
    <>
      {scriptContent && <script dangerouslySetInnerHTML={{ __html: scriptContent }} />}

      <Divider />
      <div className="relative w-full ">
        {/* Controles */}
        <div className="flex gap-2 flex-wrap absolute top-0 right-2 z-10 bg-white p-1 border border-gray-200 rounded-full ">
          <Tabs
            radius="full"
            aria-label="Opciones"
            color="primary"
            selectedKey={activeTab}
            onSelectionChange={key => setActiveTab(key.toString())}>
            <Tab key="preview" title={<i className="ph ph-eye"></i>} />
            {codeElements.length > 0 && <Tab key="code" title={<i className="ph ph-code"></i>} />}
          </Tabs>

          {activeTab === 'preview' && (
            <Button
              className="rounded-full"
              color="primary"
              variant="shadow"
              startContent={<i className="ph ph-download-simple"></i>}
              onPress={() => handleZipExport(info, htmlContent, cssContent, jsContent, containerRef)}
            />
          )}
        </div>

        {/* Contenido */}
        <div className="content w-full">
          {activeTab === 'preview' && (
            <div className="preview" ref={containerRef}>
              {children}
            </div>
          )}

          {activeTab === 'code' && codeElements.length > 0 && (
            <div className="code-section w-full max-w-6xl mx-auto p-4 flex flex-col">
              <Tabs aria-label="Opciones">
                {codeElements.map(({ type, code }) => (
                  <Tab key={type} title={type.toUpperCase()}>
                    <Card className="w-full">
                      <CardBody>
                        <Snippet variant="bordered" codeString={code} symbol={`Copiar componente: ${info.name}`} />
                        <SyntaxHighlighter className="w-full overflow-hidden rounded-xs" language={type} style={a11yDark}>
                          {code}
                        </SyntaxHighlighter>
                      </CardBody>
                    </Card>
                  </Tab>
                ))}
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
