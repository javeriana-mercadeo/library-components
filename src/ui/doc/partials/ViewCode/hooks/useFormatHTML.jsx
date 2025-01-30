import { useState, useEffect } from 'react'
import ReactDOMServer from 'react-dom/server'
import prettier from 'prettier/standalone'

import { prettierFormat } from '../utils/prettierFormat.js'

const useFormatHTML = html => {
  const [compiledHtml, setCompiledHtml] = useState('')

  useEffect(() => {
    const fetchScss = async () => {
      try {
        ReactDOMServer.renderToStaticMarkup(html)
        const result = prettier.format(html, prettierFormat('html'))

        setCompiledHtml(result)
      } catch (error) {
        throw new Error(`Error al compilar el archivo SCSS: ${error}`)
      }
    }

    fetchScss()
  }, [html])
}

export default useFormatHTML
