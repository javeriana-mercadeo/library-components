import { useState, useEffect } from 'react'
import * as Sass from 'sass.js/dist/sass.sync.js'

import { prettierFormat } from '../utils/prettierFormat.js'

const useFormatCSS = scssCode => {
  const [compiledCss, setCompiledCss] = useState('')

  useEffect(() => {
    Sass.compile(scssCode, async result => {
      if (result.status === 0) {
        try {
          const formatted = await prettierFormat(result.text, 'css')
          setCompiledCss(formatted)
        } catch (error) {
          throw new Error(error)
        }
      } else {
        throw new Error(result.formatted)
      }
    })
  }, [scssCode])

  return compiledCss
}

export default useFormatCSS
