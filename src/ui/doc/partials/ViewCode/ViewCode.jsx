import { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, Tabs, Tab, Card, CardBody, Snippet } from '@heroui/react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

import handleZipExport from './utils/handleZipExport.js'
import useFormatHTML from './hooks/useFormatHTML.jsx'
import useFormatCSS from './hooks/useFormatCSS.jsx'
import useFormatJS from './hooks/useFormatJS.jsx'

import './viewCode.scss'

const ViewCodeCard = ({ children, sass, jsFn, info }) => {
  const [html, setHtml] = useState()
  const htmlFormat = useFormatHTML(children)

  const [css, setCss] = useState()
  const cssFormat = useFormatCSS(sass)

  const [js, setJs] = useState()
  const jsFormat = useFormatJS(jsFn)

  const [activeTab, setActiveTab] = useState('preview')
  const previewRef = useRef(null)

  useEffect(() => {
    setHtml(htmlFormat)
    setCss(cssFormat)
    setJs(jsFormat)
  }, [htmlFormat, cssFormat, jsFormat])

  const codeElements = [
    { type: 'html', code: html },
    { type: 'css', code: css },
    { type: 'javascript', code: js }
  ]

  return (
    <>
      <div className="showcase-container relative">
        <div className="flex gap-2 flex-wrap absolute top-0 right-0 z-10">
          <Button radius="full" onPress={() => setActiveTab('preview')}>
            <i className="ph ph-eye"></i>
          </Button>
          <Button radius="full" onPress={() => setActiveTab('code')}>
            <i className="ph ph-code"></i>
          </Button>
          {activeTab === 'preview' ? (
            <Button radius="full" onPress={() => handleZipExport(info, html, css, js, previewRef)}>
              <i className="ph ph-download-simple"></i>
            </Button>
          ) : null}
          <div className="flex w-full flex-col ">
            {activeTab === 'preview' ? (
              <Button
                radius="full"
                startContent={<i className="ph ph-download-simple"></i>}
                onPress={() => handleZipExport(info, html, css, js, previewRef)}>
                Liferay
              </Button>
            ) : null}

            <Tabs aria-label="Options" color="primary" className=" bg-">
              <Tab
                key="view"
                title={
                  <div className="flex items-center gap-2 space-x-2">
                    <i className="ph ph-eye"></i>
                    <span>Vista previa</span>
                  </div>
                }
                onChange={() => setActiveTab('preview')}
              />
              <Tab
                key="code"
                title={
                  <div className="flex items-center gap-2 space-x-2">
                    <i className="ph ph-code"></i>
                    <span>Código</span>
                  </div>
                }
                onChange={() => setActiveTab('code')}
              />
            </Tabs>
          </div>
        </div>

        <div className="content w-full">
          {activeTab === 'preview' ? (
            <div className="preview" ref={previewRef}>
              {children}
            </div>
          ) : (
            <div className="code-section w-full p-4 flex flex-col">
              <div className="flex w-full flex-col py-4">
                <Tabs aria-label="Options">
                  {codeElements.map(element => (
                    <Tab key={element.type} title={element.type}>
                      <Card className="w-full">
                        <CardBody className="">
                          <Snippet variant="bordered symbol" codeString={element.code} symbol=""></Snippet>
                          <SyntaxHighlighter
                            className="w-full overflow-hidden scroll-m-0 rounded-xs"
                            language={element.type}
                            style={materialLight}>
                            {element.code}
                          </SyntaxHighlighter>
                        </CardBody>
                      </Card>
                    </Tab>
                  ))}
                </Tabs>
              </div>
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
