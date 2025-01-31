import { useState, useEffect } from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

import { prettierFormat } from '../utils/prettierFormat.js'

const useFormatHTML = html => {
  const [compiledHtml, setCompiledHtml] = useState('')

  useEffect(() => {
    const formatHTML = async () => {
      try {
        const staticMarkup = ReactDOMServer.renderToStaticMarkup(<StaticRouter location="/">{html}</StaticRouter>)
        const formattedHtml = await prettierFormat(staticMarkup, 'html')
        setCompiledHtml(formattedHtml)
      } catch (error) {
        throw new Error(error)
      }
    }

    if (html) {
      formatHTML()
    }
  }, [html])

  return compiledHtml
}

export default useFormatHTML
