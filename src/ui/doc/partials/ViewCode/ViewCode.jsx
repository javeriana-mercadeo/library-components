import { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import html2canvas from 'html2canvas'
import JSZip from 'jszip'

import useFormatHTML from './hooks/useFormatHTML.jsx'

import './viewCode.scss'
import useFormatCSS from './hooks/useFormatCSS.jsx'

const ViewCodeCard = ({ children, css, js }) => {
  const [htmlFormat, setHtmlFormat] = useState()
  const cssFormat = useFormatCSS(css)
  const [jsFormat, setJsFormat] = useState()
  const [activeTab, setActiveTab] = useState('preview')
  const previewRef = useRef(null)

  useEffect(() => {
    console.log('MyReactComponent:', children)
    setHtmlFormat(children)
  }, [])

  /*  // Función para convertir el componente de React a HTML, CSS y JS
  const convertReactToVanilla = () => {
    // Extraer estilos del componente (simulación básica)
    const extractedCSS = `.card {
      background: #111;
      padding: 20px;
      border-radius: 10px;
      color: white;
      text-align: center;
      width: 300px;
    }
    .card img {
      border-radius: 10px;
      width: 100%;
    }`

    const vanillaJS = `console.log("Frontend Radio Component Loaded");`

    return { html: formattedHTML, css: extractedCSS, js: vanillaJS }
  }

  const { html, css, js } = convertReactToVanilla() */

  const handleExport = async () => {
    const zip = new JSZip()

    // Capturar la imagen de previsualización
    const canvas = await html2canvas(previewRef.current)
    canvas.toBlob(blob => {
      zip.file('preview.png', blob)
    })

    // Agregar archivos HTML, CSS, JS al ZIP
    zip.file('index.html', htmlFormat)
    zip.file('styles.css', cssFormat)
    zip.file('script.js', jsFormat)
    zip.file(
      'liferay-config.json',
      JSON.stringify(
        {
          name: 'Frontend Radio Component',
          version: '1.0.0',
          description: 'A music preview component for Liferay'
        },
        null,
        2
      )
    )

    // Descargar el ZIP
    zip.generateAsync({ type: 'blob' }).then(content => {
      const link = document.createElement('a')
      link.href = URL.createObjectURL(content)
      link.download = 'frontend-radio-component.zip'
      link.click()
    })
  }

  return (
    <>
      <div className="showcase-container">
        <h2>With Image</h2>
        <div className="tabs">
          <button className={activeTab === 'preview' ? 'active' : ''} onClick={() => setActiveTab('preview')}>
            Preview
          </button>
          <button className={activeTab === 'code' ? 'active' : ''} onClick={() => setActiveTab('code')}>
            Code
          </button>
        </div>

        <div className="content">
          {activeTab === 'preview' ? (
            <div className="preview" ref={previewRef}>
              {children}
            </div>
          ) : (
            <div className="code-section">
              <h3>HTML</h3>
              <pre>
                <code>{html}</code>
              </pre>
              <h3>CSS</h3>
              <pre>
                <code>{css}</code>
              </pre>
              <h3>JS</h3>
              <pre>
                <code>{js}</code>
              </pre>
            </div>
          )}
        </div>

        <button className="export-btn" onClick={handleExport}>
          Export for Liferay
        </button>
      </div>
    </>
  )
}

ViewCodeCard.propTypes = {
  children: PropTypes.element.isRequired
}

export default ViewCodeCard
