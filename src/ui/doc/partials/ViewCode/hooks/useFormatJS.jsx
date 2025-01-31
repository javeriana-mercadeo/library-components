import { useState, useEffect } from 'react'

import { prettierFormat } from '../utils/prettierFormat.js'

const useFormatJS = fn => {
  const [compiledJs, setCompiledJs] = useState('')

  // Función para extraer el contenido de la función respetando llaves internas
  const extractFunctionBody = fnString => {
    const bodyStart = fnString.indexOf('{') + 1
    const bodyEnd = fnString.lastIndexOf('}')

    if (bodyStart === -1 || bodyEnd === -1) return ''

    let body = fnString.slice(bodyStart, bodyEnd).trim()
    let braceCount = 0
    let result = ''

    for (let i = 0; i < body.length; i++) {
      if (body[i] === '{') {
        braceCount++
      } else if (body[i] === '}') {
        braceCount--
      }

      result += body[i]

      // Si el contador de llaves es cero, hemos llegado al final del bloque externo
      if (braceCount === 0 && (body[i] === '}' || i === body.length - 1)) {
        break
      }
    }

    return result.trim()
  }

  useEffect(() => {
    const formatJS = async () => {
      try {
        const functionCode = fn.toString()

        const extractedCode = extractFunctionBody(functionCode)
        const formattedJs = await prettierFormat(extractedCode, 'js')
        setCompiledJs(formattedJs)
      } catch (error) {
        throw new Error(error)
      }
    }

    if (fn) {
      formatJS()
    }
  }, [fn])

  return compiledJs
}

export default useFormatJS
