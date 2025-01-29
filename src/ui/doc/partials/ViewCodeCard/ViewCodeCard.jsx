import { useState, useRef, useEffect } from 'react'
import ReactDOMServer from 'react-dom/server'
import html2canvas from 'html2canvas'
import JSZip from 'jszip'
import prettier from 'prettier/standalone'
import parserHtml from 'prettier/plugins/html'

const MyReactComponent = () => {
  return (
    <>
      <div className="card">
        <h2>Frontend Radio</h2>
        <p>12 Tracks</p>
        <img src="https://via.placeholder.com/300" alt="Frontend Radio" />
      </div>
    </>
  )
}

const formatHTML = async html => {
  return await prettier.format(html, {
    parser: 'html',
    plugins: [parserHtml],
    tabWidth: 2,
    semi: false,
    singleQuote: true,
    trailingComma: 'none',
    arrowParens: 'avoid',
    endOfLine: 'lf',
    bracketSpacing: true,
    bracketSameLine: true,
    proseWrap: 'always',
    quoteProps: 'as-needed',
    printWidth: 140
  })
}

const ViewCodeCard = () => {
  const [formattedHTML, setFormattedHTML] = useState('')
  const [activeTab, setActiveTab] = useState('preview')
  const previewRef = useRef(null)

  useEffect(() => {
    async function fetchFormattedHTML() {
      const componentHTML = ReactDOMServer.renderToStaticMarkup(<MyReactComponent />)
      try {
        const formatted = await formatHTML(componentHTML)
        setFormattedHTML(formatted)
      } catch (error) {
        console.error('Error al formatear HTML:', error)
      }
    }

    fetchFormattedHTML()
  }, [])

  // Función para convertir el componente de React a HTML, CSS y JS
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

  const { html, css, js } = convertReactToVanilla()

  const handleExport = async () => {
    const zip = new JSZip()

    // Capturar la imagen de previsualización
    const canvas = await html2canvas(previewRef.current)
    canvas.toBlob(blob => {
      zip.file('preview.png', blob)
    })

    // Agregar archivos HTML, CSS, JS al ZIP
    zip.file('index.html', html)
    zip.file('styles.css', css)
    zip.file('script.js', js)
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
            <MyReactComponent />
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

      <style>{`
        .showcase-container {
          color: white;
          background: #121212;
          padding: 20px;
          border-radius: 10px;
          max-width: 600px;
          margin: auto;
        }
        .tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }
        .tabs button {
          padding: 10px 20px;
          background: #333;
          color: white;
          border: none;
          cursor: pointer;
          border-radius: 5px;
        }
        .tabs .active {
          border-bottom: 2px solid white;
        }
        .content {
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          padding: 20px;
        }
        .export-btn {
          margin-top: 20px;
          padding: 10px 20px;
          background: #0078d4;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .export-btn:hover {
          background: #005bb5;
        }
      `}</style>
    </div>
  )
}

export default ViewCodeCard
