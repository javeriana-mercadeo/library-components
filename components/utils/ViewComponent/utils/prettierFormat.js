import prettier from 'prettier/standalone'
import parserHtml from 'prettier/plugins/html'
import parserPostcss from 'prettier/plugins/postcss'
import parserBabel from 'prettier/plugins/babel'
import * as prettierPluginEstree from 'prettier/plugins/estree'

const prettierFormat = async (code, type) => {
  // Para JSON, usar JSON.stringify nativo ya que es más confiable
  if (type === 'json') {
    try {
      const parsed = JSON.parse(code)
      return JSON.stringify(parsed, null, 2)
    } catch (error) {
      // Si no se puede parsear como JSON, devolver el código original
      return code
    }
  }

  const parsers = {
    html: [parserHtml],
    css: [parserPostcss],
    scss: [parserPostcss],
    js: [parserBabel, prettierPluginEstree]
  }

  if (!parsers[type]) {
    throw new Error(`Tipo de parser no soportado: ${type}`)
  }

  return await prettier.format(code, {
    parser: type === 'js' ? 'babel' : type,
    plugins: parsers[type],
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
    printWidth: 100,
    htmlWhitespaceSensitivity: 'ignore'
  })
}

export { prettierFormat }
