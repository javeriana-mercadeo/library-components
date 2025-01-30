import { useState, useEffect } from 'react'
import * as Sass from 'sass.js/dist/sass.sync.js'

const useFormatCSS = scssCode => {
  const [compiledCss, setCompiledCss] = useState('')

  useEffect(() => {
    Sass.compile(scssCode, result => {
      if (result.status === 0) {
        setCompiledCss(result.text)
      } else {
        console.error('Error al compilar SCSS:', result.message)
      }
    })
  }, [scssCode])

  return compiledCss
}

export default useFormatCSS
