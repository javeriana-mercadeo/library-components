import { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Button, Tabs, Tab, Card, CardBody, Snippet, Divider } from '@heroui/react'

import handleZipExport from './utils/handleZipExport.js'
import useFormatHTML from './hooks/useFormatHTML.jsx'
import useFormatCSS from './hooks/useFormatCSS.jsx'
import useFormatJS from './hooks/useFormatJS.jsx'

const ViewCodeCard = ({ children, sass, jsFn, info }) => {
  const html = useFormatHTML(children)
  const css = useFormatCSS(sass)
  const js = useFormatJS(jsFn)

  const [activeTab, setActiveTab] = useState('preview')
  const previewRef = useRef(null)

  const codeElements = [
    { type: 'html', code: html },
    { type: 'css', code: css },
    { type: 'javascript', code: js }
  ]

  return (
    <>
      <Divider />
      <div className="relative w-full pt-5">
        {/* Controls */}
        <div className="flex gap-2 flex-wrap absolute top-0 right-2 z-10 bg-white p-1 border border-gray-200 rounded-full">
          <Tabs radius="full" aria-label="Opciones" color="primary" selectedKey={activeTab} onSelectionChange={setActiveTab}>
            <Tab
              key="preview"
              title={
                <div className="flex items-center gap-2">
                  <i className="ph ph-eye"></i>
                  <span>Vista previa</span>
                </div>
              }
            />
            <Tab
              key="code"
              title={
                <div className="flex items-center gap-2">
                  <i className="ph ph-code"></i>
                  <span>Código</span>
                </div>
              }
            />
          </Tabs>

          {activeTab === 'preview' && (
            <Button
              className="rounded-full"
              color="primary"
              variant="shadow"
              startContent={<i className="ph ph-download-simple"></i>}
              onPress={() => handleZipExport(info, html, css, js, previewRef)}>
              Liferay
            </Button>
          )}
        </div>

        {/* Content */}
        <div className="content w-full">
          {activeTab === 'preview' && (
            <div className="preview" ref={previewRef}>
              {children}
            </div>
          )}

          {activeTab === 'code' && (
            <div className="code-section w-full p-4 flex flex-col">
              <Tabs aria-label="Opciones">
                {codeElements.map(({ type, code }) => (
                  <Tab key={type} title={type.toUpperCase()}>
                    <Card className="w-full">
                      <CardBody>
                        <Snippet variant="bordered symbol" codeString={code} symbol="" />
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

ViewCodeCard.propTypes = {
  children: PropTypes.node.isRequired,
  sass: PropTypes.string.isRequired,
  jsFn: PropTypes.func.isRequired,
  info: PropTypes.object.isRequired
}

export default ViewCodeCard
